---
sidebar_position: 2
title: Git Locale
description: Setup Git, modello delle 3 stanze, commit e Conventional Commits.
---

# Git & GitHub Real World Vademecum

## Parte II: Git Locale

Git non è un semplice "salvataggio". È una macchina del tempo collaborativa. In questa sezione imparerai a usare Git sul tuo computer, prima ancora di condividerlo online.

### Il Modello Mentale: Le Tre Stanze

Molti si chiedono: *"Perché Git è così complicato? Perché devo fare `add` e poi `commit`? Non posso semplicemente salvare e basta?"*

Per capire la potenza di questo sistema, devi immaginare Git non come un semplice tasto "Salva", ma come uno **Studio Fotografico Professionale**.

Tutto inizia nella **Working Directory**, che è il tuo **set fotografico**. Qui è dove avviene l'azione ed è dove regna il caos creativo: immagina di aver appena ridipinto un bottone di blu, ma allo stesso tempo hai iniziato a scrivere un testo che però è ancora a metà. Tutto è mischiato sul tavolo e nulla è ancora definitivo.

È qui che entra in gioco la **Staging Area**, che agisce come il **mirino della fotocamera**. A differenza di un salvataggio classico che salva *tutto* (anche gli errori o le cose incomplete), Git ti permette di guardare nell'obiettivo e decidere cosa includere nello scatto. Con il comando `git add`, stai dicendo: *"Voglio inquadrare solo il bottone blu, lasciando fuori dall'inquadratura il testo incompleto"*. Stai preparando la composizione perfetta, filtrando il rumore.

Infine c'è il **Repository**, il tuo **album dei ricordi**. Quando lanci il comando `git commit`, è come se premessi il pulsante di scatto: *Click*. Hai congelato quel preciso istante in una fotografia indelebile. Ora nella storia del progetto esiste una versione pulita chiamata "Bottone Blu" a cui potrai tornare in qualsiasi momento futuro, mentre il testo incompleto è rimasto tranquillamente sul tavolo (nella Working Directory), pronto per essere finito e fotografato nello scatto successivo.

<br />

### 2. Setup Iniziale (Il Passaporto)

Prima di farti entrare nell'album, Git deve sapere chi sta scattando le foto per attribuire i diritti d'autore.
Questo passaggio va fatto **una sola volta nella vita** sul tuo computer (a meno che tu non lo formatti).

Sostituisci "Mario Rossi" col tuo vero nome e l'email con quella che usi per iscriverti a GitHub.

Imposta il nome che apparirà accanto ai tuoi commit:
```bash
git config --global user.name "Il Tuo Nome e Cognome"
```

Imposta l'email (Usa la stessa di GitHub):
```bash
git config --global user.email "tua.email@reale.com"
```

**Perché è importante?** Se usi un'email diversa da quella del tuo account GitHub, i tuoi contributi non appariranno sul tuo profilo online (niente quadratini verdi).

<br />

### 3. Inizializzazione (Il Big Bang)

Hai creato una nuova cartella per il tuo progetto. Al momento è una cartella vuota, che non ha memoria. Dobbiamo installarci dentro il cervello di Git.

Esegui questo comando **SOLO DENTRO** la cartella del progetto. Non farlo mai sul Desktop o nella cartella Utente.

**La Procedura Corretta:**

1. Crea la cartella (o usa una esistente).
2. **ENTRACI** col terminale:
```bash
cd nome_progetto
```

3. Ora lancia l'inizializzazione:
```bash
git init
```

**Output Reale:**
```text
Initialized empty Git repository in /Users/nomeutente/Desktop/MyProject/.git/
```

**Cosa è successo?** Git ha creato una sottocartella nascosta chiamata `.git`. <br />
Significa che da questo momento in poi, ogni modifica che fai in questa cartella viene monitorata dal "Grande Fratello" (Git). Se cancelli per sbaglio la cartella `.git`, il progetto perde la memoria e torna ad essere una semplice cartella di file.

<br />

### 4. Ispezione - Il GPS

Prima di fare qualsiasi cosa, devi sapere in che stato ti trovi.

#### `git status` - Il Cruscotto

Ti dice cosa sta succedendo.

Immagina di aver appena modificato `style.css`. <br />
**Output Reale:**
```text
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  modified:   style.css  <-- È ROSSO (Working Directory)
```

