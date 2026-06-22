'use client';

import { useEffect } from 'react';

export default function FloatingParticles() {
  useEffect(() => {
    // Inject root container directly into document.body
    const container = document.createElement('div');
    container.id = 'particle-root';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    `;
    document.body.insertBefore(container, document.body.firstChild);

    // Inject stylesheet
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes particleFloat {
        0%   { transform: translateY(0vh);    opacity: 0;   }
        5%   { opacity: 1; }
        92%  { opacity: 0.8; }
        100% { transform: translateY(-105vh); opacity: 0;   }
      }
    `;
    document.head.appendChild(style);

    const strings = [
      "∑ 4.7M","R² 0.685","p < 0.05","n=50,000","RMSE 3.35",
      "μ 0.923","σ 12.4","NULL","JOIN","AVG()","→ 28%","KPI",
      "ETL","Monte Carlo","VaR","LASSO","R² 0.89","DoE",
      "p-value","χ²","β₁","OLS","MAE 267","CI 95%",
      "∫ dx","Σᵢ","H₀","H₁","σ²","→ 3.1×","n=482",
      "F-stat","AIC","BIC","λ=0.02","k-fold","ANOVA"
    ];

    for (let i = 0; i < 40; i++) {
      const span = document.createElement('span');
      span.textContent = strings[Math.floor(Math.random() * strings.length)];
      
      const duration = 15 + Math.random() * 20; // 15-35 seconds
      const delay = -(Math.random() * 35);      // negative = already moving
      const leftPct = 2 + Math.random() * 93;  // 2% to 95%
      const size = Math.random() > 0.5 ? '12px' : '14px';
      const opacity = 0.18 + Math.random() * 0.12; // 0.18 to 0.30
      
      span.style.cssText = `
        position: absolute;
        left: ${leftPct}%;
        bottom: -30px;
        font-family: 'JetBrains Mono', monospace;
        font-size: ${size};
        color: rgba(0, 137, 123, ${opacity});
        white-space: nowrap;
        animation: particleFloat ${duration}s ${delay}s linear infinite;
        will-change: transform;
      `;
      container.appendChild(span);
    }

    return () => {
      // Cleanup DOM nodes on unmount
      if (document.body.contains(container)) document.body.removeChild(container);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  // Return null as we are manually injecting into document.body
  return null;
}
