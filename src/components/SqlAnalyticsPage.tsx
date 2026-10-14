import React, { useState } from 'react';
import { 
  Database, 
  Terminal, 
  Play, 
  CheckCircle2, 
  Copy, 
  Check, 
  BarChart3, 
  Table, 
  Layers, 
  Network, 
  ArrowRight, 
  Sparkles, 
  Info, 
  TrendingUp, 
  AlertTriangle, 
  Building2, 
  Film 
} from 'lucide-react';
import sqlQueriesRaw from '../data/sqlQueriesData.json';

interface SqlQuery {
  id: string;
  category: string;
  number: string;
  title: string;
  clauses: string[];
  question: string;
  explanation: string;
  sql: string;
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  isVisualizationTarget?: boolean;
  vizType?: string;
  vizLabel?: string;
}

const sqlQueries: SqlQuery[] = sqlQueriesRaw as SqlQuery[];

export const SqlAnalyticsPage: React.FC = () => {
  const [selectedQueryId, setSelectedQueryId] = useState<string>('q1');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('all');
  const [copiedQueryId, setCopiedQueryId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showErd, setShowErd] = useState<boolean>(false);
  const [activeVizTab, setActiveVizTab] = useState<'q6' | 'q7' | 'q8'>('q6');
  const [activeViewMode, setActiveViewMode] = useState<'viz' | 'table'>('viz');

  const activeQuery = sqlQueries.find(q => q.id === selectedQueryId) || sqlQueries[0];

  const handleCopy = (sqlText: string, id: string) => {
    navigator.clipboard.writeText(sqlText);
    setCopiedQueryId(id);
    setTimeout(() => setCopiedQueryId(null), 2000);
  };

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 280);
  };

  const filteredQueries = sqlQueries.filter(q => {
    if (activeFilterCategory === 'all') return true;
    if (activeFilterCategory === 'viz') return q.isVisualizationTarget;
    if (activeFilterCategory === 'basic') return ['Basic selection', 'Filtering', 'Multiple conditions'].includes(q.category);
    if (activeFilterCategory === 'agg') return ['Sorting', 'Aggregation', 'Group comparison'].includes(q.category);
    if (activeFilterCategory === 'relational') return ['HAVING', 'JOIN'].includes(q.category);
    return true;
  });

  // Data for SQL-to-Visualization 1 (Query 6: Budget Tiers)
  const q6Query = sqlQueries.find(q => q.id === 'q6');
  const q6Rows = q6Query ? q6Query.rows : [];

  // Data for SQL-to-Visualization 2 (Query 7: Genres HAVING >= 2.5x)
  const q7Query = sqlQueries.find(q => q.id === 'q7');
  const q7Rows = q7Query ? q7Query.rows : [];

  // Data for SQL-to-Visualization 3 (Query 8: Studio JOIN)
  const q8Query = sqlQueries.find(q => q.id === 'q8');
  const q8Rows = q8Query ? q8Query.rows : [];

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 space-y-12 overflow-x-hidden">
      
      {/* 1. Header & Architecture Status */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0c1626] border border-sky-500/30 text-xs font-mono text-sky-400">
            <Database className="w-3.5 h-3.5" />
            <span>RELATIONAL SQL WORKBENCH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Relational SQL Analytics &amp; Visual Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            Querying normalized relational cinema data across 8 analytical paradigms, evaluating budget scalability, genre commercial resilience, and corporate studio capital allocation.
          </p>
        </div>

        {/* Clause Coverage & Relational Architecture */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0f131c] border border-[#1c2436] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c2436] pb-3">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              SQL Query Architecture &amp; Clause Coverage
            </span>
            <button
              onClick={() => setShowErd(!showErd)}
              className="px-3 py-1 rounded-md bg-[#0c1626] hover:bg-[#141d2c] border border-sky-500/30 text-xs font-mono text-sky-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Network className="w-3.5 h-3.5 text-sky-400" />
              <span>{showErd ? 'Hide Relational ERD' : 'View Relational ERD Schema'}</span>
            </button>
          </div>

          {/* 7 SQL Clauses Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs font-mono">
            {[
              { clause: 'SELECT', desc: 'Queries 1–8' },
              { clause: 'FROM', desc: 'Queries 1–8' },
              { clause: 'WHERE', desc: 'Queries 2, 3, 4, 5' },
              { clause: 'ORDER BY', desc: 'Queries 2, 3, 4, 6, 7, 8' },
              { clause: 'GROUP BY', desc: 'Queries 6, 7, 8' },
              { clause: 'HAVING', desc: 'Query 7 (≥ 2.5x)' },
              { clause: 'JOIN', desc: 'Queries 7, 8 (3 Tables)' },
            ].map(item => (
              <div 
                key={item.clause}
                className="p-2.5 rounded-lg bg-[#0b0e15] border border-[#1c2436] flex flex-col items-center justify-center text-center gap-1"
              >
                <div className="flex items-center gap-1 text-sky-400 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-white text-xs">{item.clause}</span>
                </div>
                <span className="text-[10px] text-slate-400">{item.desc}</span>
              </div>
            ))}
          </div>

          {/* Collapsible Relational ERD Schema */}
          {showErd && (
            <div className="p-4 sm:p-5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-400" />
                  3-NF Normalized Relational Database Schema
                </span>
                <span className="text-[11px] font-mono text-slate-400">SQLite 3 Engine</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                {/* movies Table */}
                <div className="p-3 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-1.5">
                  <div className="flex items-center justify-between border-b border-[#1c2436] pb-1">
                    <span className="text-sky-400 font-bold">TABLE movies</span>
                    <span className="text-[10px] text-slate-500">50 Rows Sample</span>
                  </div>
                  <ul className="text-slate-400 space-y-1 text-[11px]">
                    <li className="text-sky-300 font-semibold">• movie_id (PK) INT</li>
                    <li>• title VARCHAR(255)</li>
                    <li>• release_year INT</li>
                    <li>• budget NUMERIC</li>
                    <li>• revenue NUMERIC</li>
                    <li>• runtime INT</li>
                    <li>• budget_tier VARCHAR(20)</li>
                    <li>• multiplier NUMERIC</li>
                    <li>• is_profitable TINYINT</li>
                  </ul>
                </div>

                {/* Junction Tables */}
                <div className="p-3 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between border-b border-[#1c2436] pb-1">
                      <span className="text-sky-400 font-bold">TABLE movie_genres</span>
                      <span className="text-[10px] text-slate-500">Junction (M:N)</span>
                    </div>
                    <ul className="text-slate-400 space-y-0.5 text-[11px]">
                      <li className="text-sky-300">• movie_id (FK → movies)</li>
                      <li className="text-sky-300">• genre_id (FK → genres)</li>
                    </ul>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-[#1c2436]">
                    <div className="flex items-center justify-between border-b border-[#1c2436] pb-1">
                      <span className="text-sky-400 font-bold">TABLE movie_studios</span>
                      <span className="text-[10px] text-slate-500">Junction (M:N)</span>
                    </div>
                    <ul className="text-slate-400 space-y-0.5 text-[11px]">
                      <li className="text-sky-300">• movie_id (FK → movies)</li>
                      <li className="text-sky-300">• studio_id (FK → studios)</li>
                    </ul>
                  </div>
                </div>

                {/* Dimension Tables */}
                <div className="p-3 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between border-b border-[#1c2436] pb-1">
                      <span className="text-sky-400 font-bold">TABLE genres</span>
                      <span className="text-[10px] text-slate-500">Dimension</span>
                    </div>
                    <ul className="text-slate-400 space-y-0.5 text-[11px]">
                      <li className="text-sky-300">• genre_id (PK) INT</li>
                      <li>• genre_name VARCHAR(50)</li>
                    </ul>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-[#1c2436]">
                    <div className="flex items-center justify-between border-b border-[#1c2436] pb-1">
                      <span className="text-sky-400 font-bold">TABLE studios</span>
                      <span className="text-[10px] text-slate-500">Dimension</span>
                    </div>
                    <ul className="text-slate-400 space-y-0.5 text-[11px]">
                      <li className="text-sky-300">• studio_id (PK) INT</li>
                      <li>• studio_name VARCHAR(100)</li>
                      <li>• studio_tier VARCHAR(50)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Interactive SQL Query Workbench */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Terminal className="w-5 h-5 text-sky-400" />
              <span>Interactive SQL Query Suite</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Select any query across the 8 analytical categories to inspect its syntax, logic, and execute against the SQLite database.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveFilterCategory('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeFilterCategory === 'all'
                  ? 'bg-sky-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All (8)
            </button>
            <button
              onClick={() => setActiveFilterCategory('basic')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeFilterCategory === 'basic'
                  ? 'bg-sky-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Basic &amp; Filtering (3)
            </button>
            <button
              onClick={() => setActiveFilterCategory('agg')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeFilterCategory === 'agg'
                  ? 'bg-sky-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Agg &amp; Groups (3)
            </button>
            <button
              onClick={() => setActiveFilterCategory('relational')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeFilterCategory === 'relational'
                  ? 'bg-sky-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              HAVING &amp; JOIN (2)
            </button>
            <button
              onClick={() => setActiveFilterCategory('viz')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                activeFilterCategory === 'viz'
                  ? 'bg-sky-500 text-slate-950 font-semibold'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Visual Targets (3)</span>
            </button>
          </div>
        </div>

        {/* 8-Query Horizontal Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {sqlQueries.map(q => {
            const isSelected = q.id === selectedQueryId;
            const matchesFilter = filteredQueries.some(fq => fq.id === q.id);
            return (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQueryId(q.id);
                  if (q.isVisualizationTarget) {
                    setActiveVizTab(q.id as 'q6' | 'q7' | 'q8');
                  }
                }}
                className={`p-3 rounded-lg text-left border transition-colors flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-[#152338] border-sky-400 text-white'
                    : matchesFilter
                    ? 'bg-[#0f131c] border-[#1c2436] hover:border-sky-500/40 text-slate-400 hover:text-white'
                    : 'opacity-40 bg-[#0b0e15] border-[#1c2436]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-[#0c1626] text-sky-300 border border-sky-500/30' : 'bg-[#121722] text-slate-400'
                  }`}>
                    Q{q.number}
                  </span>
                  {q.isVisualizationTarget && (
                    <span className="w-2 h-2 rounded-full bg-sky-400" title="Converted to Visualization" />
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-mono block text-sky-400 font-semibold truncate">
                    {q.category}
                  </span>
                  <span className="text-[10px] text-slate-400 line-clamp-1">
                    {q.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Query Display & Runner Panel */}
        <div className="rounded-xl p-5 sm:p-7 border border-[#1c2436] bg-[#0f131c] space-y-6">
          
          {/* Query Header: Metadata, Category & Question */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#1c2436]">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                  Query {activeQuery.number} &bull; {activeQuery.category}
                </span>
                {activeQuery.clauses.map(c => (
                  <span key={c} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0b0e15] text-slate-300 border border-[#1c2436]">
                    {c}
                  </span>
                ))}
                {activeQuery.isVisualizationTarget && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30 flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    Visual Target
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {activeQuery.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 italic font-light">
                "{activeQuery.question}"
              </p>
            </div>

            {/* Actions: Run Query & Copy SQL */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopy(activeQuery.sql, activeQuery.id)}
                className="px-3 py-1.5 rounded-md bg-[#0b0e15] hover:bg-[#141d2c] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                {copiedQueryId === activeQuery.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-sky-300 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-sky-400" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>

              <button
                onClick={handleRunQuery}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-md bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors flex items-center gap-1.5 text-xs font-mono disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Executing...' : 'Run Query'}</span>
              </button>
            </div>
          </div>

          {/* SQL Code Block with Syntax Accent */}
          <div className="relative rounded-lg overflow-hidden border border-[#1c2436] bg-[#07090e] p-4 font-mono text-xs sm:text-sm text-slate-200">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-[#1c2436] mb-3">
              <span>SQL Query Statement &bull; SQLite Engine</span>
              <span>{activeQuery.clauses.join(' • ')}</span>
            </div>
            <pre className="overflow-x-auto whitespace-pre leading-relaxed text-sky-200">
              {activeQuery.sql}
            </pre>
          </div>

          {/* Analytical Explanation */}
          <div className="p-3.5 rounded-lg bg-[#0c1421] border border-sky-500/30 flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-sky-400 font-mono">Analytical Insight: </span>
              <span className="font-light">{activeQuery.explanation}</span>
            </div>
          </div>

          {/* Query Execution Status Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1 pt-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Status: 200 OK
              </span>
              <span>&bull;</span>
              <span>Execution Time: ~14ms</span>
              <span>&bull;</span>
              <span>Rows Returned: <strong className="text-white">{activeQuery.rowCount}</strong></span>
            </div>

            {activeQuery.isVisualizationTarget && (
              <button
                onClick={() => {
                  const targetId = activeQuery.id as 'q6' | 'q7' | 'q8';
                  setActiveVizTab(targetId);
                  const vizElem = document.getElementById('sql-viz-section');
                  if (vizElem) vizElem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hidden sm:inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold text-xs"
              >
                <span>Jump to Visual Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Result Data Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-sky-400" />
                Query Result Table
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                {activeQuery.rowCount} records returned
              </span>
            </div>

            <div className="rounded-lg border border-[#1c2436] bg-[#07090e] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono divide-y divide-[#1c2436] min-w-[600px]">
                <thead className="bg-[#0b0e15] text-slate-300">
                  <tr>
                    {activeQuery.columns.map(col => (
                      <th key={col} className="px-3.5 py-2.5 font-bold uppercase tracking-wider text-[11px] text-sky-400">
                        {col.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c2436] text-slate-300">
                  {activeQuery.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#101622] transition-colors">
                      {activeQuery.columns.map(col => {
                        const val = row[col];
                        let renderedVal: React.ReactNode = val;
                        
                        // Smart cell formatting
                        if (typeof val === 'number') {
                          if (col.includes('pct') || col.includes('rate')) {
                            renderedVal = (
                              <span className="px-2 py-0.5 rounded font-bold bg-[#0c1626] text-sky-300 border border-sky-500/30">
                                {val.toFixed(1)}%
                              </span>
                            );
                          } else if (col.includes('budget') || col.includes('revenue') || col.includes('cash') || col.includes('invested') || col.includes('gross')) {
                            if (col.includes('mil') || col.includes('millions')) {
                              renderedVal = `$${val.toLocaleString()}M`;
                            } else {
                              renderedVal = `$${val.toLocaleString()}`;
                            }
                          } else if (col.includes('multiplier')) {
                            renderedVal = (
                              <span className={`font-bold ${val >= 2.5 ? 'text-sky-300' : 'text-slate-400'}`}>
                                {val.toFixed(2)}x
                              </span>
                            );
                          } else {
                            renderedVal = val.toLocaleString();
                          }
                        } else if (val === 'Profitable') {
                          renderedVal = (
                            <span className="px-2 py-0.5 rounded bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold">
                              Profitable (&ge; 2.5x)
                            </span>
                          );
                        }

                        return (
                          <td key={col} className="px-3.5 py-2.5 whitespace-nowrap text-slate-200">
                            {renderedVal}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* 3. SQL → Visual Analytics Showcase */}
      <div id="sql-viz-section" className="space-y-6 pt-4 border-t border-[#1c2436]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0c1626] border border-sky-500/30 text-xs font-mono text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DATA VISUALIZATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            SQL &rarr; Visual Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
            Converting complex relational query outputs directly into visual analytical charts to reveal profitability curves, genre efficiency benchmarks, and studio capital returns.
          </p>
        </div>

        {/* Visual Showcase Sub-tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5 rounded-lg bg-[#0b0e15] border border-[#1c2436]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveVizTab('q6')}
              className={`px-3.5 py-2 rounded-md text-xs font-mono transition-colors flex items-center justify-center gap-2 border ${
                activeVizTab === 'q6'
                  ? 'bg-[#152338] border-sky-400 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <span>Viz 1: Budget Tiers (Q06)</span>
            </button>
            <button
              onClick={() => setActiveVizTab('q7')}
              className={`px-3.5 py-2 rounded-md text-xs font-mono transition-colors flex items-center justify-center gap-2 border ${
                activeVizTab === 'q7'
                  ? 'bg-[#152338] border-sky-400 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <span>Viz 2: Genre HAVING (Q07)</span>
            </button>
            <button
              onClick={() => setActiveVizTab('q8')}
              className={`px-3.5 py-2 rounded-md text-xs font-mono transition-colors flex items-center justify-center gap-2 border ${
                activeVizTab === 'q8'
                  ? 'bg-[#152338] border-sky-400 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <span>Viz 3: Studio JOIN (Q08)</span>
            </button>
          </div>

          <div className="inline-flex p-1 rounded-md bg-[#07090e] border border-[#1c2436] text-xs font-mono self-start sm:self-auto">
            <button
              onClick={() => setActiveViewMode('viz')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeViewMode === 'viz' ? 'bg-sky-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Chart View</span>
            </button>
            <button
              onClick={() => setActiveViewMode('table')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeViewMode === 'table' ? 'bg-sky-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>SQL Table View</span>
            </button>
          </div>
        </div>

        {/* Dynamic Visualization Container */}
        {activeVizTab === 'q6' && (
          <div className="rounded-xl p-6 sm:p-8 border border-[#1c2436] bg-[#0f131c] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c2436]">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                  SQL &rarr; Visual Analytics &bull; Query 06 (Group Comparison)
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  Capital Efficiency &amp; Theatrical Breakeven Rate by Budget Tier
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Generated directly from: <code className="text-sky-300 font-mono">GROUP BY budget_tier</code>
                </p>
              </div>
              <span className="text-xs font-mono text-sky-300 bg-[#0c1626] px-3 py-1 rounded-md border border-sky-500/30">
                Breakeven Benchmark: 2.5x Multiplier
              </span>
            </div>

            {/* Top 3 KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
                <span className="text-[11px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Optimal Efficiency Zone
                </span>
                <div className="text-lg font-bold text-white">&lt; $5M to $25M</div>
                <p className="text-xs text-slate-300 font-light">
                  90% to 100% of films clear breakeven, yielding average multiples up to 14.7x.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
                <span className="text-[11px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Inflection Threshold
                </span>
                <div className="text-lg font-bold text-white">$25M to $65M</div>
                <p className="text-xs text-slate-300 font-light">
                  Median profit margins squeeze below 2.5x as theatrical marketing costs escalate.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
                <span className="text-[11px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Diminishing Return Trap
                </span>
                <div className="text-lg font-bold text-white">$140M+ Mega-Budgets</div>
                <p className="text-xs text-slate-300 font-light">
                  Success rate drops to only 38.9%, heavily amplifying catastrophic downside exposure.
                </p>
              </div>
            </div>

            {activeViewMode === 'viz' ? (
              <div className="space-y-6">
                {/* Visual Column / Vertical Bar Canvas */}
                <div className="p-6 rounded-lg bg-[#07090e] border border-[#1c2436] space-y-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-[#1c2436] pb-2">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                      % of Films Clearing Theatrical Breakeven (2.5x Multiplier)
                    </span>
                    <span className="hidden sm:inline text-sky-300">
                      Dashed Line = 50% Majority Threshold
                    </span>
                  </div>

                  {/* 5-Column Visual Bar Layout with 50% Benchmark Line */}
                  <div className="relative pt-8 pb-4">
                    {/* 50% Horizontal Reference Line */}
                    <div 
                      className="absolute left-0 right-0 border-b-2 border-dashed border-sky-500/40 z-10 flex items-center justify-end pr-2 pointer-events-none"
                      style={{ bottom: '48%' }}
                    >
                      <span className="text-[10px] font-mono text-sky-300 bg-[#07090e] px-1.5 py-0.5 rounded border border-sky-500/30 -translate-y-2">
                        50% Breakeven Line
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 sm:gap-6 items-end h-64 sm:h-72">
                      {q6Rows.map(tier => {
                        const pct = tier.pct_profitable;
                        const isOptimal = tier.budget_tier === '< $5M' || tier.budget_tier === '$5M-$25M';

                        return (
                          <div key={tier.budget_tier} className="flex flex-col items-center h-full justify-end group">
                            {/* Multiplier Tooltip badge */}
                            <div className="mb-2 text-center">
                              <span className={`text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                                isOptimal 
                                  ? 'bg-[#0c1626] text-sky-300 border border-sky-500/40' 
                                  : 'bg-[#121824] text-slate-300 border border-[#1c2436]'
                              }`}>
                                {tier.avg_multiplier > 100 ? `${tier.avg_multiplier.toFixed(0)}x` : `${tier.avg_multiplier.toFixed(1)}x`}
                              </span>
                            </div>

                            {/* Vertical Bar - Flat Matte */}
                            <div className="w-full max-w-[70px] bg-[#0b0e15] rounded-t-lg overflow-hidden relative flex flex-col justify-end p-1 transition-colors group-hover:border-sky-400 border border-[#1c2436]"
                              style={{ height: `${pct}%` }}
                            >
                              <div 
                                className={`w-full h-full rounded-t-md transition-colors flex flex-col items-center justify-between py-2 ${
                                  isOptimal ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-[#18263d] text-sky-300 font-semibold'
                                }`}
                              >
                                <span className="font-mono text-xs sm:text-sm">
                                  {pct}%
                                </span>
                                <span className="text-[9px] font-mono opacity-80 uppercase tracking-tighter hidden sm:inline">
                                  {tier.movie_count} films
                                </span>
                              </div>
                            </div>

                            {/* X-Axis Labels */}
                            <div className="mt-3 text-center space-y-0.5">
                              <span className="font-bold text-white text-xs sm:text-sm font-mono block">
                                {tier.budget_tier}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono block">
                                Avg ${tier.avg_budget_mil}M
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Analytical Interpretation Callout */}
                <div className="p-4 rounded-lg bg-[#0c1421] border border-sky-500/30 text-xs sm:text-sm text-slate-300 space-y-1.5 leading-relaxed font-light">
                  <span className="font-bold text-sky-400 font-mono block">Key Analytical Deduction:</span>
                  <p>
                    The SQL aggregation confirms the diminishing returns law: movies produced for <strong className="text-white">&lt; $5M</strong> and <strong className="text-white">$5M–$25M</strong> surpass the 2.5x theatrical breakeven threshold at <strong>100%</strong> and <strong>90%</strong> rates. In stark contrast, mega-budget releases (<strong className="text-white">$140M+</strong>) collapse to a <strong>38.9% success rate</strong>, despite averaging $766M in gross box office revenue.
                  </p>
                </div>
              </div>
            ) : (
              /* Raw SQL Table View */
              <div className="rounded-lg border border-[#1c2436] bg-[#07090e] overflow-x-auto">
                <table className="w-full text-left text-xs font-mono divide-y divide-[#1c2436]">
                  <thead className="bg-[#0b0e15] text-sky-400">
                    <tr>
                      <th className="px-4 py-3">Budget Tier</th>
                      <th className="px-4 py-3">Sample Count</th>
                      <th className="px-4 py-3">Avg Budget ($M)</th>
                      <th className="px-4 py-3">Avg Revenue ($M)</th>
                      <th className="px-4 py-3">Avg Multiplier</th>
                      <th className="px-4 py-3">% Profitable (&ge; 2.5x)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c2436] text-slate-300">
                    {q6Rows.map(r => (
                      <tr key={r.budget_tier} className="hover:bg-[#101622] transition-colors">
                        <td className="px-4 py-2.5 font-bold text-white">{r.budget_tier}</td>
                        <td className="px-4 py-2.5">{r.movie_count}</td>
                        <td className="px-4 py-2.5">${r.avg_budget_mil}M</td>
                        <td className="px-4 py-2.5">${r.avg_revenue_mil}M</td>
                        <td className="px-4 py-2.5 text-sky-300 font-bold">{r.avg_multiplier}x</td>
                        <td className="px-4 py-2.5 text-sky-400 font-bold">{r.pct_profitable}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeVizTab === 'q7' && (
          <div className="rounded-xl p-6 sm:p-8 border border-[#1c2436] bg-[#0f131c] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c2436]">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                  SQL &rarr; Visual Analytics &bull; Query 07 (HAVING Clause)
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  Qualifying High-Yield Genre Profitability Benchmark
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Post-aggregation filter: <code className="text-sky-300 font-mono">HAVING COUNT(*) &ge; 4 AND AVG(multiplier) &ge; 2.5</code>
                </p>
              </div>
              <span className="text-xs font-mono text-sky-300 bg-[#0c1626] px-3 py-1 rounded-md border border-sky-500/30">
                10 Qualifying Genres
              </span>
            </div>

            {/* Quick KPI comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
                <span className="text-[11px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" />
                  Most Resilient: Horror &amp; Thriller
                </span>
                <div className="text-lg font-bold text-white">86.7% to 100% Breakeven Rate</div>
                <p className="text-xs text-slate-300 font-light">
                  Low production costs (averaging $4.7M to $55M) shield genre films from box office failure.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-1">
                <span className="text-[11px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Highest Risk: Action &amp; Adventure
                </span>
                <div className="text-lg font-bold text-white">46.7% to 50.0% Breakeven Rate</div>
                <p className="text-xs text-slate-300 font-light">
                  Severe VFX budget inflation ($166M+ average budget) forces more than half of releases into the red.
                </p>
              </div>
            </div>

            {activeViewMode === 'viz' ? (
              <div className="space-y-6">
                {/* Ranked Horizontal Bar Chart */}
                <div className="p-5 sm:p-6 rounded-lg bg-[#07090e] border border-[#1c2436] space-y-4">
                  {/* Axis Header */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-[#1c2436] pb-2">
                    <span>Rank &amp; Genre</span>
                    <div className="hidden sm:flex items-center gap-8 pr-16 text-slate-500">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                    <span>Commercial Multiplier</span>
                  </div>

                  {/* Ranked Genre Rows */}
                  <div className="space-y-3">
                    {q7Rows.map((g, idx) => {
                      const breakevenPct = g.breakeven_rate_pct;
                      const isTopTier = breakevenPct >= 80;

                      return (
                        <div key={g.genre_name} className="space-y-1.5 group">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-2 w-32 sm:w-44 shrink-0">
                              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                idx < 3 ? 'bg-sky-500 text-slate-950' : 'bg-[#121824] text-slate-400'
                              }`}>
                                #{idx + 1}
                              </span>
                              <span className="font-bold text-white text-sm truncate">{g.genre_name}</span>
                              <span className="text-[10px] text-slate-400 hidden sm:inline">({g.total_releases})</span>
                            </div>

                            {/* Visual Bar - Flat Matte */}
                            <div className="flex-1 mx-3 sm:mx-6 h-4 bg-[#0b0e15] rounded-full overflow-hidden relative border border-[#1c2436]">
                              <div 
                                className={`h-full rounded-full transition-all flex items-center justify-end pr-2 ${
                                  isTopTier ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-[#18263d] text-sky-300'
                                }`}
                                style={{ width: `${breakevenPct}%` }}
                              >
                                <span className="text-[10px] font-mono font-bold">
                                  {breakevenPct}%
                                </span>
                              </div>
                            </div>

                            {/* Multiplier Tag */}
                            <div className="w-24 text-right shrink-0">
                              <span className="text-xs font-mono font-bold text-sky-300">
                                {g.avg_multiplier > 100 ? `${g.avg_multiplier.toFixed(0)}x` : `${g.avg_multiplier.toFixed(1)}x`}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#0c1421] border border-sky-500/30 text-xs sm:text-sm text-slate-300 space-y-1.5 leading-relaxed font-light">
                  <span className="font-bold text-sky-400 font-mono block">Key Analytical Deduction:</span>
                  <p>
                    The <code className="text-sky-300 font-mono">HAVING</code> clause isolates genres that simultaneously satisfy sample reliability and profitability. <strong className="text-white">Horror</strong> and <strong className="text-white">Thriller</strong> boast the highest commercial resilience (100% and 86.7% breakeven rates), whereas heavy-CGI genres like <strong className="text-white">Action</strong> and <strong className="text-white">Adventure</strong> hover at ~46%–50% due to budget inflation exceeding $160M+ averages.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-[#1c2436] bg-[#07090e] overflow-x-auto">
                <table className="w-full text-left text-xs font-mono divide-y divide-[#1c2436]">
                  <thead className="bg-[#0b0e15] text-sky-400">
                    <tr>
                      <th className="px-4 py-3">Genre Name</th>
                      <th className="px-4 py-3">Release Count</th>
                      <th className="px-4 py-3">Avg Budget ($M)</th>
                      <th className="px-4 py-3">Avg Revenue ($M)</th>
                      <th className="px-4 py-3">Avg Multiplier</th>
                      <th className="px-4 py-3">Breakeven Rate (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c2436] text-slate-300">
                    {q7Rows.map(r => (
                      <tr key={r.genre_name} className="hover:bg-[#101622] transition-colors">
                        <td className="px-4 py-2.5 font-bold text-white">{r.genre_name}</td>
                        <td className="px-4 py-2.5">{r.total_releases}</td>
                        <td className="px-4 py-2.5">${r.avg_budget_mil}M</td>
                        <td className="px-4 py-2.5">${r.avg_revenue_mil}M</td>
                        <td className="px-4 py-2.5 text-sky-300 font-bold">{r.avg_multiplier}x</td>
                        <td className="px-4 py-2.5 text-sky-400 font-bold">{r.breakeven_rate_pct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeVizTab === 'q8' && (
          <div className="rounded-xl p-6 sm:p-8 border border-[#1c2436] bg-[#0f131c] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c2436]">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                  SQL &rarr; Visual Analytics &bull; Query 08 (Relational JOIN)
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  Major Conglomerates vs. Independent Studios Portfolio Matrix
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Joined across 3 tables: <code className="text-sky-300 font-mono">studios JOIN movie_studios JOIN movies</code>
                </p>
              </div>
              <span className="text-xs font-mono text-sky-300 bg-[#0c1626] px-3 py-1 rounded-md border border-sky-500/30">
                10 Production Studios
              </span>
            </div>

            {/* Split Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Independent / Boutique Model */}
              <div className="p-5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-3">
                <div className="flex items-center justify-between border-b border-[#1c2436] pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <span className="text-sm font-bold text-white font-mono">Boutique &amp; Mini-Major Studios</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-400">100% Breakeven Rate</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  {q8Rows.filter(s => s.studio_tier !== 'Major Conglomerate').map(studio => (
                    <div key={studio.studio_name} className="p-2.5 rounded-md bg-[#0f131c] border border-[#1c2436] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{studio.studio_name}</span>
                        <span className="text-sky-400 font-bold">{studio.profitable_success_rate}% Success</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Capital: ${studio.total_invested_mil}M</span>
                        <span>Gross: ${studio.total_gross_mil}M</span>
                        <span className="text-sky-300 font-semibold">{studio.avg_multiplier.toFixed(1)}x Multiplier</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Conglomerate Model */}
              <div className="p-5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-3">
                <div className="flex items-center justify-between border-b border-[#1c2436] pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <span className="text-sm font-bold text-white font-mono">Major Conglomerate Studios</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">36% to 80% Breakeven Rate</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  {q8Rows.filter(s => s.studio_tier === 'Major Conglomerate').map(studio => (
                    <div key={studio.studio_name} className="p-2.5 rounded-md bg-[#0f131c] border border-[#1c2436] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{studio.studio_name}</span>
                        <span className={`font-bold ${
                          studio.profitable_success_rate >= 70 ? 'text-sky-400' : 'text-slate-400'
                        }`}>
                          {studio.profitable_success_rate}% Success
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Capital: ${studio.total_invested_mil}M</span>
                        <span>Gross: ${studio.total_gross_mil}M</span>
                        <span className="text-sky-300 font-semibold">{studio.avg_multiplier.toFixed(1)}x Multiplier</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#0c1421] border border-sky-500/30 text-xs sm:text-sm text-slate-300 space-y-1.5 leading-relaxed font-light">
              <span className="font-bold text-sky-400 font-mono block">Key Analytical Deduction:</span>
              <p>
                The relational multi-table JOIN reveals an inverse relationship between corporate scale and portfolio hit rate: Boutique/indie distributors (<strong className="text-white">Blumhouse, Lionsgate, A24</strong>) maintain near <strong>100% breakeven rates</strong> by limiting exposure per film, while major conglomerates (<strong className="text-white">Disney, Warner Bros</strong>) sink billions into mega-productions where only <strong>36%–40%</strong> clear theatrical breakeven.
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default SqlAnalyticsPage;
