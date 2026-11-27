import type { TopicNotes } from "../topics";

export const imagesNotes: TopicNotes = {
  learnedOn: "2026-11-27",
  summary:
    "next/image (<Image>) serves each visitor a resized WebP file that fits their screen, reserves space so the page never jumps, and lazy-loads images below the screen. Give it the image's shape (width + height, an import, or fill), tell it the displayed size with sizes, and list other websites in remotePatterns.",

  // ─── Part 1 · Theory ───────────────────────────────────────────
  theory: [
    {
      title: "What is <Image> and why not <img>?",
      blocks: [
        { kind: "text", text: "`<Image>` from `next/image` is a smarter `<img>`. You write one tag, and Next.js does 4 jobs for you:" },
        {
          kind: "table",
          head: ["Job", "What it means"],
          rows: [
            ["📏 **Right size**", "A phone gets a small file and a big monitor gets a bigger one. Never the giant original."],
            ["🪶 **Lighter format**", "It converts PNG/JPG to **WebP** automatically (our cat: 1.4 MB PNG → 468 KB WebP, even before `sizes`)."],
            ["🧱 **No jumping**", "It reserves space before the image arrives, so text doesn't get pushed down (**layout shift**)."],
            ["💤 **Lazy loading**", "Images below the screen are **not downloaded** until you scroll near them."],
          ],
        },
        { kind: "code", file: "any page", code: `import Image from "next/image";

<Image src="/dear.jpg" alt="A deer" width={300} height={225} />` },
        { kind: "callout", tone: "idea", text: "🍕 `<img>` always serves the **largest pizza** to everyone. `<Image>` asks how hungry you are and serves the right size." },
        { kind: "callout", tone: "warn", text: "`alt` is **required**. It describes the image for screen readers and shows if the image fails to load." },
      ],
    },
    {
      title: "Where do the files go? /public vs import",
      blocks: [
        {
          kind: "table",
          head: ["Way", "Code", "File lives in"],
          rows: [
            ["**Text path**", "`src=\"/cat.png\"`", "`public/cat.png`: a path starting with `/` means the **public** folder"],
            ["**Import**", "`import catPic from \"./cat.png\"` → `src={catPic}`", "Next to your page, e.g. `src/app/gallery/cat.png`"],
          ],
        },
        { kind: "callout", tone: "warn", text: "`./` is **only for imports**. A text path like `src=\"./cat.png\"` is wrong. It must be `src=\"/cat.png\"`." },
      ],
    },
    {
      title: "width & height = the SHAPE, not the displayed size",
      blocks: [
        { kind: "text", text: "On `<Image>`, `width` and `height` **don't decide how big the image looks**. **CSS** decides that (`className=\"w-75\"`). The two numbers tell the browser the image's **shape** (aspect ratio), so it can **reserve the right space before the image arrives**." },
        {
          kind: "list",
          items: [
            "Page text arrives **instantly**, and the image file arrives **later**.",
            "No size → the browser reserves **no space** → when the image arrives, everything below **jumps down**. That's **layout shift**.",
            "With a size → the browser leaves a **gap of the right shape** → nothing moves.",
          ],
        },
        { kind: "callout", tone: "idea", text: "🍽️ Booking a table for 4: the chairs are set out **before** you arrive, so nobody has to move when you walk in." },
        { kind: "text", text: "Use the image's **real** numbers, or numbers with the **same ratio**. The deer is 5384 × 4032 (4:3), so `200 × 150` or `300 × 225` are both fine." },
        { kind: "callout", tone: "warn", text: "`width` alone is **not enough**, even though CSS sets `height: auto`. One number gives no shape, so Next.js errors: **\"missing required height\"**. **Props = the shape (before loading). CSS = how big it's drawn (after).**" },
      ],
    },
    {
      title: "Importing images: automatic size + typo safety",
      blocks: [
        { kind: "text", text: "When you **import** an image, Next.js **opens the file while building** and fills in an **information card** for you:" },
        { kind: "code", file: "console.log(catPic)", code: `{
  src: '/_next/static/media/cat.21ae9zftxr10b.png',  // copy with a fingerprint
  width: 2500,                                       // real width, measured
  height: 2500,                                      // real height, measured
  blurWidth: 8, blurHeight: 8,                       // tiny preview size
  blurDataURL: 'data:image/png;base64,iVBORw0…'      // the tiny 8×8 preview
}` },
        {
          kind: "list",
          items: [
            "**No width/height to type**, so no wrong numbers. Replace the file with a different-sized one and nothing in `page.tsx` changes.",
            "**Typos break the build** with a clear error: `Module not found: Can't resolve './catt.png'`. A typo in a text path just shows a broken image, with no warning.",
            "The **fingerprint** in `src` changes when the image changes, so browsers never show an old cached copy.",
          ],
        },
        { kind: "callout", tone: "idea", text: "🏷️ Text path = handwriting the address on a parcel. Import = a **printed label** from the system, which is always correct." },
        {
          kind: "table",
          head: ["Use **import**", "Use a **/public text path**"],
          rows: [
            ["You know the image while coding: a logo, a banner, an About photo", "File names come from **data** (200 product photos from a database)"],
            ["", "Files that need a fixed URL, like `/favicon.ico`"],
          ],
        },
      ],
    },
    {
      title: "Blur placeholder",
      blocks: [
        { kind: "code", code: `<Image src={catPic} alt="A cat" placeholder="blur" />` },
        { kind: "text", text: "While the real image downloads, a **soft blurry preview** fills its space, then the sharp image replaces it. Without it, the space stays **blank** and the image suddenly pops in." },
        { kind: "callout", tone: "idea", text: "🌫️ Walking into a dark room: you see blurry shapes first, then the details. It feels natural, not broken." },
        { kind: "callout", tone: "warn", text: "Blur works **automatically only for imported images**, because only they get a `blurDataURL`. On a text path you get: **Image with src \"/flower.jpg\" has \"placeholder='blur'\" property but is missing the \"blurDataURL\" property.** Fix: import the image." },
        { kind: "text", text: "Use it on big, important photos (banners, products, galleries). Small icons and logos don't need it." },
      ],
    },
    {
      title: "sizes: tell <Image> the DISPLAYED size",
      blocks: [
        { kind: "text", text: "`<Image>` gives the browser a **menu** of the same picture in several widths, and the browser **picks one**:" },
        { kind: "code", file: "the default menu (px)", code: `32  48  64  96  128  256  384  640  750  828  1080  1200  1920  2048  3840` },
        { kind: "text", text: "**Problem:** `<Image>` **can't see your CSS**. It only knows `width` (from the props or the import card). Our cat was imported as 2500 wide but shown at 300px:" },
        {
          kind: "list",
          items: [
            "1× screens: 2500 → next menu size up → **3840**",
            "2× screens: 5000 → bigger than the biggest → **3840**",
            "So a 300px cat downloaded a file labelled 3840. (Next.js never enlarges, so the file is really 2500px, but it's still far too big.)",
          ],
        },
        { kind: "text", text: "**Fix:** `sizes` = how wide the image will **actually appear** on screen." },
        { kind: "code", code: `<Image src={catPic} alt="A cat" className="w-75" sizes="300px" />` },
        {
          kind: "table",
          head: ["What was sent", "Size"],
          rows: [
            ["Original `cat.png`, 2500px", "1.4 MB"],
            ["`<Image>`, **no** `sizes` (w=3840, WebP)", "468 KB"],
            ["`<Image>` + `sizes=\"300px\"` (w=384, WebP)", "**31.7 KB** (≈15× smaller)"],
          ],
        },
        { kind: "text", text: "**Why 384 and not 300?** The menu only has fixed sizes, so the browser takes the **next size up**, because a smaller image stretched to fit would look blurry. 👟 Your foot is 6.5, so you buy shoe size 7." },
        { kind: "text", text: "**1× vs 2× screens:** think of graph paper. A sharp phone/MacBook screen (2×) has **finer squares**: a 300px box is **600 dots** across, so it picks **640**. With Windows at 125% scaling, 300px needs 375 dots → **384**." },
        {
          kind: "table",
          head: ["Image is shown…", "sizes"],
          rows: [
            ["at a fixed width, e.g. `w-75`", "`\"300px\"`: must **match** the class"],
            ["full screen width (banner)", "`\"100vw\"`: `vw` = % of the window width"],
          ],
        },
        { kind: "callout", tone: "warn", text: "`sizes` must **match** what you show. `w-75` + `sizes=\"200px\"` sends a file that's too small, so the image looks slightly blurry. `vw` goes **in `sizes`**, never in `className`." },
        { kind: "callout", tone: "tip", text: "`sizes` gives the browser **more precise choices** even for fixed images. Deer at `width={200}` with no sizes got **640** (only 1×=256 / 2×=640 on the menu), and with `sizes=\"200px\"` it got **256** (9.5 KB)." },
      ],
    },
    {
      title: "fill: the box decides the size",
      blocks: [
        { kind: "text", text: "Normally the **image** has a size and the page makes room. With `fill`, **you make a box**, and the image **fills the box**. No `width`/`height` needed." },
        { kind: "code", code: `<div className="relative w-75 h-50">          {/* the box: 300 × 200 */}
  <Image src="/cat.png" alt="A cat" fill sizes="300px" className="object-cover" />
</div>` },
        { kind: "callout", tone: "idea", text: "🖼️ A **photo frame** on a wall: you choose the frame for your design, and the photo has to fit it." },
        {
          kind: "list",
          items: [
            "**Rule 1:** the parent must be **`relative`** and have a **size**. Without `relative`, the image escapes and fills a much bigger area (it covered the cat).",
            "**Rule 2:** always add **`sizes`**. Without it, `<Image>` assumes the image is as wide as the whole screen.",
            "**When:** cards that must all look equal, banners, and images whose size you **don't know** (from a database or another website).",
          ],
        },
        { kind: "text", text: "How the photo fits the box (classes go **on the `<Image>`**, not on the div):" },
        {
          kind: "table",
          head: ["Class", "Keeps shape?", "Fills whole box?", "Downside", "Use for"],
          rows: [
            ["*(none)*", "❌", "✅", "Stretched / squashed", "Almost never"],
            ["`object-cover`", "✅", "✅", "Edges **cut off**", "Product cards, banners, galleries"],
            ["`object-contain`", "✅", "❌", "Empty space around it", "Logos: nothing may be cut"],
          ],
        },
        { kind: "text", text: "Our test: the wide flower (3162 × 2466) in a tall box (300 × 384). With `object-cover` it grew to about 492px wide, so about 96px were hidden on each side. With `object-contain` it shrank to 300 × 234, leaving about 75px of blue above and below." },
      ],
    },
    {
      title: "Images from other websites: remotePatterns",
      blocks: [
        { kind: "text", text: "Give `<Image>` a full URL. **Your own server** downloads, resizes and converts it (the `/_next/image?url=…` requests in the Network tab). If any URL were allowed, strangers could use your server to process any image on the internet, at your cost. So you must **approve each website**:" },
        { kind: "code", file: "next.config.ts", code: `const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};` },
        { kind: "callout", tone: "idea", text: "👩‍🍳 A restaurant kitchen only accepts ingredients from **approved suppliers**." },
        { kind: "callout", tone: "warn", text: "Not listed → **hostname \"images.unsplash.com\" is not configured under images in your next.config.js**. Only list websites you **actually use**." },
        { kind: "text", text: "Next.js **can't open remote files while building**, so there's **no import card**: no automatic width, height or blur. You must give **`width` + `height`, or `fill`**. Otherwise: **missing required \"width\" property**." },
      ],
    },
    {
      title: "Lazy vs eager loading",
      blocks: [
        {
          kind: "table",
          head: ["loading", "Meaning", "Use for"],
          rows: [
            ["`\"lazy\"` (**default**)", "Wait. Download only when the image comes **near the screen**", "Everything below the top of the page"],
            ["`\"eager\"`", "**Start downloading right away**, don't wait", "The image people see **as soon as the page opens** (banner, hero)"],
          ],
        },
        { kind: "callout", tone: "warn", text: "`eager` doesn't mean faster. It means **don't wait**. Making every image eager throws away the savings from lazy loading." },
        { kind: "callout", tone: "tip", text: "In Next.js 16 the old `priority` prop is **deprecated**. Use `loading=\"eager\"` (or `preload`) instead." },
      ],
    },
    {
      title: "Which recipe do I need?",
      blocks: [
        {
          kind: "table",
          head: ["Situation", "Code"],
          rows: [
            ["Known image, fixed size", "`import pic` → `<Image src={pic} className=\"w-50\" sizes=\"200px\" placeholder=\"blur\" />`"],
            ["/public image, fixed size", "`<Image src=\"/dear.jpg\" width={200} height={150} />`"],
            ["Full-width banner at the top", "`<Image src={pic} className=\"w-full h-64 object-cover\" sizes=\"100vw\" loading=\"eager\" />`"],
            ["Equal cards, mixed shapes", "`<div className=\"relative w-75 h-50\">` + `<Image fill sizes=\"300px\" className=\"object-cover\" />`"],
            ["Image from another website", "Add its host to `remotePatterns` + `width`/`height` or `fill`"],
          ],
        },
      ],
    },

    // ─── Experiments, step by step (the code I typed) ─────────────
    {
      title: "Step 0 · First <Image> and lazy loading",
      blocks: [
        { kind: "text", text: "The first gallery: images from `public/`, a tall spacer to push images below the screen, and the top image set to `eager`." },
        { kind: "code", file: "src/app/gallery/page.tsx", code: `import Image from "next/image";

export default function Gallery() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-sky-400">Gallery</h1>

      <Image src="/dear.jpg" alt="A deer" width={300} height={225} loading="eager" />
      <div className="h-[150vh]"></div>

      <Image src="/cat.png" alt="A cat" width={300} height={300} />
      <Image src="/flower.jpg" alt="A flower" width={300} height={234} />
    </main>
  );
}` },
        { kind: "output", url: "localhost:3000/gallery", view: { lines: ["Gallery", "🦌 deer (downloads right away)", "… tall empty space …", "🐱 cat + 🌸 flower (downloaded only when you scroll near them)"] } },
        { kind: "callout", tone: "tip", text: "**Learned:** `/dear.jpg` = `public/dear.jpg`. Lazy loading is the default, and `eager` = don't wait." },
      ],
    },
    {
      title: "Experiment A · CSS decides the displayed size",
      blocks: [
        { kind: "code", file: "src/app/gallery/page.tsx", code: `<Image
  src="/dear.jpg"
  alt="A deer"
  width={300}
  height={225}
  loading="eager"
  className="w-[600px]"   // then tried "w-[150px]"
/>` },
        { kind: "output", url: "localhost:3000/gallery", view: { lines: ["w-[600px] → deer shown 600px wide", "w-[150px] → deer shown 150px wide", "Never stretched: the height follows the shape"] } },
        { kind: "callout", tone: "tip", text: "**Learned:** the `className` decided the size I saw, not `width={300}`." },
      ],
    },
    {
      title: "Experiment B · Seeing layout shift",
      blocks: [
        { kind: "text", text: "A plain `<img>` of a big file (`animal.jpg`, 3085 × 2338, 1.7 MB), tested with DevTools open → Network → **Disable cache** → **3G**." },
        { kind: "code", file: "Test 1: no size", mark: "bad", code: `<img src="/animal.jpg" alt="test" />
<p className="text-red-400">I am the text below the image</p>` },
        { kind: "code", file: "Test 2: with the real size", mark: "good", code: `<img src="/animal.jpg" alt="test" width={3085} height={2338} />
<p className="text-red-400">I am the text below the image</p>` },
        { kind: "output", url: "localhost:3000/gallery (3G)", view: { lines: ["Test 1: red text right under the heading → JUMPS DOWN when the image arrives", "Test 2: a gap is reserved → red text stays in place"] } },
        { kind: "callout", tone: "warn", text: "My first try showed no difference: the test image sat below the 150vh spacer, and **Disable cache only works while DevTools is open**." },
      ],
    },
    {
      title: "Experiment C · Importing an image",
      blocks: [
        { kind: "text", text: "Copied `cat.png` into `src/app/gallery/`, next to `page.tsx`." },
        { kind: "code", file: "src/app/gallery/page.tsx", code: `import Image from "next/image";
import catPic from "./cat.png";

export default function Gallery() {
  console.log(catPic);   // prints in the VS Code terminal (server), not the browser
  return (
    <main className="p-8">
      <Image src={catPic} alt="A cat" />   {/* no width, no height */}
    </main>
  );
}` },
        { kind: "output", url: "VS Code terminal", view: { lines: ["{ src: '/_next/static/media/cat.21ae9zftxr10b.png',", "  width: 2500, height: 2500, blurWidth: 8, blurHeight: 8,", "  blurDataURL: 'data:image/png;base64,…' }"] } },
        { kind: "code", file: "Typo test", mark: "bad", code: `import catPic from "./catt.png";
// Build Error: Module not found: Can't resolve './catt.png'` },
        { kind: "callout", tone: "tip", text: "**Learned:** the import measures width/height for me, and typos are caught right away." },
      ],
    },
    {
      title: "Experiment D · Blur placeholder (and its error)",
      blocks: [
        { kind: "code", file: "Works: imported", mark: "good", code: `<Image src={catPic} alt="A cat" placeholder="blur" className="w-75" />` },
        { kind: "code", file: "Error: text path", mark: "bad", code: `<Image src="/flower.jpg" alt="A flower" width={300} height={234} placeholder="blur" />
// missing the "blurDataURL" property` },
        { kind: "code", file: "Mini challenge: fixed by importing", mark: "good", code: `import flowerPic from "./flower.jpg";

<Image src={flowerPic} alt="A flower" className="w-75" placeholder="blur" />` },
        { kind: "output", url: "localhost:3000/gallery (3G)", view: { lines: ["With blur: soft blurry cat → sharp cat", "Without: blank space → image pops in"] } },
        { kind: "callout", tone: "tip", text: "**Learned:** blur needs a preview, and only imports bring one. After importing, width/height can go too." },
      ],
    },
    {
      title: "Experiment E · What file is really sent?",
      blocks: [
        { kind: "text", text: "Network → **Img** filter → click the cat row → Headers → **Request URL**, then find `w=`." },
        { kind: "code", file: "src/app/gallery/page.tsx", code: `<Image src={catPic} alt="A cat" className="w-75" placeholder="blur" />` },
        { kind: "output", url: "Network tab", view: { lines: ["My guess: 2500", "Request: /_next/image?url=…cat…&w=3840", "Type: webp   Size: 468 kB"] } },
        { kind: "callout", tone: "tip", text: "**Learned:** <Image> can't see CSS. It only knew width 2500, so 1× and 2× both rounded up to 3840. WebP alone saved 3× (1.4 MB → 468 KB)." },
      ],
    },
    {
      title: "Experiment F · sizes fixes it",
      blocks: [
        { kind: "code", file: "src/app/gallery/page.tsx", code: `<Image
  src={catPic}
  alt="A cat"
  className="w-75"
  placeholder="blur"
  sizes="300px"
/>` },
        { kind: "output", url: "Network tab", view: { lines: ["Request: …&w=384", "Type: webp   Size: 31.7 kB  (≈15× smaller than 468 kB)"] } },
        { kind: "callout", tone: "tip", text: "**Learned:** 300 isn't on the menu, so the next size up is 384 (shoe size 7 for a 6.5 foot). A 2× phone would pick 640." },
      ],
    },
    {
      title: "Experiment G · fill and object-fit",
      blocks: [
        { kind: "code", file: "src/app/gallery/page.tsx", code: `<div className="relative w-75 h-96 bg-sky-900 mt-8">
  <Image
    src={flowerPic}
    alt="A flower in a frame"
    fill
    sizes="300px"
    className="object-cover"   // tried: none → object-cover → object-contain
  />
</div>` },
        { kind: "output", url: "localhost:3000/gallery", view: { lines: ["No class: flower squeezed thin and tall (stretched)", "object-cover: fills the box, about 96px cut off left and right", "object-contain: whole flower visible, blue bars above and below", "No 'relative': flower escapes and covers the cat"] } },
        { kind: "callout", tone: "warn", text: "My first try put `object-cover` on the **div**. It does nothing there, because it has to go on the **<Image>**." },
      ],
    },
    {
      title: "Experiment H · Remote image",
      blocks: [
        { kind: "code", file: "src/app/gallery/page.tsx", code: `<div className="relative w-75 h-48 mt-8">
  <Image
    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    alt="Mountain valley"
    fill
    sizes="300px"
    className="object-cover"
  />
</div>` },
        { kind: "output", url: "Step by step", view: { lines: ["1. No config → hostname \"images.unsplash.com\" is not configured under images", "2. Added remotePatterns in next.config.ts → mountain shows ✅", "3. Removed fill → missing required \"width\" property"] } },
        { kind: "callout", tone: "tip", text: "**Learned:** approve each website, and remote images need width + height or fill because there's no import card." },
      ],
    },
    {
      title: "Banner test · 100vw changes with the window",
      blocks: [
        { kind: "code", file: "src/app/gallery/page.tsx", code: `<Image
  src={flowerPic}
  alt="A flower"
  className="w-full h-64 object-cover"
  loading="eager"
  placeholder="blur"
  sizes="100vw"
/>` },
        { kind: "output", url: "Network tab", view: { lines: ["DevTools docked at the side (narrow page): w=640", "DevTools at the bottom (≈1536px × 1.25): w=1920"] } },
        { kind: "callout", tone: "tip", text: "**Learned:** same code, different window, different file. That's `100vw`." },
      ],
    },
  ],

  // ─── Part 2 · Challenges ───────────────────────────────────────
  challenges: [
    {
      level: 1,
      title: "Spot the bug",
      task: "Each line has one problem. Find it and fix it.",
      file: "(answers only)",
      code: `// a) ❌ <Image src="/cat.png" alt="A cat" />
//    ✅ add BOTH width={300} height={300}, or import it

// b) ❌ <Image src={flowerPic} width={300} height={300} className="w-75 h-75" />
//    ✅ <Image src={flowerPic} className="w-75" />   (h-75 forces a square, and the import gives the size)

// c) ❌ <Image src="/dear.jpg" width={300} height={225} placeholder="blur" />
//    ✅ import dearPic from "./dear.jpg";  <Image src={dearPic} placeholder="blur" />

// d) ❌ <div className="w-75 h-48"> <Image fill … /> </div>
//    ✅ <div className="relative w-75 h-48">

// e) ❌ src="https://cdn.myshop.com/shoe.jpg" (host not listed)
//    ✅ add { protocol: "https", hostname: "cdn.myshop.com" } to remotePatterns`,
      output: [{ url: "—", view: { lines: ["a 🟡 b ✅ c ✅ d ❌ e ✅"] } }],
      learned: "width alone isn't enough (CSS height:auto doesn't count). With fill, the bug is usually a missing relative, not fill itself.",
    },
    {
      level: 2,
      title: "The deer, the /public way",
      task: "Show /dear.jpg (5384 × 4032), 200px wide, no layout shift, no stretching.",
      file: "src/app/gallery/page.tsx",
      code: `<Image src="/dear.jpg" alt="A deer" width={200} height={150} />`,
      output: [{ url: "localhost:3000/gallery", view: { lines: ["🦌 deer, 200 × 150, same 4:3 shape as the original"] } }],
      learned: "Find the real size in File Explorer → Properties → Details. 200 × 150 keeps the 4:3 shape.",
    },
    {
      level: 3,
      title: "The deer, the import way",
      task: "Import the deer: blur, 200px wide, smallest sensible file.",
      file: "src/app/gallery/page.tsx",
      code: `import dearPic from "./dear.jpg";

<Image
  src={dearPic}
  alt="A deer"
  placeholder="blur"
  className="w-50"
  sizes="200px"
/>`,
      output: [{ url: "Network tab", view: { lines: ["w=256   Size: 9.5 kB"] } }],
      learned: "w-50 = 200px, and sizes must match it. My first try had no sizes → 640. Two deer on the page → check the Request URL to pick the right row.",
    },
    {
      level: 4,
      title: "Full-width banner",
      task: "Flower banner under the heading: full width, h-64, full and not stretched, not lazy, correct sizes.",
      file: "src/app/gallery/page.tsx",
      code: `<Image
  src={flowerPic}
  alt="A flower"
  className="w-full h-64 object-cover"
  loading="eager"
  placeholder="blur"
  sizes="100vw"
/>`,
      output: [{ url: "localhost:3000/gallery", view: { lines: ["🌸 wide flower banner across the top (w=1920 on my screen)"] } }],
      learned: "Full width → sizes=\"100vw\". vw goes in sizes, not in className. Imported, so no width/height.",
    },
    {
      level: 5,
      title: "Product cards",
      task: "4 cards (cat, flower, deer from /public + the Unsplash mountain), each with a 300 × 200 image area and a name. No width/height, all full and even, small files.",
      file: "src/app/gallery/page.tsx",
      code: `<div className="flex flex-wrap gap-6 mt-8">
  <div>
    <div className="relative w-75 h-50">
      <Image src="/cat.png" alt="A cat" fill sizes="300px" className="object-cover" />
    </div>
    <p className="mt-2">Cat</p>
  </div>
  {/* …same card for /flower.jpg, /dear.jpg and the Unsplash mountain */}
</div>`,
      output: [{ url: "localhost:3000/gallery", view: { lines: ["[🐱 Cat]  [🌸 Flower]  [🦌 Deer]  [🏔️ Mountain]", "all 300 × 200, each w=384"] } }],
      learned: "fill + a relative box with a size = equal cards. object-cover keeps them full. flex-wrap moves cards to a new line on narrow screens.",
    },
  ],

  // ─── Key points ────────────────────────────────────────────────
  keyPoints: [
    "`<Image>` = right-sized file + WebP + reserved space + lazy loading. `alt` is required.",
    "`src=\"/x.jpg\"` → `public/x.jpg`. `./` is only for imports.",
    "`width` + `height` give the **shape** (to reserve space), and **CSS** decides the displayed size. You need **both** numbers.",
    "**Import** = automatic width/height + blurDataURL, and typos break the build. Use **/public paths** when names come from data.",
    "`placeholder=\"blur\"` works automatically **only for imported** images.",
    "<Image> can't see CSS. **`sizes` tells it the displayed size**: `\"300px\"` for fixed images, `\"100vw\"` for full width. It must **match** the class.",
    "The browser picks the **next menu size up** (300 → 384), doubled on sharp 2× screens (→ 640).",
    "`fill` = the box decides the size: the parent needs **`relative` + a size**, and always add `sizes`.",
    "`object-cover` = full, edges cut (cards). `object-contain` = whole image, empty space (logos). Put them on the **<Image>**.",
    "Other websites → add to **`remotePatterns`**. Remote images need `width` + `height` **or** `fill`.",
    "Lazy is the default. Use `loading=\"eager\"` only for the image seen as soon as the page opens. `priority` is deprecated in Next.js 16.",
    "Check results in DevTools → Network → **Img** → Request URL `w=`, Type and Size.",
  ],

  // ─── Common mistakes ───────────────────────────────────────────
  mistakes: [
    { wrong: "<Image src=\"./cat.png\" … />", right: "<Image src=\"/cat.png\" … />", why: "Text paths start with / (the public folder). ./ is only for imports." },
    { wrong: "<Image src=\"/cat.png\" width={300} />", right: "width={300} height={300}", why: "One number gives no shape. CSS height:auto doesn't count, because the prop is needed before loading." },
    { wrong: "width={300} height={234} for a 3085 × 2338 image", right: "width={300} height={227} (or import it)", why: "The numbers must have the image's real shape." },
    { wrong: "className=\"w-75 h-75\" on a non-square image", right: "className=\"w-75\"", why: "Setting both forces a square and squashes the image. Set only the width and the height follows." },
    { wrong: "placeholder=\"blur\" on src=\"/flower.jpg\"", right: "import flowerPic → src={flowerPic}", why: "Only imports have a blurDataURL." },
    { wrong: "Big imported image shown small with no sizes", right: "Add sizes=\"300px\" matching the class", why: "Without it, <Image> uses the real width → downloads 3840." },
    { wrong: "className=\"w-75\" + sizes=\"200px\"", right: "className=\"w-75\" + sizes=\"300px\"", why: "Too small a sizes value sends a file that's too small, which looks blurry." },
    { wrong: "className=\"vw w-full …\"", right: "sizes=\"100vw\"", why: "vw is a value for sizes, not a Tailwind class." },
    { wrong: "<div className=\"w-75 h-48 object-cover\"> <Image fill /> </div>", right: "<div className=\"relative w-75 h-48\"> <Image fill className=\"object-cover\" /> </div>", why: "object-cover goes on the image. The parent needs relative, or the image escapes." },
    { wrong: "Adding made-up hosts to remotePatterns", right: "Only list websites you really use", why: "Every listed host can use your server's image optimizer." },
    { wrong: "Reading the first matching row in the Network tab", right: "Check the Request URL (url=%2Fdear.jpg vs url=%2F_next%2Fstatic…)", why: "Two images from the same file show up as similar rows." },
  ],

  // ─── Revision quiz ─────────────────────────────────────────────
  questions: [
    { question: "Name 3 things <Image> does that <img> doesn't.", answer: "Sends a right-sized file for each screen, converts to WebP, reserves space (no layout shift), and lazy-loads images below the screen." },
    { question: "Do width={300} height={225} decide how big the image looks? What are they for?", answer: "No, CSS decides that. They give the shape (aspect ratio) so the browser reserves the right space before the image arrives." },
    { question: "What is layout shift and how do you prevent it?", answer: "Content jumping down when an image arrives late. Prevent it by giving the shape: width + height, an import, or fill." },
    { question: "Why doesn't an imported image need width and height?", answer: "Next.js opens the file while building and fills in its real width, height and a blurDataURL." },
    { question: "Why does placeholder=\"blur\" fail on src=\"/flower.jpg\"?", answer: "A text path has no import card, so there's no blurDataURL preview. Import the image instead." },
    { question: "A 2500px imported cat is shown at 300px with no sizes. Which w= is requested, and why? How do you fix it?", answer: "3840. <Image> can't see CSS, so it uses 2500 (1×) and 5000 (2×), and both round up to 3840. Fix: sizes=\"300px\" → 384." },
    { question: "With sizes=\"300px\", why does a 2× phone download 640?", answer: "A 2× screen has 600 dots across a 300px box, so the next menu size up is 640." },
    { question: "What are the 2 rules of fill?", answer: "The parent must be relative with a size, and you add sizes." },
    { question: "object-cover or object-contain for product cards? For a logo?", answer: "Cards: object-cover (full and even, edges may be cut). Logo: object-contain (nothing cut off)." },
    { question: "Why must remote hosts be listed in remotePatterns, and what else does a remote image need?", answer: "Your server does the resizing work, so only approved hosts are allowed. It also needs width + height or fill, because there's no import card." },
  ],
  mcqs: [
    {
      question: "src=\"/cat.png\" points to…",
      options: ["src/app/cat.png", "public/cat.png", "The website root folder on disk", "The same folder as page.tsx"],
      answer: 1,
      explain: "A path starting with / means the public folder.",
    },
    {
      question: "What decides how big an <Image> looks on screen?",
      options: ["The width prop", "The height prop", "CSS / className", "The file size"],
      answer: 2,
      explain: "The width/height props only give the shape. CSS sets the displayed size.",
    },
    {
      question: "Which one errors?",
      options: ["<Image src={catPic} alt=\"\" />", "<Image src=\"/cat.png\" alt=\"\" width={300} height={300} />", "<Image src=\"/cat.png\" alt=\"\" width={300} />", "<Image src=\"/cat.png\" alt=\"\" fill />"],
      answer: 2,
      explain: "A text path needs both width and height (or fill).",
    },
    {
      question: "placeholder=\"blur\" works automatically when the image is…",
      options: ["In public/", "Imported", "Remote", "A PNG"],
      answer: 1,
      explain: "Only imports bring a blurDataURL.",
    },
    {
      question: "Shown at w-75 (300px). Best sizes?",
      options: ["\"100vw\"", "\"200px\"", "\"300px\"", "No sizes needed"],
      answer: 2,
      explain: "sizes must match the displayed width.",
    },
    {
      question: "A full-width banner should use…",
      options: ["sizes=\"100vw\"", "className=\"vw\"", "width={1920}", "sizes=\"100%\""],
      answer: 0,
      explain: "vw = % of the window width, and it goes in sizes.",
    },
    {
      question: "With sizes=\"300px\" on a normal 1× screen, the browser requests…",
      options: ["w=300", "w=256", "w=384", "w=3840"],
      answer: 2,
      explain: "300 isn't on the menu, so it takes the next size up, 384.",
    },
    {
      question: "<Image fill> covers the whole page instead of its box. Most likely cause?",
      options: ["Missing sizes", "Parent div isn't relative", "Missing object-cover", "Image too big"],
      answer: 1,
      explain: "fill looks for the nearest positioned parent.",
    },
    {
      question: "Cards must be full with no empty bars, even with different photo shapes. Use…",
      options: ["object-contain", "object-cover", "No class", "h-auto"],
      answer: 1,
      explain: "cover fills the box and keeps the shape, cutting off the edges.",
    },
    {
      question: "Which image should be loading=\"eager\"?",
      options: ["Every image", "Images at the bottom of the page", "The banner at the top", "Remote images"],
      answer: 2,
      explain: "Eager = don't wait, which is only for what's visible when the page opens. The rest stays lazy.",
    },
  ],
};
