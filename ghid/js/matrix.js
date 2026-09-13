/* Fișa manualului. „rugăciune”: programul de sărituri. Morpheus sare de pe o clădire
   pe alta; Neo încearcă la fel și cade. Nimeni nu reușește prima săritură. */

(function () {
  "use strict";

  var b = document.getElementById("buton-rugaciune");
  var zona = document.getElementById("saritura");
  if (!b || !zona) return;

  var ceasuri = [];

  function mai(fn, ms) {
    ceasuri.push(setTimeout(fn, ms));
  }

  function opreste() {
    ceasuri.forEach(clearTimeout);
    ceasuri = [];
    zona.hidden = true;
    zona.innerHTML = "";
    b.setAttribute("aria-expanded", "false");
  }

  function figura(clasa, x) {
    return '<g class="om ' + clasa + '" transform="translate(' + x + ',0)">' +
      '<circle cx="0" cy="-22" r="4"/><path d="M0-18v12M0-6l-5 9M0-6l5 9M-6-13l6 3 6-3"/></g>';
  }

  function porneste() {
    zona.hidden = false;
    b.setAttribute("aria-expanded", "true");
    zona.innerHTML =
      '<svg class="scena" viewBox="0 0 320 140" role="img" aria-label="Morpheus sare de pe o clădire pe alta; Neo încearcă și cade">' +
      '<rect class="cer" x="0" y="0" width="320" height="140"/>' +
      '<rect class="cladire" x="0" y="60" width="110" height="80"/>' +
      '<rect class="cladire" x="210" y="60" width="110" height="80"/>' +
      '<g class="ferestre"></g>' +
      '<g transform="translate(0,60)">' + figura("morpheus", 90) + figura("neo", 70) + "</g>" +
      '<text class="legenda" x="160" y="24" text-anchor="middle"></text>' +
      "</svg>";
    var reia = document.createElement("button");
    reia.type = "button";
    reia.className = "reia";
    reia.setAttribute("aria-label", "Reia animația");
    reia.title = "Reia";
    reia.innerHTML = '<img class="ico" src="../assets/icoane/reia.svg" alt="">';
    reia.addEventListener("click", function () { opreste(); porneste(); });
    zona.appendChild(reia);
    var ferestre = zona.querySelector(".ferestre");
    var f = "";
    for (var i = 0; i < 2; i++) {
      for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 5; c++) {
          f += '<rect x="' + (10 + i * 210 + c * 20) + '" y="' + (68 + r * 18) + '" width="10" height="10"/>';
        }
      }
    }
    ferestre.innerHTML = f;
    var legenda = zona.querySelector(".legenda");
    var morpheus = zona.querySelector(".morpheus");
    var neo = zona.querySelector(".neo");

    /* replicile din film, în ordinea lor: Morpheus, Tank, Cypher, Morpheus */
    /* replicile din film, în ordinea lor: Morpheus, Tank, Cypher, Morpheus.
       Tresărirea și replicile de după cădere pornesc când se termină căderea, nu după ceas. */
    legenda.textContent = "Eliberează-ți mintea.";
    mai(function () { morpheus.classList.add("sare"); }, 900);
    morpheus.addEventListener("animationend", function () {
      legenda.textContent = "Nimeni n-a reușit prima săritură.";
      mai(function () { neo.classList.add("incearca"); }, 900);
    }, { once: true });
    neo.addEventListener("animationend", function () {
      zona.querySelector(".scena").classList.add("impact");
      mai(function () { legenda.textContent = "Toată lumea cade prima dată."; }, 500);
      mai(function () { legenda.textContent = "Mintea ta o face reală."; }, 2300);
      mai(function () { legenda.textContent = "Manualul nu are rugăciune. Are exerciții."; }, 4100);
    }, { once: true });
  }

  b.addEventListener("click", function () {
    if (!zona.hidden) opreste();
    else porneste();
  });
})();
