(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('nav-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.querySelectorAll('.project-thumb img, .project-row-thumb img, .carousel-img').forEach(img => {
    const hideOnError = () => { img.style.display = 'none'; };
    // A later image (e.g. the next carousel slide) may load fine, so show it again
    img.addEventListener('load', () => { img.style.display = ''; });
    if (img.complete && img.naturalWidth === 0) {
      hideOnError();
    } else {
      img.addEventListener('error', hideOnError);
    }
  });

  // Click a carousel screenshot to view it full size; click or Esc closes it
  document.querySelectorAll('.carousel-img').forEach(img => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'lightbox';
      const full = document.createElement('img');
      full.src = img.src;
      full.alt = img.alt;
      overlay.appendChild(full);
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('is-open'));
      const close = () => {
        overlay.classList.remove('is-open');
        document.removeEventListener('keydown', onKey);
        setTimeout(() => overlay.remove(), 200);
      };
      const onKey = (e) => { if (e.key === 'Escape') close(); };
      overlay.addEventListener('click', close);
      document.addEventListener('keydown', onKey);
    });
  });
})();
