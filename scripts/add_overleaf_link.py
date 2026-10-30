from pathlib import Path

path = Path("src/components/ModelsAndFindingsPage.tsx")
text = path.read_text(encoding="utf-8")

colab_button = '''            <a
              href="https://colab.research.google.com/drive/1p-kZEzo7pI1qkmJsUF4ropuIlHgBRKr-?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Colab</span>
            </a>'''

replacement_buttons = '''            <a
              href="https://colab.research.google.com/drive/1p-kZEzo7pI1qkmJsUF4ropuIlHgBRKr-?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Colab</span>
            </a>
            <a
              href="https://www.overleaf.com/project/6ae4f1a9ab7573986e4f9503/share#3169a13f81cef47ecc8193540af92c636aaa406949d8cabd"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0c1f18] hover:bg-[#122e23] border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Overleaf Paper</span>
            </a>'''

if colab_button in text:
    text = text.replace(colab_button, replacement_buttons)
    print("Replaced colab button with Overleaf button in ModelsAndFindingsPage.tsx")
else:
    print("Warning: colab_button not found")

colab_item = '<li>Open the shared notebook directly: <a href="https://colab.research.google.com/drive/1p-kZEzo7pI1qkmJsUF4ropuIlHgBRKr-?usp=sharing" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline font-mono">Colab Live Link &rarr;</a></li>'
replacement_item = '''<li>Open the shared notebook directly: <a href="https://colab.research.google.com/drive/1p-kZEzo7pI1qkmJsUF4ropuIlHgBRKr-?usp=sharing" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline font-mono">Colab Live Link &rarr;</a></li>
                        <li>Read the IEEE research paper draft: <a href="https://www.overleaf.com/project/6ae4f1a9ab7573986e4f9503/share#3169a13f81cef47ecc8193540af92c636aaa406949d8cabd" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-mono">Overleaf Paper &rarr;</a></li>'''

if colab_item in text:
    text = text.replace(colab_item, replacement_item)
    print("Replaced colab list item with Overleaf link in ModelsAndFindingsPage.tsx")
else:
    print("Warning: colab_item not found")

path.write_text(text, encoding="utf-8")
print("Saved ModelsAndFindingsPage.tsx successfully.")
