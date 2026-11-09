import React, { useState, useRef, useEffect } from 'react';
import { Film, ExternalLink, ChevronDown, Sparkles, Database, Palette, Filter } from 'lucide-react';

export type PageKey = 'question' | 'models' | 'algorithm' | 'cleaning' | 'redesigns' | 'sql' | 'about';

interface NavbarProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isFurtherAnalysisActive = ['algorithm', 'cleaning', 'redesigns', 'sql'].includes(currentPage);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPage = (page: PageKey) => {
    onNavigate(page);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#282b34] bg-[#121316]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => onNavigate('question')}
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer hover:text-red-400 transition-colors shrink-0 group"
        >
          <Film className="w-7 h-7 sm:w-9 sm:h-9 text-red-500 shrink-0 group-hover:scale-105 transition-transform" />
          <span className="font-extrabold text-white tracking-tight text-sm sm:text-xl lg:text-2xl truncate max-w-[150px] sm:max-w-none">
            Movie Budget Analysis
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 rounded-lg bg-[#191a1f] border border-[#282b34] text-xs font-medium shrink-0">
          <button
            onClick={() => onNavigate('question')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'question'
                ? 'bg-red-600 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#23262f]'
            }`}
          >
            The Question
          </button>

          <button
            onClick={() => onNavigate('models')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'models'
                ? 'bg-red-600 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#23262f]'
            }`}
          >
            Models &amp; Findings
          </button>

          {/* Consolidated Dropdown: Further Analysis */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                isFurtherAnalysisActive
                  ? 'bg-red-600 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#23262f]'
              }`}
            >
              <span>Further Analysis</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-60 rounded-xl bg-[#191a1f] border border-[#282b34] shadow-2xl py-1.5 z-50 space-y-0.5 animate-in fade-in duration-150">
                
                {/* 1. Proposed Algorithm (CatBoost-DR) */}
                <button
                  onClick={() => handleSelectPage('algorithm')}
                  className={`w-full text-left px-3.5 py-2.5 text-xs transition-colors flex items-center gap-2.5 ${
                    currentPage === 'algorithm'
                      ? 'bg-red-600/20 text-white font-bold border-l-2 border-red-500'
                      : 'text-slate-300 hover:text-white hover:bg-[#23262f]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white">Proposed Algorithm</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#270e10] text-red-400 border border-[#631f24]">CatBoost-DR</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-light">Marginal yield &amp; inflection B*</span>
                  </div>
                </button>

                {/* 2. Data Cleaning */}
                <button
                  onClick={() => handleSelectPage('cleaning')}
                  className={`w-full text-left px-3.5 py-2.5 text-xs transition-colors flex items-center gap-2.5 ${
                    currentPage === 'cleaning'
                      ? 'bg-red-600/20 text-white font-bold border-l-2 border-red-500'
                      : 'text-slate-300 hover:text-white hover:bg-[#23262f]'
                  }`}
                >
                  <Filter className="w-4 h-4 text-red-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Data Cleaning</span>
                    <span className="text-[10px] text-slate-400 block font-light">45,466 to 5,372 curated films</span>
                  </div>
                </button>

                {/* 3. Redesign Studio */}
                <button
                  onClick={() => handleSelectPage('redesigns')}
                  className={`w-full text-left px-3.5 py-2.5 text-xs transition-colors flex items-center gap-2.5 ${
                    currentPage === 'redesigns'
                      ? 'bg-red-600/20 text-white font-bold border-l-2 border-red-500'
                      : 'text-slate-300 hover:text-white hover:bg-[#23262f]'
                  }`}
                >
                  <Palette className="w-4 h-4 text-red-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Redesign Studio</span>
                    <span className="text-[10px] text-slate-400 block font-light">12 chart makeover comparisons</span>
                  </div>
                </button>

                {/* 4. SQL Analytics */}
                <button
                  onClick={() => handleSelectPage('sql')}
                  className={`w-full text-left px-3.5 py-2.5 text-xs transition-colors flex items-center gap-2.5 ${
                    currentPage === 'sql'
                      ? 'bg-red-600/20 text-white font-bold border-l-2 border-red-500'
                      : 'text-slate-300 hover:text-white hover:bg-[#23262f]'
                  }`}
                >
                  <Database className="w-4 h-4 text-red-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">SQL Analytics</span>
                    <span className="text-[10px] text-slate-400 block font-light">Interactive queries &amp; schemas</span>
                  </div>
                </button>

              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('about')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'about'
                ? 'bg-red-600 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#23262f]'
            }`}
          >
            About Me
          </button>
        </nav>

        {/* External Colab, Overleaf & Kaggle Links */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a
            href="https://colab.research.google.com/drive/1p-kZEzo7pI1qkmJsUF4ropuIlHgBRKr-?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-white font-mono transition-colors border border-[#631f24] hover:border-red-500 px-3 py-1.5 rounded-md bg-[#270e10]"
          >
            <span>Colab</span>
            <ExternalLink className="w-3.5 h-3.5 text-red-500" />
          </a>
          <a
            href="https://www.overleaf.com/project/6ae4f1a9ab7573986e4f9503/share#3169a13f81cef47ecc8193540af92c636aaa406949d8cabd"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-white font-mono transition-colors border border-[#631f24] hover:border-red-500 px-3 py-1.5 rounded-md bg-[#270e10]"
          >
            <span>Overleaf</span>
            <ExternalLink className="w-3.5 h-3.5 text-red-500" />
          </a>
          <a
            href="https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-red-400 font-mono transition-colors border border-[#282b34] hover:border-red-500 px-3 py-1.5 rounded-md bg-[#191a1f]"
          >
            <span>Dataset</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </header>
  );
};
