# Rule of 60 🚀 엘리트 기업 및 바벨 포트폴리오 분류

> **데이터 분석일(스크립트 실행 기준)**: 2026-10-09
>
> **미국 데이터**: Yahoo Finance `revenueGrowth`와 `ebitdaMargins`(없으면 `operatingMargins`)의 조회 시점 값
>
> **한국 데이터**: 네이버 증권 최신 확정 분기의 전년 동기 대비 매출 성장률과 영업이익률(컨센서스 제외)

> [!WARNING] 출처와 산식의 한계
> 미국과 한국은 데이터 제공처와 성장률 기준이 다르므로 국가 간 점수를 직접 비교하면 안 됩니다. 금융·지주회사는 매출과 마진의 의미가 일반 제조업과 다르고, 매우 높은 성장률은 기저효과나 회계 분류의 영향을 받을 수 있습니다. 이 표는 후보 탐색용이며 매수 추천이나 수익률 예측이 아닙니다.

![Rule of 60 Scatter Plot](/rule_of_60_chart-2026-10-09.png)

본 리스트는 기존 룰 오브 40 달성 기업 중 **'Rule of 60 (총점 60 이상)'**이라는 더 높은 컷오프를 통과한 기업을 선별한 결과입니다.

또한, 이들을 **Hyper-Growers**(매출 성장률이 마진보다 큰 기업)와 **Cash Cows**(마진이 매출 성장률보다 큰 기업) 두 그룹으로 분류하여 포트폴리오 바벨 전략에 활용할 수 있도록 구성했습니다.

## 🇺🇸 미국 (S&P 500) - Rule of 60

### 🚀 Hyper-Growers (고성장 엔진 그룹)
> 외형 성장이 압도적인 혁신 리더 기업들입니다. 차세대 기술 트렌드를 이끌며 점유율을 확장하는 데 집중합니다. (Rev Growth > Margin)

| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 60 Score |
| --- | --- | --- | --- | --- | --- |
| COF | Capital One Financial Corporati | Financial Services | 1111.0% | 33.6% | **1144.6** |
| MU | Micron Technology, Inc. | Technology | 379.3% | 81.7% | **461.0** |
| BE | Bloom Energy Corporation | Industrials | 165.5% | 13.4% | **178.9** |
| NVDA | NVIDIA Corporation | Technology | 105.9% | 66.4% | **172.3** |
| AVGO | Broadcom Inc. | Technology | 85.5% | 58.7% | **144.2** |
| PLTR | Palantir Technologies Inc. | Technology | 92.8% | 43.3% | **136.1** |
| LITE | Lumentum Holdings Inc. | Technology | 109.3% | 26.6% | **135.9** |
| EOG | EOG Resources, Inc. | Energy | 58.7% | 54.2% | **112.9** |
| GPN | Global Payments Inc. | Industrials | 68.6% | 43.9% | **112.5** |
| DVN | Devon Energy Corporation | Energy | 64.2% | 47.5% | **111.7** |
| KDP | Keurig Dr Pepper Inc. | Consumer Defensive | 75.6% | 23.9% | **99.5** |
| BG | Bunge Limited | Consumer Defensive | 88.3% | 3.4% | **91.7** |
| FITB | Fifth Third Bancorp | Financial Services | 51.8% | 39.1% | **90.9** |
| RDDT | Reddit, Inc. | Communication Services | 61.1% | 28.8% | **89.9** |
| HBAN | Huntington Bancshares Incorpora | Financial Services | 47.6% | 41.9% | **89.5** |
| APH | Amphenol Corporation | Technology | 55.0% | 32.6% | **87.6** |
| APO | Apollo Global Management, Inc. | Financial Services | 63.8% | 22.0% | **85.8** |
| GS | Goldman Sachs Group, Inc. (The) | Financial Services | 42.5% | 42.2% | **84.7** |
| OMC | Omnicom Group Inc. | Communication Services | 63.4% | 16.4% | **79.8** |
| MPWR | Monolithic Power Systems, Inc. | Technology | 47.6% | 30.6% | **78.2** |
| CVX | Chevron Corporation | Energy | 53.5% | 24.2% | **77.7** |
| AMD | Advanced Micro Devices, Inc. | Technology | 50.1% | 23.2% | **73.2** |
| OKE | ONEOK, Inc. | Energy | 52.8% | 19.5% | **72.3** |
| INCY | Incyte Corporation | Healthcare | 37.7% | 33.4% | **71.1** |
| DELL | Dell Technologies Inc. | Technology | 57.7% | 11.7% | **69.4** |
| FIX | Comfort Systems USA, Inc. | Industrials | 50.3% | 17.8% | **68.1** |
| MCHP | Microchip Technology Incorporat | Technology | 38.0% | 29.4% | **67.4** |
| MRVL | Marvell Technology, Inc. | Technology | 36.5% | 30.2% | **66.7** |
| MPC | Marathon Petroleum Corporation | Energy | 53.7% | 10.0% | **63.7** |
| XOM | ExxonMobil Holdings Corporation | Energy | 44.1% | 18.8% | **62.9** |
| CINF | Cincinnati Financial Corporatio | Financial Services | 31.6% | 31.3% | **62.9** |
| CVNA | Carvana Co. | Consumer Cyclical | 52.4% | 10.0% | **62.4** |
| KEYS | Keysight Technologies Inc. | Technology | 36.5% | 25.8% | **62.3** |

