---
sidebar_position: 6
title: Documentazione
description: README.md e sintassi Markdown per documentare i tuoi progetti.
---

# Git & GitHub Real World Vademecum

## Parte VI: Documentazione

Il codice è per i computer. Il `README.md` è per noi umani - recruiter che sfogliano il tuo GitHub, colleghi che devono capire il progetto, te stesso tra 6 mesi quando non ricordi più perché hai scritto quel codice in quel modo.

Un progetto senza README è come un prodotto Amazon senza descrizione e senza foto: **nessuno lo userà** e in pochi lo capiranno. Il README è la **prima cosa** che la gente vede quando apre il tuo repository, è letteralmente la faccia del tuo progetto.

### 18. README.md e Sintassi Markdown

Markdown è un linguaggio super semplice per formattare testo. Lo usi su GitHub, Discord, Reddit, Notion e tantissimi altri posti. Ecco la guida completa:

**Titoli e Sottotitoli:**

| Sintassi | Risultato |
| --- | --- |
| `# Titolo Principale` | <h1>Titolo H1 (Gigante)</h1> |
| `## Sottotitolo` | <h2>Titolo H2 (Grande)</h2> |
| `### Sezione` | <h3>Titolo H3 (Medio)</h3> |
| `#### Sotto-sezione` | <h4>Titolo H4 (Piccolo)</h4> |

---

**Formattazione Testo:**

| Sintassi | Risultato |
| --- | --- |
| `**Grassetto**` | **Grassetto** |
| `*Corsivo*` o `_Corsivo_` | *Corsivo* |
| `***Grassetto e Corsivo***` | ***Grassetto e Corsivo*** |
| `~~Barrato~~` | ~~Barrato~~ |
| `` `Codice in linea` `` | `Codice in linea` |

---

**Link e Immagini:**

| Sintassi | Risultato |
| --- | --- |
| `[Testo del link](https://google.com)` | Link cliccabile |
| `![Testo alternativo](url-immagine.jpg)` | Immagine visualizzata |
| `![Logo](./assets/logo.png)` | Immagine da file locale |

---

**Liste:**

Lista non ordinata (con pallini):
```markdown
- Primo elemento
- Secondo elemento
  - Sotto-elemento (indentato con 2 spazi)
  - Altro sotto-elemento
- Terzo elemento
```

Lista ordinata (con numeri):
```markdown
1. Primo passo
2. Secondo passo
3. Terzo passo
```

Liste con checkbox (task list):
```markdown
- [x] Task completato
- [ ] Task da fare
- [ ] Altro task da fare
```

---

**Blocchi di Codice:**

Per codice inline usa i backtick singoli: `const x = 5`

Per blocchi di codice multilinea usa tre backtick:
````markdown
```javascript
function saluta(nome) {
  console.log(`Ciao ${nome}!`);
}
```
````

Specifica il linguaggio dopo i tre backtick iniziali per avere syntax highlighting colorato (javascript, html, css, bash, ecc.)

---

**Citazioni:**

```markdown
> Questa è una citazione.
> Può occupare più righe.

> **Nota importante:** Le citazioni sono ottime per evidenziare note o avvertimenti.
```

---

**Linea Orizzontale (Separatore):**

```markdown
---
```

Oppure:

```markdown
***
```

---

**Tabelle:**

Le tabelle in Markdown hanno una struttura semplice. La prima riga contiene le intestazioni, la seconda riga definisce le colonne (con `---`), e le righe successive contengono i dati.

**Struttura base:**

```markdown
| Colonna 1 | Colonna 2 | Colonna 3 |
| --- | --- | --- |
| Dato A | Dato B | Dato C |
| Dato D | Dato E | Dato F |
```

**Come si vede renderizzata:**

| Colonna 1 | Colonna 2 | Colonna 3 |
| --- | --- | --- |
| Dato A | Dato B | Dato C |
| Dato D | Dato E | Dato F |

---

**Allineamento del testo:**

Puoi controllare l'allineamento del testo in ogni colonna usando i due punti `:` nella riga dei separatori:

- **`:---`** → Allineamento a **sinistra** (default)
- **`:---:`** → Allineamento al **centro**
- **`---:`** → Allineamento a **destra**

**Esempio con allineamenti diversi:**

```markdown
| Sinistra | Centro | Destra |
| :--- | :---: | ---: |
| Testo | Testo | Testo |
| A | B | C |
```

**Come si vede renderizzata:**

| Sinistra | Centro | Destra |
| :--- | :---: | ---: |
| Testo | Testo | Testo |
| A | B | C |

**Ricorda:** L'allineamento è utile per tabelle con numeri (meglio a destra) o titoli (meglio al centro).