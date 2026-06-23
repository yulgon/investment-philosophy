<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import MarketPulseDashboard from './MarketPulseDashboard.vue'

const isOpen = ref(false)
const marketData = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/data/market-state.json?t=' + new Date().getTime())
    if (res.ok) {
      marketData.value = await res.json()
    }
  } catch (e) {
    console.error('Failed to load market state for drawer', e)
  }
})

const pulseColor = computed(() => {
  if (!marketData.value) return '#888'
  const state = marketData.value.organism_state
  switch(state) {
    case 'extreme_fear': return '#db2828' // Red
    case 'fear': return '#f2711c' // Orange
    case 'neutral': return '#fbbd08' // Yellow
    case 'greed': return '#b5cc18' // Light Green
    case 'extreme_greed': return '#21ba45' // Dark Green
    default: return '#888'
  }
})

const pulseSpeed = computed(() => {
  if (!marketData.value) return '2s'
  const state = marketData.value.organism_state
  if (state === 'extreme_fear' || state === 'extreme_greed') return '0.8s'
  if (state === 'fear' || state === 'greed') return '1.5s'
  return '2.5s'
})

const toggleDrawer = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeDrawer = () => {
  if (isOpen.value) {
    isOpen.value = false
    document.body.style.overflow = ''
  }
}

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="market-drawer-wrapper">
    <!-- Floating Action Button -->
    <button 
      class="pulse-fab" 
      @click="toggleDrawer" 
      :style="{ '--pulse-color': pulseColor, '--pulse-speed': pulseSpeed }"
      aria-label="Toggle Market Dashboard"
    >
      <div class="pulse-core"></div>
      <div class="pulse-ring"></div>
    </button>

    <!-- Drawer Overlay Backdrop -->
    <transition name="fade">
      <div v-if="isOpen" class="drawer-backdrop" @click="closeDrawer"></div>
    </transition>

    <!-- Drawer Panel -->
    <transition name="slide">
      <div v-if="isOpen" class="drawer-panel">
        <div class="drawer-header">
          <h2 class="drawer-title">시장 관측소</h2>
          <button class="close-btn" @click="closeDrawer">✕</button>
        </div>
        <div class="drawer-content">
          <MarketPulseDashboard />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* FAB Styling */
.pulse-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--vp-c-bg);
  border: 2px solid var(--pulse-color);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: transform 0.2s ease;
}

.pulse-fab:hover {
  transform: scale(1.05);
}

.pulse-core {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--pulse-color);
  position: relative;
  z-index: 2;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: var(--pulse-color);
  z-index: 1;
  animation: pulse-animation var(--pulse-speed) infinite cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pulse-animation {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
}

/* Backdrop */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
}

/* Drawer Panel */
.drawer-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 550px;
  max-width: 100vw;
  background-color: var(--vp-c-bg);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.drawer-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
}

.close-btn:hover {
  color: var(--vp-c-brand-1);
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .drawer-panel {
    width: 100vw;
  }
  .pulse-fab {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 50px;
    height: 50px;
  }
  .drawer-content {
    padding: 1rem;
  }
}
</style>
