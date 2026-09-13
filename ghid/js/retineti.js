/* Fișa manualului. „Rețineți!”: trunchiul și profilul aleg părțile întrebării; „Barem:” se stinge cu universul. */

(function () {
  "use strict";

  /* „Rețineți!”: trunchiul comun este al tuturor profilurilor, în clasele IX-X;
     cel diferențiat cere un profil, în clasele XI-XII */
  var profil = document.querySelector(".profil");
  if (profil) {
    var alesTrunchi = "comun";
    var alesProfil = "real";
    function arataPartile() {
      profil.querySelectorAll(".alege-profil").forEach(function (x) {
        x.hidden = alesTrunchi !== "diferentiat";
      });
      document.querySelectorAll("#retineti [data-parte]").forEach(function (el) {
        var p = el.getAttribute("data-parte").split(" ");
        var areProfil = p.indexOf("real") > -1 || p.indexOf("uman") > -1;
        var ok = p.indexOf(alesTrunchi) > -1 &&
          (alesTrunchi === "comun" || !areProfil || p.indexOf(alesProfil) > -1);
        el.hidden = !ok;
      });
    }
    profil.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var cheie = b.hasAttribute("data-profil") ? "data-profil" : "data-trunchi";
      profil.querySelectorAll("button[" + cheie + "]").forEach(function (x) {
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      if (cheie === "data-profil") alesProfil = b.getAttribute(cheie);
      else alesTrunchi = b.getAttribute(cheie);
      arataPartile();
    });
    arataPartile();
  }

  /* „Barem:”: la trecerea cursorului, o etichetă care se stinge pe măsură ce trec
     miliarde de ani, până la evaporarea ultimei găuri negre */
  var bBarem = document.getElementById("buton-sinelg");
  var balon = document.querySelector(".barem-balon");
  var univers = null;
  function opresteUniversul() {
    if (univers) { clearInterval(univers); univers = null; }
    if (balon) { balon.hidden = true; balon.style.opacity = ""; }
  }
  if (bBarem && balon) {
    bBarem.addEventListener("mouseenter", function () {
      opresteUniversul();
      var exp = 0;
      balon.hidden = false;
      balon.style.opacity = "1";
      balon.textContent = "Barem valabil. Au trecut 0 ani.";
      univers = setInterval(function () {
        exp++;
        var ramas = Math.max(0, 1 - exp / 100);
        balon.style.opacity = ramas.toFixed(2);
        if (exp < 10) balon.textContent = "Barem valabil. Au trecut 10^" + exp + " ani.";
        else if (exp < 14) balon.textContent = "Soarele s-a stins. Au trecut 10^" + exp + " ani.";
        else if (exp < 40) balon.textContent = "Stelele s-au stins. Au trecut 10^" + exp + " ani.";
        else if (exp < 100) balon.textContent = "Găurile negre se evaporă. Au trecut 10^" + exp + " ani.";
        else {
          balon.textContent = "Ultima gaură neagră s-a evaporat. Baremul nu mai contează.";
          balon.style.opacity = "0.6";
          clearInterval(univers);
          univers = null;
          setTimeout(function () { balon.hidden = true; }, 4000);
        }
      }, 300);
    });
    bBarem.addEventListener("mouseleave", opresteUniversul);
  }
})();
