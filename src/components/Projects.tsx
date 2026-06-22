'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Brain, Award, Database, Sprout, BarChart3 } from 'lucide-react';

export default function Projects() {
  return (
    <section 
      id="projects" 
      className="relative w-full border-t border-[rgba(0,0,0,0.06)] py-24 select-none"
    >
      <div className="absolute inset-0 bg-white -z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        
        {/* Section Heading */}
        <div className="mb-16 overflow-hidden">
          <motion.h2
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-headings font-bold text-[40px] text-[#1C1C1E] tracking-tight"
          >
            Projects & Research
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* ROW 1: CELL A — DataDrishti (spans 7 cols, tall) */}
          <Link href="/projects/datadrishti" className="col-span-12 lg:col-span-7 block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full glass-card p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-teal/5 relative overflow-hidden border-l-[3px] border-l-transparent hover:border-l-[#00897B] cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20 text-[10px] font-mono font-medium tracking-wide uppercase">
                    ONGOING · FEATURED
                  </span>
                  <Sparkles className="h-5 w-5 text-amber-500" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-headings font-bold text-2xl text-text-primary">
                    DataDrishti
                  </h3>
                  <p className="text-[14px] text-text-secondary font-body leading-relaxed max-w-xl">
                    End-to-end analytics platform — automated profiling, anomaly detection & LLM-powered natural language reports.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-text-muted font-mono font-medium">
                  <span className="text-primary-teal font-semibold">"10x" faster analysis</span>
                  <span>·</span>
                  <span>LLM integrated</span>
                  <span>·</span>
                  <span>Python + Streamlit</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 z-10">
                {/* Stack Tags */}
                <div className="flex flex-wrap gap-2 pr-28">
                  {['Python', 'Streamlit', 'Machine Learning', 'LLM API'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded bg-background border border-border-light text-text-secondary text-[11px] font-mono hover:border-primary-teal/30 hover:text-primary-teal transition-colors duration-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Small decorative mini-chart SVG */}
                <div className="shrink-0 self-end mr-2 sm:mr-0 opacity-40 group-hover:opacity-75 transition-opacity duration-300 pr-2">
                  <svg className="w-28 h-12 text-primary-teal" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 45 Q 25 40, 45 30 T 85 20 T 115 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M5 45 Q 25 40, 45 30 T 85 20 T 115 5 L 115 45 L 5 45 Z" fill="url(#miniChartGradient)" opacity="0.15" />
                    <circle cx="115" cy="5" r="3.5" fill="currentColor" />
                    <defs>
                      <linearGradient id="miniChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00897b" />
                        <stop offset="100%" stopColor="#00897b" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* View Case Study tag */}
              <span className="absolute bottom-4 right-4 text-[11px] text-[#00897B] font-semibold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                View Case Study →
              </span>
            </motion.div>
          </Link>

          {/* ROW 1: CELL B — IPL Simulation (spans 5 cols) */}
          <Link href="/projects/ipl-simulator" className="col-span-12 lg:col-span-5 block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="h-full glass-card p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-teal/5 relative overflow-hidden border-l-[3px] border-l-transparent hover:border-l-[#00897B] cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-full bg-primary-teal/10 text-primary-teal border border-primary-teal/20 text-[10px] font-mono font-medium tracking-wide uppercase">
                    STATISTICAL MODELLING
                  </span>
                  <Brain className="h-5 w-5 text-primary-teal" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-headings font-bold text-xl sm:text-2xl text-text-primary leading-tight">
                    IPL Auction & Match Simulator
                  </h3>
                  <p className="text-[13px] text-text-secondary font-body leading-relaxed">
                    Monte Carlo match simulation · Linear regression auction pricing · 600-iteration CSK vs MI case study.
                  </p>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-4 bg-background border border-border-light rounded-lg p-3 w-fit">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-text-muted uppercase">R² Metric</span>
                    <span className="font-mono text-sm font-semibold text-primary-teal">0.685</span>
                  </div>
                  <div className="h-6 w-px bg-border-light" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Error Margin</span>
                    <span className="font-mono text-sm font-semibold text-primary-teal">RMSE ₹3.35Cr</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 pr-24">
                {['Python', 'Monte Carlo', 'Linear Regression', 'Feature Engineering'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded bg-background border border-border-light text-text-secondary text-[11px] font-mono hover:border-primary-teal/30 hover:text-primary-teal transition-colors duration-200">
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Case Study tag */}
              <span className="absolute bottom-4 right-4 text-[11px] text-[#00897B] font-semibold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                View Case Study →
              </span>
            </motion.div>
          </Link>

          {/* ROW 2: CELL C — Fantasy Cricket (spans 4 cols) */}
          <Link href="/projects/fantasy-cricket" className="col-span-12 md:col-span-6 lg:col-span-4 block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full glass-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-teal/5 relative overflow-hidden border-l-[3px] border-l-transparent hover:border-l-[#00897B] cursor-pointer min-h-[300px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-primary-light/10 text-primary-light border border-primary-light/20 text-[9px] font-mono font-medium tracking-wide uppercase">
                    DATA ENGINEERING
                  </span>
                  <Database className="h-4.5 w-4.5 text-primary-light" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-headings font-bold text-lg text-text-primary leading-snug">
                    Fantasy Cricket Selector
                  </h3>
                  <p className="text-[13px] text-text-secondary font-body leading-relaxed">
                    Weighted scoring across fantasy, consistency, and historical metrics with Streamlit UI.
                  </p>
                </div>

                <div className="text-[11px] font-mono font-medium text-primary-teal">
                  Key Metric: 34 datasets merged
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 pr-24">
                {['Python', 'Streamlit', 'Pandas'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-background border border-border-light text-text-secondary text-[10px] font-mono hover:border-primary-teal/30 hover:text-primary-teal transition-colors duration-200">
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Case Study tag */}
              <span className="absolute bottom-4 right-4 text-[11px] text-[#00897B] font-semibold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                View Case Study →
              </span>
            </motion.div>
          </Link>

          {/* ROW 2: CELL D — Agricultural Optimisation (spans 4 cols) */}
          <Link href="/projects/crop-profit" className="col-span-12 md:col-span-6 lg:col-span-4 block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="h-full glass-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-teal/5 relative overflow-hidden border-l-[3px] border-l-transparent hover:border-l-[#00897B] cursor-pointer min-h-[300px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-mint-surface text-mint-text border border-mint-border text-[9px] font-mono font-medium tracking-wide uppercase">
                    ML + DESIGN OF EXPERIMENTS
                  </span>
                  <Sprout className="h-4.5 w-4.5 text-mint-text" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-headings font-bold text-lg text-text-primary leading-snug">
                    Crop Profit Optimiser
                  </h3>
                  <p className="text-[13px] text-text-secondary font-body leading-relaxed">
                    Random Forest on 20-year NASA climate data. DoE identified ₹1,36,825/ha peak profit.
                  </p>
                </div>

                <div className="text-[11px] font-mono font-medium text-primary-teal leading-normal">
                  R² 0.69 · MAE 267 kg/ha
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 pr-24">
                {['Random Forest', 'DoE', 'Python', 'NASA POWER'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-background border border-border-light text-text-secondary text-[10px] font-mono hover:border-primary-teal/30 hover:text-primary-teal transition-colors duration-200">
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Case Study tag */}
              <span className="absolute bottom-4 right-4 text-[11px] text-[#00897B] font-semibold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                View Case Study →
              </span>
            </motion.div>
          </Link>

          {/* ROW 2: CELL E — Gujarat Scheme (spans 4 cols) */}
          <Link href="/projects/gujarat-scheme" className="col-span-12 lg:col-span-4 block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="h-full glass-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-teal/5 relative overflow-hidden border-l-[3px] border-l-transparent hover:border-l-[#00897B] cursor-pointer min-h-[300px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-primary-teal/10 text-primary-teal border border-primary-teal/20 text-[9px] font-mono font-medium tracking-wide uppercase">
                    GOVERNMENT EVALUATION
                  </span>
                  <Award className="h-4.5 w-4.5 text-primary-teal" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-headings font-bold text-lg text-text-primary leading-snug">
                    Livestock Scheme Evaluation
                  </h3>
                  <p className="text-[13px] text-text-secondary font-body leading-relaxed">
                    Mann-Whitney U tests across 482 beneficiaries across 12 Gujarat districts. Power BI + R.
                  </p>
                </div>

                <div className="text-[11px] font-mono font-medium text-primary-teal">
                  p &lt; 0.05 · 28% income rise
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 pr-24">
                {['R', 'Power BI', 'Hypothesis Testing', 'Survey Analysis'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-background border border-border-light text-text-secondary text-[10px] font-mono hover:border-primary-teal/30 hover:text-primary-teal transition-colors duration-200">
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Case Study tag */}
              <span className="absolute bottom-4 right-4 text-[11px] text-[#00897B] font-semibold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                View Case Study →
              </span>
            </motion.div>
          </Link>

          {/* ROW 3: CELL F — Sales Dashboard (spans 12 cols, short) */}
          <Link href="/projects/sales-dashboard" className="col-span-12 block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-teal/5 relative overflow-hidden border-l-[3px] border-l-transparent hover:border-l-[#00897B] cursor-pointer"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary-teal/5 blur-[50px] pointer-events-none rounded-full" />
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center gap-2 text-primary-teal">
                    <BarChart3 className="h-4.5 w-4.5" />
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">CONFERENCE PAPER</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-headings font-bold text-xl text-text-primary">
                      Automated Real-Time Sales Dashboard
                    </h3>
                    <p className="text-[14px] text-text-secondary font-body leading-relaxed">
                      Power BI dashboard integrating 6 data sources and 200,000+ records via SQL ETL pipelines — presented at Sharda University International Conference 2025.
                    </p>
                  </div>

                  {/* Stats Inline */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-text-muted font-mono font-medium">
                    <span className="text-primary-teal font-semibold">200K+ records</span>
                    <span>·</span>
                    <span>6 data sources</span>
                    <span>·</span>
                    <span>Conference presented</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between lg:items-end h-full gap-4 shrink-0 pr-24 lg:pr-0">
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {['Power BI', 'SQL', 'ETL', 'Data Visualisation'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded bg-background border border-border-light text-text-secondary text-[11px] font-mono hover:border-primary-teal/30 hover:text-primary-teal transition-colors duration-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Case Study tag */}
              <span className="absolute bottom-4 right-4 text-[11px] text-[#00897B] font-semibold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                View Case Study →
              </span>
            </motion.div>
          </Link>

        </div>
      </div>
    </section>
  );
}
