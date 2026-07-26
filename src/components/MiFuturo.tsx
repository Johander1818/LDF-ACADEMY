import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Heart,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  Target,
  Sparkles,
  Bot,
  UserCheck,
  Award
} from 'lucide-react';

export const MiFuturo: React.FC = () => {
  const {
    currentUser,
    opportunities,
    favorites,
    toggleFavorite,
    reminders,
    toggleReminder,
    personalGoals,
    addPersonalGoal,
    toggleMilestone,
    coursesProgress,
    updateCourseProgress,
    savedRoadmap,
    setSelectedOpportunityDetail,
    setIsAuthModalOpen,
    setActiveTab,
  } = useApp();

  const [activeTab, setActiveTabLocal] = useState<'favoritos' | 'progreso' | 'roadmap' | 'metas' | 'recordatorios'>('favoritos');

  // New goal modal input state
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Académico');
  const [newGoalDate, setNewGoalDate] = useState('2026-12-31');

  if (!currentUser) {
    return (
      <div className="w-full py-20 bg-white dark:bg-[#130D08] flex items-center justify-center text-center px-4">
        <div className="max-w-md p-8 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200 dark:border-[#2E1B0F] space-y-4 shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B]">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
            Panel Personal "Mi Futuro"
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Inicia sesión o regístrate para acceder a tus becas guardadas, seguimiento de metas, progreso de cursos e historial de la Ruta al Éxito.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-3 rounded-full bg-[#B8860B] hover:bg-[#D4AF37] text-white font-bold text-sm shadow-md"
          >
            Iniciar Sesión / Registrarse
          </button>
        </div>
      </div>
    );
  }

  // Favorite Opportunities
  const favoriteOpps = opportunities.filter((o) => favorites.includes(o.id));

  // Reminder Opportunities
  const reminderOpps = opportunities.filter((o) => reminders.includes(o.id));

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    addPersonalGoal({
      title: newGoalTitle,
      category: newGoalCategory,
      targetDate: newGoalDate,
      progressPercentage: 0,
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Fase de preparación inicial', completed: false },
        { id: `m-${Date.now()}-2`, title: 'Ejecución y seguimiento de tareas', completed: false },
        { id: `m-${Date.now()}-3`, title: 'Evaluación de resultados finales', completed: false },
      ],
    });

    setNewGoalTitle('');
  };

  return (
    <div className="w-full py-12 lg:py-16 bg-white dark:bg-[#130D08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* User Banner Header: No student/admin images, strictly 'Hola Estudiante de LDF' */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#2E1B0F] via-[#4A2F1A] to-[#2E1B0F] text-white shadow-2xl border border-[#B8860B]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B8860B]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-[#Outfit] text-white">
                Hola Estudiante de LDF
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Líderes del Futuro • Plataforma Oficial de Educación y Liderazgo
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-black/30 p-4 rounded-2xl border border-white/10 text-xs">
            <div className="text-center px-3 border-r border-white/10">
              <span className="block font-bold text-lg text-[#D4AF37]">{favorites.length}</span>
              <span className="text-gray-400">Favoritos</span>
            </div>
            <div className="text-center px-3 border-r border-white/10">
              <span className="block font-bold text-lg text-[#D4AF37]">{personalGoals.length}</span>
              <span className="text-gray-400">Metas</span>
            </div>
            <div className="text-center px-3">
              <span className="block font-bold text-lg text-[#D4AF37]">{coursesProgress.length}</span>
              <span className="text-gray-400">Cursos</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-[#2E1B0F] pb-2 text-xs font-bold">
          {[
            { id: 'favoritos', label: `Becas Guardadas (${favoriteOpps.length})`, icon: <Heart className="w-4 h-4" /> },
            { id: 'progreso', label: `Mis Cursos en Curso (${coursesProgress.length})`, icon: <BookOpen className="w-4 h-4" /> },
            { id: 'roadmap', label: 'Mi Ruta al Éxito', icon: <Compass className="w-4 h-4" /> },
            { id: 'metas', label: `Mis Metas (${personalGoals.length})`, icon: <Target className="w-4 h-4" /> },
            { id: 'recordatorios', label: `Recordatorios (${reminderOpps.length})`, icon: <Calendar className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabLocal(tab.id as any)}
              className={`px-5 py-3 rounded-2xl flex items-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#B8860B] text-white shadow-md'
                  : 'bg-gray-50 dark:bg-[#1C120C] text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Favoritos */}
        {activeTab === 'favoritos' && (
          <div className="space-y-6">
            {favoriteOpps.length === 0 ? (
              <div className="p-12 text-center bg-gray-50 dark:bg-[#1C120C] rounded-3xl border text-gray-500 space-y-3">
                <Heart className="w-10 h-10 mx-auto text-gray-300" />
                <p className="font-semibold text-base">Aún no has guardado ninguna beca o curso en favoritos.</p>
                <button
                  onClick={() => setActiveTab('oportunidades')}
                  className="px-6 py-2 rounded-full bg-[#B8860B] text-white text-xs font-bold"
                >
                  Explorar Centro de Oportunidades
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteOpps.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-6 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200 dark:border-[#2E1B0F] space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">
                        {opp.institution}
                      </span>
                      <button
                        onClick={() => toggleFavorite(opp.id)}
                        className="text-rose-500 hover:scale-110 transition-transform"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>

                    <h4 className="font-bold text-base text-[#2E1B0F] dark:text-white line-clamp-2">
                      {opp.title}
                    </h4>

                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Fecha límite: <strong>{opp.deadline}</strong></p>
                      <p>Modalidad: <strong>{opp.modality}</strong> ({opp.country})</p>
                    </div>

                    <button
                      onClick={() => setSelectedOpportunityDetail(opp)}
                      className="w-full py-2 rounded-xl bg-[#B8860B] text-white font-bold text-xs"
                    >
                      Ver Ficha de Convocatoria
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Mis Cursos en Progreso */}
        {activeTab === 'progreso' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coursesProgress.map((crs) => (
              <div
                key={crs.id}
                className="p-6 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200 dark:border-[#2E1B0F] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#B8860B]">{crs.institution}</span>
                  <span className="text-xs font-bold text-gray-500">{crs.progressPercentage}% completado</span>
                </div>

                <h4 className="font-bold text-lg text-[#2E1B0F] dark:text-white font-[#Outfit]">{crs.title}</h4>

                {/* Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-[#251810] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] transition-all duration-300"
                    style={{ width: `${crs.progressPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                  <span>Lecciones: {crs.completedLessons} de {crs.totalLessons}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateCourseProgress(crs.id, Math.min(crs.completedLessons + 1, crs.totalLessons))}
                      className="px-3 py-1 rounded-lg bg-[#B8860B] text-white text-[11px] font-bold"
                    >
                      +1 Lección
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Ruta al Éxito */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            {savedRoadmap ? (
              <div className="p-8 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-[#B8860B]/40 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-[#2E1B0F]">
                  <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                    Hoja de Ruta Guardada
                  </h3>
                  <span className="text-xs text-gray-400">Generada el {savedRoadmap.generatedAt}</span>
                </div>

                <div className="space-y-4">
                  {savedRoadmap.roadmapSteps.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#251810] border space-y-2">
                      <span className="text-xs font-bold text-[#B8860B]">{step.phase}</span>
                      <h4 className="font-bold text-sm text-[#2E1B0F] dark:text-white">{step.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-gray-50 dark:bg-[#1C120C] rounded-3xl border text-gray-500 space-y-3">
                <Compass className="w-10 h-10 mx-auto text-gray-300" />
                <p className="font-semibold text-base">Aún no has realizado el cuestionario de Ruta al Éxito.</p>
                <button
                  onClick={() => setActiveTab('oportunidades')}
                  className="px-6 py-2 rounded-full bg-[#B8860B] text-white text-xs font-bold"
                >
                  Iniciar Cuestionario
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Mis Metas Personales */}
        {activeTab === 'metas' && (
          <div className="space-y-8">
            {/* Create Goal Form */}
            <form onSubmit={handleCreateGoal} className="p-6 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border space-y-4">
              <h4 className="font-bold text-sm text-[#2E1B0F] dark:text-white">Establecer Nueva Meta Personal</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="Ej. Postular a Beca Fulbright 2026..."
                  className="sm:col-span-2 p-3 rounded-2xl bg-white dark:bg-[#251810] border text-xs text-gray-800 dark:text-gray-200"
                />
                <button
                  type="submit"
                  className="py-3 rounded-2xl bg-[#B8860B] text-white font-bold text-xs shadow-md"
                >
                  Agregar Meta
                </button>
              </div>
            </form>

            {/* Goals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-6 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200 dark:border-[#2E1B0F] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#B8860B]">{goal.category}</span>
                    <span className="text-xs font-bold text-gray-500">{goal.progressPercentage}% completado</span>
                  </div>

                  <h4 className="font-bold text-base text-[#2E1B0F] dark:text-white font-[#Outfit]">{goal.title}</h4>

                  <div className="space-y-2 text-xs">
                    <span className="text-gray-400 font-semibold block">Hitos de Avance:</span>
                    {goal.milestones.map((m) => (
                      <label key={m.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={m.completed}
                          onChange={() => toggleMilestone(goal.id, m.id)}
                          className="rounded text-[#B8860B]"
                        />
                        <span className={m.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}>
                          {m.title}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Recordatorios */}
        {activeTab === 'recordatorios' && (
          <div className="space-y-4">
            {reminderOpps.map((opp) => (
              <div key={opp.id} className="p-5 rounded-2xl bg-gray-50 dark:bg-[#1C120C] border flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#B8860B] uppercase">{opp.institution}</span>
                  <h4 className="font-bold text-sm text-[#2E1B0F] dark:text-white">{opp.title}</h4>
                  <p className="text-gray-400">Fecha Límite: {opp.deadline}</p>
                </div>
                <button
                  onClick={() => toggleReminder(opp.id)}
                  className="text-gray-400 hover:text-rose-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
