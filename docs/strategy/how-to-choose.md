# 🔍 4. ETF 선정 및 도구 가이드 (Selection & Tools)

> "좋은 투자 전략과 자동화 시스템을 갖추었더라도, 담아내는 그릇(자산) 자체가 나쁘다면 결국 모래성에 불과합니다."

장기적인 우상향과 복리의 성장을 확실하게 보장해 줄 초우량 ETF 및 주식을 선별하는 저만의 4대 기준과 이를 효율적으로 리서치하고 백테스트하기 위해 매일 활용하는 분석 사이트/앱 목록을 공개합니다.

---

## 🏗️ 좋은 ETF를 고르는 4가지 원칙

미국 증시에는 수천 개가 넘는 ETF가 상장되어 있습니다. 이 중 10년 이상 안심하고 기계적으로 적립할 수 있는 우량 상품을 거르는 명확한 필터는 다음과 같습니다.

### 1. 자산 규모 (AUM) 및 유동성
* **판단 기준**: 운용 자산 규모(AUM)가 **최소 $1B (약 1.3조 원) 이상**이고, 일평균 거래량이 풍부할 것.
* **이유**: 규모가 작고 거래가 활발하지 않은 ETF는 사고팔 때 호가 차이로 인해 불리한 거래 비용(Slippage)이 발생합니다. 또한 극단적인 경우 펀드가 청산(상장 폐지)되는 최악의 상황에 노출될 수 있으므로 대형 자산 위주로 진입합니다.

### 2. 운용 수수료 (Expense Ratio)
* **판단 기준**: 일반 인덱스(패시브) ETF의 경우 **연 보수 0.1% 이하**를 지향하며, 모멘텀 등 퀀트 전략의 경우 **0.2% 이하**를 선호합니다.
* **이유**: 10년, 20년 이상 굴러가는 복리의 스노볼에서 수수료는 장기 수익률을 깎아 먹는 가장 무서운 암세포입니다.

### 3. 운용사의 신뢰성 (Issuer)
* **판단 기준**: 글로벌 최상위 자산운용사인 **Vanguard(뱅가드), BlackRock(블랙록), State Street(스테이트 스트리트), Invesco(인베스코)**의 상품을 최우선으로 선택합니다.
* **이유**: 비즈니스 규모의 경제를 통해 수수료를 한계 수준까지 인하하며, 운용사의 파산이나 뱅크런 리스크가 사실상 제로에 가깝기 때문입니다.

### 4. 추적 오차 (Tracking Error) 및 괴리율 (Premium/Discount)
* **판단 기준**: 추적 오차가 **0.05%~0.1% 이하**이며, 순자산가치(NAV)와 실제 거래 가격 간의 괴리가 거의 없을 것.
* **이유**: ETF가 원래 복제하고 따라가야 할 기초 자산 지수를 오차 없이 충실하게 추종하고 있는지를 보여주는 펀드의 본질적인 품질 지표입니다.

---

## 🗂️ 핵심 포트폴리오를 위한 기초 추천 ETF 라인업

| 자산 범주                 | 대표 ETF 티커 |      운용사       |   운용수수료   | 핵심 특징                                                            |
| :-------------------- | :-------: | :------------: | :-------: | :--------------------------------------------------------------- |
| **S&P 500 지수 추종**     |  **VOO**  |    Vanguard    | **0.03%** | 미국 대표 500대 기업에 분산 투자하는 포트폴리오의 척추.                                |
| **배당 성장 (Dividend)**  | **SCHD**  | Charles Schwab | **0.06%** | 10년 연속 배당을 증액한 초우량 기업에 투자하여 안정적 현금흐름 제공.                         |
| **모멘텀 퀀트 (Momentum)** | **SPMO**  |    Invesco     | **0.13%** | S&P 500 지수 구성 기업 중 가격 상승 탄력성이 가장 강한 상위 100개 주식을 추종하는 모멘텀 퀀트 ETF. |

---

## 🛠️ 내가 활용하는 투자 분석 도구 및 웹사이트

> ⚠️ **"앱을 지우라더니 이 많은 도구를 매일 봐야 하나요?"**
>
> 시세의 등락과 자극적인 뉴스에 둔감해지라는 것이지, 결코 경제 공부를 게을리하라는 뜻이 아닙니다. 보글헤드 철학의 핵심 중 하나는 **'Educate Yourself(스스로 공부하라)'**입니다. 
> 언론의 공포 마케팅이나 찌라시에 휘둘리지 않으려면, 누군가 가공한 뉴스가 아니라 **'원형 데이터(Raw Data)'**를 직접 볼 줄 알아야 합니다. 아래의 도구들은 시세를 추적하기 위함이 아닙니다. 시장의 본질을 꿰뚫어 보고 팩트 체크를 하기 위해 제가 직접 엄선하고 매일같이 활용해 온 '지적 무기고'입니다.

### 📊 A. [원형 데이터] 뉴스 대신 팩트를 보는 곳
언론의 호들갑에 흔들리지 않기 위해 객관적 수치와 군중 심리를 직접 확인합니다.

