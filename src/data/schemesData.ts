import { GovernmentScheme } from '../types';

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'scheme-pm-kisan',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    category: 'Direct Financial Benefit',
    targetAudience: 'All landholding farmer families across India',
    description: 'Central sector scheme providing income support of ₹6,000 per year to all landholding farmer families in three equal quarterly installments of ₹2,000.',
    benefits: [
      'Direct Benefit Transfer (DBT) of ₹6,000 per annum directly into bank account',
      'No middleman involvement',
      'Financial support for purchasing farm inputs (seeds, fertilizers, fuel)'
    ],
    eligibility: [
      'All landholding farmer families with cultivable land in their names',
      'Excludes institutional landholders, high-income taxpayers, and constitutional post holders'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Bank Account Details (linked with Aadhaar)',
      'Landownership Documents (Khasra / Khatauni)',
      'Mobile Number'
    ],
    applicationProcess: 'Self-register via PM-KISAN Portal (pmkisan.gov.in) or visit nearest Common Service Centre (CSC) / Agriculture Office.',
    officialUrl: 'https://pmkisan.gov.in/',
    lastVerified: '2026-08-01'
  },
  {
    id: 'scheme-pmfby',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Insurance',
    targetAudience: 'Farmers growing notified crops in notified areas',
    description: 'Comprehensive yield-based crop insurance coverage against non-preventable natural risks from pre-sowing to post-harvest.',
    benefits: [
      'Very low premium rate: 2% for Kharif crops, 1.5% for Rabi crops, 5% for commercial/horticultural crops',
      'Government subsidizes up to 90%+ of the actuarial premium',
      'Coverage for localized calamities (landslide, hailstorm, inundation) and post-harvest losses'
    ],
    eligibility: [
      'All farmers including sharecroppers and tenant farmers growing notified crops',
      'Compulsory for loanee farmers holding Kisan Credit Card (can opt out), voluntary for non-loanee'
    ],
    documentsRequired: [
      'Land Possession Certificate / Sowing Certificate',
      'Aadhaar Card',
      'Bank Passbook copy',
      'Kisan Credit Card / Loan account details (if loanee)'
    ],
    applicationProcess: 'Apply through National Crop Insurance Portal (pmfby.gov.in), bank branch, insurance company agent, or CSC center within notified deadline.',
    officialUrl: 'https://pmfby.gov.in/',
    lastVerified: '2026-08-01'
  },
  {
    id: 'scheme-shc',
    title: 'Soil Health Card Scheme',
    category: 'Soil & Inputs',
    targetAudience: 'Individual farmers across all states and union territories',
    description: 'Provides customized soil health cards to farmers displaying status of 12 soil parameters along with recommended dosage of fertilizers and organic manures.',
    benefits: [
      'Scientific analysis of 12 parameters: N, P, K (Macro), S (Secondary), Zn, Fe, Cu, Mn, Bo (Micro), and pH, EC, OC (Physical)',
      'Reduces input cost by preventing over-application of fertilizers',
      'Improves long-term soil fertility and yield quality'
    ],
    eligibility: ['Every farmer owning or cultivating agricultural land in India'],
    documentsRequired: [
      'Aadhaar Card',
      'Soil Sample from Farm (collected by Krishi Sahayak or self)',
      'Survey/Khasra Number'
    ],
    applicationProcess: 'Soil samples collected by state Agriculture Department staff every 2 years. Status can be tracked online at soilhealth.dac.gov.in.',
    officialUrl: 'https://soilhealth.dac.gov.in/',
    lastVerified: '2026-08-01'
  },
  {
    id: 'scheme-kcc',
    title: 'Kisan Credit Card (KCC) Scheme',
    category: 'Credit & Loan',
    targetAudience: 'Farmers, tenant farmers, SHGs, animal husbandry & fishery farmers',
    description: 'Provides timely and hassle-free institutional short-term credit to farmers for cultivation, post-harvest expenses, and farm maintenance at concessional interest rates.',
    benefits: [
      'Short term loan up to ₹3 Lakh at effective interest rate of 4% per annum (with prompt repayment incentive)',
      'Collateral-free loan limit up to ₹1.60 Lakh',
      'Includes personal accident insurance coverage'
    ],
    eligibility: [
      'Individual/joint borrower landholding farmers',
      'Tenant farmers, share croppers, and oral lessees',
      'Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers'
    ],
    documentsRequired: [
      'Duly filled KCC Application Form',
      'Identity & Address Proof (Aadhaar / Voter ID / PAN)',
      'Land revenue records / lease agreement',
      'Passport size photograph'
    ],
    applicationProcess: 'Submit application to nearest commercial bank, Regional Rural Bank (RRB), or Cooperative Bank branch.',
    officialUrl: 'https://www.myscheme.gov.in/schemes/kcc',
    lastVerified: '2026-08-01'
  },
  {
    id: 'scheme-pmksy',
    title: 'PM Krishi Sinchayee Yojana (PMKSY) - Micro Irrigation',
    category: 'Irrigation',
    targetAudience: 'Small and marginal farmers installing micro-irrigation systems',
    description: 'Focuses on "Per Drop More Crop" by promoting water-efficient drip and sprinkler micro-irrigation technologies with heavy government capital subsidy.',
    benefits: [
      '55% subsidy for Small & Marginal Farmers, 45% subsidy for other farmers on drip/sprinkler equipment cost',
      'Saves up to 40-50% irrigation water and 30% electricity cost',
      'Increases crop yield by 20-30%'
    ],
    eligibility: ['Farmers having verified land and access to water source (borewell/well/canal)'],
    documentsRequired: [
      'Aadhaar Card',
      '7/12 Land Extract / Khatauni',
      'Water Source Electricity Bill / Certificate',
      'Bank Account Passbook'
    ],
    applicationProcess: 'Apply online on state micro-irrigation portal (e.g. Mahadbt in Maharashtra, Harchhatrawatti in Haryana) or state horticulture department.',
    officialUrl: 'https://pmksy.gov.in/',
    lastVerified: '2026-08-01'
  },
  {
    id: 'scheme-pkvy',
    title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    category: 'Organic Farming',
    targetAudience: 'Farmers forming organic farming clusters',
    description: 'Promotes eco-friendly cluster-based organic farming and Participatory Guarantee System (PGS) certification.',
    benefits: [
      'Financial assistance of ₹50,000 per hectare for 3 years',
      '₹31,000/ha provided directly for organic inputs (seeds, bio-fertilizers, bio-pesticides)',
      'Free PGS-India organic certification and branding/marketing support'
    ],
    eligibility: ['Farmers forming a cluster of 20 or more farmers having 50 acres total land'],
    documentsRequired: ['Aadhaar Card', 'Land Ownership proof', 'Bank details', 'Cluster registration form'],
    applicationProcess: 'Register cluster through District Agriculture Officer or Regional Council under PGS-India network.',
    officialUrl: 'https://pgsindia-ncof.dac.gov.in/',
    lastVerified: '2026-08-01'
  }
];
