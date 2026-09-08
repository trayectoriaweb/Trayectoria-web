/* ================================================================
   TRAYECTORIA — app.js v2026.clean.1
   1. Reveal on scroll
   2. Showcase slider (fade manual)
   3. Nav on-light cuando llega a contact
   4. Iframe scale
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. REVEAL ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Hero: revelar inmediatamente al cargar
  document.querySelectorAll('.hero-section [data-reveal]').forEach(el => {
    setTimeout(() => el.classList.add('is-revealed'), 100);
  });

  // Resto: IntersectionObserver
  document.querySelectorAll('[data-reveal]:not(.hero-section [data-reveal])').forEach(el => {
    revealObserver.observe(el);
  });


  /* ---- 2. SHOWCASE SLIDER ---- */
  const slides      = document.querySelectorAll('.showcase-slide');
  const dots        = document.querySelectorAll('.snav-dot');
  const btnPrev     = document.getElementById('snavPrev');
  const btnNext     = document.getElementById('snavNext');
  const showcaseNav = document.querySelector('.showcase-nav');
  let current     = 0;
  let animating   = false;

  // Estado inicial: todos absolutos y ocultos excepto el primero
  slides.forEach((slide, i) => {
    slide.style.position   = i === 0 ? 'relative' : 'absolute';
    slide.style.opacity    = i === 0 ? '1' : '0';
    slide.style.pointerEvents = i === 0 ? 'auto' : 'none';
    if (i !== 0) {
      slide.style.top = '0';
      slide.style.left = '0';
      slide.style.width = '100%';
      slide.style.height = '100%';
    }
  });

  function goTo(index) {
    if (animating || index < 0 || index >= slides.length || index === current) return;
    animating = true;

    slides[current].style.opacity      = '0';
    slides[current].style.pointerEvents = 'none';
    slides[current].style.position     = 'absolute';

    current = index;

    slides[current].style.position     = 'relative';
    slides[current].style.opacity      = '1';
    slides[current].style.pointerEvents = 'auto';

    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    if (btnPrev) btnPrev.disabled = current === 0;
    if (btnNext) btnNext.disabled = current === slides.length - 1;

    setTimeout(() => { animating = false; }, 450);
  }

  if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
  if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  if (btnPrev) btnPrev.disabled = true;

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!showcaseNav || !showcaseNav.classList.contains('is-visible')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
  });


  /* ---- 3. SHOWCASE NAV: visible cuando el showcase está en pantalla ---- */
  const showcaseSection = document.getElementById('showcase');
  if (showcaseSection && showcaseNav) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => showcaseNav.classList.toggle('is-visible', e.isIntersecting));
    }, { threshold: 0.2 }).observe(showcaseSection);
  }


  /* ---- 4. NAV on-light cuando llega a contact ---- */
  const siteNav        = document.getElementById('siteNav');
  const contactSection = document.getElementById('contact');
  if (siteNav && contactSection) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => siteNav.classList.toggle('on-light', e.isIntersecting));
    }, { threshold: 0.1 }).observe(contactSection);
  }


  /* ---- 5. IFRAME SCALE ---- */
  function scaleIframes() {
    document.querySelectorAll('.slide-frame').forEach(frame => {
      const iframe = frame.querySelector('iframe');
      if (!iframe) return;
      const scale = frame.offsetWidth / 1440;
      iframe.style.transform = `scale(${scale})`;
      iframe.style.height    = (frame.offsetHeight / scale) + 'px';
    });
  }

  scaleIframes();
  window.addEventListener('resize', scaleIframes);

});
