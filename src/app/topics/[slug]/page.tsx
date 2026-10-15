import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <article>
      <p className="text-sm text-zinc-200">{getStageName(slug)}</p>
      <h1 className="mt-1 text-3xl font-bold text-zinc-100">{topic.title}</h1>
      <p className="mt-1 text-sm text-zinc-200">Learned on {topic.learnedOn}</p>

      <h2 className="mt-10 border-b border-zinc-800 pb-1 text-xl font-semibold text-zinc-100">What we learned</h2>
      <p className="mt-3 leading-7 text-zinc-200">{topic.summary}</p>

      <h2 className="mt-10 border-b border-zinc-800 pb-1 text-xl font-semibold text-zinc-100">Key points</h2>
      <ul className="mt-3 list-disc space-y-1 pl-6 text-zinc-200">
        {topic.points?.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <h2 className="mt-10 border-b border-zinc-800 pb-1 text-xl font-semibold text-zinc-100">Code we used</h2>
      {topic.code?.map((sample) => (
        <div key={sample.file} className="mt-4">
          <p className="rounded-t border border-b-0 border-zinc-800 bg-zinc-800 px-4 py-1.5 font-mono text-xs text-zinc-200">{sample.file}</p>
          <pre className="overflow-x-auto rounded-b border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-200">{sample.code}</pre>
          <p className="mt-2 text-sm text-zinc-200">💡 {sample.explain}</p>
        </div>
      ))}

      <TopicNav prev={prev} next={next} />
    </article>
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
