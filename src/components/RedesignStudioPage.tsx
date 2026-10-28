import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Database, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  Sliders,
  Layout,
  Palette
} from 'lucide-react';

export interface RedesignStudyItem {
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
  tiedModel: string;
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

interface RedesignStudioPageProps {
  onNavigateToModels?: () => void;
  onNavigateToSql?: () => void;
  onNavigateToCleaning?: () => void;
}

export const RedesignStudioPage: React.FC<RedesignStudioPageProps> = ({
  onNavigateToModels,
  onNavigateToSql,
  onNavigateToCleaning
}) => {
  const [currentStudyIndex, setCurrentStudyIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'comparison' | 'redesign' | 'original'>('comparison');

  const studiesList: RedesignStudyItem[] = [
    {
      id: 'redesign1',
      number: '01',
      findingTitle: 'The Diminishing Returns Threshold: Capital Yield Drops Below Breakeven Above $25M',
      shortTitle: 'Budget Tier Inflection',
      originalId: 'eda4',
      originalTitle: 'Original EDA 04: Group Comparison — Capital Efficiency Curve by Budget Tier',
      originalImage: '/charts/eda4_budget_tier_diminishing.png',
      originalLimitations: 'Vertical orientation forced awkward tilted labels; interquartile range fill created visual clutter without profit/loss boundaries; title was a generic academic topic label.',
      redesignedImage: '/charts/redesign1_budget_tier_diminishing.png',
      redesignedChartType: 'Horizontal Tiered Benchmark Chart with Color-Zoned Profitability Regions',
      redesignedBreakthrough: 'Horizontal layout accommodates full tier descriptions and sample sizes (n=5,372); an explicit vertical 2.5x Breakeven guideline immediately identifies the capital bleed zone.',
      bottomLine: 'Micro-budgets lead at a 4.82x median return (90% breakeven rate). Once production budgets surpass $25M, median yield drops to 2.38x—falling below the 2.5x breakeven line and confirming diminishing returns.',
      tiedModel: 'Logistic Regression & Budget Tier Inflection Model',
      improvements: {
        chartType: 'Converted from vertical line plot to an executive horizontal benchmark bar chart, establishing natural left-to-right reading flow.',
        title: 'Replaced passive descriptive topic with an assertive conclusion: "The Diminishing Returns Threshold: Capital Yield Drops Below Breakeven Above $25M".',
        labels: 'Embedded dual metrics directly at bar ends (Median Multiple + Breakeven Success Rate + Sample Size n), removing need for secondary lookups.',
        scale: 'Anchored X-axis at zero with focused 0–6.0x range and a prominent 2.5x benchmark marker for instant profitability interpretation.',
        legend: 'Eliminated disconnected legend box; labeled the commercial profit and deficit risk zones directly on the chart canvas.',
        annotation: 'Added shaded "Capital Bleed Zone" (<2.5x) vs "Commercial Profit Zone", plus an explicit pointer callout highlighting the $25M–$65M inflection point.',
        layout: 'Spacious horizontal structure with generous vertical spacing between tiers and zero element overlapping.',
        visualHierarchy: 'Vibrant Icy Blue highlights optimal sub-$25M tiers; muted charcoal and slate demote failing higher-budget tiers.',
        accessibility: 'Meets WCAG AAA contrast (7.8:1) against matte black; uses redundant text badges (+/- status, percentages) alongside color.'
      }
    },
    {
      id: 'redesign2',
      number: '02',
      findingTitle: 'Box Office Saturation: Production Budgets >$100M Suffer Logarithmic Flattening',
      shortTitle: 'Budget vs Revenue Saturation',
      originalId: 'eda3',
      originalTitle: 'Original EDA 03: Relationship Analysis — Production Budget vs. Worldwide Gross Revenue',
      originalImage: '/charts/eda3_budget_vs_revenue_scatter.png',
      originalLimitations: 'Severe point overplotting created an impenetrable ink blob where 90% of observations were obscured; diagonal ray was hard to distinguish from the trend line.',
      redesignedImage: '/charts/redesign2_budget_vs_revenue.png',
      redesignedChartType: 'Density Scatter with Empirical Power-Law Curve & Labeled Landmark Outliers',
      redesignedBreakthrough: 'Semi-transparent density rendering reveals true sample concentration; empirical sublinear curve (exponent 0.72) proves diminishing returns; shaded breakeven envelope isolates mega-budget deficit traps.',
      bottomLine: 'Box office revenue scales with a sublinear power-law exponent of 0.72 (< 1.0). Doubling production capital yields only +64% box office, creating a high-budget deficit trap past $150M.',
      tiedModel: 'XGBoost Regressor & Power-Law Saturation Model',
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
      }
    },
    {
      id: 'redesign3',
      number: '03',
      findingTitle: 'Four Decades of Capital Erosion: Budgets Soared +648% While Returns Halved',
      shortTitle: '40-Year Macro Capital Erosion',
      originalId: 'eda6',
      originalTitle: 'Original EDA 06: Time-Series Trend Analysis — 40-Year Budget Escalation vs. Compressing Multipliers',
      originalImage: '/charts/eda6_timeseries_decade_trends.png',
      originalLimitations: 'Dual Y-axes ($M on left, multiplier on right) mislead viewers because scale heights are arbitrary; visually difficult to identify when profitability crossed below breakeven.',
      redesignedImage: '/charts/redesign3_timeseries_decade_trends.png',
      redesignedChartType: 'Unified Percentage Growth Index Baseline Chart (1980 = 0%) with Divergence Ribbon',
      redesignedBreakthrough: 'By indexing both metrics to 1980 baseline, viewers immediately grasp the staggering divergence: production cost soared +648% while capital multiple contracted -52%, with an explicit vertical callout at the 2008 breakeven crossover.',
      bottomLine: 'Between 1980 and 2020, average movie production budgets escalated from $18.5M to $138.5M (+648%), while box office return multipliers fell from 4.65x down to 2.22x (-52%), structurally breaching the 2.5x breakeven line during the 2008 financial crisis.',
      tiedModel: 'Macro Time-Series & Bayesian Ridge Trend Model',
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
      }
    },
    {
      id: 'redesign4',
      number: '04',
      findingTitle: 'Genre Capital Resilience: Low-Overhead Horror & Mystery Dominate High-CGI Spectacles',
      shortTitle: 'Genre Commercial Efficiency',
      originalId: 'eda7',
      originalTitle: 'Original EDA 07: Group Comparison — Genre Commercial Efficiency & Breakeven Rates',
      originalImage: '/charts/eda7_genre_efficiency_comparison.png',
      originalLimitations: 'Uniform thick bars cluttered the chart; lacked grouping by budget risk; disconnected legend for breakeven benchmark; no context on average budget required per genre.',
      redesignedImage: '/charts/redesign4_genre_efficiency.png',
      redesignedChartType: 'Grouped Tiered Lollipop / Bullet Benchmark Chart with Average Budget Metadata',
      redesignedBreakthrough: 'Lollipops reduce ink-to-data ratio; genres are categorized into High-Resilience (Overhead <$30M) vs Capital Sinks (Budget >$80M); shows that Horror averages 4.15x on a tiny $12.4M budget, while Action averages only 2.35x despite $84.5M spend.',
      bottomLine: 'Horror (4.15x) and Mystery (3.30x) lead Hollywood in commercial efficiency with 68%+ breakeven resilience on low average budgets ($12M–$18M). In contrast, heavy-CGI Action ($84.5M budget, 2.35x) and Sci-Fi ($92.1M budget, 2.20x) fall below the 2.5x breakeven line.',
      tiedModel: 'CatBoost Multi-Genre Model & KNN Comps Model',
      improvements: {
        chartType: 'Converted heavy solid bars into sleek lollipop stems with prominent endpoint markers, dramatically increasing data-ink ratio.',
        title: 'Actionable insight headline: "Genre Capital Efficiency: Horror & Mystery Dominate, While Heavy CGI Breeds Deficits".',
        labels: 'Integrated three metrics per genre: Median Multiple (4.15x), Breakeven Rate (68.4%), and Average Budget ($12.4M).',
        scale: '0 to 5.2x multiplier scale with a prominent vertical benchmark guideline at 2.5x Breakeven.',
        legend: 'Direct category brackets on the chart separating High-Resilience Genres from High-Risk Capital Sinks.',
        annotation: 'Annotated callout explaining Horror structural advantage (premise-driven, low CGI, high viral word-of-mouth).',
        layout: 'Genres grouped by financial risk tier with generous vertical breathing room between items.',
        visualHierarchy: 'Profitable genres highlighted in vibrant Icy Blue with white markers; sub-breakeven genres styled in muted charcoal and slate.',
        accessibility: 'High contrast 8:1 text badges, clear non-color tier brackets, and text annotations for every single data point.'
      }
    },
    {
      id: 'redesign5',
      number: '05',
      findingTitle: 'Statistical Feature Engineering: Transforming Power-Law Raw Skew into Model-Ready Bell Curves',
      shortTitle: 'Distribution Normalization',
      originalId: 'eda1',
      originalTitle: 'Original EDA 01: Distribution Analysis — Budget & Revenue Log-Normal Skew',
      originalImage: '/charts/eda1_distribution_histograms.png',
      originalLimitations: 'Did not display the original raw linear distribution, making it impossible for viewers to understand why the transformation was required; exponent labels (10^7.3) confused non-technical audiences.',
      redesignedImage: '/charts/redesign5_distribution_normalization.png',
      redesignedChartType: 'Before-and-After Dual-Panel Transformation Study (Raw Linear Skew vs Log10 Normal Bell Curve)',
      redesignedBreakthrough: 'Side-by-side comparison proves the necessity of data transformation: Left panel exposes the raw linear failure (93.4% of films crushed in the first bin); Right panel demonstrates the restored Gaussian bell curve ready for linear and neural network modeling.',
      bottomLine: 'Raw movie financial metrics exhibit extreme power-law right skew ($10k to $2.8B), packing 93.4% of observations into the first linear bin and breaking regression assumptions. Log10 transformation restores Gaussian symmetry around a $20M median budget and $50M median gross, stabilizing model variance.',
      tiedModel: 'Power-Law Normalization Preprocessing Model',
      improvements: {
        chartType: 'Created a direct Before vs After comparative panel layout contrasting Raw Linear Skew against Log10 Normalization.',
        title: 'Methodological takeaway headline: "Statistical Feature Normalization: Eliminating Power-Law Distortion for AI Models".',
        labels: 'Replaced confusing exponent notation (10^7) with human-readable financial landmarks ($100K, $1M, $10M, $100M, $1B).',
        scale: 'Left panel shows raw linear millions ($0 to $360M); Right panel maps logarithmic progression with annotated dollar tick marks.',
        legend: 'In-panel statistical summary cards displaying Mean, Median, and Skewness parameters.',
        annotation: 'Callout explaining the 93.4% pileup in linear space, and callout highlighting the restored homoscedasticity on the log curve.',
        layout: 'Two balanced panels with clear visual distinction (Before Redesign in muted slate, After Redesign in vibrant Icy Blue).',
        visualHierarchy: 'Transformed Gaussian peak accentuated with solid Icy Blue bar; raw skewed distribution rendered in subdued dark slate.',
        accessibility: 'Clear dual labels, high contrast borders, and layperson explanations of technical statistical requirements.'
      }
    }
  ];

