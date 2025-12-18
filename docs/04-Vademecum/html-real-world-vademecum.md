---
sidebar_position: 1
sidebar_label: 'HTML Real World Vademecum'
title: 'HTML Real World Vademecum'
---

# HTML Real World Vademecum

## 1. Basic HTML Structure

### The HTML document

**What it does**: Tells the browser "Hey, this is a modern HTML document!"

**Base snippet**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My site</title>
</head>
<body>
    <!-- The content goes here -->
</body>
</html>
```

**Analogy**: It’s like the structure of a house 🏠

* `<!DOCTYPE html>` = The building permit
* `<html>` = The foundations
* `<head>` = The attic (you don’t see it but it contains important systems)
* `<body>` = The rooms where you live

### `<head>` - The hidden brain

**What it contains**: Information for the browser, not visible to the user

**Essential elements**:

```html
<head>
    <meta charset="UTF-8"> <!-- Universal alphabet -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- For mobile -->
    <title>Title in the tab</title> <!-- What you see in the tab -->
    <link rel="stylesheet" href="style.css"> <!-- Link to CSS -->
</head>
```

**Analogy**: Like the label on a box - it tells what’s inside without opening it!

### The main containers

#### `<body>` - The visible body

**What it does**: Contains EVERYTHING the user sees

```html
<body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
</body>
```

#### `<header>` - The header

**What it does**: Contains the header of the page or of a section

```html
<header>
    <img src="logo.png" alt="Company logo">
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About us</a>
    </nav>
</header>
```

**Analogy**: Like a shop sign - the first thing you see when you walk in!

**When to use it**: Logo, main navigation, site title

#### `<main>` - The protagonist

**What it does**: Contains the main content, the thing the user came for!

```html
<main>
    <h1>Welcome to my blog!</h1>
    <article>My first post...</article>
</main>
```

**Golden rule**: Only ONE `<main>` per page!

**Analogy**: The main course at a restaurant - you can’t have two!

#### `<footer>` - The footer

**What it does**: Contains closing information, contacts, copyright

```html
<footer>
    <address>
        Via Roma 123, Milan
    </address>
    <p>&copy; 2024 My company</p>
</footer>
```

**Analogy**: Like the end credits of a movie - useful info at the end!

#### `<nav>` - The navigator

**What it does**: Groups navigation links

```html
<nav>
    <a href="#home">Home</a>
    <a href="#products">Products</a>
    <a href="#contact">Contacts</a>
</nav>
```

**Analogy**: The restaurant menu - it tells you where you can go!

#### `<section>` - The sections

**What it does**: Splits the content into thematic sections

```html
<section id="about">
    <h2>About us</h2>
    <p>Our story...</p>
</section>

<section id="services">
    <h2>Our services</h2>
    <p>What we offer...</p>
</section>
```

**Analogy**: The chapters of a book - each section is a topic!

#### `<article>` - The article

**What it does**: Content that makes sense even on its own

```html
<article>
    <h2>How to cook pasta</h2>
    <p>First of all, put the water on to boil...</p>
    <p>Add salt when it boils...</p>
</article>
```

**Test**: If you can share it on Facebook and it makes sense → it’s an `<article>`!

#### `<aside>` - The side content

**What it does**: Related but non-essential information

```html
<article>
    <h2>History of coffee</h2>
    <p>Coffee was discovered...</p>
    
    <aside>
        <h3>Did you know that...</h3>
        <p>Italians drink 6 billion coffees a year!</p>
    </aside>
</article>
```

**Analogy**: Like the colored boxes in school textbooks - extra interesting info!

#### `<address>` - Contact info

**What it does**: Contains contact information

```html
<address>
    <a href="mailto:info@company.it">info@company.it</a><br />
    Tel: <a href="tel:+390212345678">02 1234 5678</a><br />
    Via Dante 15, 20121 Milan
</address>
```

**It’s NOT only for physical addresses!** It can contain email, phone, social...

**Analogy**: The digital business card!

#### `<div>` - The all-rounder

**What it does**: Generic container with no special meaning

```html
<div class="card">
    <h3>Special product</h3>
    <p>Description...</p>
    <button>Buy</button>
