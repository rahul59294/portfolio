'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Database,
  Sparkles,
  CheckCircle2,
  BarChart3,
  Brain,
  AlertTriangle,
  FileText,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine,
  Cell,
  PieChart,
  Pie
} from 'recharts';

interface ProjectDetails {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  metrics: { value: string; label: string }[];
  tools: string[];
  overview: string;
  problemStatement: string[];
  chartType: 'bar' | 'line' | 'area' | 'horizontal-bar' | 'sales-bar';
  chartData: any[];
  chartConfig: {
    dataKey1: string;
    label1: string;
    dataKey2?: string;
    label2?: string;
    xAxisKey: string;
  };
  findings: { numberOrSymbol: string; title: string; explanation: string }[];
  skills: string[];
}

const projectDb: Record<string, ProjectDetails> = {
  datadrishti: {
    slug: 'datadrishti',
    title: 'DataDrishti',
    category: 'AI-POWERED PLATFORM',
    tagline: 'An end-to-end analytics platform that automates the entire data lifecycle — from raw ingestion to AI-generated insights.',
    metrics: [
      { value: '10×', label: 'Faster than manual analysis' },
      { value: '9', label: 'Core platform modules' },
      { value: '50K+', label: 'Records processable' },
      { value: '1', label: 'Unified platform' }
    ],
    tools: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'LLM API', 'NumPy', 'PyOD', 'Statsmodels'],
    overview: 'DataDrishti was built to solve a fundamental challenge in analytics: analysts spend the majority of their time on repetitive tasks — cleaning, validating, testing, reporting — rather than on generating actual insights. DataDrishti automates this entire lifecycle within a single intelligent platform, enabling anyone to extract insights from data regardless of technical expertise.',
    problemStatement: [
      'Organizations waste 60–80% of analytics time on data preparation',
      'Multiple disconnected tools slow down insight generation',
      'Non-technical stakeholders cannot access advanced analytics',
      'Report generation is manual, slow, and inconsistent'
    ],
    chartType: 'bar',
    chartData: [],
    chartConfig: { xAxisKey: '', dataKey1: '', label1: '' },
    findings: [
      { numberOrSymbol: '10×', title: 'Faster insight generation', explanation: 'Automated workflows cut analysis time from hours to minutes across all major tasks.' },
      { numberOrSymbol: '9', title: 'Integrated modules', explanation: 'From ingestion to AI reporting — all in a single platform with no context switching.' },
      { numberOrSymbol: '100%', title: 'Workflow automation', explanation: 'Every major analytics task is automated — cleaning, validation, testing, visualization, reporting.' },
      { numberOrSymbol: 'Any user', title: 'Low-code access', explanation: 'Non-technical users can run advanced statistical and ML workflows without writing code.' }
    ],
    skills: ['Product Development', 'Data Engineering', 'Software Architecture', 'Machine Learning', 'Statistical Computing', 'AI Integration', 'Dashboard Development', 'Workflow Automation', 'UX Design', 'LLM Integration']
  },
  'ipl-simulator': {
    slug: 'ipl-simulator',
    title: 'IPL Auction & Match Simulator',
    category: 'STATISTICAL MODELLING',
    tagline: 'A regression-based player valuation model and Monte Carlo match simulation engine built on 5 seasons of IPL data.',
    metrics: [
      { value: 'R² 0.685', label: 'Auction model accuracy' },
      { value: '₹3.35Cr', label: 'Price RMSE' },
      { value: '600+', label: 'Match simulations run' },
      { value: '5', label: 'IPL seasons analysed' }
    ],
    tools: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Monte Carlo', 'Matplotlib', 'Linear Regression', 'Feature Engineering'],
    overview: 'IPL franchises invest hundreds of crores during player auctions — yet valuation often relies on reputation and intuition rather than data. This project built a unified framework combining 4 composite performance metrics, temporal weighting, regression-based auction price prediction, and 600+ iteration Monte Carlo match simulation to answer the fundamental question: are franchises paying fair prices for players?',
    problemStatement: [
      'Player auction prices influenced by brand value, not just performance',
      'No objective framework to identify undervalued or overvalued players',
      'Match predictions based on intuition rather than statistical modelling',
      'Franchises lack data-driven tools for strategic squad planning'
    ],
    chartType: 'area',
    chartData: [],
    chartConfig: { xAxisKey: '', dataKey1: '', label1: '' },
    findings: [
      { numberOrSymbol: 'R² 0.685', title: 'Auction model performance', explanation: 'The regression model explained 68.5% of auction price variation using only performance metrics.' },
      { numberOrSymbol: '₹8Cr+', title: 'Cummins overvaluation', explanation: 'Pat Cummins was predicted at ~₹16Cr but sold for ₹24Cr — an ₹8Cr brand premium.' },
      { numberOrSymbol: '56.2%', title: 'CSK win probability', explanation: '600 simulations gave CSK a 56.2% win chance against MI with average scores of 207 vs 212 runs.' },
      { numberOrSymbol: '3', title: 'Undervalued players found', explanation: 'Faf du Plessis, Sam Curran, and Prabhsimran Singh were statistically underpriced by ₹2Cr+ each.' }
    ],
    skills: ['Sports Analytics', 'Regression Modelling', 'Monte Carlo Simulation', 'Predictive Analytics', 'Feature Engineering', 'Valuation Modelling', 'Probability Modelling', 'Data Visualization', 'Scenario Analysis']
  },
  'fantasy-cricket': {
    slug: 'fantasy-cricket',
    title: 'Fantasy Cricket XI Predictor',
    category: 'DATA ENGINEERING',
    tagline: 'A data-driven player selection engine integrating 20+ IPL datasets to automate optimal Fantasy XI generation.',
    metrics: [
      { value: '20+', label: 'Datasets integrated' },
      { value: '5', label: 'IPL seasons covered' },
      { value: '3', label: 'Strategy modes' },
      { value: '34', label: 'Data files merged' }
    ],
    tools: ['Python', 'Pandas', 'NumPy', 'Streamlit', 'Matplotlib', 'Feature Engineering', 'Recommendation System'],
    overview: 'Fantasy cricket users typically rely on intuition when selecting their teams. This project replaced guesswork with a mathematical scoring framework built on 5 seasons of IPL data across 20+ integrated datasets — evaluating every player on three dimensions: fantasy performance, consistency, and historical legacy — then automatically generating an optimized XI based on user-chosen strategy.',
    problemStatement: [
      'Evaluating hundreds of players manually is time-consuming and biased',
      'Single-metric selection ignores consistency and historical trends',
      'No automated framework for strategy-based team building',
      'Captain/vice-captain selection has outsized impact on fantasy points'
    ],
    chartType: 'line',
    chartData: [],
    chartConfig: { xAxisKey: '', dataKey1: '', label1: '' },
    findings: [
      { numberOrSymbol: '20+', title: 'Datasets unified', explanation: '34 separate data files spanning batting, bowling, fielding, partnerships, and fantasy scores merged into one system.' },
      { numberOrSymbol: '3', title: 'Strategy modes', explanation: 'Balanced, High-Scorers, and Consistent strategies shift weight distribution, generating different optimal XIs.' },
      { numberOrSymbol: '2×', title: 'Captain multiplier', explanation: 'Automated captain selection using composite scoring maximizes the 2× points multiplier systematically.' },
      { numberOrSymbol: 'Seconds', title: 'Decision time', explanation: 'What took hours of manual research now happens automatically in seconds with a Streamlit interface.' }
    ],
    skills: ['Sports Analytics', 'Data Engineering', 'Feature Engineering', 'Recommendation Systems', 'Streamlit Development', 'Data Visualization', 'Statistical Scoring', 'Decision Support Systems', 'Product Development']
  },
  'crop-profit': {
    slug: 'crop-profit',
    title: 'Agricultural Profit Optimiser',
    category: 'ML + DESIGN OF EXPERIMENTS',
    tagline: 'A Random Forest model and DoE simulation framework that identified the profit-maximising farming strategy across 20 years of Punjab climate data.',
    metrics: [
      { value: 'R² 0.78', label: 'Model accuracy' },
      { value: '20 Years', label: 'Climate data used' },
      { value: '22 Dist', label: 'Punjab coverage' },
      { value: '₹1,36,825', label: 'Peak profit / Ha' }
    ],
    tools: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'NumPy', 'Matplotlib', 'Streamlit', 'Design of Experiments', 'NASA POWER'],
    overview: 'Farmers in Punjab invest heavily in fertilizers and irrigation — but more input does not always mean more profit. Using 20 years of daily NASA climate data across 22 Punjab districts, this project trained a Random Forest model to predict wheat and rice yields, then used Design of Experiments to simulate every combination of nitrogen and irrigation levels — revealing that the most profitable strategy was NOT the highest-yield strategy.',
    problemStatement: [
      'Farmers cannot predict how weather will affect their seasonal yield',
      'Over-investment in fertilizers reduces net profit due to diminishing returns',
      'Agricultural planning is based on tradition rather than data analysis',
      'No decision-support tool exists for input optimization at district level'
    ],
    chartType: 'horizontal-bar',
    chartData: [],
    chartConfig: { xAxisKey: '', dataKey1: '', label1: '' },
    findings: [
      { numberOrSymbol: 'R² 0.78', title: 'Predictive accuracy', explanation: 'The Random Forest model explained 78% of historical wheat and rice yield variation using engineered climate features.' },
      { numberOrSymbol: '₹1,36,825', title: 'Peak profit per hectare', explanation: 'Optimal strategy: 150kg/ha Nitrogen + 500mm Irrigation — not the maximum, but the most efficient combination.' },
      { numberOrSymbol: '↓ Profit', title: 'Diminishing returns proven', explanation: 'Pushing Nitrogen to 200kg/ha increased yield slightly but cut profit by ₹12,825/ha due to input costs.' },
      { numberOrSymbol: 'Min temp', title: 'Top yield driver', explanation: 'Daily minimum temperature emerged as the single strongest predictor of crop yield — above rainfall and heat stress.' }
    ],
    skills: ['Machine Learning', 'Random Forest', 'Feature Engineering', 'Design of Experiments', 'Agricultural Analytics', 'Multivariate Analysis', 'Simulation Modelling', 'Optimization', 'Predictive Analytics', 'Dashboard Development', 'Streamlit']
  },
  'gujarat-scheme': {
    slug: 'gujarat-scheme',
    title: 'Livestock Scheme Evaluation',
    category: 'GOVERNMENT EVALUATION',
    tagline: 'A policy impact evaluation for the Government of Gujarat — measuring income impact, scheme effectiveness, and operational gaps across 12 districts and 655+ stakeholders.',
    metrics: [
      { value: '655+', label: 'Stakeholders surveyed' },
      { value: '28.4%', label: 'Average income increase' },
      { value: '12', label: 'Districts covered' },
      { value: 'p < 0.05', label: 'Statistical significance' }
    ],
    tools: ['R', 'Power BI', 'Excel', 'Mann-Whitney U Test', 'Survey Sampling', 'Impact Evaluation', 'Hypothesis Testing'],
    overview: 'The Government of Gujarat launched a scheme to modernize livestock keeping through training and motivational tours. As part of the Directorate of Evaluation, I was responsible for designing the statistical sampling framework, conducting analysis in R, developing Power BI dashboards, and generating policy recommendations — covering 482 beneficiaries, 98 non-beneficiaries, 27 trainers, 36 livestock inspectors, and 12 deputy directors across 12 Gujarat districts.',
    problemStatement: [
      'Was the scheme actually improving livestock keeper incomes?',
      'Were beneficiaries performing better than non-beneficiaries?',
      'What were the scheme\'s operational gaps and barriers to access?',
      'Which communication channels were most effective for outreach?',
      'What changes would improve scheme outcomes?'
    ],
    chartType: 'bar',
    chartData: [],
    chartConfig: { xAxisKey: '', dataKey1: '', label1: '' },
    findings: [
      { numberOrSymbol: '₹8,425', title: 'Monthly income increase', explanation: 'Beneficiaries gained ₹8,425/month on average — a statistically significant 28.4% rise confirmed by Mann-Whitney U test (p < 0.05).' },
      { numberOrSymbol: '3.1×', title: 'Income differential', explanation: 'Beneficiaries earned 3.1 times more per month than surveyed non-beneficiaries (₹29,694 vs ₹9,510).' },
      { numberOrSymbol: '57.8%', title: 'Key channel identified', explanation: 'Livestock Inspectors were the dominant awareness channel — making them the highest-leverage point for outreach expansion.' },
      { numberOrSymbol: '10.51%', title: 'Critical treatment gap', explanation: 'Despite 99.37% receiving veterinary information, only 10.51% of diagnosed animals were treated — a major implementation failure.' }
    ],
    skills: ['Statistical Analysis', 'Survey Sampling', 'Impact Evaluation', 'Public Policy Analytics', 'Dashboard Development', 'Power BI', 'R', 'Hypothesis Testing', 'Mann-Whitney U Test', 'Research Methodology', 'Evidence-Based Policy', 'Stakeholder Analysis']
  },
  'sales-dashboard': {
    slug: 'sales-dashboard',
    title: 'Automated Real-Time Sales Dashboard',
    category: 'Conference Paper',
    tagline: 'Power BI dashboard pipeline integrating multi-source transactional databases.',
    metrics: [
      { value: '200K+', label: 'Records Processed' },
      { value: '6', label: 'SQL Databases' },
      { value: '1', label: 'Conference Paper' },
      { value: '45ms', label: 'Query Latency' }
    ],
    tools: ['Power BI', 'SQL Server', 'ETL Pipelines', 'DAX Queries', 'Data Architecture'],
    overview: 'Presented at Sharda University International Conference 2025, this project integrates SQL Server ETL pipelines with a Power BI interface. The dashboard handles 200,000+ transactional rows across 6 regional databases with minimal query latency.',
    problemStatement: [
      'How to unify fragmented sales databases across 6 regional subsidiaries?',
      'How to minimize dashboard latency while dealing with 200,000+ records?',
      'How to represent nested transaction hierarchies cleanly for C-level executives?'
    ],
    chartType: 'sales-bar',
    chartData: [
      { query: 'Q1: Summary', before: 450, after: 45 },
      { query: 'Q2: Products', before: 620, after: 58 },
      { query: 'Q3: Regional', before: 890, after: 82 },
      { query: 'Q4: Temporal', before: 310, after: 31 },
    ],
    chartConfig: {
      xAxisKey: 'query',
      dataKey1: 'before',
      label1: 'Before Indexing & ETL (ms)',
      dataKey2: 'after',
      label2: 'After Indexing & ETL (ms)'
    },
    findings: [
      { numberOrSymbol: '10x', title: 'Latency Reduction', explanation: 'Index optimization and incremental refreshes cut dashboard query times by 90%.' },
      { numberOrSymbol: '6 to 1', title: 'Data Unification', explanation: 'Aggregated 6 separate relational databases into one normalized data warehouse.' },
      { numberOrSymbol: 'DAX', title: 'Advanced Modeling', explanation: 'Custom time intelligence DAX calculations enable real-time year-over-year growth analytics.' },
      { numberOrSymbol: '2025', title: 'Conference Presented', explanation: 'Presented design pattern and data pipelines at Sharda University International Conference.' }
    ],
    skills: ['SQL Database ETL', 'Power BI DAX', 'Relational Normalization', 'C-Level Reporting', 'Performance Optimization']
  }
};

