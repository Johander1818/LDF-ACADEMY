import React from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Mail,
  MapPin,
  Globe,
  Award,
  BookOpen,
  ArrowUp,
  Heart,
  Linkedin,
  Twitter,
  Instagram,
  Facebook
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2E1B0F] text-[#E2D8CE] border-t border-[#B8860B]/20 pt-16 pb-12 relative overflow-hidden">
      {/* Soft background geometric glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & ODS 4 Alignment */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="horizontal" size="lg" />

            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              Conectando estudiantes con oportunidades reales de crecimiento académico y profesional: becas, cursos, diplomados, voluntariados y mentorías personalizadas.
            </p>

            {/* ODS 4 Badge (SRS Section 1.1 / 4.2) */}
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-[#B8860B]/30 rounded-2xl px-4 py-2.5">
              <div className="p-2 bg-[#B8860B] text-white rounded-xl font-bold text-sm">
                ODS 4
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Educación de Calidad</p>
                <p className="text-gray-400">Agenda 2030 — Organización de las Naciones Unidas</p>
              </div>
            </div>
          </div>

          {/* Col 2: Navegación Rápida */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 border-l-2 border-[#D4AF37] pl-3">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'sobre-nosotros', label: 'Sobre Nosotros' },
                { id: 'oportunidades', label: 'Centro de Oportunidades' },
                { id: 'inspirate', label: 'Inspírate (Historias)' },
                { id: 'contacto', label: 'Contacto Directo' },
                { id: 'mi-futuro', label: 'Mi Futuro (Panel)' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id as ActiveTab);
                      scrollToTop();
                    }}
                    className="hover:text-[#D4AF37] transition-colors text-gray-300 hover:translate-x-1 inline-block transform duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Herramientas Especiales */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 border-l-2 border-[#D4AF37] pl-3">
              Módulos Clave
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('oportunidades');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Radar Educativo (Mapa Mundial)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('oportunidades');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Ruta al Éxito (Test Guiado)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('ldf-assistant');
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  LDF Assistant (IA Educativa)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacto e Institucional */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 border-l-2 border-[#D4AF37] pl-3">
              Contacto Oficial
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span>johander181818@gmail.com</span>
              </p>
              <p className="flex items-start space-x-2.5">
                <Globe className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span>Iniciativa Campamento Internacional Juvenil</span>
              </p>
              <p className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span>ODS 4: Educación de Calidad</span>
              </p>

              {/* Redes Oficiales */}
              <div className="pt-2 flex items-center space-x-3">
                <a href="https://instagram.com/lideresfuturo2026" target="_blank" rel="noreferrer" className="p-2 bg-[#B8860B] hover:bg-[#D4AF37] rounded-full transition-colors text-white flex items-center space-x-2 px-3 text-xs font-bold">
                  <Instagram className="w-4 h-4" />
                  <span>@lideresfuturo2026</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 space-y-4 md:space-y-0">
          <p>
            &copy; 2026 Líderes del Futuro. LDF Academy v1.0. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-gray-200 cursor-pointer">Términos de Servicio</span>
            <span className="hover:text-gray-200 cursor-pointer">Política de Privacidad</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 bg-[#B8860B] hover:bg-[#D4AF37] text-white rounded-full transition-all shadow-md ml-4"
              title="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
