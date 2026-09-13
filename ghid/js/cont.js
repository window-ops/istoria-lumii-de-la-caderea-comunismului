/* Fișa manualului. „Cont: nu există”: o adresă de e-mail temporară, cu ceasul ei.
   „Cookie: nu există”: ce ține de fapt navigatorul, în localStorage și în sessionStorage. */

(function () {
  "use strict";

  /* adresa temporară */
  var cutie = document.getElementById("tempmail");
  var bCont = document.getElementById("buton-cont");
  if (cutie && bCont) {
    var ceas = null;
    var ramas = 600;
    var adresa = cutie.querySelector(".tempmail-adresa");
    var timp = cutie.querySelector(".tempmail-timp");
    var inbox = cutie.querySelector(".tempmail-inbox");

    function arataTimpul() {
      var m = Math.floor(ramas / 60);
      var s = ramas % 60;
      timp.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    }

    function porneste() {
      ramas = 600;
      adresa.textContent = "elev" + Math.floor(1000 + Math.random() * 9000) + "@zece-minute.example";
      inbox.innerHTML = '<li class="mic">Căsuța este goală. Mesajele ajung aici, dacă ajung.</li>';
      arataTimpul();
      clearInterval(ceas);
      ceas = setInterval(function () {
        ramas--;
        if (ramas === 597) {
          inbox.innerHTML = "<li><b>Confirmați contul</b><span>Apăsați aici în următoarele 24 de ore. Adresa expiră în 9 minute.</span></li>";
        }
        if (ramas === 590) {
          inbox.innerHTML += "<li><b>Bine ați venit!</b><span>Contul a fost creat. Îl puteți șterge din setări, în 14 pași.</span></li>";
        }
        if (ramas <= 0) {
          clearInterval(ceas);
          ceas = null;
          adresa.textContent = "adresa a expirat";
          inbox.innerHTML = '<li class="mic">Contul există. Adresa, nu. Parola, nici atât.</li>';
        }
        arataTimpul();
      }, 1000);
    }

    /* ascunse.js a comutat deja blocul înainte să ajungă aici */
    bCont.addEventListener("click", function () {
      if (!cutie.hidden) porneste();
      else { clearInterval(ceas); ceas = null; }
    });
  }

  /* depozitul navigatorului, așa cum este */
  var dep = document.getElementById("depozit");
  var bCookie = document.getElementById("buton-cookie");
  if (dep && bCookie) {
    function chei(d) {
      try {
        var r = [];
        for (var i = 0; i < d.length; i++) r.push(d.key(i));
        return r.filter(function (k) { return k.indexOf("manual:") === 0; }).sort();
      } catch (e) {
        return null;
      }
    }
    function arata() {
      var l = chei(window.localStorage);
      var s = chei(window.sessionStorage);
      var cookie = (document.cookie || "").trim();
      dep.querySelector(".dep-cookie").textContent = cookie ? cookie : "niciunul";
      dep.querySelector(".dep-local").textContent = l === null ? "nu este accesibil" : (l.length ? l.join(", ") : "nimic; salvarea permanentă este oprită");
      dep.querySelector(".dep-sesiune").textContent = s === null ? "nu este accesibil" : (s.length ? s.join(", ") : "nimic, deocamdată");
    }
    bCookie.addEventListener("click", function () { if (!dep.hidden) arata(); });
  }
})();
