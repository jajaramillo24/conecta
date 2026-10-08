import React, { useState, useMemo } from 'react';
import { Alumni, CareerId, UBP_CAREERS } from '../types';
import { Globe, MapPin, Building, Calendar, ExternalLink, Sparkles, Search, Compass, Map as MapIcon, ListFilter } from 'lucide-react';

interface AlumniMapSectionProps {
  alumniList: Alumni[];
  onOpenMentorshipForAlumni: (alumniName: string) => void;
}

export const AlumniMapSection: React.FC<AlumniMapSectionProps> = ({
  alumniList,
  onOpenMentorshipForAlumni,
}) => {
  const [selectedAlumniId, setSelectedAlumniId] = useState<string>(alumniList[0].id);
  const [mapScope, setMapScope] = useState<'argentina' | 'mundo' | 'lista'>('argentina');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<CareerId | 'all'>('all');
  const [foundersOnly, setFoundersOnly] = useState(false);
  const [hoveredAlumniId, setHoveredAlumniId] = useState<string | null>(null);

  // Selected alumnus object
  const selectedAlumni = useMemo(
    () => alumniList.find((a) => a.id === selectedAlumniId) ?? alumniList[0],
    [alumniList, selectedAlumniId]
  );

  // Filtered alumni
  const filteredAlumni = useMemo(() => {
    return alumniList.filter((a) => {
      const matchSearch =
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.currentRole.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCareer = selectedCareer === 'all' || a.career === selectedCareer;
      const matchFounders = !foundersOnly || a.isFounder;

      // Filter by map scope if applicable
      const matchScope =
        mapScope === 'lista'
          ? true
          : mapScope === 'argentina'
          ? a.region === 'cordoba' || a.region === 'argentina'
          : a.region === 'internacional';

      return matchSearch && matchCareer && matchFounders && matchScope;
    });
  }, [alumniList, searchQuery, selectedCareer, foundersOnly, mapScope]);

  // Coordinates for Argentina map view (normalized in 500x600 SVG viewBox)
  const argentinaCoordinates: Record<string, { x: number; y: number; label: string }> = {
    'chacon-juan': { x: 265, y: 220, label: 'Córdoba (Argüello)' },
    'ciravegna-carlos': { x: 255, y: 232, label: 'Córdoba (Carlos Paz)' },
    'arguello-federico': { x: 270, y: 215, label: 'Córdoba Capital' },
    'scarpinello-eugenia': { x: 260, y: 225, label: 'Córdoba Tribunales' },
    'hilal-martin': { x: 275, y: 228, label: 'Córdoba' },
    'bulacios-nazarena': { x: 345, y: 275, label: 'Buenos Aires' },
    'mora-ignacio': { x: 350, y: 282, label: 'Buenos Aires' },
    'valenzuela-florencia': { x: 195, y: 440, label: 'Bariloche' },
  };

  // Coordinates for Global World map view (normalized in 800x480 SVG viewBox)
  const worldCoordinates: Record<string, { x: number; y: number; label: string }> = {
    'mundel-juan': { x: 220, y: 155, label: 'Chicago (EE.UU.)' },
    'stang-matias': { x: 420, y: 120, label: 'Londres (Reino Unido)' },
    'spinassi-gabriela': { x: 410, y: 175, label: 'Madrid & Ibiza (España)' },
    'martinez-lucas': { x: 450, y: 110, label: 'Berlín (Alemania)' },
    'chacon-juan': { x: 275, y: 380, label: 'Córdoba (Campus UBP)' },
    'bulacios-nazarena': { x: 285, y: 395, label: 'Buenos Aires' },
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#A3223A]">
            Red Profesional Global · Universidad Blas Pascal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Mapa de Graduados & Líderes de Empresas
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl">
            Desde el Campus de Argüello (Av. Donato Álvarez 3800) hasta centros tecnológicos en Europa y Estados Unidos: 
            explorá dónde están los egresados de la UBP fundando compañías y liderando industrias.
          </p>
        </div>

        {/* Global Key Figures */}
        <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200 shadow-2xs">
          <div>
            <span className="block text-[10px] text-stone-400 font-sans uppercase">Red Activa</span>
            <strong className="text-[#A3223A] font-bold text-sm">+20.000</strong>
          </div>
          <div className="h-6 w-px bg-stone-200" />
          <div>
            <span className="block text-[10px] text-stone-400 font-sans uppercase">Países</span>
            <strong className="text-stone-900 font-bold text-sm">38+</strong>
          </div>
          <div className="h-6 w-px bg-stone-200" />
          <div>
            <span className="block text-[10px] text-stone-400 font-sans uppercase">doingLABS</span>
            <strong className="text-stone-900 font-bold text-sm">50+ startups</strong>
          </div>
        </div>
      </div>

      {/* Control Bar: Scope Switcher & Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
        {/* Scope Tabs */}
        <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs font-medium self-start">
          <button
            onClick={() => setMapScope('argentina')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              mapScope === 'argentina'
                ? 'bg-white text-[#A3223A] shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Argentina & Córdoba</span>
          </button>
          <button
            onClick={() => setMapScope('mundo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              mapScope === 'mundo'
                ? 'bg-white text-[#A3223A] shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Destinos Internacionales</span>
          </button>
          <button
            onClick={() => setMapScope('lista')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              mapScope === 'lista'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Directorio Completo</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar graduado, empresa o ciudad..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] focus:bg-white"
            />
          </div>

          {/* Career dropdown */}
          <select
            value={selectedCareer}
            onChange={(e) => setSelectedCareer(e.target.value as CareerId | 'all')}
            className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 focus:outline-hidden"
          >
            <option value="all">Todas las Carreras</option>
            {Object.values(UBP_CAREERS).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Founders only */}
          <button
            onClick={() => setFoundersOnly(!foundersOnly)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1 ${
              foundersOnly
                ? 'bg-[#A3223A] text-white border-[#A3223A]'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Solo Fundadores</span>
          </button>
        </div>
      </div>

      {/* Main Map Presentation */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Visual Map (7 cols) */}
        <div className="lg:col-span-7 bg-stone-900 rounded-2xl border border-stone-800 p-6 text-white shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A3223A] inline-block" />
              <span className="text-xs font-mono uppercase tracking-wider text-stone-300 font-semibold">
                {mapScope === 'argentina'
                  ? 'Red Nacional & Campus UBP Argüello'
                  : mapScope === 'mundo'
                  ? 'Graduados UBP en el Exterior'
                  : 'Directorio de Egresados'}
              </span>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              {filteredAlumni.length} encontrados
            </span>
          </div>

          {/* Clean Map SVG Canvas */}
          {mapScope === 'argentina' && (
            <div className="relative w-full aspect-5/4 bg-stone-950 rounded-xl border border-stone-800 overflow-hidden p-2">
              <svg viewBox="0 0 500 600" className="w-full h-full select-none">
                {/* Argentina stylized geographic silhouette */}
                <path
                  d="M 210,60 L 320,50 L 390,90 L 410,140 L 350,170 L 380,240 L 350,290 L 300,320 L 280,410 L 240,490 L 220,560 L 190,540 L 210,460 L 170,390 L 160,300 L 180,220 L 190,140 Z"
                  fill="#182032"
                  stroke="#2b3853"
                  strokeWidth="2"
                />

                {/* Highlighted Province of Córdoba polygon */}
                <polygon
                  points="230,190 295,190 305,260 250,270 230,220"
                  fill="#232e48"
                  stroke="#A3223A"
                  strokeWidth="2.5"
                />

                {/* Campus UBP Landmark Beacon */}
                <g>
                  {/* Stable solid ring - NO animate-ping */}
                  <circle cx="265" cy="220" r="16" fill="rgba(163, 34, 58, 0.2)" />
                  <circle cx="265" cy="220" r="7" fill="#A3223A" stroke="#FFFFFF" strokeWidth="2" />
                  <text
                    x="285"
                    y="218"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="800"
                    fontFamily="sans-serif"
                  >
                    Campus UBP Argüello
                  </text>
                  <text
                    x="285"
                    y="230"
                    fill="#cbd5e1"
                    fontSize="8"
                    fontFamily="sans-serif"
                  >
                    Av. Donato Álvarez 3800
                  </text>
                </g>

                {/* Pins for alumni located in Argentina */}
                {filteredAlumni.map((a) => {
                  const coords = argentinaCoordinates[a.id];
                  if (!coords) return null;
                  const isSelected = selectedAlumni.id === a.id;
                  const career = UBP_CAREERS[a.career];

                  return (
                    <g
                      key={a.id}
                      className="cursor-pointer transition-all"
                      onClick={() => setSelectedAlumniId(a.id)}
                      onMouseEnter={() => setHoveredAlumniId(a.id)}
                      onMouseLeave={() => setHoveredAlumniId(null)}
                    >
                      {/* Selection indicator */}
                      {isSelected && (
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r="12"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      )}

                      {/* Main pin circle */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isSelected ? 7 : 5}
                        fill={career.colorHex}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />

                      {/* Label */}
                      <text
                        x={coords.x + 8}
                        y={coords.y + 4}
                        fill={isSelected ? '#FFFFFF' : '#94a3b8'}
                        fontSize={isSelected ? '9' : '8'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        fontFamily="sans-serif"
                      >
                        {a.name.split(' ')[0]} ({coords.label.split(' ')[0]})
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend overlay */}
              <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-md p-2 rounded-lg border border-stone-800 text-[10px]">
                <span className="text-stone-400 font-semibold block mb-1">
                  Sede Central:
                </span>
                <div className="flex items-center gap-1.5 text-stone-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A3223A] inline-block" />
                  <span>Campus Universitario UBP Argüello</span>
                </div>
              </div>
            </div>
          )}

          {mapScope === 'mundo' && (
            <div className="relative w-full aspect-16/10 bg-stone-950 rounded-xl border border-stone-800 overflow-hidden p-2">
              <svg viewBox="0 0 800 480" className="w-full h-full select-none">
                {/* Continents outlines */}
                {/* North America */}
                <path
                  d="M 120,60 L 260,50 L 310,120 L 280,210 L 210,230 L 160,180 Z"
                  fill="#182032"
                  stroke="#2b3853"
                  strokeWidth="1.5"
                />
                {/* South America */}
                <path
                  d="M 230,250 L 330,260 L 360,340 L 320,440 L 270,430 L 240,320 Z"
                  fill="#182032"
                  stroke="#2b3853"
                  strokeWidth="1.5"
                />
                {/* Europe */}
                <path
                  d="M 380,80 L 530,70 L 550,150 L 480,200 L 400,160 Z"
                  fill="#182032"
                  stroke="#2b3853"
                  strokeWidth="1.5"
                />

                {/* Connection lines from Campus UBP (Cordoba: 275, 380) */}
                <g stroke="rgba(163, 34, 58, 0.4)" strokeWidth="1" strokeDasharray="3 3">
                  {Object.entries(worldCoordinates).map(([id, coords]) => {
                    if (id === 'chacon-juan') return null;
                    return (
                      <line
                        key={`line-${id}`}
                        x1="275"
                        y1="380"
                        x2={coords.x}
                        y2={coords.y}
                      />
                    );
                  })}
                </g>

                {/* Campus epicenter in Cordoba */}
                <circle cx="275" cy="380" r="6" fill="#A3223A" stroke="#FFFFFF" strokeWidth="2" />
                <text x="285" y="384" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                  Campus UBP
                </text>

                {/* International pins */}
                {filteredAlumni.map((a) => {
                  const coords = worldCoordinates[a.id];
                  if (!coords) return null;
                  const isSelected = selectedAlumni.id === a.id;
                  const career = UBP_CAREERS[a.career];

                  return (
                    <g
                      key={a.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedAlumniId(a.id)}
                      onMouseEnter={() => setHoveredAlumniId(a.id)}
                      onMouseLeave={() => setHoveredAlumniId(null)}
                    >
                      {isSelected && (
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r="12"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      )}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isSelected ? 7 : 5}
                        fill={career.colorHex}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      <text
                        x={coords.x + 8}
                        y={coords.y + 4}
                        fill={isSelected ? '#FFFFFF' : '#cbd5e1'}
                        fontSize={isSelected ? '9' : '8'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {a.name} ({coords.label})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {mapScope === 'lista' && (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {filteredAlumni.map((a) => {
                const isSelected = selectedAlumni.id === a.id;
                const career = UBP_CAREERS[a.career];
                return (
                  <div
                    key={a.id}
                    onClick={() => setSelectedAlumniId(a.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-stone-800 border-[#A3223A] text-white'
                        : 'bg-stone-950 border-stone-800/80 hover:bg-stone-800/60 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: career.colorHex }}
                      />
                      <div>
                        <strong className="block text-white font-bold">{a.name}</strong>
                        <span className="text-stone-400 block text-[11px]">
                          {a.currentRole} · {a.company}
                        </span>
                      </div>
                    </div>
                    <span className="text-stone-400 text-[11px] font-mono">
                      {a.location}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Clickable Alumni Selector Strip */}
          <div className="mt-4 pt-3 border-t border-stone-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-stone-400 shrink-0 font-medium">
              Egresados Destacados:
            </span>
            {filteredAlumni.map((a) => {
              const isSelected = selectedAlumni.id === a.id;
              const career = UBP_CAREERS[a.career];
              return (
                <button
                  key={a.id}
                  onClick={() => setSelectedAlumniId(a.id)}
                  className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-white text-stone-900 font-bold shadow-xs'
                      : 'bg-stone-800/80 hover:bg-stone-700 text-stone-300'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: career.colorHex }}
                  />
                  <span>{a.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Alumni Bio & Mentorship Action (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="space-y-3">
            {/* Career badge and graduation */}
            <div className="flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: UBP_CAREERS[selectedAlumni.career].colorHex }}
                />
                <span className="font-semibold text-stone-800">
                  {selectedAlumni.careerName}
                </span>
              </div>
              <span className="font-mono tabular-nums text-stone-400">
                Graduado {selectedAlumni.graduationYear}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                {selectedAlumni.name}
              </h3>
              <p className="text-xs text-stone-600 font-medium mt-0.5">
                {selectedAlumni.title}
              </p>
            </div>

            {/* Current Position & Location */}
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 text-xs space-y-1.5 text-stone-700">
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="font-semibold">{selectedAlumni.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A3223A] shrink-0" />
                <span>{selectedAlumni.location} ({selectedAlumni.country})</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {selectedAlumni.bio}
            </p>

            {/* Highlight box */}
            <div className="p-3 border-l-2 border-[#A3223A] bg-stone-50/80 rounded-r-md">
              <span className="text-[10px] font-semibold text-[#A3223A] block uppercase tracking-wider mb-0.5">
                Trayectoria & Hito
              </span>
              <p className="font-lema italic text-xs text-stone-800">
                &ldquo;{selectedAlumni.highlight}&rdquo;
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 pt-1">
              {selectedAlumni.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-stone-100 space-y-2">
            {selectedAlumni.offersMentorship && (
              <button
                onClick={() => onOpenMentorshipForAlumni(selectedAlumni.name)}
                className="w-full py-2.5 px-4 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Solicitar Mentoría con {selectedAlumni.name.split(' ')[0]}</span>
              </button>
            )}

            <button
              onClick={() =>
                alert(
                  `Solicitud de contacto profesional enviada a ${selectedAlumni.name} a través del Centro de Graduados de la Universidad Blas Pascal.`
                )
              }
              className="w-full py-2 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Conectar en Red de Graduados UBP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
