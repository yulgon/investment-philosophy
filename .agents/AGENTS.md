# Investment Philosophy Website Development Rules

This file documents the rules, preferences, and context for the `investment-philosophy` project to ensure consistent behavior across different environments and sessions.

## 1. Project Context
* **Project Nature:** A VitePress-based static website (`docs` directory) documenting the user's personal investment philosophy and strategies.
* **Core Strategy:** 'Core & Satellite' approach mapped to space metaphors (Planets, Satellites, Gravity, Slingshot).
* **Tone & Style:** Professional, dry, logical, and firm. Avoiding emotional or overly experiential narratives.

## 2. Investment Philosophy Details (Strict Adherence Required)
* **Core Assets (Planets):** VOO, SPMO, SCHD (NO QQQM or other tech-heavy NASDAQ indexes).
* **Bond Assets (Planets):** TLT, EDV, Short-term bonds. These are considered active 'Core' planets to counter equity gravity, not just cash waiting areas.
* **Geographical Allocation:** US (abundant industry portfolios) and South Korea (information advantage and high understanding).
* **Strategy Name:** KCA (Korean Cost Averaging), NOT DCA.
* **Rebalancing Method:** 'Buy Rebalancing'. Adjusting the amount of new money going into assets instead of selling winners to buy losers. Do not use mechanical traditional rebalancing (e.g., 60:40).
* **Selling Rule (Slingshot):** Sell ONLY when the original investment thesis/fundamental is broken. NEVER sell just because an asset went up.
* **Crisis Management:** The user does not mechanically buy during a crisis, nor do they perceive a crisis as a special event. They simply maintain the system.

## 3. Recommended Tools & Sites (As documented in how-to-choose.md)
* Portfolio Visualizer, Bogleheads.org, FnGuide, ETF Check, Seeking Alpha, GuruFocus
* Finviz, TradingView, ETF.com / ETFdb, Macrotrends, TipRanks, FRED, Investing.com, CME FedWatch Tool, Fear & Greed Index

## 4. Technical Stack & Workflow
* **Framework:** VitePress (`npm run docs:build`, `npm run docs:dev`).
* **CI/CD:** GitHub Actions (`deploy.yml` for GitHub Pages, `market-data.yml` for automated market data fetching via Python).
* **Data Fetching:** Python scripts (`scripts/fetch_market_data.py`) used to fetch market states.
* **Bot Permissions:** Ensure GitHub Actions bot has `contents: write` permissions if it needs to commit data.

## 5. History & Key Decisions (Memory Bank)
To maintain continuity across different devices, here is a summary of the work and decisions made during the initial week of development:
* **Custom Domain Setup:** Configured DNS records to link GitHub Pages to `one-billion-donation.com`, resolving initial InvalidDNSError issues.
* **Website Structure & Evolvability:** Built the VitePress foundation and defined a strict "Evolvability Strategy" (`Evolvability.md`) to ensure the site can adapt structurally over time without breaking.
* **Philosophy Refinement:** Unified scattered principles into a cohesive narrative. Stripped out traditional methods (DCA, mechanical 60:40 rebalancing) and established the dry, logical **Core & Satellite (Solar System)** metaphor.
* **Automation Fixes:** Addressed Node 20 deprecation warnings in GitHub Actions and fixed a `403 Permission denied` error in the `market-data.yml` cron job by explicitly granting `contents: write` to the `github-actions[bot]`.
