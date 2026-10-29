import React, { useState } from 'react';
import { Mentor, MentorshipBooking, SessionFormat, UBP_CAREERS } from '../types';
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
  ArrowRight,
  Zap
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
  const [sessionFormat, setSessionFormat] = useState<SessionFormat>('estandar');
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
  const templatesStandard = [
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

  const templatesExpress = [
    {
      title: 'Consulta Rápida de Mercado',
      text: '1. ¿Qué stack o herramientas tecnológicas me conviene priorizar para puestos junior?\n2. Recomendación puntual sobre cómo preparar un live coding.',
    },
    {
      title: 'Feedback Exprés de Portfolio',
      text: '1. Mirada rápida a mis 2 proyectos principales para postulaciones.\n2. Si el enfoque del CV se adapta a lo que buscan en la industria.',
    },
    {
      title: 'Duda de Materias / Prácticas',
      text: '1. Duda puntual sobre materias electivas y prácticas supervisadas.\n2. Consejo rápido para primer contacto con empresas del Portal UBP.',
    },
  ];

  const activeTemplates = sessionFormat === 'expres' ? templatesExpress : templatesStandard;

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

    // Validation: must provide meaningful content (minimum 20 chars for express, 25 for standard)
    const minLength = sessionFormat === 'expres' ? 20 : 25;
    if (sessionObjective.trim().length < minLength) {
      setErrorMsg(`El temario previo es obligatorio (mínimo ${minLength} caracteres para orientar al mentor).`);
      return;
    }

    const slot = availableSlots[selectedSlotIndex];
    const isVirtual = modalityChoice === 'Virtual (Google Meet)';
    const duration = sessionFormat === 'expres' ? 15 : 30;

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
      durationMinutes: duration,
      sessionFormat,
      modality: modalityChoice,
      locationDetail: isVirtual 
        ? 'Sala Virtual Google Meet institucional UBP' 
        : 'Campus Argüello - Sala Coworking / doingLABS UBP',
      meetingUrl: isVirtual ? `https://meet.google.com/ubp-${mentor.id}-${duration}m` : undefined,
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
                Tu {bookingConfirmed.sessionFormat === 'expres' ? 'Consulta Exprés' : 'Micro-Mentoría'} está en Agenda
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
                <span className="font-semibold text-stone-500">Formato & Duración:</span>
                <span className="inline-flex items-center gap-1 font-bold text-stone-900">
                  {bookingConfirmed.sessionFormat === 'expres' ? (
                    <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full text-[11px] font-bold">
                      ⚡ Consulta Exprés (15-20 min)
                    </span>
                  ) : (
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px] font-bold">
                      ⏱ Sesión Estándar (30 min)
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-semibold text-stone-500">Fecha & Bloque:</span>
                <span className="font-bold text-[#A3223A] font-mono">
                  {bookingConfirmed.date} · {bookingConfirmed.time}
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
                <span>Ver en Mis Encuentros</span>
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
                  <span>Reserva Guiada · {mentor.mentorCategory === 'guia' ? 'Mentor Guía (1-4 años)' : 'Mentor Sénior (5+ años)'}</span>
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

            {/* Iteración 4: Selector de Formato (Consulta Exprés 15 min vs Sesión Estándar 30 min) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                1. Seleccioná el Tipo de Encuentro:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSessionFormat('expres')}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    sessionFormat === 'expres'
                      ? 'border-amber-500 bg-amber-50/80 ring-1 ring-amber-500 text-stone-900'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Consulta Exprés (15-20 min)</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    Para dudas muy puntuales, validación rápida de portfolio o preguntas de mercado (Ideal para 5° año o primer contacto).
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSessionFormat('estandar')}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    sessionFormat === 'estandar'
                      ? 'border-[#A3223A] bg-[#A3223A]/5 ring-1 ring-[#A3223A] text-stone-900'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-[#A3223A] mb-1">
                    <Clock className="w-4 h-4 text-[#A3223A]" />
                    <span>Sesión Estándar (30 min)</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    Para revisión profunda de CV, preparación para entrevistas técnicas de ingeniería o articulación de tesis.
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Selector de Fecha y Hora (Cupos del Mentor) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
                <span>2. Seleccioná Fecha y Horario:</span>
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
                          <span>{slot.time} {sessionFormat === 'expres' ? '(Bloque Exprés)' : '(30 min)'}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Selector de Modalidad */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                3. Formato del Encuentro:
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

            {/* 4. Datos del Estudiante */}
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

            {/* 5. Campo Obligatorio de Temario Previo */}
            <div className="space-y-2 pt-1 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  4. ¿Cuál es tu objetivo principal en esta sesión? *
                </label>
                <span className="text-[10px] text-stone-500 font-medium">
                  {lineCount}/3 líneas orientativas
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                El mentor conocerá este temario antes de aceptar el encuentro para garantizar una sesión estructurada.
              </p>

              {/* Plantillas dinámicas según el formato de sesión */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Plantillas sugeridas ({sessionFormat === 'expres' ? 'Consulta Exprés' : 'Sesión Estándar'}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTemplates.map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl.text)}
                      className="px-2.5 py-1 text-[11px] bg-stone-100 hover:bg-[#A3223A]/10 hover:text-[#A3223A] border border-stone-200 rounded-md text-stone-700 transition-colors"
                    >
                      + {tpl.title}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                required
                rows={4}
                value={sessionObjective}
                onChange={(e) => {
                  setSessionObjective(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder={sessionFormat === 'expres' 
                  ? 'Escribí tu consulta puntual en 1 o 2 puntos clave...' 
                  : '1. Revisión de portfolio/CV orientado a la industria\n2. Dudas sobre inserción laboral y salarios iniciales\n3. Consejos sobre el primer empleo en el sector'
                }
                className="w-full p-3 border border-stone-200 rounded-lg text-xs font-mono focus:border-[#A3223A] focus:outline-hidden leading-relaxed"
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={availableSlots.length === 0}
                className="px-5 py-2.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-bold rounded-lg shadow-xs transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
              >
                <span>Confirmar {sessionFormat === 'expres' ? 'Consulta Exprés (15 min)' : 'Sesión Estándar (30 min)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
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
                Tu {bookingConfirmed.sessionFormat === 'expres' ? 'Consulta Exprés' : 'Micro-Mentoría'} está en Agenda
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
                <span className="font-semibold text-stone-500">Formato & Duración:</span>
                <span className="inline-flex items-center gap-1 font-bold text-stone-900">
                  {bookingConfirmed.sessionFormat === 'expres' ? (
                    <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full text-[11px] font-bold">
                      ⚡ Consulta Exprés (15-20 min)
                    </span>
                  ) : (
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px] font-bold">
                      ⏱ Sesión Estándar (30 min)
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-semibold text-stone-500">Fecha & Bloque:</span>
                <span className="font-bold text-[#A3223A] font-mono">
                  {bookingConfirmed.date} · {bookingConfirmed.time}
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
                <span>Ver en Mis Encuentros</span>
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
                  <span>Reserva Guiada · {mentor.mentorCategory === 'guia' ? 'Mentor Guía (1-4 años)' : 'Mentor Sénior (5+ años)'}</span>
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

            {/* Iteración 4: Selector de Formato (Consulta Exprés 15 min vs Sesión Estándar 30 min) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                1. Seleccioná el Tipo de Encuentro:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSessionFormat('expres')}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    sessionFormat === 'expres'
                      ? 'border-amber-500 bg-amber-50/80 ring-1 ring-amber-500 text-stone-900'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Consulta Exprés (15-20 min)</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    Para dudas muy puntuales, validación rápida de portfolio o preguntas de mercado (Ideal para 5° año o primer contacto).
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSessionFormat('estandar')}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    sessionFormat === 'estandar'
                      ? 'border-[#A3223A] bg-[#A3223A]/5 ring-1 ring-[#A3223A] text-stone-900'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-[#A3223A] mb-1">
                    <Clock className="w-4 h-4 text-[#A3223A]" />
                    <span>Sesión Estándar (30 min)</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    Para revisión profunda de CV, preparación para entrevistas técnicas de ingeniería o articulación de tesis.
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Selector de Fecha y Hora (Cupos del Mentor) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
                <span>2. Seleccioná Fecha y Horario:</span>
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
                          <span>{slot.time} {sessionFormat === 'expres' ? '(Bloque Exprés)' : '(30 min)'}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Selector de Modalidad */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                3. Formato del Encuentro:
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

            {/* 4. Datos del Estudiante */}
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

            {/* 5. Campo Obligatorio de Temario Previo */}
            <div className="space-y-2 pt-1 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  4. ¿Cuál es tu objetivo principal en esta sesión? *
                </label>
                <span className="text-[10px] text-stone-500 font-medium">
                  {lineCount}/3 líneas orientativas
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                El mentor conocerá este temario antes de aceptar el encuentro para garantizar una sesión estructurada.
              </p>

              {/* Plantillas dinámicas según el formato de sesión */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Plantillas sugeridas ({sessionFormat === 'expres' ? 'Consulta Exprés' : 'Sesión Estándar'}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTemplates.map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl.text)}
                      className="px-2.5 py-1 text-[11px] bg-stone-100 hover:bg-[#A3223A]/10 hover:text-[#A3223A] border border-stone-200 rounded-md text-stone-700 transition-colors"
                    >
                      + {tpl.title}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                required
                rows={4}
                value={sessionObjective}
                onChange={(e) => {
                  setSessionObjective(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder={sessionFormat === 'expres' 
                  ? 'Escribí tu consulta puntual en 1 o 2 puntos clave...' 
                  : '1. Revisión de portfolio/CV orientado a la industria\n2. Dudas sobre inserción laboral y salarios iniciales\n3. Consejos sobre el primer empleo en el sector'
                }
                className="w-full p-3 border border-stone-200 rounded-lg text-xs font-mono focus:border-[#A3223A] focus:outline-hidden leading-relaxed"
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={availableSlots.length === 0}
                className="px-5 py-2.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-bold rounded-lg shadow-xs transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
              >
                <span>Confirmar {sessionFormat === 'expres' ? 'Consulta Exprés (15 min)' : 'Sesión Estándar (30 min)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
