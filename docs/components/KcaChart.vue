<template>
  <div class="kca-chart-container" style="margin: 2rem 0; padding: 1.5rem; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-gutter); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
    <h4 style="margin-top: 0; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; color: var(--vp-c-brand-1); text-align: center;">📈 주가-환율 역상관성에 따른 KCA 변동성 완화 효과</h4>
    <svg viewBox="0 0 800 380" width="100%" height="auto" style="display: block; font-family: var(--vp-font-family-base);">
      <!-- Grids -->
      <g stroke="var(--vp-c-gutter)" stroke-width="1" stroke-dasharray="4,4">
        <line x1="50" y1="60" x2="750" y2="60" />
        <line x1="50" y1="130" x2="750" y2="130" />
        <line x1="50" y1="200" x2="750" y2="200" />
        <line x1="50" y1="270" x2="750" y2="270" />
        <!-- Vertical time markers -->
        <line x1="225" y1="50" x2="225" y2="310" />
        <line x1="400" y1="50" x2="400" y2="310" />
        <line x1="575" y1="50" x2="575" y2="310" />
      </g>

      <!-- Axes -->
      <g stroke="var(--vp-c-text-3)" stroke-width="1.5">
        <line x1="50" y1="310" x2="760" y2="310" stroke="var(--vp-c-text-3)" />
        <line x1="50" y1="40" x2="50" y2="310" stroke="var(--vp-c-text-3)" />
      </g>

      <!-- X Axis Labels -->
      <g fill="var(--vp-c-text-2)" font-size="12" text-anchor="middle">
        <text x="50" y="330">시작</text>
        <text x="225" y="330">주가 하락 (환율 상승)</text>
        <text x="400" y="330">시장 폭락기 (환율 최고점)</text>
        <text x="575" y="330">회복기 (환율 하락)</text>
        <text x="750" y="330">완전 회복</text>
      </g>

      <!-- Curves -->
      <!-- 1. Stock Price USD (Red Volatile) -->
      <path d="M 50 110 C 150 90, 225 240, 310 280 C 400 290, 490 200, 575 140 C 660 80, 700 80, 750 70" fill="none" stroke="#ef4444" stroke-width="2.5" />
      
      <!-- 2. Exchange Rate USD/KRW (Blue Counter-Cyclical) -->
      <path d="M 50 240 C 150 250, 225 150, 310 80 C 400 70, 490 140, 575 200 C 660 250, 700 240, 750 230" fill="none" stroke="#3b82f6" stroke-width="2.5" />
      
      <!-- 3. KCA KRW Cost Basis (Green Smoothed Line) -->
      <path d="M 50 180 C 150 178, 225 185, 310 189 C 400 190, 490 186, 575 180 C 660 175, 700 172, 750 170" fill="none" stroke="#10b981" stroke-width="3.5" />

      <!-- Labels on Curves -->
      <g font-size="11" font-weight="600">
        <text x="700" y="60" fill="#ef4444" text-anchor="middle">미국 주가 (USD)</text>
        <text x="700" y="215" fill="#3b82f6" text-anchor="middle">USD/KRW 환율</text>
        <text x="640" y="158" fill="#10b981" text-anchor="middle">KCA 평단가 (KRW)</text>
      </g>

      <!-- Legend Box -->
      <g transform="translate(60, 50)">
        <rect width="190" height="90" fill="var(--vp-c-bg)" stroke="var(--vp-c-gutter)" rx="6" />
        <circle cx="20" cy="25" r="5" fill="#ef4444" />
        <text x="35" y="29" fill="var(--vp-c-text-1)" font-size="12">미국 주가 (USD 변동)</text>
        
        <circle cx="20" cy="48" r="5" fill="#3b82f6" />
        <text x="35" y="52" fill="var(--vp-c-text-1)" font-size="12">USD/KRW 환율 (역상관)</text>
        
        <circle cx="20" cy="71" r="5" fill="#10b981" />
        <text x="35" y="75" fill="var(--vp-c-text-1)" font-size="12">KCA 매수 평단 (원화)</text>
      </g>
    </svg>
    <p style="margin-top: 1rem; margin-bottom: 0; font-size: 0.9rem; line-height: 1.6; color: var(--vp-c-text-2); text-align: center;">
      💡 <strong>역상관관계 효과:</strong> 시장 폭락기(가운데)에 미국 주가(빨간색)는 떨어지지만 환율(파란색)이 급등하여 상호 보완을 이룹니다. 이에 따라 원화 기준 매수 평단가(초록색)는 **골짜기를 만들지 않고 매우 평탄하고 안정적인 곡선**을 그리며 단기 급등락의 위험을 피해 갑니다.
    </p>
  </div>
</template>

<script>
export default {
  name: 'KcaChart'
}
</script>

<style scoped>
.kca-chart-container {
  transition: all 0.3s ease;
}
</style>
