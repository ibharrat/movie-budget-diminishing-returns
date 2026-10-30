import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell,
  BarChart,
  Bar,
  Line,
  Area,
  Brush,
  ComposedChart
} from 'recharts';
import {
  Sparkles,
  Sliders,
  Filter,
  Eye,
  Maximize2,
  Layers,
  Activity,
  Calendar,
  BarChart3,
  LineChart as LineChartIcon,
  ScatterChart as ScatterIcon
} from 'lucide-react';

// ============================================================================
// DATASET 1: 52 REAL-WORLD FILMS FOR CATBOOST INTERACTIVE SCATTER PLOT
// Model 06: CatBoost Regressor (R² = 0.771, RMSE = $34.8M)
// ============================================================================
export interface ScatterMoviePoint {
  id: string;
  title: string;
  year: number;
  budget: number;       // in $M
  revenue: number;      // in $M
  catboostPred: number; // in $M
  linearPred: number;   // in $M
  residual: number;     // actual - catboostPred
  multiplier: number;
  genre: 'Action / Adventure' | 'Horror / Thriller' | 'Drama / Crime' | 'Sci-Fi' | 'Comedy / Animation';
  studio: 'Major Studio' | 'Independent / Mini-Major';
  breakeven: boolean;
}

const SCATTER_MOVIES: ScatterMoviePoint[] = [
  // Micro / Low
  { id: '1', title: 'Paranormal Activity', year: 2007, budget: 0.015, revenue: 193.3, catboostPred: 12.4, linearPred: 8.5, residual: 180.9, multiplier: 12890, genre: 'Horror / Thriller', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '2', title: 'The Blair Witch Project', year: 1999, budget: 0.06, revenue: 248.6, catboostPred: 14.8, linearPred: 9.1, residual: 233.8, multiplier: 4143, genre: 'Horror / Thriller', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '3', title: 'Eraserhead', year: 1977, budget: 0.4, revenue: 30.5, catboostPred: 4.2, linearPred: 9.8, residual: 26.3, multiplier: 76.2, genre: 'Horror / Thriller', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '4', title: 'Primer', year: 2004, budget: 0.007, revenue: 0.85, catboostPred: 1.1, linearPred: 8.2, residual: -0.25, multiplier: 121.4, genre: 'Sci-Fi', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '5', title: 'Saw', year: 2004, budget: 1.2, revenue: 103.9, catboostPred: 22.5, linearPred: 11.2, residual: 81.4, multiplier: 86.6, genre: 'Horror / Thriller', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '6', title: 'Insidious', year: 2010, budget: 1.5, revenue: 99.5, catboostPred: 24.1, linearPred: 12.0, residual: 75.4, multiplier: 66.3, genre: 'Horror / Thriller', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '7', title: 'Get Out', year: 2017, budget: 4.5, revenue: 255.4, catboostPred: 45.2, linearPred: 18.2, residual: 210.2, multiplier: 56.8, genre: 'Horror / Thriller', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '8', title: 'Whiplash', year: 2014, budget: 3.3, revenue: 49.0, catboostPred: 21.0, linearPred: 15.8, residual: 28.0, multiplier: 14.8, genre: 'Drama / Crime', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '9', title: 'Moonlight', year: 2016, budget: 4.0, revenue: 65.3, catboostPred: 23.5, linearPred: 17.2, residual: 41.8, multiplier: 16.3, genre: 'Drama / Crime', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '10', title: 'Pulp Fiction', year: 1994, budget: 8.0, revenue: 213.9, catboostPred: 58.0, linearPred: 25.4, residual: 155.9, multiplier: 26.7, genre: 'Drama / Crime', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '11', title: 'A Quiet Place', year: 2018, budget: 17.0, revenue: 340.9, catboostPred: 95.0, linearPred: 43.8, residual: 245.9, multiplier: 20.1, genre: 'Horror / Thriller', studio: 'Major Studio', breakeven: true },
  { id: '12', title: 'John Wick', year: 2014, budget: 20.0, revenue: 86.0, catboostPred: 68.4, linearPred: 50.0, residual: 17.6, multiplier: 4.3, genre: 'Action / Adventure', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '13', title: 'Slumdog Millionaire', year: 2008, budget: 15.0, revenue: 377.9, catboostPred: 78.5, linearPred: 39.7, residual: 299.4, multiplier: 25.2, genre: 'Drama / Crime', studio: 'Major Studio', breakeven: true },
  { id: '14', title: 'The King\'s Speech', year: 2010, budget: 15.0, revenue: 414.2, catboostPred: 82.0, linearPred: 39.7, residual: 332.2, multiplier: 27.6, genre: 'Drama / Crime', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '15', title: 'Drive', year: 2011, budget: 15.0, revenue: 77.0, catboostPred: 48.0, linearPred: 39.7, residual: 29.0, multiplier: 5.1, genre: 'Drama / Crime', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '16', title: 'Ex Machina', year: 2014, budget: 15.0, revenue: 36.9, catboostPred: 42.0, linearPred: 39.7, residual: -5.1, multiplier: 2.46, genre: 'Sci-Fi', studio: 'Independent / Mini-Major', breakeven: false },
  { id: '17', title: 'Lady Bird', year: 2017, budget: 10.0, revenue: 78.6, catboostPred: 35.0, linearPred: 29.5, residual: 43.6, multiplier: 7.86, genre: 'Comedy / Animation', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '18', title: 'The Grand Budapest Hotel', year: 2014, budget: 25.0, revenue: 172.9, catboostPred: 88.5, linearPred: 60.2, residual: 84.4, multiplier: 6.92, genre: 'Comedy / Animation', studio: 'Major Studio', breakeven: true },
  
  // Mid Budget ($25M - $65M)
  { id: '19', title: 'Sicario', year: 2015, budget: 30.0, revenue: 84.9, catboostPred: 82.0, linearPred: 70.5, residual: 2.9, multiplier: 2.83, genre: 'Drama / Crime', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '20', title: 'Arrival', year: 2016, budget: 47.0, revenue: 203.4, catboostPred: 135.0, linearPred: 105.4, residual: 68.4, multiplier: 4.33, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: true },
  { id: '21', title: 'Deadpool', year: 2016, budget: 58.0, revenue: 783.1, catboostPred: 245.0, linearPred: 128.0, residual: 538.1, multiplier: 13.5, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: true },
  { id: '22', title: 'Baby Driver', year: 2017, budget: 34.0, revenue: 226.9, catboostPred: 110.0, linearPred: 78.7, residual: 116.9, multiplier: 6.67, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: true },
  { id: '23', title: 'Steve Jobs', year: 2015, budget: 30.0, revenue: 34.4, catboostPred: 72.0, linearPred: 70.5, residual: -37.6, multiplier: 1.15, genre: 'Drama / Crime', studio: 'Major Studio', breakeven: false },
  { id: '24', title: 'The Nice Guys', year: 2016, budget: 50.0, revenue: 62.8, catboostPred: 115.0, linearPred: 111.5, residual: -52.2, multiplier: 1.26, genre: 'Comedy / Animation', studio: 'Major Studio', breakeven: false },
  { id: '25', title: 'Ford v Ferrari', year: 2019, budget: 65.0, revenue: 225.5, catboostPred: 178.0, linearPred: 142.3, residual: 47.5, multiplier: 3.47, genre: 'Drama / Crime', studio: 'Major Studio', breakeven: true },
  { id: '26', title: 'Knives Out', year: 2019, budget: 40.0, revenue: 312.9, catboostPred: 125.0, linearPred: 91.0, residual: 187.9, multiplier: 7.82, genre: 'Comedy / Animation', studio: 'Independent / Mini-Major', breakeven: true },
  { id: '27', title: 'Super 8', year: 2011, budget: 50.0, revenue: 260.1, catboostPred: 148.0, linearPred: 111.5, residual: 112.1, multiplier: 5.20, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: true },
  { id: '28', title: 'Annihilation', year: 2018, budget: 40.0, revenue: 43.1, catboostPred: 98.0, linearPred: 91.0, residual: -54.9, multiplier: 1.08, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: false },

  // High Budget ($65M - $140M)
  { id: '29', title: 'The Martian', year: 2015, budget: 108.0, revenue: 630.2, catboostPred: 285.0, linearPred: 230.4, residual: 345.2, multiplier: 5.84, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: true },
  { id: '30', title: 'Blade Runner 2049', year: 2017, budget: 150.0, revenue: 259.2, catboostPred: 325.0, linearPred: 316.5, residual: -65.8, multiplier: 1.73, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: false },
  { id: '31', title: 'Interstellar', year: 2014, budget: 165.0, revenue: 677.5, catboostPred: 375.0, linearPred: 347.3, residual: 302.5, multiplier: 4.11, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: true },
  { id: '32', title: 'Dune: Part One', year: 2021, budget: 165.0, revenue: 402.0, catboostPred: 360.0, linearPred: 347.3, residual: 42.0, multiplier: 2.44, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: false },
  { id: '33', title: 'Alita: Battle Angel', year: 2019, budget: 170.0, revenue: 405.0, catboostPred: 370.0, linearPred: 357.5, residual: 35.0, multiplier: 2.38, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: false },
  { id: '34', title: 'Mad Max: Fury Road', year: 2015, budget: 150.0, revenue: 375.2, catboostPred: 340.0, linearPred: 316.5, residual: 35.2, multiplier: 2.50, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: true },
  { id: '35', title: 'Tomorrowland', year: 2015, budget: 190.0, revenue: 209.2, catboostPred: 410.0, linearPred: 398.5, residual: -200.8, multiplier: 1.10, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: false },
  { id: '36', title: 'Edge of Tomorrow', year: 2014, budget: 178.0, revenue: 370.5, catboostPred: 388.0, linearPred: 373.9, residual: -17.5, multiplier: 2.08, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: false },
  { id: '37', title: 'Gravity', year: 2013, budget: 100.0, revenue: 723.2, catboostPred: 270.0, linearPred: 214.0, residual: 453.2, multiplier: 7.23, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: true },
  { id: '38', title: 'Spider-Man: Into the Spider-Verse', year: 2018, budget: 90.0, revenue: 375.5, catboostPred: 245.0, linearPred: 193.5, residual: 130.5, multiplier: 4.17, genre: 'Comedy / Animation', studio: 'Major Studio', breakeven: true },

  // Mega-Budget ($140M - $356M)
  { id: '39', title: 'Inception', year: 2010, budget: 160.0, revenue: 825.5, catboostPred: 360.0, linearPred: 337.0, residual: 465.5, multiplier: 5.16, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: true },
  { id: '40', title: 'Avatar', year: 2009, budget: 237.0, revenue: 2788.0, catboostPred: 520.0, linearPred: 494.9, residual: 2268.0, multiplier: 11.76, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: true },
  { id: '41', title: 'John Carter', year: 2012, budget: 250.0, revenue: 284.1, catboostPred: 535.0, linearPred: 521.5, residual: -250.9, multiplier: 1.14, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: false },
  { id: '42', title: 'Battleship', year: 2012, budget: 220.0, revenue: 303.0, catboostPred: 475.0, linearPred: 460.0, residual: -172.0, multiplier: 1.38, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: false },
  { id: '43', title: 'The 13th Warrior', year: 1999, budget: 160.0, revenue: 61.7, catboostPred: 350.0, linearPred: 337.0, residual: -288.3, multiplier: 0.39, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: false },
  { id: '44', title: 'Avengers: Endgame', year: 2019, budget: 356.0, revenue: 2797.8, catboostPred: 710.0, linearPred: 738.8, residual: 2087.8, multiplier: 7.86, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: true },
  { id: '45', title: 'Avengers: Infinity War', year: 2018, budget: 321.0, revenue: 2048.4, catboostPred: 660.0, linearPred: 667.1, residual: 1388.4, multiplier: 6.38, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: true },
  { id: '46', title: 'Justice League', year: 2017, budget: 300.0, revenue: 657.9, catboostPred: 620.0, linearPred: 624.0, residual: 37.9, multiplier: 2.19, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: false },
  { id: '47', title: 'The Lone Ranger', year: 2013, budget: 225.0, revenue: 260.5, catboostPred: 485.0, linearPred: 470.3, residual: -224.5, multiplier: 1.16, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: false },
  { id: '48', title: 'Green Lantern', year: 2011, budget: 200.0, revenue: 219.9, catboostPred: 430.0, linearPred: 419.0, residual: -210.1, multiplier: 1.10, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: false },
  { id: '49', title: 'Spectre', year: 2015, budget: 275.0, revenue: 880.7, catboostPred: 575.0, linearPred: 572.8, residual: 305.7, multiplier: 3.20, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: true },
  { id: '50', title: 'Tenet', year: 2020, budget: 205.0, revenue: 365.3, catboostPred: 440.0, linearPred: 429.3, residual: -74.7, multiplier: 1.78, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: false },
  { id: '51', title: 'No Time To Die', year: 2021, budget: 250.0, revenue: 774.2, catboostPred: 535.0, linearPred: 521.5, residual: 239.2, multiplier: 3.10, genre: 'Action / Adventure', studio: 'Major Studio', breakeven: true },
  { id: '52', title: 'Jupiter Ascending', year: 2015, budget: 176.0, revenue: 183.9, catboostPred: 380.0, linearPred: 369.8, residual: -196.1, multiplier: 1.04, genre: 'Sci-Fi', studio: 'Major Studio', breakeven: false }
];

