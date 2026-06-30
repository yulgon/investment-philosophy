<template>
  <div class="evo-toc-container">
    <h3>📚 [Evolution of Investment Series]</h3>
    <ul class="evo-toc-list">
      <li class="active">
        <a href="/en/stay-the-course/005-evo-prologue">Prologue: The Ultimate Survival Formula</a> <span class="current-badge">Current</span>
      </li>
      <li class="pending">
        <span>Chapter 1: The Great Awakening (Drafting ✍️)</span>
      </li>
      <li class="pending">
        <span>Chapter 2: Birth of the Index Fund (Drafting ✍️)</span>
      </li>
      <li class="pending">
        <span>Chapter 3: Behavioral Finance (Drafting ✍️)</span>
      </li>
      <li class="pending">
        <span>Chapter 4: The 3-Factor Model (Drafting ✍️)</span>
      </li>
      <li class="pending">
        <span>Chapter 5: Birth of the ETF (Drafting ✍️)</span>
      </li>
      <li class="pending">
        <span>Chapter 6: Discovery of Momentum (Drafting ✍️)</span>
      </li>
      <li class="pending">
        <span>Chapter 7: Smart Beta (Drafting ✍️)</span>
      </li>
      <li class="pending">
        <span>Chapter 8: Birth of SCHD (Drafting ✍️)</span>
      </li>
      <li class="pending">
        <span>Chapter 9: Big Tech and SPMO (Drafting ✍️)</span>
      </li>
      <li class="pending">
        <span>Chapter 10: The Ultimate Portfolio (Drafting ✍️)</span>
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
