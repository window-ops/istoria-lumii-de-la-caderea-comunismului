# Ghid pentru autori

## 1. Cum se semnalează o eroare

Erorile și propunerile se trimit la admin@miculpionier.ro, într-o formă fixă, cu patru rânduri: unde, ce scrie, ce ar trebui, sursa. Forma, cu un exemplu complet și cu una goală de copiat, și regulile de adresare sunt în pagina „Cum i se scrie autorului”, alături de acest ghid.

## 2. Markdown, atât cât trebuie

Lecțiile sunt fișiere text cu extensia .md, scrise în Markdown: un mod de a marca titlurile, listele și sublinierile cu semne obișnuite de la tastatură, fără un program anume. Se pot edita în orice editor de text, iar orice program care înțelege Markdown le arată formatate. Ce urmează este tot ce folosește manualul; restul limbajului nu este necesar.

**Titluri:** rândul care începe cu „# ” este titlul lecției și apare o singură dată. „## ” deschide o secțiune, „#### ” un subtitlu în interiorul ei. Manualul nu folosește „### ”, ca subtitlurile să fie vizibil mai mici decât secțiunile. Secțiunile se numerotează în titlu, iar numerotarea nu se face de către program:

```
# Lecția 1.3: România în tranziție (1990-2000)

## 2. Economia: privatizare, cupoane, scheme piramidale

#### Cuponiada
```

**Paragrafe:** un paragraf este un bloc de text; două paragrafe se despart printr-un rând gol. Un singur rând nou în interiorul paragrafului nu se vede:

```
Legea 15/1990 a transformat întreprinderile de stat în societăți comerciale
și regii autonome. Acest rând nou nu se vede.

Acesta este al doilea paragraf.
```

**Subliniere:** două asteriscuri de fiecare parte îngroașă, un asterisc înclină. Îngroșarea se folosește pentru numele autorilor la prima apariție și pentru etichetele din liste; înclinarea pentru titluri de publicații. Nu se folosesc pentru accent:

```
- **Yanis Varoufakis**, ministru de finanțe al Greciei între ianuarie și iulie 2015.
- Ziare de opoziție au existat de la începutul lui 1990: *România liberă*, *22*.
```

**Liste:** un rând care începe cu „- ” este un element de listă fără număr; „1. ”, „2. ” dau o listă numerotată. Exercițiile sunt o listă numerotată. Elementele se scriu unul sub altul, fără rând gol între ele:

```
1. Explicați de ce controlul asupra hârtiei de ziar a fost un instrument politic.
2. Comparați cele două bilanțuri ale zilelor de 13-15 iunie 1990.
```

**Tabele:** prima linie dă capul de tabel, a doua linie desparte capul de corp, fiecare linie următoare este un rând; coloanele se despart cu bare verticale:

```
| Schema | Perioada | Promisiune |
|---|---|---|
| Caritas, Cluj | 1992-1994 | de opt ori suma depusă în trei luni |
```

**Note de subsol:** în text se scrie „[^1]” după cuvântul explicat; la sfârșitul lecției, sub „## Note”, se scrie „[^1]: ” urmat de explicație. Notele explică termeni și instituții, nu trimit la surse:

```
Legea audiovizualului a înființat Consiliul Național al Audiovizualului[^1].

---

## Note

[^1]: Consiliul Național al Audiovizualului este autoritatea care acordă licențele de emisie.
```

**Casete:** o casetă este un bloc de citat, cu „> ” la începutul fiecărui rând, al cărui prim rând este un subtitlu „#### INTERPRETARE: …”, „#### CONCEPT: …” sau „#### SURSĂ: …”. Programul le recunoaște după acest prim cuvânt și le colorează. În interiorul casetei, alte rânduri „> #### ” dau subtitlurile ei: „Ce este documentat”, „Citirea A”, „Citirea B”, „Ce poate stabili elevul”:

```
> #### INTERPRETARE: a schimbat alternanța din 1996 regulile jocului
>
> #### Ce este documentat
>
> Puterea a trecut, în 1996, la coaliția de opoziție, prin alegeri recunoscute ca libere.
>
> #### Citirea A: alternanța a funcționat
>
> Schimbarea pașnică a puterii prin vot este chiar definiția funcționării unui sistem electoral.
>
> #### Citirea B: s-a schimbat personalul, iar mecanismul a rămas
>
> Ambele tabere au tratat companiile de stat ca resursă de distribuit între aliați.
>
> #### Ce poate stabili elevul
>
> Cele două citiri se pot verifica pe date diferite.
```

**Spațiul de temă:** după exercițiul 5 se lasă un rând gol și apoi un bloc de rânduri formate din liniuțe de subliniere, câte unul pe rând. Numărul rândurilor dă mărimea spațiului de scris pe hârtie:

```
5. Temă: scrieți în spațiul de mai jos ce ați răspunde la întrebarea folosită de institutul Levada.

_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
```

**Ce nu se folosește:** imagini, adrese web, cod, formule, text colorat. Nici linia dublă pentru titluri. Linia „---” apare o singură dată, înaintea notelor.

## 3. Cum se scrie o lecție

**Tonul:** lecția descrie, nu laudă și nu condamnă. Persoanele, partidele, statele și companiile apar cu ce au făcut, cu data și cu documentul care o atestă. Nu se folosesc adjective de reverență („marele”, „ilustrul”, „eroicul”, „istoricul”) și nici cele de dispreț; dacă un fapt merită judecat, cititorul îl judecă singur după ce l-a citit. Un test simplu: adjectivul care poate fi tăiat fără ca propoziția să piardă o informație se taie.

