<script setup lang="ts">
import { ref, computed } from 'vue'
import { books, Book } from '../books/booksData'

const step = ref(0)
const answers = ref({
  q1: '',
  q2: '',
  q3: ''
})

const questions = [
  {
    id: 'q1',
    title: '주식 투자 경험이 어떻게 되시나요?',
    options: [
      { value: 'beginner', label: '🌱 이제 막 시작하려는 입문자' },
      { value: 'mid', label: '🏃 1~3년 차 (경험은 있지만 아직 흔들림)' },
      { value: 'expert', label: '⛰️ 3년 이상 (자신만의 원칙을 다듬는 중)' }
    ]
  },
  {
    id: 'q2',
    title: '현재 가장 관심 있는 투자 스타일(목표)은 무엇인가요?',
    options: [
      { value: 'index', label: '🐢 마음 편한 장기 분산 투자 (자산배분/ETF)' },
      { value: 'macro', label: '🌍 거시 경제와 큰 흐름 읽기 (매크로/환율)' },
      { value: 'dividend', label: '💸 제2의 월급 만들기 (배당/현금흐름)' },
      { value: 'mindset', label: '🧘 멘탈 관리와 투자의 본질 깨닫기 (마인드셋)' }
    ]
  },
  {
    id: 'q3',
    title: '지금 가장 고민되는 부분은 무엇인가요?',
    options: [
      { value: 'no_rule', label: '🤔 어떤 종목이나 자산을 사야 할지 기준이 없다.' },
      { value: 'mental', label: '📉 시장이 하락하면 두렵고 멘탈 관리가 안 된다.' },
      { value: 'economy', label: '📰 금리나 환율 같은 경제 기사를 읽어도 잘 모르겠다.' },
      { value: 'cashflow', label: '🏜️ 당장 손에 쥐어지는 현금 수익이 없어 답답하다.' }
    ]
  }
]

const selectOption = (value: string) => {
  if (step.value === 0) answers.value.q1 = value
  else if (step.value === 1) answers.value.q2 = value
  else if (step.value === 2) answers.value.q3 = value
  
  if (step.value < 2) {
    step.value++
  } else {
    step.value = 3 // Show results
    calculateRecommendations()
  }
}

const resetQuiz = () => {
  step.value = 0
  answers.value = { q1: '', q2: '', q3: '' }
  recommendedBooks.value = []
}

interface RecommendedBook extends Book {
  reason: string;
}

const recommendedBooks = ref<RecommendedBook[]>([])

const calculateRecommendations = () => {
  let scoredBooks = books.map(b => ({ ...b, score: 0, reason: '' }))
  
  const { q1, q2, q3 } = answers.value

  scoredBooks.forEach(b => {
    // 1. Base score by Q2 (Style)
    if (q2 === 'index' && b.category.includes('인덱스 투자')) b.score += 10
    if (q2 === 'macro' && b.category.includes('거시 경제')) b.score += 10
    if (q2 === 'dividend' && b.category.includes('현금 흐름')) b.score += 10
    if (q2 === 'mindset' && b.category.includes('투자 심리')) b.score += 10

    // 2. Adjust by Q3 (Problem)
    if (q3 === 'no_rule' && (b.tags.includes('자산배분') || b.tags.includes('ETF 투자') || b.tags.includes('가치 투자'))) b.score += 8
    if (q3 === 'mental' && (b.tags.includes('투자 심리') || b.tags.includes('인간 행동학') || b.tags.includes('장기 투자'))) b.score += 8
    if (q3 === 'economy' && (b.tags.includes('매크로 분석') || b.tags.includes('금리/채권 기초') || b.tags.includes('달러 / 외환'))) b.score += 8
    if (q3 === 'cashflow' && (b.tags.includes('배당 성장') || b.tags.includes('자동 소득') || b.tags.includes('미국 배당주'))) b.score += 8

    // 3. Adjust by Q1 (Experience level)
    const isEasy = b.title.includes('처음') || b.title.includes('쉬운') || b.description.includes('초보') || b.description.includes('기초') || b.title.includes('마법의')
    const isHard = b.title.includes('공식') || b.description.includes('데이터로 분석') || b.description.includes('매커니즘')
    
    if (q1 === 'beginner' && isEasy) b.score += 5
    if (q1 === 'beginner' && isHard) b.score -= 3
    if (q1 === 'expert' && isHard) b.score += 5
    
    // Add extra points for favorites
    if (b.badge?.includes('Favorite')) b.score += 2
    if (b.badge?.includes('Recommendation')) b.score += 1
  })

  // Sort by score
  scoredBooks.sort((a, b) => b.score - a.score)
  
  // Pick top 3
  const top3 = scoredBooks.slice(0, 3)
  
  // Generate personalized reasons
  top3.forEach((b, index) => {
    let reason = ''
    if (index === 0) {
      reason = `가장 고민하셨던 부분을 완벽하게 긁어줄 수 있는 최고의 책입니다. `
    } else if (index === 1) {
      reason = `첫 번째 책과 함께 읽으면 시너지가 폭발하는 책입니다. `
    } else {
      reason = `투자 시야를 넓히기 위해 마지막으로 꼭 추천해 드리고 싶습니다. `
    }
    
    if (q2 === 'index') reason += `시장 수익률을 이기는 가장 확실한 방법론을 배울 수 있습니다.`
    else if (q2 === 'macro') reason += `복잡한 경제 기사 이면의 돈의 흐름을 읽는 눈을 길러줍니다.`
    else if (q2 === 'dividend') reason += `실제로 계좌에 현금이 꽂히는 짜릿한 경험을 만들어 줄 것입니다.`
    else if (q2 === 'mindset') reason += `하락장에서도 흔들리지 않는 강철 멘탈과 철학을 심어줍니다.`
    
    b.reason = reason
  })
  
  recommendedBooks.value = top3
}
</script>

