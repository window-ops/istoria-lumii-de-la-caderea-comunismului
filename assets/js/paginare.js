/* Vizualizarea pe pagini: foi adevărate, construite în pagină.
   Originalele rămân neatinse (scoase din document cât timp sunt foi);
   pe foi se așază copii, tăiate acolo unde nu încap. Foile se construiesc
   pe bucăți, ca pagina să rămână folosibilă și la sute de foi. */

(function () {
  "use strict";

  var M = window.Manual;
  var S = M.S;
  var doc = M.doc;
  var text = M.text;
  var strat = M.strat;
  if (!text || !strat || M.faraPagini) return;

  var MM = 96 / 25.4;
  var PAG_SEP = 10;

  var FOI = {
    a4: [210, 297],
    a5: [148, 210],
    letter: [216, 279]
  };
  var MARGINI = { inguste: 12, normale: 20, largi: 28 };

  var noduri = strat ? [].slice.call(strat.children) : [];
  var carte = null;
  var carteNoua = null;
  var foi = [];
  var foaieCurenta = 0;
  var constructie = 0;
  var gata = true;

  function foaieMm() {
    var f = FOI[S.ia("foaie", "a4")] || FOI.a4;
    var m = MARGINI[S.ia("margini", "normale")] || MARGINI.normale;
    return { lat: f[0], inalt: f[1], marg: m };
  }

  function aplicaFoaia() {
    var f = foaieMm();
    doc.style.setProperty("--pag-foaie", f.lat + "mm");
    doc.style.setProperty("--pag-inalt", f.inalt + "mm");
    doc.style.setProperty("--pag-marg", f.marg + "mm");
    doc.style.setProperty("--pag-txt", (f.lat - 2 * f.marg) + "mm");
  }

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
    constructie++;
    if (carteNoua) carteNoua.remove();
    carteNoua = null;
    if (!carte) return;
    carte.remove();
    carte = null;
    foi = [];
    noduri.forEach(function (n) { strat.appendChild(n); });
    doc.style.setProperty("--zoom", "1");
    text.scrollTop = 0;
    marcheazaCuprinsul();
  }

  function foaieNoua(inCarte, inFoi) {
    var f = document.createElement("div");
    f.className = "foaie";
    f.setAttribute("role", "region");
    f.setAttribute("aria-label", "Pagina " + (inFoi.length + 1));
    inCarte.appendChild(f);
    inFoi.push(f);
    return f;
  }

  function incape(f) {
    return f.scrollHeight <= f.clientHeight + 1;
  }

  function goala(f) {
    return !f.childNodes.length;
  }

  var ATOMIC = "textarea, .tema, tr, thead, img, svg, hr, .navigare, sup, .note-tipar, .tema-linii, pre, .bloc-copiabil, .fisa-antet, .fisa-declaratie";
  var TEXTUAL = /^(P|LI|H1|H2|H3|H4|H5|H6|DT|DD|TD|TH|FIGCAPTION|BLOCKQUOTE)$/;
  var TITLU = /^H[1-6]$/;

  function despartiCuvinte(nod) {
    var mers = document.createTreeWalker(nod, NodeFilter.SHOW_TEXT);
    var texte = [];
    var t;
    while ((t = mers.nextNode())) texte.push(t);
    texte.forEach(function (nodText) {
      var bucati = nodText.nodeValue.split(/([ \t\r\n]+)/).filter(function (x) { return x !== ""; });
      if (bucati.length < 2) return;
      var frag = document.createDocumentFragment();
      bucati.forEach(function (x) { frag.appendChild(document.createTextNode(x)); });
      nodText.parentNode.replaceChild(frag, nodText);
    });
  }

  function poateFiTaiat(nod) {
    if (nod.nodeType !== 1) return false;
    if (nod.matches(ATOMIC)) return false;
    if (nod.tagName === "TABLE" && S.ia("taie-tabele", "da") === "nu") return false;
    if (nod.classList.contains("tabel") && S.ia("taie-tabele", "da") === "nu") return false;
    if (nod.classList.contains("caseta") && S.ia("taie-casete", "da") === "nu") return false;
    return true;
  }

  /* descrie cum se împarte un nod: unde stau unitățile lui și cum se face o copie goală */
  function anatomie(nod) {
    if (nod.tagName === "TABLE") {
      var tbody = nod.querySelector(":scope > tbody") || nod;
      return {
        container: tbody,
        unitati: [].slice.call(tbody.children),
        copie: function () {
          var c = nod.cloneNode(false);
          c.removeAttribute("id");
          var cap = nod.querySelector(":scope > thead");
          if (cap) c.appendChild(cap.cloneNode(true));
          var tb = document.createElement("tbody");
          c.appendChild(tb);
          return { nod: c, container: tb };
        }
      };
    }
    if (TEXTUAL.test(nod.tagName)) despartiCuvinte(nod);
    var copii = nod.tagName === "OL" || nod.tagName === "UL" ? [].slice.call(nod.children)
      : [].slice.call(nod.childNodes);
    return {
      container: nod,
      unitati: copii,
      copie: function (k) {
        var c = nod.cloneNode(false);
        c.removeAttribute("id");
        if (nod.tagName === "OL") {
          c.setAttribute("start", (parseInt(nod.getAttribute("start") || "1", 10) + k));
        }
        return { nod: c, container: c };
      }
    };
  }

  /* Nodul este deja în foaie și nu încape. Păstrează în foaie cât încape și
     întoarce restul ca nod nou, sau null dacă nu încape nimic (atunci nodul
     rămâne întreg în foaie, iar cel care a chemat îl mută). */
  function taie(nod, f, adancime) {
    if (!poateFiTaiat(nod) || adancime > 8) return null;
    var a = anatomie(nod);
    var u = a.unitati;
    if (!u.length) return null;

    function arata(k) {
      for (var i = 0; i < u.length; i++) {
        var inauntru = u[i].parentNode === a.container;
        if (i < k && !inauntru) a.container.appendChild(u[i]);
        if (i >= k && inauntru) a.container.removeChild(u[i]);
      }
    }

    /* căutare binară: cel mai mare k pentru care primele k unități încap */
    var jos = 0;
    var sus = u.length;
    while (jos < sus) {
      var mij = Math.ceil((jos + sus) / 2);
      arata(mij);
      if (incape(f)) jos = mij;
      else sus = mij - 1;
    }
    var k = jos;
    var textual = TEXTUAL.test(nod.tagName);

    if (!textual) {
      /* un titlu nu rămâne singur la sfârșitul foii */
      while (k > 0 && ((u[k - 1].nodeType === 1 && TITLU.test(u[k - 1].tagName)) ||
        (u[k - 1].nodeType === 3 && !u[k - 1].nodeValue.trim()))) k--;
    } else {
      /* într-un text, cel puțin două rânduri rămân pe foaie și câteva cuvinte
         trec pe cealaltă, altfel se mută întreg */
      if (u.length - k < 6) k = Math.max(0, u.length - 6);
      if (k > 0) {
        arata(k);
        var rand = parseFloat(getComputedStyle(nod).lineHeight) || 24;
        if (!incape(f) || nod.getBoundingClientRect().height < rand * 1.8) k = 0;
      }
    }
    arata(k);

    var rest = null;
    if (k < u.length) {
      var c = a.copie(k);
      /* unitatea de la graniță poate fi și ea tăiată */
      if (!textual && u[k].nodeType === 1) {
        a.container.appendChild(u[k]);
        var bucata = incape(f) ? null : taie(u[k], f, adancime + 1);
        if (bucata) {
          c.container.appendChild(bucata);
          k++;
        } else if (!incape(f)) {
          a.container.removeChild(u[k]);
        } else {
          k++;
        }
      }
      for (var i = k; i < u.length; i++) c.container.appendChild(u[i]);
      rest = c.nod;
    }
    if (k === 0) {
      /* nimic nu a încăput: nodul se reface întreg */
      arata(u.length);
      return null;
    }
    return rest;
  }

  function esteTema(nod) {
    return nod.nodeType === 1 && nod.classList.contains("tema");
  }

  function inaltimeMinimaTema(ta) {
    var randPx = parseFloat(getComputedStyle(ta).lineHeight) || 24;
    return randPx * 5 + 16;
  }

  /* spațiile de temă se întind până la capătul foii */
  function intindeTema(nod, f) {
    var ta = nod.querySelector(".tema-text");
    if (!ta) return;
    var minim = inaltimeMinimaTema(ta);
    ta.style.height = minim + "px";
    var liber = f.clientHeight - f.scrollHeight;
    if (liber <= 0) return;
    ta.style.height = (minim + liber) + "px";
    var paza = 0;
    while (!incape(f) && parseFloat(ta.style.height) > minim && paza++ < 50) {
      ta.style.height = (parseFloat(ta.style.height) - 4) + "px";
    }
  }

  function legaTemaCopie(nod) {
    var ta = nod.querySelectorAll ? nod.querySelectorAll(".tema-text") : [];
    [].forEach.call(ta, function (t) {
      var cheie = t.getAttribute("data-cheie");
      if (!cheie) return;
      t.value = S.ia(cheie, "");
      t.addEventListener("input", function () {
        S.pune(cheie, t.value);
        M.actualizeazaSemnulTemei();
      });
    });
  }

  /* Cartea se construiește pe bucăți. La refacere, cartea veche rămâne la
     vedere până când cea nouă este gata; abia atunci se schimbă între ele. */
  function facCartea() {
    if (!strat) return;
    var eraCarte = !!carte;
    var ancora = eraCarte ? ancoraCurenta() : null;
    constructie++;
    var id = constructie;
    if (!eraCarte) {
      noduri.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
    } else if (carteNoua) {
      carteNoua.remove();
    }
    aplicaFoaia();
    carteNoua = document.createElement("div");
    carteNoua.className = "carte" + (eraCarte ? " zidire" : "");
    strat.appendChild(carteNoua);
    var foiNoi = [];
    if (!eraCarte) {
      carte = carteNoua;
      foi = foiNoi;
      foaieCurenta = 0;
      gata = false;
    }
    potrivire();
    var f = foaieNoua(carteNoua, foiNoi);
    f.classList.add("zidire");
    var temaIntinsa = S.ia("tema-intinsa", "da") === "da";
    var i = 0;

    /* foaie nouă; titlurile rămase singure la capătul foii vechi trec și ele */
    function foaieUrmatoare() {
      var duse = [];
      while (f.lastChild && f.childNodes.length > 1 && f.lastChild.nodeType === 1 &&
        TITLU.test(f.lastChild.tagName)) {
        duse.unshift(f.removeChild(f.lastChild));
      }
      f.classList.remove("zidire");
      f = foaieNoua(carteNoua, foiNoi);
      f.classList.add("zidire");
      duse.forEach(function (d) { f.appendChild(d); });
    }

    function aseaza(nod) {
      if (esteTema(nod) && temaIntinsa) {
        f.appendChild(nod);
        var ta = nod.querySelector(".tema-text");
        if (ta) ta.style.height = inaltimeMinimaTema(ta) + "px";
        if (!incape(f) && f.childNodes.length > 1) {
          f.removeChild(nod);
          foaieUrmatoare();
          f.appendChild(nod);
        }
        intindeTema(nod, f);
        return;
      }
      f.appendChild(nod);
      if (incape(f)) return;
      var rest;
      if (f.childNodes.length > 1) {
        rest = taie(nod, f, 0);
        if (rest === null) {
          f.removeChild(nod);
          foaieUrmatoare();
          f.appendChild(nod);
          if (incape(f)) return;
        } else {
          foaieUrmatoare();
          f.appendChild(rest);
          if (incape(f)) return;
          nod = rest;
        }
      }
      var paza = 0;
      rest = taie(nod, f, 0);
      while (rest && paza < 3000) {
        foaieUrmatoare();
        f.appendChild(rest);
        if (incape(f)) break;
        rest = taie(rest, f, 0);
        paza++;
      }
    }

    function pas() {
      if (id !== constructie) return;
      var limita = performance.now() + 14;
      while (i < noduri.length && performance.now() < limita) {
        var copie = noduri[i].cloneNode(true);
        copie.setAttribute("data-sursa", i);
        legaTemaCopie(copie);
        aseaza(copie);
        i++;
      }
      if (i < noduri.length) {
        if (!eraCarte) arataFoile(true);
        setTimeout(pas, 0);
        return;
      }
      f.classList.remove("zidire");
      if (eraCarte) {
        carte.remove();
        carte = carteNoua;
        foi = foiNoi;
        carte.classList.remove("zidire");
      }
      carteNoua = null;
      gata = true;
      if (ancora !== null && ancora !== undefined) {
        if (!mergiLaSursa(ancora)) mergiLaFoaie(Math.min(foaieCurenta, foi.length - 1));
      } else if (location.hash) {
        mergiLaId(location.hash.slice(1));
      } else if (carte.querySelector("mark")) {
        mergiLaElement(carte.querySelector("mark"));
      }
      arataFoile();
    }
    pas();
  }

  function modul() {
    return text.getAttribute("data-mod") || "continuu";
  }

  function cate() {
    return text && text.getAttribute("data-mod") === "doua" ? 2 : 1;
  }

  function arataFoile(inConstructie) {
    var n = cate();
    foi.forEach(function (f, i) {
      var activ = i >= foaieCurenta && i < foaieCurenta + n;
      if (inConstructie && f.classList.contains("zidire")) activ = false;
      f.classList.toggle("activa", activ);
    });
    stare();
    marcheazaCuprinsul();
  }

  function potrivire() {
    if (!text || !carte) return;
    var fm = foaieMm();
    var stil = getComputedStyle(text);
    var latDisp = text.clientWidth - parseFloat(stil.paddingLeft) - parseFloat(stil.paddingRight);
    /* la pagini, .text este mărginit la fereastră, deci înălțimea lui liberă
       este chiar spațiul în care încap foile */
    var inaltDisp = text.clientHeight - parseFloat(stil.paddingTop) - parseFloat(stil.paddingBottom);
    var n = cate();
    var latCeruta = (fm.lat * n + PAG_SEP * (n - 1)) * MM;
    var z = Math.min(latDisp / latCeruta, inaltDisp / (fm.inalt * MM));
    doc.style.setProperty("--zoom", Math.max(0.25, Math.min(1.5, z)).toFixed(3));
  }

  function muta(directie) {
    var n = cate();
    var nou = foaieCurenta + directie * n;
    if (nou < 0 || nou >= foi.length) return;
    foaieCurenta = nou;
    arataFoile();
    text.scrollTop = 0;
  }

  function mergiLaFoaie(i) {
    if (i < 0 || i >= foi.length) return false;
    var n = cate();
    foaieCurenta = Math.floor(i / n) * n;
    arataFoile();
    text.scrollTop = 0;
    return true;
  }

  function foaiaLui(el) {
    var f = el && el.closest ? el.closest(".foaie") : null;
    return f ? foi.indexOf(f) : -1;
  }

  function mergiLaElement(el) {
    var i = foaiaLui(el);
    return i > -1 && mergiLaFoaie(i);
  }

  function cautaId(id) {
    if (!carte || !id) return null;
    try {
      return carte.querySelector("#" + CSS.escape(decodeURIComponent(id)));
    } catch (e) {
      return null;
    }
  }

  var tintaCuprins = null;

  function mergiLaId(id) {
    var el = cautaId(id);
    tintaCuprins = el;
    var ok = mergiLaElement(el);
    tintaCuprins = null;
    return ok;
  }

  function mergiLaSursa(k) {
    if (!carte) return false;
    return mergiLaElement(carte.querySelector('[data-sursa="' + k + '"]'));
  }

  function ancoraCurenta() {
    var f = foi[foaieCurenta];
    var el = f && f.querySelector("[data-sursa]");
    return el ? parseInt(el.getAttribute("data-sursa"), 10) : null;
  }

  /* cuprinsul lateral urmărește foaia arătată */
  function marcheazaCuprinsul() {
    var legaturi = document.querySelectorAll(".cuprins-lateral a[href^='#']");
    if (!legaturi.length || !carte) return;
    var n = cate();
    var ultima = null;
    var peFoaie = null;
    for (var i = 0; i < legaturi.length; i++) {
      var k = foaiaLui(cautaId(legaturi[i].getAttribute("href").slice(1)));
      if (k === -1) continue;
      if (k < foaieCurenta) ultima = legaturi[i];
      else if (k < foaieCurenta + n) { if (!peFoaie) peFoaie = legaturi[i]; }
      else break;
    }
    var activ = peFoaie || ultima;
    if (tintaCuprins && tintaCuprins.id) {
      for (var t = 0; t < legaturi.length; t++) {
        if (decodeURIComponent(legaturi[t].getAttribute("href").slice(1)) === tintaCuprins.id) activ = legaturi[t];
      }
    }
    for (var j = 0; j < legaturi.length; j++) {
      legaturi[j].classList.toggle("activ", legaturi[j] === activ);
    }
    if (activ) {
      var det = activ.closest("details");
      if (det && !det.open) det.open = true;
      var lateral = activ.closest(".cuprins-lateral");
      if (lateral) {
        var r = activ.getBoundingClientRect();
        var rl = lateral.getBoundingClientRect();
        if (r.top < rl.top || r.bottom > rl.bottom) {
          lateral.scrollTop += r.top - rl.top - rl.height / 2;
        }
      }
    }
  }

  function stare() {
    var bara = document.querySelector(".paginare");
    if (!bara || !text) return;
    if (modul() === "continuu" || !foi.length) return;
    var n = cate();
    var ultima = Math.min(foaieCurenta + n, foi.length);
    bara.querySelector(".stare").textContent = "Pagina " +
      (n === 2 && ultima > foaieCurenta + 1 ? (foaieCurenta + 1) + "-" + ultima : foaieCurenta + 1) +
      " din " + foi.length + (gata ? "" : "…");
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
        if (modul() !== "continuu") facCartea();
      }, 200);
    });
  }


  var asteaptaRefacere;

  M.aplicaMod = aplicaMod;
  M.reconstruieste = function () {
    if (modul() === "continuu") return;
    clearTimeout(asteaptaRefacere);
    asteaptaRefacere = setTimeout(facCartea, 250);
  };
  M.paginat = function () {
    return modul() !== "continuu";
  };
  M.mergiLaId = mergiLaId;
  M.mergiLaElement = mergiLaElement;
  M.foi = function () { return foi; };
  M.arataFoile = function () { arataFoile(); };
  M.actualizeazaSemnulTemei = M.actualizeazaSemnulTemei || function () {};

  construiestePaginare();

  /* legăturile din cuprinsul lateral și cele interne duc la foaia potrivită */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']");
    if (!a || !M.paginat()) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    if (mergiLaId(id)) {
      e.preventDefault();
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    }
  });

  window.addEventListener("hashchange", function () {
    if (M.paginat()) mergiLaId(location.hash.slice(1));
  });

  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea")) return;
    if (!M.paginat()) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      muta(1);
    }
    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      muta(-1);
    }
    if (e.key === "Home") { e.preventDefault(); mergiLaFoaie(0); }
    if (e.key === "End") { e.preventDefault(); mergiLaFoaie(foi.length - 1); }
  });
})();
