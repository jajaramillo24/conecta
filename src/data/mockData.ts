import { Alumni, EventItem, Mentor, NewsArticle, SportConvenio, SportsMatch, SportsTeam, UbpMeme, ChatMessage } from '../types';

export const INITIAL_ALUMNI: Alumni[] = [
  {
    id: 'chacon-juan',
    name: 'Juan Chacón',
    title: 'Co-Fundador de Machinalis & Tech Director en Mercado Libre',
    career: 'tecnologia',
    careerName: 'Informática & Gestión',
    graduationYear: 2008,
    currentRole: 'Director de Ingeniería & Mentor doingLABS',
    company: 'Mercado Libre / Ex-Machinalis',
    location: 'Córdoba / Remoto Global',
    country: 'Argentina',
    region: 'cordoba',
    coordinates: { x: 310, y: 390 },
    bio: 'Egresado de la UBP. Co-fundó Machinalis, una de las startups cordobesas de inteligencia artificial y NLP más emblemáticas, adquirida por Mercado Libre. Mentor activo en doingLABS UBP impulsando emprendimientos deep tech.',
    highlight: 'Lideró la adquisición de Machinalis por MELI y formó a decenas de ingenieros pascalinos.',
    isFounder: true,
    offersMentorship: true,
    avatarSeed: 'JuanChacon',
    tags: ['Inteligencia Artificial', 'Venture Capital', 'doingLABS', 'Escalamiento']
  },
  {
    id: 'ciravegna-carlos',
    name: 'Carlos Alejandro Ciravegna',
    title: 'Fundador de Ciravegna Estudio & Ganador Bienal de Arquitectura',
    career: 'diseno',
    careerName: 'Arquitectura',
    graduationYear: 2011,
    currentRole: 'Director & Arquitecto Principal',
    company: 'Carlos Ciravegna Arquitectos',
    location: 'Córdoba & Villa Carlos Paz',
    country: 'Argentina',
    region: 'cordoba',
    coordinates: { x: 305, y: 395 },
    bio: 'Distinguido en la Bienal de Arquitectura Argentina por su icónico proyecto "5 Casas". Sus obras residenciales y de montaña han sido publicadas en revistas internacionales como ArchDaily, Dezeen y Casabella.',
    highlight: 'Primer Premio Nacional de Arquitectura & Referente de diseño sustentable en las sierras cordobesas.',
    isFounder: true,
    offersMentorship: true,
    avatarSeed: 'CarlosCiravegna',
    tags: ['Arquitectura Sustentable', 'Urbanismo', 'Diseño Paramétrico']
  },
  {
    id: 'bulacios-nazarena',
    name: 'Nazarena Bulacios',
    title: 'Premio COPIME al Mejor Egresado del País & Especialista en Seguridad Ambiental',
    career: 'tecnologia',
    careerName: 'Ingeniería en Telecomunicaciones / Gestión',
    graduationYear: 2023,
    currentRole: 'Especialista en Infraestructura Crítica y Sostenibilidad',
    company: 'Enel Green Power',
    location: 'Buenos Aires',
    country: 'Argentina',
    region: 'argentina',
    coordinates: { x: 335, y: 410 },
    bio: 'Galardonada con el Premio COPIME por su excelencia académica y proyecto final de carrera sobre optimización energética y seguridad industrial. Inspira a nuevas generaciones de mujeres ingenieras.',
    highlight: 'Premio COPIME Nacional & Referente joven de transición energética.',
    isFounder: false,
    offersMentorship: true,
    avatarSeed: 'NazarenaBulacios',
    tags: ['Energías Renovables', 'Telecomunicaciones', 'Sostenibilidad']
  },
  {
    id: 'mundel-juan',
    name: 'Dr. Juan Mundel',
    title: 'Profesor e Investigador en DePaul University Chicago',
    career: 'comunicacion',
    careerName: 'Comunicación Institucional',
    graduationYear: 2012,
    currentRole: 'Associate Professor & Research Fellow',
    company: 'DePaul University',
    location: 'Chicago, Illinois',
    country: 'Estados Unidos',
    region: 'internacional',
    coordinates: { x: 190, y: 155 },
    bio: 'Egresado de Comunicación UBP, completó su doctorado en EE.UU. y hoy lidera cátedras de comunicación estratégica, consumo mediático y publicidad interactiva en Chicago. Ha publicado más de 30 papers en journals internacionales.',
    highlight: 'Profesor Destacado en EE.UU. y nexo de intercambio académico para estudiantes UBP.',
    isFounder: false,
    offersMentorship: true,
    avatarSeed: 'JuanMundel',
    tags: ['Investigación Académica', 'Publicidad Global', 'Becas Internacionales']
  },
  {
    id: 'stang-matias',
    name: 'Matías Esteban Stang',
    title: 'Senior Portfolio Director & Fintech Lead en Londres',
    career: 'gestion',
    careerName: 'Licenciatura en Administración',
    graduationYear: 2014,
    currentRole: 'Director de Expansión Internacional',
    company: 'Revolut / Fintech UK',
    location: 'Londres',
    country: 'Reino Unido',
    region: 'internacional',
    coordinates: { x: 440, y: 125 },
    bio: 'Graduado con honores en la UBP. Dio el salto a Europa mediante los convenios de intercambio internacional ISEP. Hoy diseña estrategias de expansión de servicios financieros digitales y banking para toda la eurozona.',
    highlight: 'Lidera equipos transnacionales en uno de los centros financieros más exigentes del mundo.',
    isFounder: false,
    offersMentorship: true,
    avatarSeed: 'MatiasStang',
    tags: ['Fintech', 'Banca Digital', 'Vivir en Europa', 'Negocios Globales']
  },
  {
    id: 'spinassi-gabriela',
    name: 'Dra. Gabriela Spinassi',
    title: 'Socia Legal Internacional & Consultora en Derecho Corporativo',
    career: 'juridicas',
    careerName: 'Abogacía',
    graduationYear: 2010,
    currentRole: 'Socia Directora',
    company: 'Spinassi & Asociados Ibérica',
    location: 'Ibiza & Madrid',
    country: 'España',
    region: 'internacional',
    coordinates: { x: 430, y: 170 },
    bio: 'Egresada de Derecho UBP. Tras litigar en los tribunales de Córdoba, homologó su título en la Unión Europea y fundó su propio bufete enfocado en inversiones extranjeras, hospitalidad de lujo y derecho societario en las Islas Baleares y Madrid.',
    highlight: 'Asesora legal para inversores globales y mentora de jóvenes abogados que aspiran a homologar en la UE.',
    isFounder: true,
    offersMentorship: true,
    avatarSeed: 'GabrielaSpinassi',
    tags: ['Derecho Internacional', 'Homologación de Títulos', 'Inversiones']
  },
  {
    id: 'arguello-federico',
    name: 'Federico Argüello Pit',
    title: 'CEO de ZAP Arquitectura & Director de Carrera UBP',
    career: 'diseno',
    careerName: 'Diseño y Arquitectura',
    graduationYear: 2006,
    currentRole: 'CEO de ZAP & Director Académico',
    company: 'ZAP Arquitectura BIM',
    location: 'Córdoba & Santiago de Chile',
    country: 'Argentina',
    region: 'cordoba',
    coordinates: { x: 308, y: 392 },
    bio: 'Pionero en tecnología BIM (Building Information Modeling) aplicada al diseño integral. Conecta el aula con la obra real y el mercado internacional a través de su estudio y la dirección académica en UBP.',
    highlight: 'Fundador de uno de los estudios pioneros en modelado paramétrico de la región centro.',
    isFounder: true,
    offersMentorship: true,
    avatarSeed: 'FedericoArguello',
    tags: ['BIM', 'Modelado 3D', 'Emprendimiento en Diseño']
  },
  {
    id: 'scarpinello-eugenia',
    name: 'Dra. María Eugenia Scarpinello',
    title: 'Fiscal de Instrucción & Especialista en Litigación Penal',
    career: 'juridicas',
    careerName: 'Abogacía',
    graduationYear: 2009,
    currentRole: 'Magistrada & Docente de Grado UBP',
    company: 'Poder Judicial de la Provincia de Córdoba',
    location: 'Córdoba',
    country: 'Argentina',
    region: 'cordoba',
    coordinates: { x: 312, y: 388 },
    bio: 'Destacada jurista egresada de UBP, docente en la carrera de abogacía y columnista en medios de divulgación legal sobre derechos fundamentales y reformas procesales. Coordina talleres de simulación de juicios por jurados.',
    highlight: 'Autora de doctrina jurídica y formadora en técnicas avanzadas de oratoria y litigio.',
    isFounder: false,
    offersMentorship: true,
    avatarSeed: 'EugeniaScarpinello',
    tags: ['Poder Judicial', 'Litigación', 'Derecho Penal', 'Oratoria']
  },
  {
    id: 'mora-ignacio',
    name: 'Ignacio César Mora',
    title: 'Consultor en Defensa de la Competencia & Regulación Tecnológica',
    career: 'juridicas',
    careerName: 'Abogacía & Regulación',
    graduationYear: 2016,
    currentRole: 'Senior Associate en Marval O\'Farrell Mairal',
    company: 'Marval O\'Farrell Mairal',
    location: 'Buenos Aires',
    country: 'Argentina',
    region: 'argentina',
    coordinates: { x: 338, y: 412 },
    bio: 'Abogado por la UBP y articulista especializado en la Ley de Defensa de la Competencia para Economix. Asesora a gigantes tecnológicos y multinacionales en compliance regulatorio y fusiones corporativas.',
    highlight: 'Publicista destacado y consultor en fusiones antimonopolio para plataformas digitales.',
    isFounder: false,
    offersMentorship: true,
    avatarSeed: 'IgnacioMora',
    tags: ['Defensa de la Competencia', 'Fusiones', 'Big Tech Regulation']
  },
  {
    id: 'hilal-martin',
    name: 'Martín Hilal',
    title: 'Investigador de Cultura Digital & Content Strategist',
    career: 'comunicacion',
    careerName: 'Licenciatura en Comunicación',
    graduationYear: 2017,
    currentRole: 'Lead Content Strategist & Docente UBP',
    company: 'Economix / Digital Labs',
    location: 'Córdoba',
    country: 'Argentina',
    region: 'cordoba',
    coordinates: { x: 315, y: 391 },
    bio: 'Analista de tendencias de streaming, binge-watching y consumos culturales de la Generación Z y Alpha. Su investigación sobre algoritmos de recomendación se convirtió en referencia para medios nacionales.',
    highlight: 'Especialista en narrativas transmedia y economía de la atención.',
    isFounder: false,
    offersMentorship: true,
    avatarSeed: 'MartinHilal',
    tags: ['Contenidos Digitales', 'Streaming', 'Economía de Medios']
  },
  {
    id: 'valenzuela-florencia',
    name: 'Florencia Valenzuela',
    title: 'Founder de EcoTravel Patagonia & Turismo Sustentable',
    career: 'turismo',
    careerName: 'Turismo y Hotelería',
    graduationYear: 2015,
    currentRole: 'CEO & Directora de Operaciones',
    company: 'EcoTravel Patagonia',
    location: 'Bariloche, Río Negro',
    country: 'Argentina',
    region: 'argentina',
    coordinates: { x: 285, y: 480 },
    bio: 'Egresada de Turismo UBP. Emprendió con una agencia boutique de turismo de aventura con huella de carbono neutral, recibiendo viajeros de Suiza, Alemania y EE.UU.',
    highlight: 'Certificada por Rainforest Alliance y líder de proyectos comunitarios en la Patagonia.',
    isFounder: true,
    offersMentorship: true,
    avatarSeed: 'FlorenciaValenzuela',
    tags: ['Turismo Sostenible', 'Hotelería Boutique', 'Operaciones']
  },
  {
    id: 'martinez-lucas',
    name: 'Lucas Martínez',
    title: 'Engineering Lead en Delivery Hero Berlín',
    career: 'tecnologia',
    careerName: 'Ingeniería Informática',
    graduationYear: 2018,
    currentRole: 'Staff Software Engineer',
    company: 'Delivery Hero',
    location: 'Berlín',
    country: 'Alemania',
    region: 'internacional',
    coordinates: { x: 470, y: 110 },
    bio: 'Tras incubar un proyecto en doingLABS UBP, se radicó en Alemania para trabajar en sistemas de alta concurrencia y microservicios que procesan millones de órdenes en tiempo real.',
    highlight: 'Arquitecto de sistemas backend distribuidos a escala de millones de usuarios.',
    isFounder: false,
    offersMentorship: true,
    avatarSeed: 'LucasMartinez',
    tags: ['Backend Distribuido', 'Go/Kubernetes', 'Relocation Europa']
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'm-juan-chacon',
    alumniId: 'chacon-juan',
    name: 'Juan Chacón',
    role: 'Co-Fundador de Machinalis & Tech Director en Mercado Libre',
    company: 'Mercado Libre / doingLABS',
    career: 'tecnologia',
    topics: ['Creación de Startups Tech', 'Inteligencia Artificial', 'Crecimiento de Carrera', 'doingLABS Pitching'],
    bio: 'Te ayudo a validar tu idea de startup, preparar tu primer MVP técnico o planificar tu transición de estudiante a líder en la industria tecnológica.',
    modality: 'Virtual (Google Meet)',
    availableSlots: [
      { day: '2026-10-14', time: '18:00 - 18:45', available: true },
      { day: '2026-10-16', time: '19:00 - 19:45', available: true },
      { day: '2026-10-21', time: '18:30 - 19:15', available: true }
    ],
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'm-carlos-ciravegna',
    alumniId: 'ciravegna-carlos',
    name: 'Arq. Carlos Alejandro Ciravegna',
    role: 'Director y Fundador de Ciravegna Estudio',
    company: 'Ciravegna Arquitectos',
    career: 'diseno',
    topics: ['Revisión de Portfolio de Arquitectura', 'Cómo abrir tu propio estudio', 'Concursos de Diseño', 'Diseño en Contextos Serranos'],
    bio: 'Revisamos tu portfolio, te aconsejo sobre cómo presentar proyectos a clientes reales y cómo dar el paso hacia la profesión independiente con identidad propia.',
    modality: 'Presencial (Campus Argüello)',
    availableSlots: [
      { day: '2026-10-15', time: '16:00 - 16:50', available: true },
      { day: '2026-10-22', time: '16:00 - 16:50', available: true }
    ],
    rating: 5.0,
    reviewsCount: 24
  },
  {
    id: 'm-gabriela-spinassi',
    alumniId: 'spinassi-gabriela',
    name: 'Dra. Gabriela Spinassi',
    role: 'Socia Legal Internacional (Ibiza & Madrid)',
    company: 'Spinassi & Asociados Ibérica',
    career: 'juridicas',
    topics: ['Homologar el título de Abogado en España/UE', 'Derecho Societario & M&A', 'Primeros años de litigación'],
    bio: 'Espacio dedicado a estudiantes y recién graduados de Derecho que tienen metas internacionales, homologación en Europa o interés en el derecho corporativo moderno.',
    modality: 'Virtual (Google Meet)',
    availableSlots: [
      { day: '2026-10-17', time: '11:00 - 11:45 (Hora Arg)', available: true },
      { day: '2026-10-24', time: '11:00 - 11:45 (Hora Arg)', available: true }
    ],
    rating: 4.9,
    reviewsCount: 19
  },
  {
    id: 'm-matias-stang',
    alumniId: 'stang-matias',
    name: 'Matías Esteban Stang',
    role: 'Senior Portfolio Director en Londres',
    company: 'Fintech UK / Ex-Revolut',
    career: 'gestion',
    topics: ['Finanzas Cuantitativas', 'Networking Internacional', 'Intercambios ISEP UBP', 'Entrevistas en Inglés'],
    bio: 'Aprovechá mi experiencia cruzando el charco: cómo aprovechar las oportunidades de intercambio de la UBP y cómo armar un CV competitivo para el mercado global.',
    modality: 'Virtual (Google Meet)',
    availableSlots: [
      { day: '2026-10-13', time: '15:00 - 15:45', available: true },
      { day: '2026-10-20', time: '15:00 - 15:45', available: true }
    ],
    rating: 4.8,
    reviewsCount: 15
  },
  {
    id: 'm-nazarena-bulacios',
    alumniId: 'bulacios-nazarena',
    name: 'Nazarena Bulacios',
    role: 'Premio COPIME Nacional & Ingeniera en Infraestructura',
    company: 'Enel Green Power',
    career: 'tecnologia',
    topics: ['Tesis y Proyecto Final Exitoso', 'Mujeres en STEM', 'Energías Limpias', 'Ingreso al Mercado Corporativo'],
    bio: 'Hablemos de cómo encarar tu tesis de ingeniería con impacto real y cómo dar los primeros pasos en corporaciones del sector energético.',
    modality: 'Híbrido',
    availableSlots: [
      { day: '2026-10-18', time: '17:30 - 18:15', available: true },
      { day: '2026-10-25', time: '17:30 - 18:15', available: true }
    ],
    rating: 5.0,
    reviewsCount: 22
  },
  {
    id: 'm-eugenia-scarpinello',
    alumniId: 'scarpinello-eugenia',
    name: 'Dra. Eugenia Scarpinello',
    role: 'Fiscal de Instrucción & Docente de Grado',
    company: 'Poder Judicial de Córdoba / UBP',
    career: 'juridicas',
    topics: ['Concursos Judiciales en Córdoba', 'Técnicas de Litigación Oral', 'Juicio por Jurados'],
    bio: 'Clínica personalizada para orientarte si querés ingresar a la carrera judicial o perfeccionar tus habilidades de argumentación jurídica oral.',
    modality: 'Presencial (Campus Argüello)',
    availableSlots: [
      { day: '2026-10-19', time: '17:00 - 17:45', available: true },
      { day: '2026-10-26', time: '17:00 - 17:45', available: true }
    ],
    rating: 4.9,
    reviewsCount: 31
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-torneo-futbol-2026',
    title: 'Copa Blas Pascal: Alumnos vs. Egresados 2026',
    category: 'Deportivo',
    date: 'Sábado 24 de Octubre, 2026',
    time: '09:30 a 16:30 hs',
    location: 'Campus UBP - Canchas de Fútbol 7 & 11 (Av. Donato Álvarez 3800)',
    description: 'El clásico torneo anual de fútbol que enfrenta a las selecciones de estudiantes por carrera contra los combinados de graduados. Incluye tercer tiempo con asado en los quinchos del campus y premiación.',
    speakerOrHost: 'Secretaría de Extensión & Deportes UBP',
    spotsLeft: 14,
    totalSpots: 120,
    registered: false,
    imageTag: 'football-turf'
  },
  {
    id: 'ev-asado-networking',
    title: 'Gran Asado Pascalino: Comunidad Alumnos & Graduados',
    category: 'Networking',
    date: 'Viernes 13 de Noviembre, 2026',
    time: '20:30 hs',
    location: 'Quincho Mayor del Campus UBP (Argüello)',
    description: 'Noche de camaradería, música acústica y networking distendido entre estudiantes de últimos años, docentes y egresados de todas las promociones. Traé tus ideas de proyectos para charlar cara a cara.',
    speakerOrHost: 'Centro de Graduados/as UBP',
    spotsLeft: 22,
    totalSpots: 150,
    registered: true,
    imageTag: 'campus-asado'
  },
  {
    id: 'ev-doinglabs-pitch',
    title: 'Demo Day doingLABS: Startups de Graduados frente a Alumnos',
    category: 'Emprendimiento',
    date: 'Miércoles 28 de Octubre, 2026',
    time: '18:00 hs',
    location: 'Auditorio UBP & Streaming Online',
    description: 'Cinco startups fundadas por egresados de la UBP presentan sus avances y abren búsquedas laborales de pasantías y co-founders para alumnos avanzados de informática, diseño y administración.',
    speakerOrHost: 'Incubadora doingLABS UBP & CMS',
    career: 'tecnologia',
    spotsLeft: 35,
    totalSpots: 100,
    registered: false,
    imageTag: 'doinglabs-pitch'
  },
  {
    id: 'ev-cms-afteroffice',
    title: 'CMS After Office & Speed Mentoring en Güemes',
    category: 'Networking',
    date: 'Jueves 5 de Noviembre, 2026',
    time: '19:30 hs',
    location: 'Mercado Alberdi / Güemes, Córdoba',
    description: 'Rondas de 5 minutos de speed mentoring entre directivos de empresas egresados de la Córdoba Management School (CMS) y alumnos que están por graduarse en carreras de negocios y marketing.',
    speakerOrHost: 'Córdoba Management School (CMS)',
    career: 'cms',
    spotsLeft: 8,
    totalSpots: 50,
    registered: false,
    imageTag: 'after-office'
  },
  {
    id: 'ev-torneo-padel-convenio',
    title: 'Torneo Relámpago de Pádel UBP Alumnos-Egresados',
    category: 'Deportivo',
    date: 'Sábado 7 de Noviembre, 2026',
    time: '14:00 a 19:00 hs',
    location: 'Canchas Convenio UBP (Complejo Villa Belgrano)',
    description: 'Torneo en parejas conformadas por un estudiante y un egresado. Aprovechando el convenio de uso exclusivo de canchas de la UBP. Premios en indumentaria deportiva y paletas.',
    speakerOrHost: 'Área de Deportes & Recreación UBP',
    spotsLeft: 4,
    totalSpots: 32,
    registered: false,
    imageTag: 'padel-match'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-meli-machinalis',
    title: 'De las aulas de Argüello a Mercado Libre: La historia de Machinalis nacida con sello UBP',
    excerpt: 'Juan Chacón, egresado pascalino y mentor en doingLABS, relata cómo la formación práctica del "Saber y Saber Hacer" permitió fundar una de las empresas de IA más vanguardistas de Argentina.',
    content: 'En 2008, un grupo de visionarios en la Universidad Blas Pascal comenzó a explorar el procesamiento de lenguaje natural y machine learning cuando todavía era terreno casi inexplorado. Esa semilla se convirtió en Machinalis, startup que creció al calor del ecosistema emprendedor de Córdoba y fue adquirida por el unicornio Mercado Libre. "En la UBP no nos enseñaron solo teoría: el lema Saber y Saber Hacer es una filosofía real de salir y picar piedra", destaca Chacón.',
    alumniName: 'Juan Chacón',
    alumniRole: 'Co-Fundador de Machinalis',
    career: 'tecnologia',
    date: '02 Oct 2026',
    readingTime: '4 min de lectura',
    likes: 142,
    featured: true
  },
  {
    id: 'news-ciravegna-bienal',
    title: 'Arquitectura que dialoga con las sierras: Carlos Ciravegna premiado a nivel nacional',
    excerpt: 'El egresado de Arquitectura UBP continúa cosechando elogios internacionales por sus proyectos sustentables que redefinen la relación entre hormigón, piedra y monte nativo.',
    content: 'Con proyectos como "5 Casas", el arquitecto Carlos Ciravegna ha transformado la visión del paisaje serrano cordobés. Su paso por la UBP forjó un espíritu de experimentación material que hoy se refleja en cada uno de sus encargos residenciales en el Valle de Punilla. Ciravegna mantiene activo un taller de mentorías gratuitas para estudiantes que preparan sus proyectos de tesis.',
    alumniName: 'Carlos Ciravegna',
    alumniRole: 'Arquitecto Titular',
    career: 'diseno',
    date: '28 Sep 2026',
    readingTime: '3 min de lectura',
    likes: 98,
    featured: false
  },
  {
    id: 'news-premio-copime',
    title: 'Excelencia Nacional: Nazarena Bulacios galardonada con el Premio COPIME 2023/24',
    excerpt: 'El Consejo Profesional de Ingeniería Mecánica y Electricidad reconoció a la flamante graduada de la UBP como la mejor ingeniera del año por su aporte al sector energético.',
    content: 'Nazarena Bulacios defendió un proyecto final enfocado en la resiliencia de microredes eléctricas sustentables. Su distinción posiciona una vez más a la Facultad de Ingeniería de la UBP entre las más destacadas de Argentina. En una entrevista con el Centro de Graduados, Nazarena alentó a las alumnas que inician el ciclo básico: "Las puertas de la industria se abren con rigor técnico y pasión".',
    alumniName: 'Nazarena Bulacios',
    alumniRole: 'Ingeniera en Telecomunicaciones',
    career: 'tecnologia',
    date: '15 Sep 2026',
    readingTime: '3 min de lectura',
    likes: 215,
    featured: false
  },
  {
    id: 'news-portal-empleo-empresas',
    title: 'El Portal de Empleo UBP suma 30 nuevas empresas nacionales e internacionales',
    excerpt: 'Convenios con consultoras tech, estudios jurídicos y cadenas hoteleras garantizan pasantías y puestos junior para estudiantes avanzados y graduados recientes.',
    content: 'La Secretaría de Extensión y Relaciones Institucionales confirmó la adhesión de firmas globales y de la región centro de Argentina al sistema de pasantías y bolsa de trabajo de la UBP. Se destacan búsquedas para perfiles de desarrollo de software, análisis financiero CMS y litigación digital.',
    alumniName: 'Centro de Graduados UBP',
    alumniRole: 'Secretaría de Extensión',
    career: 'cms',
    date: '05 Oct 2026',
    readingTime: '2 min de lectura',
    likes: 83,
    featured: false
  }
];

