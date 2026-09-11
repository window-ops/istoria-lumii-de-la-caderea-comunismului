# Lecția 4.8: Inteligența artificială ca industrie

Lecția 3.8 s-a oprit la modelele care puteau fi rulate pe un calculator personal. Lecția de față urmărește ce s-a întâmplat după 2020: transformarea acestei tehnologii într-o industrie cu cerințe de energie comparabile cu ale unui oraș, ideologiile care o însoțesc, munca pe care se sprijină și disputa privind valorile după care sunt reglate aceste sisteme.

## 1. De la program la infrastructură

Un model de limbaj este, în esență, un calculator cu foarte multe destinații: primește un text și calculează, pe baza a miliarde de valori numerice fixate în timpul antrenamentului, continuarea cea mai probabilă. Ce s-a schimbat în ultimii ani este scara.

| Etapa | Cerințe |
|---|---|
| 2015-2019, biblioteci precum TensorFlow | Modele care se antrenau pe câteva plăci grafice, într-un laborator universitar |
| 2020-2022 | Modele cu sute de miliarde de parametri, antrenate în centre de date proprii, accesibile prin interfață programabilă |
| după 2023 | Antrenamente distribuite pe mai multe centre de date, cu investiții anunțate de ordinul zecilor și sutelor de miliarde de dolari |

Cercetarea de vârf în acest domeniu a ieșit din universități și a trecut la un număr mic de companii care dispun de capitalul necesar.

## 2. Ideologiile care însoțesc industria

| Curentul | Formulare de referință | Conținut |
|---|---|---|
| Turbocapitalismul | Termen folosit de economistul Edward Luttwak în lucrarea publicată în 1998 | Descrie o economie eliberată de constrângerile sociale și de reglementare, în care viteza schimbării devine ea însăși un criteriu |
| Accelerationismul tehnologic | Mișcare apărută pe rețelele sociale în 2022, în jurul formulei „accelerare eficace” | Susține că orice încetinire a dezvoltării tehnologice produce mai mult rău decât riscurile ei, deci reglementarea trebuie evitată |
| Optimismul tehnologic | Text publicat în 2023 de investitorul Marc Andreessen | Prezintă tehnologia ca soluție universală și tratează criticile ei drept obstacole morale |

Elementul comun este tratarea costurilor de mediu și sociale ca probleme ale altcuiva. Cercetătoarele Timnit Gebru și Émile Torres au propus o critică a acestei familii de idei, arătând legătura dintre ele și o anumită concepție despre viitorul îndepărtat al omenirii, folosită pentru a justifica ignorarea consecințelor prezente.

## 3. Alinierea și pluralitatea valorilor

Alinierea desemnează reglarea comportamentului unui model astfel încât răspunsurile lui să corespundă unor reguli stabilite de dezvoltator. Metoda principală constă în antrenarea suplimentară pe baza preferințelor exprimate de evaluatori umani.

Problema care apare este faptul că regulile sunt scrise de un număr mic de companii, iar valorile pe care le codifică nu sunt universale.

#### Un exemplu de divergență

Întrebarea cine decide într-un conflict între utilizator și sistem primește răspunsuri diferite:

- O poziție, răspândită în Europa de Est și explicabilă prin experiența descrisă în unitățile I și III, așază omul deasupra sistemului: programul execută instrucțiunea și poate refuza numai când intenția de a produce un rău este stabilită clar. Refuzul preventiv, întemeiat pe bănuială, este perceput ca formă de control.
- O altă poziție, prezentă în practica marilor companii americane, acceptă refuzurile greșite ca preț al prevenirii unui rău rar. Sistemul are, în această concepție, o autoritate proprie față de utilizator.

Ambele poziții sunt coerente, iar alegerea dintre ele este politică. Companiile care produc modelele publică documente de politică internă privind comportamentul acestora, iar conducătorii lor, între care Sam Altman și Dario Amodei, se pronunță public asupra acestor reguli.

