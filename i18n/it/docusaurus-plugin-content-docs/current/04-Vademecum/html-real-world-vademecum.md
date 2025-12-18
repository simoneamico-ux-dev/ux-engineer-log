---
sidebar_position: 1
sidebar_label: 'HTML Real World Vademecum'
title: 'HTML Real World Vademecum'
---

# HTML Real World Vademecum

## 1. Struttura base HTML

### Il documento HTML
**Cosa fa**: Dice al browser "Ehi, questo è un documento HTML moderno!"

**Snippet base**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Il mio sito</title>
</head>
<body>
    <!-- Il contenuto va qui -->
</body>
</html>
```

**Analogia**: È come la struttura di una casa 🏠
- `<!DOCTYPE html>` = Il permesso di costruzione
- `<html>` = Le fondamenta
- `<head>` = Il sottotetto (non si vede ma contiene impianti importanti)
- `<body>` = Le stanze dove vivi

### `<head>` - Il cervello nascosto
**Cosa contiene**: Informazioni per il browser, non visibili all'utente

**Elementi essenziali**:
```html
<head>
    <meta charset="UTF-8"> <!-- Alfabeto universale -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Per mobile -->
    <title>Titolo nella tab</title> <!-- Quello che vedi nella linguetta -->
    <link rel="stylesheet" href="style.css"> <!-- Collegamento al CSS -->
</head>
```

**Analogia**: Come l'etichetta su una scatola - dice cosa c'è dentro senza aprirla!

### I contenitori principali

#### `<body>` - Il corpo visibile
**Cosa fa**: Contiene TUTTO quello che l'utente vede

```html
<body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
</body>
```

#### `<header>` - La testata  
**Cosa fa**: Contiene l'intestazione della pagina o di una sezione

```html
<header>
    <img src="logo.png" alt="Logo aziendale">
    <nav>
        <a href="#home">Home</a>
        <a href="#about">Chi siamo</a>
    </nav>
</header>
```

**Analogia**: Come l'insegna di un negozio - la prima cosa che vedi entrando!

**Quando usarlo**: Logo, navigazione principale, titolo del sito

#### `<main>` - Il protagonista
**Cosa fa**: Contiene il contenuto principale, quello per cui l'utente è venuto!

```html
<main>
    <h1>Benvenuto nel mio blog!</h1>
    <article>Il mio primo post...</article>
</main>
```

**Regola d'oro**: Solo UN `<main>` per pagina!

**Analogia**: Il piatto principale del ristorante - non puoi averne due!

#### `<footer>` - Il piè di pagina  
**Cosa fa**: Contiene informazioni di chiusura, contatti, copyright

```html
<footer>
    <address>
        Via Roma 123, Milano
    </address>
    <p>&copy; 2024 La mia azienda</p>
</footer>
```

**Analogia**: Come i titoli di coda di un film - info utili alla fine!

#### `<nav>` - Il navigatore
**Cosa fa**: Raggruppa i link di navigazione

```html
<nav>
    <a href="#home">Home</a>
    <a href="#products">Prodotti</a>
    <a href="#contact">Contatti</a>
</nav>
```

**Analogia**: Il menu del ristorante - ti dice dove puoi andare!

#### `<section>` - Le sezioni
**Cosa fa**: Divide il contenuto in sezioni tematiche

```html
<section id="about">
    <h2>Chi siamo</h2>
    <p>La nostra storia...</p>
</section>

<section id="services">
    <h2>I nostri servizi</h2>
    <p>Cosa offriamo...</p>
</section>
```

**Analogia**: I capitoli di un libro - ogni sezione un argomento!

#### `<article>` - L'articolo
**Cosa fa**: Contenuto che ha senso anche da solo

```html
<article>
    <h2>Come cucinare la pasta</h2>
    <p>Prima di tutto, metti l'acqua a bollire...</p>
    <p>Aggiungi il sale quando bolle...</p>
