/* Hamburger menu: the nav list is plain links without JS; with JS it collapses behind a toggle. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-menu');
    if (!btn || !nav) return;
    function set(open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', open);
    }
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) set(false);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) set(false);
    });
  });
})();
