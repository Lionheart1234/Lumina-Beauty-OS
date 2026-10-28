import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Users,
  Scissors,
  CreditCard,
  FileCheck2,
  Building,
  BarChart3,
  Settings,
  ExternalLink,
  Bell,
  Menu,
  X,
  Flame
} from 'lucide-react';
import { BusinessProfile } from '../../types';

export type DashboardTab =
  | 'calendar'
  | 'clients'
  | 'services'
  | 'pos'
  | 'forms'
  | 'team'
  | 'analytics'
  | 'settings';

interface Props {
  business: BusinessProfile;
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  pendingCount: number;
  onOpenBookingSite: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({
  business,
  activeTab,
  onSelectTab,
  pendingCount,
  onOpenBookingSite,
  children
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToApprovals = () => {
    if (activeTab !== 'calendar') {
      onSelectTab('calendar');
    }
    setMobileMenuOpen(false);

    const performScroll = () => {
      const el = document.getElementById('pending-approvals-queue');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('ring-4', 'ring-amber-400', 'bg-amber-500/20');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-amber-400', 'bg-amber-500/20');
        }, 2000);
      }
    };

    if (activeTab !== 'calendar') {
      setTimeout(performScroll, 80);
    } else {
      performScroll();
    }
  };

  const navItems = [
    { id: 'calendar', label: 'Calendar & Bookings', icon: CalendarIcon, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'clients', label: 'Client CRM & Notes', icon: Users, badge: null },
    { id: 'services', label: 'Services & Buffers', icon: Scissors, badge: null },
    { id: 'pos', label: 'POS Checkout & Tips', icon: CreditCard, badge: null },
    { id: 'forms', label: 'Custom Intake & Waivers', icon: FileCheck2, badge: null },
    { id: 'team', label: business.tier === 'salon' ? 'Team & Booth Renters' : 'Staff & Renters', icon: Building, badge: null },
    { id: 'analytics', label: 'Reports & Revenue', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Policies & Backbar Pro™', icon: Settings, badge: null },
  ];

  return (
    <div className="min-h-screen bg-[#07130E] text-[#FFFFFF] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-9 md:top-9 z-30 h-[calc(100vh-2.25rem)] w-64 bg-[#0B1E16] border-r border-[#1B362A] p-4 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Business Profile Card in Sidebar */}
          <div className="p-3.5 rounded-2xl bg-[#0D221A] border border-white/10 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={business.avatar}
                alt={business.name}
                className="w-10 h-10 rounded-xl object-cover border border-white/20/50 shrink-0"
              />
              <div className="truncate">
                <h3 className="font-bold text-sm text-white truncate">{business.name}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-[#C9A86A] uppercase tracking-wider bg-[#C9A86A]/15 px-2 py-0.2 rounded border border-white/10">
                    {business.tier === 'solo' ? 'Solo $39.99' : 'Salon $59.99'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'calendar' && pendingCount > 0) {
                      handleScrollToApprovals();
                    } else {
                      onSelectTab(item.id as DashboardTab);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'gold-gradient-bg text-[#07130E] font-bold shadow-md'
                      : 'text-[#D5DFDA] hover:text-white hover:bg-[#091712]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-black text-[11px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: View Client Microsite */}
        <div className="pt-4 border-t border-[#1B362A] space-y-2">
          <button
            onClick={onOpenBookingSite}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#0D221A] hover:bg-[#091712] text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer group"
          >
            <span>View Client Booking Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A86A] group-hover:translate-x-0.5 transition-transform" />
          </button>
          <div className="text-[11px] text-[#D5DFDA]/60 text-center">
            Booking handle: <span className="font-mono text-[#C9A86A]">/{business.handle}</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-[#0B1E16]/90 backdrop-blur-md border-b border-[#1B362A] px-4 sm:px-6 flex items-center justify-between sticky top-9 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0D221A] md:hidden text-slate-300 hover:text-white border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-base sm:text-lg font-bold text-white capitalize">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <button
                onClick={handleScrollToApprovals}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/25 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                title="Click to view and approve pending requests"
              >
                <Bell className="w-3.5 h-3.5 animate-pulse" />
                <span>{pendingCount} Request{pendingCount > 1 ? 's' : ''} to Approve</span>
              </button>
            )}

            <button
              onClick={onOpenBookingSite}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C9A86A]/15 border border-white/20/40 text-[#C9A86A] text-xs font-bold hover:bg-[#C9A86A]/25 transition-colors cursor-pointer"
            >
              <span>Booking Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Dashboard Tab Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>

    </div>
  );
};