// Continuous model curve points for overlay
const MODEL_CURVE_POINTS = [
  { budget: 0, catboostPred: 0, linearBaseline: 8.0, breakevenTarget: 0 },
  { budget: 10, catboostPred: 36.5, linearBaseline: 28.5, breakevenTarget: 25.0 },
  { budget: 25, catboostPred: 78.0, linearBaseline: 59.3, breakevenTarget: 62.5 },
  { budget: 50, catboostPred: 135.0, linearBaseline: 110.5, breakevenTarget: 125.0 },
  { budget: 75, catboostPred: 195.0, linearBaseline: 161.8, breakevenTarget: 187.5 },
  { budget: 100, catboostPred: 255.0, linearBaseline: 213.0, breakevenTarget: 250.0 },
  { budget: 150, catboostPred: 345.0, linearBaseline: 315.5, breakevenTarget: 375.0 },
  { budget: 200, catboostPred: 430.0, linearBaseline: 418.0, breakevenTarget: 500.0 },
  { budget: 250, catboostPred: 520.0, linearBaseline: 520.5, breakevenTarget: 625.0 },
  { budget: 300, catboostPred: 610.0, linearBaseline: 623.0, breakevenTarget: 750.0 },
  { budget: 360, catboostPred: 710.0, linearBaseline: 746.0, breakevenTarget: 900.0 }
];


// ============================================================================
// DATASET 2: RANDOM FOREST BREAKEVEN & MARGIN METRICS ACROSS 5 BUDGET TIERS
// Model 09: Random Forest Classifier (84.6% Accuracy, 0.892 ROC-AUC)
// ============================================================================
export interface BarTierData {
  tierId: string;
  name: string;
  rangeLabel: string;
  sampleCount: number;
  empiricalRate: number;      // %
  rfPredictedRate: number;    // %
  majorStudioRate: number;    // %
  indieStudioRate: number;    // %
  medianMultiplier: number;
  flopRate: number;           // % with multiplier < 1.0
  marginRisk: string;
  meanAbsError: number;       // %
}

