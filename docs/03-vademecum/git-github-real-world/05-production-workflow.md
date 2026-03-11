---
sidebar_position: 5
title: Production Workflow
description: SSH Authentication, NPM, Mobile Testing, and Asset Optimization.
---

# Git & GitHub Real World Vademecum

## Part V: Production Workflow

Now that you know Git thoroughly, let's learn how to use it in the real world: how to configure authentication, manage NPM projects, test on mobile, and optimize assets for production.

### 14. SSH Authentication

Forget your GitHub account password. Since 2021, GitHub **no longer accepts passwords** when using Git from the terminal. You must use an **SSH Key** - it is more secure and once configured, you never have to type anything again.

#### The Mental Model: Physical Key vs. Password

Imagine the difference between telling a secret word to a building doorman and having a personal physical key.

A **password** works like a secret word you say to the doorman: anyone who hears it can repeat it and enter. That is why passwords can be easily intercepted or stolen.

An **SSH key**, on the other hand, works like a special physical key divided into two pieces that fit together perfectly. You have the half that opens (the **Private** key, stored on your computer and **never shared**), while GitHub has the corresponding lock (the **Public** key, which you can share freely). When you connect, it is as if you inserted your key into the lock: if the two pieces match, the door opens. No one has to say secret words out loud, no one can intercept anything - just "insert the key" and the system mathematically verifies that it is you.

---

#### Setup Procedure (One Time Only)

This procedure is done **only once** on your computer. Then it works forever with all GitHub repositories.

**Step 1 - Generate the key pair (Private + Public):**

Open the terminal and paste this command (replace with your GitHub email):

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

**What it will ask you:**

1. *"Enter file in which to save the key"* → Simply press **Enter** (use the default location)
2. *"Enter passphrase"* → Press **Enter** (leave empty, otherwise you will have to type a password every time)
3. *"Enter same passphrase again"* → Press **Enter** again

What happened? You created two files in the `~/.ssh/` folder:

* `id_ed25519` → PRIVATE Key (never share!)
* `id_ed25519.pub` → PUBLIC Key (you give this one to GitHub)

---

**Step 2 - Activate the SSH agent (the key manager):**

The SSH agent is like a digital keychain that keeps your private key in memory. So you don't have to reload it every time.

```bash
eval "$(ssh-agent -s)"
```

You will see an output like `Agent pid 12345` - it means the agent is active.

Now add your private key to the agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

You will see `Identity added: ...` - perfect, the key is loaded.

---

**Step 3 - Copy the PUBLIC key (the one to give to GitHub):**

You need to copy the content of the `id_ed25519.pub` file (the public key). Use this command which automatically copies it to the clipboard:

**Mac:**

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

**Windows (Git Bash or PowerShell):**

```bash
cat ~/.ssh/id_ed25519.pub | clip
```

**Linux:**

```bash
cat ~/.ssh/id_ed25519.pub
```
Then select all the output and copy it manually (Ctrl+Shift+C)

Now you have the public key copied - it is a very long string starting with `ssh-ed25519 ...`

---

**Step 4 - Deliver the public key to GitHub:**

