import Link from "next/link";
import { allTopics, blueprint, learnedTopics, nextTopic } from "@/learning/topics";

const steps = [
  { title: "Learn", text: "A short explanation of one topic, in plain words." },
  { title: "Build", text: "We write real code in this project and see it in the browser." },
  { title: "Practice", text: "You try a small change on your own." },
  { title: "Note", text: "We save what we learned and the code here. The topic gets a ✓." },
];

export default function TopicsPage() {
  const percent = Math.round((learnedTopics.length / allTopics.length) * 100);
  let number = 0;

  return (
    <div className="pb-10">
      <p className="text-sm text-zinc-400">Overview</p>
      <h1 className="mt-1 text-3xl font-bold text-zinc-100">Next.js Learning Blueprint</h1>
      <p className="mt-4 leading-7 text-zinc-300">
        <strong className="text-zinc-100">Next.js</strong> is a framework built on top of <strong className="text-zinc-100">React</strong>.
        React builds the pieces of a UI (components). Next.js adds what a full website needs: pages and URLs,
        loading data on the server, fast images and fonts, SEO and deployment. This blueprint is the path from your first
        page to an app that&apos;s online.
      </p>

      {/* Progress */}
      <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-zinc-100">Your progress</p>
          <p className="text-sm text-zinc-400">
            {learnedTopics.length} of {allTopics.length} topics · {percent}%
          </p>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-zinc-800">
          <div className="h-1.5 rounded-full bg-emerald-500 transition-all" style={{ width: `${percent}%` }} />
        </div>
        {nextTopic && (
          <Link
            href={`/topics/${nextTopic.slug}`}
            className="group mt-4 inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300"
          >
            {learnedTopics.length === 0 ? "Start with" : "Continue with"} {nextTopic.title}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>

      {/* How we learn */}
      <h2 className="mt-12 border-b border-zinc-800 pb-2 text-xl font-semibold text-zinc-100">How each topic works</h2>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-3 rounded-lg border border-zinc-800 p-4">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-800 text-xs text-zinc-300">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-zinc-100">{step.title}</p>
              <p className="mt-0.5 text-sm text-zinc-400">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Full roadmap */}
      <h2 className="mt-12 border-b border-zinc-800 pb-2 text-xl font-semibold text-zinc-100">The roadmap</h2>
      <div className="mt-6 space-y-8">
        {blueprint.map((stage) => {
          const done = stage.topics.filter((t) => t.done).length;
          return (
            <section key={stage.name}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold text-zinc-100">{stage.name}</h3>
                <span className="shrink-0 text-xs text-zinc-500">
                  {done}/{stage.topics.length}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-400">{stage.goal}</p>
              <ul className="mt-3 divide-y divide-zinc-800 rounded-lg border border-zinc-800">
                {stage.topics.map((topic) => {
                  number++;
                  return (
                    <li key={topic.slug}>
                      <Link
                        href={`/topics/${topic.slug}`}
                        className="group flex items-start gap-4 px-4 py-3 transition hover:bg-zinc-900"
                      >
                        <span className="mt-0.5 w-5 font-mono text-xs text-zinc-600">
                          {String(number).padStart(2, "0")}
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm text-zinc-100">{topic.title}</span>
                          <span className="block text-sm text-zinc-400">{topic.about}</span>
                        </span>
                        <span className={`mt-0.5 text-xs ${topic.done ? "text-emerald-400" : "text-zinc-500"}`}>
                          {topic.done ? "Learned" : "Not started"}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-12 text-sm text-zinc-500">
        Official docs for this exact Next.js version are on your computer at{" "}
        <code className="text-zinc-400">node_modules/next/dist/docs/</code>.
      </p>
    </div>
  );
}
