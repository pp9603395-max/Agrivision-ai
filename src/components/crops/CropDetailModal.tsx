import React from 'react';
import { Crop } from '../../types';
import {
  X,
  Sprout,
  Thermometer,
  CloudSun,
  TestTube2,
  Calendar,
  Layers,
  Coins,
  ShieldAlert,
  CheckCircle2,
  Droplets
} from 'lucide-react';

interface CropDetailModalProps {
  crop: Crop | null;
  onClose: () => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({ crop, onClose }) => {
  if (!crop) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center z-10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={crop.imageUrl}
            alt={crop.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-4 left-6 space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
              {crop.category}
            </span>
            <h2 className="text-2xl font-bold text-white">{crop.name}</h2>
            <p className="text-xs text-slate-300 italic">{crop.scientificName} ({crop.commonNames.join(', ')})</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[calc(85vh-224px)] overflow-y-auto text-xs">
          {/* Description */}
          <p className="text-slate-300 leading-relaxed text-xs">{crop.description}</p>

          {/* Key Agronomic Requirements Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 block font-semibold uppercase">Temperature</span>
              <span className="text-xs font-bold text-slate-200">{crop.minTemp}°C - {crop.maxTemp}°C</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block font-semibold uppercase">Soil pH</span>
              <span className="text-xs font-bold text-slate-200">{crop.minPh} - {crop.maxPh}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block font-semibold uppercase">Rainfall</span>
              <span className="text-xs font-bold text-slate-200">{crop.minRainfall} - {crop.maxRainfall} mm</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block font-semibold uppercase">Growth Days</span>
              <span className="text-xs font-bold text-emerald-400">{crop.growthDurationDays} Days</span>
            </div>
          </div>

          {/* Suitable Soil Types & Seasons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Suitable Soil Types</span>
              <div className="flex flex-wrap gap-1.5">
                {crop.suitableSoilTypes.map((st) => (
                  <span key={st} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px]">
                    {st}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Suitable Seasons</span>
              <div className="flex flex-wrap gap-1.5">
                {crop.suitableSeasons.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-800/60 text-emerald-300 text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Growth Stages Timeline */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Major Growth Stages</h3>
            <div className="space-y-2">
              {crop.growthStages.map((stage, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold text-white block">{stage.stage}</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{stage.action}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md shrink-0">
                    {stage.days}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fertilizer Recommendation */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Fertilizer Schedule</h3>
            <div className="space-y-1.5 text-slate-300 text-[11px]">
              <p><strong className="text-slate-200">Basal Dose:</strong> {crop.fertilizerRecommendation.basal}</p>
              <p><strong className="text-slate-200">Top Dressing:</strong> {crop.fertilizerRecommendation.topDressing}</p>
              <p><strong className="text-slate-200">Organic Alternatives:</strong> {crop.fertilizerRecommendation.organic}</p>
            </div>
          </div>

          {/* Common Diseases & Pests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">Common Diseases</h3>
              {crop.commonDiseases.map((d, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-slate-200">{d.name}</span>
                  <p className="text-[10px] text-slate-400">Symptoms: {d.symptoms}</p>
                  <p className="text-[10px] text-emerald-400">Treatment: {d.treatment}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Common Pests</h3>
              {crop.commonPests.map((p, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-slate-200">{p.name}</span>
                  <p className="text-[10px] text-slate-400">Damage: {p.damage}</p>
                  <p className="text-[10px] text-emerald-400">Control: {p.control}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
