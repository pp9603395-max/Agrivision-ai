import { Crop } from '../../types';

export const PULSES_CROPS: Crop[] = [
  {
    id: 'crop-chickpea',
    name: 'Chickpea (Gram / Chana)',
    scientificName: 'Cicer arietinum',
    commonNames: ['Chana', 'Gram', 'Bengal Gram', 'Kondai Kadalai'],
    category: 'Pulses',
    description: 'Premier rabi pulse crop fixing atmospheric nitrogen, essential for soil fertility and protein security.',
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 15,
    maxTemp: 30,
    minPh: 6.0,
    maxPh: 8.0,
    minRainfall: 300,
    maxRainfall: 700,
    idealN: 20,
    idealP: 50,
    idealK: 20,
    suitableSoilTypes: ['Black Soil (Regur)', 'Loamy', 'Sandy Loam', 'Alluvial'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 110,
    sowingMonths: ['October', 'November'],
    harvestMonths: ['February', 'March'],
    seedRate: '25-30 kg/acre (Desi), 35-40 kg/acre (Kabuli)',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '8 - 12 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + MOP 15kg + Rhizobium seed inoculant',
      topDressing: 'Foliar spray of 2% DAP or NPK 19:19:19 at flowering',
      organic: 'Vermicompost 1.5 tons/acre'
    },
    growthStages: [
      { stage: 'Branching', days: '25-35 days', action: 'Nipping of terminal buds to encourage side branching' },
      { stage: 'Pod Formation', days: '70-90 days', action: 'Install pheromone traps for Helicoverpa borer' }
    ],
    commonDiseases: [
      { name: 'Fusarium Wilt', symptoms: 'Drooping of leaves and dark internal vascular discoloration', treatment: 'Seed treatment with Trichoderma harzianum @ 10g/kg' }
    ],
    commonPests: [
      { name: 'Gram Pod Borer (Helicoverpa armigera)', symptoms: 'Circular bore holes in pods', treatment: 'HaNPV @ 250 LE/acre or Chlorantraniliprole 18.5 SC @ 60ml/acre' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 5440,
    mspPerQuintal: 5440,
    suitableRegions: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh', 'Karnataka']
  },
  {
    id: 'crop-pigeon-pea',
    name: 'Pigeon Pea (Tur / Arhar)',
    scientificName: 'Cajanus cajan',
    commonNames: ['Arhar', 'Tur', 'Toovar', 'Red Gram'],
    category: 'Pulses',
    description: 'Deep-rooted long-duration Kharif pulse ideal for intercropping with cotton, soybean, or sorghum.',
    imageUrl: 'https://images.unsplash.com/photo-1588615419955-e837a285d8aa?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 8.0,
    minRainfall: 600,
    maxRainfall: 1000,
    idealN: 20,
    idealP: 50,
    idealK: 20,
    suitableSoilTypes: ['Black Soil (Regur)', 'Alluvial', 'Loamy', 'Red Soil'],
    suitableSeasons: ['Kharif (Monsoon)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 160,
    sowingMonths: ['June', 'July'],
    harvestMonths: ['December', 'January'],
    seedRate: '5-6 kg/acre (Sole crop), 2 kg/acre (Intercrop)',
    spacing: '90 cm x 20 cm',
    expectedYieldPerAcre: '7 - 10 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + Sulphur 10kg/acre',
      topDressing: 'Foliar spray 1% Urea at flowering',
      organic: 'FYM 3 tons/acre'
    },
    growthStages: [
      { stage: 'Vegetative Growth', days: '30-70 days', action: 'Weed management and inter-cultivation' },
      { stage: 'Pod Development', days: '120-150 days', action: 'Monitor for pod fly and caterpillar' }
    ],
    commonDiseases: [
      { name: 'Sterility Mosaic Disease', symptoms: 'Bushy light green foliage with complete suppression of flowering', treatment: 'Control vector mite with Fenazaquin @ 2ml/L' }
    ],
    commonPests: [
      { name: 'Pod Fly', symptoms: 'Maggots feeding on developing seeds inside pods', treatment: 'Monocrotophos 36 SL @ 1.5ml/L at 50% pod set' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 7000,
    mspPerQuintal: 7000,
    suitableRegions: ['Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat', 'Uttar Pradesh']
  },
  {
    id: 'crop-green-gram',
    name: 'Green Gram (Moong)',
    scientificName: 'Vigna radiata',
    commonNames: ['Moong', 'Mung Bean', 'Green Gram', 'Pasi Paruppu'],
    category: 'Pulses',
    description: 'Short-duration quick-maturing pulse crop suitable for catch cropping in summer and monsoon.',
    imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 22,
    maxTemp: 38,
    minPh: 6.2,
    maxPh: 7.8,
    minRainfall: 400,
    maxRainfall: 750,
    idealN: 15,
    idealP: 40,
    idealK: 20,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Sandy Loam', 'Red Soil'],
    suitableSeasons: ['Kharif (Monsoon)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 65,
    sowingMonths: ['March', 'April', 'June', 'July'],
    harvestMonths: ['May', 'June', 'August', 'September'],
    seedRate: '8-10 kg/acre (Kharif), 12 kg/acre (Summer)',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '5 - 8 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 35kg + MOP 10kg + Rhizobium culture',
      topDressing: 'Foliar spray 2% DAP at 30 DAP',
      organic: 'Compost 2 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering', days: '30-40 days', action: 'Prevent whitefly transmission of yellow mosaic' },
      { stage: 'Pod Picking', days: '55-65 days', action: 'Pick pods when 85% turn dark brown/black' }
    ],
    commonDiseases: [
      { name: 'Mung Yellow Mosaic Virus (MYMV)', symptoms: 'Bright yellow mosaic patches on leaves', treatment: 'Vector control: Dimethoate 30 EC @ 1.7ml/L' }
    ],
    commonPests: [
      { name: 'Whitefly', symptoms: 'Sucking sap and transmitting virus', treatment: 'Acetamiprid 20 SP @ 50g/acre' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 8558,
    mspPerQuintal: 8558,
    suitableRegions: ['Rajasthan', 'Madhya Pradesh', 'Maharashtra', 'Karnataka', 'Bihar', 'Punjab']
  },
  {
    id: 'crop-black-gram',
    name: 'Black Gram (Urad)',
    scientificName: 'Vigna mungo',
    commonNames: ['Urad', 'Mash', 'Black Matpe', 'Ulundu'],
    category: 'Pulses',
    description: 'Protein-dense leguminous pulse widely consumed and highly beneficial for soil structure.',
    imageUrl: 'https://images.unsplash.com/photo-1599307767316-77520113c23e?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 22,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 7.8,
    minRainfall: 450,
    maxRainfall: 800,
    idealN: 15,
    idealP: 40,
    idealK: 20,
    suitableSoilTypes: ['Black Soil (Regur)', 'Alluvial', 'Loamy'],
    suitableSeasons: ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 75,
    sowingMonths: ['June', 'July', 'October', 'February'],
    harvestMonths: ['September', 'January', 'May'],
    seedRate: '8-10 kg/acre',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '5 - 7 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 35kg + MOP 10kg/acre',
      topDressing: 'Foliar spray 1% Urea at flowering',
      organic: 'Compost 2 tons/acre'
    },
    growthStages: [
      { stage: 'Vegetative', days: '20-35 days', action: 'Weed control' },
      { stage: 'Pod formation', days: '50-65 days', action: 'Monitor for pod borer' }
    ],
    commonDiseases: [
      { name: 'Powdery Mildew', symptoms: 'White powdery spots on leaves and stems', treatment: 'Foliar spray of Soluble Sulphur @ 3g/L' }
    ],
    commonPests: [
      { name: 'Spotted Pod Borer', symptoms: 'Webbed flowers and bored pods', treatment: 'Chlorantraniliprole 18.5 SC @ 0.3ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 6950,
    mspPerQuintal: 6950,
    suitableRegions: ['Madhya Pradesh', 'Uttar Pradesh', 'Andhra Pradesh', 'Maharashtra', 'Tamil Nadu']
  },
  {
    id: 'crop-lentil',
    name: 'Lentil (Masoor)',
    scientificName: 'Lens culinaris',
    commonNames: ['Masoor', 'Masur', 'Lentil', 'Mysore Paruppu'],
    category: 'Pulses',
    description: 'Important cold-hardy rabi pulse rich in iron and proteins, performing well in light loamy soils.',
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 12,
    maxTemp: 28,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 350,
    maxRainfall: 700,
    idealN: 20,
    idealP: 40,
    idealK: 20,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Clayey', 'Black Soil (Regur)'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 115,
    sowingMonths: ['October', 'November'],
    harvestMonths: ['February', 'March'],
    seedRate: '15-18 kg/acre',
    spacing: '22.5 cm x 5 cm',
    expectedYieldPerAcre: '6 - 9 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 40kg + Gypsum 50kg/acre',
      topDressing: 'Foliar 2% DAP spray at pod setup',
      organic: 'Vermicompost 1 ton/acre'
    },
    growthStages: [
      { stage: 'Branching', days: '30-45 days', action: 'Light irrigation if rain absent' },
      { stage: 'Maturity', days: '100-115 days', action: 'Harvest when pods turn golden brown' }
    ],
    commonDiseases: [
      { name: 'Lentil Rust', symptoms: 'Yellow-brown pustules on leaves and pods', treatment: 'Mancozeb 75 WP @ 2g/L' }
    ],
    commonPests: [
      { name: 'Pod Borer', symptoms: 'Caterpillar feeding inside pods', treatment: 'Emamectin Benzoate @ 0.4g/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 6425,
    mspPerQuintal: 6425,
    suitableRegions: ['Madhya Pradesh', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Rajasthan']
  },
  {
    id: 'crop-field-pea',
    name: 'Field Pea (Matar)',
    scientificName: 'Pisum sativum',
    commonNames: ['Matar', 'Pea', 'Pattani'],
    category: 'Pulses',
    description: 'Rabi pulse and vegetable crop cultivated for dried seeds as well as green pods.',
    imageUrl: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 10,
    maxTemp: 25,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 400,
    maxRainfall: 750,
    idealN: 20,
    idealP: 50,
    idealK: 30,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Silty Clay'],
    suitableSeasons: ['Rabi (Winter)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 100,
    sowingMonths: ['October', 'November'],
    harvestMonths: ['January', 'February'],
    seedRate: '30-35 kg/acre',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '8 - 12 Quintals (Dry)',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 20kg/acre',
      topDressing: 'Foliar spray 19:19:19 @ 5g/L',
      organic: 'FYM 4 tons/acre'
    },
    growthStages: [
      { stage: 'Flowering', days: '40-50 days', action: 'Irrigate at flowering onset' },
      { stage: 'Pod Filling', days: '65-85 days', action: 'Protect against powdery mildew' }
    ],
    commonDiseases: [
      { name: 'Powdery Mildew', symptoms: 'White powdery growth on leaves', treatment: 'Sulfur 80 WP @ 3g/L' }
    ],
    commonPests: [
      { name: 'Pea Leaf Miner', symptoms: 'Serpentine white mines on leaves', treatment: 'Imidacloprid 17.8 SL @ 0.5ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 4500,
    suitableRegions: ['Uttar Pradesh', 'Madhya Pradesh', 'Punjab', 'Bihar', 'Haryana']
  },
  {
    id: 'crop-cowpea',
    name: 'Cowpea (Lobia)',
    scientificName: 'Vigna unguiculata',
    commonNames: ['Lobia', 'Chawli', 'Karamani', 'Alasandalu'],
    category: 'Pulses',
    description: 'Multipurpose pulse, vegetable, and green manure crop highly adaptable to warm and dry soils.',
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 35,
    minPh: 5.8,
    maxPh: 7.5,
    minRainfall: 400,
    maxRainfall: 850,
    idealN: 15,
    idealP: 40,
    idealK: 20,
    suitableSoilTypes: ['Sandy Loam', 'Loamy', 'Red Soil', 'Alluvial'],
    suitableSeasons: ['Kharif (Monsoon)', 'Zaid (Summer)'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 80,
    sowingMonths: ['February', 'March', 'June', 'July'],
    harvestMonths: ['May', 'September'],
    seedRate: '8-10 kg/acre',
    spacing: '45 cm x 15 cm',
    expectedYieldPerAcre: '6 - 9 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 35kg + MOP 15kg/acre',
      topDressing: 'Organic compost tea spray',
      organic: 'FYM 3 tons/acre'
    },
    growthStages: [
      { stage: 'Vegetative', days: '20-35 days', action: 'Weed control and earthing' },
      { stage: 'Pod maturity', days: '60-80 days', action: 'Pick green pods or dry harvest' }
    ],
    commonDiseases: [
      { name: 'Mosaic Virus', symptoms: 'Yellowing and mottling of leaves', treatment: 'Vector management with Azadirachtin' }
    ],
    commonPests: [
      { name: 'Aphids', symptoms: 'Colonies sucking sap from shoots and tender pods', treatment: 'Spray Dimethoate @ 1.5ml/L' }
    ],
    marketDemand: 'Moderate',
    avgMarketPricePerQuintal: 4800,
    suitableRegions: ['Uttar Pradesh', 'Rajasthan', 'Gujarat', 'Karnataka', 'Tamil Nadu']
  },
  {
    id: 'crop-horse-gram',
    name: 'Horse Gram (Kulthi)',
    scientificName: 'Macrotyloma uniflorum',
    commonNames: ['Kulthi', 'Kollu', 'Ulavalu', 'Hurali'],
    category: 'Pulses',
    description: 'Extremely hardy dryland pulse grown in poor eroded soils with minimal input requirements.',
    imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 18,
    maxTemp: 38,
    minPh: 5.0,
    maxPh: 7.5,
    minRainfall: 250,
    maxRainfall: 650,
    idealN: 10,
    idealP: 30,
    idealK: 15,
    suitableSoilTypes: ['Red Soil', 'Laterite', 'Desert/Arid', 'Sandy Loam'],
    suitableSeasons: ['Kharif (Monsoon)', 'Late Kharif'],
    suitableWaterAvailability: ['Low'],
    growthDurationDays: 110,
    sowingMonths: ['August', 'September'],
    harvestMonths: ['December', 'January'],
    seedRate: '10-12 kg/acre',
    spacing: '30 cm x 10 cm',
    expectedYieldPerAcre: '4 - 6 Quintals',
    fertilizerRecommendation: {
      basal: 'Single Super Phosphate (SSP) 75kg/acre',
      topDressing: 'Minimal chemical fertilizer needed',
      organic: 'Compost 1 ton/acre'
    },
    growthStages: [
      { stage: 'Vegetative', days: '20-40 days', action: 'Light inter-cultivation' },
      { stage: 'Harvesting', days: '100-110 days', action: 'Uproot plants when leaves dry' }
    ],
    commonDiseases: [
      { name: 'Dry Root Rot', symptoms: 'Shriveling and drying of plants', treatment: 'Trichoderma viride seed treatment' }
    ],
    commonPests: [
      { name: 'Hairy Caterpillar', symptoms: 'Defoliation of crop leaves', treatment: 'Dusting with Quinalphos 1.5% powder' }
    ],
    marketDemand: 'Moderate',
    avgMarketPricePerQuintal: 4200,
    suitableRegions: ['Karnataka', 'Tamil Nadu', 'Odisha', 'Andhra Pradesh', 'Chhattisgarh']
  }
];
