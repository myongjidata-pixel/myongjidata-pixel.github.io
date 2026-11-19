/* ==========================================================================
   DSLab site — display controls
   · light / dark theme (persisted in localStorage, applied before paint by the
     inline boot script in <head>)
   · KR / EN page language (persisted, translated from the dictionary in
     i18n-ko-en.js by walking text nodes and a few attributes)
   ========================================================================== */
(function () {
  'use strict';
  if (window.__dslabControls) return;
  window.__dslabControls = true;

  var D = document, R = D.documentElement;
  var THEME_KEY = 'dslab-theme', LANG_KEY = 'dslab-lang';
  var DICT = window.DSLAB_I18N || {};
  var PATTERNS = window.DSLAB_I18N_PATTERNS || [];
  var ATTRS = ['alt', 'placeholder', 'title', 'aria-label', 'content'];
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1, PRE: 1 };
  var HANGUL = /[\u3131-\u318E\uAC00-\uD7A3]/;

  /* ---------- dictionary lookup table ---------- */
  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };
  var N = {};
  Object.keys(DICT).forEach(function (k) { N[norm(k)] = DICT[k]; });

  var lang = 'ko', applying = false;

  /* ---------- text helpers ---------- */
  function eachText(root, fn) {
    if (!root) return;
    if (root.nodeType === 3) { fn(root); return; }
    var w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [], n;
    while ((n = w.nextNode())) list.push(n);
    for (var i = 0; i < list.length; i++) fn(list[i]);
  }

  function eachEl(root, fn) {
    if (!root || root.nodeType !== 1) return;
    fn(root);
    var all = root.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) fn(all[i]);
  }

  /* exact match, then 'A · B' composites, then numeric patterns such as "10장" */
  function lookup(v) {
    var key = norm(v);
    if (N[key] != null) return N[key];
    if (key.indexOf(' · ') > -1) {
      var parts = key.split(' · '), ok = true, out = [];
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (!HANGUL.test(p)) { out.push(p); continue; }
        var q = N[p];
        if (q == null) { ok = false; break; }
        out.push(q);
      }
      if (ok) return out.join(' · ');
    }
    for (var j = 0; j < PATTERNS.length; j++) {
      if (PATTERNS[j][0].test(key)) return key.replace(PATTERNS[j][0], PATTERNS[j][1]);
    }
    return null;
  }

  function translateText(node) {
    var v = node.nodeValue;
    if (!v || !HANGUL.test(v)) return;
    var t = lookup(v);
    if (t == null) return;
    if (node.__ko === undefined) node.__ko = v;
    var lead = /^\s*/.exec(v)[0], trail = /\s*$/.exec(v)[0];
    var out = lead + t + trail;
    node.__tr = out;
    if (node.nodeValue !== out) node.nodeValue = out;
  }

  function restoreText(node) {
    if (node.__tr !== undefined && node.nodeValue === node.__tr) node.nodeValue = node.__ko;
    node.__ko = undefined; node.__tr = undefined;
  }

  function translateAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], v = el.getAttribute && el.getAttribute(a);
      if (!v || !HANGUL.test(v)) continue;
      var t = lookup(v);
      if (t == null) continue;
      if (!el.__koAttrs) el.__koAttrs = {};
      if (!el.__koAttrs[a]) el.__koAttrs[a] = v;
      el.setAttribute(a, t);
    }
  }

  function restoreAttrs(el) {
    if (!el.__koAttrs) return;
    Object.keys(el.__koAttrs).forEach(function (a) { el.setAttribute(a, el.__koAttrs[a]); });
    el.__koAttrs = null;
  }

  function translateTree(root) {
    eachText(root, translateText);
    eachEl(root, translateAttrs);
  }

  function restoreTree(root) {
    eachText(root, restoreText);
    eachEl(root, restoreAttrs);
  }

  /* ---------- language ---------- */
  function setLang(next, save) {
    lang = next === 'en' ? 'en' : 'ko';
    applying = true;
    if (lang === 'en') translateTree(D.body);
    else restoreTree(D.body);
    if (D.head) {
      if (lang === 'en') translateTree(D.head); else restoreTree(D.head);
    }
    applying = false;
    R.setAttribute('lang', lang);
    R.setAttribute('data-lang', lang);
    if (save) { try { localStorage.setItem(LANG_KEY, lang); } catch (e) {} }
    syncButtons();
  }

  /* ---------- theme ---------- */
  function setTheme(next, save) {
    if (next === 'dark') R.setAttribute('data-theme', 'dark');
    else R.removeAttribute('data-theme');
    if (save) { try { localStorage.setItem(THEME_KEY, next); } catch (e) {} }
    syncButtons();
  }

  function currentTheme() { return R.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  /* ---------- control cluster ---------- */
  var SUN = '<svg class="sc-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="4.1"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6"/></svg>';
  var MOON = '<svg class="sc-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20.4 14.6A8.6 8.6 0 1 1 9.4 3.6a6.9 6.9 0 0 0 11 11z"/></svg>';

  function buildCluster(float) {
    var box = D.createElement('div');
    box.className = 'sc-tools' + (float ? ' sc-float' : '');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Language and theme');

    var grp = D.createElement('div');
    grp.className = 'sc-lang';
    grp.setAttribute('role', 'group');
    grp.setAttribute('aria-label', 'Language');
    [['ko', 'KR'], ['en', 'EN']].forEach(function (pair) {
      var b = D.createElement('button');
      b.type = 'button';
      b.textContent = pair[1];
      b.setAttribute('data-sc-lang', pair[0]);
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () { setLang(pair[0], true); });
      grp.appendChild(b);
    });

    var tb = D.createElement('button');
    tb.type = 'button';
    tb.className = 'sc-theme';
    tb.innerHTML = SUN + MOON;
    tb.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });

    box.appendChild(grp);
    box.appendChild(tb);
    return box;
  }

  function syncButtons() {
    var os = D.querySelectorAll('.sc-lang button');
    for (var i = 0; i < os.length; i++) {
      os[i].setAttribute('aria-pressed', os[i].getAttribute('data-sc-lang') === lang ? 'true' : 'false');
    }
    var ds = D.querySelectorAll('.sc-theme');
    for (var j = 0; j < ds.length; j++) {
      var dark = currentTheme() === 'dark';
      ds[j].setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
      ds[j].setAttribute('title', dark ? 'Light mode' : 'Dark mode');
      ds[j].setAttribute('aria-pressed', dark ? 'true' : 'false');
    }
    // keep the label in the page language
    if (lang === 'en') {
      for (var k = 0; k < ds.length; k++) {
        ds[k].setAttribute('aria-label', currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      }
    }
  }

  function mount() {
    var hdr = D.querySelector('header');
    if (hdr) {
      var nav = hdr.querySelector('nav') || hdr;
      var menu = nav.querySelector('.menu');
      var burger = nav.querySelector('.burger');
      var cluster = buildCluster(false);
      if (menu && menu.parentNode === nav) nav.insertBefore(cluster, menu.nextSibling);
      else if (burger) nav.insertBefore(cluster, burger);
      else nav.appendChild(cluster);

      var bg = '';
      try { bg = getComputedStyle(hdr).backgroundColor; } catch (e) {}
      if (!bg || bg === 'transparent' || /rgba\(0, 0, 0, 0\)/.test(bg)) hdr.setAttribute('data-sc', 'over');
    } else {
      // pages without a header (404) are already a dark splash screen:
      // only the language switch is useful there
      var float = buildCluster(true);
      var tb = float.querySelector('.sc-theme');
      if (tb) tb.remove();
      D.body.appendChild(float);
    }
  }

  /* ---------- boot ---------- */
  function init() {
    mount();

    var savedLang = 'ko', savedTheme = 'light';
    try {
      savedLang = localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'ko';
      savedTheme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    } catch (e) {}
    if (R.getAttribute('data-theme') === 'dark') savedTheme = 'dark';
    if (R.getAttribute('lang') === 'en') savedLang = 'en';
    setTheme(savedTheme, false);
    setLang(savedLang, false);

    // content rendered by the pages' own scripts after load (news, album, …)
    var mo = new MutationObserver(function (muts) {
      if (lang !== 'en' || applying) return;
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'childList') {
          for (var j = 0; j < m.addedNodes.length; j++) {
            var n = m.addedNodes[j];
            if (n.nodeType === 1) translateTree(n);
            else if (n.nodeType === 3) translateText(n);
          }
        } else if (m.type === 'characterData') {
          translateText(m.target);
        }
      }
    });
    // observe the whole document: page scripts also rewrite <title> (news detail)
    mo.observe(D.documentElement, { childList: true, subtree: true, characterData: true });
  }

  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init);
  else init();
})();