export const INITIAL_CONVENIOS: SportConvenio[] = [
  {
    id: 'conv-padel-ubp',
    sport: 'Pádel',
    partner: 'Complejo Padel Norte & Canchas Argüello',
    benefit: 'Canchas gratuitas de Lunes a Jueves (14 a 17 hs) y 40% OFF en resto de horarios',
    description: 'Convenio histórico de la UBP para fomentar la actividad física de alumnos y graduados. Acceso a 6 canchas de blindex con vestuarios y estacionamiento.',
    location: 'Av. Recta Martinolli 7800 / Cercano al campus UBP',
    howToAccess: 'Presentar credencial digital MiUBP o carnet de Graduado/a al hacer la reserva.',
    schedule: 'Lun a Vie 09:00 a 23:00 hs',
    badgeText: 'Uso Gratuito & Descuentos'
  },
  {
    id: 'conv-belgrano-talleres',
    sport: 'Fútbol Profesional & Gestión Deportiva',
    partner: 'Club Atlético Belgrano & Club Atlético Talleres',
    benefit: 'Pasantías profesionales, accesos a predios deportivos y clínicas de gestión',
    description: 'En el marco de la Licenciatura en Gestión Deportiva y Maestrías UBP, los alumnos y graduados acceden a análisis de datos deportivos, clínicas y partidos amistosos.',
    location: 'Predio Armando Pérez (Villa Esquiú) y CARD Amadeo Nuccetelli',
    howToAccess: 'Inscripción a través del portal de pasantías y extensión UBP.',
    schedule: 'Actividades programadas por temporada',
    badgeText: 'Convenio Institucional Élite'
  },
  {
    id: 'conv-futbol-campus',
    sport: 'Fútbol 7 & 11 Universitario',
    partner: 'Campus Deportivo UBP (Donato Álvarez 3800)',
    benefit: 'Reserva sin costo de las canchas de césped natural para partidos de alumnos y egresados',
    description: 'El campus de la UBP cuenta con canchas reglamentarias de fútbol 11 y fútbol 7 con iluminación LED para partidos después de hora entre compañeros de camada.',
    location: 'Campus Argüello, sector polideportivo',
    howToAccess: 'Reserva directa desde esta app con 48 hs de anticipación.',
    schedule: 'Lun a Sáb 12:00 a 22:00 hs',
    badgeText: 'Campus Propio UBP'
  },
  {
    id: 'conv-ajedrez-ubp',
    sport: 'Ajedrez de Competición',
    partner: 'Federación Cordobesa de Ajedrez & Liga Universitaria',
    benefit: 'Clases gratuitas para todos los niveles y ranking ELO universitario',
    description: 'La UBP compite en torneos interuniversitarios provinciales y nacionales. Taller semanal a cargo de maestros FIDE en la biblioteca central.',
    location: 'Biblioteca UBP / Aula 204 Argüello',
    howToAccess: 'Abierto a todos los estudiantes y graduados sin costo.',
    schedule: 'Martes y Jueves 18:30 a 20:30 hs',
    badgeText: 'Liga Universitaria'
  },
  {
    id: 'conv-semasc-erasmus',
    sport: 'Gestión Deportiva Internacional',
    partner: 'Proyecto SEMASC (Erasmus+ Sport UE)',
    benefit: 'Certificación internacional en gestión de clubes deportivos amateurs',
    description: 'Iniciativa liderada por la UBP en Latinoamérica en conjunto con universidades de Europa para profesionalizar clubes barriales y federaciones deportivas.',
    location: 'Plataforma Virtual UBP & Seminarios Híbridos',
    howToAccess: 'Postulación a través de la Dirección de Relaciones Internacionales.',
    schedule: 'Cohortes semestrales',
    badgeText: 'Erasmus+ Sport'
  }
];

