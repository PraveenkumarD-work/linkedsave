"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Can I try it for free?",
    a: "Yes — sign up and import your saved posts to explore the library, search, and labels before choosing a plan.",
  },
  {
    q: "Can I use it from my mobile?",
    a: "The web app is responsive and works on mobile browsers. The Chrome extension (for capturing saved posts) is desktop-only, matching where you browse LinkedIn.",
  },
  {
    q: "What if I'm unsatisfied with the product after purchase?",
    a: "Reach out to support and we'll sort out a refund within the first 14 days, no questions asked.",
  },
  {
    q: "Can I try exports to Notion/Google Sheets before purchase?",
    a: "Yes, sync is available on the free tier with a limited number of rows so you can confirm it fits your workflow.",
  },
  {
    q: "How do I reach you if I have a feature request or more questions?",
    a: "Use the in-app chat or email support — we read everything and reply personally.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-b border-border-c py-20">
      <div className="container-lm mx-auto max-w-2xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
        <div className="mt-10 divide-y divide-border-c border-y border-border-c">
          {ITEMS.map((item, i) => (
            <div key={item.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium"
              >
                {item.q}
                <span className="ml-4 text-muted">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p className="pb-4 text-sm text-muted leading-6">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
