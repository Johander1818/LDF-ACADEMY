export type UserRole = 'visitante' | 'estudiante';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photoUrl?: string;
  educationalLevel?: string;
  interestArea?: string;
  language?: string;
  registeredAt: string;
}

export type OpportunityType = 'Beca' | 'Curso' | 'Diplomado' | 'Voluntariado' | 'Concurso';
export type OpportunityModality = 'Virtual' | 'Presencial' | 'Híbrido';
export type OpportunityStatus = 'activa' | 'proxima' | 'permanente' | 'archivada';

export interface Opportunity {
  id: string;
  title: string;
  institution: string;
  logoUrl: string;
  type: OpportunityType;
  modality: OpportunityModality;
  country: string;
  countryCode: string;
  deadline: string; // YYYY-MM-DD or 'Sin fecha límite'
  description: string;
  requiredLevel: string; // e.g., "Secundaria completa", "Universitario", "Profesional"
  officialUrl: string;
  contactEmail: string;
  contactPhone?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  status: OpportunityStatus;
  createdAt: string;
  lat: number;
  lng: number;
  isFavorite?: boolean;
  hasReminder?: boolean;
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  category: string;
  isStoryOfTheWeek: boolean;
  publishedAt: string;
  readTime: string;
  status: 'borrador' | 'publicado' | 'archivado';
}

export interface QuestionnaireAnswers {
  age: string;
  level: string;
  career: string;
  english: string;
  skills: string[];
  modality: string;
}

export interface RoadmapResult {
  answers: QuestionnaireAnswers;
  roadmapSteps: {
    phase: string;
    duration: string;
    title: string;
    description: string;
    actionableItems: string[];
  }[];
  recommendedOpportunityIds: string[];
  generatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  opportunityIds?: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pendiente' | 'atendido';
  sentAt: string;
  replyText?: string;
  isEscalatedFromAssistant?: boolean;
}

export interface PersonalGoal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  progressPercentage: number;
  milestones: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export interface CourseProgress {
  id: string;
  title: string;
  institution: string;
  progressPercentage: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
  certificateAvailable?: boolean;
}
