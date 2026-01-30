---
sidebar_position: 2
title: Local Git
description: Git setup, 3-room model, commits, and Conventional Commits.
---

# Git & GitHub Real World Vademecum

## Part II: Local Git

Git is not a simple "save". It is a collaborative time machine. In this section, you will learn how to use Git on your computer, even before sharing it online.

### The Mental Model: The Three Rooms

Many ask: *"Why is Git so complicated? Why do I have to `add` and then `commit`? Can't I just save and be done with it?"*

To understand the power of this system, you must imagine Git not as a simple "Save" button, but as a **Professional Photography Studio**.

It all starts in the **Working Directory**, which is your **Photo Set**. This is where the action happens and where creative chaos reigns: imagine you just repainted a button blue, but at the same time, you started writing a text that is still halfway done. Everything is mixed on the table and nothing is final yet.

This is where the **Staging Area** comes into play, acting as the **camera viewfinder**. Unlike a classic save that saves *everything* (even errors or incomplete things), Git allows you to look through the lens and decide what to include in the shot. With the `git add` command, you are saying: *"I want to frame only the blue button, leaving the incomplete text out of the frame"*. You are preparing the perfect composition, filtering out the noise.

Finally, there is the **Repository**, your **memory album**. When you run the `git commit` command, it is as if you pressed the shutter button: *Click*. You have frozen that precise moment in an indelible photograph. Now in the project's history, there is a clean version called "Blue Button" that you can return to at any future time, while the incomplete text has remained quietly on the table (in the Working Directory), ready to be finished and photographed in the next shot.

<br />

### 2. Initial Setup (The Passport)

Before letting you into the album, Git needs to know who is taking the photos to attribute copyright.
This step must be done **only once in a lifetime** on your computer (unless you format it).

Replace "Mario Rossi" with your real name and the email with the one you use to sign up for GitHub.

Set the name that will appear next to your commits:

```bash
git config --global user.name "Your Name and Surname"
```

Set the email (Use the same one as GitHub):

```bash
git config --global user.email "your.email@real.com"
```

**Why is it important?** If you use a different email from your GitHub account, your contributions will not appear on your online profile (no green squares).

<br />

### 3. Initialization (The Big Bang)

You have created a new folder for your project. Currently, it is an empty folder with no memory. We need to install Git's brain inside it.

Run this command **ONLY INSIDE** the project folder. Never do this on the Desktop or in the User folder.

**The Correct Procedure:**

1. Create the folder (or use an existing one).
2. **ENTER IT** with the terminal:

```bash
cd project_name
```

3. Now run the initialization:

```bash
git init
```

**Real Output:**

```text
Initialized empty Git repository in /Users/username/Desktop/MyProject/.git/
```

**What happened?** Git created a hidden subfolder called `.git`. <br />
It means that from this moment on, every change you make in this folder is monitored by "Big Brother" (Git). If you accidentally delete the `.git` folder, the project loses its memory and reverts to being a simple folder of files.

<br />

### 4. Inspection - The GPS

Before doing anything, you need to know what state you are in.

#### `git status` - The Dashboard

It tells you what is happening.

Imagine you just modified `style.css`. <br />
**Real Output:**

```text
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  modified:   style.css  <-- IT IS RED (Working Directory)
```

---

#### `git diff` - The Microscope

It tells you *what* changed inside the files, line by line.

**Real Output:**

```diff
- color: black;  (What you removed, in RED)
+ color: blue;   (What you added, in GREEN)
```

<br />

### 5. Capturing the Moment

#### `git add` - Focusing (Staging)

Moves changes from the **Working Directory** to the **Staging Area**. Prepares EVERYTHING that has changed.

```bash
git add .
```

**After this command:** If you run `git status`, the `style.css` file will turn **GREEN**. It means it is "in the camera", ready for the shot.

---

#### `git commit` - The Shot (and the Label)

Takes everything in the Staging Area and freezes it forever.
But be careful: a photo without a date or description is useless after a month. A commit without a clear message is a black hole.

To write professional messages, we use the **Conventional Commits** standard.

**The Sacred Syntax:**

```text
type(scope): imperative description
```

**1. Type (The first word)**

You must categorize the change. Do not invent; choose from this list:

