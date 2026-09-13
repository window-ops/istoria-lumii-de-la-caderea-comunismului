/* Fișa manualului. „0 lei”: ca în La Abadía del Crimen, când copia nu era cea cumpărată. */

(function () {
  "use strict";

  /* „0 lei”: ca în La Abadía del Crimen, când copia nu era cea cumpărată */
  var pirata = document.getElementById("pirata");
  var butoanePirata = document.querySelectorAll(".buton-pirata");
  if (pirata && butoanePirata.length) {
    var text = "";
    for (var k = 0; k < 400; k++) text += "PIRATA ";
    butoanePirata.forEach(function (b) {
      b.addEventListener("click", function () {
        pirata.hidden = !pirata.hidden;
        pirata.textContent = pirata.hidden ? "" : text;
        butoanePirata.forEach(function (x) {
          x.setAttribute("aria-expanded", pirata.hidden ? "false" : "true");
        });
      });
    });
  }
})();
