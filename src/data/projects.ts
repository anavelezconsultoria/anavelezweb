import type { Project } from '../types/content';

export const projects: readonly Project[] = [
  {
    slug: 'ecommerce',
    category: 'Desarrollo · Cloud',
    title: 'Plataforma de e-\u2060commerce personalizada',
    summary:
      'Plataforma de comercio electrónico a medida para mejorar la experiencia de compra y optimizar la gestión de inventarios. APIs seguras y escalables con alojamiento y gestión de datos en AWS.',
    stack: ['Angular', 'AWS', 'MongoDB', 'APIs REST'],
    diagram: {
      title: 'Arquitectura de la plataforma de e-commerce',
      nodes: [
        { id: 'buyer', label: 'Comprador', caption: 'Web y móvil', col: 0, row: 0, tone: 'actor' },
        { id: 'spa', label: 'Tienda Angular', caption: 'SPA', col: 1, row: 0, tone: 'frontend' },
        { id: 'api', label: 'APIs seguras', caption: 'REST', col: 2, row: 0, tone: 'service' },
        { id: 'inventory', label: 'Inventario', caption: 'Gestión de stock', col: 2, row: 1, tone: 'service' },
        { id: 'db', label: 'MongoDB', caption: 'Catálogo y pedidos', col: 3, row: 0, tone: 'data' },
      ],
      edges: [
        { from: 'buyer', to: 'spa' },
        { from: 'spa', to: 'api' },
        { from: 'api', to: 'db' },
        { from: 'api', to: 'inventory' },
      ],
      boundaries: [{ label: 'AWS', nodeIds: ['api', 'inventory', 'db'] }],
    },
  },
  {
    slug: 'erp',
    category: 'Desarrollo · Integración',
    title: 'Sistema de gestión empresarial integral',
    summary:
      'Sistema de gestión para empresa multinacional que mejoró la eficiencia operativa mediante la automatización de tareas y la integración de múltiples sistemas internos a través de APIs.',
    stack: ['PHP', 'MySQL', 'APIs RESTful'],
    diagram: {
      title: 'Integración de sistemas internos',
      nodes: [
        { id: 'sysA', label: 'Sistema interno', caption: 'Sistema A', col: 0, row: 0, tone: 'actor' },
        { id: 'sysB', label: 'Sistema interno', caption: 'Sistema B', col: 0, row: 1, tone: 'actor' },
        { id: 'gateway', label: 'Capa de integración', caption: 'APIs RESTful', col: 1, row: 0, tone: 'service' },
        { id: 'core', label: 'Núcleo de gestión', caption: 'PHP', col: 2, row: 0, tone: 'service' },
        { id: 'jobs', label: 'Tareas automatizadas', caption: 'Procesos programados', col: 2, row: 1, tone: 'service' },
        { id: 'db', label: 'MySQL', caption: 'Datos unificados', col: 3, row: 0, tone: 'data' },
      ],
      edges: [
        { from: 'sysA', to: 'gateway' },
        { from: 'sysB', to: 'gateway' },
        { from: 'gateway', to: 'core' },
        { from: 'core', to: 'db' },
        { from: 'core', to: 'jobs' },
      ],
    },
  },
  {
    slug: 'iac',
    category: 'Cloud · DevOps',
    title: 'Automatización de infraestructura en la nube',
    summary:
      'Automatización del despliegue de infraestructura con Terraform y AWS, optimizando la escalabilidad y la seguridad de los sistemas.',
    stack: ['Terraform', 'AWS'],
    diagram: {
      title: 'Infraestructura como código',
      nodes: [
        { id: 'code', label: 'Código Terraform', caption: 'Versionado en Git', col: 0, row: 1, tone: 'actor' },
        { id: 'pipeline', label: 'Pipeline CI/CD', caption: 'plan · apply', col: 1, row: 1, tone: 'service' },
        { id: 'network', label: 'Red', caption: 'VPC y subredes', col: 2, row: 0, tone: 'infra' },
        { id: 'compute', label: 'Cómputo', caption: 'EC2 · Lambda', col: 2, row: 1, tone: 'infra' },
        { id: 'security', label: 'Seguridad', caption: 'IAM y políticas', col: 2, row: 2, tone: 'infra' },
      ],
      edges: [
        { from: 'code', to: 'pipeline' },
        { from: 'pipeline', to: 'network' },
        { from: 'pipeline', to: 'compute' },
        { from: 'pipeline', to: 'security' },
      ],
      boundaries: [{ label: 'AWS', nodeIds: ['network', 'compute', 'security'] }],
    },
  },
  {
    slug: 'notificaciones',
    category: 'Cloud · Event-driven',
    title: 'Gestión de datos y notificaciones automáticas',
    summary:
      'Sistema de notificaciones automáticas con AWS Lambda y SQS que mejoró la comunicación con los clientes, optimizando el flujo de datos y la interacción del usuario.',
    stack: ['AWS Lambda', 'SQS', 'Angular'],
    diagram: {
      title: 'Flujo de notificaciones basado en eventos',
      nodes: [
        { id: 'app', label: 'Aplicación Angular', caption: 'Acción del usuario', col: 0, row: 0, tone: 'frontend' },
        { id: 'queue', label: 'Cola SQS', caption: 'Desacople y reintentos', col: 1, row: 0, tone: 'service' },
        { id: 'worker', label: 'AWS Lambda', caption: 'Procesa el evento', col: 2, row: 0, tone: 'service' },
        { id: 'customer', label: 'Cliente', caption: 'Recibe la notificación', col: 3, row: 0, tone: 'actor' },
      ],
      edges: [
        { from: 'app', to: 'queue' },
        { from: 'queue', to: 'worker' },
        { from: 'worker', to: 'customer' },
      ],
      boundaries: [{ label: 'AWS', nodeIds: ['queue', 'worker'] }],
    },
  },
];

/** Proyectos que se muestran en el inicio; el resto vive en /proyectos. */
export const featuredProjects: readonly Project[] = projects.slice(0, 3);
