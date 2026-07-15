"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-c/70 bg-white/80 backdrop-blur">
      <div className="container-lm flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[17px]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold">
            P
          </span>
          PostVault
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-sm font-semibold text-white hover:bg-black/80 transition-colors"
          >
            Add to Chrome
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-c"
          aria-label="Toggle menu"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border-c bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-white"
            >
              Add to Chrome
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
