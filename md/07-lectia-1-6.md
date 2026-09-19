# Lecția 1.6: Tehnologia deceniului

Anii '90 sunt deceniul în care calculatorul a intrat în locuință și rețeaua a devenit publică. Lecția urmărește trei planuri: sistemele de operare care au împărțit piața, forma pe care a luat-o comunicarea între primii utilizatori, și infrastructura care a rămas după prăbușirea bursieră din anul 2000.

## 1. Calculatorul personal devine popular

Prețul componentelor a scăzut constant, iar procesoarele Intel din familiile 486 și Pentium au adus în locuințe o putere de calcul rezervată până atunci instituțiilor. Unitatea de CD-ROM a înlocuit dischetele pentru distribuția programelor. Legătura la rețea se făcea prin modem, pe linia telefonică, la viteze care au crescut de la 14,4 la 56 de kilobiți pe secundă.

#### Windows 95

Lansat la 24 august 1995, cu o campanie publicitară de amploare, sistemul a introdus meniul de pornire, numele lungi de fișiere, funcționarea pe 32 de biți și suportul integrat pentru protocolul de rețea TCP/IP[^1]. Sub interfața nouă rămânea sistemul DOS, ceea ce limita stabilitatea: eroarea unui program putea opri întreaga sesiune de lucru.

#### Windows NT Workstation 4.0

Lansat în vara anului 1996, acest sistem folosea interfața introdusă de Windows 95 peste o arhitectură complet diferită, construită de la început pentru rețele și pentru mai mulți utilizatori:

- nucleul[^2] nu depindea de DOS, iar programele rulau în spații de memorie separate, astfel încât o eroare oprea un singur program;
- sistemul de fișiere NTFS permitea drepturi de acces pe fișier și pe utilizator;
- conturile de utilizator și administrarea centralizată în rețea făceau sistemul potrivit pentru birouri, proiectare tehnică și servere.

Această linie tehnică a continuat cu Windows 2000 și a fuzionat cu linia destinată locuinței în Windows XP, în 2001. Sistemele Windows folosite astăzi provin din arhitectura NT, iar nu din cea a lui Windows 95.

#### Linux

Nucleul de sistem de operare publicat de Linus Torvalds în 1991 și pus în 1992 sub licența publică generală[^3] a fost completat de programele proiectului GNU. Distribuțiile apărute între 1993 și 1995, între care Slackware, Debian și Red Hat, au făcut instalarea accesibilă unui public mai larg.

Pentru utilizarea pe calculatorul personal, mediul grafic a fost un element decisiv. Serverul grafic XFree86, împreună cu mediile KDE, apărut din 1996, și GNOME, apărut la sfârșitul deceniului, au produs un mod de lucru asemănător cu cel din Windows: ferestre, pictograme, meniu de aplicații, gestionar de fișiere. Diferențele au rămas la nivelul licenței, al modului de instalare a programelor și al suportului pentru echipamente.

| Caracteristică | Windows 95 | Windows NT Workstation 4.0 | Linux |
|---|---|---|---|
| Bază tehnică | DOS plus interfață pe 32 de biți | nucleu propriu, fără DOS | nucleu propriu |
| Separarea programelor în memorie | limitată | da | da |
| Drepturi pe utilizator | fără | da | da |
| Licență | comercială, per calculator | comercială, per calculator | liberă, copiere permisă |
| Utilizator obișnuit în epocă | locuință, birou mic | birou mare, proiectare, server | universitate, server, utilizator avansat |
| Continuitate până azi | linie încheiată | baza sistemelor Windows actuale | prezent pe majoritatea serverelor și în Android |

## 2. Rețeaua devine publică

Propunerea pentru sistemul de documente legate între ele a fost formulată de Tim Berners-Lee la CERN în 1989. În 1993, CERN a plasat tehnologia în domeniul public, adică a renunțat la orice pretenție de proprietate asupra ei. În același an a apărut navigatorul Mosaic, urmat în 1994 de Netscape.

