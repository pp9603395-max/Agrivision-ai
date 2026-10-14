import { Pool, neon, neonConfig } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { INITIAL_CROPS } from '../data/cropsData.js';
import { GOVERNMENT_SCHEMES } from '../data/schemesData.js';
import { INITIAL_MARKET_PRICES } from '../data/marketData.js';

dotenv.config();

// Configure Neon client
const rawDatabaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || '';

let pool: Pool | null = null;
let isConnected = false;
let lastCheckTime: string | null = null;
let connectionError: string | null = null;

export function getMaskedDatabaseUrl(url: string = rawDatabaseUrl): string {
  if (!url) return 'NOT_CONFIGURED';
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const dbName = parsed.pathname.replace(/^\//, '');
    return `postgresql://****:****@${host}/${dbName}?sslmode=require`;
  } catch {
    return 'postgresql://****:****@neon.tech/***';
  }
}

export function isNeonConfigured(): boolean {
  return Boolean(rawDatabaseUrl && rawDatabaseUrl.trim().length > 0);
}

export function getNeonPool(): Pool | null {
  if (!isNeonConfigured()) {
    return null;
  }
  if (!pool) {
    try {
      pool = new Pool({
        connectionString: rawDatabaseUrl,
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      });
      pool.on('error', (err) => {
        console.error('Unexpected error on idle Neon client', err);
        isConnected = false;
        connectionError = err.message;
      });
    } catch (err: any) {
      console.error('Failed to create Neon Pool:', err);
      connectionError = err.message;
      return null;
    }
  }
  return pool;
}

export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const p = getNeonPool();
  if (!p) {
    throw new Error('Neon database is not configured. Set DATABASE_URL in environment variables.');
  }
  const client = await p.connect();
  try {
    const res = await client.query(sql, params);
    return res.rows as T[];
  } finally {
    client.release();
  }
}

export interface DatabaseStatus {
  connected: boolean;
  provider: 'Neon PostgreSQL';
  configured: boolean;
  endpoint: string;
  latencyMs: number | null;
  tables: Record<string, number>;
  totalTables: number;
  lastChecked: string;
  error?: string | null;
}

export async function checkNeonConnection(): Promise<DatabaseStatus> {
  const status: DatabaseStatus = {
    connected: false,
    provider: 'Neon PostgreSQL',
    configured: isNeonConfigured(),
    endpoint: getMaskedDatabaseUrl(),
    latencyMs: null,
    tables: {},
    totalTables: 0,
    lastChecked: new Date().toISOString(),
    error: null,
  };

  if (!isNeonConfigured()) {
    status.error = 'DATABASE_URL environment variable is not set. Using secure fallback in-memory store.';
    return status;
  }

  const start = Date.now();
  try {
    const result = await executeQuery<{ check: number }>('SELECT 1 as check;');
    status.latencyMs = Date.now() - start;
    if (result && result.length > 0 && result[0].check === 1) {
      status.connected = true;
      isConnected = true;
      connectionError = null;

      // Count records in tables
      const tableNames = [
        'users',
        'sessions',
        'farms',
        'soil_records',
        'crop_recommendations',
        'crop_disease_reports',
        'weather_records',
        'market_prices',
        'fertilizer_recommendations',
        'government_schemes',
        'user_activity_logs',
        'crops',
      ];

      for (const tName of tableNames) {
        try {
          const countRes = await executeQuery<{ count: string }>(`SELECT COUNT(*) as count FROM ${tName};`);
          status.tables[tName] = parseInt(countRes[0]?.count || '0', 10);
        } catch {
          status.tables[tName] = 0;
        }
      }
      status.totalTables = Object.keys(status.tables).filter((k) => status.tables[k] >= 0).length;
    }
  } catch (err: any) {
    status.connected = false;
    status.error = err.message || 'Failed to connect to Neon PostgreSQL database.';
    isConnected = false;
    connectionError = err.message;
  }

  return status;
}

/**
 * Initializes database tables with full constraints, foreign keys, and indexes.
 * Seeds initial baseline data (crops, demo accounts, schemes) if tables are empty.
 */
