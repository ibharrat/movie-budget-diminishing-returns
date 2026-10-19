import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2,
  TrendingDown,
  Building2,
  Film,
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
  Brain,
  Boxes,
  Activity,
  Sliders
} from 'lucide-react';

interface ChartItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  imageSrc: string;
  researchQuestion: string;
  variables: string[];
  analysisDimension?: string;
  bottomLine?: string;
  observation: string;
  interpretation: string;
  researchImplication: string;
  findings: string[];
  icon: React.ReactNode;
}


interface RedesignImprovement {
  chartType: string;
  title: string;
  labels: string;
  scale: string;
  legend: string;
  annotation: string;
  layout: string;
  visualHierarchy: string;
  accessibility: string;
}

interface RedesignStudy {
  id: string;
  number: string;
  findingTitle: string;
  shortTitle: string;
  originalId: string;
  originalTitle: string;
  originalImage: string;
  originalChartType: string;
  originalLimitations: string;
  redesignedImage: string;
  redesignedChartType: string;
  redesignedBreakthrough: string;
  improvements: RedesignImprovement;
  bottomLine: string;
}

interface VisualizationPageProps {
  onNavigateToSql?: () => void;
  onNavigateToCleaning?: () => void;
}

export const VisualizationPage: React.FC<VisualizationPageProps> = ({ 
  onNavigateToSql,
  onNavigateToCleaning 
}) => {
  const [selectedModel, setSelectedModel] = useState<string>('gemini');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'llm' | 'ensemble' | 'deep_learning' | 'econometric'>('all');
  const [activeStage, setActiveStage] = useState<'input' | 'redesign' | 'output'>('input');
  const [currentChartIndex, setCurrentChartIndex] = useState<number>(0);
  const [currentRedesignIndex, setCurrentRedesignIndex] = useState<number>(0);
  const [redesignViewMode, setRedesignViewMode] = useState<'comparison' | 'redesign' | 'original'>('comparison');


  const redesignStudies: RedesignStudy[] = [
    {
      id: 'redesign1',
      number: '01',
      findingTitle: 'The Diminishing Returns Threshold: Returns Cross Below Breakeven at $25M–$65M',
      shortTitle: 'Budget Tier Diminishing Returns',
      originalId: 'eda4',
      originalTitle: 'EDA 04: Group Comparison — Capital Efficiency Curve by Budget Tier',
      originalImage: '/charts/eda4_budget_tier_diminishing.png',
      originalChartType: 'Vertical line & fill plot with raw multiplier Y-axis',
      originalLimitations: 'Vertical orientation forced tilted text; IQR fill created visual noise without indicating profit vs. loss boundaries; title was a generic academic label without stating the key empirical finding.',
      redesignedImage: '/charts/redesign1_budget_tier_diminishing.png',
      redesignedChartType: 'Horizontal Tiered Benchmark Chart with Color-Zoned Profitability Regions',
      redesignedBreakthrough: 'Horizontal layout accommodates full tier descriptions and sample sizes (n=5,372); an explicit vertical 2.5x Breakeven line immediately identifies that $25M+ productions enter the capital bleed zone.',
      improvements: {
        chartType: 'Converted from vertical line plot to an executive horizontal benchmark bar chart, establishing a clear left-to-right reading flow and eliminating awkward label rotation.',
        title: 'Replaced passive topic label with an assertive conclusion: "The Diminishing Returns Threshold: Capital Yield Drops Below Breakeven Above $25M".',
        labels: 'Embedded dual metrics directly at the bar ends (Median Multiple + Breakeven Success Rate + Sample Size n), removing need for secondary lookup tables.',
        scale: 'Anchored X-axis at zero with focused range (0–6.0x) and a prominent 2.5x benchmark marker for instant profitability interpretation.',
        legend: 'Eliminated disconnected legend box; labeled the commercial profit and deficit risk zones directly on the chart canvas.',
        annotation: 'Added shaded "Capital Bleed Zone" (<2.5x) vs "Commercial Profit Zone", plus an explicit pointer callout highlighting the $25M–$65M inflection point.',
        layout: 'Spacious horizontal structure with generous vertical spacing between tiers and zero element overlapping.',
        visualHierarchy: 'Vibrant Icy Blue highlights optimal sub-$25M tiers; muted charcoal and slate demote failing higher-budget tiers.',
        accessibility: 'Meets WCAG AAA contrast (7.8:1) against matte black; uses redundant text badges (+/- status, percentages) alongside color.'
      },
      bottomLine: 'Micro-budgets lead the industry at a 4.82x median return (90% breakeven rate). Once production budgets surpass $25M, median yield drops to 2.38x—falling below the 2.5x breakeven line and confirming diminishing returns.'
    },
    {
      id: 'redesign2',
      number: '02',
      findingTitle: 'Box Office Saturation: Production Budgets >$100M Suffer Logarithmic Flattening',
      shortTitle: 'Budget vs Revenue Saturation',
      originalId: 'eda3',
      originalTitle: 'EDA 03: Relationship Analysis — Production Budget vs. Worldwide Gross Revenue',
      originalImage: '/charts/eda3_budget_vs_revenue_scatter.png',
      originalChartType: 'Raw 5,000-point scatter plot on log-log grid',
      originalLimitations: 'Severe point overplotting created an impenetrable ink blob where 90% of observations were obscured; diagonal ray was hard to distinguish from the trend line; raw scientific axis labels.',
      redesignedImage: '/charts/redesign2_budget_vs_revenue.png',
      redesignedChartType: 'Density Scatter with Empirical Power-Law Curve & Labeled Landmark Outliers',
      redesignedBreakthrough: 'Semi-transparent density rendering reveals true sample concentration; empirical sublinear curve (exponent 0.72) proves diminishing returns; shaded breakeven envelope isolates mega-budget deficit traps.',
      improvements: {
        chartType: 'Upgraded raw scatter to binned density scatter with overlaid empirical power-law fit curve and breakeven divide.',
        title: 'Upgraded from descriptive topic to executive takeaway: "Box Office Saturation: Mega-Budgets Flatten Logarithmically, Squeezing Margins".',
        labels: 'Curated high-signal landmark annotations (Get Out at 56.8x profit vs John Carter & Lone Ranger in the deficit trap vs Avatar at $2.78B ceiling).',
        scale: 'Replaced raw numbers with formatted currency milestones ($100K, $1M, $10M, $100M, $1B, $2B) on both axes.',
        legend: 'Integrated density visual key and line descriptions directly in the upper header subtitle.',
        annotation: 'Shaded two-color envelope separating Net Commercial Profit (>2.5x) from Theatrical Deficit (<2.5x).',
        layout: 'Spacious 16:9 ratio giving ample space for callout arrows without obscuring data density.',
        visualHierarchy: 'Landmark callout boxes pop in high-contrast icy blue; individual data points stay semi-transparent in the background.',
        accessibility: 'Leader lines with distinct colored pill boxes guarantee readability regardless of screen size or color perception.'
      },
      bottomLine: 'Box office revenue scales with a sublinear power-law exponent of 0.72 (< 1.0). Doubling production capital yields only +64% box office, creating a high-budget trap where films over $150M frequently fail to recoup theatrical costs.'
    },
    {
      id: 'redesign3',
      number: '03',
      findingTitle: 'Four Decades of Capital Erosion: Budgets Soared +648% While Returns Halved',
      shortTitle: '40-Year Macro Capital Erosion',
      originalId: 'eda6',
      originalTitle: 'EDA 06: Time-Series Trend Analysis — 40-Year Budget Escalation vs. Compressing Multipliers',
      originalImage: '/charts/eda6_timeseries_decade_trends.png',
      originalChartType: 'Dual-axis line chart with conflicting Y-axes',
      originalLimitations: 'Dual Y-axes ($M on left, multiplier on right) mislead viewers because scale heights are arbitrary; visually difficult to identify when profitability crossed below breakeven.',
      redesignedImage: '/charts/redesign3_timeseries_decade_trends.png',
      redesignedChartType: 'Unified Percentage Growth Index Baseline Chart (1980 = 0%) with Divergence Ribbon',
      redesignedBreakthrough: 'By indexing both metrics to 1980 baseline, viewers immediately grasp the staggering divergence: production cost soared +648% while capital multiple contracted -52%, with an explicit vertical callout at the 2008 breakeven crossover.',
      improvements: {
        chartType: 'Replaced deceptive dual-axis chart with a unified percentage-change index chart anchored at 1980 = 0%.',
        title: 'Declarative finding title: "Four Decades of Capital Erosion: Production Budgets Soared +648% While Returns Halved".',
        labels: 'Direct terminal labels at the right edge of each line (+648% Budget Escalation vs -52% Multiplier Contraction).',
        scale: 'Single unified percentage scale (-70% to +700%) eliminating conflicting dual axis distortion.',
        legend: 'Eliminated disconnected bottom legend; series labels placed directly on the terminal points of the curves.',
        annotation: 'Vertical dashed marker with detailed callout at 2008 marking the structural crossover below the 2.5x breakeven threshold.',
        layout: 'Shaded "Capital Efficiency Gap" ribbon between the two curves visually reinforces the expanding profit deficit.',
        visualHierarchy: 'Budget escalation line rendered in bright Icy Blue (#38bdf8); return yield line in high-contrast slate-white with distinct markers.',
        accessibility: 'Uses distinct point shapes (circles for budget, squares for multiplier) and redundant labels so colorblind users can track series effortlessly.'
      },
      bottomLine: 'Between 1980 and 2020, average movie production budgets escalated from $18.5M to $138.5M (+648%), while box office return multipliers fell from 4.65x down to 2.22x (-52%), structurally breaching the 2.5x breakeven line during the 2008 financial crisis.'
    },
    {
      id: 'redesign4',
      number: '04',
      findingTitle: 'Genre Capital Resilience: Low-Overhead Horror & Mystery Dominate High-CGI Spectacles',
      shortTitle: 'Genre Commercial Efficiency',
      originalId: 'eda7',
      originalTitle: 'EDA 07: Group Comparison — Genre Commercial Efficiency & Breakeven Rates',
      originalImage: '/charts/eda7_genre_efficiency_comparison.png',
      originalChartType: 'Grouped horizontal bars with raw numbers',
      originalLimitations: 'Uniform thick bars cluttered the chart; lacked grouping by budget risk; disconnected legend for breakeven benchmark; no context on average budget required per genre.',
      redesignedImage: '/charts/redesign4_genre_efficiency.png',
      redesignedChartType: 'Grouped Tiered Lollipop / Bullet Benchmark Chart with Average Budget Metadata',
      redesignedBreakthrough: 'Lollipops reduce ink-to-data ratio; genres are categorized into High-Resilience (Overhead <$30M) vs Capital Sinks (Budget >$80M); shows that Horror averages 4.15x on a tiny $12.4M budget, while Action averages only 2.35x despite $84.5M spend.',
      improvements: {
        chartType: 'Converted heavy solid bars into sleek lollipop stems with prominent endpoint markers, dramatically increasing data-ink ratio.',
        title: 'Actionable insight headline: "Genre Capital Efficiency: Horror & Mystery Dominate, While Heavy CGI Breeds Deficits".',
        labels: 'Integrated three metrics per genre: Median Multiple (4.15x), Breakeven Rate (68.4%), and Average Budget ($12.4M).',
        scale: '0 to 5.2x multiplier scale with a prominent vertical benchmark guideline at 2.5x Breakeven.',
        legend: 'Direct category brackets on the chart separating High-Resilience Genres from High-Risk Capital Sinks.',
        annotation: "Annotated callout explaining Horror's structural advantage (premise-driven, low CGI, high viral word-of-mouth).",
        layout: 'Genres grouped by financial risk tier with generous vertical breathing room between items.',
        visualHierarchy: 'Profitable genres highlighted in vibrant Icy Blue with white markers; sub-breakeven genres styled in muted charcoal and slate.',
        accessibility: 'High contrast 8:1 text badges, clear non-color tier brackets, and text annotations for every single data point.'
      },
      bottomLine: 'Horror (4.15x) and Mystery (3.30x) lead Hollywood in commercial efficiency with 68%+ breakeven resilience on low average budgets ($12M–$18M). In contrast, heavy-CGI Action ($84.5M budget, 2.35x) and Sci-Fi ($92.1M budget, 2.20x) fall below the 2.5x breakeven line.'
    },
    {
      id: 'redesign5',
      number: '05',
      findingTitle: 'Statistical Feature Engineering: Transforming Power-Law Raw Skew into Model-Ready Bell Curves',
      shortTitle: 'Distribution Normalization',
      originalId: 'eda1',
      originalTitle: 'EDA 01: Distribution Analysis — Budget & Revenue Log-Normal Skew',
      originalImage: '/charts/eda1_distribution_histograms.png',
      originalChartType: 'Two side-by-side histograms with mathematical log10 notations',
      originalLimitations: 'Did not display the original raw linear distribution, making it impossible for viewers to understand why the transformation was required; exponent labels (10^7.3) confused non-technical audiences.',
      redesignedImage: '/charts/redesign5_distribution_normalization.png',
      redesignedChartType: 'Before-and-After Dual-Panel Transformation Study (Raw Linear Skew vs Log10 Normal Bell Curve)',
      redesignedBreakthrough: 'Side-by-side comparison proves the necessity of data transformation: Left panel exposes the raw linear failure (93.4% of films crushed in the first bin); Right panel demonstrates the restored Gaussian bell curve ready for linear and neural network modeling.',
      improvements: {
        chartType: 'Created a direct "Before vs After" comparative panel layout contrasting Raw Linear Skew against Log10 Normalization.',
        title: 'Methodological takeaway headline: "Statistical Feature Normalization: Eliminating Power-Law Distortion for AI Models".',
        labels: 'Replaced confusing exponent notation (10^7) with human-readable financial landmarks ($100K, $1M, $10M, $100M, $1B).',
        scale: 'Left panel shows raw linear millions ($0 to $360M); Right panel maps logarithmic progression with annotated dollar tick marks.',
        legend: 'In-panel statistical summary cards displaying Mean, Median, and Skewness parameters.',
        annotation: 'Callout explaining the 93.4% pileup in linear space, and callout highlighting the restored homoscedasticity on the log curve.',
        layout: 'Two balanced panels with clear visual distinction ("Before Redesign" in muted slate, "After Redesign" in vibrant Icy Blue).',
        visualHierarchy: 'Transformed Gaussian peak accentuated with solid Icy Blue bar; raw skewed distribution rendered in subdued dark slate.',
        accessibility: 'Clear dual labels, high contrast borders, and layperson explanations of technical statistical requirements.'
      },
      bottomLine: 'Raw movie financial metrics exhibit extreme power-law right skew ($10k to $2.8B), packing 93.4% of observations into the first linear bin and breaking regression assumptions. Log10 transformation restores Gaussian symmetry around a $20M median budget and $50M median gross, stabilizing model variance.'
    }
  ];

  const inputCharts: ChartItem[] = [
    {
      id: 'eda1',
      number: '01',
      title: 'Distribution Analysis: Budget & Revenue Log-Normal Skew',
      shortTitle: 'Log Distributions',
      imageSrc: '/charts/eda1_distribution_histograms.png',
      researchQuestion: 'How are budgets and revenues distributed across the 45k films?',
      variables: ['budget (log10)', 'revenue (log10)', 'mean', 'median'],
      analysisDimension: 'Distributions',
      bottomLine:
        'Most movies make modest revenue; a handful of giant blockbusters pull up the averages. Logarithmic scaling is necessary so multi-billion-dollar outliers don\'t break our machine learning models.',
      observation:
        'Budgets and revenues are heavily right-skewed ($10k to $2.8B). A log10 transform normalizes the data into clean bell curves centered at a median $20M budget and $50M box office.',
      interpretation:
        'Film economics follow power laws: thousands of small films compete for limited screens, while a tiny fraction of mega-tentpoles capture most industry revenues.',
      researchImplication:
        'Machine learning algorithms must train on log-transformed financial features, otherwise mega-blockbusters will distort model coefficients.',
      findings: [
        'Extreme Skew: Budgets and box office span 5 orders of magnitude ($10k to $2.8B).',
        'Log Normalization: Log10 scaling centers budgets at $20M and revenues at $50M.',
        'Model Rule: Log transforms prevent extreme outliers from biasing regressions.'
      ],
      icon: <BarChart3 className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda2',
      number: '02',
      title: 'Correlation Matrix: Negative Correlation with Capital Multiplier',
      shortTitle: 'Correlation Heatmap',
      imageSrc: '/charts/eda2_correlation_matrix.png',
      researchQuestion: 'How do budgets, revenues, and return multipliers correlate?',
      variables: ['budget', 'revenue', 'multiplier (revenue/budget)', 'popularity'],
      analysisDimension: 'Correlations',
      bottomLine:
        'Bigger budgets generate more total revenue (r = +0.74), but they actually LOWER return on investment (r = -0.28). In plain English: bigger movies bring in more cash, but deliver worse profit per dollar spent.',
      observation:
        'Production budget strongly correlates with gross revenue (r = +0.74), but has an inverse negative correlation with the box office return multiplier (r = -0.28).',
      interpretation:
        'Spending more buys higher gross ticket sales, but profit margins shrink because expensive films must clear enormous hurdle rates just to break even.',
      researchImplication:
        'Predicting raw revenue is mathematically different from predicting profitability. Our research evaluates capital efficiency (ROI multiplier), not just gross sales.',
      findings: [
        'Gross vs ROI: Budget drives gross sales (+0.74), but reduces return multiplier (-0.28).',
        'Margin Erosion: Every additional dollar invested yields lower percentage returns.',
        'Secondary Factors: Popularity (+0.48) and runtime (+0.31) correlate positively with budget.'
      ],
      icon: <Network className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda3',
      number: '03',
      title: 'Budget vs. Worldwide Gross: Sublinear Flattening & High-Budget Traps',
      shortTitle: 'Budget vs Revenue Scatter',
      imageSrc: '/charts/eda3_budget_vs_revenue_scatter.png',
      researchQuestion: 'How does box office scale with budget, and where do mega-budget traps appear?',
      variables: ['budget (USD)', 'revenue (USD)', 'breakeven threshold (2.5x)'],
      analysisDimension: 'Relationships',
      bottomLine:
        'Box office growth flattens out as budgets rise. Low-budget films easily clear the 2.5x breakeven line, while $200M+ mega-productions frequently fall below it.',
      observation:
        'The scatter plot follows a flattening curve. Films under $25M frequently beat the 2.5x breakeven ray (up to 56x for Get Out), while several $200M+ films fall below breakeven.',
      interpretation:
        'Global moviegoer attention is finite. Doubling VFX and production spending cannot double ticket sales once the theatrical market reaches natural saturation.',
      researchImplication:
        'Linear models will fail. Algorithms must use non-linear curves to account for revenue flattening at high budgets.',
      findings: [
        'Flattening Curve: Revenue follows a sublinear logarithmic curve rather than a straight line.',
        'Low-Budget Upside: Sub-$25M movies regularly achieve viral multiples (e.g. Get Out at 56x).',
        'Mega-Budget Traps: $200M+ films often fail the 2.5x breakeven line despite high sales.'
      ],
      icon: <BarChart3 className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda4',
      number: '04',
      title: 'Box Office Multiplier by Tier: The Diminishing Returns Curve',
      shortTitle: 'Diminishing Returns Curve',
      imageSrc: '/charts/eda4_budget_tier_diminishing.png',
      researchQuestion: 'At what budget tier do average returns fall below breakeven?',
      variables: ['budget_tier', 'median_multiplier', 'breakeven benchmark (2.5x)'],
      analysisDimension: 'Group Differences',
      bottomLine:
        'Returns collapse across budget tiers: micro-budget films average a 4.8x return, while $140M+ blockbusters drop to 2.1x—falling below the 2.5x breakeven line.',
      observation:
        'Median multipliers drop steadily from 4.82x for <$5M films to 3.24x ($5M–$25M), dipping below the 2.5x breakeven line at $25M–$65M (2.38x), down to 2.07x for $140M+.',
      interpretation:
        'The sweet spot is $5M–$25M: high production polish without bloated overhead. Above $65M, marketing overhead explodes, compressing net margins.',
      researchImplication:
        'Pinpoints $25M–$65M as the critical zone where diminishing returns push the typical film into financial unprofitability.',
      findings: [
        'Peak Efficiency: Micro-budgets (<$5M) lead with a 4.82x median multiplier.',
        'The Tipping Point: Returns dip below the 2.5x breakeven benchmark in the $25M–$65M tier (2.38x).',
        'Blockbuster Squeeze: Mega-budgets ($140M+) average only 2.07x, confirming diminishing returns.'
      ],
      icon: <TrendingDown className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda5',
      number: '05',
      title: 'Outlier Multipliers: Viral Upside vs. Blockbuster Downside',
      shortTitle: 'Outlier Boxplot',
      imageSrc: '/charts/eda5_outlier_multipliers_boxplot.png',
      researchQuestion: 'Where do viral upside hits and catastrophic loss outliers concentrate?',
      variables: ['budget_tier', 'multiplier (log-scale)', 'viral outliers'],
      analysisDimension: 'Outliers',
      bottomLine:
        'Low-budget movies enjoy unlimited viral upside (up to 12,000x cost), while mega-blockbusters face a hard ceiling and massive downside risk.',
      observation:
        'Micro-budget releases display massive positive outliers (Paranormal Activity at 12,890x). The $140M+ tier has zero viral outliers and clusters tightly near 1x–2x.',
      interpretation:
        'Low budgets have positive asymmetry: you can only lose $5M, but you can make $100M. Mega-budgets have negative asymmetry: massive downside with capped upside.',
      researchImplication:
        'Models must use robust loss functions (Huber or Median) so viral micro-budget hits don\'t distort standard error estimates.',
      findings: [
        'Asymmetric Upside: Viral hits (100x–12,000x) happen exclusively in low-budget tiers.',
        'Compressed Ceiling: Mega-budget films ($140M+) never exceed 12x return.',
        'Robust Math: Extreme low-budget outliers require median-based models over simple averages.'
      ],
      icon: <Target className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda6',
      number: '06',
      title: '40-Year Macro Trends: Budget Escalation vs. Compressing Yield',
      shortTitle: '40-Year Decade Trends',
      imageSrc: '/charts/eda6_timeseries_decade_trends.png',
      researchQuestion: 'How have budgets and returns evolved historically over the last 40 years?',
      variables: ['release_decade (1980–2020)', 'avg_budget', 'avg_multiplier'],
      analysisDimension: 'Trends',
      bottomLine:
        'Over 40 years, average budgets jumped +648%, while return multipliers dropped from 4.6x to 2.2x. Hollywood is spending far more to make less.',
      observation:
        'Average budgets climbed from $18.5M in 1980 to $138.5M in 2020 (+648%). Concurrently, return multipliers dropped from 4.65x down to 2.22x, crossing breakeven around 2008.',
      interpretation:
        'VFX inflation and global marketing wars escalated faster than ticket sales, structurally compressing industry profit margins over four decades.',
      researchImplication:
        'Historical era is a major confounding factor; models must include release year to control for secular industry margin compression.',
      findings: [
        'Budget Inflation: Average budgets climbed +648% from $18.5M (1980) to $138.5M (2020).',
        'Margin Erosion: Average returns steadily dropped from 4.65x to 2.22x (crossing breakeven in 2008).',
        'Temporal Control: Release decade must be an explicit variable to adjust for inflation.'
      ],
      icon: <Clock className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda7',
      number: '07',
      title: 'Genre Commercial Efficiency: ROI Ranking & Breakeven Rates',
      shortTitle: 'Genre Efficiency Ranking',
      imageSrc: '/charts/eda7_genre_efficiency_comparison.png',
      researchQuestion: 'Which genres offer the highest capital efficiency and breakeven rates?',
      variables: ['genres', 'median_multiplier', 'breakeven rate (>= 2.5x)'],
      analysisDimension: 'Group Differences (Genre)',
      bottomLine:
        'Horror is the most profitable genre (4.15x return, 68% breakeven rate). Action and Sci-Fi require huge budgets but average under 2.4x return, failing breakeven.',
      observation:
        'Horror leads with a 4.15x median multiplier and 68.4% breakeven rate. Action (2.35x), Sci-Fi (2.20x), and Adventure (2.10x) fall below the 2.5x breakeven line.',
      interpretation:
        'Horror relies on premise and suspense rather than expensive stars or VFX. Action and Sci-Fi require massive budgets that dilute return per dollar.',
      researchImplication:
        'Genre is one of the strongest predictors of profitability; models must include one-hot encoded genre flags to capture efficiency differences.',
      findings: [
        'Most Profitable: Horror (4.15x) and Mystery (3.30x) lead the industry in capital efficiency.',
        'Least Efficient: Action (2.35x), Sci-Fi (2.20x), and Adventure (2.10x) fail the 2.5x threshold.',
        'Strong Predictor: Genre is one of the highest-weight features in predicting profitability.'
      ],
      icon: <Film className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda8',
      number: '08',
      title: 'Missing-Data Patterns: Sparsity Audit & Theatrical Filtering',
      shortTitle: 'Missing-Data Patterns',
      imageSrc: '/charts/eda8_missing_data_patterns.png',
      researchQuestion: 'How does data sparsity affect the 45k records, and how do we clean it?',
      variables: ['raw count (45,466)', 'cleaned theatrical count (5,372)'],
      analysisDimension: 'Missing Data',
      bottomLine:
        '~80% of the raw 45k films lack budget or box office figures. We isolated 5,372 verified theatrical releases to keep our analysis mathematically sound.',
      observation:
        'In the raw dataset, 80.3% of budgets and 83.7% of revenues are missing or zero. Filtering for verified theatrical releases isolates a clean sample of 5,372 feature films.',
      interpretation:
        '$0 entries represent untracked indie or international titles in community scrapes, not free movies. Retaining them would cause division-by-zero errors.',
      researchImplication:
        'Validates our data cleaning pipeline: models strictly train on films with verified theatrical financials, preventing statistical corruption.',
      findings: [
        'Data Sparsity: 80.3% of raw titles report $0 budget or revenue (untracked indies/shorts).',
        'Quality Filter: We filter for verified theatrical pairs (budget >= $10k, revenue >= $10k).',
        'Clean Sample: Leaves 5,372 high-quality theatrical films for reliable modeling.'
      ],
      icon: <Layers className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda9',
      number: '09',
      title: 'Studio Scale vs. Profitability: Conglomerates vs. Boutiques',
      shortTitle: 'Studio Scale Comparison',
      imageSrc: '/charts/eda9_studio_scale_profitability.png',
      researchQuestion: 'Do major conglomerates suffer from diminishing returns more than indies?',
      variables: ['studio_tier', 'budget_tier', 'breakeven rate (>= 2.5x)'],
      analysisDimension: 'Group Differences (Studio)',
      bottomLine:
        'Indie studios (A24, Blumhouse) achieve near 60% breakeven rates through budget discipline. Major conglomerates average only 43% breakeven on mega-budgets.',
      observation:
        'Independent studios outperform major conglomerates at low and mid budgets (62% vs 48% breakeven). Major studios drop to 43% breakeven on $140M+ tentpoles.',
      interpretation:
        'Indie studios operate with lean budgets and focused marketing. Major conglomerates rely on high-cost saturation releases that squeeze profit margins.',
      researchImplication:
        'Studio scale must be an interaction feature; backing from a major conglomerate does not guarantee success and increases capital risk.',
      findings: [
        'Indie Agility: Independent studios beat majors at low/mid budgets (62.4% vs 48.2% breakeven).',
        'Conglomerate Risk: Major studios concentrate capital in $140M+ tiers where breakeven falls to 43.1%.',
        'Scale Penalty: Massive corporate scale increases downside vulnerability rather than safety.'
      ],
      icon: <Building2 className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'eda10',
      number: '10',
      title: 'Seasonality Anomalies: Summer Squeeze vs. Counter-Programming',
      shortTitle: 'Seasonal Release Windows',
      imageSrc: '/charts/eda10_seasonality_anomalies.png',
      researchQuestion: 'How does release calendar timing impact box office returns?',
      variables: ['release_month', 'release_season', 'avg_multiplier'],
      analysisDimension: 'Anomalies',
      bottomLine:
        'Summer is a blockbuster trap: $150M+ movies crowd May–July and cannibalize each other (2.34x return). Winter and Fall counter-programming yields higher profits.',
      observation:
        'Summer releases average the highest budgets ($86.5M) but the lowest multipliers (2.34x, below breakeven). Winter (3.45x) and Fall (3.12x) deliver higher returns on lower budgets.',
      interpretation:
        'Studios release multiple mega-blockbusters in the same summer weeks, splitting theater screens and audience wallets. Off-peak releases face less competition.',
      researchImplication:
        'Models must include seasonal release flags (is_summer, is_holiday) to adjust for calendar crowding effects.',
      findings: [
        'Summer Squeeze: May–July has highest budgets ($86.5M) but lowest returns (2.34x, below breakeven).',
        'Counter-Programming: Winter (3.45x) and Fall (3.12x) deliver higher returns on lower budgets.',
        'Seasonal Control: Calendar release window is a mandatory control feature for models.'
      ],
      icon: <Calendar className="w-4 h-4 text-sky-400" />
    }
  ];

  const outputCharts: ChartItem[] = [
    {
      id: 'out1',
      number: '01',
      title: 'Model Predictions vs. Actual Box Office (Diminishing Return Fit)',
      shortTitle: 'Predictions vs. Actuals',
      imageSrc: '/charts/output1_predicted_vs_actual.png',
      researchQuestion: 'How accurately does the model predict revenue, and does it capture the diminishing return curve?',
      variables: ['actual_gross', 'predicted_gross (ŷ)', 'budget', 'R² = 0.742'],
      analysisDimension: 'Model Prediction',
      bottomLine:
        'Spending more money on a movie hits a hard revenue ceiling. Low-budget films (<$25M) consistently beat expectations, while mega-budget blockbusters ($140M+) flatten out below breakeven.',
      observation:
        'The prediction curve rises quickly, then bends flat. Low-budget films (<$25M) sit above the line (+18%), while $140M+ films flatten below the 2.5x breakeven ray.',
      interpretation:
        'Theater demand has a natural cap. Spending $200M on CGI and ads cannot force twice as many people into theaters as spending $50M on a strong script.',
      researchImplication:
        'Disproves the Hollywood myth that doubling budgets doubles box office. Revenue gains decelerate rapidly as budgets climb.',
      findings: [
        'High Accuracy: Model captures 74% of revenue trends (R² = 0.742) across thousands of films.',
        'Low Budgets Win: Sub-$25M movies beat predictions by +18% on average.',
        'Blockbuster Ceiling: $140M+ films flatten out and fail to generate proportional box office.'
      ],
      icon: <LineChart className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'out2',
      number: '02',
      title: 'Downside Financial Risk: Error Spread Across Budget Tiers',
      shortTitle: 'Residual Error Analysis',
      imageSrc: '/charts/output2_residual_analysis.png',
      researchQuestion: 'Where do model prediction errors concentrate, and does downside risk scale with budget?',
      variables: ['residuals (y - ŷ)', 'budget_tier', 'risk_variance'],
      analysisDimension: 'Residual Error Analysis',
      bottomLine:
        'Big budgets do not make movies safer—they make flops catastrophic. Error spread stays within ±$18M for low budgets, but explodes to ±$142M for $140M+ films.',
      observation:
        'The error spread fans out like a megaphone. Prediction errors stay under ±$18M for budgets under $25M, but explode to ±$142M for budgets over $140M.',
      interpretation:
        'If a $15M film flops, the loss is manageable. If a $200M tentpole flops, the studio can lose over $100M in a weekend, threatening company solvency.',
      researchImplication:
        'Financial risk is not constant. Budgets over $100M carry exponentially higher catastrophe risk and must be managed as volatile gambles.',
      findings: [
        'Low-Budget Stability: Films under $25M have tight, predictable outcomes (errors within ±$18M).',
        'Mega-Budget Volatility: Above $140M, prediction error explodes eightfold to ±$142M.',
        'Flop Severity: Big budgets don\'t reduce risk; they amplify the financial severity of a miss.'
      ],
      icon: <TrendingDown className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'out3',
      number: '03',
      title: 'What Drives Profitability: Feature Importance Weights',
      shortTitle: 'Feature Importance Weights',
      imageSrc: '/charts/output3_feature_importance.png',
      researchQuestion: 'Which input features drive box office and profitability predictions the most?',
      variables: ['feature_weights', 'budget', 'genre_horror', 'studio_scale'],
      analysisDimension: 'Feature Sensitivity',
      bottomLine:
        'Budget sets the scale (34%), but genre and studio discipline dictate actual profitability. Low-cost genres like Horror (+18.5%) punch way above their weight.',
      observation:
        'Production budget accounts for 34.2% of predictive importance. Horror and Thriller provide +18.5% positive boost, while major conglomerate scale has negative weights.',
      interpretation:
        'Budget dictates potential revenue scale, but genre and cost discipline decide if the film makes money. High-concept low-budget films deliver massive profit margins.',
      researchImplication:
        'Predicting gross revenue is very different from predicting profit. Studios should greenlight based on genre efficiency rather than budget size.',
      findings: [
        'Budget Sets Scale: Budget dictates gross volume (34.2%), but not profit percentage.',
        'Genre Drives Profit: Horror and Thriller provide the highest profit margin boost (+18.5%).',
        'Studio Discipline: Smaller, disciplined studios beat conglomerates on return per dollar.'
      ],
      icon: <Target className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'out4',
      number: '04',
      title: 'The Tipping Point: Marginal Rate of Return (dy/dx Curve)',
      shortTitle: 'Marginal Rate Derivative (dy/dx)',
      imageSrc: '/charts/output4_marginal_derivative.png',
      researchQuestion: 'At what exact budget dollar threshold does the marginal rate of return fall below breakeven?',
      variables: ['dy/dx (marginal multiplier)', 'production_budget', 'inflection_point = $42.5M'],
      analysisDimension: 'Mathematical Derivative',
      bottomLine:
        'The exact point of diminishing returns is $42.5 Million. Below $42.5M, every $1 returns over $2.50. Beyond $42.5M, returns drop below breakeven.',
      observation:
        'The marginal multiplier curve slopes downward from 4.8x, crossing below the 2.5x theatrical breakeven line at exactly $42.5 Million.',
      interpretation:
        'Below $42.5M, capital goes into core storytelling and talent. Beyond $42.5M, money goes into inflated fees and redundant CGI that don\'t produce extra ticket sales.',
      researchImplication:
        'Directly answers our central research question: $42.5M is the optimal budget cap. Spending beyond this threshold yields diminishing returns on capital.',
      findings: [
        'Inflection Point ($42.5M): $42.5 Million is the exact mathematical tipping point for movie budgets.',
        'High Early Yield: Micro-budgets return up to $4.80 per dollar spent—well above breakeven.',
        'Sub-Breakeven Beyond $42.5M: Past $42.5M, each additional dollar yields less than $2.50 in box office.'
      ],
      icon: <CheckCircle2 className="w-4 h-4 text-sky-400" />
    }
  ];

  const currentCharts = activeStage === 'input' ? inputCharts : outputCharts;
  const currentChart = currentCharts[currentChartIndex] || currentCharts[0];

  const nextChart = () => {
    setCurrentChartIndex((prev) => (prev + 1) % currentCharts.length);
  };

  const prevChart = () => {
    setCurrentChartIndex((prev) => (prev - 1 + currentCharts.length) % currentCharts.length);
  };

  const currentRedesign = redesignStudies[currentRedesignIndex] || redesignStudies[0];

  const nextRedesign = () => {
    setCurrentRedesignIndex((prev) => (prev + 1) % redesignStudies.length);
  };

  const prevRedesign = () => {
    setCurrentRedesignIndex((prev) => (prev - 1 + redesignStudies.length) % redesignStudies.length);
  };


  const modelTabs = [
    // Family 1: LLM Reasoning & Autonomous AI Agents
    {
      id: 'gemini',
      name: 'Google Gemini',
      shortName: 'Gemini',
      category: 'llm' as const,
      tagline: 'Gemini 2.5 Flash / Pro (via Antigravity)',
      badge: '10 EDA + 5 Redesigns + 4 Models',
      chartCount: 19,
      status: 'active' as const,
      description: 'Autonomous Python Matplotlib & Pandas visualizations generated by Gemini: 10 exploratory EDA charts + 5 professional static redesign studies + 4 predictive model outputs.',
      icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Sparkles className="w-8 h-8" />,
      point1Title: '01. Automated Code Synthesis',
      point1Desc: 'Directly generated our 10 exploratory EDA charts and 5 static redesign studies using automated Python code sandboxing.',
      point2Title: '02. Empirical Nonlinear Regression',
      point2Desc: 'Fitted logarithmic curves demonstrating that beyond $100M, median box office multiplier flattens to sublinear levels.',
      point3Title: '03. Visual Analytics Diagnostics',
      point3Desc: 'Comprehensive visual suite covering feature distributions, correlation matrices, residual fans, and dy/dx derivatives.'
    },
    {
      id: 'claude',
      name: 'Anthropic Claude',
      shortName: 'Claude 3.7',
      category: 'llm' as const,
      tagline: 'Claude 3.7 Sonnet / Extended Thinking',
      badge: 'Reasoning Benchmark',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Extended thinking and deep reasoning for econometric validation, symbolic consistency checks, and stress-testing the 2.5x theatrical breakeven hypothesis.',
      icon: <Cpu className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Cpu className="w-8 h-8" />,
      point1Title: '01. Econometric Deductions',
      point1Desc: 'Symbolic verification of marginal revenue concavity and mathematical cross-checks of 2.5x theatrical breakeven formulas.',
      point2Title: '02. Extended Thinking Pipeline',
      point2Desc: 'Validating hypothesis consistency across $100M+ high-risk budget tiers against historical box office data.',
      point3Title: '03. Benchmark Diagnostics',
      point3Desc: 'Staging for deductive chain verification, narrative clarity metrics, and mathematical consistency checks.'
    },
    {
      id: 'gpt4o',
      name: 'OpenAI GPT-4o',
      shortName: 'GPT-4o',
      category: 'llm' as const,
      tagline: 'Omni-Modal Few-Shot Reasoning',
      badge: 'Synthesis Staging',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Multi-modal narrative reasoning, executive briefing synthesis, and cross-studio competitive elasticity analysis.',
      icon: <Brain className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Brain className="w-8 h-8" />,
      point1Title: '01. Cross-Studio Elasticity',
      point1Desc: 'Synthesis of corporate studio scale versus boutique studio capital elasticity and theatrical release crowding.',
      point2Title: '02. Qualitative Metadata',
      point2Desc: 'Processing production background notes, cast ensembles, and marketing spend disclosures from unstructured logs.',
      point3Title: '03. Executive Briefing',
      point3Desc: 'Staging for automated executive research briefings and high-level studio risk management takeaways.'
    },
    {
      id: 'deepseek_r1',
      name: 'DeepSeek-R1',
      shortName: 'DeepSeek-R1',
      category: 'llm' as const,
      tagline: 'Open Reasoning MoE (671B)',
      badge: 'Math Calculus',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Autonomous chain-of-thought derivations of first and second derivatives (dy/dx and d²y/dx² < 0) proving diminishing returns concavity.',
      icon: <Activity className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Activity className="w-8 h-8" />,
      point1Title: '01. Symbolic Calculus',
      point1Desc: 'Deriving the exact continuous first and second derivatives of the revenue-to-budget function across polynomial and log models.',
      point2Title: '02. Mathematical Proofs',
      point2Desc: 'Rigorously proving concavity (d²y/dx² < 0) and establishing that marginal revenue strictly decreases with budget scale.',
      point3Title: '03. Tipping Point Calculus',
      point3Desc: 'Staging for formal proof outputs confirming the exact $42.5M capital inflection point.'
    },
    {
      id: 'llama3',
      name: 'Meta Llama 3.3 (70B Instruct)',
      shortName: 'Llama 3.3',
      category: 'llm' as const,
      tagline: 'Open-Weight Metadata Extractor',
      badge: 'Local NLP',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Local open-weight NLP extraction of franchise, cast, sequel, and marketing indicators from 45k unstructured plot overviews without cloud API dependence.',
      icon: <Layers className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Layers className="w-8 h-8" />,
      point1Title: '01. Local Entity Extraction',
      point1Desc: 'Extracting franchise markers, sequel order, and IP flags from 45,000+ movie overviews directly on-premise.',
      point2Title: '02. Unstructured Synthesis',
      point2Desc: 'Mining categorical signals from raw textual metadata without external third-party API dependencies.',
      point3Title: '03. NLP Classification',
      point3Desc: 'Staging for precision-recall extraction curves and categorical metadata confidence metrics.'
    },

    // Family 2: Gradient Boosted Trees & Ensemble Classifiers
    {
      id: 'xgboost',
      name: 'XGBoost Regressor',
      shortName: 'XGBoost',
      category: 'ensemble' as const,
      tagline: 'Second-Order Gradient Tree Boosting',
      badge: 'Active ML',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Second-order Taylor series gradient boosted trees capturing non-linear feature interactions between budget tier, multi-genre flags, and release date.',
      icon: <Target className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Target className="w-8 h-8" />,
      point1Title: '01. Second-Order Gradients',
      point1Desc: 'Utilizes first and second derivatives of the loss function to accurately navigate steep box office revenue cliffs.',
      point2Title: '02. Regularized Splits',
      point2Desc: 'L1/L2 leaf penalties preventing tree overfitting on high-budget blockbuster outlier tails.',
      point3Title: '03. Feature Importance',
      point3Desc: 'Staging for Gain-based importance bar charts and SHAP (Shapley Additive exPlanations) values.'
    },
    {
      id: 'classifier',
      name: 'Random Forest Classifier & Regressor',
      shortName: 'Random Forest',
      category: 'ensemble' as const,
      tagline: 'Bootstrap Bagging Ensemble (500 Trees)',
      badge: 'Active ML',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Supervised classification pipeline predicting binary theatrical breakeven (multiplier >= 2.5x) and identifying films at high risk of falling into diminishing returns.',
      icon: <Target className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Target className="w-8 h-8" />,
      point1Title: '01. Target Formulation',
      point1Desc: 'Binary classification target is_profitable (multiplier >= 2.5), predicting theatrical breakeven based on production capital.',
      point2Title: '02. Feature Pipeline',
      point2Desc: 'Multivariable feature matrix: production budget, runtime, one-hot encoded genres, studio tier, and release seasonality.',
      point3Title: '03. Model Visualizations',
      point3Desc: 'Staging ready for ROC-AUC curves, Confusion Matrix heatmaps, and Precision-Recall tradeoff curves.'
    },
    {
      id: 'lightgbm',
      name: 'LightGBM (Light Gradient Boosted Machine)',
      shortName: 'LightGBM',
      category: 'ensemble' as const,
      tagline: 'Leaf-Wise Histogram Boosting',
      badge: 'Fast Tabular',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Histogram binning and Exclusive Feature Bundling (EFB) enabling millisecond-speed optimization and zero memory degradation on sparse movie metadata.',
      icon: <Activity className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Activity className="w-8 h-8" />,
      point1Title: '01. Histogram Binning',
      point1Desc: 'Rapid continuous feature discretization for sub-second training across 45k records without sorting bottlenecks.',
      point2Title: '02. Sparse Feature Handling',
      point2Desc: 'Gradient-Based One-Side Sampling (GOSS) handling 90% missing metadata attributes natively.',
      point3Title: '03. Learning Curve',
      point3Desc: 'Staging for validation loss curves, memory consumption benchmarks, and tree depth histograms.'
    },
    {
      id: 'catboost',
      name: 'CatBoost (Categorical Boosting)',
      shortName: 'CatBoost',
      category: 'ensemble' as const,
      tagline: 'Oblivious Trees with Ordered Statistics',
      badge: 'Categorical ML',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Natively processes high-cardinality categorical entities (20 genres, 89 languages, 150+ production companies) without target leakage or one-hot explosion.',
      icon: <Boxes className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Boxes className="w-8 h-8" />,
      point1Title: '01. Native Categorical Encoding',
      point1Desc: 'Ordered target statistics for 20 genres, 89 languages, and 150+ production companies without manual one-hot explosion.',
      point2Title: '02. Leakage Elimination',
      point2Desc: 'Online permutation target encoding preventing statistical data leakage on rare indie studios and niche genres.',
      point3Title: '03. Model Visualizations',
      point3Desc: 'Staging for categorical feature interaction matrices and cross-validation loss graphs.'
    },
    {
      id: 'gbrt',
      name: 'Gradient Boosted Regression Trees (GBRT)',
      shortName: 'Scikit GBRT',
      category: 'ensemble' as const,
      tagline: 'Sequential Additive Residuals',
      badge: 'PDP Engine',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Computes Partial Dependence Plots (PDP) showing the marginal effect of budget alone on box office while holding all other features fixed.',
      icon: <LineChart className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <LineChart className="w-8 h-8" />,
      point1Title: '01. Partial Dependence',
      point1Desc: 'Computes Partial Dependence Plots isolating the marginal effect of budget alone while controlling for all other factors.',
      point2Title: '02. Robust Huber Loss',
      point2Desc: 'Huber loss function maintaining mathematical stability in the presence of asymmetric box office outliers.',
      point3Title: '03. Model Visualizations',
      point3Desc: 'Staging for 1D and 2D Partial Dependence Curves showing isolated budget elasticities.'
    },

    // Family 3: Deep Learning & Tabular Neural Architectures
    {
      id: 'tabnet',
      name: 'TabNet (Attentive Interpretable Tabular Learning)',
      shortName: 'TabNet',
      category: 'deep_learning' as const,
      tagline: 'Sequential Multi-Step Attention with Sparsemax',
      badge: 'Deep Learning',
      chartCount: 0,
      status: 'staging' as const,
      description: 'End-to-end differentiable neural architecture combining tree-like interpretability with gradient descent representation learning and instance-level masks.',
      icon: <Brain className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Brain className="w-8 h-8" />,
      point1Title: '01. Sparsemax Feature Masks',
      point1Desc: 'Sequential multi-step attention selecting which features contribute at each decision step for individual films.',
      point2Title: '02. Instance Explainability',
      point2Desc: 'Uncovers whether budget, genre, or release calendar drove the prediction for each individual movie.',
      point3Title: '03. Mask Heatmaps',
      point3Desc: 'Staging for sequential attention heatmaps and feature attribution matrices.'
    },
    {
      id: 'ft_transformer',
      name: 'FT-Transformer (Feature Tokenizer Transformer)',
      shortName: 'FT-Transformer',
      category: 'deep_learning' as const,
      tagline: 'Self-Attention Across Feature Tokens',
      badge: 'Deep Learning',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Adapts standard vision/language transformer self-attention to numerical continuous features and categorical entity embeddings for cinema data.',
      icon: <Cpu className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Cpu className="w-8 h-8" />,
      point1Title: '01. Feature Tokenization',
      point1Desc: 'Projects continuous numbers and categorical embeddings into a shared high-dimensional embedding manifold.',
      point2Title: '02. Multi-Head Self-Attention',
      point2Desc: 'Detects multi-way synergistic interactions between studio scale, release season, and budget size.',
      point3Title: '03. Attention Weights',
      point3Desc: 'Staging for inter-feature attention weight matrices and embedding projection scatter plots.'
    },
    {
      id: 'mlp',
      name: 'Multi-Layer Perceptron (MLP Deep Regressor)',
      shortName: 'MLP Regressor',
      category: 'deep_learning' as const,
      tagline: '4-Layer Deep Feedforward Network',
      badge: 'Deep Learning',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Smooth continuous neural manifold fitting with batch normalization and Swish activations for gradient propagation across extreme financial scales.',
      icon: <Layers className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Layers className="w-8 h-8" />,
      point1Title: '01. Non-Linear Manifold',
      point1Desc: '4-layer feedforward network with Swish activations and dropout (256-128-64-1) for continuous curve fitting.',
      point2Title: '02. Gradient Normalization',
      point2Desc: 'Batch normalization stabilizing gradient flow across extreme financial budget ranges.',
      point3Title: '03. Training Dynamics',
      point3Desc: 'Staging for train versus validation MSE loss decay curves and weight distribution histograms.'
    },
    {
      id: 'nam',
      name: 'Neural Additive Models (NAM)',
      shortName: 'NAM Additive',
      category: 'deep_learning' as const,
      tagline: 'Linear Combination of Deep Shape Networks',
      badge: '100% Explainable',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Combines the predictive power of deep neural nets with the linear interpretability of Generalized Additive Models (GAMs).',
      icon: <Sliders className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Sliders className="w-8 h-8" />,
      point1Title: '01. Individual Feature Sub-nets',
      point1Desc: 'Each feature is passed through its own independent deep neural net f_i(x_i) to produce an isolated response.',
      point2Title: '02. Transparent Curvature',
      point2Desc: 'Directly visualizes the exact non-linear shape function for budget, isolating the exact curvature of diminishing returns.',
      point3Title: '03. Shape Function Plots',
      point3Desc: 'Staging for non-parametric learned 1D shape curves for budget, runtime, and release year.'
    },
    {
      id: 'autoencoder',
      name: 'Autoencoder Tabular Anomaly Detector',
      shortName: 'Tabular Autoencoder',
      category: 'deep_learning' as const,
      tagline: 'Bottleneck Encoder-Decoder Network',
      badge: 'Anomaly Detector',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Compresses film metadata into an 8-dimensional latent space to flag extreme statistical outliers, catastrophic write-downs, and viral anomalies.',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <ShieldCheck className="w-8 h-8" />,
      point1Title: '01. Latent Bottleneck',
      point1Desc: 'Compresses 24 film attributes into an 8-dimensional latent space to learn baseline movie economics.',
      point2Title: '02. Reconstruction Loss',
      point2Desc: 'Computes reconstruction error MSE to identify films whose financials defy standard industry physics.',
      point3Title: '03. Anomaly Scatters',
      point3Desc: 'Staging for latent space reconstruction error distribution and anomaly score rankings.'
    },

    // Family 4: Econometric, Statistical & Unsupervised Learning
    {
      id: 'regression',
      name: 'Supervised Regressor & ElasticNet Splines',
      shortName: 'ElasticNet Splines',
      category: 'econometric' as const,
      tagline: 'Cubic B-Splines with Penalized Derivatives',
      badge: 'Active ML',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Supervised continuous regression modeling the nonlinear diminishing marginal revenue curve (dy/dx), predicting box office gross, and calculating the exact dollar inflection point.',
      icon: <LineChart className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <LineChart className="w-8 h-8" />,
      point1Title: '01. Nonlinear Curve Fitting',
      point1Desc: 'Log-transformed ElasticNet, Polynomial Ridge, and Cubic Splines fitting continuous revenue = f(budget).',
      point2Title: '02. Marginal Rate of Return (dy/dx)',
      point2Desc: 'Calculating the mathematical first derivative d(Revenue)/d(Budget) crossing the 2.5x breakeven ray at $42.5M.',
      point3Title: '03. Regression Diagnostics',
      point3Desc: 'Staging ready for Predicted vs. Actual Gross scatters, Residual Distribution curves, and R² score analysis.'
    },
    {
      id: 'clustering',
      name: 'Unsupervised Clustering & PCA Archetypes',
      shortName: 'K-Means & PCA',
      category: 'econometric' as const,
      tagline: 'Orthogonal Eigenvectors & Voronoi Centroids',
      badge: 'Active ML',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Unsupervised clustering pipeline discovering natural multi-dimensional film archetypes (e.g., "Indie Breakouts", "Steady Mid-Budget", "Tentpole Hits", "High-Budget Traps") without preset labels.',
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Network className="w-8 h-8" />,
      point1Title: '01. Multi-Attribute PCA',
      point1Desc: 'Dimensionality reduction projecting budget, worldwide gross, ROI multiplier, and runtime onto principal variance axes.',
      point2Title: '02. Archetype Discovery',
      point2Desc: 'Unsupervised partitioning into "Low-Budget High-Yield Breakouts", "Steady Mid-Budget", and "High-Budget Traps".',
      point3Title: '03. Cluster Diagnostics',
      point3Desc: 'Staging ready for 2D PCA cluster scatter plots with convex hulls and Silhouette Score optimization curves.'
    },
    {
      id: 'quantile',
      name: 'Quantile Regression (Tau = 0.25, 0.50, 0.75, 0.90)',
      shortName: 'Quantile Regressor',
      category: 'econometric' as const,
      tagline: 'Pinball / Check-Loss Minimization',
      badge: 'Asymmetric Risk',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Estimates conditional median and tail quantiles of box office revenue, proving that financial risk scales asymmetrically with budget size.',
      icon: <TrendingDown className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <TrendingDown className="w-8 h-8" />,
      point1Title: '01. Conditional Quantiles',
      point1Desc: 'Estimates median (0.50), downside failure (0.25), and viral upside tail (0.90) slopes.',
      point2Title: '02. Asymmetric Risk Spread',
      point2Desc: 'Proves that high budgets drastically amplify downside flop risk (error ±$142M) while upside returns flatten.',
      point3Title: '03. Quantile Fan Plots',
      point3Desc: 'Staging for multi-quantile regression fan lines and heteroskedastic confidence intervals.'
    },
    {
      id: 'bayesian',
      name: 'Bayesian Ridge Regression',
      shortName: 'Bayesian Ridge',
      category: 'econometric' as const,
      tagline: 'Gamma Priors & Posterior Weights',
      badge: 'Credible Intervals',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Estimates parameter uncertainty directly from data, quantifying model confidence and providing 95% Bayesian credible intervals where $150M+ data is sparse.',
      icon: <Activity className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Activity className="w-8 h-8" />,
      point1Title: '01. Parameter Uncertainty',
      point1Desc: 'Computes full posterior distributions over model weights using Gamma precision priors.',
      point2Title: '02. Sparse Tier Regularization',
      point2Desc: 'Quantifies prediction uncertainty where high-budget data is scarce ($150M+ range).',
      point3Title: '03. Posterior Bands',
      point3Desc: 'Staging for 95% Bayesian credible interval bands around the diminishing returns trajectory.'
    },
    {
      id: 'umap',
      name: 'UMAP + HDBSCAN Density Clustering',
      shortName: 'UMAP + HDBSCAN',
      category: 'econometric' as const,
      tagline: 'Topological Density Manifold',
      badge: 'Density Clustering',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Preserves both local and global multi-dimensional geometry to discover nonlinear clusters of high-efficiency low-budget films without forced partitioning.',
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />,
      iconLarge: <Network className="w-8 h-8" />,
      point1Title: '01. Manifold Geometry',
      point1Desc: 'Preserves both local and global multi-dimensional geometry without linear projection constraints.',
      point2Title: '02. Density Segmentation',
      point2Desc: 'Hierarchical density-based clustering identifying dense organic movie performance clusters.',
      point3Title: '03. Topological Embeddings',
      point3Desc: 'Staging for interactive 2D UMAP projections highlighting isolated micro-budget success clusters.'
    }
  ];

  const filteredModelTabs = modelTabs.filter(m => selectedCategory === 'all' || m.category === selectedCategory);
  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 space-y-12 overflow-x-hidden">
      
      {/* 1. Header & Consolidated Model Selector */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0c1626] border border-sky-500/30 text-xs font-mono text-sky-400">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>MODEL BENCHMARK SUITE</span>
            </div>
            {onNavigateToSql && (
              <button
                onClick={onNavigateToSql}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0f131c] hover:bg-[#131824] border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono text-sky-300 transition-colors self-start sm:self-auto"
              >
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>Explore Relational SQL Analytics &amp; Visualizations &rarr;</span>
              </button>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visualizations &amp; Model Comparison
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Comparing visual exploratory analytics and predictive architectures on movie budget diminishing returns across AI agents and machine learning models.
          </p>
        </div>

        {/* Consolidated Model Segmented Control Bar */}
        <div className="w-full pt-1 space-y-2.5">
          {/* Category Filter Tabs */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
              Model Benchmark Suite (20 Models Total)
            </span>
            <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All (20)' },
                { id: 'llm', label: 'LLM Agents (5)' },
                { id: 'ensemble', label: 'Ensemble Trees (5)' },
                { id: 'deep_learning', label: 'Deep Tabular (5)' },
                { id: 'econometric', label: 'Econometrics (5)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 20-Model Selector Grid */}
          <div className="w-full bg-[#0b0e15] p-2 rounded-xl border border-[#1c2436]">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-1.5 w-full">
              {filteredModelTabs.map((tab) => {
                const isSelected = tab.id === selectedModel;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedModel(tab.id)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-mono transition-colors flex items-center justify-between gap-1.5 border text-left ${
                      isSelected
                        ? 'bg-[#152338] border-sky-400 text-white font-semibold'
                        : 'border-transparent text-slate-400 hover:text-white hover:bg-[#121824]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <div className={isSelected ? 'text-sky-400' : 'text-slate-400'}>
                        {tab.icon}
                      </div>
                      <span className="font-medium tracking-tight truncate">
                        {tab.shortName}
                      </span>
                    </div>
                    {tab.chartCount > 0 ? (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#0c1626] text-sky-300 font-bold border border-sky-500/30 shrink-0">
                        {tab.chartCount}
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#121722] text-slate-500 uppercase tracking-wider shrink-0">
                        Staged
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Model Visualization Canvas */}
      {selectedModel === 'gemini' ? (
        <div className="rounded-xl p-5 sm:p-8 border border-[#1c2436] bg-[#0f131c] space-y-6">
          
          {/* Stage Switcher: Input Visualizations (EDA) vs Output Visualizations (Model Results) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#1c2436]">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold hidden sm:inline">
                Pipeline Stage:
              </span>
              <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono overflow-x-auto max-w-full">
                <button
                  onClick={() => { setActiveStage('input'); setCurrentChartIndex(0); }}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    activeStage === 'input'
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-[#121824]'
                  }`}
                >
                  <span>1. Exploratory EDA</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    activeStage === 'input' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-[#121722] text-slate-400'
                  }`}>10</span>
                </button>
                <button
                  onClick={() => { setActiveStage('redesign'); setCurrentRedesignIndex(0); }}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    activeStage === 'redesign'
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-[#121824]'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>2. Redesign Studio</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    activeStage === 'redesign' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold'
                  }`}>5</span>
                </button>
                <button
                  onClick={() => { setActiveStage('output'); setCurrentChartIndex(0); }}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    activeStage === 'output'
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-[#121824]'
                  }`}
                >
                  <span>3. Model Benchmarks</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    activeStage === 'output' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-[#121722] text-slate-400'
                  }`}>4</span>
                </button>
              </div>
            </div>
            <span className="text-xs font-mono text-sky-300 bg-[#0c1626] px-3 py-1 rounded-md border border-sky-500/30 self-start sm:self-auto">
              {activeStage === 'input' 
                ? 'Empirical Distributions & Pre-Model Feature Relationships' 
                : activeStage === 'redesign'
                ? 'Turning Analysis into Effective Visual Communication (5 Studies)'
                : 'Trained Model Fits, Residual Risk & Marginal Derivative (dy/dx)'}
            </span>
          </div>


          {/* ================================================================= */}
          {/* REDESIGN STUDIO (ASSIGNMENT 6)                                    */}
          {/* ================================================================= */}
          {activeStage === 'redesign' ? (
            <div className="space-y-6">
              
              {/* 5-Study Case Selector Bar */}
              <div className="w-full bg-[#0b0e15] p-1.5 rounded-xl border border-[#1c2436]">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 w-full">
                  {redesignStudies.map((study, idx) => {
                    const isSelected = idx === currentRedesignIndex;
                    return (
                      <button
                        key={study.id}
                        onClick={() => setCurrentRedesignIndex(idx)}
                        className={`py-2 px-2.5 rounded-lg text-xs font-mono transition-colors flex flex-col items-center justify-center gap-1 border ${
                          isSelected
                            ? 'bg-[#152338] border-sky-400 text-white font-semibold'
                            : 'border-transparent text-slate-400 hover:text-white hover:bg-[#121824]'
                        } ${idx === redesignStudies.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
                      >
                        <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-sky-300' : 'text-sky-400'}`}>
                          Study 0{idx + 1}
                        </span>
                        <span className="truncate max-w-full text-[11px] font-medium text-center">
                          {study.shortTitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Study Header & View Mode Switcher */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                      Redesign Study {currentRedesign.number} of 05 &bull; Static Communication
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {currentRedesign.originalId.toUpperCase()} &rarr; Publication-Grade Redesign
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                    {currentRedesign.findingTitle}
                  </h2>
                </div>

                {/* View Mode Controls: Side-by-Side vs Redesigned vs Original */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono self-start lg:self-auto shrink-0">
                  <button
                    onClick={() => setRedesignViewMode('comparison')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      redesignViewMode === 'comparison'
                        ? 'bg-sky-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    onClick={() => setRedesignViewMode('redesign')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      redesignViewMode === 'redesign'
                        ? 'bg-sky-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Redesigned (Final)
                  </button>
                  <button
                    onClick={() => setRedesignViewMode('original')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      redesignViewMode === 'original'
                        ? 'bg-sky-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Original (EDA)
                  </button>
                </div>
              </div>

              {/* Visual Display: Side-by-Side OR Single Focus */}
              {redesignViewMode === 'comparison' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Left: Original Exploratory Chart */}
                  <div className="rounded-xl border border-[#1c2436] bg-[#0b0e15] p-4 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#1c2436]">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#141b29] text-slate-300 border border-[#1c2436]">
                        Before: Exploratory ({currentRedesign.originalId.toUpperCase()})
                      </span>
                      <a
                        href={currentRedesign.originalImage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <span>Full Res</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-[#1c2436] bg-[#07090e] p-2 flex items-center justify-center min-h-[300px]">
                      <img
                        src={currentRedesign.originalImage}
                        alt={currentRedesign.originalTitle}
                        className="w-full h-auto object-contain max-h-[380px] rounded"
                      />
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                        Original Exploratory Limitations
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {currentRedesign.originalLimitations}
                      </p>
                    </div>
                  </div>

                  {/* Right: Redesigned Static Chart */}
                  <div className="rounded-xl border border-sky-500/40 bg-[#0c1421] p-4 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-sky-500/20">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                        After: Redesigned Static (Final)
                      </span>
                      <a
                        href={currentRedesign.redesignedImage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-sky-400 hover:text-white flex items-center gap-1"
                      >
                        <span>Full Res</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-sky-500/30 bg-[#07090e] p-2 flex items-center justify-center min-h-[300px]">
                      <img
                        src={currentRedesign.redesignedImage}
                        alt={currentRedesign.findingTitle}
                        className="w-full h-auto object-contain max-h-[380px] rounded"
                      />
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#0f131c] border border-sky-500/30 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                        Effective Communication Breakthrough
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed font-light">
                        {currentRedesign.redesignedBreakthrough}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-[#1c2436] bg-[#07090e] p-3 sm:p-5 flex flex-col items-center justify-center space-y-3">
                  <div className="w-full flex items-center justify-between pb-2 border-b border-[#1c2436]">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                      {redesignViewMode === 'redesign' ? 'Redesigned Static Visualization (Final)' : 'Original Exploratory Chart (Assignment 5)'}
                    </span>
                    <a
                      href={redesignViewMode === 'redesign' ? currentRedesign.redesignedImage : currentRedesign.originalImage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-sky-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Open Full Resolution</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <img
                    src={redesignViewMode === 'redesign' ? currentRedesign.redesignedImage : currentRedesign.originalImage}
                    alt={currentRedesign.findingTitle}
                    className="w-full h-auto object-contain max-h-[580px] rounded-lg"
                  />
                  <p className="text-xs text-slate-400 font-mono text-center">
                    {redesignViewMode === 'redesign' ? currentRedesign.redesignedBreakthrough : currentRedesign.originalLimitations}
                  </p>
                </div>
              )}

              {/* The Bottom Line Banner */}
              <div className="rounded-lg p-3.5 sm:p-4 border border-sky-500/40 bg-[#0c1421] flex items-start gap-3">
                <div className="p-2 rounded-md bg-[#101b2b] text-sky-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                    The Bottom Line
                  </span>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                    {currentRedesign.bottomLine}
                  </p>
                </div>
              </div>

              {/* 9-Point Systematic Improvement Audit Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-[#1c2436]">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    9 Systematic Visualization Improvements (Redesign Specification)
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Transforming Exploratory Analysis &rarr; Professional Static Communication
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { number: '01', dimension: 'Chart Type', text: currentRedesign.improvements.chartType },
                    { number: '02', dimension: 'Title', text: currentRedesign.improvements.title },
                    { number: '03', dimension: 'Labels', text: currentRedesign.improvements.labels },
                    { number: '04', dimension: 'Scale', text: currentRedesign.improvements.scale },
                    { number: '05', dimension: 'Legend', text: currentRedesign.improvements.legend },
                    { number: '06', dimension: 'Annotation', text: currentRedesign.improvements.annotation },
                    { number: '07', dimension: 'Layout', text: currentRedesign.improvements.layout },
                    { number: '08', dimension: 'Visual Hierarchy', text: currentRedesign.improvements.visualHierarchy },
                    { number: '09', dimension: 'Accessibility', text: currentRedesign.improvements.accessibility }
                  ].map(item => (
                    <div 
                      key={item.number} 
                      className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] hover:border-sky-500/30 transition-colors space-y-1.5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            {item.dimension}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold">
                            {item.number}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Navigation Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1c2436]">
                <button
                  onClick={prevRedesign}
                  className="px-4 py-2 rounded-lg bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 transition-colors flex items-center gap-2 text-xs font-mono"
                >
                  <ChevronLeft className="w-4 h-4 text-sky-400" />
                  <span>Previous Study</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {redesignStudies.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentRedesignIndex(idx)}
                      className={`h-2 rounded-full transition-colors ${
                        idx === currentRedesignIndex
                          ? 'w-6 bg-sky-400'
                          : 'w-2 bg-[#1c2436] hover:bg-[#2c3852]'
                      }`}
                      title={`Jump to Study 0${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextRedesign}
                  className="px-4 py-2 rounded-lg bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 transition-colors flex items-center gap-2 text-xs font-mono"
                >
                  <span>Next Study</span>
                  <ChevronRight className="w-4 h-4 text-sky-400" />
                </button>
              </div>

            </div>
          ) : (
            /* Standard Exploratory EDA & Model Output Visualizations */
            <>
          {/* Header of Active Chart: Title, Counter & Arrow Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                  {activeStage === 'input' ? 'Input EDA' : 'Model Output'} &bull; Chart {currentChart.number} of {currentCharts.length.toString().padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Google Gemini &bull; Matplotlib
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                {currentChart.title}
              </h2>
            </div>

            {/* Controls: Prev / Indicators / Next & Full Res Link */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={prevChart}
                className="px-2.5 py-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 transition-colors flex items-center gap-1 text-xs font-mono"
                title="Previous Chart"
              >
                <ChevronLeft className="w-4 h-4 text-sky-400" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {currentCharts.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => setCurrentChartIndex(idx)}
                    className={`h-2 rounded-full transition-colors ${
                      idx === currentChartIndex
                        ? 'w-6 bg-sky-400'
                        : 'w-2 bg-[#1c2436] hover:bg-[#2c3852]'
                    }`}
                    title={`Jump to Chart ${c.number}`}
                  />
                ))}
              </div>

              <button
                onClick={nextChart}
                className="px-2.5 py-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 transition-colors flex items-center gap-1 text-xs font-mono"
                title="Next Chart"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4 text-sky-400" />
              </button>

              <a
                href={currentChart.imageSrc}
                target="_blank"
                rel="noreferrer"
                className="ml-1 p-2 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-sky-400 border border-[#1c2436] hover:border-sky-500/40 transition-colors inline-flex items-center"
                title="Open Full Resolution in new tab"
              >
                <ExternalLink className="w-4 h-4 text-sky-400" />
              </a>
            </div>
          </div>

          {/* Rendered Chart Image */}
          <div className="relative group rounded-lg overflow-hidden border border-[#1c2436] bg-[#07090e] p-2 sm:p-4 flex items-center justify-center min-h-[380px]">
            {/* Floating Left Arrow */}
            <button
              onClick={prevChart}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-lg bg-[#0b0e15]/90 hover:bg-sky-500 hover:text-slate-950 text-white border border-[#1c2436] opacity-70 group-hover:opacity-100 transition-colors"
              title="Previous Chart"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Active Chart Image */}
            <img
              key={currentChart.id}
              src={currentChart.imageSrc}
              alt={currentChart.title}
              className="w-full h-auto object-contain max-h-[560px] rounded-lg transition-opacity duration-300"
              loading="eager"
            />

            {/* Floating Right Arrow */}
            <button
              onClick={nextChart}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-lg bg-[#0b0e15]/90 hover:bg-sky-500 hover:text-slate-950 text-white border border-[#1c2436] opacity-70 group-hover:opacity-100 transition-colors"
              title="Next Chart"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Plain English Bottom Line Banner - Flat matte */}
          {currentChart.bottomLine && (
            <div className="rounded-lg p-3.5 sm:p-4 border border-sky-500/40 bg-[#0c1421] flex items-start gap-3">
              <div className="p-2 rounded-md bg-[#101b2b] text-sky-400 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                  The Bottom Line
                </span>
                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                  {currentChart.bottomLine}
                </p>
              </div>
            </div>
          )}

          {/* Structured Triad Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
            {/* Left: Dimension, Question, Variables & Key Highlights */}
            <div className="lg:col-span-4 space-y-3.5">
              {/* Card 1: Focus, Inquiry & Variables */}
              <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Analysis Focus
                  </span>
                  {currentChart.analysisDimension && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0c1626] text-sky-300 border border-sky-500/30">
                      {currentChart.analysisDimension}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-200 font-medium leading-snug">
                  "{currentChart.researchQuestion}"
                </p>
                <div className="pt-2 border-t border-[#1c2436] flex flex-wrap gap-1">
                  {currentChart.variables.map((v, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0f131c] text-slate-400 border border-[#1c2436]">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 2: 3 Key Highlights */}
              <div className="p-3.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                  3 Key Highlights
                </span>
                <ul className="space-y-1.5">
                  {currentChart.findings.map((f, i) => (
                    <li key={i} className="text-xs text-slate-300 leading-snug flex items-start gap-1.5">
                      <span className="text-sky-400 font-bold shrink-0">&bull;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Crisp 3-Part Insight Cards */}
            <div className="lg:col-span-8 p-4 sm:p-5 rounded-lg bg-[#0c1421] border border-sky-500/30 flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                {/* 1. Observation */}
                <div className="p-3 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                      1. Visual Evidence (Observation)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-3 font-light">
                    {currentChart.observation}
                  </p>
                </div>

                {/* 2. Interpretation */}
                <div className="p-3 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                      2. Industry Context (Interpretation)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-3 font-light">
                    {currentChart.interpretation}
                  </p>
                </div>

                {/* 3. Research Implication */}
                <div className="p-3 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                      3. Research Takeaway (Implication)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-3 font-light">
                    {currentChart.researchImplication}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-sky-500/20 flex items-center justify-between text-[10px] font-mono text-sky-300/70">
                <span>Triad Framework: Observation &rarr; Interpretation &rarr; Research Implication</span>
                <span>2.5x Breakeven Rule</span>
              </div>
            </div>
          </div>

          {/* Bottom Prev / Next Navigation Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-[#1c2436]">
            <button
              onClick={prevChart}
              className="px-4 py-2 rounded-lg bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 transition-colors flex items-center gap-2 text-xs font-mono"
            >
              <ChevronLeft className="w-4 h-4 text-sky-400" />
              <span>Previous Chart</span>
            </button>

            <span className="text-xs font-mono text-slate-400">
              Viewing {activeStage === 'input' ? 'Input EDA' : 'Model Output'} <span className="text-sky-400 font-bold">{currentChart.number}</span> of {currentCharts.length.toString().padStart(2, '0')}
            </span>

            <button
              onClick={nextChart}
              className="px-4 py-2 rounded-lg bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 transition-colors flex items-center gap-2 text-xs font-mono"
            >
              <span>Next Chart</span>
              <ChevronRight className="w-4 h-4 text-sky-400" />
            </button>
          </div>
            </>
          )}

        </div>
      ) : (
        /* Unified Staging Panel for Any of the 19 Benchmarked Models */
        (() => {
          const currentModel = modelTabs.find(m => m.id === selectedModel) || modelTabs[1];
          return (
            <div className="rounded-xl p-8 sm:p-12 border border-[#1c2436] bg-[#0f131c] text-center space-y-6">
              <div className="w-16 h-16 rounded-xl bg-[#0c1626] border border-sky-500/30 flex items-center justify-center mx-auto text-sky-400">
                {currentModel.iconLarge}
              </div>

              <div className="max-w-2xl mx-auto space-y-3">
                <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-[#0c1626] border border-sky-500/30 text-sky-400">
                  {currentModel.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {currentModel.name}
                </h2>
                <p className="text-xs font-mono text-sky-300">
                  {currentModel.tagline}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {currentModel.description}
                </p>
              </div>

              <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
                <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
                  <span className="text-xs font-mono text-sky-400 font-bold">{currentModel.point1Title}</span>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {currentModel.point1Desc}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
                  <span className="text-xs font-mono text-sky-400 font-bold">{currentModel.point2Title}</span>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {currentModel.point2Desc}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
                  <span className="text-xs font-mono text-sky-400 font-bold">{currentModel.point3Title}</span>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {currentModel.point3Desc}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedModel('gemini')}
                  className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Return to Gemini Visualizations (Active)</span>
                </button>
              </div>
            </div>
          );
        })()
      )}

      {/* 3. Research Navigation Strip */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0c1421] border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider block">
            Continue Research Exploration
          </span>
          <h3 className="text-lg font-bold text-white">
            Data Cleansing Architecture &amp; SQL Analytics
          </h3>
          <p className="text-xs text-slate-400 max-w-xl font-light">
            Inspect our 8-pillar data cleansing pipeline, or test relational aggregations across the SQL workbench.
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
