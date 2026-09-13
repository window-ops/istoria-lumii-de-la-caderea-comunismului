/* Ce ține de pagina unei lecții: notele de subsol, spațiile de temă,
   semnul temei scrise, marcarea lecției ca parcursă, salvarea și
   încărcarea răspunsurilor. */

(function () {
  "use strict";

  var M = window.Manual;
  var S = M.S;
  var text = M.text;
  var slug = M.slug;

  /* ---------------------------------------------------------------- */
  /* note de subsol                                                    */
  /* ---------------------------------------------------------------- */

  function note() {
    var balon = null;

    function inchide() {
      if (balon) {
        balon.remove();
        balon = null;
      }
    }

    document.addEventListener("click", function (e) {
      var ref = e.target.closest("sup.ref");
      if (!ref) {
        if (!e.target.closest(".balon")) inchide();
        return;
      }
      e.preventDefault();
      var t = (window.NOTE || {})[ref.getAttribute("data-nota")];
      if (!t) return;
      inchide();
      balon = document.createElement("div");
      balon.className = "balon";
      balon.innerHTML = "<b>Nota " + ref.getAttribute("data-nota") + "</b>" + t;
      document.body.appendChild(balon);
      var r = ref.getBoundingClientRect();
      var lat = Math.min(balon.offsetWidth, window.innerWidth - 24);
      balon.style.width = lat + "px";
      balon.style.left = Math.min(
        Math.max(8, r.left - lat / 2),
        window.innerWidth - lat - 8
      ) + window.scrollX + "px";
      var sus = r.bottom + window.scrollY + 8;
      if (r.bottom + balon.offsetHeight + 16 > window.innerHeight) {
        sus = r.top + window.scrollY - balon.offsetHeight - 8;
      }
      balon.style.top = sus + "px";
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") inchide();
    });
  }

  /* ---------------------------------------------------------------- */
  /* teme                                                              */
  /* ---------------------------------------------------------------- */

  function teme() {
    document.querySelectorAll(".tema-text").forEach(function (t, i) {
      var cheie = t.getAttribute("data-cheie") || ("tema:" + slug + ":" + i);
      t.setAttribute("data-cheie", cheie);
      t.value = S.ia(cheie, "");
      if (t.dataset.legat) return;
      t.dataset.legat = "1";
      t.addEventListener("input", function () {
        S.pune(cheie, t.value);
        actualizeazaSemnulTemei();
      });
    });
  }

  function salveazaRaspunsuri() {
    var d = {};
    S.chei().forEach(function (k) {
      if (k.indexOf("tema:") === 0) d[k] = S.ia(k, "");
    });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(d, null, 1)], { type: "application/json" })
    );
    a.download = "raspunsuri-manual.json";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  function incarcaRaspunsuri(dupa) {
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
          Object.keys(d).forEach(function (k) {
            if (k.indexOf("tema:") === 0) S.pune(k, d[k]);
          });
          teme();
          if (typeof dupa === "function") dupa();
          alert("Răspunsurile au fost încărcate.");
        } catch (e) {
          alert("Fișierul nu a putut fi citit.");
        }
      };
      c.readAsText(f);
    });
    i.click();
  }

  /* ---------------------------------------------------------------- */
  /* lecții parcurse și teme scrise                                    */
  /* ---------------------------------------------------------------- */

  function lista(cheie) {
    var t = S.ia(cheie, "");
    return t ? t.split(",").filter(Boolean) : [];
  }

  function scrieLista(cheie, valori) {
    S.pune(cheie, valori.filter(Boolean).join(","));
  }

  function areTemaScrisa() {
    var gasit = false;
    document.querySelectorAll(".tema-text").forEach(function (t) {
      if (t.value.trim() !== "") gasit = true;
    });
    return gasit;
  }

  function actualizeazaSemnulTemei() {
    var semn = document.getElementById("semn-tema");
    var scrisa = areTemaScrisa();
    if (semn) {
      semn.hidden = !scrisa;
      semn.style.display = scrisa ? "" : "none";
    }
    var t = lista("teme");
    var i = t.indexOf(slug);
    if (scrisa && i === -1) t.push(slug);
    if (!scrisa && i > -1) t.splice(i, 1);
    scrieLista("teme", t);
  }

  function butonCitit() {
    var b = document.getElementById("buton-citit");
    if (!b) return;
    function arata() {
      var citit = lista("citit").indexOf(slug) > -1;
      b.setAttribute("aria-pressed", citit ? "true" : "false");
      b.title = citit ? "Lecție parcursă. Apasă pentru a anula" : "Marchează lecția ca parcursă";
    }
    b.addEventListener("click", function () {
      var c = lista("citit");
      var i = c.indexOf(slug);
      if (i > -1) c.splice(i, 1);
      else c.push(slug);
      scrieLista("citit", c);
      arata();
    });
    arata();
  }

  /* ---------------------------------------------------------------- */
  /* pornire                                                           */
  /* ---------------------------------------------------------------- */

  M.actualizeazaSemnulTemei = actualizeazaSemnulTemei;
  window.salveazaRaspunsuri = salveazaRaspunsuri;
  window.incarcaRaspunsuri = incarcaRaspunsuri;

  note();
  butonCitit();
  if (text) {
    M.inainte.push(function () {
      teme();
      actualizeazaSemnulTemei();
    });
  }
})();
