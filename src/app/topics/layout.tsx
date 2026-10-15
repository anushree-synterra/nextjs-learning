import Link from "next/link";
import { Suspense } from "react";
import { ActiveSidebar } from "@/components/active-sidebar";
import { Sidebar } from "@/components/sidebar";

export default function TopicsLayout({ children }: LayoutProps<"/topics">) {
  return (
    <div className="flex flex-col md:flex-row">
      <aside className="border-b border-zinc-800 bg-zinc-900 p-4 md:sticky md:top-12 md:h-[calc(100vh-3rem)] md:w-72 md:shrink-0 md:overflow-y-auto md:border-b-0 md:border-r">
        <Link
          href="/"
          className="group mb-6 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800/60 hover:text-white"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Back to Home
        </Link>
        {/* usePathname needs Suspense when cacheComponents is on. The fallback is the same list without a highlight. */}
        <Suspense fallback={<Sidebar />}>
          <ActiveSidebar />
        </Suspense>
      </aside>
      <main className="min-w-0 flex-1 px-6 py-10 md:px-12">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