</div>
```

**When to use it**: When there isn’t an appropriate semantic tag

**Analogy**: A cardboard box - you put whatever you want in it!

#### `<span>` - The little helper

**What it does**: Like `<div>` but for inline content (in the same line)

```html
<p>The price is <span class="price">€99</span> instead of €150!</p>
```

**Analogy**: A text highlighter - it marks a word without interrupting!


<br />
<br />
<br />
<br />






## 2. Text Elements

### Headings - The hierarchy

```html
<h1>Main title (only one!)</h1>
<h2>Main chapters</h2>
<h3>Subchapters</h3>
<h4>Subchapter sections</h4>
<h5>Section details</h5>
<h6>The smallest</h6>
```

**Rule**: Like a Russian nesting doll - each level inside the other! 🪆

### `<p>` - The paragraph

**What it does**: Groups text into paragraphs

```html
<p>This is a paragraph. It always breaks to a new line before and after.</p>
<p>This is another paragraph, separated from the first.</p>
```

### Emphasis and importance

```html
<em>Emphasized text</em> <!-- Italic with meaning -->
<i>Italic text</i> <!-- Style only -->

<strong>Important text</strong> <!-- Bold with meaning -->
<b>Bold text</b> <!-- Style only -->
```

**When to use which?**

* `<em>` and `<strong>`: When the text IS truly important
* `<i>` and `<b>`: Only for visual style

### `<blockquote>` - The quotation

**What it does**: Indicates a long quotation from another source

```html
<blockquote>
    <p>Code is poetry.</p>
    <cite>- A wise programmer</cite>
</blockquote>
```

**Analogy**: Like when you quote a book - you give credit to the author!

### `<hr>` - The horizontal rule

**What it does**: Creates a thematic separation

```html
<p>End of chapter 1</p>
<hr>
<p>Start of chapter 2</p>
```

**Visual**: _______________

### Lists

#### Unordered list

```html
<ul>
    <li>Apples</li>
    <li>Pears</li>
    <li>Bananas</li>
</ul>
```

**Result**:
• Apples
• Pears
• Bananas

#### Ordered list

```html
<ol>
    <li>Turn on the computer</li>
    <li>Open the browser</li>
    <li>Start coding!</li>
</ol>
```

**Result**:

1. Turn on the computer
2. Open the browser
3. Start coding!


<br />
<br />
<br />
<br />






## 3. Links - The doors of the web

### `<a>` - The anchor

**What it does**: Creates clickable links

**Basic link**:

```html
<a href="https://www.google.it">Go to Google</a>
```

**Link within the same page**:

```html
<a href="#contacts">Go to contacts</a>
<!-- Lower down the page: -->
<section id="contacts">...</section>
```

**Email link**:

```html
<a href="mailto:info@example.it">Write to me!</a>
```

**Phone link**:

```html
<a href="tel:+391234567890">Call me!</a>
```

### Special attributes for links

#### `target="_blank"`

**What it does**: Opens the link in a new tab

```html
<a href="https://example.it" target="_blank">Open in a new tab</a>
```

**Analogy**: Like opening a new window instead of replacing the current one!

#### `rel="noreferrer"`

**What it does**: Hides where the click comes from (privacy)

```html
<a href="https://example.it" target="_blank" rel="noreferrer">Private link</a>
```

**Analogy**: Like walking into a shop without saying who recommended it to you!


<br />
<br />
<br />
<br />






## 4. Media

### `<img>` - Images

**What it does**: Displays an image

**Full snippet**:

```html
<img 
    src="cat.jpg" 
    alt="An orange cat sleeping"
    width="600"
    height="400"
    loading="lazy"
>
```

#### `loading="lazy"`

**What it does**: Loads the image only when it’s about to be seen!

**Analogy**: Like a smart waiter who brings the dishes only when you sit at the table!

```html
<!-- Image at the top (loads immediately) -->
<img src="hero.jpg" alt="Main banner">

