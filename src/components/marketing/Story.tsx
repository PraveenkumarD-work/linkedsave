export function Story() {
  return (
    <section className="border-b border-border-c py-20">
      <div className="container-lm mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Why we built it</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Why we created PostVault</h2>
        <p className="mt-5 text-muted leading-7">
          Every bookmark is saved with a goal in mind: a long post to read later, a case study to
          extract insights, a launch checklist to find when needed. But over time, we realized we
          were bookmarking into a void, despite our best intentions. LinkedIn&apos;s saved-posts
          view isn&apos;t built for search, organization, or turning what you save into something
          you actually ship.
        </p>
        <p className="mt-4 text-muted leading-7">
          We built PostVault so your saves become a working library instead of a graveyard —
          searchable, labelled, synced to the tools you already use, and one click away from
          becoming your next post.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-brand/10 text-xs font-semibold text-brand">
              R
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-brand text-xs font-semibold text-white">
              K
            </span>
          </div>
          <p className="text-sm text-muted">Founders, PostVault</p>
        </div>
      </div>
    </section>
  );
}
