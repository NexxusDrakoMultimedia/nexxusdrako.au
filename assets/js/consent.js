/* Cookie consent for Google Analytics, using Google Consent Mode v2 (advanced).
   gtag.js always loads, but every storage type is denied until the visitor accepts, so no
   cookies are set and only cookieless pings are sent. The choice is kept in localStorage and
   can be changed from any "Cookie settings" button (data-cookie-settings). */
(function () {
  var GA_ID = 'G-ZBM5KQLBLN';
  var KEY = 'nd-analytics-consent';
  var banner = null;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function write(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* choice just won't persist */ }
  }

  var STORAGE_TYPES = ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage'];

  function consentState(value) {
    var state = {};
    STORAGE_TYPES.forEach(function (t) { state[t] = value; });
    return state;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Denied by default; a saved "granted" choice is applied before the first hit is sent.
  gtag('consent', 'default', Object.assign(consentState('denied'), { wait_for_update: 500 }));
  if (read() === 'granted') gtag('consent', 'update', consentState('granted'));
  gtag('js', new Date());
  gtag('config', GA_ID);

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(tag);

  // Remove the _ga* cookies Google set, on this host and on parent domains.
  function clearAnalyticsCookies() {
    var parts = location.hostname.split('.');
    var domains = [location.hostname];
    for (var i = 1; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name !== '_ga' && name.indexOf('_ga_') !== 0 && name !== '_gid') return;
      domains.forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
      });
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    });
  }

  function choose(value) {
    write(value);
    if (banner) { banner.remove(); banner = null; }
    gtag('consent', 'update', consentState(value));
    if (value === 'denied') clearAnalyticsCookies();
  }

  function showBanner() {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-title');
    banner.innerHTML =
      '<div class="wrap cookie-inner">' +
        '<div>' +
          '<h2 class="heading" id="cookie-title">Cookies</h2>' +
          '<p class="body-sm">I use Google Analytics cookies to see which pages get visited. They are only set if you accept; if you decline, only anonymous page pings are sent. See the <a href="/privacy/">privacy policy</a>.</p>' +
        '</div>' +
        '<div class="cookie-actions">' +
          '<button type="button" class="nd-btn nd-btn-secondary" data-choice="denied">Decline</button>' +
          '<button type="button" class="nd-btn nd-btn-secondary" data-choice="granted">Accept</button>' +
        '</div>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-choice]');
      if (btn) choose(btn.getAttribute('data-choice'));
    });
    document.body.appendChild(banner);
    banner.querySelector('[data-choice="denied"]').focus();
  }

  function init() {
    var saved = read();
    if (saved !== 'granted' && saved !== 'denied') showBanner();

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cookie-settings]')) showBanner();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
