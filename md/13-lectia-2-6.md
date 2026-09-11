# Lecția 2.6: Tehnologia deceniului 2001-2008

Deceniul precedent a adus calculatorul în locuință. Acesta îl scoate din locuință și îl leagă permanent la rețea. Tot acum se schimbă modul de finanțare a serviciilor online, iar consecințele acestei schimbări depășesc domeniul tehnic.

## 1. Calculatorul portabil

În martie 2003, Intel a lansat platforma Centrino, formată din trei componente proiectate să funcționeze împreună: un procesor cu consum redus, un set de circuite auxiliare și un adaptor de rețea fără fir integrat.

Portabilitatea calculatoarelor era limitată:

- masa unui calculator portabil obișnuit se situa între 2,5 și 3,5 kilograme, la care se adăuga alimentatorul;
- autonomia era de două până la trei ore;
- prețul depășea cu 30-50% prețul unui calculator fix cu performanțe comparabile.

| Categorie | Situația în deceniul 2001-2008 |
|---|---|
| Calculatoare fixe | rămân majoritare în locuințe, în școli și în birouri până spre sfârșitul deceniului |
| Calculatoare portabile | folosite pentru deplasare și pentru lucru în afara biroului, cu vânzări în creștere rapidă |
| Momentul depășirii | vânzările mondiale de portabile le-au depășit pe cele de calculatoare fixe în jurul anului 2008 |

## 2. Conexiunea permanentă

Legătura prin modem telefonic a fost înlocuită de conexiuni permanente prin cablu coaxial și prin linie telefonică digitală. Conexiunea permanentă a eliminat operațiunea de conectare la fiecare folosire.

Rețelele locale fără fir, standardizate în 1999 și îmbunătățite în 2003, au permis conectivitatea la net în întregi locuințe.

#### Cazul românesc

În România, acoperirea s-a făcut prin rețele de cartier construite de firme mici, care trăgeau cablu între blocuri și vindeau abonamente ieftine. Aceste rețele au fost cumpărate ulterior de operatori mari și înlocuite cu fibră optică. Rezultatul, vizibil în deceniul următor, a fost o viteză medie de conectare superioară mediei europene, într-o țară cu venituri mult sub aceeași medie.

## 3. Serverele deceniului

#### Windows Server 2003

Lansat în aprilie 2003, este primul sistem Microsoft care poartă numele Windows Server; versiunile anterioare se numeau Windows NT Server și Windows 2000 Server. Arhitectura este cea descrisă în lecția 1.6. Administrarea se face prin interfață grafică, iar serviciul de director păstrează într-un singur loc conturile de utilizator, calculatoarele și drepturile de acces dintr-o organizație.

Costul licențierii are două componente: licența serverului și câte o licență de acces[^5] pentru fiecare utilizator sau echipament care se conectează la el. Suma crește proporțional cu numărul de angajați și se plătește din nou la trecerea la o versiune nouă. Pentru o firmă mică sau pentru o școală, acest model devenea greu de susținut.

#### Linux pe servere

Linux a devenit în acest deceniu sistemul dominant pe servere, din trei motive tehnice și unul economic:

- funcționează fără interfață grafică[^6], ceea ce eliberează memorie și putere de procesare pentru serviciul propriu-zis;
- se administrează de la distanță, prin comenzi text, pe conexiuni slabe;
- permite modificarea și recompilarea componentelor pentru sarcina cerută;
- licența nu costă nimic, iar plata se face pentru asistență tehnică, atunci când organizația o cere.

Combinația formată din Linux, serverul web Apache, baza de date MySQL și limbajul PHP a devenit configurația obișnuită pentru găzduirea paginilor web, iar Apache a rămas cel mai folosit server web pe tot parcursul deceniului. Distribuțiile comerciale cu asistență plătită, apărute în aceeași perioadă, au separat programul, gratuit, de serviciul de asistență, contra cost.

| Element | Windows Server 2003 | Linux |
|---|---|---|
| Costul licenței | licență de server plus licențe de acces pentru fiecare client | fără cost |
| Costul asistenței | inclus parțial, contract separat pentru restul | contract separat, opțional |
| Administrare | interfață grafică, direct pe server | comenzi text, de la distanță |
| Funcționare fără interfață grafică | limitată | obișnuită |
| Utilizare tipică în epocă | rețele de birou, servicii de director, aplicații ale companiei | găzduire web, poștă electronică, baze de date |

