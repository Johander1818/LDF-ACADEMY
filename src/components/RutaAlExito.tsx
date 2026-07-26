import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionnaireAnswers, RoadmapResult } from '../types';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  RotateCcw,
  Save,
  Check,
  Globe,
  MapPin,
  Briefcase,
  HeartPulse,
  Scale,
  Cpu,
  Building2,
  Leaf,
  Palette,
  ExternalLink
} from 'lucide-react';

export const RutaAlExito: React.FC = () => {
  const { opportunities, setSavedRoadmap, savedRoadmap, setActiveTab, setSelectedOpportunityDetail } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [answers, setAnswers] = useState<QuestionnaireAnswers & { scopePref: string }>({
    age: '18 - 22 años',
    level: 'Universitario (en curso)',
    career: 'Medicina y Ciencias de la Salud',
    scopePref: 'Ambas (Nacional RD e Internacional)',
    english: 'Intermedio (B1 / B2)',
    skills: ['Investigación Científica', 'Liderazgo Comunitario'],
    modality: 'Presencial',
  });

  const [generatedRoadmap, setGeneratedRoadmap] = useState<RoadmapResult | null>(savedRoadmap);

  const totalSteps = 6;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      generateCustomRoadmap();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleSkill = (skill: string) => {
    setAnswers((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill],
      };
    });
  };

  const careerOptions = [
    { name: 'Medicina y Ciencias de la Salud', icon: HeartPulse, desc: 'Medicina, Odontología, Bioanálisis, Salud Pública, Enfermería' },
    { name: 'Tecnología, Sistemas e IA', icon: Cpu, desc: 'Ing. de Software, Ciberseguridad, Inteligencia Artificial, Redes' },
    { name: 'Derecho, Leyes y Ciencias Políticas', icon: Scale, desc: 'Derecho Constitucional, Diplomacia, Relaciones Internacionales' },
    { name: 'Ingeniería, Arquitectura y Mecatrónica', icon: Building2, desc: 'Civil, Industrial, Mecatrónica, Eléctrica, Arquitectura' },
    { name: 'Negocios, Finanzas y Emprendimiento', icon: Briefcase, desc: 'Economía, Administración, Finanzas, Mercadeo Digital' },
    { name: 'Agronomía, Biotecnología y Medio Ambiente', icon: Leaf, desc: 'Agronomía de Precisión, Veterinaria, Ecología, Energías Limpias' },
    { name: 'Educación, Pedagogía y Psicología', icon: BookOpen, desc: 'Educación Básica y Secundaria, Psicología Clínica u Organizacional' },
    { name: 'Artes, Diseño, Comunicación y Cine', icon: Palette, desc: 'Diseño Gráfico, Publicidad, Periodismo, Producción Audiovisual' },
  ];

  // Generate customized roadmap output
  const generateCustomRoadmap = () => {
    // Filter matching opportunities based on chosen career and scope
    const keyword = answers.career.split(' ')[0].toLowerCase();
    const matchingOpps = opportunities.filter((opp) => {
      if (opp.status === 'archivada') return false;
      if (answers.scopePref.includes('Nacional') && opp.country === 'República Dominicana') return true;
      if (answers.scopePref.includes('Internacional') && opp.country !== 'República Dominicana') return true;
      return (
        opp.title.toLowerCase().includes(keyword) ||
        opp.description.toLowerCase().includes(keyword) ||
        opp.type === 'Beca'
      );
    }).slice(0, 4);

    const isRD = answers.scopePref.includes('Nacional') || answers.scopePref.includes('Ambas');

    const roadmapData: RoadmapResult = {
      answers,
      roadmapSteps: [
        {
          phase: 'Fase 1: Fortalecimiento Académico y Perfil Nacional (RD)',
          duration: 'Meses 1 - 3',
          title: `Optimización de Competencias en ${answers.career}`,
          description: `Consolidar el promedio académico en nivel ${answers.level} e inscribirse en certificaciones oficiales para potenciar el expediente en República Dominicana.`,
          actionableItems: [
            isRD ? 'Postular al Programa Beca Tu Futuro o Becas de Excelencia Popular/Banreservas' : 'Completar cursos de nivelación técnica',
            `Participar en proyectos de investigación o talleres en ${answers.career}`,
            'Diseñar CV académico estructurado con logros cuantificables',
          ],
        },
        {
          phase: 'Fase 2: Idiomas, Experiencia Aplicada y Redes',
          duration: 'Meses 4 - 6',
          title: 'Desarrollo de Idiomas e Impacto Social',
          description: `Elevar el dominio de inglés a nivel B2/C1 y vincularse a voluntariados o pasantías en ${answers.career}.`,
          actionableItems: [
            'Avanzar 45 min diarios en preparación de exámenes internacionales de idioma (TOEFL/IELTS)',
            'Sumarse a voluntariados comunitarios en República Dominicana o iniciativas virtuales internacionales',
            'Conectar con mentores y exbecarios de la comunidad Líderes del Futuro',
          ],
        },
        {
          phase: 'Fase 3: Postulación Abierta a Becas de Alto Impacto',
          duration: 'Meses 7 - 12',
          title: 'Postulación Oficial a Convocatorias Nacionales e Internacionales',
          description: `Presentar solicitudes completas en la Convocatoria MESCYT Internacional, Fulbright-MESCYT, Chevening o Santander.`,
          actionableItems: [
            'Redactar ensayos de motivación alineados al ODS 4 y al desarrollo dominicano',
            'Simular entrevistas de selección con LDF Assistant',
            'Revisar el expediente con los asesores oficiales antes del cierre de convocatoria',
          ],
        },
      ],
      recommendedOpportunityIds: matchingOpps.map((r) => r.id),
      generatedAt: new Date().toISOString().split('T')[0],
    };

    setGeneratedRoadmap(roadmapData);
    setSavedRoadmap(roadmapData);
  };

  const handleRetake = () => {
    setCurrentStep(1);
    setGeneratedRoadmap(null);
  };

  return (
    <div className="w-full py-12 lg:py-16 bg-white dark:bg-[#130D08] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#B8860B] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Orientación Académica Integral • Todas las Carreras</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2E1B0F] dark:text-white font-[#Outfit] tracking-tight">
            Ruta al <span className="gold-gradient-text">Éxito</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl mx-auto">
            Diagnóstico inteligente para construir tu perfil académico tanto a nivel de <strong>República Dominicana</strong> como a nivel <strong>Internacional</strong>, adaptado a tu carrera específica.
          </p>
        </div>

        {/* If Roadmap is generated, render Result View */}
        {generatedRoadmap ? (
          <div className="p-8 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-[#B8860B]/40 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-[#2E1B0F]">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
                  Perfil Generado • {generatedRoadmap.generatedAt}
                </span>
                <h3 className="text-2xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                  Tu Plan Personalizado para {generatedRoadmap.answers.career}
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRetake}
                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-[#251810] text-gray-800 dark:text-gray-200 font-bold text-xs flex items-center space-x-1 hover:bg-gray-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repetir Diagnóstico</span>
                </button>

                <button
                  onClick={() => setActiveTab('mi-futuro')}
                  className="px-5 py-2 rounded-full bg-[#B8860B] text-white font-bold text-xs flex items-center space-x-1.5 shadow-md hover:bg-[#D4AF37]"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Ver en Mi Futuro</span>
                </button>
              </div>
            </div>

            {/* Profile Summary Badge */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Área de Carrera</span>
                <span className="font-bold text-[#2E1B0F] dark:text-white">{answers.career}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Enfoque Geográfico</span>
                <span className="font-bold text-[#B8860B] dark:text-[#D4AF37]">{answers.scopePref}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Nivel Académico</span>
                <span className="font-bold text-[#2E1B0F] dark:text-white">{answers.level}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Nivel de Inglés</span>
                <span className="font-bold text-[#2E1B0F] dark:text-white">{answers.english}</span>
              </div>
            </div>

            {/* Recommended Opportunities List based on Career */}
            <div className="space-y-4 pt-2">
              <h4 className="text-lg font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#B8860B]" />
                <span>Oportunidades Recomendadas para tu Perfil</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedRoadmap.recommendedOpportunityIds.map((id) => {
                  const opp = opportunities.find((o) => o.id === id);
                  if (!opp) return null;
                  return (
                    <div
                      key={opp.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] flex flex-col justify-between space-y-3 hover:border-[#B8860B]"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">
                          {opp.institution} • {opp.country}
                        </span>
                        <h5 className="font-bold text-sm text-[#2E1B0F] dark:text-white font-[#Outfit]">
                          {opp.title}
                        </h5>
                      </div>
                      <button
                        onClick={() => setSelectedOpportunityDetail(opp)}
                        className="py-1.5 px-3 rounded-xl bg-[#B8860B] text-white font-bold text-xs flex items-center justify-center space-x-1"
                      >
                        <span>Ver Oportunidad</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Roadmap Timeline Steps */}
            <div className="space-y-6 pt-4">
              <h4 className="text-lg font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                Fases de Acción Recomendadas
              </h4>

              {generatedRoadmap.roadmapSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                    <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">
                      {step.phase} ({step.duration})
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#B8860B]/10 text-[#B8860B] font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Pasos Concretos:</span>
                    <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                      {step.actionableItems.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Step-by-Step Guided Form */
          <div className="p-8 rounded-3xl bg-gray-50 dark:bg-[#1C120C] border border-gray-200 dark:border-[#2E1B0F] shadow-xl space-y-8">
            {/* Step Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>Paso {currentStep} de {totalSteps}</span>
                <span className="text-[#B8860B]">
                  {Math.round((currentStep / totalSteps) * 100)}% Completado
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-[#251810] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Nivel Académico */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                  1. ¿Cuál es tu nivel académico actual?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Secundaria / Bachillerato',
                    'Técnico Superior / Tecnólogo',
                    'Universitario (en curso)',
                    'Egresado / Graduado de Licenciatura',
                    'Profesional buscando Posgrado / Maestría',
                  ].map((level) => (
                    <button
                      key={level}
                      onClick={() => setAnswers({ ...answers, level })}
                      className={`p-4 rounded-2xl text-left text-sm font-semibold border transition-all ${
                        answers.level === level
                          ? 'bg-[#B8860B]/10 border-[#B8860B] text-[#B8860B] dark:text-[#D4AF37]'
                          : 'bg-white dark:bg-[#251810] border-gray-200 dark:border-[#3A2214] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Carrera de Interés Universitaria (TODAS LAS CARRERAS) */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                  2. Selecciona tu Carrera o Área de Conocimiento Universitaria:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {careerOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = answers.career === opt.name;
                    return (
                      <button
                        key={opt.name}
                        onClick={() => setAnswers({ ...answers, career: opt.name })}
                        className={`p-4 rounded-2xl text-left border transition-all space-y-1 ${
                          isSelected
                            ? 'bg-[#B8860B]/10 border-[#B8860B] text-[#B8860B] dark:text-[#D4AF37]'
                            : 'bg-white dark:bg-[#251810] border-gray-200 dark:border-[#3A2214] text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-5 h-5 text-[#B8860B] shrink-0" />
                          <span className="font-bold text-sm">{opt.name}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 pl-7">{opt.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Enfoque Geográfico (República Dominicana vs Internacional) */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                  3. ¿En qué ámbito buscas oportunidades académicas?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Nacional (República Dominicana)', desc: 'MESCYT Nacional, ITLA, Banreservas, Excelencia Popular, UASD, PUCMM' },
                    { name: 'Internacional', desc: 'Becas en España, EE. UU., Reino Unido, Alemania, OEA, Fulbright, Chevening' },
                    { name: 'Ambas (Nacional RD e Internacional)', desc: 'Maximizar opciones locales e internacionales simultáneamente' },
                  ].map((scope) => (
                    <button
                      key={scope.name}
                      onClick={() => setAnswers({ ...answers, scopePref: scope.name })}
                      className={`p-5 rounded-2xl text-left border transition-all space-y-2 ${
                        answers.scopePref === scope.name
                          ? 'bg-[#B8860B]/10 border-[#B8860B] text-[#B8860B] dark:text-[#D4AF37]'
                          : 'bg-white dark:bg-[#251810] border-gray-200 dark:border-[#3A2214] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="font-bold text-sm block">{scope.name}</span>
                      <p className="text-[11px] text-gray-500">{scope.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Dominio de Idioma */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                  4. ¿Cuál es tu nivel actual de inglés u otros idiomas?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Básico (A1 / A2) — Enfocado en aprender',
                    'Intermedio (B1 / B2) — Conversacional',
                    'Avanzado / Fluido (C1 / C2) — Académico',
                    'Español nativo (buscando ofertas hispanas o con nivelación)',
                  ].map((eng) => (
                    <button
                      key={eng}
                      onClick={() => setAnswers({ ...answers, english: eng })}
                      className={`p-4 rounded-2xl text-left text-sm font-semibold border transition-all ${
                        answers.english === eng
                          ? 'bg-[#B8860B]/10 border-[#B8860B] text-[#B8860B] dark:text-[#D4AF37]'
                          : 'bg-white dark:bg-[#251810] border-gray-200 dark:border-[#3A2214] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {eng}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Habilidades a desarrollar */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                  5. Selecciona las habilidades prioritarias que deseas fortalecer:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Investigación Científica',
                    'Liderazgo Comunitario',
                    'Redacción de Ensayos para Becas',
                    'Desarrollo de Software / Análisis de Datos',
                    'Gestión de Proyectos Públicos',
                    'Inglés Académico Intensivo',
                  ].map((skill) => {
                    const selected = answers.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${
                          selected
                            ? 'bg-[#B8860B]/10 border-[#B8860B] text-[#B8860B] dark:text-[#D4AF37]'
                            : 'bg-white dark:bg-[#251810] border-gray-200 dark:border-[#3A2214] text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span>{skill}</span>
                        {selected && <Check className="w-4 h-4 text-[#B8860B]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 6: Modalidad Preferida */}
            {currentStep === 6 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                  6. ¿Cuál es tu preferencia de modalidad educativa?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Presencial (Intercambio o Becas de Movilidad)',
                    'Virtual / Remoto 100%',
                    'Híbrido (Ambas modalidades)',
                  ].map((mod) => (
                    <button
                      key={mod}
                      onClick={() => setAnswers({ ...answers, modality: mod })}
                      className={`p-5 rounded-2xl text-left text-xs font-bold border transition-all ${
                        answers.modality === mod
                          ? 'bg-[#B8860B]/10 border-[#B8860B] text-[#B8860B] dark:text-[#D4AF37]'
                          : 'bg-white dark:bg-[#251810] border-gray-200 dark:border-[#3A2214] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-[#2E1B0F]">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-2.5 rounded-full bg-gray-200 dark:bg-[#251810] text-gray-700 dark:text-gray-300 text-xs font-bold disabled:opacity-40 flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNextStep}
                className="px-8 py-3 rounded-full bg-[#B8860B] hover:bg-[#D4AF37] text-white text-xs font-bold flex items-center space-x-2 shadow-md"
              >
                <span>{currentStep === totalSteps ? 'Construir Perfil y Ruta' : 'Siguiente'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
