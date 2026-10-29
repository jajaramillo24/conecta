import React, { useState } from 'react';
import { MentorshipBooking, EventItem, SessionReview, ActiveRole } from '../types';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  Clock3, 
  CheckCheck, 
  Star, 
  Trash2, 
  ExternalLink, 
  MessageSquare, 
  AlertCircle,
  FileText,
  User,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  RotateCcw,
  PauseCircle,
  PlayCircle,
  PlusCircle,
  Zap
} from 'lucide-react';
import { SessionReviewModal } from './SessionReviewModal';

interface OfferedSlot {
  id: string;
  day: string;
  time: string;
  format: 'estandar' | 'expres' | 'flexible';
  status: 'disponible' | 'reservado' | 'pausado';
  bookedBy?: string;
}

interface SessionsManagementSectionProps {
  bookings: MentorshipBooking[];
  events: EventItem[];
  userRole: ActiveRole;
  onCancelBooking: (bookingId: string) => void;
  onUnregisterEvent: (eventId: string) => void;
  onUpdateBookingStatus: (bookingId: string, status: MentorshipBooking['status']) => void;
  onSubmitReview: (bookingId: string, review: SessionReview) => void;
  onNavigateToDirectorio: () => void;
  onRescheduleBooking?: (bookingId: string, newDate: string, newTime: string) => void;
  onOpenOfferSlotModal?: () => void;
}

