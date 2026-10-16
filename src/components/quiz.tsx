"use client";

import { useState } from "react";
import type { Mcq } from "@/learning/topics";

// Multiple-choice quiz: click an option to see if it's right.
export function Quiz({ mcqs }: { mcqs: Mcq[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const answered = Object.keys(picked).length;
  const correct = mcqs.filter((q, i) => picked[i] === q.answer).length;

  return (
    <div>
      <ol className="space-y-5">
        {mcqs.map((q, i) => {
          const choice = picked[i];
          const done = choice !== undefined;
          return (
            <li key={q.question} className="rounded-lg border border-zinc-800 p-4">
              <p className="text-zinc-100">
                <span className="mr-2 text-zinc-500">{i + 1}.</span>
                {q.question}
              </p>
              <div className="mt-3 grid gap-2">
                {q.options.map((option, o) => {
                  let style = "border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900";
                  if (done && o === q.answer) style = "border-emerald-600/70 bg-emerald-500/10 text-emerald-200";
                  else if (done && o === choice) style = "border-rose-600/70 bg-rose-500/10 text-rose-200";
                  else if (done) style = "border-zinc-800 opacity-60";
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={done}
                      onClick={() => setPicked({ ...picked, [i]: o })}
                      className={`rounded-md border px-3 py-2 text-left font-mono text-sm text-zinc-300 transition ${style}`}
                    >
                      <span className="mr-2 text-zinc-500">{"ABCD"[o]}.</span>
                      {option}
                    </button>
                  );
                })}
              </div>
              {done && (
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {choice === q.answer ? "✅ Correct! " : "❌ Not quite. "}
                  <span className="text-zinc-400">{q.explain}</span>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm">
        <p className="text-zinc-300">
          Score: <span className="font-semibold text-zinc-100">{correct}</span> / {mcqs.length}
          {answered === mcqs.length && (
            <span className="ml-2 text-zinc-400">
              {correct === mcqs.length ? "🏆 Perfect, you remember it all!" : "Read the notes above again and retry."}
            </span>
          )}
        </p>
        {answered > 0 && (
          <button type="button" onClick={() => setPicked({})} className="text-sky-400 hover:text-sky-300">
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
