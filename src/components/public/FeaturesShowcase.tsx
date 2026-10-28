import React, { useState } from 'react';
import {
  Calendar,
  Flame,
  CreditCard,
  FileText,
  Smartphone,
  Layers,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const FeaturesShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'busy' | 'booking' | 'crm' | 'checkout' | 'microsite' | 'teams'>('busy');

  const features = {
    busy: {
      title: 'Backbar Pro™: Demand Accelerator & Slot Masking',
      badge: 'Exclusive to Lumina (Not on Legacy Platforms)',
      desc: 'Legacy beauty apps display your wide-open calendar to the public, inadvertently making new or growing professionals look slow. Backbar Pro™ intelligently masks a configurable percentage of open slots from your public booking microsite—engineering high-demand perception, scarcity, and instant client urgency.',
      bullets: [
        'Configurable Look-Busy Modes: Conservative (30% masked), Moderate (50% masked), or High-Demand Exclusive (2-3 coveted slots/day)',
        'Optional "Only 2 slots remaining today!" FOMO banner on your client booking microsite',
        'Your internal professional calendar always shows 100% of your real availability for manual and walk-in bookings',
        'Helps solo estheticians, barbers, and stylists command premium rates and fill schedules faster'
      ],
      previewImg: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80'
    },
    booking: {
      title: 'Precision Scheduling & Real-Time Availability',
      badge: 'Scheduling & Booking',
      desc: 'Set custom service durations, cleanup buffer times, and booking policies. Choose between instant auto-confirmation or manual accept/decline approval for every appointment request.',
      bullets: [
        'Real-time multi-view calendar (Day, Week, and Staff Columns)',
        'Mandatory deposits to protect against no-shows',
        'Accept or Decline appointment requests with optional custom reasons',
        'Automatic buffer times between services for sanitation and prep'
      ],
      previewImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
    },
    crm: {
      title: 'Customizable Digital Intake Forms & Liability Waivers',
      badge: 'Client CRM & Safety',
      desc: 'Customize the exact consultation questions and liability disclaimers your clients must complete before booking on your microsite. Never forget a client’s hair color formula, lash curl mapping, or peel tolerance.',
      bullets: [
        'Fully customizable questionnaires on your client booking microsite',
        'Digital consultation forms with skin/hair contraindications and allergy tracking',
        'Touch-screen digital signatures on client phones and tablets',
        'Private technical formula cards for estheticians, barbers, and colorists'
      ],
      previewImg: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80'
    },
    checkout: {
      title: 'Seamless Point-of-Sale with Custom Tipping',
      badge: 'Payment & POS',
      desc: 'Close out appointments in seconds. Upsell retail products, apply discounts, and prompt for tips with convenient 18%, 20%, 25%, or custom amount options.',
      bullets: [
        'One-tap tipping presets (18%, 20%, 25%, Custom, or No Tip)',
        'Cart builder for both service tickets and retail inventory',
        'Digital receipt generation via email or SMS simulation',
        'Zero platform transaction surcharges'
      ],
      previewImg: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80'
    },
    microsite: {
      title: 'Your Own Personalized Booking Website',
      badge: 'Personalized Web Presence',
      desc: 'Every subscriber receives a mobile-optimized, luxury booking microsite featuring their branding, portfolio photos, customizable service menu, custom intake waivers, and Backbar Pro scarcity controls.',
      bullets: [
        'Custom vanity handle (e.g. lumina.app/glow-skin)',
        'Customizable pre-service intake waivers & signature pad',
        'Mobile-first client experience designed to maximize booking conversion',
        'Direct 1-tap add to Google and Apple Calendars'
      ],
      previewImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    },
    teams: {
      title: 'Multi-Provider Scheduling & Booth Renter Isolation',
      badge: 'Salon & Teams ($59.99/mo)',
      desc: 'Run a 10-chair salon or wellness collective smoothly. Independent booth renters can manage their own private books while connecting to the salon’s front-desk directory.',
      bullets: [
        'Side-by-side multi-provider column scheduling',
        'Custom commission splits and booth rent tracking',
        'Role-based permissions (Owner, Manager, Staff, Front Desk)',
        'Independent booth renter data privacy partitioning'
      ],
      previewImg: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
    }
  };

  const current = features[activeTab];

  return (
    <section id="features" className="py-20 md:py-28 bg-[#07130E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C9A86A] px-3.5 py-1 rounded-full bg-[#C9A86A]/10 border border-white/10">
            Engineered for Beauty & Wellness
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Everything You Need to Operate & Scale
          </h2>
          <p className="text-[#D5DFDA] text-base md:text-lg">
            Purpose-built tools that streamline your daily appointments, delight your clients, and protect your profit margins.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          <button
            onClick={() => setActiveTab('busy')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'busy'
                ? 'gold-gradient-bg text-[#07130E] shadow-lg shadow-[#C9A86A]/20 font-extrabold'
                : 'bg-[#0D221A] border border-white/10 text-[#D5DFDA] hover:text-white hover:border-white/30/50'
            }`}
          >
            <Flame className="w-4 h-4 text-[#C9A86A]" />
            <span>Backbar Pro™ (Look Busy)</span>
          </button>

          <button
            onClick={() => setActiveTab('booking')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'booking'
                ? 'gold-gradient-bg text-[#07130E] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#0D221A] border border-white/10 text-[#D5DFDA] hover:text-white hover:border-white/30/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Smart Scheduling</span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'crm'
                ? 'gold-gradient-bg text-[#07130E] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#0D221A] border border-white/10 text-[#D5DFDA] hover:text-white hover:border-white/30/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Custom Intake & Waivers</span>
          </button>

          <button
            onClick={() => setActiveTab('checkout')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'checkout'
                ? 'gold-gradient-bg text-[#07130E] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#0D221A] border border-white/10 text-[#D5DFDA] hover:text-white hover:border-white/30/50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>POS & Custom Tips</span>
          </button>

          <button
            onClick={() => setActiveTab('microsite')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'microsite'
                ? 'gold-gradient-bg text-[#07130E] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#0D221A] border border-white/10 text-[#D5DFDA] hover:text-white hover:border-white/30/50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Personal Booking Site</span>
          </button>

          <button
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'teams'
                ? 'gold-gradient-bg text-[#07130E] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#0D221A] border border-white/10 text-[#D5DFDA] hover:text-white hover:border-white/30/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Salon & Teams ($59.99)</span>
          </button>
        </div>

        {/* Feature Detail Showcase Card */}
        <div className="rounded-3xl bg-[#0D221A] border border-white/10 p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A86A] bg-[#C9A86A]/15 border border-white/10 px-3.5 py-1 rounded-full">
                {current.badge}
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {current.title}
              </h3>
              
              <p className="text-[#D5DFDA] text-base leading-relaxed">
                {current.desc}
              </p>

              <div className="space-y-3 pt-2">
                {current.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#D5DFDA]">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={current.previewImg}
                  alt={current.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07130E] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#07130E]/95 backdrop-blur-md rounded-xl border border-white/10 text-xs text-[#D5DFDA] flex items-center justify-between">
                  <span className="font-bold text-[#C9A86A]">Lumina Beauty OS</span>
                  <span className="text-[#D5DFDA]/70">Included in all plans</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
