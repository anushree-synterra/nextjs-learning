import Link from "next/link";

export default function Shop() {
  return (
    <main>
      <h1>All products</h1>
      <Link href="/shop/shoes">👟 See shoes</Link>
      <br />
      <Link href="/shop/bags">👜 See bags</Link>
    </main>
  );
}
