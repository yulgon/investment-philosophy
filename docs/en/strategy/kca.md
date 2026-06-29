# 🪐 1. KCA Investment Strategy (KRW Cost Averaging)

The key to successful long-term investing is abandoning the arrogance of trying to predict the market (Time to Market), overcoming volatility, and surviving in the market forever. To achieve this, I practice the **KCA (KRW Cost Averaging)** strategy, an innovative variation of the traditional **DCA (Dollar Cost Averaging)** strategy tailored to the reality of Korean Won investors.

<script setup>
import { defineAsyncComponent } from 'vue'

const DcaChart = defineAsyncComponent(() =>
  import('../../components/DcaChart.vue')
)
const KcaChart = defineAsyncComponent(() =>
  import('../../components/KcaChart.vue')
)
</script>

---

## 1. DCA (Dollar Cost Averaging) Analysis

### Core Principles of DCA
**DCA (Dollar Cost Averaging)** is a strategy of mechanically purchasing a fixed amount at regular intervals (e.g., daily, weekly, monthly) regardless of the asset's price volatility.

* **Harmonic Mean Effect**: By purchasing a smaller quantity when the price is high and a larger quantity when the price is low, you mathematically enjoy the effect of the **average purchase price becoming lower than the average market price**.
* **Emotional Control**: It helps you avoid the mistake of missing opportunities while weighing purchase timing, swept away by market fear and greed.
* **Risk Diversification**: Compared to lump-sum investing, it disperses the risk of the initial entry point across the time axis.

### 📈 [Graph 1] DCA vs Lump-sum Average Price Comparison

<ClientOnly>
  <DcaChart />
</ClientOnly>

---

## 2. KCA (KRW Cost Averaging) Strategy

**KCA (KRW Cost Averaging)** is a smart volatility control strategy that automatically integrates exchange rate volatility into the portfolio adjustment formula by setting the purchase amount to a **'fixed KRW (Korean Won) amount'** instead of Dollars.

### Limitations of Dollar-based DCA and the Background of KCA's Creation

The actual dilemma I faced when I first tried the traditional Dollar-based DCA was as follows.

The investment amount I could put in from my monthly salary was fixed at **2 million KRW**. However, when I decided to buy 1,500 Dollars (USD) every month for overseas stock investment, it cost 1.8 million KRW when the exchange rate was 1,200 KRW, but it required 2.1 million KRW when the exchange rate soared to 1,400 KRW.
When the exchange rate was high, it felt like I was exchanging currency at too high a price, making me very reluctant to click the purchase button for overseas Core ETFs. So, I waited thinking 'I should buy when the exchange rate drops a bit', but the exchange rate soared even higher, completely ruining my investment rhythm.
While investing in comfortable index funds to avoid predicting the market, I was foolishly trying to time the market and being swayed by the fluctuations of the 'exchange rate'.

The idea to resolve this contradiction came unexpectedly from **Pension Savings and IRP accounts**. In pension accounts where direct overseas investment is impossible, I was very comfortably and mechanically purchasing domestic-listed US ETFs with a fixed 'KRW' amount every month. *"Ah, instead of being tied to currency exchange and Dollars, if I purchase a fixed amount in KRW every day in my overseas direct investment account, I wouldn't need to time the exchange rate!"*

Combining this realization with overseas investment DCA is exactly this strategy. I gave it a grand name, **KCA (KRW Cost Averaging)**, making it sound impressive, but it's actually not a special secret. It's simply establishing and naming a method that many smart Korean individual investors are already instinctively practicing, in order to keep myself from wavering.

<div style="background: var(--vp-c-bg-soft); border-left: 4px solid var(--vp-c-brand-1); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
  <h3 style="margin-top: 0; color: var(--vp-c-brand-1); font-weight: 600;">💡 Mathematical Mechanism of KCA</h3>
  <p style="line-height: 1.7; margin-bottom: 1rem;">
    If the investment amount per installment is fixed to a KRW-based fixed amount <strong>M<sub>KRW</sub></strong>, the final number of shares purchased <strong>N</strong> is determined as follows.
  </p>
  <div style="text-align: center; font-size: 1.3rem; margin: 1.2rem 0; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-bg-alt); padding: 0.8rem; border-radius: 6px; display: inline-block; width: 100%;">
    N = M<sub>KRW</sub> / (P<sub>USD</sub> × E)
  </div>
  <p style="line-height: 1.7; margin-top: 1rem; font-size: 0.95rem; color: var(--vp-c-text-2);">
    (Where P<sub>USD</sub> = Dollar price of the asset, E = USD/KRW Exchange Rate)
  </p>
</div>

> 💡 **The Perfection of Pre-designed Non-action (Wu Wei)**  
> As long as this perfect inverse correlation formula operates systematically, we no longer need to stare at exchange rate windows or order books and punch calculators. We can leave the defense against the ebb and flow of exchange rates to the KCA formula, and focus solely on our daily lives and main jobs.

### Automatic Exchange Rate Adjustment Mechanism of KCA

