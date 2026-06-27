<template>
  <div>
    <!-- Error Box -->
    <div v-if="errorMsg" class="error-box">
      <strong>오류 발생 (Error):</strong>
      <pre class="error-pre">{{ errorMsg }}</pre>
    </div>

    <div v-if="loading && !errorMsg" class="loading-box">
      데이터를 불러오는 중입니다...
    </div>

    <div v-else-if="!loading" class="history-container">

      <!-- Stats Cards Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">총 투자 종목</span>
          <span class="stat-value">{{ totalCount }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">현재 보유 중</span>
          <span class="stat-value text-green">{{ holdingCount }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">매도 완료</span>
          <span class="stat-value text-gray">{{ soldCount }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">핵심 행성(Core)</span>
          <span class="stat-value text-blue">{{ coreCount }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">주변 위성(Satellite)</span>
          <span class="stat-value text-purple">{{ satelliteCount }}</span>
        </div>
      </div>

      <!-- Filters & Controls Bar -->
      <div class="controls-bar">
        <div class="filter-buttons">
          <button :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">전체</button>
          <button :class="{ active: activeFilter === 'core' }" @click="activeFilter = 'core'">🪐 핵심 행성</button>
          <button :class="{ active: activeFilter === 'satellite' }" @click="activeFilter = 'satellite'">🛰️ 주변 위성</button>
          <button :class="{ active: activeFilter === 'holding' }" @click="activeFilter = 'holding'">🟢 보유 중</button>
          <button :class="{ active: activeFilter === 'sold' }" @click="activeFilter = 'sold'">⚪ 매도 완료</button>
        </div>
        <button class="sort-toggle" @click="sortAsc = !sortAsc">
          {{ sortAsc ? '⏰ 과거순 ⬆️' : '⏰ 최신순 ⬇️' }}
        </button>
      </div>

      <!-- Vertical Timeline -->
      <div class="timeline-wrapper">
        <div class="timeline-line"></div>

        <div
          v-for="(group, idx) in groupedByYear"
          :key="group.year"
          class="timeline-node"
          :class="idx % 2 === 0 ? 'theme-dark' : 'theme-light'"
        >
          <div class="timeline-dot"></div>
          <div class="node-year-watermark">{{ group.year }}</div>
          <div class="node-year-title">
            <span class="year-text">{{ group.year }}년</span>
            <span class="year-line"></span>
          </div>
          <div class="node-cards-container">
            <div
              v-for="(item, idx) in group.items"
              :key="idx"
              class="invest-card"
              :class="item.status"
            >
              <!-- Card Header -->
              <div class="card-header">
                <div class="card-title-row">
                  <span class="symbol-name">{{ item.name }}</span>
                  <span class="badge role-badge" :class="item.role">
                    {{ item.role === 'core' ? '🪐 Core' : '🛰️ Sat' }}
                  </span>
                </div>
                <div class="type-row">
                  <span class="type-tag" :class="item.type">{{ item.type.toUpperCase() }}</span>
                  <span class="status-badge" :class="item.status">
                    {{ item.status === 'holding' ? '🟢 보유' : '⚪ 매도' }}
                  </span>
                </div>
              </div>

              <!-- Duration Bar -->
              <div class="duration-section">
                <div class="duration-meta">
                  <span class="duration-years">
                    {{ durationYears(item) }}
                    <small>년</small>
                  </span>
                  <span class="duration-range">
                    {{ item.yearStart }} → {{ item.yearEnd || '현재' }}
                  </span>
                </div>
                <div class="duration-track">
                  <div class="duration-track-bg">
                    <!-- Year labels -->
                    <div class="track-labels">
                      <span>{{ TIMELINE_START }}</span>
                      <span>{{ TIMELINE_END }}</span>
                    </div>
                    <!-- Bar -->
                    <div
                      class="duration-bar"
                      :class="item.status"
                      :style="{
                        left: barLeft(item) + '%',
                        width: barWidth(item) + '%'
                      }"
                    >
                      <span v-if="barWidth(item) > 12" class="bar-inner-label">
                        {{ durationYears(item) }}y
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, onErrorCaptured, watch, nextTick } from 'vue'
import { withBase } from 'vitepress'

const TIMELINE_START = 2010
const TIMELINE_END   = new Date().getFullYear()
const TIMELINE_SPAN  = TIMELINE_END - TIMELINE_START

const rawData      = ref([])
const activeFilter = ref('all')
const sortAsc      = ref(true)
const loading      = ref(true)
const errorMsg     = ref(null)

onErrorCaptured((err) => {
  errorMsg.value = 'Rendering Error: ' + String(err)
  return false
})

// ---------- Stats ----------
const totalCount     = computed(() => rawData.value.length)
const holdingCount   = computed(() => rawData.value.filter(i => i.status === 'holding').length)
const soldCount      = computed(() => rawData.value.filter(i => i.status === 'sold').length)
const coreCount      = computed(() => rawData.value.filter(i => i.role === 'core').length)
const satelliteCount = computed(() => rawData.value.filter(i => i.role === 'satellite').length)

// ---------- Duration helpers ----------
function effectiveEnd(item) {
  return item.yearEnd ?? TIMELINE_END
}
function durationYears(item) {
  return Math.max(1, effectiveEnd(item) - item.yearStart)
}
function barLeft(item) {
  return Math.max(0, ((item.yearStart - TIMELINE_START) / TIMELINE_SPAN) * 100)
}
function barWidth(item) {
  const w = (durationYears(item) / TIMELINE_SPAN) * 100
  return Math.min(100 - barLeft(item), Math.max(2, w))
}

// ---------- Grouped / filtered data ----------
const groupedByYear = computed(() => {
  let filtered = rawData.value
  if      (activeFilter.value === 'core')      filtered = filtered.filter(i => i.role === 'core')
  else if (activeFilter.value === 'satellite') filtered = filtered.filter(i => i.role === 'satellite')
  else if (activeFilter.value === 'holding')   filtered = filtered.filter(i => i.status === 'holding')
  else if (activeFilter.value === 'sold')      filtered = filtered.filter(i => i.status === 'sold')

  const groups = {}
  filtered.forEach(item => {
    if (!groups[item.yearStart]) groups[item.yearStart] = []
    groups[item.yearStart].push(item)
  })
  const years = Object.keys(groups).map(Number)
  years.sort((a, b) => sortAsc.value ? a - b : b - a)
  return years.map(yr => ({ year: yr, items: groups[yr] }))
})

// ---------- Data fetch ----------
// 스크롤 애니메이션 Observer — 초기 로드 시에만 사용
function setupScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  }, { threshold: 0.05 })
  document.querySelectorAll('.timeline-node').forEach(el => observer.observe(el))
}

