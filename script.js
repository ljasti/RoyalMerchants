// Utility: set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {
        el.scrollIntoView();
      }
    }
  });
});

const placeholderSrc = 'assets/placeholder.svg';
const imageExts = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
const trySetImage = (img, baseOrUrl) => {
  if (!baseOrUrl) return;
  const hasExt = /\.[a-zA-Z0-9]+$/.test(baseOrUrl);
  const candidates = hasExt ? [baseOrUrl] : imageExts.map(ext => `${baseOrUrl}${ext}`);
  const tryNext = index => {
    if (index >= candidates.length) return;
    const url = candidates[index];
    const probe = new Image();
    probe.onload = () => { img.src = url; };
    probe.onerror = () => tryNext(index + 1);
    probe.src = url;
  };
  tryNext(0);
};
document.querySelectorAll(`img[src="${placeholderSrc}"][data-image]`).forEach(img => {
  trySetImage(img, img.getAttribute('data-image'));
});

// Reveal on scroll (fallback for iOS Safari)
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
}

// Contact form: simple client-side handling
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    if (!name || !email) {
      statusEl.textContent = 'Please provide your name and a valid email.';
      statusEl.style.color = '#ffb3b3';
      return;
    }

    // Simulate submit success
    statusEl.textContent = 'Thank you! Your request has been recorded. We will contact you soon.';
    statusEl.style.color = '#0fa3b1';
    form.reset();
  });
}
