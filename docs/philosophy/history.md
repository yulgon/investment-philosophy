# 📜 나의 투자 연혁 (History)

> [!WARNING]
> **투자 위험 고지 (Investment Disclaimer)**
> 이 페이지에 기재된 종목·ETF·전략은 **개인의 투자 기록 목적**으로만 작성되었으며, 특정 종목의 매수·매도를 권유하거나 투자 자문을 제공하는 것이 아닙니다.
> 과거 수익률은 미래 수익을 보장하지 않으며, **모든 투자 판단과 그에 따른 손익의 책임은 투자자 본인에게 있습니다.**

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

