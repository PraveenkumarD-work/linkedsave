"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ROTATING = ["a searchable library", "a Notion database", "a Google Sheet"];

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="gradient-hero border-b border-border-c">
      <div className="container-lm flex flex-col items-center pt-20 pb-16 text-center">
        <span className="badge-pill">
          <span className="text-amber-500">★★★★★</span>
          4.9/5 · loved by 5,000+ curators
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Turn your LinkedIn saved posts into
          <br />
          <span className="text-brand transition-all">{ROTATING[idx]}</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg text-muted">
          Import your LinkedIn saved posts into a searchable library that auto-syncs to Notion,
          Sheets & Airtable, media and all. For you and your AI agents, over MCP & API. Compose and
          schedule posts when you&apos;re ready.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark transition-colors"
          >
            Import your Saved Posts
          </Link>
          <a
            href="#agents"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border-c bg-white px-7 text-sm font-semibold hover:bg-surface transition-colors"
          >
            For AI agents
          </a>
        </div>

        <div className="mt-16 w-full max-w-5xl">
          <div className="card-lm overflow-hidden text-left">
            <div className="flex items-center gap-2 border-b border-border-c px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-300" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-300" />
              <div className="ml-4 flex-1 rounded-md bg-surface px-3 py-1 text-xs text-muted">
                Search… ⌘K
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
              <aside className="hidden border-r border-border-c bg-surface/60 p-4 text-xs font-medium text-muted sm:block">
                <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-muted/70">
                  Curation
                </p>
                <div className="rounded-md bg-white px-2 py-1.5 text-foreground shadow-sm">
                  All Bookmarks <span className="float-right text-muted">842</span>
                </div>
                <div className="px-2 py-1.5">Labels</div>
                <div className="px-2 py-1.5">Archive</div>
                <p className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wide text-muted/70">
                  Creation Studio
                </p>
                <div className="px-2 py-1.5">Composer</div>
                <div className="px-2 py-1.5">Schedule</div>
                <div className="px-2 py-1.5">Analytics</div>
              </aside>
              <div className="divide-y divide-border-c">
                {[
                  {
                    i: "AR",
                    n: "Alex Rivera",
                    t: "Founder, Northwind · Jun 11",
                    c: "The cold outreach playbook that booked us 40 demos last month — steal the exact framework…",
                  },
                  {
                    i: "MK",
                    n: "Maya Kapoor",
                    t: "Design Lead · Jun 4",
                    c: "Portfolio teardown: 5 patterns that got designers hired this year…",
                  },
                  {
                    i: "JT",
                    n: "Jordan Tan",
                    t: "Writer & Creator · May 28",
                    c: "A thread on writing hooks that stop the scroll. Saved for the next launch announcement.",
                  },
                  {
                    i: "SL",
                    n: "Sam Lee",
                    t: "Product Manager · May 21",
                    c: "Launch checklist template — everything we run before shipping to production.",
                  },
                ].map((p) => (
                  <div key={p.i} className="flex gap-3 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                      {p.i}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {p.n} <span className="font-normal text-muted">· {p.t}</span>
                      </p>
                      <p className="mt-0.5 truncate text-sm text-muted">{p.c}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
