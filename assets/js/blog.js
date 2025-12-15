// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => io.observe(el));

// Footer year
const yearSpan = document.querySelector('#year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
