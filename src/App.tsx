import React, { useState } from 'react';
import { Navbar, PageKey } from './components/Navbar';
import { QuestionPage } from './components/QuestionPage';
import { ProposedAlgorithmPage } from './components/ProposedAlgorithmPage';
import { DataCleaningPage } from './components/DataCleaningPage';
import { ModelsAndFindingsPage } from './components/ModelsAndFindingsPage';
import { RedesignStudioPage } from './components/RedesignStudioPage';
import { SqlAnalyticsPage } from './components/SqlAnalyticsPage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageKey>('question');

  return (
    <div className="min-h-screen bg-[#121316] text-slate-200 flex flex-col font-sans selection:bg-red-600 selection:text-white overflow-x-hidden w-full max-w-full">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col">
        {currentPage === 'question' && (
          <QuestionPage onNavigateToViz={() => setCurrentPage('models')} />
        )}
        {currentPage === 'models' && (
          <ModelsAndFindingsPage 
            onNavigateToRedesigns={() => setCurrentPage('redesigns')}
            onNavigateToSql={() => setCurrentPage('sql')}
            onNavigateToCleaning={() => setCurrentPage('cleaning')}
          />
        )}
        {currentPage === 'algorithm' && (
          <ProposedAlgorithmPage 
            onNavigateToModels={() => setCurrentPage('models')}
            onNavigateToCleaning={() => setCurrentPage('cleaning')}
            onNavigateToSql={() => setCurrentPage('sql')}
          />
        )}
        {currentPage === 'cleaning' && (
          <DataCleaningPage 
            onNavigateToViz={() => setCurrentPage('models')} 
            onNavigateToSql={() => setCurrentPage('sql')}
          />
        )}
        {currentPage === 'redesigns' && (
          <RedesignStudioPage 
            onNavigateToModels={() => setCurrentPage('models')}
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
            onNavigateToViz={() => setCurrentPage('models')}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