#### Linux pe stațiile de lucru

Mediile grafice au ajuns la maturitate în aceeași perioadă: KDE 3 a fost lansat în 2002, iar GNOME 2 în același an. Distribuția Ubuntu, apărută în 2004, a simplificat instalarea de aplicații. Programele necesare muncii de birou au apărut în paralel: suita OpenOffice.org în 2002 și navigatorul Firefox în 2004.

Rezultatul a fost un sistem folosibil zilnic pe o stație de lucru. Limitele care au rămas privesc programele pentru echipamente periferice, unde producătorii furnizau componente doar pentru Windows, și compatibilitatea deplină cu formatele de fișiere ale suitei de birou dominante.

## 4. Ce s-a construit pe această infrastructură

| Anul | Serviciul | Ce a schimbat |
|---|---|---|
| 1998-2000 | motorul de căutare Google și sistemul său de reclame | ordonarea accesului la informație după relevanță calculată |
| 2003 | Skype | convorbiri internaționale fără taxare pe minut |
| 2003-2004 | MySpace, Facebook | profilul personal ca formă principală de prezență online |
| 2005 | YouTube, cumpărat în 2006 | distribuția video fără televiziune |
| 2006 | Twitter | mesaje scurte publice |
| 2007 | iPhone | rețeaua în buzunar, cu magazin de aplicații din 2008 |

În România, comunicarea directă s-a concentrat în această perioadă pe serviciile de mesagerie instantanee, folosite masiv de elevi și de studenți, iar rețelele sociale internaționale au ajuns dominante spre sfârșitul deceniului.

## 5. Modelul economic: publicitatea

Serviciile enumerate mai sus au fost oferite gratuit. Costurile au fost acoperite din publicitate, printr-un mecanism format din trei elemente:

1. **Licitația:** spațiul publicitar asociat unei căutări sau unei pagini este vândut prin licitație automată, în fracțiuni de secundă.
2. **Țintirea:** prețul plătit depinde de cât de bine corespunde utilizatorul profilului căutat de cel care plătește reclama.
3. **Colectarea datelor:** precizia țintirii depinde de cantitatea de informație despre utilizator, ceea ce transformă datele de comportament în resursă economică.

Veniturile companiei Google, care a dezvoltat acest model, au crescut de la aproximativ trei miliarde de dolari în 2004, anul listării la bursă, la peste douăzeci de miliarde în 2008, aproape integral din publicitate. În 2007, aceeași companie a cumpărat DoubleClick, cea mai mare firmă de publicitate online, consolidând poziția.

## 6. Rețeaua ca piață internațională

În paralel, comerțul a devenit funcția principală a unei părți importante din rețea:

- platformele de licitații și de vânzare au legat vânzători și cumpărători din state diferite;
- sistemele de plată online au rezolvat problema încrederii între părți care nu se cunosc;
- companii asiatice de comerț online, înființate la sfârșitul anilor '90, au ajuns la dimensiuni comparabile cu cele americane;
- a apărut o industrie dedicată poziționării paginilor în rezultatele căutării, ceea ce a schimbat modul în care este scris textul publicat online.

Ordinea rezultatelor unei căutări a devenit astfel o problemă economică, iar accesul la informație a ajuns să depindă de un clasament calculat după criterii nepublice.

