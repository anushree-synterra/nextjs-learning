import Link from "next/link";

export default function Bags() {
  return (
    <main>
      <Link href="/shop">← Back to Shop</Link>
      <h1>Bags collection 👜</h1>
      <p>
        Do you want to see our latest shoes?{" "}
        <Link href="/shop/shoes">View Shoes →</Link>
      </p>
    </main>
  );
}
