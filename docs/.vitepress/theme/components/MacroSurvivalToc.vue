<script setup>
import { useRoute } from 'vitepress'

const route = useRoute()

const chapters = [
  { path: '/stay-the-course/021-macro-survival-prologue', title: '프롤로그: 가장 안전하다고 믿었던 자산을 가장 모르고 있었다' },
  { path: '/stay-the-course/022-macro-survival-ch1', title: '1장: 한국의 저성장을 예상했지만, 시장의 시간은 달랐다' },
  { path: '/stay-the-course/023-macro-survival-ch2', title: '2장: 현금으로 물러나서야 기다림의 가치를 알았다' },
  { path: '/stay-the-course/024-macro-survival-ch3', title: '3장: 금리의 정점을 기다리며 듀레이션을 늘렸다' },
  { path: '/stay-the-course/025-macro-survival-ch4', title: '4장: 인플레이션을 대비하며 더 큰 위험을 더했다' },
  { path: '/stay-the-course/026-macro-survival-ch5', title: '5장: 금리와 환율을 함께 예측하려 했다' },
  { path: '/stay-the-course/027-macro-survival-epilogue', title: '에필로그: 손실 앞에서 다시 투자의 목적을 묻다' }
]

function isActive(path) {
  return route.path.includes(path)
}
</script>

<template>
  <div class="macro-toc-container">
    <h3>🌊 [거시경제 생존기 연재 시리즈]</h3>
    <ul class="macro-toc-list">
      <li v-for="chapter in chapters" :key="chapter.path" :class="{ active: isActive(chapter.path) }">
        <a :href="chapter.path">{{ chapter.title }}</a>
        <span v-if="isActive(chapter.path)" class="current-badge">현재 글</span>
      </li>
    </ul>
    <div class="macro-toc-footer">
      <a href="/stay-the-course/?tag=거시경제생존기">📖 시리즈 전체 모아보기 (태그 검색)</a>
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
