---
sidebar_position: 4
title: Gestione Avanzata
description: Branching, Merge vs Rebase, Conflitti, .gitignore, stash e restore.
---

# Git & GitHub Real World Vademecum

## Parte IV: Gestione Avanzata

Un **Branch** è una linea temporale parallela. Puoi fare esperimenti e rompere tutto senza conseguenze sul codice principale. In questa sezione imparerai a gestire branch, conflitti e tutte le tecniche avanzate di Git.

### 8. Gestione Branch

#### Cambiare Universo (Switch)

Crea il ramo 'feat-login' e spostati lì immediatamente:

```bash
git switch -c feat-login
```

---

#### Unire gli Universi (Merge) - Solo Progetti Personali

Se lavori da solo, puoi unire i rami in locale:

1. Torna a casa (Base):

```bash
git switch main
```

2. Fondi la feature dentro la base:

```bash
git merge feat-login
```

<br />

### 9. Il Bivio Filosofico: Merge vs Rebase

Quando devi unire due storie, Git ti offre due strade. La scelta cambia il modo in cui viene scritta la Storia del progetto.

#### **Merge: "Il Nodo" (La scelta sicura)**

Questo è il metodo standard che Git usa di default. Funziona così: Git prende la tua storia parallela (il tuo branch con tutti i tuoi commit) e la unisce alla storia principale creando un "Merge Commit" - praticamente un nodo di giunzione che dice "qui si sono unite due strade diverse".

**Come immaginarlo:** Pensa a due binari del treno che si separano in due percorsi paralleli per un po', poi si ricongiungono. Anche se guardi la mappa tra 10 anni, vedrai chiaramente che in quel punto il percorso si era diviso, i due treni hanno viaggiato separati per un tratto, e poi si sono riuniti. La storia è trasparente e onesta.

Il grande vantaggio del merge è che **non è distruttivo** - la storia reale viene preservata fedelmente esattamente come è successa. Puoi vedere quando hai creato il branch, quando hai lavorato sui tuoi commit, quando qualcun altro ha pushato su main, e quando avete unito tutto. È come un diario sincero degli eventi.

Il lato negativo? Se tutti i membri del team usano merge continuamente, la cronologia del progetto può diventare un groviglio quasi illeggibile di linee intrecciate che vanno avanti e indietro - spesso viene chiamata ironicamente visualizzazione "Guitar Hero" perché somiglia alla grafica del videogioco, con note colorate che si incrociano ovunque. Funziona perfettamente, ma è brutta da vedere.

---

#### **Rebase: "La Riscrittura" (La scelta estetica)**

Qui avviene la magia nera di Git. Il rebase prende i tuoi commit uno per uno, li stacca completamente dalla loro base originale (il punto dove avevi creato il branch) e li "incolla" alla fine della storia attuale, facendo finta che tu abbia scritto tutto il codice stamattina invece che la settimana scorsa.

**Come immaginarlo:** È un "Copia e Incolla" che viaggia nel tempo. Immagina di aver scritto un capitolo del tuo libro la settimana scorsa quando eri al capitolo 5. Nel frattempo qualcun altro ha scritto i capitoli 6, 7 e 8. Con il rebase, strappi fisicamente le pagine che avevi scritto (capitolo 5 bis) e le rincolli in fondo al libro dopo il capitolo 8, cambiando anche la data di scrittura per far sembrare che le hai scritte oggi. Il contenuto è identico, ma la timeline è stata manipolata.

Il grande vantaggio del rebase è che la storia diventa una **linea retta perfetta**, pulitissima, senza rami o biforcazioni. Quando leggi il log dei commit sembra che ogni sviluppatore abbia sempre lavorato in sequenza ordinata, uno dopo l'altro. Leggere la cronologia diventa un piacere - è elegante, lineare, professionale.

Ma c'è un **pericolo nascosto molto serio:** stai letteralmente **riscrivendo la storia**. I vecchi commit vengono distrutti per sempre e ne vengono creati di nuovi con codici hash completamente diversi. È come se quei commit vecchi non fossero mai esistiti - Git li sostituisce con copie che sembrano uguali ma tecnicamente sono oggetti diversi. Questo può creare problemi enormi se altre persone stavano lavorando su quei commit originali.

Esempio: Sposto i miei commit DOPO l'ultimo aggiornamento del main
```bash
git switch feat-login
git rebase main
```

---

**La Regola del Rebase:**

