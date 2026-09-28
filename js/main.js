(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;

  // Preloader
  addEventListener('load', () => {
    setTimeout(() => document.querySelector('.preloader')?.classList.add('done'), reduceMotion ? 0 : 700);
  });

  // Header state
  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled', scrollY > 28);
  addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }));
  }

  // Hero letters
  const letters = document.querySelectorAll('.wordmark span');
  if (!reduceMotion) {
    letters.forEach((letter, i) => {
      setTimeout(() => {
        letter.style.transition = 'transform 1s cubic-bezier(.22,1,.36,1), opacity .8s ease';
        letter.style.transform = 'translateY(0) rotateX(0deg)';
        letter.style.opacity = '1';
      }, 470 + i * 80);
    });
  } else letters.forEach(l => { l.style.opacity = '1'; l.style.transform = 'none'; });

  // Reveal
  const revealItems = document.querySelectorAll('.reveal, .split-reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .11, rootMargin: '0px 0px -5% 0px' });

    revealItems.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 5, 4) * 55}ms`;
      io.observe(el);
    });
  } else revealItems.forEach(el => el.classList.add('visible'));

  // Scroll progress
  const progress = document.querySelector('.scroll-progress span');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${(max > 0 ? scrollY / max : 0) * 100}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Spotlight coordinate per section
  document.querySelectorAll('.spotlight-section').forEach(section => {
    section.addEventListener('pointermove', e => {
      const r = section.getBoundingClientRect();
      section.style.setProperty('--mx', `${e.clientX - r.left}px`);
      section.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // 3D tilt
  document.querySelectorAll('[data-tilt]').forEach(card => {
    if (reduceMotion || coarse) return;
    const intensity = Number(card.dataset.tiltIntensity || 6);
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(1200px) rotateX(${y * -intensity}deg) rotateY(${x * intensity}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .75s cubic-bezier(.22,1,.36,1)';
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      setTimeout(() => card.style.transition = '', 760);
    });
  });

  // Magnetic elements
  document.querySelectorAll('.magnetic').forEach(el => {
    if (reduceMotion || coarse) return;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * .12}px,${dy * .16}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
  });

  // Cursor glow
  const glow = document.querySelector('.cursor-glow');
  if (glow && !reduceMotion && !coarse) {
    let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty;
    addEventListener('mousemove', e => {
      tx = e.clientX; ty = e.clientY;
      glow.style.opacity = '.95';
    });
    const follow = () => {
      x += (tx - x) * .08;
      y += (ty - y) * .08;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      requestAnimationFrame(follow);
    };
    follow();
  }

  // Hero parallax
  if (!reduceMotion) {
    const heroObject = document.querySelector('.hero-object-wrap');
    const manifestoOrb = document.querySelector('.manifesto-orb');
    const contactArt = document.querySelector('.contact-logo-art');
    const parallax = () => {
      const sy = scrollY;
      if (heroObject) heroObject.style.translate = `0 ${Math.min(sy * .07, 74)}px`;
      if (manifestoOrb) manifestoOrb.style.translate = `0 ${Math.max(-40, (sy - innerHeight) * -.025)}px`;
      if (contactArt) contactArt.style.translate = `0 ${(sy - document.body.scrollHeight * .72) * .025}px`;
    };
    addEventListener('scroll', parallax, { passive: true });
    parallax();
  }

  // Minimal starfield for dark sections
  const canvas = document.getElementById('starfield');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let dpr = Math.min(devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count = Math.min(85, Math.floor(innerWidth / 15));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: Math.random() * .9 + .2,
        s: Math.random() * .08 + .015,
        a: Math.random() * .22 + .04
      }));
    };

    const draw = () => {
      ctx.clearRect(0,0,innerWidth,innerHeight);
      for (const p of stars) {
        p.y -= p.s;
        if (p.y < -4) { p.y = innerHeight + 4; p.x = Math.random() * innerWidth; }
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };

    addEventListener('resize', resize);
    resize(); draw();
  }

  // WhatsApp
  document.querySelectorAll('.whatsapp-link').forEach(link => {
    const phone = (link.dataset.phone || '').replace(/\D/g,'');
    const msg = encodeURIComponent(link.dataset.message || '');
    link.href = `https://wa.me/${phone}${msg ? `?text=${msg}` : ''}`;
  });


  // Scroll depth parallax for selected sections
  if (!reduceMotion) {
    const scrollLayers = [
      ['.manifesto-orb', -0.045],
      ['.metal-orb-a', -0.035],
      ['.metal-orb-b', 0.028],
      ['.contact-logo-art', -0.02]
    ];

    const updateScrollLayers = () => {
      scrollLayers.forEach(([selector, speed]) => {
        const el = document.querySelector(selector);
        if (!el) return;
        const rect = el.parentElement?.getBoundingClientRect();
        if (!rect) return;
        const centerDelta = (rect.top + rect.height / 2) - innerHeight / 2;
        el.style.setProperty('--scroll-y', `${centerDelta * speed}px`);
        el.style.transform = `translateY(${centerDelta * speed}px)`;
      });
    };

    addEventListener('scroll', updateScrollLayers, { passive: true });
    updateScrollLayers();
  }


  // Service accordion
  document.querySelectorAll('.service-accordion').forEach((panel) => {
    const trigger = panel.querySelector('.service-trigger');
    const details = panel.querySelector('.service-details');
    if (!trigger || !details) return;

    trigger.addEventListener('click', () => {
      const willOpen = !panel.classList.contains('open');

      document.querySelectorAll('.service-accordion.open').forEach((other) => {
        if (other === panel) return;
        other.classList.remove('open');
        other.querySelector('.service-trigger')?.setAttribute('aria-expanded', 'false');
        other.querySelector('.service-details')?.setAttribute('aria-hidden', 'true');
      });

      panel.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
      details.setAttribute('aria-hidden', String(!willOpen));
    });
  });

})();
