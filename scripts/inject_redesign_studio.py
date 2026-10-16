"""
Script to safely inject the Redesign Studio (Assignment 6) into VisualizationPage.tsx
"""

import re

SRC_FILE = "src/components/VisualizationPage.tsx"

with open(SRC_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add Columns to lucide-react imports if not there
if "Columns," not in content and "Columns " not in content:
    content = content.replace("CheckCircle2,", "CheckCircle2,\n  Columns,")

# 2. Add RedesignStudy interfaces and redesignStudies data before inputCharts
redesign_interfaces_and_data = '''
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
'''

if "interface RedesignStudy" not in content:
    content = content.replace("interface VisualizationPageProps {", redesign_interfaces_and_data + "\ninterface VisualizationPageProps {")

# 3. Add redesign state to component
old_state = "const [activeStage, setActiveStage] = useState<'input' | 'output'>('input');\n  const [currentChartIndex, setCurrentChartIndex] = useState<number>(0);"
new_state = """const [activeStage, setActiveStage] = useState<'input' | 'redesign' | 'output'>('input');
  const [currentChartIndex, setCurrentChartIndex] = useState<number>(0);
  const [currentRedesignIndex, setCurrentRedesignIndex] = useState<number>(0);
  const [redesignViewMode, setRedesignViewMode] = useState<'comparison' | 'redesign' | 'original'>('comparison');"""

content = content.replace(old_state, new_state)

# 4. Insert redesignStudies data array right before inputCharts
redesign_studies_code = '''
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
        annotation: 'Annotated callout explaining Horror\'s structural advantage (premise-driven, low CGI, high viral word-of-mouth).',
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
'''

if "const redesignStudies: RedesignStudy[]" not in content:
    content = content.replace("  const inputCharts: ChartItem[] = [", redesign_studies_code + "\n  const inputCharts: ChartItem[] = [")

# 5. Add currentRedesign and helpers after prevChart
helpers = '''
  const currentRedesign = redesignStudies[currentRedesignIndex] || redesignStudies[0];

  const nextRedesign = () => {
    setCurrentRedesignIndex((prev) => (prev + 1) % redesignStudies.length);
  };

  const prevRedesign = () => {
    setCurrentRedesignIndex((prev) => (prev - 1 + redesignStudies.length) % redesignStudies.length);
  };
'''

if "const currentRedesign =" not in content:
    content = content.replace("  const prevChart = () => {\n    setCurrentChartIndex((prev) => (prev - 1 + currentCharts.length) % currentCharts.length);\n  };", "  const prevChart = () => {\n    setCurrentChartIndex((prev) => (prev - 1 + currentCharts.length) % currentCharts.length);\n  };\n" + helpers)

# 6. Update Gemini model tab metadata
content = content.replace("chartCount: 14,", "chartCount: 19,")
content = content.replace("badge: '10 Input EDA + 4 Model Output',", "badge: '10 EDA + 5 Redesigns + 4 Models',")
content = content.replace("description: 'Autonomous Python Matplotlib & Pandas visualizations generated by Gemini: 10 systematic exploratory data analysis charts + 4 model prediction & residual analytics.',", "description: 'Autonomous Python Matplotlib & Pandas visualizations generated by Gemini: 10 exploratory EDA charts + 5 professional static redesign studies + 4 predictive model outputs.',")

# 7. Update the Stage Switcher to include Redesign Studio
old_switcher = """              <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono">
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
              </div>"""

new_switcher = """              <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono overflow-x-auto max-w-full">
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
              </div>"""

content = content.replace(old_switcher, new_switcher)

old_stage_desc = """            <span className="text-xs font-mono text-sky-300 bg-[#0c1626] px-3 py-1 rounded-md border border-sky-500/30 self-start sm:self-auto">
              {activeStage === 'input' 
                ? 'Empirical Distributions & Pre-Model Feature Relationships' 
                : 'Trained Model Fits, Residual Risk & Marginal Derivative (dy/dx)'}
            </span>"""

new_stage_desc = """            <span className="text-xs font-mono text-sky-300 bg-[#0c1626] px-3 py-1 rounded-md border border-sky-500/30 self-start sm:self-auto">
              {activeStage === 'input' 
                ? 'Empirical Distributions & Pre-Model Feature Relationships' 
                : activeStage === 'redesign'
                ? 'Turning Analysis into Effective Visual Communication (5 Studies)'
                : 'Trained Model Fits, Residual Risk & Marginal Derivative (dy/dx)'}
            </span>"""

content = content.replace(old_stage_desc, new_stage_desc)

# 8. Render Redesign Studio when activeStage === 'redesign'
redesign_view_jsx = '''
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
'''

# 9. Wrap the existing carousel viewer inside activeStage !== 'redesign'
old_header_start = '          {/* Header of Active Chart: Title, Counter & Arrow Navigation */}'
content = content.replace(old_header_start, redesign_view_jsx + old_header_start)

# Close the fragment before selectedModel === 'classifier'
old_end = """            <button
              onClick={nextChart}
              className="px-4 py-2 rounded-lg bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 transition-colors flex items-center gap-2 text-xs font-mono"
            >
              <span>Next Chart</span>
              <ChevronRight className="w-4 h-4 text-sky-400" />
            </button>
          </div>

        </div>
      ) : selectedModel === 'classifier' ? ("""

new_end = """            <button
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
      ) : selectedModel === 'classifier' ? ("""

content = content.replace(old_end, new_end)

with open(SRC_FILE, "w", encoding="utf-8") as f:
    f.write(content)

print("[OK] Successfully updated VisualizationPage.tsx with Redesign Studio!")
