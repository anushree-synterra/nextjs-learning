import type { TopicNotes } from "../topics";

export const fontsNotes: TopicNotes = {
  learnedOn: "2026-10-30",
  summary:
    "next/font downloads fonts once, at build time, and serves them from your own site: fast, no text jumping, no Google requests. Load a font in layout.tsx, give it a Tailwind name in @theme, then use the class (font-display) wherever you want it.",

  // ─── Part 1 · Theory ───────────────────────────────────────────
  theory: [
    {
      title: "What is a font?",
      blocks: [
        { kind: "text", text: "A **font** is the **style of the letters**: their shape and personality." },
        {
          kind: "table",
          head: ["Font", "Feels like"],
          rows: [
            ["Geist", "Clean, modern (our default)"],
            ["Playfair Display", "Elegant, like a magazine ✒️"],
            ["Pacifico", "Fun, handwritten ✍️"],
            ["Geist Mono", "Code 💻 (every letter is the same width)"],
          ],
        },
        { kind: "callout", tone: "idea", text: "✍️ A font is like **handwriting**. The words are the same, but each style **feels** different." },
      ],
    },
    {
      title: "Why next/font?",
      blocks: [
        { kind: "text", text: "A font is a **file** the browser must download. Loading it straight from Google has **two problems**:" },
        {
          kind: "table",
          head: ["Problem", "What the visitor sees"],
          rows: [
            ["🐢 **Slow:** the font comes from Google after the page loads", "Text shows in a plain font first, then **jumps** to the real font (worse on slow networks)"],
            ["🕵️ **Privacy:** every visitor's browser contacts Google", "Google sees who visits your site"],
          ],
        },
        {
          kind: "list",
          items: [
            "`next/font` downloads the font **once, when the app is built**, and serves it **from your own site**, so there are no Google requests.",
            "It also stops the text from **jumping** when the font loads.",
          ],
        },
        { kind: "callout", tone: "idea", text: "📦 Instead of fetching ingredients from a far-away shop for **every customer**, you keep them **in your own kitchen**." },
      ],
    },
    {
      title: "The 4-step chain",
      blocks: [
        { kind: "code", file: "src/app/layout.tsx", code: `import { Playfair_Display } from "next/font/google";   // "Playfair Display" → Playfair_Display

// 1. LOAD the font
const playfair = Playfair_Display({
  variable: "--font-playfair",   // the CSS variable's name
  subsets: ["latin"],            // only English-style letters → smaller file
});

// 2. MAKE IT AVAILABLE everywhere (creates --font-playfair)
<html className={\`\${playfair.variable} …\`}>` },
        { kind: "code", file: "src/app/globals.css", code: `@theme inline {
  /* 3. NAME IT for Tailwind → creates the class font-display */
  --font-display: var(--font-playfair);
}` },
        { kind: "code", file: "any page", code: `{/* 4. USE IT, and only now does the text change */}
<h1 className="font-display">My profile</h1>` },
        { kind: "callout", tone: "idea", text: "🍽️ **Cook** it (load) → put it **on the counter** (`.variable` on `<html>`) → write it **on the menu** (`@theme`) → **order** it (the class). If one step is missing, the chain breaks and the text stays Geist." },
        { kind: "callout", tone: "tip", text: "The two names just have to **match**: `variable: \"--font-playfair\"` ↔ `var(--font-playfair)`. The Tailwind name (`--font-display` → `font-display`) can be anything you like." },
      ],
    },
    {
      title: "Loading ≠ using",
      blocks: [
        { kind: "text", text: "`${playfair.variable}` on `<html>` **doesn't change any text**. It only makes Playfair **available**. A font shows only where a tag **asks for it with a class**." },
        {
          kind: "table",
          head: ["Where", "Class", "Font you see"],
          rows: [
            ["`<body>` (layout.tsx)", "`font-sans`", "Geist, the **default** for everything inside"],
            ["Profile `<h1>`", "`font-display`", "Playfair (overrides the default)"],
            ["Shop `<h1>` before Topic 05", "none", "Geist (falls back to the body)"],
          ],
        },
        { kind: "callout", tone: "idea", text: "🧂 `<html>` is the **spice rack**. A spice on the rack doesn't flavour anything until you **sprinkle it on** (the class). `font-sans` on the body is the salt that goes on everything." },
        { kind: "text", text: "Because `<html>` is in the **root layout**, a font loaded there can be used on **every page**, with no import in the page files." },
      ],
    },
    {
      title: "Weights: variable vs non-variable fonts",
      blocks: [
        { kind: "text", text: "**Weight** = how thick the letters are: `100` thin → `400` normal → `700` bold → `900` heavy." },
        {
          kind: "table",
          head: ["Font type", "Examples", "weight option"],
          rows: [
            ["**Variable**: all weights in ONE file", "Geist, Playfair, Caveat, Dancing Script", "Not needed"],
            ["**Non-variable**: one file per weight", "Pacifico, Bebas Neue, Lato, Righteous, Anton", "**Required**, e.g. `\"400\"` or `[\"400\", \"700\"]`"],
          ],
        },
        { kind: "code", code: `const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],   // more than one weight → an array
});` },
        { kind: "callout", tone: "warn", text: "Forget the weight on a non-variable font and Next.js stops with: **`Missing weight for Pacifico. Available weights: 400`**. Read the list and pick from it." },
        { kind: "text", text: "If you use a weight you **didn't load**, the browser picks the closest one it has:" },
        {
          kind: "table",
          head: ["Loaded `[\"400\", \"700\"]`, you use", "You actually get"],
          rows: [
            ["`font-light` (300)", "**400**: the browser can't make letters thinner, so it looks the same as normal"],
            ["`font-normal` (400)", "400 ✅"],
            ["`font-semibold` (600)", "**700**: for thicker weights it looks heavier first"],
            ["`font-bold` (700)", "700 ✅ real, crisp bold"],
          ],
        },
        { kind: "callout", tone: "tip", text: "Load **all 4** (`[\"300\", \"400\", \"600\", \"700\"]`) and all 4 lines look different." },
      ],
    },
    {
      title: "Local fonts: next/font/local",
      blocks: [
        { kind: "text", text: "Use it when the font is **not on Google Fonts**, like a company's own brand font or one you bought. You keep the **file in your project**." },
        { kind: "code", file: "src/app/layout.tsx", code: `import localFont from "next/font/local";

const lobster = localFont({
  src: "./fonts/Lobster-Regular.ttf",   // file at src/app/fonts/
  variable: "--font-lobster",
});` },
        {
          kind: "list",
          items: [
            "`src` starts from **layout.tsx's own folder**: `./` = `src/app/`.",
            "**No `subsets`**: Google isn't involved, so there's nothing to trim.",
            "The rest is the same chain: `.variable` on `<html>` → `@theme` → class.",
          ],
        },
        { kind: "callout", tone: "idea", text: "🍪 `next/font/google` = ordering from a **menu**. `next/font/local` = cooking **your own recipe** with ingredients you brought." },
      ],
    },
    {
      title: ".className vs .variable",
      blocks: [
        { kind: "text", text: "Every loaded font gives you **two handles**. Remember them as **className = apply**, **variable = create**." },
        {
          kind: "table",
          head: ["Handle", "What it does", "Use it when"],
          rows: [
            ["`font.className`", "**Applies** the font to that tag right away", "One tag or one page: `<h1 className={bebas.className}>`"],
            ["`font.variable`", "Only **creates** a CSS variable (`--font-xyz`). Nothing changes until it's used", "With Tailwind: `<html>` → `@theme` → `font-xyz` anywhere"],
          ],
        },
        { kind: "callout", tone: "idea", text: "📺 `.className` = **pressing the button** (shows it now). `.variable` = **saving a channel** on the remote (nothing plays until someone picks it)." },
        { kind: "code", file: "Line D vs Line E test", code: `<p className={dancingScript.className}>Line D</p>  {/* ✍️ Dancing Script */}
<p className={dancingScript.variable}>Line E</p>   {/* plain, nothing applied it */}` },
        { kind: "text", text: "Mixing it with Tailwind classes:" },
        { kind: "code", code: `<h1 className={\`\${bebasNeue.className} text-4xl text-sky-400\`}>Team</h1>` },
      ],
    },
    {
      title: "A font for one page only",
      blocks: [
        { kind: "text", text: "Load the font **inside that page file**, not in the layout:" },
        { kind: "code", file: "src/app/about/team/page.tsx", code: `import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",          // non-variable
  subsets: ["latin"],
});

export default function Team() {
  return <h1 className={bebasNeue.className}>Team</h1>;
}` },
        {
          kind: "list",
          items: [
            "Only this page has Bebas. /about doesn't, because the font isn't in the layout.",
            "The font file **only downloads when someone visits this page**, so the other pages stay lighter.",
            "Use it when **just one page** needs that look.",
          ],
        },
      ],
    },
    {
      title: "When it doesn't update",
      blocks: [
        { kind: "callout", tone: "warn", text: "Code 100% correct but the new font class doesn't show? The dev server's cache can be stale (that's what happened with `font-fancy`). **Restart it:** Ctrl+C → `npm run dev` → refresh." },
      ],
    },
  ],

  // ─── Part 2 · Challenges ───────────────────────────────────────
  challenges: [
    {
      level: 1,
      title: "First new font: Playfair",
      task: "Load Playfair Display, name it font-display, and use it on the profile heading.",
      file: "src/app/profile/page.tsx",
      code: `// layout.tsx
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
<html className={\`… \${playfair.variable} …\`}>

/* globals.css */
--font-display: var(--font-playfair);

// profile/page.tsx
<h1 className="text-3xl font-bold text-sky-400 font-display">My profile</h1>`,
      output: [
        { url: "localhost:3000/profile", view: { lines: ["My profile  (elegant Playfair)"] } },
        { url: "localhost:3000/shop", view: { lines: ["All products  (still Geist, no class)"] } },
      ],
      learned: "Loading a font only makes it available. A page shows it only where a tag uses the class.",
    },
    {
      level: 2,
      title: "Handwritten logo: Pacifico",
      task: "Add Pacifico (non-variable) as font-logo on the header logo.",
      file: "src/app/layout.tsx",
      code: `const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

<Link href="/" className="font-semibold text-zinc-100 font-logo">
  Next.js Learning
</Link>`,
      output: [{ url: "localhost:3000/ (and every page)", view: { lines: ["Next.js Learning  (handwritten, in the header)"] } }],
      learned: "Without weight: \"Missing weight for Pacifico. Available weights: 400\". The logo is on every page because the header lives in the root layout.",
    },
    {
      level: 3,
      title: "Local font: Lobster",
      task: "Put Lobster-Regular.ttf in src/app/fonts/ and use it as font-fancy on the shop heading.",
      file: "src/app/layout.tsx",
      code: `import localFont from "next/font/local";

const lobster = localFont({
  src: "./fonts/Lobster-Regular.ttf",
  variable: "--font-lobster",
});

/* globals.css */
--font-fancy: var(--font-lobster);

// shop/page.tsx
<h1 className="text-3xl font-bold text-sky-400 font-fancy">All products</h1>`,
      output: [{ url: "localhost:3000/shop", view: { lines: ["All products  (bold, curly Lobster)"] } }],
      learned: "A wrong path gives \"Font file not found: Can't resolve…\". The code was right but the class didn't appear until the dev server was restarted.",
    },
    {
      level: 4,
      title: "Reuse + code-style text",
      task: "Use Playfair on the About heading. On Contact, show only the email in the mono font.",
      file: "src/app/contact/page.tsx",
      code: `// about/page.tsx (no import needed, it's in the layout)
<h1 className="font-display">Hi, I am Anushree 👋</h1>

// contact/page.tsx
<p>
  Email: <span className="font-mono">hello@example.com</span>
</p>`,
      output: [{ url: "localhost:3000/contact", view: { lines: ["Email: hello@example.com  (email in code-style font)"] } }],
      learned: "font-mono already works because Geist Mono was loaded from the start. A <span> changes the font for part of a line.",
    },
    {
      level: 5,
      title: "Caveat and Lato: weights",
      task: "Caveat (variable) as font-hand on the hobbies title. Lato with 400 + 700 as font-lato on the FAQ page, with bold questions.",
      file: "src/app/help/faq/page.tsx",
      code: `// layout.tsx
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", subsets: ["latin"], weight: ["400", "700"] });

// help/faq/page.tsx
<main className="p-8 font-lato">
  <p className="text-lg font-bold">How can I reset my password?</p>
  <p className="text-lg text-zinc-400">Use the "Forgot Password" link…</p>
</main>`,
      output: [{ url: "localhost:3000/help/faq", view: { lines: ["Frequently Asked Questions", "How can I reset my password?  (real bold)", "Use the \"Forgot Password\" link…"] } }],
      learned: "Variable → no weight. Non-variable → weight, and an array for several. font-semibold with only 400 loaded was \"fake bold\"; font-light with no 300 loaded looks the same as normal.",
    },
    {
      level: 6,
      title: "One page only: Bebas Neue",
      task: "Load Bebas Neue inside the team page only and apply it with .className.",
      file: "src/app/about/team/page.tsx",
      code: `import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

<h1 className={bebasNeue.className}>Team</h1>`,
      output: [
        { url: "localhost:3000/about/team", view: { lines: ["TEAM  (tall Bebas letters)"] } },
        { url: "localhost:3000/about", view: { lines: ["Hi, I am Anushree 👋  (no Bebas here)"] } },
      ],
      learned: "No layout or globals.css changes needed. The font exists only on that page and only downloads there.",
    },
    {
      level: 7,
      title: "Round 2: the Line D / Line E test",
      task: "Load Dancing Script in a lab page and compare .className with .variable on two lines.",
      file: "src/app/lab/page.tsx (practice page, removed afterwards)",
      code: `<p>Line A: no class</p>
<p className="font-display">Line B: font-display</p>
<p className="font-logo">Line C: font-logo</p>
<p className={dancingScript.className}>Line D: .className</p>
<p className={dancingScript.variable}>Line E: .variable</p>`,
      output: [{ url: "localhost:3000/lab", view: { lines: ["Line A  (Geist)", "Line B  (Playfair)", "Line C  (Pacifico)", "Line D  (Dancing Script ✍️)", "Line E  (plain, like Line A)"] } }],
      learned: ".className APPLIES the font. .variable only CREATES a CSS variable, and nothing uses it. Removing playfair.variable from <html> breaks Line B back to Geist.",
    },
    {
      level: 8,
      title: "Bug hunt 1: Open Sans + Anton",
      task: "Find 5 bugs in a layout and globals.css.",
      file: "src/app/layout.tsx",
      code: `// ❌ Broken
import { Open Sans, Anton } from "next/font/google";
const openSans = Open_Sans({ variable: "font-open", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"] });
<html className={\`\${openSans} \${anton.variable}\`}>
/* @theme */ --font-open: --font-open;

// ✅ Fixed
import { Open_Sans, Anton } from "next/font/google";
const openSans = Open_Sans({ variable: "--font-open", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
<html className={\`\${openSans.variable} \${anton.variable}\`}>
/* @theme */ --font-open: var(--font-open);`,
      output: [{ url: "localhost:3000", view: { lines: ["Builds and both fonts work"] } }],
      learned: "Spaces → _, variable names start with --, use .variable (small v!), wrap with var(), and non-variable Anton needs weight: \"400\".",
    },
    {
      level: 9,
      title: "Bug hunt 2: Righteous + a local brand font",
      task: "Find 5 bugs. The font file is at src/app/fonts/MyBrand.woff2.",
      file: "src/app/layout.tsx",
      code: `// ❌ Broken
import localFont from "next/font/google";
const retro = Righteous({ variable: "--font-retro", subsets: ["latin"] });
const brand = localFont({ src: "MyBrand.woff2", variable: "--font-brand" });
/* @theme */ --font-retro: var(--font-retro);   (no --font-brand)
<p className={retro.variable}>Retro text</p>

// ✅ Fixed
import localFont from "next/font/local";
const retro = Righteous({ variable: "--font-retro", subsets: ["latin"], weight: "400" });
const brand = localFont({ src: "./fonts/MyBrand.woff2", variable: "--font-brand" });
/* @theme */ --font-retro: var(--font-retro);
             --font-brand: var(--font-brand);
<p className="font-retro">Retro text</p>`,
      output: [{ url: "localhost:3000", view: { lines: ["Welcome  (brand font)", "Retro text  (Righteous)"] } }],
      learned: "localFont comes from next/font/local, non-variable needs weight, src needs the ./fonts/ path, every class needs a @theme line, and .variable alone doesn't apply anything.",
    },
  ],

  // ─── Key points ────────────────────────────────────────────────
  keyPoints: [
    "`next/font` downloads fonts **at build time** and serves them **from your site**: no text jump, no Google requests (**speed + privacy**).",
    "Font names with spaces use `_`: `Playfair_Display`, `Geist_Mono`, `Bebas_Neue`.",
    "`subsets: [\"latin\"]` keeps the file small (Google fonts only).",
    "The chain: load in **layout.tsx** → `.variable` on `<html>` → `--font-x: var(--font-…)` in **@theme** → class `font-x` on a tag.",
    "**Loading ≠ using.** Text only changes where a class asks for the font. The default is `font-sans` (Geist) on `<body>`.",
    "**Variable font** = all weights in one file, no `weight` needed. **Non-variable → `weight` is a must** (an array for several).",
    "A weight you didn't load: thinner → falls back to 400 (no change), thicker → uses the next heavier one.",
    "`next/font/local` for fonts **not on Google** (brand fonts): `src: \"./fonts/…\"`, no `subsets`.",
    "**`.className` applies** the font. **`.variable` only creates** a CSS variable.",
    "Load a font **inside one page** for a one-page look. It only downloads on that page.",
    "Code right but the page won't update? **Restart the dev server.**",
  ],

  // ─── Common mistakes ───────────────────────────────────────────
  mistakes: [
    { wrong: "Pacifico({ subsets: [\"latin\"] })", right: "Pacifico({ subsets: [\"latin\"], weight: \"400\" })", why: "Non-variable fonts need a weight. The error lists the available ones." },
    { wrong: "<p className={retro.variable}>", right: "<p className={retro.className}> or className=\"font-retro\"", why: ".variable only creates the CSS variable. It doesn't apply the font." },
    { wrong: "font-semibold with only [\"400\", \"700\"] loaded", right: "font-bold (or load \"600\" too)", why: "Use the weights you loaded, otherwise the browser substitutes another one." },
    { wrong: "variable: \"font-open\"", right: "variable: \"--font-open\"", why: "CSS variable names must start with --." },
    { wrong: "--font-open: --font-open;", right: "--font-open: var(--font-open);", why: "To read a CSS variable you wrap it in var()." },
    { wrong: "${openSans.Variable}", right: "${openSans.variable}", why: "JavaScript is case-sensitive." },
    { wrong: "import localFont from \"next/font/google\"", right: "import localFont from \"next/font/local\"", why: "Local files use the local loader." },
    { wrong: "className=\"font-cookierounded-lg\"", right: "className=\"font-cookie rounded-lg\"", why: "A missing space glues two classes into one made-up class, and both stop working." },
    { wrong: "Using a class like font-dancing that's not in @theme", right: "Add --font-dancing: var(…) to @theme, or use .className", why: "Tailwind only creates font-x classes for names in @theme." },
  ],

  // ─── Revision quiz ─────────────────────────────────────────────
  questions: [
    { question: "Name two problems with loading a font straight from Google that next/font solves.", answer: "Speed: the text shows a plain font first and then jumps. Privacy: every visitor's browser contacts Google. next/font serves the font from your own site, downloaded at build time." },
    { question: "Put the steps in order: use the class, load the font + .variable on <html>, add the @theme line.", answer: "Load + .variable (layout.tsx) → @theme line (globals.css) → use the class (any page)." },
    { question: "You load Playfair and put playfair.variable on <html>, but use no class. Does any text change?", answer: "No. .variable only makes it available. Text changes only where a tag uses font-display." },
    { question: "Which needs weight: Geist or Pacifico?", answer: "Pacifico, because it's non-variable. Geist is variable, so all weights are in one file." },
    { question: "Lato is loaded with [\"400\", \"700\"]. What do font-bold, font-light and font-semibold show?", answer: "font-bold → real 700. font-light → 400, so no visible change. font-semibold → 700." },
    { question: "What's the difference between font.className and font.variable?", answer: ".className applies the font to the tag right away. .variable only creates a CSS variable that does nothing until it's used." },
    { question: "When do you use next/font/local? Load src/app/fonts/MyBrand.woff2 as --font-brand.", answer: "When the font isn't on Google Fonts (a brand font). const brand = localFont({ src: \"./fonts/MyBrand.woff2\", variable: \"--font-brand\" });" },
    { question: "The code is 100% correct, but the new font class doesn't show. First thing to try?", answer: "Restart the dev server (Ctrl+C, then npm run dev)." },
  ],
  mcqs: [
    {
      question: "Where does next/font get the font from when a visitor opens your site?",
      options: ["Google's servers, every time", "Your own site (downloaded at build time)", "The visitor's computer", "A CDN chosen at random"],
      answer: 1,
      explain: "It's downloaded once at build time and served from your site.",
    },
    {
      question: "How do you import the Google font \"Playfair Display\"?",
      options: ["{ Playfair Display }", "{ PlayfairDisplay }", "{ Playfair_Display }", "{ playfair-display }"],
      answer: 2,
      explain: "Spaces become underscores.",
    },
    {
      question: "Which font needs the weight option?",
      options: ["Geist", "Playfair Display", "Caveat", "Pacifico"],
      answer: 3,
      explain: "Pacifico is non-variable. The others are variable fonts.",
    },
    {
      question: "What does <html className={playfair.variable}> do on its own?",
      options: ["Makes all text Playfair", "Makes Playfair available as --font-playfair", "Creates the class font-display", "Nothing at all"],
      answer: 1,
      explain: "It only creates the CSS variable. A class still has to use it.",
    },
    {
      question: "Which line creates the Tailwind class font-display?",
      options: ["--font-display: var(--font-playfair); in @theme", "variable: \"font-display\"", "import font-display", "<h1 font=\"display\">"],
      answer: 0,
      explain: "@theme --font-x lines become font-x classes.",
    },
    {
      question: "Which line shows Dancing Script?",
      options: ["<p className={dancing.variable}>", "<p className={dancing.className}>", "<p font={dancing}>", "<p className=\"dancing\">"],
      answer: 1,
      explain: ".className applies the font. .variable only creates a variable.",
    },
    {
      question: "Lato is loaded with [\"400\", \"700\"]. What does font-light look like?",
      options: ["Thin 300", "Normal 400", "Bold 700", "Invisible"],
      answer: 1,
      explain: "300 wasn't loaded and the browser can't make letters thinner, so it uses 400.",
    },
    {
      question: "What's correct for a local file at src/app/fonts/Brand.woff2, loaded in src/app/layout.tsx?",
      options: [
        "localFont({ src: \"Brand.woff2\" })",
        "localFont({ src: \"./fonts/Brand.woff2\", variable: \"--font-brand\" })",
        "Brand({ subsets: [\"latin\"] })",
        "localFont({ src: \"./fonts/Brand.woff2\", subsets: [\"latin\"] })",
      ],
      answer: 1,
      explain: "The path starts from layout.tsx's folder, and local fonts don't use subsets.",
    },
    {
      question: "You need a font on one page only. Best way?",
      options: ["Add it to layout.tsx", "Load it in that page file and use .className", "Put a Google <link> in the page", "Add it to globals.css only"],
      answer: 1,
      explain: "It stays on that page and only downloads there.",
    },
    {
      question: "Code is correct but the new font class is missing in the browser. First step?",
      options: ["Rewrite the code", "Restart the dev server", "Delete node_modules", "Change the font"],
      answer: 1,
      explain: "A stale dev server cache is the usual cause.",
    },
  ],
};