> **Non fare MAI Rebase su un ramo condiviso.**
> Fallo solo sui tuoi rami privati (quelli su cui lavori solo tu). Se fai Rebase su un ramo che stanno usando anche i tuoi colleghi, distruggerai la loro sincronizzazione e ti odieranno.
> * Usa il **Rebase** per pulire il *tuo* lavoro prima di consegnarlo.
> * Usa il **Merge** per unire il lavoro *del team*.

<br />

### 10. I Conflitti (Merge Conflicts)

Nel mondo ideale, Git unisce tutto automaticamente. Nella realtà, capita questo scenario:

* Tu modifichi la riga 10 di `style.css` (Colore: Blu).
* Il tuo collega modifica la riga 10 di `style.css` (Colore: Rosso).

Quando provi a unire (sia con Merge che con Rebase), Git va in panico e urla: **CONFLICT**.

**Modello Mentale:**
Non è un errore, è una domanda. Immagina due scrittori che lavorano sullo stesso libro. Se scrivono frasi diverse sulla stessa riga, l'editore (Git) si ferma e chiede: *"Ehi, qui ci sono due versioni. Quale devo stampare?"*

**Come Risolvere (Esempio Pratico):**

1. Git ti dice: `CONFLICT (content): Merge conflict in style.css`.
2. Apri `style.css` nel tuo editor. Vedrai questo orrore:

```css
body {
<<<<<<< HEAD
  background-color: blue;  (La tua versione)
=======
  background-color: red;   (La versione del collega/server)
>>>>>>> feat-login
}
```

3. **Devi decidere.** Vuoi il blu o il rosso? O magari viola?
4. Cancella i segni strani (`<<<<`, `====`, `>>>>`) e lascia solo il codice pulito:

```css
body {
  background-color: blue;
}
```

5. Salva il file, fai `git add .` e `git commit`. Conflitto risolto.

<br />

### 11. La Lista VIP: `.gitignore` (Il Buttafuori del Repository)

Immagina Git come un album fotografico: non vuoi che finiscano dentro foto sfocate, duplicate o troppo pesanti. Ci sono file che **NON devono mai** entrare nel repository perché:
- Sono troppo grandi e rallenterebbero tutto
- Contengono password o chiavi segrete
- Si possono rigenerare facilmente
- Sono specifici solo del tuo computer

**Come funziona il Buttafuori (`.gitignore`):**

Crea un file chiamato esattamente `.gitignore` nella cartella principale del tuo progetto. Questo file dice a Git: "Ehi, ignora questi file, non tracciarli mai!"

**Cosa scrivere dentro (esempi pratici):**

**1. Cartella `node_modules/` (Librerie NPM)**
```text
node_modules/
```
**Perché?** Questa cartella pesa centinaia di MB e si ricrea con un semplice `npm install`. Non ha senso salvarla.

---

**2. File `.DS_Store` (spazzatura Mac)**
```text
.DS_Store
```
**Perché?** È un file invisibile che Mac crea per ricordarsi come sono posizionate le icone. Inutile per gli altri.

---

**3. File `.env` (PASSWORD E SEGRETI)**
```text
.env
.env.local
*.key
*.pem
```
**Perché?** Contiene chiavi API, password database, token segreti. Se finiscono su GitHub **PUBBLICO**, sei nei guai!

---

**4. Cartelle di Build/Compilazione**
```text
build/
dist/
out/
.next/
```
**Perché?** Sono file generati automaticamente dalla compilazione. Si rigenerano con `npm run build`.

---

**5. File di log e cache**
```text
*.log
.cache/
.vscode/
.idea/
```
**Perché?** Sono file temporanei o specifici del tuo editor.

---

**Come funziona nella pratica:**

1. Crei il file `.gitignore`
2. Scrivi dentro i pattern dei file da ignorare (uno per riga)
3. Salvi il file
4. Git automaticamente **smette di tracciare** quei file

