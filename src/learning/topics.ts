// 📒 Next.js learning blueprint
// Topics are learned in order, from top to bottom.
// After learning a topic: set done: true, then fill in learnedOn, summary, points and code.
// It then gets a ✓ in the sidebar and its page shows the notes.

export type Topic = {
  slug: string;
  title: string;
  // One line: what this topic teaches. Shown before we start it.
  about: string;
  done: boolean;
  learnedOn?: string;
  summary?: string;
  points?: string[];
  code?: { file: string; code: string; explain: string }[];
};

export type Stage = {
  name: string;
  goal: string;
  topics: Topic[];
};

export const blueprint: Stage[] = [
  {
    name: "Stage 1 · Basics",
    goal: "Build simple pages, connect them and make them look good.",
    topics: [
      { slug: "pages", title: "Pages", about: "How folders and page.tsx files turn into URLs in your app.", done: false },
      { slug: "root-layout", title: "Root Layout", about: "The shared frame (header, footer) that wraps every page.", done: false },
      { slug: "linking", title: "Linking Between Pages", about: "Moving between pages instantly with the <Link> component.", done: false },
      { slug: "css-tailwind", title: "CSS & Tailwind", about: "Styling with Tailwind classes: colors, spacing, layout and dark mode.", done: false },
      { slug: "fonts", title: "Fonts", about: "Loading Google or local fonts quickly with next/font.", done: false },
      { slug: "images", title: "Images", about: "Showing optimized, responsive images with next/image.", done: false },
    ],
  },
  {
    name: "Stage 2 · Routing",
    goal: "Organize many pages and handle loading, errors and missing pages.",
    topics: [
      { slug: "nested-routes", title: "Nested Routes & Layouts", about: "Folders inside folders, and layouts for just one section.", done: false },
      { slug: "dynamic-routes", title: "Dynamic Routes", about: "One [id] page that works for many items, like /products/42.", done: false },
      { slug: "not-found", title: "Not Found Page", about: "A custom 404 page, and showing it with notFound().", done: false },
      { slug: "loading-ui", title: "Loading UI", about: "Showing a loading state with loading.tsx while a page gets ready.", done: false },
      { slug: "error-handling", title: "Error Handling", about: "Catching errors with error.tsx so one failure doesn't break the app.", done: false },
    ],
  },
  {
    name: "Stage 3 · React in Next.js",
    goal: "Understand where code runs, and make pages interactive.",
    topics: [
      { slug: "server-client", title: "Server vs Client Components", about: "What runs on the server, what runs in the browser, and 'use client'.", done: false },
      { slug: "state-events", title: "State & Events", about: "Buttons, inputs and counters with useState and onClick.", done: false },
      { slug: "props", title: "Props", about: "Passing data into components to make them reusable.", done: false },
    ],
  },
  {
    name: "Stage 4 · Data",
    goal: "Load, save and cache real data.",
    topics: [
      { slug: "fetching-data", title: "Fetching Data", about: "Getting data from an API or database inside a page.", done: false },
      { slug: "server-actions", title: "Forms & Server Actions", about: "Submitting forms and saving data without writing an API.", done: false },
      { slug: "caching", title: "Caching & Revalidating", about: "Keeping pages fast with 'use cache' and refreshing stale data.", done: false },
      { slug: "route-handlers", title: "Route Handlers (API)", about: "Building your own API endpoints with route.ts.", done: false },
    ],
  },
  {
    name: "Stage 5 · Finishing",
    goal: "Get the app ready for real users.",
    topics: [
      { slug: "metadata", title: "Metadata & SEO", about: "Page titles, descriptions and share images for Google and social media.", done: false },
      { slug: "env-variables", title: "Environment Variables", about: "Keeping secrets like API keys out of your code with .env files.", done: false },
      { slug: "proxy", title: "Proxy", about: "Running code before a request, for example redirects or checking login.", done: false },
      { slug: "deploy", title: "Build & Deploy", about: "Building for production and putting the app online.", done: false },
    ],
  },
];

export const allTopics = blueprint.flatMap((stage) => stage.topics);
export const learnedTopics = allTopics.filter((t) => t.done);
export const nextTopic = allTopics.find((t) => !t.done);

export function getTopic(slug: string) {
  return allTopics.find((t) => t.slug === slug);
}

export function getStageName(slug: string) {
  return blueprint.find((stage) => stage.topics.some((t) => t.slug === slug))?.name;
}
