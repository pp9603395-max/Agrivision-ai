import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const tempDir = path.join(process.cwd(), '.tmp-video-build');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Generate the 4 SVG frames corresponding to the 4 scenes of the user's AgriVision AI video
const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#040d0a;font-family:system-ui,-apple-system,sans-serif;">
  <defs>
    <radialGradient id="bgGlow" cx="20%" cy="10%" r="60%">
      <stop offset="0%" stop-color="#053321" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#040d0a" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1f18" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#05140f" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#bgGlow)"/>
  <circle cx="1600" cy="900" r="400" fill="#0d9488" opacity="0.08" filter="blur(80px)"/>

  <!-- Top Navigation Bar -->
  <rect x="60" y="40" width="1800" height="70" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1.5"/>
  <circle cx="100" cy="75" r="18" fill="#10b981"/>
  <path d="M93 75 L98 80 L108 70" stroke="#040d0a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <text x="130" y="82" fill="#ffffff" font-size="24" font-weight="bold">AgriVision AI</text>
  <text x="290" y="82" fill="#6ee7b7" font-size="14" font-weight="500">Enterprise Smart Crop &amp; Digital Agriculture Platform</text>
  <rect x="1600" y="55" width="230" height="40" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
  <circle cx="1625" cy="75" r="5" fill="#34d399"/>
  <text x="1640" y="80" fill="#34d399" font-size="13" font-weight="600">LIVE AI TELEMETRY</text>

  <!-- Left Hero Banner -->
  <g transform="translate(60, 150)">
    <rect x="0" y="0" width="800" height="780" rx="24" fill="url(#cardGrad)" stroke="#134e38" stroke-width="1.5"/>
    <rect x="50" y="50" width="340" height="36" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
    <text x="70" y="74" fill="#34d399" font-size="13" font-weight="700" letter-spacing="1">AI-POWERED CROP RECOMMENDATION</text>

    <text x="50" y="150" fill="#ffffff" font-size="48" font-weight="800" line-height="1.2">Grow smarter with</text>
    <text x="50" y="210" fill="#34d399" font-size="48" font-weight="800">AI-powered crop insights</text>

    <text x="50" y="280" fill="#94a3b8" font-size="18" font-weight="400">Stop guessing. Start thriving. Personalized crop advisory</text>
    <text x="50" y="310" fill="#94a3b8" font-size="18" font-weight="400">backed by real-time weather, soil data &amp; machine learning.</text>

    <g transform="translate(50, 360)">
      <rect x="0" y="0" width="680" height="64" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <circle cx="35" cy="32" r="8" fill="#10b981"/>
      <text x="60" y="38" fill="#ffffff" font-size="18" font-weight="600">Real-Time Soil Telemetry</text>
    </g>

    <g transform="translate(50, 440)">
      <rect x="0" y="0" width="680" height="64" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <circle cx="35" cy="32" r="8" fill="#10b981"/>
      <text x="60" y="38" fill="#ffffff" font-size="18" font-weight="600">15-Day Hyper-Local Weather Alerts</text>
    </g>

    <g transform="translate(50, 520)">
      <rect x="0" y="0" width="680" height="64" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
      <circle cx="35" cy="32" r="8" fill="#34d399"/>
      <text x="60" y="38" fill="#6ee7b7" font-size="18" font-weight="700">ML Profitability Engine (Validated Across 1-20 Acre Farms)</text>
    </g>
  </g>

  <!-- Right Diagnostics Grid -->
  <g transform="translate(890, 150)">
    <rect x="0" y="0" width="970" height="780" rx="24" fill="url(#cardGrad)" stroke="#134e38" stroke-width="1.5"/>
    <text x="40" y="55" fill="#6ee7b7" font-size="13" font-weight="700" letter-spacing="1">LIVE FIELD SCANNER • SANGLI / MAHARASHTRA CLUSTER</text>
    <text x="40" y="90" fill="#ffffff" font-size="28" font-weight="700">Multi-Spectral Crop &amp; Soil Diagnostics</text>

    <!-- Crop Grid -->
    <g transform="translate(40, 120)">
      <!-- Row 1 -->
      <rect x="0" y="0" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="20" y="38" fill="#ffffff" font-size="16" font-weight="600">Soybean</text>
      <text x="20" y="65" fill="#34d399" font-size="14" font-weight="700">94% Match</text>

      <rect x="230" y="0" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="250" y="38" fill="#ffffff" font-size="16" font-weight="600">Millets</text>
      <text x="250" y="65" fill="#34d399" font-size="14" font-weight="700">91% Match</text>

      <rect x="460" y="0" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="480" y="38" fill="#ffffff" font-size="16" font-weight="600">Groundnut</text>
      <text x="480" y="65" fill="#34d399" font-size="14" font-weight="700">87% Match</text>

      <rect x="690" y="0" width="200" height="85" rx="12" fill="#2d1515" stroke="#ef4444" stroke-width="1"/>
      <text x="710" y="38" fill="#ffffff" font-size="16" font-weight="600">Cotton</text>
      <text x="710" y="65" fill="#f87171" font-size="14" font-weight="700">62% Risk</text>

      <!-- Row 2 -->
      <rect x="0" y="105" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="20" y="143" fill="#ffffff" font-size="16" font-weight="600">Chickpea</text>
      <text x="20" y="170" fill="#34d399" font-size="14" font-weight="700">95% Match</text>

      <rect x="230" y="105" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="250" y="143" fill="#ffffff" font-size="16" font-weight="600">Sorghum</text>
      <text x="250" y="170" fill="#34d399" font-size="14" font-weight="700">92% Match</text>

      <rect x="460" y="105" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="480" y="143" fill="#ffffff" font-size="16" font-weight="600">Turmeric</text>
      <text x="480" y="170" fill="#34d399" font-size="14" font-weight="700">88% Match</text>

      <rect x="690" y="105" width="200" height="85" rx="12" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
      <text x="710" y="143" fill="#ffffff" font-size="16" font-weight="600">Sugarcane</text>
      <text x="710" y="170" fill="#94a3b8" font-size="14" font-weight="700">74% Water</text>

      <!-- Row 3 -->
      <rect x="0" y="210" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="20" y="248" fill="#ffffff" font-size="16" font-weight="600">Bajra</text>
      <text x="20" y="275" fill="#34d399" font-size="14" font-weight="700">96% Match</text>

      <rect x="230" y="210" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="250" y="248" fill="#ffffff" font-size="16" font-weight="600">Maize</text>
      <text x="250" y="275" fill="#34d399" font-size="14" font-weight="700">86% Match</text>

      <rect x="460" y="210" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="480" y="248" fill="#ffffff" font-size="16" font-weight="600">Pigeon Pea</text>
      <text x="480" y="275" fill="#34d399" font-size="14" font-weight="700">90% Match</text>

      <rect x="690" y="210" width="200" height="85" rx="12" fill="#0c291e" stroke="#10b981" stroke-width="1"/>
      <text x="710" y="248" fill="#ffffff" font-size="16" font-weight="600">Wheat</text>
      <text x="710" y="275" fill="#34d399" font-size="14" font-weight="700">84% Match</text>
    </g>

    <!-- Bottom Metrics -->
    <g transform="translate(40, 480)">
      <rect x="0" y="0" width="280" height="110" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <text x="24" y="38" fill="#94a3b8" font-size="13" font-weight="600">SOIL MOISTURE</text>
      <text x="24" y="78" fill="#ffffff" font-size="32" font-weight="bold">68.4%</text>
      <text x="135" y="76" fill="#34d399" font-size="13">+4.2% Optimal</text>

      <rect x="305" y="0" width="280" height="110" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <text x="329" y="38" fill="#94a3b8" font-size="13" font-weight="600">NPK BALANCE</text>
      <text x="329" y="78" fill="#34d399" font-size="32" font-weight="bold">Optimal</text>
      <text x="450" y="76" fill="#94a3b8" font-size="13">pH 6.8 neutral</text>

      <rect x="610" y="0" width="280" height="110" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <text x="634" y="38" fill="#94a3b8" font-size="13" font-weight="600">AI CONFIDENCE</text>
      <text x="634" y="78" fill="#ffffff" font-size="32" font-weight="bold">96.2%</text>
      <text x="735" y="76" fill="#34d399" font-size="13">18,000+ Farms</text>
    </g>
  </g>

  <!-- Step Navigation Footer -->
  <g transform="translate(60, 960)">
    <rect x="0" y="0" width="420" height="60" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
    <text x="130" y="37" fill="#34d399" font-size="16" font-weight="700">01 Smart Field Scan</text>

    <rect x="450" y="0" width="420" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="570" y="37" fill="#64748b" font-size="16" font-weight="600">02 Soil &amp; Weather AI</text>

    <rect x="900" y="0" width="420" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="1030" y="37" fill="#64748b" font-size="16" font-weight="600">03 Crop Profitability</text>

    <rect x="1350" y="0" width="450" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="1470" y="37" fill="#64748b" font-size="16" font-weight="600">04 Proven Farmer Impact</text>
  </g>
