/* 330330.com — core site behaviour */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  window.$ = $; window.$$ = $$;

  /* ---------- shared footer (injected to keep pages light) ---------- */
  (function () {
    var slot = document.getElementById("site-footer");
    if (slot) slot.outerHTML = "<footer class=\"footer\"><div class=\"container\">\n<div class=\"f-grid\">\n<div><a class=\"logo\" href=\"index.html\" style=\"color:#fff\"><span class=\"logo-mark\">330</span><span>330330<small>想想你</small></span></a>\n<p style=\"margin-top:14px\">The Miss-You Hub for long-distance couples, families apart and everyone who misses someone. In Chinese number-code, <b>330 = 想想你</b> — \"missing you, missing you\".</p>\n<form class=\"inline-form\" data-form=\"newsletter\" id=\"f-news\"><div class=\"hp\"><input name=\"website\" tabindex=\"-1\" autocomplete=\"off\"></div><input type=\"email\" name=\"email\" required placeholder=\"Email for weekly 330 notes\" aria-label=\"Email\"><button class=\"btn btn-primary btn-sm\" type=\"submit\">Join</button></form>\n<div class=\"success\" data-for=\"f-news\">Joined! Check your inbox soon. 💌</div></div>\n<div><h4>Explore</h4><ul><li><a href=\"miss-you-messages.html\">Miss-You Messages</a></li><li><a href=\"love-codes.html\">Chinese Love Codes</a></li><li><a href=\"festivals.html\">Festivals</a></li><li><a href=\"videos.html\">Videos</a></li><li><a href=\"what-does-330-mean.html\">What does 330 mean?</a></li><li><a href=\"how-to-say-i-miss-you-in-chinese.html\">Say \"I miss you\" in Chinese</a></li></ul></div>\n<div><h4>Tools</h4><ul><li><a href=\"ldr-toolkit.html#countdown\">Reunion Countdown</a></li><li><a href=\"ldr-toolkit.html#clock\">Time-Zone Clock</a></li><li><a href=\"ldr-toolkit.html#distance\">Distance Calculator</a></li><li><a href=\"ecards.html\">E-Card Maker</a></li><li><a href=\"quiz.html\">Miss-You Quiz</a></li><li><a href=\"gifts.html\">Gift Finder</a></li></ul></div>\n<div><h4>Work with us</h4><ul><li><a href=\"get-help.html\">Get matched (free)</a></li><li><a href=\"advertise.html\">Advertise / Sponsor</a></li><li><a href=\"support.html\">Donate / Support</a></li><li><a href=\"contests.html\">Contests &amp; Prizes</a></li><li><a href=\"careers.html\">Careers &amp; Talent</a></li><li><a href=\"https://web.works/contact\" target=\"_blank\" rel=\"noopener\">Buy this domain</a></li></ul></div>\n<div><h4>About</h4><ul><li><a href=\"about.html\">About 330330</a></li><li><a href=\"contact.html\">Contact</a></li><li><a href=\"long-distance-relationship-guide.html\">LDR Guide</a></li><li><a href=\"legal.html#privacy\">Privacy</a></li><li><a href=\"legal.html#terms\">Terms</a></li><li><a href=\"legal.html#trademark\">Trademark &amp; ©</a></li></ul>\n<p style=\"margin-top:12px\"><a class=\"btn btn-gold btn-sm\" href=\"support.html\">☕ Support us</a></p></div>\n</div>\n<div class=\"disclosure\"><p><b>Trademark &amp; copyright disclosure:</b> \"330330\" is used on this site only as a descriptive number and Chinese number-code (330 = 想想你, \"missing you\"). 330330.com is an independent publication and is not affiliated with, endorsed by, or sponsored by any company, brand, product, telephone service or organisation that uses the same or a similar number. All third-party names and trademarks belong to their respective owners and are used for identification only. Original text, tools, design and code © <span data-year></span> 330330.com. All rights reserved. Some links are affiliate links — we may earn a commission at no extra cost to you. Content is for entertainment and general information only; it is not professional, legal, financial or medical advice. <a href=\"legal.html\">Full legal &amp; disclosures</a>.</p></div>\n</div></footer>\n<div class=\"cookie\" role=\"dialog\" aria-label=\"Cookie notice\"><p class=\"small\" style=\"margin:0 0 10px\">We use cookies for ads, analytics and remembering your language. See our <a href=\"legal.html#cookies\">cookie policy</a>.</p><div class=\"btn-row\"><button class=\"btn btn-primary btn-sm\" data-consent=\"all\">Accept</button><button class=\"btn btn-ghost btn-sm\" data-consent=\"essential\">Essential only</button></div></div>\n<a class=\"btn btn-primary sticky-cta\" href=\"get-help.html\">💌 Get matched</a>";
  })();

  /* ---------- safe storage ---------- */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  window.store = store;

  /* ---------- inbox (never rendered) ---------- */
  function inbox() {
    if (S.inboxIsAlias && S.inboxAlias) return S.inboxAlias;
    try { return atob(S.inbox.slice().reverse().join("").split("").reverse().join("")); } catch (e) { return ""; }
  }

  /* ---------- toast ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }
  window.toast = toast;

  /* ---------- copy & share ---------- */
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { toast("Copied ✓ 已复制"); }, fallback);
    } else fallback();
    function fallback() {
      var t = document.createElement("textarea"); t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select(); try { document.execCommand("copy"); toast("Copied ✓ 已复制"); } catch (e) {} t.remove();
    }
  }
  function share(text, url) {
    url = url || location.href;
    if (navigator.share) { navigator.share({ title: "330330 · 想想你", text: text, url: url }).catch(function () {}); return; }
    var enc = encodeURIComponent(text + " " + url);
    var w = window.open("https://wa.me/?text=" + enc, "_blank", "noopener");
    if (!w) copy(text + " " + url);
  }
  window.copyText = copy; window.shareText = share;
  document.addEventListener("click", function (e) {
    var c = e.target.closest("[data-copy]"); if (c) { e.preventDefault(); copy(c.getAttribute("data-copy")); }
    var s = e.target.closest("[data-share]"); if (s) { e.preventDefault(); share(s.getAttribute("data-share") || document.title, s.getAttribute("data-url")); }
    var m = e.target.closest("[data-mail]"); if (m) { e.preventDefault(); location.href = "mailto:" + inbox() + "?subject=" + encodeURIComponent(m.getAttribute("data-mail") || "330330.com inquiry"); }
  });

  /* ---------- nav ---------- */
  var burger = $(".burger"), menu = $(".menu");
  if (burger && menu) burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  var here = location.pathname.split("/").pop() || "index.html";
  $$(".menu a").forEach(function (a) { if (a.getAttribute("href") === here) a.classList.add("active"); });

  /* ---------- language toggle (data-zh) ---------- */
  function applyLang(lang) {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    $$("[data-zh]").forEach(function (el) {
      if (!el.hasAttribute("data-en")) el.setAttribute("data-en", el.innerHTML);
      el.innerHTML = lang === "zh" ? el.getAttribute("data-zh") : el.getAttribute("data-en");
    });
    $$("[data-zh-ph]").forEach(function (el) {
      if (!el.hasAttribute("data-en-ph")) el.setAttribute("data-en-ph", el.placeholder);
      el.placeholder = lang === "zh" ? el.getAttribute("data-zh-ph") : el.getAttribute("data-en-ph");
    });
    var b = $(".lang"); if (b) b.textContent = lang === "zh" ? "EN" : "中文";
    store.set("lang", lang);
  }
  var lb = $(".lang");
  if (lb) lb.addEventListener("click", function () { applyLang((store.get("lang") || "en") === "zh" ? "en" : "zh"); });
  if (store.get("lang") === "zh") applyLang("zh");

  /* ---------- ads ---------- */
  function houseAd(el) {
    el.innerHTML = '<div class="ad-label">Advertisement</div><div class="house-ad"><span>📣 <b>Your brand here</b> — reach people who miss someone, in EN & 中文.</span><a class="btn btn-sm btn-ghost" href="advertise.html">Advertise on 330330</a></div>';
  }
  var ads = $$(".ad[data-slot]");
  if (S.adsenseClient) {
    var sc = document.createElement("script"); sc.async = true; sc.crossOrigin = "anonymous";
    sc.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient;
    document.head.appendChild(sc);
    ads.forEach(function (el) {
      var slot = (S.adSlots || {})[el.getAttribute("data-slot")] || "";
      el.innerHTML = '<div class="ad-label">Advertisement</div><ins class="adsbygoogle" style="display:block" data-ad-client="' + S.adsenseClient + '"' + (slot ? ' data-ad-slot="' + slot + '"' : "") + ' data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  } else ads.forEach(houseAd);

  /* ---------- forms → single hidden inbox via FormSubmit ---------- */
  function utm() {
    var p = new URLSearchParams(location.search), o = {};
    ["utm_source", "utm_medium", "utm_campaign"].forEach(function (k) { if (p.get(k)) o[k] = p.get(k); });
    return o;
  }
  function submitForm(form) {
    var hp = form.querySelector(".hp input"); if (hp && hp.value) return Promise.resolve(true);
    var data = {}; new FormData(form).forEach(function (v, k) { if (k !== "website") data[k] = data[k] ? data[k] + ", " + v : v; });
    var type = form.getAttribute("data-form") || "general";
    data._subject = "330330.com · " + type + (data.name ? " · " + data.name : "");
    data._template = "table"; data._captcha = "false";
    data.form_type = type; data.page = location.pathname; data.submitted = new Date().toISOString();
    Object.assign(data, utm());
    if (data.email) data._replyto = data.email;
    return fetch("https://formsubmit.co/ajax/" + inbox(), {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data)
    }).then(function (r) { return r.ok; }).catch(function () { return false; }).then(function (ok) {
      if (!ok) { /* fallback: open mail client with the details pre-filled */
        var body = Object.keys(data).filter(function (k) { return k[0] !== "_"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
        location.href = "mailto:" + inbox() + "?subject=" + encodeURIComponent(data._subject) + "&body=" + encodeURIComponent(body);
      }
      return true;
    });
  }
  window.submitForm = submitForm;
  $$("form[data-form]").forEach(function (form) {
    if (form.hasAttribute("data-custom")) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var btn = form.querySelector("[type=submit]"); if (btn) { btn.disabled = true; btn.dataset.t = btn.textContent; btn.textContent = "Sending…"; }
      submitForm(form).then(function () {
        var ok = form.parentNode.querySelector(".success[data-for='" + form.id + "']") || form.nextElementSibling;
        if (ok && ok.classList.contains("success")) { form.style.display = "none"; ok.style.display = "block"; }
        else toast("Thank you! We'll be in touch. 谢谢！");
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.t; }
        form.reset();
      });
    });
  });

  /* ---------- donate buttons ---------- */
  $$("[data-donate]").forEach(function (a) {
    var k = a.getAttribute("data-donate"), url = (S.donate || {})[k];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; } else a.classList.add("hidden");
  });
  var anyDonate = S.donate && Object.keys(S.donate).some(function (k) { return S.donate[k]; });
  $$("[data-donate-fallback]").forEach(function (el) { if (anyDonate) el.classList.add("hidden"); });

  /* ---------- YouTube subscribe ---------- */
  $$("[data-yt]").forEach(function (a) {
    if (S.youtubeChannel) { a.href = S.youtubeChannel + (S.youtubeChannel.indexOf("?") > -1 ? "&" : "?") + "sub_confirmation=1"; a.target = "_blank"; a.rel = "noopener"; }
    else a.href = "videos.html";
  });

  /* ---------- countdown helper ---------- */
  function countdown(el, target) {
    function tick() {
      var d = Math.max(0, new Date(target) - new Date());
      var days = Math.floor(d / 864e5), h = Math.floor(d / 36e5) % 24, m = Math.floor(d / 6e4) % 60, s = Math.floor(d / 1e3) % 60;
      el.innerHTML = "<div><b>" + days + "</b><span>days</span></div><div><b>" + h + "</b><span>hrs</span></div><div><b>" + m + "</b><span>min</span></div><div><b>" + s + "</b><span>sec</span></div>";
    }
    tick(); return setInterval(tick, 1000);
  }
  window.countdown = countdown;

  /* next festival */
  function nextFestival() {
    if (!window.DATA) return null;
    var now = new Date(), best = null;
    DATA.festivals.forEach(function (f) {
      f[3].forEach(function (d) {
        var t = new Date(d + "T00:00:00+08:00");
        if (t > now && (!best || t < best.t)) best = { f: f, t: t, d: d };
      });
    });
    return best;
  }
  window.nextFestival = nextFestival;
  $$("[data-next-festival]").forEach(function (box) {
    var n = nextFestival(); if (!n) return;
    var nm = box.querySelector(".nf-name"), dt = box.querySelector(".nf-date"), cd = box.querySelector(".cd");
    if (nm) nm.textContent = n.f[7] + " " + n.f[1] + " · " + n.f[2];
    if (dt) dt.textContent = new Date(n.d + "T12:00:00").toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    if (cd) countdown(cd, n.t);
  });

  /* ---------- cookie / consent notice ---------- */
  var ck = $(".cookie");
  if (ck && !store.get("consent")) {
    ck.classList.add("show");
    $$("[data-consent]", ck).forEach(function (b) { b.addEventListener("click", function () { store.set("consent", b.getAttribute("data-consent")); ck.classList.remove("show"); }); });
  }

  /* ---------- year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
