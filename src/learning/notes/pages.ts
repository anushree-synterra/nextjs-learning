import type { TopicNotes } from "../topics";

export const pagesNotes: TopicNotes = {
  learnedOn: "2026-10-16",
  summary:
    "A page is one screen of the website. In Next.js you make a page by creating a folder inside src/app and putting a file named page.tsx in it. The folder name becomes the URL.",

  // ─── Part 1 · Theory ───────────────────────────────────────────
  theory: [
    {
      title: "What is a page?",
      blocks: [
        { kind: "text", text: "A **page** is **one screen** of your website: the Home screen, the About screen, the Contact screen." },
        {
          kind: "callout",
          tone: "idea",
          text: "Think of a website like a **book** 📖. A book has many pages, and a website has many pages too. Each page shows something different.",
        },
        { kind: "text", text: "Every page has its own **address** in the browser, called a **URL**. The part after `localhost:3000` tells the website which page to show:" },
        {
          kind: "code",
          code: `http://localhost:3000/          ← Home page
http://localhost:3000/about     ← About page
http://localhost:3000/contact   ← Contact page`,
        },
        {
          kind: "callout",
          tone: "tip",
          text: "The number after `localhost:` is the **port**. It can be 3000, 8080 or something else, depending on how the server was started. It doesn't matter. The part that picks the page is what comes after it: `/about`, `/contact`.",
        },
      ],
    },
    {
      title: "Why do we use pages?",
      blocks: [
        { kind: "text", text: "A real website has **many different screens**, and we can't put everything on one screen. An online shop, for example, has:" },
        { kind: "list", items: ["a Home page: `/`", "a Products page: `/products`", "a Cart page: `/cart`", "a Login page: `/login`"] },
        { kind: "text", text: "Pages are the **first thing you build** in any website. Everything else (styling, buttons, data) goes *inside* pages." },
      ],
    },
    {
      title: "How Next.js makes a page",
      blocks: [
        { kind: "text", text: "In Next.js, **a new page = a new folder + one file named `page.tsx`**. You never write a list of URLs yourself. Your folders *are* the URLs. This is called **file-system based routing**." },
        {
          kind: "callout",
          tone: "idea",
          text: "Think of `src/app` as a **house** 🏠. Each **folder** is a **room** 🚪, and `page.tsx` is the **light** 💡 in that room. A room without a light shows nothing, and a folder without `page.tsx` shows no page.",
        },
        {
          kind: "code",
          code: `src/app/              🏠 the house
├── page.tsx          💡 light of the main hall  →  /
└── about/            🚪 a room called "about"
    └── page.tsx      💡 light inside it         →  /about`,
        },
        { kind: "text", text: "There are two rules to remember:" },
        {
          kind: "list",
          items: [
            "**Rule 1:** A folder = one part of the URL. The folder `about` gives you `/about`.",
            "**Rule 2:** `page.tsx` makes it visible. Without it, the URL shows a 404 (\"This page could not be found\").",
          ],
        },
        { kind: "callout", tone: "warn", text: "The file must be named **exactly** `page.tsx`. `about.tsx`, `Page.tsx` and `index.tsx` will **not** work." },
      ],
    },
    {
      title: "What goes inside page.tsx",
      blocks: [
        { kind: "text", text: "Inside `page.tsx` we write a **component**: a function that returns what to show on screen." },
        {
          kind: "code",
          file: "src/app/about/page.tsx",
          code: `export default function About() {
  return <h1>This is my about page</h1>;
}`,
        },
        {
          kind: "table",
          head: ["Piece", "What it means"],
          rows: [
            ["`function About()`", "A function (component) named About. This is our page."],
            ["`return ...`", "\"This is what to show on screen.\""],
            ["`<h1>...</h1>`", "Looks like HTML. It's called **JSX**. `<h1>` is a heading, `<p>` is a paragraph."],
            ["`export default`", "\"Next.js, **this** is the page. Please show it.\" **Required.**"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "The function **name** can be anything. Next.js picks the page from the **folder location**, not the name. Still, name it after the page (`Home`, `About`, `Contact`) so the code is easy to read, and always start it with a **capital letter**.",
        },
      ],
    },
    {
      title: "When do we make a new page?",
      blocks: [
        { kind: "text", text: "Whenever you need a **new screen with its own address**. It's the same pattern every time:" },
        {
          kind: "table",
          head: ["I want…", "I create…", "URL"],
          rows: [
            ["An About screen", "`src/app/about/page.tsx`", "`/about`"],
            ["A Contact screen", "`src/app/contact/page.tsx`", "`/contact`"],
            ["A Login screen", "`src/app/login/page.tsx`", "`/login`"],
          ],
        },
      ],
    },
    {
      title: "Pages inside pages (nested routes)",
      blocks: [
        { kind: "text", text: "**A folder inside a folder = a longer URL.** Each folder adds one more word to the URL:" },
        {
          kind: "code",
          code: `about/              →  /about
about/team/         →  /about/team
about/team/lead/    →  /about/team/lead   (it can go as deep as you want)`,
        },
        { kind: "text", text: "Use this when pages **belong together** in a group, like a shop:" },
        {
          kind: "code",
          code: `src/app/shop/
├── page.tsx          →  /shop        (all products)
├── shoes/page.tsx    →  /shop/shoes
└── bags/page.tsx     →  /shop/bags`,
        },
        {
          kind: "callout",
          tone: "warn",
          text: "**Every URL needs its own `page.tsx`.** If `help/faq/page.tsx` exists but `help/page.tsx` doesn't, then `/help/faq` works but `/help` shows a 404. A page in a sub-folder doesn't count for the parent folder.",
        },
      ],
    },
    {
      title: "Showing many things: the \"one parent box\" rule",
      blocks: [
        { kind: "text", text: "A component can **return only ONE thing**. To show many elements, wrap them in **one parent box** (like `<main>`), and put `( )` after `return` so you can write it across many lines." },
        { kind: "callout", tone: "idea", text: "Like putting many items into **one bag** 🛍️ before handing it over." },
        {
          kind: "code",
          mark: "bad",
          code: `export default function Profile() {
  return <h1>My Profile</h1>
         <p>Hello</p>;      // two things → error
}`,
        },
        {
          kind: "code",
          mark: "good",
          code: `export default function Profile() {
  return (
    <main>
      <h1>My Profile</h1>
      <p>Hello</p>
    </main>
  );
}`,
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Your `<h1>` heading may look like normal text right now. That's expected: Tailwind removes the browser's default heading sizes and list bullets. We'll add styles in **Topic 04: CSS & Tailwind**.",
        },
      ],
    },
    {
      title: "Good to know: pages run on the server",
      blocks: [
        {
          kind: "text",
          text: "By default, Next.js builds each page **on the server** and sends finished HTML to the browser. That makes pages load fast and helps Google read them. You don't need to do anything for this. We'll go deep on it in **Topic 12: Server vs Client Components**.",
        },
      ],
    },
  ],

  // ─── Part 2 · Practical (the challenges we did) ────────────────
  challenges: [
    {
      level: 1,
      title: "Change the words",
      task: "Change the text on the About page and the Home page.",
      file: "src/app/about/page.tsx",
      code: `export default function About() {
  return <h1>Hi, I am Anushree 👋</h1>;
}`,
      output: [{ url: "localhost:3000/about", view: { lines: ["Hi, I am Anushree 👋"] } }],
      learned: "Only the words between <h1> and </h1> change what you see. Next.js reloads the page by itself when you save.",
    },
    {
      level: 2,
      title: "Make a page all by yourself",
      task: "Create a Contact page at /contact, with no code given.",
      file: "src/app/contact/page.tsx",
      code: `export default function Contact() {
  return <p>Contact me at: anushree@example.com</p>;
}`,
      output: [{ url: "localhost:3000/contact", view: { lines: ["Contact me at: anushree@example.com"] } }],
      learned: "New folder + page.tsx = new page. Component names start with a capital letter (Contact, not contact).",
    },
    {
      level: 3,
      title: "A page inside a page",
      task: "Make /about/team show \"Meet our team\".",
      file: "src/app/about/team/page.tsx",
      code: `export default function Team() {
  return <p>Meet our team</p>;
}`,
      output: [{ url: "localhost:3000/about/team", view: { lines: ["Meet our team"] } }],
      learned: "The team folder goes INSIDE the about folder. A folder inside a folder = a longer URL.",
    },
    {
      level: 4,
      title: "A small shop + the trick question",
      task: "Make /shop, /shop/shoes, /shop/bags and /help/faq, but no page.tsx directly in help.",
      file: "src/app/shop/shoes/page.tsx",
      code: `// src/app/shop/page.tsx
export default function Shop() {
  return <h1>All products</h1>;
}

// src/app/shop/shoes/page.tsx
export default function Shoes() {
  return <h1>Shoes Collection 👟</h1>;
}

// src/app/shop/bags/page.tsx
export default function Bags() {
  return <h1>Bags collection 👜</h1>;
}

// src/app/help/faq/page.tsx
export default function FAQ() {
  return <h1>Frequently Asked Questions</h1>;
}`,
      output: [
        { url: "localhost:3000/shop/shoes", view: { lines: ["Shoes Collection 👟"] } },
        { url: "localhost:3000/help/faq", view: { lines: ["Frequently Asked Questions"] } },
        { url: "localhost:3000/help", view: { notFound: true } },
      ],
      learned: "/help shows a 404 because the help folder has no page.tsx of its own. The page inside faq only belongs to /help/faq.",
    },
    {
      level: 5,
      title: "A real page with many things on it",
      task: "Make /profile with a heading, two paragraphs and a list of hobbies.",
      file: "src/app/profile/page.tsx",
      code: `export default function Profile() {
  return (
    <main>
      <h1>My profile</h1>
      <p>Name: Anushree</p>
      <p>I am learning: Next.js</p>
      <ul>
        <li>Reading</li>
        <li>Music</li>
        <li>Coding</li>
      </ul>
    </main>
  );
}`,
      output: [
        {
          url: "localhost:3000/profile",
          view: { lines: ["My profile", "Name: Anushree", "I am learning: Next.js"], list: ["Reading", "Music", "Coding"] },
        },
      ],
      learned: "Many elements must be wrapped in one parent (<main>), with ( ) after return. <ul> is a list and each <li> is one item.",
    },
  ],

  // ─── Key points ────────────────────────────────────────────────
  keyPoints: [
    "A page is one screen of the website, with its own URL.",
    "Every page lives inside `src/app`.",
    "A folder = one part of the URL: `about` → `/about`.",
    "The file must be named exactly `page.tsx`. Without it, there's no page (404).",
    "A folder inside a folder = a longer URL: `about/team` → `/about/team`.",
    "Every URL needs its own `page.tsx`. A sub-folder's page doesn't count for the parent.",
    "The page component must use `export default`.",
    "Component names start with a capital letter: `About`, `Contact`, `Profile`.",
    "To show many elements, wrap them in one parent like `<main>` and use `( )` after `return`.",
    "`src/app/page.tsx` is the Home page (`/`).",
  ],

  // ─── Common mistakes ───────────────────────────────────────────
  mistakes: [
    { wrong: "src/app/about.tsx", right: "src/app/about/page.tsx", why: "A page needs a folder, plus a file named exactly page.tsx." },
    { wrong: "export function About()", right: "export default function About()", why: "Without default, Next.js doesn't know which component is the page." },
    { wrong: "function contact()", right: "function Contact()", why: "React components must start with a capital letter." },
    { wrong: "return <h1>Hi</h1> <p>Text</p>", right: "return ( <main> <h1>Hi</h1> <p>Text</p> </main> )", why: "A component can return only one thing, so wrap it in one parent." },
    { wrong: "Expecting /help to work because help/faq/page.tsx exists", right: "Add src/app/help/page.tsx too", why: "Every URL needs its own page.tsx." },
  ],

  // ─── Revision quiz ─────────────────────────────────────────────
  questions: [
    { question: "In your own words, what is a page?", answer: "One screen of the website that has its own URL, like /about." },
    { question: "Which two things do you need to make a new page at /blog?", answer: "A folder named blog inside src/app, and a file named page.tsx inside it: src/app/blog/page.tsx." },
    { question: "What does `export default` tell Next.js?", answer: "\"This is the main component of the file. Show it as the page.\"" },
    { question: "Why does /help show a 404 when src/app/help/faq/page.tsx exists?", answer: "The help folder has no page.tsx of its own. Every URL needs its own page.tsx." },
    { question: "Why do we wrap many elements in <main>?", answer: "A component can return only one thing, so the elements must be inside one parent box." },
    { question: "Does the function name decide the URL?", answer: "No. The folder location decides the URL. The name is just for readability (start it with a capital letter)." },
  ],
  mcqs: [
    {
      question: "Which file creates the page at /contact?",
      options: ["src/app/contact.tsx", "src/app/contact/page.tsx", "src/app/page/contact.tsx", "src/contact/index.tsx"],
      answer: 1,
      explain: "Folder contact inside src/app, with a file named exactly page.tsx inside it.",
    },
    {
      question: "What URL does src/app/shop/shoes/page.tsx create?",
      options: ["/shoes", "/shop", "/shop/shoes", "/shop-shoes"],
      answer: 2,
      explain: "Each folder adds one part to the URL: shop → /shop, then shoes → /shop/shoes.",
    },
    {
      question: "You create the folder src/app/news but put no file inside. What does /news show?",
      options: ["An empty white page", "The Home page", "A 404: \"This page could not be found\"", "An error in VS Code"],
      answer: 2,
      explain: "A folder alone is not a page. Without page.tsx, Next.js shows its 404 page.",
    },
    {
      question: "Which line is correct for a page?",
      options: ["export function About() {", "function About() {", "export default function About() {", "default function About() {"],
      answer: 2,
      explain: "A page must be the default export: export default function ...",
    },
    {
      question: "Which file is the Home page (/)?",
      options: ["src/app/home/page.tsx", "src/app/page.tsx", "src/app/index.tsx", "src/home.tsx"],
      answer: 1,
      explain: "page.tsx directly inside src/app is the root URL /.",
    },
    {
      question: "Which return is correct?",
      options: [
        "return <h1>Hi</h1> <p>Hello</p>;",
        "return ( <h1>Hi</h1> <p>Hello</p> );",
        "return ( <main> <h1>Hi</h1> <p>Hello</p> </main> );",
        "return [h1: Hi, p: Hello];",
      ],
      answer: 2,
      explain: "Many elements must be wrapped in one parent element like <main>.",
    },
    {
      question: "Inside src/app/page.tsx the function is named About. Which URL shows it?",
      options: ["/about", "/", "Both / and /about", "No URL, it causes an error"],
      answer: 1,
      explain: "The file location decides the URL, not the function name. src/app/page.tsx is always /.",
    },
    {
      question: "Which component name follows the correct style?",
      options: ["contact", "CONTACT_PAGE", "Contact", "contact-page"],
      answer: 2,
      explain: "React components start with a capital letter, written like Contact or ContactPage.",
    },
  ],
};