**Cititorul:** este o persoană care învață pe cont propriu. I se vorbește cu „scrieți”, „comparați”, „căutați”, nu i se dau îndemnuri, rezumate sau idei principale. Nu i se explică ce ar trebui să simtă. Manualele Editurii Didactice și Pedagogice, cu care au crescut generații de elevi, au obișnuit școala cu un ton care vorbește de sus și cu greșeli de fapt rămase necorectate ediție după ediție; lecția de aici nu preia nici tonul, nici practica.

**Sursele:** fiecare afirmație de fapt are în spate un document care poate fi găsit: o hotărâre, un raport, o statistică, o anchetă cu autor identificat, o declarație publică. Autorul l-a citit înainte de a scrie. Textul parafrazează, nu citează, și nu are note bibliografice, dar numește emitentul și documentul acolo unde afirmația nu este de notorietate: „raportul comisiei parlamentare din 1990”, „rezoluția 713 a Consiliului de Securitate”, „datele Institutului Național de Statistică pentru 2010”. Cititorul trebuie să poată ajunge la sursă pornind de la acest nume. Adresele web nu se scriu, pentru că se strică.

**Regulile de la Wikipedia, aplicate aici:** afirmațiile se pot verifica; pozițiile concurente sunt prezentate cu argumentele lor, proporțional cu greutatea pe care o au în literatură; nu se publică cercetare proprie, adică o concluzie pe care nu a formulat-o nimeni în afara autorului. Cadrul analitic al manualului este o poziție și este anunțat ca atare; el alege întrebările, nu răspunsurile. O lecție care nu poate fi contestată cu datele din ea însăși este scrisă greșit.

**Ce nu se știe:** se scrie că nu se știe. „Nu există o cifră acceptată”, „ancheta nu s-a încheiat”, „cele două bilanțuri diferă”. O acuzație în curs de judecată este scrisă ca acuzație. O cifră contestată vine cu ambele valori și cu cine le susține.

**Interpretarea:** acolo unde datele admit două citiri serioase, se scrie o casetă INTERPRETARE cu patru părți: ce este documentat, citirea A, citirea B, ce poate stabili elevul. Fiecare citire primește argumentele ei cele mai bune, nu o versiune ușor de respins. Caseta nu spune care citire este corectă.

**Lungimea:** o lecție are între 12.000 și 18.000 de semne, cu tot cu exerciții, cât se citește atent într-o oră sau două. Mai scurt este mai bine, atâta vreme cât nu se pierde informație. Secțiunile numerotate au fiecare o întrebare, iar tabelul cronologic vine acolo unde datele sunt multe. Frazele sunt lungi doar cât le cere conținutul.

**Exercițiile:** cinci, în ordinea aceasta: o explicație, o comparație sau o analiză de tabel, un calcul sau o căutare, o dezbatere, o temă scrisă. Primele patru se rezolvă oral. Tema cere ceva ce nu se află în lecție: un preț, un document, o persoană întrebată, o săptămână de observație. Autorul care scrie o temă o face o dată el însuși, ca să știe cât cere. Autorul acestui manual nu a făcut-o, cum spune și ghidul pentru profesori; regula rămâne pentru cine vine după el.

## 4. Cum arată o lecție în fișier

Fiecare lecție este un fișier în folderul „md”, numit după poziția în carte și după numărul lecției: „04-lectia-1-3.md” este a patra piesă a cărții și lecția 1.3. Numărul din față ține ordinea la listare; numărul lecției ține ordinea în unitate. O lecție nouă primește numărul următor din unitatea ei, iar fișierele de după ea se renumerotează.

Fișierul are, în ordinea aceasta:

1. titlul, un singur rând cu „# ”: „# Lecția 1.3: România în tranziție (1990-2000)”;
2. un paragraf de deschidere, fără titlu, care spune ce urmărește lecția;
3. secțiunile numerotate, cu „## 1. ”, „## 2. ” și așa mai departe, fiecare cu subtitlurile ei „#### ” și cu casetele ei;
4. tabelul cronologic, ca secțiune numerotată, acolo unde datele o cer;
5. „## Activități și exerciții”, cu cele cinci exerciții ca listă numerotată, urmate de spațiul de temă din liniuțe;
6. o linie „---”;
7. „## Note”, cu notele de subsol, una pe paragraf.

Paginile web ale lecțiilor, din folderul „lectii”, au fost generate o dată din aceste fișiere și de atunci se editează de mână, în paralel cu fișierul .md: o corectură se face în amândouă, iar căutarea în toate fișierele după textul vechi găsește toate locurile în care apare, inclusiv în „tot-manualul.html” și în indexul de căutare. Cine nu vrea să atingă HTML trimite doar fișierul .md corectat la adresa din pagina „Cum i se scrie autorului”, cu rândul „Unde” de acolo, iar transpunerea în pagină o face cine primește mesajul. O lecție nouă se trimite la fel, împreună cu rândul ei din cuprins: unitatea, numărul, titlul.

Înainte de trimitere, autorul verifică: că fiecare afirmație de fapt are un document în spate, pe care l-a văzut; că nu a rămas niciun adjectiv de reverență; că notele explică termeni, nu trimit la surse; că exercițiile sunt cinci și că tema a fost făcută o dată, regulă încălcată de autorul manualului și cerută de la ceilalți; că lecția se citește în mai puțin de două ore. Apoi o dă cuiva să o citească, de preferat cuiva care nu este de acord cu cadrul manualului.
