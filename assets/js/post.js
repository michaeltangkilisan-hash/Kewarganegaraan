function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Reading progress bar
const progressBar = document.querySelector('.progress__bar');

function updateProgress() {
  if (!progressBar) return;
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${pct}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Generate TOC from headings
const article = document.querySelector('article.article');
const tocList = document.querySelector('#toc-list');

if (article && tocList) {
  const headings = Array.from(article.querySelectorAll('h2, h3'));

  const items = headings
    .map((h) => {
      if (!h.id) h.id = slugify(h.textContent || 'section');
      return h;
    })
    .map((h) => ({
      id: h.id,
      text: h.textContent || '',
      level: h.tagName.toLowerCase(),
    }));

  tocList.innerHTML = items
    .map((i) => {
      const indent =
        i.level === 'h3'
          ? ' style="margin-top:0.35rem; margin-left:0.8rem;"'
          : '';
      return `<li${indent}><a href="#${i.id}" data-id="${i.id}">${i.text}</a></li>`;
    })
    .join('');

  // Active section highlight
  const tocLinks = Array.from(tocList.querySelectorAll('a[data-id]'));
  const byId = new Map(tocLinks.map((a) => [a.getAttribute('data-id'), a]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1))
        .forEach((entry) => {
          const id = entry.target.id;
          tocLinks.forEach((a) => a.classList.remove('is-active'));
          const link = byId.get(id);
          if (link) link.classList.add('is-active');
        });
    },
    { rootMargin: '-25% 0px -70% 0px', threshold: 0.1 }
  );

  headings.forEach((h) => observer.observe(h));
}

// Footer year
const yearSpan = document.querySelector('#year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
