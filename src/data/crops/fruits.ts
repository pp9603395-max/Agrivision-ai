import { Crop } from '../../types';

export const FRUITS_CROPS: Crop[] = [
  {
    id: 'crop-mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    commonNames: ['Aam', 'Mango', 'Mambazham', 'Mamidi'],
    category: 'Fruits',
    description: 'National fruit of India, a king among tropical fruits thriving in deep well-drained loamy soils.',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 22,
    maxTemp: 42,
    minPh: 5.5,
    maxPh: 7.5,
    minRainfall: 750,
    maxRainfall: 2000,
    idealN: 100,
    idealP: 50,
    idealK: 100,
    suitableSoilTypes: ['Alluvial', 'Red Soil', 'Loamy', 'Laterite'],
    suitableSeasons: ['Year-round'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 120,
    sowingMonths: ['July', 'August'],
    harvestMonths: ['April', 'May', 'June', 'July'],
    seedRate: '70-100 grafted saplings/acre',
    spacing: '10 m x 10 m (Traditional) / 5m x 5m (High Density)',
    expectedYieldPerAcre: '40 - 80 Quintals (Bearing orchard)',
    fertilizerRecommendation: {
      basal: 'FYM 50kg + SSP 2kg + MOP 1kg per mature tree annually in October',
      topDressing: 'Urea 1kg per tree post harvest in July',
      organic: 'Neem cake 5kg per tree'
    },
    growthStages: [
      { stage: 'Flowering & Panicle', days: 'January - February', action: 'Avoid irrigation during bloom; spray for hopper' },
      { stage: 'Fruit Harvest', days: 'May - July', action: 'Harvest at mature green stage with 1cm stem' }
    ],
    commonDiseases: [
      { name: 'Powdery Mildew', symptoms: 'White powdery fungus on panicles causing flower drop', treatment: 'Hexaconazole 5 EC @ 1ml/L or Wettable Sulfur @ 3g/L' }
    ],
    commonPests: [
      { name: 'Mango Hopper', symptoms: 'Hopper nymphs sucking panicle sap causing honey dew mold', treatment: 'Imidacloprid 17.8 SL @ 0.5ml/L before bloom' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 4500,
    suitableRegions: ['Uttar Pradesh', 'Andhra Pradesh', 'Karnataka', 'Bihar', 'Gujarat', 'Maharashtra']
  },
  {
    id: 'crop-banana',
    name: 'Banana',
    scientificName: 'Musa acuminata',
    commonNames: ['Kela', 'Kelaa', 'Vazhai', 'Arati'],
    category: 'Fruits',
    description: 'High biomass tropical fruit requiring abundant water and rich organic nutrients.',
    imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 18,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 7.8,
    minRainfall: 1200,
    maxRainfall: 2200,
    idealN: 200,
    idealP: 60,
    idealK: 300,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Black Soil (Regur)', 'Clayey'],
    suitableSeasons: ['Year-round'],
    suitableWaterAvailability: ['High'],
    growthDurationDays: 330,
    sowingMonths: ['June', 'July', 'October'],
    harvestMonths: ['Continuous after 11 months'],
    seedRate: '1000-1200 tissue culture plants/acre',
    spacing: '1.8 m x 1.8 m',
    expectedYieldPerAcre: '250 - 400 Quintals',
    fertilizerRecommendation: {
      basal: 'FYM 10kg + DAP 100g per plant at planting',
      topDressing: 'Urea 200g + MOP 300g per plant in split monthly fertigation',
      organic: 'Vermicompost 3kg per plant'
    },
    growthStages: [
      { stage: 'Shooting & Bunching', days: '7-9 months', action: 'Denavelling (removing male bud) and bunch covering' },
      { stage: 'Bunch Maturity', days: '11-12 months', action: 'Harvest when ridges on banana fruits disappear' }
    ],
    commonDiseases: [
      { name: 'Sigatoka Leaf Spot', symptoms: 'Dark brown streak spots drying up leaf blades', treatment: 'Propiconazole 1ml/L + Mineral oil 10ml/L' }
    ],
    commonPests: [
      { name: 'Banana Stem Weevil', symptoms: 'Borer holes with jelly exudation on pseudostem', treatment: 'Stem injection or swabbing with Chlorpyrifos' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 1800,
    suitableRegions: ['Tamil Nadu', 'Andhra Pradesh', 'Gujarat', 'Maharashtra', 'Karnataka', 'Uttar Pradesh']
  },
  {
    id: 'crop-guava',
    name: 'Guava',
    scientificName: 'Psidium guajava',
    commonNames: ['Amrood', 'Jamruk', 'Koyya', 'Jama'],
    category: 'Fruits',
    description: 'Resilient high-vitamin C fruit tree adaptable to wide soil types including semi-arid conditions.',
    imageUrl: 'https://images.unsplash.com/photo-1536511135760-5e364687fb4d?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 15,
    maxTemp: 38,
    minPh: 5.5,
    maxPh: 8.0,
    minRainfall: 500,
    maxRainfall: 1200,
    idealN: 100,
    idealP: 50,
    idealK: 80,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Red Soil', 'Sandy Loam'],
    suitableSeasons: ['Year-round'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 130,
    sowingMonths: ['June', 'July'],
    harvestMonths: ['August to September', 'November to January'],
    seedRate: '110-130 air layered / grafted plants/acre',
    spacing: '6 m x 6 m (Meadow orchard: 2m x 1m)',
    expectedYieldPerAcre: '60 - 120 Quintals',
    fertilizerRecommendation: {
      basal: 'FYM 25kg + DAP 500g + MOP 500g per tree annually',
      topDressing: 'Micronutrient Zinc & Boron spray twice yearly',
      organic: 'Compost 15kg per tree'
    },
    growthStages: [
      { stage: 'Bahar Treatment', days: 'May / September', action: 'Withhold water to induce heavy flowering' },
      { stage: 'Harvesting', days: 'Winter / Rainy bahar', action: 'Pick green mature firm fruits' }
    ],
    commonDiseases: [
      { name: 'Guava Wilt (Fusarium)', symptoms: 'Yellowing and rapid wilting of foliage starting from branch tips', treatment: 'Drench Trichoderma viride & avoid waterlogging' }
    ],
    commonPests: [
      { name: 'Fruit Fly (Bactrocera dorsalis)', symptoms: 'Maggot infested soft spots in ripe guava', treatment: 'Hang Methyl eugenol pheromone traps @ 10/acre' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 2500,
    suitableRegions: ['Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Punjab', 'Maharashtra', 'Gujarat']
  },
  {
    id: 'crop-papaya',
    name: 'Papaya',
    scientificName: 'Carica papaya',
    commonNames: ['Papita', 'Pappayi', 'Pappali', 'Boppayi'],
    category: 'Fruits',
    description: 'Fast-fruiting early producing herbaceous fruit rich in papain enzyme.',
    imageUrl: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 20,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 800,
    maxRainfall: 1500,
    idealN: 150,
    idealP: 150,
    idealK: 200,
    suitableSoilTypes: ['Alluvial', 'Loamy', 'Sandy Loam', 'Red Soil'],
    suitableSeasons: ['Year-round'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 270,
    sowingMonths: ['February', 'March', 'June'],
    harvestMonths: ['Continuous starting from 9 months'],
    seedRate: '100-150 g/acre (Hybrid)',
    spacing: '1.8 m x 1.8 m (1200 plants/acre)',
    expectedYieldPerAcre: '200 - 350 Quintals',
    fertilizerRecommendation: {
      basal: 'FYM 10kg + DAP 100g/plant at transplanting',
      topDressing: 'Urea 50g + MOP 100g per plant bimonthly',
      organic: 'Vermicompost 2kg/plant'
    },
    growthStages: [
      { stage: 'Flowering & Setting', days: '4-6 months', action: 'Maintain ridge drainage to avoid collar rot' },
      { stage: 'Fruit Picking', days: '9-24 months', action: 'Pick fruits when latex turns watery and yellow color shows at apex' }
    ],
    commonDiseases: [
      { name: 'Papaya Ring Spot Virus (PRSV)', symptoms: 'Dark green ring spots on fruits and shoe-string leaf deformation', treatment: 'Vector aphid control with Imidacloprid @ 0.5ml/L' }
    ],
    commonPests: [
      { name: 'Mealybug', symptoms: 'White waxy coating sucking sap from leaves and fruits', treatment: 'Profeno-cypermethrin or Buprofezin 25 SC @ 1.5ml/L' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 1600,
    suitableRegions: ['Gujarat', 'Andhra Pradesh', 'Karnataka', 'Madhya Pradesh', 'Maharashtra', 'West Bengal']
  },
  {
    id: 'crop-pomegranate',
    name: 'Pomegranate',
    scientificName: 'Punica granatum',
    commonNames: ['Anar', 'Dalimb', 'Madulai', 'Danimma'],
    category: 'Fruits',
    description: 'High-value arid and semi-arid fruit known for arils packed with anti-oxidants.',
    imageUrl: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 18,
    maxTemp: 40,
    minPh: 6.5,
    maxPh: 8.2,
    minRainfall: 350,
    maxRainfall: 750,
    idealN: 120,
    idealP: 60,
    idealK: 120,
    suitableSoilTypes: ['Red Soil', 'Loamy', 'Black Soil (Regur)', 'Sandy Loam'],
    suitableSeasons: ['Year-round'],
    suitableWaterAvailability: ['Low', 'Medium'],
    growthDurationDays: 160,
    sowingMonths: ['June', 'July', 'January'],
    harvestMonths: ['Hast, Mrig, or Ambe bahar harvests'],
    seedRate: '300-400 tissue culture / air layered plants/acre',
    spacing: '4.5 m x 3 m',
    expectedYieldPerAcre: '40 - 80 Quintals',
    fertilizerRecommendation: {
      basal: 'FYM 20kg + DAP 500g + MOP 500g per plant during bahar regulation',
      topDressing: 'Fertigation with 00:52:34 and Calcium Nitrate',
      organic: 'Neem cake 2kg/plant'
    },
    growthStages: [
      { stage: 'Fruit Development', days: '60-120 days post bloom', action: 'Maintain regular drip and apply Boron to prevent fruit cracking' },
      { stage: 'Harvesting', days: '150-180 days', action: 'Harvest fully colored deep red fruits' }
    ],
    commonDiseases: [
      { name: 'Bacterial Oily Spot (Xanthomonas)', symptoms: 'Dark oily water-soaked spots on leaves and fruit skin', treatment: 'Streptocycline 500ppm + Copper Oxychloride @ 2.5g/L' }
    ],
    commonPests: [
      { name: 'Anar Butterfly (Deudorix isocrates)', symptoms: 'Borer holes plugged with frass in fruits', treatment: 'Bag fruits at golf-ball size and spray Spinosad' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 7500,
    suitableRegions: ['Maharashtra', 'Karnataka', 'Gujarat', 'Andhra Pradesh', 'Rajasthan']
  },
  {
    id: 'crop-grapes',
    name: 'Grapes',
    scientificName: 'Vitis vinifera',
    commonNames: ['Angoor', 'Draksh', 'Draksha', 'Kodi Drakshai'],
    category: 'Fruits',
    description: 'Subtropical vine fruit trained on trellises producing premium fresh table grapes and raisins.',
    imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 15,
    maxTemp: 38,
    minPh: 6.5,
    maxPh: 8.0,
    minRainfall: 400,
    maxRainfall: 800,
    idealN: 120,
    idealP: 100,
    idealK: 200,
    suitableSoilTypes: ['Loamy', 'Black Soil (Regur)', 'Red Soil', 'Alluvial'],
    suitableSeasons: ['Year-round'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 140,
    sowingMonths: ['October (Pruning)'],
    harvestMonths: ['February', 'March', 'April'],
    seedRate: '800-900 rootstock grafted vines/acre',
    spacing: '2.4 m x 1.8 m (Y-trellis system)',
    expectedYieldPerAcre: '80 - 140 Quintals',
    fertilizerRecommendation: {
      basal: 'FYM 15 tons + SSP 250kg + MOP 150kg post foundation pruning',
      topDressing: 'Fertigation with NPK water-soluble formulations post forward pruning',
      organic: 'Bio-fertilizers Azotobacter + PSB'
    },
    growthStages: [
      { stage: 'Forward Pruning & Berry Set', days: 'October - December', action: 'GA3 (Gibberellic Acid) dipping for berry elongation' },
      { stage: 'Harvesting', days: 'February - April', action: 'Harvest when TSS reaches 18-20° Brix' }
    ],
    commonDiseases: [
      { name: 'Downy Mildew (Plasmopara viticola)', symptoms: 'Oily spots on upper leaf surface with white downy growth beneath', treatment: 'Dimethomorph @ 1g/L or Metalaxyl + Mancozeb' }
    ],
    commonPests: [
      { name: 'Flea Beetle', symptoms: 'Scraped buds preventing shoot growth', treatment: 'Imidacloprid 17.8 SL @ 0.5ml/L at bud burst' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 5500,
    suitableRegions: ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Mizoram']
  },
  {
    id: 'crop-orange',
    name: 'Orange (Citrus / Mandarin)',
    scientificName: 'Citrus reticulata',
    commonNames: ['Santra', 'Orange', 'Narangi', 'Kitchili'],
    category: 'Fruits',
    description: 'Juicy citrus fruit rich in Vitamin C grown extensively in sub-tropical sub-montane tracts.',
    imageUrl: 'https://images.unsplash.com/photo-1582979512210-99b6a53385f9?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 12,
    maxTemp: 35,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 800,
    maxRainfall: 1500,
    idealN: 150,
    idealP: 75,
    idealK: 150,
    suitableSoilTypes: ['Loamy', 'Alluvial', 'Black Soil (Regur)', 'Red Soil'],
    suitableSeasons: ['Year-round'],
    suitableWaterAvailability: ['Medium', 'High'],
    growthDurationDays: 240,
    sowingMonths: ['July', 'August'],
    harvestMonths: ['October to December (Ambe) / March to May (Mrig)'],
    seedRate: '110-130 budded saplings/acre',
    spacing: '6 m x 6 m',
    expectedYieldPerAcre: '50 - 90 Quintals',
    fertilizerRecommendation: {
      basal: 'FYM 30kg + SSP 1kg + MOP 500g per tree in December',
      topDressing: 'Urea 1kg per tree split in two doses',
      organic: 'Neem cake 3kg/tree'
    },
    growthStages: [
      { stage: 'Fruit Color Break', days: '180-210 days', action: 'Withhold nitrogen to encourage bright orange peel color' },
      { stage: 'Harvesting', days: '220-240 days', action: 'Clipper harvest mature orange fruits' }
    ],
    commonDiseases: [
      { name: 'Citrus Greening (Huanglongbing)', symptoms: 'Mottled chlorotic yellow leaves and lopsided bitter fruits', treatment: 'Control psyllid vectors with Imidacloprid' }
    ],
    commonPests: [
      { name: 'Citrus Psylla', symptoms: 'Sucking sap and transmitting greening bacteria', treatment: 'Thiamethoxam 25 WG @ 80g/acre' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 3200,
    suitableRegions: ['Maharashtra (Nagpur)', 'Punjab', 'Madhya Pradesh', 'Rajasthan', 'Assam']
  },
  {
    id: 'crop-watermelon',
    name: 'Watermelon',
    scientificName: 'Citrullus lanatus',
    commonNames: ['Tarbooz', 'Kalingad', 'Thannirmathan', 'Puchakaya'],
    category: 'Fruits',
    description: 'High-volume summer dessert fruit thriving in warm sandy riverbeds and well-drained soils.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    minTemp: 22,
    maxTemp: 38,
    minPh: 6.0,
    maxPh: 7.5,
    minRainfall: 400,
    maxRainfall: 750,
    idealN: 60,
    idealP: 50,
    idealK: 60,
    suitableSoilTypes: ['Sandy Loam', 'Alluvial', 'Loamy'],
    suitableSeasons: ['Zaid (Summer)'],
    suitableWaterAvailability: ['Medium'],
    growthDurationDays: 85,
    sowingMonths: ['December', 'January', 'February'],
    harvestMonths: ['April', 'May', 'June'],
    seedRate: '1.5-2 kg/acre (Hybrid)',
    spacing: '2 m x 0.9 m',
    expectedYieldPerAcre: '150 - 250 Quintals',
    fertilizerRecommendation: {
      basal: 'DAP 50kg + MOP 30kg/acre',
      topDressing: 'Urea 30kg at vine growth, 13:00:45 5kg/acre weekly in drip',
      organic: 'FYM 5 tons/acre'
    },
    growthStages: [
      { stage: 'Vine Development & Flowering', days: '25-45 days', action: 'Maintain drip irrigation and bee activity' },
      { stage: 'Fruit Harvesting', days: '75-85 days', action: 'Harvest when ground spot turns creamy yellow and tendril dries' }
    ],
    commonDiseases: [
      { name: 'Fusarium Wilt', symptoms: 'Vines wilting suddenly during fruit set', treatment: 'Drench Carbendazim @ 1g/L and use resistant rootstock' }
    ],
    commonPests: [
      { name: 'Red Pumpkin Beetle', symptoms: 'Seedlings damaged by chewing beetles', treatment: 'Dusting wood ash or Neem cake' }
    ],
    marketDemand: 'High',
    avgMarketPricePerQuintal: 1200,
    suitableRegions: ['Uttar Pradesh', 'Karnataka', 'Tamil Nadu', 'Punjab', 'Maharashtra', 'Gujarat']
  }
];
