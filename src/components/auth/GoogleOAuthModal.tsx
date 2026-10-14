import React, { useState } from 'react';
import {
  Globe,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  X,
  Key,
  ShieldCheck,
  UserCheck,
  Sparkles
} from 'lucide-react';

interface GoogleOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateDemo: () => void;
  loading?: boolean;
}

export const GoogleOAuthModal: React.FC<GoogleOAuthModalProps> = ({
  isOpen,
  onClose,
  onSimulateDemo,
  loading = false
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = window.location.origin;
  const redirectUri = `${currentOrigin}/api/auth/google/callback`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Google Account Sign-In Setup
            </h2>
            <p className="text-xs text-slate-400">
              OAuth 2.0 integration with Neon PostgreSQL persistence
            </p>
          </div>
        </div>

        {/* Status Callout */}
        <div className="mb-5 p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Google Client ID required for live production authentication</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            AgriVision AI is fully wired with server-side OAuth endpoints (<code className="text-emerald-400 font-mono">/api/auth/google/*</code>) and automatic Neon PostgreSQL account creation. To authenticate with real Google accounts, provide your credentials.
          </p>
        </div>

        {/* Instant Test Option */}
        <div className="mb-6 p-4 bg-slate-800/80 border border-slate-700 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Instant Test (Verified Google Profile)
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Ready
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Simulate a verified Google OAuth callback to test account creation, session issuance, and Neon PostgreSQL persistence without waiting for Google Cloud Console setup.
          </p>
          <button
            onClick={onSimulateDemo}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>{loading ? 'Authenticating with Neon...' : 'Continue as Verified Google Farmer'}</span>
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-4 text-xs">
          <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-blue-400" />
            Live Google Cloud Setup Steps
          </h3>

          {/* Step 1 */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
            <div className="font-medium text-slate-200 flex items-center justify-between">
              <span>1. Create OAuth 2.0 Credentials</span>
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                Open Google Cloud Console <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-400 text-[11px]">
              Navigate to <strong>APIs & Services &gt; Credentials</strong>, click <strong>Create Credentials &gt; OAuth client ID</strong>, and select <strong>Web application</strong>.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="font-medium text-slate-200">
              2. Add Authorized JavaScript Origin
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-slate-300">
              <span className="truncate flex-1">{currentOrigin}</span>
              <button
                onClick={() => copyToClipboard(currentOrigin, 'origin')}
                className="p-1 hover:text-white text-slate-400 hover:bg-slate-800 rounded transition-colors"
                title="Copy origin"
              >
                {copiedKey === 'origin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="font-medium text-slate-200">
              3. Add Authorized Redirect URI
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-slate-300">
              <span className="truncate flex-1">{redirectUri}</span>
              <button
                onClick={() => copyToClipboard(redirectUri, 'redirect')}
                className="p-1 hover:text-white text-slate-400 hover:bg-slate-800 rounded transition-colors"
                title="Copy redirect URI"
              >
                {copiedKey === 'redirect' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
            <div className="font-medium text-slate-200">
              4. Configure Environment Variables
            </div>
            <p className="text-slate-400 text-[11px]">
              Set these variables in your environment or Secrets configuration:
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 font-mono text-[11px] text-emerald-300 space-y-1">
              <div>GOOGLE_CLIENT_ID="...apps.googleusercontent.com"</div>
              <div>GOOGLE_CLIENT_SECRET="..."</div>
              <div>GOOGLE_CALLBACK_URL="{redirectUri}"</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
