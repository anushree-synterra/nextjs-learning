import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1> Welcome to my website.</h1>
      <p className="text-lg font-semibold mt-4">Quick links</p>

      <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <ul className="pl-5 list-disc">
          <li>
            <Link className="text-sky-400 hover:text-white" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="text-sky-400 hover:text-white" href="/about/team">
              Team
            </Link>
          </li>
          <li>
            <Link className="text-sky-400 hover:text-white" href="/shop/shoes">
              Shoes
            </Link>
          </li>
          <li>
            <Link className="text-sky-400 hover:text-white" href="/shop/bags">
              Bags
            </Link>
          </li>
          <li>
            <Link className="text-sky-400 hover:text-white" href="/shop">
              Shop
            </Link>
          </li>
          <li>
            <Link className="text-sky-400 hover:text-white" href="/help/faq">
              FAQ
            </Link>
          </li>
          <li>
            <Link className="text-sky-400 hover:text-white" href="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="text-sky-400 hover:text-white" href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
