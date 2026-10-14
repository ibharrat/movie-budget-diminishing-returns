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
  ShieldCheck
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

interface VisualizationPageProps {
  onNavigateToSql?: () => void;
  onNavigateToCleaning?: () => void;
}

export const VisualizationPage: React.FC<VisualizationPageProps> = ({ 
  onNavigateToSql,
  onNavigateToCleaning 
}) => {
  const [selectedModel, setSelectedModel] = useState<string>('gemini');
  const [activeStage, setActiveStage] = useState<'input' | 'output'>('input');
  const [currentChartIndex, setCurrentChartIndex] = useState<number>(0);

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

  const modelTabs = [
    {
      id: 'gemini',
      name: 'Google Gemini',
      shortName: 'Gemini',
      tagline: 'Gemini 2.5 Flash / Pro (via Antigravity)',
      badge: '10 Input EDA + 4 Model Output',
      chartCount: 14,
      status: 'active' as const,
      description: 'Autonomous Python Matplotlib & Pandas visualizations generated by Gemini: 10 systematic exploratory data analysis charts + 4 model prediction & residual analytics.',
      icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'claude',
      name: 'Claude / Anthropic',
      shortName: 'Claude',
      tagline: 'Claude 3.7 Sonnet / Artifacts',
      badge: 'Ready for Staging',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Staging environment to evaluate analytical depth, visual hierarchy, and curve fitting generated by Anthropic Claude.',
      icon: <Cpu className="w-3.5 h-3.5 text-slate-400" />
    },
    {
      id: 'classifier',
      name: 'Supervised Classifier',
      shortName: 'Classifier',
      tagline: 'Random Forest / XGBoost',
      badge: 'ML Staging',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Supervised classification pipeline predicting binary theatrical breakeven (multiplier >= 2.5x) and identifying films at high risk of falling into diminishing returns.',
      icon: <Target className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'regression',
      name: 'Supervised Regressor',
      shortName: 'Regressor',
      tagline: 'Polynomial & ElasticNet',
      badge: 'ML Staging',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Supervised continuous regression modeling the nonlinear diminishing marginal revenue curve (dy/dx), predicting box office gross, and calculating the exact dollar inflection point.',
      icon: <LineChart className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'clustering',
      name: 'Unsupervised Clustering',
      shortName: 'Clustering',
      tagline: 'K-Means & PCA Archetypes',
      badge: 'ML Staging',
      chartCount: 0,
      status: 'staging' as const,
      description: 'Unsupervised clustering pipeline discovering natural multi-dimensional film archetypes (e.g., "Indie Breakouts", "Steady Mid-Budget", "Tentpole Hits", "High-Budget Traps") without preset labels.',
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />
    }
  ];

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
        <div className="w-full pt-1">
          <div className="w-full bg-[#0b0e15] p-1.5 rounded-xl border border-[#1c2436]">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 w-full">
              {modelTabs.map((tab, idx) => {
                const isSelected = tab.id === selectedModel;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedModel(tab.id)}
                    className={`py-2.5 px-2.5 rounded-lg text-xs font-mono transition-colors flex items-center justify-center gap-2 border ${
                      isSelected
                        ? 'bg-[#152338] border-sky-400 text-white font-semibold'
                        : 'border-transparent text-slate-400 hover:text-white hover:bg-[#121824]'
                    } ${idx === modelTabs.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
                  >
                    <div className={isSelected ? 'text-sky-400' : 'text-slate-400'}>
                      {tab.icon}
                    </div>
                    <span className="font-medium tracking-tight truncate">
                      {tab.shortName}
                    </span>
                    {tab.chartCount > 0 ? (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#0c1626] text-sky-300 font-bold border border-sky-500/30">
                        {tab.chartCount}
                      </span>
                    ) : (
                      <span className="hidden md:inline px-1.5 py-0.5 rounded text-[9px] bg-[#121722] text-slate-500 uppercase tracking-wider">
                        Staging
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
              <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono">
                <button
                  onClick={() => { setActiveStage('input'); setCurrentChartIndex(0); }}
                  className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-2 ${
                    activeStage === 'input'
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-[#121824]'
                  }`}
                >
                  <span>1. Input Visualizations (EDA)</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    activeStage === 'input' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-[#121722] text-slate-400'
                  }`}>10</span>
                </button>
                <button
                  onClick={() => { setActiveStage('output'); setCurrentChartIndex(0); }}
                  className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-2 ${
                    activeStage === 'output'
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-[#121824]'
                  }`}
                >
                  <span>2. Output Visualizations (Model Results)</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    activeStage === 'output' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold'
                  }`}>4</span>
                </button>
              </div>
            </div>
            <span className="text-xs font-mono text-sky-300 bg-[#0c1626] px-3 py-1 rounded-md border border-sky-500/30 self-start sm:self-auto">
              {activeStage === 'input' 
                ? 'Empirical Distributions & Pre-Model Feature Relationships' 
                : 'Trained Model Fits, Residual Risk & Marginal Derivative (dy/dx)'}
            </span>
          </div>

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

        </div>
      ) : selectedModel === 'classifier' ? (
        /* Staging Placeholder for Supervised Classification Model */
        <div className="rounded-xl p-8 sm:p-12 border border-[#1c2436] bg-[#0f131c] text-center space-y-6">
          <div className="w-16 h-16 rounded-xl bg-[#0c1626] border border-sky-500/30 flex items-center justify-center mx-auto text-sky-400">
            <Target className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-[#0c1626] border border-sky-500/30 text-sky-400">
              Supervised Machine Learning Staging
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Supervised Classification Visualizations
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Evaluating trained supervised classification models (Random Forest, XGBoost, and Logistic Regression) engineered to predict movie commercial success and diminishing returns risk.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">01. Target Formulation</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Binary classification target <code className="text-sky-300 font-mono">is_profitable</code> (<code className="text-sky-300 font-mono">multiplier &gt;= 2.5</code>), predicting theatrical breakeven based on production capital.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">02. Feature Pipeline</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Multivariable feature matrix: production budget, runtime, one-hot encoded genres, studio tier (Major vs Independent), and release seasonality.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">03. Model Visualizations</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Staging ready for ROC-AUC curves, Confusion Matrix heatmaps, Precision-Recall tradeoff curves, and Tree Feature Importance rankings.
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
      ) : selectedModel === 'regression' ? (
        /* Staging Placeholder for Supervised Regression Model */
        <div className="rounded-xl p-8 sm:p-12 border border-[#1c2436] bg-[#0f131c] text-center space-y-6">
          <div className="w-16 h-16 rounded-xl bg-[#0c1626] border border-sky-500/30 flex items-center justify-center mx-auto text-sky-400">
            <LineChart className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-[#0c1626] border border-sky-500/30 text-sky-400">
              Supervised Continuous Modeling Staging
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Supervised Regression Visualizations
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Modeling continuous box office revenue and multiplier trajectories to compute the exact marginal rate of return and mathematically pinpoint where additional budget investments yield diminishing returns.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">01. Nonlinear Curve Fitting</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Log-transformed ElasticNet, Polynomial Ridge, and Gradient Boosted Regressors fitting continuous <code className="text-sky-300 font-mono">revenue = f(budget)</code>.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">02. Marginal Rate of Return</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Calculating the mathematical first derivative <code className="text-sky-300 font-mono">d(Revenue)/d(Budget)</code> to identify where marginal yield falls below the 2.5x breakeven ray.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">03. Regression Diagnostics</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Staging ready for Predicted vs. Actual Gross scatters, Residual Distribution curves, <code className="text-sky-300 font-mono">R²</code> score analysis, and RMSE confidence bands.
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
      ) : selectedModel === 'clustering' ? (
        /* Staging Placeholder for Unsupervised Clustering Model */
        <div className="rounded-xl p-8 sm:p-12 border border-[#1c2436] bg-[#0f131c] text-center space-y-6">
          <div className="w-16 h-16 rounded-xl bg-[#0c1626] border border-sky-500/30 flex items-center justify-center mx-auto text-sky-400">
            <Network className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-[#0c1626] border border-sky-500/30 text-sky-400">
              Unsupervised Machine Learning Staging
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Unsupervised Clustering &amp; Archetypes
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Applying K-Means clustering and Principal Component Analysis (PCA) to discover natural performance archetypes and capital risk segments without pre-assigned labels.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">01. Multi-Attribute PCA</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Dimensionality reduction projecting budget, worldwide gross, ROI multiplier, runtime, and popularity onto principal variance axes.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">02. Archetype Discovery</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Unsupervised partitioning into "Low-Budget High-Yield Breakouts", "Steady Mid-Budget Earners", "Mega-Blockbusters", and "High-Budget Traps".
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">03. Cluster Diagnostics</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Staging ready for 2D PCA cluster scatter plots with convex hulls, Silhouette Score optimization curves, and Cluster Centroid Radar charts.
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
      ) : (
        /* Staging Placeholder for Claude / Anthropic Model */
        <div className="rounded-xl p-8 sm:p-12 border border-[#1c2436] bg-[#0f131c] text-center space-y-6">
          <div className="w-16 h-16 rounded-xl bg-[#0c1626] border border-sky-500/30 flex items-center justify-center mx-auto text-sky-400">
            <Cpu className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-[#0c1626] border border-sky-500/30 text-sky-400">
              Comparative Benchmark Staging
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Claude 3.7 Sonnet Visualizations
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Evaluating exploratory data visualizations and analytical code generated autonomously by Anthropic Claude for benchmark comparison against Gemini.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">01. Standardized Prompts</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Identical research prompts evaluating budget diminishing returns and studio commercial efficiency.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">02. Identical Dataset</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Evaluated against the exact 45,466 cleaned TMDB records with identical filtering standards.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1.5">
              <span className="text-xs font-mono text-sky-400 font-bold">03. Comparative Evaluation</span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Evaluation on statistical fidelity, visual hierarchy, aesthetic palette choice, and analytical deduction.
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
