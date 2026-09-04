// Theme toggle (Figma has sun icon in topbar)
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var sun = document.getElementById('iconSun');
  var moon = document.getElementById('iconMoon');
  function paint() {
    var light = root.getAttribute('data-theme') === 'light';
    sun.style.display = light ? 'none' : '';
    moon.style.display = light ? '' : 'none';
  }
  try {
    var saved = localStorage.getItem('vm-theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}
  paint();
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('vm-theme', next); } catch (e) {}
    paint();
  });
})();

// Reveal on scroll
(function () {
  var cards = document.querySelectorAll('.card, .rows');
  cards.forEach(function (c) { c.classList.add('reveal'); });
  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (c) { c.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  cards.forEach(function (c) { io.observe(c); });
})();