În 1995, rețeaua academică americană care forma legătura principală a internetului a fost dezafectată, iar traficul comercial a devenit posibil fără restricții. Din acel moment, numărul de utilizatori a crescut în ritm anual de ordinul zecilor de procente. Motorul de căutare Google a fost înființat în 1998, la capătul unui deceniu de directoare și portaluri.

În România, domeniul de nivel superior .ro a fost înregistrat în 1993. Accesul se făcea prin abonamente de tip dial-up, iar în orașe au apărut sălile de calculatoare cu acces la rețea, folosite deopotrivă pentru poștă electronică și pentru jocuri în rețea locală.

## 3. IRC și cultura utilizatorilor avansați

Protocolul Internet Relay Chat a fost scris în august 1988 de Jarkko Oikarinen, la Universitatea din Oulu. Funcționarea lui explică felul comunităților formate în jurul său:

- rețeaua era formată din servere administrate de voluntari și de universități, fără proprietar unic;
- discuția se purta pe canale deschise, identificate printr-un nume, iar utilizatorul își alegea singur porecla;
- protocolul era public, iar oricine putea scrie un program client propriu.

Două evenimente au făcut IRC cunoscut în afara mediului tehnic. În timpul războiului din Golf, la începutul lui 1991, relatările transmise în direct au adus pentru prima dată peste trei sute de utilizatori simultan pe rețea. În august 1991, în timpul puciului de la Moscova, când transmisiunile de presă erau blocate, utilizatori din Uniunea Sovietică au relatat în direct evenimentele.

#### De ce se formau comunități

Accesul cerea cunoștințe: configurarea unui modem, instalarea unui program client, cunoașterea comenzilor. Bariera tehnică limita platforma la o populație restrânsă și relativ omogenă. Canalele se organizau pe subiecte, iar prezența constantă a acelorași persoane producea relații stabile. Numeroși utilizatori din acea perioadă relatează prietenii formate pe IRC, iar rețeaua a rămas activă și după anul 2000: în primii ani ai deceniului următor, o singură rețea, QuakeNet, a depășit 240.000 de utilizatori conectați simultan.

> #### INTERPRETARE: s-a pierdut funcția socială a rețelei
>
> #### Ce este documentat
>
> Serviciile care au concentrat majoritatea utilizatorilor după 2010 au trecut de la afișarea mesajelor scrise de persoane cunoscute la afișarea materialului selectat automat pentru fiecare utilizator. Interfețele de programare care permiteau accesul din exterior au fost închise sau taxate, între care cele ale Twitter și Reddit în 2023. Forumurile tematice deschise s-au închis în număr mare. Discuția de grup s-a mutat în aplicații închise, unde conținutul nu este accesibil din afară.
>
> #### Citirea A: degradarea platformelor
>
> Un serviciu care trebuie să crească veniturile din publicitate ajunge să afișeze materialul care reține atenția cel mai mult timp. Legăturile între persoane devin un obstacol în calea acestui obiectiv, iar utilizatorul rămâne în poziția de public. Scriitorul Cory Doctorow a formulat această descriere în 2023, iar termenul propus de el a fost ales cuvântul anului de asociațiile de lingvistică din Statele Unite și Australia.
>
> #### Citirea B: s-a schimbat populația
>
> În 1995, rețeaua era folosită de o minoritate cu formație tehnică, selectată de dificultatea accesului. Astăzi este folosită de aproape toată lumea. Ce s-a pierdut este omogenitatea acelei populații. Instrumentele pentru comunități restrânse continuă să existe, iar unele, între care Discord și rețelele bazate pe protocolul Matrix, reproduc structura canalelor din anii '90.
>
> #### Ce se poate verifica
>
> Numărul de utilizatori simultani pe rețelele IRC, publicat de site-uri de statistică din 1998 până astăzi; numărul de forumuri active; proporția timpului petrecut în fluxuri automate față de conversații directe, publicată de companii în rapoartele către investitori. Subiectul revine în lecțiile 3.7 și 4.10.

## 4. Telefonia mobilă

