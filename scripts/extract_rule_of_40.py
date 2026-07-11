import yfinance as yf
import pandas as pd
import concurrent.futures
import requests
import re

def get_sp500_tickers():
    try:
        url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(url, headers=headers)
        tables = pd.read_html(response.text)
        df = tables[0]
        df['Symbol'] = df['Symbol'].str.replace('.', '-', regex=False)
        return df['Symbol'].tolist()
    except Exception as e:
        print(f"Failed to fetch S&P 500 tickers: {e}")
        return []

def get_kospi_100_tickers():
    try:
        tickers = []
        for page in [1, 2]: # Top 100 KOSPI by Market Cap
            url = f'https://finance.naver.com/sise/sise_market_sum.naver?sosok=0&page={page}'
            res = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            matches = re.findall(r'/item/main.naver\?code=(\d{6})', res.text)
            tickers.extend(matches)
            
        # Deduplicate while preserving order
        seen = set()
        unique_tickers = []
        for t in tickers:
            if t not in seen:
                seen.add(t)
                unique_tickers.append(t + ".KS")
                
        # Make sure to include APR (278470.KS) just in case it dropped below 100 recently, 
        # but 100 KOSPI usually reaches down to ~2 Trillion KRW, so APR should be in it!
        # I will manually append it if not present, because the user specifically asked about it.
        if "278470.KS" not in unique_tickers:
            unique_tickers.append("278470.KS")
            
        return unique_tickers[:105] # return top 100 + some padding
    except Exception as e:
        print(f"Failed to fetch KOSPI 100 tickers: {e}")
        return []

def process_ticker(ticker):
    import time
    time.sleep(0.2)
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        if not info: return None
        
        name = info.get('shortName', ticker)
        sector = info.get('sector', 'Unknown')
        
        rev_growth = info.get('revenueGrowth', 0)
        if rev_growth is None: rev_growth = 0
        
        margin = info.get('ebitdaMargins')
        if not margin: # Catches None and 0.0
            margin = info.get('operatingMargins')
        if not margin:
            margin = 0
        
        rule_40 = (rev_growth + margin) * 100
        
        # Rule of 40 AND both growth and margin must be non-negative
        if rule_40 >= 40 and rev_growth >= 0 and margin >= 0:
            return {
                "Ticker": ticker,
                "Name": name,
                "Sector": sector,
                "Revenue Growth (%)": rev_growth * 100,
                "Margin (%)": margin * 100,
                "Rule of 40 Score": rule_40
            }
    except Exception:
        pass
    return None

def main():
    sp500 = get_sp500_tickers()
    kospi = get_kospi_100_tickers()
    
    us_results = []
    print(f"Processing {len(sp500)} S&P 500 companies...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=30) as executor:
        for res in executor.map(process_ticker, sp500):
            if res: us_results.append(res)
            
    kr_results = []
    print(f"Processing {len(kospi)} KOSPI 100 companies...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        for res in executor.map(process_ticker, kospi):
            if res: kr_results.append(res)
            
    us_results.sort(key=lambda x: x['Rule of 40 Score'], reverse=True)
    kr_results.sort(key=lambda x: x['Rule of 40 Score'], reverse=True)
    
    output_path = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule-of-40-large-caps-2026.md'
    import datetime
    today = datetime.datetime.today().strftime('%Y-%m-%d')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("# Rule of 40 달성 대형주 리스트 (TTM 기준, 음수 제외)\n\n")
        f.write(f"> **데이터 추출일(스크립트 실행 기준)**: {today}\n\n")
        f.write("본 리스트는 미국 S&P 500 소속 대형주 및 한국 KOSPI 시총 상위 100개 대기업 중 **매출 성장률과 영업이익률(또는 EBITDA 마진)의 합이 40%를 넘는 기업**들을 추출한 결과입니다.\n\n")
        f.write("⚠️ **필터링 조건 추가**: 룰오브40을 달성하더라도 매출 성장률이나 이익률 중 **하나라도 음수(-)인 기업은 제외**되었습니다. (안정적인 고성장 기업만 필터링)\n\n")
        
        f.write("## 🇺🇸 미국 (S&P 500)\n\n")
        f.write("| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 40 Score |\n")
        f.write("| --- | --- | --- | --- | --- | --- |\n")
        for r in us_results:
            f.write(f"| {r['Ticker']} | {r['Name']} | {r['Sector']} | {r['Revenue Growth (%)']:.1f}% | {r['Margin (%)']:.1f}% | **{r['Rule of 40 Score']:.1f}** |\n")
            
        f.write("\n## 🇰🇷 한국 (KOSPI 100)\n\n")
        f.write("| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 40 Score |\n")
        f.write("| --- | --- | --- | --- | --- | --- |\n")
        for r in kr_results:
            f.write(f"| {r['Ticker']} | {r['Name']} | {r['Sector']} | {r['Revenue Growth (%)']:.1f}% | {r['Margin (%)']:.1f}% | **{r['Rule of 40 Score']:.1f}** |\n")
            
    print(f"\n✅ 완료되었습니다! 파일이 저장되었습니다: {output_path}")

if __name__ == '__main__':
    main()
