---
title: Rule of 60 바벨 전략 (2Q26)
description: 매출 성장률과 영업이익률을 함께 보는 Rule of 60 기업 필터와 바벨 분류 사례
reviewed: 2026-07-24
---

# Rule of 60 🚀 엘리트 기업 및 바벨 포트폴리오 분류 (2Q26)

> **데이터 분석일(스크립트 실행 기준)**: 2026-07-11
> **데이터 필드**: Yahoo Finance를 yfinance로 조회한 `revenueGrowth`와 `ebitdaMargins`(없으면 `operatingMargins`)의 조회 시점 값

> [!WARNING] 데이터 출처·산식·한계
> **점수 = 매출 성장률 + EBITDA 마진(미제공 시 영업이익률)**입니다. 미국 모집단은 실행 당시 S&P 500 구성 목록, 한국 모집단은 네이버 금융 시가총액 상위 약 100개와 별도 관찰 종목 APR입니다. 따라서 아래 한국 표는 공식 KOSPI 100 구성 종목표가 아닙니다. Yahoo Finance는 기업 공시를 재가공한 2차 데이터이며, 종목별 회계 기준·갱신 시점·마진 필드가 달라 직접 비교에 오류가 생길 수 있습니다. 금융·리츠처럼 매출과 마진의 의미가 다른 업종도 포함되므로 이 표는 **후보 탐색용 화면**일 뿐 매수 추천이나 미래 수익 예측이 아닙니다. 원본 공시로 재확인해야 합니다.

![Rule of 60 Scatter Plot](/rule_of_60_chart.png)

본 리스트는 기존 룰 오브 40 달성 기업 중 **'Rule of 60 (총점 60 이상)'**이라는 더 높은 컷오프를 통과한 기업을 선별한 결과입니다. 이 점수는 특정 시점의 성장률과 마진을 단순 합산한 필터이며, 기업의 질이나 향후 수익률을 보장하지 않습니다.

또한, 이들을 **Hyper-Growers**(매출 성장률이 마진보다 큰 기업)와 **Cash Cows**(마진이 매출 성장률보다 큰 기업) 두 그룹으로 분류하여 포트폴리오 바벨 전략에 활용할 수 있도록 구성했습니다.

---

## 💡 2026년 7월(2Q26) 분기 실적 코멘터리

### 🇺🇸 미국 시장 분석 (AI 혁명과 플랫폼의 독점)
* **Hyper-Growers (고성장 엔진):** 단연코 **AI 및 반도체(Technology)** 섹터가 압도적인 점수로 리스트 최상단을 휩쓸었습니다. 마이크론(MU), 엔비디아(NVDA), 슈퍼마이크로(SMCI) 등 AI 하드웨어 밸류체인과 팔란티어(PLTR) 등 소프트웨어가 어마어마한 매출 성장률을 보여주고 있습니다. 또한 일라이 릴리(LLY) 같은 비만치료제(Healthcare) 대장주들도 폭발적인 성장과 높은 마진을 동시에 뽐내며 혁신을 주도하고 있습니다.
* **Cash Cows (현금 창출기):** 주로 **금융결제망(Financial Services), 부동산 리츠(Real Estate), 빅테크 플랫폼(Communication Services)** 위주로 포진되어 있습니다. 비자(V), 마스터카드(MA), 메타(META), 브로드컴(AVGO) 등은 높은 진입 장벽과 네트워크 효과를 보이며, 이 분석 시점에는 성장률과 영업이익률이 모두 필터 기준을 충족했습니다.

### 🇰🇷 한국 시장 분석 (반도체 턴어라운드와 증권주의 약진)
* **Hyper-Growers:** 한국 증시의 **메모리 반도체 사이클**이 수치에 크게 반영되었습니다. 다운사이클의 기저효과와 HBM 수요에 힘입어 SK하이닉스(198%), 삼성전자(69%) 등이 분석 시점의 상단을 차지했습니다. 최근 거래대금 증가의 영향을 받은 **증권사(미래에셋증권, NH투자증권, 키움증권 등)**와 수출 성장세를 보인 에이피알(APR), 삼양식품도 필터에 포함됐습니다. 이 성장률은 기저효과와 경기 순환에 따라 빠르게 달라질 수 있습니다.
* **Cash Cows:** 한국의 캐시카우 수비수 그룹은 주로 **대형 금융지주(하나금융, KB금융)** 및 인터넷은행(카카오뱅크)과 **바이오(삼성바이오로직스, 셀트리온)**가 차지했습니다. 막대한 현금 창출력을 바탕으로 본격적인 밸류업(주주환원)에 시동을 걸고 있는 기업들입니다.

