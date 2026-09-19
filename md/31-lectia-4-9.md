# Lecția 4.9: Modelele, instituțiile și regulile

Lecția precedentă a descris industria care produce aceste sisteme. Lecția de față urmărește produsele propriu-zise în anul redactării manualului, felul în care o instituție tehnică veche a absorbit tehnologia, regulile adoptate până acum și criticile formulate din afara domeniului.

## 1. Piața modelelor în 2026

| Producătorul | Modele de vârf | Parametri publicați |
|---|---|---|
| Anthropic | Claude Opus 5, Claude Fable 5.1 și Claude Mythos 5.1, acesta din urmă disponibil unui număr restrâns de organizații | nu |
| OpenAI | familia GPT-5.6 | nu |
| Moonshot AI, Beijing | Kimi K3 | da, publicați pe 27 iulie 2026 |

Kimi K3 a fost anunțat pe 16 iulie 2026 și are 2,8 bilioane de parametri, dintre care aproximativ 104 miliarde sunt folosiți efectiv pentru fiecare unitate de text prelucrată. Este primul model cu parametri publicați[^1] din această clasă de dimensiune.

Clasamentul independent Artificial Analysis, în versiunea folosită în august 2026, plasa Claude Opus 5 pe primul loc cu 63 de puncte, Claude Fable 5 cu 62, GPT-5.6 Sol cu 61 și Kimi K3 cu 60. Modelul chinezesc conducea totuși detașat la o probă specializată, generarea de interfețe web, și costa cu aproximativ 40% mai puțin pe unitate de text.

#### Ce înseamnă practic „parametri publicați”

Fișierele modelului Kimi K3 însumează aproximativ 1,56 terabaiți, iar producătorul recomandă cel puțin 64 de procesoare specializate pentru rulare. Publicarea parametrilor nu îl face utilizabil de un particular; efectul real este că mai multe companii pot oferi accesul la același model, ceea ce reduce prețul.

## 2. Ce se reproșează modelelor proprietare

| Problema | Conținut |
|---|---|
| Transparența deciziei | Utilizatorul nu poate stabili de ce modelul a răspuns într-un fel sau altul, nici de ce a refuzat. Cercetarea privind interpretabilitatea[^2] este publicată de producători, iar rezultatele ei nu ajung în interfața folosită de public |
| Limitele de utilizare | Numărul de mesaje disponibile într-un interval variază în funcție de cerere, iar regulile de calcul nu sunt comunicate complet |
| Prețul | Modelele de vârf costă de câteva ori mai mult decât alternativele, ceea ce ridică o problemă de acces pentru instituții publice, școli și cercetători din state cu venituri mici |
| Direcționarea între modele | O întrebare adresată unui model poate primi răspuns de la altul, atunci când se declanșează un mecanism de siguranță. Utilizatorul află acest lucru din documentație, nu din interfață |

Criticile privind stilul răspunsurilor privesc în special modelul Claude Opus 5: lungime excesivă, formulări greu de urmărit și un mod de exprimare adaptat comunicării dintre programe automate, în care aceleași texte funcționează corect. Modelul Claude Fable 5 este considerat foarte capabil, fără a fi cel mai potrivit pentru orice sarcină. Aceste evaluări provin din comunitățile de utilizatori și din testele publicate, iar valoarea lor este comparativă.

#### Un episod de reglementare prin control al exporturilor

Modelele Fable 5 și Mythos 5 au fost lansate pe 9 iunie 2026. Pe 12 iunie, accesul la ele a fost suspendat pentru conformarea cu norme ale Departamentului Comerțului al Statelor Unite privind controlul exporturilor[^3]. Restricțiile au fost ridicate pe 30 iunie, iar accesul a fost restabilit pe 1 iulie 2026. Măsura a fost contestată public de specialiști în securitate informatică, care au susținut că lipsa accesului la cele mai capabile instrumente de analiză dezavantajează apărarea.

## 3. Cazul nucleului Linux

Nucleul sistemului de operare descris în lecția 1.6 este întreținut de un număr mic de oameni care verifică manual fiecare modificare propusă. Anul 2026 arată ce se întâmplă când acest proces primește un volum mare de contribuții asistate de programe automate.

| Data | Eveniment |
|---|---|
| martie 2026 | Un sistem automat de verificare a codului, dezvoltat de Google, intră în circuitul de lucru al nucleului și analizează fiecare modificare propusă |
| mai 2026 | Instrumente comerciale de asistență la programare încep să trimită corecturi reale pentru nucleu |
| mai 2026 | Linus Torvalds descrie lista de discuții dedicată securității drept aproape imposibil de administrat, din cauza duplicării: persoane diferite găsesc aceleași erori cu aceleași instrumente. Într-un singur sfârșit de săptămână au fost făcute publice 432 de vulnerabilități ale nucleului |
| mai 2026 | Același dezvoltator anunță că va fi mai sever cu modificările neesențiale trimise târziu în ciclul de lansare, precizând că mai multe dintre ele au fost declanșate de verificarea automată a codului |
| 15 iulie 2026 | Torvalds respinge public ideea transformării proiectului într-unul ostil acestei tehnologii, invitându-i pe cei nemulțumiți să pornească o versiune proprie sau să plece |

