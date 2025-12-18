---
sidebar_position: 2
sidebar_label: 'CSS Real World Vademecum'
title: 'CSS Real World Vademecum'
---

# CSS Real World Vademecum

## 1. Importing external fonts

### Google Fonts link

**What it does**: Imports professional fonts for free from Google into your site.

**Snippet in the HTML `<head>`**:

```html
<!-- Single font -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,800" rel="stylesheet">

<!-- Multiple fonts -->
<link href="https://fonts.googleapis.com/css?family=Anton%7CBaskervville%7CRaleway&display=swap" rel="stylesheet">
```

**The numbers (400,700,800) mean**:

```
400 = normal
700 = bold
800 = extra bold
```

**Then in CSS**:

```css
body {
  font-family: 'Open Sans', Arial, sans-serif;
}
```

**Analogy**: It’s like ordering special pens on Amazon instead of using only the ones from the supermarket. They arrive via the internet and you use them whenever you want!

### Font Awesome link

**What it does**: Imports thousands of professional icons

**In the `<head>`**:

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
```

**Usage in HTML**:

```html
<i class="fab fa-facebook-f"></i>  <!-- Facebook -->
<i class="fab fa-twitter"></i>      <!-- Twitter -->
<i class="fas fa-heart"></i>        <!-- Heart -->
```

**Font Awesome classes**:

* `fab` = Font Awesome Brands (company logos)
* `fas` = Font Awesome Solid (filled icons)
* `far` = Font Awesome Regular (outlined icons)

<br />
<br />
<br />
<br />







## 2. Fundamental selectors

### Universal selector `*`

**What it does**: Selects ALL the elements on the page. Literally all of them!

**Snippet**:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

### Full universal reset

**What it does**: Resets EVERYTHING including pseudo-elements

```css
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```

**Analogy**: Like saying "EVERYONE in class, including those in the hallway and in the bathroom, sit down!"

### Type selector (tag)

**What it does**: Selects all HTML elements of that type.

```css
/* All paragraphs */
p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Specializations */
p.warning { color: red; }        /* Only p with class warning */
p[lang="en"] { font-style: italic; } /* Only p in English */
```

### Class selector `.class`

**What it does**: Selects elements with that class, regardless of the tag.

```css
.important {
  background: yellow;
  font-weight: bold;
}
```

### Multiple selectors (no space)

**What it does**: Selects elements that have ALL the specified classes.

```css
/* Element with BOTH classes */
.social-icons.active {
  color: blue;
}
```

### Combined selectors (comma)

**What it does**: Applies the same style to multiple selectors

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Raleway', sans-serif;
}
```

### State pseudo-classes

```css
/* Hover */
button:hover {
  background: #f0f0f0;
  cursor: pointer;
  transform: translateY(-2px);
}

/* While clicking */
button:active {
  transform: scale(0.95);
}

/* Already visited link */
a:visited {
  color: purple;
}

/* Element with focus (keyboard) */
input:focus {
  outline: 2px solid blue;
  background: #f0f8ff;
}
```

### `:not()` pseudo-class

```css
/* All p except those with class .no-margin */
p:not(.no-margin) {
  margin-bottom: 1rem;
}
```

### Type pseudo-selectors

```css
/* First element of its type */
.line:first-of-type {
  margin-top: 0;
}

/* The second, third, etc. */
.line:nth-of-type(2) { transform: rotate(60deg); }
.line:nth-of-type(3) { transform: rotate(120deg); }

/* Odd and even positions */
tr:nth-of-type(odd) { background: #f0f0f0; }
tr:nth-of-type(even) { background: white; }
```

### Pseudo-elements `::before` and `::after`

```css
/* Empty content for shapes/decorations */
.penguin-body::before {
  content: "";  /* REQUIRED even if empty! */
  width: 50%;
  height: 45%;
  background-color: gray;
}
```

### `::first-letter` pseudo-element

```css
.first-paragraph::first-letter {
  font-size: 6rem;
  color: orangered;
  float: left;
  margin-right: 1rem;
}
```

### `::selection` pseudo-element

**What it does**: Styles text when you select it!

```css
::selection {
  background: gold;
  color: black;
}

/* For Firefox */
::-moz-selection {
  background: gold;
  color: black;
}
```

**Result**: When you select text it becomes golden instead of blue!

**Analogy**: Like a custom highlighter - you choose the color!

### Modern pseudo-classes

#### `:is()` - Avoid repetition

```css
/* BEFORE (repetitive) */
article h1:hover,
article h2:hover,
article h3:hover {
  color: blue;
}

/* AFTER (with :is) */
article :is(h1, h2, h3):hover {
  color: blue;
}
```

**Analogy**: Like saying "any one of you three" instead of calling each one individually!

#### `:where()` - Like `:is()` but with specificity 0

```css
/* Doesn’t increase specificity */
:where(article, section) p {
  margin: 1rem;
}
```

**When to use it**: When you want styles that are easy to override

#### `:has()` - The parent selector!   2023

```css
/* Style the div IF it contains an image */
div:has(> img) {
  border: 2px solid blue;
  padding: 1rem;
}

/* Card that contains a video */
.card:has(video) {
  background: black;
}

/* Form with invalid input */
form:has(input:invalid) {
  border: 2px solid red;
}
```

**REVOLUTIONARY!** Before, you couldn’t style a parent based on its children!

**Analogy**: Like saying "color red the boxes that contain apples"!

<br />
<br />
<br />
<br />







## 3. Box Model & Spacing

### `margin`

**What it does**: Creates space OUTSIDE the element.

**Shorthand explained**:

