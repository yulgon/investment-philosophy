export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  description: string;
  badge?: string;
  coverUrl: string;
  myComment?: string;
}

export const books: Book[] = [
  // 1. Index Investing & Asset Allocation
  {
    id: "bogle-common-sense",
    title: "The Little Book of Common Sense Investing",
    author: "John C. Bogle",
    category: "Index Investing & Asset Allocation",
    tags: ["Index Investing"],
    description: "The bible for Bogleheads. The simple and certain truth to buy and hold the entire market index with low-cost index funds instead of analyzing individual stocks.",
    badge: "👑 Lifetime Book (My Favorite)",
    coverUrl: "/books/bogle-common-sense.jpg",
    myComment: "I was so deeply impressed after reading this book that I started dollar-cost averaging into VTI (Vanguard Total Stock Market ETF) the very next day. It is an eternal must-read for index fund investing."
  },
  {
    id: "bogle-stay-the-course",
    title: "Stay the Course",
    author: "John C. Bogle",
    category: "Index Investing & Asset Allocation",
    tags: ["Autobiography / History"],
    description: "A masterpiece depicting the pioneering process of index funds, Bogle's dedication to investors throughout his life, and the history of innovation in the mutual fund industry.",
    badge: "👑 Lifetime Book (My Favorite)",
    coverUrl: "/books/bogle-stay-the-course.jpg",
    myComment: "The best book that melts John Bogle's investment philosophy. It's not just an investment book, but a biography where you get a glimpse of his life and how he presented the gift of mutual index funds to investors who were losing money."
  },
  {
    id: "magic-pension",
    title: "The Magic of Pension Rolling",
    author: "Kim Sung-il",
    category: "Index Investing & Asset Allocation",
    tags: ["Korean Asset Allocation"],
    description: "A practical guideline that helps investors mechanically practice global asset allocation models within the Korean tax-advantaged account (Pension Savings, IRP) system.",
    coverUrl: "/books/magic-pension.jpg",
    myComment: "It is a reliable book that consistently releases revised editions whenever pension policies change. It is an essential guide for constructing a Korean-style All-Weather Portfolio."
  },
  {
    id: "just-keep-buying",
    title: "Just Keep Buying",
    author: "Nick Maggiulli",
    category: "Index Investing & Asset Allocation",
    tags: ["Dollar-Cost Averaging"],
    description: "By analyzing the relationship between savings and investment rates with vast data, it proves the power of 'continuing to buy assets regardless of whether the market is falling or rising'.",
    badge: "⭐ Recommended Book (My Recommendation)",
    coverUrl: "/books/just-keep-buying.jpg",
    myComment: "A book that gave a clear answer to the deep agony of 'How can I rebalance without selling?'. I strongly recommend it as it was so interesting that I read it all in one day!"
  },
  {
    id: "future-of-investing",
    title: "The Future for Investors",
    author: "Jeremy Siegel",
    category: "Index Investing & Asset Allocation",
    tags: ["Long-term Investing"],
    description: "Proves that buying at a fair valuation and continuously reinvesting dividends has historically produced the best results, rather than investing in high-growth sectors.",
    coverUrl: "/books/future-of-investing.jpg",
    myComment: "A book that made me realize that a company's 'growth' does not necessarily mean 'return' in my account. The insight that you might actually get lower returns because of the high probability of buying expensively at overvaluation was of great help during the 2022 bear market. It became the core logical rationale that made me steadily include SCHD (US Dividend Equity ETF) in my portfolio."
  },
  {
    id: "fortunes-formula",
    title: "Fortune's Formula",
    author: "William Poundstone",
    category: "Index Investing & Asset Allocation",
    tags: ["Money Management"],
    description: "Sheds light on Edward Thorp, the founder of information theory, and the Kelly Criterion, covering the secret to growing assets through optimal betting size control based on expected value.",
    coverUrl: "/books/fortunes-formula.jpg"
  },
  {
    id: "giants-portfolio",
    title: "Giant's Portfolio",
    author: "Kang Hwan-guk",
    category: "Index Investing & Asset Allocation",
    tags: ["Quant / Asset Allocation"],
    description: "The textbook of Korean quant investing that reinterprets the asset allocation strategies (All-Weather, Momentum, Dual Momentum, etc.) of the world's top quant investors to fit the Korean reality so that anyone can follow them.",
    coverUrl: "/books/giants-portfolio.jpg",
    myComment: "A book recommended by a senior at work. The author explains investment methodologies and quant investing, which can be complex, very easily and clearly, which helped a lot in building a solid foundation of basic investment knowledge."
  },
  {
    id: "etf-investing",
    title: "Start Stock Investing with ETFs",
    author: "SYSTDRADER79",
    category: "Index Investing & Asset Allocation",
    tags: ["ETF Investing"],
    description: "Presents a practical methodology for avoiding individual stock risks and constructing a diversified portfolio centered on ETFs. It clearly explains the advantages of investing in the entire market through ETFs from the perspective of Korean investors.",
    coverUrl: "/books/etf-investing.jpg",
    myComment: "I was able to learn how to materialize diversified investing, which felt vague, with domestic listed ETFs. I especially remember it as a good book during my beginner investor days because it established the mindset of system trading, which invests mechanically excluding emotions."
  },
  {
    id: "infinite-buying",
    title: "Infinite Buying Method for US Stocks",
    author: "Raoer",
    category: "Index Investing & Asset Allocation",
    tags: ["Dollar-Cost Averaging / US Stocks"],
    description: "A book that systemizes the 'infinite buying method' of steadily buying every day without fear in a bear market. Introduces a strategy of lowering the average unit price by repeating split purchases without predicting market timing.",
    coverUrl: "/books/infinite-buying.jpg",
    myComment: "It was an interesting read, and I deeply resonated with the book because the author's flow of thoughts was very similar to mine at the time. It was a great help in broadening my perspective to 'how (methodology)' to invest, taking a step further from simply investing in stocks, ETFs, and sectors themselves."
  },

  // 2. Investment Psychology & Life Design
  {
    id: "love-money",
    title: "Love Money Passionately and Treat It Coldly",
    author: "André Kostolany",
    category: "Investment Psychology & Life Design",
    tags: ["Investment Psychology"],
    description: "A masterpiece by a legendary European investor that philosophically explains the market's herd mentality and the importance of contrarian investing. The 'Kostolany's Egg' theory is famous.",
    coverUrl: "/books/love-money.jpg",
    myComment: "A masterpiece among investment books. His investment logic mixed with metaphors is truly a state of art. From the dog and its owner taking a walk, contrarian investing, the Kostolany's Egg model, to the sleeping pill theory... it gives unforgettable insights."
  },
  {
    id: "same-as-ever",
    title: "Same as Ever",
    author: "Morgan Housel",
    category: "Investment Psychology & Life Design",
    tags: ["Human Behavior"],
    description: "Sharply describes historical behavioral instincts such as human greed, fear, and the importance of stories that never change even in a rapidly changing world.",
    coverUrl: "/books/same-as-ever.jpg",
    myComment: "A masterpiece following 'The Psychology of Money', full of beautiful episodes like a fairy tale in the investment world. I highly recommend it when you want to find 'peace of mind' in a chaotic market rather than seeking new investment knowledge or ideas."
  },
  {
    id: "wealth-formula",
    title: "The Algebra of Wealth",
    author: "Scott Galloway",
    category: "Investment Psychology & Life Design",
    tags: ["Financial Freedom"],
    description: "Beyond simple asset accumulation, it presents a formula for achieving the 'freedom of choice' you want in life by combining focus, consumption control (stoicism), time, and diversification.",
    coverUrl: "/books/wealth-formula.jpg"
  },
  {
    id: "death-uncontrollable",
    title: "Soul in the Game",
    author: "Vitaliy Katsenelson",
    category: "Investment Psychology & Life Design",
    tags: ["Life Philosophy"],
    description: "Fuses the wisdom of Stoic philosophy with value investing and attitudes toward life, leading you to design a meaningful and highly resilient life.",
    coverUrl: "/books/death-uncontrollable.jpg"
  },
  {
    id: "nature-of-money",
    title: "The Attributes of Money",
    author: "Kim Seung-ho",
    category: "Investment Psychology & Life Design",
    tags: ["Philosophy of Wealth"],
    description: "A book that explains the philosophical mindset of making, keeping, and growing money with words derived from life experiences. It pierces the essence that the attitude and mindset towards money determine investment results.",
    badge: "⭐ Korean Investment Masterpiece",
    coverUrl: "/books/nature-of-money.jpg",
    myComment: "A book that made me marvel, 'I didn't know there was such a great person in our country!'. I came to redefine investing not simply as the act of buying and selling stocks, but as 'finding a great company to partner with'. I strongly recommend it as a book that firmly grasps the basic concepts of proper investing."
  },

  // 3. Macroeconomics & Mega Trends
  {
    id: "if-it-rains-in-brazil",
    title: "If It's Raining in Brazil, Buy Starbucks",
    author: "Peter Navarro",
    category: "Macroeconomics & Mega Trends",
    tags: ["Macro Analysis"],
    description: "Provides an eye for understanding the flow where macro phenomena such as weather, macroeconomic indicators, and interest rates spread like waves to specific industries and stock prices as a system of cause and effect.",
    badge: "⭐ Recommended Book (My Recommendation)",
    coverUrl: "/books/if-it-rains-in-brazil.jpg",
    myComment: "A book written in the 2000s by Professor Peter Navarro, well known as Trump's economic advisor. It contains truly amazing insights on the macro economy, and is an excellent book that throws vast macro knowledge and deep food for thought that makes its light title seem like an understatement."
  },
  {
    id: "chip-war",
    title: "Chip War",
    author: "Chris Miller",
    category: "Macroeconomics & Mega Trends",
    tags: ["Tech Geopolitics"],
    description: "Clearly traces the history of the fierce tech geopolitical war between the US and China to dominate the semiconductor supply chain, which is the core resource of modern times, and the future tech hegemony structure.",
    coverUrl: "/books/chip-war.jpg"
  },
  {
    id: "tech-republic",
    title: "The Technological Republic",
    author: "Alex Karp, Nicholas Zamiska",
    category: "Macroeconomics & Mega Trends",
    tags: ["Tech Geopolitics / Security"],
    description: "Defines AI and advanced technologies as core assets for defending democracy and national security, and philosophically argues that Silicon Valley must move away from pursuing private interests and contribute to national responsibilities.",
    coverUrl: "/books/tech-republic.jpg"
  },
  {
    id: "investment-detox",
    title: "Moon Hong-chul's Investment Detox",
    author: "Moon Hong-chul",
    category: "Macroeconomics & Mega Trends",
    tags: ["Interest Rates / Bonds Basics"],
    description: "Purifies (detoxifies) the stereotypes and misinformation about bonds, interest rates, and exchange rates spread among the general public and investors with clear facts.",
    coverUrl: "/books/investment-detox.jpg"
  },
  {
    id: "exchange-rate-shift",
    title: "The Great Shift in Exchange Rates",
    author: "Oh Geon-young",
    category: "Macroeconomics & Mega Trends",
    tags: ["Foreign Exchange / Exchange Rates"],
    description: "Reads the massive flow of the global macro economy centered on exchange rates and interest rates. It provides macro insights to flexibly allocate assets amidst uncertainty through the movement of the dollar and various macro scenarios.",
    coverUrl: "/books/exchange-rate-shift.jpg"
  },
  {
    id: "future-of-economic-war",
    title: "The Future of the Economic War Over the Next 3 Years",
    author: "Oh Geon-young",
    category: "Macroeconomics & Mega Trends",
    tags: ["Macro / Dollar"],
    description: "Easily explains the triangular relationship of the dollar, interest rates, and liquidity, and the ripple effects of the Fed's policies on global asset markets. A must-read for investors to read the macro.",
    coverUrl: "/books/future-of-economic-war.jpg"
  },
  {
    id: "buy-dollar",
    title: "I Buy Dollars Instead of Stocks",
    author: "Park Sung-hyun",
    category: "Macroeconomics & Mega Trends",
    tags: ["Dollar / Foreign Exchange"],
    description: "Presents the logic and practice of the strategy of steadily accumulating dollar assets instead of highly volatile stocks. Contains a unique investment perspective utilizing the power of exchange rates and reserve currencies.",
    coverUrl: "/books/buy-dollar.jpg"
  },

  // 4. Cash Flow & Dividends/Bonds
  {
    id: "dividend-starbucks",
    title: "I Buy Starbucks with Dividend Investing...",
    author: "Song Min-seop (Soullic)",
    category: "Cash Flow & Dividends/Bonds",
    tags: ["Dividend Growth"],
    description: "Provides a practical roadmap for creating a warm stream of dollar cash flow like a monthly paycheck without working, by long-term investing in US blue-chip dividend growth stocks.",
    coverUrl: "/books/dividend-starbucks.jpg"
  },
  {
    id: "income-revolution",
    title: "Income Revolution",
    author: "Brian Page",
    category: "Cash Flow & Dividends/Bonds",
    tags: ["Passive Income"],
    description: "Beyond simple hourly labor income, it presents the core blueprint for a 'Passive Income' pipeline that makes your assets work for you on their own.",
    coverUrl: "/books/income-revolution.jpg"
  },
  {
    id: "bond-investing-bible",
    title: "The Bible of Bond Investing for Wealth and Tax Saving",
    author: "Ma Kyung-hwan",
    category: "Cash Flow & Dividends/Bonds",
    tags: ["Bonds / Tax Saving"],
    description: "Passes on detailed secrets to maximizing actual after-tax returns through understanding bond mechanisms that retail investors find difficult, interest rate risk management, and tax savings.",
    coverUrl: "/books/bond-investing-bible.jpg"
  },
  {
    id: "sleeping-salary",
    title: "US Dividend Stock Investing to Earn a Salary While Sleeping",
    author: "Sosu Monkey",
    category: "Cash Flow & Dividends/Bonds",
    tags: ["US Dividend Stocks"],
    description: "Kindly guides even beginners to follow how to create a system that receives dollar dividends while sleeping by steadily investing in US blue-chip dividend stocks.",
    coverUrl: "/books/sleeping-salary.jpg"
  },
  {
    id: "easy-dividend",
    title: "Probably the Easiest Manual for Dividend Investing",
    author: "Kwon Dae-kyung",
    category: "Cash Flow & Dividends/Bonds",
    tags: ["Dividend Investing"],
    description: "The standard introductory book for domestic dividend investing that explains complex theories from the principles of dividend investing to stock selection criteria and portfolio construction as easily and practically as possible.",
    badge: "⭐ Recommended Book (My Recommendation)",
    coverUrl: "/books/easy-dividend.jpg",
    myComment: "The content is solid, and since it was written by a dentist, it made me feel 'I can have this tremendous insight without majoring in economics', making it one of the books that influenced me the most. The author's investment method is also very simple: 'Dollar-Cost Averaging into VTI'. I always strongly recommend it to beginner investors!"
  },
  {
    id: "stock-rich-project",
    title: "Stock Rich Project",
    author: "Chae Sang-wook",
    category: "Cash Flow & Dividends/Bonds",
    tags: ["Asset Design"],
    description: "The author, a former real estate analyst, presents a wealth design strategy encompassing stocks and real estate. It contains a long-term asset accumulation roadmap that balances the triad of income, assets, and cash flow.",
    coverUrl: "/books/stock-rich-project.jpg"
  },

  // 5. Business & The Wealth Equation
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business & The Wealth Equation",
    tags: ["Innovation / Startup"],
    description: "Covers the startup insight of creating a great business by creating complete monopolistic originality (0 to 1) that does not exist in the world, beyond imitation (1 to N).",
    coverUrl: "/books/zero-to-one.jpg"
  },
  {
    id: "equation-of-money",
    title: "The Equation of Money",
    author: "Morgan Housel",
    category: "Business & The Wealth Equation",
    tags: ["Philosophy of Wealth"],
    description: "Morgan Housel's insight penetrating the essence of wealth. He emphasizes that the mindset of remaining rich is more important than the skill of getting rich, and that the simple equation of 'controlling consumption, high savings rate, and multiplying by time' is the best financial formula.",
    coverUrl: "/books/equation-of-money.jpg"
  },
  {
    id: "value-investing-first",
    title: "First Study on Value Investing",
    author: "Lee Sung-soo",
    category: "Business & The Wealth Equation",
    tags: ["Value Investing"],
    description: "Explains the core concepts of value investing, from basic financial indicators like PER, PBR, and ROE to corporate value analysis and discovering undervalued stocks, step-by-step so that even first-time learners can understand.",
    coverUrl: "/books/value-investing-first.jpg"
  }
];
