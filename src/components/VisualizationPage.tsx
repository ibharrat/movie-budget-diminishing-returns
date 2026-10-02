import React, { useState } from 'react';
import { 
  BarChart3, 
  Table, 
  Tag, 
  CheckCircle2,
  TrendingDown,
  Building2,
  Film,
  ExternalLink,
  Sparkles,
  Sliders,
  Code2,
  AlertTriangle,
  Layers,
  Database,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Target,
  LineChart,
  Network
} from 'lucide-react';

interface DatasetAttribute {
  aspect: string;
  category: 'Overview' | 'Variables & Types' | 'Data Quality & Distribution';
  details: string;
  notes: string;
}

interface ColumnDetail {
  name: string;
  type: string;
  variableClass: 'Target' | 'Numerical' | 'Categorical' | 'Date/Time' | 'Text/Metadata';
  missingness: string;
  description: string;
}

interface CleaningPillar {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  affectedColumns: string[];
  scope: string;
  investigation: string;
  remediation: string;
  codeSnippet: string;
}

interface ChartItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  imageSrc: string;
  researchQuestion: string;
  variables: string[];
  findings: string[];
  icon: React.ReactNode;
}

interface VisualizationPageProps {
  onNavigateToSql?: () => void;
}

export const VisualizationPage: React.FC<VisualizationPageProps> = ({ onNavigateToSql }) => {
  const [selectedModel, setSelectedModel] = useState<string>('gemini');
  const [activeStage, setActiveStage] = useState<'input' | 'output'>('input');
  const [currentChartIndex, setCurrentChartIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'numerical' | 'categorical' | 'target'>('all');
  const [selectedPillarId, setSelectedPillarId] = useState<string>('missing-values');

  const inputCharts: ChartItem[] = [
    {
      id: 'chart1',
      number: '01',
      title: 'Box Office Multiplier by Budget Range (The Diminishing Returns Threshold)',
      shortTitle: 'Diminishing Returns Curve',
      imageSrc: '/charts/chart1_diminishing_returns.png',
      researchQuestion: 'At what budget range do movies tend to have diminishing returns?',
      variables: ['budget (binned)', 'revenue', 'multiplier (revenue/budget)'],
      findings: [
        'Capital efficiency peaks in the micro (<$5M) and low-budget ($5M–$25M) brackets, generating median multipliers of 4.82x and 3.24x respectively.',
        'The Diminishing Returns Inflexion occurs between $25M and $65M: median returns compress to 2.38x, crossing below the 2.5x theatrical breakeven threshold.',
        'For tentpoles ($65M–$140M) and mega-blockbusters ($140M+), median multiples flatten further to 2.26x and 2.07x, confirming severe diminishing marginal yield.'
      ],
      icon: <TrendingDown className="w-4 h-4 text-purple-400" />
    },
    {
      id: 'chart2',
      number: '02',
      title: 'Production Budget vs. Worldwide Box Office (Marginal Flattening & Outliers)',
      shortTitle: 'Revenue vs. Budget Scatter',
      imageSrc: '/charts/chart2_budget_vs_revenue_scatter.png',
      researchQuestion: 'How does gross revenue scale as budgets expand, and what are the outlier extremes?',
      variables: ['budget (USD)', 'revenue (USD)', 'multiplier', 'title'],
      findings: [
        'The fitted logarithmic trendline reveals strong sub-linear curvature: incremental millions spent above $100M yield progressively flatter revenue increases.',
        'High-budget traps (e.g. John Carter at $250M, Battleship at $220M) fall significantly below the red 2.5x breakeven line despite grossing over $280M+.',
        'Asymmetric upside thrives at lower budget levels: films like Get Out ($4.5M) and Pulp Fiction ($8M) achieve disproportionate 25x–56x box office returns.'
      ],
      icon: <BarChart3 className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 'chart3',
      number: '03',
      title: 'Genre Commercial Efficiency: Does Genre Impact Diminishing Returns?',
      shortTitle: 'Genre ROI Ranking',
      imageSrc: '/charts/chart3_genre_roi_comparison.png',
      researchQuestion: 'Does the movie genre have an impact on overall revenue trends?',
      variables: ['genres', 'budget', 'revenue', 'breakeven status (multiplier >= 2.5)'],
      findings: [
        'Horror is the most capital-efficient genre in cinema history, boasting a 4.15x median multiplier and a 68.4% theatrical breakeven rate.',
        'Mystery (3.30x) and Animation (2.95x) also consistently outperform the 2.5x breakeven threshold.',
        'Action (2.35x), Sci-Fi (2.20x), and Adventure (2.10x) suffer from heavy CGI budget inflation, leading to median returns below theatrical breakeven.'
      ],
      icon: <Film className="w-4 h-4 text-amber-400" />
    },
    {
      id: 'chart4',
      number: '04',
      title: 'Studio Scale vs. Profitability: Do Major Studios Suffer More Diminishing Returns?',
      shortTitle: 'Studio Scale Comparison',
      imageSrc: '/charts/chart4_studio_scale_profitability.png',
      researchQuestion: 'Do larger conglomerate studios deal with diminishing returns more than boutique/independent studios?',
      variables: ['production_companies', 'budget_tier', 'multiplier >= 2.5'],
      findings: [
        'Independent / Mini-Major studios (e.g., A24, Blumhouse, Lionsgate) significantly outperform majors at the <$15M (62.4% vs 48.2%) and $15M–$60M (59.8% vs 54.6%) tiers.',
        'Major conglomerate studios concentrate their capital heavily in the $140M+ tier, where the success rate collapses to just 43.1%.',
        'Demonstrates that massive corporate capital allocation increases financial downside exposure rather than guaranteeing profitability.'
      ],
      icon: <Building2 className="w-4 h-4 text-violet-400" />
    }
  ];

  const outputCharts: ChartItem[] = [
    {
      id: 'out1',
      number: '01',
      title: 'Model Predictions vs. Actual Box Office (Diminishing Curvature Fit)',
      shortTitle: 'Predictions vs. Actuals',
      imageSrc: '/charts/output1_predicted_vs_actual.png',
      researchQuestion: 'How accurately does the model predict revenue, and does it capture the diminishing return curve?',
      variables: ['actual_gross', 'predicted_gross (ŷ)', 'budget', 'R² = 0.742'],
      findings: [
        'The nonlinear ElasticNet model achieves an R² of 0.742 on the test set, accurately tracing the diminishing box office yield curve.',
        'Sub-$25M releases consistently outperform model expectations with positive upside variance (averaging +18% above predicted gross).',
        'Films with budgets above $140M show severe prediction dampening: the fitted curve flattens significantly below the 2.5x breakeven ray.'
      ],
      icon: <LineChart className="w-4 h-4 text-purple-400" />
    },
    {
      id: 'out2',
      number: '02',
      title: 'Model Residual Error Spread (Downside Risk Expansion Across Tiers)',
      shortTitle: 'Residual Error Analysis',
      imageSrc: '/charts/output2_residual_analysis.png',
      researchQuestion: 'Where do model prediction errors concentrate, and does financial downside risk scale with budget?',
      variables: ['residuals (y - ŷ)', 'budget_tier', 'variance heteroscedasticity'],
      findings: [
        'Residual spread remains tightly bounded within ±$18M for low-budget tiers (<$25M), confirming predictable financial risk.',
        'Residual error balloons to an extreme interquartile spread of ±$142M in the $140M+ tier, with strong negative skew.',
        'Proves statistically that large-budget productions amplify downside catastrophe risk rather than stabilizing returns.'
      ],
      icon: <TrendingDown className="w-4 h-4 text-rose-400" />
    },
    {
      id: 'out3',
      number: '03',
      title: 'Model Feature Importance & Sensitivity (Gini Contribution Weights)',
      shortTitle: 'Feature Importance Weights',
      imageSrc: '/charts/output3_feature_importance.png',
      researchQuestion: 'Which input features drive the model’s box office and profitability predictions the most?',
      variables: ['feature_weights', 'gini_impurity', 'log_budget', 'genre_horror'],
      findings: [
        'Production Budget (log-transformed) accounts for the largest share of predictive variance at 34.2%.',
        'Horror and Thriller genres provide the highest positive coefficient (18.5%), delivering high commercial efficiency per dollar.',
        'Studio Scale accounts for 14.2% of predictive importance, with major conglomerates showing negative efficiency coefficients.'
      ],
      icon: <Target className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 'out4',
      number: '04',
      title: 'Marginal Rate of Return Derivative Curve (The Inflection Threshold)',
      shortTitle: 'Marginal Rate Derivative (dy/dx)',
      imageSrc: '/charts/output4_marginal_derivative.png',
      researchQuestion: 'At what exact budget dollar threshold does the marginal rate of return fall below breakeven?',
      variables: ['dy/dx (marginal multiplier)', 'production_budget', 'inflection_point = $42.5M'],
      findings: [
        'The mathematical first derivative dy/dx begins at a 4.8x marginal multiplier for micro-budgets and decays steadily.',
        'The critical inflection point is mathematically located at ~$42.5M, where the marginal derivative drops below the 2.5x breakeven ray.',
        'Beyond $42.5M, every additional $1.00 of production capital yields less than $2.50 in incremental gross, confirming diminishing returns.'
      ],
      icon: <CheckCircle2 className="w-4 h-4 text-amber-400" />
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
      badge: '4 Input + 4 Output',
      chartCount: 8,
      status: 'active' as const,
      description: 'Autonomous Python Matplotlib & Pandas visualizations generated by Gemini: 4 Input EDA distribution charts + 4 Output model prediction & residual analytics.',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />
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
      icon: <Target className="w-3.5 h-3.5 text-purple-400" />
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
      icon: <LineChart className="w-3.5 h-3.5 text-purple-400" />
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
      icon: <Network className="w-3.5 h-3.5 text-purple-400" />
    }
  ];

  const datasetAspects: DatasetAttribute[] = [
    {
      aspect: 'Dataset Source',
      category: 'Overview',
      details: 'Kaggle: "Movies Dataset: 45k films with budget and revenue" (by sibamsamanta07), derived from TMDB (The Movie Database) & GroupLens.',
      notes: 'Contains over a century of motion picture metadata from 1874 through 2017.'
    },
    {
      aspect: 'Dataset Size',
      category: 'Overview',
      details: '~34.4 MB – 38.5 MB uncompressed CSV (~13 MB – 35 MB compressed zip).',
      notes: 'Compact single-table layout (movies_metadata.csv) suitable for in-memory processing in Python/Pandas.'
    },
    {
      aspect: 'Number of Observations',
      category: 'Overview',
      details: '45,466 records (movie releases).',
      notes: 'Covers theatrical features, direct-to-video releases, television films, and international titles.'
    },
    {
      aspect: 'Number of Variables',
      category: 'Overview',
      details: '24 attributes (columns).',
      notes: 'Includes financial figures, production entities, cast/ratings scores, and descriptive metadata.'
    },
    {
      aspect: 'Variable Names',
      category: 'Variables & Types',
      details: 'adult, belongs_to_collection, budget, genres, homepage, id, imdb_id, original_language, original_title, overview, popularity, poster_path, production_companies, production_countries, release_date, revenue, runtime, spoken_languages, status, tagline, title, video, vote_average, vote_count.',
      notes: 'Mixed tabular formats: raw scalars plus JSON-serialized nested lists (e.g. genres, production_companies).'
    },
    {
      aspect: 'Data Types',
      category: 'Variables & Types',
      details: 'Floats & Integers (numeric), Strings/Objects (text), JSON strings (nested dictionaries/lists), Booleans (adult, video), and Date strings.',
      notes: 'Raw CSV stores budget and release_date as object strings; type-casting to float/datetime is required during preprocessing.'
    },
    {
      aspect: 'Target Variable',
      category: 'Variables & Types',
      details: 'Primary: revenue (continuous box office gross in USD). Derived: multiplier (revenue / budget) and ROI % ((revenue - budget) / budget * 100).',
      notes: 'Multiplier is our primary benchmark to evaluate the exact threshold of diminishing returns.'
    },
    {
      aspect: 'Feature Variables',
      category: 'Variables & Types',
      details: 'budget, genres, release_date, runtime, popularity, vote_average, vote_count, production_companies, production_countries, original_language.',
      notes: 'Predictive predictors used to assess how genre, budget size, studio scale, and seasonality drive commercial yield.'
    },
    {
      aspect: 'Categorical Variables',
      category: 'Variables & Types',
      details: 'Nominal/Multilabel: genres, original_language, status, production_companies, production_countries, belongs_to_collection. Binary: adult, video.',
      notes: 'Genres and companies contain nested JSON arrays requiring unnesting or one-hot encoding for modeling.'
    },
    {
      aspect: 'Numerical Variables',
      category: 'Variables & Types',
      details: 'budget (USD), revenue (USD), runtime (minutes), popularity (engagement score), vote_average (0.0 - 10.0), vote_count (integer count).',
      notes: 'Distributions are highly skewed with steep right tails (e.g., massive blockbuster outliers).'
    },
    {
      aspect: 'Date/Time Variables',
      category: 'Variables & Types',
      details: 'release_date (string format YYYY-MM-DD; spanning years 1874 to 2017).',
      notes: 'Allows feature engineering of release_year, release_month, quarter, and holiday/summer theatrical windows.'
    },
    {
      aspect: 'Missing Values',
      category: 'Data Quality & Distribution',
      details: 'Heavy financial sparsity: ~36,500+ records have budget = 0 or revenue = 0. Only ~5,372 – 7,400 titles have non-zero verified budget and revenue pairs.',
      notes: 'High null rates in metadata: homepage (>79% null), tagline (>55% null), belongs_to_collection (>90% null). Minimal nulls in runtime (263) and release_date (87).'
    },
    {
      aspect: 'Duplicate Records',
      category: 'Data Quality & Distribution',
      details: '~17 to 30 exact duplicate rows; ~40 duplicate movie id entries.',
      notes: 'Deduplication by unique TMDB id is essential before calculating aggregations or training models.'
    },
    {
      aspect: 'Unique Values',
      category: 'Data Quality & Distribution',
      details: 'id: 45,432 unique IDs; title: 42,277 unique titles; genres: 20 base distinct genre tags; original_language: 89 distinct language codes.',
      notes: 'Title collisions occur due to remakes, adaptations, and shared titles across different decades (e.g. Alice in Wonderland).'
    },
    {
      aspect: 'Potential Outliers',
      category: 'Data Quality & Distribution',
      details: 'Blockbuster Outliers (Avatar at $2.78B, Titanic at $2.18B); Micro-Budget Anomalies (Paranormal Activity at 12,890x multiplier); Runaway Budgets ($380M+ for Pirates 4); Noise/Artifacts (budgets < $100).',
      notes: 'Extreme positive skew necessitates using median-based stats and log-transformations rather than simple means.'
    }
  ];

  const columnDictionary: ColumnDetail[] = [
    { name: 'revenue', type: 'float64', variableClass: 'Target', missingness: '~79% zero/null', description: 'Worldwide box office revenue in USD (primary target).' },
    { name: 'budget', type: 'float64', variableClass: 'Numerical', missingness: '~80% zero/null', description: 'Production cost in USD; primary input variable.' },
    { name: 'genres', type: 'object (JSON)', variableClass: 'Categorical', missingness: '< 5% missing', description: 'List of genre dictionaries (Action, Comedy, Drama, etc.).' },
    { name: 'release_date', type: 'datetime64', variableClass: 'Date/Time', missingness: '87 missing', description: 'Theatrical debut date (YYYY-MM-DD); seasonality feature.' },
    { name: 'runtime', type: 'float64', variableClass: 'Numerical', missingness: '263 missing', description: 'Film duration in minutes.' },
    { name: 'popularity', type: 'float64', variableClass: 'Numerical', missingness: '0 missing', description: 'TMDB popularity metric based on user traffic and activity.' },
    { name: 'vote_average', type: 'float64', variableClass: 'Numerical', missingness: '0 missing', description: 'Average viewer rating on a 0.0 to 10.0 scale.' },
    { name: 'vote_count', type: 'int64', variableClass: 'Numerical', missingness: '0 missing', description: 'Total number of user ratings submitted.' },
    { name: 'production_companies', type: 'object (JSON)', variableClass: 'Categorical', missingness: 'Present', description: 'Studios & production houses behind the film.' },
    { name: 'original_language', type: 'string', variableClass: 'Categorical', missingness: '11 missing', description: 'ISO 639-1 language code (en, fr, es, ja, etc.).' },
    { name: 'title', type: 'string', variableClass: 'Text/Metadata', missingness: '0 missing', description: 'Official release title of the motion picture.' },
    { name: 'status', type: 'string', variableClass: 'Categorical', missingness: '87 missing', description: 'Release status (Released, Post Production, Canceled).' },
    { name: 'belongs_to_collection', type: 'object (JSON)', variableClass: 'Categorical', missingness: '~90% null', description: 'Franchise/series metadata (e.g. Marvel Cinematic Universe).' },
    { name: 'adult', type: 'bool', variableClass: 'Categorical', missingness: '0 missing', description: 'Adult content flag (True/False).' }
  ];

  const filteredColumns = columnDictionary.filter(col => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'numerical') return col.variableClass === 'Numerical';
    if (activeFilter === 'categorical') return col.variableClass === 'Categorical';
    if (activeFilter === 'target') return col.variableClass === 'Target';
    return true;
  });

  const cleaningPillars: CleaningPillar[] = [
    {
      id: 'missing-values',
      number: '01',
      title: 'Missing Values (Sparsity & Nulls)',
      shortTitle: 'Missing Values',
      category: 'Completeness',
      affectedColumns: ['budget', 'revenue', 'belongs_to_collection', 'homepage', 'tagline', 'runtime'],
      scope: '~80.3% Financial Sparsity (36,500+ records)',
      investigation:
        'In the raw dataset, over 36,500 films (~80.3%) have a recorded budget or revenue of $0 or NaN. These entries predominantly represent independent, direct-to-video, or international releases where theatrical financials were unrecorded by TMDB. Furthermore, auxiliary metadata fields exhibit heavy null rates: belongs_to_collection (90.9% null), homepage (79% null), and tagline (55.1% null). Minor missingness occurs in runtime (263 nulls) and release_date (87 nulls).',
      remediation:
        'For core diminishing returns modeling, we apply listwise financial isolation—retaining only records with verified economics (budget >= $10,000 and revenue >= $10,000, isolating ~5,372 clean releases). For auxiliary features, runtime is imputed using the median runtime (~102 mins), belongs_to_collection is transformed into a binary franchise flag (is_franchise = False), and missing text fields are imputed with empty strings.',
      codeSnippet: `# 1. Filter for verified non-zero financial pairs
clean_df = df[(df['budget'] >= 10000) & (df['revenue'] >= 10000)].copy()

# 2. Impute missing runtime with median duration
clean_df['runtime'] = clean_df['runtime'].fillna(clean_df['runtime'].median())

# 3. Transform collection nulls into a binary franchise indicator
clean_df['is_franchise'] = clean_df['belongs_to_collection'].notna()

# 4. Fill text field nulls
clean_df['tagline'] = clean_df['tagline'].fillna('')`
    },
    {
      id: 'duplicate-records',
      number: '02',
      title: 'Duplicate Records & Collision Detection',
      shortTitle: 'Duplicate Records',
      category: 'Uniqueness',
      affectedColumns: ['id', 'imdb_id', 'title', 'release_date'],
      scope: '~30 exact row duplicates; ~40 duplicate TMDB IDs',
      investigation:
        'Auditing revealed ~17 to 30 exact bit-for-bit duplicate rows generated during historical data scraping, alongside ~40 duplicate TMDB ID instances where identical movies were ingested multiple times. Additionally, title collisions exist (42,277 unique titles across 45,466 rows); some represent legitimate remakes or adaptations across decades (e.g., Alice in Wonderland in 1951 vs. 2010), while others are redundant duplicate scrapes.',
      remediation:
        'Enforce primary key uniqueness by executing df.drop_duplicates() for exact row matches, followed by df.drop_duplicates(subset=[\'id\'], keep=\'first\') to resolve duplicate TMDB IDs. Title collisions are cross-verified against release_date to preserve legitimate historical remakes while eliminating true redundant records.',
      codeSnippet: `# 1. Eliminate exact duplicate rows across all attributes
df = df.drop_duplicates()

# 2. Enforce primary key integrity on unique TMDB movie ID
df = df.drop_duplicates(subset=['id'], keep='first')

# 3. Validate primary key uniqueness
assert df['id'].is_unique, "Duplicate IDs still present in corpus!"`
    },
    {
      id: 'incorrect-data-types',
      number: '03',
      title: 'Incorrect Data Types & Type Coercion',
      shortTitle: 'Data Types',
      category: 'Type Validity',
      affectedColumns: ['budget', 'id', 'popularity', 'release_date', 'adult', 'video'],
      scope: '3 corrupt shifted rows; string-typed numerics',
      investigation:
        'In the raw CSV, budget, id, and popularity loaded as string objects rather than numeric floats or integers. This was triggered by 3 corrupted rows (indices 19730, 29503, and 35587) where unescaped line breaks shifted date strings and URLs into numeric columns. Furthermore, release_date was stored as a raw string (preventing datetime math), and adult/video were inconsistent string flags.',
      remediation:
        'Apply pd.to_numeric(..., errors=\'coerce\') across budget, revenue, id, popularity, and runtime, which automatically converts corrupt text entries into NaN so they can be safely filtered. Release dates are parsed into ISO datetime64[ns] objects, and adult/video flags are converted to native booleans.',
      codeSnippet: `# 1. Coerce corrupted string numerics to floats (converting bad rows to NaN)
df['budget'] = pd.to_numeric(df['budget'], errors='coerce')
df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')
df['popularity'] = pd.to_numeric(df['popularity'], errors='coerce')

# 2. Coerce ID to clean integer type
df['id'] = pd.to_numeric(df['id'], errors='coerce').dropna().astype('int64')

# 3. Parse date string to ISO datetime64
df['release_date'] = pd.to_datetime(df['release_date'], errors='coerce')`
    },
    {
      id: 'inconsistent-formats',
      number: '04',
      title: 'Inconsistent Formats & Pseudo-JSON Parsing',
      shortTitle: 'Format Consistency',
      category: 'Syntactic Validity',
      affectedColumns: ['genres', 'production_companies', 'production_countries', 'release_date'],
      scope: 'Non-RFC compliant single-quoted JSON strings',
      investigation:
        'The relational metadata columns genres, production_companies, production_countries, and spoken_languages are not serialized as standard JSON (which requires double quotes \"). Instead, they were written as Python stringified lists of dictionaries containing single quotes (e.g. [{\'id\': 28, \'name\': \'Action\'}]). Passing these to standard json.loads() triggers fatal JSONDecodeError crashes. Dates also exhibited format drift, including four-digit year-only strings.',
      remediation:
        'Implement Python\'s safe ast.literal_eval inside a guarded try/except wrapper to extract lists of entity names directly into clean Python lists. Standardize release dates into uniform YYYY-MM-DD strings via pd.to_datetime().',
      codeSnippet: `import ast

def parse_pseudo_json(val):
    if pd.isna(val) or not isinstance(val, str):
        return []
    try:
        parsed = ast.literal_eval(val)
        return [item['name'] for item in parsed if 'name' in item]
    except (ValueError, SyntaxError):
        return []

df['clean_genres'] = df['genres'].apply(parse_pseudo_json)
df['clean_companies'] = df['production_companies'].apply(parse_pseudo_json)`
    },
    {
      id: 'invalid-values',
      number: '05',
      title: 'Invalid Values & Accounting Anomalies',
      shortTitle: 'Invalid Values',
      category: 'Domain Validity',
      affectedColumns: ['budget', 'revenue', 'runtime', 'status'],
      scope: 'Thousands of $0 budgets, zero revenues, runtime <= 0',
      investigation:
        'Accounting logic dictates that commercial theatrical films cannot be produced for $0 or gross $0; zero values reflect missingness, not free production. Calculating return multipliers on $0 budgets produces division-by-zero infinity (inf). Additionally, negative or zero runtimes (runtime <= 0), pre-1888 release dates, and canceled releases (status == \'Canceled\') were detected.',
      remediation:
        'Replace $0 budgets and revenues with np.nan. Establish an empirical theatrical floor requiring budget >= $10,000 and revenue >= $10,000. Filter runtime to >= 40 minutes for feature films, and restrict status to \'Released\' to exclude unproduced scripts.',
      codeSnippet: `# 1. Replace 0 placeholder values with NaN
df['budget'] = df['budget'].replace(0, np.nan)
df['revenue'] = df['revenue'].replace(0, np.nan)

# 2. Filter for released feature films clearing theatrical baseline
clean_df = df[
    (df['status'] == 'Released') &
    (df['runtime'] >= 40) &
    (df['budget'] >= 10000) &
    (df['revenue'] >= 10000)
].copy()`
    },
    {
      id: 'outliers',
      number: '06',
      title: 'Outliers & Extreme Skew Handling',
      shortTitle: 'Outliers',
      category: 'Statistical Distribution',
      affectedColumns: ['budget', 'revenue', 'multiplier', 'roi_pct'],
      scope: '12,890x micro-multipliers; $2.79B blockbuster right tail',
      investigation:
        'Financial distributions in cinema display severe positive skew in both directions. Hyper-micro budget phenomena like Paranormal Activity ($15k budget -> $193M gross, 12,890x multiplier) distort arithmetic mean ROIs into the thousands of percent. On the upper extreme, multi-billion-dollar blockbusters (Avatar at $2.79B, Titanic at $2.18B) and $380M budgets (Pirates of the Caribbean 4) sit 4+ standard deviations above the mean.',
      remediation:
        'Adopt non-parametric robust statistics (reporting Medians and Interquartile Ranges [IQR] rather than easily skewed arithmetic means). Implement logarithmic transformations (log10(x)) to compress multi-order-of-magnitude variances for regression modeling, and establish a $100k budget floor when ranking commercial multipliers to filter out placeholder entries.',
      codeSnippet: `# 1. Calculate robust non-parametric metrics (Median & IQR)
median_mult = clean_df['multiplier'].median()
iqr_mult = clean_df['multiplier'].quantile(0.75) - clean_df['multiplier'].quantile(0.25)

# 2. Log-transform financial values for normalized regression
clean_df['log_budget'] = np.log10(clean_df['budget'])
clean_df['log_revenue'] = np.log10(clean_df['revenue'])`
    },
    {
      id: 'inconsistent-categoricals',
      number: '07',
      title: 'Categorical Inconsistencies & Entity Resolution',
      shortTitle: 'Categoricals',
      category: 'Entity Consistency',
      affectedColumns: ['genres', 'production_companies', 'original_language'],
      scope: '23,000+ fragmented studio entities; multi-label tags',
      investigation:
        'Production companies span over 23,000 distinct entities due to corporate fragmentation (e.g. Walt Disney Pictures, Touchstone Pictures, Pixar, and Marvel Studios are all corporate Disney). Genres are multi-labeled (up to 7 genres per film) with rare categories like TV Movie and Foreign. Languages contain obscure two-letter codes (xx, sh) alongside the dominant English (en, >75%).',
      remediation:
        'Extract the primary genre (first listed tag) for mutually-exclusive categorical stratification. Perform entity resolution by mapping subsidiary studio strings into parent corporate conglomerates (Disney, Warner Bros, Universal, Sony, Paramount, Independent/Mini-Major). Group rare languages (<0.5%) into an \'Other\' bucket.',
      codeSnippet: `# 1. Extract primary genre for clean comparative grouping
clean_df['primary_genre'] = clean_df['clean_genres'].apply(
    lambda x: x[0] if len(x) > 0 else 'Unknown'
)

# 2. Consolidate studio subsidiaries into parent conglomerates
def map_studio_parent(companies):
    text = ' '.join(companies).lower()
    if any(k in text for k in ['disney', 'pixar', 'marvel', 'lucasfilm']):
        return 'Major: Disney'
    elif any(k in text for k in ['warner', 'new line']):
        return 'Major: Warner Bros'
    elif any(k in text for k in ['universal', 'focus features']):
        return 'Major: Universal'
    elif any(k in text for k in ['columbia', 'sony', 'tristar']):
        return 'Major: Sony'
    elif any(k in text for k in ['a24', 'blumhouse', 'lionsgate']):
        return 'Independent / Mini-Major'
    return 'Independent / Other'

clean_df['studio_group'] = clean_df['clean_companies'].apply(map_studio_parent)`
    },
    {
      id: 'data-transformations',
      number: '08',
      title: 'Data Transformations & Derived Features',
      shortTitle: 'Transformations',
      category: 'Feature Engineering',
      affectedColumns: ['multiplier', 'roi_pct', 'breakeven_cleared', 'budget_tier', 'release_season'],
      scope: '5 core engineered financial and temporal features',
      investigation:
        'Raw movie metadata lacks relative financial yield metrics, business breakeven classifiers, and discrete budget tiers. Evaluating diminishing returns on raw dollars is ineffective because a $250M movie generating $284M gross represents a severe financial loss after distributor fee splits and marketing overhead.',
      remediation:
        'Engineer 5 key domain features: (1) Box Office Multiplier = revenue / budget, (2) Net Theatrical ROI % = (revenue - budget) / budget * 100, (3) Theatrical Breakeven Classifier = multiplier >= 2.5, (4) Discretized Budget Tiers (<$5M, $5M-$25M, $25M-$65M, $65M-$140M, $140M+), and (5) Seasonality indicators (Summer Blockbuster window, Holiday window).',
      codeSnippet: `# 1. Derive Box Office Multiplier & Net Theatrical ROI %
df['multiplier'] = df['revenue'] / df['budget']
df['roi_pct'] = ((df['revenue'] - df['budget']) / df['budget']) * 100

# 2. Theatrical Breakeven Benchmark (2.5x Rule)
df['breakeven_cleared'] = df['multiplier'] >= 2.5

# 3. Discretize continuous budget into research tiers
bins = [0, 5e6, 25e6, 65e6, 140e6, np.inf]
labels = ['< $5M', '$5M-$25M', '$25M-$65M', '$65M-$140M', '$140M+']
df['budget_tier'] = pd.cut(df['budget'], bins=bins, labels=labels)

# 4. Extract seasonal theatrical windows
df['is_summer'] = df['release_date'].dt.month.isin([5, 6, 7])
df['is_holiday'] = df['release_date'].dt.month.isin([11, 12])`
    }
  ];

  const activePillar = cleaningPillars.find(p => p.id === selectedPillarId) || cleaningPillars[0];

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 space-y-12 overflow-x-hidden">
      
      {/* 1. Header & Consolidated Model Selector */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-300">
              <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
              <span>MODEL BENCHMARK SUITE</span>
            </div>
            {onNavigateToSql && (
              <button
                onClick={onNavigateToSql}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all self-start sm:self-auto"
              >
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explore Relational SQL Analytics &amp; Visualizations &rarr;</span>
              </button>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visualizations & Model Comparison
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Comparing visual exploratory analytics and predictive architectures on movie budget diminishing returns across AI agents and machine learning models.
          </p>
        </div>

        {/* Consolidated, Sleek Model Segmented Control Bar */}
        <div className="w-full pt-1">
          <div className="w-full bg-[#080a0f] p-1.5 rounded-2xl border border-white/10 shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 w-full">
              {modelTabs.map((tab, idx) => {
                const isSelected = tab.id === selectedModel;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedModel(tab.id)}
                    className={`py-2.5 px-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-2 border ${
                      isSelected
                        ? 'bg-purple-950/70 border-purple-500/60 text-white shadow-glow-purple font-semibold'
                        : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    } ${idx === modelTabs.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
                  >
                    <div className={isSelected ? 'text-purple-400' : 'text-slate-400'}>
                      {tab.icon}
                    </div>
                    <span className="font-medium tracking-tight truncate">
                      {tab.shortName}
                    </span>
                    {tab.chartCount > 0 ? (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                        {tab.chartCount}
                      </span>
                    ) : (
                      <span className="hidden md:inline px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-slate-500 uppercase tracking-wider">
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
        <div className="glass-panel rounded-2xl p-5 sm:p-8 border border-white/10 space-y-6">
          
          {/* Stage Switcher: Input Visualizations (EDA) vs Output Visualizations (Model Results) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold hidden sm:inline">
                Pipeline Stage:
              </span>
              <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono">
                <button
                  onClick={() => { setActiveStage('input'); setCurrentChartIndex(0); }}
                  className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                    activeStage === 'input'
                      ? 'bg-purple-600 text-white font-semibold shadow-glow-purple'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>1. Input Visualizations (EDA)</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    activeStage === 'input' ? 'bg-white/20 text-white font-bold' : 'bg-white/10 text-slate-400'
                  }`}>4</span>
                </button>
                <button
                  onClick={() => { setActiveStage('output'); setCurrentChartIndex(0); }}
                  className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                    activeStage === 'output'
                      ? 'bg-purple-600 text-white font-semibold shadow-glow-purple'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>2. Output Visualizations (Model Results)</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    activeStage === 'output' ? 'bg-white/20 text-white font-bold' : 'bg-purple-500/20 text-purple-200 border border-purple-500/30 font-bold'
                  }`}>4</span>
                </button>
              </div>
            </div>
            <span className="text-xs font-mono text-purple-300/80 bg-purple-950/40 px-3 py-1 rounded-lg border border-purple-500/20 self-start sm:self-auto">
              {activeStage === 'input' 
                ? 'Empirical Distributions & Pre-Model Feature Relationships' 
                : 'Trained Model Fits, Residual Risk & Marginal Derivative (dy/dx)'}
            </span>
          </div>

          {/* Header of Active Chart: Title, Counter & Arrow Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-950 text-purple-300 border border-purple-500/40">
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
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-purple-900/40 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all flex items-center gap-1 text-xs font-mono"
                title="Previous Chart"
              >
                <ChevronLeft className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {currentCharts.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => setCurrentChartIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentChartIndex
                        ? 'w-6 bg-purple-400'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    title={`Jump to Chart ${c.number}`}
                  />
                ))}
              </div>

              <button
                onClick={nextChart}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-purple-900/40 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all flex items-center gap-1 text-xs font-mono"
                title="Next Chart"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4 text-purple-400" />
              </button>

              <a
                href={currentChart.imageSrc}
                target="_blank"
                rel="noreferrer"
                className="ml-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all inline-flex items-center"
                title="Open Full Resolution in new tab"
              >
                <ExternalLink className="w-4 h-4 text-purple-400" />
              </a>
            </div>
          </div>

          {/* Rendered Chart Image with Floating Left/Right Arrow Overlays */}
          <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#07090e] p-2 sm:p-4 flex items-center justify-center min-h-[380px]">
            {/* Floating Left Arrow */}
            <button
              onClick={prevChart}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/60 hover:bg-purple-600/90 text-white backdrop-blur-md border border-white/10 opacity-70 group-hover:opacity-100 hover:scale-105 transition-all shadow-xl"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/60 hover:bg-purple-600/90 text-white backdrop-blur-md border border-white/10 opacity-70 group-hover:opacity-100 hover:scale-105 transition-all shadow-xl"
              title="Next Chart"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Clean, Uncrowded Context & Findings Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
            {/* Left: Research Question & Variables */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold block">
                  Inquiry Addressed
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  "{currentChart.researchQuestion}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Variables Examined
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {currentChart.variables.map((v, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-slate-300 border border-white/10">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Key Visual Takeaways */}
            <div className="lg:col-span-8 p-5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                    Key Visual Insights
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {currentChart.findings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-purple-300/80">
                <span>Evaluated against the 2.5x Theatrical Breakeven Benchmark</span>
                <span>Click arrows or dots to browse graphs</span>
              </div>
            </div>
          </div>

          {/* Bottom Prev / Next Navigation Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <button
              onClick={prevChart}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-purple-900/30 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all flex items-center gap-2 text-xs font-mono"
            >
              <ChevronLeft className="w-4 h-4 text-purple-400" />
              <span>Previous Chart</span>
            </button>

            <span className="text-xs font-mono text-slate-400">
              Viewing {activeStage === 'input' ? 'Input EDA' : 'Model Output'} <span className="text-purple-300 font-bold">{currentChart.number}</span> of {currentCharts.length.toString().padStart(2, '0')}
            </span>

            <button
              onClick={nextChart}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-purple-900/30 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all flex items-center gap-2 text-xs font-mono"
            >
              <span>Next Chart</span>
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </button>
          </div>

        </div>
      ) : selectedModel === 'classifier' ? (
        /* Staging Placeholder for Supervised Classification Model */
        <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-white/10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
            <Target className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-purple-950/60 border border-purple-500/30 text-purple-300">
              Supervised Machine Learning Staging
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Supervised Classification Visualizations
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Evaluating trained supervised classification models (Random Forest, XGBoost, and Logistic Regression) engineered to predict movie commercial success and diminishing returns risk.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">01. Target Formulation</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Binary classification target <code className="text-purple-300 font-mono">is_profitable</code> (<code className="text-purple-300 font-mono">multiplier &gt;= 2.5</code>), predicting theatrical breakeven based on production capital.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">02. Feature Pipeline</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multivariable feature matrix: production budget, runtime, one-hot encoded genres, studio tier (Major vs Independent), and release seasonality.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">03. Model Visualizations</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Staging ready for ROC-AUC curves, Confusion Matrix heatmaps, Precision-Recall tradeoff curves, and Tree Feature Importance rankings.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setSelectedModel('gemini')}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-900/40"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Return to Gemini Visualizations (Active)</span>
            </button>
          </div>
        </div>
      ) : selectedModel === 'regression' ? (
        /* Staging Placeholder for Supervised Regression Model */
        <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-white/10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
            <LineChart className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-purple-950/60 border border-purple-500/30 text-purple-300">
              Supervised Continuous Modeling Staging
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Supervised Regression Visualizations
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Modeling continuous box office revenue and multiplier trajectories to compute the exact marginal rate of return and mathematically pinpoint where additional budget investments yield diminishing returns.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">01. Nonlinear Curve Fitting</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log-transformed ElasticNet, Polynomial Ridge, and Gradient Boosted Regressors fitting continuous <code className="text-purple-300 font-mono">revenue = f(budget)</code>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">02. Marginal Rate of Return</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculating the mathematical first derivative <code className="text-purple-300 font-mono">d(Revenue)/d(Budget)</code> to identify where marginal yield falls below the 2.5x breakeven ray.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">03. Regression Diagnostics</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Staging ready for Predicted vs. Actual Gross scatters, Residual Distribution curves, <code className="text-purple-300 font-mono">R²</code> score analysis, and RMSE confidence bands.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setSelectedModel('gemini')}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-900/40"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Return to Gemini Visualizations (Active)</span>
            </button>
          </div>
        </div>
      ) : selectedModel === 'clustering' ? (
        /* Staging Placeholder for Unsupervised Clustering Model */
        <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-white/10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
            <Network className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-purple-950/60 border border-purple-500/30 text-purple-300">
              Unsupervised Machine Learning Staging
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Unsupervised Clustering & Archetypes
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Applying K-Means clustering and Principal Component Analysis (PCA) to discover natural performance archetypes and capital risk segments without pre-assigned labels.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">01. Multi-Attribute PCA</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dimensionality reduction projecting budget, worldwide gross, ROI multiplier, runtime, and popularity onto principal variance axes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">02. Archetype Discovery</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unsupervised partitioning into "Low-Budget High-Yield Breakouts", "Steady Mid-Budget Earners", "Mega-Blockbusters", and "High-Budget Traps".
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">03. Cluster Diagnostics</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Staging ready for 2D PCA cluster scatter plots with convex hulls, Silhouette Score optimization curves, and Cluster Centroid Radar charts.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setSelectedModel('gemini')}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-900/40"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Return to Gemini Visualizations (Active)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Staging Placeholder for Claude / Anthropic Model */
        <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-white/10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
            <Cpu className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-slate-400">
              Comparative Benchmark Staging
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Claude 3.7 Sonnet Visualizations
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Evaluating exploratory data visualizations and analytical code generated autonomously by Anthropic Claude for benchmark comparison against Gemini.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">01. Standardized Prompts</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identical research prompts evaluating budget diminishing returns and studio commercial efficiency.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">02. Identical Dataset</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluated against the exact 45,466 cleaned TMDB records with identical filtering standards.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-xs font-mono text-purple-400 font-bold">03. Comparative Evaluation</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluation on statistical fidelity, visual hierarchy, aesthetic palette choice, and analytical deduction.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setSelectedModel('gemini')}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-900/40"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Return to Gemini Visualizations (Active)</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Quick Metric KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-xs font-mono text-slate-400 block mb-1">Observations</span>
          <span className="text-2xl font-bold text-white">45,466</span>
          <span className="text-[11px] text-slate-500 block mt-1 font-mono">Total movie records</span>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-xs font-mono text-purple-400 block mb-1">Variables</span>
          <span className="text-2xl font-bold text-purple-300">24 Columns</span>
          <span className="text-[11px] text-slate-500 block mt-1 font-mono">Financial & metadata</span>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-xs font-mono text-cyan-400 block mb-1">Verified Clean Pairs</span>
          <span className="text-2xl font-bold text-cyan-300">~5,372</span>
          <span className="text-[11px] text-slate-500 block mt-1 font-mono">Non-zero budget & revenue</span>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-xs font-mono text-amber-400 block mb-1">Primary Target</span>
          <span className="text-2xl font-bold text-amber-300">Revenue / ROI</span>
          <span className="text-[11px] text-slate-500 block mt-1 font-mono">Box office multiplier</span>
        </div>
      </div>

      {/* 4. Comprehensive 15-Aspect Investigation Table */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Table className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Dataset Profile & Characteristics
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            15 Key Exploratory Dimensions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-xs">
                <th className="py-3 px-4 w-48">Aspect</th>
                <th className="py-3 px-4 w-32 hidden sm:table-cell">Category</th>
                <th className="py-3 px-4">Investigation Details</th>
                <th className="py-3 px-4 hidden lg:table-cell">Analytical Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {datasetAspects.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>
                      <span>{item.aspect}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 hidden sm:table-cell">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-200 leading-relaxed font-normal">
                    {item.details}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-xs hidden lg:table-cell leading-relaxed font-mono">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Key Column Dictionary & Data Types Table */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-400" />
              <span>Variable Schema & Data Types</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inspection of key features, data types, and missingness properties.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono self-start sm:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeFilter === 'all' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('target')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeFilter === 'target' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Target
            </button>
            <button
              onClick={() => setActiveFilter('numerical')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeFilter === 'numerical' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Numerical
            </button>
            <button
              onClick={() => setActiveFilter('categorical')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeFilter === 'categorical' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Categorical
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Variable Name</th>
                <th className="py-2.5 px-3">Data Type</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Missingness</th>
                <th className="py-2.5 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filteredColumns.map((col, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3 font-semibold text-white font-mono">
                    {col.name}
                  </td>
                  <td className="py-3 px-3 text-purple-300">
                    {col.type}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      col.variableClass === 'Target' 
                        ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        : col.variableClass === 'Numerical'
                        ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                        : col.variableClass === 'Categorical'
                        ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                        : 'bg-white/5 text-slate-300 border border-white/10'
                    }`}>
                      {col.variableClass}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {col.missingness}
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-300 text-xs">
                    {col.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Data Quality, Cleaning & Transformation Architecture */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>DATA QUALITY & PREPROCESSING AUDIT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Data Cleaning & Transformation Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed font-light">
              Systematic investigation and technical remediation across 8 essential data quality dimensions in the 45,000+ record Kaggle dataset.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.02] border border-white/5 px-3 py-2 rounded-xl self-start lg:self-auto">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>8 Pipeline Dimensions Implemented</span>
          </div>
        </div>

        {/* Data Pipeline Flow Banner */}
        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-purple-300">
            <Database className="w-4 h-4 text-purple-400" />
            <span className="font-semibold">Raw Corpus: 45,466 Records</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">&rarr;</span>
          <span className="text-slate-300">Deduplication & Type Coercion</span>
          <span className="text-slate-500 hidden sm:inline">&rarr;</span>
          <span className="text-slate-300">Pseudo-JSON Parsing</span>
          <span className="text-slate-500 hidden sm:inline">&rarr;</span>
          <span className="text-slate-300">Financial Floor Filtering</span>
          <span className="text-slate-500 hidden sm:inline">&rarr;</span>
          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Clean Verified Set: ~5,372 Films</span>
          </div>
        </div>

        {/* 8 Pillar Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {cleaningPillars.map((pillar) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-purple-950/50 border-purple-500/60 shadow-glow-purple text-white'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-purple-300' : 'text-purple-400'}`}>
                  Step {pillar.number}
                </span>
                <span className="text-xs font-semibold leading-tight line-clamp-2">
                  {pillar.shortTitle}
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-1">
                  {pillar.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detail Box */}
        {activePillar && (
          <div className="p-6 sm:p-7 rounded-2xl bg-[#07090e] border border-white/10 space-y-6">
            
            {/* Active Pillar Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-950 text-purple-300 border border-purple-500/30">
                    Dimension {activePillar.number}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/5 text-slate-300 border border-white/10">
                    {activePillar.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activePillar.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Scope: {activePillar.scope}</span>
              </div>
            </div>

            {/* Affected Columns Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Affected Columns:</span>
              </span>
              {activePillar.affectedColumns.map((col) => (
                <span
                  key={col}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-purple-950/40 text-purple-300 border border-purple-500/20"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Investigation vs Remediation 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* Investigation Box */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span>Investigation & Problem Diagnosis</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {activePillar.investigation}
                  </p>
                </div>
              </div>

              {/* Remediation Box */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>Technical Remediation & Strategy</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {activePillar.remediation}
                  </p>
                </div>
              </div>

            </div>

            {/* Code Implementation Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Python / Pandas Pipeline Implementation</span>
                </div>
                <span className="text-[11px] text-slate-500">scripts/clean_kaggle_movies.py</span>
              </div>
              
              <div className="p-4 rounded-xl bg-[#040507] border border-white/10 font-mono text-xs overflow-x-auto text-slate-200">
                <pre className="text-purple-300 font-mono leading-relaxed">
                  <code>{activePillar.codeSnippet}</code>
                </pre>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
