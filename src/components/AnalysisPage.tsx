import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  TrendingDown, 
  Building2, 
  ExternalLink, 
  Sparkles, 
  Database, 
  Cpu, 
  ChevronLeft, 
  ChevronRight, 
  Target, 
  LineChart, 
  Network, 
  Clock, 
  Calendar, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Table, 
  Sliders, 
  Activity, 
  Boxes, 
  Code
} from 'lucide-react';

// ============================================================================
// DATA INTERFACES
// ============================================================================
export interface FindingItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: 'relationships' | 'comparisons' | 'trends' | 'correlations';
  categoryLabel: string;
  imageSrc: string;
  researchQuestion: string;
  bottomLine: string;
  observation: string;
  interpretation: string;
  variables: string[];
  findings: string[];
  icon: React.ReactNode;
}

export interface RedesignItem {
  id: string;
  number: string;
  findingTitle: string;
  shortTitle: string;
  originalId: string;
  originalTitle: string;
  originalImage: string;
  originalLimitations: string;
  redesignedImage: string;
  redesignedChartType: string;
  redesignedBreakthrough: string;
  bottomLine: string;
  improvements: {
    chartType: string;
    title: string;
    labels: string;
    scale: string;
    legend: string;
    annotation: string;
    layout: string;
    visualHierarchy: string;
    accessibility: string;
  };
}

export interface ModelItem {
  id: string;
  name: string;
  shortName: string;
  category: 'linear_kernel' | 'ensemble' | 'deep_learning' | 'econometric';
  categoryLabel: string;
  tagline: string;
  badge: string;
  status: 'active' | 'benchmark';
  architecture: string;
  primaryMetric: { label: string; value: string };
  secondaryMetric: { label: string; value: string };
  bestFitRole: string;
  keyInsights: string[];
  icon: React.ReactNode;
}

export interface DiagnosticItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  imageSrc: string;
  researchQuestion: string;
  bottomLine: string;
  observation: string;
  interpretation: string;
  dimension: string;
  metric: string;
}

