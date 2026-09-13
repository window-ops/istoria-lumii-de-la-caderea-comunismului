/* Setările de citire: fundal, literă, lățime, împărțirea rândurilor,
   panourile laterale și cuprinsul lateral. Se încarcă pe toate paginile,
   după stocare.js. Celelalte sisteme (paginare, căutare, tipar, lecție)
   se agață de spațiul comun window.Manual. */

window.Manual = (function () {
  "use strict";

  var S = window.Stocare;
  var doc = document.documentElement;
  var text = document.querySelector(".text");
  var strat = document.querySelector(".strat");
  var corp = document.querySelector(".corp");
  var slug = (location.pathname.split("/").pop() || "index").replace(".html", "");
  var faraPagini = !!(text && text.hasAttribute("data-fara-pagini"));

  /* adresele altor pagini, indiferent din ce folder este deschisă pagina curentă */
  var radacina = (function () {
    var sc = document.querySelector('script[src*="setari.js"]');
    if (!sc) return "";
    var u = new URL(sc.getAttribute("src"), location.href);
    return u.href.replace(/assets\/js\/setari\.js.*$/, "");
  })();

  function cale(fisier) {
    return radacina ? radacina + fisier : fisier;
  }

  var M = {
    S: S,
    doc: doc,
    text: text,
    strat: strat,
    corp: corp,
    slug: slug,
    faraPagini: faraPagini,
    cale: cale,
    /* cârlige completate de celelalte fișiere */
    aplicaMod: function () {},
    reconstruieste: function () {},
    /* rulează înainte de aplicarea setărilor, în ordinea înscrierii */
    inainte: [],
    dupaSetari: [],
    ingust: function () {
      return window.matchMedia("(max-width: 64rem)").matches;
    }
  };

  S.legaturi();

  /* ---------------------------------------------------------------- */
  /* grupele de setări                                                 */
  /* ---------------------------------------------------------------- */

  M.GRUPE = [
    {
      cheie: "tema",
      nume: "Fundal",
      implicit: "clar",
      valori: [["clar", "Deschis"], ["sepia", "Sepia"], ["intunecat", "Întunecat"]]
    },
    {
      cheie: "font",
      nume: "Litera textului",
      implicit: "serif",
      valori: [["serif", "Noto Serif"], ["sans", "Noto Sans"]]
    },
    {
      cheie: "rand-frumos",
      nume: "Rânduri fără cuvânt singur la final",
      implicit: "ambele",
      valori: [["nu", "Oprit"], ["meniu", "Meniuri"], ["text", "Textul lecției"], ["ambele", "Ambele"]]
    },
    {
      cheie: "mod",
      nume: "Vizualizare",
      implicit: "continuu",
      doarText: true,
      valori: [["continuu", "Continuu"], ["pagina", "O pagină"], ["doua", "Două pagini"]]
    },
    {
      cheie: "foaie",
      nume: "Formatul foii",
      implicit: "a4",
      doarText: true,
      valori: [["a4", "A4"], ["a5", "A5"], ["letter", "Letter"]]
    },
    {
      cheie: "margini",
      nume: "Marginile foii",
      implicit: "normale",
      doarText: true,
      valori: [["inguste", "Înguste"], ["normale", "Normale"], ["largi", "Largi"]]
    },
    {
      cheie: "taie-tabele",
      nume: "Tabelele pot fi tăiate între pagini",
      implicit: "da",
      doarText: true,
      valori: [["da", "Da"], ["nu", "Nu, rămân întregi"]]
    },
    {
      cheie: "taie-casete",
      nume: "Casetele pot fi tăiate între pagini",
      implicit: "da",
      doarText: true,
      valori: [["da", "Da"], ["nu", "Nu, rămân întregi"]]
    },
    {
      cheie: "tema-intinsa",
      nume: "Spațiile de temă, la pagini",
      implicit: "da",
      doarText: true,
      valori: [["da", "Întinse până la capătul foii"], ["nu", "Mărime fixă"]]
    }
  ];

  M.implicit = function (cheie) {
    for (var i = 0; i < M.GRUPE.length; i++) {
      if (M.GRUPE[i].cheie === cheie) return M.GRUPE[i].implicit;
    }
    return "";
  };

  /* ---------------------------------------------------------------- */
  /* aplicarea setărilor                                               */
  /* ---------------------------------------------------------------- */

  function aplica() {
    doc.setAttribute("data-tema", S.ia("tema", "clar"));
    doc.setAttribute("data-font", S.ia("font", "serif"));
    doc.style.setProperty("--text-corp", S.ia("corp", "19") + "px");
    doc.style.setProperty("--scara-ui", S.ia("ui", "1"));
    latimeCuprins(S.ia("cuprinsLat", "20"));
    doc.style.setProperty("--text-rand", S.ia("rand", "1.62"));

    if (text) {
      aplicaLatime(S.ia("lat", text.getAttribute("data-lat-implicit") || "50"));
      M.aplicaMod(faraPagini ? "continuu" : S.ia("mod", "continuu"), faraPagini);
    }
    if (corp) {
      corp.setAttribute(
        "data-cuprins",
        document.querySelector(".cuprins-lateral")
          ? S.ia("cuprins", M.ingust() ? "inchis" : "deschis")
          : "inchis"
      );
    }
    M.dupaSetari.forEach(function (fn) { fn(); });
  }

  function aplicaLatime(val) {
    var n = parseFloat(val);
    if (!text) return;
    if (n >= 100) {
      text.setAttribute("data-latime", "plin");
    } else {
      text.setAttribute("data-latime", "normal");
      doc.style.setProperty("--lat", n + "rem");
    }
  }

  function latimeCuprins(val) {
    var n = parseFloat(String(val).replace(",", "."));
    if (isNaN(n)) n = 20;
    n = Math.min(25, Math.max(15, n));
    doc.style.setProperty("--cuprins-lat", n + "rem");
    return n;
  }

  function manerCuprins() {
    var lateral = document.querySelector(".cuprins-lateral");
    if (!lateral || lateral.querySelector(".maner-cuprins")) return;
    var maner = document.createElement("div");
    maner.className = "maner-cuprins";
    maner.setAttribute("role", "separator");
    maner.setAttribute("aria-orientation", "vertical");
    maner.setAttribute("aria-label", "Lățimea cuprinsului");
    maner.tabIndex = 0;
    lateral.appendChild(maner);

    var trage = false;

    function seteaza(px) {
      var rem = px / parseFloat(getComputedStyle(doc).fontSize);
      S.pune("cuprinsLat", latimeCuprins(rem));
    }

    maner.addEventListener("pointerdown", function (e) {
      trage = true;
      maner.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    maner.addEventListener("pointermove", function (e) {
      if (!trage) return;
      seteaza(e.clientX - lateral.getBoundingClientRect().left);
    });
    maner.addEventListener("pointerup", function () {
      trage = false;
      M.reconstruieste();
    });
    maner.addEventListener("keydown", function (e) {
      var acum = parseFloat(S.ia("cuprinsLat", "20"));
      if (e.key === "ArrowLeft") S.pune("cuprinsLat", latimeCuprins(acum - 1));
      if (e.key === "ArrowRight") S.pune("cuprinsLat", latimeCuprins(acum + 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        M.reconstruieste();
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* împărțirea rândurilor: evită cuvântul singur pe ultimul rând      */
  /* ---------------------------------------------------------------- */

  function legaUltimeleCuvinte(nod) {
    if (nod.dataset.randOriginal === undefined) {
      nod.dataset.randOriginal = nod.innerHTML;
    }
    var mers = document.createTreeWalker(nod, NodeFilter.SHOW_TEXT);
    var ultim = null;
    var t;
    while ((t = mers.nextNode())) {
      if (t.parentNode.closest("textarea, script, style")) continue;
      if (t.nodeValue.trim() !== "") ultim = t;
    }
    if (!ultim) return;
    /* cuvintele scurte de la sfârșit se leagă în lanț, până la un cuvânt mai lung */
    ultim.nodeValue = ultim.nodeValue.replace(/[ \t\r\n]+(\S{1,3}(?:[ \t\r\n]+\S+)?)\s*$/, " $1")
      .replace(/[ \t\r\n]+(\S+)\s*$/, " $1");
  }

  function desfaCuvintele(nod) {
    if (nod.dataset.randOriginal !== undefined) {
      nod.innerHTML = nod.dataset.randOriginal;
      delete nod.dataset.randOriginal;
    }
  }

  var SEL_MENIU = ".cuprins-lateral a, .sectiuni a, .lectie > summary .titlu-lectie, " +
    ".unitate > summary, .coperta-text, .coperta h1";
  var SEL_TEXT = ".text h1, .text h2, .text h3, .text h4, .text p, .text li, .text td, " +
    ".text th, .text dd, .text dt, .caseta h4, .index p";

  function aplicaImpartirea() {
    var alegere = S.ia("rand-frumos", "ambele");
    var tinte = [];
    if (alegere === "meniu" || alegere === "ambele") {
      tinte = tinte.concat([].slice.call(document.querySelectorAll(SEL_MENIU)));
    }
    if (alegere === "text" || alegere === "ambele") {
      tinte = tinte.concat([].slice.call(document.querySelectorAll(SEL_TEXT)));
    }
    /* copiile de pe foi nu se ating: se refac din originale */
    tinte = tinte.filter(function (n) { return !n.closest(".carte"); });
    document.querySelectorAll("[data-rand-original]").forEach(function (n) {
      if (tinte.indexOf(n) === -1) desfaCuvintele(n);
    });
    doc.setAttribute("data-rand-frumos", alegere);
    tinte.forEach(function (n) {
      if (n.querySelector("p, li, td, th, h1, h2, h3, h4, textarea")) return;
      legaUltimeleCuvinte(n);
    });
  }

  /* ---------------------------------------------------------------- */
  /* cuprinsul lateral                                                 */
  /* ---------------------------------------------------------------- */

  function cuprinsLateral() {
    if (!corp) return;
    function comuta(forteaza) {
      var acum = corp.getAttribute("data-cuprins");
      var nou = forteaza || (acum === "deschis" ? "inchis" : "deschis");
      corp.setAttribute("data-cuprins", nou);
      S.pune("cuprins", nou);
      M.reconstruieste();
    }

    var lateral = document.querySelector(".cuprins-lateral");
    if (lateral && !lateral.querySelector(".inchide-sertar")) {
      var x = document.createElement("button");
      x.type = "button";
      x.className = "inchide-sertar";
      x.setAttribute("aria-label", "Închide cuprinsul");
      x.textContent = "×";
      x.addEventListener("click", function () { comuta("inchis"); });
      lateral.insertBefore(x, lateral.firstChild);
    }

    var buton = document.getElementById("buton-cuprins");
    if (buton) buton.addEventListener("click", function () { comuta(); });
    document.querySelectorAll(".cuprins-lateral a[href^='#']").forEach(function (a) {
      a.addEventListener("click", function () {
        if (M.ingust()) comuta("inchis");
      });
    });
  }

  function urmareste() {
    var legaturi = [].slice.call(document.querySelectorAll(".cuprins-lateral a[href^='#']"));
    if (!legaturi.length || !("IntersectionObserver" in window)) return;
    var harta = {};
    legaturi.forEach(function (a) {
      harta[decodeURIComponent(a.getAttribute("href").slice(1))] = a;
    });
    var obs = new IntersectionObserver(function (intrari) {
      /* la pagini, cuprinsul este ținut de paginare.js */
      if (text && (text.getAttribute("data-mod") || "continuu") !== "continuu") return;
      intrari.forEach(function (x) {
        if (!x.isIntersecting) return;
        legaturi.forEach(function (a) { a.classList.remove("activ"); });
        if (harta[x.target.id]) harta[x.target.id].classList.add("activ");
      });
    }, { rootMargin: "-8% 0px -80% 0px" });
    Object.keys(harta).forEach(function (id) {
      var e = document.getElementById(id);
      if (e) obs.observe(e);
    });
  }

  /* ---------------------------------------------------------------- */
  /* panouri                                                           */
  /* ---------------------------------------------------------------- */

  function panou(id, titlu, continut) {
    var p = document.getElementById(id);
    if (p) return p;
    p = document.createElement("aside");
    p.className = "panou";
    p.id = id;
    p.setAttribute("role", "dialog");
    p.setAttribute("aria-label", titlu);
    p.innerHTML =
      '<button class="inchide" type="button" aria-label="Închide">&times;</button>' +
      "<h2>" + titlu + "</h2>" + continut;
    document.body.appendChild(p);
    p.querySelector(".inchide").addEventListener("click", function () {
      p.classList.remove("deschis");
    });
    return p;
  }

  function deschide(p) {
    document.querySelectorAll(".panou").forEach(function (x) {
      if (x !== p) x.classList.remove("deschis");
    });
    p.classList.add("deschis");
    var c = p.querySelector("input, button:not(.inchide)");
    if (c) c.focus();
  }

  function inchidePanourile() {
    document.querySelectorAll(".panou.deschis").forEach(function (x) {
      x.classList.remove("deschis");
    });
  }

  /* butoane pentru o grupă de valori; marchează valoarea aleasă */
  function grupaButoane(g) {
    return "<label>" + g.nume + "</label>" +
      '<div class="optiuni" data-cheie="' + g.cheie + '" data-implicit="' + g.implicit + '">' +
      g.valori.map(function (v) {
        return '<button type="button" data-val="' + v[0] + '">' + v[1] + "</button>";
      }).join("") + "</div>";
  }

  function legaGrupele(p, dupa) {
    p.querySelectorAll(".optiuni[data-cheie]").forEach(function (g) {
      var cheie = g.getAttribute("data-cheie");
      var def = g.getAttribute("data-implicit");
      function marcheaza() {
        var v = S.ia(cheie, def);
        g.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", b.getAttribute("data-val") === v ? "true" : "false");
        });
      }
      g.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-val]");
        if (!b) return;
        S.pune(cheie, b.getAttribute("data-val"));
        marcheaza();
        dupa(cheie, b.getAttribute("data-val"));
      });
      marcheaza();
    });
  }

  /* secțiuni pliabile; starea lor se păstrează odată cu celelalte setări */
  function sectiune(id, titlu, continut, deschisImplicit) {
    var v = S.ia("sect:" + id, "");
    var deschis = v ? v === "1" : deschisImplicit;
    return '<details data-sectiune="' + id + '"' + (deschis ? " open" : "") + "><summary>" +
      titlu + "</summary>" + continut + "</details>";
  }

  function tineMinteSectiunile(p) {
    p.querySelectorAll("details[data-sectiune]").forEach(function (d) {
      d.addEventListener("toggle", function () {
        S.pune("sect:" + d.getAttribute("data-sectiune"), d.open ? "1" : "0");
      });
    });
  }

  function panouSetari() {
    var grupe = {};
    M.GRUPE.forEach(function (g) { grupe[g.cheie] = grupaButoane(g); });
    var cuPagini = text && !faraPagini;

    var html = sectiune("aspect", "Aspect", grupe.tema + grupe.font + grupe["rand-frumos"], true);
    if (cuPagini) html += sectiune("vizualizare", "Vizualizare", grupe.mod, true);
    html += sectiune("marimi", "Mărimi",
      '<label for="s-lat">Lățimea textului, până la toată pagina</label>' +
      '<input id="s-lat" type="range" min="30" max="100" step="1">' +
      '<label for="s-corp">Mărimea literei în text</label>' +
      '<input id="s-corp" type="range" min="15" max="26" step="1">' +
      '<label for="s-ui">Mărimea literei în interfață</label>' +
      '<input id="s-ui" type="range" min="0.85" max="1.4" step="0.05">' +
      '<label for="s-rand">Spațiul dintre rânduri</label>' +
      '<input id="s-rand" type="range" min="1.3" max="2.1" step="0.02">', true);
    if (cuPagini) {
      html += sectiune("pagini", "Foile, la pagini și la tipar",
        grupe.foaie + grupe.margini + grupe["taie-tabele"] + grupe["taie-casete"] + grupe["tema-intinsa"], false);
    }
    html +=
      '<p class="mic"><a href="' + cale("gestionare.html") + '">Aici</a>' +
      " sunt administrate datele păstrate.</p>" +
      (text ? '<div class="optiuni actiune"><button type="button" id="s-tipar">Tipărește…</button></div>' : "");

    var p = panou("panou-setari", "Setări de citire", html);
    if (p.dataset.legat) return p;
    p.dataset.legat = "1";
    tineMinteSectiunile(p);

    legaGrupele(p, function (cheie, val) {
      if (cheie === "mod") M.aplicaMod(val);
      else {
        aplica();
        aplicaImpartirea();
        M.reconstruieste();
      }
    });

    function cursor(sel, cheie, def, prop, unitate) {
      var i = p.querySelector(sel);
      if (!i) return;
      i.value = S.ia(cheie, def);
      i.addEventListener("input", function () {
        S.pune(cheie, i.value);
        if (cheie === "lat") aplicaLatime(i.value);
        else doc.style.setProperty(prop, i.value + unitate);
        M.reconstruieste();
      });
    }
    cursor("#s-lat", "lat", text ? (text.getAttribute("data-lat-implicit") || "50") : "50", "--lat", "rem");
    cursor("#s-ui", "ui", "1", "--scara-ui", "");
    cursor("#s-corp", "corp", "19", "--text-corp", "px");
    cursor("#s-rand", "rand", "1.62", "--text-rand", "");

    var bt = p.querySelector("#s-tipar");
    if (bt) bt.addEventListener("click", function () {
      if (M.deschideTipar) M.deschideTipar();
      else window.print();
    });
    return p;
  }

  /* ---------------------------------------------------------------- */
  /* pornire                                                           */
  /* ---------------------------------------------------------------- */

  M.aplica = aplica;
  M.aplicaImpartirea = aplicaImpartirea;
  M.panou = panou;
  M.deschide = deschide;
  M.inchidePanourile = inchidePanourile;
  M.grupaButoane = grupaButoane;
  M.legaGrupele = legaGrupele;
  M.panouSetari = panouSetari;

  /* textul adăugat pe parcurs (răspunsuri, planșe, glume) primește aceeași împărțire a rândurilor */
  function urmaresteTextulNou() {
    if (!text || !("MutationObserver" in window)) return;
    var asteapta = null;
    new MutationObserver(function (schimbari) {
      var relevant = schimbari.some(function (m) {
        return [].some.call(m.addedNodes, function (n) { return n.nodeType === 1 && !n.closest(".carte"); });
      });
      if (!relevant) return;
      clearTimeout(asteapta);
      asteapta = setTimeout(aplicaImpartirea, 120);
    }).observe(text, { childList: true, subtree: true });
  }

  M.porneste = function () {
    M.inainte.forEach(function (fn) { fn(); });
    aplica();
    cuprinsLateral();
    manerCuprins();
    aplicaImpartirea();
    urmareste();
    urmaresteTextulNou();

    var bs = document.getElementById("buton-setari");
    if (bs) bs.addEventListener("click", function () { deschide(panouSetari()); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") inchidePanourile();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { M.porneste(); });
  } else {
    M.porneste();
  }

  return M;
})();
