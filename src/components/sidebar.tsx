import Link from "next/link";
import { blueprint } from "@/learning/topics";

// Lists the blueprint. `active` is the slug of the topic being viewed.
// Not-started topics: dashed empty circle + dimmer text. Learned topics: green check + bright text.
export function Sidebar({ active }: { active?: string }) {
  let number = 0;

  return (
    <nav>
      <div className="mb-6 flex gap-4 px-3 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <EmptyIcon /> Not started
        </span>
        <span className="flex items-center gap-1.5">
          <DoneIcon /> Learned
        </span>
      </div>

      <div className="space-y-7">
        {blueprint.map((stage) => (
          <div key={stage.name}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">{stage.name}</p>
            <ul className="space-y-0.5">
              {stage.topics.map((topic) => {
                number++;
                const isActive = active === topic.slug;
                return (
                  <li key={topic.slug}>
                    <Link
                      href={`/topics/${topic.slug}`}
                      title={topic.done ? "Learned" : "Not started yet"}
                      className={`group flex items-center gap-3 rounded-md border-l-2 px-3 py-1.5 text-sm transition-all duration-200 ease-out ${
                        isActive
                          ? "translate-x-1 border-sky-400 bg-zinc-800 text-white"
                          : `border-transparent hover:translate-x-1 hover:border-zinc-500 hover:bg-zinc-800/60 hover:text-white ${
                              topic.done ? "text-zinc-100" : "text-zinc-400"
                            }`
                      }`}
                    >
                      {topic.done ? <DoneIcon /> : <EmptyIcon />}
                      <span className="w-5 font-mono text-xs tabular-nums text-zinc-600 transition-colors group-hover:text-zinc-400">
                        {String(number).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{topic.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

function EmptyIcon() {
  return <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-dashed border-zinc-500" />;
}

function DoneIcon() {
  return (
    <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-emerald-500 text-[9px] font-bold text-zinc-950">
      ✓
    </span>
  );
}
