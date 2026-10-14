import React, { useState } from 'react';
import { User, LanguageCode } from '../../types';
import { LANGUAGES, TRANSLATIONS } from '../../data/translations';
import {
  Bell,
  Search,
  Globe,
  LogOut,
  MapPin,
  Sparkles,
  ChevronDown,
  Check,
  Sun,
  Moon,
  Database,
  Film
} from 'lucide-react';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onSearchQuery?: (query: string) => void;
  currentFarmName?: string;
  onOpenDbStatus?: () => void;
  onWatchIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  language,
  onLanguageChange,
  onSearchQuery,
  currentFarmName = 'Anandpar Green Farm (3.5 Acres)',
  onOpenDbStatus,
  onWatchIntro
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Monsoon Rain Alert', desc: 'Light rainfall expected in Rajkot district tomorrow afternoon.', time: '10m ago', unread: true },
    { id: '2', title: 'Market Price Surge', desc: 'Red Onion prices at Lasalgaon APMC increased by 3.5%.', time: '1h ago', unread: true },
    { id: '3', title: 'PM-KISAN Installment', desc: '17th Installment credited to linked bank account.', time: '1d ago', unread: false }
  ]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const activeLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 bg-slate-900/90 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md font-sans">
      {/* Search & Farm Selector */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search crops, diseases, market mandis, schemes..."
            onChange={(e) => onSearchQuery?.(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
          />
        </div>

        {/* Current Active Farm Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium text-slate-200 truncate max-w-[180px]">{currentFarmName}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Introductory Video Button */}
        {onWatchIntro && (
          <button
            onClick={onWatchIntro}
            title="Watch AgriVision AI Introductory Video"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 rounded-xl text-xs font-medium text-emerald-300 transition-all cursor-pointer shadow-sm"
          >
            <Film className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-[11px]">Intro Video</span>
          </button>
        )}

        {/* Neon Database Connectivity Button */}
        {onOpenDbStatus && (
          <button
            onClick={onOpenDbStatus}
            title="Neon Database Connectivity & Health Diagnostics"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/30 rounded-xl text-xs font-medium text-emerald-400 transition-all cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-[11px]">Neon DB</span>
          </button>
        )}

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-200 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeLangObj.nativeName}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 z-50">
              <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Select Language / भाषा
              </div>
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    onLanguageChange(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left hover:bg-slate-800 ${
                    language === l.code ? 'text-emerald-400 font-semibold bg-emerald-500/10' : 'text-slate-300'
                  }`}
                >
                  <span>{l.nativeName} ({l.name})</span>
                  {language === l.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-slate-300 relative transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-slate-900 animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-xs font-semibold text-slate-200">Alerts & Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] text-emerald-400 hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg border text-xs transition-all ${
                      n.unread ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-slate-950/40 border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center font-medium text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile & Logout */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
              alt={user?.name || 'User'}
              className="w-7 h-7 rounded-lg object-cover"
              referrerPolicy="no-referrer"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pr-1" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 z-50">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || ''}</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.logout}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
