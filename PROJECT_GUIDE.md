# Next.js Learning Project: Guide

> Read this first whenever you come back to this project.
> It explains what has been built, how it works, and what to do next.
> When you start a new chat with Claude, tell it: **"Read PROJECT_GUIDE.md first."**

Last updated: 2026-10-16

---

## 1. What this project is

A personal project for **learning Next.js step by step**, in practice and not just in theory.

There are two parts:

1. **The learning area** (home page `/`): where we write real code for each topic, one at a time.
2. **The "Topics Covered" notes site** (`/topics`): a small docs-style website inside the app. It has the full
   learning plan in a left sidebar and your notes for each topic in the middle, so you can come back and revise.

**Current status:** **3 of 22 topics learned** (✓ 01 Pages, 2026-10-16; ✓ 02 Root Layout, 2026-10-22; ✓ 03 Linking, 2026-10-23).
The next step is Topic 04: CSS & Tailwind.

---

## 2. How to run it

```bash
cd D:\Projects\nextjs-learning
npm install        # only needed the first time
npm run dev
```

Then open **http://localhost:3000**.

| Where | What you see |
|-------|--------------|
| `http://localhost:3000/` | Home page ("Hello Next.js 👋"). This is where we'll build things. |
| Top bar → **Topics Covered** | Opens the learning blueprint |
| `http://localhost:3000/topics` | Overview: what Next.js is, progress, how lessons work, full roadmap |
| `http://localhost:3000/topics/pages` | One topic's page (each topic has its own) |
| Sidebar → **← Back to Home** | Returns to the home page |

**Versions:** Next.js 16.4.1, React 19.3, Tailwind CSS 4, TypeScript.

---

## 3. What was done (history)

| Step | What happened |
|------|---------------|
| 1 | Started from the default "Create Next App" template. |
| 2 | Removed template content: Vercel links and the unused SVG images in `public/`. |
| 3 | Tried a few designs: a lesson list, a full recipe app, a slide-out panel. **They were too complex, so they were all removed.** |
| 4 | Simplified the home page to just "Hello Next.js 👋". |
| 5 | Built the **Topics Covered** site: a top bar, a left sidebar with the blueprint, and topic content in the middle. |
| 6 | Switched to a **soft dark theme** with readable text (the light theme was too bright). |
| 7 | Sidebar: numbered topics, the same "not started" icon (dashed circle) for every topic, hover effects (slide, highlight, border on the left edge), and a key at the top. |
| 8 | Reset everything to **0 learned**. Notes are only written *after* we actually learn a topic. |
| 9 | Added a **← Back to Home** link at the top of the sidebar. |
| 10 | Made the overview page fuller: an intro to Next.js, a progress box, "How each topic works", and the full roadmap with one-line descriptions. |
| 11 | Wrote this guide. |
| 12 | **Learned Topic 01: Pages.** Built /about, /contact, /about/team, /shop (+ shoes, bags), /help/faq and /profile. |
| 13 | Topic pages now show full notes: Theory, Practical (code + browser output), Key points, Common mistakes and a Revision quiz (short questions + clickable multiple choice). |
| 14 | **Learned Topic 02: Root Layout.** Practised with an announcement bar, a padded {children} wrapper and {children} experiments; kept a footer on every page. |
| 15 | **Learned Topic 03: Linking Between Pages.** Header menu (Home, About, Contact, Profile, Shop), links inside pages (Shop ↔ Shoes ↔ Bags, About ↔ Team), Quick links on Home, an external link on Contact. |
| 16 | Session logs saved as Word files in `learning-sessions/` (for example `2026-10-22-session.docx`). |

> ✅ **Saved on GitHub:** https://github.com/anushree-synterra/nextjs-learning (branch `main`).
> After each lesson, save and upload with:
> `git add -A`, then `git commit -m "Learned <topic>"`, then `git push`.

---

## 4. Project structure

```
nextjs-learning/
├── PROJECT_GUIDE.md                  ← this file
├── README.md                         ← short intro + how to run
├── AGENTS.md                         ← note for AI tools (created by Next.js)
├── next.config.ts                    ← Next.js settings (cacheComponents is ON)
└── src/
    ├── app/
    │   ├── layout.tsx                ← Root layout: dark theme + top bar + footer (shared by every page)
    │   ├── page.tsx                  ← Home page (/). Learning starts here.
    │   ├── globals.css               ← Tailwind import + fonts
    │   ├── about/, contact/, shop/,  ← pages built while learning Topic 01
    │   │   help/faq/, profile/
    │   └── topics/
    │       ├── layout.tsx            ← Sidebar + middle content area (+ "Back to Home")
    │       ├── page.tsx              ← /topics overview page
    │       └── [slug]/page.tsx       ← /topics/<topic> page (notes, or "Not started yet")
    ├── components/
    │   ├── sidebar.tsx               ← The blueprint list in the sidebar (icons, hover effects)
    │   ├── active-sidebar.tsx        ← Works out which topic is open, so the sidebar can highlight it
    │   ├── notes.tsx                 ← Draws notes: text, code boxes, tips, tables, browser output
    │   └── quiz.tsx                  ← The clickable multiple-choice quiz
    └── learning/
        ├── topics.ts                 ← ⭐ THE BLUEPRINT (list of topics, done: true/false)
        └── notes/
            ├── pages.ts              ← ⭐ Notes for Topic 01 (one file per learned topic)
            ├── root-layout.ts        ← ⭐ Notes for Topic 02
            └── linking.ts            ← ⭐ Notes for Topic 03
```

---

## 5. The learning blueprint (22 topics)

