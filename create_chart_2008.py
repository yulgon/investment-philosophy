import matplotlib.pyplot as plt

# Approximate relative performance data (Base 100 in Oct 2007)
# Oct 2007 to March 2009
dates = ['2007 Q4', '2008 Q1', '2008 Q2', '2008 Q3', '2008 Q4', '2009 Q1']
nasdaq = [100, 85, 80, 75, 55, 46]     # Nasdaq: ~ -54%
sp500 = [100, 88, 85, 78, 55, 43]      # S&P 500: ~ -57%
value = [100, 86, 80, 75, 53, 43]      # Value (Russell 1000 Value): ~ -57%

plt.style.use('dark_background')
fig, ax = plt.subplots(figsize=(10, 6))
fig.patch.set_facecolor('#1a1a1a')
ax.set_facecolor('#1a1a1a')

plt.plot(dates, nasdaq, color='#ff4757', linewidth=3, label='NASDAQ (-54%)', marker='o')
plt.plot(dates, sp500, color='#2ed573', linewidth=3, label='S&P 500 (-57%)', marker='o')
plt.plot(dates, value, color='#1e90ff', linewidth=3, label='Value Stocks (-57%)', marker='o')

plt.title('2008 Financial Crisis: The Betrayal of Value (2007-2009)', fontsize=16, fontweight='bold', pad=20, color='white')
plt.xlabel('Quarter', fontsize=12, color='lightgray')
plt.ylabel('Relative Performance (Base 100)', fontsize=12, color='lightgray')
plt.grid(True, linestyle='--', alpha=0.2)

# Adjust legends
legend = plt.legend(fontsize=11, loc='upper right', frameon=True)
legend.get_frame().set_facecolor('#2d2d2d')
legend.get_frame().set_edgecolor('none')
for text in legend.get_texts():
    text.set_color("white")

# Annotations
plt.annotate('Value Fund Annihilation\n(Heavy in Financials/Banks)', xy=(3, 75), xytext=(1.5, 50),
             arrowprops=dict(facecolor='#1e90ff', shrink=0.05, width=2, headwidth=8), fontsize=11, color='#1e90ff', fontweight='bold', ha='center')

plt.annotate('Index Fund Collapse', xy=(4.8, 43), xytext=(3, 30),
             arrowprops=dict(facecolor='#2ed573', shrink=0.05, width=2, headwidth=8), fontsize=11, color='#2ed573', fontweight='bold')

plt.tight_layout()
plt.savefig('docs/public/subprime-comparison.png', dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor())
