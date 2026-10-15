# Next.js Learning Project: Guide

> Read this first whenever you come back to this project.
> It explains what has been built, how it works, and what to do next.
> When you start a new chat with Claude, tell it: **"Read PROJECT_GUIDE.md first."**

Last updated: 2026-10-15

---

## 1. What this project is

A personal project for **learning Next.js step by step**, in practice and not just in theory.

There are two parts:

1. **The learning area** (home page `/`): where we write real code for each topic, one at a time.
2. **The "Topics Covered" notes site** (`/topics`): a small docs-style website inside the app. It has the full
   learning plan in a left sidebar and your notes for each topic in the middle, so you can come back and revise.

**Current status:** the notes site is built. **No topics have been learned yet (0 of 22).** The next step is
Topic 01: Pages.

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
    │   ├── layout.tsx                ← Root layout: dark theme + top bar ("Topics Covered", "Next.js Learning")
    │   ├── page.tsx                  ← Home page (/). Learning starts here.
    │   ├── globals.css               ← Tailwind import + fonts
    │   └── topics/
    │       ├── layout.tsx            ← Sidebar + middle content area (+ "Back to Home")
    │       ├── page.tsx              ← /topics overview page
    │       └── [slug]/page.tsx       ← /topics/<topic> page (notes, or "Not started yet")
    ├── components/
    │   ├── sidebar.tsx               ← The blueprint list in the sidebar (icons, hover effects)
    │   └── active-sidebar.tsx        ← Works out which topic is open, so the sidebar can highlight it
    └── learning/
        └── topics.ts                 ← ⭐ THE BLUEPRINT + YOUR NOTES (the only file you edit to record learning)
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

1. **Learn:** a short, plain explanation of the topic.
2. **Build:** write real code in this project and see it in the browser.
3. **Practice:** try a small change on your own.
4. **Note:** record what you learned in `src/learning/topics.ts`. The topic gets a green ✓.

---

## 7. How to mark a topic as learned

Open `src/learning/topics.ts`, find the topic and change it.

**Before (not started):**

```ts
{ slug: "pages", title: "Pages", about: "How folders and page.tsx files turn into URLs in your app.", done: false },
```

**After (learned):**

```ts
{
  slug: "pages",
  title: "Pages",
  about: "How folders and page.tsx files turn into URLs in your app.",
  done: true,
  learnedOn: "2026-10-16",
  summary: "Each folder in src/app is a URL. A page.tsx inside it is what shows at that URL. We made /about.",
  points: [
    "src/app/page.tsx is the home page (/).",
    "src/app/about/page.tsx is /about.",
    "The page component must be the default export.",
  ],
  code: [
    {
      file: "src/app/about/page.tsx",
      code: `export default function About() {
  return <h1>About me</h1>;
}`,
      explain: "Creating this one file made a new page at /about.",
    },
  ],
},
```

What changes when you save:
- The sidebar icon turns from a dashed circle into a green ✓, and the title becomes brighter.
- The topic's page shows **What we learned**, **Key points** and **Code we used**.
- The progress bar on `/topics` goes up.

| Field | Meaning |
|-------|---------|
| `slug` | The topic's URL name: `/topics/<slug>` |
| `title` | Name shown in the sidebar |
| `about` | One line saying what the topic teaches (shown before you start it) |
| `done` | `false` = not started, `true` = learned |
| `learnedOn` | Date you finished it |
| `summary` | A short paragraph: what we learned |
| `points` | Bullet list of key takeaways |
| `code` | Code you wrote: file name, the code, and a one-line explanation |

---

## 8. What to do next

**➡️ Start Topic 01: Pages.**

Suggested lesson plan:
1. Learn that each folder in `src/app` is a URL and `page.tsx` makes it visible.
2. Build: create `src/app/about/page.tsx` and open http://localhost:3000/about.
3. Practice: make `/contact` yourself, then a nested page like `/about/team`.
4. Note: fill in the Pages entry in `topics.ts` (see section 7) and set `done: true`.

After that, continue in order: **02 Root Layout → 03 Linking Between Pages → …**

---

## 9. How to continue with Claude in a new chat

Copy and paste this:

```
Read PROJECT_GUIDE.md first. I'm learning Next.js using this project.
Let's start the next topic in the blueprint (src/learning/topics.ts).
Keep it simple and step by step: explain briefly, build it in the project with me,
give me a small practice task, then update topics.ts with what we learned.
```

**My preferences (for Claude to follow):**
- Keep things **simple**. One topic at a time, nothing built in advance.
- **Don't mark topics as learned** until we have actually learned them together.
- Keep the **dark theme**, with readable text and simple, professional styling. Nothing too bright and no big buttons.
- Give short explanations, then hands-on code.

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
