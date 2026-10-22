import type { TopicNotes } from "../topics";

export const rootLayoutNotes: TopicNotes = {
  learnedOn: "2026-10-22",
  summary:
    "The root layout is the file src/app/layout.tsx. It is the frame around every page: anything you put in it (a header, a footer) shows on all pages. The current page is placed where you write {children}.",

  // ─── Part 1 · Theory ───────────────────────────────────────────
  theory: [
    {
      title: "What is the root layout?",
      blocks: [
        { kind: "text", text: "The **root layout** is a special file: **`src/app/layout.tsx`**. It is the **frame around every page** of your website. Whatever you put in it shows on **all pages**." },
        {
          kind: "callout",
          tone: "idea",
          text: "Think of a **photo frame** 🖼️. The frame always stays the same, and only the photo inside changes. The frame is `layout.tsx`. The photo is the `page.tsx` of the URL you are on.",
        },
      ],
    },
    {
      title: "Why do we use it?",
      blocks: [
        { kind: "text", text: "Every website has parts that **repeat on every screen**: a top menu, a logo, a footer." },
        {
          kind: "list",
          items: [
            "**Without a layout:** you copy the menu into `about/page.tsx`, `contact/page.tsx`, `shop/page.tsx`... and to change one link you edit 10 files. 😩",
            "**With a layout:** you write it **once** in `layout.tsx`, and every page gets it automatically. ✨",
          ],
        },
      ],
    },
    {
      title: "When do we use it?",
      blocks: [
        { kind: "text", text: "**Always.** Every Next.js app **must** have a root layout. It's where you put what **every page shares**: the header, footer, font and page background." },
        { kind: "callout", tone: "tip", text: "You don't create it yourself. `create-next-app` already made one for you. You just edit it." },
      ],
    },
    {
      title: "Reading the layout file",
      blocks: [
        { kind: "text", text: "Here is our layout, simplified (the font and `metadata` lines are left out):" },
        {
          kind: "code",
          file: "src/app/layout.tsx",
          code: `export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>Topics Covered | Next.js Learning</header>
        {children}
        <footer>Made by Anushree 🚀</footer>
      </body>
    </html>
  );
}`,
        },
        {
          kind: "table",
          head: ["Piece", "What it means"],
          rows: [
            ["`<html>` and `<body>`", "The outer walls of every web page. **Only** the root layout writes them."],
            ["`<header>` / `<footer>`", "Shared parts. They show on **every** page."],
            ["`{children}`", "⭐ The **empty photo slot**. Next.js puts the current `page.tsx` here."],
          ],
        },
      ],
    },
    {
      title: "{children}: the slot where the page goes",
      blocks: [
        { kind: "text", text: "When you open `/about`, Next.js takes `about/page.tsx` and places it **exactly where `{children}` is written**:" },
        {
          kind: "code",
          code: `layout.tsx  →  <html><body> <header/>  {children}  <footer/> </body></html>
                                         ↑
                             about/page.tsx goes here`,
        },
        { kind: "text", text: "The layout **wraps** the page, and both are shown together. The layout doesn't run \"first\" and then the page. It's one frame with one photo inside." },
        { kind: "text", text: "Things show on screen **in the order you write them**. So **where you put `{children}` decides where the page appears:**" },
        {
          kind: "table",
          head: ["You write…", "Screen shows…"],
          rows: [
            ["`<header/>` `{children}` `<footer/>`", "header → page → footer ✅ (normal)"],
            ["`{children}` `<header/>` `<footer/>`", "page → header → footer (the header drops below the page)"],
            ["`{children}` written twice", "the page shows **two times**"],
            ["no `{children}` at all", "only the header and footer. **No page content.**"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "You can also **wrap** `{children}` in a tag, like `<div className=\"p-6\">{children}</div>`. Every page then sits inside that padded box. It's like putting a mat inside the photo frame: every photo gets the mat.",
        },
      ],
    },
    {
      title: "The 3 rules of the root layout",
      blocks: [
        {
          kind: "list",
          items: [
            "**Rule 1: exact name, exact place.** It must be `src/app/layout.tsx`, all lowercase. `Layout.tsx` won't work.",
            "**Rule 2: it must have `<html>` and `<body>`.** It's the only file that writes them. Pages never do.",
            "**Rule 3: it must show `{children}`.** Forget it and no page ever appears.",
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "🏠 The layout is the **building** and pages are the **rooms** inside it. A room doesn't build its own outer walls, so a `page.tsx` never writes `<html>` or `<body>`.",
        },
        {
          kind: "callout",
          tone: "warn",
          text: "Don't type `<head>` or `<title>` into the layout yourself. The page title comes from the `metadata` export at the top of `layout.tsx`. We'll learn it in **Topic 19: Metadata & SEO**.",
        },
      ],
    },
  ],

  // ─── Part 2 · Practical (the challenges we did) ────────────────
  challenges: [
    {
      level: 1,
      title: "Add a footer to every page",
      task: "Add a <footer> after {children}, then visit /, /about, /contact and /shop/shoes.",
      file: "src/app/layout.tsx",
      code: `        {children}
        <footer className="border-t border-zinc-800 px-4 py-3 text-center text-xs text-zinc-500">
          © 2026 Anushree · Learning Next.js day by day 🚀
        </footer>
      </body>`,
      output: [
        { url: "localhost:3000/about", view: { lines: ["Topics Covered   Next.js Learning", "This is my about page", "© 2026 Anushree · Learning Next.js day by day 🚀"] } },
        { url: "localhost:3000/contact", view: { lines: ["Topics Covered   Next.js Learning", "Contact me at: anushree@example.com", "© 2026 Anushree · Learning Next.js day by day 🚀"] } },
      ],
      learned: "Written once in the layout, the footer shows on every page. No page.tsx was touched.",
    },
    {
      level: 2,
      title: "Two lines in the footer",
      task: "Show your name and today's topic on two lines inside the footer.",
      file: "src/app/layout.tsx",
      code: `<footer className="...">
  <p>Name: Anushree</p>
  <p>Today's topic: Root Layout</p>
</footer>`,
      output: [{ url: "localhost:3000/", view: { lines: ["…page…", "Name: Anushree", "Today's topic: Root Layout"] } }],
      learned: "Two <p> tags (or a <br /> line break) give two lines. In JSX, write <br />, not <br></br>.",
    },
    {
      level: 3,
      title: "Announcement bar above the header",
      task: "Add a bar saying \"🎉 New topic learned: Root Layout\" at the very top of every page.",
      file: "src/app/layout.tsx",
      code: `<body className="...">
  <p className="bg-zinc-800 py-1 text-center text-xs text-zinc-300">
    🎉 New topic learned: Root Layout
  </p>
  <header>...</header>
  {children}
  <footer>...</footer>
</body>`,
      output: [{ url: "localhost:3000/profile", view: { lines: ["🎉 New topic learned: Root Layout", "Topics Covered   Next.js Learning", "My profile", "© 2026 Anushree · Learning Next.js day by day 🚀"] } }],
      learned: "Order in the code = order on screen. To be at the very top, it goes first inside <body>.",
    },
    {
      level: 4,
      title: "Breathing space for every page",
      task: "Wrap {children} in a padded <div> so every page gets space around it.",
      file: "src/app/layout.tsx",
      code: `<header>...</header>
<div className="p-12">{children}</div>
<footer>...</footer>`,
      output: [{ url: "localhost:3000/about", view: { lines: ["Topics Covered   Next.js Learning", "      This is my about page   ← now with space around it", "© 2026 Anushree · Learning Next.js day by day 🚀"] } }],
      learned: "The <div> wraps the {children} slot, so whatever page goes into the slot ends up inside the padded box.",
    },
    {
      level: 5,
      title: "Experiments: move, double and remove {children}",
      task: "Predict, then test: {children} above the header, {children} written twice, and no {children} at all.",
      file: "src/app/layout.tsx",
      code: `// A) above the header  →  page, then header, then footer
{children}
<header>...</header>

// B) twice  →  the page shows two times
{children}
<header>...</header>
{children}

// C) removed  →  only header + footer, no page content
<header>...</header>
<footer>...</footer>`,
      output: [
        { url: "localhost:3000/about  (A)", view: { lines: ["This is my about page", "Topics Covered   Next.js Learning", "© 2026 Anushree …"] } },
        { url: "localhost:3000/about  (C)", view: { lines: ["Topics Covered   Next.js Learning", "© 2026 Anushree …"] } },
      ],
      learned: "{children} is just a slot. Wherever you write it (and however many times), the page shows there. Without it, the page has nowhere to appear.",
    },
    {
      level: 6,
      title: "Bug hunt: a broken app",
      task: "Find the 4 mistakes in a friend's Layout.tsx and about/page.tsx.",
      file: "src/app/layout.tsx",
      code: `// ❌ Broken: src/app/Layout.tsx
<html lang="en">
  <header>My Website</header>
  <footer>Bye 👋</footer>
</html>

// ✅ Fixed: renamed to src/app/layout.tsx
<html lang="en">
  <body>
    <header>My Website</header>
    {children}
    <footer>Bye 👋</footer>
  </body>
</html>

// ✅ Fixed: src/app/about/page.tsx (no <html>/<body>)
export default function About() {
  return (
    <main>
      <h1>About us</h1>
    </main>
  );
}`,
      output: [{ url: "localhost:3000/about", view: { lines: ["My Website", "About us", "Bye 👋"] } }],
      learned: "The 4 bugs: Layout.tsx → layout.tsx, missing <body>, missing {children} (the easy one to miss!), and <html>/<body> inside a page.",
    },
  ],

  // ─── Key points ────────────────────────────────────────────────
  keyPoints: [
    "The root layout is `src/app/layout.tsx`, the frame around **every** page.",
    "Anything in the layout (header, footer, banner) shows on all pages.",
    "Write shared parts **once** in the layout instead of copying them into each page.",
    "Every Next.js app **must** have a root layout.",
    "It must contain `<html>` and `<body>`. Pages never write these tags.",
    "`{children}` is the slot where the current `page.tsx` appears.",
    "Order in the code = order on screen. Where you put `{children}` decides where the page shows.",
    "Wrapping `{children}` in a tag (like a padded `<div>`) affects every page at once.",
    "No `{children}` = no page content, only the header and footer.",
    "The layout **wraps** the page. It doesn't run \"before\" it.",
  ],

  // ─── Common mistakes ───────────────────────────────────────────
  mistakes: [
    { wrong: "src/app/Layout.tsx", right: "src/app/layout.tsx", why: "The file name must be exactly layout.tsx, all lowercase." },
    { wrong: "Forgetting {children} in the layout", right: "<header/> {children} <footer/>", why: "Without the slot, no page can ever appear, only the header and footer." },
    { wrong: "<html><header/>{children}</html>", right: "<html><body><header/>{children}</body></html>", why: "The root layout must have both <html> and <body>." },
    { wrong: "<html><body>…</body></html> inside page.tsx", right: "<main>…</main> inside page.tsx", why: "Only the root layout writes <html> and <body>. A page is a room, not the building." },
    { wrong: "Leaving {children} in two places", right: "Exactly one {children}", why: "Every {children} shows the page again, so the page appears twice." },
    { wrong: "Copying the same header into every page.tsx", right: "Put the header once in layout.tsx", why: "That's what the layout is for: one change updates every page." },
  ],

  // ─── Revision quiz ─────────────────────────────────────────────
  questions: [
    { question: "In your own words, what is the root layout?", answer: "The file src/app/layout.tsx. It's the frame around every page, so whatever is in it shows on all pages." },
    { question: "Why do we put the header in the layout instead of in each page?", answer: "So we write it once and every page gets it. Changing it in one place updates all pages." },
    { question: "What does {children} stand for?", answer: "The page.tsx of the URL you are on right now. Next.js places it where {children} is written." },
    { question: "Why does the header show on /about even though about/page.tsx doesn't contain it?", answer: "The layout wraps every page. The header is in the layout, and the about page is placed into the {children} slot inside it." },
    { question: "Every page shows only the header and footer. What's the bug?", answer: "{children} is missing from layout.tsx, so the page has nowhere to appear." },
    { question: "Which tags must only the root layout have?", answer: "<html> and <body>. Pages never write them." },
    { question: "How do you make the page appear above the header?", answer: "Write {children} before <header> in the layout. The order in the code is the order on screen." },
  ],
  mcqs: [
    {
      question: "Where is the root layout file?",
      options: ["src/app/Layout.tsx", "src/layout.tsx", "src/app/layout.tsx", "src/app/root/layout.tsx"],
      answer: 2,
      explain: "It sits directly inside src/app and is named exactly layout.tsx (lowercase).",
    },
    {
      question: "You add <nav>Menu</nav> to the root layout. Where does it show?",
      options: ["Only on the Home page", "Only on pages that import it", "On every page", "Nowhere until you add it to page.tsx"],
      answer: 2,
      explain: "The root layout wraps every page, so everything in it shows everywhere.",
    },
    {
      question: "What does {children} represent in layout.tsx?",
      options: ["All the pages at once", "The page.tsx of the current URL", "The header and footer", "The <body> tag"],
      answer: 1,
      explain: "{children} is the slot. Next.js puts the current page into it.",
    },
    {
      question: "Which tags does only the root layout write?",
      options: ["<main> and <section>", "<header> and <footer>", "<html> and <body>", "<h1> and <p>"],
      answer: 2,
      explain: "<html> and <body> belong in the root layout only. Pages use tags like <main>.",
    },
    {
      question: "Every page shows the header and footer but no content. Most likely cause?",
      options: ["page.tsx is misnamed", "{children} was removed from layout.tsx", "The footer is broken", "The dev server is off"],
      answer: 1,
      explain: "Without {children}, the page has no slot to appear in. (A misnamed page.tsx would give a 404 instead.)",
    },
    {
      question: "The layout has {children} written above <header>. What shows on screen?",
      options: ["Header, then page", "Page, then header", "Only the header", "An error"],
      answer: 1,
      explain: "Things show in the order they're written, so the page comes first.",
    },
    {
      question: "You wrap {children} in <div className=\"p-6\">. What happens?",
      options: ["Only the Home page gets padding", "Every page gets padding", "Nothing, padding must go in page.tsx", "The header gets padding"],
      answer: 1,
      explain: "Every page goes into that slot, so every page sits inside the padded <div>.",
    },
    {
      question: "Which is the right way to write a page now that you have a root layout?",
      options: [
        "return ( <html><body><h1>Hi</h1></body></html> );",
        "return ( <body><h1>Hi</h1></body> );",
        "return ( <main><h1>Hi</h1></main> );",
        "return ( <layout><h1>Hi</h1></layout> );",
      ],
      answer: 2,
      explain: "The layout already provides <html> and <body>. The page just returns its own content in one parent like <main>.",
    },
  ],
};