> #### INTERPRETARE: poate un singur model să servească valori diferite
>
> #### Citirea A: nu, iar concentrarea agravează problema
>
> Un model unic, antrenat pe date preponderent în limba engleză și reglat de evaluatori dintr-un singur spațiu cultural, aplică un set de reguli la scară mondială. Utilizatorul dintr-o altă societate nu are cui să conteste decizia, întrucât regula nu provine de la o autoritate publică. Alternativa propusă de această poziție cuprinde modele cu parametri publicați, care pot fi reglate local, și reglementare publică a comportamentului acestor sisteme.
>
> #### Citirea B: da, prin separarea nivelurilor
>
> Un nucleu comun poate cuprinde interdicții asupra cărora există acord larg, între care sprijinul pentru fabricarea de arme sau conținutul care exploatează copii, iar restul poate fi lăsat la latitudinea utilizatorului sau a statului în care funcționează serviciul. Regulamentul european privind inteligența artificială merge în această direcție, prin clasificarea aplicațiilor după risc.
>
> #### Ce se poate verifica
>
> Documentele de politică publicate de companii; textul regulamentului european; rezultatele evaluărilor independente ale comportamentului modelelor; diferențele de răspuns ale aceluiași model la aceeași întrebare formulată în limbi diferite.

## 4. Cine antrenează modelele

Pregătirea datelor și evaluarea răspunsurilor sunt operațiuni manuale, executate de un număr mare de persoane fără pregătire de specialitate.

- Companii din Kenya, Filipine, India și Venezuela furnizează servicii de etichetare a datelor și de moderare a conținutului pentru marile firme de tehnologie. Un material publicat în ianuarie 2023 de revista Time a arătat că lucrătorii kenyeni angajați printr-un intermediar pentru filtrarea conținutului violent și sexual destinat antrenamentului erau plătiți cu mai puțin de doi dolari pe oră. Aceștia au deschis ulterior procese privind condițiile de muncă și efectele asupra sănătății mintale.
- În 2019, presa internațională a relatat că o companie finlandeză de analiză a datelor, Vainu, folosea deținute dintr-o închisoare de femei din Finlanda pentru etichetarea textelor în limba finlandeză, activitate plătită la nivelul muncii din penitenciar. Compania a susținut că oferă calificare, iar criticii au invocat imposibilitatea unei negocieri libere a condițiilor de muncă într-un asemenea cadru.

Structura este cea descrisă în lecțiile 2.4 și 3.8: valoarea adăugată mare rămâne la companiile care dețin modelul, iar munca repetitivă este cumpărată acolo unde costă cel mai puțin.

## 5. Consumul de resurse

| Indicator | Valoare |
|---|---|
| Necesarul mondial de electricitate al centrelor de date, estimare a Agenției Internaționale pentru Energie | aproximativ 945 TWh în 2030, aproape dublu față de 2024 |
| Ponderea centrelor de date în consumul de electricitate al Uniunii Europene | aproximativ 2,5% |
| Capacitatea instalată în Uniunea Europeană | de la aproximativ 12 GW în 2025 la o estimare de 28 GW în 2030 |
| Opoziția publică în Statele Unite, sondaj Gallup din martie 2026 | 71% dintre respondenți se opun construirii unui centru de date în apropierea locuinței, dintre care 48% se opun ferm, valori mai ridicate decât în cazul unei centrale nucleare |

În Statele Unite, cererea suplimentară a centrelor de date a pus problema capacității fizice a rețelei de transport: racordarea unui consumator de ordinul sutelor de megawați cere linii noi și capacitate de producție, iar timpul necesar construirii lor depășește ritmul anunțat al investițiilor. În statul mexican Querétaro, extinderea acestor facilități a agravat lipsa de apă existentă.

## 6. Cazul românesc: Luna, județul Cluj

România are în prezent aproximativ 59 de centre de date, majoritatea mici. Proiectul cel mai mare anunțat este cel al companiei americane DriverAI, în comuna Luna din județul Cluj.

