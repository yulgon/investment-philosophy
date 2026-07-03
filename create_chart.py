import matplotlib.pyplot as plt

# Approximate relative performance data (Base 100 in 1998)
years = [1998, 1999, 2000, 2001, 2002, 2003]
nasdaq = [100, 185, 250, 110, 55, 80]     # Nasdaq (Tech/Growth)
sp500 = [100, 120, 140, 115, 70, 90]      # S&P 500 (Market Index)
value = [100, 95, 105, 115, 100, 125]     # Value Stocks (Russell 1000 Value proxy)

plt.style.use('dark_background')
fig, ax = plt.subplots(figsize=(10, 6))
fig.patch.set_facecolor('#1a1a1a')
ax.set_facecolor('#1a1a1a')

plt.plot(years, nasdaq, color='#ff4757', linewidth=3, label='NASDAQ (Speculation/Tech)', marker='o')
plt.plot(years, sp500, color='#2ed573', linewidth=3, label='S&P 500 (Market Index)', marker='o')
plt.plot(years, value, color='#1e90ff', linewidth=3, label='Value Stocks (Fundamentals)', marker='o')

plt.title('Dot-com Bubble: Performance Comparison (1998-2003)', fontsize=16, fontweight='bold', pad=20, color='white')
plt.xlabel('Year', fontsize=12, color='lightgray')
plt.ylabel('Relative Performance (Base 100)', fontsize=12, color='lightgray')
plt.grid(True, linestyle='--', alpha=0.2)

# Adjust legends
legend = plt.legend(fontsize=11, loc='upper left', frameon=True)
legend.get_frame().set_facecolor('#2d2d2d')
legend.get_frame().set_edgecolor('none')
for text in legend.get_texts():
    text.set_color("white")

# Annotations
plt.annotate('-78% Crash (Peak to Trough)', xy=(2002, 55), xytext=(2000.5, 100),
             arrowprops=dict(facecolor='#ff4757', shrink=0.05, width=2, headwidth=8), fontsize=11, color='#ff4757', fontweight='bold')
plt.annotate('-50% Crash', xy=(2002, 70), xytext=(2002.5, 40),
             arrowprops=dict(facecolor='#2ed573', shrink=0.05, width=2, headwidth=8), fontsize=11, color='#2ed573', fontweight='bold')
plt.annotate('Value Defense', xy=(2001, 115), xytext=(1998.5, 130),
             arrowprops=dict(facecolor='#1e90ff', shrink=0.05, width=2, headwidth=8), fontsize=11, color='#1e90ff', fontweight='bold')

plt.tight_layout()
plt.savefig('docs/public/dotcom-comparison.png', dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor())