<!-- Images at the bottom (load later) -->
<img src="photo1.jpg" alt="Gallery 1" loading="lazy">
<img src="photo2.jpg" alt="Gallery 2" loading="lazy">
```

**Benefits**:

* ⚡ Faster page
* 📱 Mobile data savings
* 🚀 Better user experience

### `<iframe>` - The magic window

**What it does**: Embeds another web page inside yours

```html
<iframe 
    src="https://www.youtube.com/embed/VIDEO_ID"
    width="560" 
    height="315"
    title="CSS tutorial video"
>
</iframe>
```

**Common uses**:

* YouTube videos
* Google Maps
* Social media posts

**Analogy**: Like having a TV inside a TV - it shows another channel inside yours!


<br />
<br />
<br />
<br />







## 5. Forms - Interaction

### The basic structure

```html
<form action="/send-data" method="POST">
    <!-- Form fields -->
    <button type="submit">Submit</button>
</form>
```

### Buttons - Types and traps

**What it does**: Defines exactly what happens when you click a button.

**The trap**: If you write only `<button>`, the browser assumes it is `submit`. Click → the page reloads! 😱

```html
<button type="submit">Submit Order</button>
<button type="button">Add Item</button>
<button type="reset">Clear</button>
```

**Analogy**:

* `submit` = Dropping the letter in the mailbox 📮 (it’s sent and you don’t have it anymore)
* `button` = Calculator key 🧮 (you do the calculation but you stay there)
* `reset` = Whiteboard eraser ✨

### `<label>` and `<input>` - The perfect pair

```html
<label for="name">Your name:</label>
<input type="text" id="name" name="name" required>
```

**Why the `for`?** Click the label → the input gets activated! Accessibility magic! ✨

### Most used input types

```html
<!-- Plain text -->
<input type="text" placeholder="Write here...">

<!-- Email with validation -->
<input type="email" placeholder="your@email.com" required>

<!-- Hidden password -->
<input type="password">

<!-- Number -->
<input type="number" min="0" max="100">

<!-- Date -->
<input type="date">

<!-- Checkbox -->
<input type="checkbox" id="privacy">
<label for="privacy">I accept the privacy policy</label>

<!-- Radio (single choice) -->
<input type="radio" name="size" value="S" id="small">
<label for="small">Small</label>
<input type="radio" name="size" value="M" id="medium">
<label for="medium">Medium</label>
```

### `<select>` - The dropdown menu

```html
<label for="country">Choose the country:</label>
<select id="country" name="country">
    <option value="">-- Select --</option>
    <option value="IT">Italy</option>
    <option value="FR">France</option>
    <option value="ES">Spain</option>
</select>
```

### `<textarea>` - Long text

```html
<label for="message">Your message:</label>
<textarea id="message" name="message" rows="4" cols="50">
</textarea>
```

### `<fieldset>` and `<legend>` - Group with style

```html
<fieldset>
    <legend>Personal data</legend>
    <label for="name">Name:</label>
    <input type="text" id="name">
    
    <label for="surname">Surname:</label>
    <input type="text" id="surname">
</fieldset>
```

**Visual**: Creates a box with border and title!

### Useful attributes for forms

#### `placeholder`

**What it does**: Example text that disappears when you type

```html
<input type="text" placeholder="e.g. Mario Rossi">
```

#### `required`

**What it does**: Required field

```html
<input type="email" required>
```

#### `name`

**What it does**: Name of the data when it’s submitted

```html
<input type="text" name="username">
```

#### `inputmode`

**What it does**: Tells the browser which keyboard to show on mobile to make life easier for the user.

```html
<!-- Text: Default, normal keyboard -->
<input type="text" inputmode="text">

<!-- Numeric: Numeric keyboard (0-9) -->
<input type="text" inputmode="numeric">

<!-- Decimal: Numeric keyboard with decimal point -->
<input type="text" inputmode="decimal">

<!-- Tel: Phone keypad -->
<input type="text" inputmode="tel">

<!-- Email: Optimized keyboard with "@" and "." -->
<input type="text" inputmode="email">

<!-- Url: Optimized keyboard with "/" and "." -->
<input type="text" inputmode="url">

<!-- Search: Enter key becomes "Search" 🔍 -->
<input type="search" inputmode="search">

