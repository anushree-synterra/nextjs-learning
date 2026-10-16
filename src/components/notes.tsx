import type { Block, OutputView } from "@/learning/topics";

// Turns **bold** and `code` inside a sentence into styled text.
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-zinc-50">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[0.85em] text-sky-300">
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}

export function CodeBlock({ code, file, mark }: { code: string; file?: string; mark?: "good" | "bad" }) {
  const label = mark === "bad" ? "❌ Wrong" : mark === "good" ? "✅ Right" : file;
  const border = mark === "bad" ? "border-rose-900/70" : mark === "good" ? "border-emerald-900/70" : "border-zinc-800";
  return (
    <div className={`overflow-hidden rounded-lg border ${border}`}>
      {label && <p className="border-b border-inherit bg-zinc-900 px-4 py-1.5 font-mono text-xs text-zinc-300">{label}</p>}
      <pre className="overflow-x-auto bg-zinc-900/60 p-4 font-mono text-sm leading-6 text-zinc-200">{code}</pre>
    </div>
  );
}

// A small browser window showing what the page looks like.
export function BrowserOutput({ url, view }: { url: string; view: OutputView }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800">
      <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </span>
        <span className="flex-1 truncate rounded bg-zinc-950 px-3 py-1 font-mono text-xs text-zinc-400">{url}</span>
      </div>
      <div className="min-h-16 bg-zinc-950 px-5 py-4 text-sm leading-6 text-zinc-200">
        {view.notFound ? (
          <p className="py-4 text-center text-zinc-300">
            <span className="mr-3 border-r border-zinc-600 pr-3 font-semibold">404</span>
            This page could not be found.
          </p>
        ) : (
          <>
            {view.lines?.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {view.list?.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const callout = {
  tip: { icon: "💡", label: "Tip", style: "border-sky-500/60 bg-sky-500/5" },
  warn: { icon: "⚠️", label: "Watch out", style: "border-amber-500/60 bg-amber-500/5" },
  idea: { icon: "🏠", label: "Think of it like this", style: "border-violet-500/60 bg-violet-500/5" },
};

export function NoteBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <p className="leading-7 text-zinc-300">
          <Rich text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="list-disc space-y-1.5 pl-6 leading-7 text-zinc-300 marker:text-zinc-600">
          {block.items.map((item) => (
            <li key={item}>
              <Rich text={item} />
            </li>
          ))}
        </ul>
      );
    case "code":
      return <CodeBlock code={block.code} file={block.file} mark={block.mark} />;
    case "output":
      return <BrowserOutput url={block.url} view={block.view} />;
    case "callout": {
      const c = callout[block.tone];
      return (
        <div className={`rounded-r-lg border-l-2 px-4 py-3 ${c.style}`}>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            {c.icon} {c.label}
          </p>
          <p className="mt-1 leading-7 text-zinc-300">
            <Rich text={block.text} />
          </p>
        </div>
      );
    }
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 text-zinc-300">
              <tr>
                {block.head.map((h) => (
                  <th key={h} className="px-4 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {block.rows.map((row) => (
                <tr key={row.join()}>
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-2 align-top">
                      <Rich text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
