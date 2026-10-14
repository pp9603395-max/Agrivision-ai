import React, { useState } from 'react';
import { LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  TestTube2,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Leaf
} from 'lucide-react';

interface SoilHealthModuleProps {
  language: LanguageCode;
}

export const SoilHealthModule: React.FC<SoilHealthModuleProps> = ({ language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [ph, setPh] = useState(6.8);
  const [nitrogen, setNitrogen] = useState(110);
  const [phosphorus, setPhosphorus] = useState(55);
  const [potassium, setPotassium] = useState(50);
  const [organicCarbon, setOrganicCarbon] = useState(0.65);

  // Soil Quality Index calculation
  const getQualityIndex = () => {
    let score = 100;
    if (ph < 6.0 || ph > 7.5) score -= 15;
    if (nitrogen < 120) score -= 10;
    if (phosphorus < 40) score -= 10;
    if (potassium < 40) score -= 10;
    if (organicCarbon < 0.5) score -= 15;
    return Math.max(45, score);
  };

  const score = getQualityIndex();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
            <TestTube2 className="w-3.5 h-3.5" /> Soil Chemistry Analysis
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.soilHealth}</h1>
          <p className="text-xs text-slate-400">
            Interactive NPK nutrient analyzer, pH balance meter, and custom organic fertilizer blend builder.
          </p>
        </div>

        {/* Soil Health Score Badge */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center shrink-0">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Soil Fertility Index</span>
          <span className={`text-3xl font-extrabold ${score > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {score} / 100
          </span>
          <span className="block text-[10px] text-emerald-400 mt-0.5">{score > 80 ? 'High Fertility' : 'Moderate Fertility'}</span>
        </div>
      </div>

      {/* Interactive Controls & Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders Input */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Adjust Soil Nutrient Values</h2>

          {/* pH Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Soil pH</span>
              <span className="font-bold text-emerald-400">{ph} pH</span>
            </div>
            <input
              type="range"
              min="4.5"
              max="9.0"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>4.5 (Acidic)</span>
              <span>7.0 (Optimal)</span>
              <span>9.0 (Alkaline)</span>
            </div>
          </div>

          {/* Nitrogen */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Nitrogen (N)</span>
              <span className="font-bold text-blue-400">{nitrogen} kg/ha</span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              value={nitrogen}
              onChange={(e) => setNitrogen(parseInt(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Phosphorus */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Phosphorus (P)</span>
              <span className="font-bold text-amber-400">{phosphorus} kg/ha</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              value={phosphorus}
              onChange={(e) => setPhosphorus(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Potassium */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Potassium (K)</span>
              <span className="font-bold text-purple-400">{potassium} kg/ha</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={potassium}
              onChange={(e) => setPotassium(parseInt(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Diagnostic Analysis */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Agronomic Soil Diagnosis</h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">pH Level Analysis</strong>
                <p className="text-slate-400 text-[11px]">
                  pH level of {ph} is {ph >= 6.0 && ph <= 7.5 ? 'in the optimal neutral range for maximum nutrient uptake.' : 'slightly outside optimal range. Consider adding agricultural lime or gypsum.'}
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">NPK Ratio Assessment</strong>
                <p className="text-slate-400 text-[11px]">
                  Current ratio is {nitrogen}:{phosphorus}:{potassium}. Ideal target for grain crops is 4:2:1.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <Leaf className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Organic Matter Recommendation</strong>
                <p className="text-slate-400 text-[11px]">
                  Incorporate 3-4 tons of Farmyard Manure (FYM) or Vermicompost per acre prior to seasonal sowing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
