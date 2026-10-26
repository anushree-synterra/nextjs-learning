import Link from "next/link";

export default function About() {
  return (
    <main>
      <h1>Hi, I am Anushree 👋</h1>
      <Link
        className="rounded-lg border border-sky-500 bg-sky-600 px-4 py-2 text-white hover:text-sky-500 hover:bg-zinc-900 transition inline-block mt-4"
        href="/about/team"
      >
        Meet the team
      </Link>
    </main>
  );
}