```css
/* One value = all sides */
margin: 20px;

/* Two values = vertical | horizontal */  
margin: 10px 20px;

/* Three values = top | sides | bottom */
margin: 10px 20px 30px;

/* Four = clockwise */
margin: 5px 10px 15px 20px;
```

**Centering with auto**:

```css
.container {
  width: 800px;
  margin: 0 auto; /* Magic! It centers itself */
}
```

**Negative margins**:

```css
.hero-title {
  margin-top: -20px; /* Moves UP by 20px */
}
```

### `padding`

```css
.button {
  padding: 10px 20px; /* vertical | horizontal */
}

.card {
  padding: 2rem; /* Same on all sides */
}
```

### `border`

```css
/* Classic solid */
.box {
  border: 2px solid black;
}

/* Different styles */
border: 3px dotted red;    /* • • • • */
border: 2px dashed blue;   /* - - - - */
border: 4px double green;  /* ══════ */
```

### Advanced `border-radius`

```css
/* Specific corners only */
.key {
  border-radius: 0 0 3px 3px;
  /* Square on top, rounded on the bottom */
}
```

### `box-sizing`

```css
/* Reset pattern with inherit */
html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}
```

### Sizes & units

```css
/* ABSOLUTE */
width: 200px;      /* Pixels */

/* RELATIVE */
width: 80%;        /* % of the parent */
font-size: 2rem;   /* 2x root */
height: 50vh;      /* 50% viewport height */
width: 55vw;       /* 55% viewport width */
```

### Size functions

#### `calc()` for calculations

```css
/* Total width minus fixed margins */
.container {
  width: calc(100% - 40px);
}

/* Complex calculations */
.column {
  width: calc((100% - 20px * 2) / 3);
}
```

#### `min()` and `max()`

**What they do**: Choose the minimum or maximum value among options

```css
/* min() - takes the SMALLEST */
.sidebar {
  width: min(300px, 100%);
  /* If the screen is < 300px, it uses 100% */
}

/* max() - takes the LARGEST */
.hero {
  height: max(400px, 50vh);
  /* Never less than 400px tall */
}
```

**Analogy**:

* `min()` = "Give me the smaller glass among these"
* `max()` = "Give me the bigger glass among these"

#### `clamp()` - The smart limiter

**What it does**: Sets a value with minimum and maximum limits

```css
/* clamp(MIN, PREFERRED, MAX) */
.title {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* Never < 1.5rem, ideally 4vw, never > 3rem */
}

.container {
  width: clamp(300px, 80%, 1200px);
}

.padding-responsive {
  padding: clamp(1rem, 5vw, 3rem);
}
```

**How it works**:

```
Mobile (400px screen):
4vw = 16px, but the minimum is 1.5rem (24px)
Result: 24px ✓

Desktop (1200px screen):
4vw = 48px, but the maximum is 3rem (48px)
Result: 48px ✓

Tablet (800px screen):
4vw = 32px (between min and max)
Result: 32px ✓
```

**Analogy**: Like a thermostat! It keeps the temperature (size) always between a minimum and a maximum, trying to stay at the ideal value!

<br />
<br />
<br />
<br />







## 4. Typography

### `font-family`

```css
/* With Google fonts */
h1 {
  font-family: 'Anton', sans-serif;
}

/* Multiple fonts with fallback */
body {
  font-family: 'Baskervville', Georgia, serif;
}
```

### `font-size` with the 62.5% trick

```css
html {
  font-size: 62.5%; /* Now 1rem = 10px instead of 16px! */
}

/* Now calculations are super easy! */
h1 { font-size: 3.2rem; } /* = 32px */
h2 { font-size: 2.4rem; } /* = 24px */  
p  { font-size: 1.6rem; } /* = 16px */
```

### Font shorthand

```css
/* Syntax: style weight size/line-height family */
.title {
  font: italic 700 2.4rem/1.2 'Raleway', sans-serif;
}
```

### `letter-spacing`

```css
h1 {
  letter-spacing: 0.6px;  /* A little spacing */
}

.logo {
  letter-spacing: 8px;    /* A L O T   O F   S P A C E */
}
```

### `line-height`

```css
p {
  line-height: 1.6;      /* 1.6 times the font-size */
}
```

### `text-overflow` - Text that’s too long

**What it does**: Handles text that overflows its container

```css
.title {
  white-space: nowrap;      /* Don’t wrap */
  overflow: hidden;         /* Hide the overflow */
  text-overflow: ellipsis;  /* Add ... */
  width: 200px;
}
```

**Result**:

```
"This is a very long title" → "This is a title..."
```

**Analogy**: Like when WhatsApp cuts long messages in notifications!

### Other typographic styles

```css
/* text-decoration */
a {
  text-decoration: none;      /* Removes underline */
}

/* white-space */
.nowrap {
  white-space: nowrap;  /* Never wraps */
}

/* column-width - multi-column text */
.article {
  column-width: 25rem;  /* Columns 25rem wide */
  column-gap: 3rem;     /* Space between columns */
}

/* Custom lists */
.lists {
  list-style-type: none;       /* Removes bullets */
  list-style-position: inside; /* Bullets inside the box */
}
```

<br />
<br />
<br />
<br />







## 5. Colors & Backgrounds

### `color`

```css
/* Name */
color: red;
color: orangered;

/* HEX */
color: #00beef;

/* RGB/RGBA */
color: rgb(255, 0, 0);              /* Red */
color: rgba(255, 255, 255, 0.5);    /* White 50% transparent */
```

### `background-color`

```css
.warning {
  background-color: #fff3cd;
}

/* With transparency */
.overlay {
  background-color: rgba(0, 0, 0, 0.7);
}
```