---

#### `git diff` - Il Microscopio

Ti dice *cosa* è cambiato dentro i file, riga per riga.

**Output Reale:**
```diff
- color: black;  (Quello che hai tolto, in ROSSO)
+ color: blue;   (Quello che hai messo, in VERDE)
```

<br />

### 5. Catturare il Momento

#### `git add` - Mettere a fuoco (Staging)

Sposta le modifiche dalla **Working Directory** alla **Staging Area**. Prepara TUTTO quello che è cambiato.
```bash
git add .
```

**Dopo questo comando:** Se fai `git status`, il file `style.css` diventerà **VERDE**. Significa che è "nella fotocamera", pronto allo scatto.

---

#### `git commit` - Lo Scatto (e l'Etichetta)

Prende tutto ciò che è nella Staging Area e lo congela per sempre.
Ma attenzione: una foto senza data o descrizione è inutile dopo un mese. Un commit senza un messaggio chiaro è un buco nero.

Per scrivere messaggi professionali, usiamo lo standard **Conventional Commits**.

**La Sintassi Sacra:**
```text
tipo(ambito): descrizione imperativa
```

**1. Tipo (La prima parola)**

Devi categorizzare la modifica. Non inventare, scegli da questa lista:

* **`feat`** (Feature): Introduce una nuova funzionalità visibile o utilizzabile dall'utente. <br />
*Esempio:* Aggiungere il tasto di login o una nuova pagina.

* **`fix`** (Fix): Corregge un comportamento errato o un bug che causava risultati inattesi. <br />
*Esempio:* Risolvere un crash o un bottone che non risponde al click.

* **`docs`** (Documentation): Modifiche alla documentazione o ai commenti, senza impatto sul codice eseguibile. <br />
*Esempio:* Correggere un errore di battitura nel README o aggiornare una guida.

* **`style`** (Style): Modifiche puramente stilistiche che non alterano il comportamento del codice (formattazione, spazi, punteggiatura, colori, ecc...). <br />
*Esempio:* Migliorare la formattazione del codice o uniformare l'uso degli spazi.

* **`refactor`** (Refactoring): Modifiche alla struttura interna del codice che ne migliorano leggibilità e manutenibilità, senza alterarne il comportamento esterno. <br />
*Esempio:* Suddividere una funzione di 100 righe in due funzioni da 50 con responsabilità più chiare.

* **`perf`** (Performance): Modifiche che migliorano le prestazioni dell'applicazione, come velocità o consumo di risorse, senza cambiare il comportamento funzionale. <br />
*Esempio:* Ottimizzare il caricamento delle immagini per ridurre i tempi di rendering.

* **`chore`** (Chore): Attività di manutenzione che non aggiungono funzionalità né correggono bug, ma servono a mantenere il progetto aggiornato e ordinato. <br />
*Esempio:* Aggiornare una dipendenza, modificare configurazioni o aggiornare `.gitignore`.

---

**2. L'Ambito (Tra parentesi) - Il "Dove"**

Se il *Tipo* (`feat`, `fix`) dice **COSA** hai fatto, l'*Ambito* dice **DOVE** lo hai fatto.
Immagina l'ambito come l'etichetta sulla scatola: aiuta te e i tuoi colleghi a capire immediatamente quale parte del software è stata toccata senza dover aprire il codice.

Non esiste una lista obbligatoria (dipende dal tuo progetto), ma queste sono le **convenzioni standard** usate nel mondo reale:

**Scopes Visivi & UI**
Usali quando tocchi l'interfaccia grafica.

