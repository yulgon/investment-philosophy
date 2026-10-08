<script setup>
import { useRoute } from 'vitepress'

const route = useRoute()

const chapters = [
  { path: '/en/stay-the-course/021-macro-survival-prologue', title: 'Prologue: The Asset I Trusted Most Was the One I Understood Least' },
  { path: '/en/stay-the-course/022-macro-survival-ch1', title: 'Chapter 1: I Expected Slower Growth in Korea, but the Market Moved on a Different Clock' },
  { path: '/en/stay-the-course/023-macro-survival-ch2', title: 'Chapter 2: Only After Retreating to Cash Did I Learn the Value of Waiting' },
  { path: '/en/stay-the-course/024-macro-survival-ch3', title: 'Chapter 3: I Extended Duration While Waiting for the Peak in Rates' },
  { path: '/en/stay-the-course/025-macro-survival-ch4', title: 'Chapter 4: Preparing for Inflation Added More Risk' },
  { path: '/en/stay-the-course/026-macro-survival-ch5', title: 'Chapter 5: I Tried to Forecast Rates and Currencies Together' },
  { path: '/en/stay-the-course/027-macro-survival-epilogue', title: 'Epilogue: Asking Again What My Investing Is For' }
]

function isActive(path) {
  return route.path.includes(path)
}
</script>

<template>
  <div class="macro-toc-container">
    <h3>🌊 [Macroeconomic Survival Series]</h3>
    <ul class="macro-toc-list">
      <li v-for="chapter in chapters" :key="chapter.path" :class="{ active: isActive(chapter.path) }">
        <a :href="chapter.path">{{ chapter.title }}</a>
        <span v-if="isActive(chapter.path)" class="current-badge">Current</span>
      </li>
    </ul>
    <div class="macro-toc-footer">
      <a href="/en/stay-the-course/?tag=MacroeconomicSurvival">📖 View full series</a>
    </div>
  </div>
</template>

<style scoped>
.macro-toc-container {
  margin-top: 3rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.macro-toc-container h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.macro-toc-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.macro-toc-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider-light);
  font-size: 0.95rem;
}

.macro-toc-list li:last-child {
  border-bottom: 0;
}

.macro-toc-list li a {
  color: var(--vp-c-brand);
  font-weight: 500;
  text-decoration: none;
}

.macro-toc-list li a:hover {
  color: var(--vp-c-brand-dark);
}

.macro-toc-list li.pending span {
  color: var(--vp-c-text-3);
  font-style: italic;
}

.current-badge {
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
}

.macro-toc-footer {
  margin-top: 1.5rem;
  text-align: right;
  font-size: 0.9rem;
}

.macro-toc-footer a {
  color: var(--vp-c-text-2);
  text-decoration: underline;
}

.macro-toc-footer a:hover {
  color: var(--vp-c-brand);
}
</style>
