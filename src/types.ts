export type UserRole = 'farmer' | 'admin' | 'researcher' | 'advisor';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  location?: {
    state?: string;
    district?: string;
    village?: string;
  };
  createdAt: string;
}

export type LanguageCode = 'en' | 'hi' | 'mr' | 'gu' | 'pa' | 'kn' | 'ta' | 'te';

export interface FarmLocation {
  country: string;
  state: string;
  district: string;
  taluka?: string;
  village?: string;
  latitude?: number;
  longitude?: number;
}

export type SoilType =
  | 'Alluvial'
  | 'Black Soil (Regur)'
  | 'Red Soil'
  | 'Laterite'
  | 'Mountain/Forest'
  | 'Desert/Arid'
  | 'Clayey'
  | 'Loamy'
  | 'Sandy Loam'
  | 'Silty Clay';

export type Season = 'Kharif (Monsoon)' | 'Late Kharif' | 'Rabi (Winter)' | 'Zaid (Summer)' | 'Year-round';

export interface SoilData {
  type: SoilType;
  ph: number; // 0 to 14
  nitrogen: number; // kg/ha (0 - 300)
  phosphorus: number; // kg/ha (0 - 150)
  potassium: number; // kg/ha (0 - 300)
  organicCarbon?: number; // % (0.1 - 2.5)
  micronutrients?: {
    zinc?: 'Deficient' | 'Sufficient' | 'High';
    iron?: 'Deficient' | 'Sufficient' | 'High';
    boron?: 'Deficient' | 'Sufficient' | 'High';
    sulphur?: 'Deficient' | 'Sufficient' | 'High';
  };
  soilHealthScore?: number; // 0-100
}

export interface ClimateData {
  temperature: number; // °C
  humidity: number; // %
  rainfall: number; // mm annual / seasonal
  sunlightHours?: number;
  weatherCondition?: string;
}

export interface FarmDetails {
  id?: string;
  name: string;
  size: number;
  sizeUnit: 'Acres' | 'Hectares' | 'Bigha';
  irrigationType: 'Rainfed' | 'Drip Irrigation' | 'Sprinkler' | 'Canal/Borewell' | 'Flood Irrigation';
  waterAvailability: 'High' | 'Medium' | 'Low';
  previousCrop?: string;
  currentSeason: Season;
  farmingMethod: 'Organic' | 'Conventional' | 'Natural Farming' | 'Precision Ag';
  budgetAmount?: number;
  marketDistanceKm?: number;
}

export type CropCategory =
  | 'Cereals & Grains'
  | 'Pulses'
  | 'Oilseeds'
  | 'Commercial & Fiber'
  | 'Vegetables'
  | 'Fruits'
  | 'Spices & Plantation'
  | 'Medicinal & Aromatic'
  | 'Regional Special';

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  commonNames: string[];
  category: CropCategory;
  description: string;
  imageUrl: string;
  fallbackImage?: string;
  
  // Agronomic requirements
  minTemp: number; // °C
  maxTemp: number; // °C
  minPh: number;
  maxPh: number;
  minRainfall: number; // mm
  maxRainfall: number; // mm
  idealN: number; // kg/ha
  idealP: number; // kg/ha
  idealK: number; // kg/ha
  suitableSoilTypes: SoilType[];
  suitableSeasons: Season[];
  suitableWaterAvailability: ('High' | 'Medium' | 'Low')[];
  
  // Cultivation Details
  growthDurationDays: number;
  sowingMonths: string[];
  harvestMonths: string[];
  seedRate: string; // e.g., "20-25 kg/acre"
  spacing: string; // e.g., "45 cm x 15 cm"
  expectedYieldPerAcre: string; // e.g., "18 - 25 Quintals"
  
  // Management & Health
  fertilizerRecommendation: {
    basal: string;
    topDressing: string;
    organic: string;
  };
  growthStages: { stage: string; days: string; action: string }[];
  commonDiseases: { name: string; symptoms: string; treatment: string }[];
  commonPests: { name: string; damage?: string; control?: string; symptoms?: string; treatment?: string }[];
  
  // Economics & Market
  marketDemand: 'High' | 'Moderate' | 'Seasonal' | 'Niche';
  avgMarketPricePerQuintal: number; // INR
  mspPerQuintal?: number; // INR
  suitableRegions: string[];
  isArchived?: boolean;
}

export type CropItem = Crop;

export interface RecommendationInput {
  farmerName: string;
  farmerPhone?: string;
  location: FarmLocation;
  farm: FarmDetails;
  soil: SoilData;
  climate: ClimateData;
  budget?: number;
  soilReportImageUrl?: string;
}

export interface ContributingFactor {
  factor: string;
  score: number; // 0 to 100
  impact: 'positive' | 'neutral' | 'caution';
  description: string;
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  primaryCrop: Crop;
  confidenceScore: number; // 0 to 100
  alternativeCrops: { crop: Crop; confidenceScore: number; reason: string }[];
  explainableAI: {
    summary: string;
    whyThisCrop: string[];
    contributingFactors: ContributingFactor[];
    riskAssessment: { level: 'Low' | 'Moderate' | 'High'; warning?: string };
  };
  fertilizerPlan: {
    ureaKgPerAcre: number;
    dapKgPerAcre: number;
    mopKgPerAcre: number;
    organicCompostTonsPerAcre: number;
    schedule: string[];
  };
  expectedProfitPerAcre: number;
  inputs: RecommendationInput;
}

export interface DiseaseDetectionResult {
  id: string;
  cropNameCandidate?: string;
  diseaseName: string;
  confidence: number;
  isHealthy: boolean;
  symptoms: string[];
  possibleCauses: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  preventionTips: string[];
  advisoryNote: string;
  imageUrl: string;
  analyzedAt: string;
}

export type DiseaseAnalysis = DiseaseDetectionResult;

export interface WeatherData {
  locationName: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  weatherText: string;
  weatherCode: number;
  uvIndex?: number;
  airQuality?: string;
  forecast: {
    day: string;
    date: string;
    tempMax: number;
    tempMin: number;
    rainProb: number;
    condition: string;
  }[];
}

export interface CommodityPrice {
  id: string;
  commodity: string;
  category: string;
  marketName: string;
  state: string;
  modalPrice: number; // INR per quintal
  minPrice: number;
  maxPrice: number;
  priceChange24h: number; // % or absolute
  msp?: number;
  updatedAt: string;
  historicalTrend: { date: string; price: number }[];
}

export type MarketPrice = CommodityPrice;

export interface GovernmentScheme {
  id: string;
  code?: string;
  title: string;
  shortDescription?: string;
  fundingType?: string;
  financialBenefit?: string;
  requiredDocuments?: string[];
  officialPortalUrl?: string;
  category: 'Direct Financial Benefit' | 'Insurance' | 'Soil & Inputs' | 'Irrigation' | 'Credit & Loan' | 'Mechanization' | 'Organic Farming';
  targetAudience: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  documentsRequired: string[];
  applicationProcess: string;
  officialUrl: string;
  lastVerified: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sourceBadges?: string[];
  isVoiceInput?: boolean;
}

export interface AnalyticsData {
  totalPredictions: number;
  activeFarmers: number;
  totalCropsSupported: number;
  topRecommendedCrops: { name: string; count: number; percentage: number }[];
  predictionsByState: { state: string; count: number }[];
  avgConfidenceScore: number;
  systemStatus: {
    mlService: 'Optimal' | 'Degraded';
    weatherApi: 'Connected' | 'Fallback';
    marketApi: 'Connected' | 'Fallback';
    database: 'Healthy';
  };
}