### Advanced backgrounds

#### Background control properties

```css
.hero {
  background-image: url("hero.jpg");
  background-size: cover;           /* Covers everything */
  background-position: center;      /* Centers */
  background-repeat: no-repeat;     /* Don’t repeat */
  background-attachment: fixed;     /* Parallax! */
}
```

### `linear-gradient()` with angles

```css
/* 45 degrees - diagonal */
background: linear-gradient(45deg, rgb(118, 201, 255), rgb(247, 255, 222));

/* Multi-color with percentage stops */
background: linear-gradient(
  45deg,
  red 0%,
  yellow 50%,
  green 100%
);
```

### `radial-gradient()`

**What it does**: Creates circular gradients from the center outward

```css
/* Basic circular gradient */
.circle {
  background: radial-gradient(circle, yellow, orange, red);
}

/* With specific position */
.sun {
  background: radial-gradient(
    circle at top right,
    yellow 0%,
    orange 30%,
    transparent 50%
  );
}

/* Elliptical */
.ellipse {
  background: radial-gradient(
    ellipse at center,
    white 0%,
    black 100%
  );
}
```

**Visual**:

```
radial-gradient:
    ⚪ (light center)
   🟡
  🟠
 🔴 (dark edges)
```

### `conic-gradient()`

**What it does**: Conic gradient (like a color pie!)

```css
/* Circular rainbow */
.rainbow-wheel {
  background: conic-gradient(
    red, yellow, green, cyan, blue, magenta, red
  );
  border-radius: 50%;
}

/* Pie chart */
.pie-chart {
  background: conic-gradient(
    red 0deg 90deg,      /* 25% */
    blue 90deg 180deg,   /* 25% */
    green 180deg 360deg  /* 50% */
  );
}
```

### `opacity`

```css
.faded {
  opacity: 0.5;    /* 50% transparent ENTIRE element */
}
```

<br />
<br />
<br />
<br />







## 6. Layout & Display

### `display`

```css
/* Block - new "paragraph" */
display: block;

/* Inline - in the line */
display: inline;

/* Inline-block - hybrid */
display: inline-block;

/* Flex - flexible container */
display: flex;

/* Grid - grid */
display: grid;

/* None - it disappears! */
display: none;
```

### `position`

```css
/* Static (default) */
position: static;

/* Relative - moved from the normal position */
position: relative;
top: 10px;
left: 20px;

/* Absolute - out of the flow */
position: absolute;
top: 50%;
left: 50%;

/* Fixed - fixed in the viewport */
position: fixed;
bottom: 0;

/* Sticky - relative/fixed hybrid */
position: sticky;
top: 0;
```

### `z-index`

```css
.front { z-index: 100; }
.middle { z-index: 10; }
.behind { z-index: -1; }
```

### `float` and clearfix

```css
/* Float */
float: left;
float: right;
float: none;

/* Clearfix with overflow */
.container {
  overflow: hidden;  /* Contains floats! */
}
```

### `aspect-ratio`

**What it does**: Keeps an element’s proportions

```css
/* 16:9 video */
.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: black;
}

/* Perfect square */
.square {
  width: 200px;
  aspect-ratio: 1;  /* or 1/1 */
}

/* Card with custom ratio */
.card {
  width: 300px;
  aspect-ratio: 3 / 4;
}
```

**Before aspect-ratio** (the old trick):

```css
/* The old way with padding */
.video-old {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
}
```

**Analogy**: Like saying "this photo must always be rectangular like a TV, no matter how you resize it"!

### Flexbox

**What it does**: Creates flexible layouts in one direction (row or column).

#### Container setup

```css
.container {
  display: flex;              /* Enable flex */
  flex-direction: row;        /* → horizontal (default) */
  flex-wrap: wrap;           /* Wrap if there’s no space */
  gap: 1rem;                 /* Space between items */
}
```

#### Full container properties

```css
/* DIRECTION */
flex-direction: row;           /* → */
flex-direction: column;        /* ↓ */
flex-direction: row-reverse;   /* ← */
flex-direction: column-reverse; /* ↑ */

/* WRAPPING */
flex-wrap: nowrap;        /* Squeezes everything (default) */
flex-wrap: wrap;          /* Wraps */
flex-wrap: wrap-reverse;  /* Wraps reversed */

/* MAIN-AXIS ALIGNMENT */
justify-content: flex-start;    /* |■■■      | */
justify-content: center;        /* |  ■■■    | */
justify-content: flex-end;      /* |      ■■■| */
justify-content: space-between; /* |■   ■   ■| */
justify-content: space-around;  /* | ■  ■  ■ | */
justify-content: space-evenly;  /* | ■  ■  ■ | */

/* CROSS-AXIS ALIGNMENT */
align-items: stretch;      /* Default - stretches */
align-items: center;       /* Centers vertically */
align-items: flex-start;   /* Top */
align-items: flex-end;     /* Bottom */
align-items: baseline;     /* Aligns text baselines */

/* LINE ALIGNMENT (with wrap) */
align-content: flex-start;
align-content: center;
align-content: space-between;
```

#### Child properties (flex items)

```css
.item {
  /* Growth */
  flex-grow: 1;      /* Can grow */
  
  /* Shrink */
  flex-shrink: 0;    /* Can’t shrink */
  
  /* Base size */
  flex-basis: 200px; /* Initial size */
  
  /* Shorthand */
  flex: 1 0 200px;   /* grow shrink basis */
  
  /* Self-alignment */
  align-self: center; /* Override align-items */
  
  /* Order */
  order: -1;         /* Comes first (default: 0) */
}
```

