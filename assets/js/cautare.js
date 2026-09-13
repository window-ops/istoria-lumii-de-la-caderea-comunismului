/* Căutarea în manual.
   Cuvintele simple se caută fără să conteze diacriticele („Erdogan” găsește
   „Erdoğan”, „tara” găsește „țara”) și toate trebuie să apară în lecție.
   O expresie între ghilimele se caută întocmai, cu diacriticele scrise. */

(function () {
  "use strict";

  var M = window.Manual;
  var text = M.text;

  /* litere care nu se descompun prin normalizare Unicode */
  var SPECIALE = {
    "ø": "o", "ł": "l", "đ": "d", "ð": "d", "þ": "th", "ß": "ss", "æ": "ae", "œ": "oe",
    "ı": "i", "ħ": "h", "ŧ": "t", "ŀ": "l", "ĸ": "k", "ŋ": "n", "ə": "e"
  };

  /* Textul fără diacritice, cu litere mici, împreună cu harta pozițiilor:
     harta[i] = poziția din textul original a literei i din textul simplificat. */
  function simplifica(s) {
    var out = [];
    var harta = [];
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      var cod = s.charCodeAt(i);
      var r;
      if (cod < 128) {
        r = c.toLowerCase();
      } else {
        r = c.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        if (SPECIALE[r]) r = SPECIALE[r];
      }
      for (var j = 0; j < r.length; j++) {
        out.push(r.charAt(j));
        harta.push(i);
      }
    }
    harta.push(s.length);
    return { text: out.join(""), harta: harta };
  }

  /* „exact” păstrează diacriticele, dar tot fără majuscule */
  function exact(s) {
    var harta = [];
    for (var i = 0; i <= s.length; i++) harta.push(i);
    return { text: s.toLowerCase(), harta: harta };
  }

  /* interogarea: cuvinte simple și expresii între ghilimele */
  function termeni(q) {
    var t = [];
    var re = /"([^"]+)"|„([^”"]+)”|(\S+)/g;
    var m;
    while ((m = re.exec(q))) {
      var expr = m[1] || m[2];
      if (expr && expr.trim()) t.push({ text: expr.trim().toLowerCase(), exact: true });
      else if (m[3]) t.push({ text: simplifica(m[3]).text, exact: false });
    }
    return t;
  }

  /* toate aparițiile termenilor în text: [{start, sfarsit}] în pozițiile originalului */
  function aparitii(original, t, pregatit) {
    var rez = [];
    var sursa = t.exact ? (pregatit.exact || (pregatit.exact = exact(original)))
      : (pregatit.simplu || (pregatit.simplu = simplifica(original)));
    var poz = sursa.text.indexOf(t.text);
    while (poz > -1) {
      rez.push({ start: sursa.harta[poz], sfarsit: sursa.harta[poz + t.text.length] });
      poz = sursa.text.indexOf(t.text, poz + Math.max(1, t.text.length));
    }
    return rez;
  }

  function scapa(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  var pregatite = {};

  function cautaIn(d, lista) {
    var p = pregatite[d.slug] || (pregatite[d.slug] = {});
    var toate = [];
    for (var i = 0; i < lista.length; i++) {
      var a = aparitii(d.text, lista[i], p);
      if (!a.length) return null;
      toate = toate.concat(a);
    }
    toate.sort(function (x, y) { return x.start - y.start; });
    return toate;
  }

  /* fragmente cu marcaje, cel mult trei pentru o lecție */
  function fragmente(textLectie, gasite) {
    var frag = [];
    var i = 0;
    while (i < gasite.length && frag.length < 3) {
      var s = Math.max(0, gasite[i].start - 70);
      var e = Math.min(textLectie.length, gasite[i].sfarsit + 90);
      var cuprinse = [];
      while (i < gasite.length && gasite[i].sfarsit <= e) cuprinse.push(gasite[i++]);
      var h = s > 0 ? "… " : "";
      var poz = s;
      cuprinse.forEach(function (g) {
        h += scapa(textLectie.slice(poz, g.start)) + "<mark>" + scapa(textLectie.slice(g.start, g.sfarsit)) + "</mark>";
        poz = g.sfarsit;
      });
      h += scapa(textLectie.slice(poz, e)) + (e < textLectie.length ? " …" : "");
      frag.push(h);
    }
    return frag;
  }

  function panouCautare() {
    var p = M.panou(
      "panou-cautare",
      "Caută în manual",
      '<input type="search" class="cautare-camp" id="camp-cautare" autocomplete="off" ' +
        'spellcheck="false" placeholder="Cuvinte, sau „expresie exactă”">' +
        '<ul class="rezultate" id="rezultate"></ul>' +
        '<p class="mic" id="stare-cautare">Toate cuvintele trebuie să apară în lecție, ' +
        "indiferent de diacritice. O expresie între ghilimele se caută întocmai.</p>"
    );
    if (p.dataset.legat) return p;
    p.dataset.legat = "1";
    var camp = p.querySelector("#camp-cautare");
    var lista = p.querySelector("#rezultate");
    var info = p.querySelector("#stare-cautare");
    var cale = M.cale("lectii/");
    var asteapta;

    function cauta() {
      var q = camp.value.trim();
      lista.innerHTML = "";
      var t = termeni(q);
      var lungime = t.reduce(function (n, x) { return n + x.text.length; }, 0);
      if (!t.length || lungime < 3) {
        info.textContent = "Scrieți cel puțin trei litere.";
        return;
      }
      var lectii = 0;
      var total = 0;
      (window.INDEX_CAUTARE || []).forEach(function (d) {
        var gasite = cautaIn(d, t);
        if (!gasite) return;
        lectii++;
        total += gasite.length;
        var li = document.createElement("li");
        li.innerHTML = '<a href="' + cale + d.slug + ".html?c=" + encodeURIComponent(q) + '">' +
          scapa(d.titlu) + '</a> <span class="mic">' + gasite.length + "</span>" +
          fragmente(d.text, gasite).map(function (f) { return "<p>" + f + "</p>"; }).join("");
        lista.appendChild(li);
      });
      info.textContent = total
        ? total + " potriviri în " + lectii + (lectii === 1 ? " lecție." : " lecții.")
        : "Nicio potrivire.";
    }

    camp.addEventListener("input", function () {
      clearTimeout(asteapta);
      asteapta = setTimeout(cauta, 120);
    });
    return p;
  }

  /* ---------------------------------------------------------------- */
  /* evidențierea la sosirea dintr-o căutare                            */
  /* ---------------------------------------------------------------- */

  function evidentiaza() {
    var q = new URLSearchParams(location.search).get("c");
    if (!q || !text) return;
    var t = termeni(q);
    if (!t.length) return;
    var mers = document.createTreeWalker(text, NodeFilter.SHOW_TEXT);
    var noduri = [];
    var n;
    while ((n = mers.nextNode())) {
      if (n.parentNode.closest("script, style, textarea")) continue;
      noduri.push(n);
    }
    var primul = null;
    noduri.forEach(function (nod) {
      var gasite = [];
      var p = {};
      t.forEach(function (x) { gasite = gasite.concat(aparitii(nod.nodeValue, x, p)); });
      if (!gasite.length) return;
      gasite.sort(function (x, y) { return x.start - y.start; });
      var frag = document.createDocumentFragment();
      var poz = 0;
      gasite.forEach(function (g) {
        if (g.start < poz) return;
        frag.appendChild(document.createTextNode(nod.nodeValue.slice(poz, g.start)));
        var m = document.createElement("mark");
        m.textContent = nod.nodeValue.slice(g.start, g.sfarsit);
        frag.appendChild(m);
        if (!primul) primul = m;
        poz = g.sfarsit;
      });
      frag.appendChild(document.createTextNode(nod.nodeValue.slice(poz)));
      nod.parentNode.replaceChild(frag, nod);
    });
    if (primul && !(M.paginat && M.paginat())) primul.scrollIntoView({ block: "center" });
  }

  M.simplifica = simplifica;
  M.termeni = termeni;
  M.panouCautare = panouCautare;

  var bc = document.getElementById("buton-cauta");
  if (bc) bc.addEventListener("click", function () { M.deschide(panouCautare()); });

  document.addEventListener("keydown", function (e) {
    if ((e.key === "f" || e.key === "k") && (e.ctrlKey || e.metaKey) && document.getElementById("buton-cauta")) {
      e.preventDefault();
      M.deschide(panouCautare());
    }
  });

  M.inainte.push(evidentiaza);
})();
