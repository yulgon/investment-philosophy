<template>
  <div class="performance-container">
    <div class="performance-header">
      <div class="title-group">
        <h3 class="perf-title">📈 연도별 복리 목표 대비 초과 달성률</h3>
        <p class="perf-subtitle">연 7% 복리 성장 경로(기준선 0%) 대비 실제 자산 평가액의 초과율</p>
      </div>
      <span class="privacy-badge">🔒 Privacy Masking Active</span>
    </div>

    <!-- Chart Grid -->
    <div class="chart-wrapper">
      <svg viewBox="0 0 600 240" width="100%" height="auto" class="perf-svg">
        <!-- Grid lines -->
        <g stroke="var(--vp-c-gutter)" stroke-width="1" stroke-dasharray="3,3">
          <line x1="50" y1="180" x2="550" y2="180" />
          <line x1="50" y1="130" x2="550" y2="130" />
          <line x1="50" y1="80" x2="550" y2="80" />
          <line x1="50" y1="30" x2="550" y2="30" />
        </g>

        <!-- Base line (0%) -->
        <line x1="50" y1="180" x2="550" y2="180" stroke="var(--vp-c-text-3)" stroke-width="1.5" />
        
        <!-- Y-Axis labels -->
        <g fill="var(--vp-c-text-3)" font-size="10" text-anchor="end">
          <text x="42" y="184">0%</text>
          <text x="42" y="134">+30%</text>
          <text x="42" y="84">+60%</text>
          <text x="42" y="34">+90%</text>
        </g>

        <!-- Bars & Labels -->
        <!-- 2023: +5.93% (Height = 5.93 / 90 * 150 = 9.8px, Y = 180 - 9.8 = 170.2) -->
        <g class="bar-group" @mouseenter="activeYear = 2023" @mouseleave="activeYear = null">
          <rect x="100" y="170" width="45" height="10" fill="url(#grad-green)" rx="3" class="bar-rect" :class="{ dimmed: activeYear && activeYear !== 2023 }" />
          <text x="122.5" y="160" fill="var(--vp-c-text-1)" font-size="11" font-weight="600" text-anchor="middle" class="bar-label">+5.9%</text>
          <text x="122.5" y="200" fill="var(--vp-c-text-2)" font-size="11" font-weight="700" text-anchor="middle">2023년</text>
        </g>

        <!-- 2024: +5.77% (Height = 5.77 / 90 * 150 = 9.6px, Y = 180 - 9.6 = 170.4) -->
        <g class="bar-group" @mouseenter="activeYear = 2024" @mouseleave="activeYear = null">
          <rect x="220" y="170" width="45" height="10" fill="url(#grad-green)" rx="3" class="bar-rect" :class="{ dimmed: activeYear && activeYear !== 2024 }" />
          <text x="242.5" y="160" fill="var(--vp-c-text-1)" font-size="11" font-weight="600" text-anchor="middle" class="bar-label">+5.8%</text>
          <text x="242.5" y="200" fill="var(--vp-c-text-2)" font-size="11" font-weight="700" text-anchor="middle">2024년</text>
        </g>

        <!-- 2025: +28.93% (Height = 28.93 / 90 * 150 = 48.2px, Y = 180 - 48.2 = 131.8) -->
        <g class="bar-group" @mouseenter="activeYear = 2025" @mouseleave="activeYear = null">
          <rect x="340" y="132" width="45" height="48" fill="url(#grad-green)" rx="3" class="bar-rect" :class="{ dimmed: activeYear && activeYear !== 2025 }" />
          <text x="362.5" y="122" fill="var(--vp-c-text-1)" font-size="11" font-weight="600" text-anchor="middle" class="bar-label">+28.9%</text>
          <text x="362.5" y="200" fill="var(--vp-c-text-2)" font-size="11" font-weight="700" text-anchor="middle">2025년</text>
        </g>

        <!-- 2026: +84.88% (Height = 84.88 / 90 * 150 = 141.4px, Y = 180 - 141.4 = 38.6) -->
        <g class="bar-group" @mouseenter="activeYear = 2026" @mouseleave="activeYear = null">
          <rect x="460" y="39" width="45" height="141" fill="url(#grad-green-glow)" rx="3" class="bar-rect" :class="{ dimmed: activeYear && activeYear !== 2026 }" />
          <text x="482.5" y="29" fill="var(--vp-c-brand-1)" font-size="12" font-weight="700" text-anchor="middle" class="bar-label highlight-label">+84.9%</text>
          <text x="482.5" y="200" fill="var(--vp-c-text-2)" font-size="11" font-weight="700" text-anchor="middle">2026년 (현)</text>
        </g>

        <!-- Defs for Gradient -->
        <defs>
          <linearGradient id="grad-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#059669" />
          </linearGradient>
          <linearGradient id="grad-green-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#34d399" />
            <stop offset="100%" stop-color="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Stats Cards for details -->
    <div class="perf-details">
      <div class="detail-card" :class="{ active: activeYear === 2023 }">
        <span class="year-label">2023년 성과</span>
        <span class="percent-val text-green">+5.9%</span>
        <span class="status-desc">복리 기대치 초과 달성 🟢</span>
      </div>
      <div class="detail-card" :class="{ active: activeYear === 2024 }">
        <span class="year-label">2024년 성과</span>
        <span class="percent-val text-green">+5.8%</span>
        <span class="status-desc">복리 기대치 초과 달성 🟢</span>
      </div>
      <div class="detail-card" :class="{ active: activeYear === 2025 }">
        <span class="year-label">2025년 성과</span>
        <span class="percent-val text-green">+28.9%</span>
        <span class="status-desc">상승장 대비 초과 달성 🚀</span>
      </div>
      <div class="detail-card highlight-card" :class="{ active: activeYear === 2026 }">
        <span class="year-label">2026년 (현재)</span>
        <span class="percent-val text-emerald">+84.9%</span>
        <span class="status-desc">자산 폭풍 성장 구간 ✨</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeYear = ref(null)
</script>

<style scoped>
.performance-container {
  margin: 2.5rem 0;
  padding: 1.8rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  font-family: var(--vp-font-family-base);
}

.performance-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.title-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.perf-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.perf-subtitle {
  margin: 0;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.privacy-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  padding: 0.3rem 0.65rem;
  border-radius: 20px;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.chart-wrapper {
  padding: 0.5rem 0;
}

.perf-svg {
  display: block;
}

.bar-group {
  cursor: pointer;
}

.bar-rect {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.bar-rect.dimmed {
  opacity: 0.35;
}

.bar-label {
  opacity: 0.9;
  transition: opacity 0.2s ease, font-size 0.2s ease;
}

.bar-group:hover .bar-label {
  opacity: 1;
  font-size: 13px;
}

.highlight-label {
  fill: var(--vp-c-brand-1);
}

/* Details Cards */
.perf-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1.8rem;
}

.detail-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 10px;
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.3rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.detail-card.active {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.year-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.percent-val {
  font-size: 1.4rem;
  font-weight: 800;
}

.text-green {
  color: #10b981;
}

.text-emerald {
  color: #059669;
}

.status-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.highlight-card {
  border-color: rgba(16, 185, 129, 0.3);
  background: linear-gradient(180deg, var(--vp-c-bg), rgba(16, 185, 129, 0.02));
}

.highlight-card.active {
  border-color: #10b981;
}
</style>
