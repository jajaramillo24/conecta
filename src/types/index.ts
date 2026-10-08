export type CareerId = 
  | 'gestion'
  | 'tecnologia'
  | 'juridicas'
  | 'diseno'
  | 'comunicacion'
  | 'salud'
  | 'educacion'
  | 'turismo'
  | 'cms';

export interface CareerInfo {
  id: CareerId;
  name: string;
  colorHex: string;
  pantone: string;
}

export const UBP_CAREERS: Record<CareerId, CareerInfo> = {
  salud: { id: 'salud', name: 'Salud', colorHex: '#CE00A0', pantone: 'PMS Magenta' },
  gestion: { id: 'gestion', name: 'Gestión de Empresas', colorHex: '#EAB818', pantone: '7408 C' },
  diseno: { id: 'diseno', name: 'Diseño y Arquitectura', colorHex: '#289548', pantone: '355 C' },
  juridicas: { id: 'juridicas', name: 'Jurídicas', colorHex: '#D0661C', pantone: '1505 C' },
  educacion: { id: 'educacion', name: 'Educación', colorHex: '#1FA6E4', pantone: '2995 C' },
  turismo: { id: 'turismo', name: 'Turismo', colorHex: '#A2C037', pantone: '375 C' },
  comunicacion: { id: 'comunicacion', name: 'Comunicación', colorHex: '#80217E', pantone: '2415 C' },
  tecnologia: { id: 'tecnologia', name: 'Tecnología', colorHex: '#1269B0', pantone: '285 C' },
  cms: { id: 'cms', name: 'CMS Management', colorHex: '#3E69A8', pantone: 'CMS Blue' },
};

export interface Alumni {
  id: string;
  name: string;
  title: string;
  career: CareerId;
  careerName: string;
  graduationYear: number;
  currentRole: string;
  company: string;
  location: string;
  country: string;
  region: 'cordoba' | 'argentina' | 'internacional';
  coordinates: { x: number; y: number }; // Relative coordinates for map display
  bio: string;
  highlight: string;
  isFounder?: boolean;
  offersMentorship?: boolean;
  avatarSeed: string;
  tags: string[];
}

export interface MentorSlot {
  day: string; // e.g. "2026-10-15"
  time: string; // e.g. "18:00 - 18:45"
  available: boolean;
}

export interface Mentor {
  id: string;
  alumniId: string;
  name: string;
  role: string;
  company: string;
  career: CareerId;
  topics: string[];
  bio: string;
  modality: 'Virtual (Google Meet)' | 'Presencial (Campus Argüello)' | 'Híbrido';
  availableSlots: MentorSlot[];
  rating: number;
  reviewsCount: number;
}

export interface MentorshipBooking {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorRole: string;
  studentName: string;
  studentEmail: string;
  studentCareer: string;
  date: string;
  time: string;
  modality: string;
  note: string;
  status: 'confirmada' | 'pendiente';
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Networking' | 'Académico' | 'Emprendimiento' | 'Deportivo' | 'Social';
  date: string;
  time: string;
  location: string;
  description: string;
  speakerOrHost: string;
  career?: CareerId;
  spotsLeft: number;
  totalSpots: number;
  registered: boolean;
  imageTag: string;
}

export interface SportsMatch {
  id: string;
  tournament: string;
  round: string;
  teamA: string;
  teamB: string;
  isTeamAAlumni: boolean;
  isTeamBAlumni: boolean;
  date: string;
  time: string;
  field: string;
  scoreA?: number;
  scoreB?: number;
  status: 'Próximo' | 'En Vivo' | 'Finalizado';
}

export interface SportsTeam {
  id: string;
  name: string;
  type: 'Alumnos' | 'Egresados' | 'Mixto';
  career: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface SportConvenio {
  id: string;
  sport: string;
  partner: string;
  benefit: string;
  description: string;
  location: string;
  howToAccess: string;
  schedule: string;
  badgeText: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  alumniName: string;
  alumniRole: string;
  career: CareerId;
  date: string;
  readingTime: string;
  likes: number;
  featured?: boolean;
}

export interface UbpMeme {
  id: string;
  title: string;
  author: string;
  authorRole: 'Alumno' | 'Egresado';
  category: 'Campus Argüello' | 'Parciales & Finales' | 'Colectivo 11/18' | 'Saber y Saber Hacer' | 'doingLABS';
  caption: string;
  upvotes: number;
  hasUpvoted?: boolean;
  commentsCount: number;
  comments: { user: string; text: string; time: string }[];
  date: string;
  memeStyle: 'argüello-wind' | 'linea-11' | 'saber-hacer' | 'doinglabs-pitch' | 'finales-campus';
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderName: string;
  senderRole: 'Alumno' | 'Egresado' | 'Profesor';
  senderCareer: CareerId;
  text: string;
  timestamp: string;
  avatarSeed: string;
}
