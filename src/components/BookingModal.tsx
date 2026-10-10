import React, { useState } from 'react';
import { Mentor, MentorshipBooking, UBP_CAREERS } from '../types';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  User, 
  FileText,
  ArrowRight
} from 'lucide-react';

interface BookingModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (booking: Omit<MentorshipBooking, 'id' | 'createdAt'>) => void;
  onViewMyBookings: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onConfirmBooking,
  onViewMyBookings,
}) => {
  if (!isOpen || !mentor) return null;

  const career = UBP_CAREERS[mentor.career];
  const availableSlots = mentor.availableSlots.filter((s) => s.available);

  // Form State
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(availableSlots.length > 0 ? 0 : null);
  const [modalityChoice, setModalityChoice] = useState<'Virtual (Google Meet)' | 'Presencial (Campus UBP)'>(
    mentor.modality.includes('Presencial') && !mentor.modality.includes('Virtual')
      ? 'Presencial (Campus UBP)'
      : 'Virtual (Google Meet)'
  );
  const [studentName, setStudentName] = useState('Juan Andrés');
  const [studentEmail, setStudentEmail] = useState('j.andres@alumnos.ubp.edu.ar');
  const [studentCareer, setStudentCareer] = useState('Ingeniería en Informática (4° Año)');
  const [sessionObjective, setSessionObjective] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<MentorshipBooking | null>(null);

  // Pre-formatted templates for 3-line required goal
  const templates = [
    {
      title: 'Revisión de CV & Perfil',
      text: '1. Revisión de mi currículum y portfolio orientado al sector.\n2. Dudas sobre qué competencias técnicas priorizan en entrevistas.\n3. Recomendaciones para postular a pasantías formales.',
    },
    {
      title: 'Orientación Primer Empleo',
      text: '1. Desmitificar la transición de estudiante a mi primer trabajo formal.\n2. Consultas sobre salarios iniciales y dinámicas de equipo en la industria.\n3. Consejos para evitar frustraciones en procesos de selección.',
    },
    {
      title: 'Tesis & Emprendimiento',
      text: '1. Validación del enfoque de mi proyecto final de carrera.\n2. Viabilidad técnica y comercial para incubar en doingLABS UBP.\n3. Estrategias para presentar la propuesta ante jurados de cátedra.',
    },
  ];

  const handleApplyTemplate = (text: string) => {
    setSessionObjective(text);
    setErrorMsg(null);
  };

  const lineCount = sessionObjective.split('\n').filter((l) => l.trim().length > 0).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSlotIndex === null || !availableSlots[selectedSlotIndex]) {
      setErrorMsg('Por favor seleccioná un horario disponible.');
      return;
    }

    // Strict validation: must provide at least 25 characters and meaningful content (rule of 3 lines)
    if (sessionObjective.trim().length < 25) {
      setErrorMsg('El temario previo es obligatorio (mínimo 3 líneas o 25 caracteres para orientar al mentor).');
      return;
    }

    const slot = availableSlots[selectedSlotIndex];
    const isVirtual = modalityChoice === 'Virtual (Google Meet)';

    const newBooking: Omit<MentorshipBooking, 'id' | 'createdAt'> = {
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorRole: mentor.role,
      mentorCompany: mentor.company,
      mentorCareer: mentor.career,
      studentName,
      studentEmail,
      studentCareer,
      date: slot.day,
      time: slot.time,
      durationMinutes: 30,
      modality: modalityChoice,
      locationDetail: isVirtual 
        ? 'Sala Virtual Google Meet institucional UBP' 
        : 'Campus Argüello - Sala Coworking / doingLABS UBP',
      meetingUrl: isVirtual ? `https://meet.google.com/ubp-${mentor.id}-30m` : undefined,
      objective: sessionObjective.trim(),
      status: 'confirmada',
    };

    onConfirmBooking(newBooking);

    setBookingConfirmed({
      ...newBooking,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });
  };

  const handleResetAndClose = () => {
    setBookingConfirmed(null);
    setSessionObjective('');
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto space-y-6">
        {/* SUCCESS CONFIRMATION STATE */}
        {bookingConfirmed ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#A3223A] uppercase tracking-wider">
                ¡Turno Confirmado con Éxito!
              </span>
              <h2 className="text-2xl font-extrabold text-stone-900">
                Tu Micro-Mentoría está en Agenda
              </h2>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Hemos enviado la notificación a <strong className="text-stone-800">{mentor.name}</strong> con el temario previo especificado.
              </p>
            </div>

            {/* Session Summary Card */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-semibold text-stone-500">Mentor:</span>
                <span className="font-bold text-stone-900">{bookingConfirmed.mentorName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-semibold text-stone-500">Fecha & Bloque:</span>
                <span className="font-bold text-[#A3223A] font-mono">
                  {bookingConfirmed.date} · {bookingConfirmed.time} (30 min)
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-semibold text-stone-500">Modalidad:</span>
                <span className="font-bold text-stone-800">{bookingConfirmed.modality}</span>
              </div>
              <div className="space-y-1 pt-1">
                <span className="font-semibold text-stone-500 block">Objetivo Acordado (Temario):</span>
                <p className="text-stone-700 whitespace-pre-line bg-white p-2.5 rounded border border-stone-200 font-mono text-[11px]">
                  {bookingConfirmed.objective}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  handleResetAndClose();
                  onViewMyBookings();
                }}
                className="px-5 py-2.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Ver en Mis Conexiones</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM STATE */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A3223A]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Reserva de Sesión · 30 min</span>
                </div>
                <h2 className="text-xl font-extrabold text-stone-900 mt-0.5">
                  Solicitar Sesión con {mentor.name}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {mentor.role} · {mentor.company}
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-stone-400 hover:text-stone-700 text-xl font-bold p-1 leading-none"
              >
                ✕
              </button>
            </div>

            {/* Duración y Foco */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 flex items-start gap-2.5 text-xs text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong>Encuentro de 30 minutos:</strong> Las sesiones tienen una duración fijada de media hora con temario previo, garantizando un intercambio puntual, estructurado y de alto impacto profesional.
              </div>
            </div>

            {/* 1. Selector de Fecha y Hora (Cupos del Mentor) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
                <span>1. Seleccioná Fecha y Bloque de 30 min:</span>
                <span className="text-[#A3223A] font-semibold lowercase">
                  {availableSlots.length} cupo(s) disponible(s)
                </span>
              </label>

              {availableSlots.length === 0 ? (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-500 text-center">
                  El mentor no tiene cupos libres este mes. Podés consultar a otros graduados en el Directorio.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableSlots.map((slot, idx) => {
                    const isSelected = selectedSlotIndex === idx;
                    return (
                      <button
                        key={slot.id || idx}
                        type="button"
                        onClick={() => setSelectedSlotIndex(idx)}
                        className={`p-3 rounded-lg text-xs border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#A3223A] bg-[#A3223A]/5 ring-1 ring-[#A3223A] font-bold text-[#A3223A]'
                            : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>{slot.day}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[11px] mt-1 font-semibold text-stone-900">
                          <Clock className="w-3.5 h-3.5 text-[#A3223A]" />
                          <span>{slot.time}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Selector de Formato (Página 17 del Documento) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                2. Formato del Encuentro:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setModalityChoice('Virtual (Google Meet)')}
                  className={`p-3 rounded-lg border text-left transition-all flex items-start gap-2.5 ${
                    modalityChoice === 'Virtual (Google Meet)'
                      ? 'border-[#A3223A] bg-[#A3223A]/5 ring-1 ring-[#A3223A] text-stone-900 font-bold'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                  }`}
                >
                  <Video className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div>Videollamada</div>
                    <div className="text-[10px] font-normal text-stone-500">Google Meet oficial UBP</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setModalityChoice('Presencial (Campus UBP)')}
                  className={`p-3 rounded-lg border text-left transition-all flex items-start gap-2.5 ${
                    modalityChoice === 'Presencial (Campus UBP)'
                      ? 'border-[#A3223A] bg-[#A3223A]/5 ring-1 ring-[#A3223A] text-stone-900 font-bold'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-[#A3223A] shrink-0 mt-0.5" />
                  <div>
                    <div>Campus UBP</div>
                    <div className="text-[10px] font-normal text-stone-500">Biblioteca / Coworking Argüello</div>
                  </div>
                </button>
              </div>
            </div>

            {/* 3. Datos del Estudiante */}
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-stone-100 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Tu Nombre y Apellido
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Tu Carrera UBP
                </label>
                <input
                  type="text"
                  required
                  value={studentCareer}
                  onChange={(e) => setStudentCareer(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                />
              </div>
            </div>

            {/* 4. Campo Obligatorio de Temario Previo */}
            <div className="space-y-2 pt-1 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  3. ¿Cuál es tu objetivo principal en esta sesión? *
                </label>
                <span className="text-[10px] text-stone-500 font-medium">
                  {lineCount}/3 líneas orientativas
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Detallá en al menos 3 puntos concretos qué temas te gustaría abordar (ej: revisión de portfolio/CV, dudas del mercado laboral o preparación para entrevistas).
              </p>

              {/* Quick Template Fillers */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold text-stone-400">Plantillas sugeridas:</span>
                {templates.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl.text)}
                    className="text-[10px] px-2 py-0.5 bg-stone-100 hover:bg-[#A3223A]/10 hover:text-[#A3223A] text-stone-600 rounded transition-colors font-medium"
                  >
                    + {tpl.title}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                required
                value={sessionObjective}
                onChange={(e) => {
                  setSessionObjective(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="1. Revisión de mi portfolio o CV para pasantías.&#10;2. Dudas sobre qué tecnologías o habilidades buscan los reclutadores en Córdoba.&#10;3. Consejos para encarar mi primera entrevista técnica."
                className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:border-[#A3223A] focus:outline-hidden font-mono leading-relaxed"
              />

              {errorMsg && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 p-2 rounded-md">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={availableSlots.length === 0}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${
                  availableSlots.length > 0
                    ? 'bg-[#A3223A] hover:bg-[#8B1D31] text-white hover:scale-[1.01]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Confirmar Reserva (30 min)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
