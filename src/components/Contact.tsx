'use client';

import React, { useState } from 'react';
import { Mail, MapPin, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormState('sending');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/rs59294@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormState('sent');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset back to idle after 4 seconds
        setTimeout(() => {
          setFormState('idle');
        }, 4000);
      } else {
        console.error("Form submission failed");
        setFormState('idle');
      }
    } catch (error) {
      console.error("Form submission error", error);
      setFormState('idle');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border-light bg-transparent flex flex-col justify-between min-h-[70vh] relative z-[2]"
    >
      <div className="flex-1">
        {/* Section Header */}
        <SectionHeader title="Let's Work Together" />
        <p className="text-text-secondary text-sm font-body -mt-8 mb-16 max-w-2xl leading-relaxed">
          Open to full-time analyst roles, freelance projects, and research collaborations.
        </p>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* LEFT COLUMN: Info Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* Card 1: Email */}
            <a 
              href="mailto:rs59294@gmail.com" 
              className="bg-surface-light border border-border-light hover:border-primary-teal/30 hover:shadow-lg hover:shadow-primary-teal/5 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 group"
            >
              <div className="p-2.5 rounded-lg bg-primary-teal/10 text-primary-teal shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Email Address</h4>
                <p className="text-[12px] text-text-primary font-medium truncate font-mono mt-0.5">rs59294@gmail.com</p>
              </div>
            </a>

            {/* Card 2: GitHub */}
            <a 
              href="https://github.com/rahulsingh" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-surface-light border border-border-light hover:border-primary-teal/30 hover:shadow-lg hover:shadow-primary-teal/5 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 group"
            >
              <div className="p-2.5 rounded-lg bg-primary-teal/10 text-primary-teal shrink-0 group-hover:scale-105 transition-transform">
                <GithubIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-wider">GitHub Profile</h4>
                <p className="text-[12px] text-text-primary font-medium truncate font-mono mt-0.5">github.io/rahulsingh</p>
              </div>
            </a>

            {/* Card 3: Location */}
            <div className="bg-surface-light border border-border-light rounded-xl p-4 flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-primary-teal/10 text-primary-teal shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Location</h4>
                <p className="text-[12px] text-text-primary font-medium truncate mt-0.5">Dhanbad, Jharkhand, India</p>
              </div>
            </div>

            {/* Card 4: Status */}
            <div className="bg-surface-light border border-border-light rounded-xl p-4 flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-success-pos/10 text-success-pos shrink-0 relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-success-pos/30 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-success-pos"></span>
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Status</h4>
                <p className="text-[12px] text-text-primary font-semibold mt-0.5">Open to opportunities</p>
                <p className="text-[11px] text-text-muted mt-0.5 leading-none">Actively looking for analyst roles</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={formState !== 'idle'}
                    placeholder="Enter name"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border-light text-text-primary text-[13px] placeholder-text-muted focus:border-primary-teal/50 focus:outline-none transition-all disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={formState !== 'idle'}
                    placeholder="Enter email"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border-light text-text-primary text-[13px] placeholder-text-muted focus:border-primary-teal/50 focus:outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={formState !== 'idle'}
                  placeholder="Tell me about your project or role..."
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border-light text-text-primary text-[13px] placeholder-text-muted focus:border-primary-teal/50 focus:outline-none transition-all disabled:opacity-50 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState !== 'idle'}
                className={`w-full py-3.5 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                  formState === 'sent'
                    ? 'bg-success-pos/15 border border-success-pos/30 text-success-pos'
                    : 'bg-primary-teal text-white hover:bg-primary-teal/90 hover:shadow-lg hover:shadow-primary-teal/15 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed'
                }`}
              >
                {formState === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
                {formState === 'sending' && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                )}
                {formState === 'sent' && (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Message Sent ✓</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-border-light pt-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left */}
          <span className="text-[13px] text-text-secondary font-medium tracking-tight">
            Rahul Kumar Singh · Data Analyst
          </span>

          {/* Centre */}
          <span className="text-[11px] text-text-muted font-body">
            Built with Next.js · Designed for data.
          </span>

          {/* Right */}
          <div className="flex items-center gap-6 text-[12px] text-text-secondary font-medium">
            <a 
              href="https://github.com/rahulsingh" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-text-primary transition-colors font-mono"
            >
              GitHub
            </a>
            <a 
              href="mailto:rs59294@gmail.com" 
              className="hover:text-text-primary transition-colors font-mono"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
