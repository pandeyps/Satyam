// =============================================
// MIND ON CREASE — script.js
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- STICKY HEADER ----
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  hamburger.addEventListener('click', function () {
    mainNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mainNav.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav when a link is clicked
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ---- POPUP ----
  const popup = document.getElementById('popup');
  const popupClose = document.getElementById('popupClose');

  // Show popup after 8 seconds
  setTimeout(function () {
    if (!sessionStorage.getItem('popupDismissed')) {
      popup.classList.add('active');
    }
  }, 8000);

  // Close popup on close button
  popupClose.addEventListener('click', function () {
    popup.classList.remove('active');
    sessionStorage.setItem('popupDismissed', 'true');
  });

  // Close popup on overlay click
  popup.addEventListener('click', function (e) {
    if (e.target === popup) {
      popup.classList.remove('active');
      sessionStorage.setItem('popupDismissed', 'true');
    }
  });

  // Close popup on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      popup.classList.remove('active');
    }
  });

  // ---- SCROLL REVEAL ANIMATIONS ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add initial styles and observe elements
  const animateEls = document.querySelectorAll(
    '.cat-card, .article-card, .resource-card, .gear-card, .testi-card, .why-card, .stat-item'
  );

  animateEls.forEach(function (el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`;
    observer.observe(el);
  });

  // Section titles animate in
  const titleEls = document.querySelectorAll('.section-title, .email-cta-title, .final-cta-title');
  titleEls.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ---- HERO ENTRANCE ANIMATION ----
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
    requestAnimationFrame(function () {
      setTimeout(function () {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  // ---- SMOOTH FORM FEEDBACK ----
  const allForms = document.querySelectorAll('form');
  allForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '✓ You\'re In!';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        if (popup.classList.contains('active')) {
          popup.classList.remove('active');
        }
      }, 2500);
    });
  });

  // ---- ACTIVE NAV LINK on SCROLL ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--green-accent)';
      }
    });
  });

  // ---- COUNTER ANIMATION for STATS ----
  const statNums = document.querySelectorAll('.stat-big');
  let countersStarted = false;

  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  const statStrip = document.querySelector('.stat-strip');
  if (statStrip) statsObserver.observe(statStrip);

  function animateCounters() {
    statNums.forEach(function (el) {
      const text = el.textContent;
      const match = text.match(/(\d+)/);
      if (!match) return;
      const target = parseInt(match[1]);
      const suffix = text.replace(/[\d,]/g, '');
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }, 20);
    });
  }

});