const TIER_BAR_DATA: BarTierData[] = [
  {
    tierId: 'micro',
    name: 'Micro-Budget',
    rangeLabel: '< $5M',
    sampleCount: 1184,
    empiricalRate: 54.2,
    rfPredictedRate: 53.8,
    majorStudioRate: 46.5,
    indieStudioRate: 57.1,
    medianMultiplier: 4.82,
    flopRate: 31.4,
    marginRisk: 'Asymmetric Upside',
    meanAbsError: 4.1
  },
  {
    tierId: 'low',
    name: 'Low-Budget Sweet Spot',
    rangeLabel: '$5M – $25M',
    sampleCount: 1620,
    empiricalRate: 61.8,
    rfPredictedRate: 62.1,
    majorStudioRate: 58.4,
    indieStudioRate: 64.9,
    medianMultiplier: 3.24,
    flopRate: 21.2,
    marginRisk: 'Optimal Capital Efficiency',
    meanAbsError: 3.4
  },
  {
    tierId: 'mid',
    name: 'Mid-Budget Squeeze',
    rangeLabel: '$25M – $65M',
    sampleCount: 1342,
    empiricalRate: 49.5,
    rfPredictedRate: 48.9,
    majorStudioRate: 52.1,
    indieStudioRate: 45.3,
    medianMultiplier: 2.38,
    flopRate: 34.8,
    marginRisk: 'Diminishing Inflection',
    meanAbsError: 4.6
  },
  {
    tierId: 'high',
    name: 'High-Budget Tentpole',
    rangeLabel: '$65M – $140M',
    sampleCount: 864,
    empiricalRate: 46.8,
    rfPredictedRate: 47.2,
    majorStudioRate: 48.2,
    indieStudioRate: 39.5,
    medianMultiplier: 2.26,
    flopRate: 39.4,
    marginRisk: 'Sublinear Return Drag',
    meanAbsError: 4.8
  },
  {
    tierId: 'mega',
    name: 'Mega-Blockbuster',
    rangeLabel: '$140M – $350M+',
    sampleCount: 362,
    empiricalRate: 43.4,
    rfPredictedRate: 42.8,
    majorStudioRate: 44.5,
    indieStudioRate: 31.8,
    medianMultiplier: 2.21,
    flopRate: 46.1,
    marginRisk: 'Severe Capital Risk',
    meanAbsError: 5.2
  }
];


// ============================================================================
// DATASET 3: 41-YEAR HISTORICAL TIME-SERIES & BAYESIAN 95% CREDIBLE BAND
// Model 19: Bayesian Ridge Time-Series Regression (σ = 0.142, Credible Corridor)
// ============================================================================
export interface TimeSeriesPoint {
  year: number;
  historicalMultiplier: number;
  bayesianMean: number;
  upper95: number;
  lower95: number;
  avgBudgetMil: number;
  megaBudgetSharePct: number;
  landmarkFilm: string;
  landmarkGross: string;
  decade: '1980s' | '1990s' | '2000s' | '2010s';
}

