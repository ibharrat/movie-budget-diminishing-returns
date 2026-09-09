"""
Kaggle The Movies Dataset Ingestion & Cleaning Script
Author: Personal Research Project
Dataset: Kaggle (The Movies Dataset, 45k+ titles, movies_metadata.csv)
Target: Exports cleaned JSON for the Diminishing Returns website visualization.
"""

import sys
import json
from pathlib import Path

def main():
    csv_file = Path("movies_metadata.csv")
    if not csv_file.exists():
        print("[*] Notice: 'movies_metadata.csv' not found in current directory.")
        print("    Download the dataset from Kaggle:")
        print("    https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset")
        print("    Place 'movies_metadata.csv' here and re-run this script.")
        return

    try:
        import pandas as pd
    except ImportError:
        print("[!] pandas is required. Run: pip install pandas")
        return

    print("[*] Loading movies_metadata.csv (45,000+ records)...")
    df = pd.read_csv(csv_file, low_memory=False)

    print(f"[*] Raw rows loaded: {len(df):,}")

    # 1. Clean budget and revenue fields
    df['budget'] = pd.to_numeric(df['budget'], errors='coerce')
    df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')

    # 2. Filter for verified financial rows (minimum $10,000 budget and revenue)
    clean_df = df[(df['budget'] >= 10000) & (df['revenue'] >= 10000)].copy()
    print(f"[*] Verified financial rows: {len(clean_df):,}")

    # 3. Calculate Multiplier and ROI
    clean_df['multiplier'] = clean_df['revenue'] / clean_df['budget']
    clean_df['roi_pct'] = ((clean_df['revenue'] - clean_df['budget']) / clean_df['budget']) * 100
    clean_df['profitable'] = clean_df['multiplier'] >= 2.5

    # 4. Bin into research budget tiers
    bins = [0, 5e6, 25e6, 65e6, 140e6, 1e9]
    labels = ['< $5M', '$5M-$25M', '$25M-$65M', '$65M-$140M', '$140M+']
    clean_df['tier'] = pd.cut(clean_df['budget'], bins=bins, labels=labels)

    # 5. Output summary aggregates
    tier_summary = clean_df.groupby('tier', observed=False).agg(
        count=('id', 'count'),
        median_budget=('budget', 'median'),
        median_revenue=('revenue', 'median'),
        avg_multiplier=('multiplier', 'median'),
        profitable_rate=('profitable', lambda x: round(float(x.mean() * 100), 1))
    ).reset_index()

    print("\n--- BUDGET TIER FINDINGS ---")
    print(tier_summary.to_string(index=False))

    output_path = Path("src/data/cleaned_movie_data.json")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    clean_records = clean_df[['title', 'budget', 'revenue', 'multiplier', 'roi_pct', 'profitable', 'tier']].to_dict(orient='records')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(clean_records, f, indent=2)

    print(f"\n[✓] Exported {len(clean_records):,} records to {output_path}")

if __name__ == '__main__':
    main()
