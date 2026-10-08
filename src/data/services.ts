import type { Highlight, Principle, Service, Specialty } from '../types/content';

export const services: readonly Service[] = [
  {
    icon: 'code',
    title: 'Desarrollo de software personalizado',
    summary:
      'Aplicaciones web y móviles con Angular, React, Node.js, Java y PHP. APIs RESTful, bases de datos (MySQL, PostgreSQL, MongoDB) y automatización de procesos con AWS Lambda y Terraform.',
  },
  {
    icon: 'strategy',
    title: 'Consultoría informática estratégica',
    summary:
      'Evaluación y optimización de infraestructuras tecnológicas, estrategias de implementación y transformación ágil con Scrum y Kanban para mejorar la eficiencia y competitividad.',
  },
  {
    icon: 'cloud',
    title: 'Despliegue y gestión en la nube',
    summary:
      'Arquitecturas escalables y seguras en AWS (EC2, Lambda, RDS, S3, CloudFormation) y Azure. Infraestructura como código con Terraform y pipelines CI/CD.',
  },
  {
    icon: 'training',
    title: 'Formación tecnológica especializada',
    summary:
      'Cursos personalizados de programación (JavaScript, PHP, Java, Python), formación avanzada en Angular con NgRx y RxJS, y capacitación en metodologías ágiles Scrum y Kanban.',
  },
];

export const specialties: readonly Specialty[] = [
  {
    title: 'Desarrollo Frontend',
    description: 'Angular, React, TypeScript: interfaces modernas, accesibles y de alto rendimiento.',
  },
  {
    title: 'Desarrollo Backend',
    description: 'Node.js, PHP, Java: APIs robustas, arquitecturas limpias y servicios escalables.',
  },
  {
    title: 'Cloud & DevOps',
    description: 'AWS, Azure, Terraform: infraestructura como código, CI/CD y despliegues automatizados.',
  },
  {
    title: 'Bases de datos',
    description: 'MySQL, PostgreSQL, MongoDB: modelado, optimización y migración de datos.',
  },
  {
    title: 'Consultoría estratégica de TI',
    description: 'Diagnóstico tecnológico, hoja de ruta digital y acompañamiento en transformación.',
  },
  {
    title: 'Formación tecnológica',
    description: 'Talleres, mentorías y capacitaciones para equipos de desarrollo y líderes técnicos.',
  },
];

export const highlights: readonly Highlight[] = [
  {
    value: '15+',
    label: 'Años de experiencia',
    detail: 'Creando soluciones tecnológicas, de aplicaciones web y móviles a plataformas en la nube.',
  },
  {
    value: 'MSc.',
    label: 'Ingeniería de Sistemas',
    detail: 'Base sólida en teoría y práctica, con investigación en química computacional y bioinformática.',
  },
  {
    value: 'Scrum',
    label: 'Liderazgo de equipos',
    detail: 'Proyectos de software de gran envergadura gestionando recursos y plazos con metodologías ágiles.',
  },
  {
    value: 'Cloud',
    label: 'AWS · Azure · Terraform',
    detail: 'Arquitecturas escalables y seguras, con infraestructura como código y despliegues automatizados.',
  },
];

/** Como trabajo: criterios de decision tecnica que guian cada proyecto. */
export const principles: readonly Principle[] = [
  {
    title: 'Soluciones a la medida, no plantillas',
    description:
      'Cada empresa es única. Diseño la arquitectura a partir del problema de negocio y de lo que el equipo puede mantener.',
  },
  {
    title: 'Escalabilidad desde el diseño',
    description:
      'Arquitecturas cloud, microservicios e infraestructura como código para que el sistema crezca con el negocio.',
  },
  {
    title: 'Resultados medibles',
    description:
      'Cada decisión técnica se justifica por su impacto en la eficiencia operativa y en el retorno de la inversión.',
  },
  {
    title: 'Agilidad con disciplina',
    description:
      'Scrum y Kanban con entregas puntuales, colaboración constante con el equipo del cliente y control de calidad.',
  },
  {
    title: 'Calidad y acompañamiento',
    description:
      'Comunicación fluida durante todo el ciclo de desarrollo y soporte continuo después de la implementación.',
  },
];