</svg>`;

const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#040d0a;font-family:system-ui,-apple-system,sans-serif;">
  <defs>
    <radialGradient id="bgGlow2" cx="50%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#063d27" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#040d0a" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a1f18" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#05140f" stop-opacity="0.98"/>
    </linearGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#bgGlow2)"/>

  <!-- Top Navigation Bar -->
  <rect x="60" y="40" width="1800" height="70" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1.5"/>
  <circle cx="100" cy="75" r="18" fill="#10b981"/>
  <text x="130" y="82" fill="#ffffff" font-size="24" font-weight="bold">AgriVision AI</text>
  <text x="290" y="82" fill="#6ee7b7" font-size="14" font-weight="500">Real-Time Agronomic Intelligence</text>
  <rect x="1600" y="55" width="230" height="40" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
  <text x="1640" y="80" fill="#34d399" font-size="13" font-weight="600">LIVE AI TELEMETRY</text>

  <!-- Big Title -->
  <text x="60" y="165" fill="#34d399" font-size="13" font-weight="700" letter-spacing="1">REAL-TIME AGRONOMIC INTELLIGENCE</text>
  <text x="60" y="210" fill="#ffffff" font-size="38" font-weight="800">Analyzing Soil, 15-Day Climate &amp; Historical Yield Data</text>

  <!-- 3 Pillar Columns -->
  <!-- Col 1: Soil -->
  <g transform="translate(60, 240)">
    <rect x="0" y="0" width="570" height="690" rx="20" fill="url(#cardGrad2)" stroke="#134e38" stroke-width="1.5"/>
    <text x="30" y="45" fill="#6ee7b7" font-size="13" font-weight="700">01 • SOIL OPTIMIZATION</text>
    <text x="30" y="75" fill="#ffffff" font-size="22" font-weight="700">Nutrient &amp; pH Diagnostics</text>
    <text x="30" y="105" fill="#94a3b8" font-size="13">Precision fertilizer &amp; nutrient recommendations</text>

    <g transform="translate(30, 130)">
      <rect x="0" y="0" width="510" height="65" rx="10" fill="#081c15" stroke="#10b981" stroke-width="1"/>
      <text x="20" y="38" fill="#ffffff" font-size="16" font-weight="600">Nitrogen (N)</text>
      <text x="340" y="38" fill="#34d399" font-size="16" font-weight="700">245 kg/ha • Optimal</text>

      <rect x="0" y="80" width="510" height="65" rx="10" fill="#081c15" stroke="#10b981" stroke-width="1"/>
      <text x="20" y="118" fill="#ffffff" font-size="16" font-weight="600">Phosphorus (P)</text>
      <text x="360" y="118" fill="#34d399" font-size="16" font-weight="700">42 kg/ha • Good</text>

      <rect x="0" y="160" width="510" height="65" rx="10" fill="#081c15" stroke="#10b981" stroke-width="1"/>
      <text x="20" y="198" fill="#ffffff" font-size="16" font-weight="600">Potassium (K)</text>
      <text x="360" y="198" fill="#34d399" font-size="16" font-weight="700">310 kg/ha • High</text>

      <rect x="0" y="240" width="510" height="65" rx="10" fill="#081c15" stroke="#10b981" stroke-width="1"/>
      <text x="20" y="278" fill="#ffffff" font-size="16" font-weight="600">Organic Carbon</text>
      <text x="340" y="278" fill="#34d399" font-size="16" font-weight="700">0.78% • Balanced</text>

      <rect x="0" y="320" width="510" height="65" rx="10" fill="#081c15" stroke="#10b981" stroke-width="1"/>
      <text x="20" y="358" fill="#ffffff" font-size="16" font-weight="600">Soil Moisture</text>
      <text x="380" y="358" fill="#34d399" font-size="16" font-weight="700">68.4% • Ideal</text>
    </g>
    <rect x="30" y="580" width="510" height="50" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
    <text x="50" y="612" fill="#34d399" font-size="13" font-weight="600">AI Advisory: Reduce urea input by 18% this cycle</text>
  </g>

  <!-- Col 2: Weather -->
  <g transform="translate(675, 240)">
    <rect x="0" y="0" width="570" height="690" rx="20" fill="url(#cardGrad2)" stroke="#134e38" stroke-width="1.5"/>
    <text x="30" y="45" fill="#6ee7b7" font-size="13" font-weight="700">02 • WEATHER FORECAST</text>
    <text x="30" y="75" fill="#ffffff" font-size="22" font-weight="700">15-Day Hyper-Local Risk Alerts</text>
    <text x="30" y="105" fill="#94a3b8" font-size="13">Protect against drought &amp; unseasonal rainfall shocks</text>

    <!-- Simulated Graph -->
    <g transform="translate(30, 140)">
      <rect x="0" y="0" width="510" height="230" rx="12" fill="#061912" stroke="#134e38" stroke-width="1"/>
      <text x="20" y="30" fill="#94a3b8" font-size="12">15-Day Rain &amp; Humidity Trajectory (mm)</text>
      <!-- Wave Path -->
      <path d="M 30 180 Q 90 120, 150 160 T 270 80 T 390 130 T 480 60" fill="none" stroke="#34d399" stroke-width="3"/>
      <circle cx="270" cy="80" r="6" fill="#34d399"/>
      <circle cx="480" cy="60" r="6" fill="#34d399"/>
    </g>

    <g transform="translate(30, 400)">
      <rect x="0" y="0" width="510" height="85" rx="12" fill="#2d1515" stroke="#ef4444" stroke-width="1"/>
      <text x="20" y="35" fill="#f87171" font-size="16" font-weight="700">Days 4-6 Dry Spell Alert</text>
      <text x="20" y="60" fill="#e2e8f0" font-size="13">Switch to drought-resilient millets over cotton</text>
    </g>

    <g transform="translate(30, 505)">
      <rect x="0" y="0" width="510" height="85" rx="12" fill="#082b20" stroke="#10b981" stroke-width="1"/>
      <text x="20" y="35" fill="#34d399" font-size="16" font-weight="700">Days 8-10 Monsoon Window</text>
      <text x="20" y="60" fill="#e2e8f0" font-size="13">Optimal soil moisture window for basal fertilizer</text>
    </g>
  </g>

  <!-- Col 3: AI Recommendation Engine -->
  <g transform="translate(1290, 240)">
    <rect x="0" y="0" width="570" height="690" rx="20" fill="url(#cardGrad2)" stroke="#134e38" stroke-width="1.5"/>
    <text x="30" y="45" fill="#6ee7b7" font-size="13" font-weight="700">03 • AI RECOMMENDATION ENGINE</text>
    <text x="30" y="75" fill="#ffffff" font-size="22" font-weight="700">Traditional Wisdom + Modern AI</text>
    <text x="30" y="105" fill="#94a3b8" font-size="13">Actionable crop advisory for 1-20 acre farms</text>

    <!-- Center Ring Badge -->
    <g transform="translate(285, 260)">
      <circle cx="0" cy="0" r="100" fill="#082b20" stroke="#10b981" stroke-width="3"/>
      <circle cx="0" cy="0" r="70" fill="#061912" stroke="#34d399" stroke-width="1"/>
      <text x="0" y="-8" text-anchor="middle" fill="#ffffff" font-size="18" font-weight="bold">AgriVision</text>
      <text x="0" y="20" text-anchor="middle" fill="#34d399" font-size="13" font-weight="700">ML CORE</text>
    </g>

    <g transform="translate(30, 420)">
      <rect x="0" y="0" width="510" height="55" rx="10" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <text x="20" y="33" fill="#ffffff" font-size="15" font-weight="600">Offline Access Ready</text>
      <text x="470" y="33" text-anchor="end" fill="#34d399" font-size="12">Download advisories</text>
    </g>

    <g transform="translate(30, 490)">
      <rect x="0" y="0" width="510" height="55" rx="10" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <text x="20" y="33" fill="#ffffff" font-size="15" font-weight="600">Partner Bank Finance</text>
      <text x="470" y="33" text-anchor="end" fill="#34d399" font-size="12">Pre-verified yield data</text>
    </g>

    <g transform="translate(30, 560)">
      <rect x="0" y="0" width="510" height="55" rx="10" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <text x="20" y="33" fill="#ffffff" font-size="15" font-weight="600">Local Farmer Community</text>
      <text x="470" y="33" text-anchor="end" fill="#34d399" font-size="12">Compare regional results</text>
    </g>
  </g>

  <!-- Step Navigation Footer -->
  <g transform="translate(60, 960)">
    <rect x="0" y="0" width="420" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="130" y="37" fill="#64748b" font-size="16" font-weight="600">01 Smart Field Scan</text>

    <rect x="450" y="0" width="420" height="60" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
    <text x="570" y="37" fill="#34d399" font-size="16" font-weight="700">02 Soil &amp; Weather AI</text>

    <rect x="900" y="0" width="420" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="1030" y="37" fill="#64748b" font-size="16" font-weight="600">03 Crop Profitability</text>

    <rect x="1350" y="0" width="450" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="1470" y="37" fill="#64748b" font-size="16" font-weight="600">04 Proven Farmer Impact</text>
  </g>
</svg>`;

