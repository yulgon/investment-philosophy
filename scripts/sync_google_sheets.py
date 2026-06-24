import gspread
import json
import os

def to_num(val):
    val = val.strip()
    if not val:
        return 0
    # Clean currency symbols and commas
    val = val.replace('₩', '').replace('$', '').replace(',', '')
    is_percent = False
    if val.endswith('%'):
        is_percent = True
        val = val[:-1]
    try:
        num = float(val)
        if is_percent:
            # Check if it was a formatting error (e.g. 403438800.0% instead of 4034388)
            if num > 1000:
                num = num / 100.0
            else:
                num = num / 100.0
        if num.is_integer():
            return int(num)
        return num
    except ValueError:
        return val

def main():
    try:
        print("Connecting to Google Sheets...")
        gc = gspread.service_account(filename='credentials.json')
        
        spreadsheet_key = '1ypqEbHAlvAf5sE_viuYfat59dEYO61RptUVpMtw9j60'
        sh = gc.open_by_key(spreadsheet_key)
        print(f"Opened spreadsheet: {sh.title}")
        
        # Ensure output directory exists
        os.makedirs('docs/public/data', exist_ok=True)
        
        # 1. Sync Historical_Data
        print("Fetching Historical_Data...")
        ws_hist = sh.worksheet('Historical_Data')
        hist_rows = ws_hist.get_all_values()
        if len(hist_rows) > 4:
            headers = [h.strip() for h in hist_rows[4]]
            data = []
            for r in hist_rows[5:]:
                if len(r) > 1 and r[1].strip():
                    cleaned_row = {}
                    for h, val in zip(headers, r):
                        if h:
                            if h in ['날짜', '이름']:
                                cleaned_row[h] = val.strip()
                            else:
                                cleaned_row[h] = to_num(val)
                    
                    # Recalculate Sum (합계) to ensure accuracy
                    sum_keys = [k for k in cleaned_row.keys() if k not in ['날짜', '이름', '합계']]
                    row_sum = sum(cleaned_row[k] for k in sum_keys if isinstance(cleaned_row[k], (int, float)))
                    cleaned_row['합계'] = int(row_sum)
                    
                    data.append(cleaned_row)
            
            with open('docs/public/data/historical_data.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"Saved {len(data)} rows to docs/public/data/historical_data.json")

        # 2. Sync Stock_Comparison
        print("Fetching Stock_Comparison...")
        ws_comp = sh.worksheet('Stock_Comparison')
        comp_rows = ws_comp.get_all_values()
        if len(comp_rows) > 4:
            headers = [h.strip() for h in comp_rows[4]]
            data = []
            for r in comp_rows[5:]:
                if len(r) > 1 and r[1].strip():
                    cleaned_row = {}
                    for h, val in zip(headers, r):
                        if h:
                            if h == '날짜':
                                cleaned_row[h] = val.strip()
                            else:
                                cleaned_row[h] = to_num(val)
                    
                    # Recalculate Real Sum and expected Sum mathematically to bypass Sheets formatting errors
                    real_y = cleaned_row.get('Real 율곤', 0)
                    real_h = cleaned_row.get('Real 희경', 0)
                    exp_sum = cleaned_row.get('expected Sum', 0)
                    
                    if isinstance(real_y, (int, float)) and isinstance(real_h, (int, float)):
                        cleaned_row['Real Sum'] = int(real_y + real_h)
                    
                    if cleaned_row.get('Real Sum') and exp_sum:
                        # Recalculate Achievement Rate (달성률) as percentage
                        cleaned_row['달성률'] = round((cleaned_row['Real Sum'] / exp_sum) * 100, 2)
                    
                    data.append(cleaned_row)
            
            with open('docs/public/data/stock_comparison.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"Saved {len(data)} rows to docs/public/data/stock_comparison.json")

        # 3. Sync Asset_Projections
        print("Fetching Asset_Projections...")
        ws_proj = sh.worksheet('Asset_Projections')
        proj_rows = ws_proj.get_all_values()
        
        with open('docs/public/data/asset_projections.json', 'w', encoding='utf-8') as f:
            json.dump(proj_rows, f, indent=2, ensure_ascii=False)
        print("Saved raw rows to docs/public/data/asset_projections.json")
        
        print("All Google Sheet data synced and cleaned successfully!")
        
    except Exception as e:
        print(f"Error syncing Google Sheets: {e}")

if __name__ == "__main__":
    main()
