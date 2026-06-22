'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Demos', href: '/#demos' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll progress computation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for highlighting active section
  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'demos', 'skills', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-primary-teal z-[110] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/85 backdrop-blur-[12px] py-4"
        style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-mono font-semibold text-[13px] text-[#1C1C1E] tracking-tight">
            <span className="hidden min-[380px]:inline">Rahul Kumar Singh</span>
            <span className="inline min-[380px]:hidden">RK Singh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const targetId = item.href.split('#')[1];
                const isActive = activeSection === targetId;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`font-body text-[13px] transition-colors duration-200 ${
                      isActive 
                        ? 'text-[#00897B] font-semibold' 
                        : 'text-[#666666] hover:text-[#1C1C1E]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Open to Work Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[20px] border border-[#A5D6A7] bg-[#E8F5E9] text-[#1B5E20] text-[11px] font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#388E3C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#388E3C]"></span>
              </span>
              <span>Open to work</span>
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Open to Work Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[20px] border border-[#A5D6A7] bg-[#E8F5E9] text-[#1B5E20] text-[10px] font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#388E3C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#388E3C]"></span>
              </span>
              <span>Open</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-6 flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => {
                const targetId = item.href.split('#')[1];
                const isActive = activeSection === targetId;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-headings font-bold text-2xl transition-colors duration-200 ${
                      isActive 
                        ? 'text-[#00897B]' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="space-y-6 border-t border-border-light pt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[20px] border border-[#A5D6A7] bg-[#E8F5E9] text-[#1B5E20] text-[11px] font-medium tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#388E3C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#388E3C]"></span>
                </span>
                <span>Open to work</span>
              </div>

              <div className="flex gap-4 text-xs text-text-muted">
                <span>© 2026 Rahul Singh</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