**Perfect 2D centering**:

```css
.center-perfect {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

### Grid - Complete grid layout

#### Basic grid with all properties

```css
.grid-container {
  display: grid;
  
  /* Column definition */
  grid-template-columns: 200px 1fr 200px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  /* Row definition */
  grid-template-rows: 100px auto 100px;
  
  /* Spacing */
  gap: 20px;              /* Both */
  row-gap: 30px;          /* Rows only */
  column-gap: 20px;       /* Columns only */
  
  /* Alignment */
  justify-items: center;   /* Horizontal items */
  align-items: center;     /* Vertical items */
  justify-content: center; /* Horizontal grid */
  align-content: center;   /* Vertical grid */
  
  /* Alignment shorthand */
  place-items: center;     /* align + justify items */
  place-content: center;   /* align + justify content */
}
```

#### `repeat()` with auto-fit/auto-fill

```css
/* auto-fit - stretches the columns */
.gallery {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* auto-fill - keeps the size */
.gallery {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

**Visual difference**:

```
Container 800px, items 200px:

auto-fill: [200px][200px][200px][empty]
auto-fit:  [266px][266px][266px] (stretched)
```

#### `grid-auto-flow`

```css
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: column;     /* New columns instead of rows */
  grid-auto-flow: dense;      /* Fills gaps */
  grid-auto-columns: 1fr;     /* Auto column size */
}
```

#### Advanced positioning

```css
.item {
  /* Columns */
  grid-column: 1 / 3;        /* From line 1 to 3 */
  grid-column: 1 / -1;       /* Full width */
  grid-column: span 2;       /* Spans 2 columns */
  
  /* Rows */
  grid-row: 1 / 3;
  
  /* Named area */
  grid-area: header;         /* If you use grid-template-areas */
}

/* Grid template areas */
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
```


<br />
<br />
<br />
<br />







## 7. CSS Custom Properties (Variables)

### Full definition and usage

```css
:root {
  /* Colors */
  --primary: #007bff;
  --primary-dark: #0056b3;
  --primary-light: #e7f3ff;
  
  /* Spacing 8px system */
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 1rem;     /* 16px */
  --space-md: 2rem;     /* 32px */
  --space-lg: 3rem;     /* 48px */
  --space-xl: 4rem;     /* 64px */
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "Fira Code", "Courier New", monospace;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  
  /* Animations */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
  
  /* Breakpoints as custom properties */
  --screen-sm: 640px;
  --screen-md: 768px;
  --screen-lg: 1024px;
}
```

### Advanced usage with fallback

```css
.card {
  /* var() with fallback */
  background: var(--card-bg, white);
  padding: var(--card-padding, 1rem);
  
  /* Calculations with variables */
  margin: calc(var(--space-md) * 2);
  
  /* Variables in media queries */
  max-width: var(--container-width, 1200px);
}

/* Local override */
.dark-theme {
  --primary: #6c757d;
  --card-bg: #2d2d2d;
}
```

### Dynamic variables with JavaScript

```css
.dynamic {
  transform: translateX(var(--mouse-x));
  transform: translateY(var(--mouse-y));
}
```

```javascript
// JavaScript
element.style.setProperty('--mouse-x', `${x}px`);
element.style.setProperty('--mouse-y', `${y}px`);
```


<br />
<br />
<br />
<br />







## 8. Complete transformations

### 2D Transform

```css
/* Rotation */
transform: rotate(45deg);
transform: rotate(-180deg);
transform: rotate(0.5turn);    /* Half rotation */

/* Scale */
transform: scale(1.5);         /* 150% */
transform: scale(0.5, 2);      /* X: 50%, Y: 200% */
transform: scaleX(-1);         /* Mirror horizontally */
transform: scaleY(0.5);        /* Squash vertically */

/* Translation */
transform: translate(50px, 100px);
transform: translateX(-50%);
transform: translateY(2rem);

/* Skew (tilt) */
transform: skew(20deg, 10deg);
transform: skewX(20deg);
transform: skewY(-15deg);

/* Multiple transforms */
transform: rotate(45deg) scale(1.2) translateX(50px);
```

### 3D Transform

```css
/* 3D rotation */
.card {
  transform: rotateX(180deg);    /* Horizontal flip */
  transform: rotateY(180deg);    /* Vertical flip */
  transform: rotateZ(45deg);     /* Like normal rotate */
  transform: rotate3d(1, 1, 0, 45deg); /* On a custom axis */
}

/* Perspective */
.container {
  perspective: 1000px;           /* Viewpoint */
}

.card {
  transform-style: preserve-3d;  /* Keep 3D for children */
  transform: translateZ(100px);  /* Towards you */
}

/* Full card flip */
.flip-card {
  width: 200px;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}
```

### Full `transform-origin`

```css
/* Keywords */
transform-origin: center;      /* Default */
transform-origin: top left;
transform-origin: bottom right;

/* Percentages */
transform-origin: 0% 0%;       /* Top left */
transform-origin: 100% 100%;   /* Bottom right */

/* Mixed values */
transform-origin: left 50%;
transform-origin: 10px 20px;

/* 3D */
transform-origin: center center -50px;
```


<br />
<br />
<br />
<br />







## 9. Complete animations

### Advanced `@keyframes`

```css
/* Multi-step animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* Complex animation */
@keyframes morphing {
  0% {
    border-radius: 50%;
    transform: rotate(0deg);
    background: red;
  }
  33% {
    border-radius: 0%;
    transform: rotate(120deg) scale(0.5);
    background: blue;
  }
  66% {
    border-radius: 50% 0;
    transform: rotate(240deg) scale(1.5);
    background: green;
  }
  100% {
    border-radius: 50%;
    transform: rotate(360deg);
    background: red;
  }
}
```

### Full animation properties

```css
.animated {
  /* Individual properties */
  animation-name: bounce;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.5s;
  animation-iteration-count: 3;      /* or infinite */
  animation-direction: alternate;    /* or reverse, alternate-reverse */
  animation-fill-mode: both;         /* or forwards, backwards */
  animation-play-state: running;     /* or paused */
  
  /* Full shorthand */
  animation: bounce 2s ease-in-out 0.5s 3 alternate both;
  
  /* Multiple animations */
  animation: 
    bounce 2s infinite,
    fade 1s ease-out,
    rotate 3s linear infinite;
}
```

### Full animation timing functions

```css
/* Presets */
animation-timing-function: linear;
animation-timing-function: ease;
animation-timing-function: ease-in;
animation-timing-function: ease-out;
animation-timing-function: ease-in-out;

/* Steps (for sprite animations) */
animation-timing-function: steps(12);
animation-timing-function: steps(12, start);
animation-timing-function: steps(12, end);

/* Custom cubic beziers */
animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce */
animation-timing-function: cubic-bezier(0.87, 0, 0.24, 0.99);      /* Dramatic */
```


<br />
<br />
<br />
<br />







## 10. Transitions

### Syntax

```css
.element {
  /* Individual properties */
  transition-property: all;           /* or specific ones: transform, opacity */
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;

  /* Shorthand (order: property duration timing-function delay) */
  transition: all 0.3s ease 0s;

  /* Multiple transitions */
  transition:
    transform 0.3s ease,
    opacity 0.2s ease 0.1s,    /* with delay */
    background-color 0.5s linear;
}
```

### Where to put it (golden rule)

```css
/* ❌ Transition ONLY on :hover → on “mouse out” it won’t animate as you expect */
.button:hover {
  transition: transform 0.2s ease;
  transform: translateY(-2px);
}

/* ✅ Transition on the base state → it animates both on enter and on exit */
.button {
  transition: transform 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
}
```

### Avoid `all` (specify what you want to animate)

```css
/* ❌ */
.card { transition: all 0.3s ease; }

/* ✅ */
.card {
  transition:
    transform 0.25s ease,
    opacity 0.2s ease,
    background-color 0.3s linear;
}
```

### “Recommended” properties (smooth)

```css
/* ✅ Generally smoother and more predictable */
.modal {
  transition: transform 0.25s ease, opacity 0.2s ease;
  transform: translateY(8px);
  opacity: 0;
}
.modal.is-open {
  transform: translateY(0);
  opacity: 1;
}
```

### “Expensive” properties (use with caution)

```css
/* ⚠️ Often heavier because they affect layout/paint */
.panel {
  transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease;
}

/* ✅ Typical alternatives */
.panel {
  transition: transform 0.3s ease;
}
.panel.is-open {
  transform: scaleY(1);
}
.panel {
  transform: scaleY(0);
  transform-origin: top;
}
```

### Most used easing (timing-function)

```css
.element {
  transition-timing-function: ease;      /* default “ok” */
  /* transition-timing-function: linear;   constant */
  /* transition-timing-function: ease-in;  starts slow */
  /* transition-timing-function: ease-out; ends slow */
  /* transition-timing-function: ease-in-out; smooth */
}

/* ✅ Custom */
.element {
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

### Smart delays (delay)

```css
/* ✅ Delay only on enter */
.toast {
  transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
  opacity: 0;
  transform: translateY(6px);
}
.toast.is-open {
  transition-delay: 0.1s; /* enters after */
  opacity: 1;
  transform: translateY(0);
}

/* ✅ Different delays for different properties */
.toast {
  transition:
    opacity 0.2s ease 0s,
    transform 0.2s ease 0s;
}
.toast.is-open {
  transition:
    opacity 0.2s ease 0.05s,
    transform 0.2s ease 0s;
}
```

### “Show/Hide” without `display` (which doesn’t animate)

```css
/* ❌ display is not animatable */
/* .dropdown { display: none; } .dropdown.open { display: block; } */

/* ✅ Opacity + visibility + pointer-events */
.dropdown {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(6px);

  transition:
    opacity 0.15s ease,
    transform 0.15s ease,
    visibility 0s linear 0.15s; /* wait until the end before hiding */
}

.dropdown.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);

  transition:
    opacity 0.15s ease,
    transform 0.15s ease,
    visibility 0s; /* immediately visible */
}
```

### Accessibility: respect “reduced motion”

```css
/* ✅ Reduce or remove transitions for those who request it */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

