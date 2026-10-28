import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Check, X, Clock, Flame, Sparkles } from 'lucide-react';
import { ActiveRole } from '../../types';

interface Props {
  onOpenOnboarding: () => void;
  onNavigateToRole: (role: ActiveRole) => void;
}

export const Hero: React.FC<Props> = ({ onOpenOnboarding, onNavigateToRole }) => {
  const [demoActionState, setDemoActionState] = useState<'pending' | 'accepted' | 'declined'>('pending');

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-[#07130E]">
      {/* Background Glow Elements - Forest Green & Metallic Gold */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-emerald-950/20 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#0D221A]/40 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D221A] border border-white/10 text-xs font-medium text-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C9A86A] animate-pulse"></span>
              <span className="text-[#C9A86A] font-semibold">Solo $39.99/mo</span>
              <span className="text-[#1B362A]">•</span>
              <span className="text-white">Salon & Teams $59.99/mo</span>
              <span className="text-[#1B362A]">•</span>
              <span className="text-emerald-400 font-medium">Zero Feature Paywalls</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              The Operating System for <span className="gold-gradient-text">Beauty & Wellness</span> Professionals.
            </h1>

            <p className="text-lg text-[#D5DFDA] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience modern, luxury business management without expensive subscription tiers or unexpected transaction cuts. Real-time online booking, customizable intake waivers, 18/20/25% checkout tipping, and our exclusive <strong className="text-white font-semibold">Backbar Pro™ slot-masking engine</strong> to maximize your booked-and-busy perception.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left text-xs text-[#D5DFDA] max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>Real-time availability</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>Accept / Decline requests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>Customizable waivers</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span className="font-semibold text-white">Backbar Pro™ Look-Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>18 / 20 / 25% POS tips</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>Personal booking microsite</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenOnboarding}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl gold-gradient-bg text-[#07130E] font-bold text-base shadow-xl shadow-[#C9A86A]/20 hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Your 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigateToRole('solo_dashboard')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0D221A] hover:bg-[#091712] text-white font-medium text-base border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Live Pro Dashboard</span>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-[#D5DFDA]/80 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                No credit card required to start
              </span>
              <span>•</span>
              <span>Cancel anytime in 1-click</span>
            </div>
          </div>

          {/* Right Column: Interactive Live App Mockup Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="relative rounded-3xl bg-[#0D221A] border border-white/15 p-6 shadow-2xl text-left space-y-4">
                
                {/* Header of Simulated Card */}
                <div className="flex items-center justify-between pb-4 border-b border-[#1B362A]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#091712] border border-white/20/50 flex items-center justify-center text-[#C9A86A] font-bold">
                      SL
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Glow Skin & Esthetics</h4>
                      <p className="text-xs text-[#D5DFDA]">Sarah Lin, LE • Solo Pro</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C9A86A]/15 text-[#C9A86A] border border-white/10">
                    Live Booking OS
                  </span>
                </div>

                {/* Backbar Pro Look-Busy Banner */}
                <div className="bg-[#091712] rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#C9A86A]" />
                    <div>
                      <p className="font-bold text-white">Backbar Pro™ Active</p>
                      <p className="text-[10px] text-[#D5DFDA]">Masking 50% of slots to optimize high-demand perception</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-[#C9A86A] text-[#07130E] px-2 py-0.5 rounded-md">
                    Exclusive
                  </span>
                </div>

                {/* Simulated Notification / Request Feature */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Clock className="w-3.5 h-3.5" />
                      Pending Appointment Request
                    </span>
                    <span className="text-[#D5DFDA] font-mono text-[11px]">Today 10:30 AM</span>
                  </div>

                  <div className="bg-[#07130E] rounded-xl p-4 border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-[#D5DFDA]/70">Client:</p>
                        <p className="text-sm font-semibold text-white">Audrey Sinclair</p>
                        <p className="text-xs text-[#D5DFDA] font-mono">(555) 412-9908</p>
                      </div>
                      <span className="text-xs font-bold text-[#C9A86A] bg-[#C9A86A]/15 px-2 py-1 rounded">
                        $210.00
                      </span>
                    </div>

                    <div className="text-xs text-[#D5DFDA] space-y-1 border-t border-[#1B362A] pt-2.5">
                      <div className="flex justify-between">
                        <span className="text-[#D5DFDA]/70">Service:</span>
                        <span className="font-medium text-white">Bespoke Clinical Glow + LED</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#D5DFDA]/70">Scheduled:</span>
                        <span className="font-medium text-white">Thursday, Oct 29 • 10:30 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#D5DFDA]/70">Custom Waiver:</span>
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Signed & Completed
                        </span>
                      </div>
                    </div>

                    {/* Interactive Accept / Decline Test */}
                    <div className="pt-2">
                      {demoActionState === 'pending' ? (
                        <div>
                          <p className="text-[11px] text-[#D5DFDA] mb-2 italic">
                            Try the Pro approval control:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setDemoActionState('accepted')}
                              className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept Request</span>
                            </button>
                            <button
                              onClick={() => setDemoActionState('declined')}
                              className="py-2 px-3 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-rose-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Decline</span>
                            </button>
                          </div>
                        </div>
                      ) : demoActionState === 'accepted' ? (
                        <div className="bg-emerald-950/40 border border-emerald-700/50 rounded-lg p-2.5 text-center">
                          <p className="text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5">
                            <Check className="w-4 h-4" /> Appointment Confirmed!
                          </p>
                          <p className="text-[11px] text-[#D5DFDA] mt-1">
                            Client notified via email & added to your calendar.
                          </p>
                          <button
                            onClick={() => setDemoActionState('pending')}
                            className="mt-2 text-[10px] text-[#C9A86A] hover:underline"
                          >
                            Reset preview
                          </button>
                        </div>
                      ) : (
                        <div className="bg-rose-950/40 border border-rose-800/50 rounded-lg p-2.5 text-center">
                          <p className="text-xs font-semibold text-rose-300 flex items-center justify-center gap-1.5">
                            <X className="w-4 h-4" /> Request Declined
                          </p>
                          <p className="text-[11px] text-[#D5DFDA] mt-1">
                            Client notified with reason & slot released.
                          </p>
                          <button
                            onClick={() => setDemoActionState('pending')}
                            className="mt-2 text-[10px] text-[#C9A86A] hover:underline"
                          >
                            Reset preview
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick POS summary snippet */}
                  <div className="p-3 rounded-xl bg-[#07130E] border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[#D5DFDA]/70">Checkout Tipping Presets</p>
                      <p className="font-semibold text-white">18% • 20% • 25% • Custom</p>
                    </div>
                    <span className="text-[11px] text-[#C9A86A] font-medium bg-[#C9A86A]/10 px-2 py-1 rounded">
                      Zero Processing Surcharges
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