| Element | Valoare |
|---|---|
| Investiție anunțată | peste un miliard de dolari |
| Suprafață | 84 de hectare, teren care fusese pășune comunală |
| Putere instalată | aproximativ 80 MW |
| Consum anual estimat | aproximativ 700 GWh, echivalentul a peste 200.000 de locuințe sau al unui oraș de mărimea Brașovului |
| Amplasare | în apropierea râului Arieș, aflat sub restricții de consum |

Organizația de mediu Agent Green a contestat proiectul și a cerut publicarea studiilor hidrogeologice și a analizei privind riscul de inundații, un plan de recuperare a căldurii reziduale și amplasarea acestui tip de investiție pe terenuri deja folosite industrial. Ministerul Mediului a precizat că în România nu există legislație specifică pentru centrele de date private, acestea fiind supuse procedurilor obișnuite de autorizare.

În paralel, compania Nvidia a anunțat că analizează o investiție de ordinul a patru miliarde de dolari în România.

> #### INTERPRETARE: aduce un centru de date dezvoltare locală
>
> #### Citirea A: da, în anumite condiții
>
> Investiția aduce venituri la bugetul local prin impozite, cerere de energie care justifică modernizarea rețelei și, acolo unde infrastructura permite, căldură reziduală folosibilă în sistemul de termoficare, soluție aplicată în orașul german Braunschweig. Prezența unei asemenea facilități poate atrage firme conexe.
>
> #### Citirea B: nu, în forma actuală
>
> Un centru de date de această dimensiune ocupă permanent zeci de hectare, consumă energie și apă la nivelul unui oraș și creează un număr mic de locuri de muncă permanente, în majoritate pentru personal calificat adus din altă parte. Spre deosebire de o fabrică, nu produce bunuri care să intre în economia locală. În lipsa unei legislații specifice, condițiile privind apa, căldura reziduală și refacerea terenului nu sunt obligatorii.
>
> #### Ce se poate verifica
>
> Documentația de autorizare, publicată în procedura de mediu; numărul de locuri de muncă asumat prin contract; impozitele locale prevăzute; contractul de racordare la rețeaua electrică; studiile hidrogeologice cerute de organizațiile care au contestat proiectul.

## Activități și exerciții

1. Explicați ce înseamnă alinierea unui model. Cine stabilește regulile și cui îi poate fi contestată decizia?
2. Comparați cele două poziții privind autoritatea sistemului față de utilizator. Formulați, pentru fiecare, un caz în care ea produce un rezultat greșit.
3. Calculați: dacă un centru de date consumă 700 GWh pe an, iar o gospodărie consumă în medie 3.000 kWh pe an, câtor gospodării îi corespunde consumul lui?
4. Dezbatere: o companie străină construiește o facilitate care consumă resurse locale și oferă puține locuri de muncă. Ce condiții ar trebui impuse prin autorizație?
5. Temă: aflați dacă în județul vostru există sau este planificat un centru de date. Notați în spațiul de mai jos ce ați găsit în documentele publice și ce informații lipsesc.

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

[^1]: Alinierea desemnează ansamblul metodelor prin care comportamentul unui model este adus în acord cu un set de reguli stabilite de cel care îl produce. Ea se realizează prin selecția datelor de antrenament, prin antrenare suplimentară pe baza preferințelor unor evaluatori și prin instrucțiuni date modelului înainte de conversație.

[^2]: Rezultatul fals pozitiv este refuzul sau alarma declanșată în absența situației care le-ar justifica. Orice sistem de detectare poate fi reglat pentru mai puține rezultate fals pozitive, cu prețul creșterii numărului de cazuri reale nedetectate.

[^3]: Etichetarea datelor este operațiunea prin care unor texte, imagini sau înregistrări li se atașează informația care arată ce conțin, pentru ca modelul să poată învăța din ele. Este muncă manuală, repetitivă și dificil de automatizat.

[^4]: Căldura reziduală este energia termică rezultată din funcționarea echipamentelor, care se elimină prin sistemele de răcire. Ea poate fi recuperată și folosită pentru încălzirea clădirilor, dacă există o rețea de termoficare în apropiere.