### 💰 Cash Cows (현금 창출기 그룹)
> 막대한 이익을 현금으로 찍어내는 독점적 지배자들입니다. 압도적인 마진율로 배당과 자사주 매입(주주환원)에 탁월한 역량을 보입니다. (Margin >= Rev Growth)

| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 60 Score |
| --- | --- | --- | --- | --- | --- |
| APP | Applovin Corporation | Communication Services | 52.8% | 79.3% | **132.1** |
| FANG | Diamondback Energy, Inc. | Energy | 52.5% | 72.5% | **125.0** |
| OXY | Occidental Petroleum Corporatio | Energy | 53.4% | 57.3% | **110.7** |
| IBKR | Interactive Brokers Group, Inc. | Financial Services | 26.3% | 76.5% | **102.8** |
| LLY | Eli Lilly and Company | Healthcare | 47.7% | 52.4% | **100.1** |
| O | Realty Income Corporation | Real Estate | 9.6% | 88.3% | **97.9** |
| ADI | Analog Devices, Inc. | Technology | 39.6% | 49.9% | **89.5** |
| BX | Blackstone Inc. | Financial Services | 28.6% | 54.4% | **83.0** |
| PLD | Prologis, Inc. | Real Estate | 12.3% | 69.8% | **82.1** |
| ANET | Arista Networks, Inc. | Technology | 37.7% | 44.0% | **81.7** |
| NEM | Newmont Corporation | Basic Materials | 15.1% | 66.2% | **81.3** |
| JPM | JP Morgan Chase & Co. | Financial Services | 30.4% | 50.4% | **80.8** |
| NTRS | Northern Trust Corporation | Financial Services | 36.4% | 42.5% | **78.9** |
| FICO | Fair Isaac Corporation | Technology | 25.7% | 52.8% | **78.5** |
| MO | Altria Group, Inc. | Consumer Defensive | 1.2% | 77.1% | **78.3** |
| ORCL | Oracle Corporation | Technology | 29.6% | 48.0% | **77.6** |
| DLR | Digital Realty Trust, Inc. | Real Estate | 29.9% | 47.5% | **77.4** |
| MA | Mastercard Incorporated | Financial Services | 14.1% | 63.3% | **77.4** |
| CPAY | Corpay, Inc. | Technology | 21.5% | 55.7% | **77.2** |
| COP | ConocoPhillips | Energy | 35.5% | 41.5% | **77.0** |
| MAR | Marriott International | Consumer Cyclical | 11.1% | 65.2% | **76.3** |
| MSFT | Microsoft Corporation | Technology | 17.7% | 58.5% | **76.2** |
| META | Meta Platforms, Inc. | Communication Services | 28.0% | 48.0% | **76.0** |
| APA | APA Corporation | Energy | 9.2% | 66.7% | **75.9** |
| BRO | Brown & Brown, Inc. | Financial Services | 32.4% | 43.4% | **75.8** |
| NDAQ | Nasdaq, Inc. | Financial Services | 14.9% | 59.7% | **74.6** |
| PSA | Public Storage | Real Estate | 3.3% | 70.0% | **73.3** |
| SCHW | Charles Schwab Corporation (The | Financial Services | 20.9% | 52.3% | **73.2** |
| REG | Regency Centers Corporation | Real Estate | 8.9% | 63.6% | **72.5** |
| CME | CME Group Inc. | Financial Services | 0.8% | 70.6% | **71.4** |
| BLK | BlackRock, Inc. | Financial Services | 30.6% | 40.7% | **71.3** |
| MSCI | MSCI Inc. | Financial Services | 12.2% | 58.9% | **71.1** |
| FRT | Federal Realty Investment Trust | Real Estate | 7.2% | 62.7% | **69.9** |
| EXR | Extra Space Storage Inc | Real Estate | 3.8% | 65.8% | **69.6** |
| MS | Morgan Stanley | Financial Services | 28.0% | 41.6% | **69.6** |
| AMT | American Tower Corporation (REI | Real Estate | 4.7% | 64.4% | **69.1** |
| ICE | Intercontinental Exchange Inc. | Financial Services | 4.8% | 63.6% | **68.4** |
| CF | CF Industries Holdings, Inc. | Basic Materials | 17.6% | 50.0% | **67.6** |
| LRCX | Lam Research Corporation | Technology | 30.0% | 37.2% | **67.2** |
| KIM | Kimco Realty Corporation (HC) | Real Estate | 4.9% | 60.9% | **65.8** |
| ESS | Essex Property Trust, Inc. | Real Estate | 3.1% | 62.1% | **65.2** |
| MCO | Moody's Corporation | Financial Services | 15.1% | 49.7% | **64.8** |
| DOC | Healthpeak Properties, Inc. | Real Estate | 11.1% | 53.2% | **64.3** |
| D | Dominion Energy, Inc. | Utilities | 17.6% | 46.0% | **63.6** |
| NEE | NextEra Energy, Inc. | Utilities | 12.4% | 50.8% | **63.2** |
| GOOGL | Alphabet Inc. | Communication Services | 24.2% | 38.8% | **63.0** |
| GOOG | Alphabet Inc. | Communication Services | 24.2% | 38.8% | **63.0** |
| HLT | Hilton Worldwide Holdings Inc. | Consumer Cyclical | 2.5% | 60.5% | **63.0** |
| INVH | Invitation Homes Inc. | Real Estate | 10.1% | 52.7% | **62.8** |
| EQIX | Equinix, Inc. | Real Estate | 16.7% | 45.8% | **62.5** |
| PNC | PNC Financial Services Group, I | Financial Services | 23.6% | 38.7% | **62.3** |
| AWK | American Water Works Company, I | Utilities | 6.2% | 55.1% | **61.3** |
| CDNS | Cadence Design Systems, Inc. | Technology | 24.2% | 36.9% | **61.1** |
| CBOE | Cboe Global Markets, Inc. | Financial Services | 22.9% | 38.1% | **61.0** |
| FTNT | Fortinet, Inc. | Technology | 25.6% | 34.5% | **60.1** |

## 🇰🇷 한국 (KOSPI 시가총액 상위 100개 표본 + APR) - Rule of 60

### 🚀 Hyper-Growers (고성장 엔진 그룹)

| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 60 Score |
| --- | --- | --- | --- | --- | --- |
| 402340.KS | SK스퀘어 | 미제공 | 967.3% | 98.1% | **1065.3** |
| 000660.KS | SK하이닉스 | 미제공 | 256.8% | 76.3% | **333.1** |
| 005940.KS | NH투자증권 | 미제공 | 276.6% | 5.5% | **282.1** |
| 039490.KS | 키움증권 | 미제공 | 256.7% | 4.9% | **261.6** |
| 006800.KS | 미래에셋증권 | 미제공 | 181.1% | 11.5% | **192.6** |
| 005930.KS | 삼성전자 | 미제공 | 130.0% | 52.2% | **182.2** |
| 005935.KS | 삼성전자우 | 미제공 | 130.0% | 52.2% | **182.2** |
| 278470.KS | 에이피알 | 미제공 | 134.2% | 24.8% | **159.0** |
| 259960.KS | 크래프톤 | 미제공 | 94.9% | 31.9% | **126.7** |
| 016360.KS | 삼성증권 | 미제공 | 111.6% | 7.0% | **118.6** |
| 352820.KS | 하이브 | 미제공 | 105.5% | 11.8% | **117.3** |
| 071050.KS | 한국금융지주 | 미제공 | 70.8% | 43.4% | **114.2** |
| 138040.KS | 메리츠금융지주 | 미제공 | 77.8% | 9.3% | **87.1** |
| 353200.KS | 대덕전자 | 미제공 | 63.1% | 17.5% | **80.6** |
| 042660.KS | 한화오션 | 미제공 | 65.2% | 13.5% | **78.8** |
| 007660.KS | 이수페타시스 | 미제공 | 57.4% | 20.3% | **77.7** |
| 068270.KS | 셀트리온 | 미제공 | 45.0% | 32.4% | **77.4** |
| 010130.KS | 고려아연 | 미제공 | 66.6% | 9.2% | **75.8** |
| 032830.KS | 삼성생명 | 미제공 | 67.9% | 3.3% | **71.2** |
| 329180.KS | HD현대중공업 | 미제공 | 52.7% | 16.4% | **69.1** |
| 003230.KS | 삼양식품 | 미제공 | 39.3% | 22.9% | **62.1** |
| 012450.KS | 한화에어로스페이스 | 미제공 | 47.2% | 14.7% | **61.9** |
| 096770.KS | SK이노베이션 | 미제공 | 49.9% | 12.0% | **61.8** |

### 💰 Cash Cows (현금 창출기 그룹)

| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 60 Score |
| --- | --- | --- | --- | --- | --- |
| 042700.KS | 한미반도체 | 미제공 | 39.6% | 51.9% | **91.5** |
| 207940.KS | 삼성바이오로직스 | 미제공 | 30.2% | 44.4% | **74.6** |
| 062040.KS | 산일전기 | 미제공 | 28.0% | 37.8% | **65.8** |
