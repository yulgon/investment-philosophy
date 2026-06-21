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
          v-for="group in groupedByYear"
          :key="group.year"
          class="timeline-node"
          ref="nodeRefs"
        >
          <div class="node-year-badge">{{ group.year }}</div>
          <div class="node-cards-container">
            <div
              v-for="(item, idx) in group.items"
              :key="idx"
              class="invest-card"
              :class="item.status"
            >
              <div class="card-header">
                <span class="symbol-name">{{ item.name }}</span>
                <span class="badge role-badge" :class="item.role">
                  {{ item.role === 'core' ? '🪐 행성 (Core)' : '🛰️ 위성 (Sat)' }}
                </span>
              </div>
              <div class="card-details">
                <div class="detail-row">
                  <span class="detail-label">투자 기간:</span>
                  <span class="detail-value">{{ item.yearStart }} ~ {{ item.yearEnd || '현재 진행형' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">유형:</span>
                  <span class="detail-value text-uppercase">{{ item.type }}</span>
                </div>
              </div>
              <div class="card-footer">
                <span class="status-indicator" :class="item.status">
                  {{ item.status === 'holding' ? '🟢 매일 적립 매수 중' : '⚪ 매도 완료' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onErrorCaptured, nextTick } from 'vue'
import { withBase } from 'vitepress'

const rawData = ref([])
const activeFilter = ref('all')
const sortAsc = ref(false)
const loading = ref(true)
const errorMsg = ref(null)

onErrorCaptured((err) => {
  errorMsg.value = 'Rendering Error: ' + String(err)
  return false
})

const totalCount = computed(() => rawData.value.length)
const holdingCount = computed(() => rawData.value.filter(i => i.status === 'holding').length)
const soldCount = computed(() => rawData.value.filter(i => i.status === 'sold').length)
const coreCount = computed(() => rawData.value.filter(i => i.role === 'core').length)
const satelliteCount = computed(() => rawData.value.filter(i => i.role === 'satellite').length)

const groupedByYear = computed(() => {
  let filtered = rawData.value
  if (activeFilter.value === 'core') filtered = filtered.filter(i => i.role === 'core')
  else if (activeFilter.value === 'satellite') filtered = filtered.filter(i => i.role === 'satellite')
  else if (activeFilter.value === 'holding') filtered = filtered.filter(i => i.status === 'holding')
  else if (activeFilter.value === 'sold') filtered = filtered.filter(i => i.status === 'sold')

  const groups = {}
  filtered.forEach(item => {
    if (!groups[item.yearStart]) groups[item.yearStart] = []
    groups[item.yearStart].push(item)
  })
  const years = Object.keys(groups).map(Number)
  years.sort((a, b) => sortAsc.value ? a - b : b - a)
  return years.map(yr => ({ year: yr, items: groups[yr] }))
})

onMounted(async () => {
  try {
    const url = withBase('/data/investments.csv')
    const response = await fetch(url)
    if (!response.ok) throw new Error('HTTP ' + response.status + ' fetching ' + url)
    const text = await response.text()
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)
    const parsed = []
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',')
      if (parts.length >= 6) {
        parsed.push({
          yearStart: parseInt(parts[0]),
          yearEnd: parts[1] ? parseInt(parts[1]) : null,
          name: parts[2],
          type: parts[3],
          role: parts[4],
          status: parts[5].trim()
        })
      }
    }
    rawData.value = parsed
    loading.value = false

    await nextTick()
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      }, { threshold: 0.05 })
      document.querySelectorAll('.timeline-node').forEach(el => observer.observe(el))
    }, 300)
  } catch (e) {
    errorMsg.value = 'Fetch/Parse Error: ' + String(e)
    loading.value = false
  }
})
</script>

<style scoped>
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
.history-container {
  margin-top: 2rem;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.stat-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
  text-align: center;
}
.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}
.text-green { color: #10b981; }
.text-gray  { color: #6b7280; }
.text-blue  { color: #3b82f6; }
.text-purple { color: #a855f7; }

/* Controls Bar */
.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  background: var(--vp-c-bg-soft);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-gutter);
}
.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.filter-buttons button {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
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
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  color: var(--vp-c-text-1);
}

/* Timeline */
.timeline-wrapper {
  position: relative;
  padding-left: 2.5rem;
  margin-left: 1rem;
}
.timeline-line {
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-gutter);
}
.timeline-node {
  position: relative;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.timeline-node.visible {
  opacity: 1;
  transform: translateY(0);
}
.node-year-badge {
  position: absolute;
  left: calc(-2.5rem - 11px);
  top: 0;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  box-shadow: 0 0 0 4px var(--vp-c-bg);
  z-index: 10;
}
.node-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
  margin-top: 1rem;
}

/* Investment Cards */
.invest-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 8px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.invest-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.invest-card.holding { border-left: 3px solid #10b981; }
.invest-card.sold    { border-left: 3px solid #6b7280; opacity: 0.85; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}
.symbol-name {
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}
.badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 500;
  white-space: nowrap;
}
.role-badge.core      { background: rgba(59,130,246,0.15); color: #3b82f6; }
.role-badge.satellite { background: rgba(168,85,247,0.15); color: #a855f7; }

.card-details {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  border-top: 1px dashed var(--vp-c-gutter);
  padding-top: 0.6rem;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}
.detail-label { color: var(--vp-c-text-3); }
.text-uppercase { text-transform: uppercase; }

.status-indicator { font-size: 0.8rem; font-weight: 500; }
.status-indicator.holding { color: #10b981; }
.status-indicator.sold    { color: #6b7280; }
</style>
