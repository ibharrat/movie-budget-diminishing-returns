import React from 'react';
import { Film, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentPage: 'question' | 'visualization' | 'about';
  onNavigate: (page: 'question' | 'visualization' | 'about') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#040507]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => onNavigate('question')}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Film className="w-4 h-4" />
          </div>
          <span className="font-semibold text-white tracking-tight text-sm sm:text-base">
            Movie Budget Analysis
          </span>
        </div>

        {/* Page Switcher Navigation */}
        <nav className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-medium">
          <button
            onClick={() => onNavigate('question')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentPage === 'question'
                ? 'bg-white/10 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            The Question
          </button>
          <button
            onClick={() => onNavigate('visualization')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentPage === 'visualization'
                ? 'bg-white/10 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Data Visualization
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentPage === 'about'
                ? 'bg-white/10 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            About Me
          </button>
        </nav>

        {/* Kaggle Dataset Link */}
        <a
          href="https://www.kaggle.com/datasets/sibamsamanta07/movies-dataset-45k-films-with-budget-and-revenue"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
        >
          <span>45k Kaggle Dataset</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>
    </header>
  );
};
