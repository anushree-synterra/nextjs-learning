import Link from "next/link";

export default function Bags() {
  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <Link className="text-sky-400 hover:text-white" href="/shop">
          ← Back to Shop
        </Link>
        <h1 className="text-2xl font-bold">Bags Collection 👜</h1>
      </div>
      <p>
        Do you want to see our latest shoes?{" "}
        <Link href="/shop/shoes">View Shoes →</Link>
      </p>
    </main>
  );
}