* **`ui`**: Modifiche generali all'aspetto (colori, caratteri, distanze tra elementi)
* **`navbar`** / **`header`**: Modifiche alla barra in alto della pagina
* **`footer`**: Modifiche al piè di pagina in fondo
* **`sidebar`**: Modifiche al menu a lato
* **`mobile`**: Correzioni per dispositivi mobili (layout adattivo, problemi iOS)
* **`tablet`**: Miglioramenti per tablet
* **`desktop`**: Modifiche per schermi grandi
* **`layout`**: Modifiche alla struttura generale della pagina
* **`animations`**: Aggiungi o modifica animazioni e movimenti
* **`theme`**: Temi chiari/scuri e personalizzazioni colore
* **`icons`**: Modifiche alle icone
* **`typography`**: Modifiche a dimensione, tipo e stile del testo
* **`colors`**: Modifiche alla palette di colori
* **`spacing`**: Modifiche a margini e spaziature
* **`grid`**: Sistema a griglia per organizzare contenuti in colonne
* **`modal`** / **`dialog`**: Finestre popup che si aprono sopra la pagina
* **`tooltip`**: Piccoli messaggi che appaiono al passaggio del mouse
* **`dropdown`**: Menu a tendina che si apre cliccando
* **`tabs`**: Schede cliccabili per cambiare contenuto
* **`cards`**: Riquadri contenitori per informazioni
* **`buttons`**: Stili e varianti dei bottoni
* **`forms-ui`**: Aspetto di campi input, checkbox, radio button
* **`tables`**: Tabelle con righe e colonne
* **`breadcrumbs`**: Percorso di navigazione (Home > Prodotti > Dettaglio)
* **`pagination`**: Controlli per navigare tra pagine (1, 2, 3...)
* **`loading`** / **`spinner`**: Icone rotanti di caricamento
* **`badges`**: Etichette piccole con numeri o testo (es. "Nuovo", "3")
* **`alerts`** / **`notifications`**: Messaggi di avviso o notifica
* **`carousel`** / **`slider`**: Gallerie di immagini scorrevoli
* **`accordion`**: Sezioni che si aprono/chiudono cliccando
* **`skeleton`**: Placeholder grigiastri mostrati durante il caricamento

**Scopes Funzionali**
Usali quando tocchi il funzionamento dell'applicazione.

* **`auth`**: Login, registrazione, recupero password
* **`api`**: Comunicazione con il server
* **`search`**: Barra di ricerca e risultati
* **`cart`** / **`checkout`**: Carrello spesa e pagamento
* **`profile`** / **`user`**: Profilo utente e impostazioni account
* **`forms`**: Moduli per inserire dati (contatti, registrazione)
* **`validation`**: Controllo che i dati inseriti siano corretti
* **`filters`**: Filtri per liste prodotti (prezzo, categoria, ecc.)
* **`sorting`**: Ordinamento risultati (per nome, prezzo, data)
* **`router`** / **`routing`**: Navigazione tra le pagine del sito
* **`state`**: Gestione dei dati condivisi nell'app
* **`storage`**: Salvataggio dati nel browser
* **`cookies`**: Gestione cookie e consenso
* **`i18n`** / **`localization`**: Traduzioni in altre lingue
* **`analytics`**: Tracciamento statistiche visite
* **`seo`**: Ottimizzazione per motori di ricerca
* **`a11y`** / **`accessibility`**: Accessibilità per disabili
* **`performance`**: Miglioramenti velocità caricamento
* **`caching`**: Salvataggio temporaneo per velocizzare
* **`upload`**: Caricamento file dal computer
* **`download`**: Scaricamento file sul computer
* **`print`**: Stampa pagine o creazione PDF
* **`share`**: Condivisione sui social o via link
* **`comments`**: Sezione commenti
* **`ratings`**: Valutazioni con stelle o voti
* **`favorites`** / **`wishlist`**: Lista preferiti o desideri
* **`notifications`**: Notifiche push, email o in-app
* **`subscriptions`**: Iscrizione newsletter
* **`payments`**: Pagamenti online (Stripe, PayPal)
* **`invoices`**: Fatture e ricevute
* **`reports`**: Creazione report e statistiche
* **`exports`**: Esportazione dati (Excel, CSV, PDF)
* **`imports`**: Importazione dati da file
* **`webhooks`**: Notifiche automatiche tra sistemi
* **`cron`**: Operazioni automatiche programmate
* **`email`**: Invio email automatiche
* **`sms`**: Invio messaggi SMS
* **`chat`**: Chat dal vivo
* **`video`**: Riproduzione video
* **`audio`**: Riproduzione audio
* **`maps`**: Mappe interattive
* **`geolocation`**: Rilevamento posizione utente
* **`calendar`**: Calendario eventi
* **`scheduler`**: Prenotazione appuntamenti
* **`booking`**: Sistema prenotazioni
* **`inventory`**: Gestione magazzino e disponibilità
* **`shipping`**: Spedizioni e tracciamento pacco
* **`refunds`**: Rimborsi e resi