Puoi usare dei template già pronti. Cerca su Google "gitignore per [tuo linguaggio]" oppure usa il sito [gitignore.io](https://gitignore.io) che genera il file perfetto per te!

**ATTENZIONE:** Se hai già committato un file per sbaglio PRIMA di aggiungerlo a `.gitignore`, devi rimuoverlo manualmente con:
```bash
git rm --cached nome-file.env
```
Questo lo toglie da Git ma lo lascia sul tuo computer.

<br />

### 12. Il Salvagente Temporaneo: `git stash` (Lo Scatolone Magico)

**Scenario reale:** Sei al lavoro. Hai smontato completamente il "motore" della funzionalità carrello - 5 file aperti, modifiche a metà, codice che non compila ancora, warning ovunque. Stai testando una nuova logica di calcolo sconti e per ora è tutto rotto.

Improvvisamente squilla il telefono. È il capo: *"FERMA TUTTO! Il sito è in down, gli utenti non riescono a fare il checkout! C'è un bug critico in produzione, devi fixarlo SUBITO sul branch `main`!"* 

Panico. Devi switchare sul branch `main` immediatamente per sistemare il disastro, ma hai un problema: hai il tuo workspace completamente distrutto con modifiche a metà. Se provi a cambiare branch, Git ti blocca dicendoti *"error: Your local changes would be overwritten by checkout"*. Non puoi fare commit perché il codice è rotto e incompleto. Sei bloccato. Cosa fai?

**La soluzione: `git stash` (lo scatolone temporaneo sotto la scrivania)**

Immagina di avere uno scatolone magico dove puoi ficcare dentro tutto il disordine della tua scrivania in un secondo, lavorare su altro con la scrivania pulita, e poi tirare fuori tutto esattamente come era quando hai finito.

**Ecco come ti salvi:**

Nel panico, con il capo che aspetta, digita velocemente:
```bash
git stash
```

Git ti risponderà qualcosa tipo:
```
Saved working directory and index state WIP on feature-carrello: a3f2b1c Aggiunta validazione form
```

Cosa è successo? **Le tue modifiche sono scomparse!** Guarda i tuoi file: sono tornati puliti, come nell'ultimo commit. Il codice compila di nuovo, niente errori. Ma non preoccuparti, non hai perso nulla. Git ha messo tutto nello "scatolone" (chiamato tecnicamente "stash").

Ora sei libero! Puoi correre sul branch `main`:
```bash
git switch main
```

Sistemare il bug critico, testare, fare commit, pushare in produzione. Crisi risolta, capo contento.

Quando finalmente hai 5 minuti di respiro, torni sul tuo branch:
```bash
git switch feature-carrello
```

E tiri fuori lo scatolone:
```bash
git stash pop
```

**PUFF!** Le tue modifiche riappaiono magicamente esattamente come le avevi lasciate - codice rotto, warning, logica a metà e tutto. Puoi continuare a lavorare da dove eri rimasto, come se non fosse successo nulla.

---

**Comandi utili per gestire lo scatolone:**

Se vuoi vedere cosa c'è nello scatolone senza tirarlo fuori:
```bash
git stash list
```
Vedrai qualcosa tipo:
```
stash@{0}: WIP on feature-carrello: a3f2b1c Aggiunta validazione form
stash@{1}: WIP on fix-navbar: b2c3d4e Correzione menu mobile
```

Puoi avere **più scatoloni** impilati (uno sopra l'altro). Il numero tra parentesi graffe `{0}` è il più recente. Magari domani ti capita di nuovo un'emergenza mentre stai lavorando su altro - nessun problema, fai un altro stash e avrai due scatoloni.

---

Se vuoi applicare uno scatolone specifico (non per forza l'ultimo):
```bash
git stash apply stash@{1}
```

La differenza tra `pop` e `apply`? 
- `git stash pop` → tira fuori e **cancella** lo scatolone (è sparito dalla lista)
- `git stash apply` → tira fuori ma **lascia** lo scatolone nella lista (copia)

---

Se vuoi cancellare uno scatolone senza applicarlo:
```bash
git stash drop stash@{0}
```

---

Se vuoi dare un nome descrittivo al tuo scatolone (così domani ricordi cosa c'era dentro):
```bash
git stash push -m "Modifiche carrello sconti prima di fixare bug pagamenti"
```

---

**ATTENZIONE - Trappola dei file nuovi:**

`git stash` ha un limite importante: funziona solo sui file che Git **già conosce** (file già committati almeno una volta in passato). 

**Esempio pratico del problema:**

Stai lavorando sulla funzionalità carrello. Hai modificato 3 file esistenti:
- `carrello.js` (modificato)
- `checkout.js` (modificato)  
- `styles.css` (modificato)

E hai creato 2 file completamente nuovi che non hai mai aggiunto:
- `sconti.js` (nuovo, mai committato)
- `validazione.js` (nuovo, mai committato)

Arriva l'emergenza, fai `git stash` di fretta. Cosa succede?

I 3 file modificati (`carrello.js`, `checkout.js`, `styles.css`) → **Vanno nello scatolone** ✅ <br />
I 2 file nuovi (`sconti.js`, `validazione.js`) → **Rimangono lì** come se niente fosse ❌ 

Quando cambi branch, i file nuovi ti seguono! Potresti commitarli per sbaglio sul branch sbagliato o creare confusione.

**La Soluzione - Come includere anche i file nuovi:**
```bash
git stash -u
```

La flag `-u` sta per "untracked" (non tracciati). Questo dice a Git: "Metti nello scatolone TUTTO, anche i file che non hai mai visto prima".

Ora quando fai `git stash -u`, tutti e 5 i file spariscono nello scatolone, il tuo workspace diventa completamente pulito e pronto per lavorare su altro. Quando finalmente fai `git stash pop` per tornare al tuo lavoro, ritrovi TUTTO esattamente come era - sia i file modificati che quelli nuovi che avevi creato.

**Trucco per non sbagliare:** Nel dubbio, usa sempre `git stash -u` invece di `git stash`. Non fa danni se non hai file nuovi, ma ti salva se li hai dimenticati.

<br />

### 13. Annullare le Modifiche (Il Ctrl+Z di Git)

Sono le 3 di pomeriggio. Stai modificando il file `carrello.js`. Scorri il mouse, selezioni quello che pensavi fosse codice vecchio da cancellare, premi `Delete`. Ti accorgi troppo tardi che hai appena cancellato 200 righe di logica critica scritta settimane fa. Il codice è rotto. Provi a fare Ctrl+Z ma hai fatto troppe operazioni nel frattempo e l'editor non torna indietro abbastanza. Panico.

Oppure altro scenario: hai pasticciato con il CSS del checkout, hai provato 47 modifiche diverse, ora il layout è un disastro completo e non ricordi nemmeno più com'era prima. Vuoi solo tornare indietro, dimenticare tutto e ricominciare.

Niente panico: finché non hai fatto commit, puoi sempre tornare alla versione funzionante salvata nell'ultimo commit.

**Il comando salvavita: `git restore`**

Questo comando è il tuo **Ctrl+Z universale di Git**. Dice a Git: "Riporta questo file esattamente com'era all'ultimo commit, butta via tutte le modifiche che ho fatto dalla mattina ad ora".

**Esempio pratico:**

Hai modificato il file `carrello.js` e l'hai rotto completamente. Vuoi tornare alla versione funzionante dell'ultimo commit:
```bash
git restore carrello.js
```

Il file torna magicamente com'era. Tutte le modifiche recenti sono sparite. Il codice funziona di nuovo. Respiro di sollievo.

---

**Ripristinare tutti i file modificati in un colpo:**

Se hai pasticciato con 10 file diversi (CSS rotto, JavaScript che non va, HTML disordinato) e vuoi buttare via tutto e ricominciare:
```bash
git restore .
```

Il punto `.` significa "tutto nella cartella corrente e sottocartelle". Praticamente stai dicendo: "Resetta tutto come l'ultimo commit, cancella tutto il mio lavoro recente".

---

**Cosa succede se hai già fatto `git add`?**

Situazione: hai modificato `navbar.js`, sei soddisfatto delle modifiche e hai fatto `git add navbar.js` (il file ora è in staging, pronto per essere committato). Poi continui a lavorare sullo stesso file e lo rompi con nuove modifiche.

Se ora provi `git restore navbar.js` non succede nulla. Il file torna alla versione in staging (quella in cui avevi fatto `git add`), non all'ultimo commit. Perché? Perché Git protegge i file in staging e considera quella la "versione buona" da ripristinare.

**Come risolvere - Due step:**

**Step 1:** Togli il file dallo staging (ma le modifiche rimangono nel file):
```bash
git restore --staged navbar.js
```
Ora Git "dimentica" la versione in staging. Il file è di nuovo solo "modificato".

**Step 2:** Cancella le modifiche e torna all'ultimo commit:
```bash
git restore navbar.js
```

**Scorciatoia - Fai tutto insieme:**
```bash
git restore --staged --worktree navbar.js
```
Questo comando fa entrambe le cose in un colpo: toglie da staging E ripristina il file all'ultimo commit.

---

**Differenza tra `git restore` e `git reset` (non sono la stessa cosa):**

Molti confondono questi due comandi perché entrambi "annullano" qualcosa, ma funzionano in modi completamente diversi. La differenza fondamentale è questa: **`restore` lavora sui file non committati, `reset` lavora sui commit già fatti**.

**`git restore` → Il Ctrl+Z dei file (prima del commit)**

Questo comando lavora sui **singoli file** che non hai ancora committato - quelle modifiche che hai fatto oggi ma che esistono solo sul tuo computer. Cancella le modifiche recenti e riporta il file esattamente com'era nell'ultimo commit. La cosa importante è che NON tocca minimamente la cronologia dei commit - lascia tutto intatto nella timeline di Git, agisce solo sui file modificati nel tuo workspace.

Praticamente è come dire a Git: "Butta via tutte le modifiche che ho fatto a questo file oggi, voglio tornare alla versione pulita dell'ultimo commit". 

**Esempio concreto:** Stai lavorando su `carrello.js`, lo modifichi per 2 ore, lo rompi completamente. Non hai ancora fatto commit. Fai `git restore carrello.js` → Il file torna istantaneamente com'era all'ultimo commit, tutte le 2 ore di modifiche spariscono. La cronologia Git non cambia, semplicemente il tuo file locale viene "resettato".

**`git reset` → La macchina del tempo dei commit (dopo il commit)**

Questo comando invece lavora sulla **cronologia dei commit** - muove letteralmente il branch indietro nel tempo annullando commit interi che hai già salvato nella timeline. Sposta il "puntatore" del branch (chiamato HEAD) a un commit precedente, facendo sparire i commit successivi dalla cronologia come se non fossero mai esistiti.

Praticamente è come dire a Git: "Questi ultimi 3 commit che ho fatto? Facciamo finta che non siano mai successi, torna indietro nel tempo fino a ieri sera".

**Esempio concreto:** Hai fatto 3 commit stamattina (`commit A`, `commit B`, `commit C`), poi ti accorgi che erano tutti sbagliati. Fai `git reset HEAD~3` → Torni indietro di 3 commit, la cronologia ora finisce come se quei 3 commit non fossero mai stati creati. I file tornano allo stato di ieri sera.

---

**In pratica, quando usare quale?**

La regola è semplicissima: guarda se hai già fatto commit o no.

**Usa `git restore` quando** hai modificato dei file ma NON hai ancora fatto commit - quindi il tuo lavoro esiste solo sul tuo computer e non è ancora entrato nella cronologia Git. È perfetto per quando vuoi buttare via modifiche in corso su file specifici perché hai fatto pasticci. <br />
*Esempio reale:* "Ho pasticciato con `navbar.js` e voglio ricominciare da zero" → `git restore navbar.js` e il file torna pulito.

**Usa `git reset` quando** hai GIÀ fatto uno o più commit e quindi il tuo lavoro è già salvato nella timeline di Git, ma ti sei accorto che quei commit erano sbagliati e vuoi tornare indietro annullando commit interi dalla cronologia. <br />
*Esempio reale:* "Ho committato 3 volte questa mattina ma erano tutti errori, voglio tornare indietro di 3 commit" → `git reset HEAD~3` e quei commit spariscono dalla storia come se non fossero mai esistiti.

**Riassunto rapido:**  
`restore` = annulla modifiche ai file *(prima del commit)*  
`reset` = annulla commit interi *(dopo il commit)*

---

**PERICOLO - Le modifiche cancellate non si recuperano:**

Quando usi `git restore` su un file, le modifiche vengono cancellate **per sempre**. Non finiscono nel cestino, non c'è un "annulla" successivo, sono proprio sparite nel nulla. L'unico modo per recuperarle è se:
- Hai fatto un backup manuale del file prima di fare restore
- Il tuo editor (VS Code, WebStorm, ecc.) ha una cronologia locale delle modifiche salvata automaticamente

Quindi usa `git restore` solo quando sei SICURO al 100% di voler buttare via il tuo lavoro recente. Non c'è via d'uscita dopo.

---

**Trucco - Guarda prima di cancellare:**

Prima di fare `git restore` e pentirtene un secondo dopo (succede a tutti), controlla esattamente cosa stai per perdere:

```bash
git diff carrello.js
```

Come ricorderai, questo comando ti mostra una "preview" delle modifiche:
- In **rosso** (con `-` davanti) → Le righe che verranno cancellate per sempre
- In **verde** (con `+` davanti) → Le righe che torneranno (dall'ultimo commit)

Esempio di output:
```diff
- const sconto = prezzo * 0.5;  // Questa riga sparirà
+ const sconto = prezzo * 0.2;  // Questa riga tornerà
```

Leggi con attenzione l'output. Se vedi qualcosa di importante che avevi dimenticato (magari una funzione che ti serviva, un calcolo complesso), **copiala e salvala da qualche parte** prima di fare `git restore`. 

Meglio perdere un minuto a controllare che perdere ore a riscrivere codice che avevi cancellato per sbaglio.