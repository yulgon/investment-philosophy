<template>
  <div class="evo-toc-container">
    <h3>📚 [투자 진화론 연재 시리즈]</h3>
    <ul class="evo-toc-list">
      <li>
        <a href="/stay-the-course/005-evo-prologue">프롤로그: 11년 수익률 0%였던 투자자가 찾아낸 궁극의 생존 공식</a>
      </li>
      <li>
        <a href="/stay-the-course/006-evo-ch1">1장: 위대한 깨달음 (투자는 과학이다)</a>
      </li>
      <li class="active">
        <a href="/stay-the-course/007-evo-ch2">2장: 인덱스 펀드의 탄생 (나의 무지를 방어하다)</a> <span class="current-badge">현재 글</span>
      </li>
      <li class="pending">
        <span>3장: 행동재무학 (작성 중 ✍️)</span>
      </li>
      <li class="pending">
        <span>4장: 3요인 모델 (작성 중 ✍️)</span>
      </li>
      <li class="pending">
        <span>5장: ETF의 탄생 (작성 중 ✍️)</span>
      </li>
      <li class="pending">
        <span>6장: 모멘텀의 발견 (작성 중 ✍️)</span>
      </li>
      <li class="pending">
        <span>7장: 스마트베타 (작성 중 ✍️)</span>
      </li>
      <li class="pending">
        <span>8장: SCHD의 탄생 (작성 중 ✍️)</span>
      </li>
      <li class="pending">
        <span>9장: 빅테크와 SPMO (작성 중 ✍️)</span>
      </li>
      <li class="pending">
        <span>10장: 궁극의 포트폴리오 (작성 중 ✍️)</span>
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
