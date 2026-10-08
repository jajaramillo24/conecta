import React, { useState } from 'react';
import { UbpMeme, ChatMessage, UBP_CAREERS, CareerId } from '../types';
import { MessageSquare, ThumbsUp, Send, PlusCircle, Sparkles, Flame, UserCheck, Smile } from 'lucide-react';

interface CommunitySectionProps {
  memes: UbpMeme[];
  chatMessages: Record<string, ChatMessage[]>;
  onUpvoteMeme: (memeId: string) => void;
  onAddMemeComment: (memeId: string, text: string, userName: string) => void;
  onCreateMeme: (meme: Omit<UbpMeme, 'id' | 'upvotes' | 'commentsCount' | 'comments' | 'date'>) => void;
  onSendChatMessage: (channelId: string, text: string) => void;
  userRole: 'alumno' | 'egresado';
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  memes,
  chatMessages,
  onUpvoteMeme,
  onAddMemeComment,
  onCreateMeme,
  onSendChatMessage,
  userRole,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'memes' | 'chat'>('memes');

  // Meme states
  const [selectedMemeForComments, setSelectedMemeForComments] = useState<UbpMeme | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [showCreateMemeModal, setShowCreateMemeModal] = useState(false);
  const [newMemeTitle, setNewMemeTitle] = useState('');
  const [newMemeCaption, setNewMemeCaption] = useState('');
  const [newMemeCategory, setNewMemeCategory] = useState<UbpMeme['category']>('Campus Argüello');

  // Chat states
  const [activeChannel, setActiveChannel] = useState<string>('general');
  const [chatInputText, setChatInputText] = useState('');

  const channels = [
    { id: 'general', name: '#general-pascalinos', desc: 'Comunidad abierta de estudiantes y graduados' },
    { id: 'networking-laboral', name: '#networking-laboral', desc: 'Oportunidades, pasantías y búsquedas en estudios' },
    { id: 'torneo-futbol', name: '#torneo-futbol', desc: 'Organización de partidos Alumnos vs Egresados' },
    { id: 'doinglabs-startups', name: '#doinglabs-startups', desc: 'Emprendimientos e incubación de proyectos' },
  ];

