/* Tipărirea: o fereastră de setări deschisă înaintea dialogului de tipar al
   navigatorului. Setările se aplică prin atribute pe <html> și printr-o regulă
   @page scrisă în pagină; formatul și marginile foii sunt cele de la
   vizualizarea pe pagini. */

(function () {
  "use strict";

  var M = window.Manual;
  var S = M.S;
  var doc = M.doc;
  var text = M.text;
  if (!text) return;

  var FOI = { a4: "A4", a5: "A5", letter: "letter" };
  var MARGINI = { inguste: "12mm", normale: "18mm 16mm", largi: "26mm 24mm" };

  var GRUPE_TIPAR = [
    {
      cheie: "tipar-teme",
      nume: "Spațiile de temă",
      implicit: "linii",
      valori: [["linii", "Linii de scris"], ["text", "Textul scris în manual"], ["nu", "Fără"]]
    },
    {
      cheie: "tipar-note",
      nume: "Notele de subsol, la sfârșit, pe pagini și la tipar",
      implicit: "da",
      valori: [["da", "Da"], ["nu", "Nu"]]
    },
    {
      cheie: "tipar-litera",
      nume: "Mărimea literei pe hârtie",
      implicit: "normala",
      valori: [["mica", "Mică"], ["normala", "Normală"], ["mare", "Mare"]]
    },
  ];

  var stil = null;

  function aplicaTipar() {
    GRUPE_TIPAR.forEach(function (g) {
      doc.setAttribute("data-" + g.cheie, S.ia(g.cheie, g.implicit));
    });
    /* tăierea tabelelor și a casetelor urmează setările foilor */
    doc.setAttribute("data-taie-tabele", S.ia("taie-tabele", "da"));
    doc.setAttribute("data-taie-casete", S.ia("taie-casete", "da"));
    if (!stil) {
      stil = document.createElement("style");
      stil.id = "stil-tipar";
      document.head.appendChild(stil);
    }
    var foaie = FOI[S.ia("foaie", "a4")] || "A4";
    var marg = MARGINI[S.ia("margini", "normale")] || MARGINI.normale;
    stil.textContent = "@media print { @page { size: " + foaie + "; margin: " + marg + "; } }";
  }

  /* textul scris în spațiile de temă, pregătit pentru hârtie */
  function pregatesteTextulTemelor() {
    document.querySelectorAll(".tema").forEach(function (t) {
      var ta = t.querySelector(".tema-text");
      var div = t.querySelector(".tema-tiparit");
      if (!div) {
        div = document.createElement("div");
        div.className = "tema-tiparit";
        div.setAttribute("aria-hidden", "true");
        t.appendChild(div);
      }
      div.textContent = ta ? ta.value : "";
    });
  }

  function panouTipar() {
    /* La lectură continuă, setările foilor se mută în #foi-tipar din panoul de
       setări; la pagini, locul rămâne gol și nota de la început trimite acolo. */
    var html = '<p class="mic" id="nota-foi">Formatul foii, marginile și tăierea tabelelor ' +
      "și a casetelor sunt cele din secțiunea „Foile” a setărilor de citire.</p>" +
      '<div id="foi-tipar"></div>';
    html += GRUPE_TIPAR.map(M.grupaButoane).join("");
    html += '<p class="mic">Urmează dialogul de tipărire al navigatorului, unde se alege ' +
      "imprimanta sau salvarea ca PDF.</p>" +
      '<div class="optiuni actiune"><button type="button" id="t-porneste" class="principal">Tipărește</button></div>';
    var p = M.panou("panou-tipar", "Tipărire", html);
    /* panoul se face o singură dată; la a doua deschidere nu se mai leagă nimic,
       altfel fiecare deschidere ar adăuga încă o tipărire la apăsarea butonului */
    if (p.dataset.legat) return p;
    p.dataset.legat = "1";
    M.legaGrupele(p, function () { aplicaTipar(); });
    p.querySelector("#t-porneste").addEventListener("click", function () {
      aplicaTipar();
      pregatesteTextulTemelor();
      window.print();
    });
    return p;
  }

  M.aplicaTipar = aplicaTipar;
  M.panouTipar = panouTipar;

  M.deschideTipar = function () {
    M.deschide(panouTipar());
  };

  document.querySelectorAll(".buton-tipar").forEach(function (b) {
    b.addEventListener("click", function () { M.deschideTipar(); });
  });

  window.addEventListener("beforeprint", function () {
    aplicaTipar();
    pregatesteTextulTemelor();
    M.inchidePanourile();
    if (M.paginat && M.paginat()) {
      M.foi().forEach(function (f) { f.classList.add("activa"); });
    }
  });
  window.addEventListener("afterprint", function () {
    if (M.paginat && M.paginat() && M.arataFoile) M.arataFoile();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "p" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault();
      M.deschideTipar();
    }
  });

  aplicaTipar();
})();