Observația formulată de Greg Kroah-Hartman, unul dintre întreținătorii principali, este cea mai utilă pentru înțelegerea situației: raportările au încetat să fie greșite și au devenit valide din punct de vedere tehnic. Problema nu este calitatea, ci volumul și duplicarea, întrucât fiecare raportare trebuie citită de un om înainte de a se ști în ce categorie intră.

Regula adoptată de proiect permite contribuțiile asistate de asemenea programe, cu condiția ca un om să le verifice, să declare folosirea instrumentului și să își asume semnătura.

> #### INTERPRETARE: ce arată cazul nucleului
>
> #### Ce este documentat
>
> Vulnerabilități[^4] existente de ani de zile au fost găsite. Costul examinării unui cod de milioane de linii a scăzut aproape la zero, iar costul verificării și al reparării a rămas același.
>
> #### Citirea A: câștig de securitate
>
> Numărul mare de raportări este o problemă de organizare, nu de tehnologie.
>
> #### Citirea B: transfer de efort
>
> Efortul de verificare rămâne la aceiași oameni. Cine trimite o raportare produsă automat, fără să propună și corectura, mută munca asupra întreținătorilor. Rezultatul este blocarea unui proces care funcționa.
>
> #### Ce se poate verifica
>
> Numărul de vulnerabilități raportate și proporția duplicatelor; timpul mediu până la remediere, înainte și după 2025; numărul de întreținători activi; proporția contribuțiilor asistate care sunt acceptate.

## 4. Reglementarea

- **Uniunea Europeană** a adoptat în 2024 primul regulament general privind inteligența artificială. El interzice anumite utilizări, între care punctarea socială a cetățenilor și identificarea biometrică la distanță în spații publice, cu excepții, și impune obligații de transparență și de evaluare pentru aplicațiile considerate cu risc ridicat. Aplicarea se face etapizat, până în 2027.
- **Statele Unite** au folosit, în locul unei legi generale, angajamente voluntare ale companiilor și controlul exporturilor, ca în episodul din iunie 2026.
- **La nivel internațional** nu există un tratat. Negocierile privind sistemele de armament autonome, menționate în lecția 4.4, continuă fără rezultat obligatoriu.

## 5. Critica din afara domeniului

Filozoful sloven Slavoj Žižek, prezentat în prefața manualului, a formulat din 2023 o poziție care se deosebește atât de entuziasm, cât și de teama obișnuită.

Argumentele lui, rezumate:

- Chestiunea interesantă nu este dacă mașina devine conștientă, ci ce se întâmplă cu oamenii care se raportează la ea ca și cum ar fi.
- Ușurința cu care un program produce texte acceptabile arată cât de mare este partea din vorbirea publică ce funcționa deja după reguli previzibile, fără gândire.
- Pericolul practic nu este preluarea puterii de către mașini, ci folosirea lor pentru a produce, ieftin și în cantitate nelimitată, discursul care menține ordinea existentă.

Această poziție se leagă direct de lecția 4.6: dacă textele și imaginile pot fi produse fără efort, criteriul care le separa de realitate devine mai greu de aplicat.

## Activități și exerciții

1. Explicați ce înseamnă publicarea parametrilor unui model și de ce ea nu îl face accesibil oricui.
2. Analizați tabelul reproșurilor din secțiunea 2. Care dintre ele poate fi rezolvată tehnic și care ține de o decizie comercială?
3. Comparați cele două citiri privind cazul nucleului Linux. Ce date ar arăta care dintre ele descrie mai bine situația?
4. Dezbatere: o tehnologie reduce costul găsirii unei probleme și lasă neschimbat costul rezolvării ei. Cine ar trebui să suporte diferența?
5. Temă: alegeți o sarcină școlară pe care ați rezolvat-o cu ajutorul unui asemenea program. Scrieți în spațiul de mai jos ce ați verificat singuri din răspunsul primit și ce ați acceptat fără verificare.

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

[^1]: Parametrii publicați, cunoscuți și ca greutăți deschise, sunt valorile numerice rezultate din antrenament, puse la dispoziție public. Cine le deține poate rula modelul pe propriile calculatoare și îl poate modifica, dacă are echipamentul necesar.

[^2]: Interpretabilitatea este domeniul de cercetare care urmărește stabilirea motivelor pentru care un model produce un anumit răspuns, prin analiza stărilor interne ale rețelei. Rezultatele ei sunt parțiale, iar modelele rămân în bună parte neexplicate.

[^3]: Controlul exporturilor este instrumentul prin care un stat interzice sau condiționează livrarea către alte state a unor tehnologii considerate strategice. El se aplică și serviciilor furnizate prin internet, nu doar bunurilor fizice.

[^4]: Vulnerabilitatea informatică este eroarea dintr-un program care permite unui atacator să obțină acces sau să provoace o funcționare greșită. Vulnerabilitățile publicate primesc un identificator unic într-un registru internațional.
