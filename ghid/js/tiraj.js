/* Fișa manualului. „nelimitat”: test A/B cu trei variante, aleasă la întâmplare la fiecare apăsare. */

(function () {
  "use strict";

  /* „nelimitat”: test A/B cu trei variante, aleasă la întâmplare la fiecare apăsare */
  var bT = document.getElementById("buton-tiraj");
  var zona = document.getElementById("tiraj-rezultat");
  var ceas = null;
  var ajustare = false;

  function opresteTirajul() {
    if (ceas) { clearInterval(ceas); ceas = null; }
    if (ajustare) {
      document.documentElement.style.removeProperty("--text-corp");
      document.documentElement.style.removeProperty("--pag-marg");
      ajustare = false;
    }
    zona.innerHTML = "";
    zona.hidden = true;
    bT.setAttribute("aria-expanded", "false");
  }

  function varianta(n) {
    if (n === 0) {
      zona.innerHTML =
        '<div class="reclama"><b>NET NELIMITAT 5G</b> 4 euro/lună' +
        '<span class="mic">în primele 12 luni, apoi 9 euro/lună; abonament pe 24 de luni; ' +
        "nelimitat înseamnă 100 GB, după care viteza scade la 128 kbps; oferta nu se aplică " +
        "în roaming, în week-end sau în localitatea dumneavoastră</span>" +
        '<button type="button" class="inchide-tiraj">Nu, mulțumesc</button></div>';
    } else if (n === 1) {
      /* leul nou se compară cu leul de dinainte de tiparniță; la început scade încet, apoi tot mai
         repede, cum se întâmplă, iar la miliarde se prăbușește; se oprește singur când ajunge la zero */
      var suma = 1000;
      var valoare = 1;
      var pas = 0;
      zona.innerHTML =
        '<div class="tiparnita"><b>Tiraj nelimitat.</b> Se tipăresc bani: ' +
        '<span class="suma">1.000</span> lei.<br>Un leu de acum, în lei de dinainte de tiparniță: <span class="valoare">1,000</span>.' +
        '<span class="sfarsit"></span>' +
        '<button type="button" class="inchide-tiraj">Oprește tiparnița</button></div>';
      var el = zona.querySelector(".suma");
      var val = zona.querySelector(".valoare");
      var sf = zona.querySelector(".sfarsit");
      ceas = setInterval(function () {
        pas++;
        suma = Math.round(suma * 1.22 + 1000);
        valoare = valoare * Math.max(0.8, 0.992 - 0.0012 * pas);
        el.textContent = suma.toLocaleString("ro-RO");
        val.textContent = valoare.toFixed(3).replace(".", ",");
        if (valoare < 0.0005) {
          clearInterval(ceas);
          ceas = null;
          val.textContent = "0,000";
          sf.innerHTML = "Leul nu mai valorează nimic. Tiparnița s-a oprit singură.";
          zona.querySelector(".inchide-tiraj").textContent = "Închide tiparnița";
        }
      }, 500);
    } else {
      ajustare = true;
      document.documentElement.style.setProperty("--text-corp", "14px");
      document.documentElement.style.setProperty("--pag-marg", "10mm");
      zona.innerHTML =
        '<div class="austeritate"><b>Criză în zona euro.</b> Tirajul nelimitat a fost observat de Banca Centrală ' +
        "Europeană. Se aplică programul de ajustare: litera manualului scade cu o treime, marginile se " +
        "înjumătățesc, notele de subsol se vând unui fond de investiții. Salariile rămân neschimbate, " +
        "pentru că nu există." +
        '<button type="button" class="inchide-tiraj">Ieși din program</button></div>';
    }
    zona.hidden = false;
    bT.setAttribute("aria-expanded", "true");
  }

  if (bT && zona) {
    bT.addEventListener("click", function () {
      if (!zona.hidden) { opresteTirajul(); return; }
      varianta(Math.floor(Math.random() * 3));
    });
    zona.addEventListener("click", function (e) {
      if (e.target.closest(".inchide-tiraj")) opresteTirajul();
    });
  }
})();
