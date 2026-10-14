import React, { useState } from 'react';
import { GovernmentScheme, LanguageCode } from '../../types';
import { GOVERNMENT_SCHEMES } from '../../data/schemesData';
import { TRANSLATIONS } from '../../data/translations';
import {
  Landmark,
  Search,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface GovernmentSchemesModuleProps {
  language: LanguageCode;
}

export const GovernmentSchemesModule: React.FC<GovernmentSchemesModuleProps> = ({ language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Financial Support', 'Insurance', 'Soil & Water', 'Equipment Subsidy', 'Organic Farming'];

  const filteredSchemes = GOVERNMENT_SCHEMES.filter((scheme) => {
    const titleText = scheme.title || '';
    const descText = scheme.shortDescription || scheme.description || '';
    const codeText = scheme.code || '';
    const matchesSearch =
      titleText.toLowerCase().includes(search.toLowerCase()) ||
      descText.toLowerCase().includes(search.toLowerCase()) ||
      codeText.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5" /> Ministry of Agriculture & Farmers Welfare
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.govtSchemes}</h1>
          <p className="text-xs text-slate-400">
            Direct access to PM-KISAN, PMFBY crop insurance, Soil Health Card, and agricultural subsidies.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search scheme name or benefit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map((scheme) => {
          const shortDesc = scheme.shortDescription || scheme.description || '';
          const codeVal = scheme.code || scheme.category || 'GOVT SCHEME';
          const funding = scheme.fundingType || 'Central Sector Scheme';
          const finBenefit = scheme.financialBenefit || (scheme.benefits && scheme.benefits[0]) || 'Direct Government Financial Subsidy';
          const eligibilityList = Array.isArray(scheme.eligibility) ? scheme.eligibility.slice(0, 3) : [];
          const docs = scheme.requiredDocuments || scheme.documentsRequired || [];
          const docsList = Array.isArray(docs) ? docs.slice(0, 2) : [];
          const portalUrl = scheme.officialPortalUrl || scheme.officialUrl || 'https://agricoop.gov.in/';

          return (
            <div
              key={scheme.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-bold">
                    {codeVal}
                  </span>
                  <span className="text-[10px] text-slate-500">{funding}</span>
                </div>

                <h2 className="text-base font-bold text-white">{scheme.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{shortDesc}</p>

                {/* Financial Benefit Callout */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Financial Benefit / Subsidy</span>
                  <p className="text-xs font-semibold text-white">{finBenefit}</p>
                </div>

                {/* Eligibility Checklist */}
                {eligibilityList.length > 0 && (
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Eligibility Criteria</span>
                    {eligibilityList.map((e, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  {docsList.length > 0 ? `Docs: ${docsList.join(', ')}` : 'Standard Identity & Land Docs'}
                </span>
                <a
                  href={portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  <span>Apply Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
