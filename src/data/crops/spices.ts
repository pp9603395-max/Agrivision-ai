import { Crop } from '../../types';

export const SPICES_CROPS: Crop[] = [
  {
    id: 'crop-turmeric',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    commonNames: ['Haldi', 'Arishina', 'Manjal', 'Pasupu'],
    category: 'Spices & Plantation',
    description: 'Golden spice rhizome crop rich in curcumin, essential for culinary and medicinal uses.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 35,
    minPh: 5.5,
    maxPh: 7.5,
    minRainfall: 1000,
    maxRainfall: 2000,
    idealN: 100,
    idealP: 60,
    idealK: 100,
    suitableSoilTypes: ['Red Soil', 'Loamy', 'Alluvial', 'Laterite'],
    suitableSeasons: ['Kharif (Monsoon)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 240,
    sowingMonths: ['May', 'June'],
    harvestMonths: ['January', 'February', 'March'],
    seedRate: '800-1000 kg mother/finger rhizomes/acre',
    spacing: '45 cm x 20 cm (Raised beds)',
    expectedYieldPerAcre: '80 - 120 Quintals (Fresh rhizomes)',
    fertilizerRecommendation: {
      basal: 'DAP 60kg + MOP 40kg + Neem cake 200kg/acre',
      topDressing: 'Urea 35kg at 45 DAP, Urea 35kg at 90 DAP with earthing up',
      organic: 'FYM 10 tons/acre + Green leaf mulching'
    },
    growthStages: [
      { stage: 'Rhizome Development & Earthing', days: '90-150 days', action: 'Heavy organic leaf mulching and top dressing' },
      { stage: 'Harvesting', days: '230-250 days', action: 'Dig up when leaves dry and turn yellow-brown' }
    ],
    commonDiseases: [
      { name: 'Rhizome Rot (Pythium aphanidermatum)', symptoms: 'Water-soaked soft rotting of rhizomes with foul odor', treatment: 'Drench Metalaxyl + Mancozeb @ 2g/L or Trichoderma' }
    ],
    commonPests: [
      { name: 'Shoot Borer', symptoms: 'Borer holes with frass on central shoots', treatment: 'Spinosad 45 SC @ 0.3ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 8800,
    suitableRegions: ['Telangana', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Odisha', 'Assam']
  },
  {
    id: 'crop-ginger',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    commonNames: ['Adrak', 'Aada', 'Inji', 'Allam'],
    category: 'Spices & Plantation',
    description: 'High-value aromatic cash rhizome crop requiring partial shade and moist fertile organic soil.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 18,
    maxTemp: 34,
    minPh: 5.5,
    maxPh: 6.8,
    minRainfall: 1200,
    maxRainfall: 2500,
    idealN: 90,
    idealP: 50,
    idealK: 90,
    suitableSoilTypes: ['Loamy', 'Red Soil', 'Laterite', 'Sandy Loam'],
    suitableSeasons: ['Kharif (Monsoon)'],
    suitableWaterAvailability: ['High'],
    growthDurationDays: 210,
    sowingMonths: ['April', 'May'],
    harvestMonths: ['December', 'January', 'February'],
    seedRate: '600-700 kg seed rhizomes/acre',
    spacing: '30 cm x 25 cm (Raised beds)',
    expectedYieldPerAcre: '60 - 100 Quintals (Fresh)',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 40kg + Neem cake 150kg/acre',
      topDressing: 'Urea 30kg at 40 DAP, Urea 30kg at 90 DAP with heavy green leaf mulching',
      organic: 'FYM 10 tons/acre'
    },
    growthStages: [
      { stage: 'Rhizome Multiplication', days: '60-150 days', action: 'Repeat green leaf mulching (5 tons/acre) for moisture' },
      { stage: 'Harvesting', days: '210-240 days', action: 'Harvest when shoots wither completely' }
    ],
    commonDiseases: [
      { name: 'Soft Rot / Soft Rot Wilt', symptoms: 'Base of tillers soft and water-soaked, leaves turn yellow', treatment: 'Copper Oxychloride drenching @ 3g/L' }
    ],
    commonPests: [
      { name: 'Shoot Borer', symptoms: 'Yellowing of shoots due to caterpillar tunneling', treatment: 'Chlorantraniliprole 18.5 SC @ 0.3ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 6200,
    suitableRegions: ['Assam', 'Kerala', 'Meghalaya', 'Karnataka', 'Odisha', 'Himachal Pradesh']
  },
  {
    id: 'crop-coriander',
    name: 'Coriander (Dhania)',
    scientificName: 'Coriandrum sativum',
    commonNames: ['Dhania', 'Kothmir', 'Kothamalli', 'Kothimera'],
    category: 'Spices & Plantation',
    description: 'Aromatic seed spice and fresh leaf herb cultivated in cool winter dry weather.',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 12,
    maxTemp: 28,
    minPh: 6.0,
    maxPh: 8.0,
    minRainfall: 350,
    maxRainfall: 700,
    idealN: 40,
    idealP: 30,
    idealK: 20,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Black Soil (Regur)', 'Sandy Loam'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 90,
    sowingMonths: ['October', 'November'],
    harvestMonths: ['January', 'February'],
    seedRate: '8-10 kg split seeds/acre',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '4 - 7 Quintals (Seeds) / 30-40 Q (Green leaves)',
    fertilizerRecommendation: {
      basal: 'DAP 35kg + MOP 15kg/acre',
      topDressing: 'Urea 20kg at 30 DAP',
      organic: 'Compost 3 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering & Seed Setting', days: '45-70 days', action: 'Maintain light irrigation' },
      { stage: 'Seed Harvesting', days: '85-95 days', action: 'Harvest when 60% umbels turn brownish green' }
    ],
    commonDiseases: [
      { name: 'Powdery Mildew', symptoms: 'White powdery fungus coating umbels and leaves', treatment: 'Soluble Sulfur @ 3g/L or Hexaconazole 1ml/L' }
    ],
    commonPests: [
      { name: 'Aphids', symptoms: 'Colonies sucking sap from flowering umbels', treatment: 'Dimethoate 30 EC @ 1.5ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 7200,
    suitableRegions: ['Rajasthan', 'Madhya Pradesh', 'Gujarat', 'Andhra Pradesh', 'Tamil Nadu']
  },
  {
    id: 'crop-cumin',
    name: 'Cumin (Jeera)',
    scientificName: 'Cuminum cyminum',
    commonNames: ['Jeera', 'Jira', 'Jeeragam', 'Jilakarra'],
    category: 'Spices & Plantation',
    description: 'High-value delicate seed spice sensitive to humidity, flourishing in sunny arid winters.',
    imageUrl: 'https://images.unsplash.com/photo-1599307767316-77520113c23e?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 10,
    maxTemp: 26,
    minPh: 6.5,
    maxPh: 8.2,
    minRainfall: 200,
    maxRainfall: 500,
    idealN: 30,
    idealP: 20,
    idealK: 20,
    suitableSoilTypes: ['Sandy Loam', 'Desert/Arid', 'Loamy'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Low'],
    growthDurationDays: 110,
    sowingMonths: ['November'],
    harvestMonths: ['February', 'March'],
    seedRate: '5-6 kg/acre',
    spacing: '30 cm broadcasting or line sowing',
    expectedYieldPerAcre: '3 - 5 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 30kg + MOP 15kg/acre',
      topDressing: 'Urea 15kg at 30 DAP',
      organic: 'FYM 2.5 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering & Seed Fill', days: '50-85 days', action: 'Avoid overhead water; maintain dry air' },
      { stage: 'Harvesting', days: '105-115 days', action: 'Uproot plants when seeds turn greyish brown' }
    ],
    commonDiseases: [
      { name: 'Cumin Blight (Alternaria burnsii)', symptoms: 'Dark brown spots on leaves and stems drying plants', treatment: 'Mancozeb @ 2.5g/L or Difenoconazole @ 0.5ml/L' }
    ],
    commonPests: [
      { name: 'Aphids', symptoms: 'Sap sucking on delicate umbels', treatment: 'Imidacloprid 17.8 SL @ 0.5ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 28500,
    suitableRegions: ['Gujarat', 'Rajasthan']
  }
];
