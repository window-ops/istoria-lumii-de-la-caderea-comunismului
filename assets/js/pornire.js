/* Prima trecere a setărilor, înainte de desenarea paginii.
   Se încarcă în head, fără defer, ca valorile păstrate să fie așezate pe
   elementul html mai devreme decât primul desen. Fără ea, pagina apare cu
   valorile din foaia de stil și sare la cele ale cititorului în momentul în
   care rulează setari.js, aflat la finalul corpului.

   Fișierul repetă citirea din stocare.js și implicitele din setari.js. Orice
   schimbare a unei valori implicite se face în ambele locuri. */

(function () {
  "use strict";

  var CHEIE = "manual:setari";
  var doc = document.documentElement;
  var peDisc = location.protocol === "file:";

  function citeste(fel) {
    /* Deschis direct de pe disc, fiecare fișier are memorie locală proprie,
       deci stocare.js nu o folosește. Aceeași regulă se aplică aici. */
    if (fel === "local" && peDisc) return null;
    try {
      var d = fel === "local" ? window.localStorage : window.sessionStorage;
      return JSON.parse(d.getItem(CHEIE) || "null");
    } catch (e) {
      return null;
    }
  }

  function dinAdresa() {
    /* Setările călătoresc prin adresă numai între fișiere deschise de pe disc. */
    if (!peDisc) return null;
    try {
      var p = new URLSearchParams(location.search).get("s");
      if (!p) return null;
      return JSON.parse(decodeURIComponent(escape(atob(
        p.replace(/-/g, "+").replace(/_/g, "/")
      ))));
    } catch (e) {
      return null;
    }
  }

  var date = citeste("local") || citeste("sesiune") || {};
  var dinUrl = dinAdresa();
  if (dinUrl) {
    Object.keys(dinUrl).forEach(function (k) { date[k] = dinUrl[k]; });
  }

  function ia(cheie, implicit) {
    return cheie in date ? date[cheie] : implicit;
  }

  function numar(valoare, implicit, minim, maxim) {
    var n = parseFloat(String(valoare).replace(",", "."));
    if (isNaN(n)) n = implicit;
    return Math.min(maxim, Math.max(minim, n));
  }

  try {
    doc.setAttribute("data-tema", ia("tema", "clar"));
    doc.setAttribute("data-font", ia("font", "serif"));
    doc.setAttribute("data-rand-frumos", ia("rand-frumos", "ambele"));
    doc.style.setProperty("--scara-ui", ia("ui", "1"));
    doc.style.setProperty("--text-corp", ia("corp", "19") + "px");
    doc.style.setProperty("--text-rand", ia("rand", "1.62"));
    doc.style.setProperty("--cuprins-lat", numar(ia("cuprinsLat", "18"), 18, 15, 25) + "rem");

    var lat = parseFloat(ia("lat", "52"));
    if (lat >= 100) {
      doc.setAttribute("data-latime", "plin");
    } else {
      doc.setAttribute("data-latime", "normal");
      doc.style.setProperty("--lat", (isNaN(lat) ? 52 : lat) + "rem");
    }

    var ingust = false;
    try { ingust = window.matchMedia("(max-width: 64rem)").matches; } catch (e) {}
    doc.setAttribute("data-cuprins", ia("cuprins", ingust ? "inchis" : "deschis"));
  } catch (e) {}
})();
