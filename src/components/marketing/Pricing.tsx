"use client";

import Link from "next/link";
import { useState } from "react";

const PLANS = [
  {
    name: "Reader",
    tag: "Save, organize and search your LinkedIn posts.",
    monthly: 7,
    annualBilled: 84,
    cta: "Get Reader Plan",
    features: [
      "Unlimited saved posts",
      "Labels, Smart Views & AI search",
      "Sync to Notion, Sheets, Airtable & Miro",
      "AI Assistant over your library",
      "PDF export",
    ],
  },
  {
    name: "Creator",
    tag: "Everything in Reader, plus the content studio.",
    monthly: 10,
    annualBilled: 120,
    cta: "Get Creator Plan",
    highlight: "Most popular",
    features: [
      "Everything in Reader",
      "Composer: draft posts from your saves",
      "Scheduler: queue & auto-publish to LinkedIn",
      "Analytics: reach, engagement & growth",
      "Developer API + MCP (Claude · ChatGPT · Cursor)",
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="border-b border-border-c bg-surface/50 py-20">
      <div className="container-lm">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Pricing</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Simple plans, cancel anytime</h2>
          <p className="mt-3 text-muted">Start free. Upgrade when your library outgrows the basics.</p>

          <div className="mt-6 inline-flex items-center rounded-full border border-border-c bg-white p-1 text-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${!annual ? "bg-foreground text-white" : "text-muted"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${annual ? "bg-foreground text-white" : "text-muted"}`}
            >
              Annual · save up to 30%
            </button>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {PLANS.map((p) => (
            <div key={p.name} className={`card-lm relative flex flex-col p-7 ${p.highlight ? "border-brand ring-1 ring-brand" : ""}`}>
              {p.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">
                  {p.highlight}
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.tag}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-semibold">${annual ? p.monthly : Math.ceil(p.monthly * 1.3)}</span>
                <span className="text-sm text-muted">/mo</span>
              </div>
              <p className="text-xs text-muted">
                {annual ? `Billed $${p.annualBilled}/year` : "Billed monthly"}
              </p>
              <Link
                href="/signup"
                className={`mt-5 inline-flex h-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  p.highlight ? "bg-brand text-white hover:bg-brand-dark" : "border border-border-c hover:bg-surface"
                }`}
              >
                {p.cta}
              </Link>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
