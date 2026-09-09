export interface MovieRecord {
  id: number;
  title: string;
  releaseYear: number;
  budget: number; // In USD
  revenue: number; // In USD
  roi: number; // (revenue - budget) / budget * 100 percentage
  multiplier: number; // revenue / budget
  genre: string;
  tierId: string;
  profitable: boolean;
  notes?: string;
}

export interface BudgetTier {
  id: string;
  label: string;
  rangeLabel: string;
  minBudget: number;
  maxBudget: number;
  movieCount: number;
  medianBudget: number;
  medianRevenue: number;
  medianRoi: number; // e.g. 185%
  avgMultiplier: number; // e.g. 2.85x
  profitablePercent: number; // e.g. 58%
  diminishingRisk: 'Low' | 'Optimal' | 'Diminishing' | 'Severe Diminishing';
  description: string;
  keyObservation: string;
}

export interface DiminishingPoint {
  budgetTierLabel: string;
  budgetMil: number;
  medianRevenueMil: number;
  multiplier: number;
  marginalGainPerDollar: number; // The derivative/efficiency: dollars of revenue gained per incremental dollar of budget
  profitableRate: number;
}

export interface DatasetStats {
  rawCount: number;
  cleanedCount: number;
  totalBoxOfficeUSD: number;
  totalBudgetUSD: number;
  medianRoi: number;
  breakevenMultiple: number; // 2.5x rule
  optimalBudgetRange: string;
}
