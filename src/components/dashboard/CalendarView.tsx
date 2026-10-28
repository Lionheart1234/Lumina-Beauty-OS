import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  FileCheck2,
  AlertCircle,
  CreditCard,
  Flame,
  Sparkles,
  CalendarDays,
  CalendarRange
} from 'lucide-react';
import { Appointment, BusinessProfile, Provider, Service, AppointmentStatus } from '../../types';

interface Props {
  business: BusinessProfile;
  appointments: Appointment[];
  providers: Provider[];
  services: Service[];
  onUpdateStatus: (appointmentId: string, status: AppointmentStatus, reason?: string) => void;
  onOpenPOSForAppointment: (apt: Appointment) => void;
  onCreateAppointment: (apt: Appointment) => void;
}

export const CalendarView: React.FC<Props> = ({
  business,
  appointments,
  providers,
  services,
  onUpdateStatus,
  onOpenPOSForAppointment,
  onCreateAppointment
}) => {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'staff'>(
    business.tier === 'salon' ? 'staff' : 'day'
  );
  const [selectedDate, setSelectedDate] = useState('2026-10-28');
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [declineModalApt, setDeclineModalApt] = useState<Appointment | null>(null);
  const [declineReason, setDeclineReason] = useState('Schedule conflict at requested time');
  const [showNewAptModal, setShowNewAptModal] = useState(false);

  // New appointment form state
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newServiceId, setNewServiceId] = useState(services[0]?.id || '');
  const [newProviderId, setNewProviderId] = useState(providers[0]?.id || '');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [modalDate, setModalDate] = useState(selectedDate);

  // Helper date functions without timezone skew
  const parseDateParts = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return { year: y, month: m, day: d, dateObj: new Date(y, m - 1, d) };
  };

  const formatDateStr = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 7 Days of the active week (Monday to Sunday)
  const getWeekDays = (dateStr: string) => {
    const { dateObj } = parseDateParts(dateStr);
    const dayOfWeek = dateObj.getDay(); // 0 is Sunday, 1 is Monday...
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(dateObj);
    monday.setDate(dateObj.getDate() + diffToMonday);

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const days = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(monday);
      current.setDate(monday.getDate() + i);
      const formatted = formatDateStr(current);
      days.push({
        date: formatted,
        dayName: dayNames[i],
        dayNumber: current.getDate(),
        monthNumber: current.getMonth() + 1,
        isCurrent: formatted === selectedDate
      });
    }
    return days;
  };

  // Monthly calendar grid (Sunday to Saturday, 5-6 weeks)
  const getMonthGrid = (dateStr: string) => {
    const { year, month, dateObj } = parseDateParts(dateStr);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const startDayIndex = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();

    const days: { date: string; dayNumber: number; inCurrentMonth: boolean; isSelected: boolean }[] = [];

    // Preceding days from previous month
    for (let i = startDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const prevDate = new Date(year, month - 2, dayNum);
      const formatted = formatDateStr(prevDate);
      days.push({
        date: formatted,
        dayNumber: dayNum,
        inCurrentMonth: false,
        isSelected: formatted === selectedDate
      });
    }

    // Days in current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currDate = new Date(year, month - 1, i);
      const formatted = formatDateStr(currDate);
      days.push({
        date: formatted,
        dayNumber: i,
        inCurrentMonth: true,
        isSelected: formatted === selectedDate
      });
    }

    // Trailing days to fill the grid row
    const remainder = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainder; i++) {
      const nextDate = new Date(year, month, i);
      const formatted = formatDateStr(nextDate);
      days.push({
        date: formatted,
        dayNumber: i,
        inCurrentMonth: false,
        isSelected: formatted === selectedDate
      });
    }

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return {
      title: `${monthNames[month - 1]} ${year}`,
      days
    };
  };

  // Date Navigation handlers
  const handlePrevDate = () => {
    const { dateObj } = parseDateParts(selectedDate);
    if (viewMode === 'day' || viewMode === 'staff') {
      dateObj.setDate(dateObj.getDate() - 1);
    } else if (viewMode === 'week') {
      dateObj.setDate(dateObj.getDate() - 7);
    } else if (viewMode === 'month') {
      dateObj.setMonth(dateObj.getMonth() - 1);
    }
    setSelectedDate(formatDateStr(dateObj));
  };

  const handleNextDate = () => {
    const { dateObj } = parseDateParts(selectedDate);
    if (viewMode === 'day' || viewMode === 'staff') {
      dateObj.setDate(dateObj.getDate() + 1);
    } else if (viewMode === 'week') {
      dateObj.setDate(dateObj.getDate() + 7);
    } else if (viewMode === 'month') {
      dateObj.setMonth(dateObj.getMonth() + 1);
    }
    setSelectedDate(formatDateStr(dateObj));
  };

  const handleResetToday = () => {
    setSelectedDate('2026-10-28');
  };

  // Header Title Label
  const getHeaderTitle = () => {
    const { dateObj } = parseDateParts(selectedDate);
    const monthShorts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthFull = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (viewMode === 'day' || viewMode === 'staff') {
      return `${dayNames[dateObj.getDay()]}, ${monthShorts[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    }

    if (viewMode === 'week') {
      const week = getWeekDays(selectedDate);
      const first = parseDateParts(week[0].date);
      const last = parseDateParts(week[6].date);
      return `${monthShorts[first.month - 1]} ${first.day} – ${monthShorts[last.month - 1]} ${last.day}, ${last.year}`;
    }

    if (viewMode === 'month') {
      return `${monthFull[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    }

    return selectedDate;
  };

  // Filter pending appointments that need Pro approval
  const pendingRequests = appointments.filter(
    (a) => a.businessId === business.id && a.status === 'pending_approval'
  );

  // Filter scheduled appointments for the day
  const dayAppointments = appointments.filter(
    (a) =>
      a.businessId === business.id &&
      a.date === selectedDate &&
      a.status !== 'declined' &&
      a.status !== 'cancelled'
  );

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleAccept = (aptId: string) => {
    onUpdateStatus(aptId, 'confirmed');
  };

  const handleConfirmDecline = () => {
    if (declineModalApt) {
      onUpdateStatus(declineModalApt.id, 'declined', declineReason);
      setDeclineModalApt(null);
    }
  };

  const handleOpenNewModalForDate = (dateString: string) => {
    setModalDate(dateString);
    setShowNewAptModal(true);
  };

  const handleSaveNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const srv = services.find((s) => s.id === newServiceId);
    const prov = providers.find((p) => p.id === newProviderId);
    if (!srv || !prov || !newClientName) return;

    const newApt: Appointment = {
      id: `apt_${Date.now()}`,
      businessId: business.id,
      providerId: prov.id,
      providerName: prov.name,
      clientId: `cl_${Date.now()}`,
      clientName: newClientName.trim(),
      clientEmail: 'walkin@client.com',
      clientPhone: newClientPhone.trim() || '(555) 000-0000',
      serviceIds: [srv.id],
      serviceNames: [srv.name],
      date: modalDate,
      startTime: newTime,
      endTime: '11:15 AM',
      durationMinutes: srv.durationMinutes,
      totalPrice: srv.price,
      depositPaid: srv.depositAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    onCreateAppointment(newApt);
    setShowNewAptModal(false);
    setNewClientName('');
    setNewClientPhone('');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Pending Approvals Queue Banner (Accept / Decline) */}
      {pendingRequests.length > 0 && (
        <div
          id="pending-approvals-queue"
          className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 space-y-4 shadow-xl scroll-mt-28 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <h3 className="text-base font-bold text-amber-200">
                {pendingRequests.length} Appointment Request{pendingRequests.length > 1 ? 's' : ''} Awaiting Approval
              </h3>
            </div>
            <span className="text-xs text-amber-300 font-semibold bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
              Action Required
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#091712] rounded-xl p-4 border border-amber-500/25 shadow-md space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{req.clientName}</h4>
                    <p className="text-xs text-white/60 font-mono">{req.clientPhone} • {req.clientEmail}</p>
                  </div>
                  <span className="text-xs font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                    ${req.totalPrice}
                  </span>
                </div>

                <div className="text-xs text-white/80 space-y-1 bg-[#11281F] p-2.5 rounded-xl border border-white/5">
                  <p><strong className="text-white">Services:</strong> {req.serviceNames.join(', ')}</p>
                  <p><strong className="text-white">Requested:</strong> {req.date} at {req.startTime} ({req.durationMinutes} mins)</p>
                  {req.notes && <p className="italic text-white/70">"{req.notes}"</p>}
                  {req.intakeFormAnswers && (
                    <p className="text-emerald-400 flex items-center gap-1 font-medium mt-1">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" /> Intake Questionnaire & Waiver Completed
                    </p>
                  )}
                </div>

                {/* Pro Action Buttons: Accept / Decline */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept & Confirm</span>
                  </button>

                  <button
                    onClick={() => setDeclineModalApt(req)}
                    className="py-2.5 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-rose-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Decline Request</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backbar Pro Status Notification */}
      {business.lookBusyMode && business.lookBusyMode !== 'off' && (
        <div className="p-3 bg-[#0D221A] border border-white/10 rounded-xl flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>
              <strong>Backbar Pro™ Engine Active ({business.lookBusyMode} mode):</strong> Public booking availability is masked to keep your calendar appearing exclusive. Internal schedule retains 100% full view.
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-white/90 bg-white/10 px-2 py-0.5 rounded hidden sm:inline">
            Active
          </span>
        </div>
      )}

      {/* 2. Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0D221A] p-4 rounded-2xl border border-white/10 shadow-lg">
        
        {/* Date Selector with dynamic navigation */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#091712] p-1 rounded-xl border border-white/10">
            <button
              onClick={handlePrevDate}
              title="Previous"
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetToday}
              className="px-2 py-1 text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              Today
            </button>

            <button
              onClick={handleNextDate}
              title="Next"
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-[#091712] border border-white/10 text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2">
            <CalendarIcon className="w-3.5 h-3.5 text-white/60" />
            <span>{getHeaderTitle()}</span>
          </div>
        </div>

        {/* View Switcher (Day, Week, Month, Staff) & New Appointment */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-[#091712] rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'day' ? 'bg-white/15 text-white font-bold shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              Day
            </button>

            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'week' ? 'bg-white/15 text-white font-bold shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              Week
            </button>

            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'month' ? 'bg-white/15 text-white font-bold shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              Month
            </button>

            {business.tier === 'salon' && (
              <button
                onClick={() => setViewMode('staff')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'staff' ? 'bg-white/15 text-white font-bold shadow-sm' : 'text-white/60 hover:text-white'
                }`}
              >
                Staff
              </button>
            )}
          </div>

          <button
            onClick={() => handleOpenNewModalForDate(selectedDate)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white/70" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* 3. CALENDAR CONTENT VIEWS */}

      {/* VIEW A: WEEK VIEW (7 COLUMNS) */}
      {viewMode === 'week' && (
        <div className="rounded-2xl bg-[#0D221A] border border-white/10 p-4 md:p-5 overflow-x-auto shadow-xl">
          <div className="min-w-[850px] grid grid-cols-7 gap-3">
            {getWeekDays(selectedDate).map((day) => {
              const dayApts = appointments.filter(
                (a) =>
                  a.businessId === business.id &&
                  a.date === day.date &&
                  a.status !== 'declined' &&
                  a.status !== 'cancelled'
              );

              const isSelectedDay = day.date === selectedDate;

              return (
                <div
                  key={day.date}
                  className={`rounded-xl p-3 border transition-all flex flex-col justify-between min-h-[460px] ${
                    isSelectedDay
                      ? 'bg-[#143327] border-white/30 shadow-md ring-1 ring-white/15'
                      : 'bg-[#091712] border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Column Header */}
                  <div>
                    <div
                      onClick={() => setSelectedDate(day.date)}
                      className="cursor-pointer pb-2.5 border-b border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <p className={`text-xs font-semibold ${isSelectedDay ? 'text-white' : 'text-white/60'}`}>
                          {day.dayName}
                        </p>
                        <p className={`text-base font-bold font-mono ${isSelectedDay ? 'text-white' : 'text-white/90'}`}>
                          {day.dayNumber}
                        </p>
                      </div>

                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          dayApts.length > 0 ? 'bg-white/10 text-white' : 'bg-transparent text-white/30'
                        }`}
                      >
                        {dayApts.length > 0 ? `${dayApts.length} booked` : 'Open'}
                      </span>
                    </div>

                    {/* Day Appointments List */}
                    <div className="space-y-2 pt-3">
                      {dayApts.length === 0 ? (
                        <p className="text-[11px] text-white/30 text-center pt-8">No bookings</p>
                      ) : (
                        dayApts.map((apt) => (
                          <div
                            key={apt.id}
                            onClick={() => setSelectedApt(apt)}
                            className="p-2.5 rounded-xl bg-[#0D221A] border border-white/10 hover:border-white/30 cursor-pointer transition-all space-y-1.5 shadow-sm group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-white/80 font-bold">
                                {apt.startTime}
                              </span>
                              <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                                apt.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' :
                                apt.status === 'in_service' ? 'bg-blue-500/20 text-blue-300' :
                                apt.status === 'completed' ? 'bg-white/10 text-white/60' :
                                'bg-amber-500/20 text-amber-300'
                              }`}>
                                {apt.status.replace('_', ' ')}
                              </span>
                            </div>

                            <p className="font-semibold text-xs text-white truncate">{apt.clientName}</p>
                            <p className="text-[10px] text-white/60 truncate">{apt.serviceNames[0]}</p>
                            
                            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-white/50">
                              <span>${apt.totalPrice}</span>
                              <span className="text-white/40 group-hover:text-white transition-colors">Details →</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Add Slot Button */}
                  <button
                    onClick={() => handleOpenNewModalForDate(day.date)}
                    className="w-full mt-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[11px] font-medium transition-colors border border-white/5 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW B: MONTH VIEW (FULL 7x5 or 7x6 GRID) */}
      {viewMode === 'month' && (
        <div className="rounded-2xl bg-[#0D221A] border border-white/10 p-4 md:p-6 shadow-xl space-y-4">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-white/60 pb-2 border-b border-white/10">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {getMonthGrid(selectedDate).days.map((cell, idx) => {
              const cellApts = appointments.filter(
                (a) =>
                  a.businessId === business.id &&
                  a.date === cell.date &&
                  a.status !== 'declined' &&
                  a.status !== 'cancelled'
              );

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDate(cell.date)}
                  className={`min-h-[105px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    cell.isSelected
                      ? 'bg-[#143327] border-white/30 shadow-md ring-1 ring-white/20'
                      : cell.inCurrentMonth
                      ? 'bg-[#091712] border-white/5 hover:border-white/20'
                      : 'bg-[#07130E]/60 border-transparent opacity-40 hover:opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold ${
                        cell.isSelected
                          ? 'w-5 h-5 rounded-full bg-white text-[#07130E] flex items-center justify-center text-[11px]'
                          : cell.inCurrentMonth
                          ? 'text-white'
                          : 'text-white/40'
                      }`}
                    >
                      {cell.dayNumber}
                    </span>

                    {cellApts.length > 0 && (
                      <span className="text-[10px] font-mono bg-white/10 text-white/90 px-1.5 py-0.2 rounded font-semibold">
                        {cellApts.length}
                      </span>
                    )}
                  </div>

                  {/* Mini Appointment Pills */}
                  <div className="space-y-1 my-1">
                    {cellApts.slice(0, 2).map((apt) => (
                      <div
                        key={apt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApt(apt);
                        }}
                        className="px-1.5 py-0.5 rounded bg-[#0D221A] hover:bg-[#143327] border border-white/10 text-[10px] text-white truncate transition-colors flex items-center justify-between"
                        title={`${apt.startTime} - ${apt.clientName}`}
                      >
                        <span className="truncate">{apt.clientName.split(' ')[0]}</span>
                        <span className="text-white/50 text-[9px] font-mono shrink-0 ml-1">{apt.startTime.split(' ')[0]}</span>
                      </div>
                    ))}

                    {cellApts.length > 2 && (
                      <p className="text-[9px] text-white/50 text-right pr-1">
                        +{cellApts.length - 2} more
                      </p>
                    )}
                  </div>

                  <div className="pt-0.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenNewModalForDate(cell.date);
                      }}
                      className="text-[9px] text-white/40 hover:text-white transition-colors"
                      title="Add appointment for this date"
                    >
                      + Book
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW C: MULTI-STAFF COLUMNS (FOR SALONS) */}
      {viewMode === 'staff' && business.tier === 'salon' && (
        <div className="rounded-2xl bg-[#0D221A] border border-white/10 p-4 overflow-x-auto shadow-xl">
          <div className="min-w-[700px] grid grid-cols-4 gap-4">
            {providers.slice(0, 4).map((provider) => {
              const staffApts = dayAppointments.filter((a) => a.providerId === provider.id);
              return (
                <div key={provider.id} className="bg-[#091712] rounded-xl p-3 border border-white/5 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                    <img src={provider.avatar} alt={provider.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    <div className="truncate">
                      <p className="font-semibold text-xs text-white truncate">{provider.name}</p>
                      <p className="text-[10px] text-white/50 capitalize">{provider.role.replace('_', ' ')}</p>
                    </div>
                  </div>

                  <div className="space-y-2 min-h-[300px]">
                    {staffApts.length === 0 ? (
                      <p className="text-[11px] text-white/30 text-center pt-8">No bookings scheduled</p>
                    ) : (
                      staffApts.map((apt) => (
                        <div
                          key={apt.id}
                          onClick={() => setSelectedApt(apt)}
                          className="p-3 rounded-xl bg-[#0D221A] border border-white/10 hover:border-white/30 cursor-pointer transition-all space-y-1.5 shadow-sm"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-mono text-white font-bold">{apt.startTime}</span>
                            <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                              apt.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' :
                              apt.status === 'in_service' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-white/10 text-white/60'
                            }`}>
                              {apt.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="font-semibold text-xs text-white truncate">{apt.clientName}</p>
                          <p className="text-[11px] text-white/60 truncate">{apt.serviceNames[0]}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW D: STANDARD DAY TIMELINE */}
      {viewMode === 'day' && (
        <div className="rounded-2xl bg-[#0D221A] border border-white/10 p-4 sm:p-6 space-y-3 shadow-xl">
          {timeSlots.map((time) => {
            const slotApt = dayAppointments.find((a) => a.startTime === time);
            return (
              <div key={time} className="flex items-start gap-4 py-2 border-b border-white/5 last:border-0">
                <span className="w-20 text-xs font-mono font-medium text-white/60 pt-1 shrink-0">
                  {time}
                </span>

                <div className="flex-1">
                  {slotApt ? (
                    <div
                      onClick={() => setSelectedApt(slotApt)}
                      className="p-4 rounded-xl bg-[#091712] border border-white/15 hover:border-white/30 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{slotApt.clientName}</span>
                          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                            slotApt.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            slotApt.status === 'in_service' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                            'bg-white/10 text-white/70'
                          }`}>
                            {slotApt.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-white/60">
                          {slotApt.serviceNames.join(' + ')} • <span className="font-mono text-white/80">{slotApt.durationMinutes} min</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white font-mono">${slotApt.totalPrice}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPOSForAppointment(slotApt);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
                        >
                          <CreditCard className="w-3.5 h-3.5 text-white/70" />
                          <span>POS Checkout</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setNewTime(time);
                        handleOpenNewModalForDate(selectedDate);
                      }}
                      className="h-10 rounded-xl border border-dashed border-white/10 flex items-center px-4 text-xs text-white/40 hover:border-white/30 hover:text-white transition-colors cursor-pointer"
                    >
                      Available Slot (+ Click to book)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Appointment Detail Modal Drawer */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0D221A] border border-white/20 p-6 shadow-2xl text-white space-y-5">
            <button
              onClick={() => setSelectedApt(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Appointment Overview</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{selectedApt.clientName}</h3>
                <p className="text-xs text-white/60 font-mono">{selectedApt.clientPhone} • {selectedApt.clientEmail}</p>
              </div>
              <span className="text-base font-bold text-white bg-white/10 border border-white/15 px-3.5 py-1 rounded-xl font-mono">
                ${selectedApt.totalPrice}
              </span>
            </div>

            <div className="space-y-3 text-xs text-white/80">
              <div className="bg-[#091712] p-4 rounded-xl border border-white/5 space-y-1.5">
                <p><strong className="text-white">Services:</strong> {selectedApt.serviceNames.join(', ')}</p>
                <p><strong className="text-white">Scheduled:</strong> {selectedApt.date} at {selectedApt.startTime} ({selectedApt.durationMinutes} min)</p>
                <p><strong className="text-white">Provider:</strong> {selectedApt.providerName}</p>
                <p><strong className="text-white">Deposit Paid:</strong> ${selectedApt.depositPaid}</p>
              </div>

              {selectedApt.notes && (
                <div className="bg-[#091712] p-3.5 rounded-xl border border-white/5">
                  <p className="text-white font-medium mb-1">Client Consultation Notes:</p>
                  <p className="text-white/70 italic">{selectedApt.notes}</p>
                </div>
              )}
            </div>

            {/* Actions: POS or Mark Completed */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  onOpenPOSForAppointment(selectedApt);
                  setSelectedApt(null);
                }}
                className="py-3 px-4 rounded-xl bg-[#C9A86A] hover:bg-[#D4B26F] text-[#07130E] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Open POS Checkout</span>
              </button>

              <button
                onClick={() => {
                  onUpdateStatus(selectedApt.id, 'completed');
                  setSelectedApt(null);
                }}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-white/15 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Mark Completed</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Decline Reason Dialog Modal */}
      {declineModalApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0D221A] border border-rose-800/60 p-6 shadow-2xl text-white space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span>Decline Appointment Request</span>
            </h3>

            <p className="text-xs text-white/70 leading-relaxed">
              Are you sure you want to decline the request for <strong>{declineModalApt.clientName}</strong>?
              The client will receive an automated notification and the slot will be freed.
            </p>

            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Decline Reason (shared with client):
              </label>
              <select
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full bg-[#091712] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/40"
              >
                <option>Schedule conflict at requested time</option>
                <option>Service requires in-person pre-consultation</option>
                <option>Contraindications noted in intake waiver</option>
                <option>Fully booked for the day</option>
                <option>Other / Personal availability</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeclineModalApt(null)}
                className="py-2.5 px-3 rounded-xl bg-white/10 text-white font-medium text-xs border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecline}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1"
              >
                <X className="w-4 h-4" />
                <span>Confirm Decline</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. New Appointment Modal */}
      {showNewAptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0D221A] border border-white/20 p-6 shadow-2xl text-white space-y-4">
            <button
              onClick={() => setShowNewAptModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-white/70" />
              <span>Book Appointment (Walk-in / Phone)</span>
            </h3>

            <form onSubmit={handleSaveNewAppointment} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/80 font-medium mb-1">Appointment Date</label>
                <input
                  type="date"
                  value={modalDate}
                  onChange={(e) => setModalDate(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Client Phone</label>
                <input
                  type="text"
                  placeholder="(555) 000-0000"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Service</label>
                <select
                  value={newServiceId}
                  onChange={(e) => setNewServiceId(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (${s.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white/80 font-medium mb-1">Provider</label>
                  <select
                    value={newProviderId}
                    onChange={(e) => setNewProviderId(e.target.value)}
                    className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                  >
                    {providers.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-1">Time Slot</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/15 cursor-pointer"
                >
                  Confirm & Add to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
