import { ServiceItem, TeamMember, Testimonial, ProjectShowcase } from '../types';

export const COMPANY_PHONE = '+57 318 4235926';
export const COMPANY_PHONE_RAW = '573184235926';
export const COMPANY_LOCATION = 'Valle del Cauca / Colombia & Remoto';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'sistemas-gestion',
    title: 'Sistemas de Gestión a Medida (ERP & CRM)',
    shortDesc: 'Software centralizado para administrar ventas, inventarios, compras, caja y operaciones sin complicaciones.',
    fullDesc:
      'Diseñamos e implementamos sistemas de información adaptados a la realidad específica de tu negocio. Olvídate de hojas de cálculo dispersas o softwares genéricos rígidos: construimos herramientas intuitivas que crecen con tu empresa.',
    icon: 'LayoutDashboard',
    benefits: [
      'Control total de inventario, stock en tiempo real y alertas de reposición',
      'Módulo de facturación, cuentas por cobrar y tesorería ágil',
      'Gestión de relaciones con clientes (CRM) y seguimiento de prospectos',
      'Dashboards visuales con reportes ejecutivos e indicadores clave',
    ],
    tag: 'Especialidad Central',
  },
  {
    id: 'software-productividad',
    title: 'Software para Optimización del Trabajo',
    shortDesc: 'Herramientas digitales que eliminan tareas repetitivas y le devuelven horas valiosas a tu equipo de trabajo.',
    fullDesc:
      'Creamos aplicaciones web y plataformas internas diseñadas para acelerar el día a día de las personas. Desde portales de colaboradores y digitalización de formatos hasta integraciones automáticas entre tus herramientas actuales.',
    icon: 'Cpu',
    benefits: [
      'Automatización de procesos operativos manuales y generación de documentos',
      'Reducción drástica de errores humanos y reprocesos administrativos',
      'Acceso seguro en la nube desde cualquier dispositivo móvil o computador',
      'Acompañamiento continuo y capacitación cercana para todo tu personal',
    ],
    tag: 'Ahorro Operativo',
  },
  {
    id: 'redes-sociales',
    title: 'Gestión de Redes Sociales & Visibilidad Digital',
    shortDesc: 'Estrategias de contenido y alcance diseñadas para atraer clientes calificados y posicionar tu marca con autoridad.',
    fullDesc:
      'No basta con tener el mejor software o servicio si el mercado no te conoce. Creamos y ejecutamos tu estrategia de presencia en redes para aumentar tu alcance orgánico y pagado, construyendo una comunidad activa que confía en tu negocio.',
    icon: 'Share2',
    benefits: [
      'Planificación editorial y creación de piezas visuales profesionales',
      'Generación de prospectos (leads) calificados listos para comprar',
      'Campañas de visibilidad local y regional con alto retorno de inversión',
      'Medición de métricas de crecimiento, alcance e interacción real',
    ],
    tag: 'Multiplicador de Ventas',
  },
  {
    id: 'transformacion-digital',
    title: 'Transformación Digital',
    shortDesc: 'La sinergia perfecta: unificamos tu software operativo con una presencia digital sólida para impulsar tu negocio al siguiente nivel.',
    fullDesc:
      'Para el cliente ideal que busca un aliado tecnológico 360°. Conectamos tus canales digitales de captación directamente con tus sistemas de gestión internos, permitiendo que cada solicitud se convierta en una venta registrada sin fricciones.',
    icon: 'Sparkles',
    benefits: [
      'Diagnóstico tecnológico inicial y hoja de ruta personalizada',
      'Integración omnicanal: redes, WhatsApp comercial y base de datos de clientes',
      'Soporte directo con el equipo fundador sin intermediarios lentos',
      'Escalabilidad garantizada para acompañar el crecimiento de tu empresa',
    ],
    tag: 'Transformación digital',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Salomé Rodríguez Moscoso',
    role: 'Co-fundadora & Dirección de Proyectos',
    specialty: 'Gestión Estratégica & Transformación Digital',
    bio: 'Lidera la estructuración de soluciones para clientes, asegurando que cada desarrollo responda fielmente a las metas de negocio y necesidades operativas reales de las personas.',
    avatarSeed: 'Salome',
    skills: ['Project Management', 'Diseño de Procesos', 'Customer Success', 'Scrum & Agile'],
  },
  {
    name: 'Sergio Andrés Rincón Serna',
    role: 'Co-fundador & Arquitecto de Software',
    specialty: 'Ingeniería de Software & Arquitectura de Datos',
    bio: 'Especialista en estructurar sistemas robustos, seguros y de alto rendimiento, optimizando bases de datos y la lógica de negocio detrás de nuestros sistemas de gestión.',
    avatarSeed: 'Sergio',
    skills: ['System Architecture', 'Backend APIs', 'Cloud', 'Seguridad'],
  },
  {
    name: 'Kevin Santiago Trejos Serrano',
    role: 'Co-fundador & Desarrollo Frontend',
    specialty: 'UI/UX Engineering & Experiencia de Usuario',
    bio: 'Apasionado por crear interfaces limpias, fluidas y minimalistas que hacen que el uso diario de cualquier software sea cómodo, intuitivo y sin curvas de aprendizaje frustrantes.',
    avatarSeed: 'Kevin',
    skills: ['React & TypeScript', 'Tailwind CSS', 'Responsive UI', 'Diseño de Interacción'],
  },
  {
    name: 'David Alejandro Escobar García',
    role: 'Co-fundador & Sistemas de Gestión',
    specialty: 'Lógica Empresarial & Automatización',
    bio: 'Focalizado en la parametrización de módulos ERP/CRM, control de flujos de inventarios y sincronización de herramientas operativas que agilizan las jornadas laborales.',
    avatarSeed: 'David',
    skills: ['Módulos ERP', 'Control de Inventario', 'Integraciones', 'Optimización de Flujos'],
  },
  {
    name: 'Manuel Felipe Londoño Torres',
    role: 'Co-fundador & Estrategia Digital',
    specialty: 'Social Media Growth & Marketing Tecnológico',
    bio: 'Especialista en conectar empresas con su público objetivo a través de redes sociales, aumentando la visibilidad de marca y convirtiendo interacciones en clientes potenciales.',
    avatarSeed: 'Manuel',
    skills: ['Social Media Strategy', 'Content Creation', 'Branding Digital', 'Lead Generation'],
  },
];

