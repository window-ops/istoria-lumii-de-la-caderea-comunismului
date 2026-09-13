/* Fișa manualului. Virgula de după „daci”: constructorul ia planul tunelului bucată cu
   bucată și arată, cu desen, de ce nu se poate. Aceleași planșe, cealaltă parte. */

(function () {
  "use strict";

  var b = document.getElementById("buton-virgula");
  var zona = document.getElementById("virgula");
  if (!b || !zona) return;

  var plansa = "virgula";

  function et(x, y, t, ancora) {
    return '<text class="eticheta" x="' + x + '" y="' + y + '" text-anchor="' + (ancora || "middle") + '">' + t + "</text>";
  }


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

  function svg(aria, corp) {
    return '<svg class="tunel-sectiune" viewBox="0 0 420 150" role="img" aria-label="' + aria + '">' +
      '<rect class="roca" x="0" y="0" width="420" height="150"/>' + corp + "</svg>";
  }

  function pVirgula() {
    return svg("Cele două mașini pornesc din capete și se apropie; la sfârșitul zilei 14.067 mai rămân 20 de metri de rocă între ele, iar în ziua 14.068 s-ar întâlni cu 20 de metri mai departe decât trebuie",
      '<rect class="captuseala" x="20" y="60" width="380" height="40"/>' +
      '<rect class="rocafata" x="203" y="60" width="14" height="40"/>' +
      '<rect class="scut" x="173" y="64" width="30" height="32" rx="3"/><rect class="scut" x="217" y="64" width="30" height="32" rx="3"/>' +
      sageataSvg(150, 80, "dreapta") + sageataSvg(270, 80, "stanga") +
      et(20, 40, "de la Nădlac", "start") + et(400, 40, "de la București", "end") +
      et(210, 52, "ziua 14.067: 20 m de rocă între ele") +
      et(210, 122, "ziua 14.068: fiecare mașină a săpat 20 m prin cealaltă") +
      et(210, 140, "ziua 14.067,5: nu există")) +
      '<p class="virgula-replica">„Îmi dă ceva cu virgulă.”</p>' +
      "<p>Lucrează două mașini, fiecare câte 20 de metri pe zi, adică 40 de metri pe zi împreună. Tunelul are 562.700 de metri. " +
      "Împărțirea nu iese exactă: dă 14.067 de zile și rămâne un rest de o jumătate de zi. Într-o jumătate de zi, cele două mașini sapă împreună 20 de metri. " +
      "Prin urmare, la sfârșitul zilei 14.067, între cele două mașini mai rămân 20 de metri de rocă. Dacă mașinile lucrează și în ziua 14.068, fiecare înaintează " +
      "încă 20 de metri și intră în cealaltă. O mașină de forat nu se poate opri la jumătatea zilei și nu poate săpa prin altă mașină. De aceea planul nu se poate " +
      "executa așa cum este scris. Un rest este acceptat într-un singur loc, la preț, unde după el vin întotdeauna trei zerouri.</p>";
  }

  function pDrept() {
    return svg("Pământul este rotund: linia dreaptă între Nădlac și București trece pe sub suprafața curbă și ajunge, la mijloc, la 6,2 km adâncime; un tunel adevărat urmează curbura, la 90 de metri",
      '<path class="teren" d="M0 150 L0 80 Q210 -25 420 80 L420 150 Z"/>' +
      '<path class="drum-lucru" d="M30 78 Q210 -10 390 78" fill="none"/>' +
      '<line class="tunel-profil" x1="30" y1="78" x2="390" y2="78"/>' +
      '<line class="marcaj" x1="210" y1="27" x2="210" y2="78"/>' +
      '<circle class="oras" cx="30" cy="78" r="3"/><circle class="oras" cx="390" cy="78" r="3"/>' +
      et(30, 96, "Nădlac", "start") + et(390, 96, "București", "end") +
      et(216, 56, "6,2 km", "start") +
      et(210, 118, "roșu, drept: coboară 6,2 km sub suprafață la mijloc") +
      et(210, 134, "punctat, curbat ca Pământul: la 90 m, tot drumul")) +
      '<p class="virgula-replica">„Drept nu există.”</p>' +
      "<p>Pământul este rotund, cu raza de 6.371 km. Suprafața dintre Nădlac și București este un arc; o linie dreaptă între cele două capete este coarda arcului " +
      "și se depărtează de suprafață pe măsură ce înaintează, până la 6,2 km adâncime la mijloc, apoi urcă la loc. Acolo este mai adânc decât orice mină din lume " +
      "și sunt aproape 170 de grade. Orice tunel adevărat este ușor curbat, ca să stea la aceeași adâncime; „drept” pe hartă și drept în realitate sunt lucruri diferite.</p>";
  }

  function pAer() {
    var sageti = "";
    for (var i = 0; i < 9; i++) {
      sageti += sageataSvg(40 + i * 42, 80, "dreapta", 24, (1 - i * 0.11).toFixed(2));
    }
    return svg("Tunel cu aer împins de la Nădlac: săgețile slăbesc și dispar înainte de București; cel mai lung tunel rutier din lume, Lærdal, are 24,5 km și trei stații de ventilație",
      '<rect class="captuseala" x="20" y="50" width="380" height="60"/>' + sageti +
      et(20, 34, "Nădlac: intră aer", "start") + et(400, 34, "București: nu mai ajunge", "end") +
      et(210, 132, "cel mai lung tunel rutier din lume, Lærdal, Norvegia: 24,5 km, trei stații de ventilație")) +
      '<p class="virgula-replica">„Cu ce respiră?”</p>' +
      "<p>Într-un tunel, aerul curat trebuie împins înăuntru și gazele de eșapament scoase afară. Prin capete se poate la câteva sute de metri; " +
      "la 563 km, aerul împins de la Nădlac se oprește după câțiva kilometri, iar gazele mașinilor rămân unde sunt produse. Ar fi nevoie de stații de ventilație, cu coșuri " +
      "de evacuare până la suprafață, la fiecare 2-3 km: aproximativ 250 de stații, dintre care 40 sub Carpați, cu coșuri de 2,6 km prin munte. Planul nu are niciuna, pentru că spune „pe sub”.</p>";
  }

  function pCald() {
    var straturi = [[20, 34, 26, "suprafața: 12°"], [34, 50, 42, "90 m, adâncimea tunelului: 14°"], [50, 96, 58, "2,6 km, sub Carpați: 77°"], [96, 138, 104, "6,2 km, pe linia dreaptă: 167°"]];
    var h = "";
    straturi.forEach(function (st, i) {
      h += '<rect class="strat-cald" x="30" y="' + st[0] + '" width="150" height="' + (st[1] - st[0]) + '" fill-opacity="' + (0.12 + i * 0.25).toFixed(2) + '"/>' +
        '<line class="marcaj" x1="30" y1="' + st[0] + '" x2="190" y2="' + st[0] + '"/>' +
        et(196, st[2], st[3], "start");
    });
    return svg("Secțiune în adâncime: temperatura crește cu 25 de grade la fiecare kilometru; 12 grade la suprafață, 14 la adâncimea tunelului, 77 sub Carpați la 2,6 km, 167 la 6,2 km pe linia dreaptă",
      h + '<line class="marcaj" x1="30" y1="138" x2="190" y2="138"/>' + et(105, 148, "în jos, tot mai cald")) +
      '<p class="virgula-replica">„Se coace.”</p>' +
      "<p>În pământ, temperatura crește cu aproximativ 25 de grade la fiecare kilometru de adâncime. La 90 de metri, unde stă tunelul, sunt 14 grade, se poate. " +
      "Sub Carpați, tunelul are 2,6 km de munte deasupra, dar temperatura o dă adâncimea față de suprafața de deasupra, deci roca are în jur de 77 de grade: " +
      "la Gotthard s-a lucrat la 45 de grade, cu răcire și ture scurte. Pe linia dreaptă, la 6,2 km, sunt aproape 170 de grade: nu lucrează nici oamenii, nici mașina, " +
      "iar apa care intră sub presiune vine la aceeași temperatură.</p>";
  }

  function pDeal() {
    var case_ = "";
    for (var i = 0; i < 6; i++) case_ += '<rect class="casa" x="' + (40 + i * 14) + '" y="116" width="8" height="4"/>';
    return svg("Dealul de rocă scoasă, la aceeași scară cu casele din Nădlac: dealul are 100 de metri și un kilometru la bază; casele, patru metri",
      '<rect class="teren" x="10" y="120" width="400" height="16"/>' +
      '<path class="deal" d="M200 120 L300 30 L400 120 Z"/>' + case_ +
      et(12, 108, "Nădlac: case cu un etaj, 4 m, la aceeași scară", "start") + et(300, 22, "dealul de rocă scoasă: 100 m") +
      '<line class="marcaj" x1="200" y1="146" x2="400" y2="146"/>' + et(300, 143, "1 km")) +
      '<p class="virgula-replica">„Unde o pun?”</p>' +
      "<p>Din tunel ies 100 de milioane de metri cubi de rocă. Cu camionul, sunt 5 milioane de transporturi, adică un camion la fiecare 4 minute, zi și noapte, " +
      "timp de 38 de ani, toate pe același drum. Pusă grămadă, roca face un deal nou de un kilometru pătrat și 100 de metri înălțime, " +
      "de 25 de ori cât o casă, lângă un oraș de patru mii de oameni. Planul spune „cu vedere spre Ungaria”; nu spune cine urcă.</p>";
  }

  function pTimp() {
    var alegeri = "";
    for (var i = 4; i <= 38; i += 4) {
      var x = 40 + i * 9;
      alegeri += '<line class="marcaj" x1="' + x + '" y1="76" x2="' + x + '" y2="104"/>';
    }
    return svg("Două bare pe aceeași scară: termenul promis, doi ani, și execuția, 38 de ani și jumătate, cu liniuțe la fiecare patru ani, la alegeri",
      '<rect class="bara-timp promis" x="40" y="34" width="18" height="24"/>' + et(66, 50, "termenul promis: 2 ani", "start") +
      '<rect class="bara-timp real" x="40" y="80" width="346" height="24"/>' + alegeri +
      et(40, 124, "execuția, la ritmul obișnuit: 38 de ani și jumătate; o liniuță la fiecare alegeri", "start")) +
      '<p class="virgula-replica">„Doi ani, cu ce?”</p>' +
      "<p>Cu două mașini, câte 20 de metri pe zi fiecare, tunelul ține 38 de ani și jumătate: nouă rânduri de alegeri, fiecare cu promisiunea lui. " +
      "Ca să iasă în doi ani, ar trebui 40 de mașini de forat pornite în același timp, din 38 de galerii de acces săpate înainte, 20 dintre ele prin munte; " +
      "numai galeriile durează mai mult de doi ani. Doi ani nu este un termen de execuție; este distanța până la următoarele alegeri.</p>";
  }

  function pBenzi() {
    var masini = "";
    for (var i = 0; i < 8; i++) masini += '<rect class="masina" x="' + (100 + i * 38) + '" y="70" width="26" height="12" rx="2"/>';
    return svg("Banda spre Nădlac, cu circulația spre stânga: un camion în față și opt mașini în spatele lui, fără nicio posibilitate de depășire pe 563 km",
      '<rect class="captuseala" x="20" y="45" width="380" height="60"/>' +
      '<line class="banda" x1="20" y1="76" x2="400" y2="76"/>' +
      '<rect class="camion" x="40" y="64" width="44" height="22" rx="2"/>' + masini +
      sageataSvg(32, 31, "stanga", 20) + et(48, 34, "spre Nădlac, singura bandă", "start") +
      et(210, 128, "camionul, 80 km/h, în față; în spate, toată lumea, 563 km, șapte ore")) +
      '<p class="virgula-replica">„O bandă e o coadă.”</p>' +
      "<p>Spre Nădlac este o singură bandă, 563 km, fără ieșiri și fără loc de depășire. Primul camion intrat, cu 80 km/h, hotărăște viteza tuturor celor din spate, " +
      "timp de șapte ore; o pană la kilometrul 300 oprește tot ce este în urmă. Iar cele două mașini de forat, pornite din capete cu profiluri diferite, două benzi " +
      "pe un sens și una pe celălalt, trebuie să se întâlnească pe sub Deva cu benzile față în față la centimetru; dacă nu, o bandă dă în perete.</p>";
  }

  function pComparatie() {
    /* lungimi la aceeași scară: 563 km = 300 px */
    var TUNELE = [
      ["Lærdal, Norvegia, rutier, 2000", 24.5, "24,5 km"],
      ["Eurotunelul, feroviar, 1994", 50.5, "50,5 km"],
      ["Gotthard, Elveția, feroviar, 2016", 57.1, "57,1 km"],
      ["Apeductul Delaware, SUA, apă, 1945", 137, "137 km, cel mai lung tunel din lume"],
      ["Tunelul Dacic, din plan", 563, "563 km"]
    ];
    var h = "";
    TUNELE.forEach(function (t, i) {
      var y = 26 + i * 25;
      var w = Math.max(2, t[1] / 563 * 300);
      h += '<rect class="' + (i === 4 ? "bara-timp real" : "bara-timp promis") + '" x="20" y="' + y + '" width="' + w.toFixed(1) + '" height="11"/>' +
        et(20, y - 4, t[0], "start") + et(26 + w, y + 9, t[2], "start");
    });
    return svg("Lungimile la aceeași scară: Lærdal 24,5 km, Eurotunelul 50,5 km, Gotthard 57 km, apeductul Delaware 137 km, Tunelul Dacic 563 km", h) +
      '<dl class="fisa-rand tunel-date">' +
      "<dt>Lærdal</dt><dd>cel mai lung tunel rutier din lume: 24,5 km, construit în cinci ani, 1995-2000, cu 930 de milioane de coroane, adică vreo 110 milioane de euro de atunci; " +
      "trei stații de ventilație și trei caverne luminate, ca șoferii să nu adoarmă</dd>" +
      "<dt>Gotthard</dt><dd>cel mai lung tunel feroviar din lume: 57 km, 17 ani de lucru, 12,2 miliarde de franci, 28 de milioane de tone de rocă scoasă, " +
      "nouă morți pe șantier</dd>" +
      "<dt>Tunelul Dacic</dt><dd>de 23 de ori Lærdal și de 10 ori Gotthard; ar fi, de departe, cel mai lung tunel din lume, de orice fel, de patru ori cât apeductul Delaware</dd>" +
      "<dt>Banii</dt><dd>la prețul pe kilometru de la Gotthard, 214 milioane de franci, tunelul costă 120 de miliarde de franci, adică aproximativ 640 de miliarde de lei: " +
      "cam cât toate cheltuielile bugetului de stat al României pe un an, fără să mai rămână nimic pentru altceva</dd>" +
      "<dt>Materialul</dt><dd>100 de milioane de metri cubi de rocă scoasă, de 20 de ori cât la Gotthard; 281.500 de inele de beton, câte un inel la fiecare două minute, " +
      "38 de ani la rând, dintr-o fabrică care nu există</dd>" +
      "<dt>Concluzia</dt><dd>Acesta nu este un tunel. Este o linie trasă pe hartă. O linie pe hartă costă cât un creion; de aceea se trage ușor.</dd>" +
      "</dl>";
  }

  function pMarca() {
    return svg("Două panouri: în stânga, panoul propus, cu stindardul dacic și numele, tăiat cu roșu; în dreapta, panoul cum ar fi de fapt: verde, cu semnul de tunel, Nădlac 563 km",
      '<rect class="marca-panou" x="10" y="14" width="190" height="112" rx="6"/>' +
      '<g class="draco" transform="translate(48,26) scale(0.55)">' +
      '<path d="M0 30 C10 10 20 10 30 30 C40 50 50 50 60 30 C70 10 80 10 90 30" fill="none" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M88 30 l14 -12 l4 10 l10 -2 l-6 10 l8 6 l-12 2 l-4 10 l-10 -8 z"/></g>' +
      '<text class="marca-nume-mic" x="105" y="84" text-anchor="middle">TUNELUL DACIC</text>' +
      '<text class="marca-sub-mic" x="105" y="102" text-anchor="middle">563 km · drept, ca strămoșii</text>' +
      '<text class="marca-sub-mic" x="105" y="116" text-anchor="middle">proiect național</text>' +
      '<line class="taiat" x1="16" y1="20" x2="194" y2="120"/><line class="taiat" x1="194" y1="20" x2="16" y2="120"/>' +
      '<rect class="panou-verde" x="220" y="14" width="190" height="112" rx="6"/>' +
      '<rect class="semn-tunel" x="232" y="26" width="30" height="30" rx="3"/><path class="semn-tunel-gura" d="M238 52 V44 a9 9 0 0 1 18 0 V52 Z"/>' +
      '<text class="verde-text" x="270" y="47" font-size="12">Tunel 563 km</text>' +
      '<text class="verde-text" x="232" y="86">Nădlac</text><text class="verde-text" x="398" y="86" text-anchor="end">563</text>' +
      '<text class="verde-text" x="232" y="112">Ungaria</text><text class="verde-text" x="398" y="112" text-anchor="end">563</text>' +
      et(105, 144, "panoul propus") + et(315, 144, "panoul cum ar fi de fapt")) +
      '<p class="virgula-replica">„Nu-i puneți nume de dac.”</p>' +
      '<dl class="fisa-rand tunel-date">' +
      "<dt>Cine a construit</dt><dd>dacii au lăsat cetăți de piatră pe dealuri și niciun drum; drumurile, podurile și tunelurile din provincie le-au făcut romanii, " +
      "cu ingineri militari. Un tunel „dacic” este, prin definiție, roman</dd>" +
      "<dt>Stindardul</dt><dd>lupul cu trup de șarpe îl știm de pe Columna lui Traian, adică de pe monumentul ridicat de cuceritor ca să-și povestească victoria; " +
      "puși pe un panou, dacii apar cum i-a desenat Roma</dd>" +
      "<dt>Cuvântul</dt><dd>de patruzeci de ani, „dacic” este cuvântul preferat al celor care spun că dacii au inventat scrisul, că romanii se trag din daci și că dacii " +
      "au stăpânit toată harta. Un proiect care se numește așa anunță de la început că este vorba despre altceva decât despre beton</dd>" +
      "<dt>Locul</dt><dd>capătul de la Nădlac dă în Ungaria; un panou cu lup dacic la o vamă cu Uniunea Europeană vorbește vecinilor înainte să vorbească șoferilor, " +
      "și le spune ceva ce nu le-a cerut nimeni</dd>" +
      "<dt>Panoul</dt><dd>un indicator rutier spune unde duce drumul și la câți kilometri, cu litere standard pe fond verde, cu semnul de tunel și lungimea lui; " +
      "nu are mascotă, lozincă sau strămoși. Drumul nu are număr, pentru că este singurul de felul lui, alături de A1; șoferul la 130 km/h are o secundă și jumătate ca să-l citească</dd>" +
      "<dt>Concluzia</dt><dd>Un tunel se ține în beton, nu în cuvinte. Dacă tunelul s-ar putea construi, panoul lui ar arăta " +
      "ca panoul oricărui drum: ar spune unde duce și la câți kilometri. Iar drumul ar ajunge la Nădlac, ca toate celelalte.</dd>" +
      "</dl>";
  }

  var PLANSE = [["virgula", "Virgula", pVirgula], ["drept", "Linia dreaptă", pDrept], ["aer", "Aerul", pAer],
    ["cald", "Căldura", pCald], ["deal", "Roca", pDeal], ["timp", "Termenul", pTimp], ["benzi", "Benzile", pBenzi],
    ["comparatie", "Comparația", pComparatie], ["opinia", "Opinia", pMarca]];

  function deseneaza() {
    zona.innerHTML = '<p class="tunel-titlu">Observațiile constructorului la planul de execuție.</p>' +
      '<p class="virgula-cine">Constructorul, cu planul în mână, ia planșele pe rând:</p>' +
      '<div class="tunel-file" role="tablist">' + PLANSE.map(function (p) {
        return '<button type="button" role="tab" data-plansa="' + p[0] + '" aria-selected="' + (plansa === p[0]) + '">' + p[1] + "</button>";
      }).join("") + "</div>" +
      '<div class="tunel-plansa" role="tabpanel">' + PLANSE.filter(function (p) { return p[0] === plansa; })[0][2]() + "</div>";
  }

  zona.addEventListener("click", function (e) {
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
