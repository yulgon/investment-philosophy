<template>
  <div class="kca-chart-container" style="margin: 2rem 0; padding: 1.5rem; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-gutter); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
    <h4 style="margin-top: 0; margin-bottom: 1.5rem; font-size: 1.15rem; font-weight: 600; color: var(--vp-c-brand-1); text-align: center;">📈 KCA의 주가-환율 역상관성에 따른 변동성 완화 및 매수 통제 효과</h4>
    
    <svg viewBox="0 0 800 480" width="100%" height="auto" style="display: block; font-family: var(--vp-font-family-base);">
      <!-- ==================== 1. LINE CHART (PRICE & EXCHANGE RATE) ==================== -->
      <!-- Title for Top Panel -->
      <text x="50" y="30" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">[패널 A] 주가 & 환율 변동 추이</text>

      <!-- Grids for Top Panel -->
      <g stroke="var(--vp-c-gutter)" stroke-width="1" stroke-dasharray="4,4">
        <line x1="50" y1="60" x2="750" y2="60" />
        <line x1="50" y1="110" x2="750" y2="110" />
        <line x1="50" y1="160" x2="750" y2="160" />
        <line x1="50" y1="210" x2="750" y2="210" />
        <line x1="50" y1="260" x2="750" y2="260" />
        <!-- Vertical timeline markers -->
        <line x1="100" y1="50" x2="100" y2="270" />
        <line x1="250" y1="50" x2="250" y2="270" />
        <line x1="400" y1="50" x2="400" y2="270" />
        <line x1="550" y1="50" x2="550" y2="270" />
        <line x1="700" y1="50" x2="700" y2="270" />
      </g>

      <!-- Axes for Top Panel -->
      <g stroke="var(--vp-c-text-3)" stroke-width="1.5">
        <line x1="50" y1="270" x2="760" y2="270" stroke="var(--vp-c-text-3)" />
        <line x1="50" y1="40" x2="50" y2="270" stroke="var(--vp-c-text-3)" />
      </g>

      <!-- Curves -->
      <!-- 1. Stock Price USD (Red Volatile - Dips then Peaks) -->
      <path d="M 50 150 C 130 150, 200 270, 250 270 C 300 270, 370 170, 400 170 C 430 170, 500 60, 550 60 C 600 60, 670 100, 700 100 L 750 100" fill="none" stroke="#ef4444" stroke-width="2.5" />
      
      <!-- 2. Exchange Rate USD/KRW (Blue Counter-Cyclical - Spikes then drops) -->
      <path d="M 50 210 C 130 210, 200 90, 250 90 C 300 90, 370 190, 400 190 C 430 190, 500 250, 550 250 C 600 250, 670 220, 700 220 L 750 220" fill="none" stroke="#3b82f6" stroke-width="2.5" />
      
      <!-- 3. KCA KRW Cost Basis (Green Smoothed Line) -->
      <path d="M 50 180 C 130 180, 200 188, 250 188 C 300 188, 370 178, 400 178 C 430 178, 500 150, 550 150 C 600 150, 670 160, 700 160 L 750 160" fill="none" stroke="#10b981" stroke-width="3.5" />

      <!-- Labels on Curves -->
      <g font-size="11" font-weight="600">
        <text x="680" y="80" fill="#ef4444" text-anchor="middle">미국 주가 (USD)</text>
        <text x="680" y="240" fill="#3b82f6" text-anchor="middle">USD/KRW 환율</text>
        <text x="635" y="145" fill="#10b981" text-anchor="middle">KCA 평단가 (KRW)</text>
      </g>

      <!-- ==================== 2. BAR CHART (PURCHASE QUANTITY) ==================== -->
      <!-- Separator Line -->
      <line x1="50" y1="295" x2="750" y2="295" stroke="var(--vp-c-gutter)" stroke-width="1.5" />
      
      <!-- Title for Bottom Panel -->
      <text x="50" y="320" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">[패널 B] KCA 회차별 주식 매수 수량 (N)</text>

      <!-- Grids for Bottom Panel -->
      <g stroke="var(--vp-c-gutter)" stroke-width="0.5" stroke-dasharray="4,4">
        <line x1="50" y1="350" x2="750" y2="350" />
        <line x1="50" y1="385" x2="750" y2="385" />
        <line x1="50" y1="420" x2="750" y2="420" />
      </g>

      <!-- Axes for Bottom Panel -->
      <g stroke="var(--vp-c-text-3)" stroke-width="1.5">
        <line x1="50" y1="420" x2="760" y2="420" stroke="var(--vp-c-text-3)" />
        <line x1="50" y1="330" x2="50" y2="420" stroke="var(--vp-c-text-3)" />
      </g>

      <!-- Bar Columns (N = M_KRW / (P_USD * E)) -->
      <!-- 1. Point 1 (Initial): Medium Quantity (Height = 50, Y = 420 - 50 = 370) -->
      <rect x="85" y="370" width="30" height="50" fill="#10b981" opacity="0.65" rx="3" />
      <text x="100" y="362" fill="var(--vp-c-text-1)" text-anchor="middle" font-size="11" font-weight="600">5.0주</text>

      <!-- 2. Point 2 (Crash): Max Quantity (Height = 90, Y = 420 - 90 = 330) -->
      <rect x="235" y="330" width="30" height="90" fill="#10b981" opacity="0.9" rx="3" />
      <text x="250" y="322" fill="#10b981" text-anchor="middle" font-size="11" font-weight="600">9.0주 (최대 매수) ⬆️</text>

      <!-- 3. Point 3 (Recovery): Medium-High (Height = 60, Y = 420 - 60 = 360) -->
      <rect x="385" y="360" width="30" height="60" fill="#10b981" opacity="0.65" rx="3" />
      <text x="400" y="352" fill="var(--vp-c-text-1)" text-anchor="middle" font-size="11" font-weight="600">6.0주</text>

      <!-- 4. Point 4 (Overheating/Peak): Min Quantity (Height = 20, Y = 420 - 20 = 400) -->
      <rect x="535" y="400" width="30" height="20" fill="#ef4444" opacity="0.8" rx="3" />
      <text x="550" y="392" fill="#ef4444" text-anchor="middle" font-size="11" font-weight="600">2.0주 (최소 매수) ⬇️</text>

      <!-- 5. Point 5 (Stable): Medium (Height = 45, Y = 420 - 45 = 375) -->
      <rect x="685" y="375" width="30" height="45" fill="#10b981" opacity="0.65" rx="3" />
      <text x="700" y="367" fill="var(--vp-c-text-1)" text-anchor="middle" font-size="11" font-weight="600">4.5주</text>

      <!-- Timeline Label Markers (Shared) -->
      <g fill="var(--vp-c-text-2)" font-size="11" text-anchor="middle">
        <text x="100" y="445">① 초기 투자</text>
        <text x="250" y="445">② 주가 하락 (환율 급등)</text>
        <text x="400" y="445">③ 시장 회복기</text>
        <text x="550" y="445">④ 주가 상승 (환율 하락)</text>
        <text x="700" y="445">⑤ 완전 안정기</text>
      </g>
    </svg>
    
    <!-- Explanation Text inside Chart Box -->
    <div style="margin-top: 1.5rem; padding: 1rem; background: var(--vp-c-bg-alt); border-radius: 8px; font-size: 0.9rem; line-height: 1.6; color: var(--vp-c-text-2);">
      <ul>
        <li><strong>하락기 매집 (②)</strong>: 미국 주가 폭락 및 환율 급등 구간에서는 원화 환산 가격이 낮아져 자동으로 **9.0주**까지 매수량을 극대화하여 저가 매집 효과를 봅니다.</li>
        <li><strong>상승기 과열 통제 (④)</strong>: 미국 주가가 최고점을 경신하고 환율이 하락하더라도, 원화 기준 정액 매수를 유지하기 때문에 자동으로 **2.0주**만 매수하여 과열 구간에서의 상투(고가 매수)를 완벽히 회피합니다.</li>
      </ul>
    </div>
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
