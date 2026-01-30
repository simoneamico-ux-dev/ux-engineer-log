---
sidebar_position: 1
title: Terminal Fundamentals
description: Basic navigation commands, folder creation, and terminal tricks.
---

# Git & GitHub Real World Vademecum

## Part I: Terminal Fundamentals

Before talking about Git, we must learn to talk to the computer. The graphical interface (mouse, folders) is the "tourist shop". The Terminal is the "engine room".

## 1. Navigation and Creation Commands

Here you will find the 6 fundamental commands. Don't memorize them; try to understand their purpose.

| Action | macOS / Linux / Git Bash | Windows (PowerShell) | Concept |
| --- | --- | --- | --- |
| **Where am I?** | `pwd` | `pwd` | The GPS |
| **What's here?** | `ls` | `ls` or `dir` | The Eyes |
| **Enter...** | `cd folder` | `cd folder` | The Teleport |
| **Go back** | `cd ..` | `cd ..` | Reverse Gear |
| **Create folder** | `mkdir name` | `mkdir name` | The Builder |
| **Clean** | `clear` | `cls` or `clear` | The Clean Slate |

### Real World Scenarios

#### `pwd` (Print Working Directory) - The GPS

**When to use it:** As soon as you open the terminal. You never know if you are in the User folder, on the Desktop, or elsewhere. If you run a command in the wrong place, you can cause damage.

* **Scenario:** "I want to be sure I am in my project folder before deleting files."
* **Example:**

```bash
pwd
```

Output: /Users/username/Desktop/my-project
Ok, I'm in the right place, I can proceed.

---

#### `ls` (List) - The Eyes

**When to use it:** You want to see if the files you downloaded or created actually exist.

* **Scenario:** "I cloned the repo, but is the `package.json` file there or is it missing?"
* **Example:**

```bash
ls
```

Output: index.html  style.css  package.json  README.md
I see the file list: everything is ok.

---

#### ​​​​`cd` (Change Directory) - The Teleport

**When to use it:** To enter a specific folder. It's the equivalent of a double-click with the mouse.

* **Scenario:** You are on the Desktop and want to enter the `work` folder.
* **Example:**

```bash
cd work
```

Now the terminal cursor will show that you are inside `work`.

---

#### `cd ..` - Reverse Gear

**When to use it:** You ended up too deep in a subfolder and want to go back up.

* **Rule:** The two dots `..` mean "the parent folder" (the one above).
* **Scenario:** You are in `project/src/components` and want to go back to `project/src`.
* **Example:**

```bash
cd ..
```

I jump out of `components` and land in `src`.

---

#### `mkdir` (Make Directory) - The Builder

**When to use it:** To start a new project from scratch.

* **Scenario:** You want to create a clean folder for your new portfolio site.
* **Example:**

```bash
mkdir portfolio-2026
```

The computer creates the folder, then you can enter it with `cd portfolio-2026`.

---

#### `clear` / `cls` - The Clean Slate

**When to use it:** After running many commands, the screen is full of text, errors, and logs. You need mental order.

* **Scenario:** You just finished installing a library that printed 100 lines of text. You want to clean everything.
* **Example:**

```bash
clear
```

All text disappears. You have a clean screen ready to use.

---

#### The Drag & Drop Trick

Typing paths by hand is slow and leads to typos (`cd Desktop` -> Error). Use this trick:

1. Type the command (e.g., `cd`).
2. Press **Space** (Fundamental!).
3. Grab the folder from Finder (Mac) or File Explorer (Windows) with the mouse.
4. **Drag it** into the black terminal window.
5. The computer will magically write the perfect path (e.g., `/Users/username/Documents/Projects/App`).
6. Press **Enter**.