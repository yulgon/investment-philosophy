# 📜 Investment History

> [!WARNING]
> **Investment Disclaimer**
> The stocks, ETFs, and strategies listed on this page are written **solely for the purpose of personal investment records**, and do not recommend the purchase or sale of specific stocks, nor do they provide investment advice.
> Past performance does not guarantee future returns, and **all responsibility for investment decisions and resulting profits or losses lies with the investor.**

> "History doesn't repeat itself, but it often rhymes."  
> — *Mark Twain*

---

## About This Page

This is the **entire footprint of my investment journey** since I first stepped into the market in 2010. You can view at a glance the traces of my wandering days of short-term speculation, to the establishment of the Bogleheads philosophy, Core & Satellite strategy, and the KCA (KRW Cost Averaging) automated accumulation strategy.

This record is not a simple portfolio disclosure. It is a record of reflection and introspection on **why I bought that asset at that time, why I sold it, and what I learned**. There were wrong judgments, and there were sections where I was lucky. All of that is the material that made my current investment philosophy.

---

## 4 Stages of My Investment History

### Stage 1 (2010~2020): Period of Wandering and Failure 🌀

I first started investing in stocks in 2010. At that time, I had no philosophy and no principles. I bought when acquaintances around me said a certain stock would go up, and sold when news came out. It was a typical **short-term speculation** pattern.

What I gained from investing in this way for 10 years was neither an insignificant return compared to the principal nor a massive loss. What was more painful than that was the **opportunity cost of not enjoying compound interest for 10 years**. If I had put everything in the S&P 500 during the same period, I would have gained more than double the return.

### Stage 2 (2021~2022): Period of Finding a Philosophy 📚

In 2021, experiencing the market crash and surge due to the COVID-19 pandemic, I asked myself the fundamental question, 'Why do I invest?' for the first time. Starting with John C. Bogle's "The Little Book of Common Sense Investing", reading Ray Dalio's economic principles, and Benjamin Graham's "The Intelligent Investor", I reached a turning point towards long-term index investing.

In the second half of 2022, the period when the asset market collapsed due to the US Federal Reserve's (Fed) successive Giant Step interest rate hikes was the real test of my philosophy. Watching my account melt down, I learned with my body for the first time **how difficult it is not to press the 'sell button'**.

### Stage 3 (2023~2024): Period of Experiment and Verification 🧪

Enduring the 2022 crash market and entering 2023, I rather started to **directly experience and verify** various investment methods more actively. Because I believed there are things that can never be learned only through books and theories.

The strategies I challenged during this period are as follows:

- **Sector Investment**: By investing in sector ETFs and individual stocks focused on specific industries such as semiconductors, AI, healthcare, and energy, I experienced the market cycles and the possibilities and limitations of theme investing.
- **Leverage ETF Investment**: By directly operating 2x and 3x leverage products, I felt the explosive returns in a bull market and the Volatility Decay phenomenon in a bear market in my skin.
- **Infinite Buying Method and VR (Volatility Rebalancing) Strategy**: Through mechanically buying a certain amount or adjusting the weight based on volatility between assets, I experienced the possibilities of automated investing, the risks generated when combining leverage products, and the difficulty of executing rebalancing.
- **Puddle Trading Method / Nasdaq 3% Drop Sell Buy Method / Nasdaq 200-day Moving Average Buy Method**: Based on technical analysis and past statistics, it is a method of trading by capturing the low point section of the price. I directly experienced the psychological exhaustion and time cost of short-term trading.

All these experiments became valuable tuition fees. Some strategies gave high returns temporarily, and some strategies made losses much faster than expected. Through those experiences, it gradually became clear what kind of investment method suits me best.

### Stage 4 (2025~Present): Period of Completing My Own System 🤖

The conclusion obtained through numerous experiments and verifications was simple. **"An automated system with no room for emotions to intervene is the method that suits me best."**

From 2025, based on that conviction, I advanced the KCA (KRW Cost Averaging) automated accumulation strategy. When my monthly salary comes in, a certain amount is set to automatically buy core index ETFs, and it is a method of adjusting the additional purchase weight by synthesizing market indicators (Fear & Greed Index, KS11, GSPC, Exchange Rate, VIX, etc.).

In the investment history timeline below, this entire process — the items I experimented with and sold, and the core assets I still hold now — is recorded exactly as it is. Even if you see leverage ETFs and sector ETFs, do not think it strange. They were **a process of learning that it is not a bad investment, but an investment that does not suit me**.

> 💡 **A word of request**: The records below do not mean that a specific investment method is right and another method is wrong. Infinite buying method, leverage investment, sector ETFs, short-term trading — there are certainly excellent investors who make results through all these strategies. However, after numerous experiments, **I just discovered that the long-term index automated investment is the method that suits 'me' best**. Investment is ultimately a journey of knowing oneself.

---

## Portfolio Structure: Core Planets & Peripheral Satellites

My portfolio is designed in a **solar system** structure.

- **🪐 Core Planets (Core)**: Core assets centered on index ETFs that account for 70-80% of total assets. They consist of low-cost ETFs that track the S&P 500, KOSPI 200, and global indices, and the principle is to never sell them.
- **🛰️ Peripheral Satellites (Satellite)**: Sector ETFs or theme ETFs that enter when opportunities are seen based on market cycles and macroeconomic analysis within 20-30% of total assets, and sell when the target return is reached.

This structure is a method where the core planets stably hold the entire portfolio like the gravity of the universe, while the satellites take charge of exploration and maneuvering for greater returns.

---

<script setup>
import { defineAsyncComponent } from 'vue'

const InvestmentHistory = defineAsyncComponent(() =>
  import('../../components/InvestmentHistory.vue')
)

const AnnualPerformance = defineAsyncComponent(() =>
  import('../../components/AnnualPerformance.vue')
)
</script>

<ClientOnly>
  <AnnualPerformance />
  <div style="margin-top: 3rem;"></div>
  <InvestmentHistory />
</ClientOnly>
