import React, { useState, useEffect } from 'react';
import { Crop, CropCategory, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import { CropDetailModal } from './CropDetailModal';
import {
  BookOpen,
  Search,
  Filter,
  Sprout,
  ArrowUpRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface CropLibraryProps {
  language: LanguageCode;
  initialSearchQuery?: string;
}

export const CropLibrary: React.FC<CropLibraryProps> = ({
  language,
  initialSearchQuery = ''
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCropModal, setSelectedCropModal] = useState<Crop | null>(null);

  const categories = [
    'All',
    'Cereals & Grains',
    'Pulses',
    'Oilseeds',
    'Commercial & Fiber',
    'Vegetables',
    'Fruits',
    'Spices & Plantation',
    'Medicinal & Aromatic'
  ];

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (selectedCategory && selectedCategory !== 'All') query.append('category', selectedCategory);

      const res = await fetch(`/api/crops?${query.toString()}`);
      const data = await res.json();
      setLoading(false);
      if (res.ok && data.crops) {
        setCrops(data.crops);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [search, selectedCategory]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Extensive Crop Database
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.cropLibrary}</h1>
          <p className="text-xs text-slate-400">
            Comprehensive agronomic repository with NPK profiles, climate thresholds, disease guides, and yield targets.
          </p>
        </div>

        <div className="text-right">
          <span className="text-2xl font-extrabold text-emerald-400">{crops.length}</span>
          <span className="block text-[10px] text-slate-500 uppercase font-semibold">Crops Available</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search crop name, scientific name, or common names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crops Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-64 bg-slate-900/60 border border-slate-800/80 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : crops.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <Sprout className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">No crops match your selected search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {crops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => setSelectedCropModal(crop)}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all hover:translate-y-[-2px] flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-emerald-400 text-[10px] font-bold">
                    {crop.category}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                    {crop.growthDurationDays} Days
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {crop.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 italic truncate">{crop.scientificName}</p>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">{crop.description}</p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>NPK: {crop.idealN}:{crop.idealP}:{crop.idealK}</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View Profile <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Crop Detail Modal */}
      <CropDetailModal crop={selectedCropModal} onClose={() => setSelectedCropModal(null)} />
    </div>
  );
};
