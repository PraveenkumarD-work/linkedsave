const TESTIMONIALS = [
  {
    quote:
      "PostVault made it extremely simple to organize and export dozens of LinkedIn posts for a freelance project, saving me easily hours of work. Happy to support a product that does what it says without muss, without fuss, and without ads.",
    name: "Laura",
    role: "Marketing Consultant",
  },
  {
    quote:
      "I just discovered PostVault, and I love it! Thank you, thank you, thank you! I sync it to Notion and it's a beautiful thing.",
    name: "Michael P.",
    role: "AI Trainer & Consultant",
  },
  {
    quote:
      "I bookmark a lot of LinkedIn posts for referencing later but they always used to get lost and I would never revisit them. After using PostVault I can revisit my saved bookmarks just by using a word I remember.",
    name: "Geet Parmar",
    role: "Webflow Developer",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border-c py-20">
      <div className="container-lm">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Loved by readers</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            The way you consume LinkedIn, changed
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-lm flex flex-col p-6">
              <p className="flex-1 text-sm leading-6 text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                  {t.name[0]}
                </span>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
