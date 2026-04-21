/* ===========================
   RAGHAV GUPTA — PORTFOLIO JS
   script.js
=========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Custom Cursor ──────────────────────────────
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth cursor follow
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .project-card, .timeline-item, .pill, .tag, .btn-primary, .btn-ghost'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide cursor on mobile
  if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) {
    document.body.classList.add('no-cursor');
  }


  // ── Scroll-triggered Nav ──────────────────────
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });


  // ── Reveal on Scroll ──────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  // ── Skill Bars Animation ──────────────────────
  const barFills = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  barFills.forEach(bar => barObserver.observe(bar));


  // ── Hero Title Stagger ────────────────────────
  const heroRevealItems = document.querySelectorAll('.hero .reveal');
  heroRevealItems.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 120);
  });


  // ── Active Nav Link Highlight ─────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, {
    threshold: 0.4
  });

  sections.forEach(s => sectionObserver.observe(s));


  // ── Smooth Scroll for Nav Links ───────────────
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ── Parallax on Hero BG Text ──────────────────
  const heroBgText = document.querySelector('.hero-bg-text');
  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBgText.style.transform = `translate(-50%, calc(-50% + ${y * 0.25}px))`;
    }, { passive: true });
  }


  // ── Project Card Tilt Effect ──────────────────
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transformOrigin = 'center';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ── Counter Animation ─────────────────────────
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const duration = 1600;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);
        const suffix = text.includes('+') ? '+' : '';
        animateCounter(el, num, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  statNums.forEach(el => counterObserver.observe(el));


  // ── Timeline Item Hover Glow ──────────────────
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.timeline-marker').style.boxShadow = '0 0 0 8px rgba(212, 168, 83, 0.2)';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.timeline-marker').style.boxShadow = '0 0 0 4px rgba(212, 168, 83, 0.15)';
    });
  });


  // ── Nav Active Styling ────────────────────────
  const navStyle = document.createElement('style');
  navStyle.textContent = `.nav-link.active { color: var(--amber); }
  .nav-link.active::after { width: 100%; }`;
  document.head.appendChild(navStyle);


  // ── Page load fade in ─────────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);

});