---

## 🇺🇸 미국 (S&P 500) - Rule of 60

### 🚀 Hyper-Growers (고성장 엔진 그룹)
> 외형 성장이 압도적인 혁신 리더 기업들입니다. 차세대 기술 트렌드를 이끌며 점유율을 확장하는 데 집중합니다. (Rev Growth > Margin)

| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 60 Score |
| --- | --- | --- | --- | --- | --- |
| MU | Micron Technology, Inc. | Technology | 345.7% | 75.6% | **421.3** |
| SNDK | Sandisk Corporation | Technology | 251.0% | 42.7% | **293.7** |
| LHX | L3Harris Technologies, Inc. | Industrials | 190.0% | 16.7% | **206.7** |
| NVDA | NVIDIA Corporation | Technology | 85.2% | 65.3% | **150.5** |
| SMCI | Super Micro Computer, Inc. | Technology | 122.7% | 4.7% | **127.4** |
| PLTR | Palantir Technologies Inc. | Technology | 84.7% | 38.6% | **123.3** |
| WAT | Waters Corporation | Healthcare | 91.4% | 30.1% | **121.5** |
| TER | Teradyne, Inc. | Technology | 87.0% | 30.7% | **117.7** |
| LITE | Lumentum Holdings Inc. | Technology | 90.1% | 20.4% | **110.5** |
| GPN | Global Payments Inc. | Industrials | 63.1% | 44.3% | **107.4** |
| LLY | Eli Lilly and Company | Healthcare | 55.5% | 50.1% | **105.6** |
| DELL | Dell Technologies Inc. | Technology | 87.5% | 10.5% | **98.0** |
| AMCR | Amcor plc | Consumer Cyclical | 77.4% | 14.4% | **91.8** |
| BG | Bunge Limited | Consumer Defensive | 87.8% | 2.8% | **90.6** |
| CEG | Constellation Energy Corporatio | Utilities | 63.8% | 26.6% | **90.4** |
| APH | Amphenol Corporation | Technology | 58.4% | 31.5% | **89.9** |
| OMC | Omnicom Group Inc. | Communication Services | 69.2% | 15.9% | **85.1** |
| WDC | Western Digital Corporation | Technology | 45.5% | 33.4% | **78.9** |
| VST | Vistra Corp. | Utilities | 43.4% | 34.9% | **78.3** |
| STX | Seagate Technology Holdings PLC | Technology | 44.1% | 31.9% | **76.0** |
| COF | Capital One Financial Corporati | Financial Services | 46.3% | 28.6% | **74.9** |
| WELL | Welltower Inc. | Real Estate | 38.3% | 25.4% | **63.7** |
| AJG | Arthur J. Gallagher & Co. | Financial Services | 34.6% | 27.9% | **62.5** |
| CVNA | Carvana Co. | Consumer Cyclical | 52.0% | 10.4% | **62.4** |
| SNPS | Synopsys, Inc. | Technology | 41.9% | 19.5% | **61.4** |
| MCHP | Microchip Technology Incorporat | Technology | 35.1% | 25.9% | **61.0** |

### 💰 Cash Cows (현금 창출기 그룹)
> 막대한 이익을 현금으로 찍어내는 독점적 지배자들입니다. 압도적인 마진율로 배당과 자사주 매입(주주환원)에 탁월한 역량을 보입니다. (Margin >= Rev Growth)

| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 60 Score |
| --- | --- | --- | --- | --- | --- |
| APP | Applovin Corporation | Communication Services | 59.0% | 79.0% | **138.0** |
| EQT | EQT Corporation | Energy | 49.9% | 81.9% | **131.8** |
| NEM | Newmont Corporation | Basic Materials | 45.8% | 65.4% | **111.2** |
| AVGO | Broadcom Inc. | Technology | 47.9% | 55.8% | **103.7** |
| TPL | Texas Pacific Land Corporation | Energy | 20.8% | 82.3% | **103.1** |
| VICI | VICI Properties Inc. | Real Estate | 3.5% | 98.8% | **102.3** |
| O | Realty Income Corporation | Real Estate | 12.0% | 88.2% | **100.2** |
| EXE | Expand Energy Corporation | Energy | 41.0% | 57.3% | **98.3** |
| IBKR | Interactive Brokers Group, Inc. | Financial Services | 16.8% | 76.8% | **93.6** |
| SPG | Simon Property Group, Inc. | Real Estate | 19.3% | 73.9% | **93.2** |
| FICO | Fair Isaac Corporation | Technology | 38.7% | 51.6% | **90.3** |
| V | Visa Inc. | Financial Services | 17.1% | 70.1% | **87.2** |
| ADI | Analog Devices, Inc. | Technology | 37.2% | 48.3% | **85.5** |
| CME | CME Group Inc. | Financial Services | 14.4% | 71.1% | **85.5** |
| META | Meta Platforms, Inc. | Communication Services | 33.1% | 50.8% | **83.9** |
| ICE | Intercontinental Exchange Inc. | Financial Services | 20.4% | 63.5% | **83.9** |
| MO | Altria Group, Inc. | Consumer Defensive | 5.3% | 77.5% | **82.8** |
| MA | Mastercard Incorporated | Financial Services | 15.8% | 63.0% | **78.8** |
| ANET | Arista Networks, Inc. | Technology | 35.1% | 43.6% | **78.7** |
| CPAY | Corpay, Inc. | Technology | 25.4% | 53.3% | **78.7** |
| MAR | Marriott International | Consumer Cyclical | 12.6% | 65.9% | **78.5** |
| PLD | Prologis, Inc. | Real Estate | 8.3% | 70.0% | **78.3** |
| MSFT | Microsoft Corporation | Technology | 18.3% | 58.0% | **76.3** |
| VRSN | VeriSign, Inc. | Technology | 6.6% | 69.6% | **76.2** |
| BRO | Brown & Brown, Inc. | Financial Services | 35.7% | 39.7% | **75.4** |
| GEN | Gen Digital Inc. | Technology | 27.0% | 47.8% | **74.8** |
| FANG | Diamondback Energy, Inc. | Energy | 4.2% | 70.2% | **74.4** |
| HBAN | Huntington Bancshares Incorpora | Financial Services | 33.6% | 40.7% | **74.3** |
| FRT | Federal Realty Investment Trust | Real Estate | 10.3% | 63.7% | **74.0** |
| PSA | Public Storage | Real Estate | 3.2% | 70.6% | **73.8** |
| REG | Regency Centers Corporation | Real Estate | 10.0% | 63.7% | **73.7** |
| NDAQ | Nasdaq, Inc. | Financial Services | 13.7% | 59.3% | **73.0** |
| MSCI | MSCI Inc. | Financial Services | 14.1% | 58.6% | **72.7** |
| ESS | Essex Property Trust, Inc. | Real Estate | 6.4% | 65.0% | **71.4** |
| AMT | American Tower Corporation (REI | Real Estate | 6.8% | 64.6% | **71.4** |
| D | Dominion Energy, Inc. | Utilities | 23.1% | 47.2% | **70.3** |
| HLT | Hilton Worldwide Holdings Inc. | Consumer Cyclical | 11.0% | 59.2% | **70.2** |
| SBAC | SBA Communications Corporation | Real Estate | 5.9% | 64.0% | **69.9** |
| EXR | Extra Space Storage Inc | Real Estate | 3.8% | 65.7% | **69.5** |
| TDG | Transdigm Group Incorporated | Industrials | 18.3% | 51.0% | **69.3** |
| EOG | EOG Resources, Inc. | Energy | 15.6% | 53.4% | **69.0** |
| BLK | BlackRock, Inc. | Financial Services | 27.0% | 40.3% | **67.3** |
| ORCL | Oracle Corporation | Technology | 20.6% | 45.3% | **65.9** |
| CF | CF Industries Holdings, Inc. | Basic Materials | 19.4% | 46.4% | **65.8** |
| PTC | PTC Inc. | Technology | 21.7% | 44.0% | **65.7** |
| TXN | Texas Instruments Incorporated | Technology | 18.6% | 47.0% | **65.6** |
| FSLR | First Solar, Inc. | Technology | 23.6% | 41.9% | **65.5** |
| WMB | Williams Companies, Inc. (The) | Energy | 9.0% | 56.3% | **65.3** |
| SCHW | Charles Schwab Corporation (The | Financial Services | 15.8% | 49.4% | **65.2** |
| KIM | Kimco Realty Corporation (HC) | Real Estate | 4.0% | 60.7% | **64.7** |
| MCD | McDonald's Corporation | Consumer Cyclical | 9.4% | 54.2% | **63.6** |
| UDR | UDR, Inc. | Real Estate | 4.2% | 59.2% | **63.4** |
| EQR | Equity Residential | Real Estate | 2.5% | 60.8% | **63.3** |
| INVH | Invitation Homes Inc. | Real Estate | 9.2% | 53.7% | **62.9** |
| AVB | AvalonBay Communities, Inc. | Real Estate | 2.5% | 60.3% | **62.8** |
| DLR | Digital Realty Trust, Inc. | Real Estate | 16.7% | 45.8% | **62.5** |
| DUK | Duke Energy Corporation (Holdin | Utilities | 11.3% | 50.4% | **61.7** |
| DOC | Healthpeak Properties, Inc. | Real Estate | 7.1% | 53.7% | **60.8** |
| LVS | Las Vegas Sands Corp. | Consumer Cyclical | 25.3% | 35.2% | **60.5** |
| SPGI | S&P Global Inc. | Financial Services | 10.4% | 50.1% | **60.5** |
| AFL | AFLAC Incorporated | Financial Services | 27.9% | 32.5% | **60.4** |
| AWK | American Water Works Company, I | Utilities | 5.7% | 54.5% | **60.2** |
| ABBV | AbbVie Inc. | Healthcare | 12.4% | 47.6% | **60.0** |
| LRCX | Lam Research Corporation | Technology | 23.8% | 36.2% | **60.0** |
| GOOGL | Alphabet Inc. | Communication Services | 21.8% | 38.2% | **60.0** |
| GOOG | Alphabet Inc. | Communication Services | 21.8% | 38.2% | **60.0** |

## 🇰🇷 한국 (KOSPI 시가총액 상위 표본 + APR) - Rule of 60

### 🚀 Hyper-Growers (고성장 엔진 그룹)

| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 60 Score |
| --- | --- | --- | --- | --- | --- |
| 402340.KS | SKSQUARE | Technology | 318.8% | 91.6% | **410.4** |
| 000660.KS | SK hynix | Technology | 198.1% | 69.4% | **267.5** |
| 006800.KS | MIRAE ASSET SEC | Financial Services | 185.4% | 36.0% | **221.4** |
| 005940.KS | NHIS | Financial Services | 184.8% | 34.4% | **219.2** |
| 039490.KS | KIWOOM | Financial Services | 177.2% | 33.6% | **210.8** |
| 016360.KS | SamsungSecu | Financial Services | 129.2% | 28.5% | **157.7** |
| 278470.KS | APR | Consumer Defensive | 123.0% | 26.3% | **149.3** |
| 071050.KS | KIH | Financial Services | 128.9% | 15.8% | **144.6** |
| 005930.KS | SamsungElec | Technology | 69.2% | 36.2% | **105.4** |
| 005935.KS | SamsungElec(1P) | Technology | 69.2% | 36.2% | **105.4** |
| 138040.KS | Meritz Financial | Financial Services | 51.3% | 50.7% | **102.0** |
| 326030.KS | SKBP | Healthcare | 57.8% | 36.0% | **93.8** |
| 032830.KS | SAMSUNG LIFE | Financial Services | 59.3% | 33.4% | **92.7** |
| 259960.KS | KRAFTON | Communication Services | 56.9% | 34.6% | **91.5** |
| 010130.KS | KOREA ZINC | Basic Materials | 58.4% | 11.0% | **69.4** |
| 329180.KS | HD HYUNDAI HEAVY INDUSTRIES | Industrials | 54.8% | 14.6% | **69.4** |
| 047810.KS | KOREA AEROSPACE | Industrials | 56.3% | 9.9% | **66.2** |
| 003230.KS | SamyangFood | Consumer Defensive | 35.0% | 25.1% | **60.1** |

### 💰 Cash Cows (현금 창출기 그룹)

| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 60 Score |
| --- | --- | --- | --- | --- | --- |
| 086790.KS | HANAFINANCIALGR | Financial Services | 25.7% | 64.5% | **90.2** |
| 207940.KS | SAMSUNG BIOLOGICS | Healthcare | 25.8% | 57.8% | **83.6** |
| 323410.KS | KakaoBank | Financial Services | 24.4% | 56.5% | **80.9** |
| 105560.KS | KBFinancialGroup | Financial Services | 15.2% | 60.7% | **75.9** |
| 068270.KS | Celltrion | Healthcare | 36.0% | 36.5% | **72.5** |