* **`feat`** (Feature): Introduces a new functionality visible or usable by the user. <br />
*Example:* Adding the login button or a new page.
* **`fix`** (Fix): Corrects incorrect behavior or a bug that caused unexpected results. <br />
*Example:* Fixing a crash or a button that doesn't respond to clicks.
* **`docs`** (Documentation): Changes to documentation or comments, without impact on executable code. <br />
*Example:* Correcting a typo in the README or updating a guide.
* **`style`** (Style): Purely stylistic changes that do not alter code behavior (formatting, spaces, punctuation, colors, etc...). <br />
*Example:* Improving code formatting or standardizing spacing.
* **`refactor`** (Refactoring): Changes to the internal structure of the code that improve readability and maintainability, without altering external behavior. <br />
*Example:* Splitting a 100-line function into two 50-line functions with clearer responsibilities.
* **`perf`** (Performance): Changes that improve application performance, such as speed or resource consumption, without changing functional behavior. <br />
*Example:* Optimizing image loading to reduce rendering times.
* **`chore`** (Chore): Maintenance tasks that do not add functionality nor fix bugs, but serve to keep the project updated and tidy. <br />
*Example:* Updating a dependency, modifying configurations, or updating `.gitignore`.

---

**2. The Scope (In parentheses) - The "Where"**

If the *Type* (`feat`, `fix`) says **WHAT** you did, the *Scope* says **WHERE** you did it.
Imagine the scope as the label on the box: it helps you and your colleagues immediately understand which part of the software was touched without having to open the code.

There is no mandatory list (it depends on your project), but these are the **standard conventions** used in the real world:

**Visual & UI Scopes**
Use these when touching the graphical interface.

* **`ui`**: General changes to appearance (colors, fonts, distances between elements)
* **`navbar`** / **`header`**: Changes to the top bar of the page
* **`footer`**: Changes to the footer at the bottom
* **`sidebar`**: Changes to the side menu
* **`mobile`**: Corrections for mobile phones (adaptive layout, iOS issues)
* **`tablet`**: Improvements for tablets
* **`desktop`**: Changes for large screens
* **`layout`**: Changes to the general structure of the page
* **`animations`**: Add or modify animations and movements
* **`theme`**: Light/dark themes and color customizations
* **`icons`**: Changes to icons
* **`typography`**: Changes to text size, type, and style
* **`colors`**: Changes to the color palette
* **`spacing`**: Changes to margins and spacing
* **`grid`**: Grid system for organizing content in columns
* **`modal`** / **`dialog`**: Popup windows that open over the page
* **`tooltip`**: Small messages that appear on mouse hover
* **`dropdown`**: Dropdown menu that opens on click
* **`tabs`**: Clickable tabs to change content
* **`cards`**: Container boxes for information
* **`buttons`**: Styles and variants of buttons
* **`forms-ui`**: Appearance of input fields, checkboxes, radio buttons
* **`tables`**: Tables with rows and columns
* **`breadcrumbs`**: Navigation path (Home > Products > Details)
* **`pagination`**: Controls to navigate between pages (1, 2, 3...)
* **`loading`** / **`spinner`**: Rotating loading icons
* **`badges`**: Small labels with numbers or text (e.g., "New", "3")
* **`alerts`** / **`notifications`**: Warning or notification messages
* **`carousel`** / **`slider`**: Sliding image galleries
* **`accordion`**: Sections that open/close by clicking
* **`skeleton`**: Grayish placeholders shown during loading

**Functional Scopes**
Use these when touching the application's functioning.

* **`auth`**: Login, registration, password recovery
* **`api`**: Communication with the server
* **`search`**: Search bar and results
* **`cart`** / **`checkout`**: Shopping cart and payment
* **`profile`** / **`user`**: User profile and account settings
* **`forms`**: Forms to input data (contacts, registration)
* **`validation`**: Checking that entered data is correct
* **`filters`**: Filters for product lists (price, category, etc.)
* **`sorting`**: Result sorting (by name, price, date)
* **`router`** / **`routing`**: Navigation between site pages
* **`state`**: Management of shared data in the app
* **`storage`**: Data saving in the browser
* **`cookies`**: Cookie management and consent
* **`i18n`** / **`localization`**: Translations into other languages
* **`analytics`**: Tracking visit statistics
* **`seo`**: Search engine optimization
* **`a11y`** / **`accessibility`**: Accessibility for disabilities
* **`performance`**: Loading speed improvements
* **`caching`**: Temporary saving to speed up
* **`upload`**: File upload from computer
* **`download`**: File download to computer
* **`print`**: Printing pages or creating PDFs
* **`share`**: Sharing on social media or via link
* **`comments`**: Comments section
* **`ratings`**: Ratings with stars or votes
* **`favorites`** / **`wishlist`**: Favorites or wishlist
* **`notifications`**: Push, email, or in-app notifications
* **`subscriptions`**: Newsletter subscription
* **`payments`**: Online payments (Stripe, PayPal)
* **`invoices`**: Invoices and receipts
* **`reports`**: Creating reports and statistics
* **`exports`**: Data export (Excel, CSV, PDF)
* **`imports`**: Data import from files
* **`webhooks`**: Automatic notifications between systems
* **`cron`**: Scheduled automatic operations
* **`email`**: Sending automatic emails
* **`sms`**: Sending SMS messages
* **`chat`**: Live chat
* **`video`**: Video playback
* **`audio`**: Audio playback
* **`maps`**: Interactive maps
* **`geolocation`**: User location detection
* **`calendar`**: Event calendar
* **`scheduler`**: Appointment booking
* **`booking`**: Reservation system
* **`inventory`**: Warehouse management and availability
* **`shipping`**: Shipping and package tracking
* **`refunds`**: Refunds and returns

