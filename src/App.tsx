/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, TabType } from './components/Header';
import { NewsSection } from './components/NewsSection';
import { EventsSection } from './components/EventsSection';
import { MentorshipSection } from './components/MentorshipSection';
import { SportsSection } from './components/SportsSection';
import { AlumniMapSection } from './components/AlumniMapSection';
import { CommunitySection } from './components/CommunitySection';
import { MyBookingsModal } from './components/MyBookingsModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { Footer } from './components/Footer';
import {
  INITIAL_ALUMNI,
  INITIAL_MENTORS,
  INITIAL_EVENTS,
  INITIAL_NEWS,
  INITIAL_CONVENIOS,
  INITIAL_TOURNAMENT_TEAMS,
  INITIAL_MATCHES,
  INITIAL_MEMES,
  INITIAL_CHAT_MESSAGES,
} from './data/mockData';
import { MentorshipBooking, UbpMeme, ChatMessage } from './types';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('noticias');

  // App data state
  const [news] = useState(INITIAL_NEWS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [mentors, setMentors] = useState(INITIAL_MENTORS);
  const [alumniList] = useState(INITIAL_ALUMNI);
  const [convenios] = useState(INITIAL_CONVENIOS);
  const [teams, setTeams] = useState(INITIAL_TOURNAMENT_TEAMS);
  const [matches] = useState(INITIAL_MATCHES);
  const [memes, setMemes] = useState<UbpMeme[]>(INITIAL_MEMES);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);

  // User agenda state
  const [bookings, setBookings] = useState<MentorshipBooking[]>([
    {
      id: 'demo-booking-1',
      mentorId: 'm-juan-chacon',
      mentorName: 'Juan Chacón',
      mentorRole: 'Co-Fundador de Machinalis & Tech Director en Mercado Libre',
      studentName: 'Juan Andrés',
      studentEmail: 'j.andres@alumnos.ubp.edu.ar',
      studentCareer: 'Ingeniería en Informática',
      date: '2026-10-14',
      time: '18:00 - 18:45',
      modality: 'Virtual (Google Meet)',
      note: 'Consulta sobre validación de primer MVP para incubar en doingLABS UBP.',
      status: 'confirmada',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Toggle event registration
  const handleToggleEventRegistration = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        const newRegistered = !ev.registered;
        return {
          ...ev,
          registered: newRegistered,
          spotsLeft: newRegistered ? Math.max(0, ev.spotsLeft - 1) : ev.spotsLeft + 1,
        };
      })
    );
  };

  // Add a new booked mentorship
  const handleBookSession = (newBooking: Omit<MentorshipBooking, 'id' | 'createdAt'>) => {
    const bookingWithId: MentorshipBooking = {
      ...newBooking,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [bookingWithId, ...prev]);

    // Mark slot as booked in mentor list
    setMentors((prev) =>
      prev.map((m) => {
        if (m.id !== newBooking.mentorId) return m;
        return {
          ...m,
          availableSlots: m.availableSlots.map((slot) =>
            slot.day === newBooking.date && slot.time === newBooking.time
              ? { ...slot, available: false }
              : slot
          ),
        };
      })
    );
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // Unregister from event
  const handleUnregisterEvent = (eventId: string) => {
    handleToggleEventRegistration(eventId);
  };

  // Add free player in soccer tournament
  const handleRegisterFreePlayer = (playerName: string, career: string, role: string) => {
    setTeams((prev) => [
      ...prev,
      {
        id: `t-free-${Date.now()}`,
        name: `${playerName} (${career} - Libre)`,
        type: role === 'Egresados' ? 'Egresados' : 'Alumnos',
        career: career,
        points: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      },
    ]);
  };

  // Upvote meme
  const handleUpvoteMeme = (memeId: string) => {
    setMemes((prev) =>
      prev.map((m) => {
        if (m.id !== memeId) return m;
        const hasUpvoted = m.hasUpvoted;
        return {
          ...m,
          hasUpvoted: !hasUpvoted,
          upvotes: hasUpvoted ? m.upvotes - 1 : m.upvotes + 1,
        };
      })
    );
  };

  // Add meme comment
  const handleAddMemeComment = (memeId: string, text: string, userName: string) => {
    setMemes((prev) =>
      prev.map((m) => {
        if (m.id !== memeId) return m;
        return {
          ...m,
          commentsCount: m.commentsCount + 1,
          comments: [
            ...m.comments,
            { user: userName, text, time: 'Recién' },
          ],
        };
      })
    );
  };

  // Create meme
  const handleCreateMeme = (newMeme: Omit<UbpMeme, 'id' | 'upvotes' | 'commentsCount' | 'comments' | 'date'>) => {
    const created: UbpMeme = {
      ...newMeme,
      id: `meme-${Date.now()}`,
      upvotes: 1,
      hasUpvoted: true,
      commentsCount: 0,
      comments: [],
      date: 'Recién publicado',
    };
    setMemes((prev) => [created, ...prev]);
  };

  // Send chat message
  const handleSendChatMessage = (channelId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      channelId,
      senderName: 'Juan Andrés',
      senderRole: 'Alumno',
      senderCareer: 'tecnologia',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarSeed: 'JuanAndres',
    };

    setChatMessages((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] ?? []), newMsg],
    }));
  };

  // Add mentor slot
  const handleAddMentorSlot = (mentorId: string, day: string, time: string) => {
    setMentors((prev) =>
      prev.map((m) => {
        if (m.id !== mentorId) return m;
        return {
          ...m,
          availableSlots: [...m.availableSlots, { day, time, available: true }],
        };
      })
    );
  };

  const handleOpenMentorshipForAlumni = (alumniName: string) => {
    setActiveTab('mentorias');
  };

  const registeredEvents = events.filter((e) => e.registered);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Official Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingCount={bookings.length + registeredEvents.length}
        onOpenMyBookings={() => setIsBookingsModalOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      />

      {/* Campus Announcement Ribbon */}
      <div className="bg-[#A3223A] text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider text-[10px]">
              Copa Blas Pascal
            </span>
            <span className="truncate">
              Inscripciones abiertas para el Torneo de Fútbol Alumnos vs. Egresados en el Campus de Argüello.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('deportes')}
            className="text-white underline hover:opacity-80 font-semibold whitespace-nowrap flex items-center gap-1 shrink-0"
          >
            <span>Ver Fixture & Convenios</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'noticias' && (
          <NewsSection
            news={news}
            onOpenMentorshipForAlumni={handleOpenMentorshipForAlumni}
          />
        )}

        {activeTab === 'eventos' && (
          <EventsSection
            events={events}
            onToggleEventRegistration={handleToggleEventRegistration}
          />
        )}

        {activeTab === 'mentorias' && (
          <MentorshipSection
            mentors={mentors}
            onBookSession={handleBookSession}
            onAddMentorSlot={handleAddMentorSlot}
            userRole="alumno"
          />
        )}

        {activeTab === 'deportes' && (
          <SportsSection
            teams={teams}
            matches={matches}
            convenios={convenios}
            onRegisterFreePlayer={handleRegisterFreePlayer}
          />
        )}

        {activeTab === 'mapa' && (
          <AlumniMapSection
            alumniList={alumniList}
            onOpenMentorshipForAlumni={handleOpenMentorshipForAlumni}
          />
        )}

        {activeTab === 'comunidad' && (
          <CommunitySection
            memes={memes}
            chatMessages={chatMessages}
            onUpvoteMeme={handleUpvoteMeme}
            onAddMemeComment={handleAddMemeComment}
            onCreateMeme={handleCreateMeme}
            onSendChatMessage={handleSendChatMessage}
            userRole="alumno"
          />
        )}
      </main>

      {/* Floating AI Assistant Trigger */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#A3223A] hover:bg-[#8B1D31] text-white rounded-full shadow-lg hover:shadow-xl transition-all font-semibold text-xs border border-white/20 group"
          title="Abrir Asistente IA de UBP Conecta"
        >
          <Bot className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Consultar a Pascalina IA</span>
        </button>
      </div>

      {/* Bookings Modal */}
      <MyBookingsModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        bookings={bookings}
        registeredEvents={registeredEvents}
        onCancelBooking={handleCancelBooking}
        onUnregisterEvent={handleUnregisterEvent}
      />

      {/* Gemini AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />

      {/* Official Footer */}
      <Footer />
    </div>
  );
}
