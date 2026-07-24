// Vertical Timeline — Scroll Reveal
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.vtl-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vtl-visible');
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
});