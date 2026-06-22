'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Initial paint delay
    const startFade = setTimeout(() => {
      setOpacity(0);
      // Wait for transition duration (800ms)
      const endFade = setTimeout(() => {
        setVisible(false);
      }, 800);
      return () => clearTimeout(endFade);
    }, 50);

    return () => clearTimeout(startFade);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#080b12',
        zIndex: 99999,
        opacity: opacity,
        transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'none',
      }}
    />
  );
}
