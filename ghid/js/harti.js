/* Fișa manualului. „Hărți: nu există”: se încearcă hărțile, pe rând, fără internet.
   Merge una singură, din F-Droid, și este tot OpenStreetMap. */

(function () {
  "use strict";

  var b = document.getElementById("buton-harti");
  var zona = document.getElementById("harti");
  if (!b || !zona) return;

  var ceasuri = [];
  var PASI = [
    ["Google Maps", "Se caută harta descărcată…", "Harta offline a expirat. Hărțile descărcate expiră dacă nu se reînnoiesc, iar reînnoirea cere cont Google și internet.", false, 1400],
    ["Waze", "Se încarcă…", "Nu există hărți offline. Ruta se pornește cu internet și se continuă fără; fără rută pornită, nimic.", false, 1200],
    ["Apple Maps", "Se caută harta descărcată…", "Are hărți offline din iOS 17. Telefonul acesta nu este iPhone.", false, 900],
    ["openstreetmap.org", "Se încarcă…", "Pagina nu se poate afișa: nu există conexiune. Datele există; site-ul, nu.", false, 1300],
    ["Organic Maps, din F-Droid", "Se deschide harta României, câteva sute de megaocteți, descărcată acasă…", "Merge. Fără internet, fără cont, fără reclame, fără urmărire, fără expirare. Datele sunt OpenStreetMap, aceleași ca la rândul de mai sus; diferența este că sunt pe telefon.", true, 1600]
  ];

  function mai(fn, ms) { ceasuri.push(setTimeout(fn, ms)); }

  function opreste() {
    ceasuri.forEach(clearTimeout);
    ceasuri = [];
    zona.hidden = true;
    zona.innerHTML = "";
    b.setAttribute("aria-expanded", "false");
  }

  function porneste() {
    zona.hidden = false;
    b.setAttribute("aria-expanded", "true");
    zona.innerHTML = '<p class="mic harti-nota">Telefonul, fără internet, la munte. Se încearcă hărțile, pe rând.</p><ul class="harti-lista"></ul>';
    var lista = zona.querySelector(".harti-lista");
    var t = 300;
    PASI.forEach(function (p) {
      mai(function () {
        var li = document.createElement("li");
        li.innerHTML = "<b>" + p[0] + "</b><span>" + p[1] + "</span>";
        lista.appendChild(li);
        mai(function () {
          li.querySelector("span").textContent = p[2];
          li.classList.add(p[3] ? "merge" : "nu-merge");
        }, p[4]);
      }, t);
      t += p[4] + 500;
    });
    mai(function () {
      var p = document.createElement("p");
      p.className = "mic";
      p.style.marginTop = "1em";
      p.textContent = "Manualul nu are hărți pentru că nu are nevoie: cititorul are una mai bună, cu condiția să o fi descărcat înainte de a pleca.";
      zona.appendChild(p);
    }, t + 300);
  }

  b.addEventListener("click", function () {
    if (!zona.hidden) opreste();
    else porneste();
  });
})();
