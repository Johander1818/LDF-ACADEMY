import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Story } from '../types';
import {
  Sparkles,
  BookOpen,
  Clock,
  User,
  Star,
  ArrowRight,
  Share2,
  X,
  Bookmark
} from 'lucide-react';

export const Inspirate: React.FC = () => {
  const { stories, selectedStoryDetail, setSelectedStoryDetail } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('Todas');

  const storyOfTheWeek = stories.find((s) => s.isStoryOfTheWeek) || stories[0];

  const categories = ['Todas', 'Historias de Beca', 'Consejos de Postulación', 'Desarrollo Profesional'];

  const filteredStories = stories.filter((s) => {
    if (s.status === 'archivado') return false;
    if (activeCategory === 'Todas') return true;
    return s.category === activeCategory;
  });

  return (
    <div className="w-full py-12 lg:py-16 bg-white dark:bg-[#130D08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#B8860B] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Contenido Editorial Cinematográfico</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2E1B0F] dark:text-white font-[#Outfit] tracking-tight">
            Inspírate y <span className="gold-gradient-text">Aprende</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            Historias reales de éxito, hábitos de estudio, guías de entrevistas y aprendizajes de jóvenes que alcanzaron sus becas en universidades de prestigio.
          </p>
        </div>

        {/* Featured Card: "La Historia de la Semana" (RF-INS-03) */}
        {storyOfTheWeek && (
          <div className="relative rounded-3xl overflow-hidden bg-[#1C120C] text-white border border-[#B8860B]/40 shadow-2xl group cursor-pointer"
               onClick={() => setSelectedStoryDetail(storyOfTheWeek)}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={storyOfTheWeek.imageUrl}
                  alt={storyOfTheWeek.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute top-4 left-4 bg-[#B8860B] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span>Historia de la Semana</span>
                </div>
              </div>

              <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    {storyOfTheWeek.category}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold font-[#Outfit] text-white leading-tight group-hover:text-[#D4AF37] transition-colors">
                    {storyOfTheWeek.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {storyOfTheWeek.subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={storyOfTheWeek.authorAvatar}
                      alt={storyOfTheWeek.author}
                      className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-white">{storyOfTheWeek.author}</p>
                      <p className="text-gray-400">{storyOfTheWeek.authorRole}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#D4AF37] flex items-center space-x-1">
                    <span>Leer Historia Completa</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#B8860B] text-white shadow-md'
                  : 'bg-gray-100 dark:bg-[#1C120C] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stories Grid (RF-INS-01 Large Visual Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStoryDetail(story)}
              className="rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200/80 dark:border-[#2E1B0F] overflow-hidden hover:border-[#B8860B]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {story.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center text-xs text-gray-400 space-x-3">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>{story.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{story.publishedAt}</span>
                  </div>

                  <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white group-hover:text-[#B8860B] transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 dark:border-[#2E1B0F] mt-4 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <img
                    src={story.authorAvatar}
                    alt={story.author}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="font-semibold text-gray-700 dark:text-gray-300 text-[11px]">{story.author}</span>
                </div>

                <span className="text-[#B8860B] font-bold group-hover:underline flex items-center space-x-1">
                  <span>Leer más</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Story Full Modal */}
        {selectedStoryDetail && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1C120C] w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-200 dark:border-[#2E1B0F] p-6 sm:p-10 max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2E1B0F] pb-4">
                <span className="px-3 py-1 rounded-full bg-[#B8860B]/10 text-[#B8860B] text-xs font-bold uppercase tracking-wider">
                  {selectedStoryDetail.category}
                </span>
                <button
                  onClick={() => setSelectedStoryDetail(null)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#251810] text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-4xl font-extrabold font-[#Outfit] text-[#2E1B0F] dark:text-white leading-tight">
                  {selectedStoryDetail.title}
                </h2>

                <div className="flex items-center space-x-4 text-xs text-gray-500 border-b border-gray-100 dark:border-[#2E1B0F] pb-4">
                  <div className="flex items-center space-x-2">
                    <img src={selectedStoryDetail.authorAvatar} alt={selectedStoryDetail.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">{selectedStoryDetail.author}</p>
                      <p className="text-[10px]">{selectedStoryDetail.authorRole}</p>
                    </div>
                  </div>
                  <span>•</span>
                  <span>{selectedStoryDetail.publishedAt}</span>
                  <span>•</span>
                  <span>{selectedStoryDetail.readTime}</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-64 sm:h-80">
                <img src={selectedStoryDetail.imageUrl} alt={selectedStoryDetail.title} className="w-full h-full object-cover" />
              </div>

              <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                {selectedStoryDetail.content}
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-[#2E1B0F] flex justify-end">
                <button
                  onClick={() => setSelectedStoryDetail(null)}
                  className="px-6 py-2.5 rounded-full bg-[#B8860B] text-white font-bold text-xs"
                >
                  Cerrar Lectura
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
