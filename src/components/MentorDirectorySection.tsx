import React, { useState, useMemo } from 'react';
import { Mentor, CareerId, UBP_CAREERS, ModalityType, ActiveRole } from '../types';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Star, 
  Briefcase, 
  GraduationCap, 
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle,
  PlusCircle
} from 'lucide-react';

interface MentorDirectorySectionProps {
  mentors: Mentor[];
  onBookMentor: (mentor: Mentor) => void;
  userRole: ActiveRole;
  initialSearch?: string;
  initialCareer?: CareerId;
  onOpenOfferSlotModal?: () => void;
}

export const MentorDirectorySection: React.FC<MentorDirectorySectionProps> = ({
  mentors,
  onBookMentor,
  userRole,
  initialSearch = '',
  initialCareer,
  onOpenOfferSlotModal,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCareer, setSelectedCareer] = useState<CareerId | 'all'>(initialCareer || 'all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');

  // Available unique industries from mentor list
  const industries = useMemo(() => {
    const list = Array.from(new Set(mentors.map((m) => m.industry)));
    return ['all', ...list];
  }, [mentors]);

  // Filter logic
  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      // Career filter
      if (selectedCareer !== 'all' && mentor.career !== selectedCareer) {
        return false;
      }

      // Industry filter
      if (selectedIndustry !== 'all' && mentor.industry !== selectedIndustry) {
        return false;
      }

      // Experience filter
      if (selectedExperience === 'junior' && mentor.experienceYears > 4) {
        return false;
      }
      if (selectedExperience === 'mid' && (mentor.experienceYears < 5 || mentor.experienceYears > 8)) {
        return false;
      }
      if (selectedExperience === 'senior' && mentor.experienceYears < 9) {
        return false;
      }

      // Modality filter
      if (selectedModality === 'virtual' && !mentor.modality.includes('Virtual') && mentor.modality !== 'Híbrida') {
        return false;
      }
      if (selectedModality === 'presencial' && !mentor.modality.includes('Presencial') && mentor.modality !== 'Híbrida') {
        return false;
      }

      // Search query filter (matches name, role, company, bio, topics)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = mentor.name.toLowerCase().includes(query);
        const matchesRole = mentor.role.toLowerCase().includes(query);
        const matchesCompany = mentor.company.toLowerCase().includes(query);
        const matchesBio = mentor.bio.toLowerCase().includes(query);
        const matchesTopics = mentor.topics.some((t) => t.toLowerCase().includes(query));
        const matchesCareerName = mentor.careerName.toLowerCase().includes(query);

        if (!matchesName && !matchesRole && !matchesCompany && !matchesBio && !matchesTopics && !matchesCareerName) {
          return false;
        }
      }

      return true;
    });
  }, [mentors, selectedCareer, selectedIndustry, selectedExperience, selectedModality, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCareer('all');
    setSelectedIndustry('all');
    setSelectedExperience('all');
    setSelectedModality('all');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCareer !== 'all' || 
    selectedIndustry !== 'all' || 
    selectedExperience !== 'all' || 
    selectedModality !== 'all';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3223A]">
            <GraduationCap className="w-4 h-4" />
            <span>Módulo de Matching Disciplinar · UBP Conecta</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Directorio de Egresados & Mentores
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
            Filtrá referentes por disciplina, trayectoria y formato de encuentro. Las sesiones están acotadas a 
            <strong className="text-stone-800"> bloques de 30 minutos</strong> con agenda confirmada.
          </p>
        </div>

        {userRole === 'egresado' && (
          <button
            onClick={onOpenOfferSlotModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Habilitar Mis Cupos Mensuales</span>
          </button>
        )}
      </div>

      {/* 2. Filtros Dinámicos (Sección 5.1 del documento) */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
        {/* Search Input Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, cargo, empresa o temas (ej.: CV, Tesis, Machinalis, Big Tech)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] focus:bg-white transition-all"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="px-3 py-2 text-xs font-semibold text-[#A3223A] hover:bg-stone-50 border border-[#A3223A]/30 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* Dropdowns & Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-stone-100 text-xs">
          {/* Disciplina / Carrera UBP */}
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
              Disciplina / Carrera
            </label>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value as CareerId | 'all')}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] font-medium"
            >
              <option value="all">Todas las Carreras UBP</option>
              {Object.values(UBP_CAREERS).map((career) => (
                <option key={career.id} value={career.id}>
                  {career.name}
                </option>
              ))}
            </select>
          </div>

          {/* Industria */}
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
              Industria / Sector
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] font-medium"
            >
              <option value="all">Todos los sectores</option>
              {industries.filter((i) => i !== 'all').map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Experiencia */}
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
              Años de Experiencia
            </label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] font-medium"
            >
              <option value="all">Cualquier experiencia</option>
              <option value="junior">1 a 4 años (Recién graduado)</option>
              <option value="mid">5 a 8 años (Consolidado)</option>
              <option value="senior">9+ años (Senior / Director)</option>
            </select>
          </div>

          {/* Modalidad */}
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
              Modalidad de Sesión
            </label>
            <select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] font-medium"
            >
              <option value="all">Cualquier formato</option>
              <option value="virtual">Virtual (Google Meet UBP)</option>
              <option value="presencial">Presencial (Campus Argüello)</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Badges for Disciplines */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 scrollbar-none">
          <button
            onClick={() => setSelectedCareer('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedCareer === 'all'
                ? 'bg-[#A3223A] text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Todas
          </button>
          {Object.values(UBP_CAREERS).map((career) => (
            <button
              key={career.id}
              onClick={() => setSelectedCareer(career.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors ${
                selectedCareer === career.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {career.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Results Counter & Active States */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <div>
          Mostrando <strong className="text-stone-900 font-bold">{filteredMentors.length}</strong> mentores disponibles
          {selectedCareer !== 'all' && (
            <span> para <strong className="text-stone-900">{UBP_CAREERS[selectedCareer].name}</strong></span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span className="text-[11px]">Cupos de Octubre 2026 habilitados</span>
        </div>
      </div>

      {/* 4. Mentors Grid */}
      {filteredMentors.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
          <Filter className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="font-bold text-stone-900 text-base">
            No se encontraron mentores con esos criterios
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Probá ajustando la búsqueda, seleccionando otra carrera o restableciendo los filtros para ver todos los perfiles disponibles.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#A3223A] text-white text-xs font-semibold rounded-lg hover:bg-[#8B1D31] transition-colors mt-2"
          >
            Ver todos los mentores
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => {
            const career = UBP_CAREERS[mentor.career];
            const freeSlots = mentor.availableSlots.filter((s) => s.available).length;

            return (
              <div
                key={mentor.id}
                className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-[#A3223A]/50 hover:shadow-md transition-all space-y-5"
              >
                <div className="space-y-4">
                  {/* Top: Avatar & Meta */}
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
                      <span className="text-[10px] text-stone-400 font-normal">({mentor.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Badges de Reciprocidad (Sección 4.1 del documento) */}
                  <div className="flex flex-wrap gap-1">
                    {mentor.badges.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-[#A3223A]/10 text-[#A3223A] px-2 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <Award className="w-2.5 h-2.5" />
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Role Title & Industry */}
                  <div className="text-xs">
                    <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                      <span>{mentor.role}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Sector: {mentor.industry} · {mentor.location}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {mentor.bio}
                  </p>

                  {/* Topics Tags */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Temas de Consulta
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {mentor.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Modality & Slots Left */}
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
                      <span className="font-bold text-[#A3223A]">{freeSlots}</span> cupo(s) disponible(s)
                    </div>
                  </div>
                </div>

                {/* Direct CTA Button (Flujo Crítico < 4 pasos) */}
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
                  <span>{freeSlots > 0 ? 'Solicitar Mentoría (30 min)' : 'Sin cupos disponibles este mes'}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
