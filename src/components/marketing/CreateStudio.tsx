function ComposerVisual() {
  return (
    <div className="card-lm p-5">
      <div className="flex items-center gap-2 border-b border-border-c pb-3 text-sm">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
          You
        </span>
        <div>
          <p className="font-medium">Your name</p>
          <p className="text-xs text-muted">Connected with LinkedIn</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6">
        Most &ldquo;cold outreach&rdquo; advice is noise. The 3 things that actually move replies:
        <br />
        1. A specific trigger · 2. Under three lines · 3. A low-friction ask.
      </p>
      <p className="mt-2 text-[11px] text-muted">◆ Drafted from 6 saved posts</p>
      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>612 / 3000</span>
        <div className="flex gap-2">
          <span className="rounded-full border border-border-c px-3 py-1">Save Draft</span>
          <span className="rounded-full bg-foreground px-3 py-1 text-white">Add to Queue</span>
        </div>
      </div>
    </div>
  );
}

function SchedulerVisual() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const scheduled = [
    { day: "Mon", time: "9:00", title: "Cold outreach playbook" },
    { day: "Wed", time: "8:30", title: "Hooks that convert" },
    { day: "Fri", time: "12:00", title: "Launch checklist template" },
  ];
  return (
    <div className="card-lm p-5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">This week</span>
        <span className="text-xs text-muted">3 scheduled</span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-muted">
        {days.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {scheduled.map((s) => (
          <div key={s.title} className="flex items-center justify-between rounded-lg border border-border-c px-3 py-2 text-xs">
            <span className="text-muted">{s.day} · {s.time}</span>
            <span className="flex-1 truncate px-2">{s.title}</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600">scheduled</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const stats = [
    { label: "Impressions", value: "24.8k", delta: "+18%" },
    { label: "Followers", value: "+312", delta: "+6%" },
    { label: "Engagement", value: "4.7%", delta: "+1.2%" },
  ];
  return (
    <div className="card-lm p-5">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border-c p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-muted">{s.label}</p>
            <p className="mt-1 text-lg font-semibold">{s.value}</p>
            <p className="text-[11px] text-emerald-600">{s.delta}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-16 items-end gap-1">
        {[30, 45, 25, 60, 40, 70, 55].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-brand/30" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function CreateStudio() {
  return (
    <section className="border-b border-border-c py-20">
      <div className="container-lm">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Create</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            From saved posts to published content
          </h2>
          <p className="mt-3 text-muted">
            Your library isn&apos;t just for reading. Turn your best saves into posts, schedule
            them, and see what lands, without leaving PostVault.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Composer</p>
            <h3 className="mt-1 text-lg font-semibold">Turn what you save into what you post</h3>
            <p className="mt-2 text-sm text-muted">
              Pull the ideas that worked, draft in your own voice, and ship — no tool-switching.
            </p>
            <div className="mt-4">
              <ComposerVisual />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Scheduler</p>
            <h3 className="mt-1 text-lg font-semibold">Schedule once. Show up consistently.</h3>
            <p className="mt-2 text-sm text-muted">
              Batch your content and let the queue do the posting, automatically.
            </p>
            <div className="mt-4">
              <SchedulerVisual />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Analytics</p>
            <h3 className="mt-1 text-lg font-semibold">See what actually lands</h3>
            <p className="mt-2 text-sm text-muted">
              Track reach, engagement and growth, and let the data tell you what to make more of.
            </p>
            <div className="mt-4">
              <AnalyticsVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