export async function initNeonDatabase(): Promise<boolean> {
  if (!isNeonConfigured()) {
    console.log('ℹ️  Neon PostgreSQL: DATABASE_URL not set. Running with secure in-memory store.');
    return false;
  }

  console.log('🔄 Initializing Neon PostgreSQL Schema...');
  try {
    const schemaSql = `
      -- 1. Users Table
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'farmer',
        account_status VARCHAR(50) DEFAULT 'active',
        avatar TEXT,
        state VARCHAR(100),
        district VARCHAR(100),
        village VARCHAR(100),
        google_id VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

      -- 2. Sessions Table
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(255) PRIMARY KEY,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        user_agent TEXT,
        ip_address VARCHAR(100),
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);
      CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

      -- 3. Password Reset Tokens Table
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token_hash VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 4. Farms Table
      CREATE TABLE IF NOT EXISTS farms (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        farm_name VARCHAR(255) NOT NULL,
        size NUMERIC(10, 2) NOT NULL,
        size_unit VARCHAR(50) DEFAULT 'Acres',
        country VARCHAR(100) DEFAULT 'India',
        state VARCHAR(100) NOT NULL,
        district VARCHAR(100) NOT NULL,
        taluka VARCHAR(100),
        village VARCHAR(100),
        latitude NUMERIC(10, 6),
        longitude NUMERIC(10, 6),
        soil_type VARCHAR(100),
        irrigation_type VARCHAR(100),
        water_availability VARCHAR(50),
        current_season VARCHAR(100),
        farming_method VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_farms_user_id ON farms(user_id);

      -- 5. Soil Records Table
      CREATE TABLE IF NOT EXISTS soil_records (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        farm_id VARCHAR(255) REFERENCES farms(id) ON DELETE SET NULL,
        soil_type VARCHAR(100),
        ph NUMERIC(4, 2) NOT NULL,
        nitrogen NUMERIC(8, 2) NOT NULL,
        phosphorus NUMERIC(8, 2) NOT NULL,
        potassium NUMERIC(8, 2) NOT NULL,
        organic_carbon NUMERIC(4, 2),
        moisture NUMERIC(5, 2),
        soil_health_score NUMERIC(5, 2),
        micronutrients JSONB,
        measurement_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_soil_records_user_id ON soil_records(user_id);

      -- 6. Crop Recommendations Table
      CREATE TABLE IF NOT EXISTS crop_recommendations (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL,
        farm_id VARCHAR(255) REFERENCES farms(id) ON DELETE SET NULL,
        primary_crop JSONB NOT NULL,
        confidence_score NUMERIC(5, 2) NOT NULL,
        alternative_crops JSONB,
        explainable_ai JSONB,
        fertilizer_plan JSONB,
        expected_profit NUMERIC(12, 2),
        input_parameters JSONB NOT NULL,
        model_version VARCHAR(50) DEFAULT 'agrivision-ml-v2.4',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_crop_rec_user_id ON crop_recommendations(user_id);

      -- 7. Crop Disease Reports Table
      CREATE TABLE IF NOT EXISTS crop_disease_reports (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL,
        crop_name VARCHAR(150),
        image_url TEXT NOT NULL,
        disease_name VARCHAR(255) NOT NULL,
        confidence NUMERIC(5, 2) NOT NULL,
        is_healthy BOOLEAN DEFAULT FALSE,
        symptoms JSONB,
        possible_causes JSONB,
        organic_treatment JSONB,
        chemical_treatment JSONB,
        prevention_tips JSONB,
        advisory_note TEXT,
        report_status VARCHAR(50) DEFAULT 'completed',
        analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_disease_reports_user_id ON crop_disease_reports(user_id);

      -- 8. Weather Records Table
      CREATE TABLE IF NOT EXISTS weather_records (
        id VARCHAR(255) PRIMARY KEY,
        location_name VARCHAR(255) NOT NULL,
        latitude NUMERIC(10, 6) NOT NULL,
        longitude NUMERIC(10, 6) NOT NULL,
        temperature NUMERIC(5, 2) NOT NULL,
        feels_like NUMERIC(5, 2),
        humidity NUMERIC(5, 2),
        rainfall NUMERIC(6, 2),
        wind_speed NUMERIC(5, 2),
        weather_text VARCHAR(150),
        weather_code INT,
        forecast JSONB,
        observation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_weather_coords ON weather_records(latitude, longitude);

      -- 9. Market Prices Table
      CREATE TABLE IF NOT EXISTS market_prices (
        id VARCHAR(255) PRIMARY KEY,
        commodity VARCHAR(150) NOT NULL,
        category VARCHAR(100),
        market_name VARCHAR(150) NOT NULL,
        state VARCHAR(100) NOT NULL,
        modal_price NUMERIC(10, 2) NOT NULL,
        min_price NUMERIC(10, 2),
        max_price NUMERIC(10, 2),
        price_change_24h NUMERIC(6, 2) DEFAULT 0,
        msp NUMERIC(10, 2),
        currency VARCHAR(10) DEFAULT 'INR',
        historical_trend JSONB,
        observation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_market_commodity ON market_prices(commodity);

      -- 10. Fertilizer Recommendations Table
      CREATE TABLE IF NOT EXISTS fertilizer_recommendations (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL,
        crop_name VARCHAR(150) NOT NULL,
        urea_kg_per_acre NUMERIC(8, 2),
        dap_kg_per_acre NUMERIC(8, 2),
        mop_kg_per_acre NUMERIC(8, 2),
        organic_compost_tons NUMERIC(8, 2),
        schedule JSONB,
        soil_parameters JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 11. Government Schemes Table
      CREATE TABLE IF NOT EXISTS government_schemes (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        target_audience VARCHAR(255),
        description TEXT NOT NULL,
        benefits JSONB,
        eligibility JSONB,
        documents_required JSONB,
        application_process TEXT,
        official_url TEXT,
        last_verified VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 12. User Activity Logs Table
      CREATE TABLE IF NOT EXISTS user_activity_logs (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(100) NOT NULL,
        ip_address VARCHAR(100),
        user_agent TEXT,
        details JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity_logs(user_id);

      -- 13. Crops Table
      CREATE TABLE IF NOT EXISTS crops (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        scientific_name VARCHAR(200),
        common_names JSONB,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        image_url TEXT,
        fallback_image TEXT,
        min_temp NUMERIC(5, 2),
        max_temp NUMERIC(5, 2),
        min_ph NUMERIC(4, 2),
        max_ph NUMERIC(4, 2),
        min_rainfall NUMERIC(7, 2),
        max_rainfall NUMERIC(7, 2),
        ideal_n NUMERIC(6, 2),
        ideal_p NUMERIC(6, 2),
        ideal_k NUMERIC(6, 2),
        suitable_soil_types JSONB,
        suitable_seasons JSONB,
        suitable_water_availability JSONB,
        growth_duration_days INT,
        sowing_months JSONB,
        harvest_months JSONB,
        seed_rate VARCHAR(100),
        spacing VARCHAR(100),
        expected_yield_per_acre VARCHAR(150),
        fertilizer_recommendation JSONB,
        growth_stages JSONB,
        common_diseases JSONB,
        common_pests JSONB,
        market_demand VARCHAR(50),
        avg_market_price_per_quintal NUMERIC(10, 2),
        msp_per_quintal NUMERIC(10, 2),
        suitable_regions JSONB,
        is_archived BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_crops_name ON crops(name);
      CREATE INDEX IF NOT EXISTS idx_crops_category ON crops(category);
    `;

    const p = getNeonPool();
    if (!p) return false;

    const client = await p.connect();
    try {
      await client.query(schemaSql);
      console.log('✅ Neon PostgreSQL schema tables and indexes verified.');

      // Ensure google_id exists and password_hash is nullable for OAuth users
      await client.query(`
        ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;
        ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255);
      `).catch(() => {});

      // Check and seed users if empty
      const userCountRes = await client.query('SELECT COUNT(*) as cnt FROM users');
      const userCount = parseInt(userCountRes.rows[0].cnt, 10);
      if (userCount === 0) {
        console.log('🌱 Seeding initial demo users into Neon PostgreSQL...');
        const farmerHash = await bcrypt.hash('farmer123', 10);
        const adminHash = await bcrypt.hash('admin123', 10);

        await client.query(
          `INSERT INTO users (id, name, email, password_hash, role, account_status, avatar, state, district, village)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            'usr-farmer-demo',
            'Rajesh Patel (Farmer)',
            'rajesh.farmer@agrivision.ai',
            farmerHash,
            'farmer',
            'active',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            'Gujarat',
            'Rajkot',
            'Anandpar'
          ]
        );

        await client.query(
          `INSERT INTO users (id, name, email, password_hash, role, account_status, avatar, state, district, village)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            'usr-admin-demo',
            'Dr. Ramesh Kumar (Admin)',
            'admin@agrivision.ai',
            adminHash,
            'admin',
            'active',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            'Maharashtra',
            'Pune',
            'Shivajinagar'
          ]
        );
      }

      // Check and seed crops
      const cropCountRes = await client.query('SELECT COUNT(*) as cnt FROM crops');
      const cropCount = parseInt(cropCountRes.rows[0].cnt, 10);
      if (cropCount === 0) {
        console.log(`🌱 Seeding ${INITIAL_CROPS.length} agricultural crops into Neon PostgreSQL...`);
        for (const crop of INITIAL_CROPS) {
          await client.query(
            `INSERT INTO crops (
              id, name, scientific_name, common_names, category, description,
              image_url, fallback_image, min_temp, max_temp, min_ph, max_ph,
              min_rainfall, max_rainfall, ideal_n, ideal_p, ideal_k,
              suitable_soil_types, suitable_seasons, suitable_water_availability,
              growth_duration_days, sowing_months, harvest_months, seed_rate, spacing,
              expected_yield_per_acre, fertilizer_recommendation, growth_stages,
              common_diseases, common_pests, market_demand, avg_market_price_per_quintal,
              msp_per_quintal, suitable_regions
            ) VALUES (
              $1, $2, $3, $4, $5, $6,
              $7, $8, $9, $10, $11, $12,
              $13, $14, $15, $16, $17,
              $18, $19, $20,
              $21, $22, $23, $24, $25,
              $26, $27, $28,
              $29, $30, $31, $32,
              $33, $34
            ) ON CONFLICT (id) DO NOTHING;`,
            [
              crop.id,
              crop.name,
              crop.scientificName,
              JSON.stringify(crop.commonNames),
              crop.category,
              crop.description,
              crop.imageUrl,
              crop.fallbackImage || '',
              crop.minTemp,
              crop.maxTemp,
              crop.minPh,
              crop.maxPh,
              crop.minRainfall,
              crop.maxRainfall,
              crop.idealN,
              crop.idealP,
              crop.idealK,
              JSON.stringify(crop.suitableSoilTypes),
              JSON.stringify(crop.suitableSeasons),
              JSON.stringify(crop.suitableWaterAvailability),
              crop.growthDurationDays,
              JSON.stringify(crop.sowingMonths),
              JSON.stringify(crop.harvestMonths),
              crop.seedRate,
              crop.spacing,
              crop.expectedYieldPerAcre,
              JSON.stringify(crop.fertilizerRecommendation),
              JSON.stringify(crop.growthStages),
              JSON.stringify(crop.commonDiseases),
              JSON.stringify(crop.commonPests),
              crop.marketDemand,
              crop.avgMarketPricePerQuintal,
              crop.mspPerQuintal || null,
              JSON.stringify(crop.suitableRegions),
            ]
          );
        }
      }

      // Check and seed government schemes
      const schemeCountRes = await client.query('SELECT COUNT(*) as cnt FROM government_schemes');
      if (parseInt(schemeCountRes.rows[0].cnt, 10) === 0) {
        console.log(`🌱 Seeding ${GOVERNMENT_SCHEMES.length} government schemes into Neon PostgreSQL...`);
        for (const s of GOVERNMENT_SCHEMES) {
          await client.query(
            `INSERT INTO government_schemes (
              id, title, category, target_audience, description,
              benefits, eligibility, documents_required, application_process,
              official_url, last_verified
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (id) DO NOTHING;`,
            [
              s.id,
              s.title,
              s.category,
              s.targetAudience,
              s.description,
              JSON.stringify(s.benefits),
              JSON.stringify(s.eligibility),
              JSON.stringify(s.documentsRequired),
              s.applicationProcess,
              s.officialUrl,
              s.lastVerified,
            ]
          );
        }
      }

      // Check and seed market prices
      const marketCountRes = await client.query('SELECT COUNT(*) as cnt FROM market_prices');
      if (parseInt(marketCountRes.rows[0].cnt, 10) === 0) {
        console.log(`🌱 Seeding ${INITIAL_MARKET_PRICES.length} market prices into Neon PostgreSQL...`);
        for (const m of INITIAL_MARKET_PRICES) {
          await client.query(
            `INSERT INTO market_prices (
              id, commodity, category, market_name, state,
              modal_price, min_price, max_price, price_change_24h,
              msp, currency, historical_trend
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (id) DO NOTHING;`,
            [
              m.id,
              m.commodity,
              m.category,
              m.marketName,
              m.state,
              m.modalPrice,
              m.minPrice,
              m.maxPrice,
              m.priceChange24h,
              m.msp || null,
              'INR',
              JSON.stringify(m.historicalTrend),
            ]
          );
        }
      }

      isConnected = true;
      return true;
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error('❌ Failed to initialize Neon PostgreSQL database:', err);
    connectionError = err.message;
    isConnected = false;
    return false;
  }
}
