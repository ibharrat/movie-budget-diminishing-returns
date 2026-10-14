import React, { useState } from 'react';
import { 
  Sliders, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Code2, 
  Table, 
  Tag, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck
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

interface DataCleaningPageProps {
  onNavigateToViz?: () => void;
  onNavigateToSql?: () => void;
}

export const DataCleaningPage: React.FC<DataCleaningPageProps> = ({ 
  onNavigateToViz, 
  onNavigateToSql 
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'numerical' | 'categorical' | 'target'>('all');
  const [selectedPillarId, setSelectedPillarId] = useState<string>('missing-values');

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
      
      {/* 1. Header & Lead */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0c1626] border border-sky-500/30 text-xs font-mono text-sky-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DATA AUDIT &amp; CLEANSING PIPELINE</span>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateToViz && (
              <button
                onClick={onNavigateToViz}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0f131c] hover:bg-[#131824] text-slate-300 hover:text-white border border-[#1c2436] text-xs font-mono transition-colors"
              >
                <span>View Visualizations</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
            )}
            <a
              href="https://www.kaggle.com/datasets/sibamsamanta07/movies-dataset-45k-films-with-budget-and-revenue"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0f131c] hover:bg-[#131824] text-slate-300 hover:text-sky-400 border border-[#1c2436] text-xs font-mono transition-colors"
            >
              <span>Kaggle 45k Source</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Data Quality, Cleansing &amp;{' '}
            <span className="text-sky-400">
              Transformation Architecture
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            A comprehensive investigation of data quality issues across 45,466 motion picture records. Here we detail the technical remediation, type coercion, deduplication, and feature engineering required to build a reliable econometric dataset.
          </p>
        </div>
      </div>

      {/* 2. Quick Metric KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[#0f131c] border border-[#1c2436]">
          <span className="text-xs font-mono text-slate-400 block mb-1">Raw Observations</span>
          <span className="text-2xl font-bold text-white">45,466</span>
          <span className="text-[11px] text-slate-500 block mt-1 font-mono">Total ingested records</span>
        </div>
        <div className="p-5 rounded-xl bg-[#0f131c] border border-[#1c2436]">
          <span className="text-xs font-mono text-sky-400 block mb-1 font-semibold">Variable Count</span>
          <span className="text-2xl font-bold text-sky-300">24 Columns</span>
          <span className="text-[11px] text-slate-500 block mt-1 font-mono">Financial &amp; metadata</span>
        </div>
        <div className="p-5 rounded-xl bg-[#0f131c] border border-[#1c2436]">
          <span className="text-xs font-mono text-sky-400 block mb-1 font-semibold">Verified Clean Pairs</span>
          <span className="text-2xl font-bold text-sky-300">~5,372</span>
          <span className="text-[11px] text-slate-500 block mt-1 font-mono">Non-zero budget &amp; revenue</span>
        </div>
        <div className="p-5 rounded-xl bg-[#0f131c] border border-[#1c2436]">
          <span className="text-xs font-mono text-sky-400 block mb-1 font-semibold">Primary Target</span>
          <span className="text-2xl font-bold text-white">Revenue / ROI</span>
          <span className="text-[11px] text-slate-500 block mt-1 font-mono">Box office multiplier</span>
        </div>
      </div>

      {/* 3. 8-Pillar Data Cleansing Architecture */}
      <div className="rounded-xl p-6 sm:p-8 border border-[#1c2436] bg-[#0f131c] space-y-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1c2436]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0c1626] border border-sky-500/30 text-xs font-mono text-sky-400 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DATA PIPELINE WORKFLOW</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              The 8 Pillars of Data Cleansing
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed font-light">
              Click through the 8 pipeline stages below to examine the problem diagnosis, remediation strategy, and executable Python code for each dimension.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-[#0c1626] border border-sky-500/30 px-3 py-2 rounded-lg self-start lg:self-auto font-semibold">
            <Sliders className="w-3.5 h-3.5" />
            <span>8 Pipeline Dimensions Active</span>
          </div>
        </div>

        {/* Data Pipeline Flow Banner */}
        <div className="p-4 rounded-xl bg-[#0c1421] border border-sky-500/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-sky-300 font-semibold">
            <Database className="w-4 h-4 text-sky-400" />
            <span>Raw Corpus: 45,466 Records</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">&rarr;</span>
          <span className="text-slate-300">Deduplication &amp; Type Coercion</span>
          <span className="text-slate-500 hidden sm:inline">&rarr;</span>
          <span className="text-slate-300">Pseudo-JSON Parsing</span>
          <span className="text-slate-500 hidden sm:inline">&rarr;</span>
          <span className="text-slate-300">Financial Floor Filtering</span>
          <span className="text-slate-500 hidden sm:inline">&rarr;</span>
          <div className="flex items-center gap-2 text-sky-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
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
                className={`p-3 rounded-lg text-left border transition-colors flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-[#152338] border-sky-400 text-white'
                    : 'bg-[#0b0e15] border-[#1c2436] hover:border-sky-500/40 text-slate-400 hover:text-white'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-sky-300' : 'text-sky-400'}`}>
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
          <div className="p-6 sm:p-7 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-6">
            
            {/* Active Pillar Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#1c2436]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                    Dimension {activePillar.number}
                  </span>
                  <span className="inline-flex items-center whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#141b29] text-slate-300 border border-[#1c2436]">
                    {activePillar.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activePillar.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-lg bg-[#0c1626] border border-sky-500/30 text-sky-300 text-xs font-mono font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-sky-400" />
                <span>Scope: {activePillar.scope}</span>
              </div>
            </div>

            {/* Affected Columns Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Affected Columns:</span>
              </span>
              {activePillar.affectedColumns.map((col) => (
                <span
                  key={col}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/20"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Investigation vs Remediation 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* Investigation Box */}
              <div className="p-5 rounded-xl bg-[#0f131c] border border-[#1c2436] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    <span>Investigation &amp; Problem Diagnosis</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {activePillar.investigation}
                  </p>
                </div>
              </div>

              {/* Remediation Box */}
              <div className="p-5 rounded-xl bg-[#0f131c] border border-[#1c2436] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    <span>Technical Remediation &amp; Strategy</span>
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
                  <Code2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Python / Pandas Pipeline Implementation</span>
                </div>
                <span className="text-[11px] text-slate-500">scripts/clean_kaggle_movies.py</span>
              </div>
              
              <div className="p-4 rounded-xl bg-[#08090d] border border-[#1c2436] font-mono text-xs overflow-x-auto text-sky-200">
                <pre className="text-sky-300 font-mono leading-relaxed">
                  <code>{activePillar.codeSnippet}</code>
                </pre>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 4. Comprehensive 15-Aspect Investigation Table */}
      <div className="rounded-xl p-6 sm:p-8 border border-[#1c2436] bg-[#0f131c]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1c2436]">
          <div className="flex items-center gap-2.5">
            <Table className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Dataset Profile &amp; Characteristics
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            15 Key Exploratory Dimensions Audited
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1c2436] text-slate-400 font-mono text-xs">
                <th className="py-3 px-4 w-48 whitespace-nowrap">Aspect</th>
                <th className="py-3 px-4 hidden sm:table-cell whitespace-nowrap">Category</th>
                <th className="py-3 px-4 min-w-[280px]">Investigation Details</th>
                <th className="py-3 px-4 hidden lg:table-cell min-w-[240px]">Analytical Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2436]">
              {datasetAspects.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#121722] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0"></span>
                      <span>{item.aspect}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 hidden sm:table-cell whitespace-nowrap">
                    <span className="inline-flex items-center whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#0c1626] border border-sky-500/30 text-sky-300">
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
      <div className="rounded-xl p-6 sm:p-8 border border-[#1c2436] bg-[#0f131c]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1c2436]">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-sky-400" />
              <span>Variable Schema &amp; Data Types</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inspection of key features, data types, missingness, and analytical roles.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono self-start sm:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeFilter === 'all' ? 'bg-sky-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('target')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeFilter === 'target' ? 'bg-sky-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Target
            </button>
            <button
              onClick={() => setActiveFilter('numerical')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeFilter === 'numerical' ? 'bg-sky-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Numerical
            </button>
            <button
              onClick={() => setActiveFilter('categorical')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeFilter === 'categorical' ? 'bg-sky-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Categorical
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1c2436] text-slate-400 font-mono">
                <th className="py-2.5 px-3">Variable Name</th>
                <th className="py-2.5 px-3">Data Type</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Missingness</th>
                <th className="py-2.5 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2436] font-mono">
              {filteredColumns.map((col, idx) => (
                <tr key={idx} className="hover:bg-[#121722] transition-colors">
                  <td className="py-3 px-3 font-semibold text-white font-mono">
                    {col.name}
                  </td>
                  <td className="py-3 px-3 text-sky-400 font-mono">
                    {col.type}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
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

      {/* 6. Navigation Footer Strip */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0c1421] border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider block">
            Next Stage in Research Pipeline
          </span>
          <h3 className="text-lg font-bold text-white">
            Explore Visualizations &amp; Model Benchmark Suite
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Proceed to the visual analytics dashboard to analyze the 10 exploratory charts and 4 model output comparisons evaluating diminishing returns.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onNavigateToSql && (
            <button
              onClick={onNavigateToSql}
              className="px-4 py-2.5 rounded-lg bg-[#0f131c] hover:bg-[#131824] text-slate-300 hover:text-white border border-[#1c2436] text-xs font-mono transition-colors"
            >
              SQL Workbench
            </button>
          )}
          {onNavigateToViz && (
            <button
              onClick={onNavigateToViz}
              className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Visualizations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
