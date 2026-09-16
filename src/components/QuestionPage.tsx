import React from 'react';
import { 
  ArrowRight, 
  Database, 
  ExternalLink, 
  HelpCircle, 
  AlertTriangle, 
  Target,
  Lightbulb, 
  Film, 
  Tv, 
  Building2, 
  Calendar, 
  Users, 
  Clock, 
  SlidersHorizontal 
} from 'lucide-react';

interface QuestionPageProps {
  onNavigateToViz: () => void;
}

export const QuestionPage: React.FC<QuestionPageProps> = ({ onNavigateToViz }) => {
  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 md:py-20 space-y-16">
      
      {/* 1. Header & Primary Question */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span>CENTRAL RESEARCH QUESTION</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          "At what budget range do movies tend to have{' '}
          <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
            diminishing returns?
          </span>
          "
        </h1>

        <p className="text-base sm:text-lg text-slate-300 font-light max-w-3xl leading-relaxed">
          Exploring the correlation between escalating production budgets and box office returns across 45,000+ films to pinpoint where capital investment stops generating proportional financial yield.
        </p>
      </div>

      {/* 2. Real-World Problem & Why This Matters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* The Real-World Problem */}
        <div className="rounded-2xl p-6 border border-rose-500/20 bg-gradient-to-br from-rose-950/25 via-dark-900/70 to-dark-950 flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold block mb-1">
                The Real-World Problem
              </span>
              <h2 className="text-base font-bold text-white leading-snug">
                Bloated Budgets & Severe Financial Losses
              </h2>
            </div>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            A vast quantity of movies result in major financial losses due to an ongoing trend of massive budgets and disappointing revenue results.
          </p>
        </div>

        {/* Why This Project Matters */}
        <div className="rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-purple-950/25 via-dark-900/70 to-dark-950 flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0 mt-0.5">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold block mb-1">
                Why This Project Matters
              </span>
              <h2 className="text-base font-bold text-white leading-snug">
                Industry Impact & Strategic Cost Savings
              </h2>
            </div>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            This problem matters because movies are a gigantic industry where large corporations are sinking a major amount of money and resources into singular projects. In addition to that you have smaller companies investing less but producing equal or even more revenue. By understanding the trends in budget vs revenue one can draw conclusions that may result in significant cost savings.
          </p>
        </div>
      </div>

      {/* 3. Subquestions */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-4 bg-purple-400 rounded-full"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Investigative Subquestions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Subquestion 1 */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Film className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wide block mb-2">
                Subquestion 01
              </span>
              <h3 className="text-base font-semibold text-white leading-snug">
                Does the movie genre have an impact on overall revenue trends?
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-white/5 font-mono">
              Genre ROI & category sensitivity
            </p>
          </div>

          {/* Subquestion 2 */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                <Tv className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wide block mb-2">
                Subquestion 02
              </span>
              <h3 className="text-base font-semibold text-white leading-snug">
                How many movies are making up for revenue through other means (streaming, merchandise, etc.)?
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-white/5 font-mono">
              Ancillary & post-theatrical channels
            </p>
          </div>

          {/* Subquestion 3 */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wide block mb-2">
                Subquestion 03
              </span>
              <h3 className="text-base font-semibold text-white leading-snug">
                Do larger studios deal with diminishing returns more?
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-white/5 font-mono">
              Studio size vs. capital efficiency
            </p>
          </div>
        </div>
      </div>

      {/* 4. Preliminary Hypotheses */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-4 bg-amber-400 rounded-full"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Preliminary Hypotheses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-amber-300 font-semibold uppercase tracking-wider">
                Hypothesis #1
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              "Certain movies were not made to make money back through box office revenue but rather through things like streaming."
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-purple-300 font-semibold uppercase tracking-wider">
                Hypothesis #2
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              "Movie revenues rely more on proper marketing campaigns rather than extremely high budgets."
            </p>
          </div>
        </div>
      </div>

      {/* 5. Potential Variables */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-4 bg-cyan-400 rounded-full"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Potential Variables to Analyze
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-slate-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono block">Variable 01</span>
              <span className="text-sm font-medium text-white">Time of year movie is released</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-slate-300">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono block">Variable 02</span>
              <span className="text-sm font-medium text-white">Genre of movie</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-slate-300">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono block">Variable 03</span>
              <span className="text-sm font-medium text-white">Popularity of actors in the movie</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-slate-300">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono block">Variable 04</span>
              <span className="text-sm font-medium text-white">What company produced the movie</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-slate-300">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono block">Variable 05</span>
              <span className="text-sm font-medium text-white">How long was movie in theatres</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-purple-400 font-mono block">Primary Target</span>
              <span className="text-sm font-medium text-purple-200">Budget vs. Revenue Multiplier</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Action & Dataset Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10">
        <button
          onClick={onNavigateToViz}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-glow-purple"
        >
          <span>Go to Data Visualization</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href="https://www.kaggle.com/datasets/sibamsamanta07/movies-dataset-45k-films-with-budget-and-revenue"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all"
        >
          <Database className="w-4 h-4 text-purple-400" />
          <span>Kaggle: Movies Dataset 45k Films</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

    </div>
  );
};
