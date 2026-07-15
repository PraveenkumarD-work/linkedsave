"use client";

import { signOut } from "@/app/auth/actions";

export function Topbar({ email }: { email: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-c px-4">
      <div className="flex items-center gap-2 rounded-lg border border-border-c bg-surface px-3 py-1.5 text-sm text-muted w-full max-w-xs">
        <span>⌘K</span>
        <span>Search everything…</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted hidden sm:inline">{email}</span>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-border-c px-3 py-1.5 text-xs font-medium hover:bg-surface transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
