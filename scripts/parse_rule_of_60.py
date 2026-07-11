import re

input_file = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule-of-40-large-caps-2026.md'
output_file = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule-of-60-categorized.md'

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
                        row = f"| {ticker} | {name} | {sector} | {rev:.1f}% | {margin:.1f}% | **{score:.1f}** |"
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
    f.write("> **데이터 기준(TTM)**: Trailing Twelve Months (최근 12개월 누적). 모든 수치는 데이터 분석일 시점에 각 기업이 시장에 발표한 가장 최신 4개 분기의 실적을 합산한 기준입니다.\n\n")
    f.write("![Rule of 60 Scatter Plot](/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule_of_60_chart.png)\n\n")
    f.write("본 리스트는 기존 룰 오브 40 달성 기업 중 **'Rule of 60 (총점 60 이상)'**이라는 더욱 엄격한 컷오프를 통과한 최상위 1% 엘리트 기업들만 선별한 결과입니다.\n\n")
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
    
    f.write("\n## 🇰🇷 한국 (KOSPI 100) - Rule of 60\n\n")
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
