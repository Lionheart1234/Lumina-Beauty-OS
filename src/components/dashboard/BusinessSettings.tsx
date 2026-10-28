import React, { useState } from 'react';
import { Settings, ShieldCheck, Check, Flame, DollarSign, Globe, Sparkles } from 'lucide-react';
import { BusinessProfile, LookBusyMode } from '../../types';

interface Props {
  business: BusinessProfile;
  onUpdateBusiness: (updated: BusinessProfile) => void;
}

export const BusinessSettings: React.FC<Props> = ({ business, onUpdateBusiness }) => {
  const [profile, setProfile] = useState<BusinessProfile>({ ...business });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBusiness(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-[#0F241C] p-4 rounded-3xl border border-[#C9A86A]/35 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#C9A86A]" />
            <span>Booking Policies, Backbar Pro™ & Settings</span>
          </h3>
          <p className="text-xs text-[#E5EBE7]">
            Configure Backbar Pro slot masking, appointment acceptance workflows, and deposit rules.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
            <Check className="w-4 h-4" /> Policies Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* 1. Backbar Pro™ "Look Busy" Demand Accelerator Control */}
        <div className="bg-[#0F241C] rounded-3xl border-2 border-[#C9A86A] p-6 space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#C9A86A]" />
                <span>Backbar Pro™: Demand Accelerator & Slot Masking</span>
              </h4>
              <p className="text-xs text-[#E5EBE7] mt-1">
                Mask open slots off your public booking microsite to make your schedule appear booked-and-busy and drive consumer urgency.
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold text-[#0A1B14] gold-gradient-bg px-2.5 py-1 rounded-md shadow-sm">
              Exclusive Feature
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div
              onClick={() => setProfile({ ...profile, lookBusyMode: 'off' })}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                profile.lookBusyMode === 'off'
                  ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white shadow-md'
                  : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white">Disabled (Show All)</span>
                {profile.lookBusyMode === 'off' && <Check className="w-4 h-4 text-[#C9A86A]" />}
              </div>
              <p className="text-[11px] text-[#E5EBE7]/70">
                Shows 100% of your open availability on your public booking site.
              </p>
            </div>

            <div
              onClick={() => setProfile({ ...profile, lookBusyMode: 'conservative' })}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                profile.lookBusyMode === 'conservative'
                  ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white shadow-md'
                  : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white">Conservative (Hide 30%)</span>
                {profile.lookBusyMode === 'conservative' && <Check className="w-4 h-4 text-[#C9A86A]" />}
              </div>
              <p className="text-[11px] text-[#E5EBE7]/70">
                Randomly hides ~30% of open slots to give a steady, filled calendar appearance.
              </p>
            </div>

            <div
              onClick={() => setProfile({ ...profile, lookBusyMode: 'moderate' })}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                profile.lookBusyMode === 'moderate'
                  ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white shadow-md'
                  : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white">Moderate (Hide 50% - Recommended)</span>
                {profile.lookBusyMode === 'moderate' && <Check className="w-4 h-4 text-[#C9A86A]" />}
              </div>
              <p className="text-[11px] text-[#E5EBE7]/70">
                Masks half of open slots. Gives the perception of a popular, highly-demanded specialist.
              </p>
            </div>

            <div
              onClick={() => setProfile({ ...profile, lookBusyMode: 'aggressive' })}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                profile.lookBusyMode === 'aggressive'
                  ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white shadow-md'
                  : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white">Aggressive VIP (2-3 Slots Only)</span>
                {profile.lookBusyMode === 'aggressive' && <Check className="w-4 h-4 text-[#C9A86A]" />}
              </div>
              <p className="text-[11px] text-[#E5EBE7]/70">
                Only shows 2-3 exclusive slots per day to trigger maximum booking urgency.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-[#1C4435]">
            <input
              type="checkbox"
              id="scarcity_badge"
              checked={profile.showScarcityBadge}
              onChange={(e) => setProfile({ ...profile, showScarcityBadge: e.target.checked })}
              className="w-4 h-4 accent-[#C9A86A] cursor-pointer"
            />
            <label htmlFor="scarcity_badge" className="text-xs font-medium text-white cursor-pointer">
              Show "High Demand: Only 2 slots remaining today!" scarcity banner on my booking microsite
            </label>
          </div>
        </div>

        {/* 2. Appointment Approval Control */}
        <div className="bg-[#0F241C] rounded-3xl border border-[#C9A86A]/35 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A86A]" />
                <span>Appointment Booking Acceptance Mode</span>
              </h4>
              <p className="text-xs text-[#E5EBE7] mt-1">
                Choose whether new bookings are automatically confirmed or require your explicit approval.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div
              onClick={() => setProfile({ ...profile, bookingApprovalMode: 'requires_approval' })}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                profile.bookingApprovalMode === 'requires_approval'
                  ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white'
                  : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white">Require My Approval</span>
                {profile.bookingApprovalMode === 'requires_approval' && (
                  <Check className="w-4 h-4 text-[#C9A86A]" />
                )}
              </div>
              <p className="text-[11px] text-[#E5EBE7]/70">
                Client requests enter your Pending queue. You can Accept (confirms slot) or Decline with a custom reason.
              </p>
            </div>

            <div
              onClick={() => setProfile({ ...profile, bookingApprovalMode: 'instant' })}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                profile.bookingApprovalMode === 'instant'
                  ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white'
                  : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white">Instant Auto-Booking</span>
                {profile.bookingApprovalMode === 'instant' && (
                  <Check className="w-4 h-4 text-[#C9A86A]" />
                )}
              </div>
              <p className="text-[11px] text-[#E5EBE7]/70">
                Any open slot on your calendar is instantly confirmed as soon as the client books.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Cancellation & Deposit Rules */}
        <div className="bg-[#0F241C] rounded-3xl border border-[#C9A86A]/35 p-6 space-y-4 shadow-xl">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#C9A86A]" />
            <span>Deposits & Cancellation Protections</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-white font-medium mb-1">
                Mandatory Booking Deposit (%)
              </label>
              <select
                value={profile.depositPercentage}
                onChange={(e) => setProfile({ ...profile, depositPercentage: Number(e.target.value) })}
                className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C9A86A]"
              >
                <option value={0}>No Deposit Required (0%)</option>
                <option value={20}>20% Deposit Required</option>
                <option value={25}>25% Deposit Required (Recommended)</option>
                <option value={50}>50% Deposit Required</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-1">
                Cancellation Window (Hours)
              </label>
              <select
                value={profile.cancellationHours}
                onChange={(e) => setProfile({ ...profile, cancellationHours: Number(e.target.value) })}
                className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C9A86A]"
              >
                <option value={12}>12 Hours Notice</option>
                <option value={24}>24 Hours Notice (Standard)</option>
                <option value={48}>48 Hours Notice (Strict)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Booking URL Handle */}
        <div className="bg-[#0F241C] rounded-3xl border border-[#C9A86A]/35 p-6 space-y-4 shadow-xl">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C9A86A]" />
            <span>Personalized Booking URL Handle</span>
          </h4>

          <div className="text-xs space-y-2">
            <label className="block text-white font-medium">Your Public URL</label>
            <div className="flex items-center bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3 py-2 text-slate-400">
              <span className="select-none text-[#E5EBE7]/60 font-mono">lumina.app/book/</span>
              <input
                type="text"
                value={profile.handle}
                onChange={(e) => setProfile({ ...profile, handle: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                className="w-full bg-transparent text-white font-mono focus:outline-none ml-1"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl gold-gradient-bg text-[#0A1B14] font-bold text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:brightness-105"
          >
            <Check className="w-4 h-4" />
            <span>Save Policies & Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
