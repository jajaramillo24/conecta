/**
 * Tipos de datos para UBP Conecta - Red Adaptativa de Mentoría y Vinculación Profesional
 * Cátedra de Innovación - Universidad Blas Pascal - Grupo 5
 */

export type CareerId = 
  | 'informatica'
  | 'telecomunicaciones'
  | 'administracion'
  | 'marketing'
  | 'turismo'
  | 'contador'
  | 'comunicacion'
  | 'diseno'
  | 'juridicas';

export interface CareerInfo {
  id: CareerId;
  name: string;
  shortName: string;
  colorHex: string;
  category: 'Tecnología' | 'Negocios & Gestión' | 'Comunicación & Creatividad' | 'Jurídicas';
}

export const UBP_CAREERS: Record<CareerId, CareerInfo> = {
  informatica: {
    id: 'informatica',
    name: 'Ingeniería en Informática',
    shortName: 'Informática',
    colorHex: '#1269B0',
    category: 'Tecnología',
  },
  telecomunicaciones: {
    id: 'telecomunicaciones',
    name: 'Ingeniería en Telecomunicaciones',
    shortName: 'Telecom',
    colorHex: '#0891B2',
    category: 'Tecnología',
  },
  administracion: {
    id: 'administracion',
    name: 'Licenciatura en Administración',
    shortName: 'Administración',
    colorHex: '#EAB818',
    category: 'Negocios & Gestión',
  },
  marketing: {
    id: 'marketing',
    name: 'Licenciatura en Marketing',
    shortName: 'Marketing',
    colorHex: '#D97706',
    category: 'Negocios & Gestión',
  },
  turismo: {
    id: 'turismo',
    name: 'Licenciatura en Turismo y Gestión Hotelera',
    shortName: 'Turismo',
    colorHex: '#65A30D',
    category: 'Negocios & Gestión',
  },
  contador: {
    id: 'contador',
    name: 'Contador Público',
    shortName: 'Contador',
    colorHex: '#B45309',
    category: 'Negocios & Gestión',
  },
  comunicacion: {
    id: 'comunicacion',
    name: 'Lic. en Comunicación Audiovisual e Institucional',
    shortName: 'Com. Audiovisual',
    colorHex: '#7C3AED',
    category: 'Comunicación & Creatividad',
  },
  diseno: {
    id: 'diseno',
    name: 'Arquitectura y Diseño Gráfico',
    shortName: 'Arquitectura & Diseño',
    colorHex: '#059669',
    category: 'Comunicación & Creatividad',
  },
  juridicas: {
    id: 'juridicas',
    name: 'Abogacía y Notariado',
    shortName: 'Abogacía',
    colorHex: '#C2410C',
    category: 'Jurídicas',
  },
};

export type ModalityType = 'Virtual (Google Meet)' | 'Presencial (Campus UBP)' | 'Híbrida';

export interface MentorSlot {
  id: string;
  day: string; // e.g. "2026-10-15"
  time: string; // e.g. "18:00 - 18:30"
  available: boolean;
  modalityPreference?: ModalityType;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  role: string;
  company: string;
  career: CareerId;
  careerName: string;
  graduationYear: number;
  experienceYears: number;
  industry: string;
  location: string;
  bio: string;
  topics: string[];
  modality: ModalityType;
  availableSlots: MentorSlot[];
  monthlySlotsCap: number; // Max 1 o 2 sesiones mensuales para evitar burnout
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  badges: string[];
  avatarInitial: string;
}

export interface SessionReview {
  rating: number;
  feedbackText: string;
  helpedCareerGoal: boolean;
  punctuality: boolean;
  submittedAt: string;
}

export interface MentorshipBooking {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorRole: string;
  mentorCompany: string;
  mentorCareer: CareerId;
  studentName: string;
  studentEmail: string;
  studentCareer: string;
  date: string;
  time: string;
  durationMinutes: number; // Fijo 30 min
  modality: 'Virtual (Google Meet)' | 'Presencial (Campus UBP)';
  locationDetail: string; // "Enlace Google Meet" o "Campus Argüello - Sala Coworking / doingLABS"
  meetingUrl?: string;
  objective: string; // Campo obligatorio de 3 líneas donde define su meta
  status: 'confirmada' | 'pendiente' | 'completada' | 'cancelada';
  review?: SessionReview;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Feria de Talento Inverso' | 'Jurado Alumni' | 'Flash Mentoring' | 'Networking Institucional';
  date: string;
  time: string;
  location: string;
  description: string;
  speakerOrHost: string;
  spotsLeft: number;
  totalSpots: number;
  registered: boolean;
  modality: 'Híbrido' | 'Presencial Campus' | 'Streaming Virtual';
  targetAudience: string;
}

export interface StoryboardStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  userStory: string;
  systemAction: string;
  iconName: string;
  screenshotLabel: string;
}

export type ActiveRole = 'estudiante' | 'egresado';
