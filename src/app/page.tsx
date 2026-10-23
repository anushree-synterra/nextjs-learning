import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1> Welcome to my website.</h1>
      <p>Quick links</p>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/about/team">Team</Link>
        </li>
        <li>
          <Link href="/shop/shoes">Shoes</Link>
        </li>
        <li>
          <Link href="/shop/bags">Bags</Link>
        </li>
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/help/faq">FAQ</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </main>
  );
}
