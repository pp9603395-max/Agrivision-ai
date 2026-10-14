import React, { useState } from 'react';
import { DiseaseAnalysis, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  ScanEye,
  Upload,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  RotateCcw
} from 'lucide-react';

interface DiseaseDetectionModuleProps {
  language: LanguageCode;
}

export const DiseaseDetectionModule: React.FC<DiseaseDetectionModuleProps> = ({ language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropName, setCropName] = useState<string>('Paddy / Rice');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(String(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setLoading(true);

    try {
      const res = await fetch('/api/disease-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: selectedImage, cropName })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          <ScanEye className="w-3.5 h-3.5" /> AI Vision Pathologist
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">{t.diseasePest}</h1>
        <p className="text-xs text-slate-400">
          Upload a clear photograph of infected crop leaf or stem for immediate AI pathogen diagnosis and treatment.
        </p>
      </div>

      {!analysis ? (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="max-w-xs">
            <label className="block text-xs text-slate-400 mb-1">Target Crop Type</label>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="Paddy / Rice">Paddy / Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Cotton">Cotton</option>
              <option value="Tomato">Tomato</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Sugarcane">Sugarcane</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-8 text-center bg-slate-950/40 transition-all">
            {selectedImage ? (
              <div className="space-y-3">
                <img
                  src={selectedImage}
                  alt="Selected Leaf"
                  className="max-h-64 mx-auto rounded-xl border border-slate-700 shadow-xl object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-xs text-red-400 hover:underline"
                >
                  Choose Different Image
                </button>
              </div>
            ) : (
              <label className="cursor-pointer space-y-2 block">
                <Upload className="w-10 h-10 mx-auto text-emerald-400" />
                <span className="block text-xs font-semibold text-slate-300">Click or Drag Leaf Picture</span>
                <span className="block text-[10px] text-slate-500">Supports JPG, PNG (Max 10MB)</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {selectedImage && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>AI Analyzing Pathogens...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Leaf Image</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-900 p-4 border border-slate-800 rounded-2xl shadow-xl">
            <button
              onClick={() => {
                setAnalysis(null);
                setSelectedImage(null);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Scan Another Leaf
            </button>

            <span className="text-xs text-slate-400">
              Analyzed at {new Date(analysis.analyzedAt || Date.now()).toLocaleTimeString()}
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Diagnosed Condition</span>
                <h2 className="text-xl font-bold text-white">{analysis.diseaseName}</h2>
                <p className="text-xs text-slate-400">Crop: {analysis.cropNameCandidate}</p>
              </div>

              <div className="bg-red-950/60 border border-red-500/40 px-4 py-2 rounded-xl text-center">
                <span className="block text-[10px] font-semibold text-red-300 uppercase">Detection Confidence</span>
                <span className="text-xl font-bold text-red-400">{analysis.confidence}%</span>
              </div>
            </div>

            {/* Symptoms & Organic/Chemical Treatment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Organic Treatment Options</h3>
                <div className="space-y-2 text-xs">
                  {analysis.organicTreatment.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Recommended Fungicide / Chemical</h3>
                <div className="space-y-2 text-xs">
                  {analysis.chemicalTreatment.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300">
                      <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Advisory Note */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{analysis.advisoryNote}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