> #### INTERPRETARE: ce a produs finanțarea prin publicitate
>
> #### Ce este documentat
>
> Veniturile din publicitatea online au crescut continuu din 2003. Serviciile finanțate astfel au concentrat majoritatea utilizatorilor. Măsurarea timpului petrecut de utilizator a devenit criteriul principal de proiectare a interfețelor. Forumurile tematice și grupurile de discuții independente și-au pierdut utilizatorii în favoarea platformelor mari.
>
> #### Citirea A: separarea socială
>
> Un serviciu finanțat din publicitate are nevoie de timp de expunere, nu de conversații încheiate. Interfața este proiectată pentru a prelungi șederea, iar materialul afișat este ales pentru acest scop. Relația directă dintre utilizatori, care era funcția rețelei în deceniul precedent, devine un element secundar. Procesul este greu reversibil, întrucât serviciile alternative au nevoie de utilizatori pe care platformele dominante îi rețin.
>
> #### Citirea B: schimbarea populației și a suportului
>
> Rețeaua a trecut, în același interval, de la o minoritate cu formație tehnică la o parte importantă a populației, iar de la calculatorul fix la telefonul mobil. Aceste două schimbări explică o parte din diferență, independent de modul de finanțare. Comunicarea directă a continuat, mutată în aplicații de mesagerie folosite zilnic de miliarde de persoane.
>
> #### Ce se poate măsura
>
> Ponderea veniturilor din publicitate în cifra de afaceri a marilor platforme, publicată în rapoartele către investitori; numărul de forumuri independente active, comparat pe ani; proporția timpului petrecut în fluxuri automate față de conversații directe. Subiectul continuă în lecțiile 3.8 și 4.10.

## 7. România în lanțul serviciilor informatice

Scutirea de impozit pe venit pentru salariile din activitatea de creare de programe, introdusă în 2001, a fost menținută mai mult de două decenii. Împreună cu prețul redus al forței de muncă, cu conexiunea rapidă și cu numărul de absolvenți de profil, a atras centre de dezvoltare și de asistență tehnică ale companiilor internaționale.

Poziția obținută este cea de furnizor de servicii pentru clienți externi, cu decizia asupra produsului și cu marca rămase în afara țării. Ea reproduce, într-un sector cu salarii mari, structura descrisă în lecția 2.3 pentru industria prelucrătoare.

## 8. Deceniul în cifre

| Indicator | 2000 | 2008 |
|---|---|---|
| Utilizatori de internet în lume | aproximativ 360 de milioane | aproximativ 1,5 miliarde |
| Abonamente de telefonie mobilă | sub 750 de milioane | aproximativ 4 miliarde |
| Utilizatori ai celei mai mari rețele sociale | serviciul nu exista | 100 de milioane, atinse în august 2008 |
| Ponderea publicității în veniturile principalului motor de căutare | model în formare | peste 95% |

## Activități și exerciții

1. Explicați diferența dintre o conexiune stabilită la cerere și una permanentă. Ce consecințe are aceasta asupra modului de folosire a calculatorului?
2. Descrieți, în ordine, cele trei elemente ale mecanismului publicitar din secțiunea 5. Ce rol are fiecare în stabilirea prețului?
3. Comparați cele două citiri din caseta de interpretare cu cele din lecția 1.6. Ce argument nou apare aici?
4. Discuție în clasă: ordinea rezultatelor unei căutări este stabilită prin criterii nepublicate. Ce consecințe are asta pentru cineva care caută informații despre un subiect controversat?
5. Temă: alegeți un serviciu online pe care îl folosiți zilnic. Aflați cum obține bani și scrieți în spațiul de mai jos ce anume oferiți în schimbul folosirii lui.

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

[^1]: Platformă, în sensul folosit de producătorii de componente, desemnează un set de piese proiectate și testate pentru a funcționa împreună și vândute sub o marcă unică, chiar dacă fiecare piesă poate fi cumpărată separat.

[^2]: Banda largă desemnează o conexiune permanentă cu viteză mult superioară celei obținute prin modem telefonic. Pragul care definește termenul a crescut odată cu tehnologia.

[^3]: Licitația în timp real este procedura prin care spațiul publicitar de pe o pagină este vândut în intervalul dintre cererea paginii și afișarea ei, către ofertantul care plătește cel mai mult pentru afișarea către acel utilizator.

[^4]: Optimizarea pentru motoarele de căutare desemnează ansamblul metodelor prin care o pagină este modificată pentru a apărea mai sus în rezultate. Ea influențează structura, lungimea și vocabularul textelor publicate online.

[^5]: Licența de acces este dreptul, plătit separat de licența serverului, ca un utilizator sau un echipament să se conecteze la acel server. Numărul necesar se calculează după numărul de utilizatori sau de dispozitive, iar costul total crește odată cu organizația.

[^6]: Funcționarea fără interfață grafică, numită și mod headless, înseamnă că sistemul rulează fără monitor și fără mediu grafic, iar administratorul lucrează prin comenzi text transmise de la distanță.
