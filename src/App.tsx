import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { QuestionPage } from './components/QuestionPage';
import { DataCleaningPage } from './components/DataCleaningPage';
import { AnalysisPage } from './components/AnalysisPage';
import { SqlAnalyticsPage } from './components/SqlAnalyticsPage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'question' | 'cleaning' | 'analysis' | 'sql' | 'about'>('question');

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-200 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-200 overflow-x-hidden w-full max-w-full">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col">
        {currentPage === 'question' && (
          <QuestionPage onNavigateToViz={() => setCurrentPage('cleaning')} />
        )}
        {currentPage === 'cleaning' && (
          <DataCleaningPage 
            onNavigateToViz={() => setCurrentPage('analysis')} 
            onNavigateToSql={() => setCurrentPage('sql')}
          />
        )}
        {currentPage === 'analysis' && (
          <AnalysisPage 
            onNavigateToSql={() => setCurrentPage('sql')}
            onNavigateToCleaning={() => setCurrentPage('cleaning')}
          />
        )}
        {currentPage === 'sql' && (
          <SqlAnalyticsPage />
        )}
        {currentPage === 'about' && (
          <AboutPage 
            onNavigateToQuestion={() => setCurrentPage('question')}
            onNavigateToViz={() => setCurrentPage('analysis')}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
