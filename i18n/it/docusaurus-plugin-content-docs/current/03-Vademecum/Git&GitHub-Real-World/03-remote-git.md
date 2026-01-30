---
sidebar_position: 3
title: Git Remoto
description: Collaborazione con GitHub, Push, Pull e Pull Requests.
---

# Git & GitHub Real World Vademecum

## Parte III: Git Remoto

Finora hai lavorato in locale. Ora sincronizziamo con il mondo. Ma attenzione: le regole cambiano quando lavori in un team.

### 6. Solo vs Team: La Dura Realtà

Nel tuo progetto personale sei Dio: puoi fare `git merge` e `git push` direttamente sul ramo `main`.
**In Azienda questo è vietato.** Se fai il merge diretto sul `main` senza permesso, rischi grosso (inoltre il ramo è spesso protetto e non te lo fa fare).

#### Il Flusso Reale: Pull Requests (PR)

Il flusso professionale sposta il "Merge" dal tuo terminale al sito di GitHub.

**Scenario:** Devi creare la "Dark Mode".

1. **Lavora:** Crei il tuo ramo `feat-dark-mode` e fai i tuoi commit in locale.
2. **Push:** Spedisci il tuo ramo online.
```bash
git push -u origin feat-dark-mode
```

3. **PR:** Vai su GitHub. Vedrai un bottone giallo "Compare & Pull Request". Cliccalo.
* *Traduzione:* "Hey team, ho finito la Dark Mode. Potete controllare il mio codice e, se vi piace, unirlo (Pull) al progetto principale?"

4. **Code Review:** I colleghi leggono il codice, commentano ("Qui hai dimenticato un punto e virgola") e approvano.
5. **Merge:** Solo ORA si clicca il bottone verde "Merge" su GitHub.

<br />

### 7. Comandi di Sync

#### `git pull` - La Colazione del Campione

Scarica la storia aggiornata dal server e la unisce al tuo lavoro locale. <br />
**Regola:** Fallo ogni mattina, appena accendi il computer, prima ancora di scrivere una riga di codice.

```bash
git pull
```

**Il Modello Mentale: "Aggiornarsi con le News"**

Immagina che tu e i tuoi colleghi stiate scrivendo un romanzo insieme. Tu vai a dormire e, mentre riposi, il tuo collega dall'altra parte del mondo scrive il Capitolo 3 e lo carica sul server.
Se quando ti svegli inizi a scrivere il Capitolo 4 *senza* aver scaricato e letto il Capitolo 3, la storia non avrà senso. Creerai un buco nella trama.
`git pull` è l'atto di leggere quello che hanno scritto gli altri mentre non c'eri, per poter continuare la storia in modo coerente.

---

**Dietro le Quinte:** 

Molti non lo sanno, ma questo comando è una scorciatoia che esegue automaticamente **due azioni distinte** in sequenza:

1. Prima lancia **`git fetch`** (Scarica): Va su GitHub e scarica i dati grezzi mettendoli in una memoria nascosta, senza però toccare ancora i file che hai davanti agli occhi.
2. Poi lancia **`git merge`** (Unisci): Prende quei dati dalla memoria nascosta e li fonde fisicamente col tuo lavoro attuale, aggiornando il codice nel tuo editor.

---

**Quando usarlo nel Mondo Reale**

* **Il Caffè Mattutino:** È la prima cosa da fare appena apri il terminale. Ti assicura di non lavorare su una versione vecchia del progetto, risparmiandoti conflitti dolorosi nel futuro.
* **Quando un collega dice "Ho pushato":** Se su Slack leggi che hanno caricato un fix importante o una nuova funzionalità, fai subito `git pull` per averla disponibile sul tuo computer.
* **L'Errore "Rejected":** Se provi a fare `git push` e Git ti blocca con un errore rosso, significa che qualcuno ha caricato codice sul server mentre tu lavoravi. Il server è "più avanti" del tuo computer. In questo caso, sei obbligato a fare prima `git pull` (per metterti in pari con la storia) e solo dopo potrai fare `git push`.