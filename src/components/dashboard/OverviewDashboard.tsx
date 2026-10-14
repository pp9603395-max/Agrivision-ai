import React from 'react';
import { User, WeatherData, PredictionResult, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  Sprout,
  CloudSun,
  TestTube2,
  TrendingUp,
  ScanEye,
  Bot,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Droplets,
  Thermometer,
  Wind,
  ChevronRight,
  Landmark,
  Film
} from 'lucide-react';

interface OverviewDashboardProps {
  user?: User | null;
  weather?: WeatherData | null;
  latestPrediction?: PredictionResult | null;
  onNavigate: (tab: string) => void;
  language: LanguageCode;
  onSelectCrop?: (crop: any) => void;
  onWatchIntro?: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  user,
  weather,
  latestPrediction,
  onNavigate,
  language,
  onWatchIntro
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-900/60 via-slate-900 to-slate-900 border border-emerald-800/40 p-6 overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Farm Decision System Active
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome back, {user?.name || 'Farmer'} 👋
            </h1>
            <p className="text-xs text-slate-300">
              Optimal Kharif/Rabi sowing season window open. Soil NPK & weather parameters updated for Rajkot, Gujarat.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {onWatchIntro && (
              <button
                onClick={onWatchIntro}
                className="px-4 py-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium text-xs rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] shrink-0 cursor-pointer shadow-md"
              >
                <Film className="w-4 h-4 text-emerald-400" />
                <span>Watch Intro Video</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('recommender')}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] shrink-0 cursor-pointer"
            >
              <Sprout className="w-4 h-4" />
              <span>{t.getRecommendation}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weather Card */}
        <div
          onClick={() => onNavigate('weather')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl shadow-lg cursor-pointer transition-all hover:translate-y-[-2px] space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.weatherToday}</span>
            <CloudSun className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{weather ? `${weather.temp}°C` : '29°C'}</span>
            <span className="text-xs text-emerald-400 font-medium">{weather?.weatherText || 'Partly Cloudy'}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-400" /> {weather?.humidity || 62}%</span>
            <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-slate-400" /> {weather?.windSpeed || 14} km/h</span>
          </div>
        </div>

        {/* Soil Health Score */}
        <div
          onClick={() => onNavigate('soil')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl shadow-lg cursor-pointer transition-all hover:translate-y-[-2px] space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.soilScore}</span>
            <TestTube2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">84 / 100</span>
            <span className="text-xs text-slate-400">Good Fertility</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[84%]" />
          </div>
        </div>

        {/* Recommended Crop */}
        <div
          onClick={() => onNavigate('recommender')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl shadow-lg cursor-pointer transition-all hover:translate-y-[-2px] space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Recommended Crop</span>
            <Sprout className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white truncate">
              {latestPrediction ? latestPrediction.primaryCrop.name : 'Rice (Paddy)'}
            </span>
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{latestPrediction ? `${latestPrediction.confidenceScore}% Confidence` : '94% AI Match'}</span>
          </div>
        </div>

        {/* Market Trend */}
        <div
          onClick={() => onNavigate('market')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl shadow-lg cursor-pointer transition-all hover:translate-y-[-2px] space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Market Price Index</span>
            <TrendingUp className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">₹ 2,350</span>
            <span className="text-xs text-emerald-400 font-medium">+1.2%</span>
          </div>
          <p className="text-[11px] text-slate-400 truncate">Rice Paddy • Karnal Mandi</p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Insights & Farming Plan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Latest Recommendation Spotlight */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">AI Crop Recommendation Spotlight</h2>
              </div>
              <button
                onClick={() => onNavigate('recommender')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
              >
                New Recommendation <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <img
                src={latestPrediction ? latestPrediction.primaryCrop.imageUrl : 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=400&q=80'}
                alt="Recommended Crop"
                className="w-full sm:w-28 h-28 rounded-lg object-cover border border-slate-700 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Top AI Match</span>
                  <span className="text-xs font-bold text-white bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    {latestPrediction ? `${latestPrediction.confidenceScore}% Confidence` : '94% Score'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {latestPrediction ? latestPrediction.primaryCrop.name : 'Rice (Paddy)'}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {latestPrediction
                    ? latestPrediction.explainableAI.summary
                    : 'Optimal fit for high clayey-loam moisture retention and NPK ratio in current Kharif season.'}
                </p>
                <div className="pt-1 flex items-center gap-4 text-[11px] text-slate-400">
                  <span>Growth: 120 Days</span>
                  <span>Yield: 20-28 Q/Acre</span>
                  <span className="text-emerald-400">Market Demand: High</span>
                </div>
              </div>
            </div>

            {/* Why This Crop Accordion bullets */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-300">Why This Crop? (Explainable AI Breakdown)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(latestPrediction
                  ? latestPrediction.explainableAI.whyThisCrop
                  : [
                      'Soil pH 6.5 matches ideal absorption window for paddy.',
                      'Climate temp 29°C matches thermal growth stage requirements.',
                      'Rainfall forecast provides natural water saturation.',
                      'Sowing in current season yields maximum market returns.'
                    ]
                ).map((reason, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => onNavigate('disease')}
              className="p-4 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl cursor-pointer transition-all space-y-2 group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ScanEye className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white">{t.diseasePest}</h3>
              <p className="text-[11px] text-slate-400">Upload leaf picture for instant AI disease diagnosis and treatment plan.</p>
            </div>

            <div
              onClick={() => onNavigate('assistant')}
              className="p-4 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl cursor-pointer transition-all space-y-2 group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white">{t.aiAssistant}</h3>
              <p className="text-[11px] text-slate-400">Voice-enabled multi-lingual farming assistant in 8 regional languages.</p>
            </div>

            <div
              onClick={() => onNavigate('schemes')}
              className="p-4 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl cursor-pointer transition-all space-y-2 group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white">{t.govtSchemes}</h3>
              <p className="text-[11px] text-slate-400">Explore PM-KISAN, PMFBY, Soil Health Card and regional subsidies.</p>
            </div>
          </div>
        </div>

        {/* Right Col: Farming Tasks & Notifications */}
        <div className="space-y-6">
          {/* Calendar & Farming Tasks */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white">Upcoming Farm Tasks</h3>
              </div>
              <span className="text-[10px] text-slate-500">Aug 2026</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Basal Fertilizer Application</p>
                  <p className="text-[11px] text-slate-400">Apply DAP 50kg + MOP 30kg per acre during field plowing.</p>
                  <span className="text-[10px] text-emerald-400 mt-1 inline-block">Due Today</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Nursery Seedling Inspection</p>
                  <p className="text-[11px] text-slate-400">Check paddy seedlings for stem borer larvae activity.</p>
                  <span className="text-[10px] text-slate-400 mt-1 inline-block">Due in 3 days</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">PMFBY Crop Insurance Renewal</p>
                  <p className="text-[11px] text-slate-400">Verify KCC account linking before Kharif cut-off date.</p>
                  <span className="text-[10px] text-amber-400 mt-1 inline-block">Due in 5 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
