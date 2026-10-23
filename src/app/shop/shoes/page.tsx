import Link from "next/link";

export default function Shoes() {
  return (
    <main>
      <Link href="/shop">← Back to Shop</Link>
      <h1>Shoes Collection 👟</h1>
      <p>
        Do you want to see our latest bags?{" "}
        <Link href="/shop/bags">View Bags →</Link>
      </p>
    </main>
  );
}
