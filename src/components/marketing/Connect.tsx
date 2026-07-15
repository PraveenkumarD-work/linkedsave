const APPS = ["Notion", "Sheets", "Airtable", "Miro"];
const AGENTS = ["Claude", "ChatGPT", "Cursor", "Codex"];

export function Connect() {
  return (
    <>
      <section className="border-b border-border-c bg-surface/50 py-20">
        <div className="container-lm grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Connect</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Auto-export saved posts to Notion or Sheets
            </h2>
            <p className="mt-3 text-muted leading-6">
              PostVault auto-exports your saved content to Notion or Sheets, effortlessly
              integrating into your existing workflow. No more manual copying and pasting — with
              webhooks and the API, extend it to your favourite apps.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {APPS.map((a) => (
                <span key={a} className="badge-pill">{a}</span>
              ))}
            </div>
          </div>
          <div className="card-lm p-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-muted">
                  <th className="pb-2 font-medium">Post</th>
                  <th className="pb-2 font-medium">Label</th>
                  <th className="pb-2 font-medium">Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-c">
                {[
                  ["Cold outreach playbook", "startup", "3d"],
                  ["Writing hooks that convert", "writing", "2w"],
                  ["Launch checklist template", "growth", "3w"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="py-2.5 pr-2">{r[0]}</td>
                    <td className="py-2.5 pr-2 text-muted">{r[1]}</td>
                    <td className="py-2.5 text-muted">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[11px] text-muted">Auto-synced 2 minutes ago · 842 rows</p>
          </div>
        </div>
      </section>

      <section id="agents" className="border-b border-border-c py-20">
        <div className="container-lm text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">For AI agents</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Built for your AI agents</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Let Claude, ChatGPT, Cursor and Codex search your saves and draft, schedule and analyze
            your LinkedIn content — over MCP or the API.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base font-medium text-foreground/70">
            {AGENTS.map((a) => (
              <span key={a}>{a}</span>
            ))}
            <span className="badge-pill">+ MCP · API</span>
          </div>
        </div>
      </section>
    </>
  );
}
