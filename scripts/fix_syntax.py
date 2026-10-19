with open('src/components/VisualizationPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's replace the problematic don't occurrences in output charts
fixed = content.replace("Big budgets don't reduce risk", "Big budgets do not reduce risk")
fixed = fixed.replace("and redundant CGI that don't produce extra ticket sales", "and redundant CGI that do not produce extra ticket sales")

# Check if there are other unescaped single quotes within single-quoted string literals
# Let's write back
with open('src/components/VisualizationPage.tsx', 'w', encoding='utf-8') as f:
    f.write(fixed)

print("Fixed syntax in VisualizationPage.tsx")