### Full interactive states (hover + focus-visible)

```css
.button {
  transition: transform 0.15s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}
```


<br />
<br />
<br />
<br />







## 11. Filters and Effects

### Full `filter`

```css
/* Single filters */
.image {
  filter: blur(5px);
  filter: brightness(1.5);        /* 150% */
  filter: contrast(2);            /* 200% */
  filter: grayscale(100%);        /* B&W */
  filter: hue-rotate(90deg);      /* Rotate hues */
  filter: invert(100%);           /* Negative */
  filter: opacity(50%);           /* Like opacity */
  filter: saturate(2);            /* 200% saturation */
  filter: sepia(100%);            /* Sepia effect */
  filter: drop-shadow(5px 5px 10px rgba(0,0,0,0.5));
  
  /* Multiple filters */
  filter: contrast(1.2) brightness(1.1) saturate(1.3);
  
  /* Blur + grayscale for disabled state */
  filter: blur(2px) grayscale(100%) opacity(0.7);
}
```

### `backdrop-filter` - Glass effect!

```css
/* Glassmorphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Dark glass */
.dark-glass {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px) saturate(1.5);
}

/* All backdrop filters */
.effects {
  backdrop-filter: blur(10px);
  backdrop-filter: brightness(0.8);
  backdrop-filter: contrast(1.2);
  backdrop-filter: grayscale(50%);
  backdrop-filter: blur(10px) brightness(0.8);
}
```

