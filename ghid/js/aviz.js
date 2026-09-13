/* Fișa manualului. „aviz de la minister”: procedura adevărată, ca test cu răspunsuri.
   Cine trece testul primește avizul, iar ștampila se schimbă. */

(function () {
  "use strict";

  var b = document.getElementById("buton-aviz");
  var zona = document.getElementById("test-aviz");
  var stampila = document.querySelector(".stampila");
  if (!b || !zona) return;

  /* după Metodologia de evaluare a calității proiectelor de manuale școlare, ediția 2026 */
  var INTREBARI = [
    ["Cine poate depune un proiect de manual la evaluare?",
      ["Orice autor, cu fișierul lecțiilor", "Un ofertant înregistrat, de regulă o editură, în cadrul apelului", "Elevul care l-a scris, cu semnătura dirigintelui", "Inspectoratul școlar județean, în numele autorului"], 1,
      "Proiectele se depun de ofertanți, la apelul deschis de Centrul Național pentru Curriculum și Evaluare. Un autor singur nu are calitate de ofertant."],
    ["Când se depune proiectul?",
      ["Oricând, la registratură", "În calendarul apelului, pentru disciplina și clasa anunțate", "După ce a fost tipărit și citit de elevi", "La 1 septembrie, odată cu începerea școlii"], 1,
      "Apelul se deschide pe discipline și pe clase, cu termene. În afara calendarului nu există unde depune."],
    ["Cine evaluează proiectul?",
      ["Ministrul, în persoană", "Comisii de profesori selectați printr-un apel separat", "Cititorii, prin vot", "Academia Română, prin secția de istorie"], 1,
      "Evaluatorii sunt cadre didactice selectate de Centru; lucrează în comisii, pe criterii, și fac un raport."],
    ["Care este primul criteriu verificat?",
      ["Conformitatea cu programa școlară în vigoare", "Calitatea argumentului", "Dacă are imnul pe prima pagină", "Numărul de pagini și prețul pe exemplar"], 0,
      "Un proiect care nu acoperă programa este respins înainte de orice altă apreciere. Manualul de față are propriul curriculum, deci s-ar opri aici."],
    ["Ce rezultat poate primi proiectul?",
      ["O notă de la 1 la 10", "Admis sau Respins, cu posibilitatea contestației", "Un aviz favorabil cu observații", "Un loc într-un clasament al editurilor"], 1,
      "Raportul comisiei declară proiectul Admis sau Respins; rezultatele se comunică și pot fi contestate, în termen."],
    ["Ce urmează după Admis?",
      ["Manualul apare pe site a doua zi", "Ordin al ministrului de aprobare, apoi achiziția publică și tipărirea", "Manualul devine proprietatea autorului", "Se trimite la Parlament, pentru vot"], 1,
      "Manualele admise se aprobă prin ordin de ministru, după care urmează procedura de achiziție publică și tipărirea pentru școli."]
  ];

  var pas = 0;
  var ordine = [];
  var admis = false;
  var CHEIE = "manual:aviz";

  /* starea testului stă în memoria sesiunii: ștampila și pasul rămân cât e deschisă fila */
  function salveaza() {
    try {
      sessionStorage.setItem(CHEIE, JSON.stringify({ pas: pas, ordine: ordine, admis: admis }));
    } catch (e) { /* fără memorie */ }
  }

  function incarca() {
    try {
      var d = JSON.parse(sessionStorage.getItem(CHEIE) || "null");
      if (!d || !d.ordine || !d.ordine.length) return false;
      pas = d.pas || 0;
      ordine = d.ordine;
      admis = !!d.admis;
      return true;
    } catch (e) {
      return false;
    }
  }

  function amesteca(a) {
    var r = a.slice();
    for (var i = r.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = r[i]; r[i] = r[j]; r[j] = t;
    }
    return r;
  }

  /* ordinea întrebărilor și a răspunsurilor se trage la sorți la fiecare parcurgere */
  function pregateste() {
    pas = 0;
    admis = false;
    ordine = amesteca(INTREBARI).map(function (q) {
      var indici = amesteca([0, 1, 2, 3]);
      return {
        text: q[0],
        raspunsuri: indici.map(function (i) { return q[1][i]; }),
        corect: indici.indexOf(q[2]),
        explicatie: q[3]
      };
    });
    salveaza();
  }

  function opreste() {
    zona.hidden = true;
    zona.innerHTML = "";
    b.setAttribute("aria-expanded", "false");
  }

  function puneAvizul() {
    if (!stampila) return;
    stampila.classList.add("minister");
    stampila.querySelectorAll("textPath")[0].textContent = "MINISTERUL EDUCAȚIEI";
    stampila.querySelectorAll("textPath")[1].textContent = "APROBAT PRIN ORDIN";
    var centrale = [].filter.call(stampila.querySelectorAll("text"), function (t) { return !t.querySelector("textPath"); });
    if (centrale[0]) centrale[0].textContent = "AVIZAT";
    if (centrale[1]) centrale[1].textContent = "2026";
  }

  function arata() {
    if (pas >= ordine.length) {
      admis = true;
      salveaza();
      zona.innerHTML = '<p class="aviz-rezultat"><b>Admis.</b> Ați parcurs procedura. Avizul se acordă prin ordin al ministrului, ' +
        "iar ștampila se schimbă. Manualul rămâne același. " +
        '<button type="button" class="aviz-inapoi">Retrage avizul</button></p>';
      puneAvizul();
      return;
    }
    var q = ordine[pas];
    zona.innerHTML = '<p class="aviz-intrebare"><span class="mic">Pasul ' + (pas + 1) + " din " + ordine.length + "</span><br>" + q.text + "</p>" +
      '<div class="aviz-raspunsuri">' + q.raspunsuri.map(function (r, i) {
        return '<button type="button" data-i="' + i + '">' + r + "</button>";
      }).join("") + "</div>" +
      '<p class="mic aviz-explicatie" hidden></p>';
  }

  function scoateAvizul() {
    if (!stampila) return;
    stampila.classList.remove("minister");
    stampila.querySelectorAll("textPath")[0].textContent = "AVIZAT · MICULPIONIER";
    stampila.querySelectorAll("textPath")[1].textContent = "ȘTAMPILĂ PUR DIGITALĂ";
    var centrale = [].filter.call(stampila.querySelectorAll("text"), function (t) { return !t.querySelector("textPath"); });
    if (centrale[0]) centrale[0].textContent = "NR. 5";
    if (centrale[1]) centrale[1].textContent = "10.09.2026";
  }

  zona.addEventListener("click", function (e) {
    var inapoi = e.target.closest(".aviz-inapoi");
    if (inapoi) { scoateAvizul(); pregateste(); arata(); return; }
    var r = e.target.closest("button[data-i]");
    if (!r) return;
    var q = ordine[pas];
    var expl = zona.querySelector(".aviz-explicatie");
    var i = parseInt(r.getAttribute("data-i"), 10);
    zona.querySelectorAll("button[data-i]").forEach(function (x) { x.disabled = true; });
    expl.hidden = false;
    if (i === q.corect) {
      r.classList.add("corect");
      expl.textContent = q.explicatie;
      pas++;
      salveaza();
      setTimeout(arata, 2600);
    } else {
      r.classList.add("gresit");
      expl.textContent = "Respins. " + q.explicatie + " Se reia de la primul pas, la apelul următor.";
      setTimeout(function () { pregateste(); arata(); }, 3600);
    }
  });

  b.addEventListener("click", function () {
    if (!zona.hidden) { opreste(); return; }
    zona.hidden = false;
    b.setAttribute("aria-expanded", "true");
    if (!ordine.length) pregateste();
    arata();
  });

  /* la sosirea pe pagină: ștampila rămâne cum a fost lăsată, iar testul continuă de unde era */
  if (incarca() && admis) puneAvizul();
})();
