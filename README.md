# Movie Budget & Diminishing Returns Analysis

A personal data journalism and research website investigating the core question:
> **"At what budget range do movies tend to have diminishing returns?"**

Built with **React 18**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Recharts**, featuring an ultra-modern black dark-mode aesthetic.

---

## Key Features

1. **Editorial Data Storytelling**:
   - High-impact dark theme (`#040507` obsidian palette, glassmorphism cards, glowing emerald/amber indicators).
   - Analysis of the 3 pillars of movie economics: the 50% exhibitor split, the P&A marketing multiplier, and audience saturation ceilings.

2. **Interactive Visualization Shell**:
   - **Efficiency Curve**: Dual-axis plot of Box Office Multiplier vs. Marginal Revenue Per Dollar Spent with the 2.5x Breakeven Rule reference threshold.
   - **Tier Breakdown**: Comparative bar chart of profitability rates across 5 distinct budget brackets:
     - Micro-Budget (< $5M)
     - Low-Budget Sweet Spot ($5M – $25M)
     - Mid-Budget Squeeze ($25M – $65M)
     - High-Budget Tentpole ($65M – $140M)
     - Mega-Blockbuster ($140M – $350M+)
   - **Landmark Outliers & Scatter**: Interactive scatter chart + benchmark table (from *Paranormal Activity* and *Get Out* to *Avatar* and *John Carter*).

3. **Kaggle 45,000+ Movies Dataset Pipeline**:
   - Pre-configured data model based on Kaggle's *The Movies Dataset* (TMDB).
   - Ingestion script (`scripts/clean_kaggle_movies.py`) to process `movies_metadata.csv` and export cleaned JSON.

---

## Quick Start

### 1. Run Development Server
```bash
npm run dev
```
The site will start at `http://localhost:3000`.

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## Dataset Ingestion

To feed your downloaded Kaggle dataset:
1. Download `movies_metadata.csv` from [Kaggle's The Movies Dataset](https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset).
2. Place `movies_metadata.csv` in this project directory.
3. Run:
   ```bash
   python scripts/clean_kaggle_movies.py
   ```
4. This script cleans zero-budget rows, calculates Box Office Multipliers, and generates `src/data/cleaned_movie_data.json`.
