import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { QuestionPage } from './components/QuestionPage';
import { VisualizationPage } from './components/VisualizationPage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'question' | 'visualization' | 'about'>('question');

  return (
    <div className="min-h-screen bg-[#040507] text-slate-200 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-300">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col">
        {currentPage === 'question' && (
          <QuestionPage onNavigateToViz={() => setCurrentPage('visualization')} />
        )}
        {currentPage === 'visualization' && (
          <VisualizationPage />
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
