"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";

// Reads the URL so the sidebar can highlight the topic being viewed.
export function ActiveSidebar() {
  const pathname = usePathname();
  const active = pathname.split("/")[2];
  return <Sidebar active={active} />;
}
