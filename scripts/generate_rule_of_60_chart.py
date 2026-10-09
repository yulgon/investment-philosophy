import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import re
import os
import numpy as np
from matplotlib.patches import Patch
import matplotlib.lines as mlines

input_file = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule-of-60-categorized-2026-10-09.md'
output_img = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule_of_60_chart-2026-10-09.png'

tickers = []
rev_growths = []
margins = []
colors = []

with open(input_file, 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('|') and 'Ticker' not in line and '---' not in line:
            cols = [c.strip() for c in line.split('|')[1:-1]]
            if len(cols) == 6:
                ticker = cols[0]
                rev = float(cols[3].replace('%', ''))
                margin = float(cols[4].replace('%', ''))
                tickers.append(ticker)
                rev_growths.append(rev)
                margins.append(margin)
                if rev > margin:
                    colors.append('#ff4d4d') # Red for Hyper-Grower
                else:
                    colors.append('#4da6ff') # Blue for Cash Cow

plt.figure(figsize=(14, 10))
x_axis_max = 500
visible = [index for index, growth in enumerate(rev_growths) if growth <= x_axis_max]
outliers = [index for index, growth in enumerate(rev_growths) if growth > x_axis_max]

plt.scatter(
    [rev_growths[index] for index in visible],
    [margins[index] for index in visible],
    c=[colors[index] for index in visible],
    alpha=0.7,
    s=100,
    edgecolor='white',
    linewidth=1,
)

# Label only the highest-scoring visible names in each market to avoid collisions.
us_visible = [index for index in visible if not tickers[index].endswith('.KS')]
kr_visible = [index for index in visible if tickers[index].endswith('.KS')]
label_indices = set(
    sorted(us_visible, key=lambda index: rev_growths[index] + margins[index], reverse=True)[:10]
    + sorted(kr_visible, key=lambda index: rev_growths[index] + margins[index], reverse=True)[:10]
)
for index in label_indices:
    plt.annotate(
        tickers[index],
        (rev_growths[index], margins[index]),
        xytext=(6, 4),
        textcoords='offset points',
        fontsize=9,
        fontweight='bold',
        color='#333333',
    )

# x = y line
plt.plot([-10, x_axis_max], [-10, x_axis_max], color='#888888', linestyle='--', alpha=0.7, label='Growth = Margin')

# Rule of 60 line (x+y=60)
x_vals = np.linspace(-10, x_axis_max, 200)
y_vals = 60 - x_vals
plt.plot(x_vals, y_vals, color='#2ca02c', linestyle='-.', alpha=0.7, label='Rule of 60 (x+y=60)')

if outliers:
    outlier_text = '\n'.join(
        f"{tickers[index]}: {rev_growths[index]:.1f}% growth (off scale)"
        for index in sorted(outliers, key=lambda index: rev_growths[index], reverse=True)
    )
    plt.text(
        0.98,
        0.67,
        outlier_text,
        transform=plt.gca().transAxes,
        ha='right',
        va='top',
        fontsize=10,
        bbox=dict(boxstyle='round,pad=0.5', facecolor='white', edgecolor='#aaaaaa', alpha=0.9),
    )

plt.title('Rule of 60 Elite Companies: Revenue Growth vs Margin', fontsize=18, pad=20, fontweight='bold')
plt.xlabel('Revenue Growth (%) ->', fontsize=14)
plt.ylabel('Margin (%) ->', fontsize=14)
plt.xlim(-10, x_axis_max)
plt.ylim(-10, 105)
plt.grid(True, linestyle=':', alpha=0.6)

# Custom legend
legend_elements = [
    Patch(facecolor='#ff4d4d', edgecolor='w', label='Hyper-Growers (Growth > Margin)'),
    Patch(facecolor='#4da6ff', edgecolor='w', label='Cash Cows (Margin >= Growth)'),
    mlines.Line2D([], [], color='#888888', linestyle='--', label='Growth = Margin'),
    mlines.Line2D([], [], color='#2ca02c', linestyle='-.', label='Rule of 60 Line')
]
plt.legend(handles=legend_elements, loc='upper right', fontsize=11, frameon=True, shadow=True)

plt.tight_layout()
plt.savefig(output_img, dpi=150, bbox_inches='tight')
print(f"Chart saved to {output_img}")