export const INITIAL_TOURNAMENT_TEAMS: SportsTeam[] = [
  {
    id: 't-egresados-fc',
    name: 'Egresados Senior FC (Prom. 2018-2022)',
    type: 'Egresados',
    career: 'Multidisciplinario',
    points: 12,
    played: 4,
    won: 4,
    drawn: 0,
    lost: 0,
    goalsFor: 15,
    goalsAgainst: 4
  },
  {
    id: 't-saber-hacer-alumnos',
    name: 'Saber y Saber Gambetear (Alumnos Sistemas)',
    type: 'Alumnos',
    career: 'Tecnología',
    points: 9,
    played: 4,
    won: 3,
    drawn: 0,
    lost: 1,
    goalsFor: 12,
    goalsAgainst: 7
  },
  {
    id: 't-juridicas-united',
    name: 'Litigio Directo FC (Alumnos Abogacía)',
    type: 'Alumnos',
    career: 'Jurídicas',
    points: 7,
    played: 4,
    won: 2,
    drawn: 1,
    lost: 1,
    goalsFor: 9,
    goalsAgainst: 6
  },
  {
    id: 't-cms-management',
    name: 'Córdoba Management Club (Egresados CMS)',
    type: 'Egresados',
    career: 'Gestión de Empresas',
    points: 6,
    played: 4,
    won: 2,
    drawn: 0,
    lost: 2,
    goalsFor: 8,
    goalsAgainst: 9
  },
  {
    id: 't-arquitectura-design',
    name: 'Los Renders del Argüello (Alumnos Arqui)',
    type: 'Alumnos',
    career: 'Diseño y Arquitectura',
    points: 4,
    played: 4,
    won: 1,
    drawn: 1,
    lost: 2,
    goalsFor: 6,
    goalsAgainst: 10
  },
  {
    id: 't-comunicacion-inter',
    name: 'Voceros & Amigos (Alumnos y Egresados Com.)',
    type: 'Mixto',
    career: 'Comunicación',
    points: 1,
    played: 4,
    won: 0,
    drawn: 1,
    lost: 3,
    goalsFor: 5,
    goalsAgainst: 14
  }
];