Standardul GSM a fost proiectat de operatorii europeni pentru a înlocui sistemele analogice incompatibile. Primul apel pe o rețea GSM a fost făcut în Finlanda, în 1991, iar primul mesaj scurt a fost transmis în decembrie 1992. Cartelele preplătite, apărute la sfârșitul deceniului, au deschis serviciul pentru clienții fără venit stabil.

În România, primele două rețele GSM au început să funcționeze în aprilie 1997. În statele cu rețea telefonică fixă slab dezvoltată, telefonia mobilă a sărit peste etapa cablului, iar în unele țări africane numărul de abonați mobili a depășit rapid numărul de linii fixe instalate în tot secolul precedent.

## 5. Bula bursieră din anul 2000

Între 1995 și 2000, acțiunile companiilor care activau pe internet au fost evaluate pe baza numărului de utilizatori și a creșterii traficului. Indicele bursier american al companiilor tehnologice a atins maximul la 10 martie 2000, în jurul valorii de 5.048 de puncte, apoi a pierdut cea mai mare parte din valoare în doi ani. Multe companii finanțate în acei ani au dispărut.

Două urmări au rămas:

- cablurile de fibră optică pozate în perioada de expansiune au devenit, după prăbușire, infrastructură ieftină, folosită în deceniul următor pentru servicii video și pentru centrele de date;
- companiile care au supraviețuit, între care Amazon și eBay, au ajuns în poziții dominante într-o piață curățată de concurenți.

## 6. Cine avea acces la sfârșitul deceniului

| Zonă | Ponderea utilizatorilor de internet în populație, în jurul anului 2000 |
|---|---|
| America de Nord | între 30% și 40% |
| Europa Occidentală | între 15% și 25% |
| România | aproximativ 3% |
| Africa, fără Africa de Sud | sub 1% |
| Media mondială | între 4% și 6% |

Diferența dintre aceste valori a primit denumirea de decalaj digital[^4]. Ea explică de ce evenimentele deceniului au fost relatate online aproape exclusiv de utilizatori din America de Nord și din Europa, iar arhivele digitale ale perioadei reflectă această distribuție.

## Activități și exerciții

1. Explicați diferența dintre un sistem în care programele împart aceeași memorie și unul în care fiecare program rulează separat. Ce consecință practică are pentru utilizator?
2. Comparați licența comercială cu licența liberă, folosind tabelul din lecție. Ce obligații are cel care distribuie un program primit sub licență liberă?
3. Identificați un serviciu de comunicare online folosit în anii '90 care mai funcționează astăzi și unul care a dispărut. Ce s-a întâmplat cu conținutul produs pe cel care a dispărut?
4. Dezbatere în clasă, pe baza casetei de interpretare. Fiecare grupă caută mai întâi două date verificabile în sprijinul poziției sale.
5. Temă: întrebați o persoană care folosea internetul înainte de anul 2000 cum ținea legătura cu cunoscuții. Notați în spațiul de mai jos ce servicii a folosit, care dintre ele mai există și ce a luat locul celorlalte.

_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________

---

## Note

[^1]: TCP/IP este familia de protocoale care stabilește cum sunt împărțite datele în pachete, cum sunt adresate și cum se verifică livrarea lor între calculatoare aflate în rețele diferite. Adoptarea ei generalizată a făcut posibilă legarea rețelelor separate într-o singură rețea globală.

[^2]: Nucleul, numit și kernel, este partea sistemului de operare care administrează memoria, procesorul și accesul la echipamente. Programele obișnuite comunică cu echipamentele prin intermediul lui.

[^3]: Licența publică generală, cunoscută prin abrevierea GPL, permite oricui să folosească, să modifice și să redistribuie un program, cu condiția ca versiunile modificate să fie distribuite sub aceeași licență și cu codul sursă disponibil.

[^4]: Decalajul digital desemnează diferența de acces la echipamente, la conexiune și la competențele necesare folosirii lor, între regiuni, între medii urbane și rurale și între categorii de venit.