export const PROJECTS_DATA: ProjectShowcase[] = [
  {
    id: 'ra-manager',
    title: 'RA Manager',
    category: 'Proyecto terminado · Universidad del Valle, sede Valle del Cauca',
    description:
      'Sistema de gestión de resultados de aprendizaje desarrollado para la Universidad del Valle, sede Valle del Cauca. El producto está orientado a digitalizar, organizar y centralizar la gestión académica para facilitar la evaluación y seguimiento de competencias por parte de la institución.',
    impact: 'Optimiza la administración y trazabilidad de resultados de aprendizaje en un entorno académico con procesos complejos y múltiples actores.',
    features: [
      'Gestión centralizada de resultados de aprendizaje y seguimiento académico',
      'Organización de información institucional para evaluación y control',
      'Flujos de trabajo orientados a la gestión académica y analítica',
      'Estructura escalable para soportar procesos educativos de la universidad',
    ],
    metrics: [
      { label: 'Tipo', value: 'Terminado' },
      { label: 'Cliente', value: 'Universidad del Valle' },
      { label: 'Área', value: 'Académica' },
      { label: 'Enfoque', value: 'RA / Gestión' },
    ],
    documentationUrl: 'https://drive.google.com/drive/folders/1HEg8z7xuh99GJIVAoUXU8gpstnTG7qa5',
  },
  {
    id: 'psicoarte',
    title: 'Psicoarte',
    category: 'Proyecto en proceso de desarrollo · Empresa de Caicedonia',
    description:
      'Sistema de gestión empresarial y de asistencias para una escuela de música y desarrollo cognitivo en Caicedonia. El proyecto incluye una app de mensajería con bots para la gestión de estudiantes y la información de la empresa, además de un sistema de asistencias biométrico para fortalecer la operación institucional.',
    impact: 'Consolida la operación administrativa, comunicativa y educativa de la empresa en una sola plataforma con mayor control y automatización.',
    features: [
      'Sistema de gestión empresarial y de asistencias',
      'App de mensajería con bots para la gestión de estudiantes e información empresarial',
      'Control de asistencia con solución biométrica',
      'Estructura diseñada para apoyar la operación educativa y administrativa',
    ],
    metrics: [
      { label: 'Tipo', value: 'En proceso' },
      { label: 'Cliente', value: 'Psicoarte' },
      { label: 'Ubicación', value: 'Caicedonia' },
      { label: 'Módulos', value: 'Gestión + App + Biometría' },
    ],
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Carlos Mario Benítez',
    company: 'Distribuidora & Logística Los Andes',
    role: 'Gerente General',
    review:
      'Antes perdíamos horas cada viernes cruzando inventarios con ventas en cuadernos y Excel. El equipo de Del Valle Software nos implementó su sistema de gestión y hoy todo el equipo sabe exactamente qué hay en bodega desde el celular. Son profesionales y muy cercanos.',
    rating: 5,
    resultsMetric: 'Ahorro de 18 horas semanales en papeleo',
    serviceReceived: 'Sistema de Gestión a Medida',
  },
  {
    id: 'test-2',
    clientName: 'Marcela Restrepo H.',
    company: 'Consultoría & Servicios Integrales',
    role: 'Directora Comercial',
    review:
      'Buscábamos no solo ordenar nuestro flujo de trabajo, sino que más personas supieran lo que hacemos. Con la estrategia en redes sociales y la digitalización de cotizaciones pasamos de depender del boca a boca a recibir solicitudes de clientes nuevos todas las semanas.',
    rating: 5,
    resultsMetric: '+180% en solicitudes de presupuesto',
    serviceReceived: 'Transformación Digital 360°',
  },
  {
    id: 'test-3',
    clientName: 'Hernando J. Caicedo',
    company: 'Ferretería & Soluciones Técnicas',
    role: 'Propietario',
    review:
      'Lo que más valoro de Del Valle Software es que hablan con claridad, sin tecnicismos enredados. El software que nos hicieron es rápido y fácil de usar para mis empleados que no son expertos en computadores.',
    rating: 5,
    resultsMetric: '0 descuadres de inventario en 4 meses',
    serviceReceived: 'Software para Optimización del Trabajo',
  },
];
