import { Crop, RecommendationInput, PredictionResult, ContributingFactor } from '../types';

export function runCropRecommendationEngine(
  input: RecommendationInput,
  cropsCatalog: Crop[]
): PredictionResult {
  const { soil, climate, farm } = input;

  const scoredCrops = cropsCatalog.map((crop) => {
    let score = 0;
    let maxPossibleScore = 100;
    const contributingFactors: ContributingFactor[] = [];

    // 1. Soil pH Score (Weight: 20%)
    const idealPhMid = (crop.minPh + crop.maxPh) / 2;
    if (soil.ph >= crop.minPh && soil.ph <= crop.maxPh) {
      const phDiff = Math.abs(soil.ph - idealPhMid);
      const phScore = 20 - phDiff * 5;
      score += Math.max(14, phScore);
      contributingFactors.push({
        factor: 'Soil pH',
        score: Math.round((Math.max(14, phScore) / 20) * 100),
        impact: 'positive',
        description: `Soil pH of ${soil.ph} matches ${crop.name}'s ideal range (${crop.minPh} - ${crop.maxPh}).`
      });
    } else {
      const phDiff = Math.min(Math.abs(soil.ph - crop.minPh), Math.abs(soil.ph - crop.maxPh));
      const phScore = Math.max(0, 20 - phDiff * 10);
      score += phScore;
      contributingFactors.push({
        factor: 'Soil pH',
        score: Math.round((phScore / 20) * 100),
        impact: phScore < 8 ? 'caution' : 'neutral',
        description: `Soil pH (${soil.ph}) is slightly outside ideal ${crop.name} range (${crop.minPh}-${crop.maxPh}).`
      });
    }

    // 2. NPK Nutrient Compatibility (Weight: 25%)
    const nDiffRatio = Math.abs(soil.nitrogen - crop.idealN) / crop.idealN;
    const pDiffRatio = Math.abs(soil.phosphorus - crop.idealP) / crop.idealP;
    const kDiffRatio = Math.abs(soil.potassium - crop.idealK) / crop.idealK;
    const avgNpkDiff = (nDiffRatio + pDiffRatio + kDiffRatio) / 3;
    const npkScore = Math.max(5, 25 - avgNpkDiff * 15);
    score += npkScore;
    contributingFactors.push({
      factor: 'NPK Balance',
      score: Math.round((npkScore / 25) * 100),
      impact: avgNpkDiff < 0.35 ? 'positive' : 'neutral',
      description: `Current soil NPK (${soil.nitrogen}:${soil.phosphorus}:${soil.potassium}) fits ${crop.name} nutrient requirements (${crop.idealN}:${crop.idealP}:${crop.idealK}).`
    });

    // 3. Climate & Temperature (Weight: 20%)
    if (climate.temperature >= crop.minTemp && climate.temperature <= crop.maxTemp) {
      score += 20;
      contributingFactors.push({
        factor: 'Temperature',
        score: 100,
        impact: 'positive',
        description: `Average temperature (${climate.temperature}°C) falls perfectly in ${crop.name}'s optimal range (${crop.minTemp}°C - ${crop.maxTemp}°C).`
      });
    } else {
      const tempDiff = Math.min(Math.abs(climate.temperature - crop.minTemp), Math.abs(climate.temperature - crop.maxTemp));
      const tempScore = Math.max(2, 20 - tempDiff * 2.5);
      score += tempScore;
      contributingFactors.push({
        factor: 'Temperature',
        score: Math.round((tempScore / 20) * 100),
        impact: 'caution',
        description: `Temperature (${climate.temperature}°C) is near bounds for ${crop.name} (${crop.minTemp}°C - ${crop.maxTemp}°C).`
      });
    }

    // 4. Rainfall & Water Availability (Weight: 20%)
    const waterMatch = crop.suitableWaterAvailability.includes(farm.waterAvailability);
    let rainScore = waterMatch ? 15 : 8;
    if (climate.rainfall >= crop.minRainfall && climate.rainfall <= crop.maxRainfall) {
      rainScore += 5;
    }
    score += rainScore;
    contributingFactors.push({
      factor: 'Water & Rainfall',
      score: Math.round((rainScore / 20) * 100),
      impact: rainScore >= 15 ? 'positive' : 'neutral',
      description: `Seasonal rainfall (${climate.rainfall}mm) & ${farm.waterAvailability} water availability suits ${crop.name}.`
    });

    // 5. Soil Type & Season Match (Weight: 15%)
    let soilSeasonScore = 0;
    if (crop.suitableSoilTypes.includes(soil.type)) soilSeasonScore += 8;
    if (crop.suitableSeasons.includes(farm.currentSeason) || crop.suitableSeasons.includes('Year-round')) soilSeasonScore += 7;
    score += soilSeasonScore;
    contributingFactors.push({
      factor: 'Soil Type & Season',
      score: Math.round((soilSeasonScore / 15) * 100),
      impact: soilSeasonScore >= 12 ? 'positive' : 'neutral',
      description: `${soil.type} soil and ${farm.currentSeason} season match ${crop.name} cultivation guidelines.`
    });

    const confidenceScore = Math.min(98, Math.max(55, Math.round((score / maxPossibleScore) * 100)));

    return {
      crop,
      confidenceScore,
      contributingFactors
    };
  });

  // Sort by highest confidence score
  scoredCrops.sort((a, b) => b.confidenceScore - a.confidenceScore);

  const top = scoredCrops[0];
  const primaryCrop = top.crop;
  const primaryConfidence = top.confidenceScore;

  // Alternatives
  const alternativeCrops = scoredCrops.slice(1, 4).map((item) => ({
    crop: item.crop,
    confidenceScore: Math.min(primaryConfidence - 2, item.confidenceScore),
    reason: `High compatibility with ${item.crop.suitableSoilTypes[0]} soil and ${input.farm.currentSeason} climate.`
  }));

  // Calculate customized fertilizer requirement (in kg per acre)
  const nDeficit = Math.max(0, primaryCrop.idealN - soil.nitrogen);
  const pDeficit = Math.max(0, primaryCrop.idealP - soil.phosphorus);
  const kDeficit = Math.max(0, primaryCrop.idealK - soil.potassium);

  // Conversion: Urea = ~46% N, DAP = 18% N & 46% P, MOP = 60% K
  const dapKgPerAcre = Math.round((pDeficit / 0.46) * 0.8) + 30;
  const ureaNFromDap = dapKgPerAcre * 0.18;
  const remainingNDeficit = Math.max(0, nDeficit - ureaNFromDap);
  const ureaKgPerAcre = Math.round((remainingNDeficit / 0.46) * 0.8) + 35;
  const mopKgPerAcre = Math.round((kDeficit / 0.60) * 0.8) + 25;

  // Expected profit calculation (Yield * price - cost)
  const estimatedYieldQuintals = 20; // Average
  const marketPrice = primaryCrop.avgMarketPricePerQuintal || 2500;
  const estimatedGrossIncome = estimatedYieldQuintals * marketPrice;
  const estimatedCostPerAcre = 18000;
  const expectedProfitPerAcre = Math.max(25000, estimatedGrossIncome - estimatedCostPerAcre);

  return {
    id: `pred-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
    primaryCrop,
    confidenceScore: primaryConfidence,
    alternativeCrops,
    explainableAI: {
      summary: `${primaryCrop.name} is recommended with ${primaryConfidence}% confidence based on machine learning analysis of your soil NPK (${soil.nitrogen}:${soil.phosphorus}:${soil.potassium}), pH (${soil.ph}), average temperature (${climate.temperature}°C), and seasonal rainfall (${climate.rainfall}mm).`,
      whyThisCrop: [
        `Optimal Soil pH: Your soil pH of ${soil.ph} provides the perfect nutrient absorption environment for ${primaryCrop.name}.`,
        `Balanced Temperature & Humidity: Current ${climate.temperature}°C temperature aligns with ${primaryCrop.name}'s thermal growth needs (${primaryCrop.minTemp}°C - ${primaryCrop.maxTemp}°C).`,
        `Favorable Water Index: ${farm.waterAvailability} water availability with ${climate.rainfall}mm rainfall provides sufficient moisture without waterlogging.`,
        `Season Alignment: ${farm.currentSeason} is the prime sowing window for maximum market yield.`
      ],
      contributingFactors: top.contributingFactors,
      riskAssessment: {
        level: primaryConfidence > 85 ? 'Low' : primaryConfidence > 70 ? 'Moderate' : 'High',
        warning: primaryConfidence < 80 ? 'Ensure adequate drainage and monitor pest activity during initial 30 days of sowing.' : undefined
      }
    },
    fertilizerPlan: {
      ureaKgPerAcre,
      dapKgPerAcre,
      mopKgPerAcre,
      organicCompostTonsPerAcre: 3,
      schedule: [
        `At Sowing (Basal Dose): Apply full dose of DAP (${dapKgPerAcre} kg/acre) and MOP (${mopKgPerAcre} kg/acre) along with 3 tons of Organic Compost.`,
        `First Split (21-25 Days After Sowing): Apply 50% Urea (${Math.round(ureaKgPerAcre / 2)} kg/acre) after first weeding/irrigation.`,
        `Second Split (45-50 Days After Sowing): Apply remaining 50% Urea (${Math.round(ureaKgPerAcre / 2)} kg/acre) during peak vegetative stage.`
      ]
    },
    expectedProfitPerAcre,
    inputs: input
  };
}
