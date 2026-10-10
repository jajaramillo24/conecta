import React from 'react';
import { UBPLogo } from './UBPLogo';
import { Calendar, Bot, Clock, Sparkles, User, GraduationCap, Compass, BookOpen } from 'lucide-react';
import { ActiveRole } from '../types';

export type TabType = 'inicio' | 'directorio' | 'sesiones' | 'eventos';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  bookingCount: number;
  userRole: ActiveRole;
  setUserRole: (role: ActiveRole) => void;
  onOpenAIAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookingCount,
  userRole,
  setUserRole,
  onOpenAIAssistant,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'inicio', label: 'Inicio', icon: <Compass className="w-4 h-4" /> },
    { id: 'directorio', label: 'Directorio de Mentores', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'sesiones', label: 'Mis Conexiones', icon: <Clock className="w-4 h-4" /> },
    { id: 'eventos', label: 'Ferias & Eventos', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Zone 1: Official Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('inicio')}
            className="flex items-center gap-3 text-left focus-visible:outline-[#A3223A]"
          >
            <UBPLogo variant="horizontal" size="sm" />
            <div className="hidden sm:block border-l border-stone-200 pl-3">
              <span className="text-xs font-black tracking-wider text-[#A3223A] block uppercase">
                CONECTA
              </span>
              <span className="font-lema text-[10px] text-stone-500 italic block leading-none">
                Saber y Saber Hacer
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Essential 4 Views Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-bold">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1.5 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#A3223A]'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
                {item.id === 'sesiones' && bookingCount > 0 && (
                  <span className="ml-0.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#A3223A] rounded-full">
                    {bookingCount}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A3223A] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Copilot, Role Switcher & Active User */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#A3223A] bg-[#A3223A]/10 hover:bg-[#A3223A]/15 border border-[#A3223A]/25 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
            title="Abrir Asistente IA de Orientación y Matching"
          >
            <Bot className="w-3.5 h-3.5 text-[#A3223A]" />
            <span className="hidden md:inline">Pascalina IA</span>
          </button>

          {/* Role Toggle Selector */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-[11px] font-bold">
            <button
              onClick={() => setUserRole('estudiante')}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition-all ${
                userRole === 'estudiante'
                  ? 'bg-white text-[#A3223A] shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Ver experiencia como Estudiante avanzado"
            >
              Estudiante
            </button>
            <button
              onClick={() => setUserRole('egresado')}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition-all ${
                userRole === 'egresado'
                  ? 'bg-amber-400 text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Ver experiencia como Egresado Mentor"
            >
              Egresado
            </button>
          </div>

          {/* Authenticated user indicator */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
            <div className="w-7 h-7 rounded-full bg-[#A3223A] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {userRole === 'estudiante' ? 'JA' : 'JC'}
            </div>
            <div className="hidden xl:block text-left text-xs leading-tight">
              <span className="font-bold text-stone-900 block truncate max-w-[100px]">
                {userRole === 'estudiante' ? 'Juan Andrés' : 'Ing. Juan Chacón'}
              </span>
              <span className="text-[10px] text-stone-500 block truncate">
                {userRole === 'estudiante' ? '4° Año · Ing. Informática' : 'Alumni · Mercado Libre'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-stone-200 gap-3 text-xs font-medium scrollbar-none bg-stone-50/70">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors font-semibold flex items-center gap-1 ${
                isActive
                  ? 'bg-[#A3223A] text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>{item.label}</span>
              {item.id === 'sesiones' && bookingCount > 0 && (
                <span className={`inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full ${
                  isActive ? 'bg-white text-[#A3223A]' : 'bg-[#A3223A] text-white'
                }`}>
                  {bookingCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
