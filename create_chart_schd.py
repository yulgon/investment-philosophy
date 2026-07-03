import matplotlib.pyplot as plt
import numpy as np

# Drawdown data
# Dot-com (2000-2002)
dotcom_nasdaq = -78.0
dotcom_sp500 = -50.0
dotcom_schd = -17.1
dotcom_schd_yield = 3.8

# Financial Crisis (2007-2009)
subprime_nasdaq = -54.0
subprime_sp500 = -56.8
subprime_schd = -44.5
subprime_schd_yield = 5.4

# COVID-19 (2020)
covid_nasdaq = -30.0
covid_sp500 = -33.9
covid_schd = -33.4
covid_schd_yield = 4.2

# 2022 Inflation & Rate Hikes
inf_nasdaq = -33.0
inf_sp500 = -25.0
inf_schd = -16.9
inf_schd_yield = 3.6

labels = ['Dot-com Bubble\n(2000-2002)', 'Financial Crisis\n(2007-2009)', 'COVID-19 Crash\n(2020)', 'Inflation/Rate Hikes\n(2022)']
nasdaq_mdd = [dotcom_nasdaq, subprime_nasdaq, covid_nasdaq, inf_nasdaq]
sp500_mdd = [dotcom_sp500, subprime_sp500, covid_sp500, inf_sp500]
schd_mdd = [dotcom_schd, subprime_schd, covid_schd, inf_schd]
schd_yields = [dotcom_schd_yield, subprime_schd_yield, covid_schd_yield, inf_schd_yield]

x = np.arange(len(labels))
width = 0.25

plt.style.use('dark_background')
fig, ax = plt.subplots(figsize=(14, 7))
fig.patch.set_facecolor('#1a1a1a')
ax.set_facecolor('#1a1a1a')

rects1 = ax.bar(x - width, nasdaq_mdd, width, label='NASDAQ', color='#ff4757')
rects2 = ax.bar(x, sp500_mdd, width, label='S&P 500', color='#2ed573')
rects3 = ax.bar(x + width, schd_mdd, width, label='Dividend 100 (SCHD)', color='#ffd32a')

# Add text for labels, title and custom x-axis tick labels, etc.
ax.set_ylabel('Maximum Drawdown (%)', fontsize=12, color='lightgray')
ax.set_title('The Titanium Shield: SCHD vs S&P 500 vs NASDAQ\n(Backtested & Real-world Crisis Defense)', fontsize=18, fontweight='bold', pad=20, color='white')
ax.set_xticks(x)
ax.set_xticklabels(labels, fontsize=12, color='white')
ax.grid(True, axis='y', linestyle='--', alpha=0.2)

legend = ax.legend(fontsize=12, loc='lower right')
legend.get_frame().set_facecolor('#2d2d2d')
legend.get_frame().set_edgecolor('none')
for text in legend.get_texts():
    text.set_color("white")

def autolabel(rects, is_schd=False, yields=None):
    for i, rect in enumerate(rects):
        height = rect.get_height()
        label_text = f'{height}%'
        
        # Determine the text position (below the negative bar)
        y_offset = -15
        
        # If it's SCHD, add the dividend yield info
        if is_schd and yields is not None:
            label_text += f'\n(Yield {yields[i]}%)'
            y_offset = -25
            
        ax.annotate(label_text,
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, y_offset),  
                    textcoords="offset points",
                    ha='center', va='top', color='white', fontweight='bold', fontsize=11)

autolabel(rects1)
autolabel(rects2)
autolabel(rects3, is_schd=True, yields=schd_yields)

# Highlight annotations
# Dot-com
ax.annotate('Quality\nDefense!', xy=(0 + width, -17.1), xytext=(0.25, -5),
            arrowprops=dict(facecolor='white', shrink=0.05, width=2, headwidth=8), 
            fontsize=11, color='white', fontweight='bold', ha='center')

# 2008 Financial Crisis
ax.annotate('Survived Bank Collapse', xy=(1 + width, -44.5), xytext=(1.25, -28),
            arrowprops=dict(facecolor='white', shrink=0.05, width=2, headwidth=8), 
            fontsize=11, color='white', fontweight='bold', ha='center')

# 2022 Inflation
ax.annotate('Low Debt\nDefense!', xy=(3 + width, -16.9), xytext=(3.25, -5),
            arrowprops=dict(facecolor='white', shrink=0.05, width=2, headwidth=8), 
            fontsize=11, color='white', fontweight='bold', ha='center')


# Ensure the y-axis has enough space at the bottom for the new multi-line labels
ax.set_ylim(-95, 0)

plt.tight_layout()
plt.savefig('docs/public/schd-defense-comparison.png', dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor())
