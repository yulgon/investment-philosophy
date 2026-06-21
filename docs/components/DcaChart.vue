<template>
  <div class="kca-chart-container" style="margin: 2rem 0; padding: 1.5rem; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-gutter); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
    <h4 style="margin-top: 0; margin-bottom: 1.5rem; font-size: 1.15rem; font-weight: 600; color: var(--vp-c-brand-1); text-align: center;">📈 DCA 적립식 투자의 가격 변동에 따른 매수 수량 제어 효과</h4>
    
    <svg viewBox="0 0 800 480" width="100%" height="auto" style="display: block; font-family: var(--vp-font-family-base);">
      <!-- ==================== 1. LINE CHART (STOCK PRICE & AVERAGE COST) ==================== -->
      <!-- Title for Top Panel -->
      <text x="50" y="30" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">[패널 A] 시장 주가 & 평단가 변동 추이</text>

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
      <!-- 1. Stock Price (Volatile Orange - Drops then Peaks) -->
      <path d="M 50 150 C 130 150, 200 270, 250 270 C 300 270, 370 170, 400 170 C 430 170, 500 60, 550 60 C 600 60, 670 100, 700 100 L 750 100" fill="none" stroke="#f59e0b" stroke-width="2.5" />
      
      <!-- 2. Lump-sum Cost (Red Flat Line - Fixed at initial) -->
      <line x1="50" y1="150" x2="750" y2="150" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4" />
      
      <!-- 3. DCA Average Cost (Green Smoothed Line) -->
      <path d="M 50 150 C 130 150, 200 200, 250 200 C 300 200, 370 190, 400 190 C 430 190, 500 165, 550 165 C 600 165, 670 155, 700 155 L 750 155" fill="none" stroke="#10b981" stroke-width="3.5" />

      <!-- Labels on Curves -->
      <g font-size="11" font-weight="600">
        <text x="680" y="80" fill="#f59e0b" text-anchor="middle">시장 주가 (변동)</text>
        <text x="685" y="140" fill="#ef4444" text-anchor="middle">거치식 평단가</text>
        <text x="635" y="172" fill="#10b981" text-anchor="middle">DCA 평단가</text>
      </g>

      <!-- ==================== 2. BAR CHART (PURCHASE QUANTITY) ==================== -->
      <!-- Separator Line -->
      <line x1="50" y1="295" x2="750" y2="295" stroke="var(--vp-c-gutter)" stroke-width="1.5" />
      
      <!-- Title for Bottom Panel -->
      <text x="50" y="320" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">[패널 B] DCA 회차별 주식 매수 수량 (N)</text>

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

      <!-- Bar Columns (N = M / P) -->
      <!-- 1. Point 1 (Initial): Medium Quantity (Height = 50, Y = 370) -->
      <rect x="85" y="370" width="30" height="50" fill="#10b981" opacity="0.65" rx="3" />
      <text x="100" y="362" fill="var(--vp-c-text-1)" text-anchor="middle" font-size="11" font-weight="600">5.0주</text>

      <!-- 2. Point 2 (Crash): Max Quantity (Height = 80, Y = 340) -->
      <rect x="235" y="340" width="30" height="80" fill="#10b981" opacity="0.9" rx="3" />
      <text x="250" y="332" fill="#10b981" text-anchor="middle" font-size="11" font-weight="600">8.0주 (저가 매집) ⬆️</text>

      <!-- 3. Point 3 (Recovery): Medium-High (Height = 60, Y = 360) -->
      <rect x="385" y="360" width="30" height="60" fill="#10b981" opacity="0.65" rx="3" />
      <text x="400" y="352" fill="var(--vp-c-text-1)" text-anchor="middle" font-size="11" font-weight="600">6.0주</text>

      <!-- 4. Point 4 (Overheating/Peak): Min Quantity (Height = 25, Y = 395) -->
      <rect x="535" y="395" width="30" height="25" fill="#ef4444" opacity="0.8" rx="3" />
      <text x="550" y="387" fill="#ef4444" text-anchor="middle" font-size="11" font-weight="600">2.5주 (고가 억제) ⬇️</text>

      <!-- 5. Point 5 (Stable): Medium (Height = 45, Y = 375) -->
      <rect x="685" y="375" width="30" height="45" fill="#10b981" opacity="0.65" rx="3" />
      <text x="700" y="367" fill="var(--vp-c-text-1)" text-anchor="middle" font-size="11" font-weight="600">4.5주</text>

      <!-- Timeline Label Markers (Shared) -->
      <g fill="var(--vp-c-text-2)" font-size="11" text-anchor="middle">
        <text x="100" y="445">① 초기 투자</text>
        <text x="250" y="445">② 주가 폭락기</text>
        <text x="400" y="445">③ 시장 회복기</text>
        <text x="550" y="445">④ 주가 급등기</text>
        <text x="700" y="445">⑤ 안정기</text>
      </g>
    </svg>
    
    <!-- Explanation Text inside Chart Box -->
    <div style="margin-top: 1.5rem; padding: 1rem; background: var(--vp-c-bg-alt); border-radius: 8px; font-size: 0.9rem; line-height: 1.6; color: var(--vp-c-text-2);">
      <ul>
        <li><strong>주가 폭락기 매수 (②)</strong>: 시장 주가가 떨어져 자산 가치가 매우 저렴해졌을 때는 기계적으로 **8.0주**를 많이 매수하여 평균 단가를 강력하게 낮춥니다.</li>
        <li><strong>주가 급등기 매수 (④)</strong>: 자산 가격이 과열되어 비싸졌을 때는 자동으로 **2.5주**만 적게 매수하여 거치식 투자 대비 고가 매수를 미연에 억제합니다.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DcaChart'
}
</script>

<style scoped>
.kca-chart-container {
  transition: all 0.3s ease;
}
</style>
