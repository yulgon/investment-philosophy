<template>
  <div class="market-dashboard-wrapper">
    <!-- Pilgrimage Banner -->
    <div class="market-banner-btn" :class="error ? 'theme-error' : themeData.cssClass" @click="isExpanded = !isExpanded">
      <canvas v-show="!loading && !error" ref="canvasRef" class="banner-canvas"></canvas>
      <div class="banner-left">
        <span class="theme-icon">{{ error ? '⚠️' : (loading ? '🔄' : themeData.icon) }}</span>
        <div class="banner-text-group">
          <span class="banner-title">{{ t.bannerTitle }}</span>
          <span class="banner-status">{{ error ? t.loadError : (loading ? t.syncingData : themeData.msg) }}</span>
        </div>
      </div>
      <div class="banner-right">
        {{ isExpanded ? t.collapse : t.expand }}
      </div>
    </div>

    <!-- Expanded content -->
    <div v-show="isExpanded" class="dashboard-expanded-area">
      <div v-if="loading" class="loading">{{ t.syncingSentiment }}</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="market-dashboard" :class="stateClass">
        <div class="dashboard-header">
          <p class="last-updated">{{ t.lastUpdated }}{{ formattedDate }}</p>
          <div class="data-sources">
            <span class="source-item"><strong>{{ t.srcIndices }}</strong> Yahoo Finance</span>
            <span class="source-item"><strong>{{ t.srcFG }}</strong> CNN Business</span>
            <span class="source-item"><strong>{{ t.srcYields }}</strong> U.S. Department of the Treasury</span>
            <span class="source-item"><strong>{{ t.srcFedRate }}</strong> Federal Reserve (EFFR)</span>
          </div>
        </div>

        <!-- Top Row: Current Stats & Gauges -->
        <div class="dashboard-grid top-row">
        
        <!-- Fear & Greed Premium Gauge -->
        <div class="card fg-card premium-card">
          <div class="fg-card-header">
            <h4>{{ t.fgTitle }}</h4>
            <div class="fg-status-label" :style="{ color: fgColor, textShadow: `0 0 10px ${fgColor}80` }">
              {{ fgRatingString }}
            </div>
          </div>
          
          <div class="premium-gauge-container">
            <svg viewBox="0 0 200 110" class="premium-gauge-svg">
              <defs>
                <filter id="glow-active" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-needle" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- 5 Gauge Segments -->
              <circle cx="100" cy="100" r="80" fill="none" :stroke="activeIndex === 0 ? '#db2828' : 'rgba(128,128,128,0.2)'" :stroke-width="activeIndex === 0 ? 14 : 8" stroke-dasharray="60 500" stroke-linecap="round" :filter="activeIndex === 0 ? 'url(#glow-active)' : ''" class="gauge-arc" transform="rotate(180 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" :stroke="activeIndex === 1 ? '#f2711c' : 'rgba(128,128,128,0.2)'" :stroke-width="activeIndex === 1 ? 14 : 8" stroke-dasharray="45 500" stroke-linecap="round" :filter="activeIndex === 1 ? 'url(#glow-active)' : ''" class="gauge-arc" transform="rotate(225 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" :stroke="activeIndex === 2 ? '#fbbd08' : 'rgba(128,128,128,0.2)'" :stroke-width="activeIndex === 2 ? 14 : 8" stroke-dasharray="24 500" stroke-linecap="round" :filter="activeIndex === 2 ? 'url(#glow-active)' : ''" class="gauge-arc" transform="rotate(259.2 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" :stroke="activeIndex === 3 ? '#b5cc18' : 'rgba(128,128,128,0.2)'" :stroke-width="activeIndex === 3 ? 14 : 8" stroke-dasharray="45 500" stroke-linecap="round" :filter="activeIndex === 3 ? 'url(#glow-active)' : ''" class="gauge-arc" transform="rotate(279 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" :stroke="activeIndex === 4 ? '#21ba45' : 'rgba(128,128,128,0.2)'" :stroke-width="activeIndex === 4 ? 14 : 8" stroke-dasharray="65 500" stroke-linecap="round" :filter="activeIndex === 4 ? 'url(#glow-active)' : ''" class="gauge-arc" transform="rotate(313.2 100 100)" />

              <!-- Tick marks and text placed perfectly inside the arc -->
              <text x="25" y="103" class="gauge-tick" text-anchor="middle">0</text>
              <text x="54" y="54" class="gauge-tick" text-anchor="middle">25</text>
              <text x="88" y="36" class="gauge-tick" text-anchor="middle">44</text>
              <text x="110" y="36" class="gauge-tick" text-anchor="middle">55</text>
              <text x="144" y="53" class="gauge-tick" text-anchor="middle">74</text>
              <text x="175" y="103" class="gauge-tick" text-anchor="middle">100</text>

              <!-- Sleek Needle (Drawn BEFORE text so it stays behind) -->
              <g :style="{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '100px 100px', transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }">
                <!-- Drop shadow polygon for depth -->
                <polygon points="97,100 100,24 103,100" fill="rgba(0,0,0,0.1)" transform="translate(1, 2)" />
                <polygon points="97,100 100,22 103,100" :fill="fgColor" filter="url(#glow-needle)" />
                <!-- Pivot circle -->
                <circle cx="100" cy="100" r="6" fill="var(--vp-c-bg)" :stroke="fgColor" stroke-width="2.5" />
              </g>

              <!-- Inner text for Score Only -->
              <rect x="75" y="65" width="50" height="35" rx="8" fill="var(--vp-c-bg)" fill-opacity="0.85" />
              <text x="100" y="95" class="gauge-score" text-anchor="middle" :fill="fgColor">{{ marketData ? marketData.fear_and_greed.score : 0 }}</text>
            </svg>
          </div>
        </div>

        <!-- FedWatch Tool (Removed) -->
        <!-- Macro / Yields Stats -->
        <div class="card macro-card">
          <h4>{{ t.yieldsTitle }}</h4>
          <div class="yield-stats">
            <div class="stat">
              <span class="label">{{ t.tenYear }}</span>
              <span class="value">{{ marketData.macro.ten_year }}%</span>
            </div>
            <div class="stat">
              <span class="label">{{ t.twoYear }}</span>
              <span class="value">{{ marketData.macro.two_year }}%</span>
            </div>
            <div class="stat">
              <span class="label">{{ t.fedRate }}</span>
              <span class="value">{{ marketData.macro.fed_rate }}%</span>
            </div>
          </div>
          <div class="yield-spread" :class="marketData.macro.status">
            {{ t.yieldSpread }}{{ marketData.macro.spread }}% ({{ marketData.macro.status.toUpperCase() }})
          </div>
        </div>
        
        <!-- VIX Stats -->
        <div class="card vix-stats-card">
          <h4>{{ t.vixTitle }}</h4>
          <div class="vix-current">
            <span class="vix-value" :style="{ color: vixColor }">{{ marketData.vix.latest }}</span>
          </div>
          <div class="vix-description">
            <p v-if="marketData.vix.latest > 30">{{ t.vixStress }}</p>
            <p v-else-if="marketData.vix.latest > 20">{{ t.vixHigh }}</p>
            <p v-else-if="marketData.vix.latest < 12">{{ t.vixCalm }}</p>
            <p v-else>{{ t.vixStable }}</p>
          </div>
        </div>

        <!-- Exchange Rates Stats -->
        <div class="card exchange-card">
          <h4>{{ t.fxTitle }}</h4>
          <div class="yield-stats">
            <div class="stat">
              <span class="label">{{ t.usdKrw }}</span>
              <span class="value" v-if="marketData">{{ marketData.exchange.usd_krw.toLocaleString() }}</span>
            </div>
            <div class="stat">
              <span class="label">{{ t.dxy }}</span>
              <span class="value" v-if="marketData">{{ marketData.exchange.dxy }}</span>
            </div>
          </div>
          <div class="yield-spread" style="background: var(--vp-c-bg-mute); color: var(--vp-c-text-2);">
            {{ t.fxDesc }}
          </div>
        </div>

        <!-- KCA Indices Stats -->
        <div class="card kca-card">
          <h4>{{ t.kcaTitle }}</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.5rem;">
            <div class="kca-col">
              <div style="font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 0.5rem; font-size: 0.95rem;">🇺🇸 S&P 500</div>
              <div class="stat"><span class="label">{{ t.usdTrue }}</span><span class="value" v-if="marketData">{{ marketData.kca_indices.latest.gspc_usd.toLocaleString() }}</span></div>
              <div class="stat"><span class="label" style="color: var(--vp-c-brand-1);">{{ t.krwPerceived }}</span><span class="value" v-if="marketData">{{ Math.round(marketData.kca_indices.latest.gspc_krw).toLocaleString() }}</span></div>
            </div>
            <div class="kca-col">
              <div style="font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 0.5rem; font-size: 0.95rem;">🇰🇷 KOSPI</div>
              <div class="stat"><span class="label">{{ t.krwTrue }}</span><span class="value" v-if="marketData">{{ marketData.kca_indices.latest.ks11_krw.toLocaleString() }}</span></div>
              <div class="stat"><span class="label" style="color: var(--vp-c-brand-1);">{{ t.usdGlobal }}</span><span class="value" v-if="marketData">{{ marketData.kca_indices.latest.ks11_usd.toLocaleString(undefined, {minimumFractionDigits: 3}) }}</span></div>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Row: 30-Day Tactical Charts -->
      <h3 class="history-title">{{ t.shortTermTitle }}</h3>
      <div class="dashboard-grid history-row">
        
        <!-- F&G History -->
        <div class="card chart-card">
          <h4>{{ t.fgTrend }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="fgChartData" :data="fgChartData" :options="lineOptions" />
          </div>
        </div>

        <!-- Yields History -->
        <div class="card chart-card">
          <h4>{{ t.yieldsTrend }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="yieldsChartData" :data="yieldsChartData" :options="lineOptionsWithLegend" />
          </div>
        </div>

        <!-- VIX History -->
        <div class="card chart-card">
          <h4>{{ t.vixTrend }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="vixChartData" :data="vixChartData" :options="lineOptions" />
          </div>
        </div>

        <!-- USD/KRW History -->
        <div class="card chart-card">
          <h4>{{ t.fxTrend }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="usdKrwChartData" :data="usdKrwChartData" :options="lineOptions" />
          </div>
        </div>

        <!-- DXY History -->
        <div class="card chart-card">
          <h4>{{ t.dxyTrend }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="dxyChartData" :data="dxyChartData" :options="lineOptions" />
          </div>
        </div>

      </div>

      <!-- Long-Term KCA History Charts -->
      <h3 class="history-title" style="margin-top: 3rem;">{{ t.longTermTitle }}</h3>
      <div class="dashboard-grid history-row">

        <!-- S&P 500 KCA History -->
        <div class="card chart-card">
          <h4>{{ t.sp500Chart }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="gspcChartData" :data="gspcChartData" :options="lineOptionsWithLegend" />
          </div>
        </div>

        <!-- KOSPI KCA History -->
        <div class="card chart-card">
          <h4>{{ t.kospiChart }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="ks11ChartData" :data="ks11ChartData" :options="lineOptionsWithLegend" />
          </div>
        </div>

        <!-- Relative USD Performance History -->
        <div class="card chart-card">
          <h4>{{ t.relativeChart }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="relativeUsdChartData" :data="relativeUsdChartData" :options="lineOptionsWithLegend" />
          </div>
        </div>

        <!-- Long-Term USD/KRW History -->
        <div class="card chart-card">
          <h4>{{ t.longTermFx }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="longTermUsdKrwChartData" :data="longTermUsdKrwChartData" :options="lineOptions" />
          </div>
        </div>

        <!-- Long-Term Yields History -->
        <div class="card chart-card">
          <h4>{{ t.longTermYields }}</h4>
          <div class="chart-wrapper">
            <LineChart v-if="longTermYieldsChartData" :data="longTermYieldsChartData" :options="lineOptionsWithLegend" />
          </div>
        </div>

      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { ref, onMounted, computed, nextTick } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js'
import { Line as LineChart } from 'vue-chartjs'

// We removed Doughnut and ArcElement since we built a far superior SVG Gauge
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

const marketData = ref(null)
const loading = ref(true)

const { lang } = useData()
const t = computed(() => {
  const isEn = lang.value === 'en-US'
  return {
    bannerTitle: isEn ? 'One Billion Pilgrimage' : '원빌리언 순례길',
    loadError: isEn ? 'Failed to load data.' : '데이터를 불러오지 못했습니다.',
    syncingData: isEn ? 'Syncing market data...' : '시장 데이터를 동기화 중입니다...',
    collapse: isEn ? 'Collapse ▲' : '접기 ▲',
    expand: isEn ? 'Expand ▼' : '지표 열기 ▼',
    syncingSentiment: isEn ? 'Syncing market sentiment...' : '시장 감정을 동기화하는 중...',
    lastUpdated: isEn ? 'Last Updated: ' : '최근 업데이트: ',
    srcIndices: isEn ? 'Indices, FX, VIX:' : '주가지수, 환율, VIX:',
    srcFG: isEn ? 'Fear & Greed:' : '공포와 탐욕:',
    srcYields: isEn ? 'Treasury Yields:' : '국채 금리:',
    srcFedRate: isEn ? 'Fed Funds Rate:' : '기준금리:',
    fgTitle: isEn ? 'Fear & Greed Index' : '공포와 탐욕 지수',
    yieldsTitle: isEn ? 'US Treasury Yields & Fed Rate' : '미 국채 금리 및 기준금리',
    tenYear: isEn ? '10-Year' : '10년물',
    twoYear: isEn ? '2-Year' : '2년물',
    fedRate: isEn ? 'Fed Rate' : '기준금리',
    yieldSpread: isEn ? 'Yield Spread: ' : '장단기 금리차: ',
    vixTitle: isEn ? 'VIX (Volatility)' : 'VIX (변동성)',
    vixStress: isEn ? 'Extreme stress. Beware of panic selling.' : '극심한 스트레스. 패닉셀 주의.',
    vixHigh: isEn ? 'High volatility. Defensive stance.' : '높은 변동성. 방어적 태세.',
    vixCalm: isEn ? 'Extreme calm. Beware of greed.' : '극단적 평온. 탐욕 경계.',
    vixStable: isEn ? 'Stable volatility.' : '안정적인 변동성.',
    fxTitle: isEn ? 'Exchange Rates (USD/KRW & DXY)' : '환율 (USD/KRW & DXY)',
    usdKrw: isEn ? 'USD/KRW' : '원/달러 환율',
    dxy: isEn ? 'Dollar Index' : '달러 인덱스',
    fxDesc: isEn ? 'Barometer of global liquidity and macro economy' : '글로벌 유동성과 거시 경제의 풍향계',
    kcaTitle: isEn ? 'Core Indices (S&P 500 & KOSPI)' : '핵심 인덱스 (S&P500 & KOSPI)',
    usdTrue: isEn ? 'USD True Value' : 'USD 본질',
    krwPerceived: isEn ? 'KRW Perceived' : 'KRW 체감',
    krwTrue: isEn ? 'KRW True Value' : 'KRW 본질',
    usdGlobal: isEn ? 'USD Global' : 'USD 글로벌',
    shortTermTitle: isEn ? 'Short-Term Pulse (Last 30 Days)' : '단기 펄스 (최근 30일 추이)',
    fgTrend: isEn ? 'Fear & Greed Trend' : 'Fear & Greed 추이',
    yieldsTrend: isEn ? 'Treasury Yields Trend' : '국채 금리 및 기준금리 추이',
    vixTrend: isEn ? 'VIX Trend' : 'VIX 변동성 추이',
    fxTrend: isEn ? 'USD/KRW Trend' : '원/달러 환율 추이',
    dxyTrend: isEn ? 'DXY Trend' : '달러 인덱스(DXY) 추이',
    longTermTitle: isEn ? 'Long-Term Asset Trajectory (2021-Present)' : '장기 자산 궤적 (2021년~현재)',
    sp500Chart: isEn ? 'S&P 500 Chart (2021-Present)' : 'S&P 500 차트 (2021년~현재)',
    kospiChart: isEn ? 'KOSPI Chart (2021-Present)' : 'KOSPI 차트 (2021년~현재)',
    relativeChart: isEn ? 'S&P 500 vs KOSPI (USD, 2021=100)' : 'S&P500 vs KOSPI 상대 비교 (USD 기준, 2021=100)',
    longTermFx: isEn ? 'Long-Term USD/KRW (Monthly)' : '원/달러 환율 장기 추이 (월간)',
    longTermYields: isEn ? 'Long-Term US Yields (Monthly)' : '미 국채 금리 장기 추이 (월간)'
  }
})
const error = ref(null)
const isExpanded = ref(false)
const canvasRef = ref(null)
let animFrameId = null

function startCanvasAnimation(canvas, state) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  const W = canvas.width
  const H = canvas.height

  if (state === 'fear') {
    // Rain streaks moving diagonally
    const drops = Array.from({ length: 80 }, () => ({
      x: Math.random() * W * 2,
      y: Math.random() * H,
      speed: 3 + Math.random() * 4,
      len: 12 + Math.random() * 18
    }))
    function drawRain() {
      ctx.clearRect(0, 0, W, H)
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'
      ctx.lineWidth = 1
      drops.forEach(d => {
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - d.len * 0.4, d.y + d.len)
        ctx.stroke()
        d.x -= 2; d.y += d.speed
        if (d.y > H) { d.y = -d.len; d.x = Math.random() * W * 2 }
      })
      animFrameId = requestAnimationFrame(drawRain)
    }
    drawRain()
  } else if (state === 'extreme_fear') {
    // Pulsing glow orb
    let t = 0
    function drawCompass() {
      ctx.clearRect(0, 0, W, H)
      const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.02))
      const grad = ctx.createRadialGradient(W * 0.15, H * 0.5, 0, W * 0.15, H * 0.5, W * 0.5)
      grad.addColorStop(0, `rgba(150,160,255,${pulse * 0.6})`)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
      t++
      animFrameId = requestAnimationFrame(drawCompass)
    }
    drawCompass()
  } else if (state === 'greed') {
    // Speed lines racing left to right
    const lines = Array.from({ length: 30 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      speed: 6 + Math.random() * 10,
      len: 30 + Math.random() * 60,
      opacity: 0.2 + Math.random() * 0.4
    }))
    function drawSpeed() {
      ctx.clearRect(0, 0, W, H)
      lines.forEach(l => {
        ctx.strokeStyle = `rgba(255,255,255,${l.opacity})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(l.x, l.y)
        ctx.lineTo(l.x + l.len, l.y)
        ctx.stroke()
        l.x += l.speed
        if (l.x > W) { l.x = -l.len; l.y = Math.random() * H }
      })
      animFrameId = requestAnimationFrame(drawSpeed)
    }
    drawSpeed()
  } else if (state === 'extreme_greed') {
    // Shimmering heat wave
    let t = 0
    function drawMirage() {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < 5; i++) {
        const x = W * 0.5 + Math.sin(t * 0.03 + i) * W * 0.3
        const pulse = 0.3 + 0.4 * Math.abs(Math.sin(t * 0.04 + i * 1.2))
        const grad = ctx.createRadialGradient(x, H * 0.5, 0, x, H * 0.5, H * 0.8)
        grad.addColorStop(0, `rgba(255,255,200,${pulse})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      }
      t++
      animFrameId = requestAnimationFrame(drawMirage)
    }
    drawMirage()
  } else if (state === 'neutral') {
    // Slow drifting light
    let t = 0
    function drawMarch() {
      ctx.clearRect(0, 0, W, H)
      const x = W * 0.5 + Math.sin(t * 0.008) * W * 0.4
      const grad = ctx.createRadialGradient(x, H * 0.5, 0, x, H * 0.5, H * 1.2)
      grad.addColorStop(0, 'rgba(255,255,255,0.25)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
      t++
      animFrameId = requestAnimationFrame(drawMarch)
    }
    drawMarch()
  }
}

const themeData = computed(() => {
  const isEn = lang.value === 'en-US'
  if (!marketData.value) return { icon: '🔄', msg: isEn ? 'Loading...' : '로딩 중...', cssClass: '' }
  const state = marketData.value.organism_state
  switch (state) {
    case 'extreme_fear':
      return { icon: '🧭', msg: isEn ? 'Pitch black. Trust only your compass (philosophy).' : '칠흑 같은 어둠입니다. 오직 나침반(철학)만 믿고 나아가세요.', cssClass: 'theme-compass' }
    case 'fear':
      return { icon: '🕯️', msg: isEn ? 'Wind and rain. Protect the ember of your goal.' : '비바람이 붑니다. 목표를 향한 불씨를 지켜내야 합니다.', cssClass: 'theme-candle' }
    case 'neutral':
      return { icon: '🛤️', msg: isEn ? 'A smooth path devoid of emotion. Walking steadily as planned.' : '감정이 배제된 평탄한 길입니다. 묵묵히 계획대로 걷고 있습니다.', cssClass: 'theme-march' }
    case 'greed':
      return { icon: '🚀', msg: isEn ? 'Strong tailwind gaining speed. Beware of arrogance and speeding.' : '강한 순풍에 속도가 붙습니다. 자만과 과속을 경계하세요.', cssClass: 'theme-tailwind' }
    case 'extreme_greed':
      return { icon: '🏜️', msg: isEn ? 'The most dangerous golden mirage. Stay away from euphoria.' : '가장 위험한 황금빛 신기루입니다. 환희를 멀리하세요.', cssClass: 'theme-mirage' }
    default:
      return { icon: '❓', msg: isEn ? 'Unknown state.' : '상태를 알 수 없습니다.', cssClass: '' }
  }
})


const pulseSpeed = computed(() => {
  if (!marketData.value) return '2s'
  const state = marketData.value.organism_state
  if (state === 'extreme_fear' || state === 'extreme_greed') return '0.8s'
  if (state === 'fear' || state === 'greed') return '1.5s'
  return '2.5s'
})

onMounted(async () => {
  try {
    const response = await fetch('/data/market-state.json?t=' + new Date().getTime())
    if (!response.ok) throw new Error('Failed to fetch market data')
    const data = await response.json()
    marketData.value = data
    loading.value = false
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('market-state-updated', { detail: data.organism_state }))
    }

    // Start canvas animation after DOM updates
    await nextTick()
    if (animFrameId) cancelAnimationFrame(animFrameId)
    startCanvasAnimation(canvasRef.value, data.organism_state)
  } catch (err) {
    console.error(err)
    error.value = '데이터를 불러오지 못했습니다.'
    loading.value = false
  }
})

const formattedDate = computed(() => {
  if (!marketData.value) return ''
  const date = new Date(marketData.value.updated_at)
  return date.toLocaleString('ko-KR')
})

const stateClass = computed(() => {
  if (!marketData.value) return ''
  return `state-${marketData.value.organism_state.replace('_', '-')}`
})

const displayState = computed(() => {
  if (!marketData.value) return ''
  const states = {
    'extreme_fear': '극단적 공포 (겨울)',
    'fear': '공포 (늦가을)',
    'neutral': '중립 (봄/가을)',
    'greed': '탐욕 (초여름)',
    'extreme_greed': '극단적 탐욕 (한여름)'
  }
  return states[marketData.value.organism_state] || '알 수 없음'
})

const stateMessage = computed(() => {
  if (!marketData.value) return ''
  const states = {
    'extreme_fear': '시장의 겨울입니다. 지금은 변동성을 견디고 원칙을 지켜야 할 때입니다.',
    'fear': '시장에 찬바람이 붑니다. Stay the Course!',
    'neutral': '시장이 평온합니다. 자산을 점검하고 일상에 집중하세요.',
    'greed': '시장이 따뜻해집니다. 포모(FOMO)를 경계하세요.',
    'extreme_greed': '시장의 한여름입니다. 환희에 취하지 않고 자산 배분 비중을 점검할 때입니다.'
  }
  return states[marketData.value.organism_state] || ''
})

/* Custom SVG Gauge Logic */
const activeSegmentIndex = computed(() => {
  if (!marketData.value) return 2
  const score = marketData.value.fear_and_greed.score
  if (score <= 25) return 0
  if (score <= 44) return 1
  if (score <= 55) return 2
  if (score <= 74) return 3
  return 4
})

const fgRatingString = computed(() => {
  if (!marketData.value) return 'LOADING'
  const labels = ['EXTREME FEAR', 'FEAR', 'NEUTRAL', 'GREED', 'EXTREME GREED']
  return labels[activeSegmentIndex.value]
})

const needleAngle = computed(() => {
  if (!marketData.value) return -90
  const score = marketData.value.fear_and_greed.score
  return -90 + (score / 100) * 180
})

const fgColor = computed(() => {
  const activeColors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e']
  return activeColors[activeSegmentIndex.value]
})

const vixColor = computed(() => {
  if (!marketData.value) return 'inherit'
  const vix = marketData.value.vix.latest
  if (vix > 30) return '#ef4444'
  if (vix > 20) return '#f97316'
  return 'inherit'
})

/* History Line Charts */
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { grid: { color: 'rgba(128, 128, 128, 0.1)' } },
    x: { grid: { display: false } }
  },
  plugins: { 
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false }
  }
}

const lineOptionsWithLegend = {
  ...lineOptions,
  plugins: { 
    legend: { display: true, position: 'bottom' },
    tooltip: { mode: 'index', intersect: false }
  }
}


const fgChartData = computed(() => {
  if (!marketData.value || !marketData.value.fear_and_greed.history) return null
  const history = marketData.value.fear_and_greed.history
  return {
    labels: history.map(item => item.date.substring(5)),
    datasets: [{
      label: 'Fear & Greed',
      borderColor: '#eab308',
      pointRadius: 1,
      data: history.map(item => item.value),
      fill: false,
      tension: 0.3
    }]
  }
})

const yieldsChartData = computed(() => {
  if (!marketData.value || !marketData.value.macro.history) return null
  const history = marketData.value.macro.history
  return {
    labels: history.map(item => item.date.substring(5)),
    datasets: [
      {
        label: '10년물',
        borderColor: '#3b82f6',
        pointRadius: 1,
        data: history.map(item => item.ten_year),
        tension: 0.3
      },
      {
        label: '2년물',
        borderColor: '#ef4444',
        pointRadius: 1,
        data: history.map(item => item.two_year),
        tension: 0.3
      },
      {
        label: '기준금리(EFFR)',
        borderColor: '#10b981',
        borderDash: [5, 5],
        pointRadius: 0,
        data: history.map(item => item.fed_rate),
        tension: 0.0
      }
    ]
  }
})

const vixChartData = computed(() => {
  if (!marketData.value || !marketData.value.vix.history) return null
  const history = marketData.value.vix.history
  return {
    labels: history.map(item => item.date.substring(5)),
    datasets: [{
      label: 'VIX',
      borderColor: '#8b5cf6',
      pointBackgroundColor: '#8b5cf6',
      pointRadius: 1,
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      data: history.map(item => item.value),
      fill: true,
      tension: 0.3
    }]
  }
})

const usdKrwChartData = computed(() => {
  if (!marketData.value || !marketData.value.exchange.history) return null
  const history = marketData.value.exchange.history
  return {
    labels: history.map(item => item.date.substring(5)),
    datasets: [{
      label: '원/달러 환율',
      borderColor: '#06b6d4',
      pointRadius: 1,
      data: history.map(item => item.usd_krw),
      fill: false,
      tension: 0.3
    }]
  }
})

const dxyChartData = computed(() => {
  if (!marketData.value || !marketData.value.exchange.history) return null
  const history = marketData.value.exchange.history
  return {
    labels: history.map(item => item.date.substring(5)),
    datasets: [{
      label: '달러 인덱스 (DXY)',
      borderColor: '#ec4899',
      pointRadius: 1,
      data: history.map(item => item.dxy),
      fill: false,
      tension: 0.3
    }]
  }
})

const gspcChartData = computed(() => {
  if (!marketData.value || !marketData.value.kca_indices.history) return null
  const history = marketData.value.kca_indices.history
  if (!history.length) return null
  const firstExchangeRate = history[0].gspc_krw / history[0].gspc_usd
  return {
    labels: history.map(item => item.date),
    datasets: [
      {
        label: 'S&P 500 (USD 본질)',
        borderColor: '#3b82f6',
        pointRadius: 0,
        data: history.map(item => item.gspc_usd),
        tension: 0.3
      },
      {
        label: 'S&P 500 (KRW 체감)',
        borderColor: '#3b82f6',
        borderDash: [5, 5],
        pointRadius: 0,
        data: history.map(item => item.gspc_krw / firstExchangeRate),
        tension: 0.3
      }
    ]
  }
})

const ks11ChartData = computed(() => {
  if (!marketData.value || !marketData.value.kca_indices.history) return null
  const history = marketData.value.kca_indices.history
  if (!history.length) return null
  const firstExchangeRate = history[0].ks11_krw / history[0].ks11_usd
  return {
    labels: history.map(item => item.date),
    datasets: [
      {
        label: 'KOSPI (KRW 본질)',
        borderColor: '#ef4444',
        pointRadius: 0,
        data: history.map(item => item.ks11_krw),
        tension: 0.3
      },
      {
        label: 'KOSPI (USD 글로벌)',
        borderColor: '#ef4444',
        borderDash: [5, 5],
        pointRadius: 0,
        data: history.map(item => item.ks11_usd * firstExchangeRate),
        tension: 0.3
      }
    ]
  }
})

const relativeUsdChartData = computed(() => {
  if (!marketData.value || !marketData.value.kca_indices.history) return null
  const history = marketData.value.kca_indices.history
  if (!history.length) return null
  
  const firstGspcUsd = history[0].gspc_usd
  const firstKs11Usd = history[0].ks11_usd
  
  return {
    labels: history.map(item => item.date),
    datasets: [
      {
        label: 'S&P 500 (USD)',
        borderColor: '#3b82f6',
        pointRadius: 0,
        data: history.map(item => (item.gspc_usd / firstGspcUsd) * 100),
        tension: 0.3
      },
      {
        label: 'KOSPI (USD)',
        borderColor: '#ef4444',
        pointRadius: 0,
        data: history.map(item => (item.ks11_usd / firstKs11Usd) * 100),
        tension: 0.3
      }
    ]
  }
})

const longTermUsdKrwChartData = computed(() => {
  if (!marketData.value || !marketData.value.kca_indices.history) return null
  const history = marketData.value.kca_indices.history
  return {
    labels: history.map(item => item.date),
    datasets: [{
      label: '원/달러 환율',
      borderColor: '#06b6d4',
      pointRadius: 0,
      data: history.map(item => item.usd_krw),
      fill: false,
      tension: 0.3
    }]
  }
})

const longTermYieldsChartData = computed(() => {
  if (!marketData.value || !marketData.value.kca_indices.history) return null
  const history = marketData.value.kca_indices.history
  return {
    labels: history.map(item => item.date),
    datasets: [
      {
        label: '10년물',
        borderColor: '#3b82f6',
        pointRadius: 0,
        data: history.map(item => item.ten_year),
        tension: 0.3
      },
      {
        label: '2년물',
        borderColor: '#ef4444',
        pointRadius: 0,
        data: history.map(item => item.two_year),
        tension: 0.3
      }
    ]
  }
})
</script>

<style scoped>
.market-dashboard-wrapper {
  margin: 2rem 0;
  font-family: inherit;
}

.loading, .error {
  padding: 2rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.market-dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 0.75rem;
}

.dashboard-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.last-updated {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.data-sources {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.source-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.source-item strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.state-banner {
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  text-align: center;
  transition: all 0.5s ease;
  border-left: 4px solid var(--vp-c-brand-1);
}

.state-banner h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.state-message {
  margin: 0;
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.dashboard-grid {
  display: grid;
  gap: 1.5rem;
}

.dashboard-grid.top-row {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.dashboard-grid.history-row {
  grid-template-columns: 1fr;
}

.history-title {
  margin: 1.5rem 0 0 0;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.card h4 {
  margin: 0 0 1rem 0;
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.fg-card-header {
  text-align: center;
  margin-bottom: 0.5rem;
}

.fg-card-header h4 {
  margin-bottom: 0.2rem;
}

.fg-status-label {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 1px;
}

/* Premium Gauge SVG specific styling */
.premium-card {
  background: linear-gradient(145deg, var(--vp-c-bg), var(--vp-c-bg-soft));
  border: 1px solid var(--vp-c-gutter);
  box-shadow: 0 8px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.05);
  position: relative;
}

.premium-gauge-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.premium-gauge-svg {
  width: 100%;
  max-width: 300px;
  overflow: visible;
}

.gauge-arc {
  transition: stroke 0.5s ease, stroke-width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.gauge-tick {
  font-size: 10px;
  font-weight: 800;
  fill: var(--vp-c-text-3);
  letter-spacing: -0.5px;
}

.gauge-score {
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -1px;
}

.gauge-rating {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

/* Yield Stats specific */
.yield-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  align-items: center;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat .label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.stat .value {
  font-size: 1.6rem;
  font-weight: 700;
}

.yield-spread {
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  background: var(--vp-c-bg-mute);
}

.yield-spread.inverted {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* VIX Stats specific */
.vix-stats-card {
  align-items: center;
  justify-content: center;
}

.vix-current {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.vix-value {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
}

.vix-description {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

/* Chart Wrappers */
.chart-wrapper {
  height: 250px;
  position: relative;
  width: 100%;
}

/* State Specific Theming inside Dashboard */
.state-extreme-fear .state-banner {
  background: rgba(59, 130, 246, 0.1);
  border-left-color: #3b82f6;
}

.state-extreme-greed .state-banner {
  background: rgba(239, 68, 68, 0.1);
  border-left-color: #ef4444;
}



/* Pilgrimage Themes */
.market-banner-btn {
  position: relative;
  overflow: hidden;
  border: none;
  background: var(--vp-c-bg-soft);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.market-banner-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}
.banner-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: relative;
  z-index: 2;
}
.theme-icon {
  font-size: 2.2rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}
.banner-text-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
}
.banner-title {
  font-weight: 800;
  font-size: 1.15rem;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  letter-spacing: -0.5px;
}
.banner-status {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.95);
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}
.banner-right {
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff !important;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  position: relative;
  z-index: 2;
}
.banner-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  z-index: 0;
  pointer-events: none;
}
.banner-left {
  position: relative;
  z-index: 2;
}

/* Theme 1: Compass (Extreme Fear) */
.theme-compass {
  background: linear-gradient(135deg, #0a0f1a, #1a2035);
}
.theme-compass .banner-fx-layer {
  background: radial-gradient(circle at 10% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 60%);
  animation: pulse-dark 3s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes pulse-dark {
  0% { opacity: 0.1; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.3); }
}

/* Theme 2: Candle (Fear) */
.theme-candle {
  background: linear-gradient(135deg, #1e293b, #334155);
}
.theme-candle .banner-fx-layer {
  width: 200%;
  left: 0;
  background-image: repeating-linear-gradient(115deg, transparent, transparent 20px, rgba(255, 255, 255, 0.25) 21px, transparent 22px);
  animation: rain-wind 2s infinite linear;
}
@keyframes rain-wind {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Theme 3: March (Neutral) */
.theme-march {
  background: linear-gradient(135deg, #e2e8f0, #f1f5f9);
}
.theme-march .banner-title, .theme-march .banner-status, .theme-march .banner-right {
  color: #0f172a !important;
  text-shadow: none;
}
.theme-march .banner-fx-layer {
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, transparent 60%);
  animation: peaceful-walk 6s infinite alternate ease-in-out;
}
@keyframes peaceful-walk {
  0% { transform: translateX(-30%); opacity: 0.5; }
  100% { transform: translateX(30%); opacity: 1; }
}

/* Theme 4: Tailwind (Greed) */
.theme-tailwind {
  background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
}
.theme-tailwind .banner-fx-layer {
  width: 200%;
  left: -100%;
  background: repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255, 255, 255, 0.35) 42px, transparent 45px);
  animation: tailwind-speed 1.5s infinite linear;
}
@keyframes tailwind-speed {
  0% { transform: translateX(0); }
  100% { transform: translateX(50%); }
}

/* Theme 5: Mirage (Extreme Greed) */
.theme-mirage {
  background: linear-gradient(135deg, #f59e0b, #ea580c, #b91c1c);
}
.theme-mirage .banner-fx-layer {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 50%);
  filter: blur(5px);
  animation: mirage-blur 1.5s infinite alternate ease-in-out;
}
@keyframes mirage-blur {
  0% { transform: scale(1) translateY(0); opacity: 0.4; }
  100% { transform: scale(2) translateY(-10px); opacity: 0.9; }
}

</style>

