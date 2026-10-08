import React, { useState } from 'react';
import { SportsMatch, SportsTeam, SportConvenio } from '../types';
import { Trophy, Calendar, MapPin, Users, Award, Shield, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface SportsSectionProps {
  teams: SportsTeam[];
  matches: SportsMatch[];
  convenios: SportConvenio[];
  onRegisterFreePlayer: (playerName: string, career: string, role: string) => void;
}

export const SportsSection: React.FC<SportsSectionProps> = ({
  teams,
  matches,
  convenios,
  onRegisterFreePlayer,
}) => {
  const [activeTab, setActiveTab] = useState<'torneo' | 'convenios'>('torneo');
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerCareer, setPlayerCareer] = useState('Abogacía');
  const [playerRole, setPlayerRole] = useState<'Alumno' | 'Egresado'>('Alumno');
  const [playerSuccess, setPlayerSuccess] = useState(false);

  // Active convenio modal for details
  const [selectedConvenio, setSelectedConvenio] = useState<SportConvenio | null>(null);

  const handleRegisterPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName) return;
    onRegisterFreePlayer(playerName, playerCareer, playerRole);
    setPlayerSuccess(true);
    setTimeout(() => {
      setPlayerSuccess(false);
      setShowPlayerModal(false);
      setPlayerName('');
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#A3223A]">
            Deportes & Vida Universitaria UBP
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Torneo Alumnos vs. Egresados & Convenios Deportivos
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl">
            La histórica rivalidad fraterna en las canchas del Campus Argüello: fútbol 7 y 11, convenios de pádel gratuito, 
            alianzas con el Club Atlético Belgrano y Talleres, y ajedrez interuniversitario.
          </p>
        </div>

        {/* Segmented Sub-navigation */}
        <div className="flex items-center p-1 bg-white rounded-lg border border-stone-200 shadow-xs">
          <button
            onClick={() => setActiveTab('torneo')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'torneo'
                ? 'bg-[#A3223A] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Copa Blas Pascal (Fútbol)</span>
          </button>
          <button
            onClick={() => setActiveTab('convenios')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'convenios'
                ? 'bg-[#A3223A] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Convenios Deportivos UBP</span>
          </button>
        </div>
      </div>

      {activeTab === 'torneo' ? (
        <div className="space-y-8">
          {/* Tournament Hero Banner */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <span className="text-[#A3223A] font-semibold">Edición 2026</span>
                <span aria-hidden="true">·</span>
                <span>Campus Deportivo Donato Álvarez</span>
                <span aria-hidden="true">·</span>
                <span>Fútbol 7 & 11 Masculino y Femenino</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                El Clásico del Campus: Alumnos vs. Egresados
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                ¿Sos estudiante y querés desafiar a los egresados? ¿O sos graduado y querés defender el honor de tu camada?
                Inscribí tu equipo o postulate como <strong>Jugador Libre</strong> para que los capitanes te fichen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => setShowPlayerModal(true)}
                className="px-4 py-2.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Anotarme como Jugador Libre</span>
              </button>
            </div>
          </div>

          {/* Matches & Standings Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Matches & Fixture Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Fixture & Resultados
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  Fecha 5 (Próxima)
                </span>
              </div>

              <div className="space-y-3">
                {matches.map((m) => {
                  const isUpcoming = m.status === 'Próximo';
                  return (
                    <div
                      key={m.id}
                      className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                        <span className="font-semibold text-[#A3223A]">{m.round}</span>
                        <div className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{m.date} · {m.time}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 items-center gap-2 py-1">
                        <div className="col-span-3 text-right">
                          <span className="text-xs font-bold text-stone-900 block truncate">
                            {m.teamA}
                          </span>
                          <span className="text-[10px] text-stone-400 block">
                            {m.isTeamAAlumni ? 'Graduados' : 'Alumnos'}
                          </span>
                        </div>

                        <div className="col-span-1 text-center font-mono font-bold text-sm text-stone-800 bg-stone-100 py-1 rounded-md">
                          {isUpcoming ? (
                            <span className="text-stone-400 text-xs">VS</span>
                          ) : (
                            <span>{m.scoreA} - {m.scoreB}</span>
                          )}
                        </div>

                        <div className="col-span-3 text-left">
                          <span className="text-xs font-bold text-stone-900 block truncate">
                            {m.teamB}
                          </span>
                          <span className="text-[10px] text-stone-400 block">
                            {m.isTeamBAlumni ? 'Graduados' : 'Alumnos'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                        <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                        <span className="truncate">{m.field}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Standings Table Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Tabla de Posiciones · Copa Blas Pascal
                </h3>
                <span className="text-xs text-stone-500 font-mono tabular-nums">
                  Fase Clasificatoria
                </span>
              </div>

              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-600 font-medium border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Equipo</th>
                      <th className="py-2.5 px-3">Estamento</th>
                      <th className="py-2.5 px-2 text-center">PJ</th>
                      <th className="py-2.5 px-2 text-center">PG</th>
                      <th className="py-2.5 px-2 text-center">DIF</th>
                      <th className="py-2.5 px-3 text-right font-bold text-stone-900">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700 font-mono tabular-nums">
                    {teams.map((t, idx) => (
                      <tr
                        key={t.id}
                        className={`hover:bg-stone-50/70 transition-colors ${
                          idx === 0 ? 'bg-[#A3223A]/5' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3 font-semibold text-stone-500">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 px-3 font-sans font-bold text-stone-900">
                          {t.name}
                        </td>
                        <td className="py-2.5 px-3 font-sans text-stone-500">
                          <span
                            className={`text-[11px] font-semibold ${
                              t.type === 'Egresados'
                                ? 'text-[#A3223A]'
                                : t.type === 'Alumnos'
                                ? 'text-blue-700'
                                : 'text-stone-600'
                            }`}
                          >
                            {t.type}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center text-stone-600">{t.played}</td>
                        <td className="py-2.5 px-2 text-center text-stone-600">{t.won}</td>
                        <td className="py-2.5 px-2 text-center text-stone-600">
                          {t.goalsFor - t.goalsAgainst > 0 ? `+${t.goalsFor - t.goalsAgainst}` : t.goalsFor - t.goalsAgainst}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-sm text-stone-900">
                          {t.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                <span className="font-lema italic text-stone-700">
                  Tercer tiempo oficial con asado y música en el Quincho Central del Campus al finalizar la jornada.
                </span>
                <span className="font-semibold text-[#A3223A] whitespace-nowrap ml-2">
                  Campus Argüello
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Convenios Deportivos Grid */
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {convenios.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-stone-300 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-bold text-[#A3223A] uppercase tracking-wider">
                      {c.sport}
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">
                      {c.badgeText}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {c.partner}
                  </h3>

                  <div className="p-3 bg-stone-50 rounded-md border border-stone-200/80 text-xs font-semibold text-stone-800">
                    {c.benefit}
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <div className="text-[11px] text-stone-500 space-y-1">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{c.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{c.schedule}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedConvenio(c)}
                    className="w-full py-2 px-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Ver Cómo Acceder al Beneficio</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Free Player Registration Modal */}
      {showPlayerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#A3223A] uppercase tracking-wider">
                  Copa Blas Pascal 2026
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  Inscripción como Jugador Libre
                </h3>
              </div>
              <button
                onClick={() => setShowPlayerModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            {playerSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-stone-900">
                  ¡Inscripción Registrada!
                </h4>
                <p className="text-xs text-stone-600">
                  Te sumamos a la lista pública de fichajes de la Copa.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterPlayer} className="space-y-4 text-xs">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Ej: Nicolás Gómez"
                    className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">
                      Estamento
                    </label>
                    <select
                      value={playerRole}
                      onChange={(e) => setPlayerRole(e.target.value as 'Alumno' | 'Egresado')}
                      className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                    >
                      <option value="Alumno">Soy Alumno</option>
                      <option value="Egresado">Soy Egresado</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-stone-700 block mb-1">
                      Carrera
                    </label>
                    <input
                      type="text"
                      required
                      value={playerCareer}
                      onChange={(e) => setPlayerCareer(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setShowPlayerModal(false)}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white font-semibold rounded-md shadow-xs transition-colors"
                  >
                    Confirmar Fichaje
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Convenio Detail Modal */}
      {selectedConvenio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#A3223A] uppercase tracking-wider">
                  Convenio Deportivo UBP
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  {selectedConvenio.partner}
                </h3>
              </div>
              <button
                onClick={() => setSelectedConvenio(null)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg text-xs space-y-1">
              <span className="font-semibold text-stone-900 block">Beneficio Oficial:</span>
              <p className="text-stone-700">{selectedConvenio.benefit}</p>
            </div>

            <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
              <h4 className="font-bold text-stone-800">¿Cómo acceder?</h4>
              <p>{selectedConvenio.howToAccess}</p>
              <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-[#A3223A]" />
                <span>{selectedConvenio.location}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedConvenio(null)}
              className="w-full py-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
