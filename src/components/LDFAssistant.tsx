import baseDeConocimiento from '../data/conocimiento.json';
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { ChatMessage } from '../types';
import { Send, X, Sparkles } from 'lucide-react';

export const LDFAssistant: React.FC = () => {
  const {
    currentUser,
    isAssistantOpen,
    setIsAssistantOpen,
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-init',
      sender: 'assistant',
      text: currentUser?.name
        ? `¡Hola ${currentUser.name}! Soy **LDF Assistant**, tu centro de consulta informativa. Hazme una pregunta sobre el Campamento Internacional Juvenil, LDF Academy o Becas.`
        : '¡Hola! Bienvenido a LDF Academy. Soy **LDF Assistant**, tu centro de orientación. Selecciona una opción o escribe tu duda sobre el Campamento, becas o cursos.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickChips = [
    '¿Qué es el Campamento Internacional Juvenil?',
    '¿Qué becas hay disponibles en RD?',
    '¿Cómo me preparo para solicitar una beca?',
    'Contacto oficial e Instagram',
  ];

  // Función para buscar respuestas directamente en el JSON sin usar IA
  const buscarRespuestaEnConocimiento = (consulta: string): string => {
    const textoNormalizado = consulta.toLowerCase().trim();

    // 1. Buscar en la lista de Preguntas Frecuentes (FAQ)
    if (baseDeConocimiento.preguntas_frecuentes) {
      for (const faq of baseDeConocimiento.preguntas_frecuentes) {
        if (
          textoNormalizado.includes(faq.pregunta.toLowerCase()) ||
          faq.pregunta.toLowerCase().includes(textoNormalizado)
        ) {
          return faq.respuesta;
        }
      }
    }

    // 2. Buscar por palabras clave específicas
    if (textoNormalizado.includes('campamento')) {
      const camp = baseDeConocimiento.programas_oficiales?.campamento_internacional_juvenil;
      if (camp) {
        return `**${camp.nombre}**\n\n${camp.descripcion}\n\n**Modalidad:** ${camp.modalidad}\n**Enfoque:** ${camp.enfoque_principal}`;
      }
    }

    if (textoNormalizado.includes('beca') || textoNormalizado.includes('mescyt') || textoNormalizado.includes('juventud')) {
      const becas = baseDeConocimiento.oportunidades_y_becas_rd;
      if (becas) {
        return `**Oportunidades de Becas en RD:**\n\n- **MESCYT:** ${becas.becas_mescyt?.descripcion}\n- **Ministerio de la Juventud:** ${becas.becas_ministerio_juventud?.descripcion}\n- **ITLA:** ${becas.becas_itla?.descripcion}`;
      }
    }

    if (textoNormalizado.includes('contacto') || textoNormalizado.includes('instagram') || textoNormalizado.includes('redes')) {
      const redes = baseDeConocimiento.contacto_y_canales_oficiales;
      if (redes) {
        return `Puedes contactarnos a través de:\n- **Instagram:** ${redes.instagram}\n- **Correo:** ${redes.correo_soporte}\n- **Sede:** ${redes.sede_principal}`;
      }
    }

    if (textoNormalizado.includes('mun') || textoNormalizado.includes('naciones unidas') || textoNormalizado.includes('diplomacia')) {
      const mun = baseDeConocimiento.programas_oficiales?.modelos_naciones_unidas_ldf;
      if (mun) {
        return `**Modelos de Naciones Unidas (MUN LDF):**\n${mun.descripcion}\n\n**Talleres incluidos:** ${mun.talleres_incluidos?.join(', ')}`;
      }
    }

    // Respuesta por defecto si no encuentra coincidencia exacta
    return "No encontré una respuesta exacta para tu consulta. Te invitamos a escribirnos a nuestra cuenta oficial de Instagram **@lideresfuturo2026** para brindarte asistencia personalizada.";
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const respuestaLocal = buscarRespuestaEnConocimiento(query);

    const assistantMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'assistant',
      text: respuestaLocal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    if (!textToSend) setInputText('');
  };

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className="relative p-3.5 rounded-full bg-gradient-to-r from-[#2E1B0F] via-[#4A2F1A] to-[#2E1B0F] text-white shadow-2xl ring-2 ring-[#D4AF37] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          title="Centro de Consulta LDF"
        >
          <Logo size="sm" />
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
                  Centro de Información y Orientación
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
                placeholder="Escribe tu consulta sobre el campamento o becas..."
                className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 dark:bg-[#251810] text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
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