  const currentMessages = chatMessages[activeChannel] ?? [];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    onSendChatMessage(activeChannel, chatInputText.trim());
    setChatInputText('');
  };

  const handleCreateMemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemeTitle || !newMemeCaption) return;
    onCreateMeme({
      title: newMemeTitle,
      caption: newMemeCaption,
      author: userRole === 'alumno' ? 'Juan Andrés (Alumno)' : 'Juan Andrés (Egresado)',
      authorRole: userRole === 'alumno' ? 'Alumno' : 'Egresado',
      category: newMemeCategory,
      memeStyle: 'argüello-wind',
    });
    setShowCreateMemeModal(false);
    setNewMemeTitle('');
    setNewMemeCaption('');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemeForComments || !newCommentText.trim()) return;
    onAddMemeComment(
      selectedMemeForComments.id,
      newCommentText.trim(),
      userRole === 'alumno' ? 'Juan Andrés (Alumno)' : 'Juan Andrés (Egresado)'
    );
    setNewCommentText('');
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#A3223A]">
            Vida Social Pascalina
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Memes UBP & Salas de Chat en Vivo
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl">
            El humor inconfundible del Campus Argüello, anécdotas de cursada, el viento de Donato Álvarez 
            y canales de conversación directa con mentores y compañeros.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center p-1 bg-white rounded-lg border border-stone-200 shadow-xs">
          <button
            onClick={() => setActiveSubTab('memes')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeSubTab === 'memes'
                ? 'bg-[#A3223A] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Memes UBP ({memes.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeSubTab === 'chat'
                ? 'bg-[#A3223A] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Salas de Chat</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'memes' ? (
        /* MEMES FEED */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
              <Flame className="w-4 h-4 text-[#A3223A]" />
              <span>Los más votados de la semana</span>
            </div>

            <button
              onClick={() => setShowCreateMemeModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Publicar Meme o Anécdota</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {memes.map((meme) => (
              <div
                key={meme.id}
                className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-stone-300 transition-all space-y-4"
              >
                <div className="space-y-3">
                  {/* Category and Author */}
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-[#A3223A] uppercase tracking-wider text-[11px]">
                      {meme.category}
                    </span>
                    <div className="flex items-center gap-1.5 font-medium">
                      <span>{meme.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{meme.date}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 tracking-tight leading-snug">
                    {meme.title}
                  </h3>

                  {/* Graphic / Quote container simulating meme card */}
                  <div className="p-4 bg-stone-900 text-white rounded-lg border border-stone-800 space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#A3223A]/20 rounded-full blur-xl pointer-events-none" />
                    <span className="font-mono text-[10px] text-stone-400 block uppercase">
                      #UBP_EXPERIENCE
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-stone-100">
                      &ldquo;{meme.caption}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Actions: Upvotes & Comments */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpvoteMeme(meme.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                        meme.hasUpvoted
                          ? 'bg-[#A3223A]/10 text-[#A3223A]'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="font-mono tabular-nums">{meme.upvotes}</span>
                    </button>

                    <button
                      onClick={() => setSelectedMemeForComments(meme)}
                      className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 p-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="font-mono tabular-nums">{meme.commentsCount} comentarios</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-stone-400 font-lema italic">
                    Saber y Saber Reír
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* LIVE CHAT ROOMS */
        <div className="grid md:grid-cols-12 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs h-[560px]">
          {/* Channels Sidebar (4 cols) */}
          <div className="md:col-span-4 border-r border-stone-200 bg-stone-50/70 p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block px-2">
                Canales Oficiales UBP
              </span>

              <div className="space-y-1">
                {channels.map((ch) => {
                  const isActive = activeChannel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChannel(ch.id)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-[#A3223A] text-white shadow-xs font-semibold'
                          : 'text-stone-700 hover:bg-stone-200/70'
                      }`}
                    >
                      <span className="block font-bold truncate">{ch.name}</span>
                      <span
                        className={`text-[10px] block truncate mt-0.5 ${
                          isActive ? 'text-white/80' : 'text-stone-500'
                        }`}
                      >
                        {ch.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 text-xs space-y-1">
              <span className="text-[11px] font-bold text-stone-800 block">
                Conectado como:
              </span>
              <p className="text-stone-600 truncate">
                Juan Andrés ({userRole === 'alumno' ? 'Alumno Informática' : 'Graduado 2022'})
              </p>
            </div>
          </div>

          {/* Messages Area (8 cols) */}
          <div className="md:col-span-8 flex flex-col justify-between h-full bg-white">
            {/* Channel Header */}
            <div className="px-6 py-3 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  {channels.find((c) => c.id === activeChannel)?.name}
                </h4>
                <p className="text-[11px] text-stone-500">
                  {channels.find((c) => c.id === activeChannel)?.desc}
                </p>
              </div>
              <span className="text-xs text-stone-400 font-mono">En vivo</span>
            </div>

            {/* Messages Scroll View */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {currentMessages.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  No hay mensajes aún en este canal. ¡Sé el primero en iniciar la conversación!
                </div>
              ) : (
                currentMessages.map((msg) => {
                  const career = UBP_CAREERS[msg.senderCareer];
                  return (
                    <div key={msg.id} className="flex items-start gap-3 text-xs">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-[11px]"
                        style={{ backgroundColor: career?.colorHex ?? '#A3223A' }}
                      >
                        {msg.senderName[0]}
                      </div>
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">
                            {msg.senderName}
                          </span>
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.2 rounded-sm"
                            style={{
                              backgroundColor: `${career?.colorHex ?? '#A3223A'}15`,
                              color: career?.colorHex ?? '#A3223A',
                            }}
                          >
                            {msg.senderRole}
                          </span>
                          <span className="text-stone-400 text-[10px] font-mono">
                            {msg.timestamp}
                          </span>
                        </div>
                        <p className="text-stone-700 bg-stone-50 border border-stone-100 p-2.5 rounded-lg rounded-tl-xs leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendChat} className="p-4 border-t border-stone-200 flex gap-2">
              <input
                type="text"
                value={chatInputText}
                onChange={(e) => setChatInputText(e.target.value)}
                placeholder={`Escribir mensaje en ${channels.find((c) => c.id === activeChannel)?.name}...`}
                className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] focus:bg-white"
              />
              <button
                type="submit"
                disabled={!chatInputText.trim()}
                className="px-4 py-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Meme Comments Drawer / Modal */}
      {selectedMemeForComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#A3223A] uppercase tracking-wider">
                  Comentarios del Meme
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  {selectedMemeForComments.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMemeForComments(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-3 pr-1">
              {selectedMemeForComments.comments.map((c, i) => (
                <div key={i} className="p-3 bg-stone-50 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-stone-500 text-[11px]">
                    <span className="font-semibold text-stone-800">{c.user}</span>
                    <span>{c.time}</span>
                  </div>
                  <p className="text-stone-700">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-2 border-t border-stone-200">
              <input
                type="text"
                required
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Sumá tu comentario pascalino..."
                className="flex-1 px-3 py-1.5 text-xs border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A]"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-[#A3223A] text-white text-xs font-semibold rounded-lg hover:bg-[#8B1D31]"
              >
                Publicar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Meme Modal */}
      {showCreateMemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#A3223A] uppercase tracking-wider">
                  Comunidad UBP
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Publicar Meme o Anécdota
                </h3>
              </div>
              <button
                onClick={() => setShowCreateMemeModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMemeSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-stone-700 block mb-1">
                  Categoría
                </label>
                <select
                  value={newMemeCategory}
                  onChange={(e) => setNewMemeCategory(e.target.value as UbpMeme['category'])}
                  className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                >
                  <option value="Campus Argüello">Campus Argüello (El viento, el buffet)</option>
                  <option value="Colectivo 11/18">Colectivo 11 / 18 en Donato Álvarez</option>
                  <option value="Saber y Saber Hacer">Saber y Saber Hacer (Expectativa vs Realidad)</option>
                  <option value="doingLABS">doingLABS & Pitches de Startups</option>
                  <option value="Parciales & Finales">Parciales & Finales</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">
                  Título del Meme
                </label>
                <input
                  type="text"
                  required
                  value={newMemeTitle}
                  onChange={(e) => setNewMemeTitle(e.target.value)}
                  placeholder="Ej: Cuando entregás a las 4 AM en el campus..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">
                  Texto o Remate
                </label>
                <textarea
                  rows={3}
                  required
                  value={newMemeCaption}
                  onChange={(e) => setNewMemeCaption(e.target.value)}
                  placeholder="Contá el remate o situación graciosa..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-[#A3223A] focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowCreateMemeModal(false)}
                  className="px-3 py-1.5 text-stone-600 hover:text-stone-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white font-semibold rounded-md shadow-xs"
                >
                  Publicar Meme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