</article>
```

**Test**: Se lo puoi condividere su Facebook e ha senso → è un `<article>`!

#### `<aside>` - Il contenuto laterale  
**Cosa fa**: Informazioni correlate ma non essenziali

```html
<article>
    <h2>Storia del caffè</h2>
    <p>Il caffè venne scoperto...</p>
    
    <aside>
        <h3>Lo sapevi che...</h3>
        <p>Gli italiani bevono 6 miliardi di caffè all'anno!</p>
    </aside>
</article>
```

**Analogia**: Come i box colorati nei libri di scuola - info extra interessanti!

#### `<address>` - I contatti  
**Cosa fa**: Contiene informazioni di contatto

```html
<address>
    <a href="mailto:info@azienda.it">info@azienda.it</a><br />
    Tel: <a href="tel:+390212345678">02 1234 5678</a><br />
    Via Dante 15, 20121 Milano
</address>
```

**NON è solo per indirizzi fisici!** Può contenere email, telefono, social...

**Analogia**: Il biglietto da visita digitale!

#### `<div>` - Il tuttofare
**Cosa fa**: Contenitore generico senza significato speciale

```html
<div class="card">
    <h3>Prodotto speciale</h3>
    <p>Descrizione...</p>
    <button>Acquista</button>
</div>
```

**Quando usarlo**: Quando non c'è un tag semantico appropriato

**Analogia**: Una scatola di cartone - ci metti quello che vuoi!

#### `<span>` - Il piccolo aiutante
**Cosa fa**: Come `<div>` ma per contenuti inline (nella riga)

```html
<p>Il prezzo è <span class="price">€99</span> invece di €150!</p>
```

**Analogia**: L'evidenziatore del testo - marca una parola senza interrompere!

<br />
<br />
<br />
<br />






## 2. Elementi di testo

### I titoli - La gerarchia
```html
<h1>Titolo principale (uno solo!)</h1>
<h2>Capitoli principali</h2>
<h3>Sottocapitoli</h3>
<h4>Sezioni dei sottocapitoli</h4>
<h5>Dettagli delle sezioni</h5>
<h6>Il più piccolo</h6>
```

**Regola**: Come una matrioska russa - ogni livello dentro l'altro! 🪆

### `<p>` - Il paragrafo
**Cosa fa**: Raggruppa il testo in paragrafi

```html
<p>Questo è un paragrafo. Va sempre a capo prima e dopo.</p>
<p>Questo è un altro paragrafo, separato dal primo.</p>
```

### Enfasi e importanza
```html
<em>Testo enfatizzato</em> <!-- Corsivo con significato -->
<i>Testo in corsivo</i> <!-- Solo stile -->

<strong>Testo importante</strong> <!-- Grassetto con significato -->
<b>Testo in grassetto</b> <!-- Solo stile -->
```

**Quando usare quale?**
- `<em>` e `<strong>`: Quando il testo È davvero importante
- `<i>` e `<b>`: Solo per stile visivo

### `<blockquote>` - La citazione  
**Cosa fa**: Indica una citazione lunga da un'altra fonte

```html
<blockquote>
    <p>Il codice è poesia.</p>
    <cite>- Un programmatore saggio</cite>
</blockquote>
```

**Analogia**: Come quando citi un libro - dai credito all'autore!

### `<hr>` - La linea divisoria
**Cosa fa**: Crea una separazione tematica

```html
<p>Fine del capitolo 1</p>
<hr>
<p>Inizio del capitolo 2</p>
```

**Visual**: _______________

### Le liste

#### Lista non ordinata
```html
<ul>
    <li>Mele</li>
    <li>Pere</li>
    <li>Banane</li>
</ul>
```
**Risultato**: 
• Mele
• Pere  
• Banane

#### Lista ordinata
```html
<ol>
    <li>Accendi il computer</li>
    <li>Apri il browser</li>
    <li>Inizia a programmare!</li>
