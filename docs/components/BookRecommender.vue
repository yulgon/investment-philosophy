<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useData } from 'vitepress'
import { books as booksKo } from '../books/booksData'
import { books as booksEn } from '../books/booksDataEn'
import type { Book } from '../books/booksData'

const { lang } = useData()
const books = computed(() => lang.value === 'en-US' ? booksEn : booksKo)

const t = computed(() => {
  const isEn = lang.value === 'en-US'
  return {
    q1Title: isEn ? 'What is your investment experience?' : '주식 투자 경험이 어떻게 되시나요?',
    q1O1: isEn ? '🌱 Just starting out (Beginner)' : '🌱 이제 막 시작하려는 입문자',
    q1O2: isEn ? '🏃 1-3 years (Have experience but still shaky)' : '🏃 1~3년 차 (경험은 있지만 아직 흔들림)',
    q1O3: isEn ? '⛰️ 3+ years (Refining own principles)' : '⛰️ 3년 이상 (자신만의 원칙을 다듬는 중)',
    
    q2Title: isEn ? 'What investment style (goal) are you most interested in?' : '현재 가장 관심 있는 투자 스타일(목표)은 무엇인가요?',
    q2O1: isEn ? '🐢 Comfortable long-term diversified investing (Asset Allocation/ETF)' : '🐢 마음 편한 장기 분산 투자 (자산배분/ETF)',
    q2O2: isEn ? '🌍 Reading the macro economy and big trends (Macro/FX)' : '🌍 거시 경제와 큰 흐름 읽기 (매크로/환율)',
    q2O3: isEn ? '💸 Building a second paycheck (Dividends/Cash flow)' : '💸 제2의 월급 만들기 (배당/현금흐름)',
    q2O4: isEn ? '🧘 Mental management and realizing the essence of investing (Mindset)' : '🧘 멘탈 관리와 투자의 본질 깨닫기 (마인드셋)',

    q3Title: isEn ? 'What is your biggest concern right now?' : '지금 가장 고민되는 부분은 무엇인가요?',
    q3O1: isEn ? '🤔 No criteria on what stocks or assets to buy.' : '🤔 어떤 종목이나 자산을 사야 할지 기준이 없다.',
    q3O2: isEn ? '📉 Fearful when the market drops and cannot manage mentality.' : '📉 시장이 하락하면 두렵고 멘탈 관리가 안 된다.',
    q3O3: isEn ? '📰 Cannot understand economic news like interest rates or FX.' : '📰 금리나 환율 같은 경제 기사를 읽어도 잘 모르겠다.',
    q3O4: isEn ? '🏜️ Frustrated because there is no immediate cash income.' : '🏜️ 당장 손에 쥐어지는 현금 수익이 없어 답답하다.',

    stepIndicator: isEn ? 'Step' : 'Step',
    of: isEn ? 'of' : 'of',

    resultTitle: isEn ? '🎉 Personalized Book Curation for You' : '🎉 방문자님을 위한 맞춤형 독서 큐레이션',
    resultDesc: isEn ? 'Based on your experience and current concerns, we have carefully selected 3 books from the bookshelf.' : '답변해주신 투자 연차와 현재의 고민을 바탕으로 책장에서 3권을 엄선했습니다.',
    resetBtn: isEn ? 'Get Recommended Again' : '다시 추천받기',

    rankSuffix: isEn ? ' Recommendation' : '순위 추천',
    reasonTitle: isEn ? '💡 Reason for Curation:' : '💡 큐레이션 이유:',
    myCommentTitle: isEn ? '🙋‍♂️ Personal Note:' : '🙋‍♂️ 덧붙이는 말:',

    reason1: isEn ? 'This book most closely matches the concern you selected. ' : '선택하신 고민과 가장 가까운 주제를 다루는 책입니다. ',
    reason2: isEn ? 'This book offers a complementary perspective to the first selection. ' : '첫 번째 책과 함께 읽으면 다른 관점에서 주제를 보완할 수 있습니다. ',
    reason3: isEn ? 'This final selection can help broaden the range of ideas you compare. ' : '마지막 책은 비교할 관점의 범위를 넓히는 데 도움이 될 수 있습니다. ',

    reasonAppendIndex: isEn ? 'It explains the rationale, costs, and limits of index-based investing.' : '인덱스 투자의 근거와 비용, 한계를 함께 살펴볼 수 있습니다.',
    reasonAppendMacro: isEn ? 'Develops the eye to read the flow of money behind complex economic news.' : '복잡한 경제 기사 이면의 돈의 흐름을 읽는 눈을 길러줍니다.',
    reasonAppendDividend: isEn ? 'It examines dividend cash flow together with the tradeoffs involved.' : '배당 현금흐름과 그에 따르는 선택의 대가를 함께 살펴봅니다.',
    reasonAppendMindset: isEn ? 'It offers practical ideas for recognizing behavioral bias during a downturn.' : '하락장에서 행동 편향을 알아차리는 데 쓸 수 있는 관점을 제공합니다.'
  }
})

