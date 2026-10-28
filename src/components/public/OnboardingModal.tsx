import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, Building2, User, Flame } from 'lucide-react';
import { BusinessProfile, PlanTier, LookBusyMode } from '../../types';
import { storageService } from '../../services/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBusinessCreated: (newHandle: string, isSalon: boolean) => void;
}

export const OnboardingModal: React.FC<Props> = ({ isOpen, onClose, onBusinessCreated }) => {
  const [tier, setTier] = useState<PlanTier>('solo');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Esthetics & Skincare');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [approvalMode, setApprovalMode] = useState<'requires_approval' | 'instant'>('requires_approval');
  const [lookBusyMode, setLookBusyMode] = useState<LookBusyMode>('moderate');

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setBusinessName(val);
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setHandle(slug);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !handle.trim()) return;

    const newBiz: BusinessProfile = {
      id: `biz_${Date.now()}`,
      name: businessName,
      handle: handle,
      tier: tier,
      planPrice: tier === 'solo' ? 39.99 : 59.99,
      category: category,
      tagline: `Premier ${category} services tailored for you.`,
      bio: `Welcome to ${businessName}. We specialize in precision service, personalized care, and tailored treatments.`,
      phone: '(555) 000-1234',
      email: email || 'contact@mybusiness.com',
      address: '100 Main Street',
      city: 'Valdosta',
      state: 'GA',
      zip: '31601',
      rating: 5.0,
      reviewCount: 1,
      coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      accentColor: '#C9A86A',
      bookingApprovalMode: approvalMode,
      depositRequired: true,
      depositPercentage: 25,
      cancellationHours: 24,
      amenities: ['Private Suite', 'Beverage Bar', 'Wi-Fi'],
      lookBusyMode: lookBusyMode,
      showScarcityBadge: true,
      customWaiverTitle: `${businessName} Safety & Liability Release`,
      customWaiverText: 'I confirm that I have disclosed all active medical conditions, medications, topicals, and allergies truthfully. I understand and agree to follow all post-treatment home care instructions.',
      requireSignature: true,
      intakeFields: [
        {
          id: 'fld_consult_1',
          label: 'Primary Treatment Goals',
          type: 'text',
          required: true,
          enabled: true
        },
        {
          id: 'fld_allergies_1',
          label: 'Known Allergies / Sensitivities',
          type: 'text',
          required: false,
          enabled: true
        }
      ]
    };

    storageService.addBusiness(newBiz);
    onBusinessCreated(newBiz.handle, tier === 'salon');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0F241C] border border-[#C9A86A] p-6 md:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#E5EBE7]/70 hover:text-white p-1 rounded-lg hover:bg-[#143026] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9A86A] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Launch Your Platform</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Start Your 14-Day Free Trial</h3>
          <p className="text-sm text-[#E5EBE7]/80">
            Set up your business booking link and management dashboard in under 60 seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 1: Select Plan Tier */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider">
              1. Choose Subscription Plan
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setTier('solo')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  tier === 'solo'
                    ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white shadow-md'
                    : 'border-[#1C4435] bg-[#0A1B14] hover:border-[#C9A86A]/40 text-[#E5EBE7]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <User className="w-5 h-5 text-[#C9A86A]" />
                  <span className="text-xs font-bold text-[#C9A86A] font-mono">$39.99/mo</span>
                </div>
                <h4 className="font-bold text-sm">Solo Professional</h4>
                <p className="text-xs text-[#E5EBE7]/70 mt-1">1 Pro • All Features • No Limits</p>
              </div>

              <div
                onClick={() => setTier('salon')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  tier === 'salon'
                    ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white shadow-md'
                    : 'border-[#1C4435] bg-[#0A1B14] hover:border-[#C9A86A]/40 text-[#E5EBE7]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="w-5 h-5 text-[#C9A86A]" />
                  <span className="text-xs font-bold text-[#C9A86A] font-mono">$59.99/mo</span>
                </div>
                <h4 className="font-bold text-sm">Salon & Teams</h4>
                <p className="text-xs text-[#E5EBE7]/70 mt-1">Up to 10 Pros • Shared Calendar</p>
              </div>
            </div>
          </div>

          {/* Step 2: Business Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Business or Professional Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Aura Esthetics or Taylor Cuts"
                value={businessName}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3.5 py-2 text-sm text-white placeholder-[#E5EBE7]/40 focus:outline-none focus:border-[#C9A86A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Specialty Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A86A]"
                >
                  <option>Esthetics & Skincare</option>
                  <option>Hair Salon & Color</option>
                  <option>Barbershop & Grooming</option>
                  <option>Lashes & Brows</option>
                  <option>Nails & Spa</option>
                  <option>Massage Therapy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Custom Booking URL Handle
                </label>
                <div className="flex items-center bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3 py-1.5 text-xs text-[#E5EBE7]/60">
                  <span className="select-none text-[#E5EBE7]/40">lumina.app/</span>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="my-studio"
                    className="w-full bg-transparent text-white font-mono text-xs focus:outline-none ml-0.5"
                  />
                </div>
              </div>
            </div>

            {/* Backbar Pro™ Look Busy Option */}
            <div>
              <label className="block text-xs font-medium text-white mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>Backbar Pro™ Demand Mode (Mask Open Slots)</span>
              </label>
              <select
                value={lookBusyMode}
                onChange={(e) => setLookBusyMode(e.target.value as LookBusyMode)}
                className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A86A]"
              >
                <option value="moderate">Moderate: Mask 50% of slots (Recommended to look booked & busy)</option>
                <option value="conservative">Conservative: Mask 30% of slots</option>
                <option value="aggressive">Aggressive: Show only 2-3 exclusive slots/day</option>
                <option value="off">Off: Show 100% of open availability</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!businessName.trim() || !handle.trim()}
              className="w-full py-3.5 px-4 rounded-xl gold-gradient-bg text-[#0A1B14] font-extrabold text-sm transition-all shadow-lg shadow-[#C9A86A]/20 flex items-center justify-center gap-2 cursor-pointer hover:brightness-105 disabled:opacity-50"
            >
              <span>Create Business & Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-[#E5EBE7]/70 mt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              14 days free, then {tier === 'solo' ? '$39.99' : '$59.99'}/month. No contracts.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};
