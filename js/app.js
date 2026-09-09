/* ================================================================
   TRAYECTORIA — app.js v2026.kinfolk.1
   Interacción StoryModule estilo Kinfolk (Hover -> Fade de foto sticky)
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const storyItems  = document.querySelectorAll('.story-item');
  const photoLayers = document.querySelectorAll('.photo-layer');

  function activateProject(projectId) {
    if (!projectId) return;

    photoLayers.forEach(layer => {
      const match = layer.dataset.project === projectId;
      layer.classList.toggle('is-active', match);
    });

    storyItems.forEach(item => {
      const match = item.dataset.project === projectId;
      item.classList.toggle('is-active', match);
    });
  }

  storyItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      activateProject(item.dataset.project);
    });

    item.addEventListener('focusin', () => {
      activateProject(item.dataset.project);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
