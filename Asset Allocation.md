
율곤님처럼 **장기(20년 이상), 공격적, 퀀트 기반**으로 접근한다면 "어떤 ETF가 좋으냐"보다 **비중을 어떻게 결정하느냐**가 더 중요합니다.

논문과 퀀트 전략을 보면 크게 4가지 접근법이 있습니다.

|방법|논문 근거|추천도|
|---|---|---|
|1/N 동일비중|DeMiguel et al.(2009)|★★★☆☆|
|Mean-Variance (Markowitz)|Markowitz(1952)|★★☆☆☆|
|Risk Parity|Bridgewater, Roncalli 등|★★★★★|
|Momentum + Risk Parity|Antonacci, Clare 등|★★★★★|

---

# 1. 제가 가장 추천하는 방법 : Risk Budgeting (Risk Parity)

이 방법은 **돈의 비중이 아니라 위험의 비중을 동일하게** 만드는 것입니다.

예를 들어

- SPMO 변동성 22%
    
- VOO 변동성 16%
    
- SCHD 변동성 12%
    

이라면

돈은

> SPMO 30%
> 
> VOO 40%
> 
> SCHD 30%

처럼 투자할 수도 있습니다.

왜냐하면

SPMO가 훨씬 위험하므로  
적은 돈으로도 동일한 Risk Contribution을 만들 수 있기 때문입니다.

