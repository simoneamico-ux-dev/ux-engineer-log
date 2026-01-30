---
sidebar_position: 5
title: Workflow Produzione
description: Autenticazione SSH, NPM, Mobile Testing e Ottimizzazione Asset.
---

# Git & GitHub Real World Vademecum

## Parte V: Workflow Produzione

Ora che conosci Git a fondo, impariamo a usarlo nel mondo reale: come configurare l'autenticazione, gestire progetti NPM, testare su mobile e ottimizzare asset per la produzione.

### 14. Autenticazione SSH

Dimentica la password del tuo account GitHub. Dal 2021, GitHub **non accetta più le password** quando usi Git dal terminale. Devi usare una **Chiave SSH** - è più sicura e una volta configurata non devi più digitare nulla.

#### Il Modello Mentale: Chiave Fisica vs Password

Immagina la differenza tra dire una parola segreta al portiere di un edificio e avere una chiave fisica personale.

Una **password** funziona come una parola segreta che dici al portiere: chiunque la senta può ripeterla ed entrare. È per questo che le password possono essere intercettate o rubate facilmente.

Una **chiave SSH** invece funziona come una chiave fisica speciale divisa in due pezzi che si incastrano perfettamente. Tu hai la metà che apre (la chiave **Privata**, conservata sul tuo computer e **mai condivisa**), mentre GitHub ha la serratura corrispondente (la chiave **Pubblica**, che puoi condividere liberamente). Quando ti connetti, è come se inserissi la tua chiave nella serratura: se i due pezzi combaciano, la porta si apre. Nessuno deve dire parole segrete ad alta voce, nessuno può intercettare nulla - basta "inserire la chiave" e il sistema verifica matematicamente che sei tu.

---

#### Procedura Setup (Una Volta Sola)

Questa procedura si fa **una sola volta** sul tuo computer. Poi funziona per sempre con tutti i repository GitHub.

**Step 1 - Genera la coppia di chiavi (Privata + Pubblica):**

Apri il terminale e incolla questo comando (sostituisci con la tua email GitHub):

```bash
ssh-keygen -t ed25519 -C "tua@email.com"
```

**Cosa ti chiederà:**
1. *"Enter file in which to save the key"* → Premi semplicemente **Invio** (usa la posizione predefinita)
2. *"Enter passphrase"* → Premi **Invio** (lascia vuoto, altrimenti dovrai digitare una password ogni volta)
3. *"Enter same passphrase again"* → Premi **Invio** di nuovo

Cosa è successo? Hai creato due file nella cartella `~/.ssh/`:
- `id_ed25519` → Chiave PRIVATA (mai condividere!)
- `id_ed25519.pub` → Chiave PUBBLICA (questa la dai a GitHub)

---

**Step 2 - Attiva l'agente SSH (il gestore delle chiavi):**

L'agente SSH è come un portachiavi digitale che tiene in memoria la tua chiave privata. Così non devi ricaricarla ogni volta.

```bash
eval "$(ssh-agent -s)"
```

Vedrai un output tipo `Agent pid 12345` - significa che l'agente è attivo.

Ora aggiungi la tua chiave privata all'agente:

```bash
ssh-add ~/.ssh/id_ed25519
```

Vedrai `Identity added: ...` - perfetto, la chiave è caricata.

---

**Step 3 - Copia la chiave PUBBLICA (quella da dare a GitHub):**

Devi copiare il contenuto del file `id_ed25519.pub` (la chiave pubblica). Usa questo comando che la copia automaticamente negli appunti:

**Mac:**
```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

**Windows (Git Bash o PowerShell):**
```bash
cat ~/.ssh/id_ed25519.pub | clip
```

**Linux:**
```bash
cat ~/.ssh/id_ed25519.pub
```
Poi seleziona tutto l'output e copialo manualmente (Ctrl+Shift+C)

Ora hai la chiave pubblica copiata - è una stringa lunghissima che inizia con `ssh-ed25519 ...`

---

**Step 4 - Consegna la chiave pubblica a GitHub:**

1. Vai su [GitHub.com](https://github.com) e fai login
2. Clicca sulla tua foto profilo in alto a destra → **Settings**
3. Nel menu a sinistra → **SSH and GPG keys**
4. Clicca il pulsante verde **New SSH key**
5. Compila:
   - **Title:** `Mac di Casa` (o `PC Lavoro`, qualcosa che ti ricordi quale computer è)
   - **Key:** Incolla la stringa che hai copiato (Cmd+V o Ctrl+V)
6. Clicca **Add SSH key**
7. GitHub potrebbe chiederti di confermare la password - digitala

Fatto! GitHub ora riconosce il tuo computer quando ti connetti.

---

**Step 5 - Testa che funzioni:**

Per verificare che tutto sia configurato correttamente:

```bash
ssh -T git@github.com
```

La prima volta ti chiederà:
```
Are you sure you want to continue connecting (yes/no)?
```
Scrivi `yes` e premi Invio.

Se funziona vedrai:
```
Hi TUO_USERNAME! You've successfully authenticated...
```

Perfetto! Sei pronto a usare Git con SSH.

---

**IMPORTANTE - Usa sempre SSH, non HTTPS:**

Quando cloni un repository, GitHub ti mostra due link:

- **HTTPS:** `https://github.com/user/repo.git` ❌
- **SSH:** `git@github.com:user/repo.git` ✅

**Usa SEMPRE il link SSH** (quello che inizia con `git@github.com`). 

Come clonare correttamente:
```bash
git clone git@github.com:user/repo.git
```

**Perché?** Se usi HTTPS, Git ti chiederà username e password ogni volta - e la password non funziona più! Con SSH invece è tutto automatico, non devi digitare niente.

---

**Se hai già clonato con HTTPS per sbaglio:**

Puoi cambiare l'URL del remote da HTTPS a SSH:
```bash
git remote set-url origin git@github.com:user/repo.git
```

Verifica che sia cambiato:
```bash
git remote -v
```

Dovresti vedere `git@github.com` invece di `https://`.

---

**Problemi comuni:**

**"Permission denied (publickey)"**
- La chiave SSH non è configurata correttamente
- Ricontrolla di aver aggiunto la chiave a GitHub (Step 4)
- Verifica con `ssh -T git@github.com`

**"Could not open a connection to your authentication agent"**
- L'agente SSH non è avviato
- Rilancia `eval "$(ssh-agent -s)"` e poi `ssh-add ~/.ssh/id_ed25519`

**Se hai più account GitHub (ad esempio lavoro + personale):**

La situazione si complica un po' se hai bisogno di usare più account GitHub sullo stesso computer - ad esempio un account personale per i tuoi progetti e uno aziendale per il lavoro. In questo caso la procedura di massima è:

1. Generi una seconda chiave SSH con un nome diverso (ad esempio `id_ed25519_work` per il lavoro e `id_ed25519_personal` per uso personale)
2. Aggiungi entrambe le chiavi pubbliche ai rispettivi account GitHub
3. Crei un file di configurazione `~/.ssh/config` dove specifichi quale chiave usare per ogni account
4. Quando cloni repository, usi "alias" diversi (tipo `git@github-work:...` vs `git@github-personal:...`) e il sistema sa automaticamente quale chiave usare

Non è difficile ma richiede qualche passaggio in più rispetto al setup base. Se ti trovi in questa situazione, cerca su Google "multiple SSH keys GitHub" per trovare guide dettagliate passo-passo che ti mostreranno esattamente come configurare il file config.

<br />

### 15. Operazioni di Progetto (NPM)

**Regola:** Non puoi avviare il motore se non sei salito in macchina. Usa sempre `cd nome-progetto` per entrare nella cartella del progetto PRIMA di lanciare qualsiasi comando NPM.

