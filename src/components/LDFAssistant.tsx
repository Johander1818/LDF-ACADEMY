import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { ChatMessage } from '../types';
import { Send, X, Sparkles, Loader2 } from 'lucide-react';

export const LDFAssistant: React.FC = () => {
  const {
    currentUser,
    isAssistantOpen,
    setIsAssistantOpen,
    opportunities,
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-init',
      sender: 'assistant',
      text: currentUser?.name
        ? `¡Hola ${currentUser.name}! Soy **LDF Assistant**, tu orientador académico oficial. ¿En qué puedo ayudarte hoy? Puedo informarte sobre becas universitarias en República Dominicana e internacionales, u orientarte sobre nuestra iniciativa.`
        : '¡Hola! Bienvenido a LDF Academy. Soy **LDF Assistant**, tu orientador con Inteligencia Artificial. ¿En qué área académica o beca universitaria te gustaría recibir información hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickChips = [
    '¿Quiénes fundaron la iniciativa Líderes del Futuro?',
    '¿Qué becas universitarias en RD tienen convocatoria abierta?',
    '¿Cómo me preparo para solicitar una beca?',
    'Contacto oficial e Instagram',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    const fallbackText = "Para esta consulta no cuento con una respuesta exacta en este momento. Puedes contactarnos a través de nuestra cuenta oficial de Instagram **@lideresfuturo2026** para brindarte una asistencia personalizada.";

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY no configurada");
      }

      const systemInstruction = `
Eres LDF Assistant, la IA y orientador académico oficial de "Líderes del Futuro" (LDF Academy).

REGLA OBLIGATORIA:
- Si te preguntan algo de lo que NO posees información exacta, confirmada o presente en el listado de oportunidades, responde EXACTAMENTE:
"${fallbackText}"

DATOS DE LA INICIATIVA:
- Instagram: @lideresfuturo2026

OPORTUNIDADES DISPONIBLES EN LA PLATAFORMA:
${JSON.stringify(opportunities, null, 2)}
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\nPregunta: ${query}` }]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Error en API Gemini: ${response.status}`);
      }

      const data = await response.json();
      const assistantReply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || fallbackText;

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: assistantReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Error en LDF Assistant:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: 'assistant',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className="relative p-3.5 rounded-full bg-gradient-to-r from-[#2E1B0F] via-[#4A2F1A] to-[#2E1B0F] text-white shadow-2xl ring-2 ring-[#D4AF37] gold-glow hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
          title="Abrir LDF Assistant (IA)"
        >
          <Logo size="sm" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-2 border-[#18110B] animate-pulse" />
        </button>
      </div>

      {/* Ventana Modal de Chat */}
      {isAssistantOpen && (
        <div className="fixed inset-y-0 right-0 sm:right-6 sm:bottom-20 sm:inset-y-auto sm:w-[420px] sm:h-[620px] z-50 bg-white dark:bg-[#1C120C] border border-gray-200 dark:border-[#2E1B0F] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom duration-300">
          {/* Cabecera */}
          <div className="p-4 bg-gradient-to-r from-[#2E1B0F] to-[#4A2F1A] text-white flex items-center justify-between border-b border-[#B8860B]/30">
            <div className="flex items-center space-x-3">
              <Logo size="sm" />
              <div>
                <h3 className="font-bold text-sm text-white font-[#Outfit] flex items-center space-x-1">
                  <span>LDF Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                </h3>
                <p className="text-[10px] text-gray-300">
                  {currentUser?.name ? `Atendiendo a ${currentUser.name}` : 'Orientador Académico con IA'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAssistantOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="p-3 rounded-2xl bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#2E1B0F] dark:text-[#D4AF37] font-medium text-[11px] text-center">
                    {msg.text}
                  </div>
                );
              }

              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-[#B8860B] text-white rounded-br-none font-medium'
                        : 'bg-gray-100 dark:bg-[#251810] text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200/60 dark:border-[#3A2214]'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[9px] text-gray-400 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-400 text-xs py-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#B8860B]" />
                <span>LDF Assistant está consultando la información...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chips de sugerencia rápida */}
          <div className="px-3 py-2 bg-gray-50/50 dark:bg-[#130D08]/50 border-t border-gray-100 dark:border-[#2E1B0F] overflow-x-auto flex space-x-1.5 scrollbar-none">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="shrink-0 px-3 py-1 rounded-full bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-[10px] font-medium text-gray-700 dark:text-gray-300 hover:border-[#B8860B] hover:text-[#B8860B] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Formulario de envío */}
          <div className="p-3 bg-white dark:bg-[#1C120C] border-t border-gray-200 dark:border-[#2E1B0F]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu consulta sobre becas o cursos..."
                className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 dark:bg-[#251810] text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 rounded-full bg-[#B8860B] hover:bg-[#D4AF37] text-white disabled:opacity-40 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};