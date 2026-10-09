import React, { useState } from 'react';
import { EventItem } from '../types';
import { Calendar, Clock, MapPin, Users, CheckCircle2, Video, Sparkles, Award, ArrowRight } from 'lucide-react';

interface EventsSectionProps {
  events: EventItem[];
  onToggleEventRegistration: (eventId: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onToggleEventRegistration,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredEvents = categoryFilter === 'all'
    ? events
    : events.filter((e) => e.category === categoryFilter);

  const categories = [
    { id: 'all', label: 'Todos los Encuentros' },
    { id: 'Feria de Talento Inverso', label: 'Ferias de Talento Inverso' },
    { id: 'Flash Mentoring', label: 'Mesas Redondas & Flash Mentoring' },
    { id: 'Jurado Alumni', label: 'Jurados Alumni en Cátedras' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3223A]">
            <Users className="w-4 h-4" />
            <span>Dimensión Híbrida / Presencial · Co-Creación</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Ferias de Talento & Flash Mentoring
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
            Instancias grupales que potencian el networking entre estudiantes y egresados: los graduados participan como jurados evaluadores y expositores en charlas relámpago en el campus o vía streaming.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 shadow-2xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-[#A3223A] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          return (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-[#A3223A]/40 hover:shadow-md transition-all space-y-5"
            >
              <div className="space-y-4">
                {/* Category & Modality */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A3223A]/10 text-[#A3223A] uppercase">
                    {event.category}
                  </span>
                  <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                    {event.modality.includes('Virtual') || event.modality.includes('Streaming') ? (
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-[#A3223A]" />
                    )}
                    <span>{event.modality}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-stone-900 text-base leading-snug">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-stone-600 leading-relaxed">
                  {event.description}
                </p>

                {/* Details */}
                <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#A3223A]" />
                    <span className="font-semibold text-stone-800">{event.date} · {event.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-stone-500 leading-tight">{event.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-stone-600">
                      <strong>Coordina:</strong> {event.speakerOrHost}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs text-stone-500">
                  <span className="font-bold text-stone-900 font-mono tabular-nums">{event.spotsLeft}</span> cupos libres
                </div>

                <button
                  type="button"
                  onClick={() => onToggleEventRegistration(event.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                    event.registered
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-[#A3223A] text-white hover:scale-[1.01]'
                  }`}
                >
                  {event.registered ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Inscripto ✓</span>
                    </>
                  ) : (
                    <span>Anotarme al Encuentro</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
