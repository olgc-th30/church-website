document.addEventListener('DOMContentLoaded', function() {
  // Carousel logic for new hero section
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-controls .dot');
  let currentSlide = 0;
  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
    currentSlide = idx;
  }
  if (dots.length && slides.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showSlide(i));
    });
    setInterval(() => showSlide((currentSlide + 1) % slides.length), 5000);
  }

  // Hide header on scroll down, show on scroll up, always show at top
  let lastScrollY = window.scrollY;
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    console.log('scrollY:', window.scrollY, 'lastScrollY:', lastScrollY, 'header-hidden:', header.classList.contains('header-hidden'));
    if (window.scrollY === 0) {
      header.classList.remove('header-hidden');
      console.log('Header shown (at top)');
    } else if (window.scrollY > lastScrollY) {
      // Scrolling down
      header.classList.add('header-hidden');
      console.log('Header hidden (scrolling down)');
    } else if (window.scrollY < lastScrollY) {
      // Scrolling up
      header.classList.remove('header-hidden');
      console.log('Header shown (scrolling up)');
    }
    lastScrollY = window.scrollY;
  });

  // Novena Modal logic
  function showNovenaModal() {
    document.getElementById('novena-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function hideNovenaModal() {
    document.getElementById('novena-modal').classList.remove('active');
    document.body.style.overflow = '';
  }
  const openNovenaBtn = document.getElementById('open-novena-modal');
  const closeNovenaBtn = document.getElementById('close-novena-modal');
  const novenaModal = document.getElementById('novena-modal');
  if (openNovenaBtn && closeNovenaBtn && novenaModal) {
    openNovenaBtn.addEventListener('click', showNovenaModal);
    closeNovenaBtn.addEventListener('click', hideNovenaModal);
    novenaModal.addEventListener('click', function(e) {
      if (e.target === this) hideNovenaModal();
    });
    setTimeout(showNovenaModal, 400); // show modal on page load after short delay
  }

  // Coming Soon Modal logic
  var comingSoonModal = document.getElementById('coming-soon-modal');
  var closeComingSoonBtn = document.getElementById('close-coming-soon-modal');
  var eventsLink = document.getElementById('events-link');
  var galleryLink = document.getElementById('gallery-link');

  function openComingSoonModal(e) {
    e.preventDefault();
    comingSoonModal.classList.add('active');
  }
  function closeComingSoonModal() {
    comingSoonModal.classList.remove('active');
  }

  if (eventsLink) eventsLink.addEventListener('click', openComingSoonModal);
  if (galleryLink) galleryLink.addEventListener('click', openComingSoonModal);
  if (closeComingSoonBtn) closeComingSoonBtn.addEventListener('click', closeComingSoonModal);
  if (comingSoonModal) comingSoonModal.addEventListener('click', function(e) {
    if (e.target === comingSoonModal) closeComingSoonModal();
  });

  // Hamburger menu logic
  const hamburger = document.getElementById('hamburger-menu');
  const nav = document.getElementById('main-nav');
  function closeNav() {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.classList.remove('nav-open');
  }
  function openNav() {
    nav.classList.add('open');
    hamburger.classList.add('open');
    document.body.classList.add('nav-open');
  }
  if (hamburger && nav) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      if (nav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });
    // Close nav when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== hamburger) {
        closeNav();
      }
    });
    // Optional: close nav on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 900) closeNav();
    });
  }
}); 