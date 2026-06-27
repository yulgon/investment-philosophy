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
                history.append({"date": d, "ten_year": h10[d], "three_month": h2[d], "fed_rate": last_fed})
                
        y10_latest = history[-1]["ten_year"] if history else 0.0
        y2_latest = history[-1]["three_month"] if history else 0.0
        fed_latest = history[-1]["fed_rate"] if history else 0.0
        
        spread = y10_latest - y2_latest
        status = "normal"
        if spread < 0:
            status = "inverted"
        elif spread < 0.5:
            status = "flat"
            
        return {
            "ten_year": round(y10_latest, 2),
            "three_month": round(y2_latest, 2),
            "fed_rate": round(fed_latest, 2),
            "spread": round(spread, 2),
            "status": status,
            "history": history
        }
    except Exception as e:
        print(f"Error fetching Yields: {e}")
        return {"ten_year": 4.0, "three_month": 4.0, "fed_rate": 5.0, "spread": 0.0, "status": "unknown", "history": []}

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
    url_ks11 = "https://query1.finance.yahoo.com/v8/finance/chart/^KS11?interval=1d&range=1mo"
    
    url_gspc_mo = "https://query1.finance.yahoo.com/v8/finance/chart/^GSPC?interval=1mo&range=5y"
    url_ks11_mo = "https://query1.finance.yahoo.com/v8/finance/chart/^KS11?interval=1mo&range=5y"
    url_krw_mo = "https://query1.finance.yahoo.com/v8/finance/chart/KRW=X?interval=1mo&range=5y"
    url_tnx_mo = "https://query1.finance.yahoo.com/v8/finance/chart/^TNX?interval=1mo&range=5y"
    url_irx_mo = "https://query1.finance.yahoo.com/v8/finance/chart/^IRX?interval=1mo&range=5y"
    
    krw_map_latest = {item["date"]: item["usd_krw"] for item in exchange_rates_history}
    
    def get_history(url, fmt='%Y-%m-%d', count=30):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            result = data['chart']['result'][0]
            closes = result['indicators']['quote'][0]['close']
            timestamps = result['timestamp']
            
            valid_data = [(ts, cp) for ts, cp in zip(timestamps, closes) if cp is not None]
            return {datetime.datetime.fromtimestamp(ts).strftime(fmt): round(cp, 2) for ts, cp in valid_data[-count:]}

    try:
        # Latest daily values
        h_gspc_latest = get_history(url_gspc)
        h_ks11_latest = get_history(url_ks11)
        
        last_gspc_d = list(h_gspc_latest.values())[-1] if h_gspc_latest else 5000.0
        last_ks11_d = list(h_ks11_latest.values())[-1] if h_ks11_latest else 2500.0
        last_krw_d = list(krw_map_latest.values())[-1] if krw_map_latest else 1350.0
        
        latest = {
            "gspc_usd": round(last_gspc_d, 2),
            "gspc_krw": round(last_gspc_d * last_krw_d, 2),
            "ks11_krw": round(last_ks11_d, 2),
            "ks11_usd": round(last_ks11_d / last_krw_d, 4) if last_krw_d > 0 else 0
        }
        
        # 5-year historical values (filtering to 2021+)
        h_gspc_mo = get_history(url_gspc_mo, fmt='%Y-%m', count=60)
        h_ks11_mo = get_history(url_ks11_mo, fmt='%Y-%m', count=60)
        h_krw_mo = get_history(url_krw_mo, fmt='%Y-%m', count=60)
        h_tnx_mo = get_history(url_tnx_mo, fmt='%Y-%m', count=60)
        h_irx_mo = get_history(url_irx_mo, fmt='%Y-%m', count=60)
        
        all_dates_mo = sorted(list(set(h_gspc_mo.keys()) | set(h_ks11_mo.keys()) | set(h_krw_mo.keys())))
        dates_mo = [d for d in all_dates_mo if d >= "2021-01"]
        
        history = []
        
        lg = h_gspc_mo.get(dates_mo[0], 5000.0) if dates_mo and h_gspc_mo else 5000.0
        lk = h_ks11_mo.get(dates_mo[0], 2500.0) if dates_mo and h_ks11_mo else 2500.0
        lx = h_krw_mo.get(dates_mo[0], 1350.0) if dates_mo and h_krw_mo else 1350.0
        ltnx = h_tnx_mo.get(dates_mo[0], 4.0) if dates_mo and h_tnx_mo else 4.0
        lirx = h_irx_mo.get(dates_mo[0], 4.0) if dates_mo and h_irx_mo else 4.0
        
        for d in dates_mo:
            if d in h_gspc_mo: lg = h_gspc_mo[d]
            if d in h_ks11_mo: lk = h_ks11_mo[d]
            if d in h_krw_mo: lx = h_krw_mo[d]
            if d in h_tnx_mo: ltnx = h_tnx_mo[d]
            if d in h_irx_mo: lirx = h_irx_mo[d]
            
            history.append({
                "date": d,
                "gspc_usd": round(lg, 2),
                "gspc_krw": round(lg * lx, 2),
                "ks11_krw": round(lk, 2),
                "ks11_usd": round(lk / lx, 4) if lx > 0 else 0,
                "usd_krw": round(lx, 2),
                "ten_year": round(ltnx, 2),
                "three_month": round(lirx, 2)
            })
            
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
