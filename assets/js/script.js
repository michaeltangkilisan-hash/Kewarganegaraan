const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after clicking a link (mobile)
  nav.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      if (!nav.classList.contains('is-open')) return;
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth scroll with header offset
function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  const header = document.querySelector('.header');
  const offset = header ? header.offsetHeight + 12 : 72;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href.length < 2) return;
    e.preventDefault();
    history.pushState(null, '', href);
    scrollToHash(href);
  });
});

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

// Contact form (client-side only)
const form = document.querySelector('#contact-form');
const hint = document.querySelector('#form-hint');

if (form && hint) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !email || !message) {
      hint.textContent = 'Mohon lengkapi Nama, Email, dan Pesan.';
      return;
    }

    hint.textContent = 'Terima kasih! Pesanmu sudah siap dikirim via email.';

    const subject = encodeURIComponent(`Pesan dari ${name}`);
    const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`);

    // Email tujuan
    const to = 'michaeljuferson10@gmail.com';
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

// Footer year
const yearSpan = document.querySelector('#year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
