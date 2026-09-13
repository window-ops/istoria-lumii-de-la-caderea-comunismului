/* Fișa manualului. Butonul ascuns din colțul avizului arată ce apără cheia. */

(function () {
  "use strict";

  var pre = document.querySelector(".fisa-cheie");
  if (!pre) return;
  var cutie = document.createElement("div");
  cutie.className = "fisa-cheie-cutie";
  pre.parentNode.insertBefore(cutie, pre);
  cutie.appendChild(pre);
  var b = document.createElement("button");
  b.type = "button";
  b.className = "dezvaluie";
  b.textContent = "Arată ce apără cheia";
  cutie.appendChild(b);
  var raspuns = null;

  function ascunde() {
    if (raspuns) { raspuns.remove(); raspuns = null; }
    b.textContent = "Arată ce apără cheia";
    b.classList.remove("deschis");
    cutie.classList.remove("deschis");
  }

  function arata() {
    var lung = pre.querySelector(".cheie-lunga");
    if (!lung) return;
    var text;
    try {
      var oct = atob(lung.textContent.replace(/\s+/g, ""));
      var b8 = new Uint8Array(oct.length);
      for (var i = 0; i < oct.length; i++) b8[i] = oct.charCodeAt(i);
      text = new TextDecoder("utf-8").decode(b8);
    } catch (e) {
      text = "Blocul nu s-a putut decoda.";
    }
    var r = document.createElement("div");
    r.className = "fisa-raspuns";
    var titlu = document.createElement("p");
    titlu.className = "fisa-raspuns-titlu";
    titlu.textContent = "Ce apără cheia, decodat din base64:";
    r.appendChild(titlu);
    text.split(/\n\n+/).forEach(function (par) {
      var p = document.createElement("p");
      p.textContent = par;
      r.appendChild(p);
    });
    var inchide = document.createElement("p");
    inchide.className = "mic";
    inchide.innerHTML = '<button type="button" class="fisa-raspuns-inchide">Ascunde</button>';
    r.appendChild(inchide);
    inchide.querySelector("button").addEventListener("click", ascunde);
    cutie.parentNode.insertBefore(r, cutie.nextSibling);
    raspuns = r;
    /* cât timp textul este la vedere, butonul rămâne și el la vedere */
    b.textContent = "Ascunde ce apără cheia";
    b.classList.add("deschis");
    cutie.classList.add("deschis");
  }

  /* un singur răspuns, oricâte apăsări: a doua apăsare îl ascunde */
  b.addEventListener("click", function () {
    if (raspuns) ascunde();
    else arata();
  });
})();
