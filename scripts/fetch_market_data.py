import json
import os
import datetime
import urllib.request

def fetch_vix():
    url = "https://query1.finance.yahoo.com/v8/finance/chart/^VIX?interval=1d&range=1mo"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            result = data['chart']['result'][0]
            close_prices = result['indicators']['quote'][0]['close']
            timestamps = result['timestamp']
            
            valid_data = [(ts, cp) for ts, cp in zip(timestamps, close_prices) if cp is not None]
            
            latest_vix = valid_data[-1][1]
            history = [{"date": datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d'), "value": round(cp, 2)} for ts, cp in valid_data[-30:]]
            return round(latest_vix, 2), history
    except Exception as e:
        print(f"Error fetching VIX: {e}")
        return 20.0, []

def fetch_fear_and_greed():
    url = "https://production.dataviz.cnn.io/index/fearandgreed/graphdata"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Origin': 'https://edition.cnn.com',
        'Referer': 'https://edition.cnn.com/'
    })
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            score = data['fear_and_greed']['score']
            rating = data['fear_and_greed']['rating']
            
            historical = data.get('fear_and_greed_historical', {}).get('data', [])
            history = []
            for item in historical[-30:]:
                dt = datetime.datetime.fromtimestamp(item['x']/1000.0).strftime('%Y-%m-%d')
                history.append({"date": dt, "value": round(item['y'], 2)})
                
            return round(score, 0), rating, history
    except Exception as e:
        print(f"Error fetching Fear & Greed: {e}")
        return 50.0, "neutral", []

