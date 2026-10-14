import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1c2436] bg-[#08090d] text-slate-400 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className="font-mono text-slate-500">Movie Budget Diminishing Returns Study</p>
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
    </footer>
  );
};
