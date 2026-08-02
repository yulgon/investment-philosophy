<script setup>
import { useRoute } from 'vitepress'

const route = useRoute()

const chapters = [
  { path: '/stay-the-course/021-macro-survival-prologue', title: '프롤로그: 가장 안전하다고 믿었던 자산이 나를 가장 불안하게 만들었다' },
  { path: '/stay-the-course/022-macro-survival-ch1', title: '1장: 한국의 저성장에 베팅했지만, 시장은 내 순서대로 움직이지 않았다' }
]

const pendingChapters = [
  '2장: 피난처의 재발견 (이자율 폭등 시대의 생존법)',
  '3장: 피벗을 향한 반격 (듀레이션의 지렛대)',
  '4장: 혼돈의 2023년 (채권의 천적과 탐욕의 독배)',
  '5장: 매크로의 종착지 (환율과 금리를 넘나들다)',
  '6장: 실패를 넘어 성공으로 (미래의 나에게 보내는 월급)'
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
      <li v-for="chapter in pendingChapters" :key="chapter" class="pending">
        <span>{{ chapter }} · 연재 예정</span>
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
