<script setup>
import { useRoute } from 'vitepress'
const route = useRoute()

const chapters = [
  { path: '/stay-the-course/005-evo-prologue', title: '프롤로그: 11년 수익률 0%였던 투자자가 찾아낸 궁극의 생존 공식' },
  { path: '/stay-the-course/006-evo-ch1', title: '1장: 위대한 깨달음 (투자는 과학이다)' },
  { path: '/stay-the-course/007-evo-ch2', title: '2장: 인덱스 펀드의 탄생 (나의 무지를 방어하다)' },
  { path: '/stay-the-course/008-evo-ch3', title: '3장: 행동재무학 (블랙 먼데이)' },
  { path: '/stay-the-course/009-evo-ch4', title: '4장: 3요인 모델 (가치 팩터 증명)' },
  { path: '/stay-the-course/010-evo-ch5', title: '5장: ETF의 탄생 (바코드 혁명)' },
  { path: '/stay-the-course/011-evo-ch6', title: '6장: 모멘텀의 발견 (탐욕에 올라타다)' },
  { path: '/stay-the-course/012-evo-ch7', title: '7장: 로봇과 인간의 차이 (스마트 베타)' },
  { path: '/stay-the-course/013-evo-ch8', title: '8장: SCHD의 탄생 (현금흐름 방패)' },
  { path: '/stay-the-course/014-evo-ch9', title: '9장: 빅테크와 SPMO (가장 날카로운 창)' },
]

const pendingChapters = [
  '10장: 궁극의 삼위일체 포트폴리오 (작성 중 ✍️)',
]

function isActive(path) {
  return route.path.includes(path)
}
</script>

<template>
  <div class="evo-toc-container">
    <h3>📚 [투자 진화론 연재 시리즈]</h3>
    <ul class="evo-toc-list">
      <li v-for="ch in chapters" :key="ch.path" :class="{ active: isActive(ch.path) }">
        <a :href="ch.path">{{ ch.title }}</a>
        <span v-if="isActive(ch.path)" class="current-badge">현재 글</span>
      </li>
      <li v-for="ch in pendingChapters" :key="ch" class="pending">
        <span>{{ ch }}</span>
      </li>
    </ul>
    <div class="evo-toc-footer">
      <a href="/stay-the-course/?tag=투자진화론">📖 시리즈 전체 모아보기 (태그 검색)</a>
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
