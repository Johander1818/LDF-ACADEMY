import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Opportunity, OpportunityType, OpportunityModality } from '../types';
import {
  Search,
  Filter,
  GraduationCap,
  Calendar,
  MapPin,
  Globe,
  ExternalLink,
  Heart,
  Bell,
  Share2,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  X,
  Compass,
  ArrowRight,
  SlidersHorizontal,
  Mail,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';

interface OpportunitiesProps {
  onOpenRadar?: () => void;
  onOpenRoadmap?: () => void;
}

export const Opportunities: React.FC<OpportunitiesProps> = () => {
  const {
    opportunities,
    favorites,
    toggleFavorite,
    reminders,
    toggleReminder,
    comparedOpportunityIds,
    toggleCompareOpportunity,
    clearComparedOpportunities,
    setSelectedOpportunityDetail,
    currentUser,
    setActiveTab,
    selectedCountryFilter,
    setSelectedCountryFilter,
  } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [selectedCountry, setSelectedCountry] = useState<string>(selectedCountryFilter || 'Todos');
  const [selectedModality, setSelectedModality] = useState<string>('Todas');
  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');

  // Sync selectedCountry with context bridge
  React.useEffect(() => {
    if (selectedCountryFilter) {
      setSelectedCountry(selectedCountryFilter);
    }
  }, [selectedCountryFilter]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'explorar' | 'recomendadas'>('explorar');

  // Side-by-side comparison modal state (RF-OPO-09)
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Extract unique countries and types for dropdowns
  const uniqueCountries = useMemo(() => {
    const list = Array.from(new Set(opportunities.map((o) => o.country)));
    return ['Todos', ...list];
  }, [opportunities]);

  const uniqueTypes: (string | OpportunityType)[] = [
    'Todos',
    'Beca',
    'Curso',
    'Diplomado',
    'Voluntariado',
    'Concurso',
  ];

  const uniqueLevels = [
    'Todos',
    'Secundaria / Bachillerato',
    'Universitario',
    'Profesional / Posgrado',
  ];

  // Filter Logic (RF-OPO-08)
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      // Exclude archived by default in public list (RF-OPO-05)
      if (opp.status === 'archivada') return false;

      // Search term
      if (
        searchTerm &&
        !opp.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !opp.institution.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter Type
      if (selectedType !== 'Todos' && opp.type !== selectedType) return false;

      // Filter Country
      if (selectedCountry !== 'Todos' && opp.country !== selectedCountry) return false;

      // Filter Modality
      if (selectedModality !== 'Todas' && opp.modality !== selectedModality) return false;

      // Filter Level
      if (selectedLevel !== 'Todos' && !opp.requiredLevel.toLowerCase().includes(selectedLevel.toLowerCase().split(' ')[0])) {
        return false;
      }

      // Filter Favorites only
      if (showOnlyFavorites && !favorites.includes(opp.id)) return false;

      return true;
    });
  }, [
    opportunities,
    searchTerm,
    selectedType,
    selectedCountry,
    selectedModality,
    selectedLevel,
    showOnlyFavorites,
    favorites,
  ]);

  // "Recomendadas para ti" filtered subset (RF-OPO-10)
  const recommendedOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      if (currentUser?.interestArea) {
        const areaKey = currentUser.interestArea.toLowerCase().split(' ')[0];
        return (
          opp.title.toLowerCase().includes(areaKey) ||
          opp.description.toLowerCase().includes(areaKey) ||
          opp.type === 'Beca' ||
          opp.type === 'Curso'
        );
      }
      return opp.status === 'activa' || opp.type === 'Beca';
    });
  }, [opportunities, currentUser]);

  const displayList = activeSubTab === 'recomendadas' ? recommendedOpportunities : filteredOpportunities;

  const handleShare = (opp: Opportunity) => {
    if (navigator.share) {
      navigator.share({
        title: opp.title,
        text: `${opp.title} por ${opp.institution} en LDF Academy`,
        url: opp.officialUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(opp.officialUrl);
      alert('¡Enlace de la convocatoria copiado al portapapeles!');
    }
  };

  return (
    <div className="w-full py-12 lg:py-16 bg-gray-50/50 dark:bg-[#130D08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200 dark:border-[#2E1B0F]">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#B8860B] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Centro de Oportunidades</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E1B0F] dark:text-white font-[#Outfit] tracking-tight">
              Convocatorias y Becas <span className="gold-gradient-text">Verificadas</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl">
              Explora Becas, Cursos, Diplomados, Voluntariados y Concursos de instituciones oficiales internacionales (Google, Microsoft, UNICEF, UNESCO, Fulbright, Santander, edX, etc.).
            </p>
          </div>

          {/* Sub-Tabs: Explorar vs Recomendadas */}
          <div className="flex items-center space-x-2 bg-white dark:bg-[#1C120C] p-1.5 rounded-full border border-gray-200 dark:border-[#2E1B0F] shadow-xs">
            <button
              onClick={() => setActiveSubTab('explorar')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeSubTab === 'explorar'
                  ? 'bg-[#B8860B] text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#B8860B]'
              }`}
            >
              Todas ({filteredOpportunities.length})
            </button>
            <button
              onClick={() => setActiveSubTab('recomendadas')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeSubTab === 'recomendadas'
                  ? 'bg-[#B8860B] text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#B8860B]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Recomendadas para ti</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Multi-filter Controls (RF-OPO-06, RF-OPO-07, RF-OPO-08) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1C120C] border border-gray-200/80 dark:border-[#2E1B0F] shadow-sm space-y-4">
          {/* Quick Country Pills Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs font-bold text-gray-500 shrink-0 flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>País Destino:</span>
            </span>
            {['Todos', 'República Dominicana', 'Estados Unidos', 'España', 'Alemania', 'Reino Unido', 'Francia', 'Japón', 'México', 'Colombia', 'Chile', 'Perú', 'Argentina', 'Global'].map((countryName) => (
              <button
                key={countryName}
                onClick={() => {
                  setSelectedCountry(countryName);
                  setSelectedCountryFilter(countryName);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCountry === countryName
                    ? 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white border-transparent shadow-xs scale-105'
                    : countryName === 'República Dominicana'
                    ? 'bg-[#2E1B0F] text-[#D4AF37] border-[#D4AF37]/50 hover:bg-[#4A2F1A]'
                    : 'bg-gray-100 dark:bg-[#251810] text-gray-700 dark:text-gray-300 border-transparent hover:border-[#B8860B]'
                }`}
              >
                {countryName === 'República Dominicana' ? '🇩🇴 Rep. Dominicana (Sede)' : countryName}
              </button>
            ))}
          </div>

          {/* Top Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por institución, título (ej. Google, Python, Fulbright, Ciberseguridad)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B] transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {/* Type Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Categoría
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              >
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                País
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              >
                {uniqueCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Modality Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Modalidad
              </label>
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              >
                <option value="Todas">Todas</option>
                <option value="Virtual">Virtual</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Nivel Requerido
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              >
                {uniqueLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Filter Actions & Match Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-[#2E1B0F] text-xs">
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-300 font-medium">
                <input
                  type="checkbox"
                  checked={showOnlyFavorites}
                  onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                  className="rounded border-gray-300 text-[#B8860B] focus:ring-[#B8860B]"
                />
                <span>Solo Guardadas en Favoritos ({favorites.length})</span>
              </label>

              {(searchTerm || selectedType !== 'Todos' || selectedCountry !== 'Todos' || selectedModality !== 'Todas' || selectedLevel !== 'Todos' || showOnlyFavorites) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('Todos');
                    setSelectedCountry('Todos');
                    setSelectedCountryFilter('Todos');
                    setSelectedModality('Todas');
                    setSelectedLevel('Todos');
                    setShowOnlyFavorites(false);
                  }}
                  className="text-xs text-[#B8860B] hover:underline font-semibold"
                >
                  Limpiar Filtros
                </button>
              )}
            </div>

            <div className="text-gray-500 dark:text-gray-400 font-medium">
              Mostrando <strong className="text-gray-900 dark:text-white">{displayList.length}</strong> convocatorias
            </div>
          </div>
        </div>

        {/* Side-by-side comparison Floating Bar Trigger (RF-OPO-09) */}
        {comparedOpportunityIds.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-[#2E1B0F] text-white px-6 py-3.5 rounded-full shadow-2xl border border-[#D4AF37]/50 flex items-center space-x-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span>{comparedOpportunityIds.length} seleccionadas para comparar</span>
            </div>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-1.5 rounded-full bg-[#D4AF37] text-[#2E1B0F] font-bold text-xs hover:bg-[#F5D77F] transition-all"
            >
              Comparar lado a lado
            </button>
            <button
              onClick={clearComparedOpportunities}
              className="text-gray-400 hover:text-white"
              title="Limpiar selección"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Opportunity Cards Grid (RF-OPO-01 & 3.5 Card Micro-interactions) */}
        {displayList.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1C120C] rounded-3xl border border-gray-200 dark:border-[#2E1B0F] space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B]">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#2E1B0F] dark:text-white font-[#Outfit]">
              No se encontraron convocatorias coincidentes
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Intenta cambiar los términos de búsqueda o ajustar los filtros seleccionados para ampliar los resultados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayList.map((opp) => {
              const isFav = favorites.includes(opp.id);
              const isRem = reminders.includes(opp.id);
              const isCompared = comparedOpportunityIds.includes(opp.id);

              // Status badge styling (RF-OPO-03)
              const statusBadges = {
                activa: { label: 'Recién publicada', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
                proxima: { label: 'Próxima a cerrar', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' },
                permanente: { label: 'Vigente / Permanente', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30' },
                archivada: { label: 'Vencida / Archivada', color: 'bg-gray-500/10 text-gray-500 border-gray-500/30' },
              };

              const currentStatusBadge = statusBadges[opp.status] || statusBadges.activa;

              return (
                <div
                  key={opp.id}
                  className="rounded-3xl bg-white dark:bg-[#1C120C] border border-gray-200/80 dark:border-[#2E1B0F] hover:border-[#B8860B]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden"
                >
                  {/* Subtle top golden accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B8860B]/40 to-transparent group-hover:via-[#D4AF37] transition-all" />

                  <div className="space-y-4">
                    {/* Header: Institution Logo, Category & Status Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={opp.logoUrl}
                          alt={opp.institution}
                          className="w-12 h-12 rounded-2xl object-cover border border-gray-100 dark:border-[#2E1B0F] shadow-xs shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div>
                          <p className="text-xs font-bold text-[#B8860B] dark:text-[#D4AF37] uppercase tracking-wider">
                            {opp.institution}
                          </p>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-[#2E1B0F] text-gray-700 dark:text-gray-300 text-[10px] font-semibold mt-1">
                            {opp.type}
                          </span>
                        </div>
                      </div>

                      {/* Favorite Button (RF-OPO-04) */}
                      <button
                        onClick={() => toggleFavorite(opp.id)}
                        className={`p-2 rounded-full transition-colors ${
                          isFav
                            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500'
                            : 'bg-gray-50 dark:bg-[#251810] text-gray-400 hover:text-rose-500'
                        }`}
                        title={isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setSelectedOpportunityDetail(opp)}
                      className="font-bold text-lg text-[#2E1B0F] dark:text-white font-[#Outfit] line-clamp-2 hover:text-[#B8860B] cursor-pointer transition-colors"
                    >
                      {opp.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {opp.description}
                    </p>

                    {/* Status Badge & Modality Details */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px]">
                      <span className={`px-2.5 py-0.5 rounded-full border font-semibold ${currentStatusBadge.color}`}>
                        {currentStatusBadge.label}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-[#251810] text-gray-600 dark:text-gray-300 font-medium flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-[#B8860B]" />
                        <span>{opp.country} ({opp.modality})</span>
                      </span>
                    </div>

                    {/* Deadline date */}
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-1.5 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>Cierre: <strong>{opp.deadline}</strong></span>
                    </div>
                  </div>

                  {/* Card Action Footer Buttons */}
                  <div className="pt-6 mt-6 border-t border-gray-100 dark:border-[#2E1B0F] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      {/* Reminder Toggle */}
                      <button
                        onClick={() => toggleReminder(opp.id)}
                        className={`flex items-center space-x-1 transition-colors ${
                          isRem ? 'text-[#B8860B] font-semibold' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        }`}
                        title="Activar recordatorio de cierre"
                      >
                        <Bell className={`w-3.5 h-3.5 ${isRem ? 'fill-[#B8860B]' : ''}`} />
                        <span>{isRem ? 'Recordatorio activo' : 'Recordatorio'}</span>
                      </button>

                      {/* Side-by-Side Compare Checkbox */}
                      <button
                        onClick={() => toggleCompareOpportunity(opp.id)}
                        className={`flex items-center space-x-1 text-xs font-medium transition-colors ${
                          isCompared ? 'text-[#B8860B] font-bold' : 'text-gray-400 hover:text-gray-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => {}}
                          className="rounded text-[#B8860B]"
                        />
                        <span>Comparar</span>
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={() => handleShare(opp)}
                        className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        title="Compartir convocatoria"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Primary Apply / Detail Button */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedOpportunityDetail(opp)}
                        className="py-2.5 rounded-xl bg-gray-100 dark:bg-[#251810] hover:bg-gray-200 text-[#2E1B0F] dark:text-gray-200 font-semibold text-xs transition-colors"
                      >
                        Ver Detalles
                      </button>
                      <a
                        href={opp.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 rounded-xl bg-[#B8860B] hover:bg-[#D4AF37] text-white font-bold text-xs transition-all flex items-center justify-center space-x-1 shadow-xs"
                      >
                        <span>Convocatoria</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Side-by-Side Opportunity Comparison Modal (RF-OPO-09) */}
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1C120C] w-full max-w-5xl rounded-3xl shadow-2xl border border-gray-200 dark:border-[#2E1B0F] p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2E1B0F] pb-4">
                <div>
                  <h3 className="text-2xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                    Comparación Lado a Lado
                  </h3>
                  <p className="text-xs text-gray-500">
                    Evaluando {comparedOpportunityIds.length} convocatorias seleccionadas.
                  </p>
                </div>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#251810] text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comparedOpportunityIds.map((id) => {
                  const opp = opportunities.find((o) => o.id === id);
                  if (!opp) return null;

                  return (
                    <div
                      key={opp.id}
                      className="p-5 rounded-2xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] space-y-4"
                    >
                      <div className="flex items-center space-x-3">
                        <img src={opp.logoUrl} alt={opp.institution} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="text-[10px] font-bold text-[#B8860B] uppercase">{opp.type}</span>
                          <h4 className="font-bold text-sm text-[#2E1B0F] dark:text-white line-clamp-2">{opp.title}</h4>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs divide-y divide-gray-200/60 dark:divide-gray-800">
                        <div className="pt-2">
                          <strong className="text-gray-500 block">Institución:</strong>
                          <span className="text-gray-800 dark:text-gray-200">{opp.institution}</span>
                        </div>
                        <div className="pt-2">
                          <strong className="text-gray-500 block">Modalidad & País:</strong>
                          <span className="text-gray-800 dark:text-gray-200">{opp.modality} — {opp.country}</span>
                        </div>
                        <div className="pt-2">
                          <strong className="text-gray-500 block">Fecha Límite:</strong>
                          <span className="text-gray-800 dark:text-gray-200">{opp.deadline}</span>
                        </div>
                        <div className="pt-2">
                          <strong className="text-gray-500 block">Nivel Requerido:</strong>
                          <span className="text-gray-800 dark:text-gray-200">{opp.requiredLevel}</span>
                        </div>
                        <div className="pt-2">
                          <strong className="text-gray-500 block">Contacto Oficial:</strong>
                          <span className="text-gray-800 dark:text-gray-200">{opp.contactEmail}</span>
                        </div>
                      </div>

                      <a
                        href={opp.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full text-center py-2 rounded-xl bg-[#B8860B] text-white font-bold text-xs"
                      >
                        Ir a la Convocatoria
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