// DataDrishti Workflow Steps Configuration
const datadrishtiWorkflow = [
  { name: 'Data Ingestion', icon: Database },
  { name: 'Auto Cleaning', icon: Sparkles },
  { name: 'Validation', icon: CheckCircle2 },
  { name: 'Statistical Analysis', icon: BarChart3 },
  { name: 'ML Engine', icon: Brain },
  { name: 'Anomaly Detection', icon: AlertTriangle },
  { name: 'Visualization', icon: TrendingUp },
  { name: 'AI Report Gen', icon: FileText }
];

// DataDrishti Chart 2 Data
const timeSavedData = [
  { task: "Data Cleaning", manual: 180, automated: 12, reduction: '93.3% reduction' },
  { task: "Validation", manual: 90, automated: 5, reduction: '94.4% reduction' },
  { task: "Statistical Testing", manual: 120, automated: 8, reduction: '93.3% reduction' },
  { task: "Report Writing", manual: 240, automated: 15, reduction: '93.8% reduction' },
  { task: "Visualization", manual: 60, automated: 4, reduction: '93.3% reduction' }
];

// DataDrishti Chart 3 Data
const radarData = [
  { subject: 'Data Cleaning', score: 90 },
  { subject: 'Statistical Analysis', score: 90 },
  { subject: 'ML & Prediction', score: 90 },
  { subject: 'Anomaly Detection', score: 90 },
  { subject: 'Visualization', score: 90 },
  { subject: 'AI Reporting', score: 90 },
  { subject: 'Conversational Analytics', score: 90 }
];

