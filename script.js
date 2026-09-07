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

// Floating dock indicator + scrollspy (like adrien.website)
(function () {
  var menu = document.querySelector('.floating-menu');
  if (!menu) return;
  var indicator = document.getElementById('menuIndicator');
  var items = Array.prototype.slice.call(menu.querySelectorAll('.menu-item'));
  var linkAbout = document.getElementById('linkAbout');
  var linkWork = document.getElementById('linkWork');
  var about = document.getElementById('about');
  var work = document.getElementById('work');
  var active = linkAbout;
  var hovering = false;
  function move(target) {
    if (!target) { indicator.style.opacity = '0'; return; }
    var mr = menu.getBoundingClientRect();
    var r = target.getBoundingClientRect();
    indicator.style.transform = 'translateX(' + (r.left - mr.left) + 'px)';
    indicator.style.width = r.width + 'px';
    indicator.style.opacity = '1';
  }
  function setActive(link) {
    active = link;
    items.forEach(function (i) { i.classList.toggle('active', i === link); });
    if (!hovering) move(link);
  }
  items.forEach(function (it) {
    it.addEventListener('mouseenter', function () { hovering = true; move(it); });
  });
  menu.addEventListener('mouseleave', function () { hovering = false; move(active); });
  if ('IntersectionObserver' in window && work) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        setActive(en.target.id === 'work' ? linkWork : linkAbout);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    if (about) io.observe(about);
    io.observe(work);
  } else {
    setActive(linkAbout);
  }
  window.addEventListener('resize', function () { move(active); });
})();

// "Top up" button: appears near page bottom, scrolls to top
(function () {
  var btn = document.getElementById('toTop');
  if (!btn) return;
  function onScroll() {
    var nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 240;
    btn.classList.toggle('visible', nearBottom);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
