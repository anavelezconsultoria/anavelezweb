/**
 * Contratos de contenido del sitio. Todo el texto vive en src/data y se
 * tipa aqui, para que las paginas solo compongan y nunca hardcodeen copy.
 */

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface ContactChannel {
  readonly kind: 'email' | 'phone' | 'linkedin';
  readonly label: string;
  readonly href: string;
}

export interface Profile {
  readonly firstNames: string;
  readonly lastNames: string;
  readonly fullName: string;
  readonly tagline: string;
  readonly credentials: string;
  readonly intro: string;
  readonly location: string;
  readonly siteUrl: string;
  readonly seoDescription: string;
  readonly portfolioPdf: string;
  readonly contact: readonly ContactChannel[];
}

export interface Service {
  readonly title: string;
  readonly summary: string;
  readonly icon: ServiceIcon;
}

export type ServiceIcon = 'code' | 'strategy' | 'cloud' | 'training';

export interface Specialty {
  readonly title: string;
  readonly description: string;
}

export interface Principle {
  readonly title: string;
  readonly description: string;
}

export interface Highlight {
  readonly value: string;
  readonly label: string;
  readonly detail: string;
}

/** Tono visual de un nodo del diagrama; mapea a tokens de color de marca. */
export type DiagramTone = 'actor' | 'frontend' | 'service' | 'data' | 'infra';

export interface DiagramNode {
  readonly id: string;
  readonly label: string;
  readonly caption?: string;
  /** Columna en la grilla del diagrama, de izquierda a derecha, desde 0. */
  readonly col: number;
  /** Fila en la grilla del diagrama, de arriba a abajo, desde 0. */
  readonly row: number;
  readonly tone: DiagramTone;
}

export interface DiagramEdge {
  readonly from: string;
  readonly to: string;
  readonly label?: string;
}

/** Agrupa nodos dentro de un limite (ej. "AWS") para mostrar fronteras de despliegue. */
export interface DiagramBoundary {
  readonly label: string;
  readonly nodeIds: readonly string[];
}

export interface ArchitectureDiagram {
  readonly title: string;
  readonly nodes: readonly DiagramNode[];
  readonly edges: readonly DiagramEdge[];
  readonly boundaries?: readonly DiagramBoundary[];
}

export interface Project {
  readonly slug: string;
  readonly category: string;
  readonly title: string;
  readonly summary: string;
  readonly stack: readonly string[];
  readonly diagram: ArchitectureDiagram;
}
