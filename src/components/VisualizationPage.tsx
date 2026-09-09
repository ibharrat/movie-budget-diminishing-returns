import React from 'react';
import { BarChart3 } from 'lucide-react';

export const VisualizationPage: React.FC = () => {
  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Data Visualization
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Budget vs. Revenue diminishing returns analysis.
        </p>
      </div>

      {/* Blank Visualization Shell */}
      <div className="min-h-[450px] sm:min-h-[550px] w-full rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center p-8 text-center transition-all">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-4">
          <BarChart3 className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h2 className="text-lg sm:text-xl font-medium text-slate-300 mb-1">
          This is where graphs will go
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Ready for scatter plots, ROI curves, and budget tier distributions
        </p>
      </div>

    </div>
  );
};
