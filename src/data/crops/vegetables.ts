import { Crop } from '../../types';

export const VEGETABLES_CROPS: Crop[] = [
  {
    id: 'crop-potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    commonNames: ['Aloo', 'Batata', 'Urulaikizhangu', 'Bangaladumpa'],
    category: 'Vegetables',
    description: 'Premier tuber crop thriving in well-aerated sandy loam soils during cool winter conditions.',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 12,
    maxTemp: 26,
    minPh: 5.2,
    maxPh: 6.8,
    minRainfall: 400,
    maxRainfall: 800,
    idealN: 120,
    idealP: 80,
    idealK: 100,
    suitableSoilTypes: ['Sandy Loam', 'Alluvial', 'Loamy'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 95,
    sowingMonths: ['October', 'November'],
    harvestMonths: ['January', 'February'],
    seedRate: '600-800 kg seed tubers/acre',
    spacing: '50 cm x 20 cm',
    expectedYieldPerAcre: '100 - 150 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 100kg + MOP 60kg + Zinc Sulphate 10kg/acre',
      topDressing: 'Urea 45kg at earthing up (30 DAP)',
      organic: 'Well-rotted FYM 8 tons/acre'
    },
    growthStages: [
      { stage: 'Tuberization', days: '30-50 days', action: 'Earthing up to cover developing tubers from sunlight' },
      { stage: 'Maturity', days: '80-95 days', action: 'Haulm cutting 10 days before harvest' }
    ],
    commonDiseases: [
      { name: 'Late Blight (Phytophthora infestans)', symptoms: 'Water-soaked brown spots on leaves with white cottony growth underneath', treatment: 'Mancozeb 75 WP @ 2.5g/L or Cymoxanil + Mancozeb @ 2g/L' }
    ],
    commonPests: [
      { name: 'Potato Tuber Moth', symptoms: 'Mined tunnels in leaves and stored tubers', treatment: 'Install pheromone traps and cover tubers with soil' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 1450,
    suitableRegions: ['Uttar Pradesh', 'West Bengal', 'Bihar', 'Punjab', 'Gujarat', 'Madhya Pradesh']
  },
  {
    id: 'crop-tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    commonNames: ['Tamatar', 'Thakkali', 'Takkali'],
    category: 'Vegetables',
    description: 'High-value solanaceous vegetable grown widely for fresh market consumption and processing.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 18,
    maxTemp: 32,
    minPh: 6.0,
    maxPh: 7.2,
    minRainfall: 500,
    maxRainfall: 1000,
    idealN: 100,
    idealP: 80,
    idealK: 80,
    suitableSoilTypes: ['Red Soil', 'Loamy', 'Alluvial', 'Sandy Loam'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 130,
    sowingMonths: ['June', 'October', 'January'],
    harvestMonths: ['September', 'January', 'April'],
    seedRate: '60-80 g/acre (Hybrid nursery)',
    spacing: '60 cm x 45 cm (Staked)',
    expectedYieldPerAcre: '150 - 250 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 75kg + MOP 40kg + Micronutrient mixture 10kg/acre',
      topDressing: '19:19:19 fertigation 5kg/acre weekly',
      organic: 'Vermicompost 3 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering & Staking', days: '30-45 days', action: 'Tying vines to bamboo stakes' },
      { stage: 'Fruiting & Harvesting', days: '60-120 days', action: 'Pick fruits at breaker/pink stage' }
    ],
    commonDiseases: [
      { name: 'Tomato Leaf Curl Virus (ToLCV)', symptoms: 'Stunted plant with upward curling and puckering of leaves', treatment: 'Vector whitefly control using Cyantraniliprole 10.26 OD @ 1.8ml/L' }
    ],
    commonPests: [
      { name: 'Fruit Borer (Helicoverpa armigera)', symptoms: 'Circular holes on fruits', treatment: 'Flubendiamide 480 SC @ 0.3ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 2200,
    suitableRegions: ['Andhra Pradesh', 'Madhya Pradesh', 'Karnataka', 'Odisha', 'Gujarat', 'Maharashtra']
  },
  {
    id: 'crop-onion',
    name: 'Onion',
    scientificName: 'Allium cepa',
    commonNames: ['Pyaz', 'Kanda', 'Vengayam', 'Ullipaya'],
    category: 'Vegetables',
    description: 'Essential bulb vegetable driving kitchen security, thriving in well-drained loamy soils.',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 13,
    maxTemp: 30,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 450,
    maxRainfall: 800,
    idealN: 80,
    idealP: 50,
    idealK: 80,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Red Soil', 'Sandy Loam'],
    suitableSeasons: ['Kharif (Monsoon)', 'Late Kharif', 'Rabi (Winter)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 125,
    sowingMonths: ['June', 'August', 'October'],
    harvestMonths: ['October', 'December', 'March'],
    seedRate: '3-4 kg/acre (Nursery)',
    spacing: '15 cm x 10 cm',
    expectedYieldPerAcre: '100 - 160 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 60kg + MOP 40kg + Elemental Sulphur 15kg/acre',
      topDressing: 'Urea 30kg at 30 DAP, Urea 30kg at 45 DAP',
      organic: 'FYM 6 tons/acre'
    },
    growthStages: [
      { stage: 'Bulb Initiation', days: '45-60 days', action: 'Maintain light micro-irrigation' },
      { stage: 'Neck Fall & Harvest', days: '110-125 days', action: 'Stop watering when 50% tops fall over naturally' }
    ],
    commonDiseases: [
      { name: 'Purple Blotch (Alternaria porri)', symptoms: 'Purplish lesions on leaf blades with yellow halos', treatment: 'Mancozeb 75 WP @ 2.5g/L + Hexaconazole 1ml/L' }
    ],
    commonPests: [
      { name: 'Thrips', symptoms: 'Silvery patches and curling leaf tips', treatment: 'Fipronil 5 SC @ 2ml/L or Spinotoram @ 0.8ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 2400,
    suitableRegions: ['Maharashtra', 'Madhya Pradesh', 'Karnataka', 'Gujarat', 'Rajasthan', 'Bihar']
  },
  {
    id: 'crop-garlic',
    name: 'Garlic',
    scientificName: 'Allium sativum',
    commonNames: ['Lahsun', 'Lassun', 'Poondu', 'Vellulli'],
    category: 'Vegetables',
    description: 'Aromatic bulb vegetable with high medicinal value grown during cool winter months.',
    imageUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 12,
    maxTemp: 28,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 400,
    maxRainfall: 750,
    idealN: 70,
    idealP: 50,
    idealK: 60,
    suitableSoilTypes: ['Loamy', 'Alluvial', 'Sandy Loam', 'Red Soil'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 140,
    sowingMonths: ['September', 'October'],
    harvestMonths: ['February', 'March'],
    seedRate: '200-250 kg cloves/acre',
    spacing: '15 cm x 8 cm',
    expectedYieldPerAcre: '30 - 50 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 60kg + MOP 30kg + Sulphur 15kg/acre',
      topDressing: 'Urea 25kg at 30 DAP, Urea 25kg at 50 DAP',
      organic: 'FYM 5 tons/acre'
    },
    growthStages: [
      { stage: 'Clove Germination', days: '0-20 days', action: 'Keep soil moist' },
      { stage: 'Bulb Maturation', days: '110-140 days', action: 'Dry curing after harvest' }
    ],
    commonDiseases: [
      { name: 'Stemphylium Leaf Blight', symptoms: 'Yellowish orange spots on leaf tips', treatment: 'Mancozeb 2.5g/L' }
    ],
    commonPests: [
      { name: 'Onion Thrips', symptoms: 'Silvery speckling on leaves', treatment: 'Imidacloprid 17.8 SL @ 0.5ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 8500,
    suitableRegions: ['Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Uttar Pradesh', 'Maharashtra']
  },
  {
    id: 'crop-carrot',
    name: 'Carrot',
    scientificName: 'Daucus carota',
    commonNames: ['Gajar', 'Gajjari', 'Carrot'],
    category: 'Vegetables',
    description: 'Beta-carotene rich root vegetable thriving in deep friable sandy loam soils.',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 12,
    maxTemp: 24,
    minPh: 6.0,
    maxPh: 7.0,
    minRainfall: 400,
    maxRainfall: 700,
    idealN: 40,
    idealP: 40,
    idealK: 50,
    suitableSoilTypes: ['Sandy Loam', 'Loamy', 'Alluvial'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 90,
    sowingMonths: ['September', 'October', 'November'],
    harvestMonths: ['December', 'January', 'February'],
    seedRate: '3-4 kg/acre',
    spacing: '30 cm x 8 cm (Ridges)',
    expectedYieldPerAcre: '80 - 120 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + MOP 30kg/acre',
      topDressing: 'Urea 20kg at 30 DAP',
      organic: 'Compost 4 tons/acre'
    },
    growthStages: [
      { stage: 'Root Enlargement', days: '40-70 days', action: 'Ensure light uniform irrigation' },
      { stage: 'Harvesting', days: '85-90 days', action: 'Pull tender roots when fully colored' }
    ],
    commonDiseases: [
      { name: 'Cercospora Leaf Blight', symptoms: 'Dark spots with yellow halos on leaves', treatment: 'Copper Oxychloride @ 2.5g/L' }
    ],
    commonPests: [
      { name: 'Carrot Rust Fly', symptoms: 'Rusted burrows in roots', treatment: 'Soil application of Neem cake' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 2200,
    suitableRegions: ['Haryana', 'Punjab', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu', 'Himachal Pradesh']
  },
  {
    id: 'crop-radish',
    name: 'Radish',
    scientificName: 'Raphanus sativus',
    commonNames: ['Mooli', 'Mula', 'Mullangi'],
    category: 'Vegetables',
    description: 'Fast-growing root vegetable maturable within 35 to 50 days.',
    imageUrl: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 10,
    maxTemp: 28,
    minPh: 5.8,
    maxPh: 7.2,
    minRainfall: 350,
    maxRainfall: 650,
    idealN: 35,
    idealP: 30,
    idealK: 35,
    suitableSoilTypes: ['Sandy Loam', 'Loamy', 'Alluvial'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 45,
    sowingMonths: ['August', 'October', 'January'],
    harvestMonths: ['September', 'November', 'February'],
    seedRate: '4-5 kg/acre',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '60 - 90 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 30kg + MOP 20kg/acre',
      topDressing: 'Urea 15kg at 20 DAP',
      organic: 'FYM 3 tons/acre'
    },
    growthStages: [
      { stage: 'Root Expansion', days: '20-35 days', action: 'Keep soil light and weeded' },
      { stage: 'Harvesting', days: '40-45 days', action: 'Pull tender crisp roots before pithiness sets in' }
    ],
    commonDiseases: [
      { name: 'White Rust', symptoms: 'White pustules on lower leaf surface', treatment: 'Mancozeb 2g/L' }
    ],
    commonPests: [
      { name: 'Flea Beetle', symptoms: 'Shot holes on tender cotyledons and leaves', treatment: 'Neem Oil @ 3ml/L' }
    ],
    marketDemand: 'Moderate',
    avgMarketPricePerQuintal: 1200,
    suitableRegions: ['West Bengal', 'Punjab', 'Bihar', 'Uttar Pradesh', 'Karnataka']
  },
  {
    id: 'crop-cabbage',
    name: 'Cabbage',
    scientificName: 'Brassica oleracea var. capitata',
    commonNames: ['Patta Gobhi', 'Band Gobhi', 'Muttaikose'],
    category: 'Vegetables',
    description: 'Cool season leafy head vegetable performing best in nutrient-rich loamy soils.',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 12,
    maxTemp: 24,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 450,
    maxRainfall: 800,
    idealN: 90,
    idealP: 50,
    idealK: 50,
    suitableSoilTypes: ['Loamy', 'Alluvial', 'Clayey', 'Red Soil'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 85,
    sowingMonths: ['September', 'October'],
    harvestMonths: ['December', 'January'],
    seedRate: '200-250 g/acre (Nursery)',
    spacing: '45 cm x 45 cm',
    expectedYieldPerAcre: '120 - 180 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 60kg + MOP 30kg/acre',
      topDressing: 'Urea 30kg at 30 DAP, Urea 30kg at head formation (45 DAP)',
      organic: 'FYM 6 tons/acre'
    },
    growthStages: [
      { stage: 'Head Initiation', days: '35-50 days', action: 'Irrigate regularly to prevent head splitting' },
      { stage: 'Head Harvest', days: '75-85 days', action: 'Harvest firm dense heads' }
    ],
    commonDiseases: [
      { name: 'Black Rot (Xanthomonas campestris)', symptoms: 'V-shaped yellow lesions on leaf margins', treatment: 'Copper Oxychloride @ 2.5g/L + Streptocycline 100ppm' }
    ],
    commonPests: [
      { name: 'Diamondback Moth (DBM)', symptoms: 'Window pane feeding damage on leaves', treatment: 'Chlorantraniliprole 18.5 SC @ 0.3ml/L or Bacillus thuringiensis (Bt)' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 1500,
    suitableRegions: ['West Bengal', 'Odisha', 'Bihar', 'Karnataka', 'Gujarat', 'Maharashtra']
  },
  {
    id: 'crop-cauliflower',
    name: 'Cauliflower',
    scientificName: 'Brassica oleracea var. botrytis',
    commonNames: ['Phool Gobhi', 'Gobi', 'Pukool'],
    category: 'Vegetables',
    description: 'High-value curd vegetable requiring moderate winter temperatures for clean white curd formation.',
    imageUrl: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 14,
    maxTemp: 25,
    minPh: 6.0,
    maxPh: 7.2,
    minRainfall: 450,
    maxRainfall: 800,
    idealN: 100,
    idealP: 60,
    idealK: 60,
    suitableSoilTypes: ['Loamy', 'Alluvial', 'Red Soil'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 90,
    sowingMonths: ['August', 'September', 'October'],
    harvestMonths: ['November', 'December', 'January'],
    seedRate: '250 g/acre (Nursery)',
    spacing: '45 cm x 45 cm',
    expectedYieldPerAcre: '100 - 150 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 60kg + MOP 30kg + Borax 4kg/acre (to prevent hollow stem)',
      topDressing: 'Urea 35kg at 30 DAP, Urea 35kg at curd initiation',
      organic: 'FYM 6 tons/acre'
    },
    growthStages: [
      { stage: 'Curd Formation', days: '45-65 days', action: 'Blanching (covering curds with outer leaves) to preserve white color' },
      { stage: 'Curd Harvesting', days: '80-90 days', action: 'Cut compact white curds with stalk' }
    ],
    commonDiseases: [
      { name: 'Downy Mildew', symptoms: 'Purplish spots on upper leaf surface with grey downy mold beneath', treatment: 'Metalaxyl + Mancozeb @ 2g/L' }
    ],
    commonPests: [
      { name: 'Tobacco Caterpillar', symptoms: 'Defoliation and curd fouling', treatment: 'Emamectin Benzoate @ 0.4g/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 1800,
    suitableRegions: ['Bihar', 'Uttar Pradesh', 'West Bengal', 'Punjab', 'Haryana', 'Odisha']
  },
  {
    id: 'crop-brinjal',
    name: 'Brinjal (Eggplant)',
    scientificName: 'Solanum melongena',
    commonNames: ['Baingan', 'Ringan', 'Kathirikai', 'Vankaya'],
    category: 'Vegetables',
    description: 'Long-fruiting warm season vegetable yielding continuous harvests over several months.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 35,
    minPh: 5.8,
    maxPh: 7.2,
    minRainfall: 500,
    maxRainfall: 1000,
    idealN: 80,
    idealP: 50,
    idealK: 50,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Black Soil (Regur)', 'Red Soil'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 140,
    sowingMonths: ['June', 'October', 'January'],
    harvestMonths: ['Continuous from 60 days to 140 days'],
    seedRate: '150-200 g/acre',
    spacing: '60 cm x 60 cm',
    expectedYieldPerAcre: '120 - 200 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 30kg/acre',
      topDressing: 'Urea 25kg after every 3rd picking',
      organic: 'FYM 5 tons/acre'
    },
    growthStages: [
      { stage: 'Vegetative & Flowering', days: '30-50 days', action: 'Pinch drooping shoots affected by shoot borer' },
      { stage: 'Continuous Harvesting', days: '60-140 days', action: 'Pick glossy tender fruits weekly' }
    ],
    commonDiseases: [
      { name: 'Little Leaf Disease', symptoms: 'Extremely reduced leaf size giving bushy appearance', treatment: 'Vector leafhopper spray with Dimethoate 1.5ml/L' }
    ],
    commonPests: [
      { name: 'Shoot & Fruit Borer (Leucinodes orbonalis)', symptoms: 'Wilted shoot tips and bored fruits filled with frass', treatment: 'Chlorantraniliprole 18.5 SC @ 0.4ml/L or Emamectin Benzoate' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 1900,
    suitableRegions: ['West Bengal', 'Odisha', 'Gujarat', 'Bihar', 'Karnataka', 'Maharashtra']
  },
  {
    id: 'crop-okra',
    name: 'Okra (Ladyfinger / Bhindi)',
    scientificName: 'Abelmoschus esculentus',
    commonNames: ['Bhindi', 'Bhendi', 'Vendakkai', 'Bhenda'],
    category: 'Vegetables',
    description: 'Fast-growing warm season vegetable giving frequent fresh pod pickings.',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 22,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 7.8,
    minRainfall: 400,
    maxRainfall: 850,
    idealN: 60,
    idealP: 40,
    idealK: 40,
    suitableSoilTypes: ['Sandy Loam', 'Alluvial', 'Loamy', 'Red Soil'],
    suitableSeasons: ['Kharif (Monsoon)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 90,
    sowingMonths: ['February', 'March', 'June', 'July'],
    harvestMonths: ['April to June', 'July to October'],
    seedRate: '4-5 kg/acre (Kharif), 7-8 kg/acre (Summer)',
    spacing: '45 cm x 30 cm',
    expectedYieldPerAcre: '50 - 80 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + MOP 20kg/acre',
      topDressing: 'Urea 20kg at 30 DAP, 20kg at 45 DAP',
      organic: 'Compost 3 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering & Fruiting', days: '35-45 days', action: 'Pick pods every 2 days when tender' },
      { stage: 'Peak Harvest', days: '45-80 days', action: 'Control whitefly transmission of YVMV' }
    ],
    commonDiseases: [
      { name: 'Yellow Vein Mosaic Virus (YVMV)', symptoms: 'Vein clearing and yellowing of foliage and dwarf pods', treatment: 'Grow YVMV resistant hybrids and spray Acetamiprid @ 50g/acre' }
    ],
    commonPests: [
      { name: 'Shoot & Fruit Borer', symptoms: 'Deformed bored pods and wilted shoots', treatment: 'Spinosad 45 SC @ 0.3ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 2500,
    suitableRegions: ['Gujarat', 'West Bengal', 'Bihar', 'Uttar Pradesh', 'Maharashtra', 'Andhra Pradesh']
  },
  {
    id: 'crop-chilli',
    name: 'Chilli (Green & Red)',
    scientificName: 'Capsicum annuum',
    commonNames: ['Mirchi', 'Green Chilli', 'Milagai', 'Mirapa'],
    category: 'Vegetables',
    description: 'Pungent spice and vegetable crop yielding both fresh green chilies and dry red pepper.',
    imageUrl: 'https://images.unsplash.com/photo-1588347818036-558601350947?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 35,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 600,
    maxRainfall: 1100,
    idealN: 100,
    idealP: 60,
    idealK: 80,
    suitableSoilTypes: ['Black Soil (Regur)', 'Red Soil', 'Loamy', 'Alluvial'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 150,
    sowingMonths: ['June', 'July', 'October'],
    harvestMonths: ['September to February'],
    seedRate: '150-200 g/acre',
    spacing: '60 cm x 45 cm',
    expectedYieldPerAcre: '60 - 100 Q (Green) / 10-15 Q (Dry Red)',
    fertilizerRecommendation: {
      basal: 'DAP 60kg + MOP 40kg + Sulphur 10kg/acre',
      topDressing: 'Urea 25kg/acre after each major picking',
      organic: 'Vermicompost 2.5 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering & Setting', days: '40-60 days', action: 'Spray Planofix @ 1ml/4.5L to prevent flower drop' },
      { stage: 'Harvesting', days: '75-150 days', action: 'Pick green chilies or allow complete ripening for red dry' }
    ],
    commonDiseases: [
      { name: 'Chilli Murda (Chilli Leaf Curl Complex)', symptoms: 'Upward/downward leaf curling and reduced leaf size', treatment: 'Diafenthiuron 50 WP @ 1g/L for mites/thrips' }
    ],
    commonPests: [
      { name: 'Chilli Thrips (Scirtothrips dorsalis)', symptoms: 'Crinkling of leaves and silvery patches on undersides', treatment: 'Spinotoram 11.7 SC @ 0.8ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 8200,
    suitableRegions: ['Andhra Pradesh', 'Telangana', 'Karnataka', 'Madhya Pradesh', 'Maharashtra', 'Gujarat']
  },
  {
    id: 'crop-capsicum',
    name: 'Capsicum (Bell Pepper)',
    scientificName: 'Capsicum annuum var. grossum',
    commonNames: ['Shimla Mirch', 'Capsicum', 'Kuda Milagai'],
    category: 'Vegetables',
    description: 'High-value sweet pepper cultivated in open fields and shade-net polyhouses.',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 16,
    maxTemp: 30,
    minPh: 6.0,
    maxPh: 7.2,
    minRainfall: 500,
    maxRainfall: 950,
    idealN: 100,
    idealP: 80,
    idealK: 80,
    suitableSoilTypes: ['Sandy Loam', 'Loamy', 'Red Soil'],
    suitableSeasons: ['Rabi (Winter)', 'Kharif (Monsoon)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 120,
    sowingMonths: ['August', 'September', 'October'],
    harvestMonths: ['November to March'],
    seedRate: '80-100 g/acre',
    spacing: '60 cm x 45 cm',
    expectedYieldPerAcre: '100 - 180 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 75kg + MOP 40kg + Micronutrient mix 10kg/acre',
      topDressing: 'Water soluble 19:19:19 fertigation 4kg/acre twice weekly',
      organic: 'Vermicompost 3 tons/acre'
    },
    growthStages: [
      { stage: 'Fruit set', days: '45-65 days', action: 'Ensure uniform drip moisture and Calcium Boron spray' },
      { stage: 'Harvesting', days: '70-120 days', action: 'Pick blocky firm green/colored peppers' }
    ],
    commonDiseases: [
      { name: 'Powdery Mildew', symptoms: 'White powdery coating on lower foliage', treatment: 'Azoxystrobin 23 SC @ 1ml/L' }
    ],
    commonPests: [
      { name: 'Mites', symptoms: 'Downward curling and thick leathery leaves', treatment: 'Abamectin 1.9 EC @ 0.5ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 4500,
    suitableRegions: ['Karnataka', 'Himachal Pradesh', 'Maharashtra', 'Tamil Nadu', 'Haryana']
  },
  {
    id: 'crop-cucumber',
    name: 'Cucumber',
    scientificName: 'Cucumis sativus',
    commonNames: ['Kheera', 'Kakdi', 'Vellarikai', 'Dosakaya'],
    category: 'Vegetables',
    description: 'Refreshing high-water vine vegetable producing crisp fruits in warm weather.',
    imageUrl: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 35,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 400,
    maxRainfall: 800,
    idealN: 50,
    idealP: 40,
    idealK: 50,
    suitableSoilTypes: ['Sandy Loam', 'Alluvial', 'Loamy'],
    suitableSeasons: ['Zaid (Summer)', 'Kharif (Monsoon)'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 60,
    sowingMonths: ['February', 'March', 'June'],
    harvestMonths: ['April', 'May', 'July', 'August'],
    seedRate: '1-1.5 kg/acre',
    spacing: '150 cm x 45 cm (Bower/Staked)',
    expectedYieldPerAcre: '60 - 100 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + MOP 25kg/acre',
      topDressing: 'Urea 20kg at vining and flowering',
      organic: 'FYM 4 tons/acre'
    },
    growthStages: [
      { stage: 'Vine Extension', days: '20-35 days', action: 'Provide trellis/staking support' },
      { stage: 'Harvesting', days: '45-60 days', action: 'Harvest crisp green cylindrical fruits every 2 days' }
    ],
    commonDiseases: [
      { name: 'Downy Mildew', symptoms: 'Yellow angular leaf lesions with purple mold beneath', treatment: 'Cymoxanil + Mancozeb @ 2g/L' }
    ],
    commonPests: [
      { name: 'Fruit Fly', symptoms: 'Punctured maggot infested decaying fruits', treatment: 'Hang Cue-lure pheromone traps @ 10/acre' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 1600,
    suitableRegions: ['Haryana', 'Karnataka', 'Uttar Pradesh', 'Maharashtra', 'Gujarat']
  },
  {
    id: 'crop-pumpkin',
    name: 'Pumpkin',
    scientificName: 'Cucurbita moschata',
    commonNames: ['Kaddu', 'Kaddoo', 'Pooshanikai', 'Gummadikaya'],
    category: 'Vegetables',
    description: 'Hardy trailing cucurbit producing large nutrient-dense storage fruits.',
    imageUrl: 'https://images.unsplash.com/photo-1506869640319-fe1a24c46118?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 36,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 400,
    maxRainfall: 850,
    idealN: 40,
    idealP: 30,
    idealK: 40,
    suitableSoilTypes: ['Sandy Loam', 'Alluvial', 'Loamy'],
    suitableSeasons: ['Kharif (Monsoon)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 110,
    sowingMonths: ['February', 'March', 'June'],
    harvestMonths: ['May', 'October'],
    seedRate: '1-1.5 kg/acre',
    spacing: '200 cm x 90 cm',
    expectedYieldPerAcre: '80 - 130 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 35kg + MOP 20kg/acre',
      topDressing: 'Urea 20kg at vine spreading',
      organic: 'FYM 4 tons/acre'
    },
    growthStages: [
      { stage: 'Vine Spreading', days: '30-50 days', action: 'Maintain basin irrigation' },
      { stage: 'Harvesting', days: '90-110 days', action: 'Harvest when rind hardens and turns orange-brown' }
    ],
    commonDiseases: [
      { name: 'Powdery Mildew', symptoms: 'White patches on leaves', treatment: 'Sulfur 80 WP @ 3g/L' }
    ],
    commonPests: [
      { name: 'Red Pumpkin Beetle', symptoms: 'Defoliation of seedlings', treatment: 'Dusting wood ash or Neem cake' }
    ],
    marketDemand: 'Moderate',
    avgMarketPricePerQuintal: 1200,
    suitableRegions: ['Tamil Nadu', 'Kerala', 'Uttar Pradesh', 'Madhya Pradesh', 'Odisha']
  },
  {
    id: 'crop-spinach',
    name: 'Spinach (Palak)',
    scientificName: 'Spinacia oleracea',
    commonNames: ['Palak', 'Spinach', 'Pasalai Keerai'],
    category: 'Vegetables',
    description: 'Iron and vitamin rich leaf vegetable giving quick multiple cuttings.',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 10,
    maxTemp: 25,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 350,
    maxRainfall: 700,
    idealN: 40,
    idealP: 20,
    idealK: 20,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Sandy Loam'],
    suitableSeasons: ['Rabi (Winter)', 'Kharif (Monsoon)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 40,
    sowingMonths: ['September', 'October', 'November'],
    harvestMonths: ['October to February (Multiple cuts)'],
    seedRate: '10-12 kg/acre',
    spacing: '20 cm lines broadcasting',
    expectedYieldPerAcre: '40 - 70 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 30kg + MOP 15kg/acre',
      topDressing: 'Urea 15kg after each cut',
      organic: 'Vermicompost 2 tons/acre'
    },
    growthStages: [
      { stage: 'First Cut', days: '25-30 days', action: 'Cut tender leaves leaving 2cm stubble for regrowth' }
    ],
    commonDiseases: [
      { name: 'Damping Off', symptoms: 'Seedling collapse at ground level', treatment: 'Seed treatment Trichoderma @ 10g/kg' }
    ],
    commonPests: [
      { name: 'Leaf Miner', symptoms: 'Mined tracks on green leaves', treatment: 'Spray Azadirachtin 10000 ppm @ 2ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 1800,
    suitableRegions: ['Punjab', 'Uttar Pradesh', 'Delhi NCR', 'Maharashtra', 'Karnataka']
  },
  {
    id: 'crop-sweet-potato',
    name: 'Sweet Potato (Shakarkand)',
    scientificName: 'Ipomoea batatas',
    commonNames: ['Shakarkand', 'Sweet Potato', 'Chini Kizhangu'],
    category: 'Vegetables',
    description: 'Drought-hardy nutrient starch vine producing rich edible storage roots.',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 35,
    minPh: 5.5,
    maxPh: 6.8,
    minRainfall: 500,
    maxRainfall: 1000,
    idealN: 40,
    idealP: 40,
    idealK: 80,
    suitableSoilTypes: ['Sandy Loam', 'Loamy', 'Red Soil'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 120,
    sowingMonths: ['June', 'July', 'October'],
    harvestMonths: ['October', 'February'],
    seedRate: '25,000 terminal vine cuttings/acre',
    spacing: '60 cm x 20 cm (Ridges)',
    expectedYieldPerAcre: '70 - 110 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 35kg + MOP 50kg/acre',
      topDressing: 'Urea 20kg at 30 DAP',
      organic: 'FYM 5 tons/acre'
    },
    growthStages: [
      { stage: 'Tuber bulking', days: '60-90 days', action: 'Earthing up ridges' },
      { stage: 'Harvesting', days: '110-120 days', action: 'Dig up tubers when leaves turn yellow' }
    ],
    commonDiseases: [
      { name: 'Black Rot', symptoms: 'Dark sunken spots on tubers', treatment: 'Dip vine cuttings in Carbendazim 1g/L' }
    ],
    commonPests: [
      { name: 'Sweet Potato Weevil', symptoms: 'Tunnels riddled in tubers giving bitter smell', treatment: 'Ridge earthing up and pheromone traps' }
    ],
    marketDemand: 'Moderate',
    avgMarketPricePerQuintal: 2100,
    suitableRegions: ['Odisha', 'Kerala', 'Uttar Pradesh', 'West Bengal', 'Karnataka']
  }
];