export const INITIAL_MATCHES: SportsMatch[] = [
  {
    id: 'm-1',
    tournament: 'Copa Blas Pascal 2026 - Fecha 5',
    round: 'Semifinal A',
    teamA: 'Egresados Senior FC',
    teamB: 'Saber y Saber Gambetear',
    isTeamAAlumni: true,
    isTeamBAlumni: false,
    date: 'Sábado 24 de Octubre',
    time: '10:00 hs',
    field: 'Cancha 1 (Césped Principal Campus Argüello)',
    status: 'Próximo'
  },
  {
    id: 'm-2',
    tournament: 'Copa Blas Pascal 2026 - Fecha 5',
    round: 'Semifinal B',
    teamA: 'Litigio Directo FC',
    teamB: 'Córdoba Management Club',
    isTeamAAlumni: false,
    isTeamBAlumni: true,
    date: 'Sábado 24 de Octubre',
    time: '11:30 hs',
    field: 'Cancha 2 (Sintético Iluminado Campus Argüello)',
    status: 'Próximo'
  },
  {
    id: 'm-3',
    tournament: 'Copa Blas Pascal 2026 - Fecha 4',
    round: 'Fase Regular',
    teamA: 'Egresados Senior FC',
    teamB: 'Los Renders del Argüello',
    isTeamAAlumni: true,
    isTeamBAlumni: false,
    date: 'Sábado 10 de Octubre',
    time: '11:00 hs',
    field: 'Cancha 1 Campus Argüello',
    scoreA: 4,
    scoreB: 1,
    status: 'Finalizado'
  },
  {
    id: 'm-4',
    tournament: 'Copa Blas Pascal 2026 - Fecha 4',
    round: 'Fase Regular',
    teamA: 'Saber y Saber Gambetear',
    teamB: 'Litigio Directo FC',
    isTeamAAlumni: false,
    isTeamBAlumni: false,
    date: 'Sábado 10 de Octubre',
    time: '12:30 hs',
    field: 'Cancha 2 Campus Argüello',
    scoreA: 3,
    scoreB: 2,
    status: 'Finalizado'
  }
];