```

**Note**: These `inputmode` attributes are pure UX! They don’t validate data (that’s what the type is for), but they make input much faster on smartphones.

**Analogy**: Like handing the mechanic the right wrench directly instead of making them search through the toolbox! 🔧


<br />
<br />
<br />
<br />







## 6. Accessibility - For everyone! ♿

### Basic ARIA attributes

#### `role`

**What it does**: Tells what role an element has

```html
<section role="region" aria-labelledby="news">
    <h2 id="news">Latest news</h2>
</section>
```

#### `aria-label`

**What it does**: Invisible label but read by screen readers

```html
<button aria-label="Close window">X</button>
```

#### `aria-labelledby`

**What it does**: Links an element to another existing label

```html
<section aria-labelledby="section-title">
    <h2 id="section-title">Our services</h2>
</section>
```

**Analogy**: Like subtitles for the hearing impaired - you don’t see them but they’re there for those who need them!


<br />
<br />
<br />
<br />







## 7. Global attributes - Usable anywhere

### `id` - The unique identifier

```html
<div id="main-header">...</div>
```

**Rule**: Like a tax ID code - only one per element!

### `class` - Categories

```html
<div class="card special highlighted">...</div>
```

**It can have multiple classes!** Separated by spaces

### `style` - Inline CSS (to avoid!)

```html
<p style="color: red;">Red text</p>
```

**Better to use external CSS!**

### `title` - The tooltip

```html
<abbr title="Hypertext Markup Language">HTML</abbr>
```

**Hover your mouse over it → the explanation appears!**


<br />
<br />
<br />
<br />






## 8. External libraries - Superpowers! 🦸‍♂️

### Font Awesome - Beautiful icons

**In the `<head>`**:

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
```

**Usage**:

```html
<!-- Social icons -->
<i class="fab fa-facebook"></i>
<i class="fab fa-twitter"></i>
<i class="fab fa-instagram"></i>

<!-- Generic icons -->
<i class="fas fa-heart"></i>
<i class="fas fa-star"></i>
```

**Analogy**: Like having thousands of professional emojis for free!


<br />
<br />
<br />
<br />







## The 10 commandments of HTML

### 1. Alt Text — The voice of the image 🗣️

**Why**: if the image doesn’t load (or the user uses a screen reader), the `alt` is what “remains”. It also helps SEO and accessibility.

```html
<!-- ❌ -->
<img src="cake.jpg">

<!-- ✅ -->
<img src="cake.jpg" alt="Chocolate cake with whipped cream">
```

**Analogy**: it’s like describing a photo over the phone: you don’t say “image.jpg”, you say what you actually see.

> Pro note: if the image is *purely decorative*, use `alt=""` (empty alt), so the screen reader skips it.

---

### 2. Close your tags — The sandwich principle 🥪

**Why**: if you open a tag and don’t close it, the browser “guesses” and you risk breaking the layout of everything that follows.

```html
<!-- ❌ -->
<p>This paragraph eats everything else...
  <header>Oops, I ended up inside the paragraph!</header>

<!-- ✅ -->
<p>This paragraph ends here.</p>
<header>I’m safe!</header>
```

**Analogy**: like a sandwich. If you put the bottom slice (`<p>`) and forget the top one (`</p>`), the filling ends up everywhere.

> Pro note: some tags are *void* (they don’t get closed), like `<img>`, `<input>`, `<br>`.

---

### 3. Semantics — The right labels 🏷️

**Why**: code full of `<div>` is a maze. Semantic tags tell *what* is inside, not just *how* it looks.

```html
<!-- ❌ -->
<div class="header">...</div>
<div class="footer">...</div>

<!-- ✅ -->
<header>...</header>
<footer>...</footer>
```

**Analogy**: moving boxes 📦. If you write “STUFF” on everything (`div`), you’ll go crazy. If you write “KITCHEN”, “BATHROOM”, you immediately know where to start.

> Pro note: also think about `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`.

---

### 4. King H1 — One (almost always) 👑

**Why**: `<h1>` is the main title of the page. Having many makes it harder to understand the central topic (for people and search engines).

```html
<!-- ❌ -->
<h1>Welcome</h1>
...
<h1>Our services</h1>

<!-- ✅ -->
<h1>Welcome to the site</h1>
...
<h2>Our services</h2>
```

