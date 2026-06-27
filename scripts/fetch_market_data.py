import json
import os
import datetime
import urllib.request
import xml.etree.ElementTree as ET

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

def get_treasury_yields_full():
    history = {}
    namespace = {'d': 'http://schemas.microsoft.com/ado/2007/08/dataservices', 'm': 'http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'}
    current_year = datetime.datetime.now().year
    for year in range(2021, current_year + 1):
        url = f'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value={year}'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            xml_data = urllib.request.urlopen(req, timeout=10).read()
            root = ET.fromstring(xml_data)
            for entry in root.findall('.//m:properties', namespace):
                date_node = entry.find('d:NEW_DATE', namespace)
                y10_node = entry.find('d:BC_10YEAR', namespace)
                y2_node = entry.find('d:BC_2YEAR', namespace)
                if date_node is not None and y10_node is not None and y2_node is not None:
                    date = date_node.text.split('T')[0]
                    y10 = float(y10_node.text) if y10_node.text else None
                    y2 = float(y2_node.text) if y2_node.text else None
                    if y10 is not None and y2 is not None:
                        history[date] = {"ten_year": y10, "two_year": y2}
        except Exception as e:
            print(f"Error fetching treasury data for {year}: {e}")
    return history

def fetch_treasury_yields():
    all_treasury_history = get_treasury_yields_full()
    
    start_date = (datetime.datetime.now() - datetime.timedelta(days=40)).strftime('%Y-%m-%d')
    url_fed = f"https://markets.newyorkfed.org/api/rates/all/search.json?startDate={start_date}"
    
    def get_fed_funds_history(url):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read())
                rates = [r for r in data['refRates'] if r['type'] == 'EFFR']
                rates.reverse() # chronologically
                return {r['effectiveDate']: r['percentRate'] for r in rates}
        except Exception as e:
            print(f"Error fetching Fed Funds: {e}")
            return {}

    try:
        hfed = get_fed_funds_history(url_fed)
        
        sorted_dates = sorted(all_treasury_history.keys())
        last_30_dates = sorted_dates[-30:] if len(sorted_dates) >= 30 else sorted_dates
        
        history = []
        last_fed = list(hfed.values())[0] if hfed else 0.0
        
        for d in last_30_dates:
            if d in hfed:
                last_fed = hfed[d]
            history.append({
                "date": d,
                "ten_year": all_treasury_history[d]["ten_year"],
                "two_year": all_treasury_history[d]["two_year"],
                "fed_rate": last_fed
            })
                
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
        }, all_treasury_history
    except Exception as e:
        print(f"Error fetching Yields: {e}")
        return {"ten_year": 4.0, "two_year": 4.0, "fed_rate": 5.0, "spread": 0.0, "status": "unknown", "history": []}, {}

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

def fetch_kca_indices(exchange_rates_history, all_treasury_history):
    url_gspc = "https://query1.finance.yahoo.com/v8/finance/chart/^GSPC?interval=1d&range=1mo"
    url_ks11 = "https://query1.finance.yahoo.com/v8/finance/chart/^KS11?interval=1d&range=1mo"
    
    url_gspc_mo = "https://query1.finance.yahoo.com/v8/finance/chart/^GSPC?interval=1mo&range=5y"
    url_ks11_mo = "https://query1.finance.yahoo.com/v8/finance/chart/^KS11?interval=1mo&range=5y"
    url_krw_mo = "https://query1.finance.yahoo.com/v8/finance/chart/KRW=X?interval=1mo&range=5y"
    
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
        
        # Monthly Treasury yields from our full daily history
        h_tnx_mo = {}
        h_irx_mo = {}
        for d in sorted(all_treasury_history.keys()):
            month = d[:7]
            h_tnx_mo[month] = all_treasury_history[d]["ten_year"]
            h_irx_mo[month] = all_treasury_history[d]["two_year"]
        
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
                "two_year": round(lirx, 2)
            })
            
        return {
            "latest": latest,
            "history": history
        }
    except Exception as e:
        print(f"Error fetching KCA Indices: {e}")
        return {"latest": {}, "history": []}

def determine_organism_state(vix, fg_score):
    if fg_score <= 25 or vix >= 30:
        return "extreme_fear"
    elif fg_score <= 44 or vix >= 20:
        return "fear"
    elif fg_score >= 75 or vix <= 12:
        return "extreme_greed"
    elif fg_score >= 56 or vix <= 15:
        return "greed"
    else:
        return "neutral"

def main():
    print("Fetching VIX...")
    vix_latest, vix_history = fetch_vix()
    print("Fetching Fear & Greed...")
    fg_score, fg_rating, fg_history = fetch_fear_and_greed()
    print("Fetching Treasury Yields and Fed Rate...")
    yields, all_treasury_history = fetch_treasury_yields()
    print("Fetching Exchange Rates...")
    exchange = fetch_exchange_rates()
    print("Fetching KCA Indices...")
    kca_indices = fetch_kca_indices(exchange["history"], all_treasury_history)
    
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
