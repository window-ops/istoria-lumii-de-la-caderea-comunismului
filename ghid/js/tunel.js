/* Fișa manualului. „daci”: planul Tunelului Dacic București-Nădlac, în linie dreaptă,
   pe sub Carpați și pe sub câmp. Conturul țării vine dintr-un GeoJSON (Natural Earth,
   44 de puncte), proiecție echirectangulară la 46° N; orașele și creasta Carpaților
   sunt la coordonatele lor. Patru planșe, două variante. */

(function () {
  "use strict";

  var b = document.getElementById("buton-daci");
  var zona = document.getElementById("tunel");
  if (!b || !zona) return;

  var varianta = "a";
  var plansa = "traseu";

  var TARA = "117.8,34.3 135.8,21.5 161.6,28.1 188.3,28.3 207.6,43.0 221.9,33.8 252.6,28.0 263.1,14.0 280.7,14.0 293.4,19.9 306.3,37.6 319.5,62.9 343.6,98.6 344.9,124.9 340.5,150.6 347.9,177.9 366.5,189.0 386.1,179.3 405.0,189.6 406.0,205.1 385.8,218.0 373.1,212.4 361.5,284.8 337.0,278.5 306.6,256.7 257.6,270.6 236.9,285.9 175.7,282.8 143.7,273.4 127.5,277.8 115.6,253.1 107.9,242.7 117.6,232.5 107.3,225.1 94.2,238.5 69.9,221.1 66.6,196.4 41.3,182.2 36.6,163.2 14.0,139.6 47.4,128.3 72.6,87.6 92.3,46.9";
  /* munții, ca o singură suprafață continuă: Orientali, Meridionali, Banat, Poiana Ruscă,
     Apuseni; conturul se netezește la desenare (Catmull-Rom) */
  var MUNTI = [
    [184, 30], [209, 42], [234, 57], [255, 75], [267, 99], [276, 129], [280, 153], [268, 178], [250, 188],
    [225, 194], [200, 198], [175, 199], [150, 201], [125, 204], [104, 205], [82, 214], [72, 202], [75, 184],
    [86, 166], [95, 150], [101, 130], [101, 112], [112, 92], [129, 81], [146, 92], [151, 116], [140, 140],
    [128, 152], [138, 168], [160, 171], [185, 168], [210, 166], [230, 170], [230, 146], [230, 118],
    [222, 94], [206, 70], [190, 47]
  ];

  function neted(pts) {
    var d = "M" + pts[0][0] + " " + pts[0][1];
    var n = pts.length;
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += " C" + c1x.toFixed(1) + " " + c1y.toFixed(1) + " " + c2x.toFixed(1) + " " + c2y.toFixed(1) + " " + p2[0] + " " + p2[1];
    }
    return d + " Z";
  }
  var ORASE = {
    "Nădlac": [36.1, 137.0], "București": [259.0, 241.4], "Pitești": [207.8, 215.6], "Sibiu": [177.8, 159.2],
    "Sebeș": [153.6, 149.6], "Deva": [125.7, 154.4], "Lugoj": [84.0, 165.8], "Timișoara": [56.1, 162.2],
    "Arad": [59.4, 136.4], "Constanța": [364.5, 257.0], "Cluj-Napoca": [154.9, 101.0], "Oradea": [85.3, 83.0],
    "Brașov": [238.2, 168.2], "Ploiești": [255.7, 210.8], "Turda": [162.4, 113.0]
  };
  /* A1, cum este: gata, sau în lucru între Pitești și Sibiu; A2 spre Constanța; A3 pe bucăți */
  var A1_GATA = [["București", "Pitești"], ["Sibiu", "Sebeș"], ["Sebeș", "Deva"], ["Deva", "Lugoj"], ["Lugoj", "Timișoara"], ["Timișoara", "Arad"], ["Arad", "Nădlac"]];
  var A1_LUCRU = [["Pitești", "Sibiu"]];
  var ALTE = [["București", "Constanța"], ["Sebeș", "Turda"], ["Turda", "Cluj-Napoca"], ["Ploiești", "Brașov"]];


  /* săgeți desenate, centrate pe (x, y); semnele Unicode nu stau centrat în caseta lor */
  function sageataSvg(x, y, dir, lung, opac) {
    var l = lung || 24, h = l / 2;
    var d;
    if (dir === "dreapta") d = "M" + (x - h) + " " + y + " H" + (x + h) + " M" + (x + h - 7) + " " + (y - 6) + " L" + (x + h) + " " + y + " L" + (x + h - 7) + " " + (y + 6);
    else if (dir === "stanga") d = "M" + (x + h) + " " + y + " H" + (x - h) + " M" + (x - h + 7) + " " + (y - 6) + " L" + (x - h) + " " + y + " L" + (x - h + 7) + " " + (y + 6);
    else if (dir === "sus") d = "M" + x + " " + (y + h) + " V" + (y - h) + " M" + (x - 6) + " " + (y - h + 7) + " L" + x + " " + (y - h) + " L" + (x + 6) + " " + (y - h + 7);
    else d = "M" + x + " " + (y - h) + " V" + (y + h) + " M" + (x - 6) + " " + (y + h - 7) + " L" + x + " " + (y + h) + " L" + (x + 6) + " " + (y + h - 7);
    return '<path class="sageata-d" d="' + d + '"' + (opac !== undefined ? ' opacity="' + opac + '"' : "") + "/>";
  }

  function fond() {
    return '<polygon class="tara" points="' + TARA + '"/>' +
      '<polygon class="camp" points="' + TARA + '" fill="url(#camp)"/>' +
      '<path class="munti" d="' + neted(MUNTI) + '"/>';
  }

  /* unde stă numele fiecărui oraș, ca să nu cadă peste drumuri sau peste alt nume:
     [dx, dy, ancoră] */
  var ETICHETE = {
    "Nădlac": [-6, 16, "middle"], "Arad": [6, -6, "start"], "Timișoara": [-2, 15, "middle"], "Lugoj": [2, -7, "start"],
    "Deva": [0, 14, "middle"], "Sebeș": [-6, -6, "end"], "Sibiu": [6, -6, "start"], "Pitești": [8, -5, "start"],
    "București": [6, 4, "start"], "Constanța": [-6, 14, "end"], "Cluj-Napoca": [6, 4, "start"], "Brașov": [6, -6, "start"],
    "Oradea": [6, 4, "start"], "Ploiești": [6, 4, "start"], "Turda": [6, 4, "start"]
  };


  /* orașele prea apropiate de drumuri sau de alte nume nu au numele scris: îl arată la trecerea cursorului */
  var DOAR_TITLU = { "Lugoj": true, "Sebeș": true, "Deva": true };

  function oras(n) {
    var p = ORASE[n];
    var e = ETICHETE[n] || [6, 4, "start"];
    if (DOAR_TITLU[n]) {
      return '<circle class="oras cu-titlu" cx="' + p[0] + '" cy="' + p[1] + '" r="3.5" tabindex="0" aria-label="' + n + '"><title>' + n + "</title></circle>";
    }
    return '<circle class="oras" cx="' + p[0] + '" cy="' + p[1] + '" r="3.5"><title>' + n + "</title></circle>" +
      '<text class="oras-nume" x="' + (p[0] + e[0]) + '" y="' + (p[1] + e[1]) + '" text-anchor="' + e[2] + '">' + n + "</text>";
  }

  function seg(a, c, clasa) {
    var p = ORASE[a], q = ORASE[c];
    return '<line class="' + clasa + '" x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '"/>';
  }

  function plansaTraseu() {
    var n = ORASE["Nădlac"], bu = ORASE["București"];
    return '<svg class="tunel-harta" viewBox="0 0 420 300" role="img" aria-label="Harta României: tunelul în linie dreaptă între București și Nădlac, pe sub Carpați">' +
      '<defs><pattern id="camp" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8L8 0" stroke="currentColor" stroke-width="0.6" opacity="0.3"/></pattern></defs>' +
      fond() +
      '<line class="tunel-linie" x1="' + n[0] + '" y1="' + n[1] + '" x2="' + bu[0] + '" y2="' + bu[1] + '"/>' +
      '<line class="tunel-linie-int" x1="' + n[0] + '" y1="' + n[1] + '" x2="' + bu[0] + '" y2="' + bu[1] + '"/>' +
      oras("Nădlac") + oras("București") +
      '<text class="eticheta" x="300" y="60" text-anchor="middle">Carpații Orientali</text>' +
      '<text class="eticheta" x="305" y="200" text-anchor="middle">Carpații Meridionali</text>' +
      '<text class="eticheta" x="125" y="72" text-anchor="middle">Apuseni</text>' +
      "</svg>" +
      '<p class="mic">Tunelul: 563 km în linie dreaptă, de la vama Nădlac la centura Bucureștiului, la margine, unde se termină și restul drumurilor. Trece pe sub Carpații Meridionali, pe sub câmpul Banatului și pe sub tot ce se află între ele. Nu are ieșiri intermediare; Ardealul este trecut pe dedesubt.</p>';
  }

  function plansaRetea() {
    var h = '<svg class="tunel-harta" viewBox="0 0 420 300" role="img" aria-label="Rețeaua de autostrăzi de astăzi spre Nădlac: A1 din București prin Pitești, Sibiu, Deva, Timișoara, Arad, cu porțiunea Pitești-Sibiu în lucru">' +
      '<defs><pattern id="camp" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8L8 0" stroke="currentColor" stroke-width="0.6" opacity="0.3"/></pattern></defs>' +
      fond();
    ALTE.forEach(function (s) { h += seg(s[0], s[1], "drum-alt"); });
    A1_GATA.forEach(function (s) { h += seg(s[0], s[1], "drum-gata"); });
    A1_LUCRU.forEach(function (s) { h += seg(s[0], s[1], "drum-lucru"); });
    ["Nădlac", "Arad", "Timișoara", "Lugoj", "Deva", "Sebeș", "Sibiu", "Pitești", "București", "Constanța", "Cluj-Napoca", "Brașov"].forEach(function (o) {
      h += oras(o);
    });
    h += "</svg>" +
      '<p class="mic">Rețeaua de astăzi: A1 București-Nădlac, aproximativ 580 km pe traseu, cu porțiunea Pitești-Sibiu, peste munți, încă în lucru după două decenii de la promisiune; A2 spre Constanța; A3 și A10 pe bucăți. Tunelul le înlocuiește pe toate cu o linie, pe care nu o vede nimeni.</p>';
    return h;
  }

  var privire = "nadlac";   /* de unde se privește secțiunea: dinspre Nădlac, spre București */

  function plansaSectiune() {
    var spreB = varianta === "a" ? 2 : 3;
    var spreN = varianta === "a" ? 1 : 2;
    var n = spreB + spreN;
    var lat = 40;
    var total = n * lat + 24;
    var x0 = (420 - total) / 2;
    /* se circulă pe dreapta: privit dinspre Nădlac spre București, benzile spre București
       (care se depărtează, ↑) sunt pe dreapta; privit dinspre București, invers */
    var dinspreN = privire === "nadlac";
    var stanga = dinspreN ? spreN : spreB;      /* câte benzi pe partea stângă a desenului */
    var h = "";
    for (var i = 0; i < n; i++) {
      var peStanga = i < stanga;
      var spreBuc = dinspreN ? !peStanga : peStanga;
      var departe = dinspreN ? spreBuc : !spreBuc;   /* se depărtează de privitor */
      var x = x0 + 12 + i * lat;
      h += '<rect class="banda ' + (spreBuc ? "spre-b" : "spre-n") + '" x="' + x + '" y="72" width="' + lat + '" height="58"/>' +
        sageataSvg(x + lat / 2, 101, departe ? "sus" : "jos", 26);
    }
    var stangaNume = dinspreN ? "Nădlac" : "București";
    var dreaptaNume = dinspreN ? "București" : "Nădlac";
    return '<div class="tunel-variante" role="group" aria-label="Varianta și privirea">' +
      '<button type="button" data-v="a" aria-pressed="' + (varianta === "a") + '">Varianta A: 2 spre București, 1 spre Nădlac</button>' +
      '<button type="button" data-v="b" aria-pressed="' + (varianta === "b") + '">Varianta B, extinsă: 3 spre București, 2 spre Nădlac</button>' +
      '<button type="button" data-privire="nadlac" aria-pressed="' + dinspreN + '">Privit dinspre Nădlac</button>' +
      '<button type="button" data-privire="bucuresti" aria-pressed="' + !dinspreN + '">Privit dinspre București</button>' +
      "</div>" +
      '<svg class="tunel-sectiune" viewBox="0 0 420 150" role="img" aria-label="Secțiune transversală prin tunel, privită dinspre ' + stangaNume + ": " +
      stanga + " benzi pe stânga, spre " + stangaNume + ", cu săgeată în jos, și " + (n - stanga) + " pe dreapta, spre " + dreaptaNume + ', cu săgeată în sus; se circulă pe dreapta">' +
      '<rect class="roca" x="0" y="0" width="420" height="150"/>' +
      '<path class="bolta" d="M' + x0 + ' 130 L' + x0 + ' 72 Q' + x0 + ' 8 210 8 Q' + (x0 + total) + ' 8 ' + (x0 + total) + ' 72 L' + (x0 + total) + ' 130 Z"/>' +
      h + "</svg>" +
      '<p class="mic"><span class="tunel-cheie spre-b">↑</span> ' + spreB + (spreB === 1 ? " bandă" : " benzi") + " spre București &nbsp; " +
      '<span class="tunel-cheie spre-n">↓</span> ' + spreN + (spreN === 1 ? " bandă" : " benzi") + " spre Nădlac, privit dinspre " + stangaNume +
      "; se circulă pe dreapta. Diametrul tunelului: " + (n * 4 + 3) + " m. Mai multe benzi pe direcția întoarcerii acasă; cine pleacă are răbdare.</p>";
  }

  function plansaProfil() {
    /* profil longitudinal: cota terenului deasupra, tunelul drept dedesubt */
    return '<svg class="tunel-sectiune" viewBox="0 0 420 150" role="img" aria-label="Profil longitudinal: tunelul drept la 90 de metri sub nivelul mării, terenul deasupra urcă la 2.500 de metri în Carpați">' +
      '<rect class="roca" x="0" y="0" width="420" height="150"/>' +
      '<path class="teren" d="M0 118 L40 116 L80 112 L120 108 L150 100 L175 90 L200 70 L225 30 L245 22 L265 40 L285 75 L310 95 L340 108 L380 114 L420 118 L420 150 L0 150 Z"/>' +
      '<line class="tunel-profil" x1="0" y1="132" x2="420" y2="132"/>' +
      '<text class="eticheta" x="6" y="100" text-anchor="start">Nădlac, 96 m</text>' +
      '<text class="eticheta" x="245" y="14" text-anchor="middle">Carpații Meridionali, 2.500 m</text>' +
      '<text class="eticheta" x="414" y="100" text-anchor="end">București, 85 m</text>' +
      '<text class="eticheta" x="210" y="144" text-anchor="middle">tunelul, la -90 m, drept</text>' +
      "</svg>" +
      '<p class="mic">Profilul: terenul urcă până la 2.500 m; tunelul stă la 90 m sub nivelul mării, ca să fie drept și pe verticală. Sub munte, roca de deasupra are 2,6 km. Ventilația se face prin cele două capete, ca la orice tunel de 563 km.</p>';
  }

  function plansaExecutie() {
    return '<svg class="tunel-sectiune" viewBox="0 0 420 150" role="img" aria-label="Mașina de forat, Cârtița Dacică: cap rotativ, scut, inele de beton puse în urmă, transportor pentru roca scoasă">' +
      '<rect class="roca" x="0" y="0" width="420" height="150"/>' +
      '<rect class="rocafata" x="300" y="20" width="120" height="110"/>' +
      '<rect class="captuseala" x="10" y="35" width="230" height="80"/>' +
      '<g class="inele">' + [30, 60, 90, 120, 150, 180, 210].map(function (x) { return '<line x1="' + x + '" y1="35" x2="' + x + '" y2="115"/>'; }).join("") + "</g>" +
      '<rect class="scut" x="240" y="30" width="55" height="90" rx="4"/>' +
      '<circle class="cap" cx="300" cy="75" r="48"/>' +
      '<g class="cutite">' + [0, 45, 90, 135].map(function (a) { return '<line x1="300" y1="30" x2="300" y2="120" transform="rotate(' + a + ' 300 75)"/>'; }).join("") + "</g>" +
      '<line class="banda-steril" x1="20" y1="108" x2="240" y2="108"/>' +
      '<text class="eticheta" x="125" y="28" text-anchor="middle">inele de beton, puse în urmă</text>' +
      '<text class="eticheta" x="267" y="140" text-anchor="middle">scut</text>' +
      '<text class="eticheta" x="360" y="140" text-anchor="middle">roca, înainte</text>' +
      '<text class="eticheta" x="125" y="128" text-anchor="middle">transportorul cu roca scoasă, spre ieșire</text>' +
      "</svg>" +
      '<dl class="fisa-rand tunel-date">' +
      "<dt>Metoda</dt><dd>două mașini de forat cu scut, „Cârtița Dacică I” și „II”, pornite din cele două capete; se întâlnesc pe sub Deva, dacă au fost îndreptate bine</dd>" +
      "<dt>Ritm</dt><dd>20 m pe zi de fiecare mașină, ritmul obișnuit în rocă; 563 km împărțiți la 40 m pe zi fac 14.075 zile, adică 38 de ani și jumătate, față de termenul de doi ani</dd>" +
      "<dt>Inele</dt><dd>un inel de beton la fiecare 2 m: 281.500 de inele, fiecare cu șapte segmente, adică aproape două milioane de piese care trebuie să se potrivească</dd>" +
      "<dt>Roca scoasă</dt><dd>diametru 15 m, secțiune 177 m², lungime 563 km: aproximativ 100 de milioane de metri cubi de rocă scoasă, cât un deal nou de 1 km² și 100 m înălțime, lângă Nădlac, cu vedere spre Ungaria</dd>" +
      "<dt>Apa</dt><dd>sub Carpați, la 2,6 km de rocă deasupra, se intră în ape sub presiune; se pompează spre București, care oricum cerea apă</dd>" +
      "<dt>Ventilația</dt><dd>prin capete; la 563 km, aerul de la Nădlac ajunge la București după ce a fost respirat de toți cei de pe drum</dd>" +
      "</dl>";
  }

  function plansaMarca() {
    return '<svg class="tunel-sectiune" viewBox="0 0 420 150" role="img" aria-label="Panoul de la intrarea în tunel: stindardul dacic, numele Tunelul Dacic, 563 km, următoarea ieșire București">' +
      '<rect class="marca-panou" x="20" y="15" width="380" height="120" rx="6"/>' +
      '<g class="draco" transform="translate(40,45)">' +
      '<path d="M0 30 C10 10 20 10 30 30 C40 50 50 50 60 30 C70 10 80 10 90 30" fill="none" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M88 30 l14 -12 l4 10 l10 -2 l-6 10 l8 6 l-12 2 l-4 10 l-10 -8 z"/>' +
      '<circle cx="104" cy="30" r="2" class="ochi"/>' +
      "</g>" +
      '<text class="marca-nume" x="175" y="52">TUNELUL DACIC</text>' +
      '<text class="marca-sub" x="175" y="74">563 km &middot; drept, ca strămoșii</text>' +
      '<text class="marca-sub" x="175" y="96">următoarea ieșire: București, 563 km</text>' +
      '<text class="marca-mic" x="175" y="118">proiect național &middot; finanțat de la buget, fără Uniune</text>' +
      "</svg>" +
      '<dl class="fisa-rand tunel-date">' +
      "<dt>Numele</dt><dd>„dacic”, ca să aibă vechime un proiect care nu are început; dacii nu au săpat tunele, au construit cetăți pe deal, ca să vadă cine vine</dd>" +
      "<dt>Stindardul</dt><dd>lupul cu trup de șarpe de pe Columna lui Traian, adică de pe monumentul celui care i-a învins; se folosește oricum, că arată bine</dd>" +
      "<dt>Lozinca</dt><dd>„Drept, ca strămoșii”; strămoșii mergeau pe crestele munților, pe drumul cel mai lung</dd>" +
      "<dt>Culorile</dt><dd>roșu, galben și albastru, în ordinea aceasta, ca să nu fie confundat cu tunelul altcuiva</dd>" +
      "<dt>Mascota</dt><dd>Cârtița Dacică, animal care nu a existat, ca și tunelul</dd>" +
      "<dt>Panoul</dt><dd>la Nădlac, cu spatele la Ungaria; la București, la centură, cu fața spre oraș, ca să se vadă din trafic</dd>" +
      "</dl>";
  }

  function plansaDate() {
    return '<dl class="fisa-rand tunel-date">' +
      "<dt>Traseu</dt><dd>linie dreaptă; nu ocolește nimic, trece pe sub tot</dd>" +
      "<dt>Pe sub</dt><dd>Carpații, ca să nu fie deranjați; câmpul, ca să nu se piardă teren agricol; Ardealul, în întregime</dd>" +
      "<dt>Ieșiri</dt><dd>două: una la marginea capitalei, una în Uniunea Europeană</dd>" +
      "<dt>Termen</dt><dd>doi ani de la semnare; semnarea, la două luni după alegeri; alegerile, oricând</dd>" +
      "<dt>Buget</dt><dd>se stabilește după; de la bugetul de stat, fără Uniune, ca să nu vină cu condiții</dd>" +
      "<dt>Avizat de</dt><dd>daci, prin continuitate</dd>" +
      "</dl>";
  }

  var PLANSE = [["traseu", "Traseul", plansaTraseu], ["retea", "Rețeaua de astăzi", plansaRetea],
    ["sectiune", "Secțiunea", plansaSectiune], ["profil", "Profilul", plansaProfil], ["executie", "Execuția", plansaExecutie],
    ["marca", "Marca", plansaMarca], ["date", "Fișa", plansaDate]];

  function deseneaza() {
    var h = '<p class="tunel-titlu">Tunelul Dacic București-Nădlac. Plan de execuție.</p>' +
      '<div class="tunel-file" role="tablist">' + PLANSE.map(function (p) {
        return '<button type="button" role="tab" data-plansa="' + p[0] + '" aria-selected="' + (plansa === p[0]) + '">' + p[1] + "</button>";
      }).join("") + "</div>" +
      '<div class="tunel-plansa" role="tabpanel">' + PLANSE.filter(function (p) { return p[0] === plansa; })[0][2]() + "</div>";
    zona.innerHTML = h;
  }

  zona.addEventListener("click", function (e) {
    var v = e.target.closest("button[data-v]");
    if (v) { varianta = v.getAttribute("data-v"); deseneaza(); return; }
    var pv = e.target.closest("button[data-privire]");
    if (pv) { privire = pv.getAttribute("data-privire"); deseneaza(); return; }
    var t = e.target.closest("button[data-plansa]");
    if (t) { plansa = t.getAttribute("data-plansa"); deseneaza(); }
  });

  b.addEventListener("click", function () {
    if (!zona.hidden) { zona.hidden = true; zona.innerHTML = ""; b.setAttribute("aria-expanded", "false"); return; }
    zona.hidden = false;
    b.setAttribute("aria-expanded", "true");
    deseneaza();
  });
})();
