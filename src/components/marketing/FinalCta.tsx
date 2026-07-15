import Link from "next/link";

export function FinalCta() {
  return (
    <section className="border-b border-border-c bg-foreground py-20 text-white">
      <div className="container-lm text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
          Get started in 60 seconds
        </p>
        <h2 className="mx-auto mt-2 max-w-xl text-3xl font-semibold tracking-tight">
          Build your information consumption workflow from saved posts
        </h2>
        <Link
          href="/signup"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark transition-colors"
        >
          Import your Saved Posts
        </Link>
      </div>
    </section>
  );
}
