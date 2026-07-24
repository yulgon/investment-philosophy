---
reviewed: 2026-07-24
---

# 🤖 3. Auto-Investment Strategy

> "The investor's chief problem—and even his worst enemy—is likely to be himself."  
> — *Benjamin Graham*
> 
> "Make your investment decisions systematically so that emotions don't get in the way. Have computers do it."  
> — *Ray Dalio*

Auto-investment is the **top-priority investment strategy** that lies at the core of my entire investment system. No matter how sophisticated your theoretical knowledge is and how carefully you select high-quality assets, the psychological fear and greed you feel while watching real-time stock price fluctuations the moment you press the buy button, and the time spent trying to time your purchases, will inevitably shake the sustainability of your investments.

Automation cannot eliminate investment time or stress, but it can reduce repetitive decisions and make it easier to follow a long-term plan through volatile periods.

> [!NOTE] Evidence, assumptions, and checks
> The basic rationale for fixed automatic contributions follows the U.S. SEC's [DCA explanation](https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging) and [automatic saving and investing guide](https://www.investor.gov/sites/investorgov/files/media/automatic-investing-infographic.pdf). Brokerage features, fees, and eligible securities below can change; verify current terms before use. Automation does not prevent losses, and account and order settings still require periodic checks.

---

## 🛠️ My 3-Step Daily Auto-Investment Process

This is an automated system that combines asset waiting efficiency—where funds do not sit idle for even a single day—with mechanical daily fractional purchasing that radically diversifies volatility.

<div style="background: var(--vp-c-bg-alt); padding: 1.2rem; border-radius: 8px; border: 1px solid var(--vp-c-gutter); font-weight: 600; color: var(--vp-c-text-1); line-height: 1.8; word-break: keep-all; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
  <span>[Salary Deposit]</span> <span>➡️</span> <span>① Buy Parking Account/MMF Short-term Bonds</span> <span>➡️</span> <span>② Auto Fractional Buying of Stocks/ETFs Every Business Day</span> <span>➡️</span> <span>③ Set & Forget Rule</span>
</div>

### Step 1: Salary Deposit and Idle Funds Setup (Cashflow Parking)
* When the monthly salary is deposited into the main account, instead of leaving the funds idle in a regular checking account, immediately transfer/purchase them into a **parking account (high-yield savings)**, **MMF (Money Market Fund)**, or ultra-short-term bond products that offer a high-interest benefit of 3-4% annually.
* Design the system so that even while waiting to be invested, the idle funds earn compound interest daily, maximizing the defense against the inefficiency of cash liquidity.

### Step 2: Daily Auto Fractional Buying System
* Based on the KRW assets deposited in the parking account/MMF, configure a system to **automatically buy fractions of core stocks and ETFs every business day**.
* By splitting the total purchase amount (**M<sub>KRW</sub>**) into daily units and placing daily market price reservations, the brokerage automatically executes currency exchange and purchases on your behalf every business day at night.
* By executing **daily fractional purchases** rather than monthly accumulations, you radically average out (Daily Averaging) the numerous daily volatility noises in exchange rates and stock prices that occur over a month.

### Step 3: Set and Forget Psychological Firewall
* Block all real-time price alerts and market noise push notifications from investment apps.
* Since the system automatically accumulates at low prices and suppresses at high prices every night, strictly restrict the act of checking your account balance to the quarterly portfolio rebalancing schedule.
* Reducing price checks and attempts to predict the market may **lower the emotional stress caused by stock-price fluctuations** and make it easier to focus on work and daily life.

---

## 📱 Practical Automation System Design Manual

This guide is based on practical back-data derived from over 10 years of experience running automated trading scripts at major domestic brokerages (Korea Investment & Securities, Kiwoom Securities, etc.) and auto-buying/selling cryptocurrency.

### 1. Fundamental Philosophy of Automation Design
* **Acknowledging Unpredictability**: No matter how excellent the complex algorithms of Quant Investment or advanced technical analysis indicators are, it is fundamentally impossible to predict even a single minute of the market's future.
* **The Robustness of Simplicity**: My main lesson from using mechanical cost averaging in the volatile cryptocurrency market was that **a simple periodic plan reduced the burden of repeated timing decisions and some behavioral mistakes**. This does not mean it guarantees higher returns across every asset or period.
* **Reliability of Standard Brokerage Features**: Therefore, this guide stipulates the primary use of the **'Overseas Stock/ETF Stock Accumulation' and 'Fractional Auto-Buy' services** provided by institutional brokerages, instead of unreliable and unstable external private automated trading APIs or personal scripts.

