/* Butoane de copiere pentru blocurile de text de copiat (pre.copiabil).
   Cine apasă de multe ori primește o legătură către un articol despre
   tasta de copiat: copiem cu toții de undeva, și e în regulă. */

(function () {
  "use strict";

  var apasari = 0;
  var GLUMA = "https://stackoverflow.blog/2021/04/01/the-key-copy-paste/";
  var ICOANA = (function () {
    var sc = document.querySelector('script[src*="copiere.js"]');
    var src = sc ? sc.getAttribute("src") : "assets/js/copiere.js";
    return src.replace(/js\/copiere\.js.*$/, "icoane/copiaza.svg");
  })();

  function vechi(t, gata) {
    var ta = document.createElement("textarea");
    ta.value = t;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* nimic */ }
    ta.remove();
    gata();
  }

  /* butonul intră în bloc; apăsarea se prinde pe document, ca să meargă și pe
     copiile de pe foi, la vizualizarea pe pagini */
  document.querySelectorAll("pre.copiabil").forEach(function (pre) {
    var cutie = document.createElement("div");
    cutie.className = "bloc-copiabil";
    pre.parentNode.insertBefore(cutie, pre);
    cutie.appendChild(pre);
    var b = document.createElement("button");
    b.type = "button";
    b.className = "copiaza";
    b.setAttribute("aria-label", "Copiază");
    b.title = "Copiază";
    b.innerHTML = '<img class="ico" src="' + ICOANA + '" alt="">';
    cutie.appendChild(b);
  });

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".copiaza");
    if (!b) return;
    var cutie = b.closest(".bloc-copiabil");
    var pre = cutie && cutie.querySelector("pre");
    if (!pre) return;
    var t = pre.textContent;
    function gata() {
      b.classList.add("copiat");
      b.title = "Copiat";
      b.setAttribute("aria-label", "Copiat");
      setTimeout(function () {
        b.classList.remove("copiat");
        b.title = "Copiază";
        b.setAttribute("aria-label", "Copiază");
      }, 1500);
      apasari++;
      if (apasari === 7 && !document.getElementById("gluma-copiere")) {
        var p = document.createElement("p");
        p.className = "mic";
        p.id = "gluma-copiere";
        p.innerHTML = "Copiați des. Toți copiem de undeva, și e în regulă: " +
          '<a class="trimitere" href="' + GLUMA + '">The Key</a>.';
        cutie.parentNode.insertBefore(p, cutie.nextSibling);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(gata, function () { vechi(t, gata); });
    } else {
      vechi(t, gata);
    }
  });
})();
