/* Fișa manualului. „proprie”: un calculator care își semnează singur certificatul,
   și ce spune navigatorul despre asta. Avizul de pe pagină este semnat la fel. */

(function () {
  "use strict";

  var b = document.getElementById("buton-proprie");
  var zona = document.getElementById("autosemnat");
  if (!b || !zona) return;

  var ceasuri = [];
  var LINII = [
    ["$ openssl req -x509 -newkey rsa:2048 -keyout cheie.pem -out cert.pem -days 36500 -subj \"/CN=miculpionier\"", 700],
    ["Generating a RSA private key", 500],
    ["........................................+++++", 900],
    ["writing new private key to 'cheie.pem'", 400],
    ["$ openssl x509 -in cert.pem -noout -issuer -subject -dates", 800],
    ["issuer=CN = miculpionier", 300],
    ["subject=CN = miculpionier", 300],
    ["notAfter=Sep 10 00:00:00 2126 GMT", 500],
    ["$ curl https://manual.local/", 900],
    ["curl: (60) SSL certificate problem: self-signed certificate", 600],
    ["More details here: https://curl.se/docs/sslcerts.html", 300],
    ["$ ", 400]
  ];

  function mai(fn, ms) { ceasuri.push(setTimeout(fn, ms)); }

  function opreste() {
    ceasuri.forEach(clearTimeout);
    ceasuri = [];
    zona.hidden = true;
    zona.innerHTML = "";
    b.setAttribute("aria-expanded", "false");
  }

  function porneste() {
    zona.hidden = false;
    b.setAttribute("aria-expanded", "true");
    zona.innerHTML = '<pre class="terminal"></pre>';
    var term = zona.querySelector(".terminal");
    var t = 0;
    LINII.forEach(function (l) {
      t += l[1];
      mai(function () { term.textContent += l[0] + "\n"; }, t);
    });
    mai(function () {
      var av = document.createElement("div");
      av.className = "avertisment-cert";
      av.innerHTML = "<p class=\"avertisment-titlu\">Conexiunea nu este privată</p>" +
        "<p>Atacatorii ar putea încerca să vă fure informațiile de pe manual.local (de exemplu, parole, mesaje sau date bancare). " +
        "<code>NET::ERR_CERT_AUTHORITY_INVALID</code></p>" +
        "<p class=\"mic\">Emitentul și subiectul certificatului sunt aceeași persoană. Certificatul spune despre sine că este de încredere, " +
        "ceea ce nu este o dovadă, ci o declarație. Avizul de pe această pagină este semnat la fel: emitentul și subiectul sunt același elev. " +
        "Diferența este că navigatorul avertizează.</p>" +
        "<p><button type=\"button\" class=\"cert-inapoi\">Înapoi în siguranță</button> <button type=\"button\" class=\"cert-continua\">Continuă către manual.local (nesigur)</button></p>";
      zona.appendChild(av);
      av.querySelector(".cert-inapoi").addEventListener("click", opreste);
      av.querySelector(".cert-continua").addEventListener("click", function () {
        av.innerHTML = "<p>Ați continuat. Pagina este aceeași; certificatul, tot al lui. Cine acceptă o declarație pe cuvânt o face pe răspunderea lui, " +
          "ceea ce este exact ce cere lecția 0 să nu faceți.</p>" +
          "<p><button type=\"button\" class=\"cert-inapoi\">Închide</button></p>";
        av.querySelector(".cert-inapoi").addEventListener("click", opreste);
      });
    }, t + 600);
  }

  b.addEventListener("click", function () {
    if (!zona.hidden) opreste();
    else porneste();
  });
})();