export const INITIAL_MEMES: UbpMeme[] = [
  {
    id: 'meme-1',
    title: 'Cuando cruzás el portón de Donato Álvarez en pleno julio a las 7:45 AM',
    author: 'Facundo Rossi',
    authorRole: 'Alumno',
    category: 'Campus Argüello',
    caption: 'El viento de las sierras bajando por la recta de Argüello no perdona a nadie. Ni el café del buffet te saca el frío de la cara.',
    upvotes: 312,
    commentsCount: 42,
    comments: [
      { user: 'Sofi Martínez (Egresada 2021)', text: 'Confirmo totalmente, salías del aula magna y parecías estar en la Antártida jajaja', time: 'Hace 2 h' },
      { user: 'Lucas G.', text: 'El secreto siempre fue el camperón de plumas y doble bufanda.', time: 'Hace 1 h' }
    ],
    date: 'Ayer',
    memeStyle: 'argüello-wind'
  },
  {
    id: 'meme-2',
    title: 'Esperando el 11 o el 18 en la parada de la UBP después del parcial de las 21 hs',
    author: 'Candela Méndez',
    authorRole: 'Alumno',
    category: 'Colectivo 11/18',
    caption: 'La app dice "llega en 4 minutos". Pasaron 27 minutos y ya te hiciste amigo de todos los chicos de diseño que salieron con las maquetas.',
    upvotes: 428,
    commentsCount: 56,
    comments: [
      { user: 'Juan Pablo (Egresado 2019)', text: 'En mis épocas era el Coniferal naranja, una prueba de fe semanal.', time: 'Hace 4 h' },
      { user: 'Nati V.', text: 'El clásico "alguien va para la Mujer Urbana?" que te salva la noche.', time: 'Hace 3 h' }
    ],
    date: 'Hace 2 días',
    memeStyle: 'linea-11'
  },
  {
    id: 'meme-3',
    title: 'El Lema: Saber y Saber Hacer vs. Mi primer día de pasantía laboral',
    author: 'Mariano Ceballos',
    authorRole: 'Egresado',
    category: 'Saber y Saber Hacer',
    caption: 'Expectativa: Aplicando análisis multivariado y modelos teóricos. Realidad: El cliente me pidió rehacer la planilla de Excel con colores bonitos.',
    upvotes: 289,
    commentsCount: 31,
    comments: [
      { user: 'Paula D. (Lic. Gestión)', text: 'Tal cual, pero cuando resolvés el quilombo ahí entendés el "Saber Hacer" jaja', time: 'Hace 1 día' }
    ],
    date: 'Hace 3 días',
    memeStyle: 'saber-hacer'
  },
  {
    id: 'meme-4',
    title: 'Pitching en doingLABS: "Es como Uber pero para fotocopias de Donato Álvarez"',
    author: 'Esteban Quiroga',
    authorRole: 'Alumno',
    category: 'doingLABS',
    caption: 'El jurado mirándote con cara de "ya escuché 15 ideas de Uber para cosas hoy, contame la tracción real".',
    upvotes: 195,
    commentsCount: 18,
    comments: [
      { user: 'Juan Chacón', text: '¡Totalmente! Pero ojo que si funciona con métricas reales, se invierte 😉', time: 'Hace 5 h' }
    ],
    date: 'Hace 4 días',
    memeStyle: 'doinglabs-pitch'
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  general: [
    {
      id: 'c-1',
      channelId: 'general',
      senderName: 'Martín Hilal',
      senderRole: 'Egresado',
      senderCareer: 'comunicacion',
      text: '¡Hola a todos los pascalinos! Qué buena iniciativa este espacio para unir a los que estamos afuera con los que siguen cursando en el campus.',
      timestamp: '11:20',
      avatarSeed: 'MartinHilal'
    },
    {
      id: 'c-2',
      channelId: 'general',
      senderName: 'Florencia Sosa',
      senderRole: 'Alumno',
      senderCareer: 'tecnologia',
      text: '¡Buenas! Una consulta para los egresados de Sistemas: ¿recomiendan empezar pasantías en 3er o 4to año?',
      timestamp: '11:24',
      avatarSeed: 'FlorenciaS'
    },
    {
      id: 'c-3',
      channelId: 'general',
      senderName: 'Juan Chacón',
      senderRole: 'Egresado',
      senderCareer: 'tecnologia',
      text: '@FlorenciaS En 3er año con las bases firmes de algoritmos ya podés postular a pasantías part-time. Lo clave es que no descuides las materias pesadas de 4to.',
      timestamp: '11:28',
      avatarSeed: 'JuanChacon'
    }
  ],
  'networking-laboral': [
    {
      id: 'c-4',
      channelId: 'networking-laboral',
      senderName: 'Gabriela Spinassi',
      senderRole: 'Egresado',
      senderCareer: 'juridicas',
      text: 'Colegas y estudiantes de abogacía: abrimos 2 posiciones remotas para análisis de contratos mercantiles internacionales en nuestro estudio. Si a alguien le interesa, me escribe por privado o saca turno de mentoría.',
      timestamp: '09:45',
      avatarSeed: 'GabrielaSpinassi'
    },
    {
      id: 'c-5',
      channelId: 'networking-laboral',
      senderName: 'Ignacio Mora',
      senderRole: 'Egresado',
      senderCareer: 'juridicas',
      text: 'Sumo también que en Marval estamos buscando pasantes para el área regulatoria y derecho de la competencia en Córdoba y BsAs.',
      timestamp: '10:02',
      avatarSeed: 'IgnacioMora'
    }
  ],
  'torneo-futbol': [
    {
      id: 'c-6',
      channelId: 'torneo-futbol',
      senderName: 'Rodrigo Albarracín',
      senderRole: 'Alumno',
      senderCareer: 'gestion',
      text: 'Muchachos, nos faltan un central y un arquero para el equipo de Alumnos vs Egresados de este sábado en la Copa Blas Pascal. ¿Quién se prende?',
      timestamp: '12:10',
      avatarSeed: 'RodrigoA'
    },
    {
      id: 'c-7',
      channelId: 'torneo-futbol',
      senderName: 'Carlos Ciravegna',
      senderRole: 'Egresado',
      senderCareer: 'diseno',
      text: 'Los egresados venimos entrenando en las canchas de pasto sintético, prepárense porque no vamos a regalar ni medio metro de cancha jaja!',
      timestamp: '12:15',
      avatarSeed: 'CarlosCiravegna'
    }
  ],
  'doinglabs-startups': [
    {
      id: 'c-8',
      channelId: 'doinglabs-startups',
      senderName: 'Lucas Martínez',
      senderRole: 'Egresado',
      senderCareer: 'tecnologia',
      text: 'Para los que están armando proyectos en doingLABS: el miércoles que viene hacemos un meet abierto sobre cómo armar una arquitectura cloud barata para el MVP.',
      timestamp: '14:30',
      avatarSeed: 'LucasMartinez'
    }
  ]
};
