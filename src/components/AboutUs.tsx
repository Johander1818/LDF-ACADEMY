import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  BookOpen,
  Award,
  Users,
  Target,
  Eye,
  Heart,
  Globe,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { setActiveTab } = useApp();

  // 3 Pillar Cards (RF-NOS-02)
  const pillars = [
    {
      id: 'pilar-1',
      title: 'Educación de Calidad',
      icon: <BookOpen className="w-8 h-8 text-[#D4AF37]" />,
      description: 'Facilitamos el acceso transparente y directo a programas de formación certificados, becas universitarias y capacitaciones técnicas de nivel internacional.',
    },
    {
      id: 'pilar-2',
      title: 'Liderazgo Juvenil',
      icon: <Award className="w-8 h-8 text-[#D4AF37]" />,
      description: 'Potenciamos las habilidades blandas, la resolución de problemas comunitarios y la capacidad de agencia de las juventudes para transformar su entorno.',
    },
    {
      id: 'pilar-3',
      title: 'Igualdad de Oportunidades',
      icon: <Users className="w-8 h-8 text-[#D4AF37]" />,
      description: 'Democratizamos la orientación académica guiada con inteligencia artificial para reducir las brechas de información y conectar el talento sin importar su origen.',
    },
  ];

  return (
    <div className="w-full py-16 lg:py-24 bg-white dark:bg-[#130D08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#B8860B] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Nuestra Iniciativa</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2E1B0F] dark:text-white font-[#Outfit] tracking-tight">
            Impulsando a los <span className="gold-gradient-text">Líderes del Futuro</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            LDF Academy nace de la convicción de que el talento está distribuido por igual en el mundo, pero las oportunidades no. Nuestra misión es acortar esa distancia.
          </p>
        </div>

        {/* History, Mission & Vision Cards Grid (RF-NOS-01) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Visual Column with Logo & Image */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2E1B0F] to-[#4A2F1A] p-8 sm:p-12 text-white shadow-2xl border border-[#B8860B]/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8860B]/20 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <Logo variant="horizontal" size="lg" className="bg-white/10 p-4 rounded-2xl border border-[#D4AF37]/30 backdrop-blur-xs" />
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B8860B]/30 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nacida en el Campamento Internacional Juvenil</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-[#Outfit] text-white">
                Sobre la Iniciativa
              </h3>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                <strong>Líderes del Futuro</strong> es una iniciativa educativa y de liderazgo inspirada en el <strong>Objetivo de Desarrollo Sostenible (ODS) 4: Educación de Calidad</strong>, cuyo propósito es formar jóvenes con las competencias, los valores y las habilidades necesarias para convertirse en agentes de cambio en sus comunidades.
              </p>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                La iniciativa promueve una educación integral que combina el desarrollo del liderazgo, el pensamiento crítico, el trabajo en equipo, la innovación y el compromiso social. A través de programas de formación, talleres, mentorías y proyectos de impacto comunitario, busca brindar oportunidades de aprendizaje que permitan a los participantes alcanzar su máximo potencial.
              </p>
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#D4AF37]">
                <span>ODS 4: Educación de Calidad</span>
                <a href="https://instagram.com/lideresfuturo2026" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors">
                  Instagram: @lideresfuturo2026
                </a>
              </div>
            </div>
          </div>

          {/* Mission & Vision Column */}
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200/80 dark:border-[#2E1B0F] space-y-3">
              <div className="flex items-center space-x-3 text-[#B8860B] dark:text-[#D4AF37]">
                <Target className="w-6 h-6" />
                <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">Nuestra Misión</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                Empoderar a las nuevas generaciones mediante una educación inclusiva y de calidad, fomentando líderes íntegros, comprometidos con la transformación positiva de sus comunidades y con la construcción de un futuro más justo, equitativo y sostenible.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200/80 dark:border-[#2E1B0F] space-y-3">
              <div className="flex items-center space-x-3 text-[#B8860B] dark:text-[#D4AF37]">
                <Eye className="w-6 h-6" />
                <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">Nuestra Visión</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                Consolidarnos como una iniciativa de referencia en la formación de líderes juveniles, inspirando a miles de jóvenes a convertirse en protagonistas del cambio y en promotores del desarrollo sostenible a nivel local, nacional e internacional.
              </p>
            </div>
          </div>
        </div>

        {/* Founders Section (Equipo Fundador) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200/80 dark:border-[#2E1B0F] space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#B8860B] dark:text-[#D4AF37] text-xs font-bold uppercase">
              <Users className="w-4 h-4" />
              <span>Equipo Creador</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#2E1B0F] dark:text-white font-[#Outfit]">
              Fundadores de la Iniciativa
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              La iniciativa Líderes del Futuro fue fundada dentro del Campamento Internacional Juvenil por un equipo altamente comprometido con la educación, el liderazgo juvenil y el desarrollo sostenible:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] space-y-3 text-center shadow-md">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B]">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#2E1B0F] dark:text-white font-[#Outfit]">
                Johander Liriano
              </h4>
              <p className="text-xs text-[#B8860B] dark:text-[#D4AF37] font-semibold">
                Cofundador Líderes del Futuro
              </p>
              <a
                href="mailto:johander181818@gmail.com"
                className="inline-flex items-center space-x-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-[#B8860B] transition-colors pt-2 border-t border-gray-100 dark:border-[#3A2214] w-full justify-center"
              >
                <span>📧 johander181818@gmail.com</span>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] space-y-3 text-center shadow-md">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B]">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#2E1B0F] dark:text-white font-[#Outfit]">
                Alejandra Esther Familia Duval
              </h4>
              <p className="text-xs text-[#B8860B] dark:text-[#D4AF37] font-semibold">
                Cofundadora Líderes del Futuro
              </p>
              <a
                href="mailto:alejandrafamiliaduval1404@gmail.com"
                className="inline-flex items-center space-x-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-[#B8860B] transition-colors pt-2 border-t border-gray-100 dark:border-[#3A2214] w-full justify-center truncate"
              >
                <span className="truncate">📧 alejandrafamiliaduval1404@gmail.com</span>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] space-y-3 text-center shadow-md">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B]">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#2E1B0F] dark:text-white font-[#Outfit]">
                Esther Alejandra Familia Duval
              </h4>
              <p className="text-xs text-[#B8860B] dark:text-[#D4AF37] font-semibold">
                Cofundadora Líderes del Futuro
              </p>
              <a
                href="mailto:estheralejandrafamiliaduval@gmail.com"
                className="inline-flex items-center space-x-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-[#B8860B] transition-colors pt-2 border-t border-gray-100 dark:border-[#3A2214] w-full justify-center truncate"
              >
                <span className="truncate">📧 estheralejandrafamiliaduval@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Pillar Cards Section (RF-NOS-02 & RF-NOS-03) */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2E1B0F] dark:text-white font-[#Outfit]">
              Los Tres Pilares de LDF Academy
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Nuestros ejes fundamentales de acción comunitaria e innovación educativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pilar, idx) => (
              <div
                key={pilar.id}
                className="p-8 rounded-3xl bg-white dark:bg-[#1C120C] border border-gray-200/80 dark:border-[#2E1B0F] hover:border-[#B8860B]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-xl group space-y-4"
              >
                <div className="p-4 rounded-2xl bg-[#B8860B]/10 dark:bg-[#B8860B]/20 inline-block group-hover:scale-110 transition-transform">
                  {pilar.icon}
                </div>
                <h4 className="text-xl font-bold text-[#2E1B0F] dark:text-white font-[#Outfit]">
                  {pilar.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {pilar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ONU Agenda 2030 - ODS 4 Alignment Banner (RF-NOS-04) */}
        <div className="rounded-3xl bg-gradient-to-r from-[#2E1B0F] via-[#4A2F1A] to-[#2E1B0F] p-8 sm:p-12 text-white border border-[#B8860B]/40 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B8860B] text-white text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>Compromiso Internacional</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-[#Outfit] text-white">
              Alineados al Objetivo de Desarrollo Sostenible n.º 4 (ODS 4)
            </h3>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Trabajamos para "Garantizar una educación inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje durante toda la vida para todos" conforme a la Agenda 2030 de la Organización de las Naciones Unidas.
            </p>
          </div>

          <div className="shrink-0 text-center lg:text-right">
            <button
              onClick={() => setActiveTab('oportunidades')}
              className="px-8 py-4 rounded-full bg-[#D4AF37] hover:bg-[#F5D77F] text-[#2E1B0F] font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center space-x-2"
            >
              <span>Explorar Becas ODS 4</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