// 필터/정렬 변경 시: 애니메이션 없이 즉시 모두 표시
watch([activeFilter, sortAsc], async () => {
  await nextTick()
  document.querySelectorAll('.timeline-node').forEach(el => el.classList.add('visible'))
})

onMounted(async () => {
  // Force solid navbar to prevent full-bleed bands from showing through
  if (typeof document !== 'undefined') {
    document.body.classList.add('solid-nav-page')
  }

  try {
    const url = withBase('/data/investments.csv')
    const response = await fetch(url)
    if (!response.ok) throw new Error('HTTP ' + response.status + ' fetching ' + url)
    const text  = await response.text()
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)
    const parsed = []
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',')
      if (parts.length >= 6) {
        parsed.push({
          yearStart: parseInt(parts[0]),
          yearEnd:   parts[1] ? parseInt(parts[1]) : null,
          name:      parts[2],
          type:      parts[3],
          role:      parts[4],
          status:    parts[5].trim()
        })
      }
    }
    rawData.value = parsed
    loading.value = false

    await nextTick()
    setTimeout(setupScrollObserver, 300)
  } catch (e) {
    errorMsg.value = 'Fetch/Parse Error: ' + String(e)
    loading.value = false
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.classList.remove('solid-nav-page')
  }
})
</script>

<style scoped>
/* Force solid nav bar on this specific page */
:global(body.solid-nav-page .VPNavBar) {
  background-color: var(--vp-c-bg) !important;
  backdrop-filter: none !important;
}

/* ===== Layout ===== */
.loading-box {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}
.error-box {
  padding: 1rem;
  background: #fee2e2;
  border: 1px solid #f87171;
  color: #991b1b;
  border-radius: 8px;
  margin-bottom: 2rem;
}
.error-pre {
  white-space: pre-wrap;
  margin-top: 0.5rem;
  font-family: monospace;
  font-size: 0.85rem;
}
.history-container { margin-top: 2rem; }

/* ===== Stats Grid ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.stat-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  text-align: center;
}
.stat-value {
  font-size: 1.6rem;
  font-weight: 800;
}
.text-green  { color: #10b981; }
.text-gray   { color: #6b7280; }
.text-blue   { color: #3b82f6; }
.text-purple { color: #a855f7; }

/* ===== Controls ===== */
.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  background: var(--vp-c-bg-soft);
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-gutter);
}
.filter-buttons { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.filter-buttons button {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}
.filter-buttons button:hover { border-color: var(--vp-c-brand-1); }
.filter-buttons button.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.sort-toggle {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.82rem;
  cursor: pointer;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

/* ===== Timeline ===== */
.timeline-wrapper {
  position: relative;
  margin-top: 3rem;
  padding-bottom: 2rem;
  z-index: 1;
}
.timeline-line {
  position: absolute;
  left: 1.5rem;
  top: 4rem;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, var(--vp-c-brand-1), var(--vp-c-brand-2), transparent);
  z-index: 10;
  border-radius: 4px;
}
.timeline-dot {
  position: absolute;
  left: 1.125rem;
  top: 5rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 4px solid var(--vp-c-brand-1);
  z-index: 11;
  box-shadow: 0 0 0 4px var(--vp-c-bg);
}
.timeline-node {
  position: relative;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 4rem 0;
  border-radius: 0;
  border: none;
  margin-bottom: 0;
}

.timeline-node::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  background: var(--vp-c-bg);
  z-index: -1;
  border-bottom: 1px solid var(--vp-c-gutter);
}

