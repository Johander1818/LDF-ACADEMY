import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Send,
  CheckCircle2,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const Contacto: React.FC = () => {
  const { currentUser, addContactMessage } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [subject, setSubject] = useState('Consulta General sobre Becas');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    addContactMessage({
      name,
      email,
      subject,
      message,
    });

    setSubmitted(true);
  };

  return (
    <div className="w-full py-16 lg:py-24 bg-white dark:bg-[#130D08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#B8860B] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-4 h-4" />
            <span>Atención Comunitaria LDF</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2E1B0F] dark:text-white font-[#Outfit] tracking-tight">
            Ponte en <span className="gold-gradient-text">Contacto</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            ¿Tienes alguna consulta sobre una convocatoria, quieres registrar tu institución en la plataforma o necesitas orientación? Escríbenos directamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form Side (RF-CON-01, RF-CON-02, RF-CON-03) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200/80 dark:border-[#2E1B0F] shadow-xl space-y-6">
            <h3 className="text-2xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
              Formulario Oficial de Mensaje
            </h3>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-[#B8860B]/10 rounded-2xl border border-[#B8860B]/30">
                <CheckCircle2 className="w-12 h-12 text-[#B8860B] mx-auto" />
                <h4 className="text-xl font-bold text-[#2E1B0F] dark:text-white">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Gracias por escribirnos, <strong>{name}</strong>. Tu consulta ha sido recibida por el equipo de Líderes del Futuro. Te responderemos a <strong>{email}</strong> a la brevedad.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-6 py-2 rounded-full bg-[#B8860B] text-white text-xs font-bold"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. María Rodríguez"
                    className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#B8860B] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maria@ejemplo.com"
                    className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#B8860B] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Asunto de la Consulta
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#B8860B] outline-none font-medium"
                  >
                    <option value="Consulta General sobre Becas">Consulta General sobre Becas</option>
                    <option value="Registro de Institución / Publicar Convocatoria">Registro de Institución / Publicar Convocatoria</option>
                    <option value="Soporte de la Plataforma">Soporte de la Plataforma</option>
                    <option value="Propuesta de Alianza Comunitaria">Propuesta de Alianza Comunitaria</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Mensaje Detallado
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe aquí tu pregunta o comentario para el equipo..."
                    className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#B8860B] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#B8860B] hover:bg-[#D4AF37] text-white font-bold text-sm shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje Oficial</span>
                </button>
              </form>
            )}
          </div>

          {/* Social Channels & Info Side (RF-CON-04) */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#2E1B0F] to-[#4A2F1A] text-white border border-[#B8860B]/30 shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold font-[#Outfit]">
                Canales Oficiales de la Iniciativa
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center space-x-3 text-gray-200">
                  <Instagram className="w-5 h-5 text-[#D4AF37]" />
                  <a href="https://instagram.com/lideresfuturo2026" target="_blank" rel="noreferrer" className="hover:underline font-bold text-[#D4AF37]">
                    Instagram: @lideresfuturo2026
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-200">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <span>johander181818@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-200">
                  <Globe className="w-5 h-5 text-[#D4AF37]" />
                  <span>Iniciativa Creada en el Campamento Internacional Juvenil</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                  Equipo Fundador
                </span>
                <div className="space-y-2 text-xs text-gray-300">
                  <p>• Johander Liriano (johander181818@gmail.com)</p>
                  <p>• Alejandra Esther Familia Duval (alejandrafamiliaduval1404@gmail.com)</p>
                  <p>• Esther Alejandra Familia Duval (estheralejandrafamiliaduval@gmail.com)</p>
                </div>

                <div className="flex items-center space-x-4 pt-3">
                  <a
                    href="https://instagram.com/lideresfuturo2026"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-[#B8860B] hover:bg-[#D4AF37] text-white transition-colors flex items-center space-x-2 text-xs font-bold"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>@lideresfuturo2026</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
