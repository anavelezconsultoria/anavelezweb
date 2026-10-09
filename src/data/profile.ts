import type { NavLink, Profile } from '../types/content';

const EMAIL = 'ana.velez.consultora@gmail.com';
const PHONE = '+57 315 530 5099';

export const profile: Profile = {
  firstNames: 'Ana',
  lastNames: 'Vélez',
  fullName: 'Ana Vélez',
  tagline: 'Consultoría · Software · Tecnología',
  credentials: 'Ingeniera de Sistemas · MSc. Ingeniería de Sistemas',
  intro:
    'Ingeniera de Sistemas con Maestría y más de 15 años de experiencia creando soluciones tecnológicas avanzadas. Ayudo a empresas a integrar la tecnología de manera estratégica para alcanzar un crecimiento sostenible.',
  location: 'Colombia',
  siteUrl: 'https://anavelezconsultora.com',
  seoDescription:
    'Consultora de software y tecnología en Colombia. Arquitectura de sistemas, desarrollo a medida, cloud AWS y Azure, y formación técnica para empresas en Colombia y Latinoamérica.',
  portfolioPdf: '/portafolio-ana-velez-jurado.pdf',
  contact: [
    { kind: 'email', label: EMAIL, href: `mailto:${EMAIL}` },
    { kind: 'phone', label: PHONE, href: `tel:${PHONE.replaceAll(' ', '')}` },
    {
      kind: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ana-karina-velez-jurado-21399638/',
    },
  ],
};

export const contactEmail = EMAIL;

export const navLinks: readonly NavLink[] = [
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Contacto', href: '/#contacto' },
];
