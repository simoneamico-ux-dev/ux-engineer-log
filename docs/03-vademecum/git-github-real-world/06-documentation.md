---
sidebar_position: 6
title: Documentation
description: README.md and Markdown syntax to document your projects.
---

# Git & GitHub Real World Vademecum

## Part VI: Documentation

Code is for computers. The `README.md` is for us humans - recruiters browsing your GitHub, colleagues who need to understand the project, yourself in 6 months when you no longer remember why you wrote that code that way.

A project without a README is like an Amazon product without a description and photos: **no one will use it** and few will understand it. The README is the **first thing** people see when they open your repository, it is literally the face of your project.

### 18. README.md and Markdown Syntax

Markdown is a super simple language for formatting text. You use it on GitHub, Discord, Reddit, Notion, and many other places. Here is the complete guide:

**Headings and Subheadings:**

| Syntax | Result |
| --- | --- |
| `# Main Title` | <h1>H1 Title (Giant)</h1> |
| `## Subtitle` | <h2>H2 Title (Large)</h2> |
| `### Section` | <h3>H3 Title (Medium)</h3> |
| `#### Sub-section` | <h4>H4 Title (Small)</h4> |

---

**Text Formatting:**

| Syntax | Result |
| --- | --- |
| `**Bold**` | **Bold** |
| `*Italic*` or `_Italic_` | *Italic* |
| `***Bold and Italic***` | ***Bold and Italic*** |
| `~~Strikethrough~~` | ~~Strikethrough~~ |
| ``Inline code`` | `Inline code` |

---

**Links and Images:**

| Syntax | Result |
| --- | --- |
| `[Link text](https://google.com)` | Clickable link |
| `![Alt text](image-url.jpg)` | Displayed image |
| `![Logo](./assets/logo.png)` | Image from local file |

---

**Lists:**

Unordered list (with bullets):
```markdown
- First item
- Second item
  - Sub-item (indented with 2 spaces)
  - Another sub-item
- Third item
```

Ordered list (with numbers):
```markdown
1. First step
2. Second step
3. Third step
```

Lists with checkboxes (task list):
```markdown
- [x] Completed task
- [ ] Task to do
- [ ] Another task to do
```

---

**Code Blocks:**
For inline code use single backticks: `const x = 5`
For multi-line code blocks use three backticks:
````markdown
```javascript
function greet(name) {
  console.log(`Hello ${name}!`);
}
```
````

Specify the language after the initial three backticks for colored syntax highlighting (javascript, html, css, bash, etc.)

---

**Blockquotes:**

```markdown
> This is a quote.
> It can span multiple lines.

> **Important note:** Blockquotes are great for highlighting notes or warnings.
```

---

**Horizontal Rule (Separator):**

```markdown
---
```

Or:

```markdown
***
```

---

**Tables:**

Tables in Markdown have a simple structure. The first row contains the headers, the second row defines the columns (with `---`), and subsequent rows contain the data.

**Basic structure:**

```markdown
| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Data A | Data B | Data C |
| Data D | Data E | Data F |
```

**How it looks rendered:**

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Data A | Data B | Data C |
| Data D | Data E | Data F |

---

**Text Alignment:**

You can control text alignment in each column using the colon `:` in the separator line:

* **`:---`** → **Left** alignment (default)
* **`:---:`** → **Center** alignment
* **`---:`** → **Right** alignment

**Example with different alignments:**

```markdown
| Left | Center | Right |
| :--- | :---: | ---: |
| Text | Text | Text |
| A | B | C |
```

**How it looks rendered:**

| Left | Center | Right |
| --- | --- | --- |
| Text | Text | Text |
| A | B | C |

**Remember:** Alignment is useful for tables with numbers (better on the right) or titles (better in the center).