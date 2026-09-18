import React, { useState } from 'react';
import { 
  BarChart3, 
  Table, 
  Tag, 
  CheckCircle2,
  TrendingDown,
  Building2,
  Film,
  ExternalLink
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

export const VisualizationPage: React.FC = () => {
  const [selectedChartId, setSelectedChartId] = useState<string>('chart1');
  const [activeFilter, setActiveFilter] = useState<'all' | 'numerical' | 'categorical' | 'target'>('all');

  const charts: ChartItem[] = [
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

  const currentChart = charts.find(c => c.id === selectedChartId) || charts[0];

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

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 space-y-16">
      
      {/* 1. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-4">
          <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
          <span>PYTHON DATA VISUALIZATIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Preliminary Data Visualizations
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Four exploratory charts generated via Python (<code className="text-purple-300 font-mono">matplotlib</code> &bull; <code className="text-purple-300 font-mono">pandas</code>) directly addressing our research questions on movie budget diminishing returns, revenue curvature, genre efficiency, and studio scale.
        </p>
      </div>

      {/* 2. Interactive Chart Viewer */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
        
        {/* Chart Selection Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {charts.map((chart) => {
            const isSelected = chart.id === selectedChartId;
            return (
              <button
                key={chart.id}
                onClick={() => setSelectedChartId(chart.id)}
                className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500/50 shadow-glow-purple text-white'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400">
                    Chart {chart.number}
                  </span>
                  {chart.icon}
                </div>
                <span className="text-xs font-semibold leading-tight line-clamp-2">
                  {chart.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Visualization Display Card */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#07090e] border border-white/10 space-y-6">
          
          {/* Header of Active Chart */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-950 text-purple-300 border border-purple-500/30">
                  Chart {currentChart.number}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Python Matplotlib Output
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {currentChart.title}
              </h2>
            </div>

            <a
              href={currentChart.imageSrc}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 self-start md:self-auto transition-all"
            >
              <span>Full Resolution</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Rendered Chart Image */}
          <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#07090e] shadow-2xl flex items-center justify-center">
            <img
              src={currentChart.imageSrc}
              alt={currentChart.title}
              className="w-full h-auto object-contain max-h-[550px]"
              loading="eager"
            />
          </div>

          {/* Research Insight & Findings Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            
            {/* Context & Question */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 block font-semibold">
                  Inquiry Addressed
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  "{currentChart.researchQuestion}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                  Variables Examined
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentChart.variables.map((v, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-slate-300 border border-white/10">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Analytical Takeaways */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                    What This Visualization Demonstrates
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {currentChart.findings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2"></span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between text-[11px] font-mono text-purple-300/80">
                <span>Calculated against the 2.5x Theatrical Breakeven Benchmark</span>
                <span>Python 3 &bull; Matplotlib</span>
              </div>
            </div>

          </div>

        </div>

      </div>

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

    </div>
  );
};
