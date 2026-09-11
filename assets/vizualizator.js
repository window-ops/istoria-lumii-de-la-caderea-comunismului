(function () {
  "use strict";

  const GESTIONARE_URL = (() => {
    const scriptPath = document.scripts[document.scripts.length - 1].src;
    if (scriptPath) {
      return new URL('../gestionare.html', new URL(scriptPath, window.location.href)).pathname;
    }
    return '../gestionare.html';
  })();

  var MM = 96 / 25.4;
  var PAG_FOAIE = 210;
  var PAG_INALT = 297;
  var PAG_SEP = 10;

  var doc = document.documentElement;
  var text = document.querySelector(".text");
  var strat = document.querySelector(".strat");
  var corp = document.querySelector(".corp");
  var slug = (location.pathname.split("/").pop() || "index").replace(".html", "");
  var S = window.Stocare;
  S.legaturi();

  /* ---------------------------------------------------------------- */
  /* setări                                                            */
  /* ---------------------------------------------------------------- */

  var GRUPE = [
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
      valori: [["nu", "Oprit"], ["meniu", "Meniuri"], ["text", "Titluri"], ["ambele", "Ambele"]]
    },
    {
      cheie: "mod",
      nume: "Vizualizare",
      implicit: "continuu",
      valori: [["continuu", "Continuu"], ["pagina", "O pagină"], ["doua", "Două pagini"]]
    },
  ];

  function aplica() {
    doc.setAttribute("data-tema", S.ia("tema", "clar"));
    doc.setAttribute("data-font", S.ia("font", "serif"));
    doc.style.setProperty("--text-corp", S.ia("corp", "19") + "px");
    doc.style.setProperty("--scara-ui", S.ia("ui", "1"));
    latimeCuprins(S.ia("cuprinsLat", "20"));
    doc.style.setProperty("--text-rand", S.ia("rand", "1.62"));

    if (text) {
      aplicaLatime(S.ia("lat", text.getAttribute("data-lat-implicit") || "50"));
      aplicaMod(faraPagini ? "continuu" : S.ia("mod", "continuu"), faraPagini);
    }
    if (corp) {
      corp.setAttribute(
        "data-cuprins",
        document.querySelector(".cuprins-lateral")
          ? S.ia("cuprins", ingust() ? "inchis" : "deschis")
          : "inchis"
      );
    }
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
      var n = latimeCuprins(rem);
      S.pune("cuprinsLat", n);
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
      reconstruieste();
    });
    maner.addEventListener("keydown", function (e) {
      var acum = parseFloat(S.ia("cuprinsLat", "20"));
      if (e.key === "ArrowLeft") S.pune("cuprinsLat", latimeCuprins(acum - 1));
      if (e.key === "ArrowRight") S.pune("cuprinsLat", latimeCuprins(acum + 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        reconstruieste();
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
      if (t.nodeValue.trim() !== "") ultim = t;
    }
    if (!ultim) return;
    ultim.nodeValue = ultim.nodeValue.replace(/\s+(\S+)\s*$/, "\u00a0$1");
  }

  function desfaCuvintele(nod) {
    if (nod.dataset.randOriginal !== undefined) {
      nod.innerHTML = nod.dataset.randOriginal;
      delete nod.dataset.randOriginal;
    }
  }

  function aplicaImpartirea() {
    var alegere = S.ia("rand-frumos", "ambele");
    var tinte = [];
    if (alegere === "meniu" || alegere === "ambele") {
      tinte = tinte.concat([].slice.call(
        document.querySelectorAll(".cuprins-lateral a, .sectiuni a, .lectie > summary .titlu-lectie, .unitate > summary")
      ));
    }
    if (alegere === "text" || alegere === "ambele") {
      tinte = tinte.concat([].slice.call(
        document.querySelectorAll(".text h1, .text h2, .text h3, .text h4, .caseta h4")
      ));
    }
    document.querySelectorAll("[data-rand-original]").forEach(function (n) {
      if (tinte.indexOf(n) === -1) desfaCuvintele(n);
    });
    doc.setAttribute("data-rand-frumos", alegere);
    tinte.forEach(legaUltimeleCuvinte);
  }

  function ingust() {
    return window.matchMedia("(max-width: 64rem)").matches;
  }

  /* ---------------------------------------------------------------- */
  /* vizualizare: foi adevărate, construite în pagină                   */
  /* ---------------------------------------------------------------- */

  var noduri = strat ? [].slice.call(strat.children) : [];
  var carte = null;
  var foi = [];
  var foaieCurenta = 0;

  function aplicaMod(mod, temporar) {
    if (!text) return;
    text.setAttribute("data-mod", mod);
    if (!temporar) S.pune("mod", mod);
    if (mod === "continuu") desfaCartea();
    else facCartea();
    var bara = document.querySelector(".paginare");
    if (bara) bara.classList.toggle("activa", mod !== "continuu");
    stare();
  }

  function desfaCartea() {
    if (!carte) return;
    noduri.forEach(function (n) { strat.appendChild(n); });
    carte.remove();
    carte = null;
    foi = [];
    doc.style.setProperty("--zoom", "1");
  }

  function foaieNoua() {
    var f = document.createElement("div");
    f.className = "foaie";
    f.setAttribute("role", "region");
    f.setAttribute("aria-label", "Pagina " + (foi.length + 1));
    carte.appendChild(f);
    foi.push(f);
    return f;
  }

  function incape(f) {
    return f.scrollHeight <= f.clientHeight + 1;
  }

  function despartiCuvinte(nod) {
    var mers = document.createTreeWalker(nod, NodeFilter.SHOW_TEXT);
    var texte = [];
    var t;
    while ((t = mers.nextNode())) texte.push(t);
    texte.forEach(function (nodText) {
      var bucati = nodText.nodeValue.split(/(\s+)/).filter(function (x) { return x !== ""; });
      if (bucati.length < 2) return;
      var frag = document.createDocumentFragment();
      bucati.forEach(function (x) { frag.appendChild(document.createTextNode(x)); });
      nodText.parentNode.replaceChild(frag, nodText);
    });
  }

  function invelisGol(nod) {
    var copie = nod.cloneNode(false);
    if (nod.tagName === "TABLE") {
      var cap = nod.querySelector("thead");
      if (cap) copie.appendChild(cap.cloneNode(true));
      copie.appendChild(document.createElement("tbody"));
      return { copie: copie, tinta: copie.querySelector("tbody") };
    }
    if (nod.querySelector && nod.querySelector("table")) {
      var tabel = invelisGol(nod.querySelector("table"));
      copie.appendChild(tabel.copie);
      return { copie: copie, tinta: tabel.tinta };
    }
    return { copie: copie, tinta: copie };
  }

  function sursaUnitatilor(nod) {
    if (nod.tagName === "TABLE") return nod.querySelector("tbody");
    if (nod.querySelector && nod.querySelector("tbody")) return nod.querySelector("tbody");
    return nod;
  }

  function rupe(nod, f) {
    var sursa = sursaUnitatilor(nod);
    if (!sursa) return null;
    if (sursa === nod && sursa.children.length < 2) despartiCuvinte(nod);
    if (sursa.childNodes.length < 2) return null;
    var invelis = invelisGol(nod);
    var mutate = 0;
    while (!incape(f) && sursa.childNodes.length > 1) {
      invelis.tinta.insertBefore(sursa.lastChild, invelis.tinta.firstChild);
      mutate++;
    }
    if (!mutate) return null;
    return invelis.copie;
  }

  function facCartea() {
    if (!strat) return;
    if (carte) desfaCartea();
    doc.style.setProperty("--zoom", "1");
    carte = document.createElement("div");
    carte.className = "carte";
    strat.appendChild(carte);
    foi = [];
    var f = foaieNoua();
    f.classList.add("activa");

    function aseaza(nod) {
      f.appendChild(nod);
      if (incape(f)) return;
      if (f.childNodes.length > 1) {
        f.removeChild(nod);
        f = foaieNoua();
        f.classList.add("activa");
        f.appendChild(nod);
        if (incape(f)) return;
      }
      var rest = rupe(nod, f);
      var paza = 0;
      while (rest && paza < 400) {
        f = foaieNoua();
        f.classList.add("activa");
        f.appendChild(rest);
        if (incape(f)) break;
        var urmator = rupe(rest, f);
        if (!urmator) break;
        rest = urmator;
        paza++;
      }
    }

    noduri.forEach(aseaza);

    foaieCurenta = 0;
    potrivire();
    arataFoile();
  }

  function cate() {
    return text && text.getAttribute("data-mod") === "doua" ? 2 : 1;
  }

  function arataFoile() {
    var n = cate();
    foi.forEach(function (f, i) {
      f.classList.toggle("activa", i >= foaieCurenta && i < foaieCurenta + n);
    });
    stare();
  }

  function potrivire() {
    if (!text || !carte) return;
    var stil = getComputedStyle(text);
    var latDisp = text.clientWidth - parseFloat(stil.paddingLeft) - parseFloat(stil.paddingRight);
    var inaltDisp = window.innerHeight - text.getBoundingClientRect().top -
      parseFloat(stil.paddingTop) - parseFloat(stil.paddingBottom) - 52;
    var n = cate();
    var latCeruta = (PAG_FOAIE * n + PAG_SEP * (n - 1)) * MM;
    var z = Math.min(latDisp / latCeruta, inaltDisp / (PAG_INALT * MM));
    doc.style.setProperty("--zoom", Math.max(0.25, Math.min(1, z)).toFixed(3));
  }

  function muta(directie) {
    var n = cate();
    var nou = foaieCurenta + directie * n;
    if (nou < 0 || nou >= foi.length) return;
    foaieCurenta = nou;
    arataFoile();
    text.scrollTop = 0;
  }

  function stare() {
    var bara = document.querySelector(".paginare");
    if (!bara || !text) return;
    if (text.getAttribute("data-mod") === "continuu" || !foi.length) return;
    var n = cate();
    var ultima = Math.min(foaieCurenta + n, foi.length);
    bara.querySelector(".stare").textContent =
      (n === 2 && ultima > foaieCurenta + 1 ? (foaieCurenta + 1) + "-" + ultima : foaieCurenta + 1) +
      " din " + foi.length;
    bara.querySelector('[data-directie="-1"]').disabled = foaieCurenta === 0;
    bara.querySelector('[data-directie="1"]').disabled = foaieCurenta + n >= foi.length;
  }

  function construiestePaginare() {
    if (!text) return;
    var bara = document.createElement("div");
    bara.className = "paginare";
    bara.innerHTML =
      '<button type="button" data-directie="-1">Anterior</button>' +
      '<span class="stare mic" aria-live="polite"></span>' +
      '<button type="button" data-directie="1">Următor</button>';
    text.parentNode.insertBefore(bara, text.nextSibling);
    bara.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-directie]");
      if (b) muta(parseInt(b.getAttribute("data-directie"), 10));
    });
    var asteapta;
    window.addEventListener("resize", function () {
      clearTimeout(asteapta);
      asteapta = setTimeout(function () {
        if (text.getAttribute("data-mod") !== "continuu") facCartea();
      }, 200);
    });
    window.addEventListener("beforeprint", function () {
      if (text.getAttribute("data-mod") !== "continuu") {
        foi.forEach(function (f) { f.classList.add("activa"); });
      }
    });
    window.addEventListener("afterprint", arataFoile);
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
      reconstruieste();
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
        if (ingust()) comuta("inchis");
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

  var asteaptaRefacere;

  function reconstruieste() {
    if (!text || text.getAttribute("data-mod") === "continuu") return;
    clearTimeout(asteaptaRefacere);
    asteaptaRefacere = setTimeout(facCartea, 250);
  }

  function panouSetari() {
    var html = "";
    GRUPE.forEach(function (g) {
      if (g.cheie === "mod" && (!text || faraPagini)) return;
      if (g.cheie === "latime" && !text) return;
      html += "<label>" + g.nume + "</label>" +
        '<div class="optiuni" data-cheie="' + g.cheie + '">' +
        g.valori.map(function (v) {
          return '<button type="button" data-val="' + v[0] + '">' + v[1] + "</button>";
        }).join("") + "</div>";
    });

    html +=
      '<label for="s-lat">Lățimea textului, până la toată pagina</label>' +
      '<input id="s-lat" type="range" min="30" max="100" step="1">' +
      '<label for="s-corp">Mărimea literei în text</label>' +
      '<input id="s-corp" type="range" min="15" max="26" step="1">' +
      '<label for="s-ui">Mărimea literei în interfață</label>' +
      '<input id="s-ui" type="range" min="0.85" max="1.4" step="0.05">' +
      '<label for="s-rand">Spațiul dintre rânduri</label>' +
      '<input id="s-rand" type="range" min="1.3" max="2.1" step="0.02">' +
      '<p class="mic"><a href="' + GESTIONARE_URL + '">Aici</a>' + ' sunt administrate datele păstrate.</p>' +
      "<label>Tipărire</label>" +
      '<div class="optiuni"><button type="button" id="s-tipar">Tipărește lecția</button></div>';

    var p = panou("panou-setari", "Setări de citire", html);

    p.querySelectorAll(".optiuni[data-cheie]").forEach(function (g) {
      var cheie = g.getAttribute("data-cheie");
      var def = GRUPE.filter(function (x) { return x.cheie === cheie; })[0].implicit;
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
        if (cheie === "mod") aplicaMod(b.getAttribute("data-val"));
        else { aplica(); aplicaImpartirea(); reconstruieste(); }
        marcheaza();
      });
      marcheaza();
    });

    function cursor(sel, cheie, def, prop, unitate) {
      var i = p.querySelector(sel);
      if (!i) return;
      i.value = S.ia(cheie, def);
      i.addEventListener("input", function () {
        S.pune(cheie, i.value);
        if (cheie === "lat") aplicaLatime(i.value);
        else doc.style.setProperty(prop, i.value + unitate);
        reconstruieste();
      });
    }
    cursor("#s-lat", "lat", "50", "--lat", "rem");
    cursor("#s-ui", "ui", "1", "--scara-ui", "");
    cursor("#s-corp", "corp", "19", "--text-corp", "px");
    cursor("#s-rand", "rand", "1.62", "--text-rand", "");

    p.querySelector("#s-tipar").addEventListener("click", function () { window.print(); });
    return p;
  }

  function panouCautare() {
    var p = panou(
      "panou-cautare",
      "Caută în manual",
      '<input type="search" class="cautare-camp" id="camp-cautare" autocomplete="off" ' +
        'spellcheck="false" placeholder="Cuvânt sau expresie">' +
        '<ul class="rezultate" id="rezultate"></ul>' +
        '<p class="mic" id="stare-cautare">Căutarea acoperă toate lecțiile.</p>'
    );
    var camp = p.querySelector("#camp-cautare");
    var lista = p.querySelector("#rezultate");
    var info = p.querySelector("#stare-cautare");
    var cale = location.pathname.indexOf("/lectii/") > -1 ? "" : "lectii/";

    function simplu(s) {
      return s.toLowerCase()
        .replace(/[ăâ]/g, "a").replace(/î/g, "i")
        .replace(/ș/g, "s").replace(/ț/g, "t");
    }

    function cauta() {
      var q = camp.value.trim();
      lista.innerHTML = "";
      if (q.length < 3) {
        info.textContent = "Scrieți cel puțin trei litere.";
        return;
      }
      var nq = simplu(q);
      var total = 0;
      (window.INDEX_CAUTARE || []).forEach(function (d) {
        var nt = simplu(d.text);
        var poz = nt.indexOf(nq);
        var n = 0;
        while (poz > -1 && n < 3) {
          var s = Math.max(0, poz - 70);
          var e = Math.min(d.text.length, poz + nq.length + 90);
          var frag = (s > 0 ? "… " : "") + d.text.slice(s, poz) +
            "<mark>" + d.text.slice(poz, poz + nq.length) + "</mark>" +
            d.text.slice(poz + nq.length, e) + " …";
          var li = document.createElement("li");
          li.innerHTML = '<a href="' + cale + d.slug + ".html?c=" +
            encodeURIComponent(q) + '">' + d.titlu + "</a><p>" + frag + "</p>";
          lista.appendChild(li);
          poz = nt.indexOf(nq, poz + nq.length);
          n++;
          total++;
        }
      });
      info.textContent = total
        ? total + " potriviri, cel mult trei pentru fiecare lecție."
        : "Nicio potrivire.";
    }

    camp.addEventListener("input", cauta);
    return p;
  }

  /* ---------------------------------------------------------------- */
  /* note de subsol                                                    */
  /* ---------------------------------------------------------------- */

  function note() {
    var balon = null;

    function inchide() {
      if (balon) {
        balon.remove();
        balon = null;
      }
    }

    document.addEventListener("click", function (e) {
      var ref = e.target.closest("sup.ref");
      if (!ref) {
        if (!e.target.closest(".balon")) inchide();
        return;
      }
      e.preventDefault();
      var t = (window.NOTE || {})[ref.getAttribute("data-nota")];
      if (!t) return;
      inchide();
      balon = document.createElement("div");
      balon.className = "balon";
      balon.innerHTML = "<b>Nota " + ref.getAttribute("data-nota") + "</b>" + t;
      document.body.appendChild(balon);
      var r = ref.getBoundingClientRect();
      var lat = Math.min(balon.offsetWidth, window.innerWidth - 24);
      balon.style.width = lat + "px";
      balon.style.left = Math.min(
        Math.max(8, r.left - lat / 2),
        window.innerWidth - lat - 8
      ) + window.scrollX + "px";
      var sus = r.bottom + window.scrollY + 8;
      if (r.bottom + balon.offsetHeight + 16 > window.innerHeight) {
        sus = r.top + window.scrollY - balon.offsetHeight - 8;
      }
      balon.style.top = sus + "px";
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") inchide();
    });
  }

  /* ---------------------------------------------------------------- */
  /* teme                                                              */
  /* ---------------------------------------------------------------- */

  function teme() {
    document.querySelectorAll(".tema-text").forEach(function (t, i) {
      var cheie = "tema:" + slug + ":" + i;
      t.value = S.ia(cheie, "");
      t.addEventListener("input", function () {
        S.pune(cheie, t.value);
        actualizeazaSemnulTemei();
      });
    });
  }

  function salveazaRaspunsuri() {
    var d = {};
    S.chei().forEach(function (k) {
      if (k.indexOf("tema:") === 0) d[k] = S.ia(k, "");
    });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(d, null, 1)], { type: "application/json" })
    );
    a.download = "raspunsuri-manual.json";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  window.salveazaRaspunsuri = function () { salveazaRaspunsuri(); };

  function incarcaRaspunsuri(dupa) {
    var i = document.createElement("input");
    i.type = "file";
    i.accept = "application/json,.json";
    i.addEventListener("change", function () {
      var f = i.files[0];
      if (!f) return;
      var c = new FileReader();
      c.onload = function () {
        try {
          var d = JSON.parse(c.result);
          Object.keys(d).forEach(function (k) {
            if (k.indexOf("tema:") === 0) S.pune(k, d[k]);
          });
          teme();
          if (typeof dupa === "function") dupa();
          alert("Răspunsurile au fost încărcate.");
        } catch (e) {
          alert("Fișierul nu a putut fi citit.");
        }
      };
      c.readAsText(f);
    });
    i.click();
  }

  /* ---------------------------------------------------------------- */
  /* lecții parcurse și teme scrise                                    */
  /* ---------------------------------------------------------------- */

  function lista(cheie) {
    var t = S.ia(cheie, "");
    return t ? t.split(",").filter(Boolean) : [];
  }

  function scrieLista(cheie, valori) {
    S.pune(cheie, valori.filter(Boolean).join(","));
  }

  function areTemaScrisa() {
    var gasit = false;
    document.querySelectorAll(".tema-text").forEach(function (t) {
      if (t.value.trim() !== "") gasit = true;
    });
    return gasit;
  }

  function actualizeazaSemnulTemei() {
    var semn = document.getElementById("semn-tema");
    var scrisa = areTemaScrisa();
    if (semn) {
      semn.hidden = !scrisa;
      semn.style.display = scrisa ? "" : "none";
    }
    var t = lista("teme");
    var i = t.indexOf(slug);
    if (scrisa && i === -1) t.push(slug);
    if (!scrisa && i > -1) t.splice(i, 1);
    scrieLista("teme", t);
  }

  function butonCitit() {
    var b = document.getElementById("buton-citit");
    if (!b) return;
    function arata() {
      var citit = lista("citit").indexOf(slug) > -1;
      b.setAttribute("aria-pressed", citit ? "true" : "false");
      b.title = citit ? "Lecție parcursă. Apasă pentru a anula" : "Marchează lecția ca parcursă";
    }
    b.addEventListener("click", function () {
      var c = lista("citit");
      var i = c.indexOf(slug);
      if (i > -1) c.splice(i, 1);
      else c.push(slug);
      scrieLista("citit", c);
      arata();
    });
    arata();
  }

  /* ---------------------------------------------------------------- */
  /* evidențierea căutării                                             */
  /* ---------------------------------------------------------------- */

  function evidentiaza() {
    var q = new URLSearchParams(location.search).get("c");
    if (!q || !text) return;
    var re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    var mers = document.createTreeWalker(text, NodeFilter.SHOW_TEXT);
    var noduri = [];
    var n;
    while ((n = mers.nextNode())) {
      if (n.parentNode.closest("script, style, textarea")) continue;
      if (re.test(n.nodeValue)) noduri.push(n);
    }
    var primul = null;
    noduri.forEach(function (nod) {
      var sp = document.createElement("span");
      sp.innerHTML = nod.nodeValue.replace(re, function (m) {
        return "<mark>" + m + "</mark>";
      });
      nod.parentNode.replaceChild(sp, nod);
      if (!primul) primul = sp.querySelector("mark");
    });
    if (primul) primul.scrollIntoView({ block: "center" });
  }

  /* ---------------------------------------------------------------- */
  /* pornire                                                           */
  /* ---------------------------------------------------------------- */

  var faraPagini = text && text.hasAttribute("data-fara-pagini");
  if (text && !faraPagini) construiestePaginare();
  aplica();
  cuprinsLateral();
  manerCuprins();
  aplicaImpartirea();
  urmareste();
  note();
  if (text) {
    teme();
    evidentiaza();
    actualizeazaSemnulTemei();
  }
  butonCitit();

  window.incarcaRaspunsuri = incarcaRaspunsuri;

  var bs = document.getElementById("buton-setari");
  if (bs) bs.addEventListener("click", function () { deschide(panouSetari()); });
  var bc = document.getElementById("buton-cauta");
  if (bc) bc.addEventListener("click", function () { deschide(panouCautare()); });
  document.querySelectorAll(".buton-tipar").forEach(function (b) {
    b.addEventListener("click", function () { window.print(); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea")) return;
    if ((e.key === "f" || e.key === "k") && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      deschide(panouCautare());
      return;
    }
    if (text && text.getAttribute("data-mod") !== "continuu") {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        muta(1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        muta(-1);
      }
    }
  });
})();