| # | Stage | Topic | What you'll learn |
|---|-------|-------|-------------------|
| 01 | 1 · Basics | Pages | How folders and page.tsx files turn into URLs |
| 02 | 1 · Basics | Root Layout | The shared frame (header, footer) around every page |
| 03 | 1 · Basics | Linking Between Pages | Moving between pages with `<Link>` |
| 04 | 1 · Basics | CSS & Tailwind | Colors, spacing, layout, dark mode |
| 05 | 1 · Basics | Fonts | Loading fonts with `next/font` |
| 06 | 1 · Basics | Images | Optimized images with `next/image` |
| 07 | 2 · Routing | Nested Routes & Layouts | Folders in folders, layouts for one section |
| 08 | 2 · Routing | Dynamic Routes | One `[id]` page for many items |
| 09 | 2 · Routing | Not Found Page | Custom 404 + `notFound()` |
| 10 | 2 · Routing | Loading UI | `loading.tsx` |
| 11 | 2 · Routing | Error Handling | `error.tsx` |
| 12 | 3 · React in Next.js | Server vs Client Components | `'use client'` and where code runs |
| 13 | 3 · React in Next.js | State & Events | `useState`, `onClick` |
| 14 | 3 · React in Next.js | Props | Passing data into components |
| 15 | 4 · Data | Fetching Data | Loading data in a page |
| 16 | 4 · Data | Forms & Server Actions | Submitting forms, saving data |
| 17 | 4 · Data | Caching & Revalidating | `'use cache'`, refreshing data |
| 18 | 4 · Data | Route Handlers (API) | Your own API with `route.ts` |
| 19 | 5 · Finishing | Metadata & SEO | Titles, descriptions, share images |
| 20 | 5 · Finishing | Environment Variables | `.env` files and secrets |
| 21 | 5 · Finishing | Proxy | Code that runs before a request |
| 22 | 5 · Finishing | Build & Deploy | Putting the app online |

You can rename, reorder or add topics in `src/learning/topics.ts`. The sidebar and overview update automatically.

---

## 6. How each lesson works

**One topic per day, in depth.**

1. **Learn:** Claude says which topic it is, then explains **what it is → why we use it → when we use it**,
   in very plain words with real-life examples (like "folders are rooms, page.tsx is the light").
2. **Build:** *you* type the code in this project. Claude gives the file and steps, but doesn't type it for you.
3. **Check:** 2–3 tiny questions to make sure it makes sense.
4. **Challenges:** levels from 😄 super easy → 🚀 bigger, one level at a time. Claude checks your files after each.
5. **Notes (end of day, only when you feel confident):** Claude writes the topic up in the Topics Covered site.

---

## 7. How a topic's notes are stored

Each learned topic has its own notes file, `src/learning/notes/<slug>.ts` (for example `notes/pages.ts`).
It is connected in `src/learning/topics.ts`:

```ts
import { pagesNotes } from "./notes/pages";
// ...
{ slug: "pages", title: "Pages", about: "...", done: true, notes: pagesNotes },
```

The topic page (`/topics/<slug>`) then shows these parts:

| Part | What's in it | Field in the notes file |
|------|--------------|-------------------------|
| In one line | A one-sentence summary | `summary` |
| 1 · Theory | What / why / when, with examples, code, tips and warnings | `theory` |
| 2 · Practical | Every challenge level: the task, the code you wrote, and the browser output | `challenges` |
| 3 · Key points | A short checklist for quick revision | `keyPoints` |
| 4 · Common mistakes | ❌ wrong → ✅ right, and why | `mistakes` |
| 5 · Revision quiz | Short questions (click to reveal the answer) + clickable multiple choice with a score | `questions`, `mcqs` |

What changes when a topic is set to `done: true`:
- The sidebar icon turns from a dashed circle into a green ✓.
- The topic's page shows the full notes above.
- The progress bar on `/topics` goes up.

Text in notes can use `**bold**` and `` `code` ``. Use `notes/pages.ts` as the example for the next topics.

---

## 8. What to do next

**➡️ Start Topic 04: CSS & Tailwind** (styling with Tailwind classes: colors, spacing, layout).

To revise, open http://localhost:3000/topics and do the Revision quiz for each learned topic.

Then continue in order: **05 Fonts → 06 Images → …**

---

## 9. How to continue with Claude in a new chat

Copy and paste this:

```
Read PROJECT_GUIDE.md first. I'm a complete beginner learning Next.js using this project.
Let's start the next topic in the blueprint (src/learning/topics.ts), following section 6:
explain it simply (what / why / when), let me type the code, give me challenges level by level,
and only when I say I understand, write the notes like src/learning/notes/pages.ts.
```

**My preferences (for Claude to follow):**
- Very simple words and real-life examples. One idea at a time, not too much at once.
- I type the code myself.
- **Don't mark topics as learned** or write notes until I say I understand.
- Keep the **dark theme**, with readable text and simple, professional styling. Nothing too bright and no big buttons.

---

## 10. Things to know / troubleshooting

| Problem | Fix |
|---------|-----|
| The page shows old content (for example, ticks that shouldn't be there) | Hard-refresh the page with **Ctrl + Shift + R**. The browser was showing a saved old copy. |
| "Another next dev server is already running" | One is already running at http://localhost:3000. Use it, or stop it with `taskkill /PID <pid> /F`. |
| Build error about `generateStaticParams` returning an empty list | `cacheComponents` is on in `next.config.ts`, so that list must never be empty. The topic page lists **all** topics for this reason. |
| Error using `usePathname` | With `cacheComponents` on, it needs a `<Suspense>` wrapper. See `src/app/topics/layout.tsx`. |
| Tutorial code from the internet doesn't work | This is Next.js **16**, and many online tutorials are older. Check the offline docs in `node_modules/next/dist/docs/`. |

Useful commands:

```bash
npm run dev     # start the dev server
npm run build   # check that everything compiles
npm run lint    # check code style
```
