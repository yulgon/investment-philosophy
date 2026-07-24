<script setup>
import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent } from 'vue'

const { Layout } = DefaultTheme
const MarketPulseDashboard = defineAsyncComponent(() =>
  import('./components/MarketPulseDashboard.vue')
)
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <div class="vp-doc" style="max-width: 1152px; margin: 0 auto; padding: 0 24px; margin-top: 2rem;">
        <MarketPulseDashboard />
      </div>
    </template>
  </Layout>
</template>
