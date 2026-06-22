'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function FloatingHomeButton() {
  const pathname = usePathname();

  // Only render on project detail pages
  if (!pathname.startsWith('/projects/')) {
    return null;
  }

  return (
    <Link
      href="/"
      scroll={true}
      className="fixed bottom-[32px] right-[32px] z-50 flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#1C1C1E] shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:bg-[#00897B] hover:scale-[1.08] transition-all duration-200 ease-in-out group cursor-pointer"
    >
      <Home className="w-[20px] h-[20px] text-white" />
      
      {/* Tooltip */}
      <span className="absolute right-[56px] opacity-0 group-hover:opacity-100 bg-[#1C1C1E] text-white text-[11px] font-mono px-[10px] py-[4px] rounded-[6px] pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-sm">
        Home
      </span>
    </Link>
  );
}
