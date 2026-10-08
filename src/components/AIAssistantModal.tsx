import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, ExternalLink, RefreshCw, X, MessageSquare } from 'lucide-react';
import { UBPLogo } from './UBPLogo';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: { title: string; uri: string }[];
  timestamp: string;
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! Soy Pascalina, la asistente inteligente de UBP Conecta. Puedo ayudarte a encontrar graduados destacados de tu carrera, informarte sobre las mentorías Book With Me, los convenios deportivos (pádel, fútbol, alianzas con clubes) y las actividades del Campus de Argüello. ¿En qué te puedo asesorar hoy?',
      timestamp: 'Ahora',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    '¿Quiénes son los egresados más destacados de Tecnología?',
    '¿Cómo funciona el torneo de fútbol Alumnos vs Egresados?',
    '¿Qué beneficios hay con los convenios de pádel UBP?',
    '¿Cómo pido una mentoría con Juan Chacón o Carlos Ciravegna?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend ?? inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor.');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'No obtuve respuesta.',
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          sender: 'assistant',
          text: 'Ocurrió una pausa en la conexión con el servicio. Podés consultar directamente los horarios en la sección de Mentorías o inscribirte en el Torneo de Fútbol desde la pestaña de Deportes.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-xl w-full h-[620px] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#A3223A] flex items-center justify-center text-white font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight text-white">
                  Pascalina · Asistente IA
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-1.5 py-0.2 rounded-sm border border-emerald-500/30">
                  Gemini 3.5 Flash
                </span>
              </div>
              <p className="font-lema italic text-[11px] text-stone-400 leading-none mt-0.5">
                Saber y Saber Hacer · Centro de Graduados UBP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-[#A3223A] text-white rounded-tr-xs'
                    : 'bg-white text-stone-800 border border-stone-200/80 rounded-tl-xs'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>

                {/* Google Search Grounding Sources */}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-stone-100 space-y-1">
                    <span className="text-[10px] font-semibold text-stone-400 block uppercase tracking-wider">
                      Fuentes verificadas en Google:
                    </span>
                    <div className="space-y-1">
                      {m.sources.map((s, idx) => (
                        <a
                          key={idx}
                          href={s.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] text-[#A3223A] hover:underline truncate"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">{s.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-stone-400 mt-1 px-1 font-mono">
                {m.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-stone-500 bg-white p-3 rounded-xl border border-stone-200 max-w-xs shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#A3223A]" />
              <span>Consultando información con Gemini y Google Search...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        {messages.length <= 3 && (
          <div className="px-4 py-2 bg-white border-t border-stone-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium bg-stone-100 hover:bg-[#A3223A]/10 hover:text-[#A3223A] text-stone-700 rounded-md transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Preguntale a Pascalina sobre egresados, mentorías o torneos..."
            className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white rounded-lg transition-colors disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
