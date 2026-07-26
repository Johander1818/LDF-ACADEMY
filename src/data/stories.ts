import { Story } from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-rd-1',
    title: 'De Herrera a la Universidad de Oxford: La Historia de Marcos en Biotecnología',
    subtitle: 'Cómo un joven de Santo Domingo Oeste logró la Beca Chevening e Inicia para investigar genómica agrícola.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    content: `
      Marcos creció en Herrera, Santo Domingo Oeste. Cursó la carrera de Biología en la Universidad Autónoma de Santo Domingo (UASD) con un índice sobresaliente. Sin embargo, su sueño era especializarse en edición genética para la seguridad alimentaria del Caribe.

      A través de la orientación en LDF Academy y las redes de apoyo de exbecarios, Marcos preparó sus ensayos de liderazgo y aplicó a la Beca Chevening para República Dominicana.

      "El proceso exige autoconocimiento y la certeza de que tu proyecto beneficiará a tu país. República Dominicana tiene un talento increíble; sólo debemos atrevernos a postular con propósito", resalta Marcos desde Oxford.
    `,
    author: 'Marcos Peralta',
    authorRole: 'Becario Chevening / Magíster en Oxford',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Historias de Becas RD',
    isStoryOfTheWeek: true,
    publishedAt: '2026-07-22',
    readTime: '5 min de lectura',
    status: 'publicado'
  },
  {
    id: 'story-rd-2',
    title: 'Del ITLA a Silicon Valley: Yamelis y las Becas Tecnológicas de RD',
    subtitle: 'La historia de una joven de San Cristóbal que aprovechó las becas ITLA y MESCYT para certificarse en Ciberseguridad.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    content: `
      Yamelis inició su formación en el Instituto Tecnológico de Las Américas (ITLA) becada por el programa Beca Tu Futuro. Su dedicación la llevó a graduarse como Tecnóloga en Ciberseguridad con honores Summa Cum Laude.

      Posteriormente, aplicó a la Beca Internacional MESCYT para realizar una maestría en Inteligencia Artificial aplicada a la Seguridad en Madrid, España.

      Hoy en día, trabaja de forma remota para una firma de software en California y mentora a niñas de escuelas públicas en San Cristóbal a través del programa Mujeres en Tech RD.
    `,
    author: 'Yamelis Valdez',
    authorRole: 'Especialista en Ciberseguridad & Embajadora LDF',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Historias de Becas RD',
    isStoryOfTheWeek: false,
    publishedAt: '2026-07-18',
    readTime: '4 min de lectura',
    status: 'publicado'
  },
  {
    id: 'story-rd-3',
    title: 'Medicina y Compromiso Social en Santiago con la Beca Excelencia Popular',
    subtitle: 'La Dra. Patricia Almonte relata su trayectoria académica desde el Cibao hasta su especialización en Medicina Comunitaria.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    content: `
      Nacida en La Vega, Patricia soñaba con ser médica desde niña. Gracias al programa Excelencia Popular del Banco Popular Dominicano, pudo ingresar a la PUCMM en el campus Santiago sin preocupación financiera.

      Durante su carrera, lideró operativos de salud preventiva en comunidades vulnerables del Cibao y coordinó jornadas de vacunación infantiles.

      "El compromiso de una beca va más allá de mantener buenas calificaciones; se trata de retribuir a la sociedad cada gota de oportunidad recibida", destaca Patricia.
    `,
    author: 'Dra. Patricia Almonte',
    authorRole: 'Médica Cirujana / Becaria Excelencia Popular',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    category: 'Salud y Liderazgo RD',
    isStoryOfTheWeek: false,
    publishedAt: '2026-07-12',
    readTime: '6 min de lectura',
    status: 'publicado'
  },
  {
    id: 'story-rd-4',
    title: 'De la UASD a la Beca Fulbright en la Universidad de Columbia',
    subtitle: 'Johan Castillo en Derecho Internacional y su aporte al fortalecimiento de las instituciones dominicanas.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    content: `
      Graduado con honores de la Facultad de Ciencias Jurídicas y Políticas de la UASD, Johan preparó durante un año su solicitud para la Beca Fulbright-MESCYT.

      Su maestría en Derecho Constitucional en Columbia University (Nueva York) le permitió profundizar en derechos fundamentales y comercio internacional.

      Actualmente se desempeña como consultor legal y docente universitario en la República Dominicana.
    `,
    author: 'Lic. Johan Castillo',
    authorRole: 'Consultor Jurídico / Exbecario Fulbright',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'Derecho y Políticas Públicas',
    isStoryOfTheWeek: false,
    publishedAt: '2026-07-05',
    readTime: '5 min de lectura',
    status: 'publicado'
  },
  {
    id: 'story-rd-5',
    title: 'De Los Alcarrizos a Harvard Law School: La Travesía de Laura Cabrera',
    subtitle: 'Cómo la perseverancia y la Beca Internacional MESCYT la llevaron a especializarse en Derecho Ambiental en Boston.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    content: `
      Laura es egresada de Derecho de la Universidad Iberoamericana (UNIBE). Criada en Los Alcarrizos, siempre mantuvo un compromiso inquebrantable con el desarrollo de políticas de protección de recursos hídricos en el Caribe.

      Con la orientación de mentores de Líderes del Futuro y tras lograr la Beca MESCYT Internacional, Laura fue admitida en la maestría en Harvard Law School.

      "No existen límites geográficos cuando el propósito social de tu proyecto es sólido. Invito a los jóvenes dominicanos a postular sin miedo a las mejores universidades del planeta", comparte Laura.
    `,
    author: 'Dra. Laura Cabrera',
    authorRole: 'Abogada Ambiental / Becaria MESCYT en Harvard',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    category: 'Historias de Becas RD',
    isStoryOfTheWeek: false,
    publishedAt: '2026-07-20',
    readTime: '5 min de lectura',
    status: 'publicado'
  },
  {
    id: 'story-rd-6',
    title: 'De la Escuela Pública en Azua a la Beca Líderes del Mañana UNIBE',
    subtitle: 'El Dr. Emmanuel Rosario relata su experiencia completa cursando Medicina con beca 100% de cobertura.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
    content: `
      Provenir de Azua de Compostela no impidió que Emmanuel obtuviera el índice más alto de su promoción liceal. Al conocer la convocatoria "Líderes del Mañana UNIBE", preparó su portafolio de voluntariado en alfabetización comunitaria.

      La beca cubrió la totalidad de la matrícula de la carrera de Medicina. Durante su internado rotatorio, Emmanuel coordinó investigaciones sobre diabetes e hipertensión en la región Sur de RD.

      "La beca no sólo transformó mi vida financiera, sino que me dio las herramientas científicas para servir a los enfermos de mi provincia con dignidad", afirma.
    `,
    author: 'Dr. Emmanuel Rosario',
    authorRole: 'Médico Investigador / Exbecario UNIBE',
    authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    category: 'Salud y Liderazgo RD',
    isStoryOfTheWeek: false,
    publishedAt: '2026-07-15',
    readTime: '6 min de lectura',
    status: 'publicado'
  },
  {
    id: 'story-rd-7',
    title: 'De San Francisco de Macorís a Alemania: Francelis en Energías Renovables',
    subtitle: 'Gracias a la Beca DAAD-MESCYT, la Ing. Francelis Báez se especializó en Redes Eléctricas Inteligentes en Berlín.',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80',
    content: `
      Graduada de Ingeniería Electromecánica en INTEC con la Beca PIES, Francelis decidió enfocar su futuro en la transición hacia la energía solar y eólica en la República Dominicana.

      Postuló a la Beca del Servicio Alemán de Intercambio Académico (DAAD) coordinada por el MESCYT. Tras completar 6 meses intensivos de alemán en Frankfurt, ingresó a la Universidad Técnica de Berlín.

      Hoy lidera proyectos de parques fotovoltaicos en Montecristi y Baní, contribuyendo activamente a la matriz limpia de la isla.
    `,
    author: 'Ing. Francelis Báez',
    authorRole: 'Ingeniera Energética / Becaria DAAD Alemania',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Tecnología y Sostenibilidad',
    isStoryOfTheWeek: false,
    publishedAt: '2026-07-10',
    readTime: '5 min de lectura',
    status: 'publicado'
  },
  {
    id: 'story-rd-8',
    title: 'Del Politécnico Loyola al MIT: Carlos Manuel y la Robótica Industrial',
    subtitle: 'El impacto de las capacitaciones del ITLA y Banreservas en el desarrollo de patentes tecnológicas dominicanas.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    content: `
      Carlos egresó del Politécnico Instituto Agrícola Loyola en San Cristóbal. Cursó el tecnólogo en Mecatrónica en el ITLA con la Beca Banreservas, donde diseñó su primer sistema robótico de prótesis de bajo costo.

      Su proyecto fue aceptado en la beca de intercambio de investigación en el Massachusetts Institute of Technology (MIT).

      "En República Dominicana hay una inventiva nata. Cuando a ese ingenio le sumas acceso a laboratorios y una beca sin costo, los resultados son de clase mundial", comparte Carlos.
    `,
    author: 'Ing. Carlos Manuel Sánchez',
    authorRole: 'Tecnólogo en Mecatrónica & Becario MIT',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    category: 'Tecnología y Sostenibilidad',
    isStoryOfTheWeek: false,
    publishedAt: '2026-07-08',
    readTime: '4 min de lectura',
    status: 'publicado'
  },
  {
    id: 'story-rd-9',
    title: 'Beca Tu Futuro e INFOTEP: Rosanna y la Ciencia de Datos en San Pedro de Macorís',
    subtitle: 'Cómo los cursos gratuitos de INFOTEP Virtual permitieron a una joven emprendedora liderar proyectos en telecomunicaciones.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    content: `
      Rosanna aprovechó la oferta formativa del INFOTEP Virtual y las becas de certificación OGTIC Código RD. Comenzó estudiando fundamentos de Python y SQL mientras trabajaba en un comercio local en San Pedro.

      Su constancia la ayudó a calificar para la Beca Beca Tu Futuro del Ministerio de la Juventud en la Universidad APEC.

      Actualmente trabaja como Analista Senior de Datos para una empresa internacional de telecomunicaciones y es instructora voluntaria de analítica para jóvenes en su provincia.
    `,
    author: 'Rosanna Mateo',
    authorRole: 'Científica de Datos / Exbecaria INFOTEP & MJ',
    authorAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    category: 'Historias de Becas RD',
    isStoryOfTheWeek: false,
    publishedAt: '2026-07-02',
    readTime: '4 min de lectura',
    status: 'publicado'
  },
  {
    id: 'story-rd-10',
    title: 'De Villa Mella a la Universidad de Melbourne: Gabriel Méndez en Agronomía',
    subtitle: 'Gabriel combinó las Becas Agropecuarias de la Universidad ISA y el programa SUSI de la Embajada de EE. UU.',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    content: `
      Con pasión por el cultivo sostenible del cacao dominicano, Gabriel estudió Ingeniería Agrónoma en la Universidad ISA en Santiago bajo modalidad de internado becado.

      Tras ganar el programa de intercambio de líderes SUSI en Estados Unidos, preparó su postulación a la Beca de Posgrado en Australia en gestión de cadenas de suministro agroalimentarias.

      Hoy impulsa cooperativas cacaoteras orgánicas en Yamasá y El Seibo, exportando chocolate fino con empaque sostenible.
    `,
    author: 'Ing. Gabriel Méndez',
    authorRole: 'Agrónomo & Exbecario SUSI - Universidad ISA',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    category: 'Tecnología y Sostenibilidad',
    isStoryOfTheWeek: false,
    publishedAt: '2026-06-25',
    readTime: '5 min de lectura',
    status: 'publicado'
  }
];
