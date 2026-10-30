import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1c2436] bg-[#08090d] text-slate-400 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className="font-mono text-slate-500">Movie Budget Diminishing Returns Study</p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://colab.research.google.com/drive/1p-kZEzo7pI1qkmJsUF4ropuIlHgBRKr-?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 text-sky-400 transition-colors inline-flex items-center gap-1.5 font-mono"
          >
            <span>Colab</span>
            <ExternalLink className="w-3 h-3 text-sky-400" />
          </a>
          <span className="text-slate-600 hidden sm:inline">&bull;</span>
          <a
            href="https://www.overleaf.com/project/6ae4f1a9ab7573986e4f9503/share#3169a13f81cef47ecc8193540af92c636aaa406949d8cabd"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-300 text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-mono"
          >
            <span>Overleaf Paper</span>
            <ExternalLink className="w-3 h-3 text-emerald-400" />
          </a>
          <span className="text-slate-600 hidden sm:inline">&bull;</span>
          <a
            href="https://www.kaggle.com/datasets/sibamsamanta07/movies-dataset-45k-films-with-budget-and-revenue"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 text-slate-400 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Kaggle Dataset by sibamsamanta07</span>
            <ExternalLink className="w-3 h-3 text-sky-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};
