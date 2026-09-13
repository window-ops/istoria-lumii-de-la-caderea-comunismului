# Verificarea avizului

Avizul de pe pagina „Fișa manualului” este semnat cu o cheie ed25519. Cheia este a autorului; el a făcut-o și el o ține. Semnătura arată că textul din `aviz.txt` a fost semnat de cine are cheia privată, adică de autor și nu arată nimic altceva.

Fișierele din acest folder:

- `aviz.txt`: textul semnat;
- `publica.pem`: cheia publică, ed25519;
- `aviz.sig`: semnătura, în format binar.

Verificarea, cu OpenSSL 3, dintr-un terminal deschis în acest folder:

```
openssl pkeyutl -verify -pubin -inkey publica.pem -rawin -in aviz.txt -sigfile aviz.sig
```

Răspunsul așteptat este `Signature Verified Successfully`. Orice modificare a textului din `aviz.txt`, fie și o literă, face verificarea să eșueze.

Amprenta cheii publice (SHA-256 peste forma DER):

```
2a5bb10987ae57ca98daec801153e24e965f70ff02585a9c5f5f3bb0f7d61f27
```

Cheia privată nu este în depozit și nu mai există nicăieri: a fost ștearsă după semnare, la 13 septembrie 2026. Semnătura rămâne valabilă. Pentru un aviz nou se face o cheie nouă, după pagina „Cum se semnează avizul” din ghid.

Cine găsește o cheie privată într-un depozit a găsit o eroare și o semnalează în forma obișnuită.
