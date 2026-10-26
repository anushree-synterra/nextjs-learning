import Link from "next/link";

export default function Team() {
  return (
    <main>
      <Link href="/about">← Back to About</Link>
      <h1>Team</h1>
      <p>We are a small team of passionate developers.</p>
      <div>
        <p>Team Members:</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row ">
          <div className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-lg transition hover:border-sky-500 hover:bg-zinc-800">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-zinc-400">Frontend Developer</p>
          </div>
          <div className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-lg transition hover:border-sky-500 hover:bg-zinc-800">
            <p className="font-semibold">Jane Smith</p>
            <p className="text-sm text-zinc-400">Backend Developer</p>
          </div>
          <div className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-lg transition hover:border-sky-500 hover:bg-zinc-800">
            <p className="font-semibold">Alice Johnson</p>
            <p className="text-sm text-zinc-400">Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </main>
  );
}
