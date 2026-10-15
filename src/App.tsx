import React, { useState } from 'react';
import { Header, TabType } from './components/Header';
import { DashboardSection } from './components/DashboardSection';
import { MentorDirectorySection } from './components/MentorDirectorySection';
import { BookingModal } from './components/BookingModal';
import { SessionsManagementSection } from './components/SessionsManagementSection';
import { EventsSection } from './components/EventsSection';
import { AIAssistantModal } from './components/AIAssistantModal';
import { Footer } from './components/Footer';
import {
  INITIAL_MENTORS,
  INITIAL_BOOKINGS,
  INITIAL_EVENTS,
} from './data/mockData';
import { Mentor, MentorshipBooking, EventItem, CareerId, ActiveRole, SessionReview } from './types';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [userRole, setUserRole] = useState<ActiveRole>('estudiante');

  // Application Data State
  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [bookings, setBookings] = useState<MentorshipBooking[]>(INITIAL_BOOKINGS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);

  // Directory filter handover from Dashboard search
  const [directorySearchQuery, setDirectorySearchQuery] = useState<string>('');
  const [directoryCareerFilter, setDirectoryCareerFilter] = useState<CareerId | undefined>(undefined);

  // Active Modals
  const [activeBookingMentor, setActiveBookingMentor] = useState<Mentor | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isOfferSlotModalOpen, setIsOfferSlotModalOpen] = useState(false);

  // New slot form state for alumni
  const [offerSlotDay, setOfferSlotDay] = useState(() => {
    const date = new Date();
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 4);
    return `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}-${String(nextMonth.getDate()).padStart(2, '0')}`;
  });
  const [offerSlotTime, setOfferSlotTime] = useState('18:00 - 18:30');
  const [offerSlotError, setOfferSlotError] = useState('');

  // Handlers for Navigation with search filters
  const handleNavigateToDirectorio = (search?: string, career?: CareerId) => {
    setDirectorySearchQuery(search || '');
    setDirectoryCareerFilter(career);
    setActiveTab('directorio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (mentor: Mentor) => {
    setActiveBookingMentor(mentor);
  };

  // Add booked mentorship session (30 min fixed)
  const handleConfirmBooking = (newBooking: Omit<MentorshipBooking, 'id' | 'createdAt'>) => {
    const bookingWithId: MentorshipBooking = {
      ...newBooking,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [bookingWithId, ...prev]);

    // Mark slot as booked for that mentor
    setMentors((prev) =>
      prev.map((m) => {
        if (m.id !== newBooking.mentorId) return m;
        return {
          ...m,
          availableSlots: m.availableSlots.map((slot) =>
            slot.day === newBooking.date && slot.time === newBooking.time
              ? { ...slot, available: false }
              : slot
          ),
        };
      })
    );
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    const booking = bookings.find((item) => item.id === bookingId);
    if (!booking || !window.confirm('¿Cancelar esta solicitud de muestra? Podrás volver a elegir el horario si sigue disponible.')) return;
    setBookings((prev) => prev.map((item) => item.id === bookingId ? { ...item, status: 'cancelada' } : item));
    setMentors((prev) => prev.map((mentor) => mentor.id === booking.mentorId ? {
      ...mentor,
      availableSlots: mentor.availableSlots.map((slot) => slot.day === booking.date && slot.time === booking.time ? { ...slot, available: true } : slot),
    } : mentor));
  };

  // Toggle Event Registration
  const handleToggleEventRegistration = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        const newRegistered = !ev.registered;
        if (newRegistered && ev.spotsLeft === 0) return ev;
        return {
          ...ev,
          registered: newRegistered,
          spotsLeft: newRegistered ? Math.max(0, ev.spotsLeft - 1) : ev.spotsLeft + 1,
        };
      })
    );
  };

  // Update booking status (e.g. pending -> confirmed -> completed)
  const handleUpdateBookingStatus = (bookingId: string, status: MentorshipBooking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  // Submit post-session mutual review (Step 6 of Storyboard)
  const handleSubmitReview = (bookingId: string, review: SessionReview) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, review, status: 'completada' } : b))
    );
  };

  // Add mentor slot (for alumni role)
  const handleAddAlumniSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const chaconId = 'm-juan-chacon';
    const mentor = mentors.find((item) => item.id === chaconId);
    const month = offerSlotDay.slice(0, 7);
    if (!mentor || new Date(`${offerSlotDay}T${offerSlotTime.slice(0, 5)}:00-03:00`).getTime() <= Date.now()) {
      setOfferSlotError('Elegí un horario futuro.');
      return;
    }
    if (mentor.availableSlots.filter((slot) => slot.day.startsWith(month)).length >= mentor.monthlySlotsCap) {
      setOfferSlotError(`Ya hay ${mentor.monthlySlotsCap} cupos cargados para ese mes. Elegí otro mes.`);
      return;
    }
    if (mentor.availableSlots.some((slot) => slot.day === offerSlotDay && slot.time === offerSlotTime)) {
      setOfferSlotError('Ese horario ya está cargado. Elegí otro.');
      return;
    }
    setMentors((prev) =>
      prev.map((m) => {
        if (m.id !== chaconId) return m;
        return {
          ...m,
          availableSlots: [
            ...m.availableSlots,
            { id: `slot-${Date.now()}`, day: offerSlotDay, time: offerSlotTime, available: true },
          ],
        };
      })
    );
    setIsOfferSlotModalOpen(false);
    setOfferSlotError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-[#A3223A]/10 selection:text-[#A3223A]">
      {/* 1. Header Oficial UBP Conecta */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookingCount={bookings.filter((booking) => booking.status !== 'cancelada').length}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      />

      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-950">
        Demostración interactiva: los perfiles, reservas e inscripciones son de muestra y se reinician al recargar la página.
      </div>

      {/* 2. Ribbon Institucional de Vinculación y Ferias */}
      <div className="bg-[#8B1D31] text-white py-2 px-4 text-xs shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded-sm font-black uppercase tracking-wider text-[10px] text-amber-200">
              Co-Creación UBP
            </span>
            <span className="min-w-0 leading-relaxed">
              Explorá la <strong>Feria de Talento Inverso</strong> y los encuentros de muestra.
            </span>
          </div>
          <button
            onClick={() => {
              setActiveTab('eventos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-amber-200 hover:text-white underline font-bold whitespace-nowrap flex items-center gap-1 shrink-0"
          >
            <span>Ver Ferias & Encuentros Híbridos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Main Content Router */}
      <main id="contenido-principal" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Vista 1: Pantalla de Inicio / Dashboard Principal */}
        {activeTab === 'inicio' && (
          <DashboardSection
            mentors={mentors}
            events={events}
            userRole={userRole}
            setUserRole={setUserRole}
            onNavigateToDirectorio={handleNavigateToDirectorio}
            onNavigateToSesiones={() => {
              setActiveTab('sesiones');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToEventos={() => {
              setActiveTab('eventos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookMentor={handleOpenBooking}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
            confirmedBookingsCount={bookings.filter((b) => b.status === 'confirmada').length}
          />
        )}

        {/* Vista 2: Directorio y Filtro de Mentores (Módulo de Matching) */}
        {activeTab === 'directorio' && (
          <MentorDirectorySection
            mentors={mentors}
            onBookMentor={handleOpenBooking}
            userRole={userRole}
            initialSearch={directorySearchQuery}
            initialCareer={directoryCareerFilter}
            onOpenOfferSlotModal={() => setIsOfferSlotModalOpen(true)}
          />
        )}

        {/* Vista 4: Panel de Gestión de Sesiones y Red (Mis Conexiones) */}
        {activeTab === 'sesiones' && (
          <SessionsManagementSection
            bookings={bookings}
            events={events}
            userRole={userRole}
            onCancelBooking={handleCancelBooking}
            onUnregisterEvent={handleToggleEventRegistration}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onSubmitReview={handleSubmitReview}
            onNavigateToDirectorio={() => {
              setActiveTab('directorio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Dimensión Híbrida: Eventos, Ferias de Talento Inverso y Flash Mentoring */}
        {activeTab === 'eventos' && (
          <EventsSection
            events={events}
            onToggleEventRegistration={handleToggleEventRegistration}
          />
        )}
      </main>

      {/* Vista 3: Módulo de Agendamiento Modular (Micro-Mentoring 30 min) */}
      <BookingModal
        key={activeBookingMentor?.id ?? 'closed'}
        mentor={activeBookingMentor}
        isOpen={Boolean(activeBookingMentor)}
        onClose={() => setActiveBookingMentor(null)}
        onConfirmBooking={handleConfirmBooking}
        onViewMyBookings={() => {
          setActiveBookingMentor(null);
          setActiveTab('sesiones');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modal: Habilitar Cupos Mensuales de Mentoría (Perspectiva Egresado) */}
      {isOfferSlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div role="dialog" aria-modal="true" aria-label="Habilitar cupo de mentoría" className="bg-white rounded-2xl border border-stone-200 max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#A3223A] uppercase tracking-wider">
                  Gestión de Disponibilidad · Egresado
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  Habilitar Cupo de Micro-Mentoría
                </h3>
              </div>
              <button
                onClick={() => setIsOfferSlotModalOpen(false)}
                aria-label="Cerrar formulario de cupo"
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Para proteger tu tiempo laboral, el sistema permite habilitar <strong>máximo 1 o 2 bloques de 30 minutos al mes</strong>.
              </span>
            </div>

            <form onSubmit={handleAddAlumniSlot} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                  Fecha del bloque
                </label>
                <input
                  type="date"
                  min={new Date().toLocaleDateString('en-CA')}
                  value={offerSlotDay}
                  onChange={(e) => { setOfferSlotDay(e.target.value); setOfferSlotError(''); }}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:border-[#A3223A] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                  Horario de 30 minutos
                </label>
                <select
                  value={offerSlotTime}
                  onChange={(e) => setOfferSlotTime(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:border-[#A3223A] focus:outline-hidden font-mono"
                >
                  <option value="17:00 - 17:30">17:00 - 17:30 hs</option>
                  <option value="17:30 - 18:00">17:30 - 18:00 hs</option>
                  <option value="18:00 - 18:30">18:00 - 18:30 hs</option>
                  <option value="18:30 - 19:00">18:30 - 19:00 hs</option>
                  <option value="19:00 - 19:30">19:00 - 19:30 hs</option>
                </select>
              </div>

              {offerSlotError && <p role="alert" className="rounded-lg bg-rose-50 p-2 text-rose-800">{offerSlotError}</p>}

              <div className="pt-2 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOfferSlotModalOpen(false)}
                  className="px-3.5 py-2 text-stone-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#A3223A] text-white font-bold rounded-lg hover:bg-[#8B1D31]"
                >
                  Habilitar Cupo (30 min)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Asistente Pascalina IA */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onNavigateToDirectorio={() => handleNavigateToDirectorio()}
      />

      {/* Footer Oficial */}
      <Footer />
    </div>
  );
}
