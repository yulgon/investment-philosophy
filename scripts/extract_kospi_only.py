import requests


OUTPUT_PATH = (
    '/Users/yg/Documents/antigravity/investment-philosophy/'
    'knowledge-base/rule-of-40-large-caps-2026-10-09.md'
)
HEADERS = {'User-Agent': 'Mozilla/5.0'}


def get_kospi_100_stocks():
    url = 'https://m.stock.naver.com/api/stocks/marketValue/KOSPI?page=1&pageSize=100'
    response = requests.get(url, headers=HEADERS, timeout=20)
    response.raise_for_status()
    stocks = [
        {'code': stock['itemCode'], 'name': stock['stockName']}
        for stock in response.json().get('stocks', [])
    ]

    if not any(stock['code'] == '278470' for stock in stocks):
        stocks.append({'code': '278470', 'name': '에이피알'})
    return stocks


def parse_number(value):
    if value in (None, '', '-'):
        return None
    return float(str(value).replace(',', ''))


def process_stock(stock):
    url = f"https://m.stock.naver.com/api/stock/{stock['code']}/finance/quarter"
    response = requests.get(url, headers=HEADERS, timeout=20)
    response.raise_for_status()
    finance_info = response.json().get('financeInfo') or {}

    actual_periods = sorted(
        period['key']
        for period in finance_info.get('trTitleList', [])
        if period.get('isConsensus') == 'N'
    )
    if not actual_periods:
        return None

    latest = actual_periods[-1]
    prior_year = f"{int(latest[:4]) - 1}{latest[4:]}"
    if prior_year not in actual_periods:
        return None

    rows = {row['title']: row.get('columns', {}) for row in finance_info.get('rowList', [])}
    revenue_row = next(
        (rows[title] for title in ('매출액', '영업수익', '순영업수익') if title in rows),
        None,
    )
    margin_row = rows.get('영업이익률')
    if revenue_row is None or margin_row is None:
        return None

    latest_revenue = parse_number(revenue_row.get(latest, {}).get('value'))
    prior_revenue = parse_number(revenue_row.get(prior_year, {}).get('value'))
    margin = parse_number(margin_row.get(latest, {}).get('value'))
    if latest_revenue is None or prior_revenue in (None, 0) or margin is None:
        return None

    revenue_growth = (latest_revenue / prior_revenue - 1) * 100
    score = revenue_growth + margin
    if score < 40 or revenue_growth < 0 or margin < 0:
        return None

    return {
        'Ticker': f"{stock['code']}.KS",
        'Name': stock['name'],
        'Sector': '미제공',
        'Revenue Growth (%)': revenue_growth,
        'Margin (%)': margin,
        'Rule of 40 Score': score,
    }


def main():
    stocks = get_kospi_100_stocks()
    results = []
    print(f'Processing {len(stocks)} Korean companies from Naver Finance...')

    for index, stock in enumerate(stocks, start=1):
        try:
            result = process_stock(stock)
            if result:
                results.append(result)
        except Exception as error:
            print(f"Error processing {stock['code']}: {error}")
        if index % 20 == 0:
            print(f'Processed {index}/{len(stocks)}...')

    results.sort(key=lambda item: item['Rule of 40 Score'], reverse=True)
    with open(OUTPUT_PATH, 'a', encoding='utf-8') as output:
        for result in results:
            output.write(
                f"| {result['Ticker']} | {result['Name']} | {result['Sector']} | "
                f"{result['Revenue Growth (%)']:.1f}% | {result['Margin (%)']:.1f}% | "
                f"**{result['Rule of 40 Score']:.1f}** |\n"
            )

    print(f'Added {len(results)} Korean rows to {OUTPUT_PATH}')


if __name__ == '__main__':
    main()