1. Go to [GitHub.com](https://github.com) and log in
2. Click on your profile picture in the top right → **Settings**
3. In the left menu → **SSH and GPG keys**
4. Click the green **New SSH key** button
5. Fill in:
* **Title:** `Home Mac` (or `Work PC`, something to remind you which computer it is)
* **Key:** Paste the string you copied (Cmd+V or Ctrl+V)


6. Click **Add SSH key**
7. GitHub might ask you to confirm your password - type it

Done! GitHub now recognizes your computer when you connect.

---

**Step 5 - Test that it works:**

To verify that everything is configured correctly:

```bash
ssh -T git@github.com
```

The first time it will ask you:

```
Are you sure you want to continue connecting (yes/no)?

```

Type `yes` and press Enter.

If it works you will see:

```
Hi YOUR_USERNAME! You've successfully authenticated...
```

Perfect! You are ready to use Git with SSH.

---

**IMPORTANT - Always use SSH, not HTTPS:**

When you clone a repository, GitHub shows you two links:

* **HTTPS:** `https://github.com/user/repo.git` ❌
* **SSH:** `git@github.com:user/repo.git` ✅

**ALWAYS use the SSH link** (the one starting with `git@github.com`).

How to clone correctly:

```bash
git clone git@github.com:user/repo.git
```

**Why?** If you use HTTPS, Git will ask for username and password every time - and the password no longer works! With SSH instead, everything is automatic, you don't have to type anything.

---

**If you already cloned with HTTPS by mistake:**

You can change the remote URL from HTTPS to SSH:

```bash
git remote set-url origin git@github.com:user/repo.git
```

Verify that it changed:

```bash
git remote -v
```

You should see `git@github.com` instead of `https://`.

---

**Common Problems:**

**"Permission denied (publickey)"**

* The SSH key is not configured correctly
* Double check that you added the key to GitHub (Step 4)
* Verify with `ssh -T git@github.com`

**"Could not open a connection to your authentication agent"**

* The SSH agent is not started
* Rerun `eval "$(ssh-agent -s)"` and then `ssh-add ~/.ssh/id_ed25519`

**If you have multiple GitHub accounts (e.g., work + personal):**

The situation gets a bit more complicated if you need to use multiple GitHub accounts on the same computer - for example, a personal account for your projects and a corporate one for work. In this case, the general procedure is:

1. Generate a second SSH key with a different name (e.g., `id_ed25519_work` for work and `id_ed25519_personal` for personal use)
2. Add both public keys to the respective GitHub accounts
3. Create a config file `~/.ssh/config` where you specify which key to use for each account
4. When cloning repositories, use different "aliases" (like `git@github-work:...` vs `git@github-personal:...`) and the system automatically knows which key to use

It's not difficult but requires a few more steps than the basic setup. If you find yourself in this situation, search Google for "multiple SSH keys GitHub" to find detailed step-by-step guides showing you exactly how to configure the config file.

<br />

### 15. Project Operations (NPM)

**Rule:** You can't start the engine if you haven't gotten into the car. Always use `cd project-name` to enter the project folder BEFORE running any NPM command.

**First Time with a Project (Initial Setup)**

When you clone a repository or download a project, you must install all dependencies:

```bash
npm install
```

This command reads the `package.json` file (which contains the list of all necessary libraries) and downloads everything into the `node_modules/` folder. It takes 1-2 minutes. You will see a loading bar. This is done **only once** at the beginning, or whenever someone adds new libraries to the project.

---

**DEVELOPMENT MODE (While working)**

Start a local development server that monitors your files and automatically reloads the page when you save changes (hot reload):

```bash
npm run start
```

Or, depending on the project:

```bash
npm run dev
```

The server usually starts on `http://localhost:3000` (or port 5173 for Vite). Leave the terminal open while you work - if you close it, the server shuts down.

**Common Problem - Port already in use:**
If you see an error like "Port 3000 is already in use", it means you already have a server running in another terminal. Close the old one (Ctrl+C) or the new server will automatically start on a different port (like 3001).

---

**PRODUCTION BUILD (To publish)**

When you are ready to publish the site online, first clean the old build to avoid conflicts with obsolete files:

**Mac/Linux:**

```bash
rm -rf build/
```

Or if you use dist:

```bash
rm -rf dist/
```

**Windows (PowerShell):**

```bash
Remove-Item -Recurse -Force build
```

Or:

```bash
Remove-Item -Recurse -Force dist
```

Then create a clean optimized version:

```bash
npm run build
```

This command creates a folder called `build/` (or `dist/`) with minified, compressed, and optimized files. These files are ready to be uploaded to hosting. The process removes spaces, comments, shortens variable names - everything that makes files lighter and faster to load.

**Why delete the old build?** If you modify or rename files, the old build might contain obsolete files that are no longer needed but take up space. Deleting it first guarantees a 100% clean build.

**Difference between dev and build:**

* **Dev mode** → Large, readable files, with hot reload. For local development only.
* **Build** → Compressed, unreadable, ultra-optimized files. For the production site.

---

**TESTING THE BUILD BEFORE DEPLOY**

Before publishing online, you must test the build locally to ensure everything works:

**With Vite:**

```bash
npm run preview
```

**With other bundlers (Webpack, etc.):**

```bash
npx serve -s build
```

Or:
```bash
npx http-server build
```

This starts a local server serving files from the `build/` or `dist/` folder - exactly as the production server would. Open `http://localhost:4173` (or the indicated port) and test that:

* There are no errors in the console
* All links work
* Images load
* Connections to various APIs are working

**Why is it important?** The production build is different from dev mode: compressed files, different environment variables, absolute vs relative paths. A site that works in dev could have bugs in production. Testing the build BEFORE publishing saves you from nasty surprises.

---

**Cleaning NPM cache (only if you have issues):**

If NPM behaves strangely (dependencies not installing, inexplicable errors), you can clean the cache:

```bash
npm cache clean --force
```

This deletes NPM's internal cache. Usually not needed, but can solve rare problems.

---

**IMPORTANT - Build and .gitignore:**

Ensure that `build/` (or `dist/`) is always in your `.gitignore`:

```gitignore
build/
dist/
```

The build should NEVER be committed to Git - it is heavy, useless (regenerated with `npm run build`), and can cause conflicts. Every environment (development, staging, production) generates its own build.

<br />

### 16. Mobile Testing (Local Network)

Remember that 60-70% of web traffic comes from mobile. Here is how to test your project on your smartphone using the Wi-Fi network, without publishing anything online.

**Step 1 - Expose the server on the local network:**

Start the server in "accessible by other devices" mode:

```bash
npm run start -- --host 0.0.0.0
```

For Vite:

```bash
npm run dev -- --host
```

Normally the server listens only on `localhost` (accessible only from your computer). With `--host 0.0.0.0` you make it accessible to all devices connected to the same Wi-Fi network.

---

**Step 2 - Find your computer's IP address:**

You need to find your computer's local IP address on the network it is connected to (e.g., `192.168.1.15`):

**Mac/Linux:**

```bash
ipconfig getifaddr en0
```

If it doesn't work, try:

```bash
ifconfig | grep "inet "
```

**Windows:**

```bash
ipconfig
```

Look for the line "IPv4 Address" (usually starts with `192.168...`)

---

**Step 3 - Access from the phone:**

1. Ensure your smartphone is connected to the **same Wi-Fi network** as the computer
2. Open the browser on the phone you want to test on
3. Type in the address bar: `http://192.168.1.XX:3000`
(replace `XX` with the IP you found and `3000` with your server port)

**Example:** If your IP is `192.168.1.47` and the server uses port `5173`, go to `http://192.168.1.47:5173`

---

**Common Problems:**

**Phone won't connect?**

* Verify that computer and phone are on the **same Wi-Fi** (do not use cellular data on the phone!)
* Check the computer firewall (it might block external connections)
* Windows: open "Windows Defender Firewall" → "Allow an app" → Add Node.js

**Need HTTPS for some features?**
Camera, microphone, geolocation work only with HTTPS. To test locally with HTTPS, use tools like:

* **ngrok** (temporary tunnel with HTTPS): `npx ngrok http 3000`
* **Cloudflare Tunnel** (free alternative)

These create a URL like `https://abc123.ngrok.io` accessible from anywhere (even outside your network).

**PRO Trick - Quick QR Code:**

Some tools (like Vite) automatically show a QR code in the terminal when you start the server with `--host`. Scan it with your phone to open the site instantly without typing the IP!

<br />

### 17. Asset Optimization Strategy

Never commit "raw" multimedia files to the Git repository. They weigh down the repository **forever** because Git remembers the entire history - even if you delete a file, it remains in the history and takes up space for anyone cloning the project.

**Why is it a problem?**

Imagine a project with 50 commits. At commit 10 you added a 100MB video, at commit 20 you deleted it. Anyone cloning the repository will still download those 100MB because they are part of the history. After years, the repository becomes huge even if the "heavy" files are no longer there.

---

**Rules for Optimized Assets:**

**Images:**

Always convert your images to **WebP** format - they are 60-80% lighter than PNG or JPG while maintaining practically the same visual quality. The best tool to do this is **[Squoosh](https://squoosh.app)**, a free tool developed by Google Chrome Labs that works directly in the browser without installing anything. Just drag the image, choose WebP as output format, and download the result.

Regarding resolution, try not to exaggerate: 1920px width is more than enough for 99% of screens. It makes no sense to serve 4K images of 3840px if your CSS container is only 400px wide - you are just wasting bandwidth and slowing down loading. If you need to check the exact resolution of an image (in px × px) and on Mac the classic Cmd+I doesn't show it, use **[Metadata2Go](https://www.metadata2go.com/)** - upload the image and it tells you all technical information including precise dimensions.

---

**Video:**

Animated GIFs are obsolete and extremely heavy - an outdated format that no longer makes sense to use. Always convert GIFs to **WebM** or **MP4**, you will get an 80-90% weight saving while maintaining the same quality. Modern browsers support all looping videos, so there is no reason to use GIFs anymore. The simplest tool to use is **[CloudConvert](https://cloudconvert.com/gif-to-webm)** - works online, upload the GIF and it gives you the WebM ready. Then in HTML code simply use `<video autoplay loop muted>` instead of the GIF and you're done.

---

**Project Structure Map (for AI and documentation):**

To generate a map of the project structure - useful when using AI on the web platform (ChatGPT, Claude, Gemini) that do not have access to files, while with AI agents it is not necessary because they read the code directly. Also useful for documentation:

**Mac/Linux:**

```bash
find . -not -path '*/.*' -not -path './node_modules*' > project-structure.txt
```

**Windows (PowerShell):**

```bash
tree /F /A > project-structure.txt
```

This creates a text file with the folder tree, excluding `node_modules` and hidden files. Great to attach when asking AI for help showing how the project is organized.

---

**Final Trick - .gitignore for build assets:**

There are folders that generate automatically when you run `npm run build` or when you use optimization scripts. These folders MUST NEVER be committed to Git because:

* They are heavy and useless (regenerated every time)
* They change continuously with every build
* They create conflicts if multiple people work on the project

**Ensure they are in your `.gitignore`:**

```gitignore
build/                  # The production build (Create React App)
dist/                   # The production build (Vite, Webpack)
*.map                   # Source maps (debug files generated automatically)
optimized-images/       # If you have a script that optimizes images
```

**How it works in practice:**

Imagine having an NPM script that automatically converts all PNG images to WebP and saves them in an `optimized-images/` folder. This folder should not be committed because:

1. Anyone cloning the project can regenerate it by running the same script
2. If you modify an original image, the optimized one becomes obsolete
3. It weighs down the repository for no reason

The rule is: **commit only original source files**, never automatically generated ones. The correct workflow is:

* **Commit:** original files (e.g., `logo.png`)
* **DO NOT commit:** generated files (e.g., `logo.webp` if created by a script)
* **Regenerate:** every environment (local, staging, production) runs the build and optimization script