// Main app — wiring, tweaks panel, edit mode integration, photo rendering
(function() {
  const cfgEl = document.getElementById('state-config');
  const STATE = JSON.parse(cfgEl.textContent.replace(/\/\*EDITMODE-(BEGIN|END)\*\//g, ''));

  function renderHeroPhotos() {
    const tone = STATE.tone;
    // Hero A — full-bleed portrait
    document.getElementById('heroA-bg').innerHTML = window.makePhotoPlaceholder({
      w: 1920, h: 1080, caption: 'VETERAN_PORTRAIT · DOCUMENTARY · NATURAL_LIGHT', tone
    });
    document.getElementById('heroA-mini').innerHTML = window.makePhotoPlaceholder({
      w: 100, h: 100, caption: 'MINI', tone
    });
    // Hero B — collage tiles
    document.getElementById('tileA').insertAdjacentHTML('afterbegin',
      window.makePhotoPlaceholder({ w: 500, h: 700, caption: 'REHAB · WIDE', tone }));
    document.getElementById('tileB').insertAdjacentHTML('afterbegin',
      window.makePhotoPlaceholder({ w: 500, h: 320, caption: 'THERAPY · CLOSE', tone: 'cool' }));
    document.getElementById('tileC').insertAdjacentHTML('afterbegin',
      window.makePhotoPlaceholder({ w: 500, h: 700, caption: 'FAMILY · WIDE', tone: 'warm' }));
    document.getElementById('tileD').insertAdjacentHTML('afterbegin',
      window.makePhotoPlaceholder({ w: 500, h: 320, caption: 'WORKPLACE', tone: 'ash' }));
    // Hero C — portrait
    const heroC = document.getElementById('heroC-photo');
    const existingCaption = heroC.querySelector('.hero-c-caption');
    heroC.innerHTML = window.makePhotoPlaceholder({
      w: 800, h: 1000, caption: 'OLEKSII · PORTRAIT · 50MM', tone
    });
    heroC.appendChild(existingCaption);
  }

  function showHero(which) {
    document.querySelectorAll('[data-hero]').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-hero') === which);
    });
  }

  function persist() {
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: STATE }, '*');
      localStorage.setItem('veteran-road-state', JSON.stringify(STATE));
    } catch (e) {}
  }

  function loadPersisted() {
    try {
      const s = localStorage.getItem('veteran-road-state');
      if (s) Object.assign(STATE, JSON.parse(s));
    } catch (e) {}
  }

  // Segmented control wiring
  function wireSeg(id, key, onChange) {
    const seg = document.getElementById(id);
    seg.querySelectorAll('button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === STATE[key]);
      btn.addEventListener('click', () => {
        STATE[key] = btn.dataset.value;
        seg.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
        onChange(btn.dataset.value);
        persist();
      });
    });
  }

  function applyDevice(val) {
    const root = document.documentElement;
    if (val === 'mobile') {
      document.body.style.maxWidth = '430px';
      document.body.style.margin = '0 auto';
      document.body.style.boxShadow = '0 0 0 1px rgba(0,0,0,.08), 0 20px 60px rgba(0,0,0,.2)';
      document.body.style.borderRadius = '24px';
      document.body.style.overflow = 'hidden';
      document.body.style.outline = '12px solid #0a1628';
    } else {
      document.body.style.maxWidth = '';
      document.body.style.margin = '';
      document.body.style.boxShadow = '';
      document.body.style.borderRadius = '';
      document.body.style.overflow = '';
      document.body.style.outline = '';
    }
  }

  function init() {
    loadPersisted();
    renderHeroPhotos();
    showHero(STATE.hero);
    window.applyI18n(STATE.lang);
    window.renderTimeline(STATE.lang);
    window.renderTestimonials(STATE.lang, null);
    applyDevice(STATE.device);

    // Language buttons in header
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === STATE.lang);
      btn.addEventListener('click', () => {
        STATE.lang = btn.dataset.lang;
        document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === STATE.lang));
        const segLang = document.getElementById('seg-lang');
        if (segLang) segLang.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.value === STATE.lang));
        window.applyI18n(STATE.lang);
        window.renderTimeline(STATE.lang);
        window.renderTestimonials(STATE.lang, null);
        persist();
      });
    });

    // Wire tweaks
    wireSeg('seg-hero', 'hero', showHero);
    wireSeg('seg-lang', 'lang', (v) => {
      document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === v));
      window.applyI18n(v);
      window.renderTimeline(v);
      window.renderTestimonials(v, null);
    });
    wireSeg('seg-tone', 'tone', () => {
      renderHeroPhotos();
      window.renderTestimonials(STATE.lang, null);
    });
    wireSeg('seg-device', 'device', applyDevice);

    // Tweaks close
    document.getElementById('tweaks-close').addEventListener('click', () => {
      document.getElementById('tweaks').classList.remove('open');
      try { window.parent.postMessage({ type: '__deactivate_edit_mode' }, '*'); } catch(e) {}
    });

    // IntersectionObserver — animate timeline line when in view
    const track = document.getElementById('timeline-track');
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); });
      }, { threshold: 0.3 }).observe(track);
    } else {
      track.classList.add('animate');
    }
  }

  // Edit mode protocol
  window.addEventListener('message', (ev) => {
    const data = ev.data || {};
    if (data.type === '__activate_edit_mode') {
      const t = document.getElementById('tweaks');
      t.classList.add('visible');
      requestAnimationFrame(() => t.classList.add('open'));
    } else if (data.type === '__deactivate_edit_mode') {
      const t = document.getElementById('tweaks');
      t.classList.remove('open');
      setTimeout(() => t.classList.remove('visible'), 400);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Announce edit mode available AFTER init
  setTimeout(() => {
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e) {}
  }, 50);
})();
