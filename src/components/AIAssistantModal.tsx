import React, { useEffect, useRef, useState } from 'react';
import { Bot, Send, X, RefreshCw, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { INITIAL_MENTORS } from '../data/mockData';

type Source = { title: string; uri: string };
type Message = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  origin?: 'guide' | 'ai';
  sources?: Source[];
  query?: string;
  failed?: boolean;
  feedback?: 'useful' | 'not-useful';
};

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDirectorio?: () => void;
}

const suggestions = [
  '¿Cómo preparo el objetivo de mi mentoría?',
  'Busco un mentor de informática',
  '¿Cómo funcionan las sesiones de 30 minutos?',
  '¿Dónde veo los eventos?',
];

function localGuide(query: string): string {
  const normalized = query.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/objetivo|temario|redact|prepar/.test(normalized)) {
    return 'Para preparar tu sesión, escribí: 1) tu carrera y situación actual; 2) la duda o trabajo concreto que querés revisar; 3) qué te gustaría llevarte del encuentro. Podés editar ese texto antes de solicitar el horario.';
  }
  if (/30 minuto|sesion|reserva|turno|horario/.test(normalized)) {
    return 'En esta demostración podés elegir un horario disponible y proponer un objetivo para una sesión de 30 minutos. La solicitud se guarda solo en esta página; no se envía al mentor ni se crea una videollamada real.';
  }
  if (/evento|feria|jurado|encuentro/.test(normalized)) {
    return 'Abrí “Ferias y eventos” para ver las actividades de muestra y probar la inscripción. Es una simulación: verificá fechas y disponibilidad con la universidad antes de planificar tu asistencia.';
  }
  const words = normalized.split(/[^a-z0-9]+/).filter((word) => word.length > 3);
  const matches = INITIAL_MENTORS.map((mentor) => {
    const fields = `${mentor.name} ${mentor.careerName} ${mentor.role} ${mentor.topics.join(' ')}`.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return { mentor, score: words.filter((word) => fields.includes(word)).length };
  }).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  if (matches.length) {
    return `Según las carreras y temas cargados en los perfiles de muestra, podrías explorar: ${matches.map(({ mentor }) => `${mentor.name} (${mentor.careerName}; temas: ${mentor.topics.slice(0, 2).join(', ')})`).join('; ')}. Es una coincidencia por palabras del perfil, no una evaluación de aptitudes. Revisá el directorio completo y elegí vos.`;
  }
  return 'Puedo orientarte sobre el objetivo de una mentoría, los horarios de muestra y los eventos. También podés escribir tu consulta libremente o explorar todos los perfiles en el directorio. No tengo información suficiente en la guía local para responder con seguridad a esta pregunta.';
}

function safeSources(value: unknown): Source[] {
  if (!Array.isArray(value)) return [];
  return value.filter((source): source is Source => {
    if (!source || typeof source.title !== 'string' || typeof source.uri !== 'string') return false;
    try { return new URL(source.uri).protocol === 'https:'; } catch { return false; }
  }).slice(0, 4);
}

