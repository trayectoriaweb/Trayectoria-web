/**
 * TRAYECTORIA v2026.11 — Canvas Engine
 * Drag & Drop táctil completo (Mobile Touch) + Desktop HTML5 Drag + Click-to-Snap
 */

(function () {
  'use strict';

  const WA_PHONE_NUMBER = '5491123456789';

  const pureState = {
    name: 'Dra. Valentina Moreno',
    title: 'PSICOTERAPIA CLÍNICA & TCC',
    phrase: 'Atención personalizada para adultos y parejas. Consultorio Palermo y sesiones online disponibles.',
    hasWhatsApp: false,
    hasPhoto: false,
    hasMaps: false,
    basePrice: 65
  };

  document.addEventListener('DOMContentLoaded', () => {
    initPureCanvasSystem();
  });

  function initPureCanvasSystem() {

    // ── Elementos del DOM
    const nameInput   = document.getElementById('pureCanvasNameInput');
    const titleInput  = document.getElementById('pureCanvasTitleInput');
    const phraseInput = document.getElementById('pureCanvasPhraseInput');

    const dropGreen = document.getElementById('dropzoneGreenPill');
    const dropRed   = document.getElementById('dropzoneRedPhoto');
    const dropBlue  = document.getElementById('dropzoneBlueMaps');

    const tokenWa    = document.getElementById('tokenWaGreen');
    const tokenPhoto = document.getElementById('tokenPhotoRed');
    const tokenMaps  = document.getElementById('tokenMapsBlue');

    const launchBtn = document.getElementById('btnLaunchPureCanvasWA');

    // ──────────────────────────────────────────────
    // 1. ESCRITURA DIRECTA SOBRE EL LIENZO
    // ──────────────────────────────────────────────
    nameInput?.addEventListener('input', () => {
      pureState.name = nameInput.value.trim() || 'Tu Nombre';
      const photoName = document.getElementById('snappedPhotoName');
      if (photoName) photoName.textContent = pureState.name;
    });

    titleInput?.addEventListener('input', () => {
      pureState.title = titleInput.textContent.trim() || 'Título Profesional';
    });

    phraseInput?.addEventListener('input', () => {
      pureState.phrase = phraseInput.textContent.trim() || 'Frase descriptiva de tu servicio';
    });

    [titleInput, phraseInput].filter(Boolean).forEach(el => {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          document.execCommand('insertLineBreak');
        }
      });
    });

    // ──────────────────────────────────────────────
    // 2. INTERACCIÓN DE TOKENS (TOUCH + DESKTOP DRAG + CLICK)
    // ──────────────────────────────────────────────
    const tokens = [tokenWa, tokenPhoto, tokenMaps].filter(Boolean);

    tokens.forEach(token => {
      token.setAttribute('draggable', 'true');

      // ── Desktop Drag & Drop
      token.addEventListener('dragstart', (e) => {
        token.classList.add('is-dragging');
        e.dataTransfer.setData('text/plain', token.dataset.token);
        e.dataTransfer.effectAllowed = 'move';
      });

      token.addEventListener('dragend', () => {
        token.classList.remove('is-dragging');
      });

      // ── Click / Tap directo
      token.addEventListener('click', (e) => {
        snapToken(token.dataset.token);
      });

      // ── Touch Drag & Drop (Mobile & Tablets)
      initMobileTouchDrag(token);
    });

    function initMobileTouchDrag(token) {
      let touchStartX = 0;
      let touchStartY = 0;
      let hasMoved = false;
      let offsetX = 0;
      let offsetY = 0;

      token.addEventListener('touchstart', (e) => {
        if (token.classList.contains('snapped-hidden')) return;
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        hasMoved = false;

        const rect = token.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
      }, { passive: true });

      token.addEventListener('touchmove', (e) => {
        if (token.classList.contains('snapped-hidden')) return;
        const touch = e.touches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;

        if (!hasMoved && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
          hasMoved = true;
          token.classList.add('is-dragging');
        }

        if (hasMoved) {
          e.preventDefault(); // Evita scroll de página al arrastrar

          token.style.position = 'fixed';
          token.style.zIndex = '9999';
          token.style.left = `${touch.clientX - offsetX}px`;
          token.style.top = `${touch.clientY - offsetY}px`;
          token.style.transform = 'scale(1.06) rotate(0deg)';
          token.style.pointerEvents = 'none'; // Permite detectar dropzone debajo

          const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
          const dropzone = elemBelow?.closest('[data-accepts]');

          document.querySelectorAll('.drag-over').forEach(z => z.classList.remove('drag-over'));
          if (dropzone && dropzone.dataset.accepts === token.dataset.token) {
            dropzone.classList.add('drag-over');
          }
        }
      }, { passive: false });

      token.addEventListener('touchend', (e) => {
        if (token.classList.contains('snapped-hidden')) return;

        if (hasMoved) {
          token.style.pointerEvents = '';
          const touch = e.changedTouches[0];
          const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
          const dropzone = elemBelow?.closest('[data-accepts]');

          document.querySelectorAll('.drag-over').forEach(z => z.classList.remove('drag-over'));

          token.classList.remove('is-dragging');
          token.style.position = '';
          token.style.zIndex = '';
          token.style.left = '';
          token.style.top = '';
          token.style.transform = '';

          // Encastrar la pieza
          snapToken(token.dataset.token);
        } else {
          // Tap simple
          snapToken(token.dataset.token);
        }
      });
    }

    // ──────────────────────────────────────────────
    // 3. DROPZONES CONFIGURATION
    // ──────────────────────────────────────────────
    setupDropzone(dropGreen, 'wa',    snapWhatsApp);
    setupDropzone(dropRed,   'photo', snapPhoto);
    setupDropzone(dropBlue,  'maps',  snapMaps);

    function setupDropzone(zone, targetType, onSnap) {
      if (!zone) return;

      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        zone.classList.add('drag-over');
      });

      zone.addEventListener('dragleave', (e) => {
        if (!zone.contains(e.relatedTarget)) {
          zone.classList.remove('drag-over');
        }
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const tokenType = e.dataTransfer.getData('text/plain');
        if (tokenType === targetType) onSnap();
      });

      zone.addEventListener('click', () => {
        if (!zone.classList.contains('is-snapped')) onSnap();
      });
    }

    // ──────────────────────────────────────────────
    // 4. SNAP FUNCTIONS
    // ──────────────────────────────────────────────
    function snapToken(type) {
      if (type === 'wa')    snapWhatsApp();
      else if (type === 'photo') snapPhoto();
      else if (type === 'maps')  snapMaps();
    }

    // SNAP 1 — WhatsApp en la pastilla verde
    function snapWhatsApp() {
      if (pureState.hasWhatsApp) return;
      pureState.hasWhatsApp = true;
      tokenWa?.classList.add('snapped-hidden');

      if (dropGreen) {
        dropGreen.classList.add('is-snapped');
        injectWaBtnStyles();
        dropGreen.innerHTML = `
          <div class="snapped-wa-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>Pedir Turno por WhatsApp</span>
            <span class="wa-online-dot"></span>
          </div>
        `;
      }
      updatePrice();
    }

    // SNAP 2 — Foto profesional real
    function snapPhoto() {
      if (pureState.hasPhoto) return;
      pureState.hasPhoto = true;
      tokenPhoto?.classList.add('snapped-hidden');

      if (dropRed) {
        dropRed.classList.add('is-snapped');
        dropRed.innerHTML = `
          <div class="snapped-photo-card">
            <img
              class="snapped-photo-img"
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=85&w=800&auto=format&fit=crop&crop=faces,center"
              alt="Foto Profesional"
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop'">
            <div class="snapped-photo-overlay">
              <div>
                <strong id="snappedPhotoName" style="font-size:1.05rem; display:block; font-weight:900; letter-spacing:-0.02em;">${pureState.name}</strong>
                <span style="font-size:0.75rem; opacity:0.88; margin-top:3px; display:block;">Matrícula Nacional Verificada · MN 48.291</span>
              </div>
              <span style="background:rgba(255,255,255,0.16); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); padding:5px 13px; border-radius:99px; font-size:0.72rem; font-weight:800; letter-spacing:0.04em; flex-shrink:0;">
                OFICIAL
              </span>
            </div>
          </div>
        `;
      }
      updatePrice();
    }

    // SNAP 3 — Google Maps estilizado
    function snapMaps() {
      if (pureState.hasMaps) return;
      pureState.hasMaps = true;
      tokenMaps?.classList.add('snapped-hidden');

      if (dropBlue) {
        dropBlue.classList.add('is-snapped');
        dropBlue.innerHTML = `
          <div class="snapped-maps-widget">
            <div class="maps-fake-vector-bg">
              <div class="maps-pin-pulse">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>
                Honduras 4800, Palermo Soho
              </div>
            </div>
            <div style="padding:10px 16px; background:#FFFFFF; display:flex; align-items:center; justify-content:space-between;">
              <span style="font-size:0.8rem; font-weight:700; color:#0F172A;">📍 Consultorio Presencial</span>
              <span style="font-size:0.75rem; font-weight:800; color:#0284C7; cursor:pointer;">Abrir en Google Maps ↗</span>
            </div>
          </div>
        `;
      }
      updatePrice();
    }

    // ──────────────────────────────────────────────
    // 5. PRECIO ANIMADO
    // ──────────────────────────────────────────────
    function updatePrice() {
      let total = pureState.basePrice;
      if (pureState.hasPhoto) total += 15;
      if (pureState.hasMaps)  total += 15;

      const priceTag = document.getElementById('pureCanvasPrice');
      if (priceTag) {
        priceTag.style.transform = 'scale(1.12)';
        priceTag.textContent = `$${total} USD`;
        setTimeout(() => { priceTag.style.transform = 'scale(1)'; }, 240);
      }
    }

    // ──────────────────────────────────────────────
    // 6. LANZAMIENTO POR WHATSAPP
    // ──────────────────────────────────────────────
    launchBtn?.addEventListener('click', (e) => {
      e.preventDefault();

      let total = pureState.basePrice;
      if (pureState.hasPhoto) total += 15;
      if (pureState.hasMaps)  total += 15;

      const items = [];
      if (pureState.hasWhatsApp) items.push('✅ Botón WhatsApp directo');
      if (pureState.hasPhoto)    items.push('✅ Foto Profesional HD');
      if (pureState.hasMaps)     items.push('✅ Ubicación Google Maps');
      if (items.length === 0)    items.push('— (configuración base)');

      const message =
        `¡Hola, equipo de Trayectoria! 👋\n\n` +
        `Armé mi web en la mesa de trabajo:\n\n` +
        `👤 *Nombre:* ${pureState.name}\n` +
        `📝 *Especialidad:* ${pureState.title}\n` +
        `💬 *Descripción:* ${pureState.phrase}\n\n` +
        `🛠️ *Elementos seleccionados:*\n${items.join('\n')}\n\n` +
        `💰 *Inversión estimada:* $${total} USD (entrega en 72hs)\n\n` +
        `¿Cuándo podemos arrancar?`;

      window.open(`https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    });

    // ──────────────────────────────────────────────
    // 7. ESTILOS INLINE DEL BOTÓN WA ENCASTRADO
    // ──────────────────────────────────────────────
    function injectWaBtnStyles() {
      if (document.getElementById('snapped-wa-styles')) return;
      const style = document.createElement('style');
      style.id = 'snapped-wa-styles';
      style.textContent = `
        .snapped-wa-btn {
          background: #16A34A;
          color: #FFFFFF;
          height: 52px;
          padding: 0 28px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 0.95rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 28px rgba(22, 163, 74, 0.45);
          animation: snapIn 0.38s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          white-space: nowrap;
        }
        .wa-online-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #86EFAC;
          flex-shrink: 0;
          animation: waPulse 2s ease-in-out infinite;
        }
        @keyframes waPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.35); }
        }
        @keyframes snapIn {
          0%   { transform: scale(0.82); opacity: 0; }
          60%  { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }

  } // fin initPureCanvasSystem

})();
