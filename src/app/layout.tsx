import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Learning",
  description: "Learning Next.js one topic at a time",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 font-sans text-zinc-200 [color-scheme:dark]">
        <header className="sticky top-0 z-10 flex h-12 items-center gap-6 border-b border-zinc-800 bg-zinc-950 px-4 text-sm">
          <Link href="/topics" className="text-zinc-100 hover:text-white">
            Topics Covered
          </Link>
          <Link href="/" className="font-semibold text-zinc-100">
            Next.js Learning
          </Link>
          <nav className="ml-auto flex gap-4 text-zinc-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/profile" className="hover:text-white">
              Profile
            </Link>
            <Link href="/shop" className="hover:text-white">
              Shop
            </Link>
          </nav>
        </header>
        {children}
        <footer className="flex h-12 items-center justify-center border-t border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-400">
          <p>Made by Anushree while learning Next.js 🚀</p>
        </footer>
      </body>
    </html>
  );
}
