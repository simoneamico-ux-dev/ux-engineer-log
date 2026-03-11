---
sidebar_position: 3
title: Remote Git
description: Collaboration with GitHub, Push, Pull, and Pull Requests.
---

# Git & GitHub Real World Vademecum

## Part III: Remote Git

So far you have worked locally. Now let's sync with the world. But be careful: the rules change when you work in a team.

### 6. Solo vs Team: The Harsh Reality

In your personal project, you are God: you can `git merge` and `git push` directly to the `main` branch.
**In a Company, this is forbidden.** If you merge directly to `main` without permission, you risk big trouble (plus the branch is often protected and won't let you do it).

#### The Real Flow: Pull Requests (PR)

The professional flow moves the "Merge" from your terminal to the GitHub website.

**Scenario:** You need to create "Dark Mode".

1. **Work:** You create your `feat-dark-mode` branch and make your commits locally.
2. **Push:** Send your branch online.

```bash
git push -u origin feat-dark-mode
```

3. **PR:** Go to GitHub. You will see a yellow "Compare & Pull Request" button. Click it.

* *Translation:* "Hey team, I finished Dark Mode. Can you check my code and, if you like it, merge (Pull) it into the main project?"

4. **Code Review:** Colleagues read the code, comment ("You forgot a semicolon here"), and approve.
5. **Merge:** Only NOW do you click the green "Merge" button on GitHub.

<br />

### 7. Sync Commands

#### `git pull` - The Breakfast of Champions

Downloads the updated history from the server and merges it with your local work. <br />
**Rule:** Do it every morning, as soon as you turn on the computer, before even writing a line of code.

```bash
git pull
```

**The Mental Model: "Catching up with the News"**

Imagine that you and your colleagues are writing a novel together. You go to sleep and, while you rest, your colleague on the other side of the world writes Chapter 3 and uploads it to the server.
If when you wake up you start writing Chapter 4 *without* having downloaded and read Chapter 3, the story won't make sense. You will create a plot hole.
`git pull` is the act of reading what others have written while you were away, so you can continue the story coherently.

---

**Behind the Scenes:**

Many don't know this, but this command is a shortcut that automatically executes **two distinct actions** in sequence:

1. First runs **`git fetch`** (Download): Goes to GitHub and downloads the raw data putting them in a hidden memory, without touching the files you see before your eyes yet.
2. Then runs **`git merge`** (Merge): Takes those data from the hidden memory and physically merges them with your current work, updating the code in your editor.

---

**When to use it in the Real World**

* **The Morning Coffee:** It's the first thing to do as soon as you open the terminal. It ensures you don't work on an old version of the project, saving you from painful conflicts in the future.
* **When a colleague says "I pushed":** If you read on Slack that they uploaded a major fix or a new feature, do a `git pull` immediately to have it available on your computer.
* **The "Rejected" Error:** If you try to `git push` and Git blocks you with a red error, it means someone uploaded code to the server while you were working. The server is "ahead" of your computer. In this case, you are forced to do `git pull` first (to catch up with the story) and only then can you do `git push`.