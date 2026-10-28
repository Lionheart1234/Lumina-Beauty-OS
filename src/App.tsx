import React, { useState, useEffect } from 'react';
import { ActiveRole, Appointment, BusinessProfile, Client, RetailProduct, Service, Transaction, AppointmentStatus } from './types';
import { storageService } from './services/storage';

// Top Role Switcher Bar
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';

// Public Marketing Site Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { Hero } from './components/public/Hero';
import { PricingSection } from './components/public/PricingSection';
import { FeaturesShowcase } from './components/public/FeaturesShowcase';
import { OnboardingModal } from './components/public/OnboardingModal';

// Pro Dashboard Components
import { DashboardLayout, DashboardTab } from './components/dashboard/DashboardLayout';
import { CalendarView } from './components/dashboard/CalendarView';
import { ClientManager } from './components/dashboard/ClientManager';
import { ServiceCatalog } from './components/dashboard/ServiceCatalog';
import { CheckoutPOS } from './components/dashboard/CheckoutPOS';
import { FormsManager } from './components/dashboard/FormsManager';
import { TeamManager } from './components/dashboard/TeamManager';
import { AnalyticsReports } from './components/dashboard/AnalyticsReports';
import { BusinessSettings } from './components/dashboard/BusinessSettings';

// Client Experience Components
import { BookingMicrosite } from './components/booking/BookingMicrosite';
import { DirectoryView } from './components/marketplace/DirectoryView';

