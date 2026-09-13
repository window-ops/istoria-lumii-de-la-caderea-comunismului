/* Fișa manualului. „semnătură”: cele două feluri de aviz, desenate ca într-o instruire de
   securitate: pași în cutii, săgeți, un lacăt, o bifă, și ce dovedește fiecare. */

(function () {
  "use strict";

  var zona = document.getElementById("semnatura");
  if (!zona) return;

  function cutie(x, y, w, h, titlu, text, clasa) {
    return '<g class="pas ' + (clasa || "") + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6"/>' +
      '<text class="pas-titlu" x="' + (x + w / 2) + '" y="' + (y + 18) + '" text-anchor="middle">' + titlu + "</text>" +
      '<text class="pas-text" x="' + (x + w / 2) + '" y="' + (y + 34) + '" text-anchor="middle">' + text + "</text></g>";
  }

  function sageata(x1, y, x2) {
    return '<path class="sageata-d" d="M' + x1 + " " + y + " H" + x2 + " M" + (x2 - 6) + " " + (y - 5) + " L" + x2 + " " + y + " L" + (x2 - 6) + " " + (y + 5) + '"/>';
  }

  function lacat(x, y) {
    return '<g class="lacat" transform="translate(' + x + "," + y + ')" role="img" aria-label="secret, numai autorul"><circle class="fond" r="9"/><rect x="-4.5" y="-1" width="9" height="7" rx="1"/><path d="M-2.5 -1 V-3.5 a2.5 2.5 0 0 1 5 0 V-1" fill="none"/></g>';
  }

  function bifa(x, y, r, eticheta) {
    r = r || 9;
    return '<g class="bifa" transform="translate(' + x + "," + y + ')" role="img" aria-label="' + (eticheta || "dovedește") + '"><circle r="' + r + '"/><path d="M-4 0 l3 3 L5 -3.5" fill="none"/></g>';
  }

  function ochi(x, y) {
    return '<g class="ochi" transform="translate(' + x + "," + y + ')" role="img" aria-label="se crede pe cuvânt"><circle class="fond" r="9"/><path d="M-6 0 C-3.5 -4 3.5 -4 6 0 C3.5 4 -3.5 4 -6 0 Z" fill="none"/><circle r="1.6"/></g>';
  }

  var lat = 84, inalt = 44, pas = 104, x0 = 14;

  function randCoperta() {
    var y = 34;
    return '<text class="rand-titlu" x="14" y="22">Avizul de pe copertă: un lanț de oameni</text>' +
      cutie(x0, y, lat, inalt, "Editura", "trimite proiectul") + sageata(x0 + lat + 2, y + 22, x0 + pas - 2) +
      cutie(x0 + pas, y, lat, inalt, "Comisia", "citește o versiune") + sageata(x0 + pas + lat + 2, y + 22, x0 + 2 * pas - 2) +
      cutie(x0 + 2 * pas, y, lat, inalt, "Ordinul", "un număr, o dată") + sageata(x0 + 2 * pas + lat + 2, y + 22, x0 + 3 * pas - 2) +
      cutie(x0 + 3 * pas, y, lat, inalt, "Coperta", "un rând tipărit") + sageata(x0 + 3 * pas + lat + 2, y + 22, x0 + 4 * pas - 2) +
      cutie(x0 + 4 * pas, y, lat, inalt, "Cititorul", "crede rândul", "crede") + ochi(x0 + 4 * pas + lat, y) +
      '<text class="rand-nota" x="14" y="98">Fiecare săgeată este o persoană care a spus „da”.</text>' +
      '<text class="rand-nota" x="14" y="109">Rândul de pe copertă se poate tipări de oricine; verificarea înseamnă să crezi.</text>';
  }

  function randSemnatura() {
    var y = 146;
    return '<text class="rand-titlu" x="14" y="132">Semnătura digitală: un lanț de calcule</text>' +
      cutie(x0, y, lat, inalt, "Textul", "aviz.txt") + sageata(x0 + lat + 2, y + 22, x0 + pas - 2) +
      cutie(x0 + pas, y, lat, inalt, "Cheia privată", "numai autorul", "privat") + lacat(x0 + pas + lat, y) + sageata(x0 + pas + lat + 2, y + 22, x0 + 2 * pas - 2) +
      cutie(x0 + 2 * pas, y, lat, inalt, "Semnătura", "88 de semne") + sageata(x0 + 2 * pas + lat + 2, y + 22, x0 + 3 * pas - 2) +
      cutie(x0 + 3 * pas, y, lat, inalt, "Cheia publică", "a oricui") + sageata(x0 + 3 * pas + lat + 2, y + 22, x0 + 4 * pas - 2) +
      cutie(x0 + 4 * pas, y, lat, inalt, "Verificat", "de oricine", "bun") + bifa(x0 + 4 * pas + lat, y) +
      '<text class="rand-nota" x="14" y="210">Nicio săgeată nu este o persoană.</text>' +
      '<text class="rand-nota" x="14" y="221">Oricine are cheia publică poate verifica; nimeni fără cheia privată nu poate semna.</text>';
  }

  function randDovada() {
    var y = 256;
    return '<text class="rand-titlu" x="14" y="244">Ce dovedește fiecare</text>' +
      bifa(24, y + 10, 9, "dovedește") + '<text class="pas-text" x="42" y="' + (y + 14) + '">semnătura: textul din aviz.txt este cel semnat de autor, neschimbat</text>' +
      bifa(24, y + 32, 9, "dovedește") + '<text class="pas-text" x="42" y="' + (y + 36) + '">coperta: o comisie a citit o versiune, la un moment dat</text>' +
      '<g class="nu" transform="translate(24,' + (y + 54) + ')" role="img" aria-label="nu dovedește"><circle r="9"/><path d="M-3.5 -3.5 L3.5 3.5 M3.5 -3.5 L-3.5 3.5" fill="none"/></g>' +
      '<text class="pas-text" x="42" y="' + (y + 58) + '">calitatea: o stabilește cititorul, cu lecția 0</text>';
  }

  zona.innerHTML =
    '<svg class="semn-schema" viewBox="0 0 540 326" role="img" aria-label="Sus, avizul de pe copertă: editura trimite proiectul, comisia citește o versiune, ordinul primește un număr și o dată, coperta primește un rând tipărit, cititorul crede rândul; fiecare săgeată este o persoană. Jos, semnătura digitală: textul aviz.txt, cheia privată pe care o are numai autorul, semnătura de 88 de semne, cheia publică a oricui, verificat de oricine; nicio săgeată nu este o persoană. La sfârșit: semnătura dovedește că textul este cel semnat de autor; coperta, că o comisie a citit o versiune; calitatea nu o dovedește niciuna, o stabilește cititorul.">' +
    randCoperta() + randSemnatura() + randDovada() + "</svg>";
})();