<template>
  <div class="recommender-container">
    <div v-if="step < 3" class="quiz-section">
      <div class="progress-bar">
        <div class="progress" :style="{ width: `${((step) / 3) * 100}%` }"></div>
      </div>
      <p class="step-indicator">Step {{ step + 1 }} of 3</p>
      
      <h2 class="question-title">{{ questions[step].title }}</h2>
      
      <div class="options-grid">
        <button 
          v-for="option in questions[step].options" 
          :key="option.value"
          class="option-btn"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div v-else class="results-section">
      <div class="results-header">
        <h2>🎉 방문자님을 위한 맞춤형 독서 큐레이션</h2>
        <p>답변해주신 투자 연차와 현재의 고민을 바탕으로 책장에서 3권을 엄선했습니다.</p>
        <button class="reset-btn" @click="resetQuiz">다시 추천받기</button>
      </div>

      <div class="recommended-books">
        <div v-for="(book, index) in recommendedBooks" :key="book.id" class="result-card" :class="`rank-${index + 1}`">
          <div class="rank-badge">{{ index + 1 }}순위 추천</div>
          <div class="card-content">
            <div class="cover-area">
              <img :src="book.coverUrl" :alt="book.title" class="book-cover" />
            </div>
            <div class="info-area">
              <span class="category">{{ book.category }}</span>
              <h3 class="title">{{ book.title }}</h3>
              <p class="author">{{ book.author }}</p>
              
              <div class="reason-box">
                <strong>💡 큐레이션 이유:</strong>
                <p>{{ book.reason }}</p>
              </div>
              
              <p class="description">{{ book.description }}</p>
              
              <div v-if="book.myComment" class="my-comment">
                <strong>🙋‍♂️ 덧붙이는 말:</strong> {{ book.myComment }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommender-container {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.quiz-section {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--vp-c-default-soft);
  border-radius: 3px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}

.step-indicator {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.question-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.options-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-btn {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-gutter);
  padding: 1.25rem;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.option-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.results-header {
  text-align: center;
  margin-bottom: 3rem;
}

.results-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.results-header p {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.reset-btn {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: var(--vp-c-default-soft);
}

.recommended-books {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.result-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.result-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.rank-1 { border: 2px solid #d97706; }
.rank-2 { border: 2px solid #3b82f6; }
.rank-3 { border: 2px solid #10b981; }

.rank-badge {
  position: absolute;
  top: -12px;
  left: 24px;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
  color: white;
}

.rank-1 .rank-badge { background: #d97706; }
.rank-2 .rank-badge { background: #3b82f6; }
.rank-3 .rank-badge { background: #10b981; }

.card-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
  }
}

.cover-area {
  flex-shrink: 0;
  width: 160px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .cover-area {
    width: 120px;
    margin: 0 auto;
  }
}

.book-cover {
  width: 100%;
  height: auto;
  display: block;
}

.info-area {
  flex-grow: 1;
}

.category {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-transform: uppercase;
}

.title {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0.5rem 0 0.25rem 0;
}

.author {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  margin-bottom: 1.5rem;
}

.reason-box {
  background: var(--vp-c-brand-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  padding: 1rem;
  border-radius: 0 8px 8px 0;
  margin-bottom: 1.5rem;
}

.reason-box strong {
  color: var(--vp-c-brand-1);
  display: block;
  margin-bottom: 0.5rem;
}

.reason-box p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.description {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.my-comment {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  border-left: 4px solid var(--vp-c-brand-1);
  box-shadow: inset 0 0 0 1px var(--vp-c-gutter);
}
</style>
