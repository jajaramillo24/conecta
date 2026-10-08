import React, { useState } from 'react';
import { Mentor, CareerId, UBP_CAREERS, MentorshipBooking } from '../types';
import { Calendar, Clock, Video, MapPin, Star, CheckCircle, Search, User, PlusCircle, Sparkles } from 'lucide-react';

interface MentorshipSectionProps {
  mentors: Mentor[];
  onBookSession: (booking: Omit<MentorshipBooking, 'id' | 'createdAt'>) => void;
  onAddMentorSlot: (mentorId: string, day: string, time: string) => void;
  userRole: 'alumno' | 'egresado';
}

export const MentorshipSection: React.FC<MentorshipSectionProps> = ({
  mentors,
  onBookSession,
  onAddMentorSlot,
  userRole,
}) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookingMentor, setActiveBookingMentor] = useState<Mentor | null>(null);
  
  // Booking form state
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [studentName, setStudentName] = useState('Juan Andrés');
  const [studentEmail, setStudentEmail] = useState('j.andres@alumnos.ubp.edu.ar');
  const [studentCareer, setStudentCareer] = useState('Ingeniería en Informática');
  const [sessionNote, setSessionNote] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<MentorshipBooking | null>(null);

  // New slot offering state (for alumni)
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [newSlotDay, setNewSlotDay] = useState('2026-10-23');
  const [newSlotTime, setNewSlotTime] = useState('18:30 - 19:15');

  const filteredMentors = mentors.filter((mentor) => {
    const matchesCareer = selectedCareer === 'all' || mentor.career === selectedCareer;
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCareer && matchesSearch;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBookingMentor || selectedSlotIndex === null) return;
    const slot = activeBookingMentor.availableSlots[selectedSlotIndex];
    if (!slot) return;

    const newBooking: Omit<MentorshipBooking, 'id' | 'createdAt'> = {
      mentorId: activeBookingMentor.id,
      mentorName: activeBookingMentor.name,
      mentorRole: activeBookingMentor.role,
      studentName,
      studentEmail,
      studentCareer,
      date: slot.day,
      time: slot.time,
      modality: activeBookingMentor.modality,
      note: sessionNote || 'Consulta sobre orientación profesional y transición al mercado laboral.',
      status: 'confirmada',
    };

    onBookSession(newBooking);
    setBookingSuccess({
      ...newBooking,
      id: `book-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });
  };

  const closeBookingModal = () => {
    setActiveBookingMentor(null);
    setSelectedSlotIndex(null);
    setSessionNote('');
    setBookingSuccess(null);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#A3223A]">
            Mentorías 1 a 1 · Book With Me
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Aprendé Directo de Graduados UBP
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl">
            Exalumnos que abren su agenda para revisar tu portfolio, orientarte en entrevistas laborales, 
            explicar cómo homologar títulos en el exterior o cómo validar un proyecto en <span className="font-semibold text-stone-800">doingLABS</span>.
          </p>
        </div>

        {/* Action button if role is alumni */}
        {userRole === 'egresado' && (
          <button
            onClick={() => setShowOfferModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Ofrecer Horarios de Mentoría</span>
          </button>
        )}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, tema o startup..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] focus:ring-1 focus:ring-[#A3223A]"
          />
        </div>

        {/* Segmented Filter */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-white rounded-lg border border-stone-200 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedCareer('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedCareer === 'all'
                ? 'bg-[#A3223A] text-white'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            Todas
          </button>
          {(['tecnologia', 'diseno', 'juridicas', 'gestion'] as CareerId[]).map((cId) => (
            <button
              key={cId}
              onClick={() => setSelectedCareer(cId)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCareer === cId
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {UBP_CAREERS[cId].name}
            </button>
          ))}
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => {
          const career = UBP_CAREERS[mentor.career];
          const availableSlotsCount = mentor.availableSlots.filter((s) => s.available).length;

          return (
            <div
              key={mentor.id}
              className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-stone-300 transition-all space-y-4"
            >
              <div className="space-y-4">
                {/* Mentor Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: career.colorHex }}
                    >
                      {mentor.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 leading-tight">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-stone-500 leading-tight mt-0.5">
                        {mentor.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-mono tabular-nums">{mentor.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Modality & Bio */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    {mentor.modality.includes('Virtual') ? (
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-[#A3223A]" />
                    )}
                    <span>{mentor.modality}</span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {mentor.bio}
                  </p>
                </div>

                {/* Topics of Mentorship */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                    Temas Clave
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {mentor.topics.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Action */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs text-stone-500">
                  <span className="font-semibold text-stone-800 font-mono tabular-nums">
                    {availableSlotsCount}
                  </span>{' '}
                  turnos libres
                </div>

                <button
                  onClick={() => {
                    setActiveBookingMentor(mentor);
                    setSelectedSlotIndex(null);
                    setBookingSuccess(null);
                  }}
                  disabled={availableSlotsCount === 0}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    availableSlotsCount > 0
                      ? 'bg-[#A3223A] hover:bg-[#8B1D31] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reservar (Book With Me)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Booking Modal */}
      {activeBookingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 max-w-lg w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-6">
            {!bookingSuccess ? (
              <form onSubmit={handleConfirmBooking} className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#A3223A] uppercase tracking-wider">
                      Reserva de Mentoría UBP
                    </span>
                    <h2 className="text-xl font-bold text-stone-900 mt-1">
                      Agendar con {activeBookingMentor.name}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {activeBookingMentor.role} · {activeBookingMentor.company}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="text-stone-400 hover:text-stone-700 text-lg font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* Select Slot */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-700 block">
                    Seleccioná fecha y horario disponible:
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {activeBookingMentor.availableSlots.map((slot, idx) => {
                      const isSelected = selectedSlotIndex === idx;
                      if (!slot.available) {
                        return (
                          <div
                            key={idx}
                            className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-400 flex items-center justify-between opacity-60"
                          >
                            <span>{slot.day} · {slot.time}</span>
                            <span className="text-[10px] uppercase font-bold">Ocupado</span>
                          </div>
                        );
                      }
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedSlotIndex(idx)}
                          className={`p-3 text-left rounded-lg text-xs border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#A3223A] bg-[#A3223A]/5 ring-1 ring-[#A3223A] font-semibold text-[#A3223A]'
                              : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-stone-500" />
                            <span>{slot.day}</span>
                            <span aria-hidden="true">·</span>
                            <span>{slot.time}</span>
                          </div>
                          <span className="text-[11px] font-medium text-stone-500">
                            {activeBookingMentor.modality}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Student Info */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-stone-600 block mb-1">
                        Tu Nombre
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-stone-600 block mb-1">
                        Tu Carrera UBP
                      </label>
                      <input
                        type="text"
                        required
                        value={studentCareer}
                        onChange={(e) => setStudentCareer(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Email Institucional
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      ¿Cuál es tu objetivo principal para esta sesión?
                    </label>
                    <textarea
                      rows={3}
                      value={sessionNote}
                      onChange={(e) => setSessionNote(e.target.value)}
                      placeholder="Ej: Quiero que revisemos mi portfolio para postular a pasantías en Córdoba o exterior..."
                      className="w-full px-3 py-1.5 text-xs border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={selectedSlotIndex === null}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg text-white transition-colors ${
                      selectedSlotIndex !== null
                        ? 'bg-[#A3223A] hover:bg-[#8B1D31] shadow-xs'
                        : 'bg-stone-300 cursor-not-allowed'
                    }`}
                  >
                    Confirmar Reserva (Book Now)
                  </button>
                </div>
              </form>
            ) : (
              /* Booking Success Card */
              <div className="space-y-5 text-center py-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-stone-900">
                    ¡Mentoría Confirmada!
                  </h3>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Se envió la invitación de calendario y enlace de reunión a{' '}
                    <strong>{bookingSuccess.studentEmail}</strong>.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Mentor:</span>
                    <span className="font-semibold text-stone-900">{bookingSuccess.mentorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Fecha y Hora:</span>
                    <span className="font-semibold text-stone-900 font-mono">
                      {bookingSuccess.date} · {bookingSuccess.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Modalidad:</span>
                    <span className="font-semibold text-stone-900">{bookingSuccess.modality}</span>
                  </div>
                </div>

                <button
                  onClick={closeBookingModal}
                  className="w-full py-2.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Entendido, Ver Mis Turnos
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Offer New Slot Modal (for Alumni) */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Ofrecer Nuevo Horario de Mentoría
                </h3>
                <p className="text-xs text-stone-500">
                  Suma tu disponibilidad para que estudiantes pascalinos puedan agendarte.
                </p>
              </div>
              <button
                onClick={() => setShowOfferModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-stone-700 block mb-1">
                  Fecha (AAAA-MM-DD)
                </label>
                <input
                  type="date"
                  value={newSlotDay}
                  onChange={(e) => setNewSlotDay(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">
                  Franja Horaria (ej: 18:00 - 18:45)
                </label>
                <input
                  type="text"
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
              <button
                onClick={() => setShowOfferModal(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (mentors.length > 0) {
                    onAddMentorSlot(mentors[0].id, newSlotDay, newSlotTime);
                  }
                  setShowOfferModal(false);
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A3223A] hover:bg-[#8B1D31] rounded-md shadow-xs"
              >
                Publicar Disponibilidad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
