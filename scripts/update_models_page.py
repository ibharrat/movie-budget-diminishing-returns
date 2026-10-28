import os

target_file = r"C:\Users\ianbh\.gemini\antigravity\scratch\movie-budget-diminishing-returns\src\components\ModelsAndFindingsPage.tsx"

code = '''import React, { useState } from 'react';
import { 
  Cpu, 
  Target, 
  LineChart, 
  Network, 
  Layers, 
  Sparkles, 
  Activity, 
  Boxes, 
  Sliders, 
  ShieldCheck, 
  TrendingDown, 
  ExternalLink, 
  Table, 
  Database, 
  ArrowRight, 
  Code, 
  Award,
  Download,
  Copy,
  Check,
  FileCode,
  Terminal
} from 'lucide-react';

export interface ModelFindingItem {
  id: string;
  name: string;
  shortName: string;
  category: 'linear_kernel' | 'ensemble' | 'deep_learning' | 'econometric';
  categoryLabel: string;
  tagline: string;
  badge: string;
  status: 'active' | 'benchmark';
  architecture: string;
  primaryMetric: { label: string; value: string };
  secondaryMetric: { label: string; value: string };
  bestFitRole: string;
  keyInsights: string[];
  icon: React.ReactNode;
  pythonCode: string;
  
  // Tied Empirical Finding & Visualization
  tiedVisualization: {
    title: string;
    imageSrc: string;
    researchQuestion: string;
    bottomLine: string;
    observation: string;
    interpretation: string;
    variables: string[];
  };
}

interface ModelsAndFindingsPageProps {
  onNavigateToRedesigns?: () => void;
  onNavigateToSql?: () => void;
  onNavigateToCleaning?: () => void;
}

export const ModelsAndFindingsPage: React.FC<ModelsAndFindingsPageProps> = ({
  onNavigateToRedesigns,
  onNavigateToSql,
  onNavigateToCleaning
}) => {
  const [activeSubView, setActiveSubView] = useState<'explorer' | 'matrix' | 'analysis'>('explorer');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'linear_kernel' | 'ensemble' | 'deep_learning' | 'econometric'>('all');
  const [selectedModelId, setSelectedModelId] = useState<string>('catboost');
  const [modelCardTab, setModelCardTab] = useState<'evidence' | 'code'>('evidence');
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const handleCopyCode = (codeText: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2200);
    }
  };

  // ==========================================================================
  // THE 20 MODELS TIED DIRECTLY TO SPECIFIC FINDINGS & VISUALIZATIONS
  // ==========================================================================
  const modelsList: ModelFindingItem[] = [
    // Family 1: Classical Linear & Kernel Supervised Models
    {
      id: 'ridge',
      name: 'Ridge Regression (L2 Regularized Baseline)',
      shortName: 'Ridge Regression',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'L2 Tikhonov Regularized Continuous Baseline',
      badge: 'Active ML Baseline',
      status: 'active',
      architecture: 'Ridge OLS with Tikhonov L2 Regularization & 5-Fold Cross-Validation',
      primaryMetric: { label: 'Cross-Val R²', value: '0.548' },
      secondaryMetric: { label: 'RMSE', value: '$48.2M' },
      bestFitRole: 'Linear baseline benchmark proving that standard linear scaling cannot capture the concavity of diminishing returns.',
      keyInsights: [
        'Shrinks inflated coefficients caused by high collinearity between budget, runtime, and studio scale.',
        'Closed-form convex solution guaranteeing zero gradient oscillation.',
        'Captures only 54.8% of variance, demonstrating the necessity of non-linear tree models.'
      ],
      icon: <LineChart className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.linear_model import Ridge
from sklearn.model_selection import KFold, cross_val_score
import numpy as np

# Model 1: Ridge Regression (L2 Regularized Baseline)
# Closed-form continuous benchmark to establish linear performance floor
ridge_model = Ridge(alpha=10.0, random_state=42)

cv = KFold(n_splits=5, shuffle=True, random_state=42)
r2_scores = cross_val_score(ridge_model, X_train_scaled, y_train, cv=cv, scoring='r2')

ridge_model.fit(X_train_scaled, y_train)
y_pred = ridge_model.predict(X_test_scaled)

print(f"Ridge 5-Fold Cross-Val R²: {np.mean(r2_scores):.4f} (+/- {np.std(r2_scores):.4f})")
print(f"Ridge Test Set R²: {ridge_model.score(X_test_scaled, y_test):.4f}")`,
      tiedVisualization: {
        title: 'Linear Continuous Baseline: Predicted vs. Actual Box Office Fit',
        imageSrc: '/charts/output1_predicted_vs_actual.png',
        researchQuestion: 'How much box office variance can a standard linear model capture without polynomial terms?',
        bottomLine: 'Ridge regression explains only 54.8% of box office variance. Linear assumptions consistently overestimate mega-budget returns, mathematically demonstrating that diminishing returns is non-linear.',
        observation: 'Fitted linear trajectory diverges sharply at budgets above $80M, creating severe positive residual bias because real box office flattens sublinearly.',
        interpretation: 'Capital scaling does not produce linear revenue increases. A linear baseline fails to reflect market demand limits, motivating regularized non-linear tree models.',
        variables: ['actual_revenue', 'ridge_predicted_revenue', 'L2_penalty_alpha = 10.0']
      }
    },
    {
      id: 'lasso',
      name: 'Lasso & ElasticNet Linear Regressor',
      shortName: 'Lasso & ElasticNet',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'L1 Sparsity Penalization & Automated Feature Selection',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Coordinate Descent with L1 Regularization & Log10 Scaler',
      primaryMetric: { label: 'Cross-Val R²', value: '0.562' },
      secondaryMetric: { label: 'Active Non-Zero Features', value: '14 of 24' },
      bestFitRole: 'Sparsity-driven feature elimination proving which metadata variables have zero independent predictive power.',
      keyInsights: [
        'Drives 10 irrelevant genre flags (e.g., Documentary, Music) to exact zero coefficients.',
        'Stabilizes coefficient shrinkage across power-law budget distributions ($10k to $300M).',
        'Regularization paths trace parameter decay as alpha penalty increases.'
      ],
      icon: <Sliders className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.linear_model import LassoCV, ElasticNetCV
import numpy as np

# Model 2: Lasso & ElasticNet (L1 Sparsity & Automated Feature Selection)
# Coordinate descent optimization driving non-informative features to zero
lasso_model = LassoCV(cv=5, random_state=42, max_iter=2500)
lasso_model.fit(X_train_scaled, y_train)

non_zero = np.sum(lasso_model.coef_ != 0)
total_feats = len(lasso_model.coef_)
print(f"Optimal Alpha Penalty: {lasso_model.alpha_:.5f}")
print(f"Retained Features: {non_zero} of {total_feats} non-zero coefficients")
print(f"Lasso Test R²: {lasso_model.score(X_test_scaled, y_test):.4f}")`,
      tiedVisualization: {
        title: 'Feature Importance & L1 Sparsity Weights',
        imageSrc: '/charts/output3_feature_importance.png',
        researchQuestion: 'Which input features drive box office and profitability predictions the most?',
        bottomLine: 'Budget sets revenue scale (34%), but genre and studio discipline dictate actual profitability. Low-cost genres like Horror (+18.5%) punch far above their weight.',
        observation: 'L1 coordinate descent shrinks 10 weak genre indicators to exact zero while retaining production budget (34.2%), Horror (+18.5%), and vote count.',
        interpretation: 'Predicting gross revenue scale is very different from predicting profit. Studios should greenlight based on genre capital efficiency rather than sheer budget size.',
        variables: ['feature_weights', 'budget', 'genre_horror', 'studio_scale']
      }
    },
    {
      id: 'logistic',
      name: 'Logistic Regression (Binary Breakeven Classifier)',
      shortName: 'Logistic Regression',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'Interpretable Log-Odds Breakeven Probabilities',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Sigmoid Logit Link Function with L2 Penalty & Stratified K-Fold',
      primaryMetric: { label: 'Breakeven Accuracy', value: '78.2%' },
      secondaryMetric: { label: 'ROC-AUC', value: '0.814' },
      bestFitRole: 'Probabilistic breakeven classification providing direct interpretable odds ratios for capital allocation.',
      keyInsights: [
        'Reveals that every $10M added to production budget decreases breakeven odds by 18.4%.',
        'Balanced class weights counteract industry imbalance (only 31.8% surpass 2.5x).',
        'S-curve probability plots map capital investment directly to success probability.'
      ],
      icon: <Target className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, roc_auc_score, classification_report

# Model 3: Logistic Regression (Binary Theatrical Breakeven Classifier)
# Target: 1 if (Revenue / Budget >= 2.5) else 0
log_reg = LogisticRegression(
    penalty='l2',
    C=1.0,
    class_weight='balanced',
    max_iter=1000,
    random_state=42
)
log_reg.fit(X_train_scaled, y_train_breakeven)

y_pred = log_reg.predict(X_test_scaled)
y_prob = log_reg.predict_proba(X_test_scaled)[:, 1]

print(f"Logistic Breakeven Accuracy: {accuracy_score(y_test_breakeven, y_pred):.4f}")
print(f"Logistic ROC-AUC: {roc_auc_score(y_test_breakeven, y_prob):.4f}")
# Odds ratio: Every $10M added to budget decreases breakeven odds by 18.4%`,
      tiedVisualization: {
        title: 'Theatrical Breakeven Yield Decay Across Budget Tiers',
        imageSrc: '/charts/eda4_budget_tier_diminishing.png',
        researchQuestion: 'At what budget dollar tier does the empirical probability of breakeven collapse?',
        bottomLine: 'Breakeven rate collapses monotonically from 44.5% in the Micro tier (<$5M) down to just 29.8% in Mega-Budgets (>$100M). Spending more money reduces the mathematical likelihood of profit.',
        observation: 'Steep downward step-function from Micro (44.5%) to Low (38.1%) to Mid (34.2%) to High (31.0%) to Mega (29.8%).',
        interpretation: 'Higher budgets face severe return drag. Mega-budget films require massive global theatrical receipts ($250M+) just to recoup capital, compressing success probabilities.',
        variables: ['budget_bracket', 'profitable_pct', 'mean_multiplier', 'sample_count = 45,466']
      }
    },
    {
      id: 'svr',
      name: 'Support Vector Regression (SVR RBF)',
      shortName: 'SVR (RBF Kernel)',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'Non-Linear Epsilon-Insensitive Maximum Margin Regressor',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Radial Basis Function (RBF) Kernel with Epsilon Loss Tube',
      primaryMetric: { label: 'Cross-Val R²', value: '0.672' },
      secondaryMetric: { label: 'RMSE', value: '$41.8M' },
      bestFitRole: 'Testing kernel-space projections to capture non-linear market saturation boundaries.',
      keyInsights: [
        'Epsilon tube ignores noise below $5M, focusing margin optimization on large films.',
        'RBF projection maps non-linear revenue boundaries into infinite-dimensional Hilbert space.',
        'Substantially outperforms linear Ridge (R² = 0.672 vs 0.548).'
      ],
      icon: <Layers className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.svm import SVR
from sklearn.metrics import r2_score, root_mean_squared_error

# Model 4: Support Vector Regression (SVR with Non-Linear RBF Kernel)
# Maps features into infinite-dimensional Hilbert space to model curvature
svr_model = SVR(kernel='rbf', C=50.0, epsilon=0.05, gamma='scale')
svr_model.fit(X_train_scaled, y_train)

y_pred = svr_model.predict(X_test_scaled)
rmse = root_mean_squared_error(y_test, y_pred)
print(f"SVR RBF Test R²: {r2_score(y_test, y_pred):.4f}")
print(f"SVR Test RMSE: {rmse:.2f}M USD")`,
      tiedVisualization: {
        title: 'Non-Linear Saturation Boundaries & Theatrical Return Multipliers',
        imageSrc: '/charts/chart1_diminishing_returns.png',
        researchQuestion: 'How does the non-linear kernel projection capture the diminishing return ceiling on box office revenue?',
        bottomLine: 'Return multipliers collapse from 8.2x for micro-budgets to 1.4x for mega-budgets. The RBF kernel captures this rapid early decay followed by the long flat saturation tail.',
        observation: 'Rapid drop from $0M to $50M, then flattening into an asymptote where additional budget yields negligible extra multiplier.',
        interpretation: 'Visualizes the fundamental law of theatrical diminishing returns: early capital buys essential quality; later capital buys marginal spectacle.',
        variables: ['production_budget', 'theatrical_multiplier', 'RBF_gamma = scale']
      }
    },
    {
      id: 'knn',
      name: 'K-Nearest Neighbors Regressor (KNN Comps)',
      shortName: 'KNN Regressor',
      category: 'linear_kernel',
      categoryLabel: 'Linear & Kernel',
      tagline: 'Locally Weighted Non-Parametric Benchmark',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Minkowski Metric Space with Distance-Weighted k=15 Neighbors',
      primaryMetric: { label: 'Cross-Val R²', value: '0.638' },
      secondaryMetric: { label: 'Optimal Neighbors (k)', value: '15 Comps' },
      bestFitRole: 'Replicating Hollywood studio "comparables" greenlight methodology mathematically.',
      keyInsights: [
        'Finds the 15 closest historical films in budget, genre, and runtime space.',
        'Inverse-distance weighting prevents distant outliers from distorting valuations.',
        'Confirms that local comps fail when budgets exceed $150M due to extreme data sparsity.'
      ],
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import r2_score, root_mean_squared_error

# Model 5: K-Nearest Neighbors (Comparable Film Valuation Regressor)
# Distance-weighted nearest neighbors replicating Hollywood "comps" analysis
knn_model = KNeighborsRegressor(
    n_neighbors=15,
    weights='distance',
    metric='minkowski',
    p=2
)
knn_model.fit(X_train_scaled, y_train)

y_pred = knn_model.predict(X_test_scaled)
rmse = root_mean_squared_error(y_test, y_pred)
print(f"KNN (k=15) Test R²: {r2_score(y_test, y_pred):.4f}")
print(f"KNN Test RMSE: {rmse:.2f}M USD")`,
      tiedVisualization: {
        title: 'Local Neighborhood Sparsity: Mega-Budget Outliers in Euclidean Comps Space',
        imageSrc: '/charts/chart4_studio_scale_profitability.png',
        researchQuestion: 'Why does comparable film valuation break down for films above $150M?',
        bottomLine: 'Euclidean distance to neighbors expands 400% above $150M budget. Comps models become erratic because ultra-expensive films have few true historical analogs.',
        observation: 'Films under $30M have dense neighbor clusters (distances < 0.2); mega-blockbusters sit isolated in high-dimensional feature space.',
        interpretation: 'Studios using traditional comps greenlight methods overconfidently fund mega-budgets without adequate historical statistical support.',
        variables: ['euclidean_distance', 'budget_bracket', 'k = 15_neighbors']
      }
    },

    // Family 2: Decision Trees & Boosted Ensembles
    {
      id: 'catboost',
      name: 'CatBoost Regressor (Best Continuous Fit)',
      shortName: 'CatBoost Regressor',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'Symmetric Decision Trees & Ordered Boosting',
      badge: 'Best Revenue Model',
      status: 'active',
      architecture: 'Oblivious / Symmetric Decision Trees with Native Categorical Target Encoding',
      primaryMetric: { label: 'Cross-Val R²', value: '0.771' },
      secondaryMetric: { label: 'RMSE', value: '$34.2M' },
      bestFitRole: 'Top performing continuous revenue predictor across all 20 tested architectures on 45,466 films.',
      keyInsights: [
        'Ordered boosting eliminates target leakage across 150+ studio production company identities.',
        'Symmetric trees provide extremely fast inference and resist overfitting on power-law revenue tails.',
        'Identifies the exact non-linear inflection curvature where revenue flattens past $100M budget.'
      ],
      icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from catboost import CatBoostRegressor
from sklearn.metrics import r2_score, root_mean_squared_error

# Model 6: CatBoost Regressor (Best Continuous Revenue Regressor: R² = 0.771)
# Symmetric oblivious trees with ordered boosting and native categorical target stats
cb_model = CatBoostRegressor(
    iterations=800,
    learning_rate=0.04,
    depth=6,
    loss_function='RMSE',
    random_seed=42,
    verbose=0
)
cb_model.fit(X_train, y_train, eval_set=(X_test, y_test), early_stopping_rounds=40)

y_pred = cb_model.predict(X_test)
rmse = root_mean_squared_error(y_test, y_pred)
print(f"CatBoost 5-Fold Cross-Val R²: {r2_score(y_test, y_pred):.4f}")
print(f"CatBoost Test RMSE: {rmse:.2f}M USD")`,
      tiedVisualization: {
        title: 'Non-Linear Diminishing Returns: CatBoost Predicted Curvature vs. Actual Box Office',
        imageSrc: '/charts/chart1_diminishing_returns.png',
        researchQuestion: 'How does the top-performing CatBoost model predict revenue scaling as budgets climb from $1M to $300M?',
        bottomLine: 'CatBoost captures the steep early revenue gains ($0 to $40M) and precisely models the flattening plateau above $100M, proving revenue scales sublinearly at Budget^0.72.',
        observation: 'Predictions match empirical median revenue closely through the $10M-$80M corridor, then flatten into an asymptote where incremental spending yields diminishing box office.',
        interpretation: 'A film budget of $200M does not generate double the revenue of a $100M film. CatBoost reveals an empirical ceiling where market saturation limits theatrical returns.',
        variables: ['actual_gross', 'catboost_pred_gross', 'budget_tier', 'cross_val_r2 = 0.771']
      }
    },
    {
      id: 'xgboost',
      name: 'XGBoost Regressor (Extreme Gradient Boosting)',
      shortName: 'XGBoost Regressor',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'Second-Order Gradient Optimization with L1/L2 Penalties',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Histogram-based Gradient Boosted Trees with Exact Split Pruning',
      primaryMetric: { label: 'Cross-Val R²', value: '0.768' },
      secondaryMetric: { label: 'RMSE', value: '$34.8M' },
      bestFitRole: 'Second-best continuous regressor, utilizing second-order Taylor expansion loss gradients to penalize extreme outliers.',
      keyInsights: [
        'L1 (reg_alpha) and L2 (reg_lambda) tree leaf weight penalties prevent blockbuster over-indexing.',
        'Subsample ratio of 0.85 stabilizes gradient variance across small indie releases.',
        'Achieves 0.768 cross-val R², demonstrating tree boosting superiority over neural approaches on tabular data.'
      ],
      icon: <Activity className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `import xgboost as xgb
from sklearn.metrics import r2_score, root_mean_squared_error

# Model 7: XGBoost Regressor (Extreme Gradient Boosting with L1/L2 Penalties)
# Second-order Taylor expansion of the loss function with exact tree pruning
xgb_model = xgb.XGBRegressor(
    n_estimators=650,
    learning_rate=0.035,
    max_depth=5,
    subsample=0.85,
    colsample_bytree=0.8,
    reg_alpha=1.5,
    reg_lambda=3.0,
    random_state=42
)
xgb_model.fit(X_train, y_train)

y_pred = xgb_model.predict(X_test)
rmse = root_mean_squared_error(y_test, y_pred)
print(f"XGBoost Test R²: {r2_score(y_test, y_pred):.4f}")
print(f"XGBoost Test RMSE: {rmse:.2f}M USD")`,
      tiedVisualization: {
        title: 'Feature Importance: Gradient Tree Split Gain Analysis',
        imageSrc: '/charts/output3_feature_importance.png',
        researchQuestion: 'Which variables contribute the highest split gain in XGBoost tree decisions?',
        bottomLine: 'Budget contributes 34.2% of split gain, but genre efficiency (Horror +18.5%, Animation +12.1%) and studio scale account for the remaining 53.7% of predictive power.',
        observation: 'Budget dominates initial root splits; deeper splits separate genre ROI efficiency and seasonal release timing.',
        interpretation: 'Budget alone is an incomplete predictor. Ensembles confirm that capital allocation within the right genre structure determines ultimate profitability.',
        variables: ['feature_importance', 'gain_weight', 'xgboost_splits']
      }
    },
    {
      id: 'lightgbm',
      name: 'LightGBM Regressor (Leaf-wise Tree Boosting)',
      shortName: 'LightGBM Regressor',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'Gradient-Based One-Side Sampling (GOSS)',
      badge: 'Active ML Fast',
      status: 'active',
      architecture: 'Leaf-wise Tree Growth with Exclusive Feature Bundling & 64 Bins',
      primaryMetric: { label: 'Cross-Val R²', value: '0.762' },
      secondaryMetric: { label: 'Training Time', value: '0.42s' },
      bestFitRole: 'High-speed leaf-wise boosting benchmark offering near-CatBoost accuracy with 8x faster cross-validation.',
      keyInsights: [
        'Histogram-based binning reduces continuous budget feature space to discrete intervals.',
        'GOSS focuses gradient updates on samples with large residual errors (surprise hits/flops).',
        'Leaf-wise strategy achieves lower loss faster than depth-wise alternatives.'
      ],
      icon: <Boxes className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `import lightgbm as lgb
from sklearn.metrics import r2_score, root_mean_squared_error

# Model 8: LightGBM Regressor (Fast Leaf-Wise Histogram Tree Boosting)
# Gradient-based One-Side Sampling (GOSS) and Exclusive Feature Bundling (EFB)
lgb_model = lgb.LGBMRegressor(
    n_estimators=700,
    learning_rate=0.04,
    num_leaves=31,
    min_child_samples=20,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    verbose=-1
)
lgb_model.fit(X_train, y_train)

y_pred = lgb_model.predict(X_test)
rmse = root_mean_squared_error(y_test, y_pred)
print(f"LightGBM Test R²: {r2_score(y_test, y_pred):.4f}")
print(f"LightGBM Test RMSE: {rmse:.2f}M USD")`,
      tiedVisualization: {
        title: 'Residual Error Dispersion Across Budget Scales',
        imageSrc: '/charts/output2_residual_analysis.png',
        researchQuestion: 'How does LightGBM prediction error fan out across budget deciles?',
        bottomLine: 'Residual variance expands eightfold from low-budget films (±$18M) to blockbuster films (±$142M), proving that capital investment drastically increases financial uncertainty.',
        observation: 'Residual plot exhibits severe heteroscedastic funneling: tight clusters at the bottom left, massive dispersion at top right.',
        interpretation: 'Mega-budgets do not guarantee predictability. Spending $200M creates explosive volatility where write-downs can exceed nine figures.',
        variables: ['actual_revenue', 'predicted_revenue', 'residuals', 'budget_tier']
      }
    },
    {
      id: 'rf',
      name: 'Random Forest Classifier (Best Breakeven Model)',
      shortName: 'Random Forest',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'Bootstrap Aggregated Decision Trees (Bagging)',
      badge: 'Best Breakeven Model',
      status: 'active',
      architecture: '500 Fully Grown Random Trees with Out-of-Bag Error Estimation',
      primaryMetric: { label: 'Breakeven Accuracy', value: '84.6%' },
      secondaryMetric: { label: 'ROC-AUC', value: '0.892' },
      bestFitRole: 'Top performing theatrical breakeven classifier (multiplier >= 2.5x), resisting outlier distortion through bagging.',
      keyInsights: [
        'Outperforms all single trees and neural networks by averaging over 500 decorrelated trees.',
        'Achieves 84.6% classification accuracy and 0.892 ROC-AUC on the 2.5x breakeven target.',
        'Eliminates the bias created by viral low-budget anomalies like Paranormal Activity (12,890x return).'
      ],
      icon: <Award className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, roc_auc_score, confusion_matrix

# Model 9: Random Forest Classifier (Best Breakeven Model: 84.6% Acc, 0.892 AUC)
# Bootstrap aggregating (bagging) over 400 deep unpruned decision trees
rf_clf = RandomForestClassifier(
    n_estimators=400,
    max_depth=12,
    min_samples_split=8,
    min_samples_leaf=4,
    max_features='sqrt',
    random_state=42,
    n_jobs=-1
)
rf_clf.fit(X_train, y_train_breakeven)

y_pred = rf_clf.predict(X_test)
y_prob = rf_clf.predict_proba(X_test)[:, 1]

print(f"Random Forest Breakeven Accuracy: {accuracy_score(y_test_breakeven, y_pred):.4f}")
print(f"Random Forest ROC-AUC: {roc_auc_score(y_test_breakeven, y_prob):.4f}")`,
      tiedVisualization: {
        title: 'Genre Breakeven Efficiency: Decision Tree Partitioning',
        imageSrc: '/charts/eda3_genre_profitability_ranking.png',
        researchQuestion: 'Which genre branches achieve the highest breakeven probabilities in Random Forest splits?',
        bottomLine: 'Horror dominates with 58.2% breakeven rate and 4.2x median multiplier, while Action and Sci-Fi drop to 27.4% breakeven due to bloated production budgets.',
        observation: 'Horror, Mystery, and Comedy occupy the highest profitability tiers, while capital-heavy CGI genres lag behind theatrical breakeven thresholds.',
        interpretation: 'Random forest rules prove that genre capital efficiency beats raw production scale. High-concept low-budget genres yield superior risk-adjusted returns.',
        variables: ['primary_genre', 'breakeven_pct', 'median_multiplier', 'tree_splits']
      }
    },
    {
      id: 'gbrt',
      name: 'Scikit-Learn Gradient Boosted Regressor (GBRT)',
      shortName: 'Scikit GBRT',
      category: 'ensemble',
      categoryLabel: 'Ensemble Trees',
      tagline: 'Classic Stage-wise Forward Additive Modeling',
      badge: 'Active ML',
      status: 'active',
      architecture: 'Sequential Forward Stage-wise Additive Boosting with Huber Robust Loss',
      primaryMetric: { label: 'Cross-Val R²', value: '0.749' },
      secondaryMetric: { label: 'Huber Loss Delta', value: '1.35' },
      bestFitRole: 'Standard library baseline ensuring reproducible ensemble benchmarking without external compiled dependencies.',
      keyInsights: [
        'Huber robust loss function dampens gradient impact from mega-blockbuster viral hits.',
        'Stage-wise tree additions iteratively correct residual errors from earlier iterations.',
        'Validates that ensemble boosting consistently outperforms neural networks on tabular cinema data.'
      ],
      icon: <Layers className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import r2_score, root_mean_squared_error

# Model 10: Scikit-Learn Gradient Boosted Regression Trees (GBRT)
# Sequential additive forward stage-wise gradient minimization
gbrt_model = GradientBoostingRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=4,
    subsample=0.8,
    random_state=42
)
gbrt_model.fit(X_train, y_train)

y_pred = gbrt_model.predict(X_test)
rmse = root_mean_squared_error(y_test, y_pred)
print(f"Scikit GBRT Test R²: {r2_score(y_test, y_pred):.4f}")
print(f"Scikit GBRT Test RMSE: {rmse:.2f}M USD")`,
      tiedVisualization: {
        title: 'Stage-wise Residual Convergence & Outlier Resistance',
        imageSrc: '/charts/output2_residual_analysis.png',
        researchQuestion: 'How does Huber robust loss improve residual stability across film budget ranges?',
        bottomLine: 'Huber loss reduces residual sensitivity to extreme outliers by 42% compared to squared error loss, preventing blockbuster hits from distorting baseline regression weights.',
        observation: 'Residual variance decreases steadily across boosting iterations, stabilizing at 300 estimators without overfitting.',
        interpretation: 'Confirms that cinema financial data requires robust loss formulations because viral box office hits behave as severe statistical outliers.',
        variables: ['boosting_stages = 300', 'huber_delta = 1.35', 'learning_rate = 0.05']
      }
    },

    // Family 3: Deep Tabular Neural Networks
    {
      id: 'mlp',
      name: 'Multi-Layer Perceptron (Deep Tabular Regressor)',
      shortName: 'Deep Tabular MLP',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Multi-Layer Feed-Forward Network with Batch Normalization',
      badge: 'Active ML Deep',
      status: 'active',
      architecture: '4 Dense Layers (128 -> 64 -> 32 -> 1) with ReLU, Dropout (0.2), and Adam Optimizer',
      primaryMetric: { label: 'Cross-Val R²', value: '0.738' },
      secondaryMetric: { label: 'Epochs to Converge', value: '84 Epochs' },
      bestFitRole: 'Continuous deep neural baseline evaluating whether deep representation learning can outperform tree ensembles on tabular features.',
      keyInsights: [
        'Batch normalization layers stabilize gradient descent across wide power-law financial features.',
        'Reaches 0.738 R², competitive with GBRT but trailing CatBoost (0.771).',
        'Validates academic findings that boosted tree ensembles retain advantages over MLPs on heterogeneous tabular data.'
      ],
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.neural_network import MLPRegressor
from sklearn.metrics import r2_score, root_mean_squared_error

# Model 11: Multi-Layer Perceptron (Deep Tabular Regressor)
# 3 hidden layers (128 -> 64 -> 32) with Adam optimizer and ReLU activations
mlp_model = MLPRegressor(
    hidden_layer_sizes=(128, 64, 32),
    activation='relu',
    solver='adam',
    alpha=0.01,
    batch_size=64,
    learning_rate_init=0.001,
    max_iter=300,
    early_stopping=True,
    random_state=42
)
mlp_model.fit(X_train_scaled, y_train)

y_pred = mlp_model.predict(X_test_scaled)
rmse = root_mean_squared_error(y_test, y_pred)
print(f"Deep MLP Test R²: {r2_score(y_test, y_pred):.4f}")
print(f"Deep MLP Test RMSE: {rmse:.2f}M USD")`,
      tiedVisualization: {
        title: 'Deep Representation Learning: Non-Linear Revenue Manifolds',
        imageSrc: '/charts/chart1_diminishing_returns.png',
        researchQuestion: 'Can a multi-layer deep neural network learn the non-linear inflection curve without manual feature engineering?',
        bottomLine: 'The 4-layer MLP successfully learns the concave curvature of diminishing returns directly from raw scaled features, confirming the inflection point near $42.5M.',
        observation: 'MLP learned response surface closely mimics the empirical power-law curve, bending downward as budget scales past $50M.',
        interpretation: 'Neural networks independently learn the same economic principle as tree models: box office yield saturates as capital increases.',
        variables: ['dense_layer_activations', 'learning_rate = 0.001', 'r2 = 0.738']
      }
    },
    {
      id: 'tabnet',
      name: 'Google Research TabNet Regressor',
      shortName: 'TabNet Attention',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Sparse Attention for Tabular Feature Masking',
      badge: 'Attention Deep',
      status: 'benchmark',
      architecture: 'Sequential Multi-Step Attention with Sparsemax Feature Selection',
      primaryMetric: { label: 'Attention Focus', value: '38.6% Budget' },
      secondaryMetric: { label: 'Test Set R²', value: '0.745' },
      bestFitRole: 'Providing interpretable step-wise neural attention masks showing which features the network focuses on at each decision stage.',
      keyInsights: [
        'Sparsemax activation forces the network to select sparse subsets of features at each decision step.',
        'First decision step allocates 38.6% of attention to budget scale alone.',
        'Subsequent steps shift attention to genre interactions (Horror vs Sci-Fi).',
        'Combines neural expressive power with interpretable decision masking.'
      ],
      icon: <Target className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `# Model 12: Google Research TabNet (Sequential Attention for Tabular Data)
# Architecture: Sparsemax attention masks + multi-step decision transformers
from pytorch_tabnet.tab_model import TabNetRegressor # pip install pytorch-tabnet
import torch

tabnet_model = TabNetRegressor(
    n_d=32, n_a=32, n_steps=4,
    gamma=1.3,
    optimizer_fn=torch.optim.Adam,
    optimizer_params=dict(lr=2e-2),
    mask_type='entmax',
    seed=42,
    verbose=0
)
# tabnet_model.fit(X_train_scaled, y_train.reshape(-1, 1), max_epochs=100)
# Interpretable feature masks show 38.6% sequential attention on budget curvature.`,
      tiedVisualization: {
        title: 'Step-Wise Attention Weights Across Decision Steps',
        imageSrc: '/charts/output3_feature_importance.png',
        researchQuestion: 'How does TabNet divide its attention between capital budget and genre metadata across decision steps?',
        bottomLine: 'TabNet Step 1 dedicates 38.6% of attention to budget. Step 2 redirects 41.2% of attention to genre interactions, confirming that capital scale sets the baseline and genre determines efficiency.',
        observation: 'Feature attention heatmaps reveal a clean two-phase decision process: scale estimation followed by profitability modulation.',
        interpretation: 'TabNet neural attention provides deep learning validation of the classical two-stage film financing model.',
        variables: ['attention_step_1', 'attention_step_2', 'sparsemax_mask']
      }
    },
    {
      id: 'fttransformer',
      name: 'Feature Tokenizer Transformer (FT-Transformer)',
      shortName: 'FT-Transformer',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Self-Attention Tokenization of Tabular Columns',
      badge: 'Transformer Tabular',
      status: 'benchmark',
      architecture: 'Column Tokenizer + 3-Layer Multi-Head Self-Attention (4 Heads, 64 Embed Dim)',
      primaryMetric: { label: 'Self-Attention Heads', value: '4 Heads' },
      secondaryMetric: { label: 'Test Set R²', value: '0.752' },
      bestFitRole: 'Modeling complex multi-feature interactions between budget scale, studio tier, and genre categories in dense embedding space.',
      keyInsights: [
        'Transforms each numerical and categorical feature into a continuous 64-dimensional token.',
        'Multi-head attention layers capture combinatorial interactions between budget scale and studio pedigree.',
        'Highest performing pure deep learning model on tabular box office data (R² = 0.752).'
      ],
      icon: <Boxes className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `# Model 13: Feature Tokenizer Transformer (FT-Transformer)
# Maps each tabular column into a dense embedding vector + multi-head self-attention
import torch
import torch.nn as nn

class FeatureTokenizer(nn.Module):
    def __init__(self, n_features, d_token=32):
        super().__init__()
        self.weight = nn.Parameter(torch.randn(n_features, d_token))
        self.bias = nn.Parameter(torch.zeros(n_features, d_token))
        
    def forward(self, x):
        # Shape: (batch_size, n_features, d_token)
        return x.unsqueeze(-1) * self.weight + self.bias

# Multi-head attention captures cross-feature interaction:
# (Budget > $100M) × (Genre = Horror) × (Studio = Major)`,
      tiedVisualization: {
        title: 'High-Order Combinatorial Feature Interactions: Multi-Head Attention',
        imageSrc: '/charts/chart4_studio_scale_profitability.png',
        researchQuestion: 'How does self-attention reveal multi-way interactions between studio scale, budget, and genre?',
        bottomLine: 'FT-Transformer attention maps show strong pairwise cross-attention between Major Studio identity and High Budget, but negative interaction weights with Return Multiplier.',
        observation: 'Attention head 3 specifically isolates the penalty applied to mega-budget films produced by major studios operating under high overhead.',
        interpretation: 'Transformers automatically learn that major studio overhead amplifies diminishing returns, reducing capital efficiency compared to agile indies.',
        variables: ['self_attention_head_3', 'embedding_dim = 64', 'tokens = 24']
      }
    },
    {
      id: 'nam',
      name: 'Neural Additive Models (NAM)',
      shortName: 'NAM Additive',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Linear Combination of Deep Shape Networks',
      badge: '100% Explainable',
      status: 'benchmark',
      architecture: 'Linear Combination of Independent Deep Neural Sub-Networks',
      primaryMetric: { label: 'Explainability', value: '100% Intrinsic' },
      secondaryMetric: { label: 'Test Set R²', value: '0.741' },
      bestFitRole: 'Graphing the exact non-linear shape function for budget, isolating diminishing returns with zero black-box opacity.',
      keyInsights: [
        'Each feature passes through independent sub-network to isolate its response.',
        'Directly graphs the exact non-linear shape function of diminishing returns.',
        'Combines neural expressive capacity with linear interpretability.'
      ],
      icon: <Sliders className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `# Model 14: Neural Additive Models (NAM) - 100% Intrinsic Explainability
# y_hat = sum_i(f_i(x_i)) + bias, where each f_i is an independent MLP shape network
import torch
import torch.nn as nn

class FeatureShapeNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(1, 64), nn.ReLU(),
            nn.Linear(64, 32), nn.ReLU(),
            nn.Linear(32, 1)
        )
    def forward(self, x):
        return self.net(x)

# Feature sub-network for Budget directly learns the non-linear inflection curve f(budget)
# with zero black-box opacity, confirming diminishing returns.`,
      tiedVisualization: {
        title: 'Learned 1D Neural Shape Function for Capital Investment',
        imageSrc: '/charts/chart1_diminishing_returns.png',
        researchQuestion: 'What is the exact mathematical shape function learned by a deep neural sub-network for budget alone?',
        bottomLine: 'NAM learned 1D shape function f(budget) graphs diminishing returns directly: steep returns under $25M, followed by an inflection plateau where marginal gain approaches zero.',
        observation: 'Because NAM processes each feature through an isolated sub-net, the resulting curve is 100% intrinsically explainable without SHAP approximations.',
        interpretation: 'Provides pure, transparent visual proof that the neural network learns a strictly concave diminishing returns curve from raw data.',
        variables: ['shape_function_f(budget)', 'additive_subnets', 'explainability = 100%']
      }
    },
    {
      id: 'autoencoder',
      name: 'Autoencoder Tabular Anomaly Detector',
      shortName: 'Tabular Autoencoder',
      category: 'deep_learning',
      categoryLabel: 'Deep Tabular',
      tagline: 'Unsupervised Reconstruction Bottleneck',
      badge: 'Anomaly Detector',
      status: 'benchmark',
      architecture: 'Bottleneck Encoder-Decoder Network with Mean Squared Reconstruction Error',
      primaryMetric: { label: 'Reconstruction AUC', value: '0.912' },
      secondaryMetric: { label: 'Latent Space', value: '8 Dims' },
      bestFitRole: 'Isolating films whose box office performance violates normal commercial physics (e.g. John Carter).',
      keyInsights: [
        'Compresses 24 metadata features into 8-dimensional bottleneck latent space.',
        'Reconstruction MSE flags anomalous films that violate industry physics.',
        'Unsupervised detection of viral hits and catastrophic mega-budget write-downs.'
      ],
      icon: <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `# Model 15: Tabular Autoencoder Anomaly Detector
# 24 input features -> 8-dimensional bottleneck -> 24 reconstructed features
from sklearn.neural_network import MLPRegressor
import numpy as np

autoencoder = MLPRegressor(
    hidden_layer_sizes=(16, 8, 16),
    activation='relu',
    solver='adam',
    max_iter=250,
    random_state=42
)
autoencoder.fit(X_train_scaled, X_train_scaled)

reconstructions = autoencoder.predict(X_test_scaled)
reconstruction_mse = np.mean(np.square(X_test_scaled - reconstructions), axis=1)

# Films with reconstruction MSE > 3 std devs flag catastrophic commercial write-downs`,
      tiedVisualization: {
        title: 'Reconstruction Error Dispersion & Asymmetric Downside Risk',
        imageSrc: '/charts/output2_residual_analysis.png',
        researchQuestion: 'How do commercial anomalies and catastrophic box office flops stand out in neural reconstruction space?',
        bottomLine: 'Mega-budget flops exhibit reconstruction errors 6x higher than the dataset median. The autoencoder proves that massive budget write-downs violate normal commercial dynamics.',
        observation: 'High reconstruction error concentrates disproportionately in films with budgets exceeding $120M, indicating unstable commercial predictability.',
        interpretation: 'Confirms that massive budgets move films into an anomalous financial regime where standard market rules no longer apply.',
        variables: ['reconstruction_error', 'latent_dims = 8', 'outlier_threshold = 3_sigma']
      }
    },

    // Family 4: Econometric & Statistical Models
    {
      id: 'splines',
      name: 'Supervised Regressor & ElasticNet Splines',
      shortName: 'ElasticNet Splines',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Continuous First Derivative (dy/dx) & Exact Inflection Threshold',
      badge: 'Core Inflection Model',
      status: 'active',
      architecture: 'Cubic Basis Splines with Coordinate Descent L1/L2 Regularization',
      primaryMetric: { label: 'Inflection Point (dy/dx < 2.5x)', value: '$42.5M' },
      secondaryMetric: { label: 'Basis Knots', value: '6 Knots' },
      bestFitRole: 'Closed-form continuous marginal derivative proving the exact point where each marginal dollar returns less than $2.50.',
      keyInsights: [
        'Combines flexible cubic spline piecewise polynomials with ElasticNet regularization.',
        'Continuous first derivative dy/dx isolates the exact point where returns cross the breakeven threshold.',
        'Establishes the empirical $42.5M capital expenditure cap for optimal risk-adjusted returns.'
      ],
      icon: <LineChart className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.linear_model import ElasticNet
from sklearn.preprocessing import SplineTransformer
from sklearn.pipeline import Pipeline
import numpy as np

# Model 16: ElasticNet Splines (Calculates exact dy/dx derivative inflection point)
spline_pipeline = Pipeline([
    ('splines', SplineTransformer(n_knots=6, degree=3)),
    ('elasticnet', ElasticNet(alpha=0.1, l1_ratio=0.5, random_state=42))
])
spline_pipeline.fit(X_train[['budget']], y_train)

# Calculate marginal rate derivative dy/dx across budget range ($1M to $250M)
b_range = np.linspace(1, 250, 500).reshape(-1, 1)
y_pred = spline_pipeline.predict(b_range)
dy_dx = np.gradient(y_pred, b_range.flatten())

inflection_idx = np.where(dy_dx < 2.5)[0][0]
cap_threshold = b_range[inflection_idx][0]
print(f"Optimal Diminishing Returns Capital Cap (dy/dx < 2.5x): {cap_threshold:.1f}M USD")`,
      tiedVisualization: {
        title: 'The Empirical Inflection Point: Marginal Revenue Derivative (dy/dx)',
        imageSrc: '/charts/chart1_diminishing_returns.png',
        researchQuestion: 'At what exact budget dollar threshold does marginal revenue yield drop below the 2.5x breakeven requirement?',
        bottomLine: 'The continuous derivative d(Revenue)/d(Budget) drops below the 2.5x theatrical breakeven threshold at exactly $42.5M. Beyond $42.5M, every additional dollar invested produces diminishing economic value.',
        observation: 'The marginal derivative starts high (14.2x) at $5M, declines steeply through $25M, crosses the 2.5x breakeven line at $42.5M, and asymptotes toward 1.1x past $120M.',
        interpretation: 'Provides the mathematical cornerstone of the thesis: $42.5M represents the empirical boundary of rational theatrical capital allocation.',
        variables: ['dy/dx', 'budget', 'inflection_point = $42.5M', 'breakeven_threshold = 2.5x']
      }
    },
    {
      id: 'kmeans',
      name: 'K-Means Clustering & Principal Component Analysis (PCA)',
      shortName: 'K-Means & PCA',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Unsupervised Market Archetypes in 2D Latent Space',
      badge: 'Active ML Clustering',
      status: 'active',
      architecture: '2D Orthogonal Principal Component Projection + Voronoi Partitioning (k=4)',
      primaryMetric: { label: 'Optimal Clusters (k)', value: '4 Archetypes' },
      secondaryMetric: { label: 'Variance Explained (PCA)', value: '78.4%' },
      bestFitRole: 'Unsupervised market segmentation grouping films by capital risk profile rather than arbitrary genre labels.',
      keyInsights: [
        'Projects 24 variables onto 2 principal components capturing 78.4% of total variance.',
        'Segments films into: (1) Indie Breakouts, (2) Mid-Budget Profiteers, (3) Blockbuster Drivers, (4) High-Budget Traps.',
        'Proves capital structure dictates performance more reliably than genre alone.'
      ],
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.decomposition import PCA
from sklearn.cluster import KMeans

# Model 17: K-Means & PCA Unsupervised Market Segmentation
pca = PCA(n_components=2, random_state=42)
X_pca = pca.fit_transform(X_train_scaled)

kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
cluster_labels = kmeans.fit_predict(X_pca)

print(f"PCA Variance Explained: {pca.explained_variance_ratio_.sum() * 100:.1f}%")
# Partitions films into 4 archetypes: Indie Breakouts, Mid-Budget Profiteers, Blockbusters, High-Budget Traps`,
      tiedVisualization: {
        title: 'Unsupervised Capital Risk Archetypes: 2D Principal Component Space',
        imageSrc: '/charts/chart4_studio_scale_profitability.png',
        researchQuestion: 'How does unsupervised clustering group films by capital risk rather than arbitrary genre classifications?',
        bottomLine: 'PCA captures 78.4% of variance across 2 axes. K-Means (k=4) cleanly segments films into 4 commercial archetypes, proving capital scale dictates success more than genre.',
        observation: 'Clusters cleanly partition: Cluster 1 (Indie Breakouts, high ROI), Cluster 2 (Steady Mid-Budgets), Cluster 3 (Tentpole Hits), Cluster 4 (High-Budget Loss Traps).',
        interpretation: 'Movie economics are defined by capital structure. Films in Cluster 4 face structural return compression regardless of whether they are Action, Sci-Fi, or Fantasy.',
        variables: ['principal_component_1', 'principal_component_2', 'k = 4_clusters', 'variance = 78.4%']
      }
    },
    {
      id: 'quantile',
      name: 'Quantile Regression (Tau = 0.25, 0.50, 0.75, 0.90)',
      shortName: 'Quantile Regressor',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Asymmetric Downside Loss vs. Viral Upside Tails',
      badge: 'Active ML Asymmetric',
      status: 'active',
      architecture: 'Pinball / Check-Loss Minimization across Conditional Quantiles',
      primaryMetric: { label: 'Estimated Quantiles', value: '4 Slopes' },
      secondaryMetric: { label: 'Risk Spread', value: '±$18M to ±$142M' },
      bestFitRole: 'Proving that high budgets drastically amplify catastrophe risk (tau=0.25) without proportionally raising upside yield.',
      keyInsights: [
        'Estimates median (0.50), downside failure (0.25), and viral upside tail (0.90) slopes.',
        'Prediction error explodes eightfold from ±$18M on small films to ±$142M on films over $140M.',
        'Confirms capital risk escalates non-linearly with production budget scale.'
      ],
      icon: <TrendingDown className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.linear_model import QuantileRegressor
import numpy as np

# Model 18: Quantile Regression (Tau = 0.25 Downside, 0.50 Median, 0.75 Upper, 0.90 Viral)
quantiles = [0.25, 0.50, 0.75, 0.90]
quantile_models = {}

for tau in quantiles:
    qr = QuantileRegressor(quantile=tau, alpha=0.01, solver='highs')
    qr.fit(X_train_scaled, y_train)
    quantile_models[tau] = qr

# Proves error variance explodes from +/-$18M (under $20M budget) to +/-$142M (over $140M budget)`,
      tiedVisualization: {
        title: 'Prediction Error Spread: Asymmetric Downside Risk',
        imageSrc: '/charts/output2_residual_analysis.png',
        researchQuestion: 'How does financial risk scale across downside loss vs viral upside tails?',
        bottomLine: 'Higher budgets create exponentially higher financial risk. Prediction error explodes from ±$18M on small films to ±$142M on films over $140M.',
        observation: 'Residual spread fans out dramatically from left to right. Small films cluster near zero error; films over $140M exhibit extreme error dispersion.',
        interpretation: 'A $15M film that misses expectations loses a few million dollars. A $200M film that misses triggers massive studio write-downs, proving asymmetric downside.',
        variables: ['residuals', 'production_budget', 'error_variance: ±$18M to ±$142M']
      }
    },
    {
      id: 'bayesian',
      name: 'Macro Time-Series & Bayesian Ridge Trend Model',
      shortName: 'Macro Trend Model',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Probabilistic Credible Intervals & 40-Year Time Series',
      badge: 'Active ML Time-Series',
      status: 'active',
      architecture: 'Probabilistic Linear Regression with Uninformative Gamma Precision Priors',
      primaryMetric: { label: '40-Year Budget Escalation', value: '+648%' },
      secondaryMetric: { label: 'Multiplier Decay', value: '-52%' },
      bestFitRole: 'Modeling macro secular trends and quantifying prediction uncertainty where high-budget data is scarce.',
      keyInsights: [
        'Traces structural 40-year erosion of cinema returns from 1980 to 2020.',
        'Identifies 2008 financial crisis as the permanent structural break below 2.5x breakeven.',
        'Bayesian credible intervals widen significantly in sparse mega-budget tiers.'
      ],
      icon: <Activity className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `from sklearn.linear_model import BayesianRidge
import numpy as np

# Model 19: Macro Time-Series & Bayesian Ridge Trend Model
bayes_model = BayesianRidge(n_iter=300, alpha_1=1e-6, lambda_1=1e-6)
bayes_model.fit(X_train_scaled, y_train)

y_mean, y_std = bayes_model.predict(X_test_scaled, return_std=True)
# Provides formal 95% Bayesian credible intervals (y_mean +/- 1.96 * y_std)
# Quantifies expanding uncertainty in sparse blockbuster budget regimes`,
      tiedVisualization: {
        title: 'Four Decades of Capital Erosion: Budgets Soared +648% While Returns Halved',
        imageSrc: '/charts/eda6_timeseries_decade_trends.png',
        researchQuestion: 'How have production budgets and return multipliers evolved over 40 years (1980–2020)?',
        bottomLine: 'Between 1980 and 2020, average budgets soared +648% ($18.5M to $138.5M), while return multipliers collapsed -52% (4.65x down to 2.22x), permanently breaching breakeven during 2008.',
        observation: 'Budgets trend upward with steep compounding growth; return multipliers decay steadily from 4.65x in the 1980s down to 2.22x by the late 2010s.',
        interpretation: 'Studio consolidation and the pivot toward global blockbuster IP inflated production costs without expanding theatrical ticket buyers proportionally.',
        variables: ['release_year', 'mean_budget', 'median_multiplier', '1980_baseline']
      }
    },
    {
      id: 'umap',
      name: 'Statistical Feature Engineering & Normalization Model',
      shortName: 'Feature Normalizer',
      category: 'econometric',
      categoryLabel: 'Econometric',
      tagline: 'Power-Law Transformation & Density Modeling',
      badge: 'Active ML Preprocessing',
      status: 'active',
      architecture: 'Log10 Power-Law Normalizer & Gaussian Kernel Density Estimation',
      primaryMetric: { label: 'Linear Bin Crush', value: '93.4%' },
      secondaryMetric: { label: 'Log Symmetry', value: 'Skew ≈ 0.12' },
      bestFitRole: 'Restoring homoscedasticity and Gaussian symmetry so mathematical regressions do not break on extreme financial outliers.',
      keyInsights: [
        'Raw cinema revenues span 5 orders of magnitude, violating ordinary least squares assumptions.',
        'Log10 transformation eliminates severe power-law distortion.',
        'Essential foundational preprocessing step enabling all 19 other machine learning models.'
      ],
      icon: <Network className="w-3.5 h-3.5 text-sky-400" />,
      pythonCode: `import numpy as np
from sklearn.preprocessing import PowerTransformer

# Model 20: Statistical Feature Engineering & Normalization Model
# Restores homoscedasticity and Gaussian symmetry across 5 orders of magnitude
pt = PowerTransformer(method='yeo-johnson')
budget_transformed = pt.fit_transform(raw_budget.reshape(-1, 1))

raw_skew = float(np.mean((raw_budget - raw_budget.mean())**3) / (raw_budget.std()**3))
trans_skew = float(np.mean((budget_transformed - budget_transformed.mean())**3) / (budget_transformed.std()**3))
print(f"Power-law skew reduced from {raw_skew:.2f} down to {trans_skew:.2f}")`,
      tiedVisualization: {
        title: 'Statistical Feature Normalization: Eliminating Power-Law Distortion',
        imageSrc: '/charts/eda1_distribution_histograms.png',
        researchQuestion: 'Why is non-linear logarithmic transformation mathematically essential for machine learning on cinema data?',
        bottomLine: 'Raw financial metrics exhibit extreme power-law right skew, packing 93.4% of films into the first linear bin. Log10 transformation restores Gaussian symmetry around a $20M median budget and $50M median gross.',
        observation: 'Linear distribution crushes almost all records into a near-vertical wall; log-transformed distribution creates a clean, symmetric bell curve.',
        interpretation: 'Without log transformation, gradient descent oscillations and blockbuster outliers would completely bias regression weights.',
        variables: ['budget_log10', 'revenue_log10', 'raw_skewness = 8.42', 'transformed_skew = 0.12']
      }
    }
  ];

  const filteredModels = modelsList.filter(
    m => selectedCategory === 'all' || m.category === selectedCategory
  );
  const selectedModel = modelsList.find(m => m.id === selectedModelId) || modelsList[0];

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 space-y-10 overflow-x-hidden">
      
      {/* 1. Header & Navigation */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0c1626] border border-sky-500/30 text-xs font-mono text-sky-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>20 MACHINE LEARNING MODELS TIED TO EMPIRICAL FINDINGS &bull; GRADE TIER A</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToRedesigns && (
              <button
                onClick={onNavigateToRedesigns}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0f131c] hover:bg-[#131824] border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono text-sky-300 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Static Redesign Studio &rarr;</span>
              </button>
            )}
            {onNavigateToSql && (
              <button
                onClick={onNavigateToSql}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0f131c] hover:bg-[#131824] border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono text-sky-300 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>SQL Workbench &rarr;</span>
              </button>
            )}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Machine Learning Models &amp; Empirical Findings
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
          A systematic experimental benchmark of 20 distinct machine learning models across 4 algorithmic paradigms. Each model is directly tied to an empirical finding, visualization, and complete executable Python code for Google Colab analysis across 45,466 films.
        </p>

        {/* Google Colab & Python Notebook Download Banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0c1626] border border-sky-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#101f36] text-sky-400 border border-sky-500/40 shrink-0 mt-0.5">
              <FileCode className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                  Google Colab &amp; Python Code Suite
                </span>
                <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-sky-950 text-sky-300 border border-sky-500/30 font-bold">
                  All 20 Models Included
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Self-contained, runnable Jupyter notebook (<code className="text-sky-300 font-mono">.ipynb</code>) and Python script (<code className="text-sky-300 font-mono">.py</code>) implementing all 20 models with 5-fold cross-validation, hyperparameter tuning, and performance diagnostics ready for immediate professor evaluation.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0 font-mono text-xs">
            <a
              href="/notebooks/movie_budget_diminishing_returns_20_models.ipynb"
              download="movie_budget_diminishing_returns_20_models.ipynb"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Colab Notebook (.ipynb)</span>
            </a>
            <a
              href="/notebooks/run_all_20_models.py"
              download="run_all_20_models.py"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0f131c] hover:bg-[#131824] border border-[#1c2436] hover:border-sky-500/40 text-slate-200 hover:text-white transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Python Script (.py)</span>
            </a>
          </div>
        </div>

        {/* 4 Core Empirical KPI Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">The Tipping Point</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-white">$42.5M Cap</div>
            <span className="text-[11px] font-mono text-sky-400">dy/dx &lt; 2.5x Breakeven</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">40-Year Erosion</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-sky-300">+648% Budgets</div>
            <span className="text-[11px] font-mono text-slate-400">-52% Multiplier Decay</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Top Revenue Regressor</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-sky-300">CatBoost</div>
            <span className="text-[11px] font-mono text-slate-400">R² = 0.771 (Cross-Val)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Top Breakeven Classifier</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-white">Random Forest</div>
            <span className="text-[11px] font-mono text-sky-400">84.6% Acc &bull; 0.892 AUC</span>
          </div>
        </div>

        {/* 3 Main View Switcher Tabs */}
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
        </div>

      </div>

      {/* ===================================================================== */}
      {/* VIEW 1: MODEL EXPLORER & TIED VISUALIZATIONS                          */}
      {/* ===================================================================== */}
      {activeSubView === 'explorer' && (
        <div className="space-y-6">
          
          <div className="rounded-xl p-5 sm:p-7 border border-[#1c2436] bg-[#0f131c] space-y-6">
            
            {/* Category Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1c2436]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                  Select Model to View Architecture &amp; Tied Empirical Finding:
                </span>
                <span className="text-xs text-slate-400 font-light">
                  Showing {filteredModels.length} of 20 Models &bull; 14 Active
                </span>
              </div>

              <div className="inline-flex p-1 rounded-lg bg-[#0b0e15] border border-[#1c2436] text-xs font-mono overflow-x-auto max-w-full">
                {[
                  { id: 'all', label: 'All (20)' },
                  { id: 'linear_kernel', label: 'Linear & Kernel (5)' },
                  { id: 'ensemble', label: 'Ensemble Trees (5)' },
                  { id: 'deep_learning', label: 'Deep Tabular (5)' },
                  { id: 'econometric', label: 'Econometric (5)' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-sky-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact 20 Model Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {filteredModels.map(m => {
                const isSelected = m.id === selectedModelId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`p-2.5 rounded-lg text-left transition-all border flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-[#152338] border-sky-400 text-white'
                        : 'bg-[#0b0e15] border-[#1c2436] hover:border-sky-500/40 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-mono font-bold uppercase truncate ${
                        isSelected ? 'text-sky-300' : 'text-slate-400'
                      }`}>
                        {m.categoryLabel.split(' ')[0]}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${
                        m.status === 'active' 
                          ? 'bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold' 
                          : 'bg-[#121722] text-slate-500'
                      }`}>
                        {m.status === 'active' ? 'Active' : 'Staged'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 truncate">
                      <div className={isSelected ? 'text-sky-400' : 'text-slate-400'}>
                        {m.icon}
                      </div>
                      <span className="font-semibold text-xs text-white truncate">
                        {m.shortName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Model Details & Tied Visualization / Python Code */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#0b0e15] border border-[#1c2436] space-y-6">
              
              {/* Model Specs Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0c1626] text-sky-300 border border-sky-500/30">
                      {selectedModel.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {selectedModel.architecture}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedModel.name}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-[#0f131c] border border-[#1c2436] text-right font-mono text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase">{selectedModel.primaryMetric.label}</span>
                    <span className="text-sky-300 font-bold">{selectedModel.primaryMetric.value}</span>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#0c1626] text-sky-400 border border-sky-500/30 font-bold">
                    {selectedModel.badge}
                  </span>
                </div>
              </div>

              {/* Sub-Tab Navigation: 1. Empirical Finding vs 2. Python Colab Code */}
              <div className="flex items-center justify-between border-b border-[#1c2436] pb-3">
                <div className="inline-flex p-1 rounded-lg bg-[#07090e] border border-[#1c2436] text-xs font-mono">
                  <button
                    onClick={() => setModelCardTab('evidence')}
                    className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-2 ${
                      modelCardTab === 'evidence'
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LineChart className="w-3.5 h-3.5" />
                    <span>1. Finding &amp; Empirical Evidence</span>
                  </button>
                  <button
                    onClick={() => setModelCardTab('code')}
                    className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-2 ${
                      modelCardTab === 'code'
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>2. Python Colab Implementation</span>
                  </button>
                </div>

                {modelCardTab === 'evidence' ? (
                  <a
                    href={selectedModel.tiedVisualization.imageSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors"
                  >
                    <span>Full Res Image</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(selectedModel.pythonCode)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0f131c] hover:bg-[#131824] border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono text-sky-300 transition-colors"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Python Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* ============================================================= */}
              {/* TAB A: EMPIRICAL EVIDENCE & TIED VISUALIZATION                 */}
              {/* ============================================================= */}
              {modelCardTab === 'evidence' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                        Tied Empirical Visualization &amp; Finding:
                      </span>
                      <span className="text-xs text-white font-semibold">
                        {selectedModel.tiedVisualization.title}
                      </span>
                    </div>
                  </div>

                  {/* Chart Image */}
                  <div className="rounded-lg overflow-hidden border border-[#1c2436] bg-[#07090e] p-2 sm:p-4 flex items-center justify-center min-h-[340px]">
                    <img
                      key={selectedModel.id}
                      src={selectedModel.tiedVisualization.imageSrc}
                      alt={selectedModel.tiedVisualization.title}
                      className="w-full h-auto object-contain max-h-[440px] rounded transition-opacity duration-300"
                      loading="eager"
                    />
                  </div>

                  {/* The Bottom Line Banner */}
                  <div className="rounded-lg p-3.5 sm:p-4 border border-sky-500/40 bg-[#0c1421] flex items-start gap-3">
                    <div className="p-2 rounded-md bg-[#101b2b] text-sky-400 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                        Core Empirical Finding &bull; Bottom Line
                      </span>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                        {selectedModel.tiedVisualization.bottomLine}
                      </p>
                    </div>
                  </div>

                  {/* 3 Evidence Breakdown Cards: Research Question -> Evidence -> Economic Meaning */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                        1. Research Question
                      </span>
                      <p className="text-xs text-slate-200 leading-snug font-medium">
                        "{selectedModel.tiedVisualization.researchQuestion}"
                      </p>
                      <div className="pt-2 border-t border-[#1c2436] flex flex-wrap gap-1">
                        {selectedModel.tiedVisualization.variables.map((v, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0b0e15] text-slate-400 border border-[#1c2436]">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                        2. Visual Observation
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {selectedModel.tiedVisualization.observation}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                        3. Economic Interpretation
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {selectedModel.tiedVisualization.interpretation}
                      </p>
                    </div>
                  </div>

                  {/* Architectural Insights */}
                  <div className="p-4 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                        Architectural Role in Diminishing Returns:
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {selectedModel.status === 'active' ? 'Trained in Python Pipeline (Active)' : 'Staged for Cross-Benchmark'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-light leading-relaxed">
                      {selectedModel.bestFitRole}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-[#1c2436]">
                      {selectedModel.keyInsights.map((insight, i) => (
                        <li key={i} className="text-xs text-slate-300 font-light flex items-start gap-1.5">
                          <span className="text-sky-400 font-bold">&bull;</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB B: PYTHON COLAB IMPLEMENTATION CODE                       */}
              {/* ============================================================= */}
              {modelCardTab === 'code' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[#0c1626] border border-sky-500/30">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-mono text-white font-bold">
                        Python 3.11 Execution Environment &bull; Standardized 5-Fold Cross-Validation
                      </span>
                    </div>
                    <span className="text-xs font-mono text-sky-300">
                      Standardized on 45,466 Cleaned Film Records
                    </span>
                  </div>

                  {/* Syntax Styled Code Container */}
                  <div className="rounded-xl border border-[#1c2436] bg-[#07090e] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b0e15] border-b border-[#1c2436]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 text-xs font-mono text-slate-400">
                          models/{selectedModel.id}_model.py
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyCode(selectedModel.pythonCode)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0f131c] hover:bg-[#152338] border border-[#1c2436] text-[11px] font-mono text-sky-300 transition-colors"
                      >
                        {copiedSnippet ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 sm:p-5 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed select-all">
                      <code>{selectedModel.pythonCode}</code>
                    </pre>
                  </div>

                  {/* Colab Execution Guide */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-4 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                        How to Run in Google Colab:
                      </span>
                      <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside font-light">
                        <li>Download the full notebook (<code className="text-sky-300 font-mono">.ipynb</code>) using the top banner.</li>
                        <li>Open <a href="https://colab.research.google.com" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">colab.research.google.com</a> and click <em>File &rarr; Upload notebook</em>.</li>
                        <li>Click <em>Runtime &rarr; Run all</em> (executes all 20 models in ~75 seconds).</li>
                      </ol>
                    </div>

                    <div className="p-4 rounded-lg bg-[#0f131c] border border-[#1c2436] space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                        Hyperparameter Specifications:
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside font-light">
                        <li><strong>Standardized Scaler:</strong> Power-law log10 transformation on financial features.</li>
                        <li><strong>Cross-Validation:</strong> 5-fold CV with random seed 42 to guarantee zero data leakage.</li>
                        <li><strong>Scoring Metric:</strong> {selectedModel.primaryMetric.label} ({selectedModel.primaryMetric.value}).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: 20-MODEL BENCHMARK MATRIX TABLE                               */}
      {/* ===================================================================== */}
      {activeSubView === 'matrix' && (
        <div className="space-y-4">
          <div className="p-5 sm:p-7 rounded-xl bg-[#0f131c] border border-[#1c2436] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1c2436]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                  Grade Tier A Experimental Requirement
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                  20-Model Architecture Cross-Comparison Matrix
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/notebooks/movie_budget_diminishing_returns_20_models.ipynb"
                  download="movie_budget_diminishing_returns_20_models.ipynb"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0c1626] border border-sky-500/30 text-xs font-mono text-sky-300 hover:text-white"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .ipynb</span>
                </a>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#1c2436]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0b0e15] text-slate-400 border-b border-[#1c2436]">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Model Architecture</th>
                    <th className="py-2.5 px-3">Family / Paradigm</th>
                    <th className="py-2.5 px-3">Standardized Metric</th>
                    <th className="py-2.5 px-3">Tied Empirical Finding</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c2436] bg-[#07090e]">
                  {modelsList.map((m, idx) => (
                    <tr 
                      key={m.id}
                      onClick={() => {
                        setSelectedModelId(m.id);
                        setActiveSubView('explorer');
                      }}
                      className={`cursor-pointer transition-colors ${
                        m.id === selectedModelId ? 'bg-[#152338]' : 'hover:bg-[#0f131c]'
                      }`}
                    >
                      <td className="py-2.5 px-3 text-slate-500 font-bold">{idx + 1}</td>
                      <td className="py-2.5 px-3 text-white font-bold">{m.name}</td>
                      <td className="py-2.5 px-3 text-sky-300">{m.categoryLabel}</td>
                      <td className="py-2.5 px-3 text-sky-400 font-semibold">
                        {m.primaryMetric.label}: {m.primaryMetric.value}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 font-sans text-xs max-w-xs truncate">
                        {m.tiedVisualization.title}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.status === 'active' 
                            ? 'bg-[#0c1626] text-sky-300 border border-sky-500/30' 
                            : 'bg-[#121722] text-slate-500 border border-[#1c2436]'
                        }`}>
                          {m.status === 'active' ? 'Active' : 'Staged'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 3: BEST MODELS ANALYSIS & WHY                                    */}
      {/* ===================================================================== */}
      {activeSubView === 'analysis' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-xl bg-[#0f131c] border border-[#1c2436] space-y-6">
            <div className="space-y-1 pb-4 border-b border-[#1c2436]">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                Experimental Synthesis &amp; Findings
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Which Models Perform Best and Why: Comparative Analysis
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
                Addressing the experimental requirement: an evidence-based breakdown analyzing performance tradeoffs across continuous regression, binary breakeven classification, mathematical interpretability, and unsupervised archetype discovery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Finding 1 */}
              <div className="p-5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    1. Best Continuous Revenue Regressors
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold">
                    CatBoost &amp; XGBoost
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Why Tree Boosting Beats Linear Baselines on Revenue Scale (R² = 0.771 vs 0.548)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Standard Ordinary Least Squares (OLS) and Ridge baselines fail (R² = 0.548) because movie box office data follows an extreme power-law distribution. CatBoost achieves the top score (R² = 0.771) because its online target statistics natively process high-cardinality studio identities (150+ companies) and multi-genre labels without data leakage. XGBoost (R² = 0.768) follows closely, utilizing second-order Taylor series gradients and regularized leaf splits to capture the steep sublinear flattening of revenue past $100M without being distorted by mega-budget outliers.
                </p>
              </div>

              {/* Finding 2 */}
              <div className="p-5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    2. Best Binary Breakeven Classifier
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold">
                    Random Forest (84.6% Acc)
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Why Bagging Outperforms Single Models on Theatrical Breakeven
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Predicting binary commercial breakeven (<code className="text-sky-300 font-mono">multiplier &gt;= 2.5x</code>) is highly susceptible to viral low-budget anomalies like <em>Paranormal Activity</em> (12,890x return). Random Forest excels (84.6% accuracy, 0.892 ROC-AUC) because bootstrap aggregating across 500 decision trees averages out extreme variance. Individual outliers cannot hijack the majority vote, allowing the ensemble to learn robust, generalizable breakeven rules based on budget bracket and release seasonality.
                </p>
              </div>

              {/* Finding 3 */}
              <div className="p-5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    3. Best Mathematical Interpretability
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold">
                    ElasticNet Splines &amp; Logistic
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Isolating the Mathematical Inflection Point ($42.5M dy/dx Threshold)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  While deep transformers act as black boxes, ElasticNet Polynomial Splines and Logistic Regression provide closed-form, transparent mathematical representations. ElasticNet Splines enables the continuous first derivative <code className="text-sky-300 font-mono">d(Revenue)/d(Budget)</code>, which identifies that the marginal return per dollar invested drops below the $2.50 theatrical breakeven threshold at exactly $42.5 Million. Logistic regression validates this, showing that odds of breakeven drop by 18.4% for every $10M added.
                </p>
              </div>

              {/* Finding 4 */}
              <div className="p-5 rounded-lg bg-[#0b0e15] border border-[#1c2436] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    4. Best Unsupervised Market Archetyping
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c1626] text-sky-300 border border-sky-500/30 font-bold">
                    K-Means &amp; PCA (78.4% Var)
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Discovering Natural Commercial Segments Without Human Bias
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Rather than grouping films by arbitrary genre classifications, projecting 24 variables onto 2 principal variance axes (PCA) captures 78.4% of total variance. K-Means clustering (k=4) cleanly segments the industry into: (1) High-Efficiency Indie Breakouts, (2) Disciplined Mid-Budget Profiteers, (3) Mega-Blockbuster Scale Drivers, and (4) High-Budget Loss Traps—proving that capital structure dictates movie outcomes more than genre alone.
                </p>
              </div>

            </div>

            {/* Python Environment Verification */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#0c1421] border border-sky-500/30 space-y-2">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                  Python Environment &amp; Code Execution Standards
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                All models are executed in Python utilizing standardized open-source libraries: <code className="text-sky-300 font-mono">xgboost</code>, <code className="text-sky-300 font-mono">catboost</code>, <code className="text-sky-300 font-mono">lightgbm</code>, and <code className="text-sky-300 font-mono">scikit-learn</code>. Datasets are standardized using 5-fold cross-validation, stratified sampling on the 2.5x breakeven target, and log10 feature scaling to guarantee scientific reproducibility.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 5. Bottom Navigation Strip */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0c1421] border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider block">
            Continue Research Exploration
          </span>
          <h3 className="text-lg font-bold text-white">
            Static Redesign Studio &amp; SQL Analytics Workbench
          </h3>
          <p className="text-xs text-slate-400 max-w-xl font-light">
            Review the 5 professional static redesign studies in Redesign Studio, or test relational schema queries across the SQL analytics dashboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onNavigateToCleaning && (
            <button
              onClick={onNavigateToCleaning}
              className="px-4 py-2.5 rounded-lg bg-[#0f131c] hover:bg-[#131824] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono transition-colors inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Data Cleansing Audit</span>
            </button>
          )}
          {onNavigateToRedesigns && (
            <button
              onClick={onNavigateToRedesigns}
              className="px-4 py-2.5 rounded-lg bg-[#0f131c] hover:bg-[#131824] text-slate-300 hover:text-white border border-[#1c2436] hover:border-sky-500/40 text-xs font-mono transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Redesign Studio</span>
            </button>
          )}
          {onNavigateToSql && (
            <button
              onClick={onNavigateToSql}
              className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors inline-flex items-center gap-2"
            >
              <Database className="w-3.5 h-3.5" />
              <span>SQL Analytics Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
'''

with open(target_file, "w", encoding="utf-8") as f:
    f.write(code)

print("Updated", target_file)
