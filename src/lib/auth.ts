import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { executeQuery, isNeonConfigured } from '../db/neon.js';
import { User, UserRole } from '../types.js';

// Extend Express Request type
export interface AuthenticatedRequest extends Request {
  user?: User;
  sessionId?: string;
}

// In-memory fallback stores when DATABASE_URL is not set
interface StoredUser extends User {
  passwordHash: string;
}

interface StoredSession {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const memoryUsers: Map<string, StoredUser> = new Map();
const memorySessions: Map<string, StoredSession> = new Map();
const loginAttempts: Map<string, { count: number; firstAttempt: number }> = new Map();

// Initialize in-memory demo accounts with bcrypt hashes
async function initMemoryDemoUsers() {
  if (memoryUsers.size === 0) {
    const farmerHash = await bcrypt.hash('farmer123', 10);
    const adminHash = await bcrypt.hash('admin123', 10);

    memoryUsers.set('rajesh.farmer@agrivision.ai', {
      id: 'usr-farmer-demo',
      name: 'Rajesh Patel (Farmer)',
      email: 'rajesh.farmer@agrivision.ai',
      role: 'farmer',
      passwordHash: farmerHash,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      location: { state: 'Gujarat', district: 'Rajkot', village: 'Anandpar' },
      createdAt: new Date().toISOString()
    });

    memoryUsers.set('admin@agrivision.ai', {
      id: 'usr-admin-demo',
      name: 'Dr. Ramesh Kumar (Admin)',
      email: 'admin@agrivision.ai',
      role: 'admin',
      passwordHash: adminHash,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      location: { state: 'Maharashtra', district: 'Pune', village: 'Shivajinagar' },
      createdAt: new Date().toISOString()
    });
  }
}

initMemoryDemoUsers();

/**
 * Normalizes email address (lowercase, trimmed)
 */
export function normalizeEmail(email: string): string {
  return (email || '').trim().toLowerCase();
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(normalizeEmail(email));
}

/**
 * Validates password strength (minimum 6 chars, recommended 8+)
 */
export function validatePassword(password: string): { valid: boolean; reason?: string } {
  if (!password || password.length < 6) {
    return { valid: false, reason: 'Password must be at least 6 characters long.' };
  }
  return { valid: true };
}

/**
 * Generates high-entropy cryptographic token
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Checks login rate limit per IP or email
 */
export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): { allowed: boolean; waitTimeMs?: number } {
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record) {
    loginAttempts.set(key, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  if (now - record.firstAttempt > windowMs) {
    loginAttempts.set(key, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  if (record.count >= maxAttempts) {
    const remainingTime = windowMs - (now - record.firstAttempt);
    return { allowed: false, waitTimeMs: remainingTime };
  }

  record.count += 1;
  return { allowed: true };
}

export function resetRateLimit(key: string) {
  loginAttempts.delete(key);
}

/**
 * Creates user in Neon PostgreSQL or fallback memory store
 */
export async function registerUser({
  name,
  email,
  password,
  role = 'farmer',
  state,
  district,
  village
}: {
  name: string;
  email: string;
  password: string;
  role?: string;
  state?: string;
  district?: string;
  village?: string;
}): Promise<{ user: User; token: string }> {
  const cleanEmail = normalizeEmail(email);

  if (!name || name.trim().length < 2) {
    throw new Error('Full name is required (minimum 2 characters).');
  }

  if (!isValidEmail(cleanEmail)) {
    throw new Error('Please provide a valid email address.');
  }

  const pwdCheck = validatePassword(password);
  if (!pwdCheck.valid) {
    throw new Error(pwdCheck.reason);
  }

  // Security: Public registration must never create an 'admin' role
  const safeRole: UserRole = role === 'advisor' || role === 'researcher' ? role : 'farmer';

  // Hash password using bcrypt work factor 10
  const passwordHash = await bcrypt.hash(password, 10);
  const userId = `usr-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const nowIso = new Date().toISOString();

  if (isNeonConfigured()) {
    // Check duplicate email
    const existing = await executeQuery<{ id: string }>('SELECT id FROM users WHERE email = $1;', [cleanEmail]);
    if (existing.length > 0) {
      throw new Error('An account with this email address already exists. Please log in.');
    }

    await executeQuery(
      `INSERT INTO users (id, name, email, password_hash, role, account_status, state, district, village, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'active', $6, $7, $8, NOW(), NOW());`,
      [userId, name.trim(), cleanEmail, passwordHash, safeRole, state || null, district || null, village || null]
    );

    // Create session
    const token = generateSecureToken();
    const sessionId = `ses-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await executeQuery(
      `INSERT INTO sessions (id, session_token, user_id, expires_at)
       VALUES ($1, $2, $3, $4);`,
      [sessionId, token, userId, expiresAt]
    );

    // Log activity
    await executeQuery(
      `INSERT INTO user_activity_logs (id, user_id, action, details)
       VALUES ($1, $2, 'account_registered', $3);`,
      [`act-${Date.now()}`, userId, JSON.stringify({ email: cleanEmail, role: safeRole })]
    ).catch(() => {});

    return {
      user: {
        id: userId,
        name: name.trim(),
        email: cleanEmail,
        role: safeRole,
        location: { state, district, village },
        createdAt: nowIso
      },
      token
    };
  } else {
    // In-memory fallback
    if (memoryUsers.has(cleanEmail)) {
      throw new Error('An account with this email address already exists. Please log in.');
    }

    const newUser: StoredUser = {
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      role: safeRole,
      passwordHash,
      location: { state, district, village },
      createdAt: nowIso
    };

    memoryUsers.set(cleanEmail, newUser);

    const token = generateSecureToken();
    const sessionId = `ses-${Date.now()}`;
    memorySessions.set(token, {
      id: sessionId,
      token,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        location: newUser.location,
        createdAt: newUser.createdAt
      },
      token
    };
  }
}

/**
 * Authenticates user credentials and issues session token
 */
export async function loginUser(
  email: string,
  password: string,
  clientIp?: string,
  userAgent?: string
): Promise<{ user: User; token: string }> {
  const cleanEmail = normalizeEmail(email);

  // Rate limit check
  const rateLimitKey = `${clientIp || 'client'}:${cleanEmail}`;
  const rateLimit = checkRateLimit(rateLimitKey);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.waitTimeMs || 60000) / 60000);
    throw new Error(`Too many login attempts. Please wait ${minutes} minute(s) before trying again.`);
  }

  if (isNeonConfigured()) {
    const rows = await executeQuery<{
      id: string;
      name: string;
      email: string;
      password_hash: string;
      role: UserRole;
      avatar: string;
      state: string;
      district: string;
      village: string;
      created_at: string;
    }>('SELECT * FROM users WHERE email = $1 LIMIT 1;', [cleanEmail]);

    if (rows.length === 0) {
      throw new Error('Invalid email or password.');
    }

    const userRow = rows[0];
    const isPasswordValid = await bcrypt.compare(password, userRow.password_hash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    resetRateLimit(rateLimitKey);

    // Create session in Neon
    const token = generateSecureToken();
    const sessionId = `ses-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await executeQuery(
      `INSERT INTO sessions (id, session_token, user_id, ip_address, user_agent, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6);`,
      [sessionId, token, userRow.id, clientIp || null, userAgent || null, expiresAt]
    );

    // Log activity
    await executeQuery(
      `INSERT INTO user_activity_logs (id, user_id, action, ip_address, user_agent, details)
       VALUES ($1, $2, 'login_success', $3, $4, $5);`,
      [`act-${Date.now()}`, userRow.id, clientIp || null, userAgent || null, JSON.stringify({ email: cleanEmail })]
    ).catch(() => {});

    return {
      user: {
        id: userRow.id,
        name: userRow.name,
        email: userRow.email,
        role: userRow.role,
        avatar: userRow.avatar,
        location: {
          state: userRow.state,
          district: userRow.district,
          village: userRow.village
        },
        createdAt: userRow.created_at
      },
      token
    };
  } else {
    // In-memory fallback
    const user = memoryUsers.get(cleanEmail);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    resetRateLimit(rateLimitKey);

    const token = generateSecureToken();
    const sessionId = `ses-${Date.now()}`;
    memorySessions.set(token, {
      id: sessionId,
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ipAddress: clientIp,
      userAgent
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        location: user.location,
        createdAt: user.createdAt
      },
      token
    };
  }
}

/**
 * Validates session token and returns authenticated user
 */
export async function getSessionUser(token: string): Promise<User | null> {
  if (!token) return null;

  if (isNeonConfigured()) {
    try {
      const rows = await executeQuery<{
        id: string;
        name: string;
        email: string;
        role: UserRole;
        avatar: string;
        state: string;
        district: string;
        village: string;
        created_at: string;
        expires_at: string;
      }>(
        `SELECT u.id, u.name, u.email, u.role, u.avatar, u.state, u.district, u.village, u.created_at, s.expires_at
         FROM sessions s
         JOIN users u ON s.user_id = u.id
         WHERE s.session_token = $1 AND s.expires_at > NOW()
         LIMIT 1;`,
        [token]
      );

      if (rows.length === 0) return null;
      const u = rows[0];
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        avatar: u.avatar,
        location: {
          state: u.state || 'Gujarat',
          district: u.district || 'Rajkot',
          village: u.village || 'Anandpar'
        },
        createdAt: u.created_at
      };
    } catch (err) {
      console.warn('Failed to query session from Neon:', err);
      return null;
    }
  } else {
    const session = memorySessions.get(token);
    if (!session || new Date() > session.expiresAt) {
      if (session) memorySessions.delete(token);
      return null;
    }

    for (const u of memoryUsers.values()) {
      if (u.id === session.userId) {
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          avatar: u.avatar,
          location: u.location,
          createdAt: u.createdAt
        };
      }
    }
    return null;
  }
}

/**
 * Invalidates session in database / memory
 */
export async function invalidateSession(token: string): Promise<boolean> {
  if (!token) return true;

  if (isNeonConfigured()) {
    try {
      await executeQuery('DELETE FROM sessions WHERE session_token = $1;', [token]);
      return true;
    } catch {
      return false;
    }
  } else {
    memorySessions.delete(token);
    return true;
  }
}

/**
 * Express Middleware: Authenticates request via Authorization header or Cookie
 */
export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  let token = '';

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.agrivision_session) {
    token = req.cookies.agrivision_session;
  }

  if (token) {
    const user = await getSessionUser(token);
    if (user) {
      req.user = user;
      req.sessionId = token;
    }
  }

  next();
}

/**
 * Express Middleware: Requires authentication (returns 401 if unauthenticated)
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }
  next();
}

/**
 * Express Middleware: Requires specific role(s) (returns 403 if unauthorized)
 */
export function requireRole(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required. Please log in.' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient privileges.' });
    }
    next();
  };
}

export interface GoogleAuthPayload {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
  clientIp?: string;
  userAgent?: string;
}

/**
 * Creates or updates a user via Google OAuth, creates a session, and logs activity.
 */
export async function handleGoogleUser(payload: GoogleAuthPayload): Promise<{ user: User; token: string }> {
  const cleanEmail = normalizeEmail(payload.email);
  const nowIso = new Date().toISOString();
  const token = generateSecureToken();
  const sessionId = `ses-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  if (isNeonConfigured()) {
    // Check if user exists by google_id or email
    const existing = await executeQuery<any>(
      `SELECT id, name, email, role, avatar, state, district, village, google_id, created_at
       FROM users
       WHERE google_id = $1 OR email = $2
       LIMIT 1;`,
      [payload.googleId, cleanEmail]
    );

    let user: User;
    let userId: string;

    if (existing && existing.length > 0) {
      const row = existing[0];
      userId = row.id;

      // Update google_id and avatar if missing
      await executeQuery(
        `UPDATE users
         SET google_id = COALESCE(google_id, $1),
             avatar = COALESCE(avatar, $2),
             updated_at = NOW()
         WHERE id = $3;`,
        [payload.googleId, payload.avatar || null, userId]
      ).catch(() => {});

      user = {
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role as UserRole,
        avatar: payload.avatar || row.avatar,
        location: { state: row.state || 'Gujarat', district: row.district || 'Rajkot', village: row.village || 'Anandpar' },
        createdAt: row.created_at
      };
    } else {
      userId = `usr-g-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
      const defaultRole: UserRole = 'farmer';

      await executeQuery(
        `INSERT INTO users (id, name, email, password_hash, role, account_status, avatar, google_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, 'active', $6, $7, NOW(), NOW());`,
        [userId, payload.name, cleanEmail, 'GOOGLE_OAUTH_ACCOUNT', defaultRole, payload.avatar || null, payload.googleId]
      );

      user = {
        id: userId,
        name: payload.name,
        email: cleanEmail,
        role: defaultRole,
        avatar: payload.avatar,
        location: { state: 'Gujarat', district: 'Rajkot', village: 'Anandpar' },
        createdAt: nowIso
      };
    }

    // Create session in Neon
    await executeQuery(
      `INSERT INTO sessions (id, session_token, user_id, user_agent, ip_address, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6);`,
      [sessionId, token, userId, payload.userAgent || null, payload.clientIp || null, sessionExpiry]
    );

    // Log activity
    await executeQuery(
      `INSERT INTO user_activity_logs (id, user_id, action, ip_address, user_agent, details)
       VALUES ($1, $2, 'google_oauth_login', $3, $4, $5);`,
      [
        `act-${Date.now()}`,
        userId,
        payload.clientIp || null,
        payload.userAgent || null,
        JSON.stringify({ provider: 'google', email: cleanEmail })
      ]
    ).catch(() => {});

    return { user, token };
  } else {
    // Memory fallback
    let existingUser: StoredUser | undefined;
    for (const u of memoryUsers.values()) {
      if (u.email === cleanEmail) {
        existingUser = u;
        break;
      }
    }

    let user: User;
    if (existingUser) {
      existingUser.avatar = payload.avatar || existingUser.avatar;
      user = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        avatar: existingUser.avatar,
        location: existingUser.location,
        createdAt: existingUser.createdAt
      };
    } else {
      const newUserId = `usr-g-${Date.now()}`;
      const newUser: StoredUser = {
        id: newUserId,
        name: payload.name,
        email: cleanEmail,
        role: 'farmer',
        passwordHash: 'GOOGLE_OAUTH_ACCOUNT',
        avatar: payload.avatar,
        location: { state: 'Gujarat', district: 'Rajkot' },
        createdAt: nowIso
      };
      memoryUsers.set(cleanEmail, newUser);
      user = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        location: newUser.location,
        createdAt: newUser.createdAt
      };
    }

    memorySessions.set(token, {
      id: sessionId,
      token,
      userId: user.id,
      expiresAt: sessionExpiry,
      ipAddress: payload.clientIp,
      userAgent: payload.userAgent
    });

    return { user, token };
  }
}

