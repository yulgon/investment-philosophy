import matplotlib.pyplot as plt
import re
import os
import numpy as np
from matplotlib.patches import Patch
import matplotlib.lines as mlines

input_file = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule-of-60-categorized.md'
output_img = '/Users/yg/Documents/antigravity/investment-philosophy/knowledge-base/rule_of_60_chart.png'

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
plt.scatter(rev_growths, margins, c=colors, alpha=0.7, s=100, edgecolor='white', linewidth=1)

# Annotate each point
for i, txt in enumerate(tickers):
    plt.annotate(txt, (rev_growths[i], margins[i]), xytext=(6, 4), textcoords='offset points', fontsize=9, fontweight='bold', color='#333333')

if tickers:
    max_x = max(rev_growths)
else:
    max_x = 100

max_y = 100

# x = y line
plt.plot([-50, max_x+50], [-50, max_x+50], color='#888888', linestyle='--', alpha=0.7, label='Growth = Margin')

# Rule of 60 line (x+y=60)
x_vals = np.linspace(-50, max_x+50, 100)
y_vals = 60 - x_vals
plt.plot(x_vals, y_vals, color='#2ca02c', linestyle='-.', alpha=0.7, label='Rule of 60 (x+y=60)')

# Fill areas for aesthetics
# Hyper-Grower area (bottom right)
# Cash Cow area (top left)
plt.fill_between(x_vals, y_vals, x_vals, where=(x_vals > y_vals), color='#ff4d4d', alpha=0.03)
plt.fill_between(x_vals, x_vals, 1000, color='#4da6ff', alpha=0.03)

plt.title('Rule of 60 Elite Companies: Revenue Growth vs Margin', fontsize=18, pad=20, fontweight='bold')
plt.xlabel('Revenue Growth (%) ->', fontsize=14)
plt.ylabel('Margin (%) ->', fontsize=14)
plt.xlim(-10, max_x * 1.05)
plt.ylim(-10, max_y + 5)
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
