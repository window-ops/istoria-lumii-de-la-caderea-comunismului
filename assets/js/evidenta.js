/* Evidența lecțiilor parcurse și a temelor scrise. */

(function () {
  "use strict";

  var S = window.Stocare;
  var corp = document.getElementById("evidenta-corp");
  if (!corp) return;

  var filtru = "toate";

  if (location.protocol === "file:") {
    var sectiune = document.getElementById("lista");
    var filtre = document.querySelector(".filtre");
    if (filtre) filtre.remove();
    if (sectiune) {
      sectiune.innerHTML =
        '<p class="mic">Evidența temelor are nevoie de o memorie comună pentru toate paginile ' +
        "manualului. Când fișierele sunt deschise direct de pe disc, navigatorul dă fiecărei " +
        "pagini o memorie separată, iar lista de aici ar fi greșită. Din acest motiv evidența " +
        "este oprită în acest mod de deschidere.</p>" +
        '<p class="mic">Pentru a o folosi, serviți folderul manualului printr-un server web ' +
        "local, de exemplu cu comanda <code>python3 -m http.server</code> dată în folderul " +
        "manualului, apoi deschideți adresa indicată de aceasta. Semnul temei și marcarea " +
        "lecțiilor parcurse funcționează și fără server, în pagina fiecărei lecții.</p>";
    }
    document.querySelectorAll("#teme-salveaza, #teme-incarca").forEach(function (b) {
      b.disabled = true;
    });
    var av = document.getElementById("teme-avertisment");
    if (av) av.textContent = "";
    return;
  }

  function lista(cheie) {
    var t = S.ia(cheie, "");
    return t ? t.split(",").filter(Boolean) : [];
  }

  function areTema(slug) {
    if (lista("teme").indexOf(slug) > -1) return true;
    return S.chei().some(function (k) {
      return k.indexOf("tema:" + slug + ":") === 0 && S.ia(k, "").trim() !== "";
    });
  }

  function stergeTema(slug) {
    S.chei().forEach(function (k) {
      if (k.indexOf("tema:" + slug + ":") === 0) S.sterge(k);
    });
    var t = lista("teme").filter(function (x) { return x !== slug; });
    S.pune("teme", t.join(","));
    deseneaza();
  }

  function comutaCitit(slug) {
    var c = lista("citit");
    var i = c.indexOf(slug);
    if (i > -1) c.splice(i, 1);
    else c.push(slug);
    S.pune("citit", c.join(","));
    deseneaza();
  }

  function deseneaza() {
    var citite = lista("citit");
    corp.innerHTML = "";
    var nScrise = 0;
    var nCitite = 0;
    (window.CUPRINS || []).forEach(function (d) {
      var tema = areTema(d.slug);
      var citit = citite.indexOf(d.slug) > -1;
      if (tema) nScrise++;
      if (citit) nCitite++;
      if (filtru === "scrise" && !tema) return;
      if (filtru === "nescrise" && tema) return;
      if (filtru === "citite" && !citit) return;
      if (filtru === "necitite" && citit) return;
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td><a href="lectii/' + d.slug + '.html">' + d.titlu + "</a>" +
        '<span class="mic"> &middot; ' + d.unitate + "</span></td>" +
        '<td><button type="button" class="semn" data-citit="' + d.slug + '" ' +
        'aria-pressed="' + citit + '">' + (citit ? "Parcursă" : "Marchează") + "</button></td>" +
        "<td>" + (tema ? '<span class="stare-scrisa">scrisă</span>'
                       : '<span class="stare-goala">fără text</span>') + "</td>" +
        "<td>" + (tema ? '<button type="button" class="semn" data-sterge="' + d.slug +
                         '">Anulează tema</button>' : "") + "</td>";
      corp.appendChild(tr);
    });
    var av = document.getElementById("teme-avertisment");
    if (av) {
      av.textContent = nCitite + " lecții marcate ca parcurse, " + nScrise + " cu temă scrisă.";
    }
  }

  corp.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-sterge]");
    if (b && confirm("Ștergeți textul temei pentru această lecție?")) {
      stergeTema(b.getAttribute("data-sterge"));
      return;
    }
    var c = e.target.closest("button[data-citit]");
    if (c) comutaCitit(c.getAttribute("data-citit"));
  });

  document.querySelector(".filtre").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-filtru]");
    if (!b) return;
    filtru = b.getAttribute("data-filtru");
    document.querySelectorAll(".filtre button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === b ? "true" : "false");
    });
    deseneaza();
  });

  var sv = document.getElementById("teme-salveaza");
  if (sv) sv.addEventListener("click", function () { window.salveazaRaspunsuri(); });
  var inc = document.getElementById("teme-incarca");
  if (inc) inc.addEventListener("click", function () { window.incarcaRaspunsuri(deseneaza); });

  deseneaza();
})();
