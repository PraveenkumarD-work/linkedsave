import type { ReactNode } from "react";

export function FeatureRow({
  eyebrow,
  title,
  description,
  bullets,
  visual,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`grid items-center gap-10 py-16 md:grid-cols-2 ${reverse ? "" : ""}`}>
      <div className={reverse ? "md:order-2" : ""}>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
        <p className="mt-3 text-muted leading-6">{description}</p>
        <ul className="mt-5 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-brand">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={reverse ? "md:order-1" : ""}>{visual}</div>
    </div>
  );
}
