<h1 align="center">UX Engineer Log</h1>

<br />

This site is the evolution of <a href="https://github.com/simoneamico-ux-dev/from-factory-to-ux-engineer">from-factory-to-ux-engineer</a>, the original static logbook where the journey began. UX Engineer Log is the moment the log came to life: migrated into a Docusaurus architecture, fully bilingual, with its own design system and reading-first typography.

## What's inside

- [**Featured**](https://simoneamico.com/docs/featured/center): project-level case studies that document the decisions, the constraints, and the lessons behind the work. Real tools built for real users, design concepts born from close contact with the problem, certification capstones, and experiments that became something more.
- [**Path**](https://simoneamico.com/docs/path/html-css/cat-photo-app): every project completed during the freeCodeCamp Responsive Web Design, JavaScript, and Front End Development certifications, each with a post-mortem on what went wrong and what was learned.
- [**Vademecum**](https://simoneamico.com/docs/vademecum/html-real-world-vademecum): technical reference guides for HTML, CSS, Git, JavaScript, React, and UX/UI. The concepts come from what I learned along the path, reorganized and reworked into practical tools to look back on.
- [**Bookshelf**](https://simoneamico.com/docs/bookshelf/the-design-of-everyday-things): notes on the books that shaped my thinking, each paired with a practical exercise and reflection.

## How it's built

Docusaurus 3 classic preset, bilingual with full English and Italian parity on every document. Custom styling lives in `src/css/custom.css` and `src/clientModules/` without theme swizzling, with architecture decisions documented inline.

A reading-first typography system caps prose at 820px with an 18px body and em-based heading scale tuned for long-form narrative. A custom focus mode dims the sidebar and TOC after 5 seconds of mouse inactivity with a 3-second attention-aware linger before fade, keeping the reading flow uninterrupted. The sidebar width scales linearly with the viewport to stay symmetric with the proportional TOC column at every desktop size.

## Development

```
yarn
yarn start                                  # dev server with hot reload
yarn build                                  # static output to build/
yarn write-translations --locale it         # sync Italian translations
```

---

<p align="center">
  <a href="https://simoneamico.com"><strong>Visit the site</strong></a>
</p>