export function App() {
  // Navigation & Role State
  const [activeRole, setActiveRole] = useState<ActiveRole>('public_marketing');
  const [currentHandle, setCurrentHandle] = useState<string>('glow-skin');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('calendar');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [posAppointment, setPosAppointment] = useState<Appointment | null>(null);

  // Reactive Data Store State
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<RetailProduct[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const refreshData = () => {
    setBusinesses(storageService.getBusinesses());
    setAppointments(storageService.getAppointments());
    setClients(storageService.getClients());
    setServices(storageService.getServices());
    setProducts(storageService.getProducts());
    setTransactions(storageService.getTransactions());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Current Business & Providers
  const currentBusiness =
    businesses.find((b) => b.handle.toLowerCase() === currentHandle.toLowerCase()) ||
    businesses[0] || {
      id: 'biz_default',
      name: 'Lumina Studio',
      handle: 'lumina-studio',
      tier: 'solo',
      planPrice: 39.99,
      category: 'Esthetics',
      tagline: 'Premier wellness and beauty care.',
      bio: 'Professional studio providing custom treatments.',
      phone: '(555) 000-0000',
      email: 'hello@lumina.app',
      address: '100 Main St',
      city: 'Valdosta',
      state: 'GA',
      zip: '31601',
      rating: 5.0,
      reviewCount: 1,
      coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80',
      accentColor: '#C9A86A',
      bookingApprovalMode: 'requires_approval',
      depositRequired: true,
      depositPercentage: 25,
      cancellationHours: 24,
      amenities: ['Private Suite'],
      lookBusyMode: 'moderate',
      showScarcityBadge: true,
      customWaiverTitle: 'Standard Client Consultation & Service Release',
      customWaiverText: 'I confirm that I have disclosed all active medical conditions and allergies truthfully.',
      requireSignature: true,
      intakeFields: [
        {
          id: 'fld_goals',
          label: 'Primary Skin / Service Goals',
          type: 'text',
          required: true,
          enabled: true
        }
      ]
    };

  const currentProviders = storageService.getProviders(currentBusiness.id);
  const currentServices = services.filter((s) => s.businessId === currentBusiness.id);
  const currentClients = clients.filter((c) => c.businessId === currentBusiness.id);
  const currentTransactions = transactions.filter((t) => t.businessId === currentBusiness.id);

  // Count pending approvals
  const pendingCount = appointments.filter(
    (a) => a.businessId === currentBusiness.id && a.status === 'pending_approval'
  ).length;

  // Appointment Status Updates (Accept / Decline)
  const handleUpdateAppointmentStatus = (
    appointmentId: string,
    status: AppointmentStatus,
    reason?: string
  ) => {
    storageService.updateAppointmentStatus(appointmentId, status, reason);
    refreshData();
  };

  // Create Walk-in / Phone Appointment
  const handleCreateAppointment = (apt: Appointment) => {
    storageService.createAppointment(apt);
    refreshData();
  };

  // Client booking from microsite
  const handleClientBooking = (apt: Appointment) => {
    storageService.createAppointment(apt);
    refreshData();
  };

  // Complete POS Transaction
  const handleCompleteTransaction = (tx: Transaction) => {
    storageService.recordTransaction(tx);
    if (tx.appointmentId) {
      storageService.updateAppointmentStatus(tx.appointmentId, 'completed');
    }
    refreshData();
  };

  // Update Business Settings
  const handleUpdateBusinessProfile = (updated: BusinessProfile) => {
    storageService.updateBusiness(updated);
    refreshData();
  };

  // Reset Demo Data
  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to fresh defaults?')) {
      storageService.resetAll();
      refreshData();
      alert('Demo data restored to initial state.');
    }
  };

  // Business Created via Onboarding Wizard
  const handleBusinessCreated = (newHandle: string, isSalon: boolean) => {
    refreshData();
    setCurrentHandle(newHandle);
    setActiveRole(isSalon ? 'salon_dashboard' : 'solo_dashboard');
    setDashboardTab('calendar');
  };

  const handleSelectRole = (role: ActiveRole) => {
    setActiveRole(role);
    if (role === 'solo_dashboard') {
      setCurrentHandle('glow-skin');
    } else if (role === 'salon_dashboard') {
      setCurrentHandle('the-crown');
    }
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-slate-100 flex flex-col font-sans selection:bg-[#C9A86A]/30 selection:text-white">
      
      {/* 1. Developer / Client Multi-Role Simulation Quick-Bar */}
      <RoleSwitcherBar
        activeRole={activeRole}
        onSelectRole={handleSelectRole}
        pendingApprovalsCount={pendingCount}
        onResetData={handleResetData}
        currentHandle={currentHandle}
        onSelectHandle={(h) => setCurrentHandle(h)}
        handles={businesses.map((b) => ({ handle: b.handle, name: b.name }))}
      />

      {/* 2. Public Marketing Website View */}
      {activeRole === 'public_marketing' && (
        <div className="flex-1 flex flex-col">
          <PublicNavbar
            onOpenOnboarding={() => setShowOnboarding(true)}
            onNavigateToRole={(r) => handleSelectRole(r)}
          />

          <main className="flex-1">
            <Hero
              onOpenOnboarding={() => setShowOnboarding(true)}
              onNavigateToRole={(r) => handleSelectRole(r)}
            />

            <FeaturesShowcase />

            <PricingSection
              onOpenOnboarding={() => setShowOnboarding(true)}
              onNavigateToRole={(r) => handleSelectRole(r)}
            />
          </main>

          {/* Footer */}
          <footer className="border-t border-[#1C4435] bg-[#07130E] py-12 text-center text-xs text-[#E5EBE7]/60 space-y-3">
            <div className="flex items-center justify-center gap-2 font-bold text-white text-sm">
              <span className="w-6 h-6 rounded-lg gold-gradient-bg text-[#0A1B14] flex items-center justify-center text-xs font-bold">L</span>
              <span>LUMINA BEAUTY OS</span>
            </div>
            <p>Modern, affordable business management and online scheduling for the beauty and wellness industry.</p>
            <p className="text-[#C9A86A] font-mono font-semibold">Solo $39.99/mo • Salon & Teams $59.99/mo • Backbar Pro™ Demand Engine</p>
          </footer>
        </div>
      )}

      {/* 3. Professional Business Management Dashboard (Solo or Salon) */}
      {(activeRole === 'solo_dashboard' || activeRole === 'salon_dashboard') && (
        <DashboardLayout
          business={currentBusiness}
          activeTab={dashboardTab}
          onSelectTab={(tab) => setDashboardTab(tab)}
          pendingCount={pendingCount}
          onOpenBookingSite={() => setActiveRole('client_booking')}
        >
          {dashboardTab === 'calendar' && (
            <CalendarView
              business={currentBusiness}
              appointments={appointments}
              providers={currentProviders}
              services={currentServices}
              onUpdateStatus={handleUpdateAppointmentStatus}
              onOpenPOSForAppointment={(apt) => {
                setPosAppointment(apt);
                setDashboardTab('pos');
              }}
              onCreateAppointment={handleCreateAppointment}
            />
          )}

          {dashboardTab === 'clients' && (
            <ClientManager
              clients={currentClients}
              onSaveClient={(cl) => {
                storageService.saveClient(cl);
                refreshData();
              }}
            />
          )}

          {dashboardTab === 'services' && (
            <ServiceCatalog
              services={currentServices}
              onAddService={(srv) => {
                storageService.addService(srv);
                refreshData();
              }}
              onUpdateService={(srv) => {
                storageService.updateService(srv);
                refreshData();
              }}
              onDeleteService={(id) => {
                storageService.deleteService(id);
                refreshData();
              }}
            />
          )}

          {dashboardTab === 'pos' && (
            <CheckoutPOS
              business={currentBusiness}
              products={products}
              services={currentServices}
              initialAppointment={posAppointment}
              onCompleteCheckout={handleCompleteTransaction}
            />
          )}

          {dashboardTab === 'forms' && (
            <FormsManager
              business={currentBusiness}
              onUpdateBusiness={handleUpdateBusinessProfile}
            />
          )}

          {dashboardTab === 'team' && (
            <TeamManager
              business={currentBusiness}
              providers={currentProviders}
            />
          )}

          {dashboardTab === 'analytics' && (
            <AnalyticsReports
              business={currentBusiness}
              transactions={currentTransactions}
            />
          )}

          {dashboardTab === 'settings' && (
            <BusinessSettings
              business={currentBusiness}
              onUpdateBusiness={handleUpdateBusinessProfile}
            />
          )}
        </DashboardLayout>
      )}

      {/* 4. Client Booking Microsite View */}
      {activeRole === 'client_booking' && (
        <BookingMicrosite
          business={currentBusiness}
          services={currentServices}
          providers={currentProviders}
          onBookAppointment={handleClientBooking}
          onBackToDirectory={() => setActiveRole('marketplace')}
        />
      )}

      {/* 5. Searchable Public Discovery Marketplace View */}
      {activeRole === 'marketplace' && (
        <DirectoryView
          businesses={businesses}
          onSelectBusinessToBook={(handle) => {
            setCurrentHandle(handle);
            setActiveRole('client_booking');
          }}
        />
      )}

      {/* Onboarding Wizard Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onBusinessCreated={handleBusinessCreated}
      />

    </div>
  );
}

export default App;
