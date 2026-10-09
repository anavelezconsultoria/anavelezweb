/**
 * Interacciones del sitio. Todo es mejora progresiva: sin JavaScript el
 * contenido se ve completo, y con "reducir movimiento" no se anima nada.
 */

const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Revela elementos [data-revelar] cuando entran en pantalla. */
function revelarAlHacerScroll(): void {
  const elementos = document.querySelectorAll<HTMLElement>('[data-revelar]');
  if (sinMovimiento || !('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('visible'));
    return;
  }
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
  );
  elementos.forEach((el) => observador.observe(el));
}

/** Cuenta hacia arriba los numeros [data-contar] cuando se ven. */
function contarNumeros(): void {
  const numeros = document.querySelectorAll<HTMLElement>('[data-contar]');
  const animar = (el: HTMLElement): void => {
    const destino = Number(el.dataset['contar']);
    const sufijo = el.dataset['sufijo'] ?? '';
    if (sinMovimiento || Number.isNaN(destino)) return;
    const inicio = performance.now();
    const paso = (ahora: number): void => {
      const t = Math.min(1, (ahora - inicio) / 1400);
      el.textContent = `${Math.round(destino * (1 - Math.pow(1 - t, 3)))}${sufijo}`;
      if (t < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };
  const observador = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      animar(entrada.target as HTMLElement);
      observador.unobserve(entrada.target);
    }
  });
  numeros.forEach((el) => observador.observe(el));
}

/** Palabras que rotan en el hero. */
function rotarPalabras(): void {
  document.querySelectorAll<HTMLElement>('[data-rotar]').forEach((contenedor) => {
    const palabras = Array.from(contenedor.querySelectorAll<HTMLElement>('.rotativa'));
    if (sinMovimiento || palabras.length < 2) return;
    let actual = 0;
    setInterval(() => {
      palabras[actual]?.classList.remove('activa');
      palabras[actual]?.classList.add('saliendo');
      const anterior = palabras[actual];
      setTimeout(() => anterior?.classList.remove('saliendo'), 600);
      actual = (actual + 1) % palabras.length;
      palabras[actual]?.classList.add('activa');
    }, 2600);
  });
}

/** Los circulos del hero siguen levemente el mouse. */
function parallaxHero(): void {
  const hero = document.querySelector<HTMLElement>('[data-parallax]');
  if (!hero || sinMovimiento || matchMedia('(hover: none)').matches) return;
  let cuadro = 0;
  hero.addEventListener('pointermove', (evento) => {
    cancelAnimationFrame(cuadro);
    cuadro = requestAnimationFrame(() => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--px', `${((evento.clientX - r.left) / r.width - 0.5).toFixed(3)}`);
      hero.style.setProperty('--py', `${((evento.clientY - r.top) / r.height - 0.5).toFixed(3)}`);
    });
  });
}

/** Foco de luz que sigue el cursor sobre las tarjetas [data-foco]. */
function focoEnTarjetas(): void {
  if (matchMedia('(hover: none)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-foco]').forEach((tarjeta) => {
    tarjeta.addEventListener('pointermove', (evento) => {
      const r = tarjeta.getBoundingClientRect();
      tarjeta.style.setProperty('--fx', `${evento.clientX - r.left}px`);
      tarjeta.style.setProperty('--fy', `${evento.clientY - r.top}px`);
    });
  });
}

/** Sombra en el header al hacer scroll. */
function headerAlHacerScroll(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const actualizar = (): void => {
    header.classList.toggle('con-scroll', window.scrollY > 8);
  };
  window.addEventListener('scroll', actualizar, { passive: true });
  actualizar();
}

revelarAlHacerScroll();
contarNumeros();
rotarPalabras();
parallaxHero();
focoEnTarjetas();
headerAlHacerScroll();
