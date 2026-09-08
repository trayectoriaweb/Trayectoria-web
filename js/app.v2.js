/* ================================================================
   TRAYECTORIA — app.v2.js v2026.editorial.poster.1
   Interacciones para la web editorial modernista
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Navegación activa según Scroll ---- */
  const navLinks = document.querySelectorAll('.poster-nav-list .nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---- 2. Micro-interacción: Inclinación sutil (tilt) en las formas orgánicas del Hero ---- */
  const organicFrames = document.querySelectorAll('.hero-poster-section .organic-frame');

  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelector('.hero-poster-section')?.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      organicFrames.forEach((frame, idx) => {
        const factor = (idx % 2 === 0 ? 1 : -1) * (idx + 1) * 1.5;
        frame.style.transform = `translate(${deltaX * factor}px, ${deltaY * factor}px)`;
      });
    });

    document.querySelector('.hero-poster-section')?.addEventListener('mouseleave', () => {
      organicFrames.forEach(frame => {
        frame.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /* ---- 3. Smooth scroll para anclas ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
