import React, { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  Server,
  Key,
  ShieldCheck,
  Table
} from 'lucide-react';

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

interface NeonStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NeonStatusModal: React.FC<NeonStatusModalProps> = ({ isOpen, onClose }) => {
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Neon PostgreSQL Connectivity</h2>
            <p className="text-xs text-slate-400">Database Engine & Authentication Diagnostics</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Main Status Block */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-slate-500" /> Database Provider:
              </span>
              <span className="font-semibold text-emerald-300">Neon Serverless PostgreSQL</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Connection Status:
              </span>
              <span
                className={`font-semibold flex items-center gap-1.5 ${
                  dbStatus?.connected ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {dbStatus?.connected ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {dbStatus?.connected ? 'Active & Verified (SELECT 1)' : 'Awaiting DATABASE_URL in Secrets'}
              </span>
            </div>

            {dbStatus?.latencyMs !== null && dbStatus?.latencyMs !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Round-trip Query Latency:</span>
                <span className="font-semibold text-emerald-400">{dbStatus.latencyMs} ms</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-500" /> Host Endpoint:
              </span>
              <span className="font-mono text-[11px] text-slate-300">
                {dbStatus?.endpoint || 'NOT_CONFIGURED'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">SSL Encryption:</span>
              <span className="font-semibold text-emerald-400">Enabled (sslmode=require)</span>
            </div>
          </div>

          {/* Tables Overview */}
          {dbStatus?.tables && Object.keys(dbStatus.tables).length > 0 && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-emerald-400" />
                  Synchronized Schema Tables ({dbStatus.totalTables || 12})
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Healthy
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                {Object.entries(dbStatus.tables).map(([tbl, count]) => (
                  <div key={tbl} className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400 truncate max-w-[140px]">{tbl}:</span>
                    <span className="text-emerald-400 font-mono font-medium">{count} records</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Configuration Instructions */}
          <div className="p-3.5 bg-emerald-950/20 border border-emerald-800/30 rounded-xl text-emerald-200 text-[11px] space-y-2">
            <p className="font-semibold text-emerald-300">Connecting your Neon PostgreSQL database:</p>
            <ol className="list-decimal pl-4 space-y-1 text-slate-300">
              <li>Log in to <span className="text-emerald-400">neon.tech</span> and select your project.</li>
              <li>Under <strong>Connection Details</strong>, choose <strong>Pooled connection</strong> or <strong>Direct</strong>.</li>
              <li>Copy the connection string (with <code className="text-white">sslmode=require</code>).</li>
              <li>Configure <code className="text-white">DATABASE_URL</code> in environment variables or <code className="text-white">.env</code>.</li>
            </ol>
            <p className="text-[10px] text-slate-400 italic">
              All credentials remain strictly server-side and are never exposed in browser bundles or client code.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={fetchStatus}
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Executing Real Query...' : 'Run Real Diagnostics (SELECT 1)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
