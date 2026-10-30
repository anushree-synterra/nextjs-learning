import Link from "next/link";

export default function Shop() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-sky-400 font-fancy">
        All products
      </h1>

      <div className="mt-6 flex gap-4 flex-col md:flex-row">
        <Link
          href="/shop/shoes"
          className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-lg transition hover:border-sky-500 hover:bg-zinc-800"
        >
          👟 See shoes
        </Link>
        <Link
          href="/shop/bags"
          className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-lg transition  hover:border-sky-500 hover:bg-zinc-800"
        >
          👜 See bags
        </Link>
      </div>
    </main>
  );
}