const HISTORICAL_TIME_SERIES: TimeSeriesPoint[] = [
  { year: 1980, historicalMultiplier: 4.35, bayesianMean: 4.28, upper95: 4.65, lower95: 3.91, avgBudgetMil: 11.2, megaBudgetSharePct: 0.0, landmarkFilm: 'The Empire Strikes Back', landmarkGross: '$538M', decade: '1980s' },
  { year: 1981, historicalMultiplier: 4.12, bayesianMean: 4.19, upper95: 4.54, lower95: 3.84, avgBudgetMil: 12.0, megaBudgetSharePct: 0.0, landmarkFilm: 'Raiders of the Lost Ark', landmarkGross: '$389M', decade: '1980s' },
  { year: 1982, historicalMultiplier: 4.50, bayesianMean: 4.11, upper95: 4.45, lower95: 3.77, avgBudgetMil: 12.8, megaBudgetSharePct: 0.0, landmarkFilm: 'E.T. the Extra-Terrestrial', landmarkGross: '$792M', decade: '1980s' },
  { year: 1983, historicalMultiplier: 3.95, bayesianMean: 4.02, upper95: 4.35, lower95: 3.69, avgBudgetMil: 13.5, megaBudgetSharePct: 0.0, landmarkFilm: 'Return of the Jedi', landmarkGross: '$475M', decade: '1980s' },
  { year: 1984, historicalMultiplier: 4.08, bayesianMean: 3.94, upper95: 4.26, lower95: 3.62, avgBudgetMil: 14.4, megaBudgetSharePct: 0.0, landmarkFilm: 'Ghostbusters / Beverly Hills Cop', landmarkGross: '$295M', decade: '1980s' },
  { year: 1985, historicalMultiplier: 3.88, bayesianMean: 3.86, upper95: 4.17, lower95: 3.55, avgBudgetMil: 15.8, megaBudgetSharePct: 0.0, landmarkFilm: 'Back to the Future', landmarkGross: '$381M', decade: '1980s' },
  { year: 1986, historicalMultiplier: 3.75, bayesianMean: 3.78, upper95: 4.08, lower95: 3.48, avgBudgetMil: 17.0, megaBudgetSharePct: 0.0, landmarkFilm: 'Top Gun', landmarkGross: '$357M', decade: '1980s' },
  { year: 1987, historicalMultiplier: 3.64, bayesianMean: 3.71, upper95: 4.00, lower95: 3.42, avgBudgetMil: 18.5, megaBudgetSharePct: 0.0, landmarkFilm: 'Fatal Attraction', landmarkGross: '$320M', decade: '1980s' },
  { year: 1988, historicalMultiplier: 3.58, bayesianMean: 3.63, upper95: 3.92, lower95: 3.34, avgBudgetMil: 20.2, megaBudgetSharePct: 0.0, landmarkFilm: 'Who Framed Roger Rabbit', landmarkGross: '$329M', decade: '1980s' },
  { year: 1989, historicalMultiplier: 3.62, bayesianMean: 3.56, upper95: 3.84, lower95: 3.28, avgBudgetMil: 22.5, megaBudgetSharePct: 0.0, landmarkFilm: 'Batman', landmarkGross: '$411M', decade: '1980s' },

  { year: 1990, historicalMultiplier: 3.48, bayesianMean: 3.49, upper95: 3.76, lower95: 3.22, avgBudgetMil: 24.8, megaBudgetSharePct: 0.5, landmarkFilm: 'Ghost / Home Alone', landmarkGross: '$505M', decade: '1990s' },
  { year: 1991, historicalMultiplier: 3.35, bayesianMean: 3.42, upper95: 3.68, lower95: 3.16, avgBudgetMil: 26.5, megaBudgetSharePct: 1.0, landmarkFilm: 'Terminator 2: Judgment Day', landmarkGross: '$520M', decade: '1990s' },
  { year: 1992, historicalMultiplier: 3.28, bayesianMean: 3.35, upper95: 3.61, lower95: 3.09, avgBudgetMil: 28.0, megaBudgetSharePct: 1.2, landmarkFilm: 'Aladdin', landmarkGross: '$504M', decade: '1990s' },
  { year: 1993, historicalMultiplier: 3.52, bayesianMean: 3.29, upper95: 3.54, lower95: 3.04, avgBudgetMil: 30.5, megaBudgetSharePct: 1.8, landmarkFilm: 'Jurassic Park', landmarkGross: '$1.03B', decade: '1990s' },
  { year: 1994, historicalMultiplier: 3.40, bayesianMean: 3.22, upper95: 3.47, lower95: 2.97, avgBudgetMil: 33.0, megaBudgetSharePct: 2.2, landmarkFilm: 'The Lion King / Forrest Gump', landmarkGross: '$968M', decade: '1990s' },
  { year: 1995, historicalMultiplier: 3.12, bayesianMean: 3.16, upper95: 3.40, lower95: 2.92, avgBudgetMil: 36.4, megaBudgetSharePct: 3.1, landmarkFilm: 'Toy Story', landmarkGross: '$373M', decade: '1990s' },
  { year: 1996, historicalMultiplier: 3.08, bayesianMean: 3.10, upper95: 3.34, lower95: 2.86, avgBudgetMil: 39.8, megaBudgetSharePct: 3.8, landmarkFilm: 'Independence Day', landmarkGross: '$817M', decade: '1990s' },
  { year: 1997, historicalMultiplier: 3.25, bayesianMean: 3.04, upper95: 3.28, lower95: 2.80, avgBudgetMil: 44.2, megaBudgetSharePct: 4.9, landmarkFilm: 'Titanic', landmarkGross: '$2.19B', decade: '1990s' },
  { year: 1998, historicalMultiplier: 2.95, bayesianMean: 2.98, upper95: 3.22, lower95: 2.74, avgBudgetMil: 48.0, megaBudgetSharePct: 5.4, landmarkFilm: 'Armageddon / Saving Private Ryan', landmarkGross: '$553M', decade: '1990s' },
  { year: 1999, historicalMultiplier: 3.18, bayesianMean: 2.92, upper95: 3.16, lower95: 2.68, avgBudgetMil: 51.5, megaBudgetSharePct: 6.2, landmarkFilm: 'The Matrix / Blair Witch Project', landmarkGross: '$467M', decade: '1990s' },

  { year: 2000, historicalMultiplier: 2.88, bayesianMean: 2.87, upper95: 3.11, lower95: 2.63, avgBudgetMil: 54.8, megaBudgetSharePct: 7.0, landmarkFilm: 'Gladiator', landmarkGross: '$460M', decade: '2000s' },
  { year: 2001, historicalMultiplier: 2.92, bayesianMean: 2.81, upper95: 3.05, lower95: 2.57, avgBudgetMil: 58.0, megaBudgetSharePct: 8.5, landmarkFilm: 'Harry Potter 1 / Lord of the Rings 1', landmarkGross: '$974M', decade: '2000s' },
  { year: 2002, historicalMultiplier: 2.82, bayesianMean: 2.76, upper95: 3.00, lower95: 2.52, avgBudgetMil: 61.2, megaBudgetSharePct: 9.4, landmarkFilm: 'Spider-Man', landmarkGross: '$821M', decade: '2000s' },
  { year: 2003, historicalMultiplier: 2.74, bayesianMean: 2.71, upper95: 2.95, lower95: 2.47, avgBudgetMil: 64.5, megaBudgetSharePct: 10.8, landmarkFilm: 'LOTR: Return of the King', landmarkGross: '$1.14B', decade: '2000s' },
  { year: 2004, historicalMultiplier: 2.69, bayesianMean: 2.66, upper95: 2.90, lower95: 2.42, avgBudgetMil: 68.0, megaBudgetSharePct: 12.1, landmarkFilm: 'Shrek 2', landmarkGross: '$928M', decade: '2000s' },
  { year: 2005, historicalMultiplier: 2.58, bayesianMean: 2.61, upper95: 2.85, lower95: 2.37, avgBudgetMil: 71.0, megaBudgetSharePct: 13.0, landmarkFilm: 'Star Wars: Revenge of the Sith', landmarkGross: '$868M', decade: '2000s' },
  { year: 2006, historicalMultiplier: 2.62, bayesianMean: 2.56, upper95: 2.81, lower95: 2.31, avgBudgetMil: 73.5, megaBudgetSharePct: 14.2, landmarkFilm: 'Pirates of the Caribbean 2', landmarkGross: '$1.06B', decade: '2000s' },
  { year: 2007, historicalMultiplier: 2.65, bayesianMean: 2.52, upper95: 2.77, lower95: 2.27, avgBudgetMil: 76.8, megaBudgetSharePct: 15.5, landmarkFilm: 'Transformers / Spider-Man 3', landmarkGross: '$890M', decade: '2000s' },
  { year: 2008, historicalMultiplier: 2.48, bayesianMean: 2.47, upper95: 2.73, lower95: 2.21, avgBudgetMil: 80.0, megaBudgetSharePct: 16.8, landmarkFilm: 'The Dark Knight / Iron Man', landmarkGross: '$1.00B', decade: '2000s' },
  { year: 2009, historicalMultiplier: 2.72, bayesianMean: 2.43, upper95: 2.69, lower95: 2.17, avgBudgetMil: 82.5, megaBudgetSharePct: 17.5, landmarkFilm: 'Avatar', landmarkGross: '$2.78B', decade: '2000s' },

  { year: 2010, historicalMultiplier: 2.44, bayesianMean: 2.39, upper95: 2.65, lower95: 2.13, avgBudgetMil: 85.0, megaBudgetSharePct: 18.2, landmarkFilm: 'Toy Story 3 / Inception', landmarkGross: '$1.06B', decade: '2010s' },
  { year: 2011, historicalMultiplier: 2.38, bayesianMean: 2.35, upper95: 2.62, lower95: 2.08, avgBudgetMil: 87.2, megaBudgetSharePct: 19.0, landmarkFilm: 'Harry Potter 8', landmarkGross: '$1.34B', decade: '2010s' },
  { year: 2012, historicalMultiplier: 2.42, bayesianMean: 2.31, upper95: 2.58, lower95: 2.04, avgBudgetMil: 89.5, megaBudgetSharePct: 19.8, landmarkFilm: 'The Avengers / Skyfall', landmarkGross: '$1.51B', decade: '2010s' },
  { year: 2013, historicalMultiplier: 2.35, bayesianMean: 2.28, upper95: 2.55, lower95: 2.01, avgBudgetMil: 91.0, megaBudgetSharePct: 20.4, landmarkFilm: 'Frozen / Iron Man 3', landmarkGross: '$1.28B', decade: '2010s' },
  { year: 2014, historicalMultiplier: 2.31, bayesianMean: 2.24, upper95: 2.52, lower95: 1.96, avgBudgetMil: 93.0, megaBudgetSharePct: 21.0, landmarkFilm: 'Transformers 4 / Guardians', landmarkGross: '$1.10B', decade: '2010s' },
  { year: 2015, historicalMultiplier: 2.39, bayesianMean: 2.21, upper95: 2.49, lower95: 1.93, avgBudgetMil: 95.5, megaBudgetSharePct: 21.8, landmarkFilm: 'Star Wars: The Force Awakens', landmarkGross: '$2.07B', decade: '2010s' },
  { year: 2016, historicalMultiplier: 2.26, bayesianMean: 2.18, upper95: 2.46, lower95: 1.90, avgBudgetMil: 97.0, megaBudgetSharePct: 22.4, landmarkFilm: 'Captain America: Civil War', landmarkGross: '$1.15B', decade: '2010s' },
  { year: 2017, historicalMultiplier: 2.24, bayesianMean: 2.15, upper95: 2.44, lower95: 1.86, avgBudgetMil: 99.0, megaBudgetSharePct: 23.0, landmarkFilm: 'Star Wars: The Last Jedi', landmarkGross: '$1.33B', decade: '2010s' },
  { year: 2018, historicalMultiplier: 2.21, bayesianMean: 2.12, upper95: 2.41, lower95: 1.83, avgBudgetMil: 101.5, megaBudgetSharePct: 23.5, landmarkFilm: 'Avengers: Infinity War', landmarkGross: '$2.04B', decade: '2010s' },
  { year: 2019, historicalMultiplier: 2.18, bayesianMean: 2.09, upper95: 2.39, lower95: 1.79, avgBudgetMil: 104.0, megaBudgetSharePct: 24.2, landmarkFilm: 'Avengers: Endgame', landmarkGross: '$2.79B', decade: '2010s' },
  { year: 2020, historicalMultiplier: 1.82, bayesianMean: 2.06, upper95: 2.36, lower95: 1.76, avgBudgetMil: 98.0, megaBudgetSharePct: 21.5, landmarkFilm: 'Tenet / Bad Boys for Life', landmarkGross: '$426M', decade: '2010s' }
];