// IPL Chart 1 Actual vs Predicted Scatter Data
const scatterData = [
  { actual: 16, predicted: 13, name: "Kohli" },
  { actual: 24, predicted: 16, name: "Cummins" },
  { actual: 18, predicted: 14, name: "Arshdeep" },
  { actual: 7, predicted: 9, name: "Faf" },
  { actual: 6, predicted: 8, name: "Prabhsimran" },
  { actual: 8, predicted: 10, name: "Curran" },
  { actual: 14, predicted: 12, name: "Jadeja" },
  { actual: 11, predicted: 10, name: "Bumrah" },
  { actual: 3, predicted: 4, name: "Gaikwad" },
  { actual: 5, predicted: 5.5, name: "SKY" },
  { actual: 9, predicted: 8, name: "Ashwin" },
  { actual: 4, predicted: 5, name: "Gill" },
  { actual: 6, predicted: 7, name: "Hardik" },
  { actual: 3, predicted: 3.5, name: "Iyer" },
  { actual: 2, predicted: 2.5, name: "Shami" }
];

// IPL Chart 2 Market Efficiency Data
const marketEfficiencyData = [
  { name: "Virat Kohli", diff: 3.0 },
  { name: "Pat Cummins", diff: 8.0 },
  { name: "Arshdeep Singh", diff: 4.0 },
  { name: "Rashid Khan", diff: 2.5 },
  { name: "Faf du Plessis", diff: -2.0 },
  { name: "Prabhsimran", diff: -2.0 },
  { name: "Sam Curran", diff: -2.0 }
];

// Helper to generate bell curve coordinates
const generateBellCurve = (mean: number, stdDev: number, height: number, x: number) => {
  return height * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
};

// Generate score distribution points for Runs 170 to 250 in steps of 3
const scoreDistributionData: { runs: number; CSK: number; MI: number }[] = [];
for (let r = 170; r <= 250; r += 3) {
  scoreDistributionData.push({
    runs: r,
    CSK: parseFloat(generateBellCurve(207, 14, 80, r).toFixed(1)),
    MI: parseFloat(generateBellCurve(212, 14, 80, r).toFixed(1))
  });
}

// Fantasy Cricket Chart Data
const donutColors = ['#1C1C1E', '#00897B', '#A5D6A7'];

const balancedStrategy = [
  { name: "Fantasy Score", value: 50 },
  { name: "Consistency", value: 20 },
  { name: "Historical Legacy", value: 30 }
];

const highScorersStrategy = [
  { name: "Fantasy Score", value: 70 },
  { name: "Consistency", value: 10 },
  { name: "Historical Legacy", value: 20 }
];

const consistentStrategy = [
  { name: "Fantasy Score", value: 30 },
  { name: "Consistency", value: 50 },
  { name: "Historical Legacy", value: 20 }
];

const playerScores = [
  { name: "Virat Kohli", score: 87 },
  { name: "Jasprit Bumrah", score: 85 },
  { name: "MS Dhoni", score: 82 },
  { name: "SKY", score: 90 },
  { name: "Hardik Pandya", score: 78 },
  { name: "KL Rahul", score: 80 },
  { name: "R. Jadeja", score: 83 },
  { name: "Rohit Sharma", score: 86 }
];

const compositionData = [
  {
    name: 'Squad Roles',
    WK: 1,
    Batters: 4,
    'All-rounders': 2,
    Bowlers: 3,
    Flex: 1
  }
];

// Crop Profit Chart 2 Data
const yieldProfitData = [
  { nitrogen: 100, yield: 4200, profit: 89000 },
  { nitrogen: 125, yield: 4800, profit: 112000 },
  { nitrogen: 150, yield: 5100, profit: 136825 },
  { nitrogen: 175, yield: 5200, profit: 124000 },
  { nitrogen: 200, yield: 5250, profit: 108000 }
];

// Crop Profit Chart 3 Data
const featureImportances = [
  { feature: "Min temp (avg)", importance: 0.28 },
  { feature: "Growing Degree Days", importance: 0.22 },
  { feature: "Heat Stress Days", importance: 0.18 },
  { feature: "Rainfall total", importance: 0.14 },
  { feature: "Max temp (avg)", importance: 0.11 },
  { feature: "Temp variability", importance: 0.07 }
];

// Gujarat Scheme Chart 1 Data
const incomeImpactData = [
  { name: 'Beneficiaries', Before: 29694, After: 38119 },
  { name: 'Non-Beneficiaries', 'Non-Beneficiary': 9510 }
];

// Gujarat Scheme Chart 2 Data
const awarenessData = [
  { source: "Livestock Inspector", pct: 57.8 },
  { source: "Friends / Neighbours", pct: 19.2 },
  { source: "Village Panchayat", pct: 12.4 },
  { source: "Government Notice", pct: 6.8 },
  { source: "Other", pct: 3.8 }
];

