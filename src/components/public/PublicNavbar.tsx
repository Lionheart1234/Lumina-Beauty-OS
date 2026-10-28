import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ActiveRole } from '../../types';

interface Props {
  onOpenOnboarding: () => void;
  onNavigateToRole: (role: ActiveRole) => void;
}

export const PublicNavbar: React.FC<Props> = ({ onOpenOnboarding, onNavigateToRole }) => {
  return (
    <nav className="border-b border-[#1C4435] bg-[#0A1B14]/95 backdrop-blur-md sticky top-9 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigateToRole('public_marketing')}>
          <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center text-[#0A1B14] font-black text-lg shadow-lg shadow-[#C9A86A]/20">
            L
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">LUMINA</span>
              <span className="text-[10px] uppercase tracking-widest text-[#C9A86A] font-bold border border-[#C9A86A]/40 rounded px-1.5 py-0.2 bg-[#C9A86A]/10">
                BEAUTY OS
              </span>
            </div>
            <p className="text-[11px] text-[#E5EBE7]/70 font-normal">Modern Business Platform</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#E5EBE7]">
          <a href="#features" className="hover:text-white transition-colors">Platform Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Transparent Pricing</a>
          <a href="#calculator" className="hover:text-white transition-colors">Savings Calculator</a>
          <button
            onClick={() => onNavigateToRole('marketplace')}
            className="hover:text-[#C9A86A] transition-colors flex items-center gap-1"
          >
            <span>Beauty Directory</span>
            <span className="text-[10px] bg-[#C9A86A]/20 text-[#C9A86A] px-1.5 py-0.5 rounded-full font-bold">New</span>
          </button>
        </div>

        {/* CTA Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToRole('solo_dashboard')}
            className="text-sm font-medium text-[#E5EBE7] hover:text-white px-3 py-2 transition-colors hidden sm:block"
          >
            Pro Sign In
          </button>
          <button
            onClick={onOpenOnboarding}
            className="text-sm font-bold px-4 py-2.5 rounded-xl gold-gradient-bg text-[#0A1B14] shadow-lg shadow-[#C9A86A]/20 transition-all flex items-center gap-2 group cursor-pointer hover:brightness-105"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
