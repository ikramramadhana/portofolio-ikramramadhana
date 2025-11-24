// Simple scroll reveal animations using Intersection Observer

const revealElements = document.querySelectorAll('.section, .work-item, .hero-intro, .hero-center');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((el) => {
  el.classList.add('will-reveal');
  observer.observe(el);
});

// Navbar scroll effect
const nav = document.querySelector('.top-nav');

window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 10) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});
