'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function InteractiveDemos() {
  return (
    <section id="demos" className="relative w-full bg-white pt-[60px] pb-[80px] z-[1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="font-headings text-[40px] text-[#1C1C1E] mb-4">
            Interactive Demos
          </h2>
          <p className="text-[#888888] text-[15px] max-w-2xl mx-auto font-body">
            Experience my data models in action. Play with parameters, simulate outcomes, and explore the predictions firsthand.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="group relative bg-[#1a1d27] rounded-[24px] overflow-hidden border border-[#ffffff10] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,137,123,0.2)] hover:-translate-y-1">
            
            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00897B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
              
              {/* Icon/Visual */}
              <div className="w-24 h-24 shrink-0 rounded-full bg-gradient-to-tr from-[#00897B] to-[#4DB6AC] flex items-center justify-center shadow-lg">
                <span className="text-4xl">🏏</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center md:text-left text-white">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[12px] bg-[#ffffff15] text-[11px] font-mono tracking-wide mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  PYTHON WASM RUNTIME
                </div>
                <h3 className="font-headings text-[28px] font-bold mb-3">
                  IPL Analytics Hub
                </h3>
                <p className="text-[#ffffff80] text-[14px] leading-relaxed font-body mb-6">
                  Build optimal Fantasy XI squads, simulate live match outcomes using Monte Carlo methods, and explore player valuation predictions based on historical and recent stats.
                </p>
                
                <Link 
                  href="/ipl" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1a1d27] px-6 py-3 rounded-full font-bold text-[14px] transition-transform hover:scale-105 active:scale-95"
                >
                  Launch Simulator
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