**Analogy**: the front page of a newspaper 📰. There’s only one BIG HEADLINE. The rest are subheadings. If everything is a headline, nothing is important.

> Pro note: the H hierarchy is a *map* of the content (structure), not a way to choose the font size.

---

### 5. Label and Input — The inseparable pair 🎯

**Why**: without a `label` connected with `for`/`id`, the user has to click *precisely* in the field. With the label, you can also click the text: more convenient (especially on mobile) and more accessible.

```html
<!-- ❌ -->
Name: <input type="text">

<!-- ✅ -->
<label for="name">Name:</label>
<input type="text" id="name" name="name">
```

**Analogy**: a light switch 💡. The input is the internal mechanism (small). The label is the big plate: it makes it easy to “turn on” the field.

---

### 6. Don’t skip steps — H hierarchy 🪜

**Why**: don’t jump from `h2` to `h4` just because you “like it bigger/smaller”. Hierarchy is for structure; styling is done with CSS.

```html
<!-- ❌ -->
<h2>The product</h2>
<h4>Features</h4>

<!-- ✅ -->
<h2>The product</h2>
<h3>Features</h3>
```

**Analogy**: a staircase. If you skip steps, readers trip (and so does Google).

---

### 7. No mysterious links — Say where you’re going 🔗

**Why**: “click here” says nothing out of context (screen readers, quick scanning, SEO). Link text must make sense on its own.

```html
<!-- ❌ -->
<a href="menu.pdf">Click here</a>

<!-- ✅ -->
<a href="menu.pdf">Download the menu (PDF)</a>
```

**Analogy**: a road sign that says “Go there”. Better “Central Station”. 🚏

---

### 8. No inline CSS — Separation of concerns 👕

**Why**: styling inside HTML becomes unmanageable. With CSS classes you change once and update everything, without a “treasure hunt” through tags.

```html
<!-- ❌ -->
<p style="color: red; font-size: 20px;">Attention</p>

<!-- ✅ -->
<p class="alert">Attention</p>
```

**Analogy**: inline style is a tattoo: hard to change. Classes are clothes: you change them whenever you want.

---

### 9. The suitcase rule — Sensible nesting 🧳

**Why**: some elements can’t go inside others (e.g., a `<div>` inside a `<p>` is invalid markup). Result: confusing HTML and unpredictable rendering.

```html
<!-- ❌ -->
<p>Here is my <div>BOX</div> text</p>

<!-- ✅ -->
<p>Here is my text.</p>
<div class="box">BOX</div>
```

**Analogy**: you can’t put a suitcase in a wallet. But you can put a wallet in a suitcase.

---

### 10. Always use quotes — Clean attributes 👟

**Why**: sometimes it “still works”, until it doesn’t. Quotes avoid ambiguity and make code more readable and robust.

```html
<!-- ❌ -->
<input type=text class=big>

<!-- ✅ -->
<input type="text" class="big">
```

**Analogy**: like tying your shoes. You can walk with untied laces… until you face-plant.

---

## Bonus (highly recommended)

### 11. “Honest” forms — Right type + `required` + `autocomplete` ✅

**Why**: you help the user (especially on mobile), reduce errors, and improve accessibility.

```html
<!-- ❌ -->
<input type="text" placeholder="Email">

<!-- ✅ -->
<label for="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  required
>
```

**Analogy**: it’s like filling out a form with someone guiding you (“a real email goes here”), instead of leaving you in chaos.

---

### 12. Buttons and links are not interchangeable 🔘🔗

**Why**: a link (`<a>`) is for **navigation**, a button (`<button>`) is for **an action**. If you swap them, you ruin UX, accessibility, and keyboard behavior.

```html
<!-- ❌: action disguised as a link -->
<a href="#" onclick="save()">Save</a>

<!-- ✅ -->
<button type="button" onclick="save()">Save</button>

<!-- ❌: navigation disguised as a button -->
<button onclick="location.href='/prices'">Prices</button>

<!-- ✅ -->
<a href="/prices">Prices</a>
```

**Analogy**: a link is a door (it takes you elsewhere), a button is a switch (it makes something happen).

