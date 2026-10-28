import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Phone,
  Star,
  FileCheck2,
  FileSignature,
  Sparkles,
  Flame,
  User,
  ShieldCheck
} from 'lucide-react';
import { BusinessProfile, Service, Provider, Appointment } from '../../types';

interface Props {
  business: BusinessProfile;
  services: Service[];
  providers: Provider[];
  onBookAppointment: (appointment: Appointment) => void;
  onBackToDirectory?: () => void;
}

export const BookingMicrosite: React.FC<Props> = ({
  business,
  services,
  providers,
  onBookAppointment,
  onBackToDirectory
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<Service>(services[0]);
  const [selectedProvider, setSelectedProvider] = useState<Provider>(providers[0]);
  const [selectedDate, setSelectedDate] = useState('2026-10-28');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');

  // Client form states
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [signature, setSignature] = useState('');
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [dynamicAnswers, setDynamicAnswers] = useState<Record<string, any>>({});
  const [submittedApt, setSubmittedApt] = useState<Appointment | null>(null);

  // Raw mock open slots for demo
  const allDaySlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  // Backbar Pro™ Demand Engine: Mask slots based on pro's lookBusyMode setting
  const getVisibleSlots = () => {
    const mode = business.lookBusyMode || 'off';
    if (mode === 'off') {
      return allDaySlots;
    }
    if (mode === 'conservative') {
      // Mask ~30% of slots (keep index 0, 2, 4, 6, 7)
      return allDaySlots.filter((_, idx) => idx % 3 !== 1);
    }
    if (mode === 'moderate') {
      // Mask 50% of slots (keep only even index slots)
      return allDaySlots.filter((_, idx) => idx % 2 === 0);
    }
    if (mode === 'aggressive') {
      // High Scarcity: show only 2-3 exclusive slots per day
      return [allDaySlots[1], allDaySlots[4], allDaySlots[7]];
    }
    return allDaySlots;
  };

  const visibleSlots = getVisibleSlots();

  const handleAnswerChange = (fieldId: string, value: any) => {
    setDynamicAnswers((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !agreePolicy) return;

    const newApt: Appointment = {
      id: `apt_${Date.now()}`,
      businessId: business.id,
      providerId: selectedProvider?.id || providers[0]?.id || 'prov_default',
      providerName: selectedProvider?.name || providers[0]?.name || 'Staff Provider',
      clientId: `cl_${Date.now()}`,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim() || 'client@example.com',
      clientPhone: clientPhone.trim() || '(555) 000-0000',
      serviceIds: [selectedService.id],
      serviceNames: [selectedService.name],
      date: selectedDate,
      startTime: selectedTime,
      endTime: '12:15 PM',
      durationMinutes: selectedService.durationMinutes,
      totalPrice: selectedService.price,
      depositPaid: business.depositRequired ? selectedService.depositAmount : 0,
      status: business.bookingApprovalMode === 'requires_approval' ? 'pending_approval' : 'confirmed',
      notes: clientNotes.trim() || undefined,
      intakeFormAnswers: {
        ...dynamicAnswers,
        digitalSignature: signature.trim() || clientName.trim(),
        signedAt: new Date().toISOString()
      },
      createdAt: new Date().toISOString()
    };

    onBookAppointment(newApt);
    setSubmittedApt(newApt);
    setStep(4);
  };

  const handleDownloadIcs = () => {
    if (!submittedApt) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lumina Beauty OS//Booking Confirmation//EN
BEGIN:VEVENT
UID:${submittedApt.id}@lumina.beauty
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${submittedApt.serviceNames.join(', ')} with ${submittedApt.providerName}
DESCRIPTION:Confirmed booking at ${business.name}. Address: ${business.address}, ${business.city}.
LOCATION:${business.address}, ${business.city}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${business.name.replace(/\s+/g, '_')}_Appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-[#FFFFFF] pb-24 font-sans selection:bg-[#C9A86A]/20">
      
      {/* Top Banner & Pro Cover Hero */}
      <div className="relative h-60 md:h-72 w-full overflow-hidden bg-[#0A1B14]">
        <img
          src={business.coverImage}
          alt={business.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07130E] via-[#07130E]/70 to-transparent"></div>

        {onBackToDirectory && (
          <button
            onClick={onBackToDirectory}
            className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-xs font-medium text-white/90 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-white/70" />
            <span>Marketplace Directory</span>
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-10 space-y-6">
        
        {/* Business Profile Header Card */}
        <div className="bg-[#0D221A] rounded-2xl border border-white/10 p-6 md:p-7 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
          
          <img
            src={business.avatar}
            alt={business.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-white/15 shadow-xl shrink-0 -mt-12 md:-mt-14"
          />

          <div className="flex-1 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {business.name}
              </h1>
              
              <div className="inline-flex items-center justify-center gap-1.5 text-xs text-white/90 font-medium bg-white/5 border border-white/10 px-3 py-1 rounded-full self-center md:self-auto">
                <Star className="w-3.5 h-3.5 fill-[#C9A86A] text-[#C9A86A]" />
                <span className="font-semibold text-white">{business.rating}</span>
                <span className="text-white/50">({business.reviewCount})</span>
              </div>
            </div>

            <p className="text-[11px] font-semibold text-[#A3B8AD] uppercase tracking-widest">
              {business.category}
            </p>

            <p className="text-xs sm:text-sm text-[#D5DFDA] leading-relaxed max-w-xl">
              {business.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-white/60 pt-1">
              <span className="flex items-center gap-1 text-white/80">
                <MapPin className="w-3.5 h-3.5 text-white/50" />
                {business.address}, {business.city}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-white/80">
                <Phone className="w-3.5 h-3.5 text-white/50" />
                {business.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Minimal Quiet-Luxury Step Indicator */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Time' },
            { num: 3, label: 'Intake' },
            { num: 4, label: 'Confirmed' }
          ].map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <div
                key={s.num}
                className={`py-2 px-1 rounded-xl transition-all border ${
                  isActive
                    ? 'bg-[#153428] border-white/20 text-white font-semibold'
                    : isDone
                    ? 'bg-transparent border-transparent text-[#A3B8AD]'
                    : 'bg-transparent border-transparent text-white/30'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-white text-[#0A1B14]'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-white/10 text-white/40'
                  }`}>
                    {isDone ? '✓' : s.num}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* STEP 1: SERVICE MENU */}
        {step === 1 && (
          <div className="bg-[#0D221A] rounded-2xl border border-white/10 p-6 md:p-8 space-y-5 shadow-xl">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Select a Treatment</h3>
                <p className="text-xs text-white/60">Choose a service to view availability.</p>
              </div>
              <span className="text-xs text-white/60 font-mono">{services.length} Services Available</span>
            </div>

            <div className="space-y-3">
              {services.map((srv) => {
                const isSelected = selectedService?.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#143327] border-white/30 shadow-md ring-1 ring-white/20'
                        : 'bg-[#091712] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-white">{srv.name}</h4>
                        {srv.popular && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-white px-2 py-0.5 rounded-full border border-white/15">
                            Popular
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-[#C5D2CB] leading-relaxed max-w-xl">{srv.description}</p>
                      
                      <div className="flex items-center gap-2 text-xs text-white/50 pt-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-white/40" />
                        <span>{srv.durationMinutes} mins</span>
                        {business.depositRequired && (
                          <>
                            <span>•</span>
                            <span>Deposit: ${srv.depositAmount}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-white/5">
                      <span className="text-lg font-bold text-white font-mono">${srv.price}</span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedService(srv);
                          setStep(2);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C9A86A] hover:bg-[#D4B26F] text-[#07130E] shadow-sm font-bold'
                            : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                        }`}
                      >
                        Select & Continue
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: PROVIDER & TIME SLOT */}
        {step === 2 && (
          <div className="bg-[#0D221A] rounded-2xl border border-white/10 p-6 md:p-8 space-y-6 shadow-xl">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
            </button>

            <div className="pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">Choose Date & Time</h3>
                <p className="text-xs text-white/60">
                  {selectedService.name} • ${selectedService.price} ({selectedService.durationMinutes} mins)
                </p>
              </div>
            </div>

            {/* Backbar Pro Scarcity Notice */}
            {business.showScarcityBadge && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-200">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>High Demand Notice: Only <strong>{visibleSlots.length} appointment slots</strong> remaining for this date.</span>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hidden sm:inline">
                  Limited
                </span>
              </div>
            )}

            {/* Multi-Provider Picker if Salon */}
            {providers.length > 1 && (
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                  Select Provider
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {providers.map((prov) => {
                    const isSelected = selectedProvider?.id === prov.id;
                    return (
                      <div
                        key={prov.id}
                        onClick={() => setSelectedProvider(prov)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-[#143327] border-white/30 text-white shadow-sm ring-1 ring-white/20'
                            : 'bg-[#091712] border-white/5 text-white/80 hover:border-white/15'
                        }`}
                      >
                        <img src={prov.avatar} alt={prov.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-semibold text-white truncate">{prov.name}</p>
                          <p className="text-[10px] text-white/50 truncate">{prov.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Time Slots */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                Available Times on {selectedDate}
              </label>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {visibleSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#C9A86A] text-[#07130E] font-bold shadow-md'
                          : 'bg-[#091712] text-white/80 border border-white/5 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-[#C9A86A] hover:bg-[#D4B26F] text-[#07130E] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <span>Continue to Intake Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CUSTOM INTAKE & WAIVER FORM */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="bg-[#0D221A] rounded-2xl border border-white/10 p-6 md:p-8 space-y-6 shadow-xl">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Time Selection
            </button>

            <div className="pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Client Information & Consultation</h3>
              <p className="text-xs text-white/60">
                Please provide your contact information and review the pre-service health waiver.
              </p>
            </div>

            {/* Client Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-white/90 font-medium mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taylor Morgan"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-white/90 font-medium mb-1">Mobile Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="(555) 000-0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/90 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="taylor@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            {/* DYNAMIC CUSTOM INTAKE FIELDS */}
            <div className="bg-[#091712] rounded-xl p-5 border border-white/5 space-y-4 text-xs">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Pre-Service Safety & Consultation Questionnaire</span>
              </h4>

              {business.intakeFields && business.intakeFields.filter((f) => f.enabled).length > 0 ? (
                business.intakeFields
                  .filter((f) => f.enabled)
                  .map((field) => (
                    <div key={field.id} className="space-y-1">
                      <label className="block font-medium text-white/80">
                        {field.label} {field.required && <span className="text-rose-400">*</span>}
                      </label>

                      {field.type === 'select' ? (
                        <select
                          required={field.required}
                          value={dynamicAnswers[field.id] || ''}
                          onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                          className="w-full bg-[#11281F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/30"
                        >
                          <option value="">Select an option...</option>
                          {field.options?.map((opt, i) => (
                            <option key={i} value={opt} className="bg-[#091712] text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          rows={2}
                          required={field.required}
                          value={dynamicAnswers[field.id] || ''}
                          onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                          className="w-full bg-[#11281F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/30"
                        />
                      ) : (
                        <input
                          type="text"
                          required={field.required}
                          value={dynamicAnswers[field.id] || ''}
                          onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                          className="w-full bg-[#11281F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/30"
                        />
                      )}
                    </div>
                  ))
              ) : (
                <p className="text-white/50 italic">Standard pre-service protocol applied.</p>
              )}

              {/* DYNAMIC CUSTOM WAIVER TEXT */}
              <div className="p-4 bg-[#11281F] rounded-xl border border-white/5 space-y-1.5">
                <p className="font-semibold text-white">{business.customWaiverTitle || 'Service & Liability Acknowledgment'}</p>
                <p className="text-[#C5D2CB] leading-relaxed text-[11px]">
                  {business.customWaiverText ||
                    'I confirm that I have disclosed all active medical conditions, medications, and allergies truthfully.'}
                </p>
              </div>

              {/* DIGITAL SIGNATURE */}
              {business.requireSignature !== false && (
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <label className="block text-white/90 font-medium flex items-center gap-1.5">
                    <FileSignature className="w-3.5 h-3.5 text-white/70" />
                    Type Full Legal Name for Digital Signature *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Type legal name to sign liability release"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full bg-[#11281F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-serif italic text-sm focus:outline-none focus:border-white/30"
                  />
                </div>
              )}
            </div>

            {/* Policy & Deposit Box */}
            <div className="p-4 bg-[#091712] rounded-xl border border-white/5 text-xs space-y-2">
              <div className="flex justify-between items-center text-white">
                <span>Service Total:</span>
                <span className="font-mono font-bold text-white text-sm">${selectedService.price}</span>
              </div>
              {business.depositRequired && (
                <div className="flex justify-between items-center text-white/80">
                  <span>Required Deposit Hold:</span>
                  <span className="font-mono font-bold text-white">${selectedService.depositAmount}</span>
                </div>
              )}
              <p className="text-white/50 text-[11px] pt-1 border-t border-white/5">
                Cancellation policy: Free cancellation up to {business.cancellationHours} hours prior to appointment time.
              </p>
            </div>

            <div className="flex items-start gap-2 pt-1 text-xs">
              <input
                type="checkbox"
                id="policy"
                required
                checked={agreePolicy}
                onChange={(e) => setAgreePolicy(e.target.checked)}
                className="mt-0.5 rounded cursor-pointer accent-emerald-500"
              />
              <label htmlFor="policy" className="text-white/80 cursor-pointer leading-normal">
                I agree to the cancellation terms and verify that all health disclosures provided are true and accurate.
              </label>
            </div>

            <button
              type="submit"
              disabled={!clientName.trim() || !agreePolicy}
              className="w-full py-3.5 rounded-xl bg-[#C9A86A] hover:bg-[#D4B26F] text-[#07130E] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {business.bookingApprovalMode === 'requires_approval'
                  ? 'Submit Appointment Request'
                  : 'Confirm Appointment Instantly'}
              </span>
            </button>
          </form>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 4 && submittedApt && (
          <div className="bg-[#0D221A] rounded-2xl border border-white/15 p-8 md:p-12 text-center space-y-6 shadow-xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                {business.bookingApprovalMode === 'requires_approval'
                  ? 'Appointment Request Received'
                  : 'Your Appointment is Confirmed'}
              </h3>
              <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                {business.bookingApprovalMode === 'requires_approval'
                  ? `Thank you, ${submittedApt.clientName}. ${business.name} has received your request and will review your consultation details shortly.`
                  : `We look forward to hosting you, ${submittedApt.clientName}. A confirmation has been recorded.`}
              </p>
            </div>

            {/* Appointment Summary Box */}
            <div className="max-w-md mx-auto bg-[#091712] rounded-xl p-5 border border-white/5 text-left text-xs space-y-2.5">
              <div className="flex justify-between text-white/60">
                <span>Treatment:</span>
                <span className="font-semibold text-white">{submittedApt.serviceNames[0]}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Professional:</span>
                <span className="font-semibold text-white">{submittedApt.providerName}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Scheduled Time:</span>
                <span className="font-semibold text-white font-mono">{submittedApt.date} at {submittedApt.startTime}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Location:</span>
                <span className="text-white">{business.address}, {business.city}</span>
              </div>
              <div className="flex justify-between text-white/60 pt-2 border-t border-white/5">
                <span>Status:</span>
                <span className={`font-semibold uppercase text-[10px] px-2 py-0.5 rounded ${
                  submittedApt.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {submittedApt.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Calendar Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadIcs}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4 text-white/70" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#C9A86A] hover:bg-[#D4B26F] text-[#07130E] font-bold text-xs transition-colors cursor-pointer"
              >
                Book Another Service
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