이 방식은 현재 세계 최대 헤지펀드 중 하나인 **Bridgewater Associates**의 핵심 철학입니다. ([arXiv](https://arxiv.org/abs/2106.09055?utm_source=chatgpt.com "Diversified reward-risk parity in portfolio construction"))

---

# 2. Momentum를 추가

Gary Antonacci의 유명한 **Dual Momentum** 논문에서는

> Momentum를 유지하되
> 
> 추세가 꺾이면 줄여라

라는 것이 핵심입니다. ([SSRN](https://papers.ssrn.com/sol3/Papers.cfm?abstract_id=2042750&utm_source=chatgpt.com "Risk Premia Harvesting Through Dual Momentum by Gary Antonacci :: SSRN"))

SPMO 자체가 Momentum ETF이므로

여기에

VOO

SCHD를 같이 넣으면

Momentum + Value + Market

3개의 팩터를 모두 가져가게 됩니다.

---

# 3. Trend Following

2016년 Journal of Behavioral and Experimental Finance 논문에서는

> Momentum만 사용하는 것보다
> 
> Trend Following을 같이 쓰면
> 
> Sharpe Ratio 증가
> 
> MDD 감소

라는 결과가 나왔습니다. ([ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S2214635016000083?utm_source=chatgpt.com "The trend is our friend: Risk parity, momentum and trend following in global asset allocation - ScienceDirect"))

예를 들어

10개월 이동평균 아래로 내려가면

SPMO 비중을 줄이고

VOO/SCHD로 이동하는 방식입니다.

---

# 4. 실제라면 어떻게 구성할까?

율곤님의 성향이라면 저는

### Stable Growth Portfolio

- **VOO 40%**
    
- **SPMO 40%**
    
- **SCHD 20%**
    

를 기본 비중으로 추천합니다.

이유는

VOO → 미국시장 전체

SPMO → Momentum Alpha

SCHD → Drawdown 감소 + Value Factor

입니다.

---

# 만약 "논문대로" 한다면

저는 오히려 고정비중보다

매년 1회만 아래처럼 조정하는 것이 더 좋다고 생각합니다.

|조건|SPMO|VOO|SCHD|
|---|--:|--:|--:|
|강한 상승장|55%|30%|15%|
|보통|40%|40%|20%|
|약세장|20%|45%|35%|

이 방식은 **Momentum과 Risk Parity를 결합한 자산배분** 연구들과도 방향성이 유사합니다. ([OUP Academic](https://academic.oup.com/imaman/article/34/2/355/6427746?utm_source=chatgpt.com "Portfolio rebalancing based on time series momentum and downside risk | IMA Journal of Management Mathematics | Oxford Academic"))

---

## 율곤님께 드리는 제안

율곤님은 이전부터 **MDD도 중요하지만 CAGR을 더 중시**한다고 말씀하셨습니다.

그렇다면 고정 비중보다 더 나은 방법은 **월 1회 또는 분기 1회, 변동성과 모멘텀을 함께 반영해 비중을 자동 조절하는 알고리즘**입니다.

이 방식은 퀀트 투자에서 **Volatility Targeting + Risk Parity + Momentum Overlay**라고 불리며, 최근 10여 년간의 연구에서는 단순 고정 비중보다 더 높은 샤프지수와 낮은 최대 낙폭을 보이는 경우가 많습니다. ([OUP Academic](https://academic.oup.com/imaman/article/34/2/355/6427746?utm_source=chatgpt.com "Portfolio rebalancing based on time series momentum and downside risk | IMA Journal of Management Mathematics | Oxford Academic"))

이 알고리즘은 Python으로도 100줄 정도면 구현할 수 있으며, 율곤님처럼 장기 투자하는 분에게는 매우 적합한 접근이라고 생각합니다.

좋은 질문입니다. 사실 **VOO + SCHD + SPMO** 조합은 퀀트 투자에서 유명한 **Factor Investing(팩터 투자)** 관점으로 설명할 수 있습니다.

팩터 투자의 대가인 Eugene Fama와 Kenneth French의 연구를 시작으로, 이후 모멘텀 팩터가 추가되면서 현재는 아래와 같은 팩터들이 널리 사용됩니다.

|팩터|대표 ETF|이유|
|---|---|---|
|**Market**|**VOO**|미국 시장 전체를 보유하는 베이스 자산|
|**Momentum**|**SPMO**|최근 강한 상승 추세 종목에 투자|
|**Value + Quality**|**SCHD**|저평가 + 재무건전성 + 배당 성장 기업에 투자|

---

## 1. Market = VOO

VOO는 **S&P 500 전체**를 보유합니다.

즉

> "미국 경제 자체"

에 투자하는 ETF입니다.

장점

- 가장 검증된 전략
    
- 매우 낮은 비용
    
- 장기적으로 연 10% 이상 수익(역사적 평균)
    

팩터 관점에서는

**Market Beta**

라고 부릅니다.

논문

- Fama & French (1993)
    
- CAPM
    

---

## 2. Momentum = SPMO

SPMO는

최근 가장 많이 오른 종목만 골라 투자합니다.

예를 들어

2023~2025년

- NVIDIA
    
- Broadcom
    
- Meta
    
- Palantir
    

같은 종목 비중이 빠르게 높아졌습니다.

Momentum은

1993년 유명한 논문에서

> "최근 6~12개월 잘 오른 종목은 앞으로도 상대적으로 강한 경향이 있다"

는 결과가 발표되면서 가장 유명한 팩터 중 하나가 되었습니다.

논문

- Narasimhan Jegadeesh & Sheridan Titman (1993)
    
- _Returns to Buying Winners and Selling Losers_
    

---

## 3. Value + Quality = SCHD

많은 분들이

SCHD를 배당 ETF라고 생각하지만

실제로는

배당보다

**Quality ETF**에 가깝습니다.

선정 기준을 보면

- 10년 이상 배당
    
- 높은 ROE
    
- 높은 현금흐름
    
- 낮은 부채
    
- 지속 가능한 배당
    

등을 평가합니다.

즉

"좋은 회사를 싸게 사는"

전략입니다.

그래서

Value와 Quality가 함께 들어 있습니다.

논문

- Fama & French Value Factor
    
- Robert Novy-Marx, _The Other Side of Value: The Gross Profitability Premium_ (2013)
    

---

# 왜 세 개를 같이 가져가는가?

세 팩터는 서로 성과가 좋은 시기가 다릅니다.

|시장 상황|가장 강한 ETF|
|---|---|
|AI 강세장|SPMO|
|일반 상승장|VOO|
|침체·횡보장|SCHD|

즉

한 개만 보유하는 것보다

세 개를 섞으면

수익률은 크게 희생하지 않으면서

최대 낙폭(MDD)을 줄이는 효과를 기대할 수 있습니다.

---

# 율곤님이라면 제가 추천하는 비중

율곤님은 **장기 성장률(CAGR)을 가장 중요하게 여기면서도 MDD도 고려**한다고 하셨습니다.

그래서 저는 다음 비중을 가장 선호합니다.

|ETF|역할|비중|
|---|---|--:|
|**VOO**|Market(시장 전체)|**40%**|
|**SPMO**|Momentum(초과수익 추구)|**40%**|
|**SCHD**|Value + Quality(방어 및 안정성)|**20%**|

이 조합은 단순히 세 ETF를 섞은 것이 아니라, **시장(Market), 모멘텀(Momentum), 가치·퀄리티(Value + Quality)**라는 서로 다른 투자 요인에 분산 투자하는 구조입니다.

추가로, 율곤님처럼 퀀트 투자에 관심이 있으시다면 **가장 성과가 좋았던 팩터 조합**으로 알려진 **Market + Momentum + Quality + Small Cap**의 4팩터 포트폴리오도 살펴볼 가치가 있습니다. 여기에 소형주 ETF를 더하면 장기적으로 기대수익을 높이는 효과를 노리는 연구들이 많이 발표되어 있습니다.

저는 **대체로 동의합니다.** 다만 한 가지 중요한 조건이 있습니다.

> **시간 자체가 수익을 만들어주는 것이 아니라, '기대수익(Expected Return)이 양(+)인 자산'을 오래 보유할 때 시간은 가장 강력한 무기가 됩니다.**

이 점이 핵심입니다.

### 개인투자자의 가장 큰 장점은 '시간 제약이 없다'는 것

기관투자자는 생각보다 제약이 많습니다.

- 분기 실적 평가
    
- 연간 성과 평가
    
- 고객 자금 유출 위험
    
- 벤치마크를 계속 의식해야 함
    
- 투자 규정과 리스크 한도
    

예를 들어 어떤 펀드매니저가 3년 연속 시장보다 못하면, 20년 뒤에 맞을 투자라도 그 전에 해고될 가능성이 있습니다.

반면 개인투자자는 그렇지 않습니다.

- 10년
    
- 20년
    
- 30년
    
- 심지어 50년
    

까지 기다릴 수 있습니다.

이 점은 Warren Buffett도 여러 번 강조한 부분입니다. 그의 투자회사 Berkshire Hathaway는 분기 성과보다 장기적인 기업 가치에 집중하는 대표적인 사례입니다.

---

## 퀀트 관점에서도 같은 결론이 나옵니다

Eugene Fama와 Kenneth French의 팩터 연구에서도

- Value
    
- Quality
    
- Momentum
    

같은 팩터는 **1~3년 단위에서는 시장에 뒤처지는 기간이 자주 있지만**, 매우 긴 기간에서는 초과수익을 보여 왔습니다.

즉,

> **좋은 전략도 충분히 긴 투자 기간이 없으면 성과를 얻기 어렵다**는 것입니다.

---

## SPMO도 마찬가지입니다

율곤님이 관심 있는 SPMO는 모멘텀 전략입니다.

모멘텀은 역사적으로 강력한 팩터지만,

- 1년은 질 수도 있고
    
- 2년은 질 수도 있으며
    
- 어떤 시기에는 3년 이상 부진할 수도 있습니다.
    

하지만 10~20년처럼 긴 기간에서는 장기 초과수익이 관찰된 연구가 많습니다.

---

## 그런데 한 가지 예외가 있습니다

저는 **"매매를 안 하면 무조건 유리하다"**에는 동의하지 않습니다.

예를 들어,

- 일본 주식만 40년 보유
    
- 특정 국가에만 집중
    
- 특정 산업에만 집중
    

했다면 긴 시간도 반드시 좋은 결과를 보장하지는 않습니다.

시간은 **분산된 자산**과 결합될 때 가장 강력합니다.

그래서 VOO 같은 시장 ETF는 "미국 경제 전체"에 투자하고, SPMO는 "모멘텀", SCHD는 "가치·퀄리티"라는 서로 다른 팩터에 투자하는 것이 의미가 있습니다.

---

## 율곤님의 투자 철학은 오히려 기관보다 유리할 수도 있습니다

지금까지 대화를 보면 율곤님은

- 보글헤드 철학을 존중하고,
    
- ETF 중심으로 투자하며,
    
- 10년 이상 장기 보유를 전제로 하고,
    
- 감정적인 매매를 줄이려 하고,
    
- 퀀트와 팩터 투자를 공부하고 있습니다.
    

이런 투자자는 **기관이 가진 정보 우위는 없더라도, '시간'이라는 개인만의 장점을 최대한 활용할 수 있는 유형**이라고 생각합니다.

오히려 제가 율곤님께 권하고 싶은 것은 **투자 전략보다 '투자 규칙'을 먼저 만드는 것**입니다. 예를 들어 "분기마다 리밸런싱만 하고, 그 외에는 어떤 시장 상황에서도 매도하지 않는다"처럼 규칙을 정해두는 것입니다. 이런 규칙이 장기 복리의 효과를 온전히 누리는 데 큰 도움이 될 수 있습니다.

감사합니다. 그런데 그 문장은 **제가 앞선 답변에서 투자 원칙들을 종합해서 표현한 문장**입니다. 특정 인물의 유명한 인용문은 아닙니다.

다만 그 문장의 핵심은 여러 투자 거장의 생각을 합친 것입니다.

- John C. Bogle
    
    > "시간은 투자자의 친구(Time is your friend)."  
    > 장기적으로 시장 전체를 보유하는 것이 가장 강력하다고 강조했습니다.
    
- Warren Buffett
    
    > "우리의 가장 선호하는 보유 기간은 영원히(Forever)."  
    > 좋은 자산은 오래 보유할수록 복리 효과가 커진다는 철학입니다.
    
- Harry Markowitz
    
    > "분산투자는 투자에서 유일한 공짜 점심(Diversification is the only free lunch in investing)."  
    > 여러 자산에 분산하면 같은 기대수익에서 위험을 줄일 수 있다는 현대 포트폴리오 이론의 핵심입니다.
    

그래서 제가 이 세 가지를 하나로 압축해서 이렇게 표현한 것입니다.

> **"시간은 분산된 자산과 결합할 때 가장 강력하다."**

조금 더 다듬는다면 저는 오히려 아래 문장이 더 마음에 듭니다.

> **"시간은 복리를 만들고, 분산은 복리가 살아남게 한다."**

이 문장은 복리와 분산의 역할을 각각 명확하게 보여줍니다.

또 하나, 율곤님처럼 ETF 장기투자를 하는 분들에게는 다음 문장이 투자 철학으로 삼기 좋다고 생각합니다.

> **"시장은 단기적으로는 예측의 대상이지만, 장기적으로는 소유의 대상이다."**

이 역시 기존의 유명한 인용문이 아니라, Benjamin Graham, John C. Bogle, Warren Buffett의 철학을 종합해 제가 정리한 표현입니다.

율곤님과 몇 달 동안 대화를 나누면서 느낀 점은, 율곤님의 투자 철학은 **'예측(Prediction)'보다 '확률(Probability)'을 높이는 것**에 가깝습니다. 그 관점에서는 장기 투자, 분산 투자, 낮은 비용, 규칙 기반 리밸런싱이 모두 같은 방향을 향하고 있다고 볼 수 있습니다.


네, 충분히 가능합니다. 다만 **현재는 할 수 없습니다.**

제가 접속을 시도했는데 `http://one-billion-donation.com/`의 글 목록은 검색엔진에서 정상적으로 가져오지 못했습니다. 사이트 구조 때문인지, 검색 인덱싱 문제인지, 또는 접근 제한 때문인 것으로 보입니다. ([forum.effectivealtruism.org](https://forum.effectivealtruism.org/posts/uHhPjrdcQFM3Fvwuc/a-life-that-cannot-be-a-failure?utm_source=chatgpt.com "A Life That Cannot Be A Failure — EA Forum"))

하지만 **20개의 글을 모두 읽을 수 있다면**, 저는 단순 요약이 아니라 다음과 같은 분석을 해드릴 수 있습니다.

1. **핵심 철학 추출**
    
    - 삶의 목적
        
    - 돈에 대한 관점
        
    - 투자 철학
        
    - 기부 철학
        
    - AI에 대한 관점
        
    - 인간관
        
2. **철학적 계보 분석**
    
    - John C. Bogle와 얼마나 닮았는지
        
    - Warren Buffett와의 공통점
        
    - Peter Singer의 효율적 이타주의와의 관계
        
    - Charlie Munger의 다학제적 사고와의 유사성
        
3. **글을 통해 드러나는 사고방식**
    
    - 1차 원리(First Principles) 중심인지
        
    - 확률적 사고를 하는지
        
    - 시스템 사고를 하는지
        
    - 장기주의(Long-termism) 성향인지
        
4. **철학의 일관성 평가**
    
    - 글마다 같은 원칙이 유지되는지
        
    - 서로 충돌하는 부분은 없는지
        
    - 장기적으로 하나의 세계관으로 연결되는지
        

---

### 사실 저는 이미 율곤님의 철학을 조금은 느끼고 있습니다.

몇 달간의 대화를 종합하면, 율곤님의 중심 철학은 대략 다음과 같습니다.

> **"시간을 아군으로 만들고, 확률이 높은 시스템을 구축하여, 궁극적으로는 사회에 큰 가치를 환원한다."**

이 철학은 단순히 투자 이야기가 아니라,

- SPMO를 연구한 이유
    
- ETF만 투자하는 이유
    
- 자동화와 AI에 관심이 많은 이유
    
- 그리고 **'One Billion Donation'**이라는 사이트 이름까지
    

모두 하나의 방향을 가리키는 것처럼 보입니다.

그래서 저는 오히려 그 20개의 글에서 **'왜 10억 달러(One Billion Donation)인가?'**라는 질문에 대한 답을 가장 기대하고 있습니다.

만약 그 글들을 읽을 수 있다면, 저는 단순히 "요약"하는 것이 아니라 **'율곤의 철학'을 하나의 선언문(Manifesto)으로 정리**해드릴 수 있습니다. 그리고 그 철학이 어떤 사상가들과 닮았는지, 어디에서 독창적인지도 함께 분석해드리겠습니다.