**Note**: Not supported in all browsers! Use `@supports`:

```css
@supports (backdrop-filter: blur(10px)) {
  .glass {
    backdrop-filter: blur(10px);
  }
}
```

### `clip-path` - Custom shapes

**What it does**: Clips the element into custom shapes!

```css
/* Basic shapes */
.circle {
  clip-path: circle(50%);
}

.ellipse {
  clip-path: ellipse(130px 140px at 10% 20%);
}

/* Polygons */
.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.hexagon {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.star {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

/* Animating clip-path */
.morph {
  clip-path: circle(50%);
  transition: clip-path 0.5s ease;
}

.morph:hover {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
```

**Visual**:

```
Normal:     clip-path: circle(50%):    clip-path: triangle:
┌────────┐       ⭕                         🔺
│        │       
│  IMG   │  →    IMG                        IMG
│        │       
└────────┘       ⭕                         🔻
```

### `mix-blend-mode`

**What it does**: Blends colors like in Photoshop!

```css
.overlay-text {
  mix-blend-mode: multiply;
  mix-blend-mode: screen;
  mix-blend-mode: overlay;
  mix-blend-mode: difference;
  mix-blend-mode: color-dodge;
  mix-blend-mode: color-burn;
}

/* Text that adapts to the background */
.adaptive-text {
  color: white;
  mix-blend-mode: difference;
}
```


<br />
<br />
<br />
<br />







## 12. User controls

### `cursor` - All values

```css
cursor: pointer;        /* 👆 Hand */
cursor: grab;           /* ✋ Open hand */
cursor: grabbing;       /* ✊ Closed hand */
cursor: not-allowed;    /* 🚫 Not allowed */
cursor: wait;           /* ⏳ Wait */
cursor: help;           /* ❓ Help */
cursor: text;           /* 📝 Text */
cursor: crosshair;      /* ✚ Crosshair */
cursor: move;           /* ✥ Move */
cursor: zoom-in;        /* 🔍+ Zoom in */
cursor: zoom-out;       /* 🔍- Zoom out */
cursor: progress;       /* ⏳ In progress */

/* Custom cursor */
cursor: url('cursor.png'), auto;
cursor: url('cursor.svg') 4 12, auto; /* With hotspot */
```

### `user-select` - Selection control

```css
/* Not selectable */
.no-select {
  user-select: none;
  -webkit-user-select: none; /* Safari */
}

/* Select everything on click */
.select-all {
  user-select: all;
}

/* Only text selectable */
.text-only {
  user-select: text;
}

/* Auto (default) */
.normal {
  user-select: auto;
}
```

**Practical use**:

```css
/* Buttons not selectable */
button {
  user-select: none;
}

/* Code that selects all */
.code-snippet {
  user-select: all;
}
```

### `pointer-events`

**What it does**: Controls whether an element can receive clicks

```css
/* Not clickable */
.disabled {
  pointer-events: none;
  opacity: 0.5;
}

/* Click through the element */
.overlay {
  pointer-events: none;
}

/* Only some events */
.special {
  pointer-events: auto;     /* All (default) */
  pointer-events: visiblePainted; /* Only visible parts */
}
```

**Practical use**: Overlay that doesn’t block clicks!

```css
.watermark {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none; /* Clicks go through! */
  opacity: 0.1;
}
```

<br />
<br />
<br />
<br />







## 13. Advanced scrolling

### `scroll-behavior`

```css
html {
  scroll-behavior: smooth;  /* Animated scrolling */
  scroll-behavior: auto;    /* Normal scrolling */
}
```

### Scroll Snap - Magnetic scrolling

**What it does**: Makes scrolling "snap" to specific points

```css
/* Container */
.carousel {
  scroll-snap-type: x mandatory;  /* X axis, mandatory */
  overflow-x: scroll;
  display: flex;
}

/* Items */
.slide {
  scroll-snap-align: center;      /* Centers */
  flex: 0 0 100%;
}

/* Vertical example */
.vertical-sections {
  scroll-snap-type: y proximity;  /* Y axis, suggested */
  overflow-y: scroll;
  height: 100vh;
}

.section {
  scroll-snap-align: start;       /* Aligns to the start */
  height: 100vh;
}
```

**scroll-snap-type options**:

* `x` / `y` = axis
* `mandatory` = always snaps
* `proximity` = snaps if close

**scroll-snap-align options**:

* `start` = start of the element
* `center` = center of the element
* `end` = end of the element

### `overscroll-behavior`

**What it does**: Controls what happens when you scroll past the limits

```css
/* Prevents parent scrolling */
.modal {
  overscroll-behavior: contain;
}

/* Disables pull-to-refresh */
body {
  overscroll-behavior-y: none;
}

/* Default */
.normal {
  overscroll-behavior: auto;
}
```


<br />
<br />
<br />
<br />







## 14. Advanced Responsive Design

### Container Queries

**What they are**: Media queries based on the container, not the viewport!

```css
/* Define a container */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Container-based queries */
@container card (min-width: 400px) {
  .card {
    display: flex;
    gap: 2rem;
  }
}

@container (min-width: 700px) {
  .card {
    grid-template-columns: 2fr 1fr;
  }
}
```

