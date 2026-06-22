'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';

// Custom Counter Component that counts up on mount
function StatCounter({ value }: { value: number }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = countRef.current;
    if (!node || !isInView) return;

    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate(latest) {
        node.textContent = Math.round(latest).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={countRef}>0</span>;
}

function SineWaveChart() {
  const pathRef1 = useRef<SVGPathElement>(null);
  const pathRef2 = useRef<SVGPathElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      
      if (pathRef1.current && pathRef2.current) {
        const width = 400; // viewbox width
        const height = 60; // viewbox height
        
        let d1 = `M 0 ${height}`;
        let d2 = `M 0 ${height}`;

        for (let x = 0; x <= width; x += 5) {
          const y1 = Math.sin(x * 0.02 + time) * 10 + (height - x * 0.1) - 10;
          const y2 = Math.sin(x * 0.025 + time + 2) * 8 + (height - x * 0.08) - 5;
          
          d1 += ` L ${x} ${Math.min(height, Math.max(0, y1))}`;
          d2 += ` L ${x} ${Math.min(height, Math.max(0, y2))}`;
        }

        pathRef1.current.setAttribute('d', d1);
        pathRef2.current.setAttribute('d', d2);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 60">
      {/* Flat reference line */}
      <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
      {/* Secondary Line */}
      <path ref={pathRef2} fill="none" stroke="#4DB6AC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Primary Line */}
      <path ref={pathRef1} fill="none" stroke="#00897B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  // Framer Motion staggered variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent pt-[80px] pb-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      
      {/* CENTRE CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col items-center text-center z-10 space-y-5"
      >
        {/* Status Pill Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#A5D6A7] bg-[#E8F5E9] text-[#1B5E20] text-[12px] font-medium tracking-wide"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#388E3C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#388E3C]"></span>
          </span>
          <span>Available for opportunities</span>
        </motion.div>

        {/* Pre-heading */}
        <motion.span
          variants={itemVariants}
          className="text-[#AAAAAA] text-[12px] tracking-[0.1em] font-mono uppercase mb-1"
        >
          DATA ANALYST & STATISTICIAN
        </motion.span>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-headings font-bold text-[32px] sm:text-5xl md:text-[64px] leading-[1.1] text-[#1C1C1E] tracking-tight max-w-4xl"
        >
          Turning Raw Data<br />
          Into <span className="text-[#00897B]">Decisions</span> That Matter.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-[16px] text-[#888888] max-w-2xl font-body font-normal leading-relaxed"
        >
          M.Sc. Statistics · Amity University · Skilled in Python, R, SQL, Power BI & ML
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 pt-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-[28px] py-[12px] rounded-[6px] bg-[#1C1C1E] text-white text-sm font-semibold hover:bg-[#1C1C1E]/90 transition-all cursor-pointer"
          >
            View My Work
          </a>
          <a
            href="/Rahul_Kumar_Singh_CV.pdf"
            download="Rahul_Kumar_Singh_CV.pdf"
            className="inline-flex items-center justify-center px-[28px] py-[12px] rounded-[6px] border border-[#1C1C1E] bg-transparent hover:bg-black/5 text-[#1C1C1E] text-sm font-semibold transition-all cursor-pointer"
          >
            Download CV
          </a>
        </motion.div>

        {/* MacBook Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-col items-center w-full max-w-[780px] mx-auto mt-16 mb-4"
        >
          <div 
            className="w-full relative" 
            style={{ animation: 'bob 4s ease-in-out infinite' }}
          >
            <style>{`
              @keyframes bob {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
              }
              @keyframes dash-scroll {
                from { stroke-dashoffset: 100; }
                to { stroke-dashoffset: 0; }
              }
            `}</style>
            
            {/* Outer structure */}
            <div 
              className="w-full bg-[#1a1a1a] rounded-t-[12px] border-2 border-[#333] relative"
              style={{ 
                paddingTop: '62%', 
                boxShadow: '0 20px 60px rgba(0,0,0,0.15), inset 0 0 0 2px #222' 
              }}
            >
              
              {/* Screen inner (glass) */}
              <div className="absolute inset-[8px_8px_0_8px] bg-[#0f0f0f] rounded-[6px] overflow-hidden flex flex-col">
                
                {/* Dashboard bg */}
                <div className="flex-1 bg-[#0f1117] flex flex-col w-full h-full absolute inset-0">
                  
                  {/* TOP BAR */}
                  <div className="h-[8px] bg-[#1a1d27] flex items-center justify-between px-2 shrink-0">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="text-[7px] text-[#ffffff40] font-mono leading-none pt-[1px]">
                      DataDrishti Analytics
                    </div>
                  </div>

                  {/* DASHBOARD CONTENT */}
                  <div className="p-3 flex flex-col gap-[3px] flex-1 overflow-hidden">
                    
                    {/* TOP KPI BAR */}
                    <div className="grid grid-cols-4 gap-[3px] shrink-0">
                      <div className="bg-[#1a1d27] rounded-[4px] p-[6px_8px] flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#00897B] leading-none">50K</span>
                        <span className="font-body text-[7px] text-[#ffffff50] leading-none">Records</span>
                      </div>
                      <div className="bg-[#1a1d27] rounded-[4px] p-[6px_8px] flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#4DB6AC] leading-none">R²=0.89</span>
                        <span className="font-body text-[7px] text-[#ffffff50] leading-none">Accuracy</span>
                      </div>
                      <div className="bg-[#1a1d27] rounded-[4px] p-[6px_8px] flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#10b981] leading-none">28%↑</span>
                        <span className="font-body text-[7px] text-[#ffffff50] leading-none">Impact</span>
                      </div>
                      <div className="bg-[#1a1d27] rounded-[4px] p-[6px_8px] flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#f59e0b] leading-none">600+</span>
                        <span className="font-body text-[7px] text-[#ffffff50] leading-none">Simulations</span>
                      </div>
                    </div>

                    {/* ROW 1: WIDE LINE CHART */}
                    <div className="h-[35%] bg-[#1a1d27] rounded-[4px] relative p-[6px_8px] overflow-hidden shrink-0 flex flex-col">
                      <span className="font-body text-[7px] text-[#ffffff30] absolute top-2 left-2 uppercase tracking-wide z-10">
                        PERFORMANCE TREND
                      </span>
                      {/* y-axis labels */}
                      <div className="absolute left-2 top-6 bottom-4 flex flex-col justify-between text-[6px] text-[#ffffff25] font-mono z-10">
                        <span>100</span>
                        <span>50</span>
                        <span>0</span>
                      </div>
                      {/* x-axis dots */}
                      <div className="absolute left-8 right-2 bottom-2 flex justify-between border-t border-[#ffffff15] pt-1 z-10">
                        <div className="w-0.5 h-0.5 bg-[#ffffff15] rounded-full" />
                        <div className="w-0.5 h-0.5 bg-[#ffffff15] rounded-full" />
                        <div className="w-0.5 h-0.5 bg-[#ffffff15] rounded-full" />
                        <div className="w-0.5 h-0.5 bg-[#ffffff15] rounded-full" />
                        <div className="w-0.5 h-0.5 bg-[#ffffff15] rounded-full" />
                      </div>
                      {/* Chart area */}
                      <div className="absolute left-8 right-2 top-0 bottom-4">
                        <SineWaveChart />
                      </div>
                    </div>

                    {/* ROW 2: THREE PANELS */}
                    <div className="flex gap-[3px] flex-1 min-h-0">
                      
                      {/* PANEL LEFT: Mini Donut Chart */}
                      <div className="w-[35%] bg-[#1a1d27] rounded-[4px] p-[6px_8px] relative overflow-hidden flex flex-col items-center">
                        <span className="font-body text-[6px] text-[#ffffff25] absolute bottom-2 left-0 right-0 text-center uppercase tracking-wide">
                          BY SEGMENT
                        </span>
                        
                        <div className="flex-1 flex items-center justify-center mt-1 w-full">
                          <div 
                            className="w-[52px] h-[52px] rounded-full flex items-center justify-center relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                            style={{ background: 'conic-gradient(#00897B 0% 58%, #4DB6AC 58% 82%, #1a1d27 82% 100%)' }}
                          >
                            <div className="w-[38px] h-[38px] rounded-full bg-[#1a1d27] flex items-center justify-center">
                              <span className="font-mono text-[8px] text-[#00897B] font-bold">58%</span>
                            </div>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-2 mb-4 w-full">
                          <div className="flex items-center gap-1"><div className="w-[4px] h-[4px] rounded-full bg-[#00897B]"></div><span className="text-[6px] text-[#ffffff50] font-body leading-none">A</span></div>
                          <div className="flex items-center gap-1"><div className="w-[4px] h-[4px] rounded-full bg-[#4DB6AC]"></div><span className="text-[6px] text-[#ffffff50] font-body leading-none">B</span></div>
                          <div className="flex items-center gap-1"><div className="w-[4px] h-[4px] rounded-full bg-[#333333]"></div><span className="text-[6px] text-[#ffffff50] font-body leading-none">C</span></div>
                        </div>
                      </div>

                      {/* PANEL MIDDLE: Mini Scatter Plot */}
                      <div className="w-[35%] bg-[#1a1d27] rounded-[4px] p-[6px_8px] relative overflow-hidden flex flex-col">
                        <span className="font-body text-[6px] text-[#ffffff25] absolute top-2 left-2 uppercase tracking-wide">
                          AUCTION MODEL
                        </span>

                        <div className="flex-1 mt-4 mb-2 relative">
                          {/* Faint diagonal reference line */}
                          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <line x1="0" y1="100" x2="100" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
                          </svg>

                          {/* Scatter dots */}
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#f59e0b]" style={{ left: '80%', top: '20%' }} />
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#f59e0b]" style={{ left: '60%', top: '10%' }} />
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#4DB6AC]" style={{ left: '30%', top: '70%' }} />
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#4DB6AC]" style={{ left: '40%', top: '80%' }} />
                          
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#00897B] opacity-70" style={{ left: '25%', top: '85%' }} />
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#00897B] opacity-70" style={{ left: '45%', top: '65%' }} />
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#00897B] opacity-70" style={{ left: '55%', top: '55%' }} />
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#00897B] opacity-70" style={{ left: '65%', top: '35%' }} />
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#00897B] opacity-70" style={{ left: '75%', top: '25%' }} />
                          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#00897B] opacity-70" style={{ left: '85%', top: '15%' }} />
                        </div>
                      </div>

                      {/* PANEL RIGHT: Vertical Bar Chart */}
                      <div className="w-[30%] bg-[#1a1d27] rounded-[4px] p-[6px_8px] flex flex-col relative overflow-hidden">
                        <span className="font-body text-[6px] text-[#ffffff25] absolute top-2 left-2 uppercase tracking-wide">
                          BY DISTRICT
                        </span>
                        
                        <div className="flex-1 mt-5 flex items-end justify-center gap-[6px] px-1 pb-1 border-b border-[#ffffff10]">
                          <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ duration: 1, delay: 1.5 }} className="w-[12px] bg-[#00897B] rounded-t-[2px]" />
                          <motion.div initial={{ height: 0 }} animate={{ height: '65%' }} transition={{ duration: 1, delay: 1.6 }} className="w-[12px] bg-[#1C4A3A] rounded-t-[2px]" />
                          <motion.div initial={{ height: 0 }} animate={{ height: '85%' }} transition={{ duration: 1, delay: 1.7 }} className="w-[12px] bg-[#00897B] rounded-t-[2px]" />
                          <motion.div initial={{ height: 0 }} animate={{ height: '55%' }} transition={{ duration: 1, delay: 1.8 }} className="w-[12px] bg-[#1C4A3A] rounded-t-[2px]" />
                          <motion.div initial={{ height: 0 }} animate={{ height: '95%' }} transition={{ duration: 1, delay: 1.9 }} className="w-[12px] bg-[#00897B] rounded-t-[2px]" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hinge bar */}
            <div className="w-[105%] h-[14px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-[2px] ml-[-2.5%] relative z-[2]" />

            {/* Base/keyboard */}
            <div className="w-[110%] h-[20px] bg-gradient-to-b from-[#e0e0e0] to-[#d0d0d0] rounded-b-[8px] ml-[-5%] shadow-[0_4px_12px_rgba(0,0,0,0.1)]" />

          </div>
          
          {/* Caption */}
          <div className="mt-8 text-[12px] text-[#AAAAAA] italic font-body">
            ↑ DataDrishti — live analytics platform built by Rahul
          </div>
        </motion.div>
      </motion.div>

      {/* BOTTOM LAYER: Animated Stat Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }
          }
        }}
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-[16px] max-w-[860px] mx-auto mt-[48px] px-6 z-10 shrink-0 mb-10"
      >
        {/* CARD 1 */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-white border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-[16px] p-[28px_24px] text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,137,123,0.12)] hover:border-[rgba(0,137,123,0.3)] flex flex-col items-center"
        >
          <svg className="w-[18px] h-[18px] text-[#00897B] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
          <div className="font-mono font-bold text-[42px] text-[#1C1C1E] leading-none mb-2">
            <StatCounter value={50000} /><span className="text-[#00897B]">+</span>
          </div>
          <div className="font-body text-[11px] text-[#AAAAAA] uppercase tracking-[0.08em] mt-[8px]">
            RECORDS ANALYSED
          </div>
        </motion.div>

        {/* CARD 2 */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-white border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-[16px] p-[28px_24px] text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,137,123,0.12)] hover:border-[rgba(0,137,123,0.3)] flex flex-col items-center"
        >
          <svg className="w-[18px] h-[18px] text-[#00897B] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <div className="font-mono font-bold text-[42px] text-[#1C1C1E] leading-none mb-2">
            <StatCounter value={50} /><span className="text-[#00897B]">+</span>
          </div>
          <div className="font-body text-[11px] text-[#AAAAAA] uppercase tracking-[0.08em] mt-[8px]">
            DATASETS WORKED WITH
          </div>
        </motion.div>

        {/* CARD 3 */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-white border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-[16px] p-[28px_24px] text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,137,123,0.12)] hover:border-[rgba(0,137,123,0.3)] flex flex-col items-center"
        >
          <svg className="w-[18px] h-[18px] text-[#00897B] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <div className="font-mono font-bold text-[42px] text-[#1C1C1E] leading-none mb-2">
            <StatCounter value={5} />
          </div>
          <div className="font-body text-[11px] text-[#AAAAAA] uppercase tracking-[0.08em] mt-[8px]">
            PROJECTS COMPLETED
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