const svg3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#040d0a;font-family:system-ui,-apple-system,sans-serif;">
  <defs>
    <radialGradient id="bgGlow3" cx="80%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#053321" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#040d0a" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="cardGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a1f18" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#05140f" stop-opacity="0.98"/>
    </linearGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#bgGlow3)"/>

  <!-- Top Navigation Bar -->
  <rect x="60" y="40" width="1800" height="70" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1.5"/>
  <circle cx="100" cy="75" r="18" fill="#10b981"/>
  <text x="130" y="82" fill="#ffffff" font-size="24" font-weight="bold">AgriVision AI</text>
  <text x="290" y="82" fill="#6ee7b7" font-size="14" font-weight="500">Crop Profitability &amp; Seasonal Advisory</text>
  <rect x="1600" y="55" width="230" height="40" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
  <text x="1640" y="80" fill="#34d399" font-size="13" font-weight="600">LIVE AI TELEMETRY</text>

  <!-- Big Title -->
  <text x="60" y="165" fill="#34d399" font-size="13" font-weight="700" letter-spacing="1">CROP PROFITABILITY &amp; SEASONAL ADVISORY</text>
  <text x="60" y="210" fill="#ffffff" font-size="38" font-weight="800">Stop Guessing What to Plant — Daily Expected Yield &amp; Income</text>

  <!-- Left: Crop Recommendations Table -->
  <g transform="translate(60, 240)">
    <rect x="0" y="0" width="1150" height="690" rx="20" fill="url(#cardGrad3)" stroke="#134e38" stroke-width="1.5"/>
    <text x="40" y="45" fill="#94a3b8" font-size="13" font-weight="700">RECOMMENDED CROPS FOR YOUR FIELD (15 ACRES • KHARIF/RABI)</text>

    <!-- Top Pick: Bajra -->
    <g transform="translate(40, 75)">
      <rect x="0" y="0" width="1070" height="120" rx="16" fill="#073022" stroke="#10b981" stroke-width="2"/>
      <rect x="20" y="20" width="80" height="26" rx="6" fill="#10b981"/>
      <text x="28" y="38" fill="#040d0a" font-size="11" font-weight="bold">TOP AI PICK</text>
      <text x="115" y="40" fill="#ffffff" font-size="24" font-weight="bold">Pearl Millet (Bajra)</text>
      <rect x="230" y="65" width="140" height="28" rx="6" fill="#082b20"/>
      <text x="245" y="84" fill="#34d399" font-size="12" font-weight="700">96% AI Match</text>
      <text x="400" y="55" fill="#34d399" font-size="18" font-weight="bold">+40% Net Return</text>
      <text x="400" y="80" fill="#94a3b8" font-size="13">Low Drought Risk</text>
      <text x="880" y="70" fill="#34d399" font-size="30" font-weight="800">₹84,500 <tspan font-size="16" fill="#94a3b8">/ season</tspan></text>
    </g>

    <!-- Soybean -->
    <g transform="translate(40, 215)">
      <rect x="0" y="0" width="1070" height="110" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <text x="30" y="45" fill="#ffffff" font-size="22" font-weight="bold">Soybean (JS-335)</text>
      <rect x="230" y="60" width="140" height="28" rx="6" fill="#082b20"/>
      <text x="245" y="79" fill="#34d399" font-size="12" font-weight="700">92% AI Match</text>
      <text x="400" y="50" fill="#34d399" font-size="17" font-weight="bold">+34% Yield Gain</text>
      <text x="400" y="75" fill="#94a3b8" font-size="13">Optimal Soil NPK</text>
      <text x="880" y="65" fill="#ffffff" font-size="28" font-weight="800">₹76,200 <tspan font-size="16" fill="#94a3b8">/ season</tspan></text>
    </g>

    <!-- Sorghum -->
    <g transform="translate(40, 345)">
      <rect x="0" y="0" width="1070" height="110" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <text x="30" y="45" fill="#ffffff" font-size="22" font-weight="bold">Sorghum (Jowar)</text>
      <rect x="230" y="60" width="140" height="28" rx="6" fill="#082b20"/>
      <text x="245" y="79" fill="#34d399" font-size="12" font-weight="700">88% AI Match</text>
      <text x="400" y="50" fill="#34d399" font-size="17" font-weight="bold">+28% Net Return</text>
      <text x="400" y="75" fill="#94a3b8" font-size="13">High Water Efficiency</text>
      <text x="880" y="65" fill="#ffffff" font-size="28" font-weight="800">₹68,000 <tspan font-size="16" fill="#94a3b8">/ season</tspan></text>
    </g>

    <!-- Cotton -->
    <g transform="translate(40, 475)">
      <rect x="0" y="0" width="1070" height="110" rx="16" fill="#181414" stroke="#7f1d1d" stroke-width="1"/>
      <text x="30" y="45" fill="#ffffff" font-size="22" font-weight="bold">Cotton (Baseline)</text>
      <rect x="230" y="60" width="140" height="28" rx="6" fill="#451a03"/>
      <text x="245" y="79" fill="#f59e0b" font-size="12" font-weight="700">58% Caution</text>
      <text x="400" y="50" fill="#f87171" font-size="17" font-weight="bold">High Weather Risk</text>
      <text x="400" y="75" fill="#94a3b8" font-size="13">Drought Vulnerable</text>
      <text x="880" y="65" fill="#e2e8f0" font-size="28" font-weight="800">₹42,000 <tspan font-size="16" fill="#94a3b8">/ season</tspan></text>
    </g>
  </g>

  <!-- Right: Verified Impact Card -->
  <g transform="translate(1250, 240)">
    <rect x="0" y="0" width="610" height="690" rx="20" fill="url(#cardGrad3)" stroke="#134e38" stroke-width="1.5"/>
    <rect x="40" y="40" width="220" height="32" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
    <text x="55" y="62" fill="#34d399" font-size="12" font-weight="700">VERIFIED FARMER IMPACT</text>

    <text x="40" y="140" fill="#e2e8f0" font-size="24" font-weight="500" font-style="italic">"When drought hit, the app</text>
    <text x="40" y="180" fill="#e2e8f0" font-size="24" font-weight="500" font-style="italic">recommended millets instead</text>
    <text x="40" y="220" fill="#e2e8f0" font-size="24" font-weight="500" font-style="italic">of cotton. I got 40% better</text>
    <text x="40" y="260" fill="#e2e8f0" font-size="24" font-weight="500" font-style="italic">returns than I would have."</text>

    <text x="40" y="320" fill="#34d399" font-size="16" font-weight="700">— Rajesh Patel, Cotton &amp; Millet Farmer</text>

    <!-- Comparison chart -->
    <g transform="translate(40, 380)">
      <rect x="0" y="0" width="530" height="200" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <text x="30" y="40" fill="#94a3b8" font-size="13">SEASONAL INCOME COMPARISON</text>

      <text x="30" y="85" fill="#e2e8f0" font-size="14">Unassisted Crop Choice</text>
      <text x="480" y="85" text-anchor="end" fill="#94a3b8" font-size="16" font-weight="bold">₹60,000</text>
      <rect x="30" y="95" width="280" height="12" rx="6" fill="#475569"/>

      <text x="30" y="145" fill="#34d399" font-size="14" font-weight="bold">With AgriVision AI (+40%)</text>
      <text x="480" y="145" text-anchor="end" fill="#34d399" font-size="18" font-weight="bold">₹84,500</text>
      <rect x="30" y="155" width="440" height="12" rx="6" fill="#10b981"/>
    </g>

    <g transform="translate(40, 610)">
      <rect x="0" y="0" width="240" height="40" rx="8" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <circle cx="20" cy="20" r="5" fill="#34d399"/>
      <text x="35" y="25" fill="#34d399" font-size="12" font-weight="600">Works Offline</text>

      <rect x="270" y="0" width="260" height="40" rx="8" fill="#081c15" stroke="#134e38" stroke-width="1"/>
      <circle cx="290" cy="20" r="5" fill="#34d399"/>
      <text x="305" y="25" fill="#34d399" font-size="12" font-weight="600">Regional Languages</text>
    </g>
  </g>

  <!-- Step Navigation Footer -->
  <g transform="translate(60, 960)">
    <rect x="0" y="0" width="420" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="130" y="37" fill="#64748b" font-size="16" font-weight="600">01 Smart Field Scan</text>

    <rect x="450" y="0" width="420" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="570" y="37" fill="#64748b" font-size="16" font-weight="600">02 Soil &amp; Weather AI</text>

    <rect x="900" y="0" width="420" height="60" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
    <text x="1030" y="37" fill="#34d399" font-size="16" font-weight="700">03 Crop Profitability</text>

    <rect x="1350" y="0" width="450" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="1470" y="37" fill="#64748b" font-size="16" font-weight="600">04 Proven Farmer Impact</text>
  </g>
