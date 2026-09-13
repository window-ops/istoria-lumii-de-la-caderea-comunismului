/* Fișa manualului. Ștampila: la apăsare trece în albastru, culoarea oficială, și înapoi. */

(function () {
  "use strict";

  /* ștampila: la apăsare trece în albastru, culoarea oficială, și înapoi */
  var stampila = document.querySelector(".stampila");
  if (stampila) {
    stampila.setAttribute("tabindex", "0");
    stampila.setAttribute("role", "button");
    stampila.setAttribute("aria-pressed", "false");
    stampila.setAttribute("title", "Apasă pentru culoarea oficială");
    var CHEIE = "manual:stampila";
    function pune(pe) {
      stampila.classList.toggle("albastra", pe);
      stampila.setAttribute("aria-pressed", pe ? "true" : "false");
    }
    function comuta() {
      var pe = !stampila.classList.contains("albastra");
      pune(pe);
      try { sessionStorage.setItem(CHEIE, pe ? "1" : "0"); } catch (e) { /* fără memorie */ }
    }
    /* culoarea rămâne cât e deschisă fila */
    try { if (sessionStorage.getItem(CHEIE) === "1") pune(true); } catch (e) { /* fără memorie */ }
    stampila.addEventListener("click", comuta);
    stampila.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); comuta(); }
    });
  }
})();
