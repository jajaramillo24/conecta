import React from 'react';
import { MentorshipBooking, EventItem } from '../types';
import { Calendar, Clock, Video, MapPin, Trash2, CheckCircle2 } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: MentorshipBooking[];
  registeredEvents: EventItem[];
  onCancelBooking: (bookingId: string) => void;
  onUnregisterEvent: (eventId: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  registeredEvents,
  onCancelBooking,
  onUnregisterEvent,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-xl w-full p-6 sm:p-8 shadow-xl max-h-[85vh] flex flex-col space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-[#A3223A] uppercase tracking-wider">
              Mi Agenda Universitaria
            </span>
            <h2 className="text-xl font-bold text-stone-900 mt-0.5">
              Tus Turnos & Eventos Confirmados
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 space-y-6 pr-1">
          {/* Mentorships Booked */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Mentorías Agendadas ({bookings.length})
            </h3>

            {bookings.length === 0 ? (
              <p className="text-xs text-stone-400 bg-stone-50 p-4 rounded-lg border border-stone-200">
                No tenés sesiones de mentoría reservadas todavía. Explorá la sección de <strong>Mentorías</strong> para elegir fecha con un egresado.
              </p>
            ) : (
              <div className="space-y-2.5">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[#A3223A] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirmada</span>
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm">
                        {b.mentorName}
                      </h4>
                      <p className="text-stone-500 text-[11px]">{b.mentorRole}</p>
                      <div className="flex items-center gap-2 text-stone-600 pt-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{b.date} · {b.time}</span>
                      </div>
                      <p className="text-stone-500 text-[11px] italic">
                        &ldquo;{b.note}&rdquo;
                      </p>
                    </div>

                    <button
                      onClick={() => onCancelBooking(b.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-md transition-colors"
                      title="Cancelar este turno"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Events Registered */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Eventos con Inscripción Activa ({registeredEvents.length})
            </h3>

            {registeredEvents.length === 0 ? (
              <p className="text-xs text-stone-400 bg-stone-50 p-4 rounded-lg border border-stone-200">
                No estás anotado a ningún evento aún. Revisá el Asado Pascalino o el Torneo de Fútbol en la sección de <strong>Eventos</strong>.
              </p>
            ) : (
              <div className="space-y-2.5">
                {registeredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold uppercase text-[#A3223A]">
                        {ev.category}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm">
                        {ev.title}
                      </h4>
                      <div className="flex items-center gap-2 text-stone-600 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#A3223A]" />
                        <span>{ev.date} · {ev.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onUnregisterEvent(ev.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-md transition-colors"
                      title="Darse de baja del evento"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#A3223A] text-white text-xs font-semibold rounded-lg hover:bg-[#8B1D31]"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
