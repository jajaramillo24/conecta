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
  Sparkles
} from 'lucide-react';
import { SessionReviewModal } from './SessionReviewModal';

interface SessionsManagementSectionProps {
  bookings: MentorshipBooking[];
  events: EventItem[];
  userRole: ActiveRole;
  onCancelBooking: (bookingId: string) => void;
  onUnregisterEvent: (eventId: string) => void;
  onUpdateBookingStatus: (bookingId: string, status: MentorshipBooking['status']) => void;
  onSubmitReview: (bookingId: string, review: SessionReview) => void;
  onNavigateToDirectorio: () => void;
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
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'confirmada' | 'pendiente' | 'completada'>('all');
  const [reviewingBooking, setReviewingBooking] = useState<MentorshipBooking | null>(null);

  const registeredEvents = events.filter((e) => e.registered);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

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
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3223A]">
            <Clock className="w-4 h-4" />
            <span>Panel de Trazabilidad & Gestión de Red · UBP Conecta</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Mis Conexiones & Sesiones Agendadas
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
            Hacé seguimiento del estado de tus solicitudes de mentoría de 30 minutos, accedé a las salas de videollamada y completá la 
            <strong className="text-stone-800"> valoración recíproca post-encuentro</strong>.
          </p>
        </div>

        <button
          onClick={onNavigateToDirectorio}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Solicitar Nueva Mentoría</span>
        </button>
      </div>

      {/* 2. Status Segmented Tabs */}
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

      {/* 3. Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
            <Clock className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="font-bold text-stone-900 text-base">
              No tenés sesiones en este estado
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Explorá el directorio de mentores de la UBP para seleccionar un horario disponible y agendar una sesión de 30 minutos con temario previo.
            </p>
            <button
              onClick={onNavigateToDirectorio}
              className="px-4 py-2 bg-[#A3223A] text-white text-xs font-bold rounded-lg hover:bg-[#8B1D31] transition-colors mt-2"
            >
              Ir al Directorio de Mentores
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => (
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
                    <h3 className="font-bold text-stone-900 text-base leading-snug">
                      Sesión de Micro-Mentoría con {b.mentorName}
                    </h3>
                    <p className="text-xs text-stone-500">
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
                {/* Date & Time */}
                <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200/60 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#A3223A]" />
                    <span>Fecha & Duración</span>
                  </div>
                  <div className="font-bold text-stone-900 text-sm font-mono">
                    {b.date} · {b.time}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Bloque fijo: 30 minutos (Protección de agenda)
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
                      <span>Evaluación Recíproca Registrada</span>
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

                  {/* Physical Campus map button */}
                  {b.modality.includes('Campus') && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#A3223A]" />
                      <span>Punto de encuentro: Campus UBP (Argüello)</span>
                    </span>
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
          ))
        )}
      </div>

      {/* 4. Registered Events / Ferias Summary (Dimensión Co-creación) */}
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
