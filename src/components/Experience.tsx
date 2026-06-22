'use client';

import { useState, useEffect } from 'react';

export default function Experience() {
  const [mospiHovered, setMospiHovered] = useState(false);
  const [ngoHovered, setNgoHovered] = useState(false);

  // Mobile detection for responsive layout
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      id="experience" 
      className="relative w-full bg-[#F4F4F2] pt-[60px] pb-[60px] overflow-visible z-[1] select-none"
    >
      <h2 className="font-headings text-[40px] text-[#1C1C1E] text-center mb-[64px]">
        Experience
      </h2>

      {/* TIMELINE CONTAINER */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP LAYOUT */}
        {!isMobile && (
          <div className="relative w-[70%] mx-auto py-[130px] flex items-center justify-center overflow-visible">
            
            {/* The Horizontal Line */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1.5px]"
              style={{ background: 'linear-gradient(90deg, transparent, #00897B 20%, #00897B 80%, transparent)' }}
            />

            {/* MOSPI NODE */}
            <div 
              className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 z-10"
              onMouseEnter={() => setMospiHovered(true)}
              onMouseLeave={() => setMospiHovered(false)}
            >
              {/* Lines to Satellites */}
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{ zIndex: -1 }}>
                {/* Top-Left: -150, -130 => x2=150, y2=170 */}
                <line x1="300" y1="300" x2="150" y2="170" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: mospiHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                {/* Top-Right: +140, -130 => x2=440, y2=170 */}
                <line x1="300" y1="300" x2="440" y2="170" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: mospiHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                {/* Bottom-Left: -160, +120 => x2=140, y2=420 */}
                <line x1="300" y1="300" x2="140" y2="420" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: mospiHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                {/* Bottom-Right: +130, +120 => x2=430, y2=420 */}
                <line x1="300" y1="300" x2="430" y2="420" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: mospiHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
              </svg>

              {/* Satellites */}
              {/* TOP-LEFT */}
              <div 
                className="absolute top-1/2 left-1/2 w-[110px] h-[110px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-3 pointer-events-none"
                style={{ 
                  transform: `translate(calc(-50% - 150px), calc(-50% - 130px)) scale(${mospiHovered ? 1 : 0})`,
                  opacity: mospiHovered ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s'
                }}
              >
                <div className="font-mono text-[16px] font-bold text-[#00897B] leading-tight mb-1">50,000+</div>
                <div className="font-body text-[11px] text-[#666] leading-tight">Records</div>
              </div>

              {/* TOP-RIGHT */}
              <div 
                className="absolute top-1/2 left-1/2 w-[110px] h-[110px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-3 pointer-events-none"
                style={{ 
                  transform: `translate(calc(-50% + 140px), calc(-50% - 130px)) scale(${mospiHovered ? 1 : 0})`,
                  opacity: mospiHovered ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s'
                }}
              >
                <div className="font-mono text-[16px] font-bold text-[#00897B] leading-tight mb-1">10+ KPIs</div>
                <div className="font-body text-[11px] text-[#666] leading-tight">Power BI</div>
              </div>

              {/* BOTTOM-LEFT */}
              <div 
                className="absolute top-1/2 left-1/2 w-[110px] h-[110px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-3 pointer-events-none"
                style={{ 
                  transform: `translate(calc(-50% - 160px), calc(-50% + 120px)) scale(${mospiHovered ? 1 : 0})`,
                  opacity: mospiHovered ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s'
                }}
              >
                <div className="font-mono text-[14px] font-bold text-[#00897B] leading-tight mb-1">R + Python</div>
                <div className="font-body text-[11px] text-[#666] leading-tight">Tools used</div>
              </div>

              {/* BOTTOM-RIGHT */}
              <div 
                className="absolute top-1/2 left-1/2 w-[110px] h-[110px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-3 pointer-events-none"
                style={{ 
                  transform: `translate(calc(-50% + 130px), calc(-50% + 120px)) scale(${mospiHovered ? 1 : 0})`,
                  opacity: mospiHovered ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.18s'
                }}
              >
                <div className="font-mono text-[16px] font-bold text-[#00897B] leading-tight mb-1">Policy</div>
                <div className="font-body text-[11px] text-[#666] leading-tight">Stakeholder<br/>reporting</div>
              </div>

              {/* Main Bubble */}
              <div 
                className="w-[160px] h-[160px] rounded-full border-[3px] border-white flex flex-col items-center justify-center text-center p-4 cursor-pointer relative z-10"
                style={{ 
                  background: 'radial-gradient(circle at 35% 35%, #4DB6AC, #00897B)',
                  boxShadow: mospiHovered ? '0 12px 40px rgba(0,137,123,0.4)' : '0 8px 32px rgba(0,137,123,0.25)',
                  transform: mospiHovered ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div className="font-headings font-bold text-[22px] text-white leading-[1.2] tracking-wide mb-1">MoSPI</div>
                <div className="font-body font-medium text-[13px] text-white leading-[1.3]">Govt. of India</div>
                <div className="font-body text-[11px] text-white/80 mt-1.5">May–Jul 2025</div>
              </div>

              {/* Label Below */}
              <div className="absolute top-[calc(50%+95px)] left-1/2 -translate-x-1/2 font-body font-semibold text-[15px] text-[#1C1C1E] whitespace-nowrap">
                Data & Analytics Intern
              </div>
            </div>

            {/* NGO NODE */}
            <div 
              className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 z-10"
              onMouseEnter={() => setNgoHovered(true)}
              onMouseLeave={() => setNgoHovered(false)}
            >
              {/* Lines to Satellites */}
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{ zIndex: -1 }}>
                {/* TOP-LEFT: -140, -120 => x2=160, y2=180 */}
                <line x1="300" y1="300" x2="160" y2="180" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: ngoHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                {/* TOP-RIGHT: +130, -120 => x2=430, y2=180 */}
                <line x1="300" y1="300" x2="430" y2="180" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: ngoHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                {/* BOTTOM-LEFT: -140, +120 => x2=160, y2=420 */}
                <line x1="300" y1="300" x2="160" y2="420" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: ngoHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
              </svg>

              {/* Satellites */}
              {/* TOP-LEFT */}
              <div 
                className="absolute top-1/2 left-1/2 w-[110px] h-[110px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-3 pointer-events-none"
                style={{ 
                  transform: `translate(calc(-50% - 140px), calc(-50% - 120px)) scale(${ngoHovered ? 1 : 0})`,
                  opacity: ngoHovered ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s'
                }}
              >
                <div className="font-mono text-[18px] font-bold text-[#00897B] leading-tight mb-1">10+</div>
                <div className="font-body text-[11px] text-[#666] leading-tight">Communities<br/>impacted</div>
              </div>

              {/* TOP-RIGHT */}
              <div 
                className="absolute top-1/2 left-1/2 w-[110px] h-[110px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-3 pointer-events-none"
                style={{ 
                  transform: `translate(calc(-50% + 130px), calc(-50% - 120px)) scale(${ngoHovered ? 1 : 0})`,
                  opacity: ngoHovered ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s'
                }}
              >
                <div className="font-mono text-[18px] font-bold text-[#00897B] leading-tight mb-1">₹1L+</div>
                <div className="font-body text-[11px] text-[#666] leading-tight">Fundraised</div>
              </div>

              {/* BOTTOM-LEFT */}
              <div 
                className="absolute top-1/2 left-1/2 w-[110px] h-[110px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-3 pointer-events-none"
                style={{ 
                  transform: `translate(calc(-50% - 140px), calc(-50% + 120px)) scale(${ngoHovered ? 1 : 0})`,
                  opacity: ngoHovered ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s'
                }}
              >
                <div className="font-mono text-[18px] font-bold text-[#00897B] leading-tight mb-1">20+</div>
                <div className="font-body text-[11px] text-[#666] leading-tight">Drives<br/>attended</div>
              </div>

              {/* Main Bubble */}
              <div 
                className="w-[160px] h-[160px] rounded-full border-[3px] border-white flex flex-col items-center justify-center text-center p-4 cursor-pointer relative z-10"
                style={{ 
                  background: 'radial-gradient(circle at 35% 35%, #4DB6AC, #00897B)',
                  boxShadow: ngoHovered ? '0 12px 40px rgba(0,137,123,0.4)' : '0 8px 32px rgba(0,137,123,0.25)',
                  transform: ngoHovered ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div className="font-headings font-bold text-[20px] text-white leading-[1.2] tracking-wide mb-1">Aashraya</div>
                <div className="font-body font-medium text-[13px] text-white leading-[1.3]">NGO</div>
                <div className="font-body text-[11px] text-white/80 mt-1.5">Jul–Oct 2025</div>
              </div>

              {/* Label Below */}
              <div className="absolute top-[calc(50%+95px)] left-1/2 -translate-x-1/2 font-body font-semibold text-[15px] text-[#1C1C1E] whitespace-nowrap">
                Community Outreach Intern
              </div>
            </div>

          </div>
        )}

        {/* MOBILE LAYOUT */}
        {isMobile && (
          <div className="relative w-full flex flex-col items-center py-10 space-y-[240px]">
            {/* Vertical Line */}
            <div 
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px]"
              style={{ background: 'linear-gradient(180deg, transparent, #00897B 10%, #00897B 90%, transparent)' }}
            />

            {/* MOSPI NODE (Mobile) */}
            <div 
              className="relative z-10"
              onMouseEnter={() => setMospiHovered(true)}
              onMouseLeave={() => setMospiHovered(false)}
              onClick={() => setMospiHovered(!mospiHovered)} // Allow tap on mobile
            >
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none" style={{ zIndex: -1 }}>
                <line x1="200" y1="200" x2="80" y2="100" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: mospiHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                <line x1="200" y1="200" x2="320" y2="100" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: mospiHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                <line x1="200" y1="200" x2="80" y2="300" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: mospiHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                <line x1="200" y1="200" x2="320" y2="300" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: mospiHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
              </svg>

              <div 
                className="absolute top-1/2 left-1/2 w-[96px] h-[96px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-2 pointer-events-none"
                style={{ transform: `translate(calc(-50% - 120px), calc(-50% - 100px)) scale(${mospiHovered ? 1 : 0})`, opacity: mospiHovered ? 1 : 0, transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s' }}
              >
                <div className="font-mono text-[14px] font-bold text-[#00897B] leading-tight mb-1">50k+</div>
                <div className="font-body text-[10px] text-[#666] leading-tight">Records</div>
              </div>
              <div 
                className="absolute top-1/2 left-1/2 w-[96px] h-[96px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-2 pointer-events-none"
                style={{ transform: `translate(calc(-50% + 120px), calc(-50% - 100px)) scale(${mospiHovered ? 1 : 0})`, opacity: mospiHovered ? 1 : 0, transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s' }}
              >
                <div className="font-mono text-[14px] font-bold text-[#00897B] leading-tight mb-1">10+ KPIs</div>
                <div className="font-body text-[10px] text-[#666] leading-tight">Power BI</div>
              </div>
              <div 
                className="absolute top-1/2 left-1/2 w-[96px] h-[96px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-2 pointer-events-none"
                style={{ transform: `translate(calc(-50% - 120px), calc(-50% + 100px)) scale(${mospiHovered ? 1 : 0})`, opacity: mospiHovered ? 1 : 0, transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s' }}
              >
                <div className="font-mono text-[12px] font-bold text-[#00897B] leading-tight mb-1">R+Python</div>
                <div className="font-body text-[10px] text-[#666] leading-tight">Tools</div>
              </div>
              <div 
                className="absolute top-1/2 left-1/2 w-[96px] h-[96px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-2 pointer-events-none"
                style={{ transform: `translate(calc(-50% + 120px), calc(-50% + 100px)) scale(${mospiHovered ? 1 : 0})`, opacity: mospiHovered ? 1 : 0, transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.18s' }}
              >
                <div className="font-mono text-[14px] font-bold text-[#00897B] leading-tight mb-1">Policy</div>
                <div className="font-body text-[10px] text-[#666] leading-tight">Impact</div>
              </div>

              <div 
                className="w-[140px] h-[140px] rounded-full border-[3px] border-white flex flex-col items-center justify-center text-center p-3 relative z-10"
                style={{ 
                  background: 'radial-gradient(circle at 35% 35%, #4DB6AC, #00897B)',
                  boxShadow: mospiHovered ? '0 12px 40px rgba(0,137,123,0.4)' : '0 8px 32px rgba(0,137,123,0.25)',
                  transform: mospiHovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div className="font-headings font-bold text-[18px] text-white leading-[1.2] tracking-wide mb-1">MoSPI</div>
                <div className="font-body font-medium text-[12px] text-white leading-[1.3]">Govt. of India</div>
                <div className="font-body text-[10px] text-white/80 mt-1.5">May–Jul 2025</div>
              </div>

              <div className="absolute top-[calc(50%+85px)] left-1/2 -translate-x-1/2 font-body font-semibold text-[14px] text-[#1C1C1E] whitespace-nowrap bg-[#F4F4F2]/90 backdrop-blur-sm px-2 rounded">
                Data & Analytics Intern
              </div>
            </div>

            {/* NGO NODE (Mobile) */}
            <div 
              className="relative z-10"
              onMouseEnter={() => setNgoHovered(true)}
              onMouseLeave={() => setNgoHovered(false)}
              onClick={() => setNgoHovered(!ngoHovered)}
            >
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none" style={{ zIndex: -1 }}>
                <line x1="200" y1="200" x2="80" y2="200" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: ngoHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                <line x1="200" y1="200" x2="320" y2="200" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: ngoHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
                <line x1="200" y1="200" x2="100" y2="300" stroke="rgba(0,137,123,0.3)" strokeWidth="1.5" strokeDasharray="4 3" style={{ opacity: ngoHovered ? 0.6 : 0, transition: 'opacity 0.3s' }} />
              </svg>

              <div 
                className="absolute top-1/2 left-1/2 w-[96px] h-[96px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-2 pointer-events-none"
                style={{ transform: `translate(calc(-50% - 120px), -50%) scale(${ngoHovered ? 1 : 0})`, opacity: ngoHovered ? 1 : 0, transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s' }}
              >
                <div className="font-mono text-[16px] font-bold text-[#00897B] leading-tight mb-1">10+</div>
                <div className="font-body text-[10px] text-[#666] leading-tight">Communities</div>
              </div>
              <div 
                className="absolute top-1/2 left-1/2 w-[96px] h-[96px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-2 pointer-events-none"
                style={{ transform: `translate(calc(-50% + 120px), -50%) scale(${ngoHovered ? 1 : 0})`, opacity: ngoHovered ? 1 : 0, transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s' }}
              >
                <div className="font-mono text-[16px] font-bold text-[#00897B] leading-tight mb-1">₹1L+</div>
                <div className="font-body text-[10px] text-[#666] leading-tight">Fundraised</div>
              </div>
              <div 
                className="absolute top-1/2 left-1/2 w-[96px] h-[96px] bg-white rounded-full border-[1.5px] border-[rgba(0,137,123,0.3)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center p-2 pointer-events-none"
                style={{ transform: `translate(calc(-50% - 100px), calc(-50% + 100px)) scale(${ngoHovered ? 1 : 0})`, opacity: ngoHovered ? 1 : 0, transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s' }}
              >
                <div className="font-mono text-[16px] font-bold text-[#00897B] leading-tight mb-1">20+</div>
                <div className="font-body text-[10px] text-[#666] leading-tight">Drives<br/>attended</div>
              </div>

              <div 
                className="w-[140px] h-[140px] rounded-full border-[3px] border-white flex flex-col items-center justify-center text-center p-3 relative z-10"
                style={{ 
                  background: 'radial-gradient(circle at 35% 35%, #4DB6AC, #00897B)',
                  boxShadow: ngoHovered ? '0 12px 40px rgba(0,137,123,0.4)' : '0 8px 32px rgba(0,137,123,0.25)',
                  transform: ngoHovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div className="font-headings font-bold text-[18px] text-white leading-[1.2] tracking-wide mb-1">Aashraya</div>
                <div className="font-body font-medium text-[12px] text-white leading-[1.3]">NGO</div>
                <div className="font-body text-[10px] text-white/80 mt-1.5">Jul–Oct 2025</div>
              </div>

              <div className="absolute top-[calc(50%+85px)] left-1/2 -translate-x-1/2 font-body font-semibold text-[14px] text-[#1C1C1E] whitespace-nowrap bg-[#F4F4F2]/90 backdrop-blur-sm px-2 rounded">
                Community Outreach Intern
              </div>
            </div>
            
          </div>
        )}
      </div>
      <div style={{ height: 0, clear: 'both' }} />

      {/* FOOTER HINT */}
      <div className="mt-[32px] w-full max-w-xl mx-auto px-4">
        <div className="w-full h-px bg-[rgba(0,0,0,0.06)] mb-4" />
        <div className="font-body text-[13px] text-[#AAAAAA] text-center">
          Hover on each role to explore key metrics and impact
        </div>
      </div>
    </section>
  );
}
