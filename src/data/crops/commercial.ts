import { Crop } from '../../types';

export const COMMERCIAL_CROPS: Crop[] = [
  {
    id: 'crop-cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    commonNames: ['Kapas', 'Rui', 'Patti', 'Pathi'],
    category: 'Commercial & Fiber',
    description: 'White gold commercial cash crop requiring deep black soil, warm temperatures, and long frost-free periods.',
    imageUrl: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 21,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 8.2,
    minRainfall: 500,
    maxRainfall: 1200,
    idealN: 120,
    idealP: 60,
    idealK: 60,
    suitableSoilTypes: ['Black Soil (Regur)', 'Alluvial', 'Loamy'],
    suitableSeasons: ['Kharif (Monsoon)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 165,
    sowingMonths: ['May', 'June'],
    harvestMonths: ['November', 'December', 'January'],
    seedRate: '1.5-2 kg/acre (Bt Cotton Hybrid)',
    spacing: '90 cm x 60 cm',
    expectedYieldPerAcre: '10 - 16 Quintals (Kapas)',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 30kg + Magnesium Sulphate 10kg/acre',
      topDressing: 'Urea 35kg at square formation, Urea 35kg at flowering/bolling',
      organic: 'FYM 5 tons/acre'
    },
    growthStages: [
      { stage: 'Squaring', days: '35-50 days', action: 'Monitor for sucking pests (Jassids, Thrips)' },
      { stage: 'Boll Development & Bursting', days: '90-150 days', action: 'Pick cotton clean when bolls open fully' }
    ],
    commonDiseases: [
      { name: 'Cotton Leaf Curl Virus (CLCuV)', symptoms: 'Upward leaf curling and enation outgrowths on lower leaf veins', treatment: 'Control whitefly vector with Diafenthiuron 50 WP @ 1g/L' }
    ],
    commonPests: [
      { name: 'Pink Bollworm', symptoms: 'Rosetted flowers and stained lint inside bolls', treatment: 'Pheromone traps @ 8/acre and Profenofos 50 EC @ 2ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 7020,
    mspPerQuintal: 7020,
    suitableRegions: ['Gujarat', 'Maharashtra', 'Telangana', 'Punjab', 'Haryana', 'Karnataka', 'Rajasthan']
  },
  {
    id: 'crop-sugarcane',
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    commonNames: ['Ganna', 'Khabbu', 'Kumbu', 'Karumbu'],
    category: 'Commercial & Fiber',
    description: 'Long-duration heavy biomass cash crop providing raw sugar and bio-ethanol energy.',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 8.0,
    minRainfall: 1100,
    maxRainfall: 2200,
    idealN: 250,
    idealP: 100,
    idealK: 120,
    suitableSoilTypes: ['Alluvial', 'Black Soil (Regur)', 'Clayey', 'Loamy'],
    suitableSeasons: ['Year-round'],
    suitableWaterAvailability: ['High'],
    growthDurationDays: 360,
    sowingMonths: ['January', 'February', 'October'],
    harvestMonths: ['December', 'January', 'February'],
    seedRate: '35,000-40,000 three-budded setts/acre',
    spacing: '120 cm row-to-row (Trench method)',
    expectedYieldPerAcre: '350 - 500 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 100kg + MOP 60kg + Zinc Sulphate 15kg/acre',
      topDressing: 'Urea 75kg at 45 days, 75kg at 90 days, 75kg at earthing up (120 days)',
      organic: 'Pressmud / FYM 10 tons/acre'
    },
    growthStages: [
      { stage: 'Formative & Tillering', days: '60-120 days', action: 'Irrigate every 10-12 days and top dress nitrogen' },
      { stage: 'Grand Growth & Elongation', days: '120-270 days', action: 'Trashing lower dry leaves and propping canes' }
    ],
    commonDiseases: [
      { name: 'Red Rot (Colletotrichum falcatum)', symptoms: 'Reddening of internal pith with white transverse bands', treatment: 'Use disease-free tissue culture setts and Trichoderma viride' }
    ],
    commonPests: [
      { name: 'Early Shoot Borer', symptoms: 'Dead hearts in young tillers', treatment: 'Chlorantraniliprole 0.4G @ 7.5kg/acre in soil' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 315,
    mspPerQuintal: 315,
    suitableRegions: ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Bihar']
  },
  {
    id: 'crop-jute',
    name: 'Jute',
    scientificName: 'Corchorus olitorius',
    commonNames: ['Pat', 'Koshta', 'Pattu', 'Golden Fiber'],
    category: 'Commercial & Fiber',
    description: 'Golden natural bast fiber crop cultivated in warm humid deltaic regions with high rainfall.',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-8658239e7302?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 24,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 1200,
    maxRainfall: 2000,
    idealN: 60,
    idealP: 30,
    idealK: 30,
    suitableSoilTypes: ['Alluvial', 'Clayey', 'Silty Clay', 'Loamy'],
    suitableSeasons: ['Kharif (Monsoon)'],
    suitableWaterAvailability: ['High'],
    growthDurationDays: 130,
    sowingMonths: ['March', 'April', 'May'],
    harvestMonths: ['July', 'August', 'September'],
    seedRate: '2-2.5 kg/acre',
    spacing: '30 cm x 7 cm',
    expectedYieldPerAcre: '10 - 14 Quintals (Fiber)',
    fertilizerRecommendation: {
      basal: 'DAP 35kg + MOP 20kg/acre',
      topDressing: 'Urea 25kg at 3 weeks, 25kg at 6 weeks',
      organic: 'Compost 3 tons/acre'
    },
    growthStages: [
      { stage: 'Stem Elongation', days: '30-90 days', action: 'Thinning and weeding' },
      { stage: 'Harvest & Retting', days: '120-130 days', action: 'Harvest at 50% pod set and retting in clean water' }
    ],
    commonDiseases: [
      { name: 'Stem Rot', symptoms: 'Brown spots at stem base spreading upwards', treatment: 'Copper Oxychloride @ 3g/L' }
    ],
    commonPests: [
      { name: 'Jute Hairy Caterpillar', symptoms: 'Gregarious caterpillars defoliating leaves', treatment: 'Chlorpyrifos 20 EC @ 2ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 5050,
    mspPerQuintal: 5050,
    suitableRegions: ['West Bengal', 'Assam', 'Bihar', 'Odisha', 'Meghalaya']
  },
  {
    id: 'crop-tobacco',
    name: 'Tobacco',
    scientificName: 'Nicotiana tabacum',
    commonNames: ['Tambaku', 'Tamaku', ' புகையிலை'],
    category: 'Commercial & Fiber',
    description: 'High-value commercial leaf cash crop grown in light well-drained soils.',
    imageUrl: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 18,
    maxTemp: 32,
    minPh: 5.5,
    maxPh: 7.2,
    minRainfall: 500,
    maxRainfall: 900,
    idealN: 40,
    idealP: 60,
    idealK: 80,
    suitableSoilTypes: ['Sandy Loam', 'Red Soil', 'Loamy', 'Alluvial'],
    suitableSeasons: ['Rabi (Winter)', 'Kharif (Monsoon)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 120,
    sowingMonths: ['September', 'October'],
    harvestMonths: ['January', 'February'],
    seedRate: '30-40 g/acre (Nursery)',
    spacing: '60 cm x 45 cm',
    expectedYieldPerAcre: '8 - 12 Quintals (Cured leaf)',
    fertilizerRecommendation: {
      basal: 'SSP 150kg + Potassium Sulphate 60kg/acre',
      topDressing: 'Ammonium Sulphate in split doses',
      organic: 'FYM 4 tons/acre'
    },
    growthStages: [
      { stage: 'Topping & Desuckering', days: '60-70 days', action: 'Remove flower head and side suckers' },
      { stage: 'Priming Harvest', days: '90-120 days', action: 'Pick mature leaves turning yellow-green' }
    ],
    commonDiseases: [
      { name: 'Black Shank', symptoms: 'Blackening of stem base and wilting', treatment: 'Metalaxyl MZ @ 2g/L drenching' }
    ],
    commonPests: [
      { name: 'Tobacco Caterpillar', symptoms: 'Large holes in cured quality leaves', treatment: 'Emamectin Benzoate @ 0.4g/L' }
    ],
    marketDemand: 'Moderate',
    avgMarketPricePerQuintal: 9500,
    suitableRegions: ['Andhra Pradesh', 'Gujarat', 'Karnataka', 'Uttar Pradesh', 'Bihar']
  }
];