**Technical & Infrastructure Scopes**

* **`build`**: Project compilation configuration
* **`config`**: Settings and configuration files
* **`deps`**: Updating external libraries
* **`docker`**: Docker container configuration
* **`ci`** / **`cd`**: Deploy and test automation
* **`tests`**: Automatic code tests
* **`lint`**: Code formatting rules
* **`scripts`**: Automation command scripts
* **`migrations`**: Database structure changes
* **`seeds`**: Sample data for database
* **`backup`**: Data backup and restore
* **`logging`**: Log and error recording
* **`monitoring`**: Error monitoring in production
* **`security`**: Security fixes
* **`env`**: Environment variables (API keys, etc.)
* **`ssl`**: HTTPS security certificates
* **`dns`**: Domain configuration
* **`cdn`**: Fast content distribution network
* **`server`**: Web server configuration
* **`db`** / **`database`**: Database and query optimization
* **`graphql`**: GraphQL API
* **`rest`**: REST API
* **`websocket`**: Real-time connections
* **`redis`**: Fast in-memory cache
* **`queue`**: Asynchronous processing queues
* **`workers`**: Background processes

**Scopes for Specific Components**

* **`admin`**: Administration panel
* **`dashboard`**: Main user dashboard
* **`home`**: Home page
* **`about`**: About us page
* **`contact`**: Contact page
* **`blog`**: Blog article section
* **`docs`**: Documentation
* **`faq`**: Frequently asked questions
* **`legal`**: Privacy and terms of service
* **`pricing`**: Pricing page
* **`landing`**: Marketing landing page
* **`onboarding`**: First steps guide for new users
* **`settings`**: Settings page
* **`help`**: Help center

**Generic Useful Scopes**

* **`hotfix`**: Urgent corrections
* **`refactor`**: Code reorganization without new functions
* **`cleanup`**: Cleaning old or unused code
* **`deps-dev`**: Development-only libraries
* **`readme`**: README documentation updates
* **`changelog`**: Changelog updates
* **`release`**: New version preparation
* **`wip`**: Work in progress (do not use on main branch)

**Tip**: Always choose the most specific scope possible. If you need to touch multiple areas, consider making separate commits or use multiple scopes like `fix(auth,api): ...`

---

**How to choose the right scope?**

The golden rule is: **Be specific, but not too much.**

* ❌ *Too vague:* `feat(code): ...` (Everything is code)
* ❌ *Too specific:* `feat(red-button-bottom): ...` (Too much detail)
* ✅ *Right:* `feat(ui): ...` or `feat(profile): ...`

**Example of Choice:**
Did you change the "Logout" button color in the Navbar?

* If you changed it *only there*: `style(navbar): update logout button color`
* If you changed it in the *whole site*: `style(ui): update primary button color`

---

**3. Practical Examples: Bad vs Good**

| ❌ Bad | ✅ Good | Why? |
| --- | --- | --- |
| `git commit -m "fix"` | `git commit -m "fix(cart): prevent negative quantity"` | Explains *what* and *where* it was fixed. |
| `git commit -m "new stuff"` | `git commit -m "feat(profile): add avatar upload"` | I know exactly what feature was added. |
| `git commit -m "wip"` | `git commit -m "style(home): fix indentation alignment"` | "Wip" means nothing. `style` says it's only aesthetics. |
| `git commit -m "update"` | `git commit -m "chore(deps): update react to v19"` | "Update" is vague. `chore` implies maintenance. |