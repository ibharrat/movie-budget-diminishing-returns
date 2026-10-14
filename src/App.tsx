import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { QuestionPage } from './components/QuestionPage';
import { DataCleaningPage } from './components/DataCleaningPage';
import { VisualizationPage } from './components/VisualizationPage';
import { SqlAnalyticsPage } from './components/SqlAnalyticsPage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'question' | 'cleaning' | 'visualization' | 'sql' | 'about'>('question');

  return (
    <div className="min-h-screen bg-[#040507] text-slate-200 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-300 overflow-x-hidden w-full max-w-full">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col">
        {currentPage === 'question' && (
          <QuestionPage onNavigateToViz={() => setCurrentPage('cleaning')} />
        )}
        {currentPage === 'cleaning' && (
          <DataCleaningPage 
            onNavigateToViz={() => setCurrentPage('visualization')} 
            onNavigateToSql={() => setCurrentPage('sql')}
          />
        )}
        {currentPage === 'visualization' && (
          <VisualizationPage 
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
            onNavigateToViz={() => setCurrentPage('visualization')}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