const questions = computed(() => [
  {
    id: 'q1',
    title: t.value.q1Title,
    options: [
      { value: 'beginner', label: t.value.q1O1 },
      { value: 'mid', label: t.value.q1O2 },
      { value: 'expert', label: t.value.q1O3 }
    ]
  },
  {
    id: 'q2',
    title: t.value.q2Title,
    options: [
      { value: 'index', label: t.value.q2O1 },
      { value: 'macro', label: t.value.q2O2 },
      { value: 'dividend', label: t.value.q2O3 },
      { value: 'mindset', label: t.value.q2O4 }
    ]
  },
  {
    id: 'q3',
    title: t.value.q3Title,
    options: [
      { value: 'no_rule', label: t.value.q3O1 },
      { value: 'mental', label: t.value.q3O2 },
      { value: 'economy', label: t.value.q3O3 },
      { value: 'cashflow', label: t.value.q3O4 }
    ]
  }
])

const step = ref(0)
const answers = ref({
  q1: '',
  q2: '',
  q3: ''
})

const selectOption = (value: string) => {
  if (step.value === 0) answers.value.q1 = value
  else if (step.value === 1) answers.value.q2 = value
  else if (step.value === 2) answers.value.q3 = value
  
  if (step.value < 2) {
    step.value++
  } else {
    step.value = 3
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

// Recalculate if lang changes while results are showing
watch(lang, () => {
  if (step.value === 3) {
    calculateRecommendations()
  }
})

const calculateRecommendations = () => {
  let scoredBooks = books.value.map(b => ({ ...b, score: 0, reason: '' }))
  
  const { q1, q2, q3 } = answers.value

  scoredBooks.forEach(b => {
    const isEn = lang.value === 'en-US'
    const cat = b.category || ''
    const ts = (b.tags || []).join(',')
    
    // Check based on lang
    if (q2 === 'index' && (cat.includes('인덱스') || cat.includes('Index'))) b.score += 10
    if (q2 === 'macro' && (cat.includes('거시 경제') || cat.includes('Macro'))) b.score += 10
    if (q2 === 'dividend' && (cat.includes('현금 흐름') || cat.includes('Dividend'))) b.score += 10
    if (q2 === 'mindset' && (cat.includes('투자 심리') || cat.includes('Mindset'))) b.score += 10

    if (q3 === 'no_rule' && (ts.includes('자산배분') || ts.includes('Asset Allocation') || ts.includes('ETF') || ts.includes('가치 투자') || ts.includes('Value'))) b.score += 8
    if (q3 === 'mental' && (ts.includes('심리') || ts.includes('Psychology') || ts.includes('인간 행동학') || ts.includes('Behavioral') || ts.includes('장기 투자') || ts.includes('Long-term'))) b.score += 8
    if (q3 === 'economy' && (ts.includes('매크로') || ts.includes('Macro') || ts.includes('금리') || ts.includes('Interest') || ts.includes('달러') || ts.includes('Dollar'))) b.score += 8
    if (q3 === 'cashflow' && (ts.includes('배당 성장') || ts.includes('Dividend Growth') || ts.includes('자동 소득') || ts.includes('Passive Income') || ts.includes('미국 배당') || ts.includes('US Dividend'))) b.score += 8

    const isEasy = b.title.includes('처음') || b.title.includes('쉬운') || b.description.includes('초보') || b.title.includes('마법의') || b.title.includes('Magic') || b.title.includes('Little') || b.description.includes('beginner')
    const isHard = b.title.includes('공식') || b.description.includes('데이터') || b.description.includes('매커니즘') || b.title.includes('Formula') || b.description.includes('data')

    if (q1 === 'beginner' && isEasy) b.score += 5
    if (q1 === 'beginner' && isHard) b.score -= 3
    if (q1 === 'expert' && isHard) b.score += 5
    
    if (b.badge?.includes('Favorite') || b.badge?.includes('인생 도서')) b.score += 2
    if (b.badge?.includes('Recommendation') || b.badge?.includes('추천 도서')) b.score += 1
  })

  scoredBooks.sort((a, b) => b.score - a.score)
  const top3 = scoredBooks.slice(0, 3)
  
  top3.forEach((b, index) => {
    let reason = ''
    if (index === 0) reason = t.value.reason1
    else if (index === 1) reason = t.value.reason2
    else reason = t.value.reason3
    
    if (q2 === 'index') reason += t.value.reasonAppendIndex
    else if (q2 === 'macro') reason += t.value.reasonAppendMacro
    else if (q2 === 'dividend') reason += t.value.reasonAppendDividend
    else if (q2 === 'mindset') reason += t.value.reasonAppendMindset
    
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
      <p class="step-indicator">{{ t.stepIndicator }} {{ step + 1 }} {{ t.of }} 3</p>
      
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
        <h2>{{ t.resultTitle }}</h2>
        <p>{{ t.resultDesc }}</p>
        <button class="reset-btn" @click="resetQuiz">{{ t.resetBtn }}</button>
      </div>

      <div class="recommended-books">
        <div v-for="(book, index) in recommendedBooks" :key="book.id" class="result-card" :class="`rank-${index + 1}`">
          <div class="rank-badge">{{ index + 1 }}{{ t.rankSuffix }}</div>
          <div class="card-content">
            <div class="cover-area">
              <img :src="book.coverUrl" :alt="book.title" class="book-cover" />
            </div>
            <div class="info-area">
              <span class="category">{{ book.category }}</span>
              <h3 class="title">{{ book.title }}</h3>
              <p class="author">{{ book.author }}</p>
              
              <div class="reason-box">
                <strong>{{ t.reasonTitle }}</strong>
                <p>{{ book.reason }}</p>
              </div>
              
              <p class="description">{{ book.description }}</p>
              
              <div v-if="book.myComment" class="my-comment">
                <strong>{{ t.myCommentTitle }}</strong> {{ book.myComment }}
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
