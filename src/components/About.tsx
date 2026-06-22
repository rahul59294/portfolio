'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillsData = [
  { name: 'R', level: 90, context: 'Primary language for statistical analysis' },
  { name: 'Python', level: 88, context: 'Used for ML, automation & Streamlit apps' },
  { name: 'SQL', level: 85, context: 'ETL pipelines & database querying' },
  { name: 'Power BI', level: 82, context: 'KPI dashboards & stakeholder reporting' },
  { name: 'ML', level: 80, context: 'Scikit-learn, Random Forest, LASSO' },
  { name: 'Excel', level: 85, context: 'Data validation & pivot analysis' },
];

function SkillBar({ skill, index, selectedIndex, setSelectedIndex }: any) {
  const isSelected = selectedIndex === skill.name;
  const isDimmed = selectedIndex !== null && !isSelected;
  const [hovered, setHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(trackRef, { once: true, margin: "-50px" });

  return (
    <div
      className="relative flex items-center group cursor-pointer py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setSelectedIndex(isSelected ? null : skill.name)}
      style={{ opacity: isDimmed ? 0.5 : 1, transition: 'opacity 0.2s ease' }}
    >
      {/* Row Label */}
      <div
        className="w-[125px] shrink-0 font-body text-[13px] text-[rgba(255,255,255,0.7)] transition-all duration-200 border-l-[3px] pl-[10px] flex items-center h-[28px]"
        style={{ borderColor: isSelected ? '#00897B' : 'transparent', fontWeight: isSelected ? 600 : 500 }}
      >
        {skill.name}
      </div>

      {/* Bar Track */}
      <div
        ref={trackRef}
        className="flex-1 h-[28px] bg-[rgba(255,255,255,0.1)] rounded-r-[4px] relative flex items-center mr-10"
      >
        {/* Fill Bar */}
        <motion.div
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${skill.level}%` } : { width: '0%' }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className="h-full bg-[#00897B] rounded-r-[4px]"
        />

        {/* Percentage Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
          className="absolute font-mono text-[11px] text-[rgba(255,255,255,0.5)] font-medium ml-2 whitespace-nowrap"
          style={{ left: `${skill.level}%` }}
        >
          {skill.level}%
        </motion.div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div className="absolute right-[5%] bottom-[calc(100%)] z-20 w-[240px] bg-[#ffffff] rounded-[10px] p-[10px_14px] shadow-[0_4px_16px_rgba(0,0,0,0.2)] pointer-events-none">
          <div className="font-body text-[13px] text-[#1C1C1E] font-semibold mb-1 leading-none">{skill.name}</div>
          <div className="font-mono text-[16px] text-[#00897B] font-bold mb-2 leading-none">Proficiency: {skill.level}%</div>
          <div className="font-body text-[11px] text-[#666666] leading-[1.4]">{skill.context}</div>
        </div>
      )}
    </div>
  );
}

export default function About() {
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);

  return (
    <section
      id="about"
      className="relative w-full bg-[#1C1C1E] py-[96px] select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">

        {/* Section Heading */}
        <div className="mb-[40px] overflow-hidden">
          <motion.h2
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-headings font-bold text-[40px] text-[#ffffff] tracking-tight"
          >
            About Me
          </motion.h2>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] items-stretch">

          {/* LEFT COLUMN: Bio and Info Chips */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[rgba(255,255,255,0.04)] rounded-[20px] p-[36px_40px] border-[0.5px] border-[rgba(255,255,255,0.08)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h3 className="font-body font-semibold text-[20px] text-[#ffffff] leading-snug">
                I speak fluent Python and even more fluent statistics.
              </h3>
              <p className="text-[15px] font-body text-[rgba(255,255,255,0.65)] leading-[1.8] font-normal">
                I'm Rahul, a postgraduate statistics student from <span style={{ color: '#00897B', fontWeight: 500 }}>Amity University</span> with hands-on experience at the Ministry of Statistics and Programme Implementation (<span style={{ color: '#00897B', fontWeight: 500 }}>MoSPI</span>), where I processed <span style={{ color: '#00897B', fontWeight: 500 }}>50,000+</span> macroeconomic records and built KPI dashboards that reached real policymakers.
              </p>
              <p className="text-[15px] font-body text-[rgba(255,255,255,0.65)] leading-[1.8] font-normal">
                My work sits at the intersection of rigorous statistical methodology and practical business impact — from <span style={{ color: '#00897B', fontWeight: 500 }}>Monte Carlo simulations</span> and <span style={{ color: '#00897B', fontWeight: 500 }}>LASSO regression</span> to <span style={{ color: '#00897B', fontWeight: 500 }}>Power BI</span> dashboards and <span style={{ color: '#00897B', fontWeight: 500 }}>Streamlit</span> apps. I don't just run models; I translate them into decisions.
              </p>
            </div>

            {/* Row of Three Info Chips */}
            <div className="flex flex-wrap gap-3 mt-8">
              {/* Chip 1 */}
              <div className="px-[14px] py-[7px] bg-[rgba(255,255,255,0.07)] border-[0.5px] border-[rgba(255,255,255,0.12)] rounded-[20px] text-[13px] text-[rgba(255,255,255,0.7)] font-body hover:bg-[rgba(0,137,123,0.15)] hover:border-[rgba(0,137,123,0.4)] hover:text-[#4DB6AC] transition-colors cursor-default">
                M.Sc. Statistics · Amity University
              </div>

              {/* Chip 2 */}
              <div className="px-[14px] py-[7px] bg-[rgba(255,255,255,0.07)] border-[0.5px] border-[rgba(255,255,255,0.12)] rounded-[20px] text-[13px] text-[rgba(255,255,255,0.7)] font-body hover:bg-[rgba(0,137,123,0.15)] hover:border-[rgba(0,137,123,0.4)] hover:text-[#4DB6AC] transition-colors cursor-default">
                MoSPI Intern · Govt. of India
              </div>

              {/* Chip 3 */}
              <div className="px-[14px] py-[7px] bg-[rgba(255,255,255,0.07)] border-[0.5px] border-[rgba(255,255,255,0.12)] rounded-[20px] text-[13px] text-[rgba(255,255,255,0.7)] font-body hover:bg-[rgba(0,137,123,0.15)] hover:border-[rgba(0,137,123,0.4)] hover:text-[#4DB6AC] transition-colors cursor-default">
                Dhanbad, India
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Animated Interactive Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[rgba(255,255,255,0.05)] rounded-[20px] p-[28px_32px] border-[0.5px] border-[rgba(255,255,255,0.08)] flex flex-col justify-center"
          >
            {/* Chart Header Row */}
            <div className="flex items-center justify-between mb-[16px]">
              <h3 className="font-body font-semibold text-[14px] text-[#ffffff]">Technical Proficiency</h3>
              <span className="font-body italic text-[12px] text-[rgba(255,255,255,0.4)]">Click any bar to explore</span>
            </div>

            <div className="flex flex-col gap-2 relative">
              {skillsData.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