**Revolutionary!** Truly responsive components!

### Responsive functions

```css
/* clamp() for responsive typography */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* min() for containers */
.container {
  width: min(90%, 1200px);
}

/* max() for guaranteed minimums */
.card {
  width: max(300px, 30%);
}
```


<br />
<br />
<br />
<br />







## 15. Performance

### `will-change`

**What it does**: Warns the browser about upcoming animations to optimize

```css
.animated {
  will-change: transform;
}

.multi {
  will-change: transform, opacity;
}

/* Important: remove it after the animation */
.finished {
  will-change: auto;
}
```

**When to use it**:

* Before heavy animations
* Not on too many elements
* Remove it when finished

### `contain`

**What it does**: Isolates parts of the page for performance

```css
.widget {
  contain: layout;    /* Isolated layout */
  contain: paint;     /* Isolated paint */
  contain: size;      /* Isolated size */
  contain: style;     /* Isolated style */
  
  /* Combined */
  contain: layout paint;
  contain: strict;    /* All of them */
}
```

<br />
<br />
<br />
<br />







## 16. Feature Detection

### `@supports`

**What it does**: Applies CSS only if it’s supported

```css
/* If it supports grid */
@supports (display: grid) {
  .container {
    display: grid;
  }
}

/* If it does NOT support it */
@supports not (backdrop-filter: blur(10px)) {
  .glass {
    background: rgba(255,255,255,0.95);
  }
}

/* Multiple conditions */
@supports (display: grid) and (gap: 1rem) {
  .modern-grid {
    display: grid;
    gap: 1rem;
  }
}
```

<br />
<br />
<br />
<br />







## 17. CSS Counters — Automatic numbering

```css
/* Reset counter (starts at 0 → the first increment brings it to 1) */
.chapters {
  counter-reset: chapter;
}

/* Increment and display */
.chapter::before {
  counter-increment: chapter;
  content: "Chapter " counter(chapter) ": ";
}

/* Nested counters */
.book {
  counter-reset: chapter;
}

.chapter {
  counter-reset: section;      /* each new chapter resets sections */
  counter-increment: chapter;  /* increases the chapter when it appears */
}

.section::before {
  counter-increment: section;  /* increases the section when it appears */
  content: counter(chapter) "." counter(section) " ";
}
```

### How it works (in 3 moves)

```css
/* 1) counter-reset: creates/resets a counter */
.wrapper { counter-reset: step; }

/* 2) counter-increment: increases it when the element “passes” */
.item::before { counter-increment: step; }

/* 3) counter(): prints it inside content */
.item::before { content: counter(step) ". "; }
```

### Where to put it (practical rule)

```css
/* ✅ reset on the container */
.list { counter-reset: item; }

/* ✅ increment on the element you want to number */
.list > li::before {
  counter-increment: item;
  content: counter(item) ". ";
}
```

### Change numbering style (decimal, roman, alpha…)

```css
.list { counter-reset: item; }

.list > li::before {
  counter-increment: item;

  /* decimal | lower-roman | upper-roman | lower-alpha | upper-alpha */
  content: counter(item, upper-roman) ". ";
}
```

### Prefixes, parentheses, separators (formatting)

```css
.steps { counter-reset: step; }

.step::before {
  counter-increment: step;
  content: "Step " counter(step) " → ";
}
```

### Nested numbering (1, 1.1, 1.1.1) with `counters()`

```css
/* ✅ counters(name, separator) prints the whole chain */
.toc {
  counter-reset: h2;
}

.toc .h2 {
  counter-reset: h3; /* each h2 resets h3 */
}

.toc .h2::before {
  counter-increment: h2;
  content: counter(h2) " ";
}

.toc .h3::before {
  counter-increment: h3;
  content: counter(h2) "." counter(h3) " ";
}

/* Variant: if you use the same counter-name on multiple levels */
.outline { counter-reset: item; }

.outline li {
  counter-increment: item;
}

.outline li::before {
  content: counters(item, ".") " ";
}
```

### Start from a different number

```css
/* Starts at 4 because it resets to 3 and then increment → 4 */
.chapters { counter-reset: chapter 3; }

.chapter::before {
  counter-increment: chapter;
  content: "Chapter " counter(chapter) ": ";
}
```

### Reverse counting (counting backwards)

```css
/* ✅ decrements instead of incrementing */
.countdown { counter-reset: n 5; }

.countdown .item::before {
  counter-increment: n -1;
  content: "T-" counter(n) " ";
}
```

### Use counters with lists (when you do NOT want `<ol>`)

```css
/* ❌ if it’s a “real” list, better <ol> */
.fake-ol { counter-reset: item; }

.fake-ol > li::before {
  counter-increment: item;
  content: counter(item) ") ";
  font-variant-numeric: tabular-nums;
}
```

### Show numbers “nicely aligned”

```css
.list { counter-reset: item; }

.list > li {
  display: flex;
  gap: 0.6rem;
}

.list > li::before {
  counter-increment: item;
  content: counter(item) ".";
  min-width: 2ch;                /* fixed space for 1..99 */
  text-align: right;
  font-variant-numeric: tabular-nums;
}
```

### Counters and pseudo-elements (important limit)

```css
/* ✅ counters are almost always printed with ::before / ::after */
.item::before {
  counter-increment: n;
  content: counter(n);
}

/* ⚠️ without content you “see” nothing */
.item::before {
  counter-increment: n;
  /* content: ...;  ← if missing, the number won’t appear */
}
```

### Scope (where a counter “lives”)

