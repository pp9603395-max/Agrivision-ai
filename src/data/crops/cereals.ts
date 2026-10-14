import { Crop } from '../../types';

export const CEREALS_CROPS: Crop[] = [
  {
    id: 'crop-rice',
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    commonNames: ['Chawal', 'Paddy', 'Dhan', 'Nellu'],
    category: 'Cereals & Grains',
    description: 'A primary staple grain cultivated in tropical and subtropical regions requiring abundant water and clayey-loam soil.',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 37,
    minPh: 5.5,
    maxPh: 7.2,
    minRainfall: 1000,
    maxRainfall: 2500,
    idealN: 120,
    idealP: 60,
    idealK: 60,
    suitableSoilTypes: ['Alluvial', 'Clayey', 'Loamy', 'Silty Clay'],
    suitableSeasons: ['Kharif (Monsoon)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['High'],
    growthDurationDays: 120,
    sowingMonths: ['June', 'July'],
    harvestMonths: ['October', 'November'],
    seedRate: '15-20 kg/acre (Transplanting)',
    spacing: '20 cm x 15 cm',
    expectedYieldPerAcre: '20 - 28 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 30kg + Zinc Sulphate 10kg per acre',
      topDressing: 'Urea 35kg at 25 DAP, Urea 35kg at 50 DAP',
      organic: 'Farmyard Manure (FYM) 5 tons/acre during field preparation'
    },
    growthStages: [
      { stage: 'Nursery', days: '0-25 days', action: 'Maintain shallow water layer' },
      { stage: 'Tillering', days: '25-50 days', action: 'First top dressing with Urea' },
      { stage: 'Flowering', days: '75-105 days', action: 'Monitor for Stem Borer' }
    ],
    commonDiseases: [
      { name: 'Blast Disease', symptoms: 'Spindle-shaped lesions on leaves', treatment: 'Tricyclazole 75 WP @ 0.6g/L' }
    ],
    commonPests: [
      { name: 'Yellow Stem Borer', symptoms: 'Dead hearts at vegetative stage', treatment: 'Cartap Hydrochloride 4G @ 8kg/acre' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 2300,
    mspPerQuintal: 2300,
    suitableRegions: ['Punjab', 'Haryana', 'West Bengal', 'Uttar Pradesh', 'Andhra Pradesh', 'Tamil Nadu']
  },
  {
    id: 'crop-wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    commonNames: ['Gehun', 'Kanak', 'Gothumai'],
    category: 'Cereals & Grains',
    description: 'Major rabi cereal crop thriving in cool winters and well-drained fertile loamy soils.',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 12,
    maxTemp: 26,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 400,
    maxRainfall: 850,
    idealN: 120,
    idealP: 60,
    idealK: 40,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Black Soil (Regur)', 'Clayey'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 135,
    sowingMonths: ['November', 'December'],
    harvestMonths: ['March', 'April'],
    seedRate: '40-45 kg/acre',
    spacing: '22.5 cm row-to-row',
    expectedYieldPerAcre: '18 - 25 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 20kg per acre',
      topDressing: 'Urea 45kg at 21 days (CRI stage), Urea 45kg at tillering',
      organic: 'FYM 4 tons/acre'
    },
    growthStages: [
      { stage: 'Crown Root Initiation', days: '20-25 days', action: 'Critical first irrigation' },
      { stage: 'Jointing & Boot', days: '50-70 days', action: 'Top dressing Urea and second irrigation' }
    ],
    commonDiseases: [
      { name: 'Yellow Rust', symptoms: 'Yellow pustules in stripe formation on leaf blades', treatment: 'Propiconazole 25 EC @ 1ml/L' }
    ],
    commonPests: [
      { name: 'Wheat Aphid', symptoms: 'Sucking sap from ears and tender leaves', treatment: 'Thiamethoxam 25 WG @ 80g/acre' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 2275,
    mspPerQuintal: 2275,
    suitableRegions: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Bihar']
  },
  {
    id: 'crop-maize',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    commonNames: ['Makka', 'Corn', 'Butta', 'Cholam'],
    category: 'Cereals & Grains',
    description: 'Versatile cereal known as queen of cereals, grown for grain, fodder, and industrial bio-products.',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 18,
    maxTemp: 35,
    minPh: 5.8,
    maxPh: 7.8,
    minRainfall: 500,
    maxRainfall: 1100,
    idealN: 120,
    idealP: 60,
    idealK: 50,
    suitableSoilTypes: ['Loamy', 'Alluvial', 'Red Soil', 'Black Soil (Regur)'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 105,
    sowingMonths: ['June', 'July', 'October'],
    harvestMonths: ['September', 'October', 'February'],
    seedRate: '8-10 kg/acre (Hybrid)',
    spacing: '60 cm x 20 cm',
    expectedYieldPerAcre: '22 - 32 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 25kg + Zinc Sulphate 10kg/acre',
      topDressing: 'Urea 35kg at knee-high stage (30 days), Urea 35kg at tasseling stage',
      organic: 'FYM 5 tons/acre'
    },
    growthStages: [
      { stage: 'Knee High Stage', days: '30-35 days', action: 'Weeding, earthing up, top dressing' },
      { stage: 'Tasseling & Silking', days: '55-65 days', action: 'Ensure adequate soil moisture' }
    ],
    commonDiseases: [
      { name: 'Turcicum Leaf Blight', symptoms: 'Long elliptical grey-green lesions', treatment: 'Mancozeb 75 WP @ 2g/L' }
    ],
    commonPests: [
      { name: 'Fall Armyworm (FAW)', symptoms: 'Ragged whorl feeding holes with frass', treatment: 'Emamectin Benzoate 5 SG @ 80g/acre' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 2090,
    mspPerQuintal: 2090,
    suitableRegions: ['Karnataka', 'Madhya Pradesh', 'Maharashtra', 'Telangana', 'Bihar', 'Rajasthan']
  },
  {
    id: 'crop-sorghum',
    name: 'Sorghum (Jowar)',
    scientificName: 'Sorghum bicolor',
    commonNames: ['Jowar', 'Cholam', 'Jonna', 'Jola'],
    category: 'Cereals & Grains',
    description: 'Drought-tolerant climate-resilient coarse millet widely grown in drylands for food and fodder.',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-8658239e7302?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 8.5,
    minRainfall: 350,
    maxRainfall: 800,
    idealN: 80,
    idealP: 40,
    idealK: 40,
    suitableSoilTypes: ['Black Soil (Regur)', 'Loamy', 'Red Soil', 'Clayey'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 110,
    sowingMonths: ['June', 'July', 'September'],
    harvestMonths: ['October', 'January'],
    seedRate: '3-4 kg/acre',
    spacing: '45 cm x 15 cm',
    expectedYieldPerAcre: '12 - 18 Quintals',
    fertilizerRecommendation: {
      basal: 'NPK 20:20:0 50kg/acre',
      topDressing: 'Urea 25kg/acre at 30 DAP',
      organic: 'Compost 3 tons/acre'
    },
    growthStages: [
      { stage: 'Vegetative', days: '20-40 days', action: 'Thinning and weed management' },
      { stage: 'Heading & Grain Fill', days: '60-90 days', action: 'Bird scaring and pest monitoring' }
    ],
    commonDiseases: [
      { name: 'Grain Mold', symptoms: 'Pinkish or black fungal growth on grains', treatment: 'Propiconazole @ 1ml/L' }
    ],
    commonPests: [
      { name: 'Sorghum Shoot Fly', symptoms: 'Dead heart in young 1-4 week seedlings', treatment: 'Seed treatment with Imidacloprid 70 WS @ 10g/kg' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 3180,
    mspPerQuintal: 3180,
    suitableRegions: ['Maharashtra', 'Karnataka', 'Rajasthan', 'Madhya Pradesh', 'Andhra Pradesh']
  },
  {
    id: 'crop-pearl-millet',
    name: 'Pearl Millet (Bajra)',
    scientificName: 'Pennisetum glaucum',
    commonNames: ['Bajra', 'Kambu', 'Sajjalu'],
    category: 'Cereals & Grains',
    description: 'Highly heat and drought resilient nutrient-rich millet cultivated widely in arid and semi-arid light soils.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 22,
    maxTemp: 42,
    minPh: 6.5,
    maxPh: 8.5,
    minRainfall: 250,
    maxRainfall: 650,
    idealN: 60,
    idealP: 30,
    idealK: 30,
    suitableSoilTypes: ['Desert/Arid', 'Sandy Loam', 'Red Soil', 'Loamy'],
    suitableSeasons: ['Kharif (Monsoon)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Low'],
    growthDurationDays: 85,
    sowingMonths: ['June', 'July'],
    harvestMonths: ['September', 'October'],
    seedRate: '1.5-2 kg/acre',
    spacing: '45 cm x 10-15 cm',
    expectedYieldPerAcre: '10 - 16 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 30kg + MOP 15kg/acre',
      topDressing: 'Urea 25kg/acre at 30 days',
      organic: 'Farmyard manure 3 tons/acre'
    },
    growthStages: [
      { stage: 'Seedling', days: '0-20 days', action: 'Thinning to ensure single plant spacing' },
      { stage: 'Earhead Emergence', days: '45-60 days', action: 'Monitor for Downy Mildew' }
    ],
    commonDiseases: [
      { name: 'Downy Mildew (Green Ear)', symptoms: 'Leaf chlorosis and leafy deformation of earhead', treatment: 'Metalaxyl 35 SD @ 6g/kg seed treatment' }
    ],
    commonPests: [
      { name: 'Stem Borer', symptoms: 'Dead hearts and stem tunneling', treatment: 'Quinalphos 25 EC @ 2ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 2500,
    mspPerQuintal: 2500,
    suitableRegions: ['Rajasthan', 'Uttar Pradesh', 'Gujarat', 'Haryana', 'Maharashtra']
  },
  {
    id: 'crop-finger-millet',
    name: 'Finger Millet (Ragi)',
    scientificName: 'Eleusine coracana',
    commonNames: ['Ragi', 'Mandua', 'Kezhvaragu', 'Ragulu'],
    category: 'Cereals & Grains',
    description: 'Superfood millet rich in calcium and dietary fiber, flourishing in red loamy upland rainfed conditions.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 18,
    maxTemp: 34,
    minPh: 5.5,
    maxPh: 7.5,
    minRainfall: 500,
    maxRainfall: 1000,
    idealN: 50,
    idealP: 30,
    idealK: 30,
    suitableSoilTypes: ['Red Soil', 'Loamy', 'Laterite', 'Sandy Loam'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 115,
    sowingMonths: ['June', 'July', 'December'],
    harvestMonths: ['October', 'April'],
    seedRate: '2-3 kg/acre (Transplanting)',
    spacing: '22.5 cm x 10 cm',
    expectedYieldPerAcre: '10 - 15 Quintals',
    fertilizerRecommendation: {
      basal: 'SSP 100kg + MOP 20kg + Urea 20kg/acre',
      topDressing: 'Urea 20kg at 30 days',
      organic: 'Compost 4 tons/acre'
    },
    growthStages: [
      { stage: 'Nursery / Direct', days: '0-25 days', action: 'Transplant 25-day old seedlings' },
      { stage: 'Flowering & Grain Fill', days: '60-90 days', action: 'Check for Ragi Blast' }
    ],
    commonDiseases: [
      { name: 'Ragi Blast (Pyricularia grisea)', symptoms: 'Spindle spots on leaves and neck rot', treatment: 'Kasu-B (Kasugamycin) @ 2ml/L' }
    ],
    commonPests: [
      { name: 'Pink Stem Borer', symptoms: 'Drying of central shoot', treatment: 'Chlorantraniliprole 18.5 SC @ 0.3ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 3846,
    mspPerQuintal: 3846,
    suitableRegions: ['Karnataka', 'Tamil Nadu', 'Uttarakhand', 'Andhra Pradesh', 'Odisha']
  },
  {
    id: 'crop-barley',
    name: 'Barley',
    scientificName: 'Hordeum vulgare',
    commonNames: ['Jau', 'Jav'],
    category: 'Cereals & Grains',
    description: 'Resilient winter grain suited for food, malt production, and saline/alkaline rainfed soils.',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 10,
    maxTemp: 25,
    minPh: 6.5,
    maxPh: 8.5,
    minRainfall: 350,
    maxRainfall: 750,
    idealN: 60,
    idealP: 30,
    idealK: 30,
    suitableSoilTypes: ['Sandy Loam', 'Alluvial', 'Desert/Arid', 'Loamy'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 120,
    sowingMonths: ['October', 'November'],
    harvestMonths: ['March', 'April'],
    seedRate: '35-40 kg/acre',
    spacing: '22.5 cm row spacing',
    expectedYieldPerAcre: '14 - 20 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + MOP 15kg/acre',
      topDressing: 'Urea 25kg/acre at 30 days after sowing',
      organic: 'FYM 3 tons/acre'
    },
    growthStages: [
      { stage: 'Tillering', days: '25-45 days', action: 'Irrigation and weed control' },
      { stage: 'Heading & Grain filling', days: '75-100 days', action: 'Protect from aphids' }
    ],
    commonDiseases: [
      { name: 'Covered Smut', symptoms: 'Grains replaced by black spore masses', treatment: 'Seed treatment with Carboxin 75 WP @ 2g/kg' }
    ],
    commonPests: [
      { name: 'Aphids', symptoms: 'Clusters sucking leaf sap', treatment: 'Imidacloprid 17.8 SL @ 0.5ml/L' }
    ],
    marketDemand: 'Moderate',
    avgMarketPricePerQuintal: 1850,
    mspPerQuintal: 1850,
    suitableRegions: ['Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Haryana', 'Punjab']
  },
  {
    id: 'crop-oat',
    name: 'Oat',
    scientificName: 'Avena sativa',
    commonNames: ['Jai', 'Oats'],
    category: 'Cereals & Grains',
    description: 'High-value dietary grain and premium green fodder crop grown during cool rabi season.',
    imageUrl: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 12,
    maxTemp: 25,
    minPh: 5.5,
    maxPh: 7.5,
    minRainfall: 400,
    maxRainfall: 800,
    idealN: 80,
    idealP: 40,
    idealK: 30,
    suitableSoilTypes: ['Loamy', 'Alluvial', 'Clayey', 'Sandy Loam'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 110,
    sowingMonths: ['October', 'November'],
    harvestMonths: ['February', 'March'],
    seedRate: '35-40 kg/acre (Grain), 50 kg/acre (Fodder)',
    spacing: '20 cm row spacing',
    expectedYieldPerAcre: '12 - 18 Quintals (Grain), 180-220 Q (Green Fodder)',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + MOP 15kg/acre',
      topDressing: 'Urea 30kg/acre after first cut (if fodder) or at tillering',
      organic: 'FYM 4 tons/acre'
    },
    growthStages: [
      { stage: 'Vegetative', days: '20-50 days', action: 'Irrigate and top dress' },
      { stage: 'Panicle Emergence', days: '70-90 days', action: 'Ensure soil moisture' }
    ],
    commonDiseases: [
      { name: 'Crown Rust', symptoms: 'Orange-yellow pustules on leaf blades', treatment: 'Mancozeb @ 2.5g/L' }
    ],
    commonPests: [
      { name: 'Armyworm', symptoms: 'Defoliation of leaves', treatment: 'Quinalphos 25 EC @ 2ml/L' }
    ],
    marketDemand: 'Moderate',
    avgMarketPricePerQuintal: 2100,
    suitableRegions: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Himachal Pradesh']
  }
];
