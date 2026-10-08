# anavelezweb

Sitio de marca personal de Ana Karina Vélez Jurado: consultoría de software y tecnología.
Producción: https://anavelezconsultora.com

## Stack

- Astro 7, salida 100% estática. No hay servidor ni base de datos.
- TypeScript en modo `strictest`; `npm run build` corre `astro check` antes de compilar.
- Fuentes self-hosted (Krona One + Inter Variable): sin peticiones a terceros.
- Imágenes optimizadas en build (`astro:assets`): WebP con `srcset`.
- Despliegue con GitHub Actions a GitHub Pages en cada push a `main`.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type check + build a dist/
npm run preview   # sirve dist/
```

## Estructura

```
src/
  types/content.ts        Contratos de contenido (interfaces)
  data/                   Todo el texto del sitio. Editar aquí, no en las páginas
    profile.ts            Datos personales, contacto, navegación
    services.ts           Servicios, especialidades, credenciales, principios
    projects.ts           Proyectos y sus diagramas de arquitectura
  lib/
    diagram-layout.ts     Layout puro de diagramas (horizontal / vertical)
    contact-form.ts       Envío del formulario (mejora progresiva)
  components/             Componentes de UI reutilizables
  layouts/BaseLayout.astro  SEO, Open Graph, JSON-LD, header y footer
  pages/                  Rutas: /, /proyectos, /sobre-mi, /gracias, 404
  styles/global.css       Tokens del design system
```

## Design system

Los tokens viven en `src/styles/global.css`. Los componentes consumen tokens y no definen valores propios.

| Token | Valor | Uso |
|---|---|---|
| `--color-blue` | `#003cff` | Acción primaria, acentos, eyebrows |
| `--color-navy` | `#001f80` | Datos en diagramas, conectores |
| `--color-lavender` | `#d7bafc` | Bordes, decoración |
| `--color-lavender-soft` | `#efe8ff` | Fondos de sección destacada |
| `--color-cream` | `#fff6f1` | Fondo base |
| `--color-ink` | `#0a0a0a` | Texto principal, sección de contacto |
| `--color-muted` | `#4a4a78` | Texto secundario |

- Tipografía: Krona One para títulos y Inter para cuerpo. La escala fluida va de `--text-xs` a `--text-h1`.
- Espaciado: escala de 4px (`--space-1` a `--space-8`) y `--space-section` para el ritmo vertical.
- Breakpoints: 960px, 860px, 720px (menú móvil y diagramas verticales) y 560px.

### Diagramas de arquitectura

Cada proyecto declara su diagrama como datos (nodos en una grilla col/row, conexiones y límites como "AWS").
`ArchitectureDiagram` genera dos SVG: uno horizontal para escritorio y uno vertical para móvil, con la grilla transpuesta.
Para agregar un proyecto basta con añadir una entrada en `src/data/projects.ts`.

## Formulario de contacto

Usa [Web3Forms](https://web3forms.com): no necesita backend y los mensajes llegan al correo.

1. Crear la llave en web3forms.com con `ana.velez.consultora@gmail.com`.
2. En GitHub: Settings > Secrets and variables > Actions > Variables, crear `WEB3FORMS_ACCESS_KEY`.
3. En local: copiar `.env.example` a `.env` y poner la llave.

Sin llave, el sitio muestra una tarjeta con el correo en lugar del formulario; nunca queda un formulario roto.
La llave es pública por diseño. La protección anti-spam está en el campo honeypot `botcheck`.

## Despliegue y dominio

1. En el repo: Settings > Pages > Source: **GitHub Actions**.
2. Hacer push a `main`. El workflow `.github/workflows/deploy.yml` compila y publica.
3. Dominio: con despliegue por Actions, GitHub ignora `public/CNAME`; el dominio se configura en Settings > Pages > Custom domain (`anavelezconsultora.com`). El archivo se conserva solo como referencia. En GoDaddy > DNS:
   - Registros `A` para `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Registro `CNAME` para `www`: `anavelezconsultora.github.io`
4. En Settings > Pages: confirmar el dominio y activar **Enforce HTTPS** cuando el certificado esté listo.
