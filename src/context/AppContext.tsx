import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Opportunity,
  Story,
  ContactMessage,
  PersonalGoal,
  CourseProgress,
  RoadmapResult,
  UserRole,
} from '../types';
import { INITIAL_OPPORTUNITIES } from '../data/opportunities';
import { INITIAL_STORIES } from '../data/stories';

export type ActiveTab =
  | 'inicio'
  | 'sobre-nosotros'
  | 'oportunidades'
  | 'radar'
  | 'ruta'
  | 'inspirate'
  | 'ldf-assistant'
  | 'mi-futuro'
  | 'contacto';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  opportunities: Opportunity[];
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'createdAt'>) => void;
  updateOpportunity: (id: string, updated: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleReminder: (id: string) => void;
  favorites: string[];
  reminders: string[];

  stories: Story[];
  addStory: (story: Omit<Story, 'id' | 'publishedAt'>) => void;
  updateStory: (id: string, updated: Partial<Story>) => void;
  setStoryOfTheWeek: (id: string) => void;

  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'sentAt' | 'status'>) => void;
  replyContactMessage: (id: string, replyText: string) => void;

  personalGoals: PersonalGoal[];
  addPersonalGoal: (goal: Omit<PersonalGoal, 'id'>) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;

  coursesProgress: CourseProgress[];
  updateCourseProgress: (courseId: string, completedLessons: number) => void;

  savedRoadmap: RoadmapResult | null;
  setSavedRoadmap: (roadmap: RoadmapResult | null) => void;

  // Country filter bridge for Radar
  selectedCountryFilter: string;
  setSelectedCountryFilter: (country: string) => void;

  // Comparison drawer state
  comparedOpportunityIds: string[];
  toggleCompareOpportunity: (id: string) => void;
  clearComparedOpportunities: () => void;

  // Modals state
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalInitialMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  selectedOpportunityDetail: Opportunity | null;
  setSelectedOpportunityDetail: (opp: Opportunity | null) => void;
  selectedStoryDetail: Story | null;
  setSelectedStoryDetail: (story: Story | null) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('ldf_theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ldf_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ldf_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // User State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ldf_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-guest-1',
      name: 'Camila Rodríguez',
      email: 'camila.rodriguez@ejemplo.com',
      role: 'estudiante',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      educationalLevel: 'Universitario (3.er año)',
      interestArea: 'Ciencia de Datos e Inteligencia Artificial',
      registeredAt: '2026-01-15'
    };
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ldf_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ldf_user');
    }
  }, [currentUser]);

  const switchRole = (_role: UserRole) => {
    if (!currentUser) {
      setCurrentUser({
        id: 'usr-estudiante-demo',
        name: 'Estudiante LDF',
        email: 'estudiante@ldf.org',
        role: 'estudiante',
        registeredAt: '2026-01-01'
      });
    } else {
      setCurrentUser({
        ...currentUser,
        role: 'estudiante',
        name: currentUser.name || 'Estudiante LDF'
      });
    }
  };

  // Opportunities
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem('ldf_opportunities');
    if (!saved) return INITIAL_OPPORTUNITIES;
    try {
      const parsed: Opportunity[] = JSON.parse(saved);
      const parsedIds = new Set(parsed.map((o) => o.id));
      const missing = INITIAL_OPPORTUNITIES.filter((o) => !parsedIds.has(o.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_OPPORTUNITIES;
    }
  });

  useEffect(() => {
    localStorage.setItem('ldf_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  // Favorites & Reminders
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('ldf_favorites');
    return saved ? JSON.parse(saved) : ['opp-1', 'opp-4'];
  });

  const [reminders, setReminders] = useState<string[]>(() => {
    const saved = localStorage.getItem('ldf_reminders');
    return saved ? JSON.parse(saved) : ['opp-2'];
  });

  useEffect(() => {
    localStorage.setItem('ldf_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ldf_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addOpportunity = (opp: Omit<Opportunity, 'id' | 'createdAt'>) => {
    const newOpp: Opportunity = {
      ...opp,
      id: `opp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setOpportunities((prev) => [newOpp, ...prev]);
  };

  const updateOpportunity = (id: string, updated: Partial<Opportunity>) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, ...updated } : opp))
    );
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
  };

  // Stories
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('ldf_stories');
    if (!saved) return INITIAL_STORIES;
    try {
      const parsed: Story[] = JSON.parse(saved);
      const parsedIds = new Set(parsed.map((s) => s.id));
      const missing = INITIAL_STORIES.filter((s) => !parsedIds.has(s.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_STORIES;
    }
  });

  useEffect(() => {
    localStorage.setItem('ldf_stories', JSON.stringify(stories));
  }, [stories]);

  const addStory = (storyData: Omit<Story, 'id' | 'publishedAt'>) => {
    const newStory: Story = {
      ...storyData,
      id: `story-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0]
    };
    setStories((prev) => [newStory, ...prev]);
  };

  const updateStory = (id: string, updated: Partial<Story>) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const setStoryOfTheWeek = (id: string) => {
    setStories((prev) =>
      prev.map((s) => ({
        ...s,
        isStoryOfTheWeek: s.id === id
      }))
    );
  };

  // Contact Messages & Escalations
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('ldf_messages');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'msg-1',
            name: 'Mateo Fernández',
            email: 'mateo.f@ejemplo.com',
            subject: 'Consulta sobre requisitos de beca Fulbright',
            message: 'Hola, quisiera confirmar si el requisito de promedio universitario es mínimo de 8.5 o 9.0 para la convocatoria 2026.',
            status: 'pendiente',
            sentAt: '2026-07-22 14:30'
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem('ldf_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  const addContactMessage = (msgData: Omit<ContactMessage, 'id' | 'sentAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'pendiente'
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const replyContactMessage = (id: string, replyText: string) => {
    setContactMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, status: 'atendido', replyText } : msg
      )
    );
  };

  // Personal Goals
  const [personalGoals, setPersonalGoals] = useState<PersonalGoal[]>(() => {
    const saved = localStorage.getItem('ldf_goals');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'goal-1',
            title: 'Alcanzar Nivel B2 de Inglés para Beca Internacional',
            category: 'Idiomas',
            targetDate: '2026-11-30',
            progressPercentage: 65,
            milestones: [
              { id: 'm1', title: 'Completar examen diagnóstico de vocabulario', completed: true },
              { id: 'm2', title: 'Estudiar 30 min diarios en app interactiva', completed: true },
              { id: 'm3', title: 'Aprobar simulacro de examen IELTS/TOEFL', completed: false }
            ]
          },
          {
            id: 'goal-2',
            title: 'Obtener Certificación Profesional Google en Análisis de Datos',
            category: 'Certificación Tech',
            targetDate: '2026-09-15',
            progressPercentage: 40,
            milestones: [
              { id: 'm2-1', title: 'Curso 1: Aspectos básicos del análisis de datos', completed: true },
              { id: 'm2-2', title: 'Curso 2: Tomar decisiones basadas en datos', completed: false },
              { id: 'm2-3', title: 'Proyecto final de portafolio en R y SQL', completed: false }
            ]
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem('ldf_goals', JSON.stringify(personalGoals));
  }, [personalGoals]);

  const addPersonalGoal = (goalData: Omit<PersonalGoal, 'id'>) => {
    const newGoal: PersonalGoal = {
      ...goalData,
      id: `goal-${Date.now()}`
    };
    setPersonalGoals((prev) => [...prev, newGoal]);
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setPersonalGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;
        const updatedMilestones = goal.milestones.map((m) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedMilestones.filter((m) => m.completed).length;
        const progressPercentage = Math.round(
          (completedCount / updatedMilestones.length) * 100
        );
        return {
          ...goal,
          milestones: updatedMilestones,
          progressPercentage
        };
      })
    );
  };

  // Courses Progress
  const [coursesProgress, setCoursesProgress] = useState<CourseProgress[]>(() => {
    const saved = localStorage.getItem('ldf_courses');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'crs-1',
            title: 'Fundamentos de Inteligencia Artificial Generativa',
            institution: 'Microsoft Learn',
            progressPercentage: 75,
            totalLessons: 12,
            completedLessons: 9,
            lastAccessed: 'Ayer',
            certificateAvailable: false
          },
          {
            id: 'crs-2',
            title: 'Ciberseguridad y Redes para Principiantes',
            institution: 'Cisco Networking Academy',
            progressPercentage: 100,
            totalLessons: 8,
            completedLessons: 8,
            lastAccessed: 'Hace 3 días',
            certificateAvailable: true
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem('ldf_courses', JSON.stringify(coursesProgress));
  }, [coursesProgress]);

  const updateCourseProgress = (courseId: string, completedLessons: number) => {
    setCoursesProgress((prev) =>
      prev.map((crs) => {
        if (crs.id !== courseId) return crs;
        const progressPercentage = Math.round(
          (completedLessons / crs.totalLessons) * 100
        );
        return {
          ...crs,
          completedLessons,
          progressPercentage,
          lastAccessed: 'Hoy',
          certificateAvailable: progressPercentage === 100
        };
      })
    );
  };

  // Saved Roadmap
  const [savedRoadmap, setSavedRoadmap] = useState<RoadmapResult | null>(() => {
    const saved = localStorage.getItem('ldf_roadmap');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (savedRoadmap) {
      localStorage.setItem('ldf_roadmap', JSON.stringify(savedRoadmap));
    } else {
      localStorage.removeItem('ldf_roadmap');
    }
  }, [savedRoadmap]);

  // Country filter bridge
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('Todos');

  // Comparison State
  const [comparedOpportunityIds, setComparedOpportunityIds] = useState<string[]>([]);

  const toggleCompareOpportunity = (id: string) => {
    setComparedOpportunityIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const clearComparedOpportunities = () => setComparedOpportunityIds([]);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'login' | 'register'>('login');

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const [selectedOpportunityDetail, setSelectedOpportunityDetail] = useState<Opportunity | null>(null);
  const [selectedStoryDetail, setSelectedStoryDetail] = useState<Story | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentUser,
        setCurrentUser,
        switchRole,
        isDarkMode,
        toggleDarkMode,
        opportunities,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        toggleFavorite,
        toggleReminder,
        favorites,
        reminders,
        stories,
        addStory,
        updateStory,
        setStoryOfTheWeek,
        contactMessages,
        addContactMessage,
        replyContactMessage,
        personalGoals,
        addPersonalGoal,
        toggleMilestone,
        coursesProgress,
        updateCourseProgress,
        savedRoadmap,
        setSavedRoadmap,
        selectedCountryFilter,
        setSelectedCountryFilter,
        comparedOpportunityIds,
        toggleCompareOpportunity,
        clearComparedOpportunities,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalInitialMode,
        openAuthModal,
        selectedOpportunityDetail,
        setSelectedOpportunityDetail,
        selectedStoryDetail,
        setSelectedStoryDetail,
        isAssistantOpen,
        setIsAssistantOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
