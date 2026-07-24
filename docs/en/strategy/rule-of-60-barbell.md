---
title: Rule of 60 Company Screen (2Q26)
description: A dated company screen combining revenue growth and profitability, with its data source, formula, and limitations
reviewed: 2026-07-24
---

# Rule of 60 Company Screen (2Q26)

> **Run date:** 2026-07-11
>
> **Fields retrieved:** Yahoo Finance `revenueGrowth` and `ebitdaMargins`, falling back to `operatingMargins` when EBITDA margin was unavailable

This is a research screen I use to find companies worth examining more closely. It is not a valuation model, a quality score, or a prediction of stock returns.

## Formula

```text
Rule of 60 score = revenue growth (%) + EBITDA margin (%)
                   or operating margin when EBITDA margin is unavailable
```

Companies scoring 60 or above are separated into two descriptive groups:

- **Hyper-Growers:** revenue growth is higher than the margin.
- **Cash Cows:** the margin is equal to or higher than revenue growth.

The labels only describe the two inputs. They do not prove that a company has a durable moat, generates free cash flow, trades at a reasonable valuation, or will outperform.

## Data population

- **United States:** the S&P 500 constituent list available when the script ran.
- **Korea:** roughly the top 100 KOSPI companies by market capitalization from Naver Finance, plus APR as a separately observed company.
- **Financial fields:** values returned through the `yfinance` package, which republishes Yahoo Finance data.

The Korean population is therefore **not the official KOSPI 100 index**. The source is a secondary data service, and update timing can differ across companies.

## How I read the result

A high score prompts questions rather than a buy decision:

1. Is revenue growth organic, or mainly an acquisition, accounting, currency, or base effect?
2. Is the margin comparable with peers, and is it EBITDA or operating margin?
3. Does growth convert into operating cash flow and free cash flow?
4. Is the balance sheet able to withstand a downturn?
5. Does the valuation already assume unusually strong future growth?
6. Is the result cyclical—especially for semiconductors, brokers, banks, and commodity businesses?

## Important limitations

> [!WARNING]
> Cross-sector ranking can be misleading. “Revenue” and “margin” do not have the same economic meaning for banks, insurers, REITs, software companies, and manufacturers. Mixing EBITDA and operating margin also reduces comparability. Very high growth can be caused by a weak prior-year base, while a high margin can include temporary items. Every candidate must be checked against the company’s original filing.

The screen deliberately omits valuation, debt, dilution, capital expenditure, stock-based compensation, and the sustainability of margins. A company can pass the Rule of 60 and still be a poor investment.

## Latest dated table

The complete run output—including every U.S. and Korean company that passed the cutoff—is available on the [dated Korean data page](/strategy/rule-of-60-barbell). Tickers, company names, sectors, inputs, and calculated scores are shown there so readers can inspect the exact result used in the accompanying commentary.

For the reasoning that led me to use this screen as one limited part of satellite-stock research, see [Rule of 40 and 60: What the Numbers Can and Cannot Tell Me](/en/stay-the-course/018-rule-of-60).
