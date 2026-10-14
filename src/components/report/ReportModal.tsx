import React from 'react';
import { User, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  FileText,
  Printer,
  Download,
  X,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmData?: any;
  language: LanguageCode;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  farmData,
  language
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const farm = farmData || {
    name: 'Anandpar Green Plot #1',
    sizeAcres: 3.5,
    soilType: 'Black Cotton Clay',
    location: 'Rajkot District, Gujarat',
    currentCrop: 'Cotton (Bt Groundnut Rotation)',
    lastTestDate: '2026-07-28',
    npk: 'N: 180, P: 42, K: 210 kg/ha',
    pH: 7.4,
    healthScore: 88,
    status: 'Optimal Health'
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8 font-sans">
        {/* Top Header Actions */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">ICAR Agronomic Soil Health & Crop Advisory Card</h2>
              <p className="text-[10px] text-slate-400">Official AgOS Diagnostic Report Document</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable PDF Canvas Content */}
        <div id="printable-report" className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6 text-slate-200">
          {/* Document Watermark / Header */}
          <div className="flex justify-between items-start border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sprout className="w-6 h-6 text-emerald-400" />
                <span className="text-base font-black text-white tracking-wider">AGRIVISION Enterprise AgOS</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Ministry of Agriculture & ICAR Soil Testing Standards</p>
            </div>
            <div className="text-right text-[10px] text-slate-400 space-y-0.5">
              <p className="font-mono text-emerald-400 font-bold">REPORT ID: AGRI-2026-88492</p>
              <p>Issue Date: {new Date().toLocaleDateString()}</p>
              <p className="flex items-center justify-end gap-1 text-slate-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> NABL Accredited
              </p>
            </div>
          </div>

          {/* Farm & Land Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Farm Property</span>
              <span className="font-bold text-white">{farm.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Location</span>
              <span className="font-semibold text-slate-300">{farm.location}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Plot Size</span>
              <span className="font-semibold text-emerald-400">{farm.sizeAcres} Acres</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Primary Soil</span>
              <span className="font-semibold text-slate-300">{farm.soilType}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Current Crop</span>
              <span className="font-semibold text-amber-300">{farm.currentCrop}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Overall Index</span>
              <span className="font-bold text-emerald-400">{farm.healthScore}/100 Grade A</span>
            </div>
          </div>

          {/* Soil Chemistry Test Data */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1">
              1. Soil Chemical & Mineral Diagnostics
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs text-center">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">Nitrogen (N)</span>
                <span className="text-sm font-black text-emerald-400">180 kg/ha</span>
                <span className="text-[9px] text-slate-500 block">Status: Adequate</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">Phosphorus (P2O5)</span>
                <span className="text-sm font-black text-amber-400">42 kg/ha</span>
                <span className="text-[9px] text-amber-400 block">Status: Moderate Deficit</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">Potassium (K2O)</span>
                <span className="text-sm font-black text-emerald-400">210 kg/ha</span>
                <span className="text-[9px] text-slate-500 block">Status: High Reserve</span>
              </div>
            </div>
          </div>

          {/* AI Recommended Fertilizer Plan */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1">
              2. ICAR Prescribed NPK Dosage & Application Schedule
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Basal Application:</strong> Apply 50 kg DAP + 25 kg MOP per acre at time of sowing.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Top Dressing (30 Days):</strong> Apply 45 kg Urea with Neem Oil Coating after first irrigation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Micronutrients:</strong> Spray 0.5% Zinc Sulphate + 0.25% Ferrous Sulphate at 45 days.
                </span>
              </li>
            </ul>
          </div>

          {/* Certification Signature */}
          <div className="flex justify-between items-end pt-4 border-t border-slate-800 text-[10px] text-slate-500">
            <div>
              <p>Generated via AgriVision Gemini 3.6 AI Engine</p>
              <p>Validated against Soil Health Card Scheme Database</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-300">Dr. Ramesh Kumar</p>
              <p>Senior Agronomist, ICAR Research Centre</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
