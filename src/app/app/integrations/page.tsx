const INTEGRATIONS = [
  {
    name: "Notion",
    blocked: "Needs a Notion internal integration token (Notion → My Integrations → New integration).",
  },
  {
    name: "Google Sheets",
    blocked: "Needs a Google Cloud OAuth client with the Sheets API enabled.",
  },
  {
    name: "Airtable",
    blocked: "Needs an Airtable personal access token with data.records:write scope.",
  },
  {
    name: "LinkedIn (publish & schedule)",
    blocked: "Needs a LinkedIn Developer App with the Share on LinkedIn product added.",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-xl font-semibold">Sync to Apps</h1>
      <p className="text-sm text-muted">
        Auto-export your library to the tools you already use. Each integration turns on as soon as
        its credential is added.
      </p>

      <div className="mt-6 space-y-3">
        {INTEGRATIONS.map((i) => (
          <div key={i.name} className="rounded-xl border border-border-c p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{i.name}</span>
              <span className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
                Not connected
              </span>
            </div>
            <p className="mt-1.5 text-xs text-muted">{i.blocked}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
