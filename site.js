/* ============================================================================
   Bapper Labs — shared behaviour (site.js)
   Header state and mobile menu, scroll reveals, headline word split, card
   spotlight, timeline rail, FAQ, the before/after slider and the inline
   enquiry form. Every block is isolated: if one fails the rest still run, and
   the page stays fully readable because nothing is hidden until a script has
   actually taken over (see site.css: .in and .is-live).
   ========================================================================== */
(function () {
  'use strict';
  var d = document;
  var mm = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };
  var RM = mm('(prefers-reduced-motion: reduce)');
  var HOVER = mm('(hover: hover) and (pointer: fine)');
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var listeners = [];
  var B = window.BAP = { RM: RM, HOVER: HOVER, $: $, $$: $$, clamp: clamp, onScroll: function (fn) { listeners.push(fn); } };
  function run(fn) { try { fn(); } catch (e) { if (window.console && console.error) console.error(e); } }

  /* ---------- headline word split ---------- */
  run(function () {
    if (RM) return;
    $$('.split').forEach(function (el) {
      var i = 0;
      (function walk(node) {
        [].slice.call(node.childNodes).forEach(function (n) {
          if (n.nodeType === 3) {
            var frag = d.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function (tok) {
              if (!tok) return;
              if (/^\s+$/.test(tok)) { frag.appendChild(d.createTextNode(' ')); return; }
              var w = d.createElement('span'); w.className = 'w';
              var s = d.createElement('span'); s.textContent = tok; s.style.setProperty('--i', i++);
              w.appendChild(s); frag.appendChild(w);
            });
            node.replaceChild(frag, n);
          } else if (n.nodeType === 1) { walk(n); }
        });
      })(el);
    });
  });

  /* ---------- reveal on scroll ----------
     Elements are visible by default. An element that is about to enter the
     viewport gets .in, which plays its entrance. Anything already on screen
     after a jump (anchor link, End key) is left alone rather than flashed. */
  run(function () {
    if (RM || !('IntersectionObserver' in window)) return;
    var first = true;
    var io = new IntersectionObserver(function (es) {
      var vh = window.innerHeight;
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        if (!first && e.boundingClientRect.top < vh * 0.72) return;
        e.target.classList.add('in');
      });
      first = false;
    }, { threshold: 0, rootMargin: '0px 0px 8% 0px' });
    $$('[data-r], .split').forEach(function (el) { io.observe(el); });
  });

  /* ---------- header: stuck state, progress bar, hero parallax ---------- */
  run(function () {
    var nav = $('#nav'); if (!nav) return;
    var prog = $('#prog'), hero = $('.hero, .phero'), hint = $('#scrollHint');
    var pars = hero ? $$('[data-par]', hero).map(function (el) { return { el: el, r: parseFloat(el.getAttribute('data-par')) }; }) : [];
    var ticking = false, heroH = hero ? hero.offsetHeight : 0;
    function frame() {
      ticking = false;
      var sy = window.pageYOffset || 0;
      nav.classList.toggle('is-stuck', sy > 24);
      if (prog) {
        var max = d.documentElement.scrollHeight - window.innerHeight;
        prog.style.transform = 'scaleX(' + (max > 0 ? clamp(sy / max, 0, 1) : 0) + ')';
      }
      if (!RM && sy < heroH) {
        for (var i = 0; i < pars.length; i++) pars[i].el.style.transform = 'translate3d(0,' + (sy * pars[i].r).toFixed(1) + 'px,0)';
      }
      if (hint) hint.style.opacity = sy > 40 ? 0 : 1;
      for (var j = 0; j < listeners.length; j++) { try { listeners[j](sy); } catch (e) {} }
    }
    function req() { if (!ticking) { ticking = true; window.requestAnimationFrame(frame); } }
    B.heroHeight = function () { return heroH; };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', function () { heroH = hero ? hero.offsetHeight : 0; req(); });
    frame();
    /* run once more after the page scripts below have registered listeners */
    window.requestAnimationFrame(frame);
  });

  /* ---------- header: mobile menu ---------- */
  run(function () {
    var nav = $('#nav'), btn = $('#navToggle'), menu = $('#navMenu');
    if (!nav || !btn || !menu) return;
    function set(open) {
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function () { set(!nav.classList.contains('is-open')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { set(false); btn.focus(); } });
    d.addEventListener('click', function (e) { if (nav.classList.contains('is-open') && !nav.contains(e.target)) set(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 900) set(false); });
  });

  /* ---------- header: mark the section in view (same-page links only) ---------- */
  run(function () {
    if (!('IntersectionObserver' in window)) return;
    var links = $$('.nav__links a').filter(function (a) { return (a.getAttribute('href') || '').charAt(0) === '#'; });
    if (!links.length) return;
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) { var t = $(a.getAttribute('href')); if (t) spy.observe(t); });
  });

  /* ---------- cards: pointer spotlight ---------- */
  run(function () {
    if (!HOVER) return;
    d.addEventListener('pointermove', function (e) {
      var c = e.target.closest && e.target.closest('.sc, .card'); if (!c) return;
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  });

  /* ---------- timeline: the rail fills as you scroll ---------- */
  run(function () {
    $$('.tl').forEach(function (tl) {
      var fill = $('.tl__rail b', tl), steps = $$('.step', tl); if (!fill || !steps.length) return;
      tl.classList.add('is-live');
      function proc() {
        var r = tl.getBoundingClientRect(), mid = window.innerHeight * 0.55;
        fill.style.setProperty('--p', r.height ? clamp((mid - r.top) / r.height, 0, 1).toFixed(3) : 1);
        var at = 0;
        steps.forEach(function (s, i) {
          var on = i === 0 || s.getBoundingClientRect().top < mid;
          s.classList.toggle('is-on', on); if (on) at = i;
        });
        tl.setAttribute('data-at', at);
      }
      B.onScroll(proc); proc();
    });
  });

  /* ---------- questions: one open at a time ---------- */
  run(function () {
    $$('.faq').forEach(function (faq) {
      var qs = $$('details', faq);
      qs.forEach(function (q) { q.addEventListener('toggle', function () { if (q.open) qs.forEach(function (o) { if (o !== q) o.open = false; }); }); });
    });
  });

  /* ---------- closing mark drifts with scroll ---------- */
  run(function () {
    var cta = $('section.cta'), mark = cta && $('.cta__mark', cta);
    if (!mark || RM) return;
    B.onScroll(function () {
      var r = cta.getBoundingClientRect(); if (r.top > window.innerHeight || r.bottom < 0) return;
      mark.style.transform = 'translate3d(0,calc(-50% + ' + (r.top * 0.12).toFixed(1) + 'px),0) rotate(' + (r.top * 0.012).toFixed(2) + 'deg)';
    });
  });

  /* ---------- before/after slider (The Bench) ----------
     The control is a native range input, so dragging, arrow keys, Home/End and
     assistive technology all work. Under 900px the two panes simply stack. */
  run(function () {
    $$('.ba').forEach(function (root) {
      var range = $('.ba-range', root), a = $('.ba-before', root), b = $('.ba-after', root);
      if (!range || !a || !b) return;
      root.classList.add('is-live');
      function wide() { return mm('(min-width: 900px)'); }
      function pairs() {
        var out = [[$('.ba-lab', a), $('.ba-lab', b)]];
        var ma = $$('.thread .msg', a), mb = $$('.thread .msg', b), n = Math.min(ma.length, mb.length);
        for (var i = 0; i < n; i++) out.push([ma[i], mb[i]]);
        return out;
      }
      function align(on) {
        var ps = pairs();
        ps.forEach(function (p) { if (p[0]) p[0].style.minHeight = ''; if (p[1]) p[1].style.minHeight = ''; });
        if (!on) return;
        ps.forEach(function (p) {
          if (!p[0] || !p[1]) return;
          var h = Math.ceil(Math.max(p[0].getBoundingClientRect().height, p[1].getBoundingClientRect().height));
          if (h > 0) { p[0].style.minHeight = h + 'px'; p[1].style.minHeight = h + 'px'; }
        });
      }
      function paint() {
        var v = parseFloat(range.value); if (isNaN(v)) v = 50;
        root.style.setProperty('--pos', v + '%');
        range.setAttribute('aria-valuetext', v <= 2 ? 'the same call with the system installed'
          : v >= 98 ? 'the call with nothing in place'
          : Math.round(v) + ' percent without the system, the rest with it');
      }
      function sync() { var on = wide(); align(on); if (on) paint(); }
      range.addEventListener('input', paint);
      range.addEventListener('change', paint);
      range.addEventListener('touchmove', function (ev) { if (ev.cancelable) ev.preventDefault(); }, { passive: false });
      var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(sync, 120); });
      if (d.fonts && d.fonts.ready && d.fonts.ready.then) d.fonts.ready.then(sync);
      sync();
    });
  });

  /* ---------- inline enquiry form (capability pages) ----------
     POSTs to data-endpoint when one exists; otherwise hands the filled message
     to the phone's SMS app, or mail on desktop, so no enquiry evaporates.
     Without JS the form posts by mailto. The texting checkbox is optional and
     is reported as an explicit yes or no. */
  run(function () {
    var form = d.getElementById('home-form'); if (!form) return;
    var done = d.getElementById('home-done'), err = d.getElementById('home-err'), btn = d.getElementById('home-submit');
    if (!done || !btn) return;
    function showDone() {
      form.hidden = true; done.hidden = false;
      try { done.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); } catch (e) {}
    }
    form.addEventListener('submit', function (ev) {
      if (!window.fetch || !window.FormData) return;
      ev.preventDefault();
      if (err) err.hidden = true;
      btn.disabled = true;
      btn.textContent = 'Sending…';
      var action = form.getAttribute('data-endpoint') || '';
      var payload = new FormData(form);
      var smsBox = form.querySelector('input[name="sms_consent"]');
      if (smsBox) payload.set('sms_consent', smsBox.checked ? 'yes' : 'no');
      var f = function (k) { return (payload.get(k) || '').toString().trim(); };
      if (!action) {
        var lines = [
          'Bapper: ' + f('name') + (f('website') ? ' / ' + f('website') : ''),
          f('phone') ? 'Phone: ' + f('phone') : '',
          smsBox ? 'Texts OK: ' + (smsBox.checked ? 'yes' : 'no') : '',
          f('email') ? 'Email: ' + f('email') : '',
          f('message') ? 'Message: ' + f('message') : ''
        ].filter(Boolean);
        var body = lines.join('\n');
        var mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        window.location.href = mobile
          ? 'sms:+16162274477?&body=' + encodeURIComponent(body)
          : 'mailto:hello@bapperlabs.com?subject=' + encodeURIComponent('Bapper: ' + (f('name') || 'assessment')) + '&body=' + encodeURIComponent(body);
        setTimeout(showDone, 800);
        return;
      }
      fetch(action, { method: 'POST', body: payload })
        .then(function () { showDone(); })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = 'Send it';
          if (err) { err.hidden = false; err.textContent = 'That did not go through here. Sending it the long way — or call (616) 227-4477.'; }
          form.submit();
        });
    });
  });
})();
