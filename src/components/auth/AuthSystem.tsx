import React, { useState, useEffect, useRef } from 'react';
import { User, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import { GoogleOAuthModal } from './GoogleOAuthModal';
import {
  Sprout,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Mail,
  Lock,
  User as UserIcon,
  Info,
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  Globe,
  Loader2,
  Film
} from 'lucide-react';

interface AuthSystemProps {
  onLoginSuccess: (user: User) => void;
  language: LanguageCode;
  onWatchIntro?: () => void;
}

interface DbStatus {
  connected: boolean;
  provider: string;
  configured: boolean;
  endpoint: string;
  latencyMs?: number | null;
  tables?: Record<string, number>;
  totalTables?: number;
  lastChecked?: string;
  error?: string | null;
}

export const AuthSystem: React.FC<AuthSystemProps> = ({ onLoginSuccess, language, onWatchIntro }) => {
  const [mode, setMode] = useState<'welcome' | 'login' | 'signup' | 'forgot'>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'farmer' | 'advisor' | 'researcher'>('farmer');
  const [state, setState] = useState('Gujarat');
  const [district, setDistrict] = useState('Rajkot');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [checkingDb, setCheckingDb] = useState(false);
  const [showDbModal, setShowDbModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const popupRef = useRef<Window | null>(null);
  const popupIntervalRef = useRef<number | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const fetchDbStatus = async () => {
    setCheckingDb(true);
    try {
      const res = await fetch('/api/db/status');
      const data = await res.json();
      setDbStatus(data);
    } catch {
      setDbStatus({
        connected: false,
        provider: 'Neon PostgreSQL',
        configured: false,
        endpoint: 'NOT_CONFIGURED',
        error: 'Unable to reach backend database service.'
      });
    } finally {
      setCheckingDb(false);
    }
  };

  useEffect(() => {
    fetchDbStatus();
  }, []);

  const handleAuthSuccess = (token: string, user: User) => {
    if (popupIntervalRef.current) {
      window.clearInterval(popupIntervalRef.current);
      popupIntervalRef.current = null;
    }
    if (popupRef.current && !popupRef.current.closed) {
      try {
        popupRef.current.close();
      } catch {}
    }
    popupRef.current = null;

    if (token) {
      localStorage.setItem('agrivision_token', token);
    }
    setNotice(null);
    setLoading(false);
    setError(null);
    onLoginSuccess(user);
  };

  const handleAuthError = (errMsg: string) => {
    if (popupIntervalRef.current) {
      window.clearInterval(popupIntervalRef.current);
      popupIntervalRef.current = null;
    }
    popupRef.current = null;
    setNotice(null);
    setLoading(false);
    setError(errMsg || 'Google sign-in was not completed.');
  };

  const handleCancelGoogleSignIn = () => {
    if (popupIntervalRef.current) {
      window.clearInterval(popupIntervalRef.current);
      popupIntervalRef.current = null;
    }
    if (popupRef.current && !popupRef.current.closed) {
      try {
        popupRef.current.close();
      } catch {}
    }
    popupRef.current = null;
    setLoading(false);
    setNotice(null);
  };

  // Multi-channel OAuth listeners:
  // 1. window.addEventListener('message') -> window.opener.postMessage
  // 2. window.addEventListener('storage') -> Cross-tab localStorage events (when COOP severs opener)
  // 3. BroadcastChannel('agrivision_auth') -> Cross-window messaging on same origin
  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (
        !origin.endsWith('.run.app') &&
        !origin.includes('localhost') &&
        origin !== window.location.origin
      ) {
        return;
      }

      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS' && event.data?.user) {
        handleAuthSuccess(event.data.token || '', event.data.user);
      } else if (event.data?.type === 'GOOGLE_AUTH_ERROR') {
        handleAuthError(event.data.error);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'agrivision_oauth_event' && event.newValue) {
        try {
          const payload = JSON.parse(event.newValue);
          if (payload.type === 'GOOGLE_AUTH_SUCCESS' && payload.user) {
            handleAuthSuccess(payload.token || '', payload.user);
          } else if (payload.type === 'GOOGLE_AUTH_ERROR') {
            handleAuthError(payload.error);
          }
        } catch {}
      }
    };

    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel('agrivision_auth');
        channel.onmessage = (event) => {
          if (event.data?.type === 'GOOGLE_AUTH_SUCCESS' && event.data?.user) {
            handleAuthSuccess(event.data.token || '', event.data.user);
          } else if (event.data?.type === 'GOOGLE_AUTH_ERROR') {
            handleAuthError(event.data.error);
          }
        };
      } catch {}
    }

    window.addEventListener('message', handleOAuthMessage);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('message', handleOAuthMessage);
      window.removeEventListener('storage', handleStorage);
      if (channel) {
        try { channel.close(); } catch {}
      }
      if (popupIntervalRef.current) {
        window.clearInterval(popupIntervalRef.current);
        popupIntervalRef.current = null;
      }
    };
  }, [onLoginSuccess]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setNotice(null);

    if (popupIntervalRef.current) {
      window.clearInterval(popupIntervalRef.current);
      popupIntervalRef.current = null;
    }

    try {
      const clientOrigin = window.location.origin;
      const res = await fetch(`/api/auth/google/url?origin=${encodeURIComponent(clientOrigin)}`);
      const data = await res.json();

      if (data.configured && data.url) {
        const width = 520;
        const height = 640;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
          data.url,
          'google_oauth_popup',
          `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no`
        );

        if (!popup) {
          setError('Popup window was blocked by your browser. Please allow popups for Google Sign-In.');
          setLoading(false);
          return;
        }

        popupRef.current = popup;
        setNotice('Please complete sign-in in the Google window.');

        // Monitor popup status: periodic check and detection when closed
        let checksCount = 0;
        popupIntervalRef.current = window.setInterval(async () => {
          checksCount++;

          // Periodically check if cookie session was established (e.g. every ~1.8 seconds)
          if (checksCount % 3 === 0) {
            try {
              const token = localStorage.getItem('agrivision_token');
              const headers: Record<string, string> = {};
              if (token) headers['Authorization'] = `Bearer ${token}`;
              const meRes = await fetch('/api/auth/me', { credentials: 'include', headers });
              if (meRes.ok) {
                const meData = await meRes.json();
                if (meData && meData.user) {
                  handleAuthSuccess(token || '', meData.user);
                  return;
                }
              }
            } catch {}
          }

          // Check if popup has been closed (either after login or closed by user)
          if (!popup || popup.closed) {
            if (popupIntervalRef.current) {
              window.clearInterval(popupIntervalRef.current);
              popupIntervalRef.current = null;
            }

            // Give a 500ms grace period to check if the session was authenticated
            setTimeout(async () => {
              try {
                const token = localStorage.getItem('agrivision_token');
                const headers: Record<string, string> = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;
                const meRes = await fetch('/api/auth/me', { credentials: 'include', headers });
                if (meRes.ok) {
                  const meData = await meRes.json();
                  if (meData && meData.user) {
                    handleAuthSuccess(token || '', meData.user);
                    return;
                  }
                }
              } catch {}

              // Popup was closed without authenticating; clear pending notice and loading state
              setLoading(false);
              setNotice(null);
            }, 500);
          }
        }, 600);

      } else {
        setLoading(false);
        setShowGoogleModal(true);
      }
    } catch {
      setLoading(false);
      setError('Failed to initiate Google authentication. Please verify network connection.');
    }
  };

  const handleGoogleSimulateDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/google/simulate-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await res.json();
      setLoading(false);
      setShowGoogleModal(false);
      if (res.ok && data.user) {
        if (data.token) {
          localStorage.setItem('agrivision_token', data.token);
        }
        onLoginSuccess(data.user);
      } else {
        setError(data.error || 'Google demo sign-in failed.');
      }
    } catch {
      setLoading(false);
      setError('Failed to connect to authentication server.');
    }
  };

  const handleDemoLogin = async (selectedRole: 'farmer' | 'admin') => {
    setLoading(true);
    setError(null);
    setNotice(null);

    const demoEmail = selectedRole === 'admin' ? 'admin@agrivision.ai' : 'rajesh.farmer@agrivision.ai';
    const demoPassword = selectedRole === 'admin' ? 'admin123' : 'farmer123';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: demoEmail, password: demoPassword })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.user) {
        if (data.token) {
          localStorage.setItem('agrivision_token', data.token);
        }
        onLoginSuccess(data.user);
      } else {
        // Fallback demo user
        const fallbackUser: User = {
          id: selectedRole === 'admin' ? 'usr-admin-demo' : 'usr-farmer-demo',
          name: selectedRole === 'admin' ? 'Dr. Ramesh Kumar (Admin)' : 'Rajesh Patel (Farmer)',
          email: demoEmail,
          role: selectedRole,
          avatar: selectedRole === 'admin'
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          location: { state: 'Gujarat', district: 'Rajkot', village: 'Anandpar' },
          createdAt: new Date().toISOString()
        };
        onLoginSuccess(fallbackUser);
      }
    } catch {
      setLoading(false);
      setError('Connection failed. Please retry.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        setLoading(false);

        if (res.ok && data.user) {
          if (data.token) {
            localStorage.setItem('agrivision_token', data.token);
          }
          onLoginSuccess(data.user);
        } else {
          setError(data.error || 'Invalid email or password.');
        }
      } else if (mode === 'signup') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name, email, password, role, state, district })
        });
        const data = await res.json();
        setLoading(false);

        if (res.ok && data.user) {
          if (data.token) {
            localStorage.setItem('agrivision_token', data.token);
          }
          onLoginSuccess(data.user);
        } else {
          setError(data.error || 'Failed to create account.');
        }
      } else if (mode === 'forgot') {
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        setLoading(false);
        setNotice(data.message || 'If an account exists, instructions have been sent.');
      }
    } catch {
      setLoading(false);
      setError('Network communication failed. Please verify connection.');
    }
  };

  // Google SVG Icon helper
  const GoogleIcon = () => (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl p-8 relative z-10 transition-all duration-300">
        
        {/* Header Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 shadow-lg mb-3">
            <Sprout className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{t.appName}</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">{t.appTagline}</p>

          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setShowDbModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: dbStatus?.connected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                borderColor: dbStatus?.connected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)',
                color: dbStatus?.connected ? '#34d399' : '#60a5fa'
              }}
            >
              <Database className="w-3 h-3" />
              <span>
                {dbStatus?.connected
                  ? `Neon PostgreSQL Connected (${dbStatus.latencyMs}ms)`
                  : dbStatus?.configured
                  ? 'Neon PostgreSQL Connecting...'
                  : 'Neon PostgreSQL Ready'}
              </span>
            </button>

            {onWatchIntro && (
              <button
                type="button"
                onClick={onWatchIntro}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 transition-all cursor-pointer shadow-sm"
              >
                <Film className="w-3 h-3 text-emerald-400" />
                <span>Watch Intro Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Notice/Error Banners */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {notice && (
          <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Loader2 className="w-4 h-4 animate-spin shrink-0 text-amber-400" />
              <span className="truncate">{notice}</span>
            </div>
            <button
              type="button"
              onClick={handleCancelGoogleSignIn}
              className="text-[11px] underline text-amber-400 hover:text-amber-200 cursor-pointer shrink-0 ml-2"
            >
              Cancel
            </button>
          </div>
        )}

        {/* WELCOME SCREEN */}
        {mode === 'welcome' && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-200 space-y-2">
              <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                Neon PostgreSQL & AI Agriculture Platform
              </div>
              <p className="text-slate-300">
                Secure authentication, Google Sign-In, user-scoped farm profiles, 40+ verified crops, explainable AI, and disease detection.
              </p>
            </div>

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-800 rounded-xl font-medium text-xs flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            {/* Quick Demo Access Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleDemoLogin('farmer')}
                disabled={loading}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm flex items-center justify-between transition-all shadow-lg shadow-emerald-600/20 group disabled:opacity-50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  <span>{t.demoFarmer}</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-xs flex items-center justify-between transition-all disabled:opacity-50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{t.demoAdmin}</span>
                </div>
                <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Protected Admin
                </span>
              </button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase">
                <span className="bg-slate-900 px-2 text-slate-500">Or Continue With Email</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('login')}
                className="py-2.5 px-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl font-medium text-xs text-center transition-all cursor-pointer"
              >
                {t.login}
              </button>
              <button
                onClick={() => setMode('signup')}
                className="py-2.5 px-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl font-medium text-xs text-center transition-all cursor-pointer"
              >
                {t.signup}
              </button>
            </div>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Google Sign-In in Login Mode */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-800 rounded-xl font-medium text-xs flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-slate-900 px-2 text-slate-500">Or with Email & Password</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@agrivision.ai"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-400">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-emerald-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In with Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex justify-between items-center text-xs pt-2">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-slate-400 hover:text-emerald-400"
              >
                Don't have an account? Sign up
              </button>
              <button
                type="button"
                onClick={() => setMode('welcome')}
                className="text-slate-500 hover:text-slate-300"
              >
                Back
              </button>
            </div>
          </form>
        )}

        {/* SIGNUP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Google Sign-In in Signup Mode */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-800 rounded-xl font-medium text-xs flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
            >
              <GoogleIcon />
              <span>Sign Up with Google</span>
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-slate-900 px-2 text-slate-500">Or with Email</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@myfarm.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Password (min. 6 characters)</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Account Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    role === 'farmer'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  🌾 Farmer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('advisor')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    role === 'advisor'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  🌱 Agronomist
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account in Neon Database</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex justify-between items-center text-xs pt-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-slate-400 hover:text-emerald-400"
              >
                Already have an account? Log in
              </button>
              <button
                type="button"
                onClick={() => setMode('welcome')}
                className="text-slate-500 hover:text-slate-300"
              >
                Back
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-xs text-slate-400">
              Enter your account email address to receive password reset instructions.
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@agrivision.ai"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Request Password Reset</span>
              )}
            </button>

            <div className="flex justify-center text-xs pt-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-slate-400 hover:text-emerald-400"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Google OAuth Setup / Instant Test Modal */}
      <GoogleOAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSimulateDemo={handleGoogleSimulateDemo}
        loading={loading}
      />

      {/* Database Status Modal */}
      {showDbModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowDbModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Neon PostgreSQL Connectivity</h3>
                <p className="text-[11px] text-slate-400">Primary Relational Database & Authentication</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Database Engine:</span>
                  <span className="font-semibold text-slate-200">Neon Serverless PostgreSQL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Connection Status:</span>
                  <span className={`font-semibold flex items-center gap-1 ${dbStatus?.connected ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {dbStatus?.connected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {dbStatus?.connected ? 'Connected & Verified (SELECT 1)' : 'Awaiting DATABASE_URL'}
                  </span>
                </div>
                {dbStatus?.latencyMs !== null && dbStatus?.latencyMs !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Query Latency:</span>
                    <span className="font-semibold text-emerald-400">{dbStatus.latencyMs} ms</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Database Endpoint:</span>
                  <span className="font-mono text-[10px] text-slate-300">{dbStatus?.endpoint || 'NOT_CONFIGURED'}</span>
                </div>
              </div>

              {dbStatus?.tables && Object.keys(dbStatus.tables).length > 0 && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                    Verified Schema Tables ({dbStatus.totalTables || 12} tables)
                  </span>
                  <div className="grid grid-cols-2 gap-1 text-[11px]">
                    {Object.entries(dbStatus.tables).map(([tbl, count]) => (
                      <div key={tbl} className="flex justify-between py-0.5 border-b border-slate-900">
                        <span className="text-slate-400">{tbl}:</span>
                        <span className="text-emerald-400 font-medium">{count} rows</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-emerald-950/30 border border-emerald-800/30 rounded-xl text-emerald-300/90 text-[11px] leading-relaxed">
                <strong>How to configure your Neon free-tier database:</strong>
                <ol className="list-decimal pl-4 mt-1 space-y-1">
                  <li>Go to your Neon Console at <code className="text-white">neon.tech</code>.</li>
                  <li>Copy the connection string (with <code className="text-white">sslmode=require</code>).</li>
                  <li>Set <code className="text-white">DATABASE_URL</code> in your environment variables.</li>
                  <li>The app will automatically run migrations and synchronize user authentication.</li>
                </ol>
              </div>

              <button
                onClick={fetchDbStatus}
                disabled={checkingDb}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checkingDb ? 'animate-spin' : ''}`} />
                <span>Test Connection (SELECT 1)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 text-center text-xs text-slate-600 flex items-center gap-2 z-10">
        <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
        <span>Bcrypt Salted Work Factor 10 & HttpOnly Session Cookies</span>
      </div>
    </div>
  );
};
