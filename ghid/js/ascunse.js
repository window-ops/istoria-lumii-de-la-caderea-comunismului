/* Fișa manualului. Stările ascunse simple: un buton din text arată sau ascunde un bloc. */

(function () {
  "use strict";

  /* „Hârtie” și „0 grame”: stări ascunse */
  [["buton-hartie", "eroare-hartie"], ["buton-greutate", "problema-greutate"], ["buton-stiati", "stiati-ca"], ["buton-retineti", "retineti"], ["buton-barem", "barem-retineti"], ["buton-sinelg", "tabel-sinelg"], ["buton-domnitor", "cutie-domnitor"], ["buton-reverenta", "reverente"], ["buton-ce-ar-trebui", "ce-ar-trebui"], ["buton-mesaje", "mesaje"], ["buton-kiwix", "kiwix"], ["buton-cont", "tempmail"], ["buton-cookie", "depozit"], ["buton-semnatura", "semnatura"]].forEach(function (per) {
    var b = document.getElementById(per[0]);
    var t = document.getElementById(per[1]);
    if (!b || !t) return;
    b.addEventListener("click", function () {
      t.hidden = !t.hidden;
      b.setAttribute("aria-expanded", t.hidden ? "false" : "true");
    });
  });
})();
