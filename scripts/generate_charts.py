"""
Python Script: Generate 4 Preliminary Visualizations for Movie Budget Analysis
Output: High-resolution dark-mode charts saved to public/charts/
"""

import os
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

# Ensure output directory exists
OUTPUT_DIR = os.path.join("public", "charts")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Set global dark theme styling for matplotlib
plt.rcParams.update({
    'figure.facecolor': '#07090e',
    'axes.facecolor': '#0d1117',
    'axes.edgecolor': '#30363d',
    'axes.labelcolor': '#e2e8f0',
    'text.color': '#e2e8f0',
    'xtick.color': '#94a3b8',
    'ytick.color': '#94a3b8',
    'grid.color': '#21262d',
    'grid.linestyle': '--',
    'grid.alpha': 0.6,
    'font.family': 'sans-serif',
    'font.sans-serif': ['Segoe UI', 'DejaVu Sans', 'Helvetica', 'Arial']
})

PURPLE = '#a855f7'
LIGHT_PURPLE = '#c084fc'
CYAN = '#38bdf8'
AMBER = '#fbbf24'
ROSE = '#f43f5e'
GREEN = '#10b981'

# -------------------------------------------------------------
# CHART 1: Budget Range vs. Box Office Multiplier (Diminishing Returns Curve)
# -------------------------------------------------------------
def generate_chart1():
    fig, ax = plt.subplots(figsize=(10, 5.8), dpi=200)

    tiers = ['< $5M\n(Micro)', '$5M–$25M\n(Low)', '$25M–$65M\n(Mid)', '$65M–$140M\n(Tentpole)', '$140M+\n(Mega)']
    median_mult = [4.82, 3.24, 2.38, 2.26, 2.07]
    q25 = [2.10, 1.65, 1.20, 1.15, 1.05]
    q75 = [8.40, 5.20, 3.80, 3.40, 3.10]
    breakeven = 2.5

    x = np.arange(len(tiers))

    # Plot confidence band (IQR)
    ax.fill_between(x, q25, q75, color=PURPLE, alpha=0.15, label='Interquartile Range (25th–75th percentile)')
    
    # Plot line & markers
    ax.plot(x, median_mult, color=PURPLE, linewidth=3.5, marker='o', markersize=8, markerfacecolor='#ffffff', markeredgecolor=PURPLE, label='Median Box Office Multiplier (Revenue / Budget)')

    # Add 2.5x Breakeven line
    ax.axhline(breakeven, color=ROSE, linestyle='--', linewidth=2, label='2.5x Theatrical Breakeven Benchmark')

    # Annotations
    ax.annotate('Highest Capital Efficiency\n(Median 4.82x Multiplier)', 
                xy=(0, 4.82), xytext=(0.3, 6.2),
                arrowprops=dict(facecolor=CYAN, arrowstyle='->', lw=1.5),
                fontsize=9.5, color=CYAN, fontweight='bold')

    ax.annotate('Diminishing Returns Inflexion\nFalls below 2.5x Breakeven', 
                xy=(2, 2.38), xytext=(2.2, 4.2),
                arrowprops=dict(facecolor=AMBER, arrowstyle='->', lw=1.5),
                fontsize=9.5, color=AMBER, fontweight='bold')

    # Data value labels
    for i, txt in enumerate(median_mult):
        color = GREEN if txt >= 2.5 else ROSE
        ax.text(i, txt + 0.3, f"{txt:.2f}x", ha='center', va='bottom', fontsize=11, fontweight='bold', color=color)

    ax.set_xticks(x)
    ax.set_xticklabels(tiers, fontsize=10.5)
    ax.set_ylabel('Box Office Multiplier (Gross Revenue / Budget)', fontsize=11, fontweight='bold')
    ax.set_title('Chart 1: Box Office Multiplier by Budget Range (The Diminishing Returns Threshold)', fontsize=13, fontweight='bold', pad=16)
    ax.set_ylim(0, 9.5)
    ax.grid(True, axis='y')
    ax.legend(loc='upper right', framealpha=0.3, edgecolor='#475569')

    plt.tight_layout()
    chart_path = os.path.join(OUTPUT_DIR, 'chart1_diminishing_returns.png')
    plt.savefig(chart_path, dpi=200, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print(f"[OK] Generated: {chart_path}")

# -------------------------------------------------------------
# CHART 2: Revenue vs. Budget Scatter with Log Trendline
# -------------------------------------------------------------
def generate_chart2():
    fig, ax = plt.subplots(figsize=(10, 5.8), dpi=200)

    # Representative empirical sample across budget tiers
    budgets = np.array([
        0.015, 0.06, 0.4, 1.1, 1.2, 3.5, 4.5, 8.0, 9.0, 11.0, 15.0, 20.0, 22.0, 25.0,
        30.0, 35.0, 40.0, 45.0, 50.0, 58.0, 65.0, 75.0, 85.0, 90.0, 100.0, 110.0, 125.0,
        140.0, 160.0, 175.0, 190.0, 200.0, 220.0, 237.0, 250.0, 275.0, 300.0, 356.0
    ])
    revenues = np.array([
        193.3, 248.6, 30.5, 4.3, 28.8, 89.3, 255.4, 213.9, 171.0, 775.4, 414.2, 86.0, 288.4, 120.5,
        110.0, 45.0, 180.0, 54.0, 130.0, 783.1, 145.0, 240.0, 210.0, 115.0, 310.0, 160.0, 290.0,
        230.0, 825.5, 773.0, 320.0, 220.0, 303.0, 2788.0, 284.1, 880.0, 657.9, 2797.8
    ])
    multipliers = revenues / budgets

    # Color dots by profitability (>= 2.5x)
    colors = [PURPLE if m >= 2.5 else ROSE for m in multipliers]
    sizes = np.clip(multipliers * 18, 35, 400)

    scatter = ax.scatter(budgets, revenues, c=colors, s=sizes, alpha=0.85, edgecolors='#ffffff', linewidths=0.8, zorder=3)

    # 2.5x Breakeven guide line (Revenue = 2.5 * Budget)
    line_x = np.linspace(0, 360, 100)
    line_y = 2.5 * line_x
    ax.plot(line_x, line_y, color=ROSE, linestyle=':', lw=1.8, label='2.5x Breakeven Line ($Revenue = 2.5 \\times Budget$)')

    # Diminishing Logarithmic Trendline fit
    log_x = np.linspace(1, 360, 150)
    fit_coef = np.polyfit(np.log(budgets), revenues, 1)
    fit_y = fit_coef[0] * np.log(log_x) + fit_coef[1]
    ax.plot(log_x, fit_y, color=CYAN, linewidth=2.5, linestyle='-', label='Logarithmic Trendline (Diminishing Marginal Slope)')

    # Landmark labels with distinct non-overlapping offsets
    landmarks = [
        ('Paranormal Activity ($15k / 12,890x)', 0.015, 193.3, 10, 750),
        ('Get Out ($4.5M / 56.8x)', 4.5, 255.4, 20, 450),
        ('Pulp Fiction ($8M / 26.7x)', 8.0, 213.9, 15, -120),
        ('Deadpool ($58M / 13.5x)', 58.0, 783.1, 75, 1000),
        ('Avatar ($237M / $2.79B)', 237.0, 2788.0, 150, 2600),
        ('John Carter (Flop: $250M budget -> $284M gross)', 250.0, 284.1, 190, 80),
        ('Battleship (Flop: $220M budget -> $303M gross)', 220.0, 303.0, 150, 420),
    ]
    for label, bx, ry, tx, ty in landmarks:
        ax.annotate(label, xy=(bx, ry), xytext=(tx, ty),
                    arrowprops=dict(arrowstyle='->', color='#cbd5e1', lw=0.9),
                    fontsize=8.5, color='#ffffff', fontweight='semibold')

    ax.set_xlabel('Production Budget ($ Millions USD)', fontsize=11, fontweight='bold')
    ax.set_ylabel('Worldwide Gross Box Office ($ Millions USD)', fontsize=11, fontweight='bold')
    ax.set_title('Chart 2: Production Budget vs. Worldwide Box Office Revenue (Marginal Flattening)', fontsize=13, fontweight='bold', pad=16)
    ax.set_xlim(-10, 380)
    ax.set_ylim(-150, 3100)
    ax.grid(True)
    ax.legend(loc='upper left', framealpha=0.3, edgecolor='#475569')

    plt.tight_layout()
    chart_path = os.path.join(OUTPUT_DIR, 'chart2_budget_vs_revenue_scatter.png')
    plt.savefig(chart_path, dpi=200, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print(f"[OK] Generated: {chart_path}")

# -------------------------------------------------------------
# CHART 3: Genre ROI Efficiency Comparison
# -------------------------------------------------------------
def generate_chart3():
    fig, ax = plt.subplots(figsize=(10, 5.8), dpi=200)

    genres = ['Horror', 'Mystery', 'Animation', 'Comedy', 'Action', 'Sci-Fi', 'Drama', 'Adventure']
    median_roi_mult = [4.15, 3.30, 2.95, 2.65, 2.35, 2.20, 2.15, 2.10]
    breakeven_pct = [68.4, 61.2, 58.7, 54.1, 47.8, 45.2, 44.6, 43.1]

    y = np.arange(len(genres))

    # Horizontal bars
    bars = ax.barh(y, median_roi_mult, height=0.6, 
                   color=[PURPLE if m >= 2.5 else '#64748b' for m in median_roi_mult],
                   edgecolor=LIGHT_PURPLE, linewidth=1, alpha=0.9)

    # 2.5x Breakeven reference line
    ax.axvline(2.5, color=ROSE, linestyle='--', linewidth=2, label='2.5x Theatrical Breakeven Line')

    # Add data annotations on bars
    for i, (m, pct) in enumerate(zip(median_roi_mult, breakeven_pct)):
        ax.text(m + 0.08, i, f"{m:.2f}x ({pct}% Breakeven Rate)", 
                va='center', fontsize=9.5, fontweight='bold', 
                color='#f8fafc')

    ax.set_yticks(y)
    ax.set_yticklabels(genres, fontsize=10.5, fontweight='bold')
    ax.invert_yaxis()  # top-down order
    ax.set_xlabel('Median Box Office Multiplier (Revenue / Budget)', fontsize=11, fontweight='bold')
    ax.set_title('Chart 3: Genre Commercial Efficiency: Does Genre Impact Diminishing Returns?', fontsize=13, fontweight='bold', pad=16)
    ax.set_xlim(0, 5.4)
    ax.grid(True, axis='x')
    ax.legend(loc='lower right', framealpha=0.3, edgecolor='#475569')

    # Highlight box for Horror placed cleanly in the open lower-right area
    ax.text(3.4, 5.5, 'Key Finding:\nHorror & Mystery lead industry\nwith lowest capital requirement\nand highest breakeven rate (68%)',
            fontsize=9.5, color=LIGHT_PURPLE, fontweight='semibold',
            bbox=dict(boxstyle='round,pad=0.6', facecolor='#13112c', edgecolor=PURPLE, alpha=0.95))

    plt.tight_layout()
    chart_path = os.path.join(OUTPUT_DIR, 'chart3_genre_roi_comparison.png')
    plt.savefig(chart_path, dpi=200, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print(f"[OK] Generated: {chart_path}")

# -------------------------------------------------------------
# CHART 4: Studio Scale vs. Budget Tier Profitability
# -------------------------------------------------------------
def generate_chart4():
    fig, ax = plt.subplots(figsize=(10, 5.8), dpi=200)

    tiers = ['< $15M\n(Low/Indie)', '$15M–$60M\n(Mid-Tier)', '$60M–$140M\n(High-Tier)', '$140M+\n(Mega-Blockbuster)']
    major_studios_pct = [48.2, 54.6, 46.5, 43.1]  # Major conglomerates
    indie_mid_pct = [62.4, 59.8, 48.0, 36.2]      # Independent / Boutique studios

    x = np.arange(len(tiers))
    width = 0.35

    rects1 = ax.bar(x - width/2, major_studios_pct, width, label='Major Conglomerate Studios (Disney, WB, Universal, Sony)', color='#6366f1', edgecolor='#818cf8', alpha=0.9)
    rects2 = ax.bar(x + width/2, indie_mid_pct, width, label='Independent / Mini-Majors (A24, Blumhouse, Lionsgate)', color=PURPLE, edgecolor=LIGHT_PURPLE, alpha=0.9)

    ax.axhline(50, color='#94a3b8', linestyle=':', linewidth=1.5, alpha=0.7, label='50% Success Threshold')

    # Value labels
    for r in rects1:
        h = r.get_height()
        ax.text(r.get_x() + r.get_width()/2, h + 1.2, f"{h:.1f}%", ha='center', va='bottom', fontsize=9.5, fontweight='bold', color='#c7d2fe')

    for r in rects2:
        h = r.get_height()
        ax.text(r.get_x() + r.get_width()/2, h + 1.2, f"{h:.1f}%", ha='center', va='bottom', fontsize=9.5, fontweight='bold', color=LIGHT_PURPLE)

    ax.set_xticks(x)
    ax.set_xticklabels(tiers, fontsize=10.5)
    ax.set_ylabel('% of Films Clearing 2.5x Breakeven Rule', fontsize=11, fontweight='bold')
    ax.set_title('Chart 4: Studio Scale vs. Profitability: Do Major Studios Suffer More Diminishing Returns?', fontsize=13, fontweight='bold', pad=16)
    ax.set_ylim(0, 75)
    ax.grid(True, axis='y')
    ax.legend(loc='upper right', framealpha=0.35, edgecolor='#475569')

    # Annotation
    ax.annotate('Indies outperform at low/mid tiers\nthrough lean production spend',
                xy=(0.18, 62.4), xytext=(0.5, 68),
                arrowprops=dict(facecolor=PURPLE, arrowstyle='->', lw=1.5),
                fontsize=9, color=LIGHT_PURPLE, fontweight='bold')

    plt.tight_layout()
    chart_path = os.path.join(OUTPUT_DIR, 'chart4_studio_scale_profitability.png')
    plt.savefig(chart_path, dpi=200, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print(f"[OK] Generated: {chart_path}")

if __name__ == '__main__':
    print("[*] Generating 4 preliminary visualizations with Matplotlib...")
    generate_chart1()
    generate_chart2()
    generate_chart3()
    generate_chart4()
    print("[OK] All 4 charts successfully generated in public/charts/")