```css
/* ✅ each container with counter-reset creates a “new series” */
.article { counter-reset: fig; }

.article figure::before {
  counter-increment: fig;
  content: "Figure " counter(fig) " — ";
}
```

**Result**:

```
Chapter 1: Introduction
  1.1 What is CSS
  1.2 How it works
Chapter 2: Advanced
  2.1 Flexbox
  2.2 Grid
```



<br />
<br />
<br />
<br />







## The 10 commandments of CSS

### 1. No `!important` — If you always shout, nobody listens 📣

**Why**: `!important` breaks the cascade and makes CSS hard to maintain. If you use it often, you’re fighting against your own structure.

```css
/* ❌ */
.button { color: red !important; }

/* ✅ */
.button { color: red; }
.page .button { color: red; } /* if you need more context */
```

**Analogy**: it’s like speaking by shouting in a room. It works… but then you can’t “talk normally” anymore.

> Pro note: `!important` can make sense in utility CSS or very targeted overrides, but as an exception, not a way of life.

---

### 2. Style with classes, not IDs — IDs are “too powerful” 🧨

**Why**: IDs have very high specificity and force you to write increasingly complicated selectors to override them.

```css
/* ❌ */
#cta { background: black; }

/* ✅ */
.cta { background: black; }
```

**Analogy**: an ID is a jackhammer. To drive a nail, a normal hammer (classes) is enough.

---

### 3. Short selectors — Don’t write “novels” to find an element 🔎

**Why**: long, ultra-specific selectors are fragile: change one `div` and everything breaks.

```css
/* ❌ */
main .wrapper .content .card .title { font-weight: 700; }

/* ✅ */
.card__title { font-weight: 700; }
```

**Analogy**: it’s like giving directions saying “turn right at the bar, then left at the tobacconist, then after the traffic light go into the alley…”. Better a clear address.

---

### 4. Don’t use inline CSS — Separation of concerns (again) 🧩

**Why**: inline style is hard to reuse and maintain. CSS should live in CSS.

```html
<!-- ❌ -->
<p style="margin-top: 12px; color: #333;">Text</p>

<!-- ✅ -->
<p class="text">Text</p>
```

```css
.text { margin-top: 12px; color: #333; }
```

**Analogy**: it’s like copy-pasting the same sentence in 30 places: when you have to fix it, you go crazy. Better one reusable rule.

---

### 5. Mobile-first — Start small, then expand 📱➡️🖥️

**Why**: it’s more natural to build for small screens and then add complexity for larger ones.

```css
/* ✅ mobile default */
.card { padding: 12px; }

/* ✅ then “upgrade” */
@media (min-width: 768px) {
  .card { padding: 24px; }
}
```

**Analogy**: it’s like packing a backpack: you put the essentials (mobile), then add the rest only if you have room (desktop).

---

### 6. Use relative units — The site must “breathe” 📏

**Why**: `rem`, `%`, `vw`, `clamp()` make everything more adaptable. Pixels everywhere often create rigid layouts.

```css
/* ❌ */
h1 { font-size: 42px; }

/* ✅ */
h1 { font-size: clamp(1.8rem, 3vw, 2.6rem); }
```

**Analogy**: pixels are one-size shoes. Relative units are adjustable shoes.

---

### 7. Modern layouts — Flexbox and Grid, not “hacks” 🧱

**Why**: floats and various tricks are fragile. Flex and Grid are made specifically for layout.

```css
/* ❌ (old compromises) */
.col { float: left; width: 50%; }

/* ✅ Flex */
.row { display: flex; gap: 16px; }
.col { flex: 1; }

/* ✅ Grid */
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
```

**Analogy**: don’t build a house with duct tape. Use the right tools.

---

### 8. `box-sizing: border-box` — Measurements that don’t lie 📦

**Why**: with `border-box`, padding and border are included in the width. You avoid “why is it overflowing??”.

```css
/* ✅ */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

**Analogy**: it’s like having a ruler that always measures the same way, with no surprises.

---

### 9. CSS variables — Don’t repeat yourself like a parrot 🦜

**Why**: repeated colors and spacing become a nightmare. Custom properties make everything more consistent and themeable.

```css
/* ✅ */
:root {
  --space-2: 8px;
  --space-3: 12px;
  --text: #222;
  --brand: #2563eb;
}

.button {
  padding: var(--space-2) var(--space-3);
  color: white;
  background: var(--brand);
}
```

**Analogy**: variables are like a playlist: change one song and the whole mood changes.

---

### 10. “Smart” animations — Move with `transform`, not with pain 🕺

**Why**: animating `top/left/width/height` can be heavier. `transform` and `opacity` are usually smoother.

```css
/* ❌ */
.modal { position: relative; top: 0; transition: top .2s; }
.modal.open { top: 20px; }

/* ✅ */
.modal { transform: translateY(0); transition: transform .2s, opacity .2s; }
.modal.open { transform: translateY(20px); }
```

**Analogy**: it’s like moving a piece of furniture by dragging it on the floor (effort), versus putting wheels on it (it slides).

---

## Bonus (highly recommended)

### 11. Visible focus — Don’t remove the keyboard compass 🧭

**Why**: people who navigate with the keyboard need to see where they are. Removing the outline without an alternative is a trap.

```css
/* ❌ */
:focus { outline: none; }

/* ✅ */
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}
```

**Analogy**: it’s like turning off the headlights at night. You might see… others won’t.

---

### 12. Respect “reduced motion” — Not everyone wants a roller coaster 🎢

**Why**: some people suffer from excessive animations. With `prefers-reduced-motion` you make a pro move.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

**Analogy**: it’s like lowering the volume when someone tells you “it bothers me”.