| Market Scenario | Exchange Rate Variation (E) | KRW Price (P<sub>USD</sub> × E) | Automatic Phenomenon | Effect from Investor's Perspective |
| :--- | :---: | :---: | :--- | :--- |
| **Strong Dollar Period (High Exchange Rate)** | Surges ⬆️ | Overvalued ⬆️ | When exchanging the same KRW (M<sub>KRW</sub>), the amount of secured Dollars decreases ➡️ **Stock purchase volume (N) decreases** | **Prevents overbuying of expensive Dollars and expensive assets** |
| **Weak Dollar Period (Low Exchange Rate)** | Drops ⬇️ | Undervalued ⬇️ | When exchanging the same KRW (M<sub>KRW</sub>), the amount of secured Dollars increases ➡️ **Stock purchase volume (N) increases** | **Maximizes asset accumulation with cheaper Dollars** |

### 📊 [Graph 2] KCA Volatility Mitigation Effect due to Inverse Correlation between Stock Price and Exchange Rate

<ClientOnly>
  <KcaChart />
</ClientOnly>

---

## 3. Long-term Limitations of KCA and Overcoming Them

When reaching the ultra-long-term investment phase of over 10 years, systematic investment (DCA/KCA) structurally faces unique limitations, which are naturally overcome in the following ways.

* **Limitation of New Investment Funds Relative to Asset Size (Becoming 'Buy the Dip')**:
  If you continue accumulating for more than 10 years and the size of your total portfolio becomes massive (e.g., 500 million KRW), the fixed monthly KRW purchase amount (e.g., 1 million KRW) accounts for a very small proportion of the total valuation. Reaching this stage, the effect of lowering the overall average unit price through additional purchase adjustments (Averaging) becomes insignificant, and it essentially converges into a form of 'Buy the Dip' where the already held lump-sum assets are exposed to market downturns.
* **Overcoming 1: Snowball Effect of Long-term Holding Compound Interest**:
  However, at the point when the portfolio has become massive, the control of the average unit price through new purchase amounts no longer needs to be the main driving force. Because the scale of the asset itself has already grown, from now on, the **compound interest effect of long-term holding**, solidified over a long time, operates as the core agent (the power of compound interest) rolling the assets like a snowball itself, rather than additional investment funds.
* **Overcoming 2: Buy Rebalancing through Increasing Purchase Amounts**:
  In line with income increases or portfolio growth trends, **the base accumulation purchase amount itself is gradually adjusted upwards**. At the same time, by executing **Buy Rebalancing**, which intensively injects a larger portion of KRW purchase funds into assets whose proportions have significantly dropped, you can maintain the unique proportion adjustment effect of systematic investing as much as possible even as the portfolio size grows.
* **Conclusion**:
  Ultimately, the KCA strategy is the best tool that **perfectly controls the severe noise of short-term rapid fluctuations and exchange rate volatility experienced in the early and middle stages of asset accumulation**, supporting investors so they don't get exhausted or shaken out of the market, allowing them to safely reach the long-term compound interest phase (Snowballing) of over 10 years.

---

## 4. Core Strengths of the KCA Strategy

### 1) Defense of KRW Value of Portfolio Utilizing Inverse Correlation between Exchange Rate and Stock Price
Historically, when a crisis (financial crisis, pandemic, geopolitical crisis, etc.) occurs, US stock prices (P<sub>USD</sub>) plummet, but the KRW-USD exchange rate (E) surges due to the preference for safe assets.
* Even if dollar-based losses occur due to plunging stock prices, the rising exchange rate defends the KRW-converted asset value.
* Through KCA, the stock price and exchange rate interlock at this time, adjusting the KRW-converted unit price relatively gently, so investors can continue mechanical purchasing with less shock from the severe volatility of their KRW account balance even in a market crash.

### 2) 'Comfortable Investing' that Rejects Prediction (Going against Time to Market)
Attempts to execute trades by predicting market timing and exchange rate outlooks mostly end in failure. KCA fundamentally blocks these human biases.
* You mechanically accumulate a fixed KRW amount daily/monthly without worrying whether the exchange rate is 1,200 KRW or 1,400 KRW.
* Automatically, the average unit price convergence effect of exchange rate fluctuations (Currency Averaging) occurs, naturally achieving exchange rate defense in the long term without hedging costs.
* As a result, you can enjoy a **high degree of psychological stability, completely liberated from market stress**.

> ⏭️ **To the Next Step**: Then, how can you manually calculate and make fixed KRW purchases every morning when exchange rates and stock prices change daily? It's nearly impossible with human hands and will alone. Therefore, to complete the KCA strategy, an **'Automatic Investment Strategy'** must be supported. Check out the specific setup method on the next page.

---

## 🧭 Navigate Investment Strategy Roadmap

* [🪐 Investment Strategy Overview](/en/strategy/)
* [⚖️ 2. Asset Allocation & Operation Strategy](/en/strategy/allocation)
* [🤖 3. Automatic Investment Strategy](/en/strategy/auto-investment)
* [🔍 4. ETF Selection & Tools Guide](/en/strategy/how-to-choose)
