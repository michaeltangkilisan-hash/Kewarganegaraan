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

// Tabs (Docs / YouTube / Presentasi)
(function initTabs() {
  const root = document.querySelector('[data-tabs]');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
  if (tabs.length === 0 || panels.length === 0) return;

  function activate(tab) {
    const id = tab.getAttribute('aria-controls');
    if (!id) return;

    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
    });

    panels.forEach((p) => {
      p.hidden = p.id !== id;
    });
  }

  tabs.forEach((t) => t.addEventListener('click', () => activate(t)));

  tabs.forEach((t, idx) => {
    t.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Home' && key !== 'End') return;
      e.preventDefault();

      let nextIdx = idx;
      if (key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
      if (key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
      if (key === 'Home') nextIdx = 0;
      if (key === 'End') nextIdx = tabs.length - 1;

      const next = tabs[nextIdx];
      next.focus();
      activate(next);
    });
  });

  const initiallySelected = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
  activate(initiallySelected);
})();

// Footer year
const yearSpan = document.querySelector('#year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
