import React, { useState, useEffect } from 'react';
import { MarketPrice, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  TrendingUp,
  Search,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Sparkles
} from 'lucide-react';

interface MarketModuleProps {
  language: LanguageCode;
}

export const MarketModule: React.FC<MarketModuleProps> = ({ language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState<MarketPrice | null>(null);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/market-prices');
      const data = await res.json();
      setLoading(false);
      if (res.ok && data.prices) {
        setPrices(data.prices);
        if (data.prices.length > 0) setSelectedCommodity(data.prices[0]);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const filteredPrices = prices.filter(
    (p) =>
      p.commodity?.toLowerCase().includes(search.toLowerCase()) ||
      (p.marketName || p.mandiName || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.district || p.state || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" /> APMC Agmarknet Direct API
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.marketPrices}</h1>
          <p className="text-xs text-slate-400">
            Real-time APMC Mandi price tracker, Minimum Support Price (MSP) benchmarks, and 30-day commodity price trends.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search crop or APMC Mandi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Commodity Prices List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">APMC Regional Commodities</h2>

          <div className="space-y-2">
            {filteredPrices.map((item) => {
              const isSelected = selectedCommodity?.id === item.id;
              const modalPriceVal = item.modalPrice ?? item.modalPricePerQuintal ?? 0;
              const marketNameVal = item.marketName || item.mandiName || 'APMC Mandi';
              const priceChange = item.priceChange24h ?? item.priceChangePercent ?? 0;
              const trend = item.trend || (priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : 'stable');
              const varietyVal = item.variety || item.category || 'Standard';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCommodity(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-emerald-950/30 border-emerald-500/50 shadow-lg'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{item.commodity}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                        {varietyVal}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" /> {marketNameVal}{item.district ? `, ${item.district}` : ''} ({item.state})
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-bold text-white">₹ {modalPriceVal.toLocaleString()}</span>
                    <span className="block text-[10px] text-slate-500">per Quintal</span>
                    <div className={`text-[10px] font-semibold flex items-center justify-end gap-0.5 mt-0.5 ${
                      trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                      {trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                      {trend === 'stable' && <Minus className="w-3 h-3" />}
                      <span>{priceChange > 0 ? `+${priceChange}%` : `${priceChange}%`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Commodity Detail Chart Panel */}
        <div className="space-y-4">
          {selectedCommodity ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 sticky top-20">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Price Trend Analysis</span>
                <h3 className="text-lg font-bold text-white">{selectedCommodity.commodity}</h3>
                <p className="text-xs text-slate-400">
                  {selectedCommodity.marketName || selectedCommodity.mandiName} • Govt MSP: ₹{(selectedCommodity.msp ?? selectedCommodity.mspPerQuintal)?.toLocaleString() || 'N/A'}
                </p>
              </div>

              {/* Price Area Chart */}
              <div className="w-full h-48 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedCommodity.historicalTrend || selectedCommodity.priceHistory30Days || []}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 9 }} />
                    <YAxis domain={['auto', 'auto']} tick={{ fill: '#64748b', fontSize: 9 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Min Price:</span>
                  <span className="font-semibold text-white">₹ {(selectedCommodity.minPrice ?? selectedCommodity.minPricePerQuintal ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Max Price:</span>
                  <span className="font-semibold text-white">₹ {(selectedCommodity.maxPrice ?? selectedCommodity.maxPricePerQuintal ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1 mt-1">
                  <span className="text-emerald-400 font-bold">Government MSP:</span>
                  <span className="font-bold text-emerald-400">
                    {(selectedCommodity.msp ?? selectedCommodity.mspPerQuintal) ? `₹ ${(selectedCommodity.msp ?? selectedCommodity.mspPerQuintal)?.toLocaleString()}` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
              Select a commodity to view price charts
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
