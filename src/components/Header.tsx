import React from 'react';
import { UBPLogo } from './UBPLogo';
import { Calendar, Bot, Sparkles, User } from 'lucide-react';

export type TabType = 'noticias' | 'eventos' | 'mentorias' | 'deportes' | 'mapa' | 'comunidad';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  bookingCount: number;
  onOpenMyBookings: () => void;
  onOpenAIAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookingCount,
  onOpenMyBookings,
  onOpenAIAssistant,
}) => {
  const navItems: { id: TabType; label: string }[] = [
    { id: 'noticias', label: 'Noticias' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'mentorias', label: 'Mentorías' },
    { id: 'deportes', label: 'Deportes & Convenios' },
    { id: 'mapa', label: 'Red Global' },
    { id: 'comunidad', label: 'Memes & Chat' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single brand mark element */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('noticias')}
            className="flex items-center gap-3 text-left focus-visible:outline-[#A3223A]"
          >
            <UBPLogo variant="horizontal" size="sm" />
            <div className="hidden sm:block border-l border-stone-200 pl-3">
              <span className="text-sm font-semibold tracking-tight text-[#A3223A] block">
                CONECTA
              </span>
              <span className="font-lema text-[11px] text-stone-500 italic block leading-none">
                Saber y Saber Hacer
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#A3223A] font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A3223A] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions & User profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#A3223A] bg-[#A3223A]/10 hover:bg-[#A3223A]/15 border border-[#A3223A]/20 rounded-lg transition-colors whitespace-nowrap"
            title="Consultar al Asistente IA de UBP Conecta"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pascalina IA</span>
          </button>

          {/* Bookings shortcut button */}
          <button
            onClick={onOpenMyBookings}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors whitespace-nowrap"
            title="Ver mis reservas de mentorías y eventos"
          >
            <Calendar className="w-3.5 h-3.5 text-[#A3223A]" />
            <span className="hidden md:inline">Mis Turnos</span>
            {bookingCount > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#A3223A] rounded-full">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Fixed authenticated user avatar & role label (No manual switcher) */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
            <div className="w-7 h-7 rounded-full bg-[#A3223A] text-white flex items-center justify-center text-xs font-bold shrink-0">
              JA
            </div>
            <div className="hidden xl:block text-left text-xs leading-tight">
              <span className="font-semibold text-stone-900 block truncate max-w-[110px]">
                Juan Andrés
              </span>
              <span className="text-[10px] text-stone-500 block truncate">
                Estudiante · UBP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-stone-200 gap-4 text-xs font-medium scrollbar-none bg-stone-50/50">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${
                isActive
                  ? 'bg-[#A3223A] text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