interface AnalysisPageProps {
  onNavigateToSql?: () => void;
  onNavigateToCleaning?: () => void;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  onNavigateToSql,
  onNavigateToCleaning
}) => {
  // Main section tab
  const [activeTab, setActiveTab] = useState<'findings' | 'redesigns' | 'models'>('findings');

  // Finding section state
  const [findingCategory, setFindingCategory] = useState<'all' | 'relationships' | 'comparisons' | 'trends' | 'correlations'>('all');
  const [currentFindingIndex, setCurrentFindingIndex] = useState<number>(0);

  // Redesign section state
  const [currentRedesignIndex, setCurrentRedesignIndex] = useState<number>(0);
  const [redesignViewMode, setRedesignViewMode] = useState<'comparison' | 'redesign' | 'original'>('comparison');

  // Models section state
  const [modelSubView, setModelSubView] = useState<'matrix' | 'explorer' | 'analysis'>('matrix');
  const [selectedModelCategory, setSelectedModelCategory] = useState<'all' | 'linear_kernel' | 'ensemble' | 'deep_learning' | 'econometric'>('all');
  const [selectedModelId, setSelectedModelId] = useState<string>('catboost');
  const [currentDiagnosticIndex, setCurrentDiagnosticIndex] = useState<number>(0);

  // ==========================================================================
  // 1. EXPLORATORY FINDINGS DATA (ASSIGNMENT 5)
  // ==========================================================================
  const findingsList: FindingItem[] = [
    {
      id: 'eda1',
      number: '01',
      title: 'Statistical Feature Engineering: Budget & Revenue Log-Normal Skew',
      shortTitle: 'Distribution Normalization',
      category: 'correlations',
      categoryLabel: 'Correlations & Distributions',
      imageSrc: '/charts/eda1_distribution_histograms.png',
      researchQuestion: 'How are budgets and revenues distributed across the 45,000+ films?',
      bottomLine: 'Movie finances follow power-law distributions. A log10 transform restores Gaussian bell curves ($20M median budget, $50M median gross) to prevent blockbuster outliers from breaking ML models.',
      observation: 'Raw budgets and revenues span 5 orders of magnitude ($10k to $2.8B). Linear histograms crush 93.4% of films into the first bin; log10 scaling normalizes both distributions symmetrically.',
      interpretation: 'Film economics are governed by extreme power laws: thousands of small films compete for screens while a tiny fraction of blockbusters capture the majority of global box office revenue.',
      variables: ['budget (log10)', 'revenue (log10)', 'skewness', 'median'],
      findings: [
        'Extreme Power Law: Box office spans $10k micro-budgets to $2.8B mega-tentpoles.',
        'Log Normalization: Restores Gaussian symmetry around $20M budget and $50M gross.',
        'Machine Learning Rule: Models must train on log-scaled features to prevent coefficient distortion.'
      ],
      icon: <BarChart3 className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda2',
      number: '02',
      title: 'Empirical Correlation Matrix: Budget vs Box Office vs ROI',
      shortTitle: 'Feature Correlation Matrix',
      category: 'correlations',
      categoryLabel: 'Correlations & Matrix',
      imageSrc: '/charts/eda2_correlation_matrix.png',
      researchQuestion: 'Which variables correlate with revenue and profitability across the dataset?',
      bottomLine: 'Budget strongly correlates with revenue (r = +0.72) but shows zero or negative correlation with ROI multiplier (r = -0.06). Spending more money buys scale, not profit percentage.',
      observation: 'Worldwide gross correlates strongly with production budget (0.72) and vote count (0.78). However, ROI multiplier is uncorrelated with budget (-0.06) and popularity.',
      interpretation: 'High budgets expand gross revenue volume but dilute return per dollar invested, confirming that capital scale does not buy commercial efficiency.',
      variables: ['budget', 'revenue', 'return_multiplier', 'vote_count', 'runtime'],
      findings: [
        'Scale Decoupling: Budget correlates with gross (r = 0.72) but not ROI (r = -0.06).',
        'Audience Engagement: Vote count (r = 0.78) serves as the strongest proxy for theatrical reach.',
        'Runtime Independence: Film duration shows minimal linear correlation with commercial profitability.'
      ],
      icon: <Network className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda3',
      number: '03',
      title: 'Box Office Saturation: Production Budget vs. Worldwide Gross Revenue',
      shortTitle: 'Budget vs Revenue Saturation',
      category: 'relationships',
      categoryLabel: 'Relationships',
      imageSrc: '/charts/eda3_budget_vs_revenue_scatter.png',
      researchQuestion: 'How does worldwide box office scale as production budget increases?',
      bottomLine: 'Box office revenue scales with a sublinear power-law exponent of 0.72 (< 1.0). Doubling production budget yields only +64% box office, creating a high-budget deficit trap past $150M.',
      observation: 'The revenue curve flattens drastically past $100M. Films under $25M regularly exceed 5x-10x multipliers; films above $150M cluster near or below the 2.5x theatrical breakeven line.',
      interpretation: 'Audience demand has finite market limits. Doubling CGI or star salaries cannot double cinema attendance, causing returns to hit an empirical ceiling.',
      variables: ['production_budget', 'worldwide_gross', 'sublinear_exponent = 0.72'],
      findings: [
        'Sublinear Scaling: Exponent of 0.72 confirms diminishing returns on capital.',
        'Market Saturation: Theatrical gross flattens beyond $100M while production costs rise linearly.',
        'Breakeven Compression: Mega-budgets compress profit margins, increasing flop severity.'
      ],
      icon: <Target className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda4',
      number: '04',
      title: 'The Diminishing Returns Threshold: Capital Yield by Budget Tier',
      shortTitle: 'Budget Tier Efficiency',
      category: 'comparisons',
      categoryLabel: 'Comparisons',
      imageSrc: '/charts/eda4_budget_tier_diminishing.png',
      researchQuestion: 'At what budget tier does median return fall below the 2.5x breakeven line?',
      bottomLine: 'Micro-budgets lead at a 4.82x median return (90% breakeven rate). Once budgets surpass $25M, median yield drops to 2.38x—crossing below breakeven and proving diminishing returns.',
      observation: 'Micro (<$5M) returns 4.82x; Low ($5M–$25M) returns 3.12x; Moderate ($25M–$65M) drops to 2.38x; Big Budget ($65M–$150M) falls to 2.05x; Blockbuster ($150M+) yields only 1.88x.',
      interpretation: 'The structural inflection point of commercial cinema lies at $25M–$45M. Past this threshold, capital is spent on diminishing overhead rather than narrative value.',
      variables: ['budget_tier', 'median_multiplier', 'iqr_spread', 'breakeven_threshold = 2.5x'],
      findings: [
        'Micro-Budget Dominance: Sub-$5M films deliver a 4.82x median return.',
        'The $25M Crossover: Return drops below 2.5x breakeven once budgets cross $25M.',
        'Blockbuster Capital Bleed: $150M+ films average 1.88x, relying heavily on secondary streaming windows.'
      ],
      icon: <TrendingDown className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda5',
      number: '05',
      title: 'Film Runtime Optimization: 90–120 Minute Sweet Spot',
      shortTitle: 'Runtime Optimization',
      category: 'correlations',
      categoryLabel: 'Correlations & Runtime',
      imageSrc: '/charts/eda5_runtime_vs_roi.png',
      researchQuestion: 'Does movie duration correlate with theatrical profitability?',
      bottomLine: 'Films between 90 and 120 minutes achieve peak profitability (3.2x median multiplier). Films exceeding 140 minutes suffer lower theatrical ROI due to restricted daily theater screening slots.',
      observation: 'A clean inverted-U relationship: films under 80 minutes and over 140 minutes show suppressed returns; the 95–115 minute bracket delivers the highest concentration of profitable titles.',
      interpretation: 'Theatrical exhibitors can screen a 100-minute movie 5–6 times per day per auditorium, but only 3–4 times for a 150-minute epic, directly capping box office velocity.',
      variables: ['runtime_minutes', 'return_multiplier', 'screening_capacity'],
      findings: [
        'Exhibition Sweet Spot: 90–120 minutes maximizes daily screen turnover.',
        'Long-Film Penalty: Durations >140 minutes reduce daily theater showtimes by 30%.',
        'Pacing vs Budget: Bloated runtimes frequently correlate with runaway mega-budget VFX costs.'
      ],
      icon: <Clock className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda6',
      number: '06',
      title: 'Four Decades of Capital Erosion: Budgets Soared +648% While Returns Halved',
      shortTitle: '40-Year Macro Trend',
      category: 'trends',
      categoryLabel: 'Trends & Time-Series',
      imageSrc: '/charts/eda6_timeseries_decade_trends.png',
      researchQuestion: 'How have production budgets and return multipliers evolved over 40 years (1980–2020)?',
      bottomLine: 'Between 1980 and 2020, average budgets soared +648% ($18.5M to $138.5M), while return multipliers collapsed -52% (4.65x down to 2.22x), permanently breaching breakeven during the 2008 crisis.',
      observation: 'Budgets trend upward with steep compounding growth; return multipliers decay steadily from 4.65x in the 1980s down to 2.22x by the late 2010s.',
      interpretation: 'Studio consolidation and the pivot toward global blockbuster IP inflated production costs without expanding theatrical ticket buyers proportionally.',
      variables: ['release_year', 'mean_budget', 'median_multiplier', '1980_baseline'],
      findings: [
        'Budget Hyperinflation: +648% budget growth from 1980 to 2020.',
        'Margin Collapse: Multipliers fell -52% from 4.65x to 2.22x.',
        '2008 Structural Break: Average industry return permanently dropped below 2.5x during 2008.'
      ],
      icon: <Calendar className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda7',
      number: '07',
      title: 'Genre Commercial Efficiency: Horror & Mystery vs High-CGI Spectacles',
      shortTitle: 'Genre Capital Efficiency',
      category: 'comparisons',
      categoryLabel: 'Comparisons & Genres',
      imageSrc: '/charts/eda7_genre_efficiency_comparison.png',
      researchQuestion: 'Which genres deliver the highest commercial return per dollar invested?',
      bottomLine: 'Horror (4.15x) and Mystery (3.30x) lead Hollywood in capital resilience with 68%+ breakeven rates on low overhead ($12M–$18M). In contrast, heavy-CGI Action (2.35x) and Sci-Fi (2.20x) fall below breakeven.',
      observation: 'Horror achieves a 4.15x median multiplier with $12.4M average budget; Action averages $84.5M budget but achieves only 2.35x return.',
      interpretation: 'High-concept low-budget genres rely on narrative tension rather than spectacle, delivering exceptional commercial yield with minimal capital downside.',
      variables: ['genre', 'median_multiplier', 'breakeven_percentage', 'average_budget'],
      findings: [
        'Horror Dominance: 4.15x median return on modest $12.4M budgets.',
        'CGI Capital Bleed: Action (2.35x) and Sci-Fi (2.20x) fail to recoup theatrical costs on average.',
        'Risk Asymmetry: Low-overhead genres offer superior risk-adjusted portfolio returns.'
      ],
      icon: <Building2 className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda8',
      number: '08',
      title: 'Release Seasonality vs. ROI: Summer & Holiday Crowding',
      shortTitle: 'Release Seasonality',
      category: 'correlations',
      categoryLabel: 'Correlations & Seasonality',
      imageSrc: '/charts/eda8_release_month_seasonality.png',
      researchQuestion: 'Does release timing influence return multiplier and theatrical success?',
      bottomLine: 'Summer (June/July) and Holiday (November/December) generate huge gross volume but face severe theatrical cannibalization. Counter-programmed January and October films yield higher ROI multiples.',
      observation: 'Summer months show massive total revenue but elevated variance and lower median multiples due to intense multi-blockbuster competition.',
      interpretation: 'Releasing during peak holidays drives marketing bidding wars; indie and mid-budget films generate superior margins in counter-programmed off-peak windows.',
      variables: ['release_month', 'monthly_gross', 'monthly_median_multiplier'],
      findings: [
        'Summer Saturation: High volume but intense blockbuster cannibalization.',
        'Counter-Programming: October (Horror) and January deliver higher median multipliers.',
        'Marketing Inflation: Peak windows require 2x higher promotional spend to break through.'
      ],
      icon: <Calendar className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda9',
      number: '09',
      title: 'Studio Scale & Efficiency: Major Conglomerates vs. Disciplined Mid-Tiers',
      shortTitle: 'Studio Scale & Efficiency',
      category: 'comparisons',
      categoryLabel: 'Comparisons & Studios',
      imageSrc: '/charts/eda9_studio_market_share.png',
      researchQuestion: 'Do major conglomerate studios achieve higher capital efficiency than mid-tier studios?',
      bottomLine: 'Major conglomerates dominate gross market share (72%) but lag behind disciplined mid-tiers in return per dollar. Mid-size studios achieve a 3.42x median return vs. 2.18x for conglomerate tentpoles.',
      observation: 'Conglomerates (Disney, Warner Bros, Universal) produce the highest-grossing films, but mid-budget specialists (A24, Blumhouse, Lionsgate) deliver higher median multiples.',
      interpretation: 'Corporate bureaucracy and bloated overhead increase production costs, while boutique studios enforce strict budget ceilings that protect profitability.',
      variables: ['studio_tier', 'market_share_percentage', 'median_multiplier'],
      findings: [
        'Volume vs Yield: Majors control 72% of gross but underperform on ROI (2.18x).',
        'Boutique Efficiency: Disciplined studios achieve 3.42x median return on controlled capital.',
        'Corporate Overhead: Conglomerate overhead inflates budgets by an estimated 25%–35%.'
      ],
      icon: <Building2 className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda10',
      number: '10',
      title: 'Audience Score vs. Commercial Return: Critical Acclaim vs. Box Office',
      shortTitle: 'Audience Score vs ROI',
      category: 'correlations',
      categoryLabel: 'Correlations & Ratings',
      imageSrc: '/charts/eda10_vote_average_vs_roi.png',
      researchQuestion: 'How strongly does audience rating (vote_average) drive theatrical profitability?',
      bottomLine: 'Audience ratings exhibit a moderate correlation with long-tail box office (r = +0.38). However, high scores cannot rescue high-budget flops whose costs exceed market demand.',
      observation: 'Films rated above 7.5 show higher multiplier floors (rarely flopping below 1.5x), but budget size remains the primary determinant of whether a film breaches 2.5x breakeven.',
      interpretation: 'Critical acclaim protects against complete catastrophe, but commercial success is fundamentally bounded by production cost discipline.',
      variables: ['vote_average', 'vote_count', 'return_multiplier'],
      findings: [
        'Quality Floor: High ratings (>7.5) establish an empirical floor against total write-downs.',
        'Cost Primacy: Great reviews cannot rescue a $250M film from commercial losses.',
        'Word-of-Mouth: High audience scores extend theatrical legs for low-budget titles.'
      ],
      icon: <Layers className="w-4 h-4 text-sky-400" />
    }
  ];

  // ==========================================================================
  // 2. REDESIGN STUDIES DATA (ASSIGNMENT 6)
  // ==========================================================================
  const redesignStudies: RedesignItem[] = [
    {
      id: 'redesign1',
      number: '01',
      findingTitle: 'The Diminishing Returns Threshold: Returns Cross Below Breakeven at $25M–$65M',
      shortTitle: 'Budget Tier Efficiency',
      originalId: 'eda4',
      originalTitle: 'EDA 04: Group Comparison — Capital Efficiency Curve by Budget Tier',
      originalImage: '/charts/eda4_budget_tier_diminishing.png',
      originalLimitations: 'Vertical line plot forced tilted text; IQR error fill created visual clutter without profit boundaries; generic descriptive topic label.',
      redesignedImage: '/charts/redesign1_budget_tier_diminishing.png',
      redesignedChartType: 'Horizontal Tiered Benchmark Chart with Color-Zoned Profitability Regions',
      redesignedBreakthrough: 'Horizontal layout accommodates full tier labels and sample sizes (n=5,372); explicit vertical 2.5x Breakeven line reveals the exact capital bleed zone.',
      bottomLine: 'Micro-budgets lead at a 4.82x median return (90% breakeven rate). Once production budgets surpass $25M, median yield drops to 2.38x—falling below the 2.5x breakeven line and confirming diminishing returns.',
      improvements: {
        chartType: 'Converted from vertical line to horizontal benchmark bar chart, establishing natural reading flow.',
        title: 'Replaced passive topic label with assertive takeaway: "The Diminishing Returns Threshold: Capital Yield Drops Below Breakeven Above $25M".',
        labels: 'Embedded dual metrics directly at bar ends (Median Multiple + Breakeven % + Sample size n).',
        scale: 'Anchored X-axis at zero with focused 0–6.0x range and prominent 2.5x benchmark marker.',
        legend: 'Eliminated disconnected box; labeled profit and deficit zones directly on canvas.',
        annotation: 'Shaded "Capital Bleed Zone" (<2.5x) with pointer arrow at the $25M–$65M inflection point.',
        layout: 'Spacious horizontal structure with generous breathing room and zero overlapping.',
        visualHierarchy: 'Vibrant Icy Blue highlights sub-$25M tiers; muted charcoal demotes failing tiers.',
        accessibility: 'WCAG AAA contrast (7.8:1) against matte black with redundant text badges (+/- status).'
      }
    },
    {
      id: 'redesign2',
      number: '02',
      findingTitle: 'Box Office Saturation: Production Budgets >$100M Suffer Logarithmic Flattening',
      shortTitle: 'Budget vs Revenue Saturation',
      originalId: 'eda3',
      originalTitle: 'EDA 03: Relationship Analysis — Production Budget vs. Worldwide Gross Revenue',
      originalImage: '/charts/eda3_budget_vs_revenue_scatter.png',
      originalLimitations: 'Severe point overplotting created an impenetrable ink blob where 90% of observations were obscured; diagonal ray was hard to distinguish from trend line.',
      redesignedImage: '/charts/redesign2_budget_vs_revenue.png',
      redesignedChartType: 'Density Scatter with Empirical Power-Law Curve & Labeled Landmark Outliers',
      redesignedBreakthrough: 'Semi-transparent density rendering reveals sample concentration; empirical sublinear curve (exponent 0.72) proves diminishing returns; shaded envelope separates profit from deficit.',
      bottomLine: 'Box office revenue scales with a sublinear power-law exponent of 0.72 (< 1.0). Doubling production capital yields only +64% box office, creating a high-budget deficit trap past $150M.',
      improvements: {
        chartType: 'Upgraded raw scatter to binned density scatter with overlaid empirical power-law curve.',
        title: 'Actionable executive headline: "Box Office Saturation: Mega-Budgets Flatten Logarithmically, Squeezing Margins".',
        labels: 'Curated high-signal landmark annotations (Get Out at 56.8x vs John Carter in deficit trap vs Avatar ceiling).',
        scale: 'Replaced raw numbers with formatted currency milestones ($100K, $1M, $10M, $100M, $1B, $2B).',
        legend: 'Integrated density visual key and line descriptions directly in header subtitle.',
        annotation: 'Shaded two-color envelope separating Net Commercial Profit (>2.5x) from Deficit (<2.5x).',
        layout: 'Spacious 16:9 ratio giving ample space for callout arrows without obscuring data density.',
        visualHierarchy: 'Landmark callouts pop in high-contrast icy blue; background data points stay semi-transparent.',
        accessibility: 'Leader lines with distinct colored pill boxes guarantee readability regardless of color perception.'
      }
    },
    {
      id: 'redesign3',
      number: '03',
      findingTitle: 'Four Decades of Capital Erosion: Budgets Soared +648% While Returns Halved',
      shortTitle: '40-Year Macro Erosion',
      originalId: 'eda6',
      originalTitle: 'EDA 06: Time-Series Trend Analysis — 40-Year Budget Escalation vs. Compressing Multipliers',
      originalImage: '/charts/eda6_timeseries_decade_trends.png',
      originalLimitations: 'Dual Y-axes ($M left, multiplier right) misled viewers because scale heights were arbitrary; difficult to identify when returns crossed below breakeven.',
      redesignedImage: '/charts/redesign3_timeseries_decade_trends.png',
      redesignedChartType: 'Unified Percentage Growth Index Baseline Chart (1980 = 0%) with Divergence Ribbon',
      redesignedBreakthrough: 'Indexing both metrics to 1980 baseline reveals the staggering divergence: production cost soared +648% while multiplier contracted -52%, with vertical marker at 2008 breakeven crossover.',
      bottomLine: 'Between 1980 and 2020, average budgets escalated from $18.5M to $138.5M (+648%), while box office return multipliers fell from 4.65x down to 2.22x (-52%), structurally breaching breakeven during 2008.',
      improvements: {
        chartType: 'Replaced deceptive dual-axis chart with unified percentage-change index anchored at 1980 = 0%.',
        title: 'Declarative finding title: "Four Decades of Capital Erosion: Production Budgets Soared +648% While Returns Halved".',
        labels: 'Direct terminal labels at right edge (+648% Budget Escalation vs -52% Multiplier Contraction).',
        scale: 'Single unified percentage scale (-70% to +700%) eliminating dual axis distortion.',
        legend: 'Eliminated disconnected bottom legend; series labels placed directly on terminal points.',
        annotation: 'Vertical dashed line at 2008 marking structural crossover below 2.5x breakeven threshold.',
        layout: 'Shaded "Capital Efficiency Gap" ribbon between curves reinforces expanding profit deficit.',
        visualHierarchy: 'Budget escalation in bright Icy Blue; return yield in high-contrast slate-white with distinct markers.',
        accessibility: 'Distinct point shapes (circles for budget, squares for multiplier) and redundant text labels.'
      }
    },
    {
      id: 'redesign4',
      number: '04',
      findingTitle: 'Genre Capital Resilience: Low-Overhead Horror & Mystery Dominate High-CGI Spectacles',
      shortTitle: 'Genre Efficiency',
      originalId: 'eda7',
      originalTitle: 'EDA 07: Group Comparison — Genre Commercial Efficiency & Breakeven Rates',
      originalImage: '/charts/eda7_genre_efficiency_comparison.png',
      originalLimitations: 'Uniform heavy bars cluttered the canvas; lacked grouping by budget risk tier; no context on average capital spend required per genre.',
      redesignedImage: '/charts/redesign4_genre_efficiency.png',
      redesignedChartType: 'Grouped Tiered Lollipop / Bullet Benchmark Chart with Average Budget Metadata',
      redesignedBreakthrough: 'Lollipops reduce ink-to-data ratio; genres grouped into High-Resilience (<$30M overhead) vs Capital Sinks (>$80M spend); proves Horror averages 4.15x vs Action 2.35x.',
      bottomLine: 'Horror (4.15x) and Mystery (3.30x) lead Hollywood in commercial efficiency with 68%+ breakeven resilience on low average budgets ($12M–$18M). In contrast, heavy-CGI Action ($84.5M budget, 2.35x) and Sci-Fi ($92.1M budget, 2.20x) fall below breakeven.',
      improvements: {
        chartType: 'Converted solid bars into sleek lollipop stems with prominent endpoint markers.',
        title: 'Insight headline: "Genre Capital Efficiency: Horror & Mystery Dominate, While Heavy CGI Breeds Deficits".',
        labels: 'Integrated three metrics per genre: Median Multiple (4.15x), Breakeven % (68.4%), and Average Budget ($12.4M).',
        scale: '0 to 5.2x multiplier scale with a prominent vertical benchmark guideline at 2.5x Breakeven.',
        legend: 'Direct category brackets separating High-Resilience Genres from High-Risk Capital Sinks.',
        annotation: 'Annotated callout explaining Horror structural advantage (premise-driven, low CGI).',
        layout: 'Genres grouped by financial risk tier with generous vertical breathing room.',
        visualHierarchy: 'Profitable genres in vibrant Icy Blue; sub-breakeven genres in muted charcoal and slate.',
        accessibility: 'High contrast 8:1 text badges, clear non-color tier brackets, and text annotations for each genre.'
      }
    },
    {
      id: 'redesign5',
      number: '05',
      findingTitle: 'Statistical Feature Engineering: Transforming Power-Law Skew into Model-Ready Bell Curves',
      shortTitle: 'Distribution Normalization',
      originalId: 'eda1',
      originalTitle: 'EDA 01: Distribution Analysis — Budget & Revenue Log-Normal Skew',
      originalImage: '/charts/eda1_distribution_histograms.png',
      originalLimitations: 'Did not display the original raw linear distribution, making it impossible to see why transformation was needed; scientific exponent notation confused audiences.',
      redesignedImage: '/charts/redesign5_distribution_normalization.png',
      redesignedChartType: 'Before-and-After Dual-Panel Transformation Study (Raw Linear Skew vs Log10 Bell Curve)',
      redesignedBreakthrough: 'Side-by-side comparison proves necessity of transformation: Left panel exposes raw linear failure (93.4% crushed in first bin); Right panel demonstrates restored Gaussian bell curve.',
      bottomLine: 'Raw movie financial metrics exhibit extreme power-law right skew ($10k to $2.8B), packing 93.4% of observations into the first linear bin and breaking regression assumptions. Log10 transformation restores Gaussian symmetry around a $20M median budget and $50M median gross, stabilizing model variance.',
      improvements: {
        chartType: 'Created direct Before vs After panel layout contrasting Raw Linear Skew against Log10 Normalization.',
        title: 'Takeaway headline: "Statistical Feature Normalization: Eliminating Power-Law Distortion for AI Models".',
        labels: 'Replaced confusing exponent notation with human-readable financial landmarks ($100K, $1M, $10M, $100M, $1B).',
        scale: 'Left panel shows raw millions ($0 to $360M); Right panel maps logarithmic progression with annotated tick marks.',
        legend: 'In-panel statistical summary cards displaying Mean, Median, and Skewness parameters.',
        annotation: 'Callout explaining 93.4% pileup in linear space, and callout highlighting restored homoscedasticity on log curve.',
        layout: 'Two balanced panels with clear visual distinction (Before in muted slate, After in vibrant Icy Blue).',
        visualHierarchy: 'Transformed Gaussian peak accentuated with solid Icy Blue; raw skewed distribution in subdued dark slate.',
        accessibility: 'Clear dual labels, high contrast borders, and layperson explanations of technical requirements.'
      }
    }
  ];

  // ==========================================================================
  // 3. 20 MACHINE LEARNING MODELS (GRADE TIER A BENCHMARK)
  // ==========================================================================
  const modelsList: ModelItem[] = [
    // Family 1: Classical Linear & Kernel Supervised Models
    {
      id: 'ridge',
      name: 'Ridge Regression (L2 Regularized Linear Model)',
      shortName: 'Ridge Regression',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'L2 Tikhonov Regularized Continuous Baseline',
      badge: 'Active ML Baseline',
      status: 'active',
      architecture: 'Ridge OLS with Tikhonov L2 Regularization & 5-Fold Cross-Validation',
      primaryMetric: { label: 'Cross-Val R²', value: '0.548' },
      secondaryMetric: { label: 'RMSE', value: '$48.2M' },
      bestFitRole: 'Linear baseline benchmark proving that standard linear scaling cannot capture the concavity of diminishing returns.',
      keyInsights: [
        'Shrinks inflated coefficients caused by high collinearity between budget, runtime, and studio scale.',
        'Closed-form convex solution guaranteeing zero gradient oscillation.',
        'Captures only 54.8% of variance, demonstrating the necessity of non-linear tree models.'
      ],
      icon: <LineChart className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'lasso',
      name: 'Lasso & ElasticNet Linear Regressor',
      shortName: 'Lasso & ElasticNet',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'L1 Sparsity Penalization & Automated Feature Selection',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Coordinate Descent with L1 Regularization & Log10 Scaler',
      primaryMetric: { label: 'Cross-Val R²', value: '0.562' },
      secondaryMetric: { label: 'Active Non-Zero Features', value: '14 of 24' },
      bestFitRole: 'Sparsity-driven feature elimination proving which metadata variables have zero independent predictive power.',
      keyInsights: [
        'Drives 10 irrelevant genre flags (e.g., Documentary, Music) to exact zero coefficients.',
        'Stabilizes coefficient shrinkage across power-law budget distributions ($10k to $300M).',
        'Regularization paths trace parameter decay as alpha increases.'
      ],
      icon: <Sliders className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'logistic',
      name: 'Logistic Regression (Binary Breakeven Classifier)',
      shortName: 'Logistic Regression',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'Interpretable Log-Odds Breakeven Probabilities',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Sigmoid Logit Link Function with L2 Penalty & Stratified K-Fold',
      primaryMetric: { label: 'Breakeven Accuracy', value: '78.2%' },
      secondaryMetric: { label: 'ROC-AUC', value: '0.814' },
      bestFitRole: 'Probabilistic breakeven classification providing direct interpretable odds ratios for capital allocation.',
      keyInsights: [
        'Reveals that every $10M added to production budget decreases breakeven odds by 18.4%.',
        'Balanced class weights counteract industry imbalance (only 31.8% surpass 2.5x).',
        'S-curve probability plots map capital investment directly to success probability.'
      ],
      icon: <Target className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'svm',
      name: 'Support Vector Machines (SVR with RBF Kernel)',
      shortName: 'SVM / SVR (RBF)',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'Infinite-Dimensional Kernel Projection & Epsilon Tube',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Epsilon-SVR with Radial Basis Function (RBF) Kernel & Dual Optimization',
      primaryMetric: { label: 'Cross-Val R²', value: '0.718' },
      secondaryMetric: { label: 'Support Vectors', value: '1,842' },
      bestFitRole: 'Non-linear boundary fitting resistant to high-leverage outliers by penalizing only errors exceeding epsilon margin.',
      keyInsights: [
        'Constructs optimal hyperplane in infinite-dimensional Hilbert space.',
        'Ignores box office variances under $5M (epsilon=0.10) to focus on macro trends.',
        'Maps non-linear budget clusters into linearly separable risk regimes.'
      ],
      icon: <Activity className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'knn',
      name: 'K-Nearest Neighbors (KNN Regressor & Classifier)',
      shortName: 'KNN Comps Model',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'Instance-Based Historical Film "Comps" Estimation',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Minkowski Metric Distance (p=2) with Inverse Distance Weighting (k=15)',
      primaryMetric: { label: 'Cross-Val R²', value: '0.684' },
      secondaryMetric: { label: 'Neighbor Radius', value: 'k=15 Comps' },
      bestFitRole: 'Replicating Hollywood comparable title analysis by finding empirical historical peers for greenlight scenarios.',
      keyInsights: [
        'Matches candidate films against 45,000+ historical titles to establish localized peer returns.',
        'Weights closer historical comps higher than distant outliers.',
        'Identifies sparse areas in budget-genre space signaling unproven market concepts.'
      ],
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />
    },

    // Family 2: Decision Trees & Boosted Ensembles
    {
      id: 'xgboost',
      name: 'XGBoost (Extreme Gradient Boosting Regressor)',
      shortName: 'XGBoost',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'Regularized Second-Order Non-Linear Tree Boosting',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Exact Greedy & Histogram Gradient Tree Boosting with L1/L2 Penalties',
      primaryMetric: { label: 'Cross-Val R²', value: '0.768' },
      secondaryMetric: { label: 'RMSE', value: '$34.2M' },
      bestFitRole: 'Modeling continuous box office gross while penalizing tree splits to avoid overfitting blockbusters.',
      keyInsights: [
        'Utilizes first and second derivatives of loss function to navigate steep revenue cliffs.',
        'L1/L2 leaf penalties prevent overfitting on high-budget blockbuster outlier tails.',
        'Feature importance confirms budget dictates scale while genre dictates efficiency.'
      ],
      icon: <Target className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'classifier',
      name: 'Random Forest Classifier & Regressor',
      shortName: 'Random Forest',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'Outlier-Resistant Bootstrap Bagging (500 Trees)',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Bootstrap Aggregation (Bagging) of 500 Uncorrelated Decision Trees',
      primaryMetric: { label: 'Breakeven Accuracy', value: '84.6%' },
      secondaryMetric: { label: 'ROC-AUC', value: '0.892' },
      bestFitRole: 'Binary classification of theatrical profitability with immunity to micro-budget viral distortion.',
      keyInsights: [
        'Averages 500 decision trees to prevent viral anomalies (e.g. Paranormal Activity) from biasing predictions.',
        'Multivariable matrix: budget, runtime, one-hot genres, studio scale, seasonality.',
        'Achieves 84.6% breakeven accuracy with robust Out-of-Bag (OOB) error convergence.'
      ],
      icon: <Target className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'lightgbm',
      name: 'LightGBM (Light Gradient Boosted Machine)',
      shortName: 'LightGBM',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'High-Speed Leaf-Wise Histogram Boosting',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Leaf-Wise Tree Growth with Gradient-Based One-Side Sampling (GOSS)',
      primaryMetric: { label: 'Cross-Val R²', value: '0.759' },
      secondaryMetric: { label: 'Training Latency', value: '0.38s' },
      bestFitRole: 'Fast iterative hyperparameter tuning on sparse categorical datasets with missing metadata.',
      keyInsights: [
        'Sub-second histogram discretization across 45k records without sorting bottlenecks.',
        'GOSS natively handles missing metadata attributes without imputation degradation.',
        'Cross-validation confirms near parity with CatBoost at 10x faster training speed.'
      ],
      icon: <Activity className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'catboost',
      name: 'CatBoost (Categorical Boosting Regressor)',
      shortName: 'CatBoost',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'Native Categorical Multi-Genre Specialist',
      badge: 'Top Performer (R²=0.771)',
      status: 'active',
      architecture: 'Oblivious Symmetric Decision Trees with Ordered Target Encoding',
      primaryMetric: { label: 'Cross-Val R²', value: '0.771' },
      secondaryMetric: { label: 'Categorical Accuracy', value: '88.3%' },
      bestFitRole: 'Best overall regressor for gross revenue prediction by preserving complex studio and genre interactions.',
      keyInsights: [
        'Native ordered target statistics for 20 genres, 89 languages, and 150+ studios.',
        'Online permutation encoding eliminates data leakage on rare indie studios.',
        'Top continuous revenue R² score (0.771) across all evaluated machine learning models.'
      ],
      icon: <Boxes className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'gbrt',
      name: 'Gradient Boosted Regression Trees (Scikit GBRT)',
      shortName: 'Scikit GBRT',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'Interpretable Partial Dependence Engine',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Sequential Forward Stagewise Additive Residual Model',
      primaryMetric: { label: 'Marginal R²', value: '0.735' },
      secondaryMetric: { label: 'Partial Dependence', value: 'Verified Concave' },
      bestFitRole: 'Isolating the pure marginal elasticity of production budget independent of star power or season.',
      keyInsights: [
        'Computes Partial Dependence Plots isolating budget elasticity holding other features fixed.',
        'Huber loss function maintains stability in the presence of asymmetric box office outliers.',
        'Verifies that marginal returns curve downwards continuously across all budget brackets.'
      ],
      icon: <LineChart className="w-3.5 h-3.5 text-sky-400" />
    },

    // Family 3: Deep Tabular Neural Networks
    {
      id: 'mlp',
      name: 'Multi-Layer Perceptron (MLP Deep Tabular Regressor)',
      shortName: 'MLP Regressor',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Continuous Non-Linear Revenue Manifold Fitting',
      badge: 'Active Deep ML',
      status: 'active',
      architecture: '4-Layer Deep Feedforward Network with Swish & Dropout (256-128-64-1)',
      primaryMetric: { label: 'Test Set R²', value: '0.729' },
      secondaryMetric: { label: 'Dropout Rate', value: '0.25' },
      bestFitRole: 'Learning a continuous, differentiable financial manifold without discrete tree splits.',
      keyInsights: [
        '4-layer feedforward network with Swish activations and dropout (256-128-64-1).',
        'Batch normalization stabilizes gradient flow across extreme financial ranges.',
        'Smooth continuous manifold fitting complements discrete tree ensemble predictions.'
      ],
      icon: <Layers className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'tabnet',
      name: 'TabNet (Attentive Interpretable Tabular Learning)',
      shortName: 'TabNet',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Sequential Attention Masking for Tabular Features',
      badge: 'Deep Benchmark',
      status: 'benchmark',
      architecture: 'Sequential Multi-Step Attention with Sparsemax Feature Masking',
      primaryMetric: { label: 'Mask Interpretability', value: '94.2%' },
      secondaryMetric: { label: 'Test Set R²', value: '0.748' },
      bestFitRole: 'Auditing which specific feature (budget vs runtime vs genre) drove prediction for individual films.',
      keyInsights: [
        'Sparsemax feature masking selects active features at each decision step.',
        'Instance-level explainability reveals drivers behind individual film predictions.',
        'Differentiable architecture bridges tree-like logic with gradient optimization.'
      ],
      icon: <Cpu className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'ft_transformer',
      name: 'FT-Transformer (Feature Tokenizer Transformer)',
      shortName: 'FT-Transformer',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Self-Attention Across Numerical & Categorical Tokens',
      badge: 'Deep Benchmark',
      status: 'benchmark',
      architecture: 'Multi-Head Self-Attention over Linear Token Projections',
      primaryMetric: { label: 'Test Set R²', value: '0.755' },
      secondaryMetric: { label: 'Attention Heads', value: '8 Heads' },
      bestFitRole: 'Detecting subtle multi-way synergistic interactions between studio size, genre, and budget tiers.',
      keyInsights: [
        'Projects continuous numbers and categorical embeddings into shared manifold.',
        'Multi-head self-attention captures multi-variable synergy across features.',
        'Demonstrates deep transformer capability on tabular cinema datasets.'
      ],
      icon: <Cpu className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'nam',
      name: 'Neural Additive Models (NAM)',
      shortName: 'NAM Additive',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Linear Combination of Deep Shape Networks',
      badge: '100% Explainable',
      status: 'benchmark',
      architecture: 'Linear Combination of Independent Deep Neural Sub-Networks',
      primaryMetric: { label: 'Explainability', value: '100% Intrinsic' },
      secondaryMetric: { label: 'Test Set R²', value: '0.741' },
      bestFitRole: 'Graphing the exact non-linear shape function for budget, isolating diminishing returns with zero black-box opacity.',
      keyInsights: [
        'Each feature passes through independent sub-network to isolate its response.',
        'Directly graphs the exact non-linear shape function of diminishing returns.',
        'Combines neural expressive capacity with linear interpretability.'
      ],
      icon: <Sliders className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'autoencoder',
      name: 'Autoencoder Tabular Anomaly Detector',
      shortName: 'Tabular Autoencoder',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Unsupervised Reconstruction Bottleneck',
      badge: 'Anomaly Detector',
      status: 'benchmark',
      architecture: 'Bottleneck Encoder-Decoder Network with Mean Squared Reconstruction Error',
      primaryMetric: { label: 'Reconstruction AUC', value: '0.912' },
      secondaryMetric: { label: 'Latent Space', value: '8 Dims' },
      bestFitRole: 'Isolating films whose box office performance violates normal commercial physics (e.g. John Carter).',
      keyInsights: [
        'Compresses 24 metadata features into 8-dimensional bottleneck latent space.',
        'Reconstruction MSE flags anomalous films that violate industry physics.',
        'Unsupervised detection of viral hits and catastrophic mega-budget write-downs.'
      ],
      icon: <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
    },

    // Family 4: Econometric, Statistical & Unsupervised Learning
    {
      id: 'regression',
      name: 'Supervised Regressor & ElasticNet Splines',
      shortName: 'ElasticNet Splines',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Closed-Form Marginal Rate of Return (dy/dx Derivative)',
      badge: 'Active ML ($42.5M Inflection)',
      status: 'active',
      architecture: 'L1/L2 Penalized Generalized Linear Model with Cubic Basis Splines',
      primaryMetric: { label: 'Exact Inflection Point', value: '$42.5M' },
      secondaryMetric: { label: 'L1 Ratio', value: '0.50' },
      bestFitRole: 'Providing the exact continuous derivative dy/dx proving where return per dollar spent drops below 2.5x breakeven.',
      keyInsights: [
        'Cubic splines enable analytical continuous first derivative d(Revenue)/d(Budget).',
        'Identifies that marginal return drops below the $2.50 breakeven line at exactly $42.5M.',
        'Provides formal econometric mathematical proof of diminishing returns.'
      ],
      icon: <LineChart className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'clustering',
      name: 'Unsupervised Clustering & PCA Archetypes',
      shortName: 'K-Means & PCA',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Multi-Dimensional Film Archetype Discovery',
      badge: 'Active ML Archetypes',
      status: 'active',
      architecture: 'Orthogonal Eigenvector Projection with Voronoi Centroid Partitioning',
      primaryMetric: { label: 'Optimal Clusters (k)', value: '4 Archetypes' },
      secondaryMetric: { label: 'Variance Explained (PCA)', value: '78.4%' },
      bestFitRole: 'Unsupervised market segmentation grouping films by capital risk profile rather than arbitrary genre labels.',
      keyInsights: [
        'Projects 24 variables onto 2 principal components capturing 78.4% of total variance.',
        'Segments films into: (1) Indie Breakouts, (2) Mid-Budget Profiteers, (3) Blockbuster Drivers, (4) High-Budget Traps.',
        'Proves capital structure dictates performance more reliably than genre alone.'
      ],
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'quantile',
      name: 'Quantile Regression (Tau = 0.25, 0.50, 0.75, 0.90)',
      shortName: 'Quantile Regressor',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Asymmetric Downside Loss vs. Viral Upside Tails',
      badge: 'Active ML Asymmetric',
      status: 'active',
      architecture: 'Pinball / Check-Loss Minimization across Conditional Quantiles',
      primaryMetric: { label: 'Estimated Quantiles', value: '4 Slopes' },
      secondaryMetric: { label: 'Risk Spread', value: '±$18M to ±$142M' },
      bestFitRole: 'Proving that high budgets drastically amplify catastrophe risk (tau=0.25) without proportionally raising upside yield.',
      keyInsights: [
        'Estimates median (0.50), downside failure (0.25), and viral upside tail (0.90) slopes.',
        'Prediction error explodes eightfold from ±$18M on small films to ±$142M on films over $140M.',
        'Confirms capital risk escalates non-linearly with production budget scale.'
      ],
      icon: <TrendingDown className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'bayesian',
      name: 'Bayesian Ridge Regression',
      shortName: 'Bayesian Ridge',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Probabilistic Credible Intervals for Sparse Tiers',
      badge: 'Econometric Benchmark',
      status: 'benchmark',
      architecture: 'Probabilistic Linear Regression with Uninformative Gamma Precision Priors',
      primaryMetric: { label: 'Credible Interval', value: '95% Posterior' },
      secondaryMetric: { label: 'Noise Precision Alpha', value: '1.42' },
      bestFitRole: 'Quantifying uncertainty in mega-budget predictions where sample sizes are small.',
      keyInsights: [
        'Computes full posterior distributions over model weights using Gamma precision priors.',
        'Quantifies prediction uncertainty where high-budget data is scarce ($150M+ range).',
        '95% Bayesian credible interval bands around diminishing returns curve.'
      ],
      icon: <Activity className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'umap',
      name: 'UMAP + HDBSCAN Density Clustering',
      shortName: 'UMAP + HDBSCAN',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Non-Linear Manifold Projection & Niche Segmentation',
      badge: 'Econometric Benchmark',
      status: 'benchmark',
      architecture: 'Fuzzy Simplicial Set Topology with Hierarchical Density Clustering',
      primaryMetric: { label: 'Min Cluster Size', value: '35 Titles' },
      secondaryMetric: { label: 'Noise Rejection', value: '4.8%' },
      bestFitRole: 'Isolating distinct commercial clusters of hyper-efficient micro-budgets without forcing noise films into artificial clusters.',
      keyInsights: [
        'Preserves both local and global multi-dimensional geometry without linear constraints.',
        'Hierarchical density clustering identifies organic movie performance clusters.',
        '2D topological projections highlight isolated micro-budget success clusters.'
      ],
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />
    }
  ];

  // ==========================================================================
  // 4. MODEL DIAGNOSTIC OUTPUT CHARTS DATA
  // ==========================================================================
  const diagnosticCharts: DiagnosticItem[] = [
    {
      id: 'diag1',
      number: '01',
      title: 'Predictive Model Fit: Diminishing Returns Sublinear Curve',
      shortTitle: 'Sublinear Curve Fit',
      imageSrc: '/charts/output1_predictive_fit.png',
      researchQuestion: 'How accurately does our logarithmic regression model fit observed box office flattening?',
      bottomLine: 'Model confirms diminishing returns with R² = 0.742. Past $100M, revenue flattens toward an empirical ceiling while production costs continue growing linearly.',
      observation: 'Nonlinear regression captures 74.2% of variance. Curve rises steeply under $25M, but steadily flattens beyond $100M.',
      interpretation: 'Audience size has natural market limits. Spending $200M does not double audience demand; it yields compressed marginal return.',
      dimension: 'Model Fit & Curvature',
      metric: 'R² = 0.742'
    },
    {
      id: 'diag2',
      number: '02',
      title: 'Prediction Error Spread: Asymmetric Downside Risk',
      shortTitle: 'Residual Error Variance',
      imageSrc: '/charts/output2_residual_analysis.png',
      researchQuestion: 'How does prediction error and financial risk change as production budgets increase?',
      bottomLine: 'Higher budgets create exponentially higher financial risk. Prediction error explodes from ±$18M on small films to ±$142M on films over $140M.',
      observation: 'Residual spread fans out dramatically. Films under $25M cluster tightly near zero error; films over $140M show extreme error dispersion.',
      interpretation: 'A $15M film that underperforms loses a few million dollars. A $200M film that misses expectations triggers catastrophic studio write-downs.',
      dimension: 'Residual Diagnostics',
      metric: 'Spread: ±$18M to ±$142M'
    },
    {
      id: 'diag3',
      number: '03',
      title: 'What Drives Profitability: Feature Importance Weights',
      shortTitle: 'Feature Importance Weights',
      imageSrc: '/charts/output3_feature_importance.png',
      researchQuestion: 'Which input features drive box office and profitability predictions the most?',
      bottomLine: 'Budget sets revenue scale (34%), but genre and studio discipline dictate actual profitability. Low-cost genres like Horror (+18.5%) punch far above their weight.',
      observation: 'Production budget accounts for 34.2% of predictive importance. Horror and Thriller provide +18.5% positive boost, while conglomerate scale has negative weights.',
      interpretation: 'Predicting gross revenue is very different from predicting profit. Studios should greenlight based on genre efficiency rather than budget size.',
      dimension: 'Feature Sensitivity',
      metric: 'Budget: 34.2% • Horror: +18.5%'
    },
    {
      id: 'diag4',
      number: '04',
      title: 'The Tipping Point: Marginal Rate of Return (dy/dx Curve)',
      shortTitle: 'Marginal Rate Derivative (dy/dx)',
      imageSrc: '/charts/output4_marginal_derivative.png',
      researchQuestion: 'At what exact budget threshold does marginal rate of return fall below breakeven?',
      bottomLine: 'The exact point of diminishing returns is $42.5 Million. Below $42.5M, every $1 returns over $2.50. Beyond $42.5M, returns drop below breakeven.',
      observation: 'The marginal multiplier curve slopes downward from 4.8x, crossing below the 2.5x theatrical breakeven line at exactly $42.5 Million.',
      interpretation: 'Below $42.5M, capital goes into core storytelling. Beyond $42.5M, money goes into inflated talent fees and redundant CGI that do not expand ticket sales.',
      dimension: 'Mathematical Derivative',
      metric: 'Inflection Point = $42.5M'
    }
  ];

  // Filtered lists
  const filteredFindings = findingsList.filter(
    f => findingCategory === 'all' || f.category === findingCategory
  );
  const currentFinding = filteredFindings[currentFindingIndex] || filteredFindings[0] || findingsList[0];
  const currentRedesign = redesignStudies[currentRedesignIndex] || redesignStudies[0];
  const filteredModels = modelsList.filter(
    m => selectedModelCategory === 'all' || m.category === selectedModelCategory
  );
  const selectedModelObj = modelsList.find(m => m.id === selectedModelId) || modelsList[0];
  const currentDiagnostic = diagnosticCharts[currentDiagnosticIndex] || diagnosticCharts[0];

  const nextFinding = () => setCurrentFindingIndex((prev) => (prev + 1) % filteredFindings.length);
  const prevFinding = () => setCurrentFindingIndex((prev) => (prev - 1 + filteredFindings.length) % filteredFindings.length);

  const nextRedesign = () => setCurrentRedesignIndex((prev) => (prev + 1) % redesignStudies.length);
  const prevRedesign = () => setCurrentRedesignIndex((prev) => (prev - 1 + redesignStudies.length) % redesignStudies.length);

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 space-y-10 overflow-x-hidden">
      
      {/* ===================================================================== */}
      {/* 1. HEADER & TOP KPI BANNER                                            */}
      {/* ===================================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0c1626] border border-sky-500/30 text-xs font-mono text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFIED EMPIRICAL ANALYSIS &bull; ASSIGNMENTS 5, 6 &amp; ML MODELS</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToCleaning && (
              <button
                onClick={onNavigateToCleaning}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0f131c] hover:bg-[#131824] border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono text-sky-300 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Data Cleaning &rarr;</span>
              </button>
            )}
            {onNavigateToSql && (
              <button
                onClick={onNavigateToSql}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0f131c] hover:bg-[#131824] border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono text-sky-300 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>SQL Workbench &rarr;</span>
              </button>
            )}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Visual Analytics &amp; Machine Learning Models
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
          A streamlined, evidence-based investigation of cinema capital diminishing returns across 45,466 films: uniting exploratory findings (Assignment 5), static communication redesigns (Assignment 6), and a 20-model machine learning benchmark suite (Grade Tier A).
        </p>

        {/* 4 Core Empirical Takeaway Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">The Tipping Point</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-white">$42.5M Cap</div>
            <span className="text-[11px] font-mono text-sky-400">dy/dx &lt; 2.5x Breakeven</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">40-Year Erosion</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-sky-300">+648% Budgets</div>
            <span className="text-[11px] font-mono text-slate-400">-52% Multiplier Contraction</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Top Revenue Regressor</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-sky-300">CatBoost</div>
            <span className="text-[11px] font-mono text-slate-400">R² = 0.771 (Cross-Val)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Top Breakeven Classifier</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-white">Random Forest</div>
            <span className="text-[11px] font-mono text-sky-400">84.6% Acc &bull; 0.892 AUC</span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* PRIMARY 3-STAGE SWITCHER                                            */}
        {/* =================================================================== */}
        <div className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-xl bg-[#0b0e15] border border-[#1c2436]">
            <button
              onClick={() => setActiveTab('findings')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeTab === 'findings'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>1. Exploratory Findings (10)</span>
            </button>
            <button
              onClick={() => setActiveTab('redesigns')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeTab === 'redesigns'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>2. Redesign Studio (5)</span>
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeTab === 'models'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>3. Machine Learning Models (20)</span>
            </button>
          </div>
        </div>

      </div>

      {/* ===================================================================== */}
      {/* SECTION 1: EXPLORATORY FINDINGS (ASSIGNMENT 5)                        */}
      {/* ===================================================================== */}
      {activeTab === 'findings' && (
        <div className="space-y-6">
          
          <div className="rounded-xl p-5 sm:p-7 border border-[#1c2436] bg-[#0f131c] space-y-6">
            
            {/* Header: Inquiry dimensions and navigation controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                    Assignment 5 &bull; Finding {currentFinding.number} of {filteredFindings.length.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {currentFinding.categoryLabel}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {currentFinding.title}
                </h2>
              </div>

              {/* Category Filter Pills & Carousel Controls */}
              <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono">
                  {[
                    { id: 'all', label: 'All (10)' },
                    { id: 'relationships', label: 'Relationships' },
                    { id: 'comparisons', label: 'Comparisons' },
                    { id: 'trends', label: 'Trends' },
                    { id: 'correlations', label: 'Correlations' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setFindingCategory(c.id as any);
                        setCurrentFindingIndex(0);
                      }}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        findingCategory === c.id
                          ? 'bg-sky-500 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 pl-1">
                  <button
                    onClick={prevFinding}
                    className="p-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] transition-colors"
                    title="Previous Finding"
                  >
                    <ChevronLeft className="w-4 h-4 text-sky-400" />
                  </button>
                  <button
                    onClick={nextFinding}
                    className="p-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] transition-colors"
                    title="Next Finding"
                  >
                    <ChevronRight className="w-4 h-4 text-sky-400" />
                  </button>
                  <a
                    href={currentFinding.imageSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-sky-400 border border-[#1c2436] transition-colors"
                    title="Open Full Resolution"
                  >
                    <ExternalLink className="w-4 h-4 text-sky-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Rendered Chart Visual */}
            <div className="relative group rounded-lg overflow-hidden border border-[#1c2436] bg-[#07090e] p-2 sm:p-4 flex items-center justify-center min-h-[360px]">
              <button
                onClick={prevFinding}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-[#0b0e15]/90 hover:bg-sky-500 hover:text-slate-950 text-white border border-[#1c2436] opacity-70 group-hover:opacity-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <img
                key={currentFinding.id}
                src={currentFinding.imageSrc}
                alt={currentFinding.title}
                className="w-full h-auto object-contain max-h-[520px] rounded-lg transition-opacity duration-300"
                loading="eager"
              />

              <button
                onClick={nextFinding}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-[#0b0e15]/90 hover:bg-sky-500 hover:text-slate-950 text-white border border-[#1c2436] opacity-70 group-hover:opacity-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* The Bottom Line Banner */}
            <div className="rounded-lg p-3.5 sm:p-4 border border-sky-500/40 bg-[#0c1421] flex items-start gap-3">
              <div className="p-2 rounded-md bg-[#101b2b] text-sky-400 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                  Core Empirical Takeaway
                </span>
                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                  {currentFinding.bottomLine}
                </p>
              </div>
            </div>

            {/* Triad Evidence Breakdown: Question -> Evidence -> Interpretation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                    Research Question
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  "{currentFinding.researchQuestion}"
                </p>
                <div className="pt-2 border-t border-[#1c2436] flex flex-wrap gap-1">
                  {currentFinding.variables.map((v, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0f131c] text-slate-400 border border-[#1c2436]">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                    Visual Evidence (Observation)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {currentFinding.observation}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                    Analysis &amp; Economic Meaning
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {currentFinding.interpretation}
                </p>
              </div>
            </div>

            {/* Finding Quick-Select Pills */}
            <div className="pt-2 border-t border-[#1c2436] flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mr-2">Jump to Finding:</span>
              {filteredFindings.map((f, idx) => (
                <button
                  key={f.id}
                  onClick={() => setCurrentFindingIndex(idx)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    idx === currentFindingIndex
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-[#0b0e15] hover:bg-[#121824] text-slate-400 hover:text-white border border-[#1c2436]'
                  }`}
                >
                  {f.number}. {f.shortTitle}
                </button>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 2: STATIC REDESIGN STUDIO (ASSIGNMENT 6)                      */}
      {/* ===================================================================== */}
      {activeTab === 'redesigns' && (
        <div className="space-y-6">
          
          <div className="rounded-xl p-5 sm:p-7 border border-[#1c2436] bg-[#0f131c] space-y-6">
            
            {/* Header & Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                    Assignment 6 &bull; Case Study {currentRedesign.number} of 05
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {currentRedesign.redesignedChartType}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {currentRedesign.findingTitle}
                </h2>
              </div>

              {/* View Mode Toggle (Comparison vs Redesigned vs Original) */}
              <div className="flex items-center gap-2 self-start lg:self-auto">
                <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono">
                  <button
                    onClick={() => setRedesignViewMode('comparison')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      redesignViewMode === 'comparison'
                        ? 'bg-sky-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    onClick={() => setRedesignViewMode('redesign')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      redesignViewMode === 'redesign'
                        ? 'bg-sky-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Redesigned Only
                  </button>
                  <button
                    onClick={() => setRedesignViewMode('original')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      redesignViewMode === 'original'
                        ? 'bg-sky-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Original Only
                  </button>
                </div>

                <div className="flex items-center gap-1.5 pl-1">
                  <button
                    onClick={prevRedesign}
                    className="p-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-sky-400" />
                  </button>
                  <button
                    onClick={nextRedesign}
                    className="p-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-sky-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Rendered Visual Panel(s) */}
            {redesignViewMode === 'comparison' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original Chart */}
                <div className="rounded-lg p-3 sm:p-4 bg-[#07090e] border border-[#1c2436] space-y-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1c2436]">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#141824] text-slate-400 border border-[#1c2436]">
                      Original Exploratory Baseline
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{currentRedesign.originalId.toUpperCase()}</span>
                  </div>
                  <img
                    src={currentRedesign.originalImage}
                    alt={currentRedesign.originalTitle}
                    className="w-full h-auto object-contain max-h-[360px] rounded opacity-80"
                  />
                  <div className="p-2.5 rounded bg-[#0b0e15] border border-[#1c2436] text-xs text-slate-400 font-light leading-relaxed">
                    <strong className="text-slate-300 font-mono text-[10px] uppercase block mb-0.5">Identified Limitations:</strong>
                    {currentRedesign.originalLimitations}
                  </div>
                </div>

                {/* Redesigned Chart */}
                <div className="rounded-lg p-3 sm:p-4 bg-[#07090e] border border-sky-500/40 space-y-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 border-b border-sky-500/30">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#0c1626] text-sky-300 border border-sky-500/40 font-bold">
                      Redesigned Static Communication &bull; Final
                    </span>
                    <span className="text-[10px] font-mono text-sky-400 font-bold">9-Pillar Upgrade</span>
                  </div>
                  <img
                    src={currentRedesign.redesignedImage}
                    alt={currentRedesign.findingTitle}
                    className="w-full h-auto object-contain max-h-[360px] rounded"
                  />
                  <div className="p-2.5 rounded bg-[#0c1421] border border-sky-500/30 text-xs text-slate-200 font-light leading-relaxed">
                    <strong className="text-sky-300 font-mono text-[10px] uppercase block mb-0.5">Communication Breakthrough:</strong>
                    {currentRedesign.redesignedBreakthrough}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg p-3 sm:p-6 bg-[#07090e] border border-[#1c2436] flex flex-col items-center justify-center space-y-4">
                <img
                  src={redesignViewMode === 'redesign' ? currentRedesign.redesignedImage : currentRedesign.originalImage}
                  alt={currentRedesign.findingTitle}
                  className="w-full h-auto object-contain max-h-[500px] rounded"
                />
                <p className="text-xs text-slate-300 max-w-2xl text-center font-light leading-relaxed">
                  {redesignViewMode === 'redesign' ? currentRedesign.redesignedBreakthrough : currentRedesign.originalLimitations}
                </p>
              </div>
            )}

            {/* The Bottom Line Banner */}
            <div className="rounded-lg p-3.5 sm:p-4 border border-sky-500/40 bg-[#0c1421] flex items-start gap-3">
              <div className="p-2 rounded-md bg-[#101b2b] text-sky-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                  Analytical Conclusion
                </span>
                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                  {currentRedesign.bottomLine}
                </p>
              </div>
            </div>

            {/* 9-Pillar Redesign Improvements Grid */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                9-Pillar Redesign Improvements Summary (Assignment 6 Rubric):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-sky-300 block">1. Form &amp; Framing</span>
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    <strong className="text-slate-200">Chart Type:</strong> {currentRedesign.improvements.chartType}
                  </p>
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    <strong className="text-slate-200">Title:</strong> {currentRedesign.improvements.title}
                  </p>
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    <strong className="text-slate-200">Layout:</strong> {currentRedesign.improvements.layout}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-sky-300 block">2. Scales, Labels &amp; Keys</span>
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    <strong className="text-slate-200">Labels:</strong> {currentRedesign.improvements.labels}
                  </p>
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    <strong className="text-slate-200">Scale:</strong> {currentRedesign.improvements.scale}
                  </p>
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    <strong className="text-slate-200">Legend:</strong> {currentRedesign.improvements.legend}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-sky-300 block">3. Context &amp; Accessibility</span>
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    <strong className="text-slate-200">Annotation:</strong> {currentRedesign.improvements.annotation}
                  </p>
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    <strong className="text-slate-200">Visual Hierarchy:</strong> {currentRedesign.improvements.visualHierarchy}
                  </p>
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    <strong className="text-slate-200">Accessibility:</strong> {currentRedesign.improvements.accessibility}
                  </p>
                </div>
              </div>
            </div>

            {/* Study Quick-Select Pills */}
            <div className="pt-2 border-t border-[#1c2436] flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mr-2">Jump to Case Study:</span>
              {redesignStudies.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentRedesignIndex(idx)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    idx === currentRedesignIndex
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-[#0b0e15] hover:bg-[#121824] text-slate-400 hover:text-white border border-[#1c2436]'
                  }`}
                >
                  {s.number}. {s.shortTitle}
                </button>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 3: MACHINE LEARNING MODELS (GRADE TIER A SUITE)                */}
      {/* ===================================================================== */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          
          <div className="rounded-xl p-5 sm:p-7 border border-[#1c2436] bg-[#0f131c] space-y-6">
            
            {/* Header & Sub-view Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                    Grade Tier A Suite &bull; 20 Models Total &bull; 14 Active
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Python 3.11 / Google Colab
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Machine Learning Benchmark &amp; Diminishing Returns Evaluation
                </h2>
              </div>

              {/* Sub-view switcher: Matrix Table vs Model Explorer vs Best Models Analysis */}
              <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono self-start lg:self-auto">
                <button
                  onClick={() => setModelSubView('matrix')}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                    modelSubView === 'matrix'
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Benchmark Table</span>
                </button>
                <button
                  onClick={() => setModelSubView('explorer')}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                    modelSubView === 'explorer'
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Model Explorer</span>
                </button>
                <button
                  onClick={() => setModelSubView('analysis')}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                    modelSubView === 'analysis'
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Performance Analysis</span>
                </button>
              </div>
            </div>

            {/* SUB-VIEW 1: BENCHMARK MATRIX TABLE */}
            {modelSubView === 'matrix' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Cross-Validated Performance on 45,466 Records (5-Fold CV)</span>
                  <span className="text-sky-300">Click any row to inspect architecture</span>
                </div>

                <div className="overflow-x-auto rounded-lg border border-[#1c2436]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#0b0e15] text-slate-400 border-b border-[#1c2436]">
                      <tr>
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Model Architecture</th>
                        <th className="py-2.5 px-3">Family</th>
                        <th className="py-2.5 px-3">Primary Metric</th>
                        <th className="py-2.5 px-3">Role in Diminishing Returns</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1c2436] bg-[#07090e]">
                      {modelsList.map((m, idx) => (
                        <tr 
                          key={m.id}
                          onClick={() => {
                            setSelectedModelId(m.id);
                            setModelSubView('explorer');
                          }}
                          className={`cursor-pointer transition-colors ${
                            m.id === selectedModelId ? 'bg-[#152338]' : 'hover:bg-[#0f131c]'
                          }`}
                        >
                          <td className="py-2 px-3 text-slate-500 font-bold">{idx + 1}</td>
                          <td className="py-2 px-3 text-white font-bold">{m.name}</td>
                          <td className="py-2 px-3 text-sky-300">{m.categoryLabel}</td>
                          <td className="py-2 px-3 text-sky-400 font-semibold">
                            {m.primaryMetric.label}: {m.primaryMetric.value}
                          </td>
                          <td className="py-2 px-3 text-slate-300 font-sans text-xs max-w-xs truncate">{m.bestFitRole}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.status === 'active' 
                                ? 'bg-[#0c1626] text-sky-300 border border-sky-500/30' 
                                : 'bg-[#121722] text-slate-500 border border-[#1c2436]'
                            }`}>
                              {m.status === 'active' ? 'Active' : 'Staged'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: MODEL ARCHITECTURE EXPLORER */}
            {modelSubView === 'explorer' && (
              <div className="space-y-5">
                
                {/* Category Filter Pills */}
                <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-[#1c2436]">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                    Filter by Paradigm:
                  </span>
                  <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono overflow-x-auto max-w-full">
                    {[
                      { id: 'all', label: 'All (20)' },
                      { id: 'linear_kernel', label: 'Linear & Kernel (5)' },
                      { id: 'ensemble', label: 'Ensemble Trees (5)' },
                      { id: 'deep_learning', label: 'Deep Tabular (5)' },
                      { id: 'econometric', label: 'Econometric (5)' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedModelCategory(cat.id as any)}
                        className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                          selectedModelCategory === cat.id
                            ? 'bg-sky-500 text-slate-950 font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 20 Model Selector Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                  {filteredModels.map(m => {
                    const isSelected = m.id === selectedModelId;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModelId(m.id)}
                        className={`p-2 rounded-lg text-left transition-all border flex flex-col justify-between gap-1 ${
                          isSelected
                            ? 'bg-[#152338] border-sky-400 text-white'
                            : 'bg-[#0b0e15] border-[#1c2436] hover:border-sky-500/40 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-[9px] font-mono font-bold uppercase truncate ${
                            isSelected ? 'text-sky-300' : 'text-slate-400'
                          }`}>
                            {m.categoryLabel.split(' ')[0]}
                          </span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${
                            m.status === 'active' 
                              ? 'bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold' 
                              : 'bg-[#121722] text-slate-500'
                          }`}>
                            {m.status === 'active' ? 'Active' : 'Staged'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <div className={isSelected ? 'text-sky-400' : 'text-slate-400'}>
                            {m.icon}
                          </div>
                          <span className="font-semibold text-xs text-white truncate">
                            {m.shortName}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Model Details Box */}
                <div className="p-5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1c2436]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                          {selectedModelObj.categoryLabel}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {selectedModelObj.architecture}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {selectedModelObj.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#0c1626] text-sky-400 border border-sky-500/30 font-bold">
                        {selectedModelObj.badge}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                        Role in Cinema Capital Research:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                        {selectedModelObj.bestFitRole}
                      </p>
                      <ul className="space-y-1 pt-1">
                        {selectedModelObj.keyInsights.map((insight, i) => (
                          <li key={i} className="text-xs text-slate-300 font-light flex items-start gap-1.5">
                            <span className="text-sky-400 font-bold">&bull;</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-4 p-3.5 rounded-lg bg-[#0f131c] border border-[#1c2436] flex flex-col justify-between space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                        Standardized Metrics
                      </span>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-mono">{selectedModelObj.primaryMetric.label}:</span>
                          <span className="text-sky-300 font-mono font-bold">{selectedModelObj.primaryMetric.value}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-mono">{selectedModelObj.secondaryMetric.label}:</span>
                          <span className="text-sky-300 font-mono font-bold">{selectedModelObj.secondaryMetric.value}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 pt-1 border-t border-[#1c2436]">
                        Status: {selectedModelObj.status === 'active' ? 'Trained in Python Pipeline (Active)' : 'Staged for Benchmark'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* SUB-VIEW 3: PERFORMANCE ANALYSIS & 4 DIAGNOSTIC CHARTS */}
            {modelSubView === 'analysis' && (
              <div className="space-y-6">
                
                {/* 4 Output Diagnostics Section */}
                <div className="p-4 sm:p-5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1c2436]">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                        Output Diagnostic Visualizations &bull; Chart {currentDiagnostic.number} of 04
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {currentDiagnostic.title}
                      </h3>
                    </div>

                    {/* Quick diagnostic thumbnails */}
                    <div className="flex items-center gap-1.5">
                      {diagnosticCharts.map((d, idx) => (
                        <button
                          key={d.id}
                          onClick={() => setCurrentDiagnosticIndex(idx)}
                          className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                            idx === currentDiagnosticIndex
                              ? 'bg-sky-500 text-slate-950 font-bold'
                              : 'bg-[#0f131c] text-slate-400 hover:text-white border border-[#1c2436]'
                          }`}
                        >
                          {d.number}. {d.shortTitle}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-7 bg-[#07090e] p-2 rounded-lg border border-[#1c2436]">
                      <img
                        src={currentDiagnostic.imageSrc}
                        alt={currentDiagnostic.title}
                        className="w-full h-auto object-contain max-h-[320px] rounded"
                      />
                    </div>
                    <div className="md:col-span-5 space-y-3">
                      <div className="p-3 rounded-lg bg-[#0c1421] border border-sky-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                          Key Evaluation Takeaway
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                          {currentDiagnostic.bottomLine}
                        </p>
                      </div>
                      <div className="space-y-1 text-xs text-slate-300 font-light">
                        <p><strong className="text-slate-200 font-mono">Question:</strong> "{currentDiagnostic.researchQuestion}"</p>
                        <p><strong className="text-slate-200 font-mono">Evidence:</strong> {currentDiagnostic.observation}</p>
                        <p><strong className="text-slate-200 font-mono">Context:</strong> {currentDiagnostic.interpretation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Synthesis Breakdown Cards: Which Models Perform Best and Why */}
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                    Comparative Experimental Synthesis (Which Models Perform Best &amp; Why):
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-sky-400">1. Top Continuous Revenue Regressors</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30">
                          CatBoost (R²=0.771) &amp; XGBoost
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">Why Gradient Boosted Trees Beat Linear Baselines (R² 0.771 vs 0.548)</h4>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        Standard linear regression fails because movie box office follows severe power-law distributions. CatBoost succeeds by using online ordered statistics to process 150+ high-cardinality studios without data leakage, while XGBoost regularized splits prevent blockbuster outliers from hijacking predictions.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-sky-400">2. Top Binary Breakeven Classifier</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30">
                          Random Forest (84.6% Acc)
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">Why 500-Tree Bagging Outperforms Single Classifiers on Breakeven</h4>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        Commercial breakeven (&gt;=2.5x) is heavily vulnerable to micro-budget viral anomalies like <em>Paranormal Activity</em> (12,890x return). Random Forest bootstrap aggregation averages out extreme variance across 500 decision trees, achieving 0.892 ROC-AUC.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-sky-400">3. Mathematical Derivative &amp; Inflection</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30">
                          ElasticNet Splines ($42.5M)
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">Isolating the Exact Mathematical Point of Diminishing Returns</h4>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        While deep neural networks act as black boxes, ElasticNet Polynomial Splines enable the continuous first derivative <code className="text-sky-300 font-mono">d(Revenue)/d(Budget)</code>, proving analytically that return per dollar drops below 2.5x at exactly $42.5 Million.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-sky-400">4. Unsupervised Market Segmentation</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30">
                          K-Means &amp; PCA (78.4% Var)
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">Discovering Natural Capital Archetypes Without Presupposed Labels</h4>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        Projecting 24 metadata features onto 2 principal variance axes captures 78.4% of total variance. K-Means clustering (k=4) cleanly partitions cinema into Indie Breakouts, Mid-Budget Profiteers, Blockbuster Drivers, and High-Budget Traps.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Environment Verification */}
                <div className="p-3.5 rounded-lg bg-[#0c1421] border border-sky-500/30 flex items-center gap-2.5 text-xs text-slate-300 font-mono">
                  <Code className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Executed in Python 3.11 with <code className="text-sky-300">scikit-learn</code>, <code className="text-sky-300">catboost</code>, <code className="text-sky-300">xgboost</code>, and <code className="text-sky-300">lightgbm</code> using 5-fold cross-validation.</span>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. BOTTOM NAVIGATION STRIP                                            */}
      {/* ===================================================================== */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0c1421] border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider block">
            Continue Research Exploration
          </span>
          <h3 className="text-lg font-bold text-white">
            Data Cleansing Pipeline &amp; Relational SQL Workbench
          </h3>
          <p className="text-xs text-slate-400 max-w-xl font-light">
            Review the 8-pillar automated data cleansing architecture that sanitized the 45k records, or test custom aggregation queries across the SQL analytics workbench.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onNavigateToCleaning && (
            <button
              onClick={onNavigateToCleaning}
              className="px-4 py-2.5 rounded-lg bg-[#0f131c] hover:bg-[#131824] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono transition-colors inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Data Cleansing Audit</span>
            </button>
          )}
          {onNavigateToSql && (
            <button
              onClick={onNavigateToSql}
              className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors inline-flex items-center gap-2"
            >
              <Database className="w-3.5 h-3.5" />
              <span>SQL Analytics Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
