'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Settings, Sparkles, TrendingUp } from 'lucide-react';

// Player base stats
const basePlayers = [
  { name: 'Virat Kohli', fantasy: 92, consistency: 88, historical: 95 },
  { name: 'Rohit Sharma', fantasy: 85, consistency: 72, historical: 90 },
  { name: 'Jasprit Bumrah', fantasy: 95, consistency: 92, historical: 88 },
  { name: 'MS Dhoni', fantasy: 78, consistency: 85, historical: 99 },
  { name: 'Hardik Pandya', fantasy: 88, consistency: 65, historical: 82 },
  { name: 'KL Rahul', fantasy: 80, consistency: 82, historical: 85 },
  { name: 'Ravindra Jadeja', fantasy: 84, consistency: 80, historical: 88 },
  { name: 'Suryakumar Yadav', fantasy: 96, consistency: 60, historical: 80 },
];

type StrategyType = 'balanced' | 'highScorers' | 'consistent';

interface StrategyInfo {
  name: string;
  fantasy: number;
  consistency: number;
  historical: number;
  description: string;
}

const strategies: Record<StrategyType, StrategyInfo> = {
  balanced: {
    name: 'Balanced Strategy',
    fantasy: 50,
    consistency: 20,
    historical: 30,
    description: 'Equally balances instant impact, reliability, and past credentials.',
  },
  highScorers: {
    name: 'High Scorers Focus',
    fantasy: 70,
    consistency: 10,
    historical: 20,
    description: 'Prioritizes explosive runs, boundary counts, and massive points output.',
  },
  consistent: {
    name: 'Consistent Performers',
    fantasy: 30,
    consistency: 50,
    historical: 20,
    description: 'Prioritizes players with low variance, high baseline scores, and steady hands.',
  },
};

export default function ModelSandbox() {
  const [strategy, setStrategy] = useState<StrategyType>('balanced');
  const activeWeights = strategies[strategy];

  // Calculate scores and sort descending
  const calculatedPlayers = useMemo(() => {
    return basePlayers
      .map((p) => {
        const score = Math.round(
          (p.fantasy * activeWeights.fantasy +
            p.consistency * activeWeights.consistency +
            p.historical * activeWeights.historical) /
            100
        );
        return {
          ...p,
          score,
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [strategy, activeWeights]);

  return (
    <section 
      id="sandbox" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border-light bg-transparent"
    >
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-teal mb-2">
          <Settings className="h-4.5 w-4.5 animate-spin-slow" />
          <span className="text-xs font-mono uppercase tracking-widest font-semibold">Interactive Sandbox</span>
        </div>
        <h2 className="font-headings font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
          See The Model In Action
        </h2>
        <p className="text-text-secondary text-sm font-body mt-2 max-w-3xl">
          A simplified version of the Fantasy Cricket player scoring logic — adjust strategy weights and see scores recalculate live.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="glass-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-primary-teal/5 blur-[60px] pointer-events-none rounded-full" />
        
        {/* LEFT SIDE: Strategy Selector & Weight Bars */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h3 className="font-headings font-semibold text-lg text-text-primary">
              1. Choose Scoring Focus
            </h3>
            
            {/* Strategy Toggles */}
            <div className="flex flex-col gap-3">
              {(Object.keys(strategies) as StrategyType[]).map((key) => {
                const strat = strategies[key];
                const isActive = strategy === key;
                return (
                  <button
                    key={key}
                    onClick={() => setStrategy(key)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'border-primary-teal bg-primary-teal/10 shadow-lg shadow-primary-teal/5'
                        : 'border-border-light bg-background hover:border-primary-teal/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${isActive ? 'text-primary-teal' : 'text-text-primary'}`}>
                        {strat.name}
                      </span>
                      {isActive && <Sparkles className="h-4 w-4 text-primary-teal" />}
                    </div>
                    <p className="text-xs text-text-muted mt-1 leading-normal">
                      {strat.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weight Indicator Bars */}
          <div className="space-y-4 pt-6 border-t border-border-light">
            <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider">
              Strategy Weights (100% Total)
            </h4>
            
            {/* Weight 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-text-secondary">
                <span>Fantasy Impact</span>
                <span className="text-primary-teal font-semibold">{activeWeights.fantasy}%</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border-light/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeWeights.fantasy}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-primary-teal rounded-full"
                />
              </div>
            </div>

            {/* Weight 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-text-secondary">
                <span>Consistency Index</span>
                <span className="text-primary-light font-semibold">{activeWeights.consistency}%</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border-light/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeWeights.consistency}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-primary-light rounded-full"
                />
              </div>
            </div>

            {/* Weight 3 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-text-secondary">
                <span>Historical Performance</span>
                <span className="text-mint-text font-semibold">{activeWeights.historical}%</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border-light/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeWeights.historical}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-mint-text rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Player results Recharts */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headings font-semibold text-lg text-text-primary">
                2. Recalculated Model Output
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold">
                <TrendingUp className="h-4 w-4" />
                <span>Top 3 Recommended</span>
              </div>
            </div>
            <p className="text-xs text-text-muted mb-4 font-body leading-normal">
              Observe how the hierarchy and scores shift based on changes in the weight matrix.
            </p>
          </div>

          {/* Bar Chart */}
          <div className="h-[360px] w-full text-xs font-body">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={calculatedPlayers}
                margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
              >
                <defs>
                  {/* Recommended Top 3 Gradient */}
                  <linearGradient id="amberGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  {/* Teal Gradient */}
                  <linearGradient id="tealGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00897b" />
                    <stop offset="100%" stopColor="#4db6ac" />
                  </linearGradient>
                </defs>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#666666"
                  tickLine={false}
                  axisLine={false}
                  width={120}
                  className="font-medium"
                />
                <Bar
                  dataKey="score"
                  radius={[0, 4, 4, 0]}
                  isAnimationActive={true}
                  animationDuration={800}
                >
                  {calculatedPlayers.map((entry, index) => {
                    const isTop3 = index < 3;
                    return (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={isTop3 ? 'url(#amberGradient)' : 'url(#tealGradient)'}
                      />
                    );
                  })}
                  <LabelList
                    dataKey="score"
                    position="right"
                    fill="#1c1c1e"
                    formatter={(val: any) => `${val} pts`}
                    className="font-mono text-[10px] font-semibold"
                    dx={5}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Note */}
          <div className="text-[11px] text-text-muted font-body leading-normal pt-4 border-t border-border-light">
            * This is a simplified demonstration. The actual model integrates 34 IPL datasets across 5 seasons.
          </div>
        </div>

      </div>
    </section>
  );
}
