/* Pagina de gestionare a datelor păstrate în navigator. */

(function () {
  "use strict";

  var S = window.Stocare;
  var corp = document.getElementById("g-corp");

  function scurt(t) {
    t = String(t);
    return t.length > 70 ? t.slice(0, 70) + "…" : t;
  }

  function deseneaza() {
    var stare = document.getElementById("g-stare");
    if (S.peDisc) {
      stare.textContent =
        "Manualul este deschis direct de pe disc. În acest mod, navigatorul dă fiecărei pagini " +
        "o memorie separată, iar păstrarea permanentă este oprită. Setările trec de la o pagină " +
        "la alta prin adresa paginii. Pentru o memorie comună, serviți folderul printr-un " +
        "server web local.";
    } else {
      stare.textContent = S.permanent()
        ? "Datele sunt păstrate permanent în acest navigator."
        : "Datele sunt păstrate doar pentru sesiunea curentă de navigare.";
      if (!S.permanent() && S.avertizare()) {
        stare.textContent += " Atenție: la închiderea filei, răspunsurile și setările se pierd. " +
          "Navigatorul va avertiza înainte de închidere.";
      }
    }
    if (window.Manual) {
      window.Manual.aplica();
      window.Manual.aplicaImpartirea();
    }
    document.querySelectorAll("[data-stocare]").forEach(function (b) {
      b.setAttribute(
        "aria-pressed",
        (b.getAttribute("data-stocare") === "local") === S.permanent() ? "true" : "false"
      );
      b.disabled = S.peDisc;
    });
    corp.innerHTML = "";
    S.chei().sort().forEach(function (k) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + k + "</td><td>" + scurt(S.ia(k, "")) + "</td>";
      corp.appendChild(tr);
    });
    if (!S.chei().length) {
      corp.innerHTML = '<tr><td colspan="2" class="mic">Nimic păstrat deocamdată.</td></tr>';
    }
  }

  function fisier(nume, continut) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([continut], { type: "application/json" }));
    a.download = nume;
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  document.querySelector("[data-stocare]").parentNode.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-stocare]");
    if (!b) return;
    if (b.getAttribute("data-stocare") === "local") S.salveazaPermanent();
    else S.uitaPermanent();
    deseneaza();
  });

  document.getElementById("g-export").addEventListener("click", function () {
    var d = {};
    S.chei().forEach(function (k) { d[k] = S.ia(k, ""); });
    fisier("manual-date.json", JSON.stringify(d, null, 1));
  });

  document.getElementById("g-import").addEventListener("click", function () {
    var i = document.createElement("input");
    i.type = "file";
    i.accept = "application/json,.json";
    i.addEventListener("change", function () {
      var f = i.files[0];
      if (!f) return;
      var c = new FileReader();
      c.onload = function () {
        try {
          var d = JSON.parse(c.result);
          Object.keys(d).forEach(function (k) { S.pune(k, d[k]); });
          deseneaza();
          alert("Datele au fost încărcate.");
        } catch (e) {
          alert("Fișierul nu a putut fi citit.");
        }
      };
      c.readAsText(f);
    });
    i.click();
  });

  function sterge(filtru, intrebare) {
    if (!confirm(intrebare)) return;
    S.chei().forEach(function (k) {
      if (filtru(k)) S.sterge(k);
    });
    deseneaza();
  }

  document.getElementById("g-sterge-setari").addEventListener("click", function () {
    sterge(function (k) { return k.indexOf("tema:") !== 0; }, "Ștergeți setările de citire?");
  });
  document.getElementById("g-sterge-teme").addEventListener("click", function () {
    sterge(function (k) { return k.indexOf("tema:") === 0; }, "Ștergeți răspunsurile la teme?");
  });
  document.getElementById("g-sterge-tot").addEventListener("click", function () {
    sterge(function () { return true; }, "Ștergeți tot ce este păstrat?");
  });

  deseneaza();
})();
