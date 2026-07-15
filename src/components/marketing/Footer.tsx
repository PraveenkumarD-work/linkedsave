const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog"],
  },
  {
    title: "Integrations",
    links: ["Export saved posts", "Auto-export to Notion", "Auto-export to Google Sheets", "Auto-export to Airtable"],
  },
  {
    title: "Features",
    links: ["Find your saved posts", "Organize saved posts", "Developer API", "MCP integration", "For AI agents"],
  },
  {
    title: "Company",
    links: ["Our story", "Support"],
  },
];

export function Footer() {
  return (
    <footer className="py-16">
      <div className="container-lm">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold">
                P
              </span>
              PostVault
            </div>
            <p className="mt-3 text-sm text-muted leading-6">
              Built for curating & reading the best of LinkedIn. Turn saved posts into a workflow
              you&apos;ll actually use.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border-c pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} PostVault. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
