---
sidebar_position: 1
title: Fondamenti Terminale
description: Comandi base di navigazione, creazione cartelle e trucchi per il terminale.
---

# Git & GitHub Real World Vademecum

## Parte I: Fondamenti Terminale

Prima di parlare di Git, dobbiamo imparare a parlare con il computer. L'interfaccia grafica (mouse, cartelle) è il "negozio turistico". Il Terminale è la "sala macchine".

## 1. Comandi di Navigazione e Creazione

Qui trovi i 6 comandi fondamentali. Non impararli a memoria, cerca di capire il loro scopo.

| Azione | macOS / Linux / Git Bash | Windows (PowerShell) | Concetto |
| --- | --- | --- | --- |
| **Dove sono?** | `pwd` | `pwd` | Il GPS |
| **Cosa c'è qui?** | `ls` | `ls` o `dir` | Gli Occhi |
| **Entra in...** | `cd cartella` | `cd cartella` | Il Teletrasporto |
| **Torna indietro** | `cd ..` | `cd ..` | La Retromarcia |
| **Crea cartella** | `mkdir nome` | `mkdir nome` | Il Costruttore |
| **Pulisci** | `clear` | `cls` o `clear` | Il Colpo di Spugna |

### Scenari Reali

#### `pwd` (Print Working Directory) - Il GPS

**Quando usarlo:** Appena apri il terminale. Non sai mai se sei nella cartella Utente, sul Desktop o altrove. Se lanci un comando nel posto sbagliato, puoi fare danni.

* **Scenario:** "Voglio essere sicuro di essere nella cartella del mio progetto prima di cancellare dei file."
* **Esempio:**
```bash
pwd
```
Output: /Users/nomeutente/Desktop/mio-progetto
Ok, sono nel posto giusto, posso procedere.

---

#### `ls` (List) - Gli Occhi

**Quando usarlo:** Vuoi vedere se i file che hai scaricato o creato esistono davvero.

* **Scenario:** "Ho clonato la repo, ma c'è il file `package.json` o manca?"
* **Esempio:**
```bash
ls
```
Output: index.html  style.css  package.json  README.md
Vedo la lista dei file: tutto ok.

---

#### ​​​​`cd` (Change Directory) - Il Teletrasporto

**Quando usarlo:** Per entrare dentro una cartella specifica. È l'equivalente del doppio click col mouse.

* **Scenario:** Sei sul Desktop e vuoi entrare nella cartella `lavoro`.
* **Esempio:**
```bash
cd lavoro
```
Ora il cursore del terminale mostrerà che sei dentro `lavoro`.

---

#### `cd ..` - La Retromarcia

**Quando usarlo:** Sei finito troppo in profondità in una sottocartella e vuoi risalire.

* **Regola:** I due punti `..` significano "la cartella genitore" (quella sopra).
* **Scenario:** Sei in `progetto/src/components` e vuoi tornare indietro a `progetto/src`.
* **Esempio:**
```bash
cd ..
```
Salto fuori da `components` e atterro in `src`.

---

#### `mkdir` (Make Directory) - Il Costruttore

**Quando usarlo:** Per iniziare un nuovo progetto da zero.

* **Scenario:** Vuoi creare una cartella pulita per il tuo nuovo sito portfolio.
* **Esempio:**
```bash
mkdir portfolio-2026
```
Il computer crea la cartella, poi puoi entrarci con `cd portfolio-2026`.

---

#### `clear` / `cls` - Il Colpo di Spugna

**Quando usarlo:** Dopo aver lanciato molti comandi, lo schermo è pieno di testo, errori e log. Hai bisogno di ordine mentale.

* **Scenario:** Hai appena finito di installare una libreria che ha stampato 100 righe di testo. Vuoi pulire tutto.
* **Esempio:**
```bash
clear
```
Tutto il testo sparisce. Hai una schermata pulita pronta all'uso.

---

#### Il Trucco del Drag & Drop

Scrivere i percorsi a mano è lento e porta a errori di battitura (`cd Desktop` -> Errore). Usa questo trucco:

1. Scrivi il comando (es. `cd`).
2. Premi **Spazio** (Fondamentale!).
3. Prendi la cartella dal Finder (Mac) o Esplora Risorse (Windows) col mouse.
4. **Trascinala** dentro la finestra nera del terminale.
5. Il computer scriverà magicamente il percorso perfetto (es. `/Users/nomeutente/Documents/Progetti/App`).
6. Premi **Invio**.