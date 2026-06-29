<script setup>
import DefaultTheme from 'vitepress/theme'
import MarketPulseDashboard from './components/MarketPulseDashboard.vue'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { Layout } = DefaultTheme
const { lang } = useData()

const t = computed(() => {
  const isEn = lang.value === 'en-US'
  return {
    title: isEn ? '⚠️ Copyright Notice' : '⚠️ 저작권 안내 (Copyright Notice)',
    body1: isEn ? 'All content on this site (articles, diagrams, data structures, etc.) is protected by copyright law.' : '본 사이트의 모든 콘텐츠(글, 다이어그램, 데이터 구성 등)는 저작권법의 보호를 받습니다.',
    body2: isEn ? '<strong>Unauthorized reproduction, copying, crawling, and distribution</strong> without prior permission are strictly prohibited, and legal action may be taken in accordance with relevant laws in case of violation.' : '사전 허락 없는 <strong>무단 전재, 복사, 크롤링 및 배포를 엄격히 금지</strong>하며, 위반 시 관련 법령에 따라 법적 조치가 취해질 수 있습니다.'
  }
})
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <div class="vp-doc" style="max-width: 1152px; margin: 0 auto; padding: 0 24px; margin-top: 2rem;">
        <MarketPulseDashboard />
      </div>
    </template>
    <template #doc-after>
      <div class="copyright-warning" style="margin-top: 4rem; margin-bottom: 2rem; padding: 1.5rem; background-color: var(--vp-c-bg-soft); border-radius: 8px; border-left: 4px solid var(--vp-c-brand);">
        <p style="margin: 0; font-size: 0.9rem; color: var(--vp-c-text-2); line-height: 1.6;">
          <strong>{{ t.title }}</strong><br>
          {{ t.body1 }} <br>
          <span v-html="t.body2"></span>
        </p>
      </div>
    </template>
  </Layout>
</template>