  const currentStudy = studiesList[currentStudyIndex] || studiesList[0];

  const nextStudy = () => setCurrentStudyIndex((prev) => (prev + 1) % studiesList.length);
  const prevStudy = () => setCurrentStudyIndex((prev) => (prev - 1 + studiesList.length) % studiesList.length);

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 space-y-10 overflow-x-hidden">
      
      {/* 1. Header & Context */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0c1626] border border-sky-500/30 text-xs font-mono text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ASSIGNMENT 6 &bull; STATIC VISUALIZATION &amp; REDESIGN STUDIO</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToModels && (
              <button
                onClick={onNavigateToModels}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0f131c] hover:bg-[#131824] border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono text-sky-300 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>Models &amp; Findings &rarr;</span>
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
          Static Visualization Redesign Studio
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
          Turning exploratory model findings into clear, publication-grade static visual communication. Selecting 5 pivotal empirical findings from our machine learning analysis and engineering comprehensive improvements across 9 core design dimensions.
        </p>

        {/* Assignment 6 Objective & Rubric Banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0c1421] border border-sky-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#101b2b] text-sky-400 border border-sky-500/30 shrink-0 mt-0.5">
              <Eye className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                  Assignment 6 Design Objective
                </span>
                <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold">
                  5 Case Studies &bull; 9 Improvement Pillars
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Students transform exploratory visualizations into clear, professional static visualizations. Each study pairs the baseline finding with an upgraded redesign improving: Chart Type, Title, Labels, Scale, Legend, Annotation, Layout, Visual Hierarchy, and Accessibility.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Case Studies Navigation Pills */}
        <div className="pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-xl bg-[#0b0e15] border border-[#1c2436]">
            {studiesList.map((s, idx) => {
              const isSelected = idx === currentStudyIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStudyIndex(idx)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-mono transition-all text-left flex flex-col gap-0.5 ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-[#121824]'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-bold ${
                    isSelected ? 'text-slate-950/70' : 'text-sky-400'
                  }`}>
                    Study {s.number}
                  </span>
                  <span className="truncate text-xs">
                    {s.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2. Active Redesign Study Workspace */}
      <div className="rounded-xl p-5 sm:p-7 border border-[#1c2436] bg-[#0f131c] space-y-6">
        
        {/* Study Header & View Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                Case Study {currentStudy.number} of 05
              </span>
              <span className="text-xs font-mono text-slate-400">
                Tied to: <strong className="text-sky-300">{currentStudy.tiedModel}</strong>
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              {currentStudy.findingTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono">
              <button
                onClick={() => setViewMode('comparison')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'comparison'
                    ? 'bg-sky-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Side-by-Side
              </button>
              <button
                onClick={() => setViewMode('redesign')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'redesign'
                    ? 'bg-sky-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Redesigned Only
              </button>
              <button
                onClick={() => setViewMode('original')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'original'
                    ? 'bg-sky-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Original Only
              </button>
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1.5 pl-1">
              <button
                onClick={prevStudy}
                className="p-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] transition-colors"
                title="Previous Case Study"
              >
                <ChevronLeft className="w-4 h-4 text-sky-400" />
              </button>
              <button
                onClick={nextStudy}
                className="p-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] transition-colors"
                title="Next Case Study"
              >
                <ChevronRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Panels: Side-by-Side Comparison vs Single View */}
        {viewMode === 'comparison' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Original Exploratory Chart */}
            <div className="rounded-xl p-4 bg-[#07090e] border border-[#1c2436] space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-[#1c2436]">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#141824] text-slate-400 border border-[#1c2436]">
                  Original Exploratory Baseline
                </span>
                <span className="text-[10px] font-mono text-slate-500">{currentStudy.originalId.toUpperCase()}</span>
              </div>
              <img
                src={currentStudy.originalImage}
                alt={currentStudy.originalTitle}
                className="w-full h-auto object-contain max-h-[380px] rounded opacity-80"
              />
              <div className="p-3 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Identified Baseline Limitations:
                </span>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {currentStudy.originalLimitations}
                </p>
              </div>
            </div>

            {/* Right: Redesigned Static Communication Chart */}
            <div className="rounded-xl p-4 bg-[#07090e] border border-sky-500/40 space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-sky-500/30">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#0c1626] text-sky-300 border border-sky-500/40 font-bold">
                  Redesigned Static Communication &bull; Final
                </span>
                <span className="text-[10px] font-mono text-sky-400 font-bold">9-Pillar Upgrade</span>
              </div>
              <img
                src={currentStudy.redesignedImage}
                alt={currentStudy.findingTitle}
                className="w-full h-auto object-contain max-h-[380px] rounded"
              />
              <div className="p-3 rounded-lg bg-[#0c1421] border border-sky-500/30 space-y-1">
                <span className="text-[10px] font-mono text-sky-300 uppercase font-bold block">
                  Communication Breakthrough:
                </span>
                <p className="text-xs text-slate-200 font-light leading-relaxed">
                  {currentStudy.redesignedBreakthrough}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl p-4 sm:p-6 bg-[#07090e] border border-[#1c2436] flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-between w-full pb-3 border-b border-[#1c2436]">
              <span className="text-xs font-mono text-slate-400 uppercase">
                {viewMode === 'redesign' ? 'Viewing Upgraded Redesign (Final)' : 'Viewing Original Baseline'}
              </span>
              <a
                href={viewMode === 'redesign' ? currentStudy.redesignedImage : currentStudy.originalImage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300"
              >
                <span>Open Full Resolution</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <img
              src={viewMode === 'redesign' ? currentStudy.redesignedImage : currentStudy.originalImage}
              alt={currentStudy.findingTitle}
              className="w-full h-auto object-contain max-h-[500px] rounded"
            />
            <p className="text-xs text-slate-300 max-w-2xl text-center font-light leading-relaxed">
              {viewMode === 'redesign' ? currentStudy.redesignedBreakthrough : currentStudy.originalLimitations}
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
              Core Analytical Conclusion
            </span>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              {currentStudy.bottomLine}
            </p>
          </div>
        </div>

        {/* 9-Pillar Redesign Improvements Grid */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
              9-Pillar Redesign Improvements Framework (Assignment 6 Rubric):
            </span>
            <span className="text-xs font-mono text-slate-400">
              Evaluated for Case Study {currentStudy.number}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Column 1: Form & Framing */}
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2.5">
              <div className="flex items-center gap-2 pb-1.5 border-b border-[#1c2436]">
                <Layout className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-bold text-sky-300 uppercase">1. Form &amp; Framing</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-slate-200 font-mono text-[11px] block">Chart Type:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{currentStudy.improvements.chartType}</p>
                </div>
                <div>
                  <strong className="text-slate-200 font-mono text-[11px] block">Title:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{currentStudy.improvements.title}</p>
                </div>
                <div>
                  <strong className="text-slate-200 font-mono text-[11px] block">Layout:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{currentStudy.improvements.layout}</p>
                </div>
              </div>
            </div>

            {/* Column 2: Scales, Labels & Keys */}
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2.5">
              <div className="flex items-center gap-2 pb-1.5 border-b border-[#1c2436]">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-bold text-sky-300 uppercase">2. Scales, Labels &amp; Keys</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-slate-200 font-mono text-[11px] block">Labels:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{currentStudy.improvements.labels}</p>
                </div>
                <div>
                  <strong className="text-slate-200 font-mono text-[11px] block">Scale:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{currentStudy.improvements.scale}</p>
                </div>
                <div>
                  <strong className="text-slate-200 font-mono text-[11px] block">Legend:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{currentStudy.improvements.legend}</p>
                </div>
              </div>
            </div>

            {/* Column 3: Context & Accessibility */}
            <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-2.5">
              <div className="flex items-center gap-2 pb-1.5 border-b border-[#1c2436]">
                <Palette className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-bold text-sky-300 uppercase">3. Context &amp; Accessibility</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-slate-200 font-mono text-[11px] block">Annotation:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{currentStudy.improvements.annotation}</p>
                </div>
                <div>
                  <strong className="text-slate-200 font-mono text-[11px] block">Visual Hierarchy:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{currentStudy.improvements.visualHierarchy}</p>
                </div>
                <div>
                  <strong className="text-slate-200 font-mono text-[11px] block">Accessibility:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{currentStudy.improvements.accessibility}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Navigation Strip */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0c1421] border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider block">
            Continue Research Exploration
          </span>
          <h3 className="text-lg font-bold text-white">
            Machine Learning Models &amp; SQL Analytics Workbench
          </h3>
          <p className="text-xs text-slate-400 max-w-xl font-light">
            Inspect all 20 evaluated models and empirical findings, or execute relational schema queries across the SQL workbench.
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
          {onNavigateToModels && (
            <button
              onClick={onNavigateToModels}
              className="px-4 py-2.5 rounded-lg bg-[#0f131c] hover:bg-[#131824] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono transition-colors inline-flex items-center gap-2"
            >
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>Models &amp; Findings</span>
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