</ol>
```
**Risultato**:
1. Accendi il computer
2. Apri il browser
3. Inizia a programmare!

<br />
<br />
<br />
<br />






## 3. I Link - Le porte del web

### `<a>` - L'ancora
**Cosa fa**: Crea collegamenti cliccabili

**Link base**:
```html
<a href="https://www.google.it">Vai a Google</a>
```

**Link nella stessa pagina**:
```html
<a href="#contatti">Vai ai contatti</a>
<!-- Più in basso nella pagina: -->
<section id="contatti">...</section>
```

**Link email**:
```html
<a href="mailto:info@esempio.it">Scrivimi!</a>
```

**Link telefono**:
```html
<a href="tel:+391234567890">Chiamami!</a>
```

### Attributi speciali per i link

#### `target="_blank"`
**Cosa fa**: Apre il link in una nuova scheda

```html
<a href="https://esempio.it" target="_blank">Apri in nuova scheda</a>
```

**Analogia**: Come aprire una nuova finestra invece di sostituire quella attuale!

#### `rel="noreferrer"`  
**Cosa fa**: Nasconde da dove viene il click (privacy)

```html
<a href="https://esempio.it" target="_blank" rel="noreferrer">Link privato</a>
```

**Analogia**: Come entrare in un negozio senza dire chi ti ha consigliato!

<br />
<br />
<br />
<br />






## 4. Media

### `<img>` - Le immagini
**Cosa fa**: Mostra un'immagine

**Snippet completo**:
```html
<img 
    src="gatto.jpg" 
    alt="Un gatto arancione che dorme"
    width="600"
    height="400"
    loading="lazy"
>
```

#### `loading="lazy"`  
**Cosa fa**: Carica l'immagine solo quando sta per essere vista!

**Analogia**: Come un cameriere intelligente che porta i piatti solo quando ti siedi al tavolo!

```html
<!-- Immagine in alto (si carica subito) -->
<img src="hero.jpg" alt="Banner principale">

<!-- Immagini in fondo (si caricano dopo) -->
<img src="foto1.jpg" alt="Galleria 1" loading="lazy">
<img src="foto2.jpg" alt="Galleria 2" loading="lazy">
```

**Benefici**: 
- ⚡ Pagina più veloce
- 📱 Risparmio dati mobile
- 🚀 Migliore esperienza utente

### `<iframe>` - La finestra magica  
**Cosa fa**: Incorpora un'altra pagina web nella tua

```html
<iframe 
    src="https://www.youtube.com/embed/VIDEO_ID"
    width="560" 
    height="315"
    title="Video tutorial CSS"
>
</iframe>
```

**Usi comuni**:
- Video YouTube
- Mappe Google
- Post social media

**Analogia**: Come avere una TV nella TV - mostra un altro canale dentro il tuo!

<br />
<br />
<br />
<br />







## 5. Form - L'interazione

### La struttura base
```html
<form action="/invia-dati" method="POST">
    <!-- Campi del form -->
    <button type="submit">Invia</button>
</form>
```

### I Button - Tipi e trappole
**Cosa fa**: Definisce cosa succede esattamente quando clicchi un pulsante.

**Il tranello**: Se scrivi solo `<button>`, il browser pensa che sia `submit`. Clicchi → la pagina si ricarica! 😱

```html
<button type="submit">Invia Ordine</button>
<button type="button">Aggiungi Voce</button>
<button type="reset">Cancella</button>
```
**Analogia**:

* `submit` = Imbucare la lettera 📮 (parte e non ce l'hai più)
* `button` = Tasto della calcolatrice 🧮 (fai il calcolo ma resti lì)
* `reset` = Cancellino della lavagna ✨


### `<label>` e `<input>` - La coppia perfetta
```html
<label for="nome">Il tuo nome:</label>
<input type="text" id="nome" name="nome" required>
```

**Perché il `for`?** Clicchi la label → si attiva l'input! Magia accessibilità! ✨

### Tipi di input più usati
```html
<!-- Testo normale -->
<input type="text" placeholder="Scrivi qui...">

<!-- Email con validazione -->
<input type="email" placeholder="tua@email.com" required>

<!-- Password nascosta -->
<input type="password">

<!-- Numero -->
<input type="number" min="0" max="100">

<!-- Data -->
<input type="date">