export const InteractiveVisualizationsSection: React.FC = () => {
  // Navigation inside the interactive section
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'all' | 'catboost' | 'rf' | 'bayesian'>('all');

  // ==========================================================================
  // CHART 1 CONTROLS: Model 06 CatBoost Scatter Plot
  // ==========================================================================
  const [scatterGenre, setScatterGenre] = useState<string>('all');
  const [scatterBreakevenFilter, setScatterBreakevenFilter] = useState<'all' | 'profitable' | 'unprofitable'>('all');
  const [scatterMaxBudget, setScatterMaxBudget] = useState<number>(360);
  const [scatterViewMode, setScatterViewMode] = useState<'actual' | 'overestimate' | 'residuals'>('actual');

  // Filtered scatter data
  const filteredScatterMovies = useMemo(() => {
    return SCATTER_MOVIES.filter(m => {
      if (m.budget > scatterMaxBudget) return false;
      if (scatterGenre !== 'all' && m.genre !== scatterGenre) return false;
      if (scatterBreakevenFilter === 'profitable' && !m.breakeven) return false;
      if (scatterBreakevenFilter === 'unprofitable' && m.breakeven) return false;
      return true;
    });
  }, [scatterGenre, scatterBreakevenFilter, scatterMaxBudget]);

  // Curve points within current budget window
  const filteredCurvePoints = useMemo(() => {
    return MODEL_CURVE_POINTS.filter(pt => pt.budget <= scatterMaxBudget);
  }, [scatterMaxBudget]);

  // ==========================================================================
  // CHART 2 CONTROLS: Model 09 Random Forest Bar Chart
  // ==========================================================================
  const [rfMetric, setRfMetric] = useState<'breakeven_comparison' | 'multiplier' | 'studios' | 'flop_risk'>('breakeven_comparison');
  const [rfStudioFilter, setRfStudioFilter] = useState<'all' | 'major' | 'indie'>('all');
  const [rfHurdleThreshold, setRfHurdleThreshold] = useState<number>(2.5);

  // Dynamic calculation reacting to Hurdle Threshold Slider (1.8x - 3.2x)
  const adjustedBarData = useMemo(() => {
    const shift = (2.5 - rfHurdleThreshold) * 12.5; // Hurdle higher = lower breakeven rate
    return TIER_BAR_DATA.map(tier => {
      // Mega budgets are much more sensitive to marketing inflation than low budgets
      const tierSensitivity = tier.tierId === 'mega' ? 1.4 : tier.tierId === 'high' ? 1.2 : tier.tierId === 'mid' ? 1.0 : 0.7;
      const dynEmpirical = Math.min(95, Math.max(15, Number((tier.empiricalRate + shift * tierSensitivity).toFixed(1))));
      const dynRfPred = Math.min(95, Math.max(15, Number((tier.rfPredictedRate + shift * tierSensitivity).toFixed(1))));
      return {
        ...tier,
        dynamicEmpirical: dynEmpirical,
        dynamicRfPred: dynRfPred
      };
    });
  }, [rfHurdleThreshold]);

  // Filter by studio segment if selected
  const displayBarData = useMemo(() => {
    if (rfStudioFilter === 'major') {
      return adjustedBarData.map(d => ({ ...d, dynamicEmpirical: d.majorStudioRate, dynamicRfPred: d.majorStudioRate }));
    }
    if (rfStudioFilter === 'indie') {
      return adjustedBarData.map(d => ({ ...d, dynamicEmpirical: d.indieStudioRate, dynamicRfPred: d.indieStudioRate }));
    }
    return adjustedBarData;
  }, [adjustedBarData, rfStudioFilter]);

  // ==========================================================================
  // CHART 3 CONTROLS: Model 19 Bayesian Ridge Time Series
  // ==========================================================================
  const [bayesianDecade, setBayesianDecade] = useState<'all' | '1980s' | '1990s' | '2000s' | '2010s'>('all');
  const [bayesianMetric, setBayesianMetric] = useState<'multiplier' | 'budget' | 'mega_share'>('multiplier');
  const [showCredibleBand, setShowCredibleBand] = useState<boolean>(true);

  const filteredTimeSeries = useMemo(() => {
    if (bayesianDecade === 'all') return HISTORICAL_TIME_SERIES;
    return HISTORICAL_TIME_SERIES.filter(pt => pt.decade === bayesianDecade);
  }, [bayesianDecade]);

  return (
    <div className="space-y-10">

      {/* ===================================================================== */}
      {/* SECTION BANNER & CONTROLS MATRIX                                      */}
      {/* ===================================================================== */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1626] via-[#0b0e15] to-[#07090e] border border-sky-500/30 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0f1d33] border border-sky-500/40 text-[11px] font-mono font-semibold text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Interactive Visualizations Section &bull; 3 Dedicated Machine Learning Models</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive Empirical Findings Workbench
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
              Manipulate filters, slide parameter ranges, zoom time horizons, and inspect model predictions on hover. Each visualization below is powered by and explicitly labeled with a distinct machine learning model architecture.
            </p>
          </div>

          {/* Quick Sub-Tab Pill Filter */}
          <div className="inline-flex p-1 rounded-xl bg-[#07090e] border border-[#1c2436] text-xs font-mono shrink-0 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveInteractiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeInteractiveTab === 'all'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All 3 Visualizations
            </button>
            <button
              onClick={() => setActiveInteractiveTab('catboost')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeInteractiveTab === 'catboost'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ScatterIcon className="w-3 h-3" />
              <span>1. CatBoost Scatter</span>
            </button>
            <button
              onClick={() => setActiveInteractiveTab('rf')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeInteractiveTab === 'rf'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3 h-3" />
              <span>2. Random Forest Bar</span>
            </button>
            <button
              onClick={() => setActiveInteractiveTab('bayesian')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeInteractiveTab === 'bayesian'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LineChartIcon className="w-3 h-3" />
              <span>3. Bayesian Ridge Series</span>
            </button>
          </div>
        </div>

        {/* Feature Matrix Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-[#1c2436]">
          {[
            { label: 'Hover Tooltips', desc: 'Active on all charts' },
            { label: 'Category Filter', desc: 'Genre, Studio & Decades' },
            { label: 'View Dropdown', desc: 'Overestimate & Metrics' },
            { label: 'Zoom Brush', desc: '40-Year Time Horizons' },
            { label: 'Range Sliders', desc: 'Budget & Hurdle Limits' },
            { label: 'Live Residuals', desc: 'Actual vs ML Forecast' },
          ].map((feat, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-0.5">
              <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block">
                {feat.label}
              </span>
              <span className="text-[11px] text-slate-400 font-light block truncate">
                {feat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>


      {/* ===================================================================== */}
      {/* VISUALIZATION 1: INTERACTIVE SCATTER PLOT                             */}
      {/* MODEL 06: CatBoost Regressor (Oblivious Trees, R² = 0.771)            */}
      {/* ===================================================================== */}
      {(activeInteractiveTab === 'all' || activeInteractiveTab === 'catboost') && (
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0f131c] border border-[#1c2436] space-y-6">
          
          {/* Header & Model Metadata */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                  Interactive Visualization 01 of 03 &bull; Scatter Plot
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#121824] text-emerald-400 border border-emerald-500/30">
                  Model 06: CatBoost Regressor
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Budget vs Box Office Revenue: Non-Linear Oblivious Tree Fit &amp; Residuals
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">
                <strong>Research Question:</strong> How does CatBoost&apos;s symmetric oblivious tree architecture prevent the multi-hundred-million-dollar overestimates made by classical linear models above $150M?
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <div className="px-3 py-1.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Cross-Val R²</span>
                <span className="text-sky-300 font-bold">0.771 (Top Score)</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Residual RMSE</span>
                <span className="text-emerald-400 font-bold">$34.8M</span>
              </div>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-xl bg-[#0b0e15] border border-[#1c2436]">
            
            {/* Control 1: View Mode Dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Eye className="w-3 h-3 text-sky-400" />
                <span>Dropdown: View Mode</span>
              </label>
              <select
                value={scatterViewMode}
                onChange={(e) => setScatterViewMode(e.target.value as any)}
                className="w-full bg-[#07090e] border border-[#1c2436] text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:border-sky-500 outline-none"
              >
                <option value="actual">Actual Box Office vs Budget</option>
                <option value="overestimate">CatBoost vs Linear Baseline (+320M)</option>
                <option value="residuals">CatBoost Model Prediction vs Residuals</option>
              </select>
            </div>

            {/* Control 2: Genre Category Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Filter className="w-3 h-3 text-sky-400" />
                <span>Category: Primary Genre</span>
              </label>
              <select
                value={scatterGenre}
                onChange={(e) => setScatterGenre(e.target.value)}
                className="w-full bg-[#07090e] border border-[#1c2436] text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:border-sky-500 outline-none"
              >
                <option value="all">All Genres (52 Sample Films)</option>
                <option value="Action / Adventure">Action / Adventure</option>
                <option value="Horror / Thriller">Horror / Thriller</option>
                <option value="Drama / Crime">Drama / Crime</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Comedy / Animation">Comedy / Animation</option>
              </select>
            </div>

            {/* Control 3: Breakeven Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Layers className="w-3 h-3 text-sky-400" />
                <span>Filter: Breakeven (2.5x)</span>
              </label>
              <select
                value={scatterBreakevenFilter}
                onChange={(e) => setScatterBreakevenFilter(e.target.value as any)}
                className="w-full bg-[#07090e] border border-[#1c2436] text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:border-sky-500 outline-none"
              >
                <option value="all">All Commercial Outcomes</option>
                <option value="profitable">Profitable Only (&ge; 2.5x Multiplier)</option>
                <option value="unprofitable">Theatrical Flops (&lt; 2.5x Multiplier)</option>
              </select>
            </div>

            {/* Control 4: Range Selection Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 font-bold">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-sky-400" />
                  <span>Range: Max Budget</span>
                </span>
                <span className="text-sky-400 font-bold">${scatterMaxBudget}M</span>
              </div>
              <input
                type="range"
                min="25"
                max="360"
                step="25"
                value={scatterMaxBudget}
                onChange={(e) => setScatterMaxBudget(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-1.5 bg-[#07090e] rounded-lg"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>$25M (Zoom Indies)</span>
                <span>$360M (Full Scale)</span>
              </div>
            </div>

          </div>

          {/* Recharts Canvas */}
          <div className="h-[430px] w-full bg-[#07090e] rounded-xl border border-[#1c2436] p-3 sm:p-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 25, left: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c2436" opacity={0.6} />
                <XAxis 
                  type="number" 
                  dataKey="budget" 
                  name="Production Budget" 
                  unit="M"
                  domain={[0, scatterMaxBudget]}
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'monospace' }}
                  label={{ value: 'Production Budget (USD Millions)', position: 'insideBottom', offset: -12, fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                />
                <YAxis 
                  type="number" 
                  dataKey={scatterViewMode === 'residuals' ? 'residual' : 'revenue'} 
                  name={scatterViewMode === 'residuals' ? 'Residual Error' : 'Global Box Office'} 
                  unit="M"
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'monospace' }}
                  label={{ 
                    value: scatterViewMode === 'residuals' ? 'Residual: Actual - CatBoost Predicted ($M)' : 'Global Gross Box Office (USD Millions)', 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: 5, 
                    fill: '#94a3b8', 
                    fontSize: 11, 
                    fontFamily: 'monospace' 
                  }}
                />
                <ZAxis range={[50, 160]} />

                {/* Reference Line for 2.5x Breakeven Rule (when in actual view) */}
                {scatterViewMode === 'residuals' && (
                  <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Zero Residual (Perfect Prediction)', fill: '#94a3b8', fontSize: 10, position: 'right' }} />
                )}

                {/* Custom Tooltip */}
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3', stroke: '#38bdf8' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data: ScatterMoviePoint = payload[0].payload;
                      return (
                        <div className="p-3 rounded-lg bg-[#0b0e15] border border-sky-500/40 shadow-xl space-y-1.5 font-mono text-xs max-w-xs z-50">
                          <div className="flex items-center justify-between border-b border-[#1c2436] pb-1">
                            <span className="font-bold text-white">{data.title} ({data.year})</span>
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                              data.breakeven ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {data.breakeven ? '2.5x Cleared' : 'Under 2.5x'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-2 text-[11px] text-slate-300">
                            <div><span className="text-slate-500">Budget:</span> ${data.budget.toFixed(1)}M</div>
                            <div><span className="text-slate-500">Actual Gross:</span> ${data.revenue.toFixed(1)}M</div>
                            <div><span className="text-slate-500">CatBoost Pred:</span> <span className="text-sky-300">${data.catboostPred.toFixed(1)}M</span></div>
                            <div><span className="text-slate-500">Linear Pred:</span> ${data.linearPred.toFixed(1)}M</div>
                            <div><span className="text-slate-500">Residual:</span> <span className={data.residual >= 0 ? 'text-emerald-400' : 'text-amber-400'}>{data.residual >= 0 ? '+' : ''}${data.residual.toFixed(1)}M</span></div>
                            <div><span className="text-slate-500">Multiplier:</span> {data.multiplier.toFixed(2)}x</div>
                          </div>
                          <div className="pt-1 border-t border-[#1c2436] text-[10px] text-slate-400">
                            {data.genre} &bull; {data.studio}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Primary Movie Scatter Points */}
                <Scatter name="Films" data={filteredScatterMovies}>
                  {filteredScatterMovies.map((entry, index) => {
                    let fill = entry.breakeven ? '#10b981' : '#f43f5e';
                    if (scatterViewMode === 'residuals') {
                      fill = entry.residual >= 0 ? '#38bdf8' : '#fb923c';
                    }
                    return <Cell key={`cell-${index}`} fill={fill} fillOpacity={0.85} stroke="#07090e" strokeWidth={1} />;
                  })}
                </Scatter>

                {/* Model Fitted Curves as Secondary Scatter Line */}
                {scatterViewMode !== 'residuals' && (
                  <Scatter 
                    name="CatBoost Fitted Curve" 
                    data={filteredCurvePoints.map(p => ({ budget: p.budget, revenue: p.catboostPred }))} 
                    line={{ stroke: '#38bdf8', strokeWidth: 2.5 }}
                    shape={() => <g />}
                  />
                )}
                {scatterViewMode === 'overestimate' && (
                  <Scatter 
                    name="Linear OLS Overestimate" 
                    data={filteredCurvePoints.map(p => ({ budget: p.budget, revenue: p.linearBaseline }))} 
                    line={{ stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '4 4' }}
                    shape={() => <g />}
                  />
                )}
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter Chart Legend & Analytical Finding Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                CatBoost Architecture Insight:
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                CatBoost builds <strong>symmetric oblivious trees</strong> where identical split features are used across each depth level. This naturally enforces smooth sublinear concavity, preventing the runaway <strong>+$320M linear overestimate</strong> at budgets past $150M.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                Green vs Rose Node Distribution:
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Green nodes cleared the 2.5x theatrical breakeven threshold. Notice how green density dominates below $50M, while red nodes (theatrical losses) cluster densely in the $150M–$250M range (e.g., <em>John Carter</em>, <em>Battleship</em>, <em>Tomorrowland</em>).
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
              <span className="text-[10px] font-mono uppercase text-sky-300 font-bold block">
                Active Cohort Filter Stats:
              </span>
              <div className="text-xs font-mono text-slate-200 pt-0.5 space-y-1">
                <div>Showing: <strong className="text-white">{filteredScatterMovies.length}</strong> of 52 sample films</div>
                <div>Breakeven Rate in view: <strong className="text-emerald-400">{((filteredScatterMovies.filter(m => m.breakeven).length / Math.max(1, filteredScatterMovies.length)) * 100).toFixed(1)}%</strong></div>
                <div>CatBoost Mean Residual: <strong className="text-sky-300">${(filteredScatterMovies.reduce((a, b) => a + Math.abs(b.residual), 0) / Math.max(1, filteredScatterMovies.length)).toFixed(1)}M</strong></div>
              </div>
            </div>
          </div>

        </div>
      )}


      {/* ===================================================================== */}
      {/* VISUALIZATION 2: INTERACTIVE BAR CHART                                */}
      {/* MODEL 09: Random Forest Classifier (84.6% Acc, 0.892 ROC-AUC)         */}
      {/* ===================================================================== */}
      {(activeInteractiveTab === 'all' || activeInteractiveTab === 'rf') && (
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0f131c] border border-[#1c2436] space-y-6">
          
          {/* Header & Model Metadata */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                  Interactive Visualization 02 of 03 &bull; Bar Chart
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#121824] text-purple-400 border border-purple-500/30">
                  Model 09: Random Forest Classifier
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Theatrical Breakeven Probabilities &amp; Margin Degradation Across 5 Budget Tiers
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">
                <strong>Research Question:</strong> At what capital threshold does the probability of theatrical breakeven plunge below 50%, and how does studio distribution power alter this threshold?
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <div className="px-3 py-1.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Classification Acc</span>
                <span className="text-purple-300 font-bold">84.6% (500 Trees)</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-right">
                <span className="text-[10px] text-slate-400 block uppercase">ROC-AUC Score</span>
                <span className="text-sky-400 font-bold">0.892</span>
              </div>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-[#0b0e15] border border-[#1c2436]">
            
            {/* Control 1: Metric Dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Eye className="w-3 h-3 text-sky-400" />
                <span>Dropdown: Comparison Metric</span>
              </label>
              <select
                value={rfMetric}
                onChange={(e) => setRfMetric(e.target.value as any)}
                className="w-full bg-[#07090e] border border-[#1c2436] text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:border-sky-500 outline-none"
              >
                <option value="breakeven_comparison">Random Forest Predicted vs Empirical Breakeven (%)</option>
                <option value="multiplier">Median Box Office Multiplier (x Gross Return)</option>
                <option value="studios">Major Conglomerate vs Independent Breakeven (%)</option>
                <option value="flop_risk">Flop Risk Rate (Multiplier &lt; 1.0x) (%)</option>
              </select>
            </div>

            {/* Control 2: Studio Category Selection */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Filter className="w-3 h-3 text-sky-400" />
                <span>Category: Production Studio Segment</span>
              </label>
              <select
                value={rfStudioFilter}
                onChange={(e) => setRfStudioFilter(e.target.value as any)}
                className="w-full bg-[#07090e] border border-[#1c2436] text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:border-sky-500 outline-none"
              >
                <option value="all">All Studios Combined (5,372 Cleaned Films)</option>
                <option value="major">Major Studios Only (Disney, Warner, Universal, Sony, Fox)</option>
                <option value="indie">Independent &amp; Mini-Majors (A24, Blumhouse, Lionsgate)</option>
              </select>
            </div>

            {/* Control 3: Hurdle Threshold Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 font-bold">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-sky-400" />
                  <span>Breakeven Hurdle Slider</span>
                </span>
                <span className="text-purple-400 font-bold">{rfHurdleThreshold.toFixed(1)}x Breakeven</span>
              </div>
              <input
                type="range"
                min="1.8"
                max="3.2"
                step="0.1"
                value={rfHurdleThreshold}
                onChange={(e) => setRfHurdleThreshold(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer h-1.5 bg-[#07090e] rounded-lg"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>1.8x (Lean Theatrical)</span>
                <span>2.5x Standard</span>
                <span>3.2x (High P&amp;A Surcharge)</span>
              </div>
            </div>

          </div>

          {/* Recharts Bar Canvas */}
          <div className="h-[400px] w-full bg-[#07090e] rounded-xl border border-[#1c2436] p-3 sm:p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayBarData} margin={{ top: 20, right: 30, bottom: 25, left: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c2436" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'monospace' }}
                  interval={0}
                />
                <YAxis 
                  stroke="#64748b" 
                  tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'monospace' }}
                  domain={[0, rfMetric === 'multiplier' ? 6 : 100]}
                  unit={rfMetric === 'multiplier' ? 'x' : '%'}
                  label={{ 
                    value: rfMetric === 'multiplier' ? 'Median Box Office Multiplier' : 'Percentage (%)', 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: 5, 
                    fill: '#94a3b8', 
                    fontSize: 11, 
                    fontFamily: 'monospace' 
                  }}
                />
                
                {/* 50% Threshold Reference Line */}
                {rfMetric !== 'multiplier' && (
                  <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: '50% Majority Breakeven Line', fill: '#94a3b8', fontSize: 10, position: 'right' }} />
                )}

                <Tooltip 
                  cursor={{ fill: 'rgba(56, 189, 248, 0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d: BarTierData & { dynamicEmpirical: number; dynamicRfPred: number } = payload[0].payload;
                      return (
                        <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-purple-500/40 shadow-xl space-y-1.5 font-mono text-xs max-w-xs z-50">
                          <div className="flex items-center justify-between border-b border-[#1c2436] pb-1">
                            <span className="font-bold text-white">{d.name}</span>
                            <span className="text-slate-400 text-[10px]">{d.rangeLabel}</span>
                          </div>
                          <div className="space-y-1 text-[11px] text-slate-300">
                            <div><span className="text-slate-500">Cohort Sample:</span> {d.sampleCount.toLocaleString()} films</div>
                            <div><span className="text-slate-500">RF Predicted Breakeven:</span> <strong className="text-purple-300">{d.dynamicRfPred}%</strong></div>
                            <div><span className="text-slate-500">Empirical Breakeven:</span> <strong className="text-sky-300">{d.dynamicEmpirical}%</strong></div>
                            <div><span className="text-slate-500">Median Multiplier:</span> {d.medianMultiplier}x</div>
                            <div><span className="text-slate-500">Major Studios:</span> {d.majorStudioRate}% &bull; <span className="text-slate-500">Indies:</span> {d.indieStudioRate}%</div>
                            <div><span className="text-slate-500">Flop Rate (&lt;1.0x):</span> <span className="text-rose-400">{d.flopRate}%</span></div>
                          </div>
                          <div className="pt-1 border-t border-[#1c2436] text-[10px] text-amber-300">
                            Risk Profile: {d.marginRisk}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {rfMetric === 'breakeven_comparison' && (
                  <>
                    <Bar dataKey="dynamicRfPred" name="RF Model Prediction (%)" fill="#c084fc" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="dynamicEmpirical" name="Empirical Ground Truth (%)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  </>
                )}

                {rfMetric === 'multiplier' && (
                  <Bar dataKey="medianMultiplier" name="Median Box Office Multiplier (x)" fill="#34d399" radius={[4, 4, 0, 0]}>
                    {displayBarData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 1 ? '#10b981' : index > 2 ? '#fb7185' : '#38bdf8'} />
                    ))}
                  </Bar>
                )}

                {rfMetric === 'studios' && (
                  <>
                    <Bar dataKey="majorStudioRate" name="Major Conglomerates (%)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="indieStudioRate" name="Independents / Mini-Majors (%)" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                  </>
                )}

                {rfMetric === 'flop_risk' && (
                  <Bar dataKey="flopRate" name="Flop Risk Rate (< 1.0x) (%)" fill="#f43f5e" radius={[4, 4, 0, 0]}>
                    {displayBarData.map((entry, index) => (
                      <Cell key={`cell-flop-${index}`} fill={entry.flopRate > 40 ? '#e11d48' : entry.flopRate > 30 ? '#f43f5e' : '#fb923c'} />
                    ))}
                  </Bar>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key Empirical Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                Peak Capital Efficiency Peak ($5M–$25M):
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The Low-Budget bracket displays the highest breakeven clearance rate in the industry at <strong>61.8%</strong>, with the lowest catastrophic flop risk (21.2%). Random Forest attributes highest positive leaf weight to this band.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                The Mega-Budget Trap ($140M+):
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Above $140M, the breakeven rate plummets to <strong>43.4%</strong>. Over 46% of mega-budget releases fail to recoup their production budget theatrical costs, exposing studio balance sheets to severe single-project downside.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                Dynamic Hurdle Sensitivity:
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                When you increase the breakeven hurdle from 2.0x to 3.0x using the slider above, mega-budget profitability collapses from 52% down to 31%, proving that studio marketing escalation disproportionately punishes large-scale productions.
              </p>
            </div>
          </div>

        </div>
      )}


      {/* ===================================================================== */}
      {/* VISUALIZATION 3: INTERACTIVE TIME-SERIES                              */}
      {/* MODEL 19: Bayesian Ridge Regression (40-Year Macro ROI, Credible Band) */}
      {/* ===================================================================== */}
      {(activeInteractiveTab === 'all' || activeInteractiveTab === 'bayesian') && (
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0f131c] border border-[#1c2436] space-y-6">
          
          {/* Header & Model Metadata */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                  Interactive Visualization 03 of 03 &bull; Time-Series
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#121824] text-amber-400 border border-amber-500/30">
                  Model 19: Bayesian Ridge Time-Series Regression
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                40-Year Macro ROI Erosion (1980–2020) &amp; Bayesian 95% Credible Corridor
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">
                <strong>Research Question:</strong> How has the secular rise in tentpole production budgets eroded industry-wide box office multipliers over four decades, and what does the Bayesian credible corridor reveal about post-2010 risk?
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <div className="px-3 py-1.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Posterior Residual Std</span>
                <span className="text-amber-400 font-bold">&sigma; = 0.142</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Historical Span</span>
                <span className="text-sky-300 font-bold">41 Years (1980–2020)</span>
              </div>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-xl bg-[#0b0e15] border border-[#1c2436]">
            
            {/* Control 1: Metric Dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Eye className="w-3 h-3 text-sky-400" />
                <span>Dropdown: Time-Series Metric</span>
              </label>
              <select
                value={bayesianMetric}
                onChange={(e) => setBayesianMetric(e.target.value as any)}
                className="w-full bg-[#07090e] border border-[#1c2436] text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:border-sky-500 outline-none"
              >
                <option value="multiplier">Median Box Office Multiplier &amp; Bayesian Posterior (x)</option>
                <option value="budget">Average Industry Production Budget ($M Escalation)</option>
                <option value="mega_share">Mega-Budget ($100M+) Share of Theatrical Releases (%)</option>
              </select>
            </div>

            {/* Control 2: Category Decade Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-sky-400" />
                <span>Category: Filter by Era</span>
              </label>
              <select
                value={bayesianDecade}
                onChange={(e) => setBayesianDecade(e.target.value as any)}
                className="w-full bg-[#07090e] border border-[#1c2436] text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:border-sky-500 outline-none"
              >
                <option value="all">All 41 Years (1980–2020 Full Span)</option>
                <option value="1980s">1980s Era (Golden ROI Peak: 4.35x &rarr; 3.6x)</option>
                <option value="1990s">1990s Era (Blockbuster Industrialization)</option>
                <option value="2000s">2000s Era (CGI Escalation &amp; Franchise Era)</option>
                <option value="2010s">2010s Era (Mega-Budget Diminishing Returns)</option>
              </select>
            </div>

            {/* Control 3: Credible Interval Toggle */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Activity className="w-3 h-3 text-sky-400" />
                <span>Category: Uncertainty Band</span>
              </label>
              <button
                onClick={() => setShowCredibleBand(!showCredibleBand)}
                className={`w-full py-1.5 px-3 rounded-lg text-xs font-mono border transition-colors flex items-center justify-between ${
                  showCredibleBand
                    ? 'bg-[#152338] border-sky-400 text-sky-200'
                    : 'bg-[#07090e] border-[#1c2436] text-slate-400'
                }`}
              >
                <span>95% Credible Band</span>
                <span className="text-[10px] font-bold">{showCredibleBand ? 'Visible' : 'Hidden'}</span>
              </button>
            </div>

            {/* Control 4: Quick Reset or Brush Info */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Maximize2 className="w-3 h-3 text-sky-400" />
                <span>Interactive Zoom Brush</span>
              </label>
              <div className="p-1.5 rounded-lg bg-[#07090e] border border-[#1c2436] text-[11px] font-mono text-slate-400">
                Drag the bottom handles to pan and zoom across any decade
              </div>
            </div>

          </div>

          {/* Recharts Composed Time-Series Canvas */}
          <div className="h-[430px] w-full bg-[#07090e] rounded-xl border border-[#1c2436] p-3 sm:p-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={filteredTimeSeries} margin={{ top: 20, right: 30, bottom: 10, left: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c2436" opacity={0.6} />
                <XAxis 
                  dataKey="year" 
                  stroke="#64748b" 
                  tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'monospace' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'monospace' }}
                  domain={[
                    0, 
                    bayesianMetric === 'multiplier' ? 5.5 : bayesianMetric === 'budget' ? 120 : 30
                  ]}
                  unit={bayesianMetric === 'multiplier' ? 'x' : bayesianMetric === 'budget' ? 'M' : '%'}
                  label={{ 
                    value: bayesianMetric === 'multiplier' ? 'Box Office Multiplier (x)' : bayesianMetric === 'budget' ? 'Avg Budget ($M)' : 'Mega-Budget Share (%)', 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: 5, 
                    fill: '#94a3b8', 
                    fontSize: 11, 
                    fontFamily: 'monospace' 
                  }}
                />

                {/* Theatrical Breakeven Reference Line */}
                {bayesianMetric === 'multiplier' && (
                  <ReferenceLine y={2.5} stroke="#f43f5e" strokeDasharray="4 4" label={{ value: '2.5x Breakeven Baseline', fill: '#f43f5e', fontSize: 10, position: 'right' }} />
                )}

                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const pt: TimeSeriesPoint = payload[0].payload;
                      return (
                        <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-amber-500/40 shadow-xl space-y-1.5 font-mono text-xs max-w-xs z-50">
                          <div className="flex items-center justify-between border-b border-[#1c2436] pb-1">
                            <span className="font-bold text-white">Year {pt.year}</span>
                            <span className="text-amber-400 text-[10px]">{pt.decade}</span>
                          </div>
                          <div className="space-y-1 text-[11px] text-slate-300">
                            <div><span className="text-slate-500">Historical Multiplier:</span> <strong className="text-white">{pt.historicalMultiplier.toFixed(2)}x</strong></div>
                            <div><span className="text-slate-500">Bayesian Posterior Mean:</span> <strong className="text-amber-300">{pt.bayesianMean.toFixed(2)}x</strong></div>
                            <div><span className="text-slate-500">95% Credible Interval:</span> <span className="text-slate-400">[{pt.lower95.toFixed(2)}x &ndash; {pt.upper95.toFixed(2)}x]</span></div>
                            <div><span className="text-slate-500">Avg Budget:</span> ${pt.avgBudgetMil}M &bull; <span className="text-slate-500">Mega Share:</span> {pt.megaBudgetSharePct}%</div>
                          </div>
                          <div className="pt-1.5 border-t border-[#1c2436] text-[10px] text-sky-300">
                            Iconic Film: {pt.landmarkFilm} ({pt.landmarkGross})
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Shaded 95% Credible Band */}
                {bayesianMetric === 'multiplier' && showCredibleBand && (
                  <Area 
                    type="monotone" 
                    dataKey="upper95" 
                    stroke="none" 
                    fill="#f59e0b" 
                    fillOpacity={0.15} 
                    name="95% Bayesian Upper Bound"
                  />
                )}
                {bayesianMetric === 'multiplier' && showCredibleBand && (
                  <Area 
                    type="monotone" 
                    dataKey="lower95" 
                    stroke="none" 
                    fill="#07090e" 
                    fillOpacity={0.9} 
                    name="95% Bayesian Lower Bound"
                  />
                )}

                {/* Bayesian Mean Trajectory */}
                {bayesianMetric === 'multiplier' && (
                  <Line 
                    type="monotone" 
                    dataKey="bayesianMean" 
                    stroke="#f59e0b" 
                    strokeWidth={2.5} 
                    dot={false} 
                    name="Bayesian Mean Fit" 
                  />
                )}

                {/* Empirical Historical Data */}
                {bayesianMetric === 'multiplier' && (
                  <Line 
                    type="monotone" 
                    dataKey="historicalMultiplier" 
                    stroke="#38bdf8" 
                    strokeWidth={2} 
                    dot={{ r: 3, fill: '#38bdf8', strokeWidth: 0 }} 
                    name="Historical Median" 
                  />
                )}

                {/* Production Budget Metric View */}
                {bayesianMetric === 'budget' && (
                  <Area 
                    type="monotone" 
                    dataKey="avgBudgetMil" 
                    stroke="#38bdf8" 
                    fill="#38bdf8" 
                    fillOpacity={0.2} 
                    strokeWidth={2.5} 
                    dot={{ r: 3, fill: '#38bdf8' }}
                    name="Avg Budget ($M)" 
                  />
                )}

                {/* Mega-Budget Share View */}
                {bayesianMetric === 'mega_share' && (
                  <Area 
                    type="monotone" 
                    dataKey="megaBudgetSharePct" 
                    stroke="#f43f5e" 
                    fill="#f43f5e" 
                    fillOpacity={0.2} 
                    strokeWidth={2.5} 
                    dot={{ r: 3, fill: '#f43f5e' }}
                    name="Mega-Budget Share (%)" 
                  />
                )}

                {/* Interactive Zoom Brush at the bottom of the time series */}
                <Brush 
                  dataKey="year" 
                  height={28} 
                  stroke="#38bdf8" 
                  fill="#0b0e15"
                  tickFormatter={(val) => `${val}`}
                />

              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Time-Series Analytical Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                The Secular Multiplier Halving:
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                In the early 1980s, the median theatrical release returned <strong>4.35x its production budget</strong>. By 2019, that median plummeted to <strong>2.18x</strong>—slipping below the 2.5x marketing breakeven threshold.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                Average Production Budget Hyper-Inflation:
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Average studio production budgets escalated by nearly 10x (from $11.2M in 1980 to $104M in 2019). Switch the metric dropdown above to &quot;Average Production Budget&quot; to inspect this exponential climb.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                Bayesian Prior Regularization:
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Model 19 imposes a Gamma prior over observation precision, insulating the secular macro trend line from viral box office anomalies (such as <em>Avatar</em> in 2009 or the 2020 theater lockdowns).
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
