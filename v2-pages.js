/* ============================================================================
   BAPPER V2 — page-specific script (phase 2B)
   site/v2-pages.js · built 2026-09-23 · loaded AFTER v2.js
   One component: the before/after slider on The Bench. Vanilla, no deps.
   The control is a native <input type="range">, so dragging, the arrow keys,
   Home/End, Page Up/Down and every assistive technology come for free; this
   file only mirrors its value onto a CSS custom property and keeps the
   spoken value in plain words.
   With JS off, v2-pages.css drops the clip and the two panels read as a
   plain stacked before/after.
   ========================================================================== */
(function () {
  "use strict";

  /* Desktop only. The two panes are overlaid in one grid cell, so a bubble in
     the left conversation and the matching bubble on the right start at
     different y values and the wipe cuts one of them mid-sentence. Padding the
     shorter of each pair to the taller puts row n at the same y in both panes,
     which is the geometry the wipe needs (Council 6 #8). */
  function align(root, on) {
    var a = root.querySelector(".ba-before");
    var b = root.querySelector(".ba-after");
    if (!a || !b) { return; }

    function pairs() {
      var out = [];
      out.push([a.querySelector(".ba-lab"), b.querySelector(".ba-lab")]);
      var ma = a.querySelectorAll(".thread .msg");
      var mb = b.querySelectorAll(".thread .msg");
      var n  = Math.min(ma.length, mb.length);
      for (var i = 0; i < n; i++) { out.push([ma[i], mb[i]]); }
      return out;
    }

    var ps = pairs(), i, p;
    for (i = 0; i < ps.length; i++) {
      p = ps[i];
      if (p[0]) { p[0].style.minHeight = ""; }
      if (p[1]) { p[1].style.minHeight = ""; }
    }
    if (!on) { return; }
    for (i = 0; i < ps.length; i++) {
      p = ps[i];
      if (!p[0] || !p[1]) { continue; }
      var h = Math.ceil(Math.max(p[0].getBoundingClientRect().height,
                                 p[1].getBoundingClientRect().height));
      if (h > 0) { p[0].style.minHeight = h + "px"; p[1].style.minHeight = h + "px"; }
    }
  }

  function slider() {
    var roots = document.querySelectorAll(".ba");
    if (!roots.length) { return; }

    Array.prototype.forEach.call(roots, function (root) {
      var range  = root.querySelector(".ba-range");
      var handle = root.querySelector(".ba-handle");
      if (!range) { return; }

      function wide() {
        try {
          return !window.matchMedia || window.matchMedia("(min-width: 900px)").matches;
        } catch (e) { return true; }
      }

      function paint() {
        var v = parseFloat(range.value);
        if (isNaN(v)) { v = 50; }
        root.style.setProperty("--pos", v + "%");
        if (handle) { handle.style.left = v + "%"; }
        /* the clip runs inset(0 0 0 pos): at 0 the "with the system" panel
           covers everything, at 100 it is clipped away and only the panel
           with nothing in place is left. */
        var word = v <= 2 ? "the same call with the system installed"
                 : v >= 98 ? "the call with nothing in place"
                 : Math.round(v) + " percent without the system, the rest with it";
        range.setAttribute("aria-valuetext", word);
      }

      /* Under 900px v2-pages.css stacks the two panes, hides the handle, the
         range and the hint and drops the clip, so there is nothing to drive:
         the wipe is not painted and the row padding is cleared (Council 6 #8). */
      function sync() {
        var on = wide();
        align(root, on);
        if (on) { paint(); }
      }

      range.addEventListener("input", paint);
      range.addEventListener("change", paint);
      /* a click on the drawn handle should not scroll the page on touch */
      range.addEventListener("touchmove", function (ev) {
        if (ev.cancelable) { ev.preventDefault(); }
      }, { passive: false });

      var t = null;
      window.addEventListener("resize", function () {
        if (t) { clearTimeout(t); }
        t = setTimeout(sync, 120);
      });
      if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
        document.fonts.ready.then(sync);
      }

      sync();
    });
  }

  function boot() { slider(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