<!-- Checkbox -->
<input type="checkbox" id="privacy">
<label for="privacy">Accetto la privacy</label>

<!-- Radio (scelta singola) -->
<input type="radio" name="size" value="S" id="small">
<label for="small">Small</label>
<input type="radio" name="size" value="M" id="medium">
<label for="medium">Medium</label>
```

### `<select>` - Il menu a tendina
```html
<label for="paese">Scegli il paese:</label>
<select id="paese" name="paese">
    <option value="">-- Seleziona --</option>
    <option value="IT">Italia</option>
    <option value="FR">Francia</option>
    <option value="ES">Spagna</option>
</select>
```

### `<textarea>` - Il testo lungo
```html
<label for="messaggio">Il tuo messaggio:</label>
<textarea id="messaggio" name="messaggio" rows="4" cols="50">
</textarea>
```

### `<fieldset>` e `<legend>` - Raggruppa con stile
```html
<fieldset>
    <legend>Dati personali</legend>
    <label for="nome">Nome:</label>
    <input type="text" id="nome">
    
    <label for="cognome">Cognome:</label>
    <input type="text" id="cognome">
</fieldset>
```

**Visual**: Crea un box con bordo e titolo!

### Attributi utili per i form

#### `placeholder`
**Cosa fa**: Testo di esempio che sparisce quando scrivi
```html
<input type="text" placeholder="es. Mario Rossi">
```

#### `required`
**Cosa fa**: Campo obbligatorio
```html
<input type="email" required>
```

#### `name`
**Cosa fa**: Nome del dato quando viene inviato
```html
<input type="text" name="username">
```

#### `inputmode`
**Cosa fa**: Dice al browser quale tastiera mostrare su mobile per facilitare la vita all'utente.

```html
<!-- Text: Default, tastiera normale -->
<input type="text" inputmode="text">

<!-- Numeric: Tastiera numerica (0-9) -->
<input type="text" inputmode="numeric">

<!-- Decimal: Tastiera numerica con punto decimale -->
<input type="text" inputmode="decimal">

<!-- Tel: Tastierino telefonico -->
<input type="text" inputmode="tel">

<!-- Email: Tastiera ottimizzata con "@" e "." -->
<input type="text" inputmode="email">

<!-- Url: Tastiera ottimizzata con "/" e "." -->
<input type="text" inputmode="url">

<!-- Search: Tasto invio diventa "Cerca" 🔍 -->
<input type="search" inputmode="search">

```

**Nota bene**: Questi attributi `inputmode` sono UX pura! Non validano i dati (per quello serve il type), ma rendono l'inserimento molto più veloce su smartphone.

**Analogia**: Come passare al meccanico direttamente la chiave inglese giusta invece di fargli cercare nella cassetta attrezzi! 🔧

<br />
<br />
<br />
<br />







## 6. Accessibilità - Per tutti! ♿

### Attributi ARIA base

#### `role`
**Cosa fa**: Dice che ruolo ha un elemento
```html
<section role="region" aria-labelledby="news">
    <h2 id="news">Ultime notizie</h2>
</section>
```

#### `aria-label`
**Cosa fa**: Etichetta invisibile ma letta dagli screen reader
```html
<button aria-label="Chiudi finestra">X</button>
```

#### `aria-labelledby`
**Cosa fa**: Collega un elemento a un'altra etichetta esistente
```html
<section aria-labelledby="titolo-sezione">
    <h2 id="titolo-sezione">I nostri servizi</h2>
</section>
```

**Analogia**: Come i sottotitoli per non udenti - non li vedi ma ci sono per chi ne ha bisogno!

<br />
<br />
<br />
<br />







## 7. Attributi globali - Utilizzabili ovunque

### `id` - L'identificativo unico
```html
<div id="header-principale">...</div>
```
**Regola**: Come il codice fiscale - uno solo per elemento!

### `class` - Le categorie
```html
<div class="card speciale evidenziata">...</div>
```
**Può avere più classi!** Separate da spazi

### `style` - CSS inline (da evitare!)
```html
<p style="color: red;">Testo rosso</p>
```
**Meglio usare CSS esterno!**

### `title` - Il tooltip
```html
<abbr title="Hypertext Markup Language">HTML</abbr>
```
**Passa il mouse sopra → appare la spiegazione!**

<br />
<br />
<br />
<br />






## 8. Librerie esterne - Superpoteri! 🦸‍♂️

### Font Awesome - Icone bellissime
**Nel `<head>`**:
```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
```

**Uso**:
```html
<!-- Icone social -->
<i class="fab fa-facebook"></i>
<i class="fab fa-twitter"></i>
<i class="fab fa-instagram"></i>

