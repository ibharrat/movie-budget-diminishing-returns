import re
from pathlib import Path

path = Path("src/components/ModelsAndFindingsPage.tsx")
content = path.read_text(encoding="utf-8")

# 1. Add import for InteractiveVisualizationsSection
import_statement = "import { InteractiveVisualizationsSection } from './InteractiveVisualizationsSection';\n"
if "InteractiveVisualizationsSection" not in content:
    content = import_statement + content

# 2. Update activeSubView state type and default
content = content.replace(
    "const [activeSubView, setActiveSubView] = useState<'explorer' | 'matrix' | 'analysis'>('explorer');",
    "const [activeSubView, setActiveSubView] = useState<'interactive' | 'explorer' | 'matrix' | 'analysis'>('interactive');"
)

# 3. Update the view switcher tabs at top
old_tabs = """        {/* 3 Main View Switcher Tabs */}
        <div className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-xl bg-[#0b0e15] border border-[#1c2436]">
            <button
              onClick={() => setActiveSubView('explorer')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeSubView === 'explorer'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>1. Model Explorer &amp; Visualizations</span>
            </button>
            <button
              onClick={() => setActiveSubView('matrix')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeSubView === 'matrix'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>2. 20-Model Benchmark Table</span>
            </button>
            <button
              onClick={() => setActiveSubView('analysis')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeSubView === 'analysis'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>3. Best Models Analysis &amp; Why</span>
            </button>
          </div>
        </div>"""

new_tabs = """        {/* 4 Main View Switcher Tabs */}
        <div className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 rounded-xl bg-[#0b0e15] border border-[#1c2436]">
            <button
              onClick={() => setActiveSubView('interactive')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeSubView === 'interactive'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>1. Interactive Visualizations (3)</span>
            </button>
            <button
              onClick={() => setActiveSubView('explorer')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeSubView === 'explorer'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>2. Model Explorer (20 Static)</span>
            </button>
            <button
              onClick={() => setActiveSubView('matrix')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeSubView === 'matrix'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>3. 20-Model Benchmark Table</span>
            </button>
            <button
              onClick={() => setActiveSubView('analysis')}
              className={`py-3 px-4 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                activeSubView === 'analysis'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121824]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>4. Best Models Analysis &amp; Why</span>
            </button>
          </div>
        </div>"""

if old_tabs in content:
    content = content.replace(old_tabs, new_tabs)
    print("Replaced view switcher tabs successfully.")
else:
    print("Warning: old_tabs not found exactly, check manually.")

# 4. Add the activeSubView === 'interactive' block before activeSubView === 'explorer'
explorer_target = """      {/* ===================================================================== */}
      {/* VIEW 1: MODEL EXPLORER & TIED VISUALIZATIONS                          */}
      {/* ===================================================================== */}"""

interactive_block = """      {/* ===================================================================== */}
      {/* VIEW 1: INTERACTIVE VISUALIZATIONS SECTION (3 DEDICATED MODELS)       */}
      {/* ===================================================================== */}
      {activeSubView === 'interactive' && (
        <InteractiveVisualizationsSection />
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: MODEL EXPLORER & TIED VISUALIZATIONS (20 STATIC MODELS)       */}
      {/* ===================================================================== */}"""

if explorer_target in content:
    content = content.replace(explorer_target, interactive_block)
    print("Inserted InteractiveVisualizationsSection render block successfully.")
else:
    print("Warning: explorer_target not found, check manually.")

path.write_text(content, encoding="utf-8")
print(f"Updated {path} successfully.")
