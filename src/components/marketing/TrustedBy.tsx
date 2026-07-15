const APPS = ["Notion", "Google Sheets", "Airtable", "Miro"];

export function TrustedBy() {
  return (
    <section className="border-b border-border-c bg-surface/50 py-10">
      <div className="container-lm text-center">
        <p className="text-sm text-muted">
          Trusted by marketers, founders & creators. Exports straight into the tools you already use
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-semibold text-foreground/70">
          {APPS.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