<!-- Icone generiche -->
<i class="fas fa-heart"></i>
<i class="fas fa-star"></i>
```

**Analogia**: Come avere migliaia di emoji professionali gratis! 

<br />
<br />
<br />
<br />







## I 10 comandamenti dell'HTML

### 1. Alt Text — La voce dell’immagine 🗣️

**Perché**: se l’immagine non carica (o l’utente usa uno screen reader), l’`alt` è ciò che “rimane”. Aiuta anche SEO e accessibilità.

```html
<!-- ❌ -->
<img src="torta.jpg">

<!-- ✅ -->
<img src="torta.jpg" alt="Torta al cioccolato con panna montata">
```

**Analogia**: è come descrivere una foto al telefono: non dici “immagine.jpg”, dici cosa si vede davvero.

> Nota pro: se l’immagine è *solo decorativa*, usa `alt=""` (alt vuoto), così lo screen reader la salta.

---

### 2. Chiudi i tag — Il principio del panino 🥪

**Perché**: se apri un tag e non lo chiudi, il browser “indovina” e rischi di rompere il layout di tutto ciò che segue.

```html
<!-- ❌ -->
<p>Questo paragrafo mangia tutto il resto...
  <header>Ops, sono finito dentro il paragrafo!</header>

<!-- ✅ -->
<p>Questo paragrafo finisce qui.</p>
<header>Io sono salvo!</header>
```

**Analogia**: come un panino. Se metti la fetta sotto (`<p>`) e dimentichi quella sopra (`</p>`), il ripieno finisce ovunque.

> Nota pro: alcuni tag sono *void* (non si chiudono), tipo `<img>`, `<input>`, `<br>`.

---

### 3. Semantica — Le etichette giuste 🏷️

**Perché**: un codice pieno di `<div>` è un labirinto. I tag semantici dicono *che cosa* c’è dentro, non solo *come* appare.

```html
<!-- ❌ -->
<div class="header">...</div>
<div class="footer">...</div>

<!-- ✅ -->
<header>...</header>
<footer>...</footer>
```

**Analogia**: scatole del trasloco 📦. Se scrivi “ROBA” su tutto (`div`), impazzisci. Se scrivi “CUCINA”, “BAGNO”, sai subito dove mettere le mani.

> Nota pro: pensa anche a `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`.

---

### 4. Il Re H1 — Uno (quasi sempre) 👑

**Perché**: l’`<h1>` è il titolo principale della pagina. Metterne tanti rende più difficile capire qual è l’argomento centrale (per persone e motori di ricerca).

```html
<!-- ❌ -->
<h1>Benvenuti</h1>
...
<h1>I nostri servizi</h1>

<!-- ✅ -->
<h1>Benvenuti nel sito</h1>
...
<h2>I nostri servizi</h2>
```

**Analogia**: la prima pagina di un giornale 📰. C’è un solo TITOLONE. Il resto sono sottotitoli. Se tutto è titolone, niente è importante.

> Nota pro: la gerarchia H è una *mappa* del contenuto (struttura), non un modo per scegliere la dimensione del font.

---

### 5. Label e Input — La coppia indivisibile 🎯

**Perché**: senza `label` collegata con `for`/`id`, l’utente deve cliccare *precisissimo* nel campo. Con la label, clicchi anche sul testo: più comodo (soprattutto da mobile) e più accessibile.

```html
<!-- ❌ -->
Nome: <input type="text">

