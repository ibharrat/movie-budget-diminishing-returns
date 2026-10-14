import React from 'react';
import { Film, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentPage: 'question' | 'cleaning' | 'visualization' | 'sql' | 'about';
  onNavigate: (page: 'question' | 'cleaning' | 'visualization' | 'sql' | 'about') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1c2436] bg-[#08090d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div 
          onClick={() => onNavigate('question')}
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer hover:opacity-90 transition-opacity shrink-0 group"
        >
          <Film className="w-7 h-7 sm:w-9 sm:h-9 text-sky-400 shrink-0 group-hover:scale-105 transition-transform" />
          <span className="font-extrabold text-white tracking-tight text-sm sm:text-xl lg:text-2xl truncate max-w-[150px] sm:max-w-none">
            Movie Budget Analysis
          </span>
        </div>

        {/* Page Switcher Navigation */}
        <nav className="flex items-center gap-1 p-1 rounded-lg bg-[#0f131c] border border-[#1c2436] text-xs font-medium shrink-0">
          <button
            onClick={() => onNavigate('question')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-md transition-colors ${
              currentPage === 'question'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            The Question
          </button>
          <button
            onClick={() => onNavigate('cleaning')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-md transition-colors ${
              currentPage === 'cleaning'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Data Cleaning
          </button>
          <button
            onClick={() => onNavigate('visualization')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-md transition-colors ${
              currentPage === 'visualization'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Visualizations
          </button>
          <button
            onClick={() => onNavigate('sql')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-md transition-colors ${
              currentPage === 'sql'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>SQL</span>
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-md transition-colors ${
              currentPage === 'about'
                ? 'bg-sky-500 text-slate-950 font-semibold'
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
          className="hidden lg:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 px-3 py-1.5 rounded-md border border-[#1c2436] hover:border-sky-500/40 transition-colors bg-[#0f131c]"
        >
          <span>45k Kaggle Dataset</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>
    </header>
  );
};
