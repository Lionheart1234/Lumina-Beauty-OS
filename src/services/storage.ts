import {
  BusinessProfile,
  Provider,
  Service,
  Appointment,
  Client,
  RetailProduct,
  Transaction,
  AppointmentStatus
} from '../types';
import {
  initialBusinesses,
  initialProviders,
  initialServices,
  initialAppointments,
  initialClients,
  initialRetailProducts,
  initialTransactions
} from '../data/mockSeed';

const STORAGE_KEYS = {
  BUSINESSES: 'lumina_businesses',
  PROVIDERS: 'lumina_providers',
  SERVICES: 'lumina_services',
  APPOINTMENTS: 'lumina_appointments',
  CLIENTS: 'lumina_clients',
  PRODUCTS: 'lumina_products',
  TRANSACTIONS: 'lumina_transactions',
};

function load<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading key ${key}`, e);
    return fallback;
  }
}

function save<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving key ${key}`, e);
  }
}

class StorageService {
  // Businesses
  getBusinesses(): BusinessProfile[] {
    return load(STORAGE_KEYS.BUSINESSES, initialBusinesses);
  }

  getBusinessById(id: string): BusinessProfile | undefined {
    return this.getBusinesses().find((b) => b.id === id);
  }

  getBusinessByHandle(handle: string): BusinessProfile | undefined {
    return this.getBusinesses().find((b) => b.handle.toLowerCase() === handle.toLowerCase());
  }

  updateBusiness(updated: BusinessProfile): void {
    const all = this.getBusinesses();
    const index = all.findIndex((b) => b.id === updated.id);
    if (index >= 0) {
      all[index] = updated;
      save(STORAGE_KEYS.BUSINESSES, all);
    }
  }

  addBusiness(biz: BusinessProfile): void {
    const all = this.getBusinesses();
    all.push(biz);
    save(STORAGE_KEYS.BUSINESSES, all);
  }

  // Providers
  getProviders(businessId?: string): Provider[] {
    const all = load<Provider[]>(STORAGE_KEYS.PROVIDERS, initialProviders);
    return businessId ? all.filter((p) => p.businessId === businessId) : all;
  }

  // Services
  getServices(businessId?: string): Service[] {
    const all = load<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    return businessId ? all.filter((s) => s.businessId === businessId) : all;
  }

  addService(service: Service): void {
    const all = load<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    all.push(service);
    save(STORAGE_KEYS.SERVICES, all);
  }

  updateService(service: Service): void {
    const all = load<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const index = all.findIndex((s) => s.id === service.id);
    if (index >= 0) {
      all[index] = service;
      save(STORAGE_KEYS.SERVICES, all);
    }
  }

  deleteService(serviceId: string): void {
    const all = load<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const filtered = all.filter((s) => s.id !== serviceId);
    save(STORAGE_KEYS.SERVICES, filtered);
  }

  // Appointments
  getAppointments(businessId?: string): Appointment[] {
    const all = load<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    // If cache has fewer appointments than initial seed, update cache to include full week & month schedule
    if (all.length < initialAppointments.length) {
      save(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
      return businessId ? initialAppointments.filter((a) => a.businessId === businessId) : initialAppointments;
    }
    return businessId ? all.filter((a) => a.businessId === businessId) : all;
  }

  createAppointment(apt: Appointment): void {
    const all = load<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    all.unshift(apt);
    save(STORAGE_KEYS.APPOINTMENTS, all);
  }

  updateAppointmentStatus(
    appointmentId: string,
    status: AppointmentStatus,
    declineReason?: string
  ): Appointment | undefined {
    const all = load<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const apt = all.find((a) => a.id === appointmentId);
    if (apt) {
      apt.status = status;
      if (declineReason) apt.declineReason = declineReason;
      save(STORAGE_KEYS.APPOINTMENTS, all);
      return apt;
    }
    return undefined;
  }

  // Clients
  getClients(businessId?: string): Client[] {
    const all = load<Client[]>(STORAGE_KEYS.CLIENTS, initialClients);
    return businessId ? all.filter((c) => c.businessId === businessId) : all;
  }

  saveClient(client: Client): void {
    const all = load<Client[]>(STORAGE_KEYS.CLIENTS, initialClients);
    const idx = all.findIndex((c) => c.id === client.id);
    if (idx >= 0) {
      all[idx] = client;
    } else {
      all.push(client);
    }
    save(STORAGE_KEYS.CLIENTS, all);
  }

  // Retail Products
  getProducts(businessId?: string): RetailProduct[] {
    const all = load<RetailProduct[]>(STORAGE_KEYS.PRODUCTS, initialRetailProducts);
    return businessId ? all.filter((p) => p.businessId === businessId) : all;
  }

  // Transactions
  getTransactions(businessId?: string): Transaction[] {
    const all = load<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
    return businessId ? all.filter((t) => t.businessId === businessId) : all;
  }

  recordTransaction(tx: Transaction): void {
    const all = load<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
    all.unshift(tx);
    save(STORAGE_KEYS.TRANSACTIONS, all);
  }

  // Reset to factory defaults
  resetAll(): void {
    save(STORAGE_KEYS.BUSINESSES, initialBusinesses);
    save(STORAGE_KEYS.PROVIDERS, initialProviders);
    save(STORAGE_KEYS.SERVICES, initialServices);
    save(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    save(STORAGE_KEYS.CLIENTS, initialClients);
    save(STORAGE_KEYS.PRODUCTS, initialRetailProducts);
    save(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
  }
}

export const storageService = new StorageService();
