// Page behaviour: nav, rotating role, scroll reveals, logo fallbacks, contact mandala.
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year stays current without editing the HTML.
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Experience counts up from the start month in data-since (YYYY-MM).
  const exp = document.getElementById('exp');
  if (exp && exp.dataset.since) {
    const [sy, sm] = exp.dataset.since.split('-').map(Number);
    const now = new Date();
    const months = Math.max(0, (now.getFullYear() - sy) * 12 + (now.getMonth() + 1 - sm));
    const y = Math.floor(months / 12), m = months % 12;
    const part = (n, word) => n ? `${n} ${word}${n > 1 ? 's' : ''}` : '';
    exp.textContent = [part(y, 'year'), part(m, 'month')].filter(Boolean).join(' ') || 'Less than a month';
  }

  // Smooth, eased scrolling for mouse wheels and trackpads (touch stays native).
  // Skipped when the visitor asks for reduced motion or the library didn't load.
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    const tick = (time) => { lenis.raf(time); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    // In-page links (nav, buttons) glide to their section, leaving room for the fixed nav.
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#') return;
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: el.id === 'top' ? 0 : -64 });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  }

  // Nav turns solid once you leave the hero; mobile menu toggle.
  const nav = document.querySelector('nav');
  let solid = null;
  const onScroll = () => { const s = scrollY > 40; if (s !== solid) { solid = s; nav.classList.toggle('solid', s); } };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const btn = document.querySelector('.menu-btn'), list = document.getElementById('menu');
  btn.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  list.addEventListener('click', (e) => { if (e.target.tagName === 'A') { list.classList.remove('open'); btn.setAttribute('aria-expanded', false); } });

  // Highlight the nav link for the section in view.
  const links = [...list.querySelectorAll('a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.hash === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

  // Rotating discipline in the hero.
  const words = [...document.querySelectorAll('.rot span')];
  let i = 0;
  if (!reduce && words.length) setInterval(() => {
    words[i].classList.remove('on');
    i = (i + 1) % words.length;
    words[i].classList.add('on');
  }, 2600);

  // Reveal sections once as they enter.
  const rev = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el, n) => {
    el.style.transitionDelay = (el.dataset.delay || 0) + 'ms';
    rev.observe(el);
  });

  // If a logo fails to load, show its short name instead.
  document.querySelectorAll('.logo img').forEach((img) => {
    const swap = () => {
      const b = document.createElement('b');
      b.textContent = img.dataset.abbr || img.alt.slice(0, 2);
      img.replaceWith(b);
    };
    if (img.complete && !img.naturalWidth) swap(); else img.addEventListener('error', swap);
  });

  // Contact mandala: rings of petals drawn in SVG.
  const m = document.querySelector('.mandala');
  if (m) {
    const NS = 'http://www.w3.org/2000/svg';
    const rings = [[24, 70, 12], [16, 120, 20], [32, 170, 16], [48, 225, 14], [64, 280, 10]];
    rings.forEach(([count, r, len], k) => {
      for (let j = 0; j < count; j++) {
        const a = (j / count) * Math.PI * 2;
        const p = document.createElementNS(NS, 'path');
        const x = 300 + Math.cos(a) * r, y = 300 + Math.sin(a) * r;
        p.setAttribute('d', `M0 ${-len} C${len * 0.6} ${-len * 0.3} ${len * 0.6} ${len * 0.3} 0 ${len} C${-len * 0.6} ${len * 0.3} ${-len * 0.6} ${-len * 0.3} 0 ${-len}Z`);
        p.setAttribute('transform', `translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`);
        p.setAttribute('fill', 'none');
        p.setAttribute('stroke', k % 2 ? '#FFB627' : '#E5397F');
        p.setAttribute('stroke-width', '1.2');
        m.appendChild(p);
      }
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', 300); c.setAttribute('cy', 300); c.setAttribute('r', r + len + 6);
      c.setAttribute('fill', 'none'); c.setAttribute('stroke', '#1F4A5C'); c.setAttribute('stroke-width', '1');
      m.appendChild(c);
    });
  }
})();
