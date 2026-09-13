/* Fișa manualului. „autoavizat”: o mână scrie cererea, o semnează, o aprobă și o verifică.
   Aceeași mână, de patru ori. Vârful stiloului merge pe traseul scrisului (animateMotion),
   iar scrisul apare exact sub el. Scena nu ascultă de „mișcare redusă”: fără mișcare nu are rost. */

(function () {
  "use strict";

  var b = document.getElementById("buton-autoavizat");
  var zona = document.getElementById("mana");
  if (!b || !zona) return;

  var ceasuri = [];
  function mai(fn, ms) { ceasuri.push(setTimeout(fn, ms)); }

  function opreste() {
    ceasuri.forEach(clearTimeout);
    ceasuri = [];
    zona.hidden = true;
    zona.innerHTML = "";
    b.setAttribute("aria-expanded", "false");
  }

  /* mâna, mică, cu vârful stiloului în (0,0); stă în dreapta-jos față de vârf, ca la un dreptaci */
  var MANA =
    '<g class="mana-desen" id="mana-desen">' +
    '<path class="stilou" d="M0 0 L2 -2.6 L30 9 L28 11.6 Z"/>' +
    /* pumnul văzut din lateral: palma, patru degete îndoite peste stilou, degetul mare deasupra */
    '<path class="palma" d="M22 6 c3 -2 8 -2 12 0 l14 4 c5 2 6 9 2 12 c-4 4 -12 5 -18 3 l-8 -3 c-5 -2 -7 -8 -4 -13 c0 -1 1 -2 2 -3 z"/>' +
    '<path class="deget" d="M26 6 c1 -3 5 -3 6 0 M32 8 c1 -3 5 -3 6 0 M38 10 c1 -3 5 -3 6 0 M44 12 c1 -3 4 -3 5 0" fill="none"/>' +
    '<path class="deget" d="M23 9 c-3 3 -2 8 2 10 M29 12 c-3 3 -2 8 2 10 M35 14 c-3 3 -2 8 2 10" fill="none"/>' +
    '<path class="deget" d="M22 6 c-3 -4 2 -9 6 -6 l6 3 c1 2 0 4 -2 5 l-6 -2 c-2 -1 -4 -1 -4 0 z"/>' +
    '<animateMotion id="miscare" fill="freeze" begin="indefinite"><mpath href="#traseu-tot"/></animateMotion>' +
    "</g>";

  function porneste() {
    zona.hidden = false;
    b.setAttribute("aria-expanded", "true");
    zona.innerHTML =
      '<svg class="mana-scena" viewBox="0 0 400 175" role="img" aria-label="O mână cu stilou scrie pe o foaie cererea de aviz, apoi o semnează, apoi pune ștampila Aprobat, apoi scrie Verificat de: aceeași mână; este aceeași mână de fiecare dată">' +
      "<defs>" +
      '<clipPath id="clip-cerere"><rect id="clip-cerere-r" x="10" y="32" width="0" height="18"/></clipPath>' +
      '<clipPath id="clip-verif"><rect id="clip-verif-r" x="92" y="134" width="0" height="18"/></clipPath>' +
      /* un singur drum, continuu, împărțit în opt bucăți; mâna nu se oprește și nu sare */
      '<path id="traseu-semnatura" d="M150 80 c6 -14 12 -12 14 -2 c2 8 -6 10 -2 2 c6 -10 14 -8 16 0 c2 8 8 4 12 -4 c6 -12 12 -6 14 2 c2 6 8 4 12 0"/>' +
      '<path id="traseu-tot" d="M266 32 L10 46 L182 46 L150 80 c6 -14 12 -12 14 -2 c2 8 -6 10 -2 2 c6 -10 14 -8 16 0 c2 8 8 4 12 -4 c6 -12 12 -6 14 2 c2 6 8 4 12 0 L92 108 L92 148 L166 148 L266 122"/>' +
      "</defs>" +
      '<rect class="coala" x="0" y="8" width="252" height="156"/>' +
      '<text class="foaie-text" x="10" y="26">Cerere de aviz</text>' +
      '<text class="foaie-text scris" x="10" y="46" clip-path="url(#clip-cerere)">Subsemnatul, autorul, solicit avizul.</text>' +
      '<text class="foaie-text" x="10" y="80">Semnătura solicitantului:</text>' +
      '<use class="semnatura-scrisa" href="#traseu-semnatura"/>' +
      '<text class="foaie-text" x="10" y="114">Avizul:</text>' +
      '<g class="stampila-mica"><rect x="54" y="98" width="76" height="22" rx="3"/><text x="92" y="114" text-anchor="middle">APROBAT</text></g>' +
      '<text class="foaie-text" x="10" y="148">Verificat de:</text>' +
      '<text class="foaie-text scris" x="92" y="148" clip-path="url(#clip-verif)">aceeași mână</text>' +
      MANA +
      '<text class="legenda-mana" x="320" y="52" text-anchor="middle"></text>' +
      "</svg>";

    var svg = zona.querySelector(".mana-scena");
    var l = svg.querySelector(".legenda-mana");
    var miscare = svg.querySelector("#miscare");
    var tot = svg.querySelector("#traseu-tot");
    var semn = svg.querySelector(".semnatura-scrisa");
    var lungSemn = svg.querySelector("#traseu-semnatura").getTotalLength();

    /* bucățile drumului: lungime (măsurată) și durată (aleasă); din ele ies keyTimes și keyPoints */
    var bucati = [
      { pana: "L10 46", dur: 0.7 },
      { pana: "L182 46", dur: 1.6, fa: function () { l.textContent = "scrie cererea"; creste("clip-cerere-r", 176, 1.6); } },
      { pana: "L150 80", dur: 0.5 },
      { pana: "c6 -14 12 -12 14 -2 c2 8 -6 10 -2 2 c6 -10 14 -8 16 0 c2 8 8 4 12 -4 c6 -12 12 -6 14 2 c2 6 8 4 12 0", dur: 1.4,
        fa: function () { l.textContent = "o semnează"; svg.classList.add("semneaza"); } },
      { pana: "L92 108", dur: 0.8, fa: function () { l.textContent = "o aprobă"; } },
      { pana: "L92 148", dur: 0.5, fa: function () { svg.classList.add("aprobat"); } },
      { pana: "L166 148", dur: 1.2, fa: function () { l.textContent = "o verifică"; creste("clip-verif-r", 76, 1.2); } },
      { pana: "L266 122", dur: 0.9, fa: function () { l.textContent = "aceeași mână, de 4 ori"; } }
    ];
    var proba = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.querySelector("defs").appendChild(proba);
    var d = "M266 32", lungimi = [], totalL = 0, totalT = 0;
    bucati.forEach(function (bc) {
      d += " " + bc.pana;
      proba.setAttribute("d", d);
      lungimi.push(proba.getTotalLength());
      totalT += bc.dur;
    });
    totalL = lungimi[lungimi.length - 1];
    var keyPoints = ["0"], keyTimes = ["0"], t = 0;
    bucati.forEach(function (bc, i) {
      t += bc.dur;
      keyPoints.push((lungimi[i] / totalL).toFixed(4));
      keyTimes.push((t / totalT).toFixed(4));
    });
    miscare.setAttribute("dur", totalT + "s");
    miscare.setAttribute("calcMode", "linear");
    miscare.setAttribute("keyPoints", keyPoints.join(";"));
    miscare.setAttribute("keyTimes", keyTimes.join(";"));

    /* cerneala semnăturii are exact lungimea traseului și aceeași durată ca mâna pe el */
    semn.style.strokeDasharray = lungSemn;
    semn.style.strokeDashoffset = lungSemn;
    semn.style.animationDuration = "1.4s";

    function creste(idRect, latime, durata) {
      var r = svg.querySelector("#" + idRect);
      var anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      anim.setAttribute("attributeName", "width");
      anim.setAttribute("from", "0");
      anim.setAttribute("to", String(latime));
      anim.setAttribute("dur", durata + "s");
      anim.setAttribute("fill", "freeze");
      r.appendChild(anim);
      anim.beginElement();
    }

    var reia = document.createElement("button");
    reia.type = "button";
    reia.className = "reia";
    reia.setAttribute("aria-label", "Reia animația");
    reia.title = "Reia";
    reia.innerHTML = '<img class="ico" src="../assets/icoane/reia.svg" alt="">';
    reia.addEventListener("click", function () { opreste(); porneste(); });
    zona.appendChild(reia);
    miscare.beginElement();
    t = 0;
    bucati.forEach(function (bc) {
      if (bc.fa) mai(bc.fa, Math.round(t * 1000));
      t += bc.dur;
    });
  }

  b.addEventListener("click", function () {
    if (!zona.hidden) opreste();
    else porneste();
  });
})();
