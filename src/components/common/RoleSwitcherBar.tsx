import React from 'react';
import { ActiveRole } from '../../types';
import { Globe, User, Users, Smartphone, Compass } from 'lucide-react';

interface Props {
  activeRole: ActiveRole;
  onSelectRole: (role: ActiveRole) => void;
  pendingApprovalsCount: number;
  onResetData: () => void;
  currentHandle: string;
  onSelectHandle: (handle: string) => void;
  handles: { handle: string; name: string }[];
}

export const RoleSwitcherBar: React.FC<Props> = ({
  activeRole,
  onSelectRole,
  pendingApprovalsCount,
  onResetData,
  currentHandle,
  onSelectHandle,
  handles,
}) => {
  return (
    <div className="sticky top-0 z-50 bg-[#07130E]/95 backdrop-blur-md border-b border-[#C9A86A]/30 text-xs text-[#E5EBE7] px-3 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#C9A86A] mr-1 hidden sm:inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse"></span>
            Role Simulator:
          </span>

          <button
            onClick={() => onSelectRole('public_marketing')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'public_marketing'
                ? 'gold-gradient-bg text-[#0A1B14] font-bold shadow-md'
                : 'bg-[#0F241C] hover:bg-[#143026] text-[#E5EBE7] border border-[#1C4435]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Site & Pricing</span>
          </button>

          <button
            onClick={() => {
              onSelectRole('solo_dashboard');
              onSelectHandle('glow-skin');
            }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 relative cursor-pointer ${
              activeRole === 'solo_dashboard'
                ? 'gold-gradient-bg text-[#0A1B14] font-bold shadow-md'
                : 'bg-[#0F241C] hover:bg-[#143026] text-[#E5EBE7] border border-[#1C4435]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Solo Pro ($39.99/mo)</span>
            {pendingApprovalsCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-amber-400 text-black text-[10px] font-bold rounded-full animate-bounce">
                {pendingApprovalsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onSelectRole('salon_dashboard');
              onSelectHandle('the-crown');
            }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'salon_dashboard'
                ? 'gold-gradient-bg text-[#0A1B14] font-bold shadow-md'
                : 'bg-[#0F241C] hover:bg-[#143026] text-[#E5EBE7] border border-[#1C4435]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Salon & Teams ($59.99/mo)</span>
          </button>

          <button
            onClick={() => onSelectRole('client_booking')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'client_booking'
                ? 'gold-gradient-bg text-[#0A1B14] font-bold shadow-md'
                : 'bg-[#0F241C] hover:bg-[#143026] text-[#E5EBE7] border border-[#1C4435]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Client Booking Microsite</span>
          </button>

          <button
            onClick={() => onSelectRole('marketplace')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'marketplace'
                ? 'gold-gradient-bg text-[#0A1B14] font-bold shadow-md'
                : 'bg-[#0F241C] hover:bg-[#143026] text-[#E5EBE7] border border-[#1C4435]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Directory Marketplace</span>
          </button>
        </div>

        {/* Right: Quick Context Controls */}
        <div className="flex items-center gap-2">
          {activeRole === 'client_booking' && (
            <div className="flex items-center gap-1">
              <span className="text-[#E5EBE7]/70 text-[11px]">Pro Microsite:</span>
              <select
                value={currentHandle}
                onChange={(e) => onSelectHandle(e.target.value)}
                className="bg-[#0A1B14] border border-[#1C4435] rounded px-2 py-0.5 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
              >
                {handles.map((h) => (
                  <option key={h.handle} value={h.handle}>
                    {h.name} ({h.handle})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={onResetData}
            title="Reset demo data to initial defaults"
            className="text-[11px] text-[#E5EBE7]/80 hover:text-white px-2 py-0.5 rounded border border-[#1C4435] hover:border-[#C9A86A] transition-colors cursor-pointer"
          >
            Reset Demo Data
          </button>
        </div>
      </div>
    </div>
  );
};
