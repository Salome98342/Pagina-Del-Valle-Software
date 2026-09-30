import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { COMPANY_PHONE_RAW } from '../../data/companyData';
import { Footer, Navbar } from '../layout';

export interface ServicePageContent {
  path: string;
  slug: string;
  title: string;
  eyebrow: string;
  serviceName: string;
  serviceSummary: string;
  serviceBenefits: string[];
  description: string;
  heading: string;
  intro: string;
  fit: string[];
  deliverables: string[];
  process: { title: string; description: string }[];
  inquiry: string;
}

export const SERVICE_PAGES: ServicePageContent[] = [
  {
    path: '/servicios/desarrollo-software',
    slug: 'desarrollo-software',
    title: 'Desarrollo de software a medida en Colombia | Del Valle Software',
    eyebrow: 'Desarrollo de software a medida',
    serviceName: 'Sistemas de Gestión a Medida (ERP & CRM)',
    serviceSummary: 'Software centralizado para administrar ventas, inventarios, compras, caja y operaciones sin complicaciones.',
    serviceBenefits: [
      'Control de inventario, stock en tiempo real y alertas de reposición',
      'Módulos de facturación, cuentas por cobrar y tesorería',
      'Gestión de clientes (CRM) y seguimiento de prospectos',
      'Paneles con reportes e indicadores clave del negocio',
    ],
    description: 'Desarrollamos software a medida para automatizar procesos, integrar información y mejorar la gestión de empresas en Colombia.',
    heading: 'Software diseñado alrededor de tu operación',
    intro: 'Creamos aplicaciones y sistemas de gestión que se adaptan a los procesos de tu empresa. Analizamos cómo trabaja tu equipo y definimos una solución clara para reducir tareas manuales, centralizar información y facilitar el seguimiento del negocio.',
    fit: ['Procesos repetitivos que consumen tiempo del equipo', 'Información repartida entre hojas de cálculo y herramientas desconectadas', 'Necesidad de controlar ventas, inventario, compras o clientes', 'Software genérico que no se ajusta a la operación'],
    deliverables: ['Levantamiento de requerimientos y alcance del proyecto', 'Aplicaciones web y módulos según las necesidades priorizadas', 'Integraciones y automatización de flujos de trabajo', 'Acompañamiento durante la implementación y puesta en marcha'],
    process: [
      { title: '1. Entendemos el proceso', description: 'Revisamos objetivos, usuarios, tareas y herramientas actuales para definir el problema que resolverá el sistema.' },
      { title: '2. Acordamos el alcance', description: 'Priorizamos funcionalidades y entregables para construir una solución viable y alineada con el negocio.' },
      { title: '3. Construimos y ajustamos', description: 'Desarrollamos la solución, revisamos avances contigo y preparamos su implementación.' },
    ],
    inquiry: 'Software a medida',
  },
  {
    path: '/servicios/paginas-web',
    slug: 'paginas-web',
    title: 'Diseño y desarrollo de páginas web en Colombia | Del Valle Software',
    eyebrow: 'Diseño y desarrollo de páginas web',
    serviceName: 'Diseño y desarrollo de páginas web',
    serviceSummary: 'Sitios web claros y adaptables para presentar tus servicios, mostrar proyectos y facilitar el contacto con clientes.',
    serviceBenefits: [
      'Experiencia adaptable a celulares, tabletas y computadores',
      'Contenido organizado para explicar servicios y facilitar consultas',
      'Portafolio, formularios y canales de contacto según el alcance',
      'Metadatos básicos para que buscadores comprendan cada página',
    ],
    description: 'Creamos páginas web rápidas, adaptables a móviles y enfocadas en presentar tus servicios y facilitar el contacto con clientes.',
    heading: 'Una página web clara para que tus clientes te encuentren',
    intro: 'Diseñamos y desarrollamos sitios web para empresas que necesitan presentar sus servicios, mostrar su trabajo y recibir consultas. Organizamos el contenido para que las personas entiendan qué ofreces y sepan cómo dar el siguiente paso desde cualquier dispositivo.',
    fit: ['Empresas que aún no tienen una presencia web propia', 'Sitios desactualizados o difíciles de usar desde el celular', 'Negocios que necesitan mostrar servicios, proyectos y datos de contacto', 'Equipos que quieren conectar la web con sus canales de atención'],
    deliverables: ['Estructura y diseño adaptable a celulares, tabletas y computadores', 'Secciones de servicios, portafolio, preguntas frecuentes y contacto según el alcance', 'Configuración de títulos, descripciones y metadatos básicos', 'Publicación del sitio y orientación para actualizar su contenido'],
    process: [
      { title: '1. Definimos el objetivo', description: 'Aclaramos a quién se dirige el sitio, qué información necesita y qué acción queremos facilitar.' },
      { title: '2. Organizamos el contenido', description: 'Estructuramos las páginas y llamadas a la acción antes de construir la experiencia visual.' },
      { title: '3. Publicamos y revisamos', description: 'Validamos el sitio en diferentes pantallas, conectamos los medios de contacto y lo preparamos para su publicación.' },
    ],
    inquiry: 'Diseño y desarrollo de página web',
  },
  {
    path: '/servicios/marketing-digital',
    slug: 'marketing-digital',
    title: 'Marketing digital y gestión de redes sociales | Del Valle Software',
    eyebrow: 'Marketing digital y redes sociales',
    serviceName: 'Gestión de Redes Sociales y Visibilidad Digital',
    serviceSummary: 'Estrategia de contenido y gestión de redes para comunicar tus servicios y fortalecer la presencia de tu marca.',
    serviceBenefits: [
      'Planificación editorial y creación de piezas para redes',
      'Contenidos orientados a atraer prospectos relevantes',
      'Acciones de visibilidad local y regional acordes al proyecto',
      'Seguimiento de métricas de alcance e interacción',
    ],
    description: 'Planeamos contenido y gestionamos redes sociales para fortalecer la presencia digital de empresas y conectar con sus clientes.',
    heading: 'Comunicación digital con objetivos claros',
    intro: 'Acompañamos a empresas en la planificación y gestión de sus redes sociales. Definimos temas, formatos y mensajes de acuerdo con sus servicios y público, y revisamos el desempeño para orientar las siguientes acciones. El alcance y la frecuencia se acuerdan según cada proyecto.',
    fit: ['Marcas que publican sin una estrategia o calendario', 'Negocios que necesitan comunicar mejor sus servicios', 'Equipos con poco tiempo para planear y producir contenido', 'Empresas que quieren medir interacción y consultas desde redes'],
    deliverables: ['Diagnóstico inicial de canales y comunicación', 'Plan de contenidos y calendario editorial acordado', 'Creación o coordinación de piezas para redes sociales', 'Seguimiento de métricas de alcance e interacción'],
    process: [
      { title: '1. Revisamos tu presencia', description: 'Conocemos tus canales, servicios, audiencia y prioridades comerciales.' },
      { title: '2. Planeamos los contenidos', description: 'Acordamos temas, formatos, frecuencia y responsables de aprobación.' },
      { title: '3. Publicamos y aprendemos', description: 'Ejecutamos el plan y usamos los resultados para ajustar los siguientes contenidos.' },
    ],
    inquiry: 'Marketing digital y redes sociales',
  },
  {
    path: '/servicios/chatbots-automatizacion',
    slug: 'chatbots-automatizacion',
    title: 'Chatbots y automatización de procesos empresariales | Del Valle Software',
    eyebrow: 'Chatbots y automatización',
    serviceName: 'Software para Optimización del Trabajo',
    serviceSummary: 'Herramientas digitales para automatizar tareas repetitivas y devolverle tiempo a tu equipo.',
    serviceBenefits: [
      'Automatización de procesos y generación de documentos',
      'Menos errores y reprocesos administrativos',
      'Acceso a herramientas desde dispositivos autorizados',
      'Chatbots y flujos para orientar consultas frecuentes',
    ],
    description: 'Diseñamos flujos automatizados y chatbots para organizar consultas, reducir tareas manuales y apoyar la operación de tu empresa.',
    heading: 'Automatiza tareas y organiza la atención',
    intro: 'Analizamos tareas administrativas y consultas frecuentes para identificar qué puede automatizarse de forma práctica. Diseñamos flujos y herramientas conectadas con la operación, incluyendo bots para orientar solicitudes y facilitar el acceso a información.',
    fit: ['Consultas repetitivas que ocupan al equipo', 'Procesos que requieren copiar datos entre herramientas', 'Necesidad de organizar solicitudes o registros', 'Operaciones que buscan integrar bots con sus sistemas de gestión'],
    deliverables: ['Mapa del flujo actual y oportunidades de automatización', 'Diseño de respuestas, reglas y rutas de atención para bots', 'Automatización de tareas y conexión con herramientas disponibles', 'Pruebas y ajustes con escenarios reales acordados'],
    process: [
      { title: '1. Elegimos el flujo', description: 'Identificamos una tarea o tipo de consulta concreta y sus reglas actuales.' },
      { title: '2. Diseñamos la automatización', description: 'Definimos datos, respuestas, integraciones y casos que deben pasar a una persona.' },
      { title: '3. Probamos con el equipo', description: 'Validamos el comportamiento, corregimos excepciones y dejamos claro cómo operarlo.' },
    ],
    inquiry: 'Chatbots y automatización',
  },
  {
    path: '/servicios/transformacion-digital',
    slug: 'transformacion-digital',
    title: 'Transformación digital para empresas en Colombia | Del Valle Software',
    eyebrow: 'Transformación digital',
    serviceName: 'Transformación Digital',
    serviceSummary: 'Unimos software operativo, procesos y presencia digital en una ruta de mejora para tu negocio.',
    serviceBenefits: [
      'Diagnóstico tecnológico y hoja de ruta priorizada',
      'Integración de redes, WhatsApp y herramientas de gestión según alcance',
      'Acompañamiento directo durante la implementación',
      'Soluciones que pueden evolucionar junto a la operación',
    ],
    description: 'Conectamos procesos, software y canales digitales en una ruta de transformación ajustada a las necesidades de cada empresa.',
    heading: 'Conecta la tecnología con los objetivos de tu empresa',
    intro: 'La transformación digital empieza por mejorar procesos concretos. Te ayudamos a identificar oportunidades, priorizar cambios y conectar herramientas operativas con la presencia digital de tu negocio, con una ruta acorde a tus recursos y objetivos.',
    fit: ['Herramientas que no comparten información entre sí', 'Procesos de atención y operación separados', 'Dificultad para decidir qué digitalizar primero', 'Necesidad de acompañamiento para adoptar nuevas herramientas'],
    deliverables: ['Diagnóstico de procesos y herramientas actuales', 'Priorización de oportunidades de mejora', 'Ruta de trabajo por etapas y alcance acordado', 'Integración de herramientas y acompañamiento según el proyecto'],
    process: [
      { title: '1. Diagnosticamos', description: 'Conversamos con las personas involucradas y mapeamos los procesos prioritarios.' },
      { title: '2. Priorizamos', description: 'Definimos qué cambios aportan más valor y qué dependencias deben resolverse primero.' },
      { title: '3. Implementamos por etapas', description: 'Acompañamos la ejecución y revisamos con el equipo cómo funcionan las mejoras.' },
    ],
    inquiry: 'Transformación digital',
  },
];

