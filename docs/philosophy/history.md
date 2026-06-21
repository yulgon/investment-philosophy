# 📜 나의 투자 연혁 (History)

> "역사는 되풀이되지 않지만, 그 운율은 맞춘다."  
> — *마크 트웨인*

2010년부터 지금까지 제가 시장에 발을 들이고 걸어온 투자 여정의 발자취입니다. 
단기 투기로 방황하던 시기부터, **보글헤드 철학**과 **핵심-위성 전략**, 그리고 **매수 리밸런싱**을 정립하기까지의 흔적들을 한눈에 조회하실 수 있습니다.

---

<script setup>
import { defineAsyncComponent } from 'vue'

const InvestmentHistory = defineAsyncComponent(() =>
  import('../components/InvestmentHistory.vue')
)

const AnnualPerformance = defineAsyncComponent(() =>
  import('../components/AnnualPerformance.vue')
)
</script>

<ClientOnly>
  <InvestmentHistory />
  <div style="margin-top: 3rem;"></div>
  <AnnualPerformance />
</ClientOnly>

