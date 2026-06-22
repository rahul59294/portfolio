'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const csvFiles = [
  "1731674068078_TATA IPL 2025- Auction List -15.11.24.csv",
  "Batting_scores.csv",
  "CSK_Batting.csv",
  "CSK_Bowling.csv",
  "DC_Batting.csv",
  "DC_Bowling.csv",
  "Economy_scores.csv",
  "GT_Batting.csv",
  "GT_Bowling.csv",
  "KKR_Batting.csv",
  "KKR_Bowling.csv",
  "LSG_Batting.csv",
  "LSG_Bowling.csv",
  "MI_Batting.csv",
  "MI_Bowling.csv",
  "PBKS_Batting.csv",
  "PBKS_Bowling.csv",
  "RCB_batting.csv",
  "RCB_bowling.csv",
  "RR_Batting.csv",
  "RR_Bowling.csv",
  "SRH_Batting.csv",
  "SRH_Bowling.csv",
  "SR_scores.csv",
  "auction_analysis.csv",
  "batting_data.csv",
  "batting_order.csv",
  "bowling_data.csv",
  "bowling_order.csv",
  "bowling_scores.csv",
  "cleaned_auction_dataset.csv",
  "dismissals.csv",
  "fielding_data.csv",
  "fielding_scores.csv",
  "final_auction_features.csv",
  "ipl_2025_auction_players.csv",
  "match_data.csv",
  "model_predictions.csv",
  "other_score.csv",
  "overvalued_players.png",
  "partnership_by_runs.csv",
  "partnership_by_wickets.csv",
  "undervalued_players.png"
];

export default function IPLSimulatorPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const initStlite = async () => {
      // Create the files mapping
      const stliteFiles: Record<string, any> = {
        'app.py': { url: '/app.py' }
      };
      
      csvFiles.forEach(file => {
        stliteFiles[`Data/${file}`] = { url: `/Data/${file}` };
        stliteFiles[file] = { url: `/Data/${file}` };
      });

      // Inject the stlite CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@stlite/mountable@0.75.0/build/stlite.css';
      link.id = 'stlite-css';
      if (!document.getElementById('stlite-css')) {
        document.head.appendChild(link);
      }

      // Inject the stlite script
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@stlite/mountable@0.75.0/build/stlite.js';
      script.id = 'stlite-js';
      
      script.onload = () => {
        console.log("stlite script loaded successfully!");
        const mountFn = (window as any).stlite?.mount;
        
        if (mountFn) {
          mountFn({
            requirements: ['pandas', 'numpy', 'scikit-learn', 'matplotlib'],
            entrypoint: 'app.py',
            files: stliteFiles,
          }, containerRef.current!);
          console.log("stlite mounted successfully!");
          setLoading(false);
        } else {
          console.error("stlite.mount is not available on window object");
        }
      };
      
      if (!document.getElementById('stlite-js')) {
        document.body.appendChild(script);
      } else {
        // If already loaded from previous navigation
        if ((window as any).stlite?.mount) {
          script.onload(new Event('load'));
        }
      }

    };

    initStlite();

    return () => {
      // Cleanup CSS and Script to prevent global style leaks (like red a tags) on other Next.js pages
      const cssLink = document.getElementById('stlite-css');
      if (cssLink) cssLink.remove();
      
      // We leave the script tag so it doesn't have to re-download, but Streamlit mutates body.
      // Streamlit adds overflow: hidden to body. We must remove it on unmount!
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="h-screen bg-[#0f1116] flex flex-col items-center overflow-hidden">
      <Head>
        <title>IPL Analytics Hub</title>
      </Head>
      
      <div className="w-full flex justify-between items-center px-6 py-4 bg-[#1a1d27] border-b border-[#ffffff10] shrink-0">
         <Link href="/" className="text-white hover:text-[#00897B] transition-colors flex items-center gap-2 text-sm font-semibold">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
           </svg>
           Back to Portfolio
         </Link>
         <div className="font-mono text-xs text-[#ffffff50] flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           Python Runtime Active
         </div>
      </div>
      
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-white w-full py-20">
          <div className="w-12 h-12 border-4 border-[#00897B] border-t-transparent rounded-full animate-spin mb-6" />
          <h2 className="text-2xl font-bold mb-3 font-headings">Initializing Simulator...</h2>
          <p className="text-[#AAAAAA] text-[15px] text-center max-w-md leading-relaxed font-body">
            Downloading Python environment, Scikit-Learn models, and datasets into your browser.<br/><br/>
            This might take 10-20 seconds on your first visit, but it runs entirely offline afterwards!
          </p>
        </div>
      )}
      
      {/* Streamlit Container */}
      <div 
        ref={containerRef} 
        data-lenis-prevent="true"
        className={`w-full transition-opacity duration-1000 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 flex-1'}`}
      />
    </div>
  );
}
