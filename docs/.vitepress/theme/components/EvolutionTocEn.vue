<script setup>
import { useRoute } from 'vitepress'
const route = useRoute()

const chapters = [
  { path: '/en/stay-the-course/005-evo-prologue', title: 'Prologue: The Ultimate Survival Formula' },
  { path: '/en/stay-the-course/006-evo-ch1', title: 'Chapter 1: The Great Awakening' },
  { path: '/en/stay-the-course/007-evo-ch2', title: 'Chapter 2: Birth of the Index Fund' },
  { path: '/en/stay-the-course/008-evo-ch3', title: 'Chapter 3: Behavioral Finance' },
  { path: '/en/stay-the-course/009-evo-ch4', title: 'Chapter 4: The 3-Factor Model' },
  { path: '/en/stay-the-course/010-evo-ch5', title: 'Chapter 5: Birth of the ETF' },
  { path: '/en/stay-the-course/011-evo-ch6', title: 'Chapter 6: Discovery of Momentum' },
  { path: '/en/stay-the-course/012-evo-ch7', title: 'Chapter 7: Madness and Mentality (Smart Beta)' },
  { path: '/en/stay-the-course/013-evo-ch8', title: 'Chapter 8: Birth of SCHD' },
  { path: '/en/stay-the-course/014-evo-ch9', title: 'Chapter 9: Big Tech and SPMO' },
]

const pendingChapters = [
  'Chapter 10: The Ultimate Portfolio (Drafting ✍️)',
]

function isActive(path) {
  return route.path.includes(path)
}
</script>

<template>
  <div class="evo-toc-container">
    <h3>📚 [Evolution of Investment Series]</h3>
    <ul class="evo-toc-list">
      <li v-for="ch in chapters" :key="ch.path" :class="{ active: isActive(ch.path) }">
        <a :href="ch.path">{{ ch.title }}</a>
        <span v-if="isActive(ch.path)" class="current-badge">Current</span>
      </li>
      <li v-for="ch in pendingChapters" :key="ch" class="pending">
        <span>{{ ch }}</span>
      </li>
    </ul>
    <div class="evo-toc-footer">
      <a href="/en/stay-the-course/?tag=Evolution of Investment">📖 View full series</a>
    </div>
  </div>
</template>

<style scoped>
.evo-toc-container {
  margin-top: 3rem;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.evo-toc-container h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.evo-toc-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.evo-toc-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider-light);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.evo-toc-list li:last-child {
  border-bottom: none;
}

.evo-toc-list li a {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.evo-toc-list li a:hover {
  color: var(--vp-c-brand-dark);
}

.evo-toc-list li.pending span {
  color: var(--vp-c-text-3);
  font-style: italic;
}

.current-badge {
  font-size: 0.75rem;
  background-color: var(--vp-c-brand);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.evo-toc-footer {
  margin-top: 1.5rem;
  text-align: right;
  font-size: 0.9rem;
}

.evo-toc-footer a {
  color: var(--vp-c-text-2);
  text-decoration: underline;
}

.evo-toc-footer a:hover {
  color: var(--vp-c-brand);
}
</style>
