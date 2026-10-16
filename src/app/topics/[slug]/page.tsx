import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserOutput, CodeBlock, NoteBlock, Rich } from "@/components/notes";
import { Quiz } from "@/components/quiz";
import { allTopics, getStageName, getTopic, type Topic } from "@/learning/topics";

export function generateStaticParams() {
  return allTopics.map((topic) => ({ slug: topic.slug }));
}

export default async function TopicPage({ params }: PageProps<"/topics/[slug]">) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const index = allTopics.indexOf(topic);
  const prev = allTopics[index - 1];
  const next = allTopics[index + 1];

  if (!topic.done) {
    return (
      <article>
        <p className="text-sm text-zinc-400">
          {getStageName(slug)} · Topic {index + 1} of {allTopics.length}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-100">{topic.title}</h1>
        <div className="mt-10 rounded-lg border border-dashed border-zinc-700 px-6 py-12 text-center">
          <p className="text-zinc-200">Not started yet</p>
          <p className="mt-1 text-sm text-zinc-400">
            Notes, code and a summary will appear here once we learn this topic.
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm text-zinc-300">
            <span className="text-zinc-500">What you&apos;ll learn:</span> {topic.about}
          </p>
        </div>
        <TopicNav prev={prev} next={next} />
      </article>
    );
  }

  const notes = topic.notes;
  if (!notes) notFound();

  return (
    <article className="pb-6">
      <p className="text-sm text-zinc-400">
        {getStageName(slug)} · Topic {index + 1} of {allTopics.length}
      </p>
      <h1 className="mt-1 text-3xl font-bold text-zinc-100">{topic.title}</h1>
      <p className="mt-2 text-sm text-emerald-400">✓ Learned on {notes.learnedOn}</p>

      <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">In one line</p>
        <p className="mt-1 leading-7 text-zinc-200">{notes.summary}</p>
      </div>

      <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {parts.map((part) => (
          <a key={part.id} href={`#${part.id}`} className="text-sky-400 hover:text-sky-300">
            {part.title}
          </a>
        ))}
      </nav>

      {/* Part 1 · Theory */}
      <PartHeading id="theory" />
      <div className="space-y-10">
        {notes.theory.map((section, i) => (
          <section key={section.title}>
            <h3 className="text-lg font-semibold text-zinc-100">
              <span className="mr-2 text-zinc-500">{i + 1}.</span>
              {section.title}
            </h3>
            <div className="mt-3 space-y-4">
              {section.blocks.map((block, b) => (
                <NoteBlock key={b} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Part 2 · Practical */}
      <PartHeading id="practical" />
      <p className="leading-7 text-zinc-300">The challenges we solved, from easiest to hardest: the code we wrote and what the browser showed.</p>
      <div className="mt-6 space-y-10">
        {notes.challenges.map((c) => (
          <section key={c.level}>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Level {c.level}</p>
            <h3 className="text-lg font-semibold text-zinc-100">{c.title}</h3>
            <p className="mt-1 text-zinc-300">{c.task}</p>
            <div className="mt-4 grid gap-4">
              <CodeBlock file={c.file} code={c.code} />
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">Output</p>
                <div className="grid gap-3">
                  {c.output.map((o) => (
                    <BrowserOutput key={o.url} url={o.url} view={o.view} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              <span className="text-zinc-500">What this taught us:</span> {c.learned}
            </p>
          </section>
        ))}
      </div>

      {/* Key points */}
      <PartHeading id="key-points" />
      <ul className="space-y-2">
        {notes.keyPoints.map((point) => (
          <li key={point} className="flex gap-3 leading-7 text-zinc-300">
            <span className="text-emerald-400">✓</span>
            <span>
              <Rich text={point} />
            </span>
          </li>
        ))}
      </ul>

      {/* Common mistakes */}
      <PartHeading id="mistakes" />
      <div className="space-y-3">
        {notes.mistakes.map((m) => (
          <div key={m.wrong} className="rounded-lg border border-zinc-800 p-4 text-sm">
            <p className="font-mono text-rose-300">❌ {m.wrong}</p>
            <p className="mt-1 font-mono text-emerald-300">✅ {m.right}</p>
            <p className="mt-2 text-zinc-400">{m.why}</p>
          </div>
        ))}
      </div>

      {/* Revision quiz */}
      <PartHeading id="quiz" />
      <p className="leading-7 text-zinc-300">
        Come back later and test yourself. Answer each question in your head first, then open it to check.
      </p>
      <h3 className="mt-6 text-lg font-semibold text-zinc-100">Short questions</h3>
      <div className="mt-3 space-y-2">
        {notes.questions.map((q, i) => (
          <details key={q.question} className="group rounded-lg border border-zinc-800 px-4 py-3">
            <summary className="cursor-pointer list-none text-zinc-200 marker:hidden">
              <span className="mr-2 text-zinc-500">Q{i + 1}.</span>
              <Rich text={q.question} />
              <span className="ml-2 text-xs text-sky-400 group-open:hidden">Show answer</span>
            </summary>
            <p className="mt-2 border-t border-zinc-800 pt-2 text-sm leading-6 text-emerald-300">{q.answer}</p>
          </details>
        ))}
      </div>
      <h3 className="mt-10 text-lg font-semibold text-zinc-100">Multiple choice</h3>
      <p className="mt-1 text-sm text-zinc-400">Click an answer. You&apos;ll see right away if it&apos;s correct.</p>
      <div className="mt-4">
        <Quiz mcqs={notes.mcqs} />
      </div>

      <TopicNav prev={prev} next={next} />
    </article>
  );
}

const parts = [
  { id: "theory", title: "1 · Theory" },
  { id: "practical", title: "2 · Practical" },
  { id: "key-points", title: "3 · Key points" },
  { id: "mistakes", title: "4 · Common mistakes" },
  { id: "quiz", title: "5 · Revision quiz" },
];

function PartHeading({ id }: { id: string }) {
  const part = parts.find((p) => p.id === id);
  return (
    <h2 id={id} className="mb-6 mt-16 scroll-mt-16 border-b border-zinc-800 pb-2 text-2xl font-semibold text-zinc-100">
      {part?.title}
    </h2>
  );
}

function TopicNav({ prev, next }: { prev?: Topic; next?: Topic }) {
  return (
    <div className="mt-14 flex justify-between border-t border-zinc-800 pt-4 text-sm">
      {prev ? (
        <Link href={`/topics/${prev.slug}`} className="text-sky-400 transition hover:-translate-x-0.5 hover:text-sky-300">
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={`/topics/${next.slug}`} className="text-sky-400 transition hover:translate-x-0.5 hover:text-sky-300">
          {next.title} →
        </Link>
      )}
    </div>
  );
}
