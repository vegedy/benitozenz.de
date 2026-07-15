/* ================================================================
   PORTFOLIO — script.js
   ================================================================ */

(function () {
  'use strict';

  /* ---------- THEME TOGGLE ---------- */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let currentTheme = 'dark'; // default dark
  root.setAttribute('data-theme', currentTheme);

  function updateToggleIcon() {
    if (!themeToggle) return;
    if (currentTheme === 'dark') {
      themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
      themeToggle.setAttribute('aria-label', 'Zum hellen Modus wechseln');
    } else {
      themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      themeToggle.setAttribute('aria-label', 'Zum dunklen Modus wechseln');
    }
  }

  updateToggleIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcon();
    });
  }


  /* ---------- SCROLL-AWARE HEADER ---------- */
  const header = document.getElementById('site-header');
  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
    // Hide header on scroll down, show on scroll up
    if (scrollY > lastScrollY && scrollY > 200) {
      header.classList.add('site-header--hidden');
    } else {
      header.classList.remove('site-header--hidden');
    }
    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });


  /* ---------- ACTIVE NAV LINK ---------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');

  function updateActiveNav() {
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', function () {
    requestAnimationFrame(updateActiveNav);
  }, { passive: true });


  /* ---------- HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open');
      document.body.style.overflow = mobileNav.classList.contains('is-open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }


  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ---------- SCROLL REVEAL (JS fallback) ---------- */
  // For browsers that don't support animation-timeline: view()
  if (!CSS.supports('animation-timeline', 'view()')) {
    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach(function (el) {
      el.classList.remove('fade-in');
      el.classList.add('fade-in-js');
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in-js').forEach(function (el) {
      observer.observe(el);
    });
  }

})();