</svg>`;

const svg4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#040d0a;font-family:system-ui,-apple-system,sans-serif;">
  <defs>
    <radialGradient id="bgGlow4" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#064e3b" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#040d0a" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="cardGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a1f18" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#05140f" stop-opacity="0.98"/>
    </linearGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#bgGlow4)"/>

  <!-- Top Navigation Bar -->
  <rect x="60" y="40" width="1800" height="70" rx="16" fill="#081c15" stroke="#134e38" stroke-width="1.5"/>
  <circle cx="100" cy="75" r="18" fill="#10b981"/>
  <text x="130" y="82" fill="#ffffff" font-size="24" font-weight="bold">AgriVision AI</text>
  <text x="290" y="82" fill="#6ee7b7" font-size="14" font-weight="500">Enterprise Smart Crop &amp; Digital Agriculture Platform</text>
  <rect x="1600" y="55" width="230" height="40" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
  <text x="1640" y="80" fill="#34d399" font-size="13" font-weight="600">LIVE AI TELEMETRY</text>

  <!-- Centered Hero -->
  <g transform="translate(60, 180)">
    <rect x="730" y="0" width="340" height="34" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
    <text x="900" y="22" text-anchor="middle" fill="#34d399" font-size="13" font-weight="700" letter-spacing="1">REAL DATA • MEASURABLE RESULTS</text>

    <text x="900" y="90" text-anchor="middle" fill="#ffffff" font-size="52" font-weight="800">Building Trust, Confidence &amp; Results</text>
    <text x="900" y="140" text-anchor="middle" fill="#94a3b8" font-size="22">Empowering 1-20 acre farmers across India &amp; South Asia</text>
  </g>

  <!-- 3 Big Metric Cards -->
  <g transform="translate(110, 390)">
    <!-- Card 1 -->
    <rect x="0" y="0" width="530" height="280" rx="24" fill="url(#cardGrad4)" stroke="#134e38" stroke-width="2"/>
    <text x="50" y="90" fill="#34d399" font-size="64" font-weight="800">+34%</text>
    <text x="50" y="140" fill="#ffffff" font-size="26" font-weight="bold">Average Yield Increase</text>
    <text x="50" y="180" fill="#94a3b8" font-size="16">Evidence-based crop &amp; soil matching</text>
    <text x="50" y="208" fill="#94a3b8" font-size="16">per season across agro-climatic zones</text>

    <!-- Card 2 -->
    <rect x="585" y="0" width="530" height="280" rx="24" fill="url(#cardGrad4)" stroke="#10b981" stroke-width="2.5"/>
    <text x="635" y="90" fill="#34d399" font-size="64" font-weight="800">₹48,000</text>
    <text x="635" y="140" fill="#ffffff" font-size="26" font-weight="bold">Additional Income / Season</text>
    <text x="635" y="180" fill="#94a3b8" font-size="16">Higher profitability with reduced</text>
    <text x="635" y="208" fill="#94a3b8" font-size="16">crop failure and climate risk</text>

    <!-- Card 3 -->
    <rect x="1170" y="0" width="530" height="280" rx="24" fill="url(#cardGrad4)" stroke="#134e38" stroke-width="2"/>
    <text x="1220" y="90" fill="#34d399" font-size="64" font-weight="800">18,000+</text>
    <text x="1220" y="140" fill="#ffffff" font-size="26" font-weight="bold">Farmers Using Platform</text>
    <text x="1220" y="180" fill="#94a3b8" font-size="16">Backed by hyper-local weather &amp;</text>
    <text x="1220" y="208" fill="#94a3b8" font-size="16">peer agronomic community</text>
  </g>

  <!-- Call to action button -->
  <g transform="translate(760, 720)">
    <rect x="0" y="0" width="400" height="68" rx="20" fill="#10b981"/>
    <text x="175" y="42" text-anchor="middle" fill="#040d0a" font-size="22" font-weight="800">Get started free</text>
    <path d="M 270 42 L 290 42 M 283 35 L 290 42 L 283 49" stroke="#040d0a" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Guarantee subtext -->
  <text x="960" y="830" text-anchor="middle" fill="#64748b" font-size="15">Free trial • Offline access • Regional language support • Partner bank integration</text>

  <!-- Step Navigation Footer -->
  <g transform="translate(60, 960)">
    <rect x="0" y="0" width="420" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="130" y="37" fill="#64748b" font-size="16" font-weight="600">01 Smart Field Scan</text>

    <rect x="450" y="0" width="420" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="570" y="37" fill="#64748b" font-size="16" font-weight="600">02 Soil &amp; Weather AI</text>

    <rect x="900" y="0" width="420" height="60" rx="12" fill="#081c15" stroke="#134e38" stroke-width="1"/>
    <text x="1030" y="37" fill="#64748b" font-size="16" font-weight="600">03 Crop Profitability</text>

    <rect x="1350" y="0" width="450" height="60" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
    <text x="1470" y="37" fill="#34d399" font-size="16" font-weight="700">04 Proven Farmer Impact</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(tempDir, 'frame1.svg'), svg1);
fs.writeFileSync(path.join(tempDir, 'frame2.svg'), svg2);
fs.writeFileSync(path.join(tempDir, 'frame3.svg'), svg3);
fs.writeFileSync(path.join(tempDir, 'frame4.svg'), svg4);

console.log('Rendering SVG frames to PNG using ffmpeg...');
execSync(`ffmpeg -y -i "${path.join(tempDir, 'frame1.svg')}" "${path.join(tempDir, 'frame1.png')}"`);
execSync(`ffmpeg -y -i "${path.join(tempDir, 'frame2.svg')}" "${path.join(tempDir, 'frame2.png')}"`);
execSync(`ffmpeg -y -i "${path.join(tempDir, 'frame3.svg')}" "${path.join(tempDir, 'frame3.png')}"`);
execSync(`ffmpeg -y -i "${path.join(tempDir, 'frame4.svg')}" "${path.join(tempDir, 'frame4.png')}"`);

// Create FFmpeg concat input list with exact durations:
// Frame 1: 3 seconds (0:00 - 0:03)
// Frame 2: 3 seconds (0:03 - 0:06)
// Frame 3: 3 seconds (0:06 - 0:09)
// Frame 4: 2 seconds (0:09 - 0:11)
// Total: 11 seconds
const concatList = `
file '${path.join(tempDir, 'frame1.png')}'
duration 3
file '${path.join(tempDir, 'frame2.png')}'
duration 3
file '${path.join(tempDir, 'frame3.png')}'
duration 3
file '${path.join(tempDir, 'frame4.png')}'
duration 2
file '${path.join(tempDir, 'frame4.png')}'
`;

const listFile = path.join(tempDir, 'concat.txt');
fs.writeFileSync(listFile, concatList.trim());

const outPublic = path.join(process.cwd(), 'public', 'assets', 'videos', 'agrivision-intro.mp4');
const outAssets = path.join(process.cwd(), 'assets', 'videos', 'agrivision-intro.mp4');
const outRootPublic = path.join(process.cwd(), 'public', 'agrivision-intro.mp4');

console.log('Compiling 11-second H.264 MP4 with ffmpeg...');
// Generate silent audio track matching video duration with a subtle ambient audio tone or silent aac
execSync(`ffmpeg -y -f concat -safe 0 -i "${listFile}" -f lavfi -i anullsrc=r=44100:cl=stereo -c:v libx264 -pix_fmt yuv420p -r 30 -shortest -t 11 -c:a aac -b:a 128k -movflags +faststart "${outPublic}"`);

// Copy to secondary target locations
fs.copyFileSync(outPublic, outAssets);
fs.copyFileSync(outPublic, outRootPublic);

console.log('Generated video at:', outPublic, 'and', outAssets);
