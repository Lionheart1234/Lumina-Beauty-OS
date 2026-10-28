import React from 'react';
import { Building, ShieldCheck, Lock, Flame } from 'lucide-react';
import { BusinessProfile, Provider } from '../../types';

interface Props {
  business: BusinessProfile;
  providers: Provider[];
}

export const TeamManager: React.FC<Props> = ({ business, providers }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0F241C] p-4 rounded-3xl border border-[#C9A86A]/35 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-[#C9A86A]" />
            <span>Team Members & Booth Renter Management</span>
          </h3>
          <p className="text-xs text-[#E5EBE7]">
            {business.tier === 'salon'
              ? 'Manage shared front-desk schedules, commission splits, and independent booth renters.'
              : 'Solo plan supports 1 professional. Upgrade to Salon & Teams ($59.99/mo) to unlock up to 10 professionals.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#C9A86A] font-bold bg-[#C9A86A]/15 border border-[#C9A86A]/40 px-3.5 py-1.5 rounded-xl font-mono">
            {providers.length} Active Professional{providers.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Salon & Teams Notice on Booth Renters */}
      <div className="p-4 rounded-3xl bg-[#0F241C] border border-[#1C4435] flex items-start gap-3 shadow-md">
        <Lock className="w-5 h-5 text-[#C9A86A] shrink-0 mt-0.5" />
        <div className="text-xs text-[#E5EBE7] space-y-1">
          <p className="font-bold text-white">Independent Booth Renter Privacy Isolation</p>
          <p className="text-[#E5EBE7]/80">
            Booth renters (such as Marcus Wright) maintain their own independent client records and private earnings. They appear on the salon’s unified booking directory, but their personal client books remain completely private from the salon owner.
          </p>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map((prov) => {
          const isBoothRenter = prov.role === 'booth_renter';
          const isOwner = prov.role === 'owner';

          return (
            <div
              key={prov.id}
              className="bg-[#0F241C] rounded-3xl border border-[#C9A86A]/30 p-6 shadow-xl space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={prov.avatar}
                      alt={prov.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#C9A86A]"
                    />
                    <div>
                      <h4 className="font-bold text-base text-white">{prov.name}</h4>
                      <p className="text-xs text-[#C9A86A] font-semibold">{prov.title}</p>
                      <p className="text-[11px] text-[#E5EBE7]/70 font-mono mt-0.5">{prov.scheduleSummary}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                    isOwner
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : isBoothRenter
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {prov.role.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-[#E5EBE7] leading-relaxed italic">
                  "{prov.bio}"
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#1C4435]">
                  <p className="text-[10px] uppercase font-bold text-[#E5EBE7]/60">Specialties:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {prov.specialties.map((spec, i) => (
                      <span key={i} className="text-[10px] bg-[#0A1B14] border border-[#1C4435] text-white px-2 py-0.5 rounded-md">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compensation & Working Days */}
              <div className="p-3.5 bg-[#0A1B14] rounded-2xl border border-[#1C4435] text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#E5EBE7]/60 uppercase font-bold block">
                    {isBoothRenter ? 'Booth Rent Rate' : 'Commission Split'}
                  </span>
                  <span className="font-mono font-bold text-white text-sm">
                    {isBoothRenter ? `$${prov.boothRentFee} / week` : `${prov.commissionRate}% Provider Split`}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#E5EBE7]/60 uppercase font-bold block">Permissions</span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {isOwner ? 'Full Admin' : isBoothRenter ? 'Private Book' : 'Staff Calendar'}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
