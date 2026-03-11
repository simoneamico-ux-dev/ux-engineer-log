---
sidebar_position: 4
title: Advanced Management
description: Branching, Merge vs Rebase, Conflicts, .gitignore, stash and restore.
---

# Git & GitHub Real World Vademecum

## Part IV: Advanced Management

A **Branch** is a parallel timeline. You can experiment and break everything without consequences for the main code. In this section, you will learn how to manage branches, conflicts, and all advanced Git techniques.

### 8. Branch Management

#### Switching Universes (Switch)

Create the 'feat-login' branch and move there immediately:

```bash
git switch -c feat-login
```

---

#### Merging Universes (Merge) - Personal Projects Only

If you work alone, you can merge branches locally:

1. Go back home (Base):

```bash
git switch main
```

2. Merge the feature into the base:

```bash
git merge feat-login
```

<br />

### 9. The Philosophical Fork: Merge vs Rebase

When you need to join two stories, Git offers you two paths. The choice changes how the Project History is written.

#### **Merge: "The Knot" (The safe choice)**

This is the standard method Git uses by default. Here's how it works: Git takes your parallel story (your branch with all your commits) and joins it to the main story by creating a "Merge Commit" - basically a junction knot that says "two different roads joined here".

**How to imagine it:** Think of two train tracks that separate into two parallel paths for a while, then rejoin. Even if you look at the map in 10 years, you will clearly see that at that point the path split, the two trains traveled separately for a stretch, and then reunited. The history is transparent and honest.

The big advantage of merge is that **it is not destructive** - the real history is preserved faithfully exactly as it happened. You can see when you created the branch, when you worked on your commits, when someone else pushed to main, and when you merged everything. It is like a sincere diary of events.

The downside? If all team members use merge continuously, the project timeline can become an almost unreadable tangle of intertwined lines going back and forth - it is often ironically called the "Guitar Hero" visualization because it resembles the video game graphics, with colored notes crossing everywhere. It works perfectly, but it's ugly to look at.

---

#### **Rebase: "The Rewrite" (The aesthetic choice)**

Here lies the black magic of Git. Rebase takes your commits one by one, detaches them completely from their original base (the point where you created the branch), and "pastes" them at the end of the current history, pretending that you wrote all the code this morning instead of last week.

**How to imagine it:** It is a "Copy and Paste" that travels through time. Imagine you wrote a chapter of your book last week when you were at chapter 5. Meanwhile, someone else wrote chapters 6, 7, and 8. With rebase, you physically tear out the pages you wrote (chapter 5 bis) and glue them at the end of the book after chapter 8, also changing the writing date to make it look like you wrote them today. The content is identical, but the timeline has been manipulated.

The big advantage of rebase is that the history becomes a **perfect straight line**, extremely clean, without branches or forks. When you read the commit log, it seems that every developer has always worked in an ordered sequence, one after the other. Reading the history becomes a pleasure - it is elegant, linear, professional.

But there is a **very serious hidden danger:** you are literally **rewriting history**. Old commits are destroyed forever, and new ones are created with completely different hash codes. It is as if those old commits never existed - Git replaces them with copies that look the same but are technically different objects. This can create huge problems if other people were working on those original commits.

Example: Move my commits AFTER the latest main update

```bash
git switch feat-login
git rebase main
```

---

**The Rebase Rule:**

> **NEVER Rebase on a shared branch.**
> Do it only on your private branches (those only you work on). If you Rebase on a branch that your colleagues are also using, you will destroy their synchronization, and they will hate you.
> * Use **Rebase** to clean *your* work before delivering it.
> * Use **Merge** to join the *team's* work.
> 
> 

<br />

### 10. Conflicts (Merge Conflicts)

In an ideal world, Git merges everything automatically. In reality, this scenario happens:

* You modify line 10 of `style.css` (Color: Blue).
* Your colleague modifies line 10 of `style.css` (Color: Red).

When you try to merge (either with Merge or Rebase), Git panics and screams: **CONFLICT**.

**Mental Model:**
It is not an error; it is a question. Imagine two writers working on the same book. If they write different sentences on the same line, the editor (Git) stops and asks: *"Hey, there are two versions here. Which one should I print?"*

**How to Resolve (Practical Example):**

