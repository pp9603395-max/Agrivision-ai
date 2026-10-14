import React from 'react';
import { WeatherData, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  Sun,
  CloudRain,
  ShieldAlert,
  Info,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface WeatherModuleProps {
  weather: WeatherData | null;
  language: LanguageCode;
}

export const WeatherModule: React.FC<WeatherModuleProps> = ({ weather, language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const forecast = weather?.forecast || [
    { day: 'Today', date: '2026-08-13', tempMax: 32, tempMin: 24, rainProb: 20, condition: 'Partly Cloudy' },
    { day: 'Fri', date: '2026-08-14', tempMax: 31, tempMin: 23, rainProb: 40, condition: 'Light Drizzle' },
    { day: 'Sat', date: '2026-08-15', tempMax: 33, tempMin: 25, rainProb: 15, condition: 'Clear Sky' },
    { day: 'Sun', date: '2026-08-16', tempMax: 34, tempMin: 25, rainProb: 10, condition: 'Sunny' },
    { day: 'Mon', date: '2026-08-17', tempMax: 30, tempMin: 22, rainProb: 65, condition: 'Moderate Rain' }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
            <CloudSun className="w-3.5 h-3.5" /> Open-Meteo Satellite Feed
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.weatherIntel}</h1>
          <p className="text-xs text-slate-400">
            Micro-climatic weather predictions, rain probability, wind speed, and spray weather suitability.
          </p>
        </div>

        <div className="text-right bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-2xl font-extrabold text-white">{weather ? `${weather.temp}°C` : '29°C'}</span>
          <span className="block text-[10px] text-emerald-400 font-semibold">{weather?.weatherText || 'Partly Cloudy'}</span>
        </div>
      </div>

      {/* Main Parameters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Droplets className="w-4 h-4 text-blue-400" /> Humidity
          </div>
          <span className="text-xl font-bold text-white">{weather?.humidity || 62}%</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Wind className="w-4 h-4 text-slate-400" /> Wind Speed
          </div>
          <span className="text-xl font-bold text-white">{weather?.windSpeed || 14} km/h</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <CloudRain className="w-4 h-4 text-emerald-400" /> Precipitation
          </div>
          <span className="text-xl font-bold text-white">{weather?.rainfall || 12} mm</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Sun className="w-4 h-4 text-amber-400" /> UV Index
          </div>
          <span className="text-xl font-bold text-white">6 (Moderate)</span>
        </div>
      </div>

      {/* 5-Day Forecast Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Calendar className="w-4 h-4 text-emerald-400" /> 5-Day Weather Forecast
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {forecast.map((f, idx) => (
            <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
              <span className="block text-xs font-bold text-slate-200">{f.day}</span>
              <CloudSun className="w-6 h-6 text-amber-400 mx-auto" />
              <div className="text-xs">
                <span className="font-bold text-white">{f.tempMax}°</span>
                <span className="text-slate-500 ml-1">{f.tempMin}°</span>
              </div>
              <span className="block text-[10px] text-blue-400 font-semibold">{f.rainProb}% Rain</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spraying & Farming Weather Advisory */}
      <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-2xl space-y-2">
        <h3 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pesticide Spraying Advisory
        </h3>
        <p className="text-xs text-slate-300">
          Favorable spraying conditions expected between 07:00 AM and 10:30 AM today. Wind speed below 15 km/h ensures minimal chemical drift.
        </p>
      </div>
    </div>
  );
};
