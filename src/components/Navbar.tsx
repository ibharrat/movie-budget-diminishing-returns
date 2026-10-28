import React from 'react';
import { Film, ExternalLink } from 'lucide-react';

export type PageKey = 'question' | 'cleaning' | 'models' | 'redesigns' | 'sql' | 'about';

interface NavbarProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1c2436] bg-[#08090d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => onNavigate('question')}
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer hover:opacity-90 transition-opacity shrink-0 group"
        >
          <Film className="w-7 h-7 sm:w-9 sm:h-9 text-sky-400 shrink-0 group-hover:scale-105 transition-transform" />
          <span className="font-extrabold text-white tracking-tight text-sm sm:text-xl lg:text-2xl truncate max-w-[150px] sm:max-w-none">
            Movie Budget Analysis
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 rounded-lg bg-[#0f131c] border border-[#1c2436] text-xs font-medium shrink-0 overflow-x-auto max-w-full">
          <button
            onClick={() => onNavigate('question')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'question'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            The Question
          </button>
          <button
            onClick={() => onNavigate('cleaning')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'cleaning'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Data Cleaning
          </button>
          <button
            onClick={() => onNavigate('models')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'models'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Models &amp; Findings
          </button>
          <button
            onClick={() => onNavigate('redesigns')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'redesigns'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Redesign Studio
          </button>
          <button
            onClick={() => onNavigate('sql')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'sql'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>SQL</span>
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'about'
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            About Me
          </button>
        </nav>

        {/* External Colab & Kaggle Links */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a
            href="https://colab.research.google.com/drive/1p-kZEzo7pI1qkmJsUF4ropuIlHgBRKr-?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-sky-300 hover:text-white font-mono transition-colors border border-sky-500/40 hover:border-sky-400 px-3 py-1.5 rounded-md bg-[#0c1626]"
          >
            <span>Colab</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
          </a>
          <a
            href="https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 font-mono transition-colors border border-[#1c2436] hover:border-sky-500/40 px-3 py-1.5 rounded-md bg-[#0f131c]"
          >
            <span>Dataset</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </header>
  );
};