<!-- ✅ -->
<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome">
```

**Analogia**: l’interruttore della luce 💡. L’input è il meccanismo interno (piccolo). La label è la placca grande: rende facile “accendere” il campo.

---

### 6. Non saltare i gradini — Gerarchia H 🪜

**Perché**: non passare da `h2` a `h4` solo perché “ti piace di più grande/piccolo”. La gerarchia serve a dare struttura, lo stile lo fai con CSS.

```html
<!-- ❌ -->
<h2>Il prodotto</h2>
<h4>Caratteristiche</h4>

<!-- ✅ -->
<h2>Il prodotto</h2>
<h3>Caratteristiche</h3>
```

**Analogia**: una scala. Se salti i gradini, chi legge inciampa (e anche Google).

---

### 7. Niente link misteriosi — Dì dove porti 🔗

**Perché**: “clicca qui” non dice nulla fuori contesto (screen reader, scansione veloce, SEO). Il testo del link deve avere significato da solo.

```html
<!-- ❌ -->
<a href="menu.pdf">Clicca qui</a>

<!-- ✅ -->
<a href="menu.pdf">Scarica il menù (PDF)</a>
```

**Analogia**: un cartello stradale con scritto “Vai là”. Meglio “Stazione Centrale”. 🚏

---

### 8. No CSS inline — Separazione dei compiti 👕

**Perché**: lo stile dentro l’HTML diventa ingestibile. Con classi CSS cambi una volta e aggiorni tutto, senza “caccia al tesoro” tra i tag.

```html
<!-- ❌ -->
<p style="color: red; font-size: 20px;">Attenzione</p>

<!-- ✅ -->
<p class="alert">Attenzione</p>
```

**Analogia**: lo stile inline è un tatuaggio: difficile da cambiare. Le classi sono vestiti: li cambi quando vuoi.

---

### 9. Regola della valigia — Annidamento sensato 🧳

**Perché**: alcuni elementi non possono stare dentro altri (es. un `<div>` dentro un `<p>` è markup invalido). Risultato: HTML confuso e rendering imprevedibile.

```html
<!-- ❌ -->
<p>Ecco il mio <div>BOX</div> testo</p>

<!-- ✅ -->
<p>Ecco il mio testo.</p>
<div class="box">BOX</div>
```

**Analogia**: non puoi mettere una valigia in un portafoglio. Ma puoi mettere un portafoglio in una valigia.

---

### 10. Virgolette sempre — Attributi puliti 👟

**Perché**: a volte “funziona lo stesso”, finché non smette. Le virgolette evitano ambiguità e rendono il codice più leggibile e robusto.

```html
<!-- ❌ -->
<input type=text class=big>

<!-- ✅ -->
<input type="text" class="big">
```

**Analogia**: come allacciarsi le scarpe. Puoi camminare con i lacci sciolti… finché non voli.

---

## Bonus (super consigliati)

### 11. Form “onesto” — Type giusto + `required` + `autocomplete` ✅

**Perché**: aiuti l’utente (soprattutto da mobile), riduci errori e migliori accessibilità.

```html
<!-- ❌ -->
<input type="text" placeholder="Email">

<!-- ✅ -->
<label for="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  required
>
```

**Analogia**: è come compilare un modulo con qualcuno che ti guida (“qui serve un’email vera”), invece di lasciarti nel caos.

---

### 12. Bottoni e link non sono intercambiabili 🔘🔗

**Perché**: un link (`<a>`) serve a **navigare**, un bottone (`<button>`) serve a **fare un’azione**. Se li scambi, rovini UX, accessibilità e comportamento da tastiera.

```html
<!-- ❌: azione mascherata da link -->
<a href="#" onclick="salva()">Salva</a>

<!-- ✅ -->
<button type="button" onclick="salva()">Salva</button>

<!-- ❌: navigazione mascherata da bottone -->
<button onclick="location.href='/prezzi'">Prezzi</button>

<!-- ✅ -->
<a href="/prezzi">Prezzi</a>
```

**Analogia**: un link è una porta (ti porta altrove), un bottone è un interruttore (fa succedere qualcosa).