**Prima Volta con un Progetto (Setup Iniziale)**

Quando cloni un repository o scarichi un progetto, devi installare tutte le dipendenze:
```bash
npm install
```

Questo comando legge il file `package.json` (che contiene la lista di tutte le librerie necessarie) e scarica tutto dentro la cartella `node_modules/`. Ci vogliono 1-2 minuti. Vedrai una barra di caricamento. Questo si fa **una sola volta** all'inizio, oppure ogni volta che qualcuno aggiunge nuove librerie al progetto.

---

**DEVELOPMENT MODE (Mentre lavori)**

Avvia un server di sviluppo locale che monitora i tuoi file e ricarica automaticamente la pagina quando salvi le modifiche (hot reload):
```bash
npm run start
```

Oppure, dipende dal progetto:
```bash
npm run dev
```

Il server si avvia di solito su `http://localhost:3000` (o porta 5173 per Vite). Lascia aperto il terminale mentre lavori - se lo chiudi, il server si spegne.

**Problema comune - Porta già occupata:**
Se vedi errore tipo "Port 3000 is already in use", significa che hai già un server avviato in un altro terminale. Chiudi quello vecchio (Ctrl+C) oppure il nuovo server si avvierà automaticamente su una porta diversa (tipo 3001).

---

**PRODUCTION BUILD (Per pubblicare)**

Quando sei pronto per pubblicare il sito online, prima pulisci la vecchia build per evitare conflitti con file obsoleti:

**Mac/Linux:**
```bash
rm -rf build/
```

Oppure se usi dist:
```bash
rm -rf dist/
```

**Windows (PowerShell):**
```bash
Remove-Item -Recurse -Force build
```

Oppure:
```bash
Remove-Item -Recurse -Force dist
```

Poi crea una versione ottimizzata pulita:
```bash
npm run build
```

Questo comando crea una cartella chiamata `build/` (o `dist/`) con file minimizzati, compressi e ottimizzati. Questi file sono pronti per essere caricati su un hosting. Il processo rimuove spazi, commenti, riduce nomi variabili - tutto ciò che rende i file più leggeri e veloci da caricare.

**Perché cancellare la build vecchia?** Se modifichi o rinomini file, la vecchia build potrebbe contenere file obsoleti che non servono più ma occupano spazio. Cancellarla prima garantisce una build pulita al 100%.

**Differenza tra dev e build:**
- **Dev mode** → File grandi, leggibili, con hot reload. Solo per sviluppo locale.
- **Build** → File compressi, illeggibili, ultra-ottimizzati. Per il sito in produzione.

---

**TESTARE LA BUILD PRIMA DEL DEPLOY**

Prima di pubblicare online, devi testare la build in locale per assicurarti che tutto funzioni:

**Con Vite:**
```bash
npm run preview
```

**Con altri bundler (Webpack, ecc.):**
```bash
npx serve -s build
```

Oppure:
```bash
npx http-server build
```

Questo avvia un server locale che serve i file dalla cartella `build/` o `dist/` - esattamente come farebbe il server di produzione. Apri `http://localhost:4173` (o la porta indicata) e testa che:
- Non ci siano errori nella console
- Funzionino tutti i link
- Si carichino le immagini
- Siano funzionanti i collegamenti alle diverse API

**Perché è importante?** La build di produzione è diversa dal dev mode: file compressi, variabili d'ambiente diverse, percorsi assoluti vs relativi. Un sito che funziona in dev potrebbe avere bug in produzione. Testare la build PRIMA di pubblicare ti salva da brutte sorprese.

---

**Pulizia cache NPM (solo se hai problemi):**

Se NPM si comporta in modo strano (dipendenze che non si installano, errori inspiegabili), puoi pulire la cache:
```bash
npm cache clean --force
```

Questo cancella la cache interna di NPM. Di solito non serve, ma può risolvere problemi rari.