1. Git tells you: `CONFLICT (content): Merge conflict in style.css`.
2. Open `style.css` in your editor. You will see this horror:

```css
body {
<<<<<<< HEAD
  background-color: blue;  (Your version)
=======
  background-color: red;   (The colleague/server version)
>>>>>>> feat-login
}
```

3. **You must decide.** Do you want blue or red? Or maybe purple?
4. Delete the weird marks (`<<<<`, `====`, `>>>>`) and leave only the clean code:

```css
body {
  background-color: blue;
}
```

5. Save the file, run `git add .` and `git commit`. Conflict resolved.

<br />

### 11. The VIP List: `.gitignore` (The Repository Bouncer)

Imagine Git as a photo album: you don't want blurry, duplicate, or overly heavy photos to end up in it. There are files that **MUST NEVER** enter the repository because:

* They are too large and would slow everything down
* They contain passwords or secret keys
* They can be easily regenerated
* They are specific only to your computer

**How the Bouncer (`.gitignore`) works:**

Create a file named exactly `.gitignore` in the main folder of your project. This file tells Git: "Hey, ignore these files, never track them!"

**What to write inside (practical examples):**

**1. `node_modules/` folder (NPM Libraries)**

```text
node_modules/
```

**Why?** This folder weighs hundreds of MBs and is recreated with a simple `npm install`. It makes no sense to save it.

---

**2. `.DS_Store` file (Mac trash)**

```text
.DS_Store
```

**Why?** It is an invisible file that Mac creates to remember how icons are positioned. Useless for others.

---

**3. `.env` file (PASSWORDS AND SECRETS)**

```text
.env
.env.local
*.key
*.pem
```

**Why?** Contains API keys, database passwords, secret tokens. If they end up on **PUBLIC** GitHub, you are in trouble!

---

**4. Build/Compilation Folders**

```text
build/
dist/
out/
.next/
```

**Why?** They are files automatically generated by compilation. They are regenerated with `npm run build`.

---

**5. Log and cache files**

```text
*.log
.cache/
.vscode/
.idea/
```

**Why?** They are temporary files or specific to your editor.

---

**How it works in practice:**

1. Create the `.gitignore` file
2. Write inside the patterns of files to ignore (one per line)
3. Save the file
4. Git automatically **stops tracking** those files

