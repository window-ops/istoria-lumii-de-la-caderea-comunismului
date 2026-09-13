/* Stocarea setărilor și a răspunsurilor.
   Implicit se folosește sessionStorage, adică memoria sesiunii de navigare.
   Cititorul poate porni salvarea permanentă, care folosește localStorage.
   Fișierele deschise direct de pe disc au, în unele navigatoare, memorie
   separată pentru fiecare pagină. De aceea setările călătoresc și prin adresa
   paginii, în parametrul „s”, atunci când se trece de la o lecție la alta. */

window.Stocare = (function () {
  "use strict";

  var CHEIE = "manual:setari";
  var CHEIE_AVERTIZARE = "manual:avertizare";
  var SETARI = ["tema", "font", "mod", "lat", "corp", "rand", "ui", "cuprins", "rand-frumos",
    "foaie", "margini", "taie-tabele", "taie-casete", "tema-intinsa",
    "tipar-teme", "tipar-note", "tipar-litera", "cuprinsLat",
    "sect:aspect", "sect:vizualizare", "sect:marimi", "sect:pagini"];

  var date = {};
  var permanent = false;

  var peDisc = location.protocol === "file:";

  function depozit(fel) {
    /* Deschis direct de pe disc, fiecare fișier are memorie proprie.
       Salvarea permanentă ar da impresia unei memorii comune, deci este oprită. */
    if (fel === "local" && peDisc) return null;
    try {
      var d = fel === "local" ? window.localStorage : window.sessionStorage;
      var proba = "manual:proba";
      d.setItem(proba, "1");
      d.removeItem(proba);
      return d;
    } catch (e) {
      return null;
    }
  }

  function citeste(fel) {
    var d = depozit(fel);
    if (!d) return null;
    try {
      return JSON.parse(d.getItem(CHEIE) || "null");
    } catch (e) {
      return null;
    }
  }

  function scrie() {
    var text = JSON.stringify(date);
    var s = depozit("sesiune");
    if (s) s.setItem(CHEIE, text);
    var l = depozit("local");
    if (!l) return;
    if (permanent) l.setItem(CHEIE, text);
    else l.removeItem(CHEIE);
  }

  function dinAdresa() {
    /* Prin adresă setările călătoresc numai între fișiere deschise de pe disc,
       unde memoria este separată pentru fiecare pagină. */
    if (!peDisc) return null;
    try {
      var p = new URLSearchParams(location.search).get("s");
      if (!p) return null;
      return JSON.parse(decodeURIComponent(escape(atob(p.replace(/-/g, "+").replace(/_/g, "/")))));
    } catch (e) {
      return null;
    }
  }

  function catreAdresa() {
    var mic = {};
    SETARI.forEach(function (k) {
      if (k in date) mic[k] = date[k];
    });
    try {
      return btoa(unescape(encodeURIComponent(JSON.stringify(mic))))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    } catch (e) {
      return "";
    }
  }

  /* pornire: local, apoi sesiune, apoi adresa paginii */
  var dinLocal = citeste("local");
  if (dinLocal) {
    permanent = true;
    date = dinLocal;
  } else {
    date = citeste("sesiune") || {};
  }
  var dinUrl = dinAdresa();
  if (dinUrl) {
    Object.keys(dinUrl).forEach(function (k) { date[k] = dinUrl[k]; });
    scrie();
  }

  /* Avertizarea la închiderea filei. Se pornește numai când cititorul renunță la
     păstrarea permanentă, pentru că atunci datele rămân doar în memoria sesiunii. */
  var navigareInterna = false;
  var temporizatorNavigare;

  function avertizare() {
    var s = depozit("sesiune");
    return !!(s && s.getItem(CHEIE_AVERTIZARE));
  }

  function pornesteAvertizarea() {
    var s = depozit("sesiune");
    if (s) s.setItem(CHEIE_AVERTIZARE, "1");
  }

  function opresteAvertizarea() {
    var s = depozit("sesiune");
    if (s) s.removeItem(CHEIE_AVERTIZARE);
  }

  window.addEventListener("beforeunload", function (e) {
    if (permanent || navigareInterna || !avertizare()) return;
    e.preventDefault();
    e.returnValue = "Datele și setările se pierd la închiderea filei.";
    return e.returnValue;
  });

  /* legăturile interne duc setările mai departe, la fișierele de pe disc */
  function legaturi() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]");
      if (!a || a.hasAttribute("download") || a.target === "_blank") return;
      var hrefBrut = a.getAttribute("href") || "";
      if (hrefBrut.charAt(0) !== "#" && !/^[a-z]+:/i.test(hrefBrut)) {
        /* trecerea la altă pagină a manualului nu pierde memoria sesiunii */
        navigareInterna = true;
        clearTimeout(temporizatorNavigare);
        temporizatorNavigare = setTimeout(function () { navigareInterna = false; }, 1500);
      }
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || /^[a-z]+:/i.test(href)) return;
      if (href.indexOf(".html") === -1) return;
      if (!peDisc) return;
      var bucati = href.split("#");
      var baza = bucati[0];
      var ancora = bucati[1] ? "#" + bucati[1] : "";
      var sep = baza.indexOf("?") === -1 ? "?" : "&";
      if (baza.indexOf("s=") === -1) {
        a.setAttribute("href", baza + sep + "s=" + catreAdresa() + ancora);
      }
    }, true);
  }

  return {
    peDisc: peDisc,
    ia: function (k, d) {
      return k in date ? date[k] : d;
    },
    pune: function (k, v) {
      date[k] = String(v);
      scrie();
    },
    sterge: function (k) {
      delete date[k];
      scrie();
    },
    chei: function () {
      return Object.keys(date);
    },
    permanent: function () {
      return permanent;
    },
    salveazaPermanent: function () {
      permanent = true;
      opresteAvertizarea();
      scrie();
    },
    uitaPermanent: function () {
      var eraPermanent = permanent;
      permanent = false;
      var l = depozit("local");
      if (l) l.removeItem(CHEIE);
      if (eraPermanent) pornesteAvertizarea();
      scrie();
    },
    avertizare: avertizare,
    legaturi: legaturi
  };
})();
