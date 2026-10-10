import React, { useState } from 'react';
import { Mentor, EventItem, CareerId, UBP_CAREERS, ActiveRole } from '../types';
import { 
  Search, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Layers,
  HelpCircle,
  Briefcase
} from 'lucide-react';

interface DashboardSectionProps {
  mentors: Mentor[];
  events: EventItem[];
  userRole: ActiveRole;
  setUserRole: (role: ActiveRole) => void;
  onNavigateToDirectorio: (search?: string, career?: CareerId) => void;
  onNavigateToSesiones: () => void;
  onNavigateToEventos: () => void;
  onBookMentor: (mentor: Mentor) => void;
  onOpenAIAssistant: () => void;
  confirmedBookingsCount: number;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  mentors,
  events,
  userRole,
  setUserRole,
  onNavigateToDirectorio,
  onNavigateToSesiones,
  onNavigateToEventos,
  onBookMentor,
  onOpenAIAssistant,
  confirmedBookingsCount,
}) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedFacultyTab, setSelectedFacultyTab] = useState<string>('all');

  const featuredMentors = mentors.filter((m) => m.featured || m.rating >= 4.9);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      onNavigateToDirectorio(globalSearch.trim());
    } else {
      onNavigateToDirectorio();
    }
  };

  const faculties = [
    { id: 'all', label: 'Todas las Facultades' },
    { id: 'tecnologia', label: 'Ingeniería & Tecnología' },
    { id: 'gestion', label: 'Gestión & Negocios' },
    { id: 'comunicacion', label: 'Comunicación & Diseño' },
    { id: 'juridicas', label: 'Ciencias Jurídicas' },
  ];

  const mentorsByFaculty = featuredMentors.filter((mentor) => {
    if (selectedFacultyTab === 'all') return true;
    const cat = UBP_CAREERS[mentor.career].category;
    if (selectedFacultyTab === 'tecnologia') return cat === 'Tecnología';
    if (selectedFacultyTab === 'gestion') return cat === 'Negocios & Gestión';
    if (selectedFacultyTab === 'comunicacion') return cat === 'Comunicación & Creatividad';
    if (selectedFacultyTab === 'juridicas') return cat === 'Jurídicas';
    return true;
  });

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* 1. Hero & Role-Based Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#8B1D31] via-[#A3223A] to-[#681022] text-white p-6 sm:p-10 shadow-lg">
        {/* Subtle background graphic */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-6 hidden lg:block opacity-15 pointer-events-none">
          <div className="w-56 h-56 border-8 border-white/20 rounded-2xl transform rotate-12 flex items-center justify-center font-extrabold text-7xl">
            UBP
          </div>
        </div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-amber-200 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Red Adaptativa de Mentoría y Vinculación Profesional</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {userRole === 'estudiante' ? (
              <>
                Conectá con egresados <br className="hidden sm:block" />
                <span className="text-amber-300">en sesiones guiadas de 30 minutos.</span>
              </>
            ) : (
              <>
                Compartí tu experiencia profesional <br className="hidden sm:block" />
                <span className="text-amber-300">sin saturar tu agenda laboral.</span>
              </>
            )}
          </h1>

          <p className="text-stone-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal opacity-95">
            {userRole === 'estudiante' ? (
              <>
                Olvidate del contacto en frío en LinkedIn. En UBP Conecta encontrás a profesionales de tu misma carrera dispuestos a orientarte en tu primer empleo formal, revisión de portfolio/CV y preparación para entrevistas.
              </>
            ) : (
              <>
                Retribuí valor a la comunidad de la Universidad Blas Pascal bajo un esquema estructurado: definís tu cupo de 1 o 2 bloques de 30 min al mes y recibís únicamente solicitudes con temario previo concreto.
              </>
            )}
          </p>

          {/* Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative max-w-xl flex items-center bg-white rounded-xl p-1.5 shadow-xl border border-white/30 text-stone-900">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Buscar por carrera, empresa (Mercado Libre, Enel...), tema o mentor..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent border-0 focus:outline-hidden placeholder-stone-400"
              />
              <button
                type="submit"
                className="bg-[#A3223A] hover:bg-[#8B1D31] text-white px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
              >
                <span>Buscar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-stone-200">
              <span className="opacity-80">Búsquedas sugeridas:</span>
              <button
                type="button"
                onClick={() => onNavigateToDirectorio(undefined, 'informatica')}
                className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-colors text-white text-[11px]"
              >
                Ing. Informática
              </button>
              <button
                type="button"
                onClick={() => onNavigateToDirectorio(undefined, 'administracion')}
                className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-colors text-white text-[11px]"
              >
                Administración
              </button>
              <button
                type="button"
                onClick={() => onNavigateToDirectorio('Primer Empleo')}
                className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-colors text-white text-[11px]"
              >
                Primer Empleo
              </button>
              <button
                type="button"
                onClick={() => onNavigateToDirectorio('doingLABS')}
                className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-colors text-white text-[11px]"
              >
                doingLABS UBP
              </button>
            </div>
          </form>

          {/* Role Perspective Switcher Pill */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-lg text-xs border border-white/15 backdrop-blur-xs">
              <span className="text-stone-300">Simulación de Rol activo:</span>
              <div className="inline-flex bg-white/20 p-0.5 rounded-md">
                <button
                  type="button"
                  onClick={() => setUserRole('estudiante')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    userRole === 'estudiante'
                      ? 'bg-white text-[#A3223A] shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Estudiante (4° Año)
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole('egresado')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    userRole === 'egresado'
                      ? 'bg-amber-300 text-stone-900 shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Egresado Mentor (5+ Años)
                </button>
              </div>
            </div>

            {confirmedBookingsCount > 0 && (
              <button
                type="button"
                onClick={onNavigateToSesiones}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/40 rounded-lg text-xs font-semibold transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Tenés {confirmedBookingsCount} sesión(es) activa(s)</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Pilares de la Plataforma UBP Conecta */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-[#A3223A]/30 transition-colors">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Comunidad Alumni</span>
            <Users className="w-4 h-4 text-[#A3223A]" />
          </div>
          <div className="text-2xl font-black text-stone-900">+20.000</div>
          <p className="text-[11px] text-stone-500 mt-1">
            Graduados pascalinos en Argentina y el mundo dispuestos a colaborar.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-[#A3223A]/30 transition-colors">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Micro-Mentorías</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">30 min / sesión</div>
          <p className="text-[11px] text-stone-500 mt-1">
            Encuentros ágiles 1 a 1 orientados a dudas concretas y revisión de perfil.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-[#A3223A]/30 transition-colors">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Agenda con Foco</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">Temario Previo</div>
          <p className="text-[11px] text-stone-500 mt-1">
            Objetivos claros definidos por el estudiante para maximizar el encuentro.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-[#A3223A]/30 transition-colors">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Modalidad</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">100% Híbrida</div>
          <p className="text-[11px] text-stone-500 mt-1">
            Google Meet para alumnos a distancia o presencial en Campus Argüello.
          </p>
        </div>
      </section>

      {/* 3. Accesos Rápidos a «Próximos Eventos y Ferias Híbridas» (Sección 4.1 y 5.1) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#A3223A] uppercase tracking-wider">
              Encuentros de Co-Creación UBP
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              Próximos Eventos & Ferias Híbridas
            </h2>
          </div>
          <button
            onClick={onNavigateToEventos}
            className="text-xs font-semibold text-[#A3223A] hover:underline flex items-center gap-1"
          >
            <span>Ver agenda completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A3223A]/10 text-[#A3223A] uppercase">
                    {event.category}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-500">
                    {event.modality}
                  </span>
                </div>

                <h3 className="font-bold text-stone-900 text-sm leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#A3223A]" />
                    <span className="font-medium text-stone-700">{event.date} · {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  <strong className="text-stone-800">{event.spotsLeft}</strong> lugares libres
                </span>
                <button
                  onClick={onNavigateToEventos}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    event.registered
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-stone-900 hover:bg-[#A3223A] text-white'
                  }`}
                >
                  {event.registered ? 'Inscripto ✓' : 'Anotarme'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Carrusel de «Mentores Destacados de la Semana» por Facultad/Área (Sección 5.1) */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#A3223A] uppercase tracking-wider">
              Conexión Directa con Graduados
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              Mentores Destacados de la Semana
            </h2>
            <p className="text-xs text-stone-600 mt-1 max-w-xl">
              Profesionales de la comunidad UBP con cupos de micro-mentoría de 30 minutos abiertos este mes.
            </p>
          </div>

          <button
            onClick={() => onNavigateToDirectorio()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
          >
            <span>Explorar Directorio Completo ({mentors.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Faculty Tabs Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {faculties.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFacultyTab(f.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFacultyTab === f.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentorsByFaculty.map((mentor) => {
            const career = UBP_CAREERS[mentor.career];
            const freeSlots = mentor.availableSlots.filter((s) => s.available).length;

            return (
              <div
                key={mentor.id}
                className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-[#A3223A]/50 hover:shadow-md transition-all space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Bar of Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-white text-sm shrink-0 shadow-2xs"
                        style={{ backgroundColor: career?.colorHex || '#A3223A' }}
                      >
                        {mentor.avatarInitial}
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-900 text-sm leading-snug">
                          {mentor.name}
                        </h3>
                        <p className="text-xs text-stone-500 font-medium">
                          {mentor.company}
                        </p>
                        <span
                          className="text-[10px] font-bold tracking-tight inline-block mt-0.5 px-1.5 py-0.2 rounded"
                          style={{
                            backgroundColor: `${career?.colorHex}15`,
                            color: career?.colorHex,
                          }}
                        >
                          {career?.shortName} · Egresado {mentor.graduationYear}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{mentor.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Role Title & Bio */}
                  <div>
                    <h4 className="text-xs font-semibold text-stone-800 line-clamp-1">
                      {mentor.role}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-3 leading-relaxed">
                      {mentor.bio}
                    </p>
                  </div>

                  {/* Key Topics */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Temas de Orientación
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {mentor.topics.slice(0, 3).map((topic, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Modality & Slots Info */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1.5">
                      {mentor.modality.includes('Virtual') ? (
                        <Video className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-[#A3223A]" />
                      )}
                      <span className="text-[11px] font-medium">{mentor.modality}</span>
                    </div>

                    <div className="text-[11px]">
                      <span className="font-bold text-[#A3223A]">{freeSlots}</span> cupo(s) este mes
                    </div>
                  </div>
                </div>

                {/* Direct CTA Button */}
                <button
                  type="button"
                  onClick={() => onBookMentor(mentor)}
                  disabled={freeSlots === 0}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                    freeSlots > 0
                      ? 'bg-[#A3223A] hover:bg-[#8B1D31] text-white hover:scale-[1.01]'
                      : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Solicitar Mentoría (30 min)</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Asistencia & Copiloto Pascalina */}
      <section className="bg-stone-100 rounded-2xl border border-stone-300/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A3223A] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Asistencia Vocacional & Matching</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900">
            ¿Tenés dudas sobre cómo preparar tu sesión o qué mentor elegir?
          </h3>
          <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
            Pascalina IA te ayuda a estructurar tus preguntas en 3 puntos clave, identificar graduados con experiencia en tu sector y aprovechar al máximo cada minuto de tu encuentro.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateToDirectorio()}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
          >
            <span>Explorar Directorio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenAIAssistant}
            className="px-3.5 py-2.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Bot className="w-3.5 h-3.5 text-amber-300" />
            <span>Consultar a Pascalina IA</span>
          </button>
        </div>
      </section>
    </div>
  );
};
