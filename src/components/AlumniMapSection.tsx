import React, { useState } from 'react';
import { Alumni, CareerId, UBP_CAREERS } from '../types';
import { Globe, MapPin, Building, Award, Calendar, ExternalLink, Briefcase, Sparkles, Filter } from 'lucide-react';

interface AlumniMapSectionProps {
  alumniList: Alumni[];
  onOpenMentorshipForAlumni: (alumniName: string) => void;
}

export const AlumniMapSection: React.FC<AlumniMapSectionProps> = ({
  alumniList,
  onOpenMentorshipForAlumni,
}) => {
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni>(alumniList[0]);
  const [regionFilter, setRegionFilter] = useState<'all' | 'cordoba' | 'argentina' | 'internacional'>('all');
  const [careerFilter, setCareerFilter] = useState<CareerId | 'all'>('all');
  const [foundersOnly, setFoundersOnly] = useState(false);

  const filteredAlumni = alumniList.filter((a) => {
    const matchRegion = regionFilter === 'all' || a.region === regionFilter;
    const matchCareer = careerFilter === 'all' || a.career === careerFilter;
    const matchFounder = !foundersOnly || a.isFounder;
    return matchRegion && matchCareer && matchFounder;
  });

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#A3223A]">
            Red Mundial de Egresados UBP
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Graduados por el Mundo & Líderes de Empresas
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl">
            Más de 20.000 egresados forjados en el Campus de Argüello liderando startups en Silicon Valley, 
            estudios de arquitectura galardonados, bufetes en Europa y cátedras en Estados Unidos.
          </p>
        </div>

        {/* Global Statistics Badges */}
        <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200 shadow-xs">
          <div>
            <span className="block text-[10px] text-stone-400 font-sans uppercase">Red UBP</span>
            <strong className="text-[#A3223A] font-bold text-sm">+20.000</strong>
          </div>
          <div className="h-6 w-px bg-stone-200" />
          <div>
            <span className="block text-[10px] text-stone-400 font-sans uppercase">Países</span>
            <strong className="text-stone-900 font-bold text-sm">38+</strong>
          </div>
          <div className="h-6 w-px bg-stone-200" />
          <div>
            <span className="block text-[10px] text-stone-400 font-sans uppercase">Startups doingLABS</span>
            <strong className="text-stone-900 font-bold text-sm">50+</strong>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Region Tabs */}
          <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setRegionFilter('all')}
              className={`px-3 py-1 rounded-md transition-colors ${
                regionFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Todos los Destinos
            </button>
            <button
              onClick={() => setRegionFilter('cordoba')}
              className={`px-3 py-1 rounded-md transition-colors ${
                regionFilter === 'cordoba'
                  ? 'bg-white text-[#A3223A] shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Córdoba
            </button>
            <button
              onClick={() => setRegionFilter('argentina')}
              className={`px-3 py-1 rounded-md transition-colors ${
                regionFilter === 'argentina'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Resto del País
            </button>
            <button
              onClick={() => setRegionFilter('internacional')}
              className={`px-3 py-1 rounded-md transition-colors ${
                regionFilter === 'internacional'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Internacional
            </button>
          </div>

          {/* Founders Filter Toggle */}
          <button
            onClick={() => setFoundersOnly(!foundersOnly)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              foundersOnly
                ? 'bg-[#A3223A] text-white border-[#A3223A] shadow-xs'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solo Fundadores / CEOs</span>
          </button>
        </div>

        {/* Career Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-stone-400 text-[11px] font-medium hidden sm:inline">
            Carrera:
          </span>
          <select
            value={careerFilter}
            onChange={(e) => setCareerFilter(e.target.value as CareerId | 'all')}
            className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 focus:outline-hidden"
          >
            <option value="all">Todas las Carreras</option>
            {Object.values(UBP_CAREERS).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map View & Alumni Spotlight Drawer */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Stylized World / Argentina SVG Map (8 cols) */}
        <div className="lg:col-span-8 bg-stone-900 rounded-2xl border border-stone-800 p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
          {/* Subtle background world map projection grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Map Controls & Title */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#A3223A]" />
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                Cartografía de Egresados UBP
              </span>
            </div>
            <span className="text-xs text-stone-400 font-mono tabular-nums">
              {filteredAlumni.length} graduados localizados
            </span>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-16/10 bg-stone-950/70 rounded-xl border border-stone-800/80 overflow-hidden">
            <svg
              viewBox="0 0 600 520"
              className="w-full h-full select-none"
              style={{ background: '#0a0d14' }}
            >
              {/* Simplified World Continents Silhouettes in SVG */}
              {/* North America */}
              <path
                d="M 60,60 L 130,50 L 220,70 L 240,110 L 210,180 L 160,200 L 120,160 L 80,110 Z"
                fill="#1c2438"
                opacity="0.6"
              />
              {/* South America */}
              <path
                d="M 180,220 L 280,230 L 370,300 L 360,400 L 310,500 L 270,470 L 230,340 L 190,260 Z"
                fill="#1c2438"
                opacity="0.75"
              />
              {/* Europe */}
              <path
                d="M 390,70 L 510,60 L 530,120 L 470,170 L 410,140 L 390,90 Z"
                fill="#1c2438"
                opacity="0.65"
              />
              {/* Africa */}
              <path
                d="M 400,180 L 490,190 L 500,290 L 450,370 L 410,320 L 390,230 Z"
                fill="#1c2438"
                opacity="0.45"
              />

              {/* Central connection lines from Campus UBP (Cordoba: 310, 390) */}
              <g stroke="rgba(163, 34, 58, 0.4)" strokeWidth="1.2" strokeDasharray="3 3">
                {filteredAlumni.map((a) => {
                  if (a.id === 'chacon-juan') return null;
                  return (
                    <line
                      key={`line-${a.id}`}
                      x1="310"
                      y1="390"
                      x2={a.coordinates.x}
                      y2={a.coordinates.y}
                    />
                  );
                })}
              </g>

              {/* Main Epicenter: Campus Blas Pascal Argüello, Córdoba */}
              <circle cx="310" cy="390" r="14" fill="#A3223A" opacity="0.3" className="animate-ping" />
              <circle cx="310" cy="390" r="7" fill="#A3223A" stroke="#FFFFFF" strokeWidth="2" />
              <text x="322" y="385" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                Campus UBP (Argüello)
              </text>

              {/* Individual Alumni Markers */}
              {filteredAlumni.map((a) => {
                const career = UBP_CAREERS[a.career];
                const isSelected = selectedAlumni.id === a.id;

                return (
                  <g
                    key={a.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setSelectedAlumni(a)}
                  >
                    {/* Ring if selected */}
                    {isSelected && (
                      <circle
                        cx={a.coordinates.x}
                        cy={a.coordinates.y}
                        r="12"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )}
                    {/* Career colored pin */}
                    <circle
                      cx={a.coordinates.x}
                      cy={a.coordinates.y}
                      r={isSelected ? 7 : 5}
                      fill={career.colorHex}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    {/* Marker label */}
                    <text
                      x={a.coordinates.x + 8}
                      y={a.coordinates.y + 4}
                      fill={isSelected ? '#FFFFFF' : '#cbd5e1'}
                      fontSize={isSelected ? '9' : '8'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="sans-serif"
                    >
                      {a.name.split(' ')[0]} ({a.location.split(',')[0].split('/')[0].trim()})
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Career Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-sm p-2 rounded-lg border border-stone-800 text-[10px] space-y-1">
              <span className="text-stone-400 font-semibold block uppercase tracking-wider text-[9px]">
                Código de Carreras UBP:
              </span>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                {(['tecnologia', 'gestion', 'diseno', 'juridicas'] as CareerId[]).map((cId) => (
                  <div key={cId} className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: UBP_CAREERS[cId].colorHex }}
                    />
                    <span className="text-stone-300">{UBP_CAREERS[cId].name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Alumni Spotlight Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="space-y-3">
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
              <span className="font-mono tabular-nums">
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

            {/* Highlight quote */}
            <div className="p-3 border-l-2 border-[#A3223A] bg-stone-50/70 rounded-r-md">
              <span className="text-[11px] font-semibold text-[#A3223A] block uppercase tracking-wider mb-0.5">
                Logro Destacado
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

          <div className="pt-4 border-t border-stone-100 space-y-2">
            {selectedAlumni.offersMentorship && (
              <button
                onClick={() => onOpenMentorshipForAlumni(selectedAlumni.name)}
                className="w-full py-2.5 px-4 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Mentoría con {selectedAlumni.name.split(' ')[0]}</span>
              </button>
            )}

            <button
              onClick={() => alert(`Conexión profesional enviada a ${selectedAlumni.name} a través del Centro de Graduados UBP.`)}
              className="w-full py-2 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Conectar en Red UBP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
