/* Fișa manualului. „domnitor”: o imitație a cutiei de scris către un model de limbaj; nu generează nimic. */

(function () {
  "use strict";

  /* „domnitor”: o imitație a cutiei de scris către un model de limbaj; nu generează nimic */
  var chat = document.getElementById("cutie-domnitor");
  if (chat) {
    var camp = chat.querySelector(".chat-camp");
    var rasp = chat.querySelector(".chat-raspuns");
    /* răspunsul dispare singur după câteva secunde */
    var stingeRaspunsul = null;
    new MutationObserver(function () {
      clearTimeout(stingeRaspunsul);
      if (!rasp.hidden) stingeRaspunsul = setTimeout(function () { rasp.hidden = true; }, 6000);
    }).observe(rasp, { attributes: true, childList: true, characterData: true, subtree: true });
    /* modelele accesibile în septembrie 2026, cum apar în lecțiile 4.8 și 4.9 și în
       clasamentele publice, plus cele vechi, care încă rulează în KoboldAI */
    /* fiecare model: nume, însușiri (cel puțin una), și ce comandă are: „efort”
       la modelele Anthropic care îl cunosc, „gândire” la cele cu raționament comutabil */
    var MODELE = [
      ["Anthropic", [
        ["Fable 5.1", ["nou", "cel mai capabil", "gândire"], "efort"],
        ["Fable 5", ["capabil", "agenți de durată"], "efort"],
        ["Opus 5", ["cod", "lucru profesional", "a scris aici"], "efort"],
        ["Sonnet 5", ["zilnic", "echilibrat"], "efort"],
        ["Haiku 4.5", ["rapid", "ieftin"], ""],
        ["Mythos 5.1", ["acces restrâns", "gândire"], "efort"]
      ]],
      ["OpenAI", [
        ["GPT-6 Astra", ["nou", "gândire"], "gandire"],
        ["GPT-5.6 Sol", ["lucru greu", "gândire"], "gandire"],
        ["GPT-5.6", ["zilnic"], ""]
      ]],
      ["Google", [
        ["Gemini 3.8 Flash", ["nou", "rapid", "multimodal"], "gandire"],
        ["Gemini 3.7 Flash", ["rapid", "agenți"], "gandire"]
      ]],
      ["Moonshot AI", [
        ["Kimi K3", ["parametri publicați", "interfețe web", "gândire"], "gandire"],
        ["Kimi K2.7 Code", ["parametri publicați", "cod"], ""]
      ]],
      ["DeepSeek", [
        ["DeepSeek V4 Pro", ["gândire ieftină"], "gandire"],
        ["DeepSeek V4", ["parametri publicați", "ieftin"], "gandire"]
      ]],
      ["Zhipu AI", [["GLM-5.2", ["parametri publicați", "agenți"], "gandire"]]],
      ["Alibaba", [["Qwen 3.7", ["parametri publicați", "multe mărimi"], "gandire"]]],
      ["MiniMax", [["MiniMax M3", ["voce", "video"], ""]]],
      ["Meta", [
        ["Llama 4 Maverick", ["parametri publicați", "de modificat"], ""],
        ["Llama 4 Scout", ["parametri publicați", "context lung"], ""]
      ]],
      ["Mistral", [
        ["Mistral Large 3", ["european"], ""],
        ["Mistral Small 4", ["parametri publicați", "rulare locală"], ""]
      ]],
      ["xAI", [["Grok 4.6", ["gândire", "postările de pe X"], "gandire"]]],
      ["Vechi, în KoboldAI", [
        ["GPT-2", ["TensorFlow"], ""],
        ["GPT-Neo 2.7B", ["TensorFlow"], ""],
        ["GPT-J 6B", ["TensorFlow"], ""]
      ]]
    ];
    /* ce se poate adăuga, pe familii; fiecare listă este a unui singur producător */
    var SPECIFIC = {
      "Anthropic": ["Skills", "Proiecte", "Artefacte", "Conectori", "Cod, în terminal"],
      "OpenAI": ["Canvas", "Memorie", "Agent", "Imagini generate"],
      "Google": ["Google Drive", "Deep Research", "Gemini Live"],
      "Moonshot AI": ["Parametri publicați, 1,56 TB", "Interfețe web generate"],
      "DeepSeek": ["Mod de gândire ieftin"],
      "Zhipu AI": ["Rulare locală", "Agent"],
      "Alibaba": ["Rulare locală", "Mod de gândire"],
      "MiniMax": ["Voce", "Video"],
      "Meta": ["Rulare locală, fără cont"],
      "Mistral": ["Le Chat", "Rulare locală"],
      "xAI": ["Postările de pe X", "Mod fără filtru"],
      "Vechi, în KoboldAI": ["Poveste continuată cuvânt cu cuvânt", "Memorie de 2048 de semne", "O placă grafică de acasă"]
    };
    var familie = "Anthropic";
    var model = "Opus 5";
    var meniuModel = chat.querySelector("#meniu-model");
    var meniuPlus = chat.querySelector("#meniu-plus");
    var bModel = chat.querySelector(".chat-model");
    var bPlus = chat.querySelector(".chat-plus");

    function element(text, atribute) {
      return "<li><button type=\"button\"" + (atribute || "") + ">" + text + "</button></li>";
    }
    /* meniu în cascadă: producătorii într-o coloană, modelele fiecăruia într-un submeniu la dreapta */
    function umpleModele() {
      meniuModel.innerHTML = MODELE.map(function (f) {
        var actual = f[0] === familie;
        return '<li class="chat-grup"' + (actual ? ' data-actual="true"' : "") + '>' +
          '<button type="button" class="chat-pliaza" data-grup="' + f[0] + '" aria-haspopup="true" aria-expanded="false">' +
          f[0] + '<span class="chat-sageata">&gt;</span></button>' +
          '<ul class="chat-submeniu" hidden>' + f[1].map(function (m) {
            var nume = m[0];
            var insigna = '<span class="chat-insigna">' + m[1].join(" · ") + "</span>";
            return element(nume + insigna, ' data-familie="' + f[0] + '" data-model="' + nume + '" data-comanda="' + m[2] + '"' +
              (nume === model ? ' aria-current="true"' : ""));
          }).join("") + "</ul></li>";
      }).join("");
    }
    function deschideGrupul(grup) {
      meniuModel.querySelectorAll(".chat-grup").forEach(function (li) {
        var pe = li === grup;
        li.querySelector(".chat-submeniu").hidden = !pe;
        li.querySelector(".chat-pliaza").setAttribute("aria-expanded", pe ? "true" : "false");
      });
    }
    meniuModel.addEventListener("mouseover", function (e) {
      var grup = e.target.closest(".chat-grup");
      if (grup) deschideGrupul(grup);
    });
    /* numai ce este al modelului ales; fișierele și imaginile le au toate și nu spun nimic */
    function umplePlus() {
      meniuPlus.innerHTML = (SPECIFIC[familie] || []).map(function (x) { return element(x); }).join("");
    }
    function inchideMeniurile() {
      meniuModel.hidden = true;
      meniuPlus.hidden = true;
      bModel.setAttribute("aria-expanded", "false");
      bPlus.setAttribute("aria-expanded", "false");
      var me = chat.querySelector("#meniu-efort");
      var po = chat.querySelector("#popup-limita");
      var ps = chat.querySelector("#popup-suparare");
      if (ps) { ps.hidden = true; chat.querySelector(".chat-suparare").setAttribute("aria-expanded", "false"); }
      if (me) { me.hidden = true; chat.querySelector(".chat-efort").setAttribute("aria-expanded", "false"); }
      if (po) { po.hidden = true; chat.querySelector(".chat-foc").setAttribute("aria-expanded", "false"); }
    }
    bModel.addEventListener("click", function () {
      var era = !meniuModel.hidden;
      inchideMeniurile();
      if (!era) { umpleModele(); meniuModel.hidden = false; bModel.setAttribute("aria-expanded", "true"); }
    });
    bPlus.addEventListener("click", function () {
      var era = !meniuPlus.hidden;
      inchideMeniurile();
      if (!era) { umplePlus(); meniuPlus.hidden = false; bPlus.setAttribute("aria-expanded", "true"); }
    });
    /* efortul și focul există numai la modelele Anthropic */
    var meniuEfort = chat.querySelector("#meniu-efort");
    var bEfort = chat.querySelector(".chat-efort");
    var bFoc = chat.querySelector(".chat-foc");
    var popup = chat.querySelector("#popup-limita");
    /* fiecare producător are supărarea lui; la Anthropic este focul limitei */
    var SUPARARI = {
      "OpenAI": ["stea", "Care răspuns preferați?", "Alegerea dumneavoastră va ajuta la îmbunătățirea modelului. Răspunsul 1 și răspunsul 2 diferă printr-o virgulă.", "Răspunsul 1"],
      "Google": ["cont", "Nu am permisiunea de a accesa Google Drive", "Extensia pentru Drive este pornită, în setări, dar Gemini spune că nu are consimțământul. Porniți-o din nou; uneori merge.", "Pornește extensia"],
      "Moonshot AI": ["telefon", "Verificare prin SMS", "Autentificarea cere un cont Google sau un număr de telefon. Codul prin SMS ajunge greu la numerele din afara Chinei.", "Retrimite codul"],
      "DeepSeek": ["ocupat", "Serverul este ocupat", "Serverul este ocupat. Încercați din nou mai târziu.", "Încearcă din nou"],
      "Zhipu AI": ["telefon", "Număr de telefon din China", "Înregistrarea pe platforma Zhipu cere un număr de telefon chinezesc sau verificarea unei firme. Prefixele +40, +1, +44 sunt respinse la înscriere.", "Am un număr"],
      "Alibaba": ["cont", "Verificare cu nume real", "Model Studio cere verificarea identității și alimentarea contului; după cota gratuită, contul trece pe plata la consum.", "Verifică identitatea"],
      "MiniMax": ["sunet", "Vocea cere abonament", "Planul Starter pentru audio costă 5 dolari pe lună și cuprinde 100.000 de credite. Textul rămâne gratuit.", "Abonează-te"],
      "Meta": ["ochi", "Postările dumneavoastră antrenează modelul", "În Uniunea Europeană, postările publice de pe Facebook și Instagram sunt folosite la antrenare, dacă nu trimiteți formularul de obiecție.", "Deschide formularul"],
      "Mistral": ["cookie", "Acceptați cookie-urile?", "La prima vizită, bannerul cere acceptarea cookie-urilor care nu sunt strict necesare, pe categorii. Le Chat se numește acum Vibe; bannerul a rămas.", "Accept tot"],
      "xAI": ["x", "Este nevoie de X Premium", "Din martie 2026, „Ask Grok” din fire este numai pentru abonații Premium, 8 dolari pe lună, sau Premium+, 40 de dolari pe lună.", "Abonează-te"],
      "Vechi, în KoboldAI": ["memorie", "RuntimeError: CUDA out of memory", "Placa grafică nu mai are memorie pentru prompt. Sugestia din eroare: setați max_split_size_mb, ca să evitați fragmentarea. Sau un model mai mic.", "Încearcă din nou"]
    };
    var bSuparare = chat.querySelector(".chat-suparare");
    var popupSuparare = chat.querySelector("#popup-suparare");
    function pregatesteSupararea() {
      var sup = SUPARARI[familie];
      chat.querySelector(".chat-loc-suparare").hidden = !sup;
      if (!sup) return;
      bSuparare.querySelector(".ico").src = "../assets/icoane/" + sup[0] + ".svg";
      bSuparare.querySelector(".chat-suparare-nume").textContent = sup[1];
      popupSuparare.querySelector(".chat-popup-titlu").textContent = sup[1];
      popupSuparare.querySelector(".chat-popup-text").textContent = sup[2];
      popupSuparare.querySelector(".chat-popup-da").textContent = sup[3];
    }
    bSuparare.addEventListener("click", function () {
      var era = !popupSuparare.hidden;
      inchideMeniurile();
      if (!era) { popupSuparare.hidden = false; bSuparare.setAttribute("aria-expanded", "true"); }
    });
    popupSuparare.querySelector(".chat-popup-inchide").addEventListener("click", inchideMeniurile);
    popupSuparare.querySelector(".chat-popup-da").addEventListener("click", function () {
      inchideMeniurile();
      rasp.hidden = false;
      rasp.textContent = "„" + this.textContent + "” este desenat, nu legat. Supărarea rămâne.";
    });

    var comanda = "efort";
    var bGandire = chat.querySelector(".chat-gandire");
    function arataAnthropic() {
      chat.querySelectorAll(".chat-doar-anthropic").forEach(function (el) {
        el.hidden = familie !== "Anthropic";
      });
      chat.querySelector(".chat-loc-efort").hidden = comanda !== "efort";
      bGandire.hidden = comanda !== "gandire";
      pregatesteSupararea();
    }
    bGandire.addEventListener("click", function () {
      var pe = bGandire.getAttribute("aria-pressed") !== "true";
      bGandire.setAttribute("aria-pressed", pe ? "true" : "false");
    });
    bEfort.addEventListener("click", function () {
      var era = !meniuEfort.hidden;
      inchideMeniurile();
      if (!era) { meniuEfort.hidden = false; bEfort.setAttribute("aria-expanded", "true"); }
    });
    meniuEfort.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-efort]");
      if (!b) return;
      meniuEfort.querySelectorAll("button").forEach(function (x) {
        if (x === b) x.setAttribute("aria-current", "true");
        else x.removeAttribute("aria-current");
      });
      chat.querySelector(".chat-efort-nume").textContent = "Efort: " + b.getAttribute("data-efort");
      inchideMeniurile();
    });
    bFoc.addEventListener("click", function () {
      var era = !popup.hidden;
      inchideMeniurile();
      if (!era) {
        popup.querySelector(".chat-ora").textContent = oraRefacerii();
        popup.hidden = false;
        bFoc.setAttribute("aria-expanded", "true");
      }
    });
    popup.querySelector(".chat-popup-inchide").addEventListener("click", inchideMeniurile);
    popup.querySelector(".chat-popup-max").addEventListener("click", function () {
      inchideMeniurile();
      rasp.hidden = false;
      rasp.textContent = "„Treci la Max” este desenat, nu legat. Limita rămâne; manualul nu are limită.";
    });
    arataAnthropic();

    meniuModel.addEventListener("click", function (e) {
      var pl = e.target.closest(".chat-pliaza");
      if (pl) {
        deschideGrupul(pl.closest(".chat-grup"));
        return;
      }
      var b = e.target.closest("button[data-model]");
      if (!b) return;
      model = b.getAttribute("data-model");
      familie = b.getAttribute("data-familie");
      comanda = b.getAttribute("data-comanda") || "";
      chat.querySelector(".chat-model-nume").textContent = model;
      inchideMeniurile();
      arataAnthropic();
    });
    meniuPlus.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      inchideMeniurile();
      rasp.hidden = false;
      rasp.textContent = "„" + b.textContent + "” este desenat, nu legat. Ca multe altele.";
    });

    var banner = chat.querySelector("#banner-limita");
    function oraRefacerii() {
      var ora = new Date();
      ora.setHours(ora.getHours() + 3);
      return (ora.getHours() < 10 ? "0" : "") + ora.getHours() + ":" + (ora.getMinutes() < 10 ? "0" : "") + ora.getMinutes();
    }
    banner.querySelector(".chat-banner-inchide").addEventListener("click", function () { banner.hidden = true; });

    function raspunde() {
      var cerere = camp.value.trim();
      inchideMeniurile();
      /* la un model Anthropic, trimiterea lovește limita */
      if (familie === "Anthropic") {
        banner.querySelector(".chat-ora-banner").textContent = oraRefacerii();
        banner.hidden = false;
        return;
      }
      rasp.hidden = false;
      rasp.textContent = cerere
        ? model + ": nu pot genera un portret de domnitor. Manualul nu are ilustrații, iar domnitorii au deja destule. " +
          "Pot, în schimb, să caut cine a comandat portretul și cine l-a plătit."
        : "Cutia este o imitație. Un model de limbaj a fost folosit la redactare, cum spune ghidul pentru profesori, capitolul 3, nu aici.";
      camp.value = "";
    }
    var bTrimite = chat.querySelector(".chat-trimite");
    bTrimite.addEventListener("click", raspunde);

    /* la modelele avansate, cine ține cursorul destul pe butonul de trimitere află cine a lucrat aici */
    var AVANSATE = ["Fable 5.1", "Fable 5", "Opus 5", "Mythos 5.1", "GPT-6 Astra", "GPT-5.6 Sol", "Gemini 3.8 Flash", "Kimi K3", "DeepSeek V4 Pro", "Grok 4.6"];
    var asteptare = null;
    var marturie = chat.querySelector(".chat-marturie");
    bTrimite.addEventListener("mouseenter", function () {
      if (AVANSATE.indexOf(model) === -1) return;
      asteptare = setTimeout(function () {
        marturie.textContent = model === "Opus 5"
          ? "Acest model, Opus 5, a fost folosit aproape în întregime pentru a ajuta la scrierea programului și a textului manualului."
          : "Un model de acest nivel ar fi putut ajuta la scrierea manualului. Cel folosit a fost Opus 5.";
        marturie.hidden = false;
      }, 2500);
    });
    bTrimite.addEventListener("mouseleave", function () {
      clearTimeout(asteptare);
      marturie.hidden = true;
    });
    camp.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); raspunde(); }
    });
    chat.querySelectorAll(".chat-buton:not(.chat-trimite):not(.chat-model):not(.chat-plus):not(.chat-efort):not(.chat-foc):not(.chat-gandire):not(.chat-suparare)").forEach(function (b) {
      b.addEventListener("click", function () {
        inchideMeniurile();
        rasp.hidden = false;
        rasp.textContent = "Butonul este desenat, nu legat. Ca multe altele.";
      });
    });
  }
})();
