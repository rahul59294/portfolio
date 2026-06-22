'use client';

import { motion } from 'framer-motion';
import { Star, Terminal, BarChart3, Binary, TrendingUp } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const skillGroups = [
  {
    title: 'Programming & Libraries',
    icon: Terminal,
    skills: ['R', 'Python', 'SQL', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'MATLAB', 'LaTeX'],
  },
  {
    title: 'Data Tools & Visualisation',
    icon: BarChart3,
    skills: ['Power BI', 'Tableau', 'Excel', 'Streamlit', 'Dashboard Design', 'Data Visualisation'],
  },
  {
    title: 'Statistical Methods',
    icon: Binary,
    skills: [
      'Regression', 'Hypothesis Testing', 'Monte Carlo Simulation', 'Time Series', 
      'Forecasting', 'DoE', 'Econometrics', 'Stochastic Processes', 'Survey Analysis'
    ],
  },
  {
    title: 'Analytics',
    icon: TrendingUp,
    skills: [
      'KPI Tracking', 'ETL Pipelines', 'Performance Reporting', 
      'Attribution Analysis', 'Scenario Analysis', 'Marketing Analytics'
    ],
  },
];

const achievements = [
  'Research presented at Sharda University International Conference, 2025',
  "8.06 CGPA — Master's in Statistics, Amity University",
  'Served as NSS volunteer: managed social media communications, photography, and community outreach initiatives.',
  'Led the Decoration Core Team for the Annual Cultural & Technical Festival, overseeing stage design and thematic visual planning.',
];

export default function Skills() {
  // Stagger animation configuration
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section 
      id="skills" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border-light bg-transparent relative z-[2]"
    >
      {/* Section Header */}
      <SectionHeader title="Skills & Tools" />

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {skillGroups.map((group, groupIdx) => {
          const Icon = group.icon;
          return (
            <div 
              key={group.title} 
              className="glass-card p-6 sm:p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-border-light pb-4">
                  <div className="p-2 rounded-lg bg-primary-teal/10 text-primary-teal shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-headings font-semibold text-lg text-text-primary">
                    {group.title}
                  </h3>
                </div>

                {/* Staggered Pill Tags */}
                <motion.div 
                   variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="flex flex-wrap gap-2.5 pt-2"
                >
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={pillVariants}
                      whileHover={{ scale: 1.02 }}
                      className="px-3.5 py-1.5 rounded-full border border-border-light bg-background text-text-secondary hover:text-primary-teal hover:border-primary-teal/30 hover:bg-primary-teal/5 text-xs sm:text-sm font-body font-medium transition-all duration-200 cursor-default select-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievements Sub-Section */}
      <div className="space-y-4 border-t border-border-light pt-12">
        <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-6">
          Key Achievements & Credentials
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((ach, idx) => (
            <div 
              key={idx}
              className="bg-surface-light border border-border-light p-5 rounded-xl flex items-center gap-4 transition-all duration-300 hover:border-primary-teal/30 hover:shadow-lg hover:shadow-primary-teal/5 group"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 shrink-0 transition-transform group-hover:scale-105">
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              </div>
              <p className="text-[13px] font-body text-text-secondary leading-relaxed font-normal">
                {ach}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
