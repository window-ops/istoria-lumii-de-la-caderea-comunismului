# Cum se semnează avizul

Avizul din „Fișa manualului” este semnat cu o cheie ed25519. Pagina de față spune cum se face o cheie, cum se semnează textul, cum se verifică semnătura și ce se schimbă în pagină după aceea. Pașii au fost făcuți o dată, la 13 septembrie 2026; se refac ori de câte ori se schimbă textul avizului sau se pierde cheia.

## 1. Ce este semnat

Se semnează un singur fișier, `cheie/aviz.txt`. El cuprinde numai ce nu se schimbă: titlul, numele celui care avizează, numărul avizului, data redactării, licența și cele două propoziții despre manual. Orice modificare a lui, fie și un spațiu, strică semnătura; de aceea nu se pun în el lucruri care se corectează.

Restul paginii nu este semnat. Lecțiile, fișa, glumele se pot schimba oricând fără să se atingă semnătura.

## 2. Ce trebuie instalat

OpenSSL 3, care există deja în Git pentru Windows, în orice Linux și în macOS. Comenzile de mai jos se dau într-un terminal deschis în folderul `cheie` al proiectului. Pe Windows, terminalul este Git Bash.

## 3. Cheia

O cheie nouă se face o singură dată:

```
openssl genpkey -algorithm ed25519 -out privata.pem
openssl pkey -in privata.pem -pubout -out publica.pem
```

`privata.pem` este cheia privată. Cine o are poate semna în numele autorului. `publica.pem` este cheia publică; ea merge în depozit și în pagină.

Cheia privată se poate ține în KeePassXC, ca atașament, după ce a fost protejată cu o parolă:

```
openssl pkey -in privata.pem -aes-256-cbc -out privata.enc.pem
```

Sau se poate șterge după semnare. Semnătura publicată rămâne valabilă și fără ea; când va fi nevoie de o semnătură nouă, se face o cheie nouă și se reiau pașii. Cheia privată nu se pune niciodată în depozit și nici în folderul proiectului.

## 4. Semnătura

```
openssl pkeyutl -sign -inkey privata.pem -rawin -in aviz.txt -out aviz.sig
```

Dacă cheia este protejată cu parolă, se folosește `privata.enc.pem` și se introduce parola.

Verificarea, imediat după:

```
openssl pkeyutl -verify -pubin -inkey publica.pem -rawin -in aviz.txt -sigfile aviz.sig
```

Răspunsul așteptat este `Signature Verified Successfully`.

## 5. Ce se pune în pagină

Fișa arată trei lucruri care vin din aceste fișiere. Se scot cu comenzile de mai jos și se copiază în `ghid/fisa.html`, în blocul dintre `-----ÎNCEPUTUL AVIZULUI SEMNAT-----` și `-----SFÂRȘITUL AVIZULUI SEMNAT-----`:

- cheia publică, un singur rând, cel dintre `-----BEGIN PUBLIC KEY-----` și `-----END PUBLIC KEY-----` din `publica.pem`;
- amprenta cheii:

```
openssl pkey -pubin -in publica.pem -outform DER | openssl dgst -sha256
```

- semnătura, în base64, un singur rând:

```
base64 -w0 aviz.sig
```

Amprenta se scrie și în `cheie/VERIFICARE.md`. Blocul lung de la sfârșitul avizului, „Ce apără cheia”, nu are legătură cu cheia și nu se schimbă.

## 6. Arhiva

Arhiva `cheie/cheie-aviz.zip`, pe care o descarcă cititorii, se reface cu fișierele noi. Fișierele stau direct în arhivă, fără un folder în interior; la `zip`, asta o face parametrul `-j`, care lasă deoparte calea fiecărui fișier:

```
zip -j cheie-aviz.zip aviz.txt publica.pem aviz.sig VERIFICARE.md
```

Unde `zip` nu există, cum este în Git Bash pe Windows, aceeași arhivă se face cu Python, care pune fișierele tot direct în ea:

```
python -m zipfile -c cheie-aviz.zip aviz.txt publica.pem aviz.sig VERIFICARE.md
```

## 7. Dacă se pierde cheia

Nu se întâmplă nimic cu ce este publicat: semnătura veche se verifică în continuare cu cheia publică veche. Pentru un aviz nou se face o cheie nouă, de la pasul 3, se semnează din nou și se schimbă în pagină cheia, amprenta și semnătura. În `VERIFICARE.md` se notează că cheia s-a schimbat și de când.
