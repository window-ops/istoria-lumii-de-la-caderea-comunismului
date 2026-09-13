/* Fișa manualului. Imnul ascuns: apare la apăsarea pe „nu are imn”. */

(function () {
  "use strict";

  /* imnul ascuns: apare la apăsarea pe „nu are imn” */
  var bImn = document.getElementById("buton-imn");
  var imn = document.getElementById("imn-ascuns");
  if (bImn && imn) {
    bImn.addEventListener("click", function () {
      imn.hidden = !imn.hidden;
      bImn.setAttribute("aria-expanded", imn.hidden ? "false" : "true");
    });
  }
})();
