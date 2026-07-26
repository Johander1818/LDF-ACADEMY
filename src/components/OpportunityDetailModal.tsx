import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar,
  MapPin,
  ExternalLink,
  Mail,
  Globe,
  Share2,
  Heart,
  Bell,
  CheckCircle2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Building,
  GraduationCap
} from 'lucide-react';

export const OpportunityDetailModal: React.FC = () => {
  const {
    selectedOpportunityDetail,
    setSelectedOpportunityDetail,
    favorites,
    toggleFavorite,
    reminders,
    toggleReminder,
  } = useApp();

  if (!selectedOpportunityDetail) return null;

  const opp = selectedOpportunityDetail;
  const isFav = favorites.includes(opp.id);
  const isRem = reminders.includes(opp.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1C120C] w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-200 dark:border-[#2E1B0F] p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-gray-200 dark:border-[#2E1B0F] pb-4">
          <div className="flex items-center space-x-4">
            <img
              src={opp.logoUrl}
              alt={opp.institution}
              className="w-14 h-14 rounded-2xl object-cover border border-gray-200 dark:border-[#2E1B0F]"
            />
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#B8860B]/10 text-[#B8860B] font-bold text-xs uppercase tracking-wider">
                {opp.type}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white mt-1">
                {opp.title}
              </h3>
              <p className="text-xs font-semibold text-gray-500 flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>{opp.institution}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedOpportunityDetail(null)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#251810] text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium">
          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#251810] border border-gray-200/80 dark:border-[#3A2214] flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#B8860B]" />
            <div>
              <span className="text-gray-400 block text-[10px]">País / Modalidad</span>
              <span className="text-gray-800 dark:text-gray-200 font-bold">{opp.country} ({opp.modality})</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#251810] border border-gray-200/80 dark:border-[#3A2214] flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-[#B8860B]" />
            <div>
              <span className="text-gray-400 block text-[10px]">Fecha Límite</span>
              <span className="text-gray-800 dark:text-gray-200 font-bold">{opp.deadline}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#251810] border border-gray-200/80 dark:border-[#3A2214] flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-[#B8860B]" />
            <div>
              <span className="text-gray-400 block text-[10px]">Nivel Requerido</span>
              <span className="text-gray-800 dark:text-gray-200 font-bold">{opp.requiredLevel}</span>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="space-y-2">
          <h4 className="font-bold text-sm text-[#2E1B0F] dark:text-white uppercase tracking-wider">
            Descripción Detallada
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {opp.description}
          </p>
        </div>

        {/* Verified Contact Info (RF-OPO-02) */}
        <div className="p-4 rounded-2xl bg-[#B8860B]/5 dark:bg-[#B8860B]/10 border border-[#B8860B]/30 space-y-3">
          <h4 className="font-bold text-xs text-[#B8860B] dark:text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Contacto e Información Verificada de la Institución</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 dark:text-gray-300">
            <p className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Correo Oficial: <strong>{opp.contactEmail}</strong></span>
            </p>
            <p className="flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-[#B8860B]" />
              <a href={opp.officialUrl} target="_blank" rel="noreferrer" className="underline hover:text-[#B8860B]">
                Sitio Web Oficial
              </a>
            </p>
          </div>

          {opp.socialLinks && (
            <div className="flex items-center space-x-3 pt-2 text-xs">
              <span className="text-gray-500 font-medium">Redes Sociales:</span>
              {opp.socialLinks.linkedin && (
                <a href={opp.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-[#B8860B] hover:underline flex items-center space-x-1">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {opp.socialLinks.twitter && (
                <a href={opp.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-[#B8860B] hover:underline flex items-center space-x-1">
                  <Twitter className="w-3.5 h-3.5" />
                  <span>X (Twitter)</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-gray-200 dark:border-[#2E1B0F] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleFavorite(opp.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center space-x-2 transition-colors ${
                isFav
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFav ? 'Guardado' : 'Guardar'}</span>
            </button>

            <button
              onClick={() => toggleReminder(opp.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center space-x-2 transition-colors ${
                isRem
                  ? 'bg-[#B8860B]/20 text-[#B8860B]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Bell className={`w-4 h-4 ${isRem ? 'fill-[#B8860B]' : ''}`} />
              <span>{isRem ? 'Recordatorio activo' : 'Recordatorio'}</span>
            </button>
          </div>

          <a
            href={opp.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-xs shadow-lg hover:brightness-110 flex items-center justify-center space-x-2"
          >
            <span>Ir a la Convocatoria Oficial</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
