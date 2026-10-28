# Lumina Beauty OS — Beauty & Wellness Business Management Platform

An all-in-one, modern, and affordable business management and booking platform built specifically for the beauty and wellness industry (independent estheticians, hairstylists, barbers, nail technicians, lash artists, massage therapists, salons, spas, and wellness collectives).

Designed with a sophisticated unisex luxury aesthetic (**Deep Forest Green, Crisp White & Metallic Architectural Gold**), transparent flat pricing (**Solo $39.99/mo** and **Salon & Teams $59.99/mo**), zero software feature upgrades, and zero platform take rates.

---

## 🌟 Architecture & Core Portals

### 1. 🌐 Public Website & Marketing
* **High-converting value proposition**: Positioned as the affordable, feature-complete alternative to legacy platforms and percentage-taking booking apps.
* **Backbar Pro™ Demand Engine**: Exclusive demand accelerator that masks unbooked slots to make emerging and growing professionals appear booked-and-busy from day one.
* **Transparent Pricing**:
  * **Solo ($39.99/month)**: Every single software feature, unlimited clients, appointments, and services.
  * **Salon & Teams ($59.99/month)**: Multi-calendar, shared front desk, booth renter privacy isolation, team permissions (up to 10 professionals).
* **Interactive Annual Savings Calculator**: Compares savings against platforms charging 20% commission on new clients or recurring fees for basic add-on tools.
* **Pro Onboarding Wizard**: 60-second registration that instantly launches a pro's custom booking handle.

### 2. 💼 Professional Management Dashboard (The Operating System)
* **Smart Calendar & Availability**:
  * Day, Week, and Staff Column scheduling views.
  * **Pending Appointment Approvals Queue**: Live notification badge alerting the pro of incoming requests with one-click **Accept** (confirms slot, notifies client) or **Decline** (with custom reason popup).
* **Point-of-Sale & Checkout Terminal**:
  * Service tickets & retail inventory upsells.
  * Dedicated one-tap tip presets: **18%**, **20%**, **25%**, and **Custom Tip ($ / %)**, plus "No Tip".
  * Multiple payment methods (Card, Cash, Apple Pay, Card on File) with instant digital receipt generation.
* **Client CRM & Treatment Formulas**:
  * Detailed client dossiers, lifetime spend, and visit logs.
  * Private technical formula cards (hair color mixtures, chemical peel layers, lash mapping).
  * Digital consultation waivers with legally binding timestamps.
* **Services & Buffer Times**:
  * Category builder, duration settings, and automatic buffer times for sanitation and turnaround.
* **Salon & Booth Renter Partitioning**:
  * Independent booth renters keep their private client books and earnings separate from the salon owner while appearing on the shared salon directory.
* **Business Policies & Settings**:
  * Toggle between **"Require My Approval"** vs **"Instant Auto-Booking"**.
  * Cancellation policy window & required deposit percentages.

### 3. 📱 Client Booking Microsite
* Mobile-first luxury booking experience tailored to each professional (e.g. `lumina.app/book/glow-skin`).
* Real-time slot picker with buffer calculation.
* Digital pre-service consultation questionnaire & touch signature pad.
* Deposit hold simulation and instant calendar export (`.ics` / Google Calendar).

### 4. 🔍 Public Discovery Marketplace
* Searchable consumer directory by category (Esthetics, Hair, Barbershop, Lashes, Massage) and city/location.
* Verified ratings, amenity tags, and direct one-tap booking into any provider's microsite.

---

## 🚀 Running Locally

```powershell
# Navigate into the project
cd "c:\Users\apopu\My PORTFOLIO\lumina-beauty"

# Start the local development server
npm.cmd run dev

# Or build for production
npm.cmd run build
```

---

## ☁️ Zero-Cost Cloud Deployment

This platform is architected to run on a **$0.00/month infrastructure budget**:
1. **Frontend Hosting ($0/mo)**: Deploy to **Cloudflare Pages** or **Vercel** with unlimited global CDN bandwidth.
2. **Database & Auth ($0/mo)**: Ready for **Supabase** (PostgreSQL with Row-Level Security).
3. **Transaction Receipts ($0/mo)**: Uses **Resend** (3,000 free transactional emails/mo) and client-side `.ics` calendar sync.
4. **Payments ($0/mo base)**: Uses **Stripe Connect** with standard card processing (2.9% + 30¢) passed directly to the point of sale with 0% platform markup.
