import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { ArrowRight, Compass, Sparkles, GraduationCap, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab } = useApp();

  // Mouse parallax state (RF-HERO-07)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 30,
      y: (clientY / innerHeight - 0.5) * 30,
    });
  };

  // Word-by-word slogan reveal (RF-HERO-05)
  const sloganWords = "Conectando estudiantes con oportunidades que transforman vidas".split(" ");

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#18110B] text-white"
    >
      {/* Slow-motion background video loop with fallback poster (RF-HERO-01 & RF-HERO-02) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000 ease-out pointer-events-none"
        poster="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-campus-42523-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay layer for high text contrast (RF-HERO-03) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#18110B]/80 via-[#18110B]/60 to-[#18110B]/95 pointer-events-none" />

      {/* Parallax Geometric Orbits & Stars in background (RF-HERO-08) */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0px)`,
        }}
      >
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#B8860B]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />

        {/* Floating geometric golden star accents */}
        <div className="absolute top-20 right-1/4 opacity-30 animate-pulse">
          <Sparkles className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <div className="absolute bottom-32 left-1/5 opacity-25 animate-bounce">
          <GraduationCap className="w-10 h-10 text-[#B8860B]" />
        </div>
      </div>

      {/* Hero Central Content */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-20 space-y-8 transition-transform duration-200"
        style={{
          transform: `translate3d(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px, 0px)`,
        }}
      >
        {/* Animated Logo Sequence (RF-HERO-04) */}
        <div className="flex justify-center mb-2">
          <div className="p-4 rounded-3xl bg-white/5 border border-[#D4AF37]/30 backdrop-blur-md shadow-2xl gold-glow hover:scale-105 transition-transform duration-500">
            <Logo variant="full" size="hero" animated={true} />
          </div>
        </div>

        {/* Title and Tagline (RF-HERO-05) */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-[#Outfit]">
            LDF <span className="gold-gradient-text">Academy</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto text-lg sm:text-2xl text-gray-200 font-medium">
            {sloganWords.map((word, idx) => (
              <span
                key={idx}
                className="inline-block animate-in fade-in slide-in-from-bottom-2 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {word}
              </span>
            ))}
          </div>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed pt-2">
            Plataforma oficial de la iniciativa <strong className="text-white font-semibold">Líderes del Futuro</strong>. Orientación académica con inteligencia artificial, convocatorias reales verificadas y ruta de desarrollo personal.
          </p>
        </div>

        {/* Call to Action Buttons (RF-HERO-06) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Primary CTA: Oportunidades */}
          <button
            onClick={() => setActiveTab('oportunidades')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#F5D77F] text-[#2E1B0F] font-bold text-base shadow-xl gold-glow hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3 group"
          >
            <span>Explorar Oportunidades</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA: Sobre Nosotros */}
          <button
            onClick={() => setActiveTab('sobre-nosotros')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-[#D4AF37]/50 text-white font-semibold text-base backdrop-blur-md hover:border-[#D4AF37] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <Compass className="w-5 h-5 text-[#D4AF37]" />
            <span>Conocer la Iniciativa</span>
          </button>
        </div>

        {/* Indicator Badge ODS 4 */}
        <div className="pt-8 flex justify-center">
          <div className="inline-flex items-center space-x-2 bg-black/40 border border-[#B8860B]/40 rounded-full px-5 py-2 text-xs font-semibold text-[#D4AF37] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span>Alineado al ODS 4: Educación de Calidad (ONU Agenda 2030)</span>
          </div>
        </div>
      </div>

      {/* Down Arrow Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gray-400 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};
