export type PlanTier = 'solo' | 'salon';

export type LookBusyMode = 'off' | 'conservative' | 'moderate' | 'aggressive';

export interface IntakeFormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  options?: string[];
  required: boolean;
  enabled: boolean;
}

export interface BusinessProfile {
  id: string;
  name: string;
  handle: string;
  tier: PlanTier;
  planPrice: number; // 39.99 or 59.99
  category: string;
  tagline: string;
  bio: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  rating: number;
  reviewCount: number;
  coverImage: string;
  avatar: string;
  accentColor: string;
  bookingApprovalMode: 'instant' | 'requires_approval';
  depositRequired: boolean;
  depositPercentage: number;
  cancellationHours: number;
  instagram?: string;
  website?: string;
  amenities: string[];

  // Backbar Pro™ / Look Busy Slot Masking
  lookBusyMode: LookBusyMode;
  showScarcityBadge: boolean; // e.g. "Only 2 slots remaining today!"

  // Customizable Forms & Waivers
  customWaiverTitle: string;
  customWaiverText: string;
  requireSignature: boolean;
  intakeFields: IntakeFormField[];
}

export type ProviderRole = 'owner' | 'manager' | 'staff' | 'booth_renter';

export interface Provider {
  id: string;
  businessId: string;
  name: string;
  role: ProviderRole;
  title: string;
  avatar: string;
  bio: string;
  specialties: string[];
  commissionRate: number; // e.g. 60 for 60%, 0 for booth renter
  boothRentFee?: number; // e.g. 250 / week
  scheduleSummary: string;
  workingDays: string[];
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  category: string;
  durationMinutes: number;
  bufferMinutes: number;
  price: number;
  depositAmount: number;
  description: string;
  providerIds: string[];
  popular?: boolean;
}

export type AppointmentStatus =
  | 'pending_approval'
  | 'confirmed'
  | 'arrived'
  | 'in_service'
  | 'completed'
  | 'declined'
  | 'cancelled';

export interface Appointment {
  id: string;
  businessId: string;
  providerId: string;
  providerName: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceIds: string[];
  serviceNames: string[];
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "10:00 AM"
  endTime: string;
  durationMinutes: number;
  totalPrice: number;
  depositPaid: number;
  status: AppointmentStatus;
  notes?: string;
  declineReason?: string;
  intakeFormAnswers?: Record<string, any>;
  createdAt: string;
}

export interface Client {
  id: string;
  businessId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  tags: string[];
  formulaNotes: string;
  allergies?: string;
  totalSpend: number;
  totalVisits: number;
  lastVisitDate: string;
  intakeFormCompleted: boolean;
}

export interface RetailProduct {
  id: string;
  businessId: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  sku: string;
}

export type TipChoice = 0 | 18 | 20 | 25 | 'custom';

export interface Transaction {
  id: string;
  businessId: string;
  appointmentId?: string;
  clientName: string;
  date: string;
  subtotal: number;
  tipPercentage: number;
  tipAmount: number;
  tax: number;
  total: number;
  paymentMethod: 'card' | 'cash' | 'apple_pay' | 'card_on_file';
  items: {
    name: string;
    type: 'service' | 'retail';
    price: number;
    quantity: number;
  }[];
  receiptNumber: string;
}

export type ActiveRole =
  | 'public_marketing'
  | 'solo_dashboard'
  | 'salon_dashboard'
  | 'client_booking'
  | 'marketplace';
