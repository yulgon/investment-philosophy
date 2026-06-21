<template>
  <div class="kca-chart-container" style="margin: 2rem 0; padding: 1.5rem; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-gutter); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
    <h4 style="margin-top: 0; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; color: var(--vp-c-brand-1); text-align: center;">📈 DCA 적립식 vs 거치식(Lump-sum) 평단가 비교</h4>
    <svg viewBox="0 0 800 360" width="100%" height="auto" style="display: block; font-family: var(--vp-font-family-base);">
      <!-- Grids -->
      <g stroke="var(--vp-c-gutter)" stroke-width="1" stroke-dasharray="4,4">
        <line x1="50" y1="60" x2="750" y2="60" />
        <line x1="50" y1="130" x2="750" y2="130" />
        <line x1="50" y1="200" x2="750" y2="200" />
        <line x1="50" y1="270" x2="750" y2="270" />
      </g>

      <!-- Axes -->
      <g stroke="var(--vp-c-text-3)" stroke-width="1.5">
        <line x1="50" y1="310" x2="760" y2="310" stroke="var(--vp-c-text-3)" />
        <line x1="50" y1="40" x2="50" y2="310" stroke="var(--vp-c-text-3)" />
      </g>

      <!-- Labels -->
      <g fill="var(--vp-c-text-2)" font-size="12" text-anchor="middle">
        <text x="50" y="330">투자 시작</text>
        <text x="283" y="330">시장 하락기</text>
        <text x="516" y="330">바닥 및 횡보</text>
        <text x="750" y="330">시장 회복</text>
      </g>

      <!-- Curves -->
      <!-- 1. Market Price (Volatile Orange) -->
      <path d="M 50 130 C 180 30, 280 310, 400 300 C 520 290, 630 150, 750 90" fill="none" stroke="#f59e0b" stroke-width="2.5" />
      
      <!-- 2. Lump-sum Cost (Red Flat Line) -->
      <line x1="50" y1="130" x2="750" y2="130" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4" />
      
      <!-- 3. DCA Average Cost (Green Smooth Line) -->
      <path d="M 50 130 C 180 130, 280 210, 400 205 C 520 200, 630 170, 750 155" fill="none" stroke="#10b981" stroke-width="3.5" />

      <!-- Labels on Curves -->
      <g font-size="11" font-weight="600">
        <text x="700" y="80" fill="#f59e0b" text-anchor="middle">시장 주가</text>
        <text x="700" y="120" fill="#ef4444" text-anchor="middle">거치식(Lump-sum) 평단가</text>
        <text x="650" y="145" fill="#10b981" text-anchor="middle">DCA 적립식 평단가</text>
      </g>

      <!-- Legend Box -->
      <g transform="translate(60, 50)">
        <rect width="210" height="90" fill="var(--vp-c-bg)" stroke="var(--vp-c-gutter)" rx="6" />
        <circle cx="20" cy="25" r="5" fill="#f59e0b" />
        <text x="35" y="29" fill="var(--vp-c-text-1)" font-size="12">변동하는 시장 주가</text>
        
        <line x1="15" y1="48" x2="25" y2="48" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2" />
        <text x="35" y="52" fill="var(--vp-c-text-1)" font-size="12">거치식 평단가 (시작시점 고정)</text>
        
        <circle cx="20" cy="71" r="5" fill="#10b981" />
        <text x="35" y="75" fill="var(--vp-c-text-1)" font-size="12">DCA 적립식 평단가</text>
      </g>
    </svg>
    <p style="margin-top: 1rem; margin-bottom: 0; font-size: 0.9rem; line-height: 1.6; color: var(--vp-c-text-2); text-align: center;">
      💡 <strong>DCA의 강점:</strong> 주가가 떨어질 때 더 많은 수량을 저가 매수하므로, 주가가 원래 수준을 완전히 회복하지 못하더라도 **적립식 평단가(초록색)가 낮아져 빠르게 수익 구간에 진입**합니다.
    </p>
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