function AssistantMarkdown({ text }: { text: string }) {
  return (
    <div className="min-w-0 break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          h1: ({ children }) => <h3 className="mb-2 mt-3 text-base font-bold first:mt-0">{children}</h3>,
          h2: ({ children }) => <h3 className="mb-2 mt-3 text-base font-bold first:mt-0">{children}</h3>,
          h3: ({ children }) => <h3 className="mb-2 mt-3 font-bold first:mt-0">{children}</h3>,
          ul: ({ children }) => <ul className="mb-2 ml-5 list-disc space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 ml-5 list-decimal space-y-1">{children}</ol>,
          li: ({ children }) => <li className="pl-0.5">{children}</li>,
          blockquote: ({ children }) => <blockquote className="mb-2 border-l-2 border-[#8B1D31] pl-3 text-stone-600">{children}</blockquote>,
          a: ({ href, children }) => {
            try {
              if (href && new URL(href).protocol === 'https:') {
                return <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#8B1D31] underline break-all">{children}</a>;
              }
            } catch { /* Only absolute HTTPS links are allowed in AI responses. */ }
            return <span>{children}</span>;
          },
          pre: ({ children }) => <pre className="mb-2 max-w-full overflow-x-auto rounded-lg bg-stone-100 p-3 text-xs leading-relaxed">{children}</pre>,
          code: ({ children, className }) => <code className={className ? `${className} font-mono` : 'rounded bg-stone-100 px-1 py-0.5 font-mono text-xs'}>{children}</code>,
          table: ({ children }) => <div className="mb-2 max-w-full overflow-x-auto"><table className="min-w-full border-collapse text-left text-xs">{children}</table></div>,
          th: ({ children }) => <th className="border border-stone-300 bg-stone-100 px-2 py-1 font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-stone-300 px-2 py-1">{children}</td>,
          hr: () => <hr className="my-3 border-stone-200" />,
          img: ({ alt }) => <span>{alt || 'Imagen'}</span>,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, onNavigateToDirectorio }) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome', sender: 'assistant', origin: 'guide',
    text: 'Hola, soy Pascalina. Podés pedirme ayuda para preparar una mentoría, buscar perfiles por temas o entender esta demostración. Cuando la IA esté disponible identificaré sus respuestas; si falla, verás una guía local claramente marcada. Las sugerencias pueden equivocarse: revisá los perfiles antes de decidir.',
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const elements = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href]'));
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); previousFocus?.focus(); };
  }, [isOpen, onClose]);

  useEffect(() => { if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isOpen]);

  const sendMessage = async (question?: string) => {
    const text = (question ?? inputValue).trim();
    if (!text || isLoading) return;
    setMessages((previous) => [...previous, { id: crypto.randomUUID(), sender: 'user', text }]);
    setInputValue('');
    setIsLoading(true);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }), signal: controller.signal,
      });
      if (!response.ok) throw new Error('assistant-unavailable');
      const data = await response.json();
      if (data.mode !== 'ai' || typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('invalid-response');
      setMessages((previous) => [...previous, {
        id: crypto.randomUUID(), sender: 'assistant', origin: 'ai', text: data.reply.trim(),
        sources: safeSources(data.sources), query: text,
      }]);
    } catch {
      setMessages((previous) => [...previous, {
        id: crypto.randomUUID(), sender: 'assistant', origin: 'guide',
        text: localGuide(text), query: text, failed: true,
      }]);
    } finally {
      window.clearTimeout(timer);
      setIsLoading(false);
    }
  };

  const setFeedback = (id: string, feedback: 'useful' | 'not-useful') => {
    setMessages((previous) => previous.map((message) => message.id === id ? { ...message, feedback } : message));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="pascalina-title" className="flex h-[min(92dvh,720px)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between gap-3 bg-[#8B1D31] p-4 text-white">
          <div className="flex items-start gap-3">
            <Bot className="mt-0.5 h-6 w-6 shrink-0" />
            <div>
              <h2 id="pascalina-title" className="font-bold">Pascalina · asistente IA</h2>
              <p className="mt-0.5 text-xs text-white/85">Orientación sobre mentorías y perfiles de muestra</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar asistente" className="rounded-lg p-2 text-white hover:bg-white/15"><X className="h-5 w-5" /></button>
        </div>
        <p className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs leading-relaxed text-amber-950">
          La IA puede equivocarse. No hay una medida de certeza para estas respuestas. Las reservas y perfiles de esta página son de demostración; verificá información importante antes de actuar.
        </p>
        <div role="log" aria-live="polite" className="flex-1 space-y-4 overflow-y-auto bg-stone-50 p-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[92%] rounded-xl p-3 text-sm leading-relaxed sm:max-w-[85%] ${message.sender === 'user' ? 'bg-[#8B1D31] text-white' : 'border border-stone-200 bg-white text-stone-800'}`}>
                {message.sender === 'assistant' && <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[#8B1D31]">{message.origin === 'ai' ? 'Respuesta generada por IA' : 'Guía local de la página'}</p>}
                {message.failed && <p className="mb-2 rounded bg-amber-50 p-2 text-xs text-amber-900">No se pudo conectar con la IA. Esta orientación proviene de la guía local.</p>}
                {message.sender === 'assistant' ? <AssistantMarkdown text={message.text} /> : <p className="whitespace-pre-wrap">{message.text}</p>}
                {message.origin === 'ai' && (message.sources?.length ? (
                  <div className="mt-3 border-t border-stone-200 pt-2 text-xs">
                    <strong>Fuentes para revisar:</strong>
                    <ul className="mt-1 space-y-1">{message.sources.map((source) => <li key={source.uri}><a className="text-[#8B1D31] underline" href={source.uri} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}</ul>
                  </div>
                ) : <p className="mt-2 text-xs text-stone-600">Sin fuentes externas verificables en esta respuesta.</p>)}
                {message.sender === 'assistant' && message.query && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-stone-200 pt-2 text-xs">
                    {message.failed && <button type="button" onClick={() => sendMessage(message.query)} disabled={isLoading} className="inline-flex items-center gap-1 font-semibold text-[#8B1D31] underline disabled:opacity-50"><RefreshCw className="h-3 w-3" /> Reintentar IA</button>}
                    <button type="button" onClick={() => { setInputValue(message.query || ''); inputRef.current?.focus(); }} className="font-semibold text-[#8B1D31] underline">Editar pregunta</button>
                    <button type="button" onClick={() => setFeedback(message.id, 'useful')} aria-pressed={message.feedback === 'useful'} className={message.feedback === 'useful' ? 'font-bold text-emerald-700' : 'text-stone-600'}>Útil</button>
                    <button type="button" onClick={() => setFeedback(message.id, 'not-useful')} aria-pressed={message.feedback === 'not-useful'} className={message.feedback === 'not-useful' ? 'font-bold text-rose-700' : 'text-stone-600'}>No me sirvió</button>
                  </div>
                )}
                {message.feedback && <p className="mt-1 text-xs text-stone-500">Preferencia registrada en esta conversación.</p>}
              </div>
            </div>
          ))}
          {isLoading && <p className="text-sm text-stone-600" role="status">La IA está preparando una respuesta…</p>}
          <div ref={endRef} />
        </div>
        <div className="shrink-0 border-t border-stone-200 bg-white p-3">
          <div className="mb-2 flex gap-2 overflow-x-auto pb-1">{suggestions.map((question) => <button key={question} type="button" disabled={isLoading} onClick={() => sendMessage(question)} className="shrink-0 rounded-full border border-stone-300 px-3 py-1.5 text-xs text-stone-700 hover:border-[#8B1D31] disabled:opacity-50">{question}</button>)}</div>
          <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="flex gap-2">
            <label htmlFor="pascalina-question" className="sr-only">Escribí tu pregunta</label>
            <input id="pascalina-question" ref={inputRef} value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder="Escribí tu pregunta…" className="min-w-0 flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-[#8B1D31]" />
            <button type="submit" disabled={!inputValue.trim() || isLoading} className="inline-flex items-center gap-1 rounded-lg bg-[#8B1D31] px-4 py-2 text-sm font-semibold text-white disabled:bg-stone-300"><Send className="h-4 w-4" /> Enviar</button>
          </form>
          {onNavigateToDirectorio && <button type="button" onClick={() => { onClose(); onNavigateToDirectorio(); }} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#8B1D31] underline"><Search className="h-3.5 w-3.5" /> Ver todos los perfiles</button>}
        </div>
      </section>
    </div>
  );
};
