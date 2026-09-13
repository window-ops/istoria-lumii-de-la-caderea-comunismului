/* Fișa manualului. „telefon”: o conexiune dial-up, cu toată procedura, care reușește sau nu. */

(function () {
  "use strict";

  var b = document.getElementById("buton-telefon");
  var zona = document.getElementById("dialup");
  if (!b || !zona) return;

  var ceas = null;

  function intre(a, c) {
    return a + Math.random() * (c - a);
  }

  var PASI = [
    ["ATZ", 300, 600],
    ["OK", 200, 400],
    ["ATDT 0800 123 456", 300, 500],
    ["Ton de apel… se formează numărul.", 800, 1400],
    ["Sună.", 700, 1300],
    ["Modemul răspunde: bip, bip.", 500, 900],
    ["Negociere V.90: șșșș-crrrrr-bing-bing-ccccrrrr.", 1200, 2200],
    ["Se stabilește viteza.", 600, 1100]
  ];

  function opreste() {
    if (ceas) { clearTimeout(ceas); ceas = null; }
    zona.hidden = true;
    zona.textContent = "";
    b.setAttribute("aria-expanded", "false");
  }

  function scrie(rand) {
    zona.textContent += rand + "\n";
  }

  function porneste() {
    zona.hidden = false;
    zona.textContent = "";
    b.setAttribute("aria-expanded", "true");
    var i = 0;
    function pas() {
      if (i < PASI.length) {
        scrie(PASI[i][0]);
        ceas = setTimeout(pas, intre(PASI[i][1], PASI[i][2]));
        i++;
        return;
      }
      /* deznodământul: de cele mai multe ori merge; uneori, ca atunci, nu */
      var soarta = Math.random();
      if (soarta < 0.6) {
        var viteza = [28800, 31200, 33600, 44000, 49333, 52000][Math.floor(Math.random() * 6)];
        scrie("CONNECT " + viteza);
        scrie("Conectat. Linia telefonică este ocupată până la deconectare.");
      } else if (soarta < 0.8) {
        scrie("NO CARRIER");
        scrie("Cineva a ridicat receptorul din cealaltă cameră.");
      } else if (soarta < 0.9) {
        scrie("BUSY");
        scrie("Numărul furnizorului este ocupat. Reîncercați peste câteva minute.");
      } else {
        scrie("NO DIALTONE");
        scrie("Cablul telefonic nu este băgat, sau este băgat în priza greșită.");
      }
      ceas = null;
    }
    pas();
  }

  b.addEventListener("click", function () {
    if (!zona.hidden) opreste();
    else porneste();
  });
})();
