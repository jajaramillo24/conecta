import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, ExternalLink, RefreshCw, X, MessageSquare, GraduationCap } from 'lucide-react';
import { UBPLogo } from './UBPLogo';
import { INITIAL_MENTORS } from '../data/mockData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMentor?: (mentorId: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ 
  isOpen, 
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! Soy Pascalina IA, la asistente de orientación y matching de UBP Conecta. Puedo ayudarte a redactar el temario obligatorio de 3 líneas para tu sesión, recomendarte egresados mentores según tu carrera o explicarte cómo funcionan las micro-mentorías de 30 minutos y las ferias de talento. ¿En qué te puedo asesorar hoy?',
      timestamp: 'Ahora',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    '¿Cómo redacto mi objetivo de 3 líneas para pedir mentoría?',
    '¿Quiénes son los mentores destacados de Informática y Telecomunicaciones?',
    '¿Cómo funciona la regla de los 30 minutos y la protección del egresado?',
    '¿Qué son las Ferias de Talento Inverso y los Jurados Alumni?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Intelligent local fallback matching UBP Conecta context
  const generateLocalAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('objetivo') || q.includes('3 lineas') || q.includes('temario') || q.includes('redactar')) {
      return `📌 **Estructura recomendada para tu objetivo de 3 líneas:**\n\n1. **Tu situación actual:** Carrera que cursás y en qué etapa estás (ej: 4to año de Informática preparando CV).\n2. **Duda puntual o entregable:** Qué querés revisar con el graduado (ej: revisión de portfolio técnico o preguntas sobre requisitos de mercado).\n3. **Expectativa del encuentro:** Qué te gustaría llevarte de los 30 minutos (ej: claridad sobre salarios iniciales, contactos o sugerencias para entrevistas).\n\n*Recordá que este campo es obligatorio para que el mentor sepa exactamente qué preparar antes del encuentro.*`;
    }

    if (q.includes('informática') || q.includes('tecnología') || q.includes('software') || q.includes('chacón') || q.includes('chacon')) {
      return `💻 **Mentores destacados en Tecnología:**\n\n- **Ing. Juan Chacón:** Co-fundador de Machinalis y Tech Director en Mercado Libre. Mentor de doingLABS UBP. Ideal para validación de MVPs técnicos e inteligencia artificial.\n- **Ing. Nazarena Bulacios:** Ganadora del Premio COPIME Nacional y Lead de Infraestructura en Enel Green Power. Excelente para tesis, energías limpias y corporaciones.\n\nPodés encontrarlos en la pestaña de **Directorio & Matching** para reservar una sesión de 30 minutos.`;
    }

    if (q.includes('telecomunicaciones') || q.includes('bulacios') || q.includes('copime')) {
      return `📡 **Ingeniería en Telecomunicaciones:**\n\nTe recomiendo agendar con **Ing. Nazarena Bulacios** (Premio COPIME al mejor egresado de ingeniería del país, hoy en Enel Green Power). Orienta sobre formulación de tesis con impacto real, transición a energías renovables e inserción en empresas del sector.`;
    }

    if (q.includes('administración') || q.includes('marketing') || q.includes('contador') || q.includes('stang') || q.includes('negocios')) {
      return `💼 **Mentores en Gestión & Negocios:**\n\n- **Lic. Matías Stang:** Director en Revolut (Londres), especialista en Fintech, finanzas globales y programas ISEP.\n- **Lic. Camila Benítez:** Head of Growth Marketing en Apex America.\n- **Cr. Marcos Villafañe:** Socio de Auditoría en PwC Argentina, ideal para ingresar a Big Four o práctica tributaria independiente.\n- **Lic. Florencia Valenzuela:** Fundadora de EcoTravel Patagonia (Empresa B certificada).`;
    }

    if (q.includes('30 min') || q.includes('minutos') || q.includes('burnout') || q.includes('protección') || q.includes('tiempo')) {
      return `⏱️ **Metodología de Micro-Mentorías de 30 minutos:**\n\nPara evitar la sobrecarga (burnout) del graduado activo en el mercado:\n- Cada egresado habilita un **cupo mensual limitado** (máximo 1 o 2 bloques de 30 minutos).\n- Las sesiones duran exactamente **30 minutos**, cerradas y sin compromisos extensos.\n- El estudiante debe definir obligatoriamente su temario en 3 líneas antes de enviar la solicitud, asegurando que ambos lleguen preparados.`;
    }

    if (q.includes('feria') || q.includes('jurado') || q.includes('evento') || q.includes('flash')) {
      return `🏛️ **Encuentros de Co-Creación UBP:**\n\n- **Ferias de Talento Inverso:** Los alumnos avanzados presentan proyectos de cátedra ante jurados de egresados que evalúan con mirada de industria.\n- **Mesas Redondas & Flash Mentoring:** Charlas relámpago virtuales o presenciales para resolver dudas masivas en 45 minutos sin sobrecargar a los mentores.\n\nPodés ver las fechas e inscribirte en la pestaña **Ferias & Eventos**.`;
    }

    if (q.includes('grupo 5') || q.includes('quiénes') || q.includes('catedra') || q.includes('innovación')) {
      return `🎓 **Cátedra de Innovación · Turno Tarde · Grupo 5:**\n\nProyecto elaborado por los estudiantes:\n- Zoe Lobos (Administración)\n- Valeria Loza (Turismo)\n- Gonzalo Beas (Marketing)\n- Octavio López (Contador)\n- Ary German Romero (Telecomunicaciones)\n- Juan Jaramillo (Ing. Informática)\n- Santiago Juri Nam (Ing. Informática)\n- Edgar Karpowicz (Ing. Informática)\n- Valentina Rodrigues (Com. Audiovisual)`;
    }

    return `UBP Conecta articula la red de más de 20.000 egresados de la Universidad Blas Pascal con estudiantes de 3° y 4° año. Podés explorar el **Directorio de Mentores**, agendar un turno de **30 minutos** con formato presencial o virtual, o revisar el **Storyboard de 6 pasos** en la barra superior. ¿Te gustaría buscar un mentor para alguna carrera en particular?`;
  };

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
      // First attempt backend if available
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
        throw new Error('Fallback to local assistant');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || generateLocalAnswer(text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // Graceful local intelligence fallback for static deployments (e.g. GitHub Pages)
      setTimeout(() => {
        const botMessage: Message = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: generateLocalAnswer(text),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 400);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-xl w-full h-[85vh] max-h-[640px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-linear-to-r from-[#8B1D31] to-[#A3223A] text-white flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-amber-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">Pascalina IA</h3>
                <span className="text-[10px] px-1.5 py-0.2 bg-white/20 rounded font-semibold text-amber-200 uppercase">
                  Copiloto UBP
                </span>
              </div>
              <p className="text-[11px] text-stone-200">
                Orientación en matching, temario de 3 líneas y agenda UBP Conecta
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs bg-stone-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 space-y-1 ${
                  m.sender === 'user'
                    ? 'bg-[#A3223A] text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-xs shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed font-sans">
                  {m.text}
                </div>
                <div
                  className={`text-[9px] text-right font-mono ${
                    m.sender === 'user' ? 'text-stone-200' : 'text-stone-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-stone-400 text-xs pl-2">
              <div className="w-2 h-2 rounded-full bg-[#A3223A] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#A3223A] animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-[#A3223A] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] ml-1">Pascalina está redactando...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-2.5 bg-white border-t border-stone-200 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pl-1 shrink-0">
            Sugerencias:
          </span>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-stone-100 hover:bg-[#A3223A]/10 hover:text-[#A3223A] text-stone-700 text-[11px] rounded-full whitespace-nowrap transition-colors font-medium shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Preguntale a Pascalina cómo pedir tu mentoría o redactar el temario..."
            className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#A3223A] focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-[#A3223A] hover:bg-[#8B1D31] disabled:bg-stone-200 disabled:text-stone-400 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Enviar</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