You can use ready-made templates. Search Google for "gitignore for [your language]" or use the site [gitignore.io](https://gitignore.io) which generates the perfect file for you!

**WARNING:** If you have already committed a file by mistake BEFORE adding it to `.gitignore`, you must manually remove it with:

```bash
git rm --cached filename.env
```

This removes it from Git but leaves it on your computer.

<br />

### 12. The Temporary Lifesaver: `git stash` (The Magic Box)

**Real scenario:** You are at work. You have completely dismantled the "engine" of the cart feature - 5 open files, halfway changes, code that doesn't compile yet, warnings everywhere. You are testing a new discount calculation logic and for now, everything is broken.

Suddenly the phone rings. It's the boss: *"STOP EVERYTHING! The site is down, users can't checkout! There is a critical bug in production, you have to fix it IMMEDIATELY on the `main` branch!"*

Panic. You need to switch to the `main` branch immediately to fix the disaster, but you have a problem: you have your workspace completely destroyed with halfway changes. If you try to change branch, Git blocks you saying *"error: Your local changes would be overwritten by checkout"*. You can't commit because the code is broken and incomplete. You are stuck. What do you do?

**The solution: `git stash` (the temporary box under the desk)**

Imagine having a magic box where you can shove all the mess from your desk in a second, work on something else with a clean desk, and then pull everything out exactly as it was when you finished.

**Here is how you save yourself:**

In panic, with the boss waiting, quickly type:

```bash
git stash
```

Git will answer something like:

```
Saved working directory and index state WIP on feature-cart: a3f2b1c Added form validation
```

What happened? **Your changes have disappeared!** Look at your files: they are clean again, as in the last commit. The code compiles again, no errors. But don't worry, you haven't lost anything. Git put everything in the "box" (technically called "stash").

Now you are free! You can run to the `main` branch:

```bash
git switch main
```

Fix the critical bug, test, commit, push to production. Crisis resolved, happy boss.

When you finally have 5 minutes of breathing room, go back to your branch:

```bash
git switch feature-cart
```

And pull out the box:

```bash
git stash pop
```

**POOF!** Your changes magically reappear exactly as you left them - broken code, warnings, halfway logic and all. You can continue working from where you left off, as if nothing happened.

---

**Useful commands to manage the box:**

If you want to see what's in the box without taking it out:

```bash
git stash list
```

You will see something like:

```
stash@{0}: WIP on feature-cart: a3f2b1c Added form validation
stash@{1}: WIP on fix-navbar: b2c3d4e Mobile menu correction

```

You can have **multiple boxes** stacked (one on top of the other). The number in curly braces `{0}` is the most recent. Maybe tomorrow another emergency happens while you are working on something else - no problem, make another stash and you will have two boxes.

---

If you want to apply a specific box (not necessarily the last one):

```bash
git stash apply stash@{1}
```

The difference between `pop` and `apply`?

* `git stash pop` → takes out and **deletes** the box (it's gone from the list)
* `git stash apply` → takes out but **leaves** the box in the list (copy)

---

If you want to delete a box without applying it:

```bash
git stash drop stash@{0}
```

---

If you want to give a descriptive name to your box (so tomorrow you remember what was inside):

```bash
git stash push -m "Discount cart changes before fixing payment bug"
```

---

**WARNING - New files trap:**

`git stash` has an important limit: it works only on files that Git **already knows** (files already committed at least once in the past).

**Practical example of the problem:**

You are working on the cart feature. You modified 3 existing files:

* `cart.js` (modified)
* `checkout.js` (modified)
* `styles.css` (modified)

And you created 2 completely new files that you never added:

* `discounts.js` (new, never committed)
* `validation.js` (new, never committed)

The emergency arrives, you do `git stash` in a hurry. What happens?

The 3 modified files (`cart.js`, `checkout.js`, `styles.css`) → **Go into the box** ✅ <br />
The 2 new files (`discounts.js`, `validation.js`) → **Stay there** as if nothing happened ❌

When you change branch, the new files follow you! You might accidentally commit them to the wrong branch or create confusion.

**The Solution - How to include new files too:**

```bash
git stash -u
```

The `-u` flag stands for "untracked". This tells Git: "Put EVERYTHING in the box, even the files you have never seen before".

Now when you do `git stash -u`, all 5 files disappear into the box, your workspace becomes completely clean and ready to work on something else. When you finally do `git stash pop` to return to your work, you find EVERYTHING exactly as it was - both the modified files and the new ones you had created.

**Trick to avoid mistakes:** When in doubt, always use `git stash -u` instead of `git stash`. It does no harm if you don't have new files, but it saves you if you forgot them.

<br />

### 13. Undoing Changes (The Git Ctrl+Z)

It's 3 PM. You are modifying the `cart.js` file. You scroll the mouse, select what you thought was old code to delete, press `Delete`. You realize too late that you just deleted 200 lines of critical logic written weeks ago. The code is broken. You try Ctrl+Z but you did too many operations in the meantime and the editor doesn't go back far enough. Panic.

Or another scenario: you messed up with the checkout CSS, tried 47 different changes, now the layout is a complete disaster and you don't even remember how it was before. You just want to go back, forget everything and start over.

Don't panic: as long as you haven't committed, you can always go back to the working version saved in the last commit.

**The lifesaver command: `git restore**`

This command is your **Git universal Ctrl+Z**. It tells Git: "Bring this file back exactly as it was at the last commit, throw away all the changes I made from this morning until now".

**Practical example:**

You modified the `cart.js` file and broke it completely. You want to return to the working version of the last commit:

```bash
git restore cart.js
```

The file magically returns as it was. All recent changes are gone. The code works again. Sigh of relief.

---

**Restoring all modified files at once:**

If you messed up with 10 different files (broken CSS, JavaScript not working, messy HTML) and want to throw everything away and start over:

```bash
git restore .
```

The dot `.` means "everything in the current folder and subfolders". Basically, you are saying: "Reset everything like the last commit, delete all my recent work".

---

**What happens if you already did `git add`?**

Situation: you modified `navbar.js`, you are satisfied with the changes and did `git add navbar.js` (the file is now in staging, ready to be committed). Then you continue working on the same file and break it with new changes.

If you now try `git restore navbar.js` nothing happens. The file returns to the staging version (the one where you did `git add`), not the last commit. Why? Because Git protects the files in staging and considers that the "good version" to restore.

**How to resolve - Two steps:**

**Step 1:** Remove the file from staging (but changes remain in the file):

```bash
git restore --staged navbar.js
```

Now Git "forgets" the staging version. The file is just "modified" again.

**Step 2:** Delete changes and return to the last commit:

```bash
git restore navbar.js
```

**Shortcut - Do it all together:**

```bash
git restore --staged --worktree navbar.js
```

This command does both things at once: removes from staging AND restores the file to the last commit.

---

**Difference between `git restore` and `git reset` (they are not the same thing):**

Many confuse these two commands because both "undo" something, but they work in completely different ways. The fundamental difference is this: **`restore` works on uncommitted files, `reset` works on commits already made**.

**`git restore` → The File Ctrl+Z (before commit)**

This command works on **single files** that you have not committed yet - those changes you made today but that exist only on your computer. It deletes recent changes and brings the file back exactly as it was in the last commit. The important thing is that it DOES NOT touch the commit history at all - it leaves everything intact in the Git timeline, it only acts on the modified files in your workspace.

Basically, it's like saying to Git: "Throw away all the changes I made to this file today, I want to go back to the clean version of the last commit".

**Concrete example:** You are working on `cart.js`, you modify it for 2 hours, you break it completely. You haven't committed yet. Do `git restore cart.js` → The file instantly returns as it was in the last commit, all 2 hours of changes disappear. The Git history doesn't change, simply your local file is "reset".

**`git reset` → The Commit Time Machine (after commit)**

This command instead works on the **commit history** - it literally moves the branch back in time undoing entire commits you have already saved in the timeline. It moves the branch "pointer" (called HEAD) to a previous commit, making subsequent commits disappear from history as if they never existed.

Basically, it's like saying to Git: "These last 3 commits I made? Let's pretend they never happened, go back in time to yesterday evening".

**Concrete example:** You made 3 commits this morning (`commit A`, `commit B`, `commit C`), then you realize they were all wrong. Do `git reset HEAD~3` → You go back 3 commits, the history now ends as if those 3 commits were never created. The files return to the state of yesterday evening.

---

**In practice, when to use which?**

The rule is very simple: check if you have already committed or not.

**Use `git restore` when** you have modified files but HAVE NOT committed yet - so your work exists only on your computer and has not entered Git history yet. It is perfect for when you want to throw away changes in progress on specific files because you made a mess. <br />
*Real example:* "I messed up with `navbar.js` and want to start from scratch" → `git restore navbar.js` and the file returns clean.

**Use `git reset` when** you have ALREADY made one or more commits and therefore your work is already saved in the Git timeline, but you realized those commits were wrong and you want to go back undoing entire commits from history. <br />
*Real example:* "I committed 3 times this morning but they were all errors, I want to go back 3 commits" → `git reset HEAD~3` and those commits disappear from history as if they never existed.

**Quick summary:**
`restore` = undo changes to files *(before commit)*
`reset` = undo entire commits *(after commit)*

---

**DANGER - Deleted changes cannot be recovered:**

When you use `git restore` on a file, changes are deleted **forever**. They don't end up in the trash bin, there is no subsequent "undo", they are just gone into the void. The only way to recover them is if:

* You made a manual backup of the file before restoring
* Your editor (VS Code, WebStorm, etc.) has a local history of changes saved automatically

So use `git restore` only when you are 100% SURE you want to throw away your recent work. There is no way out after.

---

**Trick - Look before you delete:**

Before doing `git restore` and regretting it a second later (it happens to everyone), check exactly what you are about to lose:

```bash
git diff cart.js
```

As you recall, this command shows you a "preview" of changes:

* In **red** (with `-` in front) → The lines that will be deleted forever
* In **green** (with `+` in front) → The lines that will return (from the last commit)

Example output:

```diff
- const discount = price * 0.5;  // This line will disappear
+ const discount = price * 0.2;  // This line will return
```

Read the output carefully. If you see something important you forgot (maybe a function you needed, a complex calculation), **copy and save it somewhere** before doing `git restore`.

Better to lose a minute checking than losing hours rewriting code you deleted by mistake.