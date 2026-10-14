import React from 'react';
import { User, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  LayoutDashboard,
  Sprout,
  BookOpen,
  TestTube2,
  CloudSun,
  ScanEye,
  TrendingUp,
  Landmark,
  Bot,
  History,
  ShieldAlert,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  user: User;
  language: LanguageCode;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  user,
  language
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'recommender', label: t.cropRecommender, icon: Sprout, badge: 'AI' },
    { id: 'crops', label: t.cropLibrary, icon: BookOpen, count: '40+' },
    { id: 'soil', label: t.soilHealth, icon: TestTube2 },
    { id: 'weather', label: t.weatherIntel, icon: CloudSun },
    { id: 'disease', label: t.diseasePest, icon: ScanEye, badge: 'Vision' },
    { id: 'market', label: t.marketPrices, icon: TrendingUp },
    { id: 'schemes', label: t.govtSchemes, icon: Landmark },
    { id: 'assistant', label: t.aiAssistant, icon: Bot, badge: 'Voice' },
    { id: 'farms', label: t.myFarms, icon: History }
  ];

  if (user.role === 'admin') {
    navItems.push({ id: 'admin', label: t.adminPanel, icon: ShieldAlert, badge: 'Admin' });
  }

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 font-sans">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-base font-bold text-white tracking-tight truncate">{t.appName}</h1>
            <p className="text-[10px] text-emerald-400 font-medium truncate flex items-center gap-1">
              <Sparkles className="w-3 h-3 shrink-0" /> Enterprise AgOS
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  active
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="text-[10px] text-slate-500 font-semibold">{item.count}</span>
                  )}
                  {!active && <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900 border border-slate-800">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
            alt={user?.name || 'User'}
            className="w-9 h-9 rounded-lg object-cover border border-slate-700 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] text-slate-500 truncate capitalize">{user?.role || 'farmer'} • {user?.location?.state || 'Gujarat'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
