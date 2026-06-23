<script setup>
import DefaultTheme from 'vitepress/theme'
import MarketPulseDashboard from './components/MarketPulseDashboard.vue'

const { Layout } = DefaultTheme
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
