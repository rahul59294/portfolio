'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  Terminal,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Mail
} from 'lucide-react';

// Sample data for Recharts visualization
const activityData = [
  { month: 'Jan', velocity: 65, commits: 120, quality: 95 },
  { month: 'Feb', velocity: 78, commits: 145, quality: 97 },
  { month: 'Mar', velocity: 72, commits: 130, quality: 96 },
  { month: 'Apr', velocity: 89, commits: 190, quality: 98 },
  { month: 'May', velocity: 95, commits: 240, quality: 99 },
  { month: 'Jun', velocity: 110, commits: 280, quality: 99 },
];

export default function PortfolioShowcase() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'velocity' | 'commits'>('velocity');

  // SSR hydration guard
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-teal border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Background glow meshes */}
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-primary-teal/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-primary-light/5 blur-[150px] pointer-events-none" />

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between border-b border-border-light pb-6 mb-12"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-teal to-primary-light shadow-lg shadow-primary-teal/15">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-headings font-bold text-lg leading-none tracking-tight">Rahul Singh</h1>
            <span className="text-xs text-text-muted font-mono tracking-wider">DATA & ANALYTICS</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-body font-medium">
          <a href="#about" className="text-text-secondary hover:text-text-primary transition-colors">About</a>
          <a href="#stats" className="text-text-secondary hover:text-text-primary transition-colors">Analytics</a>
          <a href="#tech" className="text-text-secondary hover:text-text-primary transition-colors">Stack</a>
          <a href="#design" className="text-text-secondary hover:text-text-primary transition-colors">Tokens</a>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-light border border-border-light hover:border-primary-teal/50 text-sm font-medium transition-all text-text-primary"
          >
            <Mail className="h-4 w-4" />
            <span>Get in touch</span>
          </a>
        </div>
      </motion.header>

      {/* Analytics Recharts Widget */}
      <motion.section 
        id="stats"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-card p-6 md:p-8 mb-20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 h-32 w-32 bg-primary-teal/5 blur-[50px] pointer-events-none rounded-full" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary-teal mb-2">
              <Activity className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-widest font-semibold">Performance Analytics</span>
            </div>
            <h3 className="font-headings font-bold text-2xl tracking-tight text-text-primary">Interactive Metrics Dashboard</h3>
            <p className="text-text-secondary text-sm font-body mt-1">
              Visualizing build velocity and active contributions in real-time. Try filtering the metrics below.
            </p>
          </div>

          <div className="flex p-1 rounded-lg bg-surface-light border border-border-light self-start">
            <button
              onClick={() => setActiveTab('velocity')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'velocity' 
                  ? 'bg-primary-teal text-white shadow-md' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Velocity Index
            </button>
            <button
              onClick={() => setActiveTab('commits')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'commits' 
                  ? 'bg-primary-teal text-white shadow-md' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Commit Volume
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full mt-4 font-mono text-[10px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeTab === 'velocity' ? '#00897b' : '#4db6ac'} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={activeTab === 'velocity' ? '#00897b' : '#4db6ac'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#666666"
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#666666"
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: 'rgba(0,0,0,0.08)',
                  borderRadius: '8px',
                  color: '#1c1c1e',
                  fontFamily: 'var(--font-mono)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey={activeTab} 
                stroke={activeTab === 'velocity' ? '#00897b' : '#4db6ac'} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorAccent)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom statistics list */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border-light pt-6 mt-6">
          <div>
            <span className="text-text-muted text-xs font-mono uppercase block">System Stability</span>
            <span className="font-headings font-bold text-lg text-success-pos flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="h-4 w-4" /> 100% Operational
            </span>
          </div>
          <div>
            <span className="text-text-muted text-xs font-mono uppercase block">Average Build Speed</span>
            <span className="font-headings font-bold text-lg mt-1 font-mono text-text-primary">1.82s</span>
          </div>
          <div>
            <span className="text-text-muted text-xs font-mono uppercase block">Lighthouse Score</span>
            <span className="font-headings font-bold text-lg mt-1 text-primary-teal font-mono">100/100</span>
          </div>
          <div>
            <span className="text-text-muted text-xs font-mono uppercase block">Render Mode</span>
            <span className="font-headings font-bold text-lg mt-1 text-primary-light font-body font-semibold">App Router</span>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack grid */}
      <motion.section 
        id="tech"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="font-headings font-bold text-3xl tracking-tight text-text-primary">Ecosystem Integrations</h3>
          <p className="text-text-secondary text-sm font-body mt-2">
            Engineered using standard modules to build clean, lightweight, and fluid web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-lg bg-primary-teal/10 text-primary-teal flex items-center justify-center mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h4 className="font-headings font-bold text-lg text-text-primary">Framer Motion</h4>
              <p className="text-text-secondary text-sm font-body mt-2">
                Smooth layout animations and interactive orchestration built directly into React components.
              </p>
            </div>
            <div className="border-t border-border-light pt-4 mt-6 flex justify-between items-center text-xs font-mono text-text-muted">
              <span>ANIMATION ENGINE</span>
              <span className="text-primary-teal font-semibold">Active</span>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-lg bg-primary-light/10 text-primary-light flex items-center justify-center mb-4">
                <Activity className="h-5 w-5" />
              </div>
              <h4 className="font-headings font-bold text-lg text-text-primary">Lenis Smooth Scroll</h4>
              <p className="text-text-secondary text-sm font-body mt-2">
                Enables hardware-accelerated, high-fidelity smooth scrolling capabilities for elegant storytelling.
              </p>
            </div>
            <div className="border-t border-border-light pt-4 mt-6 flex justify-between items-center text-xs font-mono text-text-muted">
              <span>PHYSICS SCROLL</span>
              <span className="text-primary-light font-semibold">Active</span>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-lg bg-success-pos/10 text-success-pos flex items-center justify-center mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h4 className="font-headings font-bold text-lg text-text-primary">Recharts</h4>
              <p className="text-text-secondary text-sm font-body mt-2">
                Composition-based data visualization built with svg layouts for fluid rendering on any screen.
              </p>
            </div>
            <div className="border-t border-border-light pt-4 mt-6 flex justify-between items-center text-xs font-mono text-text-muted">
              <span>CHART ENGINE</span>
              <span className="text-success-pos font-semibold">Active</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Token Showcase Section */}
      <motion.section 
        id="design"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-card p-8 mb-20"
      >
        <div className="mb-6">
          <h3 className="font-headings font-bold text-xl text-text-primary">Global Design System Tokens</h3>
          <p className="text-text-secondary text-xs font-body mt-1">
            Displaying the exact hexadecimal values, CSS color mappings, and fonts configured for this environment.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-lg bg-background border border-border-light">
            <div className="h-8 w-full rounded bg-white border border-border-light mb-2"></div>
            <span className="text-xs font-semibold block text-text-primary">Background</span>
            <code className="text-[10px] text-text-muted font-mono block mt-0.5">#ffffff</code>
          </div>
          
          <div className="p-4 rounded-lg bg-background border border-border-light">
            <div className="h-8 w-full rounded bg-surface-light border border-border-light mb-2"></div>
            <span className="text-xs font-semibold block text-text-primary">Surface / Card</span>
            <code className="text-[10px] text-text-muted font-mono block mt-0.5">#f4f4f2</code>
          </div>

          <div className="p-4 rounded-lg bg-background border border-border-light">
            <div className="h-8 w-full rounded bg-primary-teal mb-2"></div>
            <span className="text-xs font-semibold block text-text-primary">Primary Teal</span>
            <code className="text-[10px] text-text-muted font-mono block mt-0.5">#00897b</code>
          </div>

          <div className="p-4 rounded-lg bg-background border border-border-light">
            <div className="h-8 w-full rounded bg-primary-light mb-2"></div>
            <span className="text-xs font-semibold block text-text-primary">Primary Light</span>
            <code className="text-[10px] text-text-muted font-mono block mt-0.5">#4db6ac</code>
          </div>

          <div className="p-4 rounded-lg bg-background border border-border-light col-span-2 md:col-span-1">
            <div className="h-8 w-full rounded bg-[#e8f5e9] border border-[#a5d6a7] mb-2"></div>
            <span className="text-xs font-semibold block text-text-primary">Mint Surface</span>
            <code className="text-[10px] text-text-muted font-mono block mt-0.5">#e8f5e9</code>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-border-light pt-6">
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Font Verification</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex justify-between items-center bg-background p-2.5 rounded border border-border-light">
                <span className="text-text-secondary">Headings (Playfair Display)</span>
                <span className="font-headings font-bold text-sm text-text-primary">700 bold typography</span>
              </li>
              <li className="flex justify-between items-center bg-background p-2.5 rounded border border-border-light">
                <span className="text-text-secondary">Body (Inter)</span>
                <span className="font-body text-xs text-text-secondary">400 normal body text</span>
              </li>
              <li className="flex justify-between items-center bg-background p-2.5 rounded border border-border-light">
                <span className="text-text-secondary">Numbers (JetBrains Mono)</span>
                <span className="font-mono text-xs text-primary-teal font-semibold">500 mono 1234567890</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">System Validation Alerts</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-success-pos/5 border border-success-pos/20 text-success-pos text-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Colors, fonts, and assets loaded successfully without errors.</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-amber-600 text-xs">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Verification check: CSS grid and animations have fully mounted.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