export const SessionsManagementSection: React.FC<SessionsManagementSectionProps> = ({
  bookings,
  events,
  userRole,
  onCancelBooking,
  onUnregisterEvent,
  onUpdateBookingStatus,
  onSubmitReview,
  onNavigateToDirectorio,
  onRescheduleBooking,
  onOpenOfferSlotModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'confirmada' | 'pendiente' | 'completada'>('all');
  const [reviewingBooking, setReviewingBooking] = useState<MentorshipBooking | null>(null);

  // Iteración 3: Control de Disponibilidad para egresados (Activo / Pausado con 1 clic)
  const [isAvailabilityActive, setIsAvailabilityActive] = useState<boolean>(true);

  // Iteración 3: Lista interactiva de cupos del mentor con pausa y reprogramación
  const [alumniSlots, setAlumniSlots] = useState<OfferedSlot[]>([
    {
      id: 'slot-1',
      day: 'Martes 24/10',
      time: '18:00 - 18:30 hs',
      format: 'flexible',
      status: 'disponible',
    },
    {
      id: 'slot-2',
      day: 'Jueves 26/10',
      time: '19:00 - 19:30 hs',
      format: 'expres',
      status: 'reservado',
      bookedBy: 'Juan Andrés (Ing. Informática)',
    },
    {
      id: 'slot-3',
      day: 'Viernes 27/10',
      time: '17:30 - 18:00 hs',
      format: 'estandar',
      status: 'disponible',
    },
  ]);

  // Modal / prompt state for 1-click rescheduling
  const [reschedulingBooking, setReschedulingBooking] = useState<MentorshipBooking | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState<string>('2026-10-29');
  const [newRescheduleTime, setNewRescheduleTime] = useState<string>('18:30 - 19:00');

  const registeredEvents = events.filter((e) => e.registered);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  const handleToggleSlotStatus = (slotId: string) => {
    setAlumniSlots((prev) =>
      prev.map((s) => {
        if (s.id !== slotId) return s;
        if (s.status === 'disponible') {
          return { ...s, status: 'pausado' };
        }
        if (s.status === 'pausado') {
          return { ...s, status: 'disponible' };
        }
        return s;
      })
    );
  };

  const handleQuickRescheduleSlot = (slotId: string) => {
    // 1-click reschedule to next week
    setAlumniSlots((prev) =>
      prev.map((s) => {
        if (s.id !== slotId) return s;
        const days = ['Lunes 30/10', 'Martes 31/10', 'Miércoles 01/11', 'Jueves 02/11'];
        const nextDay = days[Math.floor(Math.random() * days.length)];
        return { ...s, day: nextDay };
      })
    );
  };

  const handleConfirmReschedule = () => {
    if (reschedulingBooking && onRescheduleBooking) {
      onRescheduleBooking(reschedulingBooking.id, newRescheduleDate, newRescheduleTime);
    }
    setReschedulingBooking(null);
  };

  const getStatusBadge = (status: MentorshipBooking['status']) => {
    switch (status) {
      case 'confirmada':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirmada</span>
          </span>
        );
      case 'pendiente':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock3 className="w-3.5 h-3.5" />
            <span>Pendiente de Aprobación</span>
          </span>
        );
      case 'completada':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Completada</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header (Iteración 3: Pestaña unificada Encuentros / Disponibilidad) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3223A]">
            <Clock className="w-4 h-4" />
            <span>Panel de Trazabilidad & Gestión de Red · UBP Conecta</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            {userRole === 'egresado' 
              ? 'Mis Encuentros / Mi Disponibilidad de Cupos'
              : 'Mis Encuentros & Sesiones Agendadas'}
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
            Hacé seguimiento del estado de tus solicitudes (Sesiones Estándar de 30 min y Consultas Exprés de 15-20 min), 
            accedé a las salas de Google Meet y administrá tu disponibilidad con controles de 1 clic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {userRole === 'egresado' && onOpenOfferSlotModal && (
            <button
              onClick={onOpenOfferSlotModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Habilitar Nuevo Cupo</span>
            </button>
          )}

          <button
            onClick={onNavigateToDirectorio}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Solicitar Nueva Mentoría</span>
          </button>
        </div>
      </div>

      {/* 2. Panel de Disponibilidad y Cupos (Iteración 3: Específico para Egresados Mentores) */}
      {userRole === 'egresado' && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A3223A]" />
                <h2 className="text-base font-bold text-stone-900">
                  Control de Disponibilidad Mensual & Pausa Rápida
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Protección de agenda: Si tenés picos de trabajo o viajes, pausá tus cupos con 1 solo clic sin perder tu perfil.
              </p>
            </div>

            {/* 1-Click Global Availability Toggle */}
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                isAvailabilityActive 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isAvailabilityActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span>{isAvailabilityActive ? 'Cupos Visibles en Directorio' : 'Disponibilidad Pausada'}</span>
              </span>

              <button
                type="button"
                onClick={() => setIsAvailabilityActive(!isAvailabilityActive)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                  isAvailabilityActive
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
                title="Pausar o reanudar recepción de nuevas solicitudes"
              >
                {isAvailabilityActive ? (
                  <>
                    <PauseCircle className="w-3.5 h-3.5" />
                    <span>Pausar este mes</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Reanudar visibilidad</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Slots List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Tus Bloques Habilitados para Octubre / Noviembre 2026:
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {alumniSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-3.5 rounded-xl border text-xs flex flex-col justify-between space-y-3 transition-all ${
                    slot.status === 'pausado'
                      ? 'bg-stone-50 border-dashed border-stone-300 opacity-70'
                      : slot.status === 'reservado'
                      ? 'bg-blue-50/60 border-blue-200'
                      : 'bg-white border-stone-200 shadow-2xs hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-sm font-mono">
                        {slot.day}
                      </span>
                      {slot.status === 'disponible' && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Disponible
                        </span>
                      )}
                      {slot.status === 'reservado' && (
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">
                          Reservado
                        </span>
                      )}
                      {slot.status === 'pausado' && (
                        <span className="text-[10px] font-bold text-stone-500 bg-stone-200 px-2 py-0.5 rounded-md">
                          En Pausa
                        </span>
                      )}
                    </div>

                    <div className="text-stone-600 font-mono text-[11px]">
                      Horario: {slot.time}
                    </div>

                    <div className="text-[11px] text-stone-500">
                      {slot.status === 'reservado' ? (
                        <span className="font-semibold text-stone-800">
                          Por: {slot.bookedBy}
                        </span>
                      ) : (
                        <span>
                          Formato: {slot.format === 'expres' ? 'Consulta Exprés (15-20 min)' : slot.format === 'estandar' ? 'Sesión Estándar (30 min)' : 'Flexible (15 o 30 min)'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 1-Click Action Buttons for Slots */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-stone-100 text-[11px]">
                    {slot.status !== 'reservado' && (
                      <button
                        type="button"
                        onClick={() => handleToggleSlotStatus(slot.id)}
                        className="flex-1 py-1 px-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors text-center"
                      >
                        {slot.status === 'pausado' ? 'Reanudar' : 'Pausar cupo'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleQuickRescheduleSlot(slot.id)}
                      className="flex-1 py-1 px-2 rounded-md bg-stone-100 hover:bg-[#A3223A]/10 hover:text-[#A3223A] text-stone-700 font-semibold transition-colors text-center flex items-center justify-center gap-1"
                      title="Reprogramar horario del cupo con 1 clic"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reprogramar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Status Segmented Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 shadow-2xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            Todas ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('confirmada')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'confirmada'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            Confirmadas ({bookings.filter((b) => b.status === 'confirmada').length})
          </button>
          <button
            onClick={() => setActiveTab('pendiente')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'pendiente'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            Pendientes ({bookings.filter((b) => b.status === 'pendiente').length})
          </button>
          <button
            onClick={() => setActiveTab('completada')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'completada'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            Completadas ({bookings.filter((b) => b.status === 'completada').length})
          </button>
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Perspectiva activa: <strong className="text-stone-800">{userRole === 'estudiante' ? 'Estudiante (Juan Andrés)' : 'Egresado Mentor'}</strong>
        </div>
      </div>

      {/* 4. Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
            <Clock className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="font-bold text-stone-900 text-base">
              No tenés sesiones en este estado
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Explorá el directorio de mentores de la UBP para agendar una Sesión Estándar (30 min) o una Consulta Exprés (15-20 min) con temario previo estructurado.
            </p>
            <button
              onClick={onNavigateToDirectorio}
              className="px-4 py-2 bg-[#A3223A] text-white text-xs font-bold rounded-lg hover:bg-[#8B1D31] transition-colors mt-2"
            >
              Ir al Directorio de Mentores
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => {
            const isExpress = b.sessionFormat === 'expres';
            const duration = b.durationMinutes || (isExpress ? 20 : 30);

            return (
              <div
                key={b.id}
                className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:border-stone-300 transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#A3223A] text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {b.mentorName.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-stone-900 text-base leading-snug">
                          {isExpress ? 'Consulta Exprés' : 'Sesión de Micro-Mentoría'} con {b.mentorName}
                        </h3>
                        {/* Iteración 4: Format Badge */}
                        {isExpress ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <Zap className="w-3 h-3 text-amber-600" />
                            <span>Consulta Exprés ({duration} min)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                            <Clock className="w-3 h-3 text-indigo-600" />
                            <span>Sesión Estándar (30 min)</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {b.mentorRole} · {b.mentorCompany}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(b.status)}

                    <button
                      onClick={() => onCancelBooking(b.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-md transition-colors"
                      title="Cancelar o archivar turno"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Grid with Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Date & Time & Duration */}
                  <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200/60 space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#A3223A]" />
                      <span>Fecha & Duración</span>
                    </div>
                    <div className="font-bold text-stone-900 text-sm font-mono">
                      {b.date} · {b.time}
                    </div>
                    <div className="text-[11px] text-stone-500 font-medium">
                      Duración: <strong className="text-stone-800">{duration} minutos</strong> ({isExpress ? 'Formato Ágil 15-20 min' : 'Bloque fijo de 30 min'})
                    </div>
                  </div>

                  {/* Modality & Location */}
                  <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200/60 space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      {b.modality.includes('Virtual') ? (
                        <Video className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-[#A3223A]" />
                      )}
                      <span>Modalidad de Encuentro</span>
                    </div>
                    <div className="font-bold text-stone-900 text-sm">
                      {b.modality}
                    </div>
                    <div className="text-[11px] text-stone-600 truncate">
                      {b.locationDetail}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200/60 space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-500" />
                      <span>Estudiante Solicitante</span>
                    </div>
                    <div className="font-bold text-stone-900 text-sm">
                      {b.studentName}
                    </div>
                    <div className="text-[11px] text-stone-500 truncate">
                      {b.studentCareer} · {b.studentEmail}
                    </div>
                  </div>
                </div>

                {/* 3-line Mandated Objective Display */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-[#A3223A]" />
                    <span>Temario Previo Acordado (Objetivo de la Sesión):</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-800 whitespace-pre-line font-mono leading-relaxed">
                    {b.objective}
                  </div>
                </div>

                {/* Completed Review Display if available */}
                {b.review && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Reseña y Evaluación Registrada</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(b.review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-stone-700 italic">
                      &ldquo;{b.review.feedbackText}&rdquo;
                    </p>
                    <div className="text-[10px] text-stone-500 flex items-center gap-2">
                      <span>Acreditado al Badge de Mentor UBP</span>
                      <span aria-hidden="true">·</span>
                      <span>{new Date(b.review.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons Row */}
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {/* Join Link if virtual */}
                    {b.meetingUrl && b.status === 'confirmada' && (
                      <a
                        href={b.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Entrar a Google Meet UBP</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}

                    {/* Physical Campus badge */}
                    {b.modality.includes('Campus') && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#A3223A]" />
                        <span>Campus UBP (Argüello)</span>
                      </span>
                    )}

                    {/* Iteración 3: 1-Click Reprogramar Button */}
                    {b.status !== 'completada' && (
                      <button
                        type="button"
                        onClick={() => {
                          setReschedulingBooking(b);
                          setNewRescheduleDate(b.date);
                          setNewRescheduleTime(b.time);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold transition-colors"
                        title="Reprogramar fecha u horario del encuentro"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reprogramar</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status toggle simulation */}
                    {b.status === 'pendiente' && (
                      <button
                        onClick={() => onUpdateBookingStatus(b.id, 'confirmada')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                        title="Simular aceptación del mentor"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Aprobar Solicitud (Como Mentor)</span>
                      </button>
                    )}

                    {b.status === 'confirmada' && (
                      <button
                        onClick={() => onUpdateBookingStatus(b.id, 'completada')}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Marcar como Concluida</span>
                      </button>
                    )}

                    {/* Valorar posterior button (Momento 6 del Storyboard) */}
                    {b.status === 'completada' && !b.review && (
                      <button
                        onClick={() => setReviewingBooking(b.id === reviewingBooking?.id ? null : b)}
                        className="px-3.5 py-1.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span>Calificar Sesión & Dar Feedback</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. Registered Events / Ferias Summary (Dimensión Co-creación) */}
      <section className="bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#A3223A]" />
            <h3 className="font-bold text-stone-900 text-base">
              Mis Inscripciones a Ferias & Eventos Híbridos ({registeredEvents.length})
            </h3>
          </div>
          <span className="text-xs text-stone-500">
            Ferias de Talento Inverso y Flash Mentoring
          </span>
        </div>

        {registeredEvents.length === 0 ? (
          <p className="text-xs text-stone-500">
            No estás inscripto en ningún evento institucional todavía. Podés revisar la pestaña de Eventos.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {registeredEvents.map((ev) => (
              <div
                key={ev.id}
                className="bg-white p-4 rounded-xl border border-stone-200 flex items-start justify-between gap-3 text-xs shadow-2xs"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#A3223A]">
                    {ev.category}
                  </span>
                  <h4 className="font-bold text-stone-900 text-sm">
                    {ev.title}
                  </h4>
                  <div className="flex items-center gap-2 text-stone-600 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#A3223A]" />
                    <span>{ev.date} · {ev.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{ev.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => onUnregisterEvent(ev.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-50 rounded-md"
                  title="Darse de baja"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal: Reprogramar Sesión con 1 Clic (Iteración 3) */}
      {reschedulingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#A3223A] uppercase tracking-wider">
                  Iteración 3 · Reprogramación Ágil
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  Reprogramar Sesión
                </h3>
              </div>
              <button
                onClick={() => setReschedulingBooking(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Vas a reprogramar el encuentro con <strong className="text-stone-900">{reschedulingBooking.mentorName}</strong> ({reschedulingBooking.sessionFormat === 'expres' ? 'Consulta Exprés' : 'Sesión Estándar'}).
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                  Nueva Fecha propuesta:
                </label>
                <input
                  type="date"
                  value={newRescheduleDate}
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:border-[#A3223A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                  Nuevo Horario disponible:
                </label>
                <select
                  value={newRescheduleTime}
                  onChange={(e) => setNewRescheduleTime(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:border-[#A3223A] focus:outline-hidden font-mono"
                >
                  <option value="17:00 - 17:30">17:00 - 17:30 hs</option>
                  <option value="17:30 - 18:00">17:30 - 18:00 hs</option>
                  <option value="18:00 - 18:30">18:00 - 18:30 hs</option>
                  <option value="18:30 - 19:00">18:30 - 19:00 hs</option>
                  <option value="19:00 - 19:30">19:00 - 19:30 hs</option>
                  <option value="19:30 - 20:00">19:30 - 20:00 hs</option>
                </select>
              </div>

              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Se enviará notificación automática por correo institucional y Google Meet.</span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setReschedulingBooking(null)}
                className="px-3.5 py-2 text-stone-600 font-semibold hover:bg-stone-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                className="px-4 py-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white font-bold rounded-lg transition-colors shadow-xs"
              >
                Confirmar Reprogramación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal Trigger */}
      {reviewingBooking && (
        <SessionReviewModal
          booking={reviewingBooking}
          isOpen={Boolean(reviewingBooking)}
          onClose={() => setReviewingBooking(null)}
          onSubmitReview={onSubmitReview}
        />
      )}
    </div>
  );
};