### 2. Building a 'Flawless Pipeline' Requiring Zero Touches
As explained earlier in the KCA strategy, **KRW fixed-amount buying** is a way to reduce repeated exchange-rate decisions. Fractional buying is useful when investing small amounts frequently, and connecting it to bank transfers can create a contribution pipeline with less manual intervention.

1. **Auto Transfer (Bank ➡️ Brokerage)**: Set up the bank app so that when your salary comes in on the 25th of every month, 2 million KRW of investment funds is automatically transferred to your brokerage account (e.g., CMA) on the morning of the 26th.
2. **Auto Buy (KRW Fixed-Amount Fractional)**: Set up the brokerage app to 'fractionally buy 10,000 KRW every business day' for core ETFs like VOO.
3. **Result**: From one payday to the next, the brokerage system automatically executes currency exchange and purchases at night without you ever having to open the order book to check the dollar exchange rate.

> ⚠️ **Set & Forget Mindset Warning**  
> Checking returns every morning can undermine the goal of reducing repetitive decisions. I use a quarterly review as the default while still monitoring failed orders, insufficient cash, and notices of product changes.

### 3. My Practical Brokerage Portfolio Setup

While the choice of brokerage is up to you, I primarily use **'Toss Securities'** by separating purposes as follows to utilize each brokerage's fee benefits and unique features 100%.

#### ① Toss Securities : Main for Overseas Direct Investment (Core ETFs)
The reason I use **Toss Securities as my main** for overseas direct stock investment is clear.
* **0% Accumulation Buy Fee**: Selling incurs a fee, but since we are buying Core ETFs (VOO, SCHD, etc.) every day that we plan to accumulate for life without selling for over 10 years, we can fully enjoy the zero-fee benefit on purchases.
* **Pioneering Fractional Buy Support**: In the past, when other brokerages insisted on buying only in 1-share units, Toss was the first to support fractional buying even for momentum ETFs like SPMO.
* Due to the nature of the KCA strategy, which requires fractionally buying various ETFs every day with a **'fixed KRW amount'** rather than dollars, extensive and unrestricted fractional buy support is not an option but an essential merit.

#### ② Samsung Securities & Shinhan Securities : Dedicated to Tax-Advantaged Accounts (Pension/IRP/ISA)
I entrust all overseas direct stock investments to Toss Securities, while **strictly allocating Samsung Securities and Shinhan Securities for managing 'Pension Savings', 'IRP', and 'ISA' accounts**. In tax-advantaged accounts, you can intuitively buy overseas ETFs listed domestically or domestic stocks with KRW.

* **Fixed Amount Injection**: Deposit a fixed amount (e.g., 500,000 KRW) into the pension savings and ISA accounts at the beginning of every month, and add the dividend deposit received early in the month to prepare the cash balance.
* **1-Share Unit Buy & Auto Quantity Adjustment**: Set it to auto-buy in **1-share units** every day, rather than by a fixed amount.
* **Volatility Reverse-Use Strategy**: If the stock price drops and the sum of the 1 share bought every day is 50,000 KRW, it will be purchased 10 times (500,000 KRW worth) in a month. Conversely, if the stock price surges and the sum of the shares becomes 100,000 KRW, it will be purchased only 5 times before the cash balance is depleted, automatically terminating purchases for the month.
* **Result**: In other words, depending on price fluctuations, you can effortlessly employ an **'Auto Purchase Quantity Adjustment Strategy'** where you buy more over a longer period in a bear market, and buy less and stop early in a bull market.

---

## 🎯 Conclusion

> "If you don't find a way to make money while you sleep, you will work until you die."  
> — *Warren Buffett*

Auto-investment can help build a structure that continues operating without daily orders. Its role is to reduce—not eliminate—emotional intervention and help the investor follow a predetermined plan through short-term fluctuations.
