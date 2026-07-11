import yfinance as yf
import requests
import re
import time

def get_kospi_100_tickers():
    try:
        tickers = []
        for page in [1, 2]:
            url = f'https://finance.naver.com/sise/sise_market_sum.naver?sosok=0&page={page}'
            res = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            matches = re.findall(r'/item/main.naver\?code=(\d{6})', res.text)
            tickers.extend(matches)
            
        seen = set()
        unique_tickers = []
        for t in tickers:
            if t not in seen:
                seen.add(t)
                unique_tickers.append(t + ".KS")
                
        if "278470.KS" not in unique_tickers:
            unique_tickers.append("278470.KS")
            
        return unique_tickers[:105]
    except Exception as e:
        print(f"Failed to fetch KOSPI 100: {e}")
        return []

def main():
    kospi = get_kospi_100_tickers()
    kr_results = []
    
    print(f"Processing {len(kospi)} KOSPI 100 companies sequentially with delay to avoid rate limits...")
    for i, ticker in enumerate(kospi):
        try:
            # Add a small delay to avoid Yahoo Finance rate limits
            time.sleep(0.5)
            
            stock = yf.Ticker(ticker)
            info = stock.info
            if not info: continue
            
            name = info.get('shortName', ticker)
            sector = info.get('sector', 'Unknown')
            
            rev_growth = info.get('revenueGrowth', 0)
            if rev_growth is None: rev_growth = 0
            
            margin = info.get('ebitdaMargins', 0)
            if margin is None: margin = info.get('operatingMargins', 0)
            if margin is None: margin = 0
            
            rule_40 = (rev_growth + margin) * 100
            
            if rule_40 >= 40 and rev_growth >= 0 and margin >= 0:
                kr_results.append({
                    "Ticker": ticker,
                    "Name": name,
                    "Sector": sector,
                    "Revenue Growth (%)": rev_growth * 100,
                    "Margin (%)": margin * 100,
                    "Rule of 40 Score": rule_40
                })
            
            if (i+1) % 20 == 0:
                print(f"Processed {i+1}/{len(kospi)}...")
        except Exception as e:
            print(f"Error processing {ticker}: {e}")
            
    kr_results.sort(key=lambda x: x['Rule of 40 Score'], reverse=True)
    
    output_path = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule-of-40-large-caps-2026.md'
    with open(output_path, 'a', encoding='utf-8') as f:
        for r in kr_results:
            f.write(f"| {r['Ticker']} | {r['Name']} | {r['Sector']} | {r['Revenue Growth (%)']:.1f}% | {r['Margin (%)']:.1f}% | **{r['Rule of 40 Score']:.1f}** |\n")
            
    print(f"\n✅ 완료되었습니다! KOSPI 데이터가 기존 문서에 덧붙여졌습니다.")

if __name__ == '__main__':
    main()
