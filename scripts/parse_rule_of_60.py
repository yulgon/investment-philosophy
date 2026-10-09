import re

input_file = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule-of-40-large-caps-2026-10-09.md'
output_file = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule-of-60-categorized-2026-10-09.md'

us_hyper = []
us_cash = []
kr_hyper = []
kr_cash = []

current_region = "US"

with open(input_file, 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith("## ") and ("한국" in line or "KOSPI" in line):
            current_region = "KR"
        elif line.startswith("## ") and ("미국" in line or "US" in line):
            current_region = "US"
        
        if line.startswith('|') and 'Ticker' not in line and '---' not in line:
            cols = [c.strip() for c in line.split('|')[1:-1]]
            if len(cols) == 6:
                ticker = cols[0]
                name = cols[1]
                sector = cols[2]
                rev_str = cols[3].replace('%', '')
                margin_str = cols[4].replace('%', '')
                score_str = cols[5].replace('*', '')
                
                try:
                    rev = float(rev_str)
                    margin = float(margin_str)
                    score = float(score_str)
                    
                    if score >= 60.0:
                        display_sector = '미제공' if current_region == 'KR' and sector == 'N/A' else sector
                        row = f"| {ticker} | {name} | {display_sector} | {rev:.1f}% | {margin:.1f}% | **{score:.1f}** |"
                        if rev > margin:
                            if current_region == "US": us_hyper.append((score, row))
                            else: kr_hyper.append((score, row))
                        else:
                            if current_region == "US": us_cash.append((score, row))
                            else: kr_cash.append((score, row))
                except ValueError:
                    pass

us_hyper.sort(key=lambda x: x[0], reverse=True)
us_cash.sort(key=lambda x: x[0], reverse=True)
kr_hyper.sort(key=lambda x: x[0], reverse=True)
kr_cash.sort(key=lambda x: x[0], reverse=True)

header = "| Ticker | Name | Sector | Rev Growth (%) | Margin (%) | Rule of 60 Score |\n| --- | --- | --- | --- | --- | --- |\n"

with open(output_file, 'w', encoding='utf-8') as f:
    import datetime
    today = datetime.datetime.today().strftime('%Y-%m-%d')
    f.write("# Rule of 60 🚀 엘리트 기업 및 바벨 포트폴리오 분류\n\n")
    f.write(f"> **데이터 분석일(스크립트 실행 기준)**: {today}\n")
    f.write(">\n")
    f.write("> **미국 데이터**: Yahoo Finance `revenueGrowth`와 `ebitdaMargins`(없으면 `operatingMargins`)의 조회 시점 값\n")
    f.write(">\n")
    f.write("> **한국 데이터**: 네이버 증권 최신 확정 분기의 전년 동기 대비 매출 성장률과 영업이익률(컨센서스 제외)\n\n")
    f.write("> [!WARNING] 출처와 산식의 한계\n")
    f.write("> 미국과 한국은 데이터 제공처와 성장률 기준이 다르므로 국가 간 점수를 직접 비교하면 안 됩니다. 금융·지주회사는 매출과 마진의 의미가 일반 제조업과 다르고, 매우 높은 성장률은 기저효과나 회계 분류의 영향을 받을 수 있습니다. 이 표는 후보 탐색용이며 매수 추천이나 수익률 예측이 아닙니다.\n\n")
    f.write("![Rule of 60 Scatter Plot](/rule_of_60_chart-2026-10-09.png)\n\n")
    f.write("본 리스트는 기존 룰 오브 40 달성 기업 중 **'Rule of 60 (총점 60 이상)'**이라는 더 높은 컷오프를 통과한 기업을 선별한 결과입니다.\n\n")
    f.write("또한, 이들을 **Hyper-Growers**(매출 성장률이 마진보다 큰 기업)와 **Cash Cows**(마진이 매출 성장률보다 큰 기업) 두 그룹으로 분류하여 포트폴리오 바벨 전략에 활용할 수 있도록 구성했습니다.\n\n")
    
    f.write("## 🇺🇸 미국 (S&P 500) - Rule of 60\n\n")
    f.write("### 🚀 Hyper-Growers (고성장 엔진 그룹)\n")
    f.write("> 외형 성장이 압도적인 혁신 리더 기업들입니다. 차세대 기술 트렌드를 이끌며 점유율을 확장하는 데 집중합니다. (Rev Growth > Margin)\n\n")
    f.write(header)
    for s, r in us_hyper: f.write(r + '\n')
    
    f.write("\n### 💰 Cash Cows (현금 창출기 그룹)\n")
    f.write("> 막대한 이익을 현금으로 찍어내는 독점적 지배자들입니다. 압도적인 마진율로 배당과 자사주 매입(주주환원)에 탁월한 역량을 보입니다. (Margin >= Rev Growth)\n\n")
    f.write(header)
    for s, r in us_cash: f.write(r + '\n')
    
    f.write("\n## 🇰🇷 한국 (KOSPI 시가총액 상위 100개 표본 + APR) - Rule of 60\n\n")
    f.write("### 🚀 Hyper-Growers (고성장 엔진 그룹)\n\n")
    if kr_hyper:
        f.write(header)
        for s, r in kr_hyper: f.write(r + '\n')
    else:
        f.write("*해당 그룹에 속하는 기업이 없습니다.*\n")
        
    f.write("\n### 💰 Cash Cows (현금 창출기 그룹)\n\n")
    if kr_cash:
        f.write(header)
        for s, r in kr_cash: f.write(r + '\n')
    else:
        f.write("*해당 그룹에 속하는 기업이 없습니다.*\n")

print(f"Artifact created at {output_file}")