* **FRED ([fred.stlouisfed.org](https://fred.stlouisfed.org))**:
  * **핵심 용도**: 미국 세인트루이스 연준이 제공하는 방대한 공식 경제 통계 데이터베이스. 기사가 아닌 '진짜' 지표 확인용.
  * **활용**: 원-달러 환율 역사, 미국 기준금리, 통화량(M2), 장단기 금리차 등 거시경제 원형 데이터 열람.
* **CME FedWatch Tool ([cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html](https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html))**:
  * **핵심 용도**: 연준(Fed)의 금리 인상/인하 찌라시에 휘둘리지 않기 위한 최적의 툴.
  * **활용**: 연방기금 선물 가격 데이터를 바탕으로 다음 FOMC 회의에서 금리가 어떻게 변할지 시장의 '진짜 배팅 확률'을 확인.
* **Fear & Greed Index ([edition.cnn.com/markets/fear-and-greed](https://edition.cnn.com/markets/fear-and-greed))**:
  * **핵심 용도**: 한 발짝 물러서서 주식 시장의 군중 심리 관찰.
  * **활용**: 시장이 극단적 공포(Extreme Fear)에 빠졌는지 극단적 탐욕(Extreme Greed)에 빠졌는지 점수로 직관적 확인.
* **Investing.com ([kr.investing.com](https://kr.investing.com))**:
  * **핵심 용도**: 실시간 글로벌 경제 캘린더 모니터링.

### 🛡️ B. [백테스트] 흔들리지 않는 확신을 만드는 곳
내가 고른 행성(Core)이 과거 위기를 어떻게 버텨왔는지 검증하여 장기 보유의 멘탈을 다집니다.

* **Portfolio Visualizer ([portfoliovisualizer.com](https://www.portfoliovisualizer.com))**:
  * **핵심 용도**: 역사적 시뮬레이션의 최강자.
  * **활용**: 내 자산 배분 비율이 과거 경제 위기(MDD) 때 어떻게 방어했는지 백테스트하여 확신 얻기.
* **Macrotrends ([macrotrends.net](https://www.macrotrends.net))**:
  * **핵심 용도**: 특정 자산의 10~20년 장기 재무 데이터 시각화.
  * **활용**: 단기 1~2년이 아닌 굵직한 경제 사이클을 견뎌온 기업과 ETF의 긴 역사를 조망.
* **ETF.com ([etf.com](https://www.etf.com)) / ETFdb ([etfdb.com](https://etfdb.com))**:
  * **핵심 용도**: 글로벌 ETF 심층 해부.
  * **활용**: ETF 간 보유 종목 중복도(Overlap), 수수료 비교, 자금 유입/유출 동향 파악.

### 🔬 C. [심층 리서치] 남의 말이 아닌 내 눈으로 확인하는 곳
누군가의 종목 추천이 아닌, 나만의 위성(Satellite) 자산을 발굴하고 팩트 체크합니다.

* **FnGuide Company Guide ([comp.fnguide.com](http://comp.fnguide.com))**:
  * **핵심 용도**: 한국 주식 및 국내 기업 분석의 표준. 10개년 재무제표 및 컨센서스 확인.
* **Seeking Alpha ([seekingalpha.com](https://seekingalpha.com))**:
  * **핵심 용도**: 글로벌 개별 주식/ETF 실적 분석 리포트 및 기업 실적 발표회(Earnings Call) 원문(Transcript) 확인.
* **GuruFocus ([gurufocus.com](https://www.gurufocus.com))**:
  * **핵심 용도**: 피오트로스키 F-스코어 등 기업 재무 건전성 점검 및 글로벌 구루(워렌 버핏 등) 포트폴리오 트래킹.
* **Finviz ([finviz.com](https://finviz.com))**:
  * **핵심 용도**: 시장 전체 흐름을 한눈에 보는 히트맵(Heatmap) 및 수많은 조건 필터링을 통한 종목 스크리닝.
* **TipRanks ([tipranks.com](https://www.tipranks.com))**:
  * **핵심 용도**: 경영진(내부자) 매매 동향 및 기관/헤지펀드의 자금 움직임을 역추적하여 펀더멘털 최종 검증.
* **TradingView ([tradingview.com](https://www.tradingview.com)) / ETF Check ([etfcheck.co.kr](https://www.etfcheck.co.kr))**:
  * **핵심 용도**: 기술적 차트 분석, 커스텀 보조지표 활용 및 국내 상장 ETF 상세 스크리닝.

### 🤝 D. [마인드셋 방어] 철학의 연대 (Reddit 커뮤니티)
외로운 장기 투자 과정에서 흔들림 없이 원칙을 견지하기 위한 심리적 안식처입니다.

* **r/Bogleheads ([reddit.com/r/Bogleheads](https://www.reddit.com/r/Bogleheads))**: 
  * 존 보글의 철학을 공유하는 장기 패시브 인덱스 투자자들의 성지. "시세 보지 말고 일상을 살아라"를 서로 다독임.
* **r/dividends ([reddit.com/r/dividends](https://www.reddit.com/r/dividends))**: 
  * SCHD 등 배당 성장 및 현금흐름 투자를 논의하는 포럼.
* **r/investing ([reddit.com/r/investing](https://www.reddit.com/r/investing))**: 
  * 글로벌 거시 경제 뉴스, 기업 실적 분석, 자산군 전반에 대한 종합 토론 및 다양한 투자 관점 모니터링.
* **r/wallstreetbets ([reddit.com/r/wallstreetbets](https://www.reddit.com/r/wallstreetbets))**: 
  * 고위험·고수익 중심의 공격적인 개별 주식 성향. 단기 투기성 밈 주식(Meme Stocks) 트렌드를 한 발짝 떨어져서 역발상 지표로 모니터링하는 채널.

---



## 🧭 투자 전략 로드맵 이동

* [🪐 투자 전략 개요 (Overview)](/strategy/)
* [📈 1. KCA 적립식 전략](/strategy/kca)
* [🤖 2. 자동 투자 전략](/strategy/auto-investment)
* [⚖️ 3. 자산 배분 & 운영 전략](/strategy/allocation)
