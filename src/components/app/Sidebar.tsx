"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const GROUPS = [
  {
    title: "Curation",
    items: [
      { label: "All Bookmarks", href: "/app" },
      { label: "Labels", href: "/app/labels" },
      { label: "Archive", href: "/app/archive" },
    ],
  },
  {
    title: "Creation Studio",
    items: [
      { label: "Composer", href: "/app/composer" },
      { label: "Schedule", href: "/app/schedule" },
      { label: "Analytics", href: "/app/analytics" },
    ],
  },
  {
    title: "Automations",
    items: [
      { label: "Sync to Apps", href: "/app/integrations" },
      { label: "Developer API", href: "/app/developer" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-border-c bg-surface/50 px-3 py-4 sm:flex">
      <Link href="/" className="mb-6 flex items-center gap-2 px-2 font-semibold">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold">
          P
        </span>
        PostVault
      </Link>

      {GROUPS.map((group) => (
        <div key={group.title} className="mb-4">
          <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted/70">
            {group.title}
          </p>
          <nav className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                    active ? "bg-white font-medium shadow-sm" : "text-muted hover:bg-white/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}

      <div className="mt-auto">
        <Link
          href="/app/settings"
          className={`block rounded-md px-2 py-1.5 text-sm text-muted hover:bg-white/70 ${
            pathname === "/app/settings" ? "bg-white font-medium shadow-sm" : ""
          }`}
        >
          Settings
        </Link>
      </div>
    </aside>
  );
}
