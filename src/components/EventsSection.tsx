import React, { useState } from 'react';
import { EventItem } from '../types';
import { Calendar, Clock, MapPin, Users, CheckCircle2, Ticket, ArrowUpRight } from 'lucide-react';

interface EventsSectionProps {
  events: EventItem[];
  onToggleEventRegistration: (eventId: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onToggleEventRegistration,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

  const categories = ['todos', 'Networking', 'Deportivo', 'Emprendimiento', 'Social'];

  const filteredEvents = selectedCategory === 'todos'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#A3223A]">
            Agenda Universitaria
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Eventos que Conectan Alumnos & Egresados
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl">
            Encuentros deportivos, asados en el campus de Argüello, pitch nights en doingLABS y rondas de speed-mentoring con graduados destacados.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 shadow-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-[#A3223A] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {cat === 'todos' ? 'Todos los Eventos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const isRegistered = event.registered;
          const isFull = event.spotsLeft === 0 && !isRegistered;

          return (
            <div
              key={event.id}
              className={`bg-white rounded-xl border transition-all flex flex-col justify-between p-6 ${
                isRegistered
                  ? 'border-[#A3223A] ring-1 ring-[#A3223A]/30 shadow-xs'
                  : 'border-stone-200 hover:border-stone-300 shadow-xs'
              }`}
            >
              <div className="space-y-4">
                {/* Zero-pill metadata */}
                <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#A3223A]">{event.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      {event.time}
                    </span>
                  </div>
                  {isRegistered && (
                    <span className="text-[#A3223A] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Anotado
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-stone-900 tracking-tight leading-snug">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-700 font-medium mt-1">
                    <Calendar className="w-3.5 h-3.5 text-[#A3223A]" />
                    <span>{event.date}</span>
                  </div>
                </div>

                <div className="text-xs text-stone-600 space-y-2">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{event.location}</span>
                  </div>
                  <p className="line-clamp-2 text-stone-500 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-stone-100 mt-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-stone-500">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      Cupos:{' '}
                      <strong className="text-stone-800 font-mono tabular-nums">
                        {event.totalSpots - event.spotsLeft}
                      </strong>
                      /{event.totalSpots}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono tabular-nums">
                    {event.spotsLeft} libres
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleEventRegistration(event.id)}
                    disabled={isFull}
                    className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      isRegistered
                        ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        : isFull
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-[#A3223A] hover:bg-[#8B1D31] text-white shadow-xs'
                    }`}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>
                      {isRegistered
                        ? 'Cancelar Reserva'
                        : isFull
                        ? 'Sin Cupos'
                        : 'Anotarme'}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveModalEvent(event)}
                    className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
                    title="Ver detalles completos del evento"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 max-w-lg w-full p-6 sm:p-8 shadow-xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#A3223A] uppercase tracking-wider">
                  {activeModalEvent.category} · UBP Conecta
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-1">
                  {activeModalEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalEvent(null)}
                className="text-stone-400 hover:text-stone-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 p-4 bg-stone-50 rounded-lg text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#A3223A]" />
                <span className="font-semibold">{activeModalEvent.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeModalEvent.time}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A3223A] shrink-0 mt-0.5" />
                <span>{activeModalEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-stone-400" />
                <span>Organiza: <strong>{activeModalEvent.speakerOrHost}</strong></span>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              {activeModalEvent.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <span className="text-xs text-stone-500 font-mono tabular-nums">
                {activeModalEvent.spotsLeft} lugares disponibles
              </span>

              <button
                onClick={() => {
                  onToggleEventRegistration(activeModalEvent.id);
                  setActiveModalEvent(null);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeModalEvent.registered
                    ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                    : 'bg-[#A3223A] text-white hover:bg-[#8B1D31]'
                }`}
              >
                {activeModalEvent.registered ? 'Cancelar Inscripción' : 'Confirmar Mi Asistencia'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
