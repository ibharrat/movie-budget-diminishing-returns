import React from 'react';
import { 
  User, 
  Server, 
  Code2, 
  BarChart3, 
  Film, 
  Heart, 
  Sparkles, 
  ArrowRight,
  Database
} from 'lucide-react';

interface AboutPageProps {
  onNavigateToQuestion: () => void;
  onNavigateToViz: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ 
  onNavigateToQuestion, 
  onNavigateToViz 
}) => {
  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 md:py-20 space-y-16">
      
      {/* 1. Header Profile */}
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
          <User className="w-3.5 h-3.5 text-purple-400" />
          <span>ABOUT THE RESEARCHER</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
            Ian Bharrat
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 font-light max-w-3xl leading-relaxed">
          I am an <strong className="text-white font-medium">Information Technology student</strong> with a core passion for <strong className="text-white font-medium">technological infrastructure</strong> and data-driven storytelling.
        </p>
      </div>

      {/* 2. Background & Core Interests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tech Infrastructure & Python */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5">
              <Server className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Core Foundation
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              Infrastructure & Python
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              I focus heavily on how robust technological infrastructure powers modern systems. When building, scripting, and manipulating data, <strong className="text-white font-medium">Python is my favorite programming language</strong>. Its versatility, expressive syntax, and rich ecosystem make it the ultimate tool for both systems automation and deep data exploration.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-cyan-300">
            <Code2 className="w-4 h-4" />
            <span>Python &bull; Systems &bull; Cloud Infrastructure</span>
          </div>
        </div>

        {/* Why Data Visualization */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
                The Medium
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              The Power of Data Visualization
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Data visualization really interests me because of what it can convey beyond raw numbers. Complex multidimensional datasets often hide critical patterns that only visual representation can bring to light. Harnessing Python’s analytical libraries alongside modern visual interfaces allows us to turn static figures into compelling, actionable conclusions.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-purple-300">
            <Sparkles className="w-4 h-4" />
            <span>Transforming Data into Intuitive Insight</span>
          </div>
        </div>

      </div>

      {/* 3. Why This Dataset & Favorite Movies */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              The Inspiration
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Why I Chose This Dataset
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I chose this 45k movie dataset because <strong className="text-white font-medium">I love movies</strong>. The film industry presents a fascinating intersection of creative artistry, high-stakes risk, and massive capital deployment. Investigating budget efficiency combines my genuine appreciation for cinema with analytical curiosity.
          </p>
        </div>

        {/* Favorite Movies Spotlight */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
            <span>My Favorite Movies</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Parasite */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                  2019
                </span>
                <span className="text-xs text-slate-400 font-mono">Bong Joon-ho</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Parasite</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A brilliantly crafted thriller and social satire. A standout example of a modest ~$11M budget yielding global acclaim and massive worldwide box office.
              </p>
            </div>

            {/* Birdman */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  2014
                </span>
                <span className="text-xs text-slate-400 font-mono">Alejandro G. Iñárritu</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Birdman</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A technical marvel of cinematography and kinetic pacing, exploring creative ego, legacy, and artistic reinvention inside Broadway theater.
              </p>
            </div>

            {/* Coraline */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  2009
                </span>
                <span className="text-xs text-slate-400 font-mono">Henry Selick</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Coraline</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                An unforgettable stop-motion masterpiece by LAIKA. Meticulous artisanal craft, eerie worldbuilding, and enduring atmospheric storytelling.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Quick Action Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToQuestion}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold transition-all"
          >
            <span>View The Research Question</span>
          </button>
          <button
            onClick={onNavigateToViz}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-glow-purple"
          >
            <span>Go to Data Visualization</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Database className="w-3.5 h-3.5 text-purple-400" />
          <span>Analyzing 45,000+ Titles via Python</span>
        </div>
      </div>

    </div>
  );
};