const projectsOrder = [
  'datadrishti',
  'ipl-simulator',
  'fantasy-cricket',
  'crop-profit',
  'gujarat-scheme',
  'sales-dashboard'
];

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const project = projectDb[slug] || projectDb.datadrishti;

  // Resolve next/prev project for Section 6
  const currentIndex = projectsOrder.indexOf(project.slug);
  const nextProjectSlug = projectsOrder[(currentIndex + 1) % projectsOrder.length];
  const prevProjectSlug = projectsOrder[(currentIndex - 1 + projectsOrder.length) % projectsOrder.length];
  const nextProject = projectDb[nextProjectSlug];
  const prevProject = projectDb[prevProjectSlug];

  const [mounted, setMounted] = useState(false);
  const [chartInView, setChartInView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Custom Tooltip component for standard Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[rgba(0,0,0,0.08)] p-3 rounded-lg shadow-md font-mono text-xs text-[#1C1C1E] z-50">
          <p className="font-semibold mb-1">{label}</p>
          {payload.map((item: any, idx: number) => (
            <p key={idx} style={{ color: item.color || '#00897B' }}>
              {item.name}: {item.value} {item.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom Donut Tooltip
  const DonutTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-[rgba(0,0,0,0.08)] p-2 rounded-md shadow-xs font-mono text-[10px] text-[#1C1C1E] z-50">
          <p className="font-semibold">{data.name}: {data.value}%</p>
        </div>
      );
    }
    return null;
  };

  // Custom Composition Tooltip
  const CompositionTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[rgba(0,0,0,0.08)] p-3 rounded-lg shadow-md font-mono text-xs text-[#1C1C1E] z-50">
          <p className="font-semibold mb-1">Squad Roles (Total 11 Players)</p>
          {payload.map((item: any, idx: number) => (
            <p key={idx} style={{ color: item.color || '#00897B' }}>
              {item.name}: {item.value} player{item.value > 1 ? 's' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom Scatter Tooltip
  const ScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-[rgba(0,0,0,0.08)] p-3 rounded-lg shadow-md font-mono text-xs text-[#1C1C1E] z-50">
          <p className="font-semibold mb-1 text-sm">{data.name}</p>
          <p>Actual Price: ₹{data.actual}Cr</p>
          <p>Predicted Price: ₹{data.predicted}Cr</p>
          <p className="mt-1.5 font-semibold text-[11px]" style={{ color: data.actual > data.predicted ? '#E53935' : '#00897B' }}>
            {data.actual > data.predicted ? 'Overvalued (Brand Premium)' : 'Undervalued (Model Bargain)'}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom Market Efficiency Tooltip
  const MarketEfficiencyTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-[rgba(0,0,0,0.08)] p-3 rounded-lg shadow-md font-mono text-xs text-[#1C1C1E] z-50">
          <p className="font-semibold mb-1 text-sm">{data.name}</p>
          <p>Price Gap: {data.diff > 0 ? `+₹${data.diff}Cr (Overvalued)` : `-₹${Math.abs(data.diff)}Cr (Undervalued)`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom Score Distribution Tooltip
  const ScoreDistributionTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[rgba(0,0,0,0.08)] p-3 rounded-lg shadow-md font-mono text-xs text-[#1C1C1E] z-50">
          <p className="font-semibold mb-1">{label} Runs</p>
          {payload.map((item: any, idx: number) => (
            <p key={idx} style={{ color: item.stroke }}>
              {item.name}: {item.value}% frequency
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom Yield vs Profit Tooltip
  const YieldProfitTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-[rgba(0,0,0,0.08)] p-3 rounded-lg shadow-md font-mono text-xs text-[#1C1C1E] z-50">
          <p className="font-semibold mb-1 text-sm">{data.nitrogen} kg/ha Nitrogen</p>
          <p className="text-[#1C1C1E]">Yield: {data.yield} kg/ha</p>
          <p className="text-[#00897B] font-semibold">Net Profit: ₹{data.profit.toLocaleString()}/ha</p>
        </div>
      );
    }
    return null;
  };

  // Custom Gujarat Scheme Income Impact Tooltip
  const IncomeImpactTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[rgba(0,0,0,0.08)] p-3 rounded-lg shadow-md font-mono text-xs text-[#1C1C1E] z-50">
          <p className="font-semibold mb-1 text-sm">{payload[0].payload.name}</p>
          {payload.filter((p: any) => p.value !== undefined && p.value !== null).map((p: any, idx: number) => (
            <p key={idx} style={{ color: p.color || '#1C1C1E' }}>
              {p.name}: ₹{p.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom Gujarat Scheme Awareness Channel Tooltip
  const AwarenessChannelTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-[rgba(0,0,0,0.08)] p-3 rounded-lg shadow-md font-mono text-xs text-[#1C1C1E] z-50">
          <p className="font-semibold mb-1 text-sm">{data.source}</p>
          <p className="text-[#00897B]">Share: {data.pct}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="min-h-screen w-full flex flex-col bg-transparent pt-16">
      
      {/* SECTION 1 — PAGE HERO (background #F4F4F2) */}
      <section className="w-full bg-[#F4F4F2] border-b border-[rgba(0,0,0,0.06)] py-16 sm:py-20 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-1.5 text-[13px] text-[#00897B] font-semibold font-mono hover:underline mb-8 cursor-pointer group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>All Projects</span>
          </Link>

          {/* Category pill */}
          <div>
            <span className="px-3 py-1.5 rounded-full bg-[#00897B]/10 text-[#00897B] border border-[#00897B]/20 text-[10px] font-mono font-semibold tracking-wide uppercase inline-block mb-4">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-headings font-bold text-4xl sm:text-[52px] text-[#1C1C1E] leading-tight max-w-[700px] mb-4">
            {project.title}
          </h1>

          {/* Tagline */}
          <p className="font-body text-base sm:text-[18px] text-[#666666] leading-relaxed max-w-2xl mb-10">
            {project.tagline}
          </p>

          {/* Key Metric Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mb-10">
            {project.metrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[10px] p-5 flex flex-col justify-center shadow-xs"
              >
                <span className="font-mono text-[28px] font-bold text-[#1C1C1E] leading-none mb-2">
                  {metric.value}
                </span>
                <span className="text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tool / tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tag) => (
              <span 
                key={tag}
                className="px-2.5 py-1 rounded bg-white border border-[rgba(0,0,0,0.08)] text-[#666666] text-[11px] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — OVERVIEW (white background, two columns) */}
      <section className="w-full bg-white py-20 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column - Overview */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-headings font-bold text-[28px] text-[#1C1C1E]">
                Overview
              </h2>
              <p className="font-body text-[15px] text-[#555555] leading-[1.8] font-normal font-sans">
                {project.overview}
              </p>
            </div>

            {/* Right Column - Problem Statement */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-headings font-bold text-[28px] text-[#1C1C1E]">
                Problem Statement
              </h2>
              <ul className="space-y-4">
                {project.problemStatement.map((problem, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#00897B] font-bold font-mono select-none mt-0.5">—</span>
                    <span className="font-body text-[15px] text-[#555555] leading-[1.6] font-sans">
                      {problem}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — INTERACTIVE DATA SECTION (background #F4F4F2) */}
      <section className="w-full bg-[#F4F4F2] border-y border-[rgba(0,0,0,0.06)] py-20 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headings font-bold text-[32px] text-[#1C1C1E] mb-10 text-center sm:text-left">
            Data & Analysis
          </h2>

          {project.slug === 'datadrishti' ? (
            /* Custom DataDrishti charts layout */
            <div className="space-y-8">
              
              {/* CHART 1: Platform Workflow Step Flow Diagram */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
              >
                <h3 className="text-lg font-bold text-[#1C1C1E] mb-2 font-headings">
                  Platform Workflow
                </h3>
                <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Sequential pipeline processes</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center justify-between w-full">
                  {datadrishtiWorkflow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
                        className="bg-white border border-[#00897B] rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-xs h-28 w-full relative hover:bg-[#E8F5E9]/20 transition-colors duration-300"
                      >
                        <step.icon className="h-6 w-6 text-[#00897B]" />
                        <span className="text-[12px] font-bold text-[#1C1C1E] mt-2.5 leading-tight">
                          {step.name}
                        </span>
                        
                        {/* Connecting arrows inside layout */}
                        {idx < datadrishtiWorkflow.length - 1 && (
                          <div className="hidden lg:block absolute -right-3 text-[#00897B] font-bold text-lg z-20 pointer-events-none">
                            →
                          </div>
                        )}
                      </motion.div>
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>

              {/* 2-Column Grid for Chart 2 and Chart 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CHART 2: Time Saved Per Task (Bar) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  onViewportEnter={() => setChartInView(true)}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-2 font-headings">
                    Minutes per task: Manual vs DataDrishti
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-6 uppercase">Time Saved Per Task (Minutes)</p>
                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={timeSavedData} margin={{ top: 10, right: 90, left: 15, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis type="number" stroke="#888" fontSize={11} tickLine={false} />
                          <YAxis dataKey="task" type="category" stroke="#888" fontSize={11} tickLine={false} width={110} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                          <Bar name="Manual" dataKey="manual" fill="#E0E0DC" radius={[0, 4, 4, 0]} isAnimationActive={chartInView} animationDuration={1200} />
                          <Bar name="DataDrishti" dataKey="automated" fill="#1C1C1E" radius={[0, 4, 4, 0]} isAnimationActive={chartInView} animationDuration={1200}>
                            <LabelList
                              dataKey="reduction"
                              position="right"
                              fill="#00897B"
                              className="font-mono text-[10px] font-semibold"
                              dx={5}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                </motion.div>

                {/* CHART 3: Platform Capability Coverage (Radar) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-2 font-headings">
                    Analytical capability coverage
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-6 uppercase">Capability coverage scores</p>
                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                          <PolarGrid stroke="rgba(0,0,0,0.06)" />
                          <PolarAngleAxis dataKey="subject" stroke="#666" fontSize={9} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#aaa" fontSize={8} />
                          <Radar name="DataDrishti Coverage" dataKey="score" stroke="#00897B" fill="#00897B" fillOpacity={0.15} isAnimationActive={chartInView} animationDuration={1200} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                </motion.div>

              </div>
            </div>
          ) : project.slug === 'ipl-simulator' ? (
            /* Custom IPL Auction & Match Simulator charts layout */
            <div className="space-y-8">
              
              {/* GRID 1: CHART 1 & CHART 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CHART 1: Actual vs Predicted Price Scatter */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  onViewportEnter={() => setChartInView(true)}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                    Actual vs predicted auction price (₹ Cr)
                  </h3>
                  <p className="text-[10px] font-mono text-[#E53935] mb-6 uppercase">
                    Above line = undervalued (bargain) · <span className="text-[#E53935]">Overvalued points in Red</span> · <span className="text-[#00897B]">Undervalued in Teal</span>
                  </p>
                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis type="number" dataKey="actual" name="Actual Price" stroke="#888" fontSize={11} tickLine={false} label={{ value: 'Actual Price (₹ Cr)', position: 'bottom', offset: 0, fontSize: 10 }} />
                          <YAxis type="number" dataKey="predicted" name="Predicted Price" stroke="#888" fontSize={11} tickLine={false} label={{ value: 'Predicted Price (₹ Cr)', angle: -90, position: 'left', offset: -10, fontSize: 10 }} />
                          <ZAxis type="number" range={[70, 70]} />
                          <Tooltip content={<ScatterTooltip />} />
                          <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 26, y: 26 }]} stroke="#AAAAAA" strokeDasharray="5 5" label={{ value: 'y = x Reference', fill: '#aaa', fontSize: 9, position: 'insideTopLeft' }} />
                          <Scatter name="Players" data={scatterData} isAnimationActive={chartInView}>
                            {scatterData.map((entry, index) => {
                              const isOvervalued = entry.actual > entry.predicted;
                              return <Cell key={`cell-${index}`} fill={isOvervalued ? '#E53935' : '#00897B'} className="cursor-pointer" />;
                            })}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                </motion.div>

                {/* CHART 2: Player Market Efficiency (Horizontal Bar) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                    Market efficiency: over vs undervalued players (₹ Cr)
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-6 uppercase">Positive = Overvalued (Red) · Negative = Undervalued (Teal)</p>
                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={marketEfficiencyData} margin={{ top: 10, right: 30, left: 15, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis type="number" stroke="#888" fontSize={11} tickLine={false} />
                          <YAxis dataKey="name" type="category" stroke="#888" fontSize={11} tickLine={false} width={110} />
                          <Tooltip content={<MarketEfficiencyTooltip />} />
                          <ReferenceLine x={0} stroke="#666" />
                          <Bar name="Price Gap" dataKey="diff" isAnimationActive={chartInView} animationDuration={1200}>
                            {marketEfficiencyData.map((entry, index) => {
                              const isOvervalued = entry.diff > 0;
                              return <Cell key={`cell-${index}`} fill={isOvervalued ? '#E53935' : '#00897B'} />;
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                </motion.div>

              </div>

              {/* GRID 2: CHART 3 & CHART 4 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CHART 3: CSK vs MI Score Distribution (Area) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                    Simulated score distribution — 600 iterations: CSK vs MI
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-6 uppercase">Calculated simulation densities</p>
                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={scoreDistributionData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorCskIpl" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FFC107" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#FFC107" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorMiIpl" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00897B" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#00897B" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis dataKey="runs" stroke="#888" fontSize={11} tickLine={false} />
                          <YAxis stroke="#888" fontSize={11} tickLine={false} />
                          <Tooltip content={<ScoreDistributionTooltip />} />
                          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                          <ReferenceLine x={207} stroke="#FFC107" strokeDasharray="3 3" label={{ value: 'CSK Avg: 207', fill: '#B45309', fontSize: 10, position: 'top' }} />
                          <ReferenceLine x={212} stroke="#00897B" strokeDasharray="3 3" label={{ value: 'MI Avg: 212', fill: '#0F766E', fontSize: 10, position: 'top' }} />
                          <Area name="CSK Runs Density" type="monotone" dataKey="CSK" stroke="#FFC107" strokeWidth={2} fillOpacity={1} fill="url(#colorCskIpl)" isAnimationActive={chartInView} />
                          <Area name="MI Runs Density" type="monotone" dataKey="MI" stroke="#00897B" strokeWidth={2} fillOpacity={1} fill="url(#colorMiIpl)" isAnimationActive={chartInView} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                </motion.div>

                {/* CHART 4: Win Probability Stat Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                      Win Probability
                    </h3>
                    <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Simulated heads-up outcomes</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* CSK Box */}
                      <div className="bg-[#FFF8E1] border border-[#FFC107] rounded-xl p-5 flex flex-col justify-center items-center">
                        <span className="text-[14px] font-bold text-[#92400E] mb-1">CSK</span>
                        <span className="font-mono text-4xl sm:text-[52px] font-bold text-[#F59E0B] leading-none mb-1">
                          56.2%
                        </span>
                        <span className="text-[12px] font-medium text-[#92400E]">Win probability</span>
                      </div>

                      {/* MI Box */}
                      <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl p-5 flex flex-col justify-center items-center">
                        <span className="text-[14px] font-bold text-[#1B5E20] mb-1">MI</span>
                        <span className="font-mono text-4xl sm:text-[52px] font-bold text-[#00897B] leading-none mb-1">
                          43.8%
                        </span>
                        <span className="text-[12px] font-medium text-[#1B5E20]">Win probability</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-[#AAAAAA] mt-8 text-center sm:text-left">
                    Based on 600 Monte Carlo iterations
                  </div>
                </motion.div>

              </div>

            </div>
          ) : project.slug === 'fantasy-cricket' ? (
            /* Custom Fantasy Cricket charts layout */
            <div className="space-y-8">
              
              {/* CHART 1: Donut charts side-by-side */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
              >
                <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                  Strategy weight distribution
                </h3>
                <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Donut weight allocation comparison</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">
                  
                  {/* Strategy 1: Balanced */}
                  <div className="flex flex-col items-center">
                    <div className="h-44 w-44 flex items-center justify-center">
                      {mounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={balancedStrategy} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                              {balancedStrategy.map((entry, idx) => (
                                <Cell key={`cell-${idx}`} fill={donutColors[idx % donutColors.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<DonutTooltip />} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-28 w-28 rounded-full border border-dashed border-gray-300 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[13px] font-bold text-[#1C1C1E] mt-2 block">Strategy 1 — Balanced</span>
                  </div>

                  {/* Strategy 2: High Scorers */}
                  <div className="flex flex-col items-center">
                    <div className="h-44 w-44 flex items-center justify-center">
                      {mounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={highScorersStrategy} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                              {highScorersStrategy.map((entry, idx) => (
                                <Cell key={`cell-${idx}`} fill={donutColors[idx % donutColors.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<DonutTooltip />} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-28 w-28 rounded-full border border-dashed border-gray-300 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[13px] font-bold text-[#1C1C1E] mt-2 block">Strategy 2 — High Scorers</span>
                  </div>

                  {/* Strategy 3: Consistent */}
                  <div className="flex flex-col items-center">
                    <div className="h-44 w-44 flex items-center justify-center">
                      {mounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={consistentStrategy} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                              {consistentStrategy.map((entry, idx) => (
                                <Cell key={`cell-${idx}`} fill={donutColors[idx % donutColors.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<DonutTooltip />} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-28 w-28 rounded-full border border-dashed border-gray-300 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[13px] font-bold text-[#1C1C1E] mt-2 block">Strategy 3 — Consistent</span>
                  </div>

                </div>

                {/* Donut Legend */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-6 border-t border-[rgba(0,0,0,0.06)] pt-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 bg-[#1C1C1E] rounded-xs" />
                    <span>Fantasy Score</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 bg-[#00897B] rounded-xs" />
                    <span>Consistency</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 bg-[#A5D6A7] rounded-xs" />
                    <span>Historical Legacy</span>
                  </div>
                </div>
              </motion.div>

              {/* GRID: CHART 2 & CHART 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CHART 2: Player composite scores (Vertical Bar) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  onViewportEnter={() => setChartInView(true)}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                    Player composite scores — balanced strategy
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Key squad candidate metrics</p>
                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={playerScores} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis dataKey="name" stroke="#888" fontSize={10} tickLine={false} />
                          <YAxis stroke="#888" fontSize={11} tickLine={false} domain={[50, 100]} />
                          <Tooltip content={<CustomTooltip />} />
                          <ReferenceLine y={83} stroke="#00897B" strokeDasharray="4 4" label={{ value: 'Captain threshold: 83', fill: '#00897B', fontSize: 10, position: 'top' }} />
                          <Bar name="Composite Score" dataKey="score" fill="#1C1C1E" radius={[4, 4, 0, 0]} isAnimationActive={chartInView} animationDuration={1200}>
                            {playerScores.map((entry, index) => {
                              const isTop3 = entry.score >= 86;
                              return <Cell key={`cell-${index}`} fill={isTop3 ? '#00897B' : '#1C1C1E'} />;
                            })}
                            <LabelList
                              dataKey="score"
                              position="top"
                              fill="#666"
                              className="font-mono text-[11px] font-semibold"
                              dy={-5}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                </motion.div>

                {/* CHART 3: Team Composition (Stacked Horizontal Bar) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                      Recommended XI — role composition
                    </h3>
                    <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">XI Roster Position Allocations</p>
                    {mounted ? (
                      <div className="h-[140px] w-full text-[11px] font-mono">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart layout="vertical" data={compositionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis type="number" domain={[0, 11]} stroke="#888" fontSize={11} tickLine={false} hide />
                            <YAxis dataKey="name" type="category" stroke="#888" fontSize={11} tickLine={false} hide />
                            <Tooltip content={<CompositionTooltip />} />
                            <Bar name="Wicketkeeper (WK)" dataKey="WK" stackId="a" fill="#1C1C1E" isAnimationActive={chartInView} />
                            <Bar name="Batters" dataKey="Batters" stackId="a" fill="#00897B" isAnimationActive={chartInView} />
                            <Bar name="All-rounders" dataKey="All-rounders" stackId="a" fill="#4DB6AC" isAnimationActive={chartInView} />
                            <Bar name="Bowlers" dataKey="Bowlers" stackId="a" fill="#A5D6A7" isAnimationActive={chartInView} />
                            <Bar name="Flex" dataKey="Flex" stackId="a" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth={1} isAnimationActive={chartInView} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-[140px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                    )}
                  </div>

                  {/* Legend block for stacked bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] font-mono border-t border-[rgba(0,0,0,0.06)] pt-6">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3.5 w-3.5 bg-[#1C1C1E] rounded-xs" />
                      <span>WK (1)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3.5 w-3.5 bg-[#00897B] rounded-xs" />
                      <span>Batters (4)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3.5 w-3.5 bg-[#4DB6AC] rounded-xs" />
                      <span>All-rounders (2)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3.5 w-3.5 bg-[#A5D6A7] rounded-xs" />
                      <span>Bowlers (3)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3.5 w-3.5 bg-[#E8F5E9] border border-[#A5D6A7] rounded-xs" />
                      <span>Flex (1)</span>
                    </div>
                  </div>
                </motion.div>

              </div>

            </div>
          ) : project.slug === 'crop-profit' ? (
            /* Custom Crop Profit charts layout */
            <div className="space-y-8">
              
              {/* CHART 1: Profit Heatmap (Nitrogen vs Irrigation) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs flex flex-col items-center"
              >
                <div className="w-full text-left">
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                    Profit heatmap: Nitrogen × Irrigation (₹/ha)
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Simulated treatment outcomes</p>
                </div>

                <div className="w-full max-w-md bg-white p-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-[11px] font-mono text-[#666] font-semibold -rotate-90 origin-center whitespace-nowrap -mx-10 select-none">
                      Nitrogen Input (kg/ha)
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-4 gap-2 mb-2 text-center text-xs font-mono text-[#666] select-none">
                        <div></div>
                        <div>300mm</div>
                        <div>500mm</div>
                        <div>700mm</div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-2 text-center items-center">
                        <div className="text-right text-[11px] font-mono text-[#666] pr-2 select-none">200kg</div>
                        <div className="h-14 rounded-md bg-[#80CBC4] flex items-center justify-center font-mono text-[11px] text-[#1C1C1E] hover:scale-105 transition-transform duration-200">
                          ₹1,08,000
                        </div>
                        <div className="h-14 rounded-md bg-[#4DB6AC] flex items-center justify-center font-mono text-[11px] text-[#1C1C1E] hover:scale-105 transition-transform duration-200">
                          ₹1,24,000
                        </div>
                        <div className="h-14 rounded-md bg-[#80CBC4]/80 flex items-center justify-center font-mono text-[11px] text-[#1C1C1E] hover:scale-105 transition-transform duration-200">
                          ₹1,15,000
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-2 text-center items-center">
                        <div className="text-right text-[11px] font-mono text-[#666] pr-2 select-none">150kg</div>
                        <div className="h-14 rounded-md bg-[#A5D6A7] flex items-center justify-center font-mono text-[11px] text-[#1C1C1E] hover:scale-105 transition-transform duration-200">
                          ₹1,12,000
                        </div>
                        <div className="h-14 rounded-md bg-[#00897B] flex flex-col items-center justify-center font-mono text-[11px] text-white border-2 border-amber-500 font-bold relative shadow-xs hover:scale-105 transition-transform duration-200">
                          <span className="text-[9px] text-amber-300 absolute top-0.5 right-0.5 select-none">★</span>
                          <span>₹1,36,825</span>
                        </div>
                        <div className="h-14 rounded-md bg-[#26A69A] flex items-center justify-center font-mono text-[11px] text-white hover:scale-105 transition-transform duration-200">
                          ₹1,21,000
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-2 text-center items-center">
                        <div className="text-right text-[11px] font-mono text-[#666] pr-2 select-none">100kg</div>
                        <div className="h-14 rounded-md bg-[#E8F5E9] flex items-center justify-center font-mono text-[11px] text-[#1C1C1E] hover:scale-105 transition-transform duration-200">
                          ₹89,000
                        </div>
                        <div className="h-14 rounded-md bg-[#D1ECE8] flex items-center justify-center font-mono text-[11px] text-[#1C1C1E] hover:scale-105 transition-transform duration-200">
                          ₹1,05,000
                        </div>
                        <div className="h-14 rounded-md bg-[#E0F2F1] flex items-center justify-center font-mono text-[11px] text-[#1C1C1E] hover:scale-105 transition-transform duration-200">
                          ₹98,000
                        </div>
                      </div>

                      <div className="text-center text-xs font-mono text-[#666] mt-4 font-semibold select-none">
                        Irrigation Level (mm)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#AAAAAA] mt-2 italic text-center select-none">
                  ★ Optimal combination (Nitrogen = 150kg/ha, Irrigation = 500mm)
                </div>
              </motion.div>

              {/* GRID: CHART 2 & CHART 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CHART 2: Yield vs Profit Line Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  onViewportEnter={() => setChartInView(true)}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                    Yield continues rising while profit peaks at 150kg N/ha
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Comparative dual-axis trend analysis</p>
                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={yieldProfitData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis dataKey="nitrogen" stroke="#888" fontSize={11} tickLine={false} label={{ value: 'Nitrogen (kg/ha)', position: 'bottom', offset: 0, fontSize: 10 }} />
                          <YAxis yAxisId="left" stroke="#1C1C1E" fontSize={10} tickLine={false} />
                          <YAxis yAxisId="right" orientation="right" stroke="#00897B" fontSize={10} tickLine={false} />
                          <Tooltip content={<YieldProfitTooltip />} />
                          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                          <ReferenceLine x={150} stroke="#00897B" strokeDasharray="3 3" label={{ value: 'Profit peak', fill: '#00897B', fontSize: 10, position: 'top' }} />
                          <Line yAxisId="left" name="Yield (kg/ha)" type="monotone" dataKey="yield" stroke="#1C1C1E" strokeWidth={2.5} activeDot={{ r: 6 }} isAnimationActive={chartInView} />
                          <Line yAxisId="right" name="Net Profit (₹/ha)" type="monotone" dataKey="profit" stroke="#00897B" strokeWidth={2.5} activeDot={{ r: 6 }} isAnimationActive={chartInView} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                </motion.div>

                {/* CHART 3: Crop Yield Drivers Feature Importance */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                    Random Forest feature importance — crop yield drivers
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Key climate yield predictors</p>
                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={featureImportances} margin={{ top: 10, right: 40, left: 15, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis type="number" stroke="#888" fontSize={11} tickLine={false} />
                          <YAxis dataKey="feature" type="category" stroke="#888" fontSize={11} tickLine={false} width={110} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar name="Feature Weight" dataKey="importance" isAnimationActive={chartInView} animationDuration={1200}>
                            {featureImportances.map((entry, index) => {
                              const gradientColors = ['#00897B', '#00A596', '#4DB6AC', '#80CBC4', '#B2DFDB', '#E8F5E9'];
                              return <Cell key={`cell-${index}`} fill={gradientColors[index % gradientColors.length]} />;
                            })}
                            <LabelList
                              dataKey="importance"
                              position="right"
                              formatter={(v: any) => typeof v === 'number' ? `${(v * 100).toFixed(0)}%` : String(v)}
                              className="font-mono text-[10px] font-semibold"
                              fill="#00897B"
                              dx={5}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                </motion.div>

              </div>

            </div>
          ) : project.slug === 'gujarat-scheme' ? (
            /* McKinsey-styled Gujarat Scheme Evaluation report layout */
            <div className="space-y-8">
              
              {/* GRID 1: CHART 1 & CHART 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CHART 1: Income Impact Before vs After */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  onViewportEnter={() => setChartInView(true)}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs relative"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                    Monthly income — beneficiaries vs non-beneficiaries (₹)
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Scheme Financial Audit Outcomes</p>
                  
                  {/* Overlay annotation for ↑ 28.4% */}
                  {mounted && chartInView && (
                    <div className="absolute top-[102px] left-[26%] sm:left-[23%] transform -translate-x-1/2 flex flex-col items-center select-none pointer-events-none z-20">
                      <span className="text-[10.5px] font-bold text-[#00897B] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#A5D6A7] font-mono animate-bounce">
                        ↑ 28.4%
                      </span>
                    </div>
                  )}

                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={incomeImpactData} margin={{ top: 20, right: 10, left: 15, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis dataKey="name" stroke="#888" fontSize={11} tickLine={false} />
                          <YAxis stroke="#888" fontSize={11} tickLine={false} tickFormatter={(tick) => `₹${tick.toLocaleString()}`} />
                          <Tooltip content={<IncomeImpactTooltip />} />
                          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                          <Bar name="Before Scheme" dataKey="Before" fill="#F4F4F2" stroke="#1C1C1E" strokeWidth={1} radius={[4, 4, 0, 0]} isAnimationActive={chartInView} />
                          <Bar name="After Scheme" dataKey="After" fill="#1C1C1E" radius={[4, 4, 0, 0]} isAnimationActive={chartInView} />
                          <Bar name="Non-Beneficiary Control" dataKey="Non-Beneficiary" fill="#E0E0DC" radius={[4, 4, 0, 0]} isAnimationActive={chartInView} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                  <div className="text-[11.5px] font-semibold text-[#1C1C1E] mt-6 text-center bg-[#F4F4F2] py-2 rounded-lg border border-[rgba(0,0,0,0.05)] font-mono">
                    Beneficiaries earn 3.1× more than non-beneficiaries
                  </div>
                </motion.div>

                {/* CHART 2: Awareness Channels (Horizontal Bar) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                    Primary scheme awareness channel (%)
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Beneficiary Information Sources</p>
                  {mounted ? (
                    <div className="h-[300px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={awarenessData} margin={{ top: 10, right: 40, left: 25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis type="number" stroke="#888" fontSize={11} tickLine={false} />
                          <YAxis dataKey="source" type="category" stroke="#888" fontSize={11} tickLine={false} width={120} />
                          <Tooltip content={<AwarenessChannelTooltip />} />
                          <Bar name="Percentage" dataKey="pct" isAnimationActive={chartInView} animationDuration={1200}>
                            {awarenessData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.source === 'Livestock Inspector' ? '#00897B' : '#1C1C1E'} />
                            ))}
                            <LabelList
                              dataKey="pct"
                              position="right"
                              formatter={(v: any) => `${v}%`}
                              className="font-mono text-[10px] font-semibold"
                              fill="#00897B"
                              dx={5}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg" />
                  )}
                </motion.div>

              </div>

              {/* GRID 2: CHART 3 & CHART 4 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CHART 3: Awareness gap analysis */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                      Awareness gap analysis
                    </h3>
                    <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Potential vs Actual Scheme Enrollment</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left Card */}
                      <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl p-5 flex flex-col justify-center items-center text-center">
                        <span className="font-mono text-4xl sm:text-[48px] font-bold text-[#1B5E20] leading-none mb-2">
                          65.3%
                        </span>
                        <span className="text-[13px] font-semibold text-[#166534] leading-tight">
                          Non-beneficiaries aware of scheme
                        </span>
                      </div>

                      {/* Right Card */}
                      <div className="bg-[#FFF8E1] border border-[#FCD34D] rounded-xl p-5 flex flex-col justify-center items-center text-center">
                        <span className="font-mono text-4xl sm:text-[48px] font-bold text-[#92400E] leading-none mb-2">
                          34.7%
                        </span>
                        <span className="text-[13px] font-semibold text-[#92400E] leading-tight">
                          Still not enrolled despite awareness
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-8">
                    <div className="h-4.5 w-full flex rounded-md overflow-hidden border border-[rgba(0,0,0,0.06)]">
                      <div className="bg-[#00897B] h-full" style={{ width: '65.3%' }} />
                      <div className="bg-[#FCD34D] h-full" style={{ width: '34.7%' }} />
                    </div>
                    <div className="flex justify-between text-[10.5px] font-mono text-[#666666] select-none">
                      <span>Aware of Scheme (65.3%)</span>
                      <span>Not Enrolled (34.7%)</span>
                    </div>
                    <div className="text-center text-[12px] font-bold text-[#1C1C1E] pt-2 font-mono">
                      Awareness-to-enrollment gap
                    </div>
                  </div>
                </motion.div>

                {/* CHART 4: Veterinary Knowledge vs Action Gap */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 font-headings">
                      Veterinary information vs treatment action gap
                    </h3>
                    <p className="text-[11px] font-mono text-[#AAAAAA] mb-8 uppercase">Key Operational Implementation Gaps</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left Box */}
                      <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl p-5 flex flex-col justify-center items-center text-center">
                        <span className="font-mono text-4xl sm:text-[48px] font-bold text-[#00897B] leading-none mb-2">
                          99.37%
                        </span>
                        <span className="text-[12px] font-semibold text-[#00695C] leading-tight">
                          Received veterinary information
                        </span>
                      </div>

                      {/* Right Box */}
                      <div className="bg-[#FFF8E1] border border-[#FCD34D] rounded-xl p-5 flex flex-col justify-center items-center text-center">
                        <span className="font-mono text-4xl sm:text-[48px] font-bold text-[#E53935] leading-none mb-2">
                          10.51%
                        </span>
                        <span className="text-[12px] font-semibold text-[#92400E] leading-tight">
                          Had diagnosed diseases actually treated
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[12px] font-body text-[#666666] leading-relaxed mt-8 bg-[#FFF8E1]/50 border border-[#FCD34D]/30 p-3 rounded-lg">
                    <span className="font-bold text-[#92400E]">Critical implementation gap:</span> information reached beneficiaries but veterinary treatment follow-through remained extremely low.
                  </div>
                </motion.div>

              </div>

            </div>
          ) : (
            /* Generic charts for other projects */
            <div className="w-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                onViewportEnter={() => setChartInView(true)}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl"
              >
                <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-4 sm:p-8 shadow-xs">
                  {mounted ? (
                    <div className="h-[350px] w-full text-[11px] font-mono">
                      <ResponsiveContainer width="100%" height="100%">
                        {project.chartType === 'bar' ? (
                          <BarChart data={project.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                            <XAxis dataKey={project.chartConfig.xAxisKey} stroke="#888" fontSize={11} tickLine={false} />
                            <YAxis stroke="#888" fontSize={11} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                            <Bar name={project.chartConfig.label1} dataKey={project.chartConfig.dataKey1} fill="#00897B" radius={[4, 4, 0, 0]} isAnimationActive={chartInView} animationDuration={1200} />
                            {project.chartConfig.dataKey2 && (
                              <Bar name={project.chartConfig.label2} dataKey={project.chartConfig.dataKey2} fill="#1C1C1E" radius={[4, 4, 0, 0]} isAnimationActive={chartInView} animationDuration={1200} />
                            )}
                          </BarChart>
                        ) : project.chartType === 'area' ? (
                          <AreaChart data={project.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorCsk" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00897B" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#00897B" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorMi" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1C1C1E" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#1C1C1E" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                            <XAxis dataKey={project.chartConfig.xAxisKey} stroke="#888" fontSize={11} tickLine={false} />
                            <YAxis stroke="#888" fontSize={11} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                            <Area name={project.chartConfig.label1} type="monotone" dataKey={project.chartConfig.dataKey1} stroke="#00897B" strokeWidth={2} fillOpacity={1} fill="url(#colorCsk)" isAnimationActive={chartInView} animationDuration={1200} />
                            {project.chartConfig.dataKey2 && (
                              <Area name={project.chartConfig.label2} type="monotone" dataKey={project.chartConfig.dataKey2} stroke="#1C1C1E" strokeWidth={2} fillOpacity={1} fill="url(#colorMi)" isAnimationActive={chartInView} animationDuration={1200} />
                            )}
                          </AreaChart>
                        ) : project.chartType === 'line' ? (
                          <LineChart data={project.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                            <XAxis dataKey={project.chartConfig.xAxisKey} stroke="#888" fontSize={11} tickLine={false} />
                            <YAxis stroke="#888" fontSize={11} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                            <Line name={project.chartConfig.label1} type="monotone" dataKey={project.chartConfig.dataKey1} stroke="#00897B" strokeWidth={2.5} activeDot={{ r: 6 }} isAnimationActive={chartInView} animationDuration={1200} />
                            {project.chartConfig.dataKey2 && (
                              <Line name={project.chartConfig.label2} type="monotone" dataKey={project.chartConfig.dataKey2} stroke="#1C1C1E" strokeWidth={2} strokeDasharray="4 4" isAnimationActive={chartInView} animationDuration={1200} />
                            )}
                          </LineChart>
                        ) : project.chartType === 'horizontal-bar' ? (
                          <BarChart layout="vertical" data={project.chartData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                            <XAxis type="number" stroke="#888" fontSize={11} tickLine={false} />
                            <YAxis dataKey="project.chartConfig.xAxisKey" type="category" stroke="#888" fontSize={11} tickLine={false} width={90} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                            <Bar name={project.chartConfig.label1} dataKey={project.chartConfig.dataKey1} fill="#00897B" radius={[0, 4, 4, 0]} isAnimationActive={chartInView} animationDuration={1200} />
                          </BarChart>
                        ) : (
                          <BarChart data={project.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                            <XAxis dataKey={project.chartConfig.xAxisKey} stroke="#888" fontSize={11} tickLine={false} />
                            <YAxis stroke="#888" fontSize={11} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                            <Bar name={project.chartConfig.label1} dataKey={project.chartConfig.dataKey1} fill="#1C1C1E" radius={[4, 4, 0, 0]} isAnimationActive={chartInView} animationDuration={1200} />
                            <Bar name={project.chartConfig.label2} dataKey={project.chartConfig.dataKey2} fill="#00897B" radius={[4, 4, 0, 0]} isAnimationActive={chartInView} animationDuration={1200} />
                          </BarChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[350px] w-full animate-pulse bg-[#F4F4F2]/50 rounded-lg flex items-center justify-center">
                      <span className="font-mono text-xs text-[#AAAAAA]">Initializing Interactive Dashboard...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4 — KEY FINDINGS (white background) */}
      <section className="w-full bg-white py-20 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headings font-bold text-[32px] text-[#1C1C1E] mb-12 text-center sm:text-left">
            Key Findings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.findings.map((finding, idx) => (
              <div 
                key={idx}
                className="border border-[rgba(0,0,0,0.08)] rounded-[10px] p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <span className="font-mono text-[36px] font-bold text-[#00897B] block mb-3 leading-none">
                    {finding.numberOrSymbol}
                  </span>
                  <h3 className="font-body font-semibold text-[16px] text-[#1C1C1E] mb-2 font-sans">
                    {finding.title}
                  </h3>
                  <p className="font-body text-[13.5px] text-[#666666] leading-relaxed font-sans">
                    {finding.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4.5 — POLICY RECOMMENDATIONS (Only for gujarat-scheme) */}
      {project.slug === 'gujarat-scheme' && (
        <section className="w-full bg-white border-t border-[rgba(0,0,0,0.06)] py-20 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-headings font-bold text-[28px] text-[#1C1C1E] mb-10 text-center sm:text-left">
              Policy Recommendations
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Short-term Card */}
              <div className="bg-[#F4F4F2] border border-[rgba(0,0,0,0.08)] border-l-4 border-l-[#00897B] rounded-r-xl p-6 sm:p-8 space-y-6">
                <h3 className="text-[18px] font-bold text-[#1C1C1E] font-headings">
                  Short-term
                </h3>
                <ul className="space-y-4 font-body text-[14.5px] text-[#555555] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00897B] font-bold">•</span>
                    <span>Simplify enrollment through the I-Khedut portal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00897B] font-bold">•</span>
                    <span>Introduce ₹700/day stipend to offset lost wages during training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00897B] font-bold">•</span>
                    <span>Expand Livestock Inspector outreach program</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00897B] font-bold">•</span>
                    <span>Improve application accessibility at village level</span>
                  </li>
                </ul>
              </div>

              {/* Long-term Card */}
              <div className="bg-[#1C1C1E] border border-[rgba(255,255,255,0.08)] border-l-4 border-l-[#00897B] rounded-r-xl p-6 sm:p-8 space-y-6 text-white">
                <h3 className="text-[18px] font-bold text-white font-headings">
                  Long-term
                </h3>
                <ul className="space-y-4 font-body text-[14.5px] text-[#CCCCCC] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00897B] font-bold">•</span>
                    <span>Deploy mobile training units to reach distant villages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00897B] font-bold">•</span>
                    <span>Extend training duration from 2 days to 3–5 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00897B] font-bold">•</span>
                    <span>Digitize beneficiary monitoring and tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00897B] font-bold">•</span>
                    <span>Establish post-training veterinary support systems</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* SECTION 5 — SKILLS DEMONSTRATED (background #1C1C1E, dark section) */}
      <section className="w-full bg-[#1C1C1E] py-20 select-none text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headings font-bold text-[28px] text-white mb-8 text-center sm:text-left">
            Skills Demonstrated
          </h2>

          <div className="flex flex-wrap gap-3">
            {project.skills.map((skill) => (
              <span 
                key={skill}
                className="px-4 py-2 text-[13px] font-medium font-body text-white bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-[20px] hover:bg-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.25)] transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROJECT NAVIGATION */}
      <section className="w-full bg-white py-24 select-none border-t border-[rgba(0,0,0,0.06)] relative z-[2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Previous Project Card */}
            <Link href={`/projects/${prevProject.slug}`} scroll={true} className="block group w-full cursor-pointer">
              <div className="w-full h-full bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] p-[28px_32px] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg hover:border-[rgba(0,137,123,0.4)] relative overflow-hidden flex flex-col justify-between gap-8">
                
                <div className="space-y-1">
                  <span className="text-[10px] font-body tracking-widest text-[#AAAAAA] uppercase font-semibold block mb-1">
                    Previous Case Study
                  </span>
                  <h3 className="font-headings font-bold text-[22px] text-[#1C1C1E] transition-colors">
                    {prevProject.title}
                  </h3>
                </div>

                <div className="text-[13px] text-[#00897B] font-body flex items-center gap-1.5 group-hover:-translate-x-1 transition-transform duration-200">
                  <span>←</span>
                  <span>View Previous Project</span>
                </div>

              </div>
            </Link>

            {/* Next Project Card */}
            <Link href={`/projects/${nextProject.slug}`} scroll={true} className="block group w-full cursor-pointer">
              <div className="w-full h-full bg-[#F4F4F2] border border-[rgba(0,0,0,0.06)] rounded-[14px] p-[28px_32px] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg hover:border-[rgba(0,137,123,0.4)] relative overflow-hidden flex flex-col justify-between gap-8 text-right items-end">
                
                <div className="space-y-1 text-right w-full">
                  <span className="text-[10px] font-body tracking-widest text-[#AAAAAA] uppercase font-semibold block mb-1">
                    Next Case Study
                  </span>
                  <h3 className="font-headings font-bold text-[22px] text-[#1C1C1E] transition-colors">
                    {nextProject.title}
                  </h3>
                </div>

                <div className="text-[13px] text-[#00897B] font-body flex items-center justify-end gap-1.5 group-hover:translate-x-1 transition-transform duration-200">
                  <span>View Next Project</span>
                  <span>→</span>
                </div>

              </div>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}