export const ServiceLandingPage: React.FC<{ page: ServicePageContent }> = ({ page }) => {
  const whatsappMessage = encodeURIComponent(`Hola Del Valle Software, quiero conocer más sobre ${page.inquiry}.`);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <section className="relative overflow-hidden border-b border-slate-800 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <a href="/#servicios" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Ver todos los servicios
            </a>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">{page.eyebrow}</p>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">{page.heading}</h1>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300">{page.intro}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={`/agendar-cita?servicio=${encodeURIComponent(page.inquiry)}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-sky-950/40 hover:brightness-110">
                Hablemos de tu proyecto <ArrowRight className="h-4 w-4" />
              </a>
              <a href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-7 py-3.5 font-semibold text-slate-100 hover:border-emerald-400/50">
                <MessageCircle className="h-4 w-4 text-emerald-400" /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 rounded-3xl border border-sky-400/20 bg-gradient-to-br from-slate-900 via-slate-900/95 to-sky-950/40 p-7 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-12">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-sky-300">{page.serviceName}</p>
              <h2 className="text-3xl font-bold leading-tight text-white">Una solución pensada para tu operación</h2>
              <p className="mt-5 text-base leading-7 text-slate-300">{page.serviceSummary}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Beneficios y capacidades</h3>
              <ul className="mt-5 space-y-4">
                {page.serviceBenefits.map((benefit) => <li key={benefit} className="flex gap-3 text-slate-200"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" /><span className="leading-6">{benefit}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-10 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-24">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-sky-300">Cuándo podemos ayudarte</p>
            <h2 className="text-3xl font-bold text-white">Una solución para necesidades concretas</h2>
            <p className="mt-4 leading-7 text-slate-300">Cada proyecto comienza por entender el contexto. Estos son algunos retos que podemos revisar contigo:</p>
            <ul className="mt-7 space-y-4">
              {page.fit.map((item) => <li key={item} className="flex gap-3 text-slate-200"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" /><span className="leading-6">{item}</span></li>)}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7 sm:p-9">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-sky-300">Qué podemos incluir</p>
            <h2 className="text-3xl font-bold text-white">Alcance acordado contigo</h2>
            <p className="mt-4 leading-7 text-slate-300">Las entregas se definen según los objetivos, recursos y prioridades de cada organización.</p>
            <ul className="mt-7 space-y-4">
              {page.deliverables.map((item) => <li key={item} className="flex gap-3 text-slate-200"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" /><span className="leading-6">{item}</span></li>)}
            </ul>
          </div>
        </section>

        <section className="border-y border-slate-800 bg-slate-900/40 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-center text-sm font-bold uppercase tracking-widest text-sky-300">Cómo trabajamos</p>
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold text-white">Un proceso claro desde la primera conversación</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {page.process.map((step) => <article key={step.title} className="rounded-2xl border border-slate-800 bg-slate-950 p-6"><h3 className="text-lg font-bold text-white">{step.title}</h3><p className="mt-3 leading-7 text-slate-300">{step.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-24">
          <h2 className="text-3xl font-bold text-white">Cuéntanos qué necesita tu empresa</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">Revisaremos tu necesidad y conversaremos sobre el alcance adecuado para tu proyecto.</p>
          <a href={`/agendar-cita?servicio=${encodeURIComponent(page.inquiry)}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-slate-950 hover:bg-sky-100">Agendar Cita <ArrowRight className="h-4 w-4" /></a>
        </section>
      </main>
      <Footer />
    </div>
  );
};
