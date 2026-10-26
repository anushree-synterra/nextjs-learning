export default function Profile() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-sky-400">My profile</h1>
      <p className="mt-2 text-lg text-zinc-300">Name: Anushree</p>
      <p className="mt-2 text-lg text-zinc-300">I am learning: Next.js</p>
      <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <p className="text-sm font-semibold text-emerald-400">My hobbies</p>
        <ul className="mt-2 list-disc pl-5 text-zinc-300">
          <li>Reading</li>
          <li>Music</li>
          <li>Coding</li>
        </ul>
      </div>
    </main>
  );
}
