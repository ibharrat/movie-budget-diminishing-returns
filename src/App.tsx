import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { QuestionPage } from './components/QuestionPage';
import { VisualizationPage } from './components/VisualizationPage';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'question' | 'visualization'>('question');

  return (
    <div className="min-h-screen bg-[#040507] text-slate-200 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col">
        {currentPage === 'question' ? (
          <QuestionPage onNavigateToViz={() => setCurrentPage('visualization')} />
        ) : (
          <VisualizationPage />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