def fetch_treasury_yields():
    url_10y = "https://query1.finance.yahoo.com/v8/finance/chart/^TNX?interval=1d&range=1mo"
    url_2y = "https://query1.finance.yahoo.com/v8/finance/chart/^IRX?interval=1d&range=1mo"
    
    # 40 days ago to ensure we have 30 trading days of data
    start_date = (datetime.datetime.now() - datetime.timedelta(days=40)).strftime('%Y-%m-%d')
    url_fed = f"https://markets.newyorkfed.org/api/rates/all/search.json?startDate={start_date}"
    
    def get_history(url):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            result = data['chart']['result'][0]
            closes = result['indicators']['quote'][0]['close']
            timestamps = result['timestamp']
            
            valid_data = [(ts, cp) for ts, cp in zip(timestamps, closes) if cp is not None]
            return {datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d'): round(cp, 2) for ts, cp in valid_data[-30:]}

    def get_fed_funds_history(url):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            rates = [r for r in data['refRates'] if r['type'] == 'EFFR']
            rates.reverse() # chronologically
            return {r['effectiveDate']: r['percentRate'] for r in rates}

    try:
        h10 = get_history(url_10y)
        h2 = get_history(url_2y)
        hfed = get_fed_funds_history(url_fed)
        
        # Merge by date
        dates = sorted(list(set(h10.keys()) | set(h2.keys())))
        history = []
        last_fed = list(hfed.values())[0] if hfed else 0.0
        
        for d in dates:
            if d in h10 and d in h2:
                if d in hfed:
                    last_fed = hfed[d]
                history.append({"date": d, "ten_year": h10[d], "two_year": h2[d], "fed_rate": last_fed})
                
        y10_latest = history[-1]["ten_year"] if history else 0.0
        y2_latest = history[-1]["two_year"] if history else 0.0
        fed_latest = history[-1]["fed_rate"] if history else 0.0
        
        spread = y10_latest - y2_latest
        status = "normal"
        if spread < 0:
            status = "inverted"
        elif spread < 0.5:
            status = "flat"
            
        return {
            "ten_year": round(y10_latest, 2),
            "two_year": round(y2_latest, 2),
            "fed_rate": round(fed_latest, 2),
            "spread": round(spread, 2),
            "status": status,
            "history": history
        }
    except Exception as e:
        print(f"Error fetching Yields: {e}")
        return {"ten_year": 4.0, "two_year": 4.0, "fed_rate": 5.0, "spread": 0.0, "status": "unknown", "history": []}

def fetch_exchange_rates():
    url_krw = "https://query1.finance.yahoo.com/v8/finance/chart/KRW=X?interval=1d&range=1mo"
    url_dxy = "https://query1.finance.yahoo.com/v8/finance/chart/DX-Y.NYB?interval=1d&range=1mo"
    
    def get_history(url):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            result = data['chart']['result'][0]
            closes = result['indicators']['quote'][0]['close']
            timestamps = result['timestamp']
            
            valid_data = [(ts, cp) for ts, cp in zip(timestamps, closes) if cp is not None]
            return {datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d'): round(cp, 2) for ts, cp in valid_data[-30:]}

    try:
        h_krw = get_history(url_krw)
        h_dxy = get_history(url_dxy)
        
        dates = sorted(list(set(h_krw.keys()) | set(h_dxy.keys())))
        history = []
        for d in dates:
            if d in h_krw and d in h_dxy:
                history.append({"date": d, "usd_krw": h_krw[d], "dxy": h_dxy[d]})
                
        krw_latest = history[-1]["usd_krw"] if history else 0.0
        dxy_latest = history[-1]["dxy"] if history else 0.0
        
        return {
            "usd_krw": round(krw_latest, 2),
            "dxy": round(dxy_latest, 2),
            "history": history
        }
    except Exception as e:
        print(f"Error fetching Exchange Rates: {e}")
        return {"usd_krw": 1350.0, "dxy": 105.0, "history": []}

def fetch_kca_indices(exchange_rates_history):
    url_gspc = "https://query1.finance.yahoo.com/v8/finance/chart/^GSPC?interval=1d&range=1mo"
    url_ks200 = "https://query1.finance.yahoo.com/v8/finance/chart/^KS200?interval=1d&range=1mo"
    
    krw_map = {item["date"]: item["usd_krw"] for item in exchange_rates_history}
    
    def get_history(url):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            result = data['chart']['result'][0]
            closes = result['indicators']['quote'][0]['close']
            timestamps = result['timestamp']
            
            valid_data = [(ts, cp) for ts, cp in zip(timestamps, closes) if cp is not None]
            return {datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d'): round(cp, 2) for ts, cp in valid_data[-30:]}

    try:
        h_gspc = get_history(url_gspc)
        h_ks200 = get_history(url_ks200)
        
        dates = sorted(list(set(h_gspc.keys()) | set(h_ks200.keys()) | set(krw_map.keys())))
        history = []
        
        # Fallback values for filling gaps
        last_gspc = h_gspc.get(dates[0], 5000.0) if h_gspc else 5000.0
        last_ks200 = h_ks200.get(dates[0], 350.0) if h_ks200 else 350.0
        last_krw = krw_map.get(dates[0], 1350.0) if krw_map else 1350.0
        
        for d in dates:
            if d in h_gspc: last_gspc = h_gspc[d]
            if d in h_ks200: last_ks200 = h_ks200[d]
            if d in krw_map: last_krw = krw_map[d]
            
            gspc_usd = last_gspc
            gspc_krw = last_gspc * last_krw
            ks200_krw = last_ks200
            ks200_usd = last_ks200 / last_krw if last_krw > 0 else 0
            
            history.append({
                "date": d,
                "gspc_usd": round(gspc_usd, 2),
                "gspc_krw": round(gspc_krw, 2),
                "ks200_krw": round(ks200_krw, 2),
                "ks200_usd": round(ks200_usd, 4)
            })
            
        latest = history[-1] if history else {
            "gspc_usd": 0, "gspc_krw": 0, "ks200_krw": 0, "ks200_usd": 0
        }
        
        return {
            "latest": latest,
            "history": history
        }
    except Exception as e:
        print(f"Error fetching KCA Indices: {e}")
        return {"latest": {}, "history": []}

def determine_organism_state(vix, fg_score):
    if fg_score < 25 or vix > 30:
        return "extreme_fear"
    elif fg_score < 45 or vix > 20:
        return "fear"
    elif fg_score > 75 or vix < 12:
        return "extreme_greed"
    elif fg_score > 55 or vix < 15:
        return "greed"
    else:
        return "neutral"

def main():
    print("Fetching VIX...")
    vix_latest, vix_history = fetch_vix()
    print("Fetching Fear & Greed...")
    fg_score, fg_rating, fg_history = fetch_fear_and_greed()
    print("Fetching Treasury Yields and Fed Rate...")
    yields = fetch_treasury_yields()
    print("Fetching Exchange Rates...")
    exchange = fetch_exchange_rates()
    print("Fetching KCA Indices...")
    kca_indices = fetch_kca_indices(exchange["history"])
    
    state = determine_organism_state(vix_latest, fg_score)
    
    market_data = {
        "updated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "organism_state": state,
        "vix": {
            "latest": vix_latest,
            "history": vix_history
        },
        "fear_and_greed": {
            "score": fg_score,
            "rating": fg_rating,
            "history": fg_history
        },
        "macro": yields,
        "exchange": exchange,
        "kca_indices": kca_indices
    }
    
    os.makedirs('docs/public/data', exist_ok=True)
    with open('docs/public/data/market-state.json', 'w', encoding='utf-8') as f:
        json.dump(market_data, f, indent=2, ensure_ascii=False)
    
    print("Market data updated successfully.")

if __name__ == "__main__":
    main()
