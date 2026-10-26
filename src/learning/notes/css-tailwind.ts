import type { TopicNotes } from "../topics";

export const cssTailwindNotes: TopicNotes = {
  learnedOn: "2026-10-26",
  summary:
    "CSS controls how things look. Tailwind gives you small ready-made classes (text-3xl, p-4, flex, hover:bg-zinc-800) that you write in className, right on the tag. Snap a few together to style anything.",

  // ─── Part 1 · Theory ───────────────────────────────────────────
  theory: [
    {
      title: "What are CSS and Tailwind?",
      blocks: [
        { kind: "text", text: "**CSS** changes the **look** of things: colors, sizes, spacing, borders and position." },
        { kind: "callout", tone: "idea", text: "🏠 HTML/JSX is the **walls and furniture** of a room. CSS is the **paint, decoration and arrangement**." },
        { kind: "text", text: "**Tailwind** gives you hundreds of ready-made style words, called **classes**. You write them **directly on the tag**:" },
        { kind: "code", code: `<h1 className="text-3xl font-bold text-sky-400">My profile</h1>` },
        {
          kind: "table",
          head: ["Class", "What it does"],
          rows: [
            ["`text-3xl`", "Big text"],
            ["`font-bold`", "Bold"],
            ["`text-sky-400`", "Light blue"],
          ],
        },
        { kind: "callout", tone: "idea", text: "🧩 Tailwind classes are like **LEGO pieces**. Each does **one small thing**, and you snap a few together." },
        { kind: "callout", tone: "warn", text: "In JSX it's **`className`**, never `class`. `class` is a reserved word in JavaScript." },
      ],
    },
    {
      title: "Why and when?",
      blocks: [
        {
          kind: "list",
          items: [
            "**No switching files:** the style sits right on the tag.",
            "**No inventing names:** just use `text-3xl`, `font-bold`…",
            "**Consistent:** sizes and colors come from a fixed scale, so the site looks neat.",
          ],
        },
        { kind: "text", text: "Use it **whenever you want something to look different**, on any tag (`<h1>`, `<div>`, `<Link>`…) in any file." },
        {
          kind: "callout",
          tone: "tip",
          text: "It's already set up in this project: `src/app/globals.css` has `@import \"tailwindcss\";` and `layout.tsx` imports `./globals.css`. Nothing to install.",
        },
      ],
    },
    {
      title: "1 · Text: size, weight, color",
      blocks: [
        {
          kind: "table",
          head: ["Kind", "Classes"],
          rows: [
            ["Size", "`text-sm` `text-base` (normal) `text-lg` `text-xl` `text-2xl` `text-3xl` `text-4xl`"],
            ["Weight", "`font-normal` `font-medium` `font-semibold` `font-bold`"],
            ["Color", "`text-<color>-<shade>`: `text-sky-400`, `text-rose-400`, `text-emerald-400`, `text-zinc-400`"],
          ],
        },
        { kind: "text", text: "**Shades** go from `50` (very light) to `950` (very dark). Text must **contrast** with its background:" },
        {
          kind: "list",
          items: [
            "**Dark background** (our site, `bg-zinc-950`) → light shades **300–400**.",
            "**Light background** → dark shades **600–900**.",
          ],
        },
        { kind: "callout", tone: "warn", text: "`text-sky-900` or `text-zinc-900` on our dark site is dark-on-dark, so it's almost invisible. The same goes for borders: `border-black` disappears too." },
      ],
    },
    {
      title: "2 · Spacing: padding and margin",
      blocks: [
        {
          kind: "table",
          head: ["", "Name", "Where the space goes", "Analogy"],
          rows: [
            ["`p-…`", "Padding", "**Inside** a box, between its edge and its content", "📦 Bubble wrap inside a parcel"],
            ["`m-…`", "Margin", "**Outside** a box, pushing other things away", "📦↔📦 The gap between two parcels"],
          ],
        },
        {
          kind: "table",
          head: ["Class", "Side"],
          rows: [
            ["`p-4`", "All 4 sides"],
            ["`px-4`", "Left + right (x = horizontal ↔)"],
            ["`py-4`", "Top + bottom (y = vertical ↕)"],
            ["`pt-4` `pb-4` `pl-4` `pr-4`", "Only top / bottom / left / right"],
          ],
        },
        { kind: "text", text: "Margin works the same way: `m-4`, `mx-4`, `mt-6`… **Each number step is 4px:**" },
        { kind: "code", code: `1 = 4px    2 = 8px    4 = 16px    6 = 24px    8 = 32px    12 = 48px` },
      ],
    },
    {
      title: "3 · Boxes: background, border, corners",
      blocks: [
        {
          kind: "table",
          head: ["Class", "What it does"],
          rows: [
            ["`bg-zinc-900`", "Background color"],
            ["`border border-zinc-700`", "A thin outline (`border`) and its color"],
            ["`rounded` `rounded-lg` `rounded-2xl` `rounded-full`", "Rounded corners"],
          ],
        },
        { kind: "callout", tone: "idea", text: "🖼️ `bg-` is the **paper color**, `border` is the **frame line**, and `rounded` **cuts the sharp corners** off." },
        {
          kind: "callout",
          tone: "tip",
          text: "Tailwind **removes** the browser's default styles (heading sizes, list bullets…). Bring list bullets back with **`list-disc pl-5`**: `pl-5` gives the bullets room.",
        },
        { kind: "callout", tone: "warn", text: "A box that holds other things must be a **`<div>`**. A `<p>` is only for one piece of text, and **a `<p>` can't contain another `<p>`**." },
      ],
    },
    {
      title: "4 · Layout with flex",
      blocks: [
        { kind: "text", text: "Put **`flex` on the parent**, and its children line up **side by side**:" },
        {
          kind: "code",
          code: `<div className="flex gap-4">   ← flex goes on the PARENT
  <p>A</p>                     ← the children need nothing
  <p>B</p>
  <p>C</p>
</div>`,
        },
        { kind: "callout", tone: "idea", text: "🚂 The parent is the **train track** and the children are the **carriages**. The track decides how they line up." },
        {
          kind: "table",
          head: ["Class", "Goes on", "What it does"],
          rows: [
            ["`flex`", "parent", "Children side by side in a **row**"],
            ["`gap-4`", "parent", "Space **between** the children (only works with `flex`!)"],
            ["`items-center`", "parent", "Lines them up **vertically in the middle**"],
            ["`justify-between`", "parent", "Pushes them **apart**: first to the left edge, last to the right"],
            ["`flex-col`", "parent", "**Stack** them top to bottom instead"],
            ["`flex-1`", "**each child**", "Grow and share the space **equally**, so they get equal widths 🍕"],
          ],
        },
        { kind: "callout", tone: "tip", text: "🏛️ **Column** = a pillar, stacked ↕. **Row** = a row of chairs, side by side ↔." },
      ],
    },
    {
      title: "5 · Conditions: hover:, md:, dark:",
      blocks: [
        { kind: "text", text: "Put a **condition** in front of any class with a colon: `condition:class`." },
        {
          kind: "table",
          head: ["Prefix", "Condition", "Example"],
          rows: [
            ["`hover:`", "the mouse is over it", "`hover:bg-zinc-800`, `hover:text-white`"],
            ["`md:`", "the screen is 768px or wider (`sm:` 640, `lg:` 1024)", "`md:flex-row`"],
            ["`dark:`", "the device is in dark mode", "`dark:bg-sky-950`"],
          ],
        },
        { kind: "text", text: "**`transition`** makes `hover:` changes smooth instead of instant (0.15s by default; `duration-700` is slower)." },
        { kind: "text", text: "**Responsive rule:** write the **phone** style first (no prefix), then add `md:` for bigger screens:" },
        {
          kind: "code",
          code: `<div className="flex flex-col gap-4 md:flex-row">
  ↑ phone: stacked ↕          ↑ laptop: side by side ↔`,
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Test responsive layouts by narrowing the window, or with F12 → 📱 icon. Test dark mode with F12 → Ctrl+Shift+P → \"Emulate CSS prefers-color-scheme\". Our site is always dark, so we use `dark:` only for demos.",
        },
      ],
    },
    {
      title: "Made-up class names fail silently",
      blocks: [
        { kind: "text", text: "If a class name doesn't exist in Tailwind, there's **no error**. It just **does nothing**. When a style doesn't show up, first check the spelling:" },
        {
          kind: "table",
          head: ["Wrong (does nothing)", "Right"],
          rows: [
            ["`flex-between`", "`justify-between`"],
            ["`align-center`", "`items-center` (on the parent)"],
            ["`padding-4`", "`p-4`"],
            ["`md: flex-row` (space)", "`md:flex-row`"],
          ],
        },
      ],
    },
  ],

  // ─── Part 2 · Practical (the challenges we did) ────────────────
  challenges: [
    {
      level: 1,
      title: "Profile page: text, spacing and a card",
      task: "Style the heading, space out the paragraphs, and put the hobbies in a card with bullets.",
      file: "src/app/profile/page.tsx",
      code: `export default function Profile() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-sky-400">My profile</h1>
      <p className="mt-2 text-lg text-zinc-300">Name: Anushree</p>
      <p className="mt-2 text-lg text-zinc-300">I am learning: Next.js</p>
      <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <p className="text-sm font-semibold text-emerald-400">My hobbies</p>
        <ul className="mt-2 list-disc pl-5 text-zinc-300">
          <li>Reading</li>
          <li>Music</li>
          <li>Coding</li>
        </ul>
      </div>
    </main>
  );
}`,
      output: [{ url: "localhost:3000/profile", view: { lines: ["My profile  (big, bold, light blue)", "Name: Anushree", "I am learning: Next.js", "┌ My hobbies ┐"], list: ["Reading", "Music", "Coding"] } }],
      learned: "text-sky-900 was too dark to read on our dark site, so light shades (300–400) it is. p-8 is space inside main, and mt-6 is space above the card.",
    },
    {
      level: 2,
      title: "Shop cards: flex, hover, responsive",
      task: "Make the two product links into cards: side by side on laptops, stacked on phones, reacting on hover.",
      file: "src/app/shop/page.tsx",
      code: `<main className="p-8">
  <h1 className="text-3xl font-bold text-sky-400">All products</h1>

  <div className="mt-6 flex flex-col gap-4 md:flex-row">
    <Link
      href="/shop/shoes"
      className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-lg transition hover:border-sky-500 hover:bg-zinc-800"
    >
      👟 See shoes
    </Link>
    <Link href="/shop/bags" className="…same classes…">
      👜 See bags
    </Link>
  </div>
</main>`,
      output: [
        { url: "localhost:3000/shop  (laptop)", view: { lines: ["All products", "[ 👟 See shoes ]  [ 👜 See bags ]"] } },
        { url: "localhost:3000/shop  (phone)", view: { lines: ["All products", "[ 👟 See shoes ]", "[ 👜 See bags ]"] } },
      ],
      learned: "Without flex the cards stack, and gap-4 does nothing. justify-between pushes them apart. transition makes the hover smooth.",
    },
    {
      level: 3,
      title: "Contact: make a link look like a link",
      task: "Add padding, a larger email line, and an underlined light-blue link.",
      file: "src/app/contact/page.tsx",
      code: `<main className="p-8">
  <p className="text-lg">Contact me at: anushree@example.com</p>
  <p>
    Visit the{" "}
    <a
      className="text-sky-400 underline hover:text-sky-300"
      href="https://nextjs.org"
      target="_blank"
    >
      Next.js
    </a>{" "}
    Website
  </p>
</main>`,
      output: [{ url: "localhost:3000/contact", view: { lines: ["Contact me at: anushree@example.com", "Visit the Next.js Website  (Next.js underlined, light blue)"] } }],
      learned: "underline + a color + hover: is the classic link style.",
    },
    {
      level: 4,
      title: "FAQ: questions and answers",
      task: "A big heading, and two question/answer pairs with space between them.",
      file: "src/app/help/faq/page.tsx",
      code: `<main className="p-8">
  <h1 className="text-3xl font-bold text-sky-400">Frequently Asked Questions</h1>
  <p className="text-lg font-semibold">How can I reset my password?</p>
  <p className="text-lg text-zinc-400">Use the "Forgot Password" link on the login page.</p>
  <p className="mt-4 text-lg font-semibold">How do I contact support?</p>
  <p className="text-lg text-zinc-400">You can contact support by emailing us at support@example.com.</p>
</main>`,
      output: [{ url: "localhost:3000/help/faq", view: { lines: ["Frequently Asked Questions", "How can I reset my password?", "Use the \"Forgot Password\" link…", "How do I contact support?", "You can contact support…"] } }],
      learned: "font-semibold for questions and grey (text-zinc-400) for answers creates a clear visual difference. mt-4 separates the pairs.",
    },
    {
      level: 5,
      title: "Home: Quick links card",
      task: "Put the links list in a card, bring the bullets back, and make the links turn white on hover.",
      file: "src/app/page.tsx",
      code: `<div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
  <ul className="list-disc pl-5">
    <li>
      <Link className="text-sky-400 hover:text-white" href="/about">About</Link>
    </li>
    …
  </ul>
</div>`,
      output: [{ url: "localhost:3000/", view: { lines: ["Quick links"], list: ["About", "Team", "Shoes", "Bags", "Shop", "FAQ", "Profile", "Contact"] } }],
      learned: "list-disc pl-5 brings the bullets back. You can put hover: on a <Link> just like on any tag.",
    },
    {
      level: 6,
      title: "About: a button-style link",
      task: "Make \"Meet the team\" look like a small button.",
      file: "src/app/about/page.tsx",
      code: `<Link
  className="mt-4 inline-block rounded-lg border border-sky-500 bg-sky-600 px-4 py-2 text-white transition hover:bg-zinc-900 hover:text-sky-500"
  href="/about/team"
>
  Meet the team
</Link>`,
      output: [{ url: "localhost:3000/about", view: { lines: ["Hi, I am Anushree 👋", "[ Meet the team ]  (blue button, outlined on hover)"] } }],
      learned: "A link is inline, so it flows inside text like a word. inline-block lets its padding and margin work properly, so you don't need a wrapper <div>.",
    },
    {
      level: 7,
      title: "Product pages: a top bar",
      task: "Back link on the left, title on the right, centered vertically. On both Shoes and Bags.",
      file: "src/app/shop/shoes/page.tsx",
      code: `<main className="p-8">
  <div className="flex items-center justify-between">
    <Link className="text-sky-400 hover:text-white" href="/shop">
      ← Back to Shop
    </Link>
    <h1 className="text-2xl font-bold">Shoes Collection 👟</h1>
  </div>
  …
</main>`,
      output: [{ url: "localhost:3000/shop/shoes", view: { lines: ["← Back to Shop                         Shoes Collection 👟"] } }],
      learned: "flex + justify-between + items-center makes a classic top bar. flex-between and align-center don't exist, so they silently did nothing.",
    },
    {
      level: 8,
      title: "Team cards: responsive and equal width",
      task: "3 cards (name + role), stacked on phones and in a row on laptops, with a blue border on hover.",
      file: "src/app/about/team/page.tsx",
      code: `<div className="mt-4 flex flex-col gap-4 md:flex-row">
  <div className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-lg transition hover:border-sky-500 hover:bg-zinc-800">
    <p className="font-semibold">John Doe</p>
    <p className="text-sm text-zinc-400">Frontend Developer</p>
  </div>
  <div className="flex-1 …">
    <p className="font-semibold">Jane Smith</p>
    <p className="text-sm text-zinc-400">Backend Developer</p>
  </div>
  <div className="flex-1 …">
    <p className="font-semibold">Alice Johnson</p>
    <p className="text-sm text-zinc-400">Full-Stack Developer</p>
  </div>
</div>`,
      output: [
        { url: "localhost:3000/about/team  (laptop)", view: { lines: ["[ John Doe      ]  [ Jane Smith     ]  [ Alice Johnson  ]", "  Frontend Dev       Backend Dev         Full-Stack Dev"] } },
      ],
      learned: "Cards are <div>s (a <p> can't hold <p>s). flex-1 goes on each card, not on the parent, and gives equal widths. gap-4 on the parent replaces the mt-4 on each card.",
    },
    {
      level: 9,
      title: "Bug hunt: 5 styling mistakes",
      task: "Find the 5 mistakes in an Offers page.",
      file: "src/app/offers/page.tsx",
      code: `// ❌ Broken
<main class="p-8">
  <h1 className="text-3xl font-bold text-zinc-900">Today's offers</h1>
  <div className="mt-6 gap-4">
    <p className="padding-4 rounded-lg bg-zinc-900">50% off shoes</p>
    …
  </div>
  <div className="flex flex-col md: flex-row">…</div>
</main>

// ✅ Fixed
<main className="p-8">
  <h1 className="text-3xl font-bold text-sky-400">Today's offers</h1>
  <div className="mt-6 flex gap-4">
    <p className="rounded-lg bg-zinc-900 p-4">50% off shoes</p>
    …
  </div>
  <div className="flex flex-col md:flex-row">…</div>
</main>`,
      output: [{ url: "localhost:3000/offers", view: { lines: ["Today's offers  (readable now)", "[ 50% off shoes ]  [ 30% off bags ]"] } }],
      learned: "The 5 bugs: class → className, text-zinc-900 on a dark site (contrast!), gap-4 without flex, padding-4 → p-4, and the space in md: flex-row.",
    },
  ],

  // ─── Key points ────────────────────────────────────────────────
  keyPoints: [
    "Tailwind classes go in **`className`** (never `class`), right on the tag.",
    "Text: `text-3xl` (size), `font-bold` (weight), `text-sky-400` (color).",
    "Shades run 50 (light) → 950 (dark). On our dark site, use **300–400** for text.",
    "`p-` = padding (**inside**), `m-` = margin (**outside**). x/y/t/b/l/r pick the side. 1 step = 4px.",
    "A card = `bg-…` + `border border-…` + `rounded-…` + `p-…`.",
    "Tailwind removes default styles. `list-disc pl-5` brings bullets back.",
    "**`flex` goes on the parent**: children go side by side. `gap`, `items-center` and `justify-between` also go on the parent.",
    "`flex-col` = stacked ↕, `flex-row` = side by side ↔. `flex-1` on each child = equal widths.",
    "`hover:`, `md:` and `dark:` are conditions. Write the phone style first, then `md:`.",
    "Use a `<div>` for boxes. A `<p>` can't contain other `<p>`s.",
    "A made-up class name gives no error. It silently does nothing.",
  ],

  // ─── Common mistakes ───────────────────────────────────────────
  mistakes: [
    { wrong: "<p class=\"text-lg\">", right: "<p className=\"text-lg\">", why: "In JSX the attribute is className. class is a reserved word in JavaScript." },
    { wrong: "text-zinc-900 on our dark site", right: "text-sky-400 / text-zinc-100", why: "Dark text on a dark background has no contrast, so you can't read it." },
    { wrong: "<div className=\"gap-4\">", right: "<div className=\"flex gap-4\">", why: "gap only works on a flex (or grid) parent." },
    { wrong: "flex-1 on the parent", right: "flex-1 on each child card", why: "flex-1 tells each child how much space to take." },
    { wrong: "flex-between / align-center / padding-4", right: "justify-between / items-center / p-4", why: "Made-up class names silently do nothing. Check the exact name." },
    { wrong: "md: flex-row", right: "md:flex-row", why: "A space splits it into two classes, and neither works." },
    { wrong: "<p className=\"card\"><p>Name</p></p>", right: "<div className=\"card\"><p>Name</p></div>", why: "A paragraph can't contain another paragraph. Boxes are <div>s." },
    { wrong: "list-disc alone", right: "list-disc pl-5", why: "Without left padding, the bullets can sit outside the box." },
  ],

  // ─── Revision quiz ─────────────────────────────────────────────
  questions: [
    { question: "What's the difference between p-4 and m-4?", answer: "p-4 is padding: space inside the box, on all 4 sides. m-4 is margin: space outside the box, pushing other things away." },
    { question: "How many pixels is mt-6?", answer: "24px. Each step is 4px, so 6 × 4 = 24." },
    { question: "You put gap-4 on a <div> and nothing changes. Why?", answer: "gap only works with flex. Add flex to the same <div>." },
    { question: "Which class puts children side by side, and where does it go?", answer: "flex, on the parent (the box that holds them)." },
    { question: "What does flex flex-col md:flex-row do?", answer: "On phones the children stack one under another (column). From medium screens up they sit side by side (row)." },
    { question: "What does flex-1 on each card do?", answer: "The cards grow and share the row equally, so they all get the same width." },
    { question: "Why is text-zinc-900 a bug on our site?", answer: "It's dark text on a dark background, so it can't be read. Use a light shade like text-sky-400." },
    { question: "You wrote className=\"flex-between\" and nothing happens. Why no error?", answer: "Tailwind ignores class names it doesn't know. The right class is justify-between." },
  ],
  mcqs: [
    {
      question: "Which line is correct in a .tsx file?",
      options: ["<h1 class=\"text-3xl\">", "<h1 className=\"text-3xl\">", "<h1 style=\"text-3xl\">", "<h1 tailwind=\"text-3xl\">"],
      answer: 1,
      explain: "JSX uses className for classes.",
    },
    {
      question: "Which text color is easy to read on our dark (bg-zinc-950) site?",
      options: ["text-zinc-900", "text-sky-900", "text-sky-400", "text-black"],
      answer: 2,
      explain: "Light shades (300–400) contrast with a dark background.",
    },
    {
      question: "You want 16px of space on the left and right inside a button. Which class?",
      options: ["p-16", "px-4", "mx-4", "py-4"],
      answer: 1,
      explain: "p = padding (inside), x = left + right, and 4 × 4px = 16px.",
    },
    {
      question: "Which class adds space ABOVE an element, outside it?",
      options: ["pt-6", "mt-6", "p-6", "gap-6"],
      answer: 1,
      explain: "m = margin (outside), t = top.",
    },
    {
      question: "Where does flex go to put 3 cards side by side?",
      options: ["On each card", "On the parent <div> holding the cards", "On <main> only", "On the first card"],
      answer: 1,
      explain: "flex goes on the parent. The children line up inside it.",
    },
    {
      question: "What does flex flex-col md:flex-row do on a phone?",
      options: ["Side by side", "Stacked one under another", "Hidden", "Equal widths"],
      answer: 1,
      explain: "Phones get the no-prefix style, flex-col, which stacks the children. md:flex-row only applies from 768px up.",
    },
    {
      question: "Which class makes 3 flex children equal width?",
      options: ["w-full on the parent", "flex-1 on each child", "justify-between on the parent", "gap-4 on each child"],
      answer: 1,
      explain: "flex-1 on each child makes them share the space equally.",
    },
    {
      question: "Which pair brings list bullets back?",
      options: ["list-disc pl-5", "bullets-on", "list-style", "ul-disc"],
      answer: 0,
      explain: "list-disc shows the bullets, and pl-5 gives them room.",
    },
    {
      question: "What does hover:bg-zinc-800 do?",
      options: [
        "Always makes the background zinc-800",
        "Makes the background zinc-800 only while the mouse is over it",
        "Makes the text zinc-800",
        "Animates the page",
      ],
      answer: 1,
      explain: "hover: is a condition. The style only applies while the mouse is over the element.",
    },
    {
      question: "Which class name actually exists in Tailwind?",
      options: ["flex-between", "align-center", "justify-between", "padding-4"],
      answer: 2,
      explain: "justify-between is real. The others are made up and silently do nothing.",
    },
  ],
};
