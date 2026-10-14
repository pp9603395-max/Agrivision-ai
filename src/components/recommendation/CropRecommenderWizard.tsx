import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  RecommendationInput,
  PredictionResult,
  SoilType,
  Season,
  LanguageCode,
  Crop
} from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  Sprout,
  MapPin,
  TestTube2,
  CloudSun,
  Coins,
  Upload,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Printer,
  RotateCcw,
  ShieldAlert,
  Info,
  ChevronDown
} from 'lucide-react';

interface CropRecommenderWizardProps {
  onRecommendationGenerated?: (result: PredictionResult) => void;
  onOpenReportModal?: (result: PredictionResult) => void;
  language: LanguageCode;
}

export const CropRecommenderWizard: React.FC<CropRecommenderWizardProps> = ({
  onRecommendationGenerated,
  onOpenReportModal,
  language
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  // Form State
  const [formData, setFormData] = useState<RecommendationInput>({
    farmerName: 'Rajesh Patel',
    farmerPhone: '+91 98765 43210',
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Rajkot',
      taluka: 'Kotda Sangani',
      village: 'Anandpar',
      latitude: 22.3072,
      longitude: 73.1812
    },
    farm: {
      name: 'Main Farm Plot A',
      size: 3.5,
      sizeUnit: 'Acres',
      irrigationType: 'Drip Irrigation',
      waterAvailability: 'High',
      previousCrop: 'Wheat',
      currentSeason: 'Kharif (Monsoon)',
      farmingMethod: 'Conventional',
      budgetAmount: 50000,
      marketDistanceKm: 12
    },
    soil: {
      type: 'Black Soil (Regur)',
      ph: 6.8,
      nitrogen: 110,
      phosphorus: 55,
      potassium: 50,
      organicCarbon: 0.65
    },
    climate: {
      temperature: 29,
      humidity: 65,
      rainfall: 850,
      sunlightHours: 8,
      weatherCondition: 'Partly Cloudy'
    },
    budget: 50000,
    soilReportImageUrl: ''
  });

  const [detectingGps, setDetectingGps] = useState(false);

  const handleDetectLocation = () => {
    setDetectingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              latitude: Number(pos.coords.latitude.toFixed(4)),
              longitude: Number(pos.coords.longitude.toFixed(4))
            }
          }));
          setDetectingGps(false);
        },
        () => {
          setDetectingGps(false);
        }
      );
    } else {
      setDetectingGps(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          soilReportImageUrl: String(reader.result)
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateRecommendation = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.prediction) {
        setPrediction(data.prediction);
        onRecommendationGenerated?.(data.prediction);
        setStep(8); // Display Results View

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      setLoading(false);
    }
  };

  // Soil Types options
  const soilTypes: SoilType[] = [
    'Alluvial',
    'Black Soil (Regur)',
    'Red Soil',
    'Laterite',
    'Mountain/Forest',
    'Desert/Arid',
    'Clayey',
    'Loamy',
    'Sandy Loam',
    'Silty Clay'
  ];

  const seasons: Season[] = [
    'Kharif (Monsoon)',
    'Rabi (Winter)',
    'Zaid (Summer)',
    'Year-round'
  ];

  // Radar chart dataset for NPK comparison
  const radarData = prediction
    ? [
        { subject: 'Nitrogen (N)', Soil: formData.soil.nitrogen, Ideal: prediction.primaryCrop.idealN },
        { subject: 'Phosphorus (P)', Soil: formData.soil.phosphorus * 2, Ideal: prediction.primaryCrop.idealP * 2 },
        { subject: 'Potassium (K)', Soil: formData.soil.potassium, Ideal: prediction.primaryCrop.idealK },
        { subject: 'Soil pH (x20)', Soil: formData.soil.ph * 20, Ideal: ((prediction.primaryCrop.minPh + prediction.primaryCrop.maxPh) / 2) * 20 },
        { subject: 'Water Index', Soil: formData.farm.waterAvailability === 'High' ? 100 : 60, Ideal: 90 }
      ]
    : [];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Step Indicator Header (Only during wizard) */}
      {step < 8 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Crop Recommendation Wizard
            </span>
            <span>Step {step} of 7</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step
                    ? 'bg-emerald-500 ring-2 ring-emerald-500/30'
                    : s < step
                    ? 'bg-emerald-700'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: FARMER PROFILE */}
      {step === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" /> Step 1: Farmer & Contact Details
            </h2>
            <p className="text-xs text-slate-400">Basic identification for generating personalized agricultural advisory report.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Farmer Full Name</label>
              <input
                type="text"
                value={formData.farmerName}
                onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Mobile Number</label>
              <input
                type="text"
                value={formData.farmerPhone}
                onChange={(e) => setFormData({ ...formData, farmerPhone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
            >
              <span>Next: Location Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: LOCATION & GPS */}
      {step === 2 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" /> Step 2: Farm Location & GPS Coordinates
              </h2>
              <p className="text-xs text-slate-400">Precise location enables agro-climatic region mapping and weather forecasting.</p>
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={detectingGps}
              className="px-3 py-1.5 bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-1.5 hover:bg-emerald-600/30 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{detectingGps ? 'Detecting...' : 'Auto-Detect GPS'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">State</label>
              <input
                type="text"
                value={formData.location.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, state: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">District</label>
              <input
                type="text"
                value={formData.location.district}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, district: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Village / Taluka</label>
              <input
                type="text"
                value={formData.location.village}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, village: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium flex items-center gap-2 transition-all"
            >
              <span>Next: Farm Characteristics</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: FARM INFORMATION */}
      {step === 3 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" /> Step 3: Farm Size & Cultivation Parameters
            </h2>
            <p className="text-xs text-slate-400">Specify farm size, water source, current season, and farming method.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Farm Size</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.farm.size}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      farm: { ...formData.farm, size: parseFloat(e.target.value) || 1 }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <select
                  value={formData.farm.sizeUnit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      farm: { ...formData.farm, sizeUnit: e.target.value as any }
                    })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white"
                >
                  <option value="Acres">Acres</option>
                  <option value="Hectares">Hectares</option>
                  <option value="Bigha">Bigha</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Current Season</label>
              <select
                value={formData.farm.currentSeason}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    farm: { ...formData.farm, currentSeason: e.target.value as Season }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                {seasons.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Water Availability</label>
              <select
                value={formData.farm.waterAvailability}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    farm: { ...formData.farm, waterAvailability: e.target.value as any }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="High">High (Perennial Borewell / River)</option>
                <option value="Medium">Medium (Seasonal Canal / Well)</option>
                <option value="Low">Low (Rainfed Only)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <span>Next: Soil NPK & pH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SOIL INFORMATION */}
      {step === 4 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TestTube2 className="w-5 h-5 text-emerald-400" /> Step 4: Soil Chemistry & NPK Values
            </h2>
            <p className="text-xs text-slate-400">Input soil test parameters or use average regional soil profiles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Soil Type</label>
              <select
                value={formData.soil.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    soil: { ...formData.soil, type: e.target.value as SoilType }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                {soilTypes.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              {/* pH Meter Slider */}
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Soil pH Meter</span>
                  <span className="font-bold text-emerald-400">{formData.soil.ph} pH</span>
                </div>
                <input
                  type="range"
                  min="4.5"
                  max="9.0"
                  step="0.1"
                  value={formData.soil.ph}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      soil: { ...formData.soil, ph: parseFloat(e.target.value) }
                    })
                  }
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Acidic (4.5)</span>
                  <span>Neutral (7.0)</span>
                  <span>Alkaline (9.0)</span>
                </div>
              </div>
            </div>

            {/* NPK Inputs */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">Nutrient Values (kg/ha)</span>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400">Nitrogen (N)</label>
                  <input
                    type="number"
                    value={formData.soil.nitrogen}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        soil: { ...formData.soil, nitrogen: parseInt(e.target.value) || 0 }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400">Phosphorus (P)</label>
                  <input
                    type="number"
                    value={formData.soil.phosphorus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        soil: { ...formData.soil, phosphorus: parseInt(e.target.value) || 0 }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400">Potassium (K)</label>
                  <input
                    type="number"
                    value={formData.soil.potassium}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        soil: { ...formData.soil, potassium: parseInt(e.target.value) || 0 }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <span>Next: Climate & Rainfall</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: CLIMATE & ENVIRONMENTAL */}
      {step === 5 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-emerald-400" /> Step 5: Environmental & Climate Parameters
            </h2>
            <p className="text-xs text-slate-400">Environmental factors determined via auto-geolocation weather feeds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Avg Temperature (°C)</label>
              <input
                type="number"
                value={formData.climate.temperature}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    climate: { ...formData.climate, temperature: parseFloat(e.target.value) || 25 }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Humidity (%)</label>
              <input
                type="number"
                value={formData.climate.humidity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    climate: { ...formData.climate, humidity: parseInt(e.target.value) || 60 }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Seasonal Rainfall (mm)</label>
              <input
                type="number"
                value={formData.climate.rainfall}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    climate: { ...formData.climate, rainfall: parseInt(e.target.value) || 800 }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(6)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <span>Next: Economic Factors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: ECONOMIC FACTORS */}
      {step === 6 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-400" /> Step 6: Budget & Market Economics
            </h2>
            <p className="text-xs text-slate-400">Budget constraints and APMC market proximity guidance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Investment Budget (INR)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 50000 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Nearest APMC Market Distance (km)</label>
              <input
                type="number"
                value={formData.farm.marketDistanceKm}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    farm: { ...formData.farm, marketDistanceKm: parseInt(e.target.value) || 10 }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(5)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(7)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <span>Next: Soil Report / Photo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: UPLOAD & SUBMIT */}
      {step === 7 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-400" /> Step 7: Soil Test Card or Farm Picture (Optional)
            </h2>
            <p className="text-xs text-slate-400">Attach Soil Health Card scan or farm soil picture for computer vision verification.</p>
          </div>

          <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-8 text-center bg-slate-950/40 transition-all">
            {formData.soilReportImageUrl ? (
              <div className="space-y-3">
                <img
                  src={formData.soilReportImageUrl}
                  alt="Soil Report Preview"
                  className="max-h-48 mx-auto rounded-lg border border-slate-700 shadow-lg object-contain"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, soilReportImageUrl: '' })}
                  className="text-xs text-red-400 hover:underline"
                >
                  Remove attached file
                </button>
              </div>
            ) : (
              <label className="cursor-pointer space-y-2 block">
                <Upload className="w-8 h-8 mx-auto text-emerald-400" />
                <span className="block text-xs font-semibold text-slate-300">Click to upload Soil Report / Farm Photo</span>
                <span className="block text-[10px] text-slate-500">Supports JPG, PNG, PDF (Max 10MB)</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(6)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              type="button"
              onClick={handleGenerateRecommendation}
              disabled={loading}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xl shadow-emerald-600/30 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AI Analyzing Farm Data...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Recommendation</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: PREDICTION RESULTS DISPLAY */}
      {step === 8 && prediction && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-4 border border-slate-800 rounded-2xl shadow-xl">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Start New Test
            </button>

            <button
              onClick={() => onOpenReportModal?.(prediction)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
            >
              <Printer className="w-4 h-4" /> Download / Print PDF Report
            </button>
          </div>

          {/* Primary Recommendation Card */}
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={prediction.primaryCrop.imageUrl}
                  alt={prediction.primaryCrop.name}
                  className="w-20 h-20 rounded-xl object-cover border border-emerald-500/30 shadow-lg shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Top AI Recommendation</span>
                  <h2 className="text-2xl font-bold text-white">{prediction.primaryCrop.name}</h2>
                  <p className="text-xs text-slate-400 italic">{prediction.primaryCrop.scientificName}</p>
                </div>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-xl text-center shrink-0">
                <span className="block text-[10px] font-semibold text-emerald-400 uppercase">Confidence Score</span>
                <span className="text-3xl font-extrabold text-emerald-300">{prediction.confidenceScore}%</span>
              </div>
            </div>

            {/* Radar Chart & Explainable AI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-slate-300 mb-2">Soil NPK vs Crop Optimal Radar</span>
                <div className="w-full h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
                      <Radar name="Your Soil" dataKey="Soil" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                      <Radar name="Ideal Crop Needs" dataKey="Ideal" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Explainable AI Points */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Why This Crop? (Explainable AI)</h3>
                <div className="space-y-2 text-xs">
                  {prediction.explainableAI.whyThisCrop.map((reason, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customized Fertilizer Plan */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Customized Fertilizer Schedule (Per Acre)</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="block text-[10px] text-slate-400">Urea Requirement</span>
                  <span className="text-base font-bold text-white">{prediction.fertilizerPlan.ureaKgPerAcre} kg</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="block text-[10px] text-slate-400">DAP Requirement</span>
                  <span className="text-base font-bold text-white">{prediction.fertilizerPlan.dapKgPerAcre} kg</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="block text-[10px] text-slate-400">MOP Requirement</span>
                  <span className="text-base font-bold text-white">{prediction.fertilizerPlan.mopKgPerAcre} kg</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 pt-2">
                {prediction.fertilizerPlan.schedule.map((sch, idx) => (
                  <p key={idx} className="text-[11px] text-slate-400">
                    • {sch}
                  </p>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300">Alternative Recommended Crops</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {prediction.alternativeCrops.map((alt, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{alt.crop.name}</span>
                      <span className="text-emerald-400 font-semibold">{alt.confidenceScore}%</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2">{alt.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
