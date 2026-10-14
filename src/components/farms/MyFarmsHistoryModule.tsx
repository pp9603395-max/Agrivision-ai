import React, { useState } from 'react';
import { User, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  MapPin,
  Plus,
  FileText,
  Calendar,
  Layers,
  Sprout,
  Trash2,
  Download,
  Share2,
  CheckCircle2,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

interface MyFarmsHistoryModuleProps {
  user: User;
  language: LanguageCode;
  onOpenReport?: (farmData: any) => void;
}

export const MyFarmsHistoryModule: React.FC<MyFarmsHistoryModuleProps> = ({
  user,
  language,
  onOpenReport
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [farms, setFarms] = useState<any[]>([
    {
      id: 'f1',
      name: 'Anandpar Green Plot #1',
      sizeAcres: 3.5,
      soilType: 'Black Cotton Clay',
      location: 'Rajkot, Gujarat',
      currentCrop: 'Cotton (Bt Groundnut Rotation)',
      lastTestDate: '2026-07-28',
      npk: 'N: 180, P: 42, K: 210 kg/ha',
      pH: 7.4,
      healthScore: 88,
      status: 'Optimal Health'
    },
    {
      id: 'f2',
      name: 'Morbi Sandy Loam Farm',
      sizeAcres: 5.0,
      soilType: 'Sandy Loam',
      location: 'Morbi, Gujarat',
      currentCrop: 'Cumin (Jeera) / Wheat',
      lastTestDate: '2026-06-12',
      npk: 'N: 120, P: 28, K: 150 kg/ha',
      pH: 8.1,
      healthScore: 68,
      status: 'High Salinity Warning'
    }
  ]);

  React.useEffect(() => {
    fetch('/api/farms', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.farms) && data.farms.length > 0) {
          const formatted = data.farms.map((f: any) => ({
            id: f.id,
            name: f.farm_name || f.name,
            sizeAcres: parseFloat(f.size || f.sizeAcres || '3.0'),
            soilType: f.soil_type || f.soilType || 'Black Soil (Regur)',
            location: `${f.district || 'Rajkot'}, ${f.state || 'Gujarat'}`,
            currentCrop: f.current_season || f.currentCrop || 'Kharif Crop',
            lastTestDate: (f.created_at || new Date().toISOString()).split('T')[0],
            npk: 'N: 160, P: 35, K: 180 kg/ha',
            pH: 7.2,
            healthScore: 85,
            status: 'Database Synchronized'
          }));
          setFarms(formatted);
        }
      })
      .catch((err) => console.warn('Could not fetch user farms from API:', err));
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newFarm, setNewFarm] = useState({
    name: '',
    sizeAcres: 2.0,
    soilType: 'Black Cotton Clay',
    location: 'Rajkot, Gujarat',
    currentCrop: 'Wheat'
  });

  const handleAddFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarm.name) return;

    const farmObj = {
      id: `f-${Date.now()}`,
      name: newFarm.name,
      sizeAcres: Number(newFarm.sizeAcres),
      soilType: newFarm.soilType,
      location: newFarm.location,
      currentCrop: newFarm.currentCrop,
      lastTestDate: new Date().toISOString().split('T')[0],
      npk: 'N: 160, P: 35, K: 180 kg/ha',
      pH: 7.2,
      healthScore: 82,
      status: 'Recently Added'
    };

    setFarms([farmObj, ...farms]);
    setShowAddModal(false);

    try {
      await fetch('/api/farms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          farm_name: newFarm.name,
          size: newFarm.sizeAcres,
          state: 'Gujarat',
          district: 'Rajkot',
          soil_type: newFarm.soilType,
          current_season: newFarm.currentCrop
        })
      });
    } catch (err) {
      console.warn('Failed to sync farm to backend:', err);
    }

    setNewFarm({
      name: '',
      sizeAcres: 2.0,
      soilType: 'Black Cotton Clay',
      location: 'Rajkot, Gujarat',
      currentCrop: 'Wheat'
    });
  };

  const handleDeleteFarm = (id: string) => {
    setFarms(farms.filter((f) => f.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            {t.myFarms} & History Log <Sparkles className="w-5 h-5 text-emerald-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your registered agricultural land holdings, stored soil health cards, and historical AI crop recommendations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Farm Land
        </button>
      </div>

      {/* Grid of Registered Farms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farms.map((farm) => (
          <div
            key={farm.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{farm.name}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{farm.location}</span>
                    <span>•</span>
                    <span className="text-emerald-300 font-semibold">{farm.sizeAcres} Acres</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteFarm(farm.id)}
                className="p-1.5 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                title="Delete Farm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Farm Stats Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Soil Type</span>
                <span className="text-xs font-bold text-slate-200">{farm.soilType}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Current Crop</span>
                <span className="text-xs font-bold text-emerald-400">{farm.currentCrop}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Nutrient Balance (NPK)</span>
                <span className="text-[11px] font-semibold text-slate-300">{farm.npk}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Soil pH Value</span>
                <span className="text-xs font-bold text-amber-300">{farm.pH} pH</span>
              </div>
            </div>

            {/* Status Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Tested: {farm.lastTestDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenReport?.(farm)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>View PDF Report</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Farm Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" /> Register New Farm Land
            </h3>

            <form onSubmit={handleAddFarm} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Farm / Plot Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Riverbed Organic Field"
                  value={newFarm.name}
                  onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Area Size (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newFarm.sizeAcres}
                    onChange={(e) => setNewFarm({ ...newFarm, sizeAcres: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Soil Category</label>
                  <select
                    value={newFarm.soilType}
                    onChange={(e) => setNewFarm({ ...newFarm, soilType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Black Cotton Clay">Black Cotton Clay</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Alluvial Soil">Alluvial Soil</option>
                    <option value="Red Laterite">Red Laterite</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Location / Village</label>
                <input
                  type="text"
                  value={newFarm.location}
                  onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Current/Planned Crop</label>
                <input
                  type="text"
                  value={newFarm.currentCrop}
                  onChange={(e) => setNewFarm({ ...newFarm, currentCrop: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20"
                >
                  Save Farm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
