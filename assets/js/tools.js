/* 330330.com — interactive tools */
(function () {
  "use strict";
  var D = window.DATA || {};
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function adCard() {
    var S0 = window.SITE || {};
    if (S0.adsenseClient) { setTimeout(function () { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {} }, 50);
      return '<div class="ad" style="grid-column:1/-1;margin:0"><div class="ad-label">Advertisement</div><ins class="adsbygoogle" style="display:block" data-ad-client="' + S0.adsenseClient + '"' + (S0.adSlots && S0.adSlots.infeed ? ' data-ad-slot="' + S0.adSlots.infeed + '"' : "") + ' data-ad-format="fluid" data-full-width-responsive="true"></ins></div>'; }
    return '<div class="ad" data-slot="infeed" style="grid-column:1/-1;margin:0"><div class="ad-label">Advertisement</div><div class="house-ad"><span>📣 <b>Sponsor this space</b> — gifts, flowers, travel, language apps.</span><a class="btn btn-sm btn-ghost" href="advertise.html">Advertise</a></div></div>'; }

  /* ===== Message of the day (home) ===== */
  var motd = $("#motd");
  if (motd && D.messages) {
    var day = Math.floor(Date.now() / 864e5), m = D.messages[day % D.messages.length];
    motd.innerHTML = '<p style="font-size:1.25rem;font-family:var(--f-serif)">“' + esc(m[0]) + '”</p><p class="zh muted">' + esc(m[3] || "") + '</p><div class="card-actions"><button class="btn btn-sm btn-primary" data-copy="' + esc(m[0]) + '">Copy</button><button class="btn btn-sm btn-ghost" data-share="' + esc(m[0]) + '">Share</button><a class="btn btn-sm btn-ghost" href="ecards.html?msg=' + encodeURIComponent(m[0]) + '">Make e-card</a></div>';
  }

  /* ===== Messages library ===== */
  var lib = $("#msg-grid");
  if (lib && D.messages) {
    var state = { aud: "all", tone: "all", q: "" };
    function render() {
      var list = D.messages.filter(function (m) {
        return (state.aud === "all" || m[1] === state.aud) && (state.tone === "all" || m[2] === state.tone) &&
          (!state.q || (m[0] + " " + (m[3] || "")).toLowerCase().indexOf(state.q) > -1);
      });
      var html = ""; list.forEach(function (m, i) {
        html += '<article class="card msg-card"><span class="tag">' + m[1] + '</span><span class="tag gold">' + m[2] + '</span><p>' + esc(m[0]) + '</p>' + (m[3] ? '<p class="zh">' + esc(m[3]) + '</p>' : "") +
          '<div class="card-actions"><button class="btn btn-sm btn-primary" data-copy="' + esc(m[0]) + '">Copy</button>' + (m[3] ? '<button class="btn btn-sm btn-ghost" data-copy="' + esc(m[3]) + '">复制中文</button>' : "") +
          '<button class="btn btn-sm btn-ghost" data-share="' + esc(m[0]) + '">Share</button><a class="btn btn-sm btn-ghost" href="ecards.html?msg=' + encodeURIComponent(m[0]) + '">E-card</a></div></article>';
        if ((i + 1) % 8 === 0) html += adCard();
      });
      lib.innerHTML = html || '<p class="muted">No messages match. Try another filter.</p>';
      var c = $("#msg-count"); if (c) c.textContent = list.length + " messages";
    }
    $$("[data-aud]").forEach(function (b) { b.addEventListener("click", function () { $$("[data-aud]").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); state.aud = b.getAttribute("data-aud"); render(); }); });
    $$("[data-tone]").forEach(function (b) { b.addEventListener("click", function () { $$("[data-tone]").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); state.tone = b.getAttribute("data-tone"); render(); }); });
    var q = $("#msg-search"); if (q) q.addEventListener("input", function () { state.q = q.value.toLowerCase().trim(); render(); });
    var gen = $("#msg-generate");
    if (gen) gen.addEventListener("click", function () {
      var aud = $("#gen-aud").value, tone = $("#gen-tone").value, name = $("#gen-name").value.trim();
      var pool = D.messages.filter(function (m) { return (aud === "all" || m[1] === aud || (aud !== "all" && m[1] === "partner" && ["boyfriend", "girlfriend", "husband", "wife"].indexOf(aud) > -1)) && (tone === "all" || m[2] === tone); });
      if (!pool.length) pool = D.messages;
      var m = pick(pool), text = (name ? name + ", " : "") + m[0] + " — 330330";
      $("#gen-out").innerHTML = '<p style="font-size:1.2rem;font-family:var(--f-serif)">' + esc(text) + '</p>' + (m[3] ? '<p class="zh muted">' + esc(m[3]) + '</p>' : "") +
        '<div class="card-actions"><button class="btn btn-sm btn-primary" data-copy="' + esc(text) + '">Copy</button><button class="btn btn-sm btn-ghost" data-share="' + esc(text) + '">Share</button><a class="btn btn-sm btn-ghost" href="ecards.html?msg=' + encodeURIComponent(m[0]) + '&to=' + encodeURIComponent(name) + '">Turn into e-card</a><button class="btn btn-sm btn-ghost" id="msg-generate-2">Another one ↻</button></div>';
      $("#gen-out").classList.remove("hidden");
      $("#msg-generate-2").onclick = function () { gen.click(); };
    });
    render();
  }

  /* ===== Love-code decoder ===== */
  function decode(num) {
    num = String(num).replace(/\s+/g, "");
    var hit = (D.codes || []).filter(function (c) { return c[0] === num; })[0];
    var digits = num.split("").filter(function (d) { return D.digits[d]; });
    var html = "";
    if (hit) html += '<div class="result-box"><span class="tag">Known code</span><h3 style="margin-top:6px">' + esc(hit[0]) + ' = <span style="font-family:var(--f-serif)">' + esc(hit[1]) + '</span></h3><p><i>' + esc(hit[2]) + '</i> — <b>' + esc(hit[3]) + '</b></p>' + (hit[4] === "caution" ? '<p class="small" style="color:var(--red)">⚠️ Rude or negative — avoid sending this one to someone you love.</p>' : "") + '</div>';
    else if (digits.length) html += '<div class="result-box"><span class="tag gold">Custom number</span><p style="margin-top:6px">No famous phrase for <b>' + esc(num) + '</b> yet — here is how each digit is commonly read. Combine the sounds to craft your own code.</p></div>';
    if (digits.length) {
      html += '<div class="digit-row">' + digits.map(function (d) { var x = D.digits[d]; return '<div class="digit"><b>' + d + '</b><span>' + x.hz.split(" / ")[0] + '</span><small>' + esc(x.en.split(" · ")[0]) + '</small></div>'; }).join("") + '</div>';
      var good = digits.filter(function (d) { return D.digits[d].luck === "good"; }).length;
      var score = Math.round(40 + 60 * good / digits.length - (digits.indexOf("4") > -1 && !hit ? 10 : 0));
      html += '<p class="small muted">Positive-sound score: <b>' + Math.max(0, Math.min(100, score)) + '/100</b> (for fun — based on common homophones).</p>';
      html += '<div class="card-actions"><button class="btn btn-sm btn-primary" data-copy="' + esc(num + (hit ? " = " + hit[1] + " (" + hit[3] + ")" : "")) + '">Copy</button><button class="btn btn-sm btn-ghost" data-share="' + esc((hit ? num + " = " + hit[1] + " — " + hit[3] : "Decode " + num) + " · via 330330") + '">Share</button></div>';
    }
    return html || '<p class="muted">Type digits like 330, 520 or 1314.</p>';
  }
  $$("form.decoder").forEach(function (f) {
    var inp = f.querySelector("input"), out = f.parentNode.querySelector(".decoder-out");
    f.addEventListener("submit", function (e) { e.preventDefault(); out.innerHTML = decode(inp.value); });
    var qs = new URLSearchParams(location.search).get("code");
    if (qs && f.id === "decoder-main") { inp.value = qs; out.innerHTML = decode(qs); }
    else if (f.id === "decoder-home" && inp.value) out.innerHTML = decode(inp.value);
  });
  var rev = $("#reverse-form");
  if (rev) rev.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = $("#reverse-q").value.toLowerCase().trim();
    var hits = D.codes.filter(function (c) { return (c[3] + " " + c[1] + " " + c[2]).toLowerCase().indexOf(q) > -1; });
    $("#reverse-out").innerHTML = hits.length ? '<div class="pill-list">' + hits.map(function (c) { return '<button class="chip" data-copy="' + c[0] + '"><b>' + c[0] + '</b> · ' + esc(c[3]) + '</button>'; }).join("") + '</div><p class="small muted">Tap to copy.</p>' : '<p class="muted">No match — try "miss", "love", "forever", "hug".</p>';
  });
  var tbl = $("#codes-table");
  if (tbl) {
    function drawCodes(f) {
      tbl.innerHTML = D.codes.filter(function (c) { return f === "all" || c[4] === f; }).map(function (c) {
        return '<tr><td class="code">' + c[0] + '</td><td class="hz">' + c[1] + '</td><td>' + c[2] + '</td><td>' + esc(c[3]) + '</td><td>' + (c[4] === "caution" ? "⚠️ avoid" : c[4] === "sweet" ? "💗 sweet" : "😄 fun") + '</td><td><button class="btn btn-sm btn-ghost" data-copy="' + c[0] + '">Copy</button></td></tr>';
      }).join("");
    }
    $$("[data-vibe]").forEach(function (b) { b.addEventListener("click", function () { $$("[data-vibe]").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); drawCodes(b.getAttribute("data-vibe")); }); });
    drawCodes("all");
  }

  /* ===== Tabs ===== */
  $$(".tabs").forEach(function (tabs) {
    var btns = $$(".tab", tabs);
    function show(id) {
      btns.forEach(function (b) { var on = b.getAttribute("data-tab") === id; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
      $$(".panel").forEach(function (p) { p.classList.toggle("on", p.id === id); });
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-tab")); history.replaceState(null, "", "#" + b.getAttribute("data-tab")); }); });
    var h = location.hash.slice(1); if (h && $("#" + h) && $("#" + h).classList.contains("panel")) show(h);
  });

  /* ===== City selects ===== */
  $$("select[data-cities]").forEach(function (s) {
    var def = s.getAttribute("data-default");
    s.innerHTML = D.cities.slice().sort(function (a, b) { return a[0].localeCompare(b[0]); }).map(function (c) { return '<option value="' + esc(c[0]) + '"' + (c[0] === def ? " selected" : "") + ">" + esc(c[0]) + "</option>"; }).join("");
  });
  function city(n) { return D.cities.filter(function (c) { return c[0] === n; })[0]; }

  /* ===== Reunion countdown ===== */
  var rf = $("#reunion-form");
  if (rf) {
    var timer, p = new URLSearchParams(location.search);
    function startR(date, a, b) {
      $("#reunion-out").classList.remove("hidden");
      $("#reunion-title").textContent = (a && b ? a + " & " + b + " — " : "") + "until we meet again 直到我们重逢";
      clearInterval(timer); timer = countdown($("#reunion-cd"), new Date(date + "T00:00:00"));
      var url = location.origin + location.pathname + "?r=" + date + "&a=" + encodeURIComponent(a || "") + "&b=" + encodeURIComponent(b || "") + "#countdown";
      $("#reunion-share").setAttribute("data-share", "Our reunion countdown 💞"); $("#reunion-share").setAttribute("data-url", url);
      $("#reunion-copy").setAttribute("data-copy", url);
      $("#reunion-ics").onclick = function () {
        var d = date.replace(/-/g, ""), ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//330330//EN\r\nBEGIN:VEVENT\r\nUID:" + Date.now() + "@330330\r\nDTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z\r\nDTSTART;VALUE=DATE:" + d + "\r\nSUMMARY:Reunion day 💞 " + (a && b ? a + " & " + b : "") + "\r\nEND:VEVENT\r\nEND:VCALENDAR";
        var blob = new Blob([ics], { type: "text/calendar" }), l = document.createElement("a"); l.href = URL.createObjectURL(blob); l.download = "reunion.ics"; l.click();
      };
    }
    rf.addEventListener("submit", function (e) { e.preventDefault(); var d = $("#r-date").value; if (!d) return toast("Pick a date"); startR(d, $("#r-a").value, $("#r-b").value); });
    if (p.get("r")) { $("#r-date").value = p.get("r"); $("#r-a").value = p.get("a") || ""; $("#r-b").value = p.get("b") || ""; startR(p.get("r"), p.get("a"), p.get("b")); }
  }

  /* ===== Dual clock + overlap ===== */
  var ca = $("#time-a");
  if (ca) {
    function tz(n) { var c = city(n); return c ? c[3] : "UTC"; }
    function hourIn(zone, date) { return parseInt(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: zone }).format(date), 10); }
    function fmt(zone) { return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: zone }).format(new Date()); }
    function day(zone) { return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric", timeZone: zone }).format(new Date()); }
    function awake(h) { return h >= 8 && h < 23; }
    function draw() {
      var A = tz($("#city-a").value), B = tz($("#city-b").value);
      $("#time-a").textContent = fmt(A); $("#day-a").textContent = day(A);
      $("#time-b").textContent = fmt(B); $("#day-b").textContent = day(B);
      var ha = hourIn(A, new Date()), hb = hourIn(B, new Date());
      $("#state-a").textContent = awake(ha) ? "☀️ awake" : "🌙 probably asleep";
      $("#state-b").textContent = awake(hb) ? "☀️ awake" : "🌙 probably asleep";
    }
    function overlap() {
      var A = tz($("#city-a").value), B = tz($("#city-b").value), html = "", good = [];
      var base = new Date(); base.setMinutes(0, 0, 0);
      for (var i = 0; i < 24; i++) {
        var t = new Date(base.getTime() + i * 36e5), ha = hourIn(A, t), hb = hourIn(B, t);
        var ok = awake(ha) && awake(hb), half = !ok && (awake(ha) || awake(hb)) && (ha >= 7 && ha < 24) && (hb >= 7 && hb < 24);
        html += '<i class="' + (ok ? "ok" : half ? "half" : "") + '" title="' + ha + ':00 / ' + hb + ':00"></i>';
        if (ok) good.push(ha + ":00 (" + $("#city-a").value + ") = " + hb + ":00 (" + $("#city-b").value + ")");
      }
      $("#overlap").innerHTML = html;
      $("#overlap-txt").innerHTML = good.length ? "<b>" + good.length + " good hours to call</b> (both awake 8am–11pm). Best start: " + esc(good[0]) : "No hours where you're both awake 8am–11pm — try early morning / late night slots (yellow).";
    }
    ["#city-a", "#city-b"].forEach(function (s) { $(s).addEventListener("change", function () { draw(); overlap(); }); });
    draw(); overlap(); setInterval(draw, 1000);
  }

  /* ===== Distance ===== */
  var df = $("#distance-form");
  if (df) df.addEventListener("submit", function (e) {
    e.preventDefault();
    var a = city($("#d-a").value), b = city($("#d-b").value); if (!a || !b) return;
    var R = 6371, r = Math.PI / 180, dLat = (b[1] - a[1]) * r, dLon = (b[2] - a[2]) * r;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var km = Math.round(R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))), mi = Math.round(km * 0.621371);
    var flight = (km / 800 + 0.5).toFixed(1);
    var txt = a[0] + " ↔ " + b[0] + ": " + km.toLocaleString() + " km (" + mi.toLocaleString() + " mi) apart — and still 330330, missing you.";
    $("#distance-out").innerHTML = '<div class="result-box"><div class="clock">' + km.toLocaleString() + ' km</div><p>' + mi.toLocaleString() + ' miles · ≈ ' + flight + ' hours of direct flight · ≈ ' + Math.round(km / 5).toLocaleString() + ' hours walking</p><p class="muted">That\'s about ' + Math.round(km / 40075 * 100) + '% of the way around the Earth — not even halfway to giving up. 💞</p><div class="card-actions"><button class="btn btn-sm btn-primary" data-share="' + esc(txt) + '">Share</button><a class="btn btn-sm btn-ghost" href="gifts.html">Close the gap with a gift →</a></div></div>';
  });

  /* ===== Days together ===== */
  var tf = $("#together-form");
  if (tf) tf.addEventListener("submit", function (e) {
    e.preventDefault();
    var s = new Date($("#t-date").value + "T00:00:00"); if (isNaN(s)) return toast("Pick your start date");
    var days = Math.floor((new Date() - s) / 864e5);
    var ms = [100, 200, 330, 365, 500, 520, 730, 1000, 1314, 1500, 2000, 3300, 5200].filter(function (n) { return n > days; }).slice(0, 4);
    $("#together-out").innerHTML = '<div class="result-box"><div class="clock">' + days.toLocaleString() + ' days</div><p>' + Math.floor(days / 7).toLocaleString() + ' weeks · ' + (days / 365.25).toFixed(1) + ' years together 在一起</p><p><b>Next milestones:</b></p><ul>' + ms.map(function (n) { var d = new Date(s.getTime() + n * 864e5); return "<li>Day " + n + " — " + d.toDateString() + (n === 330 ? " (our 330 day!)" : n === 520 ? " (520 = I love you)" : n === 1314 ? " (1314 = forever)" : "") + "</li>"; }).join("") + '</ul><button class="btn btn-sm btn-primary" data-share="We\'ve been together ' + days + ' days 💞">Share</button></div>';
  });

  /* ===== Date ideas ===== */
  var dg = $("#dates-grid");
  if (dg) {
    function drawDates(f) {
      dg.innerHTML = D.dates.filter(function (d) { return f === "all" || d[2] === f || (f === "short" && d[3] <= 30); }).map(function (d) {
        return '<div class="card"><span class="tag">' + (d[2] === "free" ? "Free" : d[2] === "low" ? "Under $20" : "$$") + '</span><span class="tag gold">' + (d[3] >= 480 ? "all night" : d[3] + " min") + '</span><span class="tag night">' + d[4] + '</span><h3 style="margin-top:8px">' + esc(d[0]) + '</h3><p class="muted">' + esc(d[1]) + '</p><button class="btn btn-sm btn-ghost" data-share="Date idea for us: ' + esc(d[0]) + ' — ' + esc(d[1]) + '">Send to my partner</button></div>';
      }).join("");
    }
    $$("[data-dates]").forEach(function (b) { b.addEventListener("click", function () { $$("[data-dates]").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); drawDates(b.getAttribute("data-dates")); }); });
    var rnd = $("#date-random"); if (rnd) rnd.addEventListener("click", function () { var d = pick(D.dates); toast("Tonight: " + d[0]); });
    drawDates("all");
  }

  /* ===== E-card maker ===== */
  var cv = $("#card");
  if (cv) {
    var ctx = cv.getContext("2d"), themes = [
      { bg: ["#C8102E", "#7A0A1C"], fg: "#FFFFFF", ac: "#FFD873", name: "Red lantern" },
      { bg: ["#141B3C", "#3B2A6B"], fg: "#FFFFFF", ac: "#FFD873", name: "Qixi night" },
      { bg: ["#FBE9EC", "#F7C6D0"], fg: "#5A0F1F", ac: "#C8102E", name: "Blush" },
      { bg: ["#FFF6E5", "#F6D9A0"], fg: "#4A2E00", ac: "#C8102E", name: "Mooncake gold" },
      { bg: ["#E6F2EF", "#B9DDD3"], fg: "#123A33", ac: "#C8102E", name: "Jade" },
      { bg: ["#1D1B26", "#3A3550"], fg: "#F4EEF2", ac: "#F28BA0", name: "Midnight" },
      { bg: ["#FFFFFF", "#F2EDEA"], fg: "#1D1B26", ac: "#C8102E", name: "Paper" },
      { bg: ["#FF8FA3", "#C8102E"], fg: "#FFFFFF", ac: "#FFF1B8", name: "Sunset" }
    ], th = 0, p2 = new URLSearchParams(location.search);
    var sw = $("#swatches");
    sw.innerHTML = themes.map(function (t, i) { return '<button class="swatch' + (i === 0 ? " on" : "") + '" aria-label="' + t.name + '" data-i="' + i + '" style="background:linear-gradient(135deg,' + t.bg[0] + "," + t.bg[1] + ')"></button>'; }).join("");
    sw.addEventListener("click", function (e) { var b = e.target.closest(".swatch"); if (!b) return; $$(".swatch").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); th = +b.getAttribute("data-i"); drawCard(); });
    if (p2.get("msg")) $("#c-msg").value = p2.get("msg");
    if (p2.get("to")) $("#c-to").value = p2.get("to");
    function wrap(text, x, y, maxW, lh) {
      var words = text.split(/(\s+)/), line = "", lines = [];
      if (/[一-鿿]/.test(text) && text.indexOf(" ") === -1) words = text.split("");
      words.forEach(function (w) { var t = line + w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w.trim(); } else line = t; });
      lines.push(line); var sy = y - (lines.length - 1) * lh / 2;
      lines.forEach(function (l, i) { ctx.fillText(l.trim(), x, sy + i * lh); });
    }
    function drawCard() {
      var t = themes[th], W = cv.width, H = cv.height, g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, t.bg[0]); g.addColorStop(1, t.bg[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = .08; ctx.fillStyle = t.fg; ctx.font = "900 380px Inter, sans-serif"; ctx.textAlign = "center"; ctx.fillText("330", W / 2, H / 2 + 130); ctx.globalAlpha = 1;
      if (th === 1) { for (var i = 0; i < 70; i++) { ctx.fillStyle = "rgba(255,255,255," + (Math.random() * .7 + .2) + ")"; ctx.beginPath(); ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 2, 0, 7); ctx.fill(); } }
      ctx.strokeStyle = t.ac; ctx.lineWidth = 4; ctx.strokeRect(28, 28, W - 56, H - 56);
      ctx.fillStyle = t.ac; ctx.font = "700 30px 'Noto Serif SC', serif"; ctx.fillText("想想你 · 想想你", W / 2, 110);
      var to = $("#c-to").value.trim(), from = $("#c-from").value.trim(), msg = $("#c-msg").value.trim() || "Missing you, missing you.";
      ctx.fillStyle = t.fg; ctx.font = "600 34px Inter, sans-serif"; if (to) ctx.fillText("Dear " + to + ",", W / 2, 190);
      ctx.font = ($("#c-font").value || "italic 600") + " " + (msg.length > 120 ? 34 : msg.length > 60 ? 42 : 52) + "px " + ($("#c-font").value.indexOf("serif") > -1 ? "'Noto Serif SC', serif" : "Inter, sans-serif");
      ctx.font = ctx.font; wrap(msg, W / 2, H / 2 + 20, W - 160, msg.length > 60 ? 52 : 64);
      ctx.font = "800 64px Inter, sans-serif"; ctx.fillStyle = t.ac; ctx.fillText($("#c-sticker").value, W / 2, H - 150);
      ctx.fillStyle = t.fg; ctx.font = "500 28px Inter, sans-serif"; if (from) ctx.fillText("— " + from, W / 2, H - 90);
      ctx.globalAlpha = .55; ctx.font = "500 18px Inter, sans-serif"; ctx.fillText("330330.com", W / 2, H - 48); ctx.globalAlpha = 1;
    }
    $$("#ecard-form input, #ecard-form textarea, #ecard-form select").forEach(function (el) { el.addEventListener("input", drawCard); });
    $("#c-download").addEventListener("click", function () { var a = document.createElement("a"); a.download = "330330-miss-you-card.png"; a.href = cv.toDataURL("image/png"); a.click(); toast("Card downloaded 🎉"); });
    $("#c-share").addEventListener("click", function () {
      var url = location.origin + location.pathname + "?msg=" + encodeURIComponent($("#c-msg").value) + "&to=" + encodeURIComponent($("#c-to").value);
      if (navigator.canShare && cv.toBlob) {
        cv.toBlob(function (b) { var f = new File([b], "330330-card.png", { type: "image/png" }); if (navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: "330330 · 想想你" }).catch(function () {}); else shareText("A card for you 💌", url); });
      } else shareText("A card for you 💌", url);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawCard);
    drawCard();
  }

  /* ===== Quiz ===== */
  var qz = $("#quiz");
  if (qz && D.quiz) {
    var Q = D.quiz.questions, ans = [], qi = 0;
    function drawQ() {
      if (qi >= Q.length) return result();
      var q = Q[qi];
      qz.innerHTML = '<div class="progress"><i style="width:' + Math.round(qi / Q.length * 100) + '%"></i></div><p class="small muted">Question ' + (qi + 1) + ' of ' + Q.length + '</p><h3>' + esc(q[0]) + '</h3><div class="options">' + q[1].map(function (o, i) { return '<label class="option"><input type="radio" name="q" value="' + i + '"><span>' + esc(o) + '</span></label>'; }).join("") + '</div>';
      $$("input", qz).forEach(function (r) { r.addEventListener("change", function () { ans.push(+r.value); qi++; setTimeout(drawQ, 220); }); });
    }
    function result() {
      var c = [0, 0, 0, 0]; ans.forEach(function (a) { c[a]++; }); var w = c.indexOf(Math.max.apply(null, c)), r = D.quiz.results[w];
      qz.innerHTML = '<div class="result-box"><span class="tag">Your Miss-You style · ' + r.zh + '</span><h2 style="margin-top:8px">' + r.title + '</h2><p>' + esc(r.desc) + '</p><div class="card-actions"><button class="btn btn-sm btn-primary" data-share="My Miss-You style is ' + esc(r.title) + ' — what\'s yours?">Share my result</button><button class="btn btn-sm btn-ghost" id="quiz-again">Retake</button></div></div>';
      var hid = $("#quiz-result-field"); if (hid) hid.value = r.title;
      var gate = $("#quiz-gate"); if (gate) gate.classList.remove("hidden");
      $("#quiz-again").onclick = function () { ans = []; qi = 0; drawQ(); };
    }
    drawQ();
  }

  /* ===== Gifts ===== */
  var gg = $("#gift-grid");
  if (gg && D.gifts) {
    var S = window.SITE || {}, A = S.affiliates || {};
    function link(g) {
      if (g[3] === "flowers" && A.flowers) return A.flowers;
      if (g[3] === "travel" && A.esim) return A.esim;
      return "https://" + (A.amazonDomain || "www.amazon.com") + "/s?k=" + encodeURIComponent(g[6]) + (A.amazonTag ? "&tag=" + encodeURIComponent(A.amazonTag) : "");
    }
    var gs = { price: "all", who: "all", cat: "all" };
    function drawG() {
      var list = D.gifts.filter(function (g) { return (gs.price === "all" || g[2] === gs.price) && (gs.who === "all" || g[4].indexOf(gs.who) > -1) && (gs.cat === "all" || g[3] === gs.cat); });
      gg.innerHTML = list.map(function (g) {
        return '<div class="card"><div class="icon">' + g[7] + '</div><span class="tag">' + g[2] + '</span><span class="tag gold">' + g[3] + '</span><h3>' + esc(g[0]) + '</h3><p class="muted">' + esc(g[1]) + '</p><a class="btn btn-sm btn-primary" href="' + link(g) + '" target="_blank" rel="sponsored nofollow noopener">Check price →</a></div>';
      }).join("") || '<p class="muted">No gifts match — loosen a filter.</p>';
    }
    $$("[data-g]").forEach(function (s) { s.addEventListener("change", function () { gs[s.getAttribute("data-g")] = s.value; drawG(); }); });
    drawG();
  }

  /* ===== Festivals ===== */
  var fg = $("#fest-grid");
  if (fg && D.festivals) {
    var now = new Date();
    fg.innerHTML = D.festivals.map(function (f) {
      var next = f[3].filter(function (d) { return new Date(d + "T23:59:59+08:00") > now; })[0] || f[3][f[3].length - 1];
      var days = Math.ceil((new Date(next + "T00:00:00+08:00") - now) / 864e5);
      return '<article class="card" id="' + f[0] + '"><div class="icon">' + f[7] + '</div><h3>' + f[1] + ' <span style="font-family:var(--f-serif);color:var(--red)">' + f[2] + '</span></h3><p><span class="tag">' + (days > 0 ? "in " + days + " days" : "today!") + '</span> ' + f[3].map(function (d) { return '<span class="tag gold">' + d + '</span>'; }).join("") + '</p><p class="muted">' + esc(f[4]) + '</p><p><b>' + esc(f[5]) + '</b><br><span style="font-family:var(--f-serif)">' + esc(f[6]) + '</span></p><div class="card-actions"><button class="btn btn-sm btn-primary" data-copy="' + esc(f[5] + " " + f[6]) + '">Copy greeting</button><a class="btn btn-sm btn-ghost" href="gifts.html">Gift ideas</a><a class="btn btn-sm btn-ghost" href="ecards.html?msg=' + encodeURIComponent(f[5]) + '">E-card</a></div></article>';
    }).join("");
  }

  /* ===== Lead wizard ===== */
  var wz = $("#lead-wizard");
  if (wz) {
    var steps = $$(".step", wz), cur = 0, bar = $(".progress i", wz.parentNode);
    function go(n) {
      if (n > cur) { var inv = $$("input,select,textarea", steps[cur]).filter(function (el) { return !el.checkValidity(); })[0]; if (inv) { inv.reportValidity(); return; } }
      cur = n; steps.forEach(function (s, i) { s.classList.toggle("on", i === cur); }); bar.style.width = ((cur + 1) / steps.length * 100) + "%";
      wz.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    $$("[data-next]", wz).forEach(function (b) { b.addEventListener("click", function () { go(cur + 1); }); });
    $$("[data-prev]", wz).forEach(function (b) { b.addEventListener("click", function () { go(cur - 1); }); });
    var need = new URLSearchParams(location.search).get("need");
    if (need) { var r = $('input[name="need"][value="' + need + '"]', wz); if (r) r.checked = true; }
    wz.addEventListener("submit", function (e) {
      e.preventDefault(); if (!wz.checkValidity()) { wz.reportValidity(); return; }
      var budget = { "<100": 1, "100-500": 2, "500-2000": 3, "2000+": 4 }[(wz.budget || {}).value] || 1;
      var when = { "now": 3, "month": 2, "later": 1 }[(wz.timeline || {}).value] || 1;
      $("#lead-score").value = budget * when;
      var btn = $("[type=submit]", wz); btn.disabled = true; btn.textContent = "Sending…";
      submitForm(wz).then(function () { wz.classList.add("hidden"); bar.style.width = "100%"; $("#lead-done").classList.remove("hidden"); });
    });
  }

  /* ===== Videos ===== */
  var vg = $("#video-grid");
  if (vg) {
    var V = (window.SITE || {}).videos || [];
    if (V.length) {
      vg.innerHTML = V.map(function (v) { return '<div><div class="video" data-vid="' + esc(v.id) + '"><img loading="lazy" src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="' + esc(v.title) + '"><div class="play">▶</div></div><h3 style="margin-top:10px;font-size:1.05rem">' + esc(v.title) + '</h3><p class="small muted">' + esc(v.channel || "") + '</p></div>'; }).join("");
      vg.addEventListener("click", function (e) { var v = e.target.closest(".video"); if (!v) return; v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + v.getAttribute("data-vid") + '?autoplay=1" title="video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'; });
    }
  }

  /* ===== Contest countdown & funding goal ===== */
  var cc = $("#contest-cd"); if (cc && window.SITE) countdown(cc, new Date(SITE.contest.closes));
  var pz = $("#prizes"); if (pz && window.SITE) pz.innerHTML = SITE.contest.prizes.map(function (p) { return '<div class="card center"><div class="icon" style="margin:0 auto 10px">🏆</div><h3>' + esc(p.place) + '</h3><p class="muted">' + esc(p.prize) + '</p></div>'; }).join("");
  var gl = $("#goal"); if (gl && window.SITE) {
    var G = SITE.fundingGoal, pct = Math.min(100, Math.round(G.raised / G.goal * 100));
    gl.innerHTML = '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px"><b>' + esc(G.label) + '</b><span>$' + G.raised.toLocaleString() + ' of $' + G.goal.toLocaleString() + ' · ' + G.supporters + ' supporters</span></div><div class="goal" style="margin-top:8px"><i style="width:' + Math.max(pct, 2) + '%"></i></div>';
  }
})();