---

**IMPORTANTE - Build e .gitignore:**

Assicurati che `build/` (o `dist/`) sia sempre nel tuo `.gitignore`:
```gitignore
build/
dist/
```
La build NON va mai committata su Git - è pesante, inutile (si rigenera con `npm run build`) e può causare conflitti. Ogni ambiente (sviluppo, staging, produzione) genera la propria build.

<br />

### 16. Mobile Testing (Rete Locale)

Ricorda che il 60-70% del traffico web viene da mobile. Ecco come testare il tuo progetto sul tuo smartphone usando la rete Wi-Fi, senza pubblicare nulla online.

**Step 1 - Esponi il server sulla rete locale:**

Avvia il server in modalità "accessibile da altri dispositivi":
```bash
npm run start -- --host 0.0.0.0
```

Per Vite:
```bash
npm run dev -- --host
```

Normalmente il server ascolta solo su `localhost` (accessibile solo dal tuo computer). Con `--host 0.0.0.0` lo rendi accessibile a tutti i dispositivi connessi alla stessa rete Wi-Fi.

---

**Step 2 - Trova l'indirizzo IP del tuo computer:**

Devi scoprire l'indirizzo IP locale del tuo computer sulla rete alla quale è collegato (ad esempio `192.168.1.15`):

**Mac/Linux:**
```bash
ipconfig getifaddr en0
```

Se non funziona, prova:
```bash
ifconfig | grep "inet "
```

**Windows:**
```bash
ipconfig
```
Cerca la riga "Indirizzo IPv4" (di solito inizia con `192.168...`)

---

**Step 3 - Accedi dal telefono:**

