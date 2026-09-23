/* ============================================================================
   BAPPER V2 — site behaviour
   site/v2.js · vanilla, no dependencies, no build step.
   Everything here is enhancement: with JS off or reduced motion on, the page
   already renders in its correct end state (see v2.css sections 7 and 22).
   ========================================================================== */
(function () {
  "use strict";

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE    = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  var DESKTOP = function () { return window.innerWidth >= 900; };
  var BAR     = 64;

  function on(el, ev, fn, opt) { if (el) { el.addEventListener(ev, fn, opt || false); } }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* ------------------------------------------------------------------ 1. reveal
     .up -> .in, staggered 60ms inside a shared parent so a row of cards
     arrives as a sequence rather than a flash. */
  function reveal() {
    var items = $$(".up");
    if (!items.length) { return; }
    if (REDUCED || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        var el = e.target;
        io.unobserve(el);
        var delay = Math.min(n * 60, 240);
        n += 1;
        if (delay) { setTimeout(function () { el.classList.add("in"); }, delay); }
        else { el.classList.add("in"); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------------- 2. sticky nav
     Compacts once the hero is behind us; the wordmark swaps white -> lockup. */
  function nav() {
    var header = $("header.site");
    if (!header) { return; }
    var toggle = $(".navtoggle", header);
    var drawer = $(".navdrawer", header);
    var menu   = $(".navmenu", header);
    var top    = menu ? $(".navtop", menu) : null;

    /* Compact only once the dark hero is behind us: a translucent paper bar
       floating over the navy band reads as muddy grey. */
    var hero = $(".hero");
    var trigger = hero ? Math.max(120, hero.offsetHeight - 120) : 72;
    on(window, "resize", function () { trigger = hero ? Math.max(120, hero.offsetHeight - 120) : 72; });

    var compact = false;
    function onScroll() {
      var want = window.pageYOffset > trigger;
      if (want !== compact) {
        compact = want;
        header.classList.toggle("is-compact", compact);
      }
    }
    on(window, "scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && drawer) {
      on(toggle, "click", function () {
        var open = drawer.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$("a", drawer).forEach(function (a) {
        on(a, "click", function () {
          drawer.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    if (menu && top) {
      var close = function () { menu.classList.remove("is-open"); top.setAttribute("aria-expanded", "false"); };
      on(top, "click", function (e) {
        e.preventDefault();
        var open = menu.classList.toggle("is-open");
        top.setAttribute("aria-expanded", open ? "true" : "false");
      });
      on(document, "click", function (e) { if (!menu.contains(e.target)) { close(); } });
      on(document, "keydown", function (e) { if (e.key === "Escape") { close(); } });
      on(menu, "focusout", function () {
        setTimeout(function () { if (!menu.contains(document.activeElement)) { close(); } }, 0);
      });
    }
  }

  /* --------------------------------------------------------- 3. hero parallax
     Three planes at 0.15 / 0.35 / 1.0. transform3d only, rAF-coalesced,
     off on touch and on reduced motion. */
  function parallax() {
    var hero = $(".hero");
    if (!hero || REDUCED || !FINE) { return; }
    var planes = $$("[data-rate]", hero);
    if (!planes.length) { return; }
    var ticking = false, visible = true;

    function paint() {
      ticking = false;
      if (!visible) { return; }
      var y = window.pageYOffset;
      for (var i = 0; i < planes.length; i++) {
        var r = parseFloat(planes[i].getAttribute("data-rate")) || 0;
        planes[i].style.transform = "translate3d(0," + (y * r).toFixed(1) + "px,0)";
      }
    }
    function request() { if (!ticking) { ticking = true; window.requestAnimationFrame(paint); } }
    on(window, "scroll", request, { passive: true });
    on(window, "resize", request);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) { request(); }
      }, { threshold: 0 }).observe(hero);
    }
    request();
  }

  /* ------------------------------------------------- 4. pointer dot field
     A low-density grid of dots that eases toward the pointer. Desktop and a
     fine pointer only; the loop stops as soon as the field has settled, so it
     costs nothing while the visitor reads. */
  function dotfield() {
    var cv = document.getElementById("dotfield");
    if (!cv || REDUCED || !FINE || !DESKTOP()) { return; }
    var ctx = cv.getContext && cv.getContext("2d");
    if (!ctx) { return; }

    var host = cv.parentNode, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, dots = [], GAP = 54, R = 150;
    var px = -9999, py = -9999, cx = -9999, cy = -9999;
    var running = false, visible = true;

    function build() {
      W = host.offsetWidth; H = host.offsetHeight;
      if (!W || !H) { return; }
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (var x = GAP / 2; x < W; x += GAP) {
        for (var y = GAP / 2; y < H; y += GAP) { dots.push({ x: x, y: y }); }
      }
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i], dx = d.x - cx, dy = d.y - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var t = dist < R ? (1 - dist / R) : 0;
        var a = 0.10 + t * 0.34;
        var r = 1 + t * 1.3;
        var ox = t * dx * 0.10, oy = t * dy * 0.10;   /* dots lean away from the cursor */
        ctx.beginPath();
        ctx.fillStyle = "rgba(169,182,212," + a.toFixed(3) + ")";
        ctx.arc(d.x + ox, d.y + oy, r, 0, 6.2832);
        ctx.fill();
      }
    }

    function loop() {
      cx += (px - cx) * 0.05;
      cy += (py - cy) * 0.05;
      draw();
      if (visible && (Math.abs(px - cx) > 0.6 || Math.abs(py - cy) > 0.6)) {
        window.requestAnimationFrame(loop);
      } else { running = false; }
    }
    function kick() { if (!running && visible) { running = true; window.requestAnimationFrame(loop); } }

    on(host, "mousemove", function (e) {
      var r = host.getBoundingClientRect();
      px = e.clientX - r.left; py = e.clientY - r.top;
      kick();
    });
    on(host, "mouseleave", function () { px = -9999; py = -9999; kick(); });
    on(window, "resize", function () { build(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) { kick(); } },
        { threshold: 0 }).observe(host);
    }
    build();
  }

  /* -------------------------------------------------------------- 5. count-up
     Only real numbers reach this function; see research/41 for sourcing. */
  function countups() {
    var els = $$("[data-count]");
    if (!els.length) { return; }
    function set(el, v) {
      var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      el.textContent = dec ? v.toFixed(dec) : String(Math.round(v));
    }
    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      if (isNaN(target)) { return; }
      if (REDUCED) { set(el, target); return; }
      var t0 = null, dur = 900;
      function frame(ts) {
        if (t0 === null) { t0 = ts; }
        var p = clamp((ts - t0) / dur, 0, 1);
        var e = 1 - Math.pow(1 - p, 3);
        set(el, target * e);
        if (p < 1) { window.requestAnimationFrame(frame); } else { set(el, target); }
      }
      window.requestAnimationFrame(frame);
    }
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { run(el); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        io.unobserve(e.target);
        run(e.target);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { el.textContent = "0"; io.observe(el); });
  }

  /* ------------------------------------------------------- 6. phase stepper
     Pinned on desktop; the visual swaps by scroll progress. Under 900px, or
     with reduced motion, the four phases are plain stacked cards and this
     function only wires the rail (which is hidden anyway). */
  function stepper() {
    var root = $(".stepper");
    if (!root) { return; }
    var wrap  = $(".pinwrap", root);
    var steps = $$(".step", root);
    var tabs  = $$(".rail button", root);
    if (!wrap || steps.length < 2) { return; }

    var active = -1;
    function show(i) {
      if (i === active) { return; }
      active = i;
      steps.forEach(function (s, n) { s.classList.toggle("is-on", n === i); });
      tabs.forEach(function (t, n) { t.setAttribute("aria-selected", n === i ? "true" : "false"); });
    }

    /* The pinned 3,000px stepper is the home page's signature and stays unique
       to it: a section marked .steps-static renders the four phases as plain
       cards, figures and all, at every width (Council 6 #12). */
    function pinnable() {
      return DESKTOP() && !REDUCED && !root.classList.contains("steps-static");
    }

    function sync() {
      if (!root.classList.contains("is-pinnable")) { return; }
      var rect = root.getBoundingClientRect();
      var range = root.offsetHeight - wrap.offsetHeight;
      if (range <= 0) { show(0); return; }
      var p = clamp((BAR - rect.top) / range, 0, 1);
      show(clamp(Math.floor(p * steps.length), 0, steps.length - 1));
    }

    function mode() {
      if (pinnable()) {
        root.classList.add("is-pinnable");
        show(-1); sync();
        if (active < 0) { show(0); }
      } else {
        root.classList.remove("is-pinnable");
        steps.forEach(function (s) { s.classList.add("is-on"); });
        active = -1;
      }
    }

    var ticking = false;
    on(window, "scroll", function () {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(function () { ticking = false; sync(); });
    }, { passive: true });
    on(window, "resize", function () { mode(); });

    tabs.forEach(function (t, n) {
      on(t, "click", function () {
        if (!root.classList.contains("is-pinnable")) { return; }
        var range = root.offsetHeight - wrap.offsetHeight;
        var target = root.offsetTop - BAR + (range * ((n + 0.5) / steps.length));
        window.scrollTo({ top: Math.round(target), behavior: REDUCED ? "auto" : "smooth" });
      });
    });

    mode();
  }

  /* ------------------------------------- 7. the five-gap list (ported from V1)
     Markup renders statically so the section is complete with JS off; with JS
     on it is re-rendered from #clogs-data and the written CTA deep-links to
     /start with the chosen gap pre-ticked. Audience toggle retained, dormant. */
  function gaps() {
    var root = document.getElementById("breaks-first");
    if (!root) { return; }
    var dataEl = document.getElementById("clogs-data");
    if (!dataEl) { return; }
    var DECKS;
    try { DECKS = JSON.parse(dataEl.textContent); } catch (err) { return; }
    if (!DECKS || !DECKS.local) { return; }

    var rowsEl    = root.querySelector(".bf-rows");
    var introEl   = root.querySelector(".bf-intro");
    var ctaEl     = document.getElementById("bf-cta");
    var telEl     = document.getElementById("bf-tel");
    var noteEl    = document.getElementById("bf-cta-note");
    var kickerEl  = document.getElementById("bf-kicker");
    var questionEl= document.getElementById("bf-question");
    var ntlBody   = document.getElementById("ntl-body");
    var ntlTexts  = $$(".ntl-text[data-ntl]");
    var audBtns   = $$(".bf-aud", root);
    if (!rowsEl || !ctaEl || !noteEl) { return; }

    var DEFAULT_HREF = ctaEl.getAttribute("href");
    var STORE_KEY = "bapper.clogs.audience";
    var audience = "local";
    var selectedKey = null;

    function defaultNote() { return DECKS[audience].cta_note || noteEl.textContent; }
    function esc(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function markAssumptions(s) {
      return esc(s).replace(/\[ASSUMPTION:[^\]]*\]/g, function (m) { return '<span class="bf-assume">' + m + "</span>"; });
    }
    function num(i) { return (i < 9 ? "0" : "") + (i + 1); }
    function quoteify(s) { return esc(String(s).replace(/^"/, "“").replace(/"$/, "”")); }
    function startHrefFor(clog) { return "start.html?clog=" + encodeURIComponent(clog.key); }
    function findClog(key) {
      var list = DECKS[audience].clogs;
      for (var i = 0; i < list.length; i++) { if (list[i].key === key) { return list[i]; } }
      return null;
    }

    function rowHTML(clog, i) {
      var optId = "bf-opt-" + clog.key, cardId = "bf-card-" + clog.key;
      return '' +
        '<div class="bf-item" data-key="' + esc(clog.key) + '">' +
          '<button type="button" class="bf-choice" role="radio" aria-checked="false" aria-expanded="false"' +
            ' aria-controls="' + cardId + '" id="' + optId + '" tabindex="-1">' +
            '<span class="bf-n">' + num(i) + '</span>' +
            '<span class="bf-choice-text">' + esc(clog.breaks_first_option) + '</span>' +
            '<span class="bf-mark" aria-hidden="true"></span>' +
          '</button>' +
          '<div class="bf-card" id="' + cardId + '" role="region" aria-labelledby="' + optId + '">' +
            '<p class="bf-symptom">' + quoteify(clog.symptom) + '</p>' +
            '<h4 class="bf-headline">' + esc(clog.headline) + '</h4>' +
            '<p class="bf-install">' + esc(clog.what_we_install) + '</p>' +
            '<dl class="bf-facts">' +
              '<div class="bf-fact"><dt>Lands in</dt><dd>' + esc(clog.lands_in) + '</dd></div>' +
              '<div class="bf-fact"><dt>What it\'s worth</dt><dd>' + markAssumptions(clog.worth) + '</dd></div>' +
            '</dl>' +
          '</div>' +
        '</div>';
    }

    function resetCTA() { ctaEl.setAttribute("href", DEFAULT_HREF); noteEl.textContent = defaultNote(); }

    function openFirst() {
      var first = rowsEl.querySelector(".bf-item");
      if (!first) { return; }
      first.classList.add("is-open");
      first.querySelector(".bf-choice").setAttribute("aria-expanded", "true");
    }

    function paintChrome() {
      var deck = DECKS[audience];
      if (kickerEl && deck.kicker) { kickerEl.textContent = deck.kicker; }
      if (questionEl && deck.question) { questionEl.textContent = deck.question; }
      if (ntlBody && deck.ntl_body) { ntlBody.textContent = deck.ntl_body; }
      if (deck.three_places) {
        for (var i = 0; i < ntlTexts.length; i++) {
          var t = deck.three_places[parseInt(ntlTexts[i].getAttribute("data-ntl"), 10)];
          if (t) { ntlTexts[i].textContent = t; }
        }
      }
      root.setAttribute("data-aud", audience);
    }

    function choices() { return rowsEl.querySelectorAll(".bf-choice"); }

    function setRovingDefault() {
      var list = choices();
      for (var i = 0; i < list.length; i++) { list[i].tabIndex = (i === 0 ? 0 : -1); }
    }

    function select(key, moveFocus) {
      var items = rowsEl.querySelectorAll(".bf-item"), found = false;
      for (var i = 0; i < items.length; i++) {
        var item = items[i], btn = item.querySelector(".bf-choice");
        var isOn = item.getAttribute("data-key") === key;
        if (isOn) { found = true; item.classList.add("is-open"); } else { item.classList.remove("is-open"); }
        btn.setAttribute("aria-checked", isOn ? "true" : "false");
        btn.setAttribute("aria-expanded", isOn ? "true" : "false");
        btn.tabIndex = isOn ? 0 : -1;
        if (isOn && moveFocus) { btn.focus(); }
      }
      if (!found) { selectedKey = null; resetCTA(); setRovingDefault(); return; }
      selectedKey = key;
      var clog = findClog(key);
      if (clog) {
        ctaEl.setAttribute("href", startHrefFor(clog));
        noteEl.textContent = "The written path opens with “" + clog.breaks_first_option +
          "” already ticked. The number reaches the person who builds the system.";
      }
    }

    function render() {
      var deck = DECKS[audience], html = "";
      for (var i = 0; i < deck.clogs.length; i++) { html += rowHTML(deck.clogs[i], i); }
      rowsEl.innerHTML = html;
      if (introEl) { introEl.textContent = deck.intro_line; }
      for (var j = 0; j < audBtns.length; j++) {
        var pressed = audBtns[j].getAttribute("data-aud") === audience;
        audBtns[j].setAttribute("aria-pressed", pressed ? "true" : "false");
        audBtns[j].textContent = DECKS[audBtns[j].getAttribute("data-aud")].toggle_label;
      }
      paintChrome();
      if (selectedKey && findClog(selectedKey)) { select(selectedKey, false); }
      else { selectedKey = null; resetCTA(); setRovingDefault(); openFirst(); }
    }

    function setAudience(next) {
      if (!DECKS[next]) { return; }
      audience = next;
      try { window.localStorage.setItem(STORE_KEY, next); } catch (err) { /* private mode */ }
      render();
    }
    audBtns.forEach(function (b) { on(b, "click", function () { setAudience(b.getAttribute("data-aud")); }); });

    on(rowsEl, "click", function (ev) {
      var btn = ev.target.closest ? ev.target.closest(".bf-choice") : null;
      if (!btn) { return; }
      var item = btn.parentNode, key = item.getAttribute("data-key");
      if (key === selectedKey) {
        item.classList.remove("is-open");
        btn.setAttribute("aria-checked", "false");
        btn.setAttribute("aria-expanded", "false");
        selectedKey = null;
        resetCTA();
        openFirst();
        return;
      }
      select(key, false);
    });

    on(rowsEl, "keydown", function (ev) {
      var btn = ev.target.closest ? ev.target.closest(".bf-choice") : null;
      if (!btn) { return; }
      var list = choices(), idx = -1;
      for (var i = 0; i < list.length; i++) { if (list[i] === btn) { idx = i; } }
      if (idx < 0) { return; }
      var next = -1;
      if (ev.key === "ArrowDown" || ev.key === "ArrowRight") { next = (idx + 1) % list.length; }
      else if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") { next = (idx - 1 + list.length) % list.length; }
      else if (ev.key === "Home") { next = 0; }
      else if (ev.key === "End") { next = list.length - 1; }
      else { return; }
      ev.preventDefault();
      select(list[next].parentNode.getAttribute("data-key"), true);
    });

    render();
  }

  /* ------------------------------------------------------- 8. the inline form
     Same behaviour as start.html: POST to data-endpoint when one exists,
     otherwise hand the filled message to the phone's SMS app (or mail on
     desktop) so no enquiry evaporates. Without JS the form posts by mailto. */
  function inlineForm() {
    var form = document.getElementById("home-form");
    if (!form) { return; }
    var done = document.getElementById("home-done");
    var err  = document.getElementById("home-err");
    var btn  = document.getElementById("home-submit");
    if (!done || !btn) { return; }

    function showDone() {
      form.hidden = true; done.hidden = false;
      try { done.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" }); } catch (e) { /* ignore */ }
    }

    on(form, "submit", function (ev) {
      if (!window.fetch || !window.FormData) { return; }
      ev.preventDefault();
      if (err) { err.hidden = true; }
      btn.disabled = true;
      btn.textContent = "Sending…";

      var action = form.getAttribute("data-endpoint") || "";
      var payload = new FormData(form);
      var f = function (k) { return (payload.get(k) || "").toString().trim(); };

      if (!action) {
        var lines = [
          "Bapper: " + f("name") + (f("website") ? " / " + f("website") : ""),
          f("phone") ? "Phone: " + f("phone") : "",
          f("email") ? "Email: " + f("email") : "",
          f("message") ? "Message: " + f("message") : ""
        ].filter(Boolean);
        var body = lines.join("\n");
        var mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        window.location.href = mobile
          ? "sms:+16162274477?&body=" + encodeURIComponent(body)
          : "mailto:hello@bapperlabs.com?subject=" + encodeURIComponent("Bapper: " + (f("name") || "assessment")) +
            "&body=" + encodeURIComponent(body);
        setTimeout(showDone, 800);
        return;
      }

      fetch(action, { method: "POST", body: payload })
        .then(function () { showDone(); })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = "Send it";
          if (err) {
            err.hidden = false;
            err.textContent = "That did not go through here. Sending it the long way — or call (616) 227-4477.";
          }
          form.submit();
        });
    });
  }

  /* ------------------------------------------------------------------- boot */
  function boot() {
    nav();
    reveal();
    parallax();
    dotfield();
    countups();
    stepper();
    gaps();
    inlineForm();
  }
  if (document.readyState === "loading") { on(document, "DOMContentLoaded", boot); } else { boot(); }
})();
