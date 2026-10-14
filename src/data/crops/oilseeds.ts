import { Crop } from '../../types';

export const OILSEEDS_CROPS: Crop[] = [
  {
    id: 'crop-groundnut',
    name: 'Groundnut (Peanut)',
    scientificName: 'Arachis hypogaea',
    commonNames: ['Moongphali', 'Mungfali', 'Verukadalai', 'Pallelu'],
    category: 'Oilseeds',
    description: 'Major oilseed and food legume requiring well-drained sandy loam soil for peg penetration and pod growth.',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 22,
    maxTemp: 35,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 500,
    maxRainfall: 1000,
    idealN: 25,
    idealP: 50,
    idealK: 40,
    suitableSoilTypes: ['Sandy Loam', 'Red Soil', 'Loamy', 'Alluvial'],
    suitableSeasons: ['Kharif (Monsoon)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 110,
    sowingMonths: ['June', 'July', 'January'],
    harvestMonths: ['October', 'November', 'May'],
    seedRate: '40-45 kg/acre (Kernels)',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '10 - 15 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + MOP 25kg + Gypsum 100kg/acre at pegging stage',
      topDressing: 'Gypsum 100kg/acre at 40-45 days (pegging) is mandatory for kernel development',
      organic: 'FYM 4 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering & Pegging', days: '35-50 days', action: 'Apply Gypsum near root zone and avoid earthing up post pegging' },
      { stage: 'Pod Maturation', days: '80-110 days', action: 'Monitor for Tikka leaf spot' }
    ],
    commonDiseases: [
      { name: 'Tikka Leaf Spot', symptoms: 'Circular dark spots with yellow halo on leaves', treatment: 'Tebuconazole 25.9 EC @ 1.5ml/L or Mancozeb 2.5g/L' }
    ],
    commonPests: [
      { name: 'White Grub', symptoms: 'Roots eaten causing wilting and death of patches', treatment: 'Soil application of Phorate 10G or Imidacloprid drenching' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 6375,
    mspPerQuintal: 6375,
    suitableRegions: ['Gujarat', 'Andhra Pradesh', 'Tamil Nadu', 'Karnataka', 'Rajasthan', 'Maharashtra']
  },
  {
    id: 'crop-mustard',
    name: 'Mustard (Sarson / Rapeseed)',
    scientificName: 'Brassica juncea',
    commonNames: ['Sarson', 'Rai', 'Kadugu', 'Avalu'],
    category: 'Oilseeds',
    description: 'Major rabi edible oilseed with yellow/brown flowers thriving in cool dry winter weather.',
    imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 10,
    maxTemp: 25,
    minPh: 6.0,
    maxPh: 7.8,
    minRainfall: 350,
    maxRainfall: 700,
    idealN: 80,
    idealP: 40,
    idealK: 40,
    suitableSoilTypes: ['Loamy', 'Alluvial', 'Sandy Loam', 'Clayey'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 125,
    sowingMonths: ['October', 'November'],
    harvestMonths: ['February', 'March'],
    seedRate: '1.5-2 kg/acre',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '8 - 12 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + MOP 15kg + Elemental Sulphur 10kg/acre',
      topDressing: 'Urea 30kg/acre at first irrigation (25-30 DAP)',
      organic: 'FYM 3 tons/acre'
    },
    growthStages: [
      { stage: 'Rosette & Flowering', days: '30-60 days', action: 'Irrigation at flowering and top dress Urea' },
      { stage: 'Pod Formation (Siliqua)', days: '70-100 days', action: 'Spray against Mustard Aphid' }
    ],
    commonDiseases: [
      { name: 'Alternaria Blight', symptoms: 'Concentric dark rings on leaves and pods', treatment: 'Mancozeb 75 WP @ 2.5g/L or Iprodione' }
    ],
    commonPests: [
      { name: 'Mustard Aphid', symptoms: 'Greenish sap-sucking insects curling inflorescence', treatment: 'Dimethoate 30 EC @ 1.5ml/L or Imidacloprid @ 0.5ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 5650,
    mspPerQuintal: 5650,
    suitableRegions: ['Rajasthan', 'Haryana', 'Madhya Pradesh', 'Uttar Pradesh', 'West Bengal', 'Punjab']
  },
  {
    id: 'crop-sesame',
    name: 'Sesame (Til)',
    scientificName: 'Sesamum indicum',
    commonNames: ['Til', 'Gingelly', 'Ellu', 'Nuvvulu'],
    category: 'Oilseeds',
    description: 'Ancient high-oil crop known for high drought tolerance and heat resistance.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 22,
    maxTemp: 38,
    minPh: 5.5,
    maxPh: 8.0,
    minRainfall: 300,
    maxRainfall: 650,
    idealN: 40,
    idealP: 20,
    idealK: 20,
    suitableSoilTypes: ['Sandy Loam', 'Loamy', 'Alluvial', 'Red Soil'],
    suitableSeasons: ['Kharif (Monsoon)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Low'],
    growthDurationDays: 85,
    sowingMonths: ['June', 'July', 'February'],
    harvestMonths: ['September', 'May'],
    seedRate: '1.5-2 kg/acre',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '3 - 5 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 25kg + Gypsum 50kg/acre',
      topDressing: 'Urea 15kg/acre at 30 DAP',
      organic: 'Compost 2 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering', days: '30-45 days', action: 'Maintain weed-free field' },
      { stage: 'Capsule Maturation', days: '65-85 days', action: 'Harvest when lower leaves turn yellow and capsules turn pale' }
    ],
    commonDiseases: [
      { name: 'Phyllody Disease', symptoms: 'Floral parts transformed into green leafy structures', treatment: 'Vector leafhopper control with Dimethoate @ 1.5ml/L' }
    ],
    commonPests: [
      { name: 'Sesame Leaf & Pod Borer', symptoms: 'Webbed leaves and bored capsules', treatment: 'Quinalphos 25 EC @ 2ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 8635,
    mspPerQuintal: 8635,
    suitableRegions: ['West Bengal', 'Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Tamil Nadu', 'Uttar Pradesh']
  },
  {
    id: 'crop-sunflower',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    commonNames: ['Surajmukhi', 'Suryakanti', 'Suriyakanthi'],
    category: 'Oilseeds',
    description: 'Day-length neutral oilseed with distinctive photo-tropic yellow flower heads producing premium polyunsaturated cooking oil.',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 18,
    maxTemp: 35,
    minPh: 6.5,
    maxPh: 8.0,
    minRainfall: 500,
    maxRainfall: 900,
    idealN: 60,
    idealP: 60,
    idealK: 40,
    suitableSoilTypes: ['Black Soil (Regur)', 'Alluvial', 'Loamy', 'Clayey'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 95,
    sowingMonths: ['June', 'October', 'January'],
    harvestMonths: ['September', 'January', 'April'],
    seedRate: '2.5-3 kg/acre (Hybrid)',
    spacing: '60 cm x 30 cm',
    expectedYieldPerAcre: '8 - 12 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 25kg + Boron 2kg/acre',
      topDressing: 'Urea 25kg at 30 days',
      organic: 'FYM 4 tons/acre'
    },
    growthStages: [
      { stage: 'Button stage', days: '35-45 days', action: 'Boron spray 0.2% for complete seed filling' },
      { stage: 'Flowering & Seed Set', days: '55-75 days', action: 'Avoid water stress during ray floret opening' }
    ],
    commonDiseases: [
      { name: 'Alternaria Leaf Spot', symptoms: 'Brown spots with concentric rings on leaves and capitulum', treatment: 'Mancozeb 75 WP @ 2.5g/L' }
    ],
    commonPests: [
      { name: 'Head Caterpillar', symptoms: 'Webbed florets and hollowed seeds', treatment: 'Chlorantraniliprole @ 0.3ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 6760,
    mspPerQuintal: 6760,
    suitableRegions: ['Karnataka', 'Odisha', 'Maharashtra', 'Andhra Pradesh', 'Bihar', 'Punjab']
  },
  {
    id: 'crop-soybean',
    name: 'Soybean',
    scientificName: 'Glycine max',
    commonNames: ['Soya', 'Soybean', 'Soya Bean'],
    category: 'Oilseeds',
    description: 'Dual-purpose miracle crop acting as both high-protein legume and major vegetable oil source.',
    imageUrl: 'https://images.unsplash.com/photo-1599307767316-77520113c23e?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 35,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 600,
    maxRainfall: 1000,
    idealN: 30,
    idealP: 60,
    idealK: 40,
    suitableSoilTypes: ['Black Soil (Regur)', 'Loamy', 'Alluvial', 'Clayey'],
    suitableSeasons: ['Kharif (Monsoon)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 100,
    sowingMonths: ['June', 'July'],
    harvestMonths: ['October', 'November'],
    seedRate: '25-30 kg/acre',
    spacing: '45 cm x 10 cm',
    expectedYieldPerAcre: '10 - 14 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 25kg + Bradyrhizobium culture',
      topDressing: 'Sulphur 10kg/acre',
      organic: 'FYM 3 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering', days: '35-50 days', action: 'Maintain soil moisture and monitor girdle beetle' },
      { stage: 'Pod Filling', days: '60-85 days', action: 'Foliar spray NPK 00:52:34 @ 5g/L' }
    ],
    commonDiseases: [
      { name: 'Yellow Mosaic Virus', symptoms: 'Yellow patches on leaves reducing photosynthesis', treatment: 'Thiamethoxam 25 WG @ 80g/acre for vector whiteflies' }
    ],
    commonPests: [
      { name: 'Girdle Beetle', symptoms: 'Girdling rings cut on petioles and stems causing plant drop', treatment: 'Chlorantraniliprole 18.5 SC @ 60ml/acre' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 4600,
    mspPerQuintal: 4600,
    suitableRegions: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Telangana']
  },
  {
    id: 'crop-safflower',
    name: 'Safflower (Kusum)',
    scientificName: 'Carthamus tinctorius',
    commonNames: ['Kusum', 'Kardi', 'Safflower'],
    category: 'Oilseeds',
    description: 'Spiny drought-resistant winter oilseed suited for deep black soils and rainfed drylands.',
    imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 14,
    maxTemp: 32,
    minPh: 6.0,
    maxPh: 8.2,
    minRainfall: 350,
    maxRainfall: 700,
    idealN: 40,
    idealP: 20,
    idealK: 20,
    suitableSoilTypes: ['Black Soil (Regur)', 'Clayey', 'Loamy'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Low'],
    growthDurationDays: 135,
    sowingMonths: ['September', 'October'],
    harvestMonths: ['February', 'March'],
    seedRate: '4-5 kg/acre',
    spacing: '45 cm x 20 cm',
    expectedYieldPerAcre: '6 - 9 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 35kg + MOP 15kg/acre',
      topDressing: 'Urea 20kg at 35 DAP',
      organic: 'Compost 2 tons/acre'
    },
    growthStages: [
      { stage: 'Rosette stage', days: '25-45 days', action: 'Inter-cultivation and weed control' },
      { stage: 'Flowering', days: '80-105 days', action: 'Avoid overhead irrigation' }
    ],
    commonDiseases: [
      { name: 'Alternaria Leaf Spot', symptoms: 'Brown circular spots on leaves with yellow haloes', treatment: 'Mancozeb @ 2.5g/L' }
    ],
    commonPests: [
      { name: 'Safflower Aphid', symptoms: 'Black aphids crowding stems and flower heads', treatment: 'Dimethoate 30 EC @ 1.5ml/L' }
    ],
    marketDemand: 'Moderate',
    avgMarketPricePerQuintal: 5800,
    mspPerQuintal: 5800,
    suitableRegions: ['Maharashtra', 'Karnataka', 'Telangana', 'Andhra Pradesh', 'Madhya Pradesh']
  },
  {
    id: 'crop-castor',
    name: 'Castor',
    scientificName: 'Ricinus communis',
    commonNames: ['Arandi', 'Erandi', 'Amanakku', 'Amudalu'],
    category: 'Oilseeds',
    description: 'Industrial non-edible oilseed producing high-value ricinoleic acid oil for lubricants and specialty chemicals.',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-8658239e7302?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 38,
    minPh: 5.8,
    maxPh: 8.0,
    minRainfall: 400,
    maxRainfall: 850,
    idealN: 60,
    idealP: 40,
    idealK: 30,
    suitableSoilTypes: ['Sandy Loam', 'Loamy', 'Red Soil', 'Alluvial'],
    suitableSeasons: ['Kharif (Monsoon)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 150,
    sowingMonths: ['July', 'August'],
    harvestMonths: ['December', 'February', 'March'],
    seedRate: '2-2.5 kg/acre (Hybrid)',
    spacing: '120 cm x 60 cm',
    expectedYieldPerAcre: '10 - 15 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + MOP 20kg + Sulphur 10kg/acre',
      topDressing: 'Urea 25kg at 30 DAP, Urea 25kg at 60 DAP',
      organic: 'Castor cake / FYM 3 tons/acre'
    },
    growthStages: [
      { stage: 'Primary Spike', days: '60-80 days', action: 'First picking of mature spikes' },
      { stage: 'Secondary Spikes', days: '100-140 days', action: 'Top dressing and pest control' }
    ],
    commonDiseases: [
      { name: 'Botrytis Grey Mold', symptoms: 'Woolly grey fungal growth covering spikes', treatment: 'Carbendazim + Mancozeb @ 2g/L' }
    ],
    commonPests: [
      { name: 'Castor Semi-Looper', symptoms: 'Defoliation leaving leaf veins intact', treatment: 'Spinosad 45 SC @ 0.3ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 5850,
    suitableRegions: ['Gujarat', 'Rajasthan', 'Andhra Pradesh', 'Telangana', 'Karnataka']
  },
  {
    id: 'crop-linseed',
    name: 'Linseed (Flaxseed / Alsi)',
    scientificName: 'Linum usitatissimum',
    commonNames: ['Alsi', 'Flax', 'Linseed', 'Ali Vidai'],
    category: 'Oilseeds',
    description: 'Rich source of omega-3 fatty acids and high-quality fiber grown under rabi conditions.',
    imageUrl: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 10,
    maxTemp: 26,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 350,
    maxRainfall: 700,
    idealN: 40,
    idealP: 20,
    idealK: 20,
    suitableSoilTypes: ['Alluvial', 'Black Soil (Regur)', 'Loamy', 'Clayey'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 120,
    sowingMonths: ['October', 'November'],
    harvestMonths: ['February', 'March'],
    seedRate: '12-15 kg/acre',
    spacing: '25 cm x 5 cm',
    expectedYieldPerAcre: '5 - 8 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 35kg + MOP 15kg/acre',
      topDressing: 'Urea 20kg at first irrigation (30 DAP)',
      organic: 'Compost 2 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering (Blue/White)', days: '45-60 days', action: 'Ensure light irrigation' },
      { stage: 'Boll Maturity', days: '90-120 days', action: 'Harvest when capsules turn golden brown' }
    ],
    commonDiseases: [
      { name: 'Linseed Rust', symptoms: 'Bright orange-red pustules on leaves and stems', treatment: 'Mancozeb @ 2.5g/L' }
    ],
    commonPests: [
      { name: 'Bud Fly', symptoms: 'Larvae feed inside flower buds preventing bloom', treatment: 'Imidacloprid 17.8 SL @ 0.5ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 5900,
    suitableRegions: ['Madhya Pradesh', 'Uttar Pradesh', 'Maharashtra', 'Bihar', 'Chhattisgarh', 'Jharkhand']
  }
];
