export function Assistant() {
  return (
    <section className="border-b border-border-c bg-surface/50 py-20">
      <div className="container-lm grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Your Assistant</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Meet Vera — your LinkedIn growth assistant
          </h2>
          <p className="mt-3 text-muted leading-6">
            Vera lives inside PostVault and turns your library into output. Ask her to draft a post
            from your saves, in your own voice — and when you don&apos;t ask, she still shows up
            with what&apos;s worth doing next.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[
              "Ask anything across your saves — answers with citations",
              "Drafts grounded in your library, written in your voice",
              "Learns you from your own posts — positioning, pillars, audience",
              "Proactive next steps: unread gems, follow-ups, an empty queue filled",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-0.5 text-brand">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-lm p-5">
          <div className="flex items-center gap-2 border-b border-border-c pb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
              V
            </span>
            <div>
              <p className="text-sm font-medium">Vera</p>
              <p className="text-xs text-muted">Voice: yours</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2.5 text-sm text-white">
              Draft a post from my saves on employee-led content.
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border-c bg-surface px-4 py-2.5 text-sm">
              We tested employee-led posts for 2 weeks. No brand account came close. Here&apos;s the
              experiment and the numbers…
              <p className="mt-2 text-[11px] text-muted">◆ Grounded in 4 saved posts · written in your voice</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-border-c p-3 text-xs text-muted">
            What&apos;s next: 3 unread saves worth your time this week. Your queue is empty — draft
            from Tuesday&apos;s winner.
          </div>
        </div>
      </div>
    </section>
  );
}
