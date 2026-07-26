import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Opportunity } from '../types';
import {
  Globe,
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  X,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Compass,
  Search,
  Building2,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Filter
} from 'lucide-react';

export const RadarEducativo: React.FC = () => {
  const {
    opportunities,
    setSelectedOpportunityDetail,
    setActiveTab,
    setSelectedCountryFilter
  } = useApp();

  const [zoomLevel, setZoomLevel] = useState<number>(1.1);
  const [selectedCountryName, setSelectedCountryName] = useState<string>('República Dominicana');
  const [radarSearch, setRadarSearch] = useState<string>('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('Todos');

  // SVG Coordinates for Radar Pins
  const countryCoordinates: Record<string, { x: number; y: number; flag: string; region: string }> = {
    'República Dominicana': { x: 330, y: 190, flag: '🇩🇴', region: 'Caribe (Sede)' },
    'México': { x: 210, y: 170, flag: '🇲🇽', region: 'Norteamérica' },
    'Estados Unidos': { x: 230, y: 110, flag: '🇺🇸', region: 'Norteamérica' },
    'España': { x: 500, y: 125, flag: '🇪🇸', region: 'Europa' },
    'Alemania': { x: 540, y: 95, flag: '🇩🇪', region: 'Europa' },
    'Reino Unido': { x: 480, y: 100, flag: '🇬🇧', region: 'Europa' },
    'Francia': { x: 495, y: 112, flag: '🇫🇷', region: 'Europa' },
    'Japón': { x: 730, y: 145, flag: '🇯🇵', region: 'Asia' },
    'Colombia': { x: 320, y: 240, flag: '🇨🇴', region: 'Sudamérica' },
    'Chile': { x: 310, y: 350, flag: '🇨🇱', region: 'Sudamérica' },
    'Perú': { x: 290, y: 280, flag: '🇵🇪', region: 'Sudamérica' },
    'Argentina': { x: 340, y: 360, flag: '🇦🇷', region: 'Sudamérica' },
    'Global': { x: 520, y: 180, flag: '🌐', region: 'Internacional' },
  };

  // Group active opportunities count by country
  const countryStats = useMemo(() => {
    const stats: Record<string, { count: number; becas: number; cursos: number }> = {};
    opportunities.forEach((opp) => {
      if (opp.status === 'archivada') return;
      if (!stats[opp.country]) {
        stats[opp.country] = { count: 0, becas: 0, cursos: 0 };
      }
      stats[opp.country].count += 1;
      if (opp.type === 'Beca') stats[opp.country].becas += 1;
      if (opp.type === 'Curso' || opp.type === 'Diplomado') stats[opp.country].cursos += 1;
    });
    return stats;
  }, [opportunities]);

  const countryList = Object.keys(countryCoordinates);

  // Opportunities in the selected country
  const filteredCountryOpportunities = useMemo(() => {
    return opportunities.filter((o) => {
      if (o.status === 'archivada') return false;
      if (o.country !== selectedCountryName) return false;
      if (selectedTypeFilter !== 'Todos' && o.type !== selectedTypeFilter) return false;
      if (
        radarSearch &&
        !o.title.toLowerCase().includes(radarSearch.toLowerCase()) &&
        !o.institution.toLowerCase().includes(radarSearch.toLowerCase()) &&
        !o.description.toLowerCase().includes(radarSearch.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [opportunities, selectedCountryName, selectedTypeFilter, radarSearch]);

  const handleJumpToCatalog = (country: string) => {
    setSelectedCountryFilter(country);
    setActiveTab('oportunidades');
  };

  return (
    <div className="w-full py-12 lg:py-16 bg-[#130D08] text-white transition-colors relative overflow-hidden min-h-screen">
      {/* Background Decorative Radar Waves */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Main Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#B8860B]/30">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>Plataforma Geolocalizada • República Dominicana (Sede)</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-[#Outfit] tracking-tight leading-tight">
              Radar Educativo <span className="gold-gradient-text">Interactivo</span>
            </h2>
            <p className="text-gray-300 text-sm max-w-2xl leading-relaxed">
              Explora en tiempo real las oportunidades académicas y becas disponibles por país. Selecciona una ubicación geográfica o haz clic en los puntos interactivos para desplegar las convocatorias oficiales.
            </p>
          </div>

          {/* Quick Stats Summary */}
          <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl border border-[#B8860B]/30 backdrop-blur-md">
            <div className="px-4 py-2 text-center border-r border-white/10">
              <span className="text-2xl font-extrabold text-[#D4AF37] block">
                {countryStats['República Dominicana']?.count || 15}
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-400">En Rep. Dom.</span>
            </div>
            <div className="px-4 py-2 text-center border-r border-white/10">
              <span className="text-2xl font-extrabold text-white block">
                {opportunities.filter((o) => o.status !== 'archivada').length}
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Total Global</span>
            </div>
            <div className="px-4 py-2 text-center">
              <span className="text-2xl font-extrabold text-[#D4AF37] block">
                {countryList.length}
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Países Conectados</span>
            </div>
          </div>
        </div>

        {/* Quick Country Pills Selection Bar */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Selección Rápida de País Sede y Destinos:</span>
          </span>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
            {countryList.map((country) => {
              const info = countryCoordinates[country];
              const count = countryStats[country]?.count || 0;
              const isSelected = selectedCountryName === country;
              const isHQ = country === 'República Dominicana';

              return (
                <button
                  key={country}
                  onClick={() => setSelectedCountryName(country)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 border shadow-sm ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white border-transparent scale-105 shadow-gold-glow'
                      : isHQ
                      ? 'bg-[#2E1B0F] text-[#D4AF37] border-[#D4AF37]/50 hover:bg-[#4A2F1A]'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                  }`}
                >
                  <span className="text-base">{info.flag}</span>
                  <span>{country}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-white/10 text-[#D4AF37]'
                  }`}>
                    {count}
                  </span>
                  {isHQ && <span className="text-[9px] bg-[#D4AF37] text-[#2E1B0F] px-1.5 py-0.2 rounded font-black uppercase">Sede</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Radar Area & Details Sidebar (2 Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Expanded SVG Interactive Radar Canvas (8 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#22150D] to-[#180E08] border border-[#B8860B]/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden min-h-[520px] flex flex-col justify-between">
            {/* Radar Controls Toolbar */}
            <div className="flex items-center justify-between z-20 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Radar Académico Vivo
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 2.0))}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-colors"
                  title="Acercar"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8))}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-colors"
                  title="Alejar"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1.1);
                    setSelectedCountryName('República Dominicana');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#B8860B] hover:bg-[#D4AF37] text-white text-xs font-bold flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Centrar RD</span>
                </button>
              </div>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="relative w-full h-[400px] my-auto flex items-center justify-center overflow-hidden">
              <div
                className="w-full max-w-2xl transition-transform duration-500 ease-out origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <svg viewBox="0 0 800 450" className="w-full h-auto drop-shadow-2xl">
                  <defs>
                    <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#130D08" stopOpacity="0" />
                    </radialGradient>

                    <filter id="goldGlowPin">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Concentric Radar Target Rings */}
                  <circle cx="400" cy="225" r="200" fill="none" stroke="#B8860B" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.25" />
                  <circle cx="400" cy="225" r="140" fill="none" stroke="#B8860B" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.35" />
                  <circle cx="400" cy="225" r="80" fill="none" stroke="#B8860B" strokeWidth="1" opacity="0.45" />

                  {/* Crosshairs */}
                  <line x1="0" y1="225" x2="800" y2="225" stroke="#B8860B" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
                  <line x1="400" y1="0" x2="400" y2="450" stroke="#B8860B" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />

                  {/* Landmass Outlines */}
                  <g fill="#2A1A10" stroke="#4A2F1A" strokeWidth="1">
                    {/* North America */}
                    <path d="M 120 70 L 260 60 L 290 120 L 240 180 L 190 190 L 140 140 Z" />
                    {/* Caribbean Islands */}
                    <path d="M 315 185 L 345 180 L 350 200 L 320 205 Z" fill="#4A2F1A" stroke="#B8860B" strokeWidth="1.5" />
                    {/* South America */}
                    <path d="M 280 220 L 350 240 L 330 380 L 280 390 L 260 260 Z" />
                    {/* Europe */}
                    <path d="M 470 60 L 580 50 L 600 120 L 500 140 L 460 100 Z" />
                    {/* Africa */}
                    <path d="M 470 150 L 580 160 L 570 280 L 500 300 L 460 210 Z" />
                  </g>

                  {/* Dynamic Country Nodes Pins */}
                  {countryList.map((country) => {
                    const coords = countryCoordinates[country];
                    const count = countryStats[country]?.count || 0;
                    const isSelected = selectedCountryName === country;
                    const isHQ = country === 'República Dominicana';

                    const pointRadius = isHQ ? 16 : Math.min(10 + count * 2, 18);

                    return (
                      <g
                        key={country}
                        transform={`translate(${coords.x}, ${coords.y})`}
                        onClick={() => setSelectedCountryName(country)}
                        className="cursor-pointer group"
                      >
                        {/* Outer Pulsing Radar Ring */}
                        <circle
                          r={pointRadius * 1.8}
                          fill={isHQ ? '#D4AF37' : '#B8860B'}
                          opacity={isSelected ? '0.4' : '0.2'}
                          className="animate-ping"
                        />

                        {/* Outer Glow */}
                        <circle
                          r={pointRadius}
                          fill={isSelected ? '#F5D77F' : isHQ ? '#D4AF37' : '#B8860B'}
                          filter="url(#goldGlowPin)"
                          className="group-hover:scale-125 transition-transform duration-300"
                        />

                        {/* Inner Core */}
                        <circle r={pointRadius * 0.4} fill="#FFFFFF" />

                        {/* Text Tag */}
                        <g transform={`translate(0, ${pointRadius + 14})`}>
                          <rect
                            x="-50"
                            y="-10"
                            width="100"
                            height="20"
                            rx="10"
                            fill={isSelected ? '#2E1B0F' : '#130D08'}
                            stroke={isSelected ? '#D4AF37' : '#4A2F1A'}
                            strokeWidth="1"
                          />
                          <text
                            textAnchor="middle"
                            y="3"
                            fill={isSelected ? '#D4AF37' : '#FFFFFF'}
                            fontSize="10"
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            {coords.flag} {country.split(' ')[0]} ({count})
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Footer Tip */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Haz clic en un marcador para desplegar convocatorias instantáneas.</span>
              </span>
              <span className="font-semibold text-[#D4AF37]">
                Seleccionado: {selectedCountryName}
              </span>
            </div>
          </div>

          {/* Column 2: Interactive Country Convocatorias Drawer Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#1C120C] border border-[#B8860B]/40 rounded-3xl p-6 text-[#2E1B0F] dark:text-white shadow-xl space-y-6">
            {/* Panel Header */}
            <div className="space-y-3 pb-4 border-b border-gray-200 dark:border-[#2E1B0F]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">{countryCoordinates[selectedCountryName]?.flag || '🌐'}</span>
                  <div>
                    <h3 className="text-2xl font-bold font-[#Outfit]">
                      {selectedCountryName}
                    </h3>
                    <span className="text-xs font-semibold text-[#B8860B] dark:text-[#D4AF37]">
                      {countryCoordinates[selectedCountryName]?.region || 'Internacional'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-extrabold text-[#B8860B] dark:text-[#D4AF37] block">
                    {filteredCountryOpportunities.length}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Oportunidades</span>
                </div>
              </div>

              {/* ACTION BUTTON TO JUMP DIRECTLY TO CATALOG WITH FILTER PRE-SET */}
              <button
                onClick={() => handleJumpToCatalog(selectedCountryName)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] hover:from-[#A07308] hover:to-[#B8860B] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all hover:scale-[1.01]"
              >
                <span>Ver todas las {filteredCountryOpportunities.length} convocatorias de {selectedCountryName} en el Catálogo</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* In-Panel Quick Search & Sub-Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={radarSearch}
                  onChange={(e) => setRadarSearch(e.target.value)}
                  placeholder={`Filtrar en ${selectedCountryName}...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-xs"
                />
              </div>

              {/* Category buttons */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
                {['Todos', 'Beca', 'Curso', 'Diplomado', 'Concurso', 'Voluntariado'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedTypeFilter(type)}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                      selectedTypeFilter === type
                        ? 'bg-[#B8860B] text-white'
                        : 'bg-gray-100 dark:bg-[#251810] text-gray-600 dark:text-gray-300 hover:text-[#B8860B]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Opportunities for Selected Country */}
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1.5 scrollbar-thin">
              {filteredCountryOpportunities.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 dark:bg-[#251810] rounded-2xl border border-dashed border-gray-300 dark:border-[#3A2214] space-y-2">
                  <p className="text-xs font-semibold text-gray-500">
                    No hay oportunidades con el filtro seleccionado en {selectedCountryName}.
                  </p>
                  <button
                    onClick={() => {
                      setRadarSearch('');
                      setSelectedTypeFilter('Todos');
                    }}
                    className="text-xs text-[#B8860B] font-bold hover:underline"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              ) : (
                filteredCountryOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] space-y-3 hover:border-[#B8860B] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B] block">
                          {opp.institution}
                        </span>
                        <h4 className="font-bold text-sm font-[#Outfit] text-[#2E1B0F] dark:text-white leading-snug">
                          {opp.title}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#B8860B]/10 text-[#B8860B] text-[10px] font-bold shrink-0">
                        {opp.type}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                      {opp.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 dark:border-gray-800 text-[11px]">
                      <span className="text-gray-500 flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-[#B8860B]" />
                        <span>Cierre: {opp.deadline}</span>
                      </span>

                      <button
                        onClick={() => setSelectedOpportunityDetail(opp)}
                        className="px-3 py-1 rounded-full bg-[#B8860B] hover:bg-[#D4AF37] text-white font-bold text-[11px]"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
