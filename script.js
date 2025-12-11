// Smooth scrolling for in-page navigation
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    const offset = 70; // approximate header height
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  });
});

// Filter cards by category
const filterButtons = document.querySelectorAll('.filter-btn');
const kategoriCards = document.querySelectorAll('#kategori-grid .card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active button styling
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide cards
    kategoriCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Toggle refleksi detail
const toggleRefleksiBtn = document.querySelector('.toggle-refleksi');
const refleksiDetail = document.querySelector('#refleksi-detail');

if (toggleRefleksiBtn && refleksiDetail) {
  toggleRefleksiBtn.addEventListener('click', () => {
    const isHidden = refleksiDetail.classList.contains('is-collapsed');
    if (isHidden) {
      refleksiDetail.classList.remove('is-collapsed');
      toggleRefleksiBtn.textContent = 'Sembunyikan refleksi';
    } else {
      refleksiDetail.classList.add('is-collapsed');
      toggleRefleksiBtn.textContent = 'Baca refleksi lengkap';
    }
  });
}

// Set dynamic year in footer
const yearSpan = document.querySelector('#year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
