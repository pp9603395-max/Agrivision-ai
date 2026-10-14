import { CommodityPrice } from '../types';

export const INITIAL_MARKET_PRICES: CommodityPrice[] = [
  {
    id: 'mkt-paddy',
    commodity: 'Rice (Paddy - Common)',
    category: 'Cereals',
    marketName: 'Karnal APMC',
    state: 'Haryana',
    modalPrice: 2350,
    minPrice: 2280,
    maxPrice: 2420,
    priceChange24h: 1.2,
    msp: 2300,
    updatedAt: new Date().toISOString(),
    historicalTrend: [
      { date: 'Jul 15', price: 2280 },
      { date: 'Jul 22', price: 2300 },
      { date: 'Jul 29', price: 2320 },
      { date: 'Aug 05', price: 2335 },
      { date: 'Aug 12', price: 2350 }
    ]
  },
  {
    id: 'mkt-wheat',
    commodity: 'Wheat (Sharbati / Dara)',
    category: 'Cereals',
    marketName: 'Khanna APMC',
    state: 'Punjab',
    modalPrice: 2510,
    minPrice: 2425,
    maxPrice: 2580,
    priceChange24h: 0.8,
    msp: 2425,
    updatedAt: new Date().toISOString(),
    historicalTrend: [
      { date: 'Jul 15', price: 2430 },
      { date: 'Jul 22', price: 2450 },
      { date: 'Jul 29', price: 2480 },
      { date: 'Aug 05', price: 2495 },
      { date: 'Aug 12', price: 2510 }
    ]
  },
  {
    id: 'mkt-cotton',
    commodity: 'Cotton (Medium Staple)',
    category: 'Commercial',
    marketName: 'Rajkot APMC',
    state: 'Gujarat',
    modalPrice: 7280,
    minPrice: 6900,
    maxPrice: 7550,
    priceChange24h: -0.5,
    msp: 7121,
    updatedAt: new Date().toISOString(),
    historicalTrend: [
      { date: 'Jul 15', price: 7400 },
      { date: 'Jul 22', price: 7350 },
      { date: 'Jul 29', price: 7300 },
      { date: 'Aug 05', price: 7290 },
      { date: 'Aug 12', price: 7280 }
    ]
  },
  {
    id: 'mkt-soybean',
    commodity: 'Soybean (Yellow)',
    category: 'Oilseeds',
    marketName: 'Indore Mandi',
    state: 'Madhya Pradesh',
    modalPrice: 4950,
    minPrice: 4750,
    maxPrice: 5120,
    priceChange24h: 2.1,
    msp: 4892,
    updatedAt: new Date().toISOString(),
    historicalTrend: [
      { date: 'Jul 15', price: 4780 },
      { date: 'Jul 22', price: 4820 },
      { date: 'Jul 29', price: 4890 },
      { date: 'Aug 05', price: 4910 },
      { date: 'Aug 12', price: 4950 }
    ]
  },
  {
    id: 'mkt-onion',
    commodity: 'Onion (Red Nashik)',
    category: 'Vegetables',
    marketName: 'Lasalgaon APMC',
    state: 'Maharashtra',
    modalPrice: 2950,
    minPrice: 2400,
    maxPrice: 3300,
    priceChange24h: 3.5,
    updatedAt: new Date().toISOString(),
    historicalTrend: [
      { date: 'Jul 15', price: 2400 },
      { date: 'Jul 22', price: 2550 },
      { date: 'Jul 29', price: 2700 },
      { date: 'Aug 05', price: 2850 },
      { date: 'Aug 12', price: 2950 }
    ]
  },
  {
    id: 'mkt-tomato',
    commodity: 'Tomato (Hybrid)',
    category: 'Vegetables',
    marketName: 'Kolar APMC',
    state: 'Karnataka',
    modalPrice: 2200,
    minPrice: 1800,
    maxPrice: 2600,
    priceChange24h: -1.8,
    updatedAt: new Date().toISOString(),
    historicalTrend: [
      { date: 'Jul 15', price: 2800 },
      { date: 'Jul 22', price: 2600 },
      { date: 'Jul 29', price: 2400 },
      { date: 'Aug 05', price: 2300 },
      { date: 'Aug 12', price: 2200 }
    ]
  },
  {
    id: 'mkt-turmeric',
    commodity: 'Turmeric (Finger)',
    category: 'Spices',
    marketName: 'Nizamabad Mandi',
    state: 'Telangana',
    modalPrice: 13800,
    minPrice: 12500,
    maxPrice: 14600,
    priceChange24h: 1.4,
    updatedAt: new Date().toISOString(),
    historicalTrend: [
      { date: 'Jul 15', price: 13100 },
      { date: 'Jul 22', price: 13300 },
      { date: 'Jul 29', price: 13500 },
      { date: 'Aug 05', price: 13650 },
      { date: 'Aug 12', price: 13800 }
    ]
  }
];
