/* Fișa manualului. Kiwix: o căutare care merge, într-un index mic, fără internet.
   Articolele obișnuite se găsesc. Cele critice sunt ascunse fără nicio vorbă, cum se
   face bine: căutarea lor întoarce altceva, la fel de plauzibil. Ocolirile se recunosc
   aproximativ. Se pot scoate la iveală în trei pași, dintre care primul este să
   bănuiești că lipsesc. */

(function () {
  "use strict";

  var cutie = document.getElementById("kiwix");
  if (!cutie) return;
  var camp = cutie.querySelector(".kiwix-camp");
  var lista = cutie.querySelector(".kiwix-rezultate");
  var stare = cutie.querySelector(".kiwix-stare");
  var fisier = cutie.querySelector(".kiwix-fisier");

  var OBISNUITE = [
    /* „rece” și vecinii lui */
    ["Rece (temperatură)", "senzație produsă de pierderea căldurii; opusul lui cald"],
    ["Recensământul populației din 2021", "România, 19,05 milioane de locuitori"],
    ["Receptor (biologie)", "proteină care primește un semnal chimic"],
    ["Rechin", "pește cartilaginos; peste 500 de specii"],
    ["Recife", "oraș în Brazilia, capitala statului Pernambuco"],
    ["Reciclare", "reintroducerea deșeurilor în circuitul de producție"],
    ["Recoltă", "produsele culese de pe un teren agricol"],
    ["Record mondial", "cea mai bună performanță înregistrată oficial"],
    ["Recunoașterea vorbirii", "transformarea vorbirii în text, prin program"],
    ["Recitativ", "parte a unei opere, cântată apropiat de vorbire"],
    ["Recviem", "slujbă și compoziție muzicală pentru morți"],
    /* din manual */
    ["Cuponiada", "program de privatizare în masă, România, 1995-1996"],
    ["Caritas (Cluj)", "schemă piramidală, 1992-1994"],
    ["Fondul Național de Investiții", "prăbușit în mai 2000, aproximativ 318.000 de investitori"],
    ["Mineriada din iunie 1990", "13-15 iunie 1990, București"],
    ["Ion Iliescu", "președinte al României 1990-1996 și 2000-2004"],
    ["Proclamația de la Timișoara", "11 martie 1990, treisprezece puncte"],
    ["Terapia de șoc", "liberalizare rapidă a prețurilor și privatizare, Rusia, 1992"],
    ["Boris Elțîn", "președinte al Rusiei 1991-1999"],
    ["Împrumuturi contra acțiuni", "Rusia, 1995-1996; privatizarea marilor companii"],
    ["Genocidul din Rwanda", "aprilie-iulie 1994"],
    ["Masacrul de la Srebrenica", "iulie 1995"],
    ["Rezoluția 713 a Consiliului de Securitate", "1991, embargo asupra armelor pentru Iugoslavia"],
    ["Atentatele de la 11 septembrie 2001", "New York și Washington"],
    ["Invazia Irakului din 2003", "20 martie 2003"],
    ["Raportul Chilcot", "ancheta britanică asupra războiului din Irak, publicată în 2016"],
    ["Extinderea NATO din 2004", "șapte state, între care România"],
    ["Aderarea României la Uniunea Europeană", "1 ianuarie 2007"],
    ["Lehman Brothers", "bancă de investiții, faliment la 15 septembrie 2008"],
    ["Criza datoriilor din Grecia", "programe de ajustare, 2010-2018"],
    ["Yanis Varoufakis", "ministru de finanțe al Greciei, ianuarie-iulie 2015"],
    ["Primăvara arabă", "din decembrie 2010"],
    ["Euromaidan", "Kiev, noiembrie 2013 - februarie 2014"],
    ["Memorandumul de la Budapesta", "1994, garanții de securitate pentru Ucraina"],
    ["Acordurile de la Minsk", "2014 și 2015"],
    ["Brexit", "referendum, 23 iunie 2016"],
    ["Incendiul din clubul Colectiv", "30 octombrie 2015, București"],
    ["Ordonanța 13", "ianuarie 2017, protestele din Piața Victoriei"],
    ["Lützerath", "sat evacuat pentru mina Garzweiler II, ianuarie 2023"],
    ["Masacrul de la Marikana", "16 august 2012, Africa de Sud"],
    ["Standing Rock", "protestele împotriva conductei Dakota Access, 2016"],
    ["Pandemia de COVID-19", "din 2020"],
    ["Invazia Ucrainei din 2022", "24 februarie 2022"],
    ["BRICS", "Brazilia, Rusia, India, China, Africa de Sud; extins din 2024"],
    ["Kimi K3", "model de limbaj, Moonshot AI, iulie 2026"],
    ["Klaus Iohannis", "președinte al României 2014-2025"],
    ["Alegerile prezidențiale din România din 2024", "anulate de Curtea Constituțională la 6 decembrie 2024"],
    ["Naomi Klein", "jurnalistă canadiană, „Doctrina șocului”, 2007"],
    ["Joseph Stiglitz", "economist american, Premiul Nobel 2001"],
    /* Turcia, ce se poate spune */
    ["Turcia", "stat în Asia Mică și în Tracia; capitala Ankara; 85 de milioane de locuitori"],
    ["Istanbul", "cel mai mare oraș al Turciei; fostul Constantinopol"],
    ["Ankara", "capitala Turciei din 1923"],
    ["Mustafa Kemal Atatürk", "fondatorul Republicii Turcia, președinte 1923-1938"],
    ["Strâmtoarea Bosfor", "leagă Marea Neagră de Marea Marmara"],
    ["Cappadocia", "regiune în Anatolia centrală, cu locuințe săpate în tuf"],
    ["Hagia Sofia", "biserică, moschee, muzeu, din 2020 din nou moschee"],
    ["Cumhuriyet Bayramı", "Ziua Republicii, 29 octombrie, sărbătoare națională în Turcia"],
    ["Republica (formă de guvernare)", "cumhuriyet, în turcă; res publica, în latină"],
    ["Galatasaray SK", "club de fotbal din Istanbul, fondat în 1905"],
    ["Kebab", "carne friptă pe rotisor vertical sau la frigare"],
    ["Baclava", "prăjitură din foi subțiri, nuci și sirop"],
    ["Cafeaua turcească", "cafea fiartă în ibric, nefiltrată"],
    ["Lira turcească", "moneda Turciei; inflație de peste 60% în 2023"],
    ["Cutremurul din Turcia și Siria din 2023", "6 februarie 2023, peste 50.000 de morți"],
    ["Acordul UE-Turcia privind migrația", "18 martie 2016"],
    ["Erdő", "„pădure”, în maghiară; nume de familie"],
    ["Erdoğan (nume de familie)", "nume turcesc; înseamnă „născut soldat”"],
    ["Recep (prenume)", "prenume masculin turcesc, din numele lunii Rajab"],
    ["Kavala", "oraș port în nordul Greciei"],
    ["Saray", "„palat”, în turcă; și localitate în Turcia"],
    ["Sultan (titlu)", "titlu de suveran în lumea islamică"],
    ["Gülen (verb)", "„râzând”, în turcă"],
    ["Taksim (muzică)", "improvizație instrumentală în muzica otomană"],
    ["Halk", "„popor”, în turcă"],
    ["Adalet", "„dreptate”, în turcă; și prenume feminin"],
    ["Millet", "„națiune”, în turcă; sistemul comunităților confesionale otomane"],
    /* lucruri de toată ziua */
    ["Marea Neagră", "mare interioară între Europa și Asia"],
    ["Dunărea", "al doilea fluviu european ca lungime, 2.850 km"],
    ["Munții Carpați", "lanț muntos de 1.500 km, din Cehia până în Serbia"],
    ["Delta Dunării", "a doua deltă din Europa ca mărime; rezervație a biosferei"],
    ["București", "capitala României; aproximativ 1,7 milioane de locuitori"],
    ["Cluj-Napoca", "al doilea oraș al României ca populație"],
    ["Timișoara", "oraș în Banat; Capitală Europeană a Culturii în 2023"],
    ["Fotosinteza", "producerea de substanțe organice din dioxid de carbon și apă, cu lumină"],
    ["Luna", "satelitul natural al Pământului"],
    ["Soarele", "steaua din centrul sistemului solar"],
    ["Zăpada", "precipitații solide, sub formă de cristale de gheață"],
    ["Ploaia", "precipitații lichide"],
    ["Vântul", "mișcare a aerului, de la presiune mare la presiune mică"],
    ["Bicicleta", "vehicul cu două roți, pus în mișcare de pedale"],
    ["Trenul", "vehicul feroviar; primul tren de călători, 1825"],
    ["Șah", "joc de strategie pe o tablă de 64 de pătrate"],
    ["Fotbal", "sport cu două echipe de câte 11 jucători"],
    ["Pisica domestică", "mamifer carnivor mic, domesticit acum aproximativ 10.000 de ani"],
    ["Câinele", "mamifer domesticit, din lup, acum cel puțin 15.000 de ani"],
    ["Pâinea", "aliment din făină, apă și, de regulă, drojdie"],
    ["Cafeaua", "băutură din semințele prăjite ale arborelui de cafea"],
    ["Ceaiul", "băutură din frunzele plantei Camellia sinensis"],
    ["Apa", "H₂O; acoperă 71% din suprafața Pământului"],
    ["Internetul", "rețea mondială de rețele; protocolul TCP/IP, 1983"],
    ["Wikipedia", "enciclopedie liberă, din 2001"],
    ["Wikipedia în limba română", "din 2003; aproximativ 500.000 de articole"],
    ["Fișier ZIM", "format de arhivă pentru conținut web citit fără internet"],
    ["Kiwix", "program pentru citirea Wikipediei fără internet, din fișiere ZIM. Fișierul nu are filtru; filtrul, dacă există, este în program, și se oprește de acolo, de la numele fișierului"]
  ];

  /* ascunse fără nicio vorbă: căutarea lor întoarce altceva */
  var ASCUNSE = [
    ["Recep Tayyip Erdoğan", "politician turc, prim-ministru 2003-2014, președinte din 2014"],
    ["Partidul Republican al Poporului (CHP)", "partid turc, fondat de Atatürk în 1923; opoziție"],
    ["Ekrem İmamoğlu", "primar al Istanbulului din 2019, arestat în martie 2025"],
    ["Partidul Justiției și Dezvoltării (AKP)", "partid turc, la guvernare din 2002"],
    ["Protestele din parcul Gezi", "Istanbul, 2013"],
    ["Kemal Kılıçdaroğlu", "președinte al CHP 2010-2023, candidat la prezidențiale în 2023"],
    ["Cumhuriyet (ziar)", "cotidian turc fondat în 1924; redactorii lui, judecați și închiși în 2016-2018"],
    ["Can Dündar", "fost redactor-șef al ziarului Cumhuriyet, condamnat în 2016, în exil"],
    ["Tentativa de lovitură de stat din Turcia din 2016", "15 iulie 2016; peste 150.000 de persoane arestate sau demise după"],
    ["Articolul 299 din Codul Penal al Turciei", "insultarea Președintelui; închisoare de la unu la patru ani; peste 200.000 de anchete între 2014 și 2020"]
  ];

  /* cuvintele care nu se caută, și ocolirile lor cunoscute; toate se potrivesc aproximativ */
  var BLOCATE = [
    "erdogan", "erdohan", "erdogun", "erdowan", "chp", "cumhuriyethalkpartisi", "akp", "akparti", "akparty",
    "adaletvekalkinma", "imamoglu", "kilicdaroglu", "ozgurozel", "demirtas", "hdp", "demparti", "gulen", "feto",
    "hizmet", "darbe", "15temmuz", "lovitura", "gezi", "taksim", "kavala", "dundar", "cumhuriyet", "sozcu",
    "evrensel", "birgun", "halktv", "insultarea", "presedintelui", "299", "301", "genocidularmean", "pkk",
    "ocalan", "kurzi", "kurd", "bahceli", "mhp", "soylu", "albayrak", "bilalerdogan", "emineerdogan",
    "dictator", "autocrat", "sultan", "saray", "cenzura", "erisimengeli", "yasak", "wikipediaturcia", "blocat"
  ];
  var OCOLIRI = [
    "recep", "tayyip", "tayip", "rte", "reis", "ekrem", "kemal", "partidulrepublican", "partiduljustitiei",
    "fethullah", "selahattin", "osman", "can", "ozgur", "devlet", "suleyman", "berat", "emine", "bilal",
    "presedinteleturciei", "primarulistanbulului", "opozitiaturca", "presaturca", "jurnalisti", "alegeri2023",
    "alegeri2019", "istanbul2019", "referendum2017", "starede urgenta", "stareurgenta", "ohal", "ak", "parti",
    "party", "partisi", "halk", "adalet", "kalkinma", "cumhur", "millet", "ittifak", "alianta", "saraiul",
    "palat", "paltul", "besteppe", "erdo", "erd", "rdogan", "dogan", "edrogan", "ergodan", "erdogn", "erdogam",
    "r.t.e", "rt erdogan", "erdoğ", "tayyib", "tayyeb", "receb", "rejep", "rajab", "imam", "oglu", "kilic",
    "daroglu", "gülen", "gulenist", "putsch", "puci", "coup", "lovitura de stat", "2016", "temmuz", "iulie2016"
  ];

  var filtru = true;      /* pasul 2: se oprește din numele fișierului, cu trei apăsări */
  var apasari = 0;

  function simplu(s) {
    var t = window.Manual && window.Manual.simplifica ? window.Manual.simplifica(s).text
      : s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return t;
  }

  /* pentru detectare: fără spații și semne, cu cifrele citite ca litere */
  function strans(s) {
    return simplu(s).replace(/[0]/g, "o").replace(/[1!|]/g, "i").replace(/3/g, "e").replace(/4|@/g, "a")
      .replace(/5|\$/g, "s").replace(/7/g, "t").replace(/[^a-z0-9]/g, "");
  }

  function distanta(a, b) {
    var m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    var r = [];
    for (var i = 0; i <= m; i++) { r[i] = [i]; }
    for (var j = 1; j <= n; j++) r[0][j] = j;
    for (i = 1; i <= m; i++) {
      for (j = 1; j <= n; j++) {
        r[i][j] = Math.min(r[i - 1][j] + 1, r[i][j - 1] + 1, r[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
    }
    return r[m][n];
  }

  /* seamănă: conține termenul, sau este un început al lui, sau diferă prin una-două litere */
  function seamana(q, termen) {
    if (q.indexOf(termen) > -1) return true;
    if (q.length >= 3 && termen.indexOf(q) === 0) return true;
    var toleranta = termen.length <= 4 ? 0 : termen.length <= 7 ? 1 : 2;
    if (Math.abs(q.length - termen.length) <= toleranta && distanta(q, termen) <= toleranta) return true;
    /* sau o bucată a interogării, de lungimea termenului */
    for (var i = 0; i + termen.length <= q.length && termen.length > 4; i++) {
      if (distanta(q.substr(i, termen.length), termen) <= toleranta) return true;
    }
    return false;
  }

  function potriveste(a, nq) {
    return simplu(a[0]).indexOf(nq) > -1 || simplu(a[1]).indexOf(nq) > -1;
  }

  function scrie(rezultate, nota) {
    lista.innerHTML = rezultate.slice(0, 7).map(function (a) {
      return "<li" + (a[2] ? ' class="kiwix-ascuns"' : "") + "><b>" + a[0] + "</b><span>" + a[1] + "</span></li>";
    }).join("");
    stare.hidden = !nota;
    stare.innerHTML = nota || "";
  }

  var NIMIC = "<p>Niciun articol. Indexul de aici are " + OBISNUITE.length + " intrări; cel adevărat are aproximativ 500.000.</p>";

  function cauta(q) {
    var brut = q.trim();
    /* pasul 3: ghilimelele. Hotărârea se aplică cuvintelor căutate, nu expresiilor exacte. */
    var exact = /^["„](.+)["”]$/.exec(brut);
    var nq = simplu(exact ? exact[1] : brut);
    if (!nq) { scrie([]); return; }
    var s = strans(brut);

    var obisnuite = OBISNUITE.filter(function (a) { return potriveste(a, nq); });
    var ascunse = ASCUNSE.filter(function (a) { return potriveste(a, nq); });
    var blocat = BLOCATE.some(function (b) { return seamana(s, b); });
    var ocolire = OCOLIRI.some(function (o) { return seamana(s, o); });

    if (filtru) {
      /* filtrul pornit: cele ascunse nu există; cine caută „erdogan” primește pădurea, și avertismentul */
      if (ocolire || blocat) {
        scrie(obisnuite,
          '<p class="kiwix-turc">Erişim engelini aşma girişimi tespit edildi.</p>' +
          "<p>Tentativă de ocolire, consemnată, împreună cu ora. Rezultatele de mai sus sunt cele care există.</p>" +
          '<p><button type="button" class="kiwix-cerere" data-pas="1">Cere afișarea din altă jurisdicție</button></p>');
        return;
      }
      scrie(obisnuite, obisnuite.length ? "" : NIMIC);
      return;
    }

    if ((ascunse.length || blocat) && !exact) {
      scrie(obisnuite,
        '<p class="kiwix-turc">Bu internet sitesine erişim mahkeme kararıyla engellenmiştir.</p>' +
        "<p>Filtrul este oprit, dar hotărârea judecătorească rămâne: articolul 299, insultarea Președintelui. " +
        "Hotărârea se aplică cuvintelor căutate; o expresie exactă, între ghilimele, nu este un cuvânt.</p>");
      return;
    }
    var toate = ascunse.map(function (a) { return [a[0], a[1], true]; }).concat(obisnuite);
    if (!toate.length) { scrie([], NIMIC); return; }
    scrie(toate, ascunse.length ? "<p>Fișierul ZIM nu are hotărâre judecătorească. Manualul de față este, tehnic, ilegal sub același articol, " +
      "pentru că lecția 3.5 este critică; îl citesc oricum și cei din Turcia.</p>" : "");
  }

  /* procedura de afișare din altă jurisdicție: patru pași, o așteptare, un răspuns */
  var JURISDICTII = ["România", "Uniunea Europeană", "Elveția", "Turcia"];
  var cerere = { pas: 0, jurisdictie: "", declarat: false };

  function afiseazaCererea() {
    var h = "";
    if (cerere.pas === 1) {
      h = "<p><b>Pasul 1 din 4:</b> Alegeți jurisdicția din care cereți afișarea:</p><p>" +
        JURISDICTII.map(function (j) { return '<button type="button" class="kiwix-cerere" data-pas="2" data-j="' + j + '">' + j + "</button> "; }).join("") + "</p>";
    } else if (cerere.pas === 2) {
      h = "<p><b>Pasul 2 din 4:</b> Declarație pe propria răspundere: nu mă aflu pe teritoriul pe care se aplică hotărârea, " +
        "nu voi transmite conținutul acolo și înțeleg că fișierul ZIM nu are hotărâre judecătorească.</p>" +
        '<p><button type="button" class="kiwix-cerere" data-pas="3">Declar</button> ' +
        '<button type="button" class="kiwix-cerere" data-pas="0">Nu declar</button></p>';
    } else if (cerere.pas === 3) {
      h = "<p><b>Pasul 3 din 4:</b> Se verifică jurisdicția declarată, ora, adresa și dacă ați citit pasul&nbsp;2.</p>" +
        '<div class="kiwix-bara-verif"><span></span></div>';
      setTimeout(function () { cerere.pas = 4; afiseazaCererea(); }, 3200);
    } else if (cerere.pas === 4) {
      var nq = simplu(camp.value.trim());
      var ascunse = ASCUNSE.filter(function (a) { return potriveste(a, nq); });
      var apropiate = ascunse.length ? ascunse : ASCUNSE.filter(function (a) {
        return OCOLIRI.some(function (o) { return seamana(strans(camp.value), o) && strans(a[0] + a[1]).indexOf(o) > -1; });
      });
      if (cerere.jurisdictie === "Turcia") {
        h = "<p><b>Pasul 4 din 4:</b> Cererea a fost respinsă: jurisdicția declarată este chiar cea a hotărârii. " +
          "Se poate depune din nou, din alta.</p>" +
          '<p><button type="button" class="kiwix-cerere" data-pas="1">Depune din nou</button></p>';
      } else {
        h = "<p><b>Pasul 4 din 4:</b> Afișat pentru jurisdicția „" + cerere.jurisdictie + "”. Pe teritoriul hotărârii, pagina rămâne blocată; " +
          "articolul este același.</p>" +
          '<p><button type="button" class="kiwix-cerere" data-pas="0">Închide</button></p>';
        lista.innerHTML = apropiate.map(function (a) {
          return '<li class="kiwix-ascuns"><b>' + a[0] + "</b><span>" + a[1] + "</span></li>";
        }).join("") + lista.innerHTML;
      }
    }
    if (cerere.pas === 0) { cauta(camp.value); return; }
    stare.hidden = false;
    stare.innerHTML = h;
  }

  stare.addEventListener("click", function (e) {
    var b = e.target.closest(".kiwix-cerere");
    if (!b) return;
    if (b.getAttribute("data-j")) cerere.jurisdictie = b.getAttribute("data-j");
    cerere.pas = parseInt(b.getAttribute("data-pas"), 10);
    afiseazaCererea();
  });

  fisier.addEventListener("click", function () {
    apasari++;
    if (apasari >= 3) {
      filtru = !filtru;
      apasari = 0;
      fisier.textContent = fisier.textContent.replace(/ · filtru: (pornit|oprit)$/, "") + " · filtru: " + (filtru ? "pornit" : "oprit");
      cauta(camp.value);
    }
  });

  camp.addEventListener("input", function () { cauta(camp.value); });
  cauta(camp.value);
})();