1. Assicurati che il tuo smartphone sia connesso alla **stessa rete Wi-Fi** del computer
2. Apri il browser sul quale vuoi testare dal telefono
3. Digita nella barra indirizzi: `http://192.168.1.XX:3000`  
   (sostituisci le `XX` con l'IP che hai trovato e `3000` con la porta del tuo server)

**Esempio:** Se il tuo IP è `192.168.1.47` e il server usa la porta `5173`, vai su `http://192.168.1.47:5173`

---

**Problemi comuni:**

**Il telefono non si connette?**
- Verifica che computer e telefono siano sulla **stessa Wi-Fi** (non usa dati cellulare sul telefono!)
- Controlla il firewall del computer (potrebbe bloccare connessioni esterne)
- Windows: apri "Windows Defender Firewall" → "Consenti app" → Aggiungi Node.js

**Serve HTTPS per alcune funzionalità?**
Camera, microfono, geolocalizzazione funzionano solo con HTTPS. Per testare localmente con HTTPS, usa tool come:
- **ngrok** (tunnel temporaneo con HTTPS): `npx ngrok http 3000`
- **Cloudflare Tunnel** (alternativa gratuita)

Questi creano un URL tipo `https://abc123.ngrok.io` accessibile da ovunque (anche fuori dalla tua rete).

**Trucco PRO - QR Code rapido:**

Alcuni tool (come Vite) mostrano automaticamente un QR code nel terminale quando avvii il server con `--host`. Scansionalo col telefono per aprire il sito istantaneamente senza digitare l'IP!

<br />

### 17. Strategia Ottimizzazione Asset

Non committare mai file multimediali "grezzi" nel repository Git. Appesantiscono il repository **per sempre** perché Git ricorda l'intera storia - anche se cancelli un file, resta nella cronologia e occupa spazio a chiunque clona il progetto.

**Perché è un problema?**

Immagina un progetto con 50 commit. Al commit 10 hai aggiunto un video da 100MB, al commit 20 l'hai cancellato. Chiunque clona il repository scaricherà comunque quei 100MB perché fanno parte della storia. Dopo anni, il repository diventa enorme anche se i file "pesanti" non ci sono più.

---

**Regole per Asset Ottimizzati:**

**Immagini:**

Converti sempre le tue immagini in formato **WebP** - sono 60-80% più leggere di PNG o JPG mantenendo praticamente la stessa qualità visiva. Il tool migliore per farlo è **[Squoosh](https://squoosh.app)**, uno strumento gratuito sviluppato da Google Chrome Labs che funziona direttamente nel browser senza installare nulla. Basta trascinare l'immagine, scegliere WebP come formato di output, e scaricare il risultato.

Per quanto riguarda la risoluzione, cerca di non esagerare: 1920px di larghezza è più che sufficiente per il 99% degli schermi. Non ha senso servire immagini 4K da 3840px se poi il tuo container CSS è largo solo 400px - stai solo sprecando banda e rallentando il caricamento. Se hai bisogno di controllare la risoluzione esatta di un'immagine (in px × px) e su Mac il classico Cmd+I non te la mostra, usa **[Metadata2Go](https://www.metadata2go.com/)** - carichi l'immagine e ti dice tutte le informazioni tecniche comprese le dimensioni precise.

---

**Video:**

Le GIF animate sono obsolete e pesantissime - un formato ormai superato che non ha più senso usare. Converti sempre le GIF in **WebM** o **MP4**, otterrai un risparmio del 80-90% di peso mantenendo la stessa qualità. I browser moderni supportano tutti i video in loop, quindi non c'è motivo di usare ancora GIF. Il tool più semplice da usare è **[CloudConvert](https://cloudconvert.com/gif-to-webm)** - funziona online, carichi la GIF e ti restituisce il WebM pronto. Poi nel codice HTML usi semplicemente `<video autoplay loop muted>` al posto della GIF e il gioco è fatto.

---

**Mappa Struttura Progetto (per AI e documentazione):**

Per generare una mappa della struttura del progetto - serve quando usi AI nella piattaforma web (ChatGPT, Claude, Gemini) che non hanno accesso ai file, mentre con gli agenti AI non è necessaria perché leggono direttamente il codice. Utile anche per documentazione:

**Mac/Linux:**
```bash
find . -not -path '*/.*' -not -path './node_modules*' > struttura-progetto.txt
```

**Windows (PowerShell):**
```bash
tree /F /A > struttura-progetto.txt
```

Questo crea un file di testo con l'albero delle cartelle, escludendo `node_modules` e file nascosti. Ottimo da allegare quando chiedi aiuto a una AI mostrandole com'è organizzato il progetto.

---

**Trucco finale - .gitignore per asset di build:**

Ci sono cartelle che si generano automaticamente quando fai `npm run build` o quando usi script di ottimizzazione. Queste cartelle NON vanno mai committate su Git perché:
- Sono pesanti e inutili (si rigenerano ogni volta)
- Cambiano continuamente ad ogni build
- Creano conflitti se più persone lavorano sul progetto

**Assicurati che siano nel tuo `.gitignore`:**
```gitignore
build/                  # La build di produzione (Create React App)
dist/                   # La build di produzione (Vite, Webpack)
*.map                   # Source maps (file di debug generati automaticamente)
optimized-images/       # Se hai uno script che ottimizza le immagini
```

**Come funziona nella pratica:**

Immagina di avere uno script NPM che converte automaticamente tutte le immagini PNG in WebP e le salva in una cartella `optimized-images/`. Questa cartella non va committata perché:
1. Chiunque clona il progetto può rigenerarla eseguendo lo stesso script
2. Se modifichi un'immagine originale, quella ottimizzata diventa obsoleta
3. Appesantisce il repository senza motivo

La regola è: **committa solo i file sorgente originali**, mai quelli generati automaticamente. Il workflow corretto è:
- **Committa:** file originali (es. `logo.png`)
- **NON committare:** file generati (es. `logo.webp` se creato da uno script)
- **Rigenera:** ogni ambiente (locale, staging, produzione) esegue lo script di build e ottimizzazione