import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, TrendingUp, Flame } from 'lucide-react';
import { ActiveRole } from '../../types';

interface Props {
  onOpenOnboarding: () => void;
  onNavigateToRole?: (role: ActiveRole) => void;
}

export const PricingSection: React.FC<Props> = ({ onOpenOnboarding }) => {
  const [monthlyBookings, setMonthlyBookings] = useState<number>(100);
  const [avgTicket, setAvgTicket] = useState<number>(120);

  // Math for calculator
  const monthlyRevenue = monthlyBookings * avgTicket;
  
  // Competitor comparison estimates:
  // Vagaro: $30 base + $10 website + $10 forms + $10 custom booking + staff add-ons = ~$80/mo minimum
  // Fresha: 20% on ~25% new clients = 0.20 * (monthlyRevenue * 0.25) = 5% of gross revenue = $600/mo!
  const luminaAnnualCost = 39.99 * 12;
  const competitorTypicalAnnualCost = (monthlyRevenue * 0.035 * 12) + (50 * 12);
  const annualSavings = Math.max(1200, Math.round(competitorTypicalAnnualCost - luminaAnnualCost));

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#07130E] border-t border-[#1B362A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C9A86A] px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-white/10">
            No Hidden Fees • Flat Rates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Predictable Pricing Designed for Growth
          </h2>
          <p className="text-[#D5DFDA] text-base md:text-lg">
            Every subscription includes access to every software feature. No premium feature gates, no paywalls for basic tools, and no limits on appointments, services, or client records.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          
          {/* Card 1: Solo Plan */}
          <div className="relative rounded-3xl bg-[#0D221A] border border-white/20 shadow-xl p-8 shadow-2xl flex flex-col justify-between group hover:border-[#F4E4C4] transition-colors">
            <div className="absolute -top-3.5 left-8 px-3.5 py-0.5 rounded-full gold-gradient-bg text-[#07130E] text-[11px] font-bold uppercase tracking-wider shadow-md">
              Most Popular for Solo Pros
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Solo Professional</h3>
                <p className="text-[#D5DFDA]/80 text-sm mt-1">
                  Built for independent estheticians, hairstylists, barbers, nail techs, lash artists, and massage therapists.
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white tracking-tight">$39.99</span>
                <span className="text-[#D5DFDA]/70 text-sm font-medium">/ month</span>
              </div>

              <p className="text-xs text-white/90 font-medium bg-[#091712] border border-white/10 rounded-xl p-3">
                ✓ Full access to every platform feature. Never pay to unlock tools.
              </p>

              <div className="space-y-3 pt-4 border-t border-[#1B362A] text-sm text-[#D5DFDA]">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Online Booking Engine:</strong> Real-time calendar availability</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Backbar Pro™ Demand Engine:</strong> Mask open slots to appear booked-out & busy</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Appointment Controls:</strong> Accept or Decline booking requests</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Personal Booking Microsite:</strong> Branded handle (e.g. <code>lumina.app/glow-skin</code>)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Customizable Intake & Waivers:</strong> Custom fields & digital signatures</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Point-of-Sale Terminal:</strong> 18%, 20%, 25%, and Custom tips</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Public Directory Listing:</strong> Discovered by local consumers</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>No Limits:</strong> Unlimited clients, appointments, and services</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenOnboarding}
                className="w-full py-4 px-4 rounded-xl gold-gradient-bg text-[#07130E] font-bold text-sm transition-all shadow-lg shadow-[#C9A86A]/20 flex items-center justify-center gap-2 cursor-pointer hover:brightness-105"
              >
                <span>Get Started with Solo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-[#D5DFDA]/60 mt-2">14-day free trial • Cancel anytime</p>
            </div>
          </div>

          {/* Card 2: Salon & Teams Plan */}
          <div className="relative rounded-3xl bg-[#0D221A] border border-white/10 p-8 shadow-2xl flex flex-col justify-between hover:border-white/30 transition-colors">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Salon & Teams</h3>
                <p className="text-[#D5DFDA]/80 text-sm mt-1">
                  Engineered for multi-chair salons, barbershops, med spas, and wellness collectives managing up to 10 professionals.
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white tracking-tight">$59.99</span>
                <span className="text-[#D5DFDA]/70 text-sm font-medium">/ month</span>
              </div>

              <p className="text-xs text-[#D5DFDA] font-medium bg-[#091712] border border-white/10 rounded-xl p-3">
                ✓ Includes everything in Solo, upgraded for collaborative teams & booth renters.
              </p>

              <div className="space-y-3 pt-4 border-t border-[#1B362A] text-sm text-[#D5DFDA]">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Up to 10 Team Members:</strong> Stylists, assistants, therapists</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Multi-Provider Calendar:</strong> Side-by-side staff column scheduling</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Booth Renter Isolation:</strong> Independent pros maintain private books</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Backbar Pro™ for All Chairs:</strong> Individual or salon-wide look-busy buffers</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Team Permissions:</strong> Owner, Manager, Staff, Front Desk access</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Commission & Rent Tracking:</strong> Automated split calculations</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span><strong>Shared Front Desk POS:</strong> Checkout clients for any provider</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenOnboarding}
                className="w-full py-4 px-4 rounded-xl bg-[#091712] hover:bg-[#1B362A] text-white font-bold text-sm transition-all border border-white/20/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Started with Salon & Teams</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-[#D5DFDA]/60 mt-2">14-day free trial • Cancel anytime</p>
            </div>
          </div>

        </div>

        {/* Section 2: Interactive ROI & Fee Comparison Calculator */}
        <div id="calculator" className="max-w-4xl mx-auto rounded-3xl bg-[#0D221A] border border-white/10 p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#1B362A]">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#C9A86A]" />
                <h3 className="text-xl font-bold text-white">Compare Your Annual Savings</h3>
              </div>
              <p className="text-sm text-[#D5DFDA] mt-1">
                See how much you keep by switching from percentage-taking or tier-locking platforms.
              </p>
            </div>
            <div className="bg-[#C9A86A]/15 border border-white/10 rounded-2xl px-5 py-2.5 text-right">
              <p className="text-[10px] uppercase font-bold text-[#C9A86A]">Estimated Annual Savings</p>
              <p className="text-2xl font-bold text-white">${annualSavings.toLocaleString()} <span className="text-xs text-[#D5DFDA] font-normal">/ yr</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-[#D5DFDA]">Monthly Appointments:</span>
                  <span className="text-[#C9A86A] font-bold font-mono">{monthlyBookings} appointments</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="10"
                  value={monthlyBookings}
                  onChange={(e) => setMonthlyBookings(Number(e.target.value))}
                  className="w-full accent-[#C9A86A] h-2 bg-[#07130E] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-[#D5DFDA]">Average Service Price:</span>
                  <span className="text-[#C9A86A] font-bold font-mono">${avgTicket} / service</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="300"
                  step="10"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full accent-[#C9A86A] h-2 bg-[#07130E] rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-[#07130E] rounded-xl border border-white/10 text-xs text-[#D5DFDA] space-y-1">
                <p>Estimated Monthly Volume: <strong className="text-white">${monthlyRevenue.toLocaleString()}</strong></p>
                <p>Standard payment card processing passed directly with zero platform markup.</p>
              </div>
            </div>

            {/* Comparison breakdown table */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#091712] border border-white/20 shadow-xl flex justify-between items-center shadow-md">
                <div>
                  <p className="font-bold text-white text-sm">Lumina Solo</p>
                  <p className="text-[#D5DFDA]">Flat $39.99/mo • 0% platform take</p>
                </div>
                <span className="font-mono font-bold text-[#C9A86A] text-sm">$479.88 / yr</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#07130E] border border-white/10 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">Platforms charging 20% commission</p>
                  <p className="text-[#D5DFDA]/70">20% fee on all first-time new clients</p>
                </div>
                <span className="font-mono font-bold text-rose-400 text-sm">~${Math.round(monthlyRevenue * 0.05 * 12).toLocaleString()} / yr</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#07130E] border border-white/10 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">Add-on Tier Platforms</p>
                  <p className="text-[#D5DFDA]/70">$30 base + per-staff fee + forms add-ons</p>
                </div>
                <span className="font-mono font-bold text-rose-400 text-sm">~$960 - $1,400 / yr</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#07130E] border border-white/10 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">Tier-Gated Booking Apps</p>
                  <p className="text-[#D5DFDA]/70">Higher monthly tiers required to unlock basic features</p>
                </div>
                <span className="font-mono font-bold text-rose-400 text-sm">~$600 - $840 / yr</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
