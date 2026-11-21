// Progressive enhancement: adds category filter chips above the Projects grid.
(function () {
  var grid = document.querySelector('#projects .card-grid');
  if (!grid) return;
  var groups = {
    'Games': ['Game', 'Game dev', 'Board games', 'Software'],
    'Mods': ['Mod', 'Translation'],
    'Music': ['Music'],
    'Worlds': ['Worldbuilding', 'Geofiction'],
    'Me': ['Stream', 'Education', 'Radio', 'Design']
  };
  var labels = { 'Games': 'Games & software', 'Mods': 'Mods & patches', 'Music': 'Music', 'Worlds': 'Worlds', 'Me': 'Brand & me' };
  var items = Array.prototype.slice.call(grid.children);
  items.forEach(function (li) {
    var tag = li.querySelector('.nd-tag');
    var t = tag ? tag.textContent.trim() : '';
    li.dataset.group = Object.keys(groups).filter(function (g) { return groups[g].indexOf(t) > -1; })[0] || 'Me';
  });
  var bar = document.createElement('div');
  bar.className = 'filter-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Filter projects');
  function chip(key, text) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'nd-btn nd-btn-secondary nd-btn-sm';
    b.textContent = text;
    b.setAttribute('aria-pressed', key === 'all' ? 'true' : 'false');
    b.addEventListener('click', function () {
      Array.prototype.forEach.call(bar.children, function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
      items.forEach(function (li) { li.hidden = key !== 'all' && li.dataset.group !== key; });
    });
    bar.appendChild(b);
  }
  chip('all', 'All');
  Object.keys(groups).forEach(function (g) {
    if (items.some(function (li) { return li.dataset.group === g; })) chip(g, labels[g]);
  });
  grid.parentNode.insertBefore(bar, grid);
})();