**Scopes Tecnici & Infrastruttura**

* **`build`**: Configurazione compilazione progetto
* **`config`**: File impostazioni e configurazione
* **`deps`**: Aggiornamento librerie esterne
* **`docker`**: Configurazione container Docker
* **`ci`** / **`cd`**: Automazione deploy e test
* **`tests`**: Test automatici del codice
* **`lint`**: Regole formattazione codice
* **`scripts`**: Script automazione comandi
* **`migrations`**: Modifiche struttura database
* **`seeds`**: Dati di esempio per database
* **`backup`**: Backup e ripristino dati
* **`logging`**: Registrazione log ed errori
* **`monitoring`**: Monitoraggio errori in produzione
* **`security`**: Correzioni sicurezza
* **`env`**: Variabili ambiente (chiavi API, ecc.)
* **`ssl`**: Certificati sicurezza HTTPS
* **`dns`**: Configurazione dominio
* **`cdn`**: Rete distribuzione contenuti veloce
* **`server`**: Configurazione server web
* **`db`** / **`database`**: Database e ottimizzazione query
* **`graphql`**: API GraphQL
* **`rest`**: API REST
* **`websocket`**: Connessioni in tempo reale
* **`redis`**: Cache veloce in memoria
* **`queue`**: Code di elaborazione asincrona
* **`workers`**: Processi in background

**Scopes per Componenti Specifici**

* **`admin`**: Pannello amministrazione
* **`dashboard`**: Cruscotto principale utente
* **`home`**: Pagina iniziale
* **`about`**: Pagina chi siamo
* **`contact`**: Pagina contatti
* **`blog`**: Sezione articoli blog
* **`docs`**: Documentazione
* **`faq`**: Domande frequenti
* **`legal`**: Privacy e termini servizio
* **`pricing`**: Pagina prezzi
* **`landing`**: Pagina atterraggio marketing
* **`onboarding`**: Guida primi passi nuovi utenti
* **`settings`**: Pagina impostazioni
* **`help`**: Centro assistenza

**Scopes Generici Utili**

* **`hotfix`**: Correzioni urgenti
* **`refactor`**: Riorganizzazione codice senza nuove funzioni
* **`cleanup`**: Pulizia codice vecchio o inutilizzato
* **`deps-dev`**: Librerie solo per sviluppo
* **`readme`**: Aggiornamenti documentazione README
* **`changelog`**: Aggiornamenti registro modifiche
* **`release`**: Preparazione nuova versione
* **`wip`**: Lavoro in corso (non usare su branch principale)

**Suggerimento**: Scegli sempre lo scope più specifico possibile. Se devi toccare più aree, considera di fare commit separati o usa scope multipli come `fix(auth,api): ...`

---

**Come scegliere l'ambito giusto?**

La regola d'oro è: **Sii specifico, ma non troppo.**

* ❌ *Troppo vago:* `feat(code): ...` (Tutto è codice)
* ❌ *Troppo specifico:* `feat(button-rosso-in-basso): ...` (Troppo dettaglio)
* ✅ *Giusto:* `feat(ui): ...` oppure `feat(profile): ...`

**Esempio di Scelta:**
Hai cambiato il colore del bottone "Logout" nella Navbar?

* Se l'hai cambiato *solo lì*: `style(navbar): update logout button color`
* Se l'hai cambiato in *tutto il sito*: `style(ui): update primary button color`

---

**3. Esempi Pratici: Male vs Bene**

| ❌ Male | ✅ Bene | Perché? |
| --- | --- | --- |
| `git commit -m "fix"` | `git commit -m "fix(cart): prevent negative quantity"` | Spiega *cosa* e *dove* è stato risolto. |
| `git commit -m "new stuff"` | `git commit -m "feat(profile): add avatar upload"` | So esattamente che feature è stata aggiunta. |
| `git commit -m "wip"` | `git commit -m "style(home): fix indentation alignment"` | "Wip" non vuol dire nulla. `style` dice che è solo estetica. |
| `git commit -m "update"` | `git commit -m "chore(deps): update react to v19"` | "Update" è vago. `chore` implica manutenzione. |