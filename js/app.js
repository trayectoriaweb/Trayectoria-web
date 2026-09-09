/* ================================================================
   TRAYECTORIA — app.js v2026.slider.1
   Slider vertical continuo con efecto de expansión en pantalla fija
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const stage = document.getElementById('sliderStage');
  const track = document.getElementById('slidesTrack');
  const slides = Array.from(document.querySelectorAll('.slide-row'));
  const totalSlides = slides.length;

  let currentIndex = 0;
  let isAnimating = false;
  const ANIM_DURATION = 800;

  function updateSlider(animate = true) {
    if (!stage || !track || slides.length === 0) return;

    const stageHeight = stage.clientHeight;
    const activeSlide = slides[currentIndex];

    slides.forEach((slide, idx) => {
      const isActive = (idx === currentIndex);
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', !isActive);
    });

    const slideTop = activeSlide.offsetTop;
    const slideHeight = activeSlide.clientHeight;
    const targetY = (stageHeight / 2) - (slideTop + slideHeight / 2);

    track.style.transition = animate ? 'transform 0.82s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
    track.style.transform = `translateY(${targetY}px)`;
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides || index === currentIndex || isAnimating) return;

    isAnimating = true;
    currentIndex = index;
    updateSlider(true);

    setTimeout(() => {
      isAnimating = false;
    }, ANIM_DURATION);
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }

  window.addEventListener('wheel', (e) => {
    if (drawerBackdrop && drawerBackdrop.classList.contains('is-open')) return;

    e.preventDefault();

    if (isAnimating) return;

    if (e.deltaY > 25) {
      nextSlide();
    } else if (e.deltaY < -25) {
      prevSlide();
    }
  }, { passive: false });

  let touchStartY = 0;
  let touchEndY = 0;

  window.addEventListener('touchstart', (e) => {
    if (drawerBackdrop && drawerBackdrop.classList.contains('is-open')) return;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (drawerBackdrop && drawerBackdrop.classList.contains('is-open')) return;
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchend', (e) => {
    if (drawerBackdrop && drawerBackdrop.classList.contains('is-open')) return;
    touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Escape') {
      closeDrawer();
    }
  });

  slides.forEach((slide, idx) => {
    slide.addEventListener('click', (e) => {
      if (idx !== currentIndex) {
        e.preventDefault();
        goToSlide(idx);
        return;
      }

      const mediaWrap = e.target.closest('.slide-media-wrap');
      if (mediaWrap) {
        const url = slide.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      }
    });
  });

  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const btnMoreTrajectories = document.getElementById('btnMoreTrajectories');
  const btnHeaderContact = document.getElementById('btnHeaderContact');
  const btnDrawerClose = document.getElementById('btnDrawerClose');

  function openDrawer() {
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('is-open');
    }
  }

  function closeDrawer() {
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('is-open');
    }
  }

  if (btnMoreTrajectories) btnMoreTrajectories.addEventListener('click', openDrawer);
  if (btnHeaderContact) btnHeaderContact.addEventListener('click', openDrawer);
  if (btnDrawerClose) btnDrawerClose.addEventListener('click', closeDrawer);

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) {
        closeDrawer();
      }
    });
  }

  window.addEventListener('resize', () => {
    updateSlider(false);
  });

  setTimeout(() => {
    updateSlider(false);
  }, 60);

});
