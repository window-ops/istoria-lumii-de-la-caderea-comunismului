/* Fișa manualului. Când se deschide sau se închide o glumă, pagina rămâne unde era.
   Firefox derulează uneori în sus la apăsarea unui buton din text; poziția se ține
   minte înainte de apăsare și se pune la loc după ce s-a schimbat conținutul. */

(function () {
  "use strict";

  var fisa = document.querySelector(".fisa");
  if (!fisa) return;
  var text = document.querySelector(".text");

  fisa.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    var y = window.scrollY;
    var t = text ? text.scrollTop : 0;
    function inapoi() {
      if (window.scrollY !== y) window.scrollTo(window.scrollX, y);
      if (text && text.scrollTop !== t) text.scrollTop = t;
    }
    setTimeout(inapoi, 0);
    requestAnimationFrame(function () { requestAnimationFrame(inapoi); });
  }, true);
})();