.timeline-node.theme-dark {
  --vp-c-bg: #1b1b1f;
  --vp-c-bg-soft: #202127;
  --vp-c-gutter: #38383a;
  --vp-c-text-1: #fffff5;
  --vp-c-text-2: #ebebf599;
  color: var(--vp-c-text-1);
}

.timeline-node.theme-dark .type-tag.stock {
  color: #818cf8;
  background: rgba(99,102,241,0.25);
  border-color: rgba(99,102,241,0.4);
}
.timeline-node.theme-dark .type-tag.etf {
  color: #fbbf24;
  background: rgba(251,191,36,0.25);
  border-color: rgba(251,191,36,0.4);
}
.timeline-node.theme-dark .role-badge.core {
  color: #60a5fa;
  background: rgba(59,130,246,0.25);
}
.timeline-node.theme-dark .role-badge.satellite {
  color: #c084fc;
  background: rgba(168,85,247,0.25);
}

.timeline-node.theme-light {
  --vp-c-bg: #ffffff;
  --vp-c-bg-soft: #f6f6f7;
  --vp-c-gutter: #e2e2e3;
  --vp-c-text-1: #3c3c43;
  --vp-c-text-2: #3c3c43c7;
  color: var(--vp-c-text-1);
}
.timeline-node.visible {
  opacity: 1;
  transform: translateY(0);
}

.node-year-watermark {
  position: absolute;
  top: 1rem;
  right: 0;
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 900;
  color: var(--vp-c-text-1);
  opacity: 0.04;
  line-height: 0.8;
  pointer-events: none;
  z-index: 0;
  letter-spacing: -0.05em;
  user-select: none;
}

.node-year-title {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding-left: 4rem;
}

.year-text {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  letter-spacing: -0.03em;
}

.year-line {
  flex: 1;
  height: 2px;
  background: var(--vp-c-gutter);
  opacity: 0.5;
}

.node-cards-container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding-left: 4rem;
}

/* ===== Investment Card ===== */
.invest-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  padding: 1rem 1.1rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.invest-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}
.invest-card.holding { border-left: 4px solid #10b981; }
.invest-card.sold    { border-left: 4px solid #9ca3af; opacity: 0.88; }

/* Card Header */
.card-header { display: flex; flex-direction: column; gap: 0.4rem; }

.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
.symbol-name {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}
.badge {
  font-size: 0.7rem;
  padding: 0.12rem 0.45rem;
  border-radius: 20px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}
.role-badge.core      { background: rgba(59,130,246,0.15); color: #3b82f6; }
.role-badge.satellite { background: rgba(168,85,247,0.15); color: #a855f7; }

.type-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.type-tag {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  letter-spacing: 0.04em;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-2);
}
.type-tag.etf   { background: rgba(251,191,36,0.15); color: #b45309; border-color: rgba(251,191,36,0.4); }
.type-tag.stock { background: rgba(99,102,241,0.12); color: #4338ca; border-color: rgba(99,102,241,0.3); }
.status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.status-badge.holding { color: #10b981; }
.status-badge.sold    { color: #9ca3af; }

/* ===== Duration Bar ===== */
.duration-section { display: flex; flex-direction: column; gap: 0.35rem; }

.duration-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.duration-years {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  line-height: 1;
}
.duration-years small {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  margin-left: 2px;
}
.duration-range {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.duration-track { padding-top: 0.1rem; }
.duration-track-bg {
  position: relative;
  height: 28px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 6px;
  overflow: hidden;
}
.track-labels {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
  pointer-events: none;
  z-index: 1;
  font-variant-numeric: tabular-nums;
}
.duration-bar {
  position: absolute;
  top: 3px;
  bottom: 3px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: width 0.5s ease, left 0.5s ease;
  min-width: 6px;
}
.duration-bar.holding {
  background: linear-gradient(90deg, #059669, #10b981);
  box-shadow: 0 0 8px rgba(16,185,129,0.4);
}
.duration-bar.sold {
  background: linear-gradient(90deg, #4b5563, #9ca3af);
}
.bar-inner-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
</style>
