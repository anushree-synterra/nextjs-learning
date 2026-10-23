import type { TopicNotes } from "../topics";

export const linkingNotes: TopicNotes = {
  learnedOn: "2026-10-23",
  summary:
    "A link lets the user click to go to another page. In Next.js we use the <Link> component from next/link. It keeps the layout on screen, swaps only the page, and loads linked pages early, so moving around feels instant.",

  // ─── Part 1 · Theory ───────────────────────────────────────────
  theory: [
    {
      title: "What is a link?",
      blocks: [
        { kind: "text", text: "A **link** is something you **click to go to another page**, like the About or Contact items in a menu. In Next.js we make links with the **`<Link>`** component:" },
        {
          kind: "code",
          code: `import Link from "next/link";

<Link href="/about">About</Link>`,
        },
        {
          kind: "table",
          head: ["Piece", "What it means"],
          rows: [
            ["`import Link from \"next/link\"`", "Gives this file Next.js's Link tool. Goes at the top of the file."],
            ["`<Link>`", "The clickable link."],
            ["`href=\"/about\"`", "**Where** it goes: the same URL you'd type in the browser."],
            ["`About`", "The **words** the user sees and clicks."],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "If pages are **rooms** 🚪 in a house, a link is a **door** between two rooms. `href` is the sign on the door saying where it leads.",
        },
      ],
    },
    {
      title: "Why <Link> and not <a>?",
      blocks: [
        { kind: "text", text: "Real users don't type URLs, they **click**. Plain HTML has `<a href>`, but for your own pages `<Link>` is much faster:" },
        {
          kind: "table",
          head: ["", "`<a href>` (plain HTML)", "`<Link href>` (Next.js)"],
          rows: [
            ["On click", "Throws everything away and loads the **whole site again**", "Swaps **only the page** in `{children}`"],
            ["Header and footer", "Re-drawn from scratch", "**Stay** where they are"],
            ["Browser tab", "Reloads", "No reload"],
            ["Speed", "Slower", "**Instant** ⚡"],
          ],
        },
        { kind: "text", text: "`<Link>` does **two** separate things that make it fast:" },
        {
          kind: "list",
          items: [
            "**1. Prefetching:** when a `<Link>` appears on screen, Next.js quietly loads that page **in the background, before you click**.",
            "**2. No reload:** when you click, it keeps the layout and swaps **only the page** in `{children}`.",
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "🖼️ Remember the photo frame from Root Layout: `<a>` throws away the whole frame just to change the photo. `<Link>` keeps the frame and only swaps the photo.",
        },
      ],
    },
    {
      title: "When do we use it?",
      blocks: [
        { kind: "text", text: "**Whenever you link to a page inside your own website:** menus, \"Back to Home\", \"See shoes\", \"Read more\"." },
        { kind: "text", text: "A `<Link>` can go in the **layout** (a menu that shows on every page) or **inside any page** (like a \"← Back to Shop\" link)." },
      ],
    },
    {
      title: "The rules of <Link>",
      blocks: [
        {
          kind: "list",
          items: [
            "**Rule 1: `href` is the URL, and it always starts with `/`.** Nested pages use the longer URL.",
            "**Rule 2: every file that uses `<Link>` needs its own import.** Each file is separate. The import in `layout.tsx` doesn't count for `shop/page.tsx`.",
            "**Rule 3: `<Link>` doesn't check whether the page exists.** A wrong `href` shows the 404 page. Checking it is your job.",
            "**Rule 4: it's `<Link>`, with a capital L.** Lowercase `<link>` is a different HTML tag and makes nothing clickable.",
          ],
        },
        {
          kind: "table",
          head: ["Page file", "`href`"],
          rows: [
            ["`src/app/page.tsx`", "`\"/\"`"],
            ["`src/app/about/page.tsx`", "`\"/about\"`"],
            ["`src/app/shop/shoes/page.tsx`", "`\"/shop/shoes\"`"],
            ["`src/app/help/faq/page.tsx`", "`\"/help/faq\"`"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          text: "Forget the import and the page breaks with **\"Link is not defined\"**. Only the page that uses it breaks. Your other pages still work.",
        },
      ],
    },
    {
      title: "Links to other websites: <a> and target=\"_blank\"",
      blocks: [
        { kind: "text", text: "For a link **outside** your website, use a plain `<a>`:" },
        {
          kind: "code",
          code: `<a href="https://nextjs.org" target="_blank">
  Visit Next.js Website
</a>`,
        },
        {
          kind: "text",
          text: "**Why not `<Link>`?** `<Link>` can only swap **your own** pages inside **your own** layout. nextjs.org isn't part of your app, so there's nothing to swap. The browser has to leave your site, and that's what `<a>` does.",
        },
        {
          kind: "callout",
          tone: "idea",
          text: "🚪 `<Link>` is a door between **rooms in your own house**. `<a href=\"https://...\">` is your **front door** to someone else's house.",
        },
        { kind: "text", text: "`target` says **where** the link opens:" },
        {
          kind: "table",
          head: ["You write", "What happens"],
          rows: [
            ["`<a href=\"https://nextjs.org\">`", "Opens in the **same tab**. Your site disappears, and you need the Back button."],
            ["`<a href=\"https://nextjs.org\" target=\"_blank\">`", "Opens in a **new tab**. Your site **stays open** in the first tab."],
          ],
        },
        { kind: "callout", tone: "tip", text: "Use `target=\"_blank\"` for links to **other websites**, so visitors don't lose your site." },
      ],
    },
  ],

  // ─── Part 2 · Practical (the challenges we did) ────────────────
  challenges: [
    {
      level: 1,
      title: "A menu on every page",
      task: "Add a <nav> with Home, About, Contact, Profile and Shop links to the header in layout.tsx.",
      file: "src/app/layout.tsx",
      code: `<nav className="ml-auto flex gap-4 text-zinc-400">
  <Link href="/" className="hover:text-white">Home</Link>
  <Link href="/about" className="hover:text-white">About</Link>
  <Link href="/contact" className="hover:text-white">Contact</Link>
  <Link href="/profile" className="hover:text-white">Profile</Link>
  <Link href="/shop" className="hover:text-white">Shop</Link>
</nav>`,
      output: [{ url: "localhost:3000/about", view: { lines: ["Topics Covered   Next.js Learning      Home  About  Contact  Profile  Shop", "Hi, I am Anushree 👋"] } }],
      learned: "The menu is in the layout, so it shows on every page (Topic 02 + 03 together). Clicking changes the page with no tab reload.",
    },
    {
      level: 2,
      title: "Experiment: <a> vs <Link>",
      task: "Turn the About menu link into a plain <a> and compare clicking it with clicking a <Link>.",
      file: "src/app/layout.tsx",
      code: `<a href="/about">About</a>          // ❌ the tab reloads
<Link href="/contact">Contact</Link> // ✅ no reload`,
      output: [{ url: "localhost:3000/about", view: { lines: ["(with <a>: the browser tab reloads and the whole site loads again)"] } }],
      learned: "<a> reloads the whole website. <Link> keeps the layout and swaps only the page.",
    },
    {
      level: 3,
      title: "Links inside a page",
      task: "Link the Shop page to Shoes and Bags, and add About ↔ Team links.",
      file: "src/app/shop/page.tsx",
      code: `import Link from "next/link";

export default function Shop() {
  return (
    <main>
      <h1>All products</h1>
      <Link href="/shop/shoes">👟 See shoes</Link>
      <br />
      <Link href="/shop/bags">👜 See bags</Link>
    </main>
  );
}`,
      output: [{ url: "localhost:3000/shop", view: { lines: ["All products", "👟 See shoes", "👜 See bags"] } }],
      learned: "A <Link> can go inside any page, and every file that uses <Link> needs its own import.",
    },
    {
      level: 4,
      title: "Experiments: no import, wrong href",
      task: "Delete the import from shop/page.tsx, then link to /shop/hats, which doesn't exist.",
      file: "src/app/shop/page.tsx",
      code: `// no import line  →  error: "Link is not defined"
<Link href="/shop/hats">Hats</Link>  // →  404`,
      output: [{ url: "localhost:3000/shop/hats", view: { notFound: true } }],
      learned: "Without the import, the page breaks. <Link> doesn't check whether a page exists, so a wrong href gives a 404.",
    },
    {
      level: 5,
      title: "Shop navigation",
      task: "On Shoes and Bags, add \"← Back to Shop\" and a link to the other product.",
      file: "src/app/shop/shoes/page.tsx",
      code: `import Link from "next/link";

export default function Shoes() {
  return (
    <main>
      <Link href="/shop">← Back to Shop</Link>
      <h1>Shoes Collection 👟</h1>
      <p>
        Do you want to see our latest bags?{" "}
        <Link href="/shop/bags">View Bags →</Link>
      </p>
    </main>
  );
}`,
      output: [{ url: "localhost:3000/shop/shoes", view: { lines: ["← Back to Shop", "Shoes Collection 👟", "Do you want to see our latest bags? View Bags →"] } }],
      learned: "You can now go Shop → Shoes → Bags → Shop using only clicks. A link can sit inside a sentence too.",
    },
    {
      level: 6,
      title: "Quick links on the Home page",
      task: "List a link to every page you've built.",
      file: "src/app/page.tsx",
      code: `import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1>Welcome to my website.</h1>
      <p>Quick links</p>
      <ul>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/about/team">Team</Link></li>
        <li><Link href="/shop/shoes">Shoes</Link></li>
        <li><Link href="/shop/bags">Bags</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/help/faq">FAQ</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </main>
  );
}`,
      output: [{ url: "localhost:3000/", view: { lines: ["Welcome to my website.", "Quick links"], list: ["About", "Team", "Shoes", "Bags", "Shop", "FAQ", "Profile", "Contact"] } }],
      learned: "FAQ's URL is /help/faq, not /help (which has no page). Contact was missed at first, so double-check lists against your pages.",
    },
    {
      level: 7,
      title: "A link to another website",
      task: "On the Contact page, link to https://nextjs.org in a new tab.",
      file: "src/app/contact/page.tsx",
      code: `export default function Contact() {
  return (
    <main>
      <p>Contact me at: anushree@example.com</p>
      <a href="https://nextjs.org" target="_blank">
        Visit Next.js Website
      </a>
    </main>
  );
}`,
      output: [{ url: "localhost:3000/contact", view: { lines: ["Contact me at: anushree@example.com", "Visit Next.js Website   (opens in a new tab)"] } }],
      learned: "Other websites use <a>, because <Link> can only swap your own pages. target=\"_blank\" opens a new tab so your site stays open.",
    },
    {
      level: 8,
      title: "Bug hunt: 5 mistakes",
      task: "Find the 5 mistakes in a friend's FAQ page.",
      file: "src/app/help/faq/page.tsx",
      code: `// ❌ Broken
export default function FAQ() {
  return (
    <main>
      <h1>Frequently Asked Questions</h1>
      <Link href="about">About us</Link>
      <link href="/profile">My profile</link>
      <a href="/contact">Contact</a>
      <Link href="/help">Back to Help</Link>
    </main>
  );
}

// ✅ Fixed
import Link from "next/link";

export default function FAQ() {
  return (
    <main>
      <h1>Frequently Asked Questions</h1>
      <Link href="/about">About us</Link>
      <Link href="/profile">My profile</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/">Back to Home</Link>
    </main>
  );
}`,
      output: [{ url: "localhost:3000/help/faq", view: { lines: ["Frequently Asked Questions", "About us  My profile  Contact  Back to Home"] } }],
      learned: "The 5 bugs: missing import (the easy one to miss!), href without /, lowercase <link>, <a> for an internal page, and a link to /help, which is a 404.",
    },
  ],

  // ─── Key points ────────────────────────────────────────────────
  keyPoints: [
    "Use `<Link href=\"/about\">About</Link>` to link to your own pages.",
    "`href` is **where** it goes. The text inside is what the user **sees**.",
    "Every file that uses `<Link>` needs `import Link from \"next/link\";` at the top.",
    "`href` always starts with `/`, and nested pages use the full URL: `/shop/shoes`.",
    "`<Link>` does two things: **prefetching** (loads the page early) and **no reload** (swaps only the page in `{children}`).",
    "`<a>` reloads the whole site. Don't use it for your own pages.",
    "`<Link>` doesn't check that a page exists. A wrong `href` gives a 404.",
    "Links can go in the layout (a menu on every page) or inside any page.",
    "For other websites, use `<a href=\"https://...\">`.",
    "`target=\"_blank\"` opens a link in a new tab, so your site stays open.",
  ],

  // ─── Common mistakes ───────────────────────────────────────────
  mistakes: [
    { wrong: "Using <Link> with no import", right: "import Link from \"next/link\"; at the top of the file", why: "Without it, the page breaks with \"Link is not defined\"." },
    { wrong: "<Link href=\"about\">", right: "<Link href=\"/about\">", why: "href is a URL from the root of the site, so it starts with /." },
    { wrong: "<link href=\"/profile\">", right: "<Link href=\"/profile\">", why: "Lowercase <link> is a different HTML tag. Components start with a capital letter." },
    { wrong: "<a href=\"/contact\"> for your own page", right: "<Link href=\"/contact\">", why: "<a> reloads the whole website. <Link> is instant." },
    { wrong: "<Link href=\"/help\"> when help has no page.tsx", right: "Link to a page that exists, like /help/faq", why: "<Link> doesn't check. A missing page gives a 404." },
    { wrong: "<Link href=\"https://nextjs.org\">", right: "<a href=\"https://nextjs.org\" target=\"_blank\">", why: "<Link> is for your own pages. Other websites use <a>." },
  ],

  // ─── Revision quiz ─────────────────────────────────────────────
  questions: [
    { question: "In <Link href=\"/shop/bags\">See bags</Link>, what is the destination and what does the user see?", answer: "/shop/bags is the destination. \"See bags\" is the text the user sees and clicks." },
    { question: "What line must be at the top of a file that uses <Link>?", answer: "import Link from \"next/link\";" },
    { question: "What two things make <Link> faster than <a>?", answer: "Prefetching (it loads the page early, in the background) and no reload (it keeps the layout and swaps only the page in {children})." },
    { question: "What happens if a <Link> points to a page that doesn't exist?", answer: "You get the 404 page. <Link> doesn't check whether the page exists." },
    { question: "Why do we use <a> and not <Link> for https://nextjs.org?", answer: "<Link> can only swap your own pages inside your own layout. Another website isn't part of your app, so the browser has to leave, which is what <a> does." },
    { question: "What does target=\"_blank\" do?", answer: "It opens the link in a new tab, so your website stays open in the first tab." },
    { question: "Why does a menu of <Link>s in layout.tsx appear on every page?", answer: "The layout is the frame around every page, so everything in it shows everywhere." },
  ],
  mcqs: [
    {
      question: "Which is the correct link to the About page?",
      options: ["<a href=\"/about\">About</a>", "<Link href=\"/about\">About</Link>", "<link href=\"/about\">About</link>", "<Link to=\"/about\">About</Link>"],
      answer: 1,
      explain: "For your own pages use <Link> (capital L) with href.",
    },
    {
      question: "What's the correct import for <Link>?",
      options: ["import Link from \"next/link\";", "import { Link } from \"react\";", "import Link from \"link\";", "No import is needed"],
      answer: 0,
      explain: "Link comes from next/link, and every file that uses it needs this line.",
    },
    {
      question: "You click an <a href=\"/about\"> link. What happens?",
      options: ["Only the page swaps", "The whole website reloads", "Nothing happens", "It opens a new tab"],
      answer: 1,
      explain: "<a> throws everything away and loads the whole site again. That's why we use <Link> for our own pages.",
    },
    {
      question: "What is prefetching?",
      options: ["Reloading a page after you click", "Loading a linked page in the background before you click", "Opening a link in a new tab", "Checking that a page exists"],
      answer: 1,
      explain: "Next.js loads pages linked with <Link> early, so the click feels instant.",
    },
    {
      question: "Which href is correct for src/app/shop/shoes/page.tsx?",
      options: ["\"shoes\"", "\"shop/shoes\"", "\"/shop/shoes\"", "\"/shoes\""],
      answer: 2,
      explain: "The href is the full URL from the root, starting with /.",
    },
    {
      question: "A page uses <Link> but has no import. What happens?",
      options: ["It works anyway", "Every page in the app breaks", "That page shows an error: Link is not defined", "The link becomes a plain <a>"],
      answer: 2,
      explain: "Only the file missing the import breaks. Other pages still work.",
    },
    {
      question: "Which is best for a link to https://nextjs.org?",
      options: ["<Link href=\"https://nextjs.org\">", "<a href=\"https://nextjs.org\" target=\"_blank\">", "<Link href=\"/nextjs.org\">", "<link href=\"https://nextjs.org\">"],
      answer: 1,
      explain: "Other websites use <a>, and target=\"_blank\" keeps your site open in its own tab.",
    },
    {
      question: "<Link href=\"/help\"> but there's no src/app/help/page.tsx. What does the click show?",
      options: ["The FAQ page", "The Home page", "A 404 page", "An error in VS Code"],
      answer: 2,
      explain: "<Link> doesn't check. The help folder has no page.tsx, so /help is a 404.",
    },
  ],
};
