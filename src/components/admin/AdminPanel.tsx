import React, { useState } from 'react';
import { User, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  ShieldCheck,
  Building2,
  Bell,
  Users,
  Database,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Send,
  Activity,
  Award,
  Sparkles
} from 'lucide-react';

interface AdminPanelProps {
  user: User;
  language: LanguageCode;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ user, language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [activeTab, setActiveTab] = useState<'overview' | 'labs' | 'broadcast' | 'benchmarks'>('overview');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const [labs, setLabs] = useState([
    {
      id: 'lab-1',
      name: 'Rajkot Soil Testing & Krishi Vigyan Kendra',
      district: 'Rajkot',
      status: 'Active',
      accreditation: 'ICAR-NABL Certified',
      pendingTests: 14
    },
    {
      id: 'lab-2',
      name: 'Junagadh Agricultural University Agronomy Lab',
      district: 'Junagadh',
      status: 'Active',
      accreditation: 'ICAR-NABL Certified',
      pendingTests: 8
    },
    {
      id: 'lab-3',
      name: 'Anand Agriculture Lab & Soil Diagnostics',
      district: 'Anand',
      status: 'Active',
      accreditation: 'State Gov Approved',
      pendingTests: 22
    }
  ]);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMessage('');
    }, 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Admin Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              {t.adminPanel} & Agricultural Oversight <Sparkles className="w-5 h-5 text-amber-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Logged in as <span className="text-amber-300 font-semibold">{user?.name || 'Administrator'}</span> (State Agricultural Authority / Senior Agronomist)
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'overview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            System Metrics
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'labs' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Soil Labs ({labs.length})
          </button>
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'broadcast' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Advisory Broadcast
          </button>
        </div>
      </div>

      {/* OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Registered Farmers</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-white mt-2">18,420</p>
              <span className="text-[10px] text-emerald-400 font-medium">↑ 12% increase this season</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Soil Samples Analyzed</span>
                <Database className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-black text-white mt-2">42,890</p>
              <span className="text-[10px] text-blue-400 font-medium">Verified by NABL Labs</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Active Mandi Commodities</span>
                <Activity className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-black text-white mt-2">124</p>
              <span className="text-[10px] text-amber-400 font-medium">Real-time Agmarknet Feed</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>AI Vision Scan Accuracy</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-black text-white mt-2">96.8%</p>
              <span className="text-[10px] text-purple-400 font-medium">Gemini 3.6 Vision Model</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" /> Agronomic Health Distribution Across Districts
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Rajkot District (Black Clay Soil)</span>
                  <span className="text-emerald-400 font-bold">88% Optimal Soil Health</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Junagadh District (Groundnut Belt)</span>
                  <span className="text-emerald-400 font-bold">92% Optimal Soil Health</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Morbi & Coastal Belt (Saline Loam)</span>
                  <span className="text-amber-400 font-bold">64% Needs Potash & Gypsum Supplementation</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '64%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LABS MANAGEMENT */}
      {activeTab === 'labs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Partnered Government & Private Soil Testing Laboratories</h3>
            <button className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Register New Lab
            </button>
          </div>

          <div className="space-y-3">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{lab.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    District: <span className="text-slate-200">{lab.district}</span> • Certification: <span className="text-emerald-400 font-semibold">{lab.accreditation}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-lg border border-blue-500/20 font-semibold">
                    {lab.pendingTests} Pending Samples
                  </span>
                  <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg font-bold">
                    {lab.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BROADCAST ADVISORY */}
      {activeTab === 'broadcast' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" /> Broadcast Emergency Advisory Push Alert
          </h3>
          <p className="text-xs text-slate-400">
            Send instant SMS/In-App warnings regarding sudden weather alerts, pest outbreaks, or PM-KISAN scheme updates directly to registered farmers.
          </p>

          {broadcastSent && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Broadcast message dispatched to 18,420 registered farmers via SMS gateway & App push notification!
            </div>
          )}

          <form onSubmit={handleSendBroadcast} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Advisory Title</label>
              <input
                type="text"
                defaultValue="Monsoon Heavy Rainfall & Pest Alert (Rajkot & Saurashtra)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Advisory Message Content</label>
              <textarea
                rows={4}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Type emergency alert in English or regional languages..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={!broadcastMessage.trim()}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-40"
            >
              <Send className="w-4 h-4" /> Dispatch Push Broadcast Alert
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
