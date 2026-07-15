import { FeatureRow } from "./FeatureRow";

function ViewVisual() {
  return (
    <div className="card-lm space-y-3 p-4">
      {[
        { i: "AR", n: "Alex Rivera", r: "Founder · 3d", t: "The cold outreach playbook that booked 40 demos last month…", tag: "startup" },
        { i: "MK", n: "Maya Kapoor", r: "Design · 1w", t: "Portfolio teardown: 5 patterns that got designers hired…", tag: "design" },
        { i: "JT", n: "Jordan Tan", r: "Writer · 2w", t: "A thread on writing hooks that stop the scroll…", tag: "writing" },
      ].map((p) => (
        <div key={p.i} className="flex items-start gap-3 rounded-xl border border-border-c p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-semibold text-brand">
            {p.i}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{p.n} <span className="font-normal text-muted">· {p.r}</span></p>
            <p className="mt-0.5 text-sm text-muted">{p.t}</p>
            <span className="mt-1 inline-block rounded-full bg-surface px-2 py-0.5 text-[11px] text-muted">#{p.tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SearchVisual() {
  return (
    <div className="card-lm p-4">
      <div className="flex items-center gap-2 rounded-lg border border-border-c bg-surface px-3 py-2 text-sm text-muted">
        <span>🔍</span> outreach framework
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
        <span className="badge-pill">Author: Alex</span>
        <span className="badge-pill">2024</span>
        <span className="badge-pill">Type: Text</span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="rounded-lg border border-border-c p-3 text-sm">
          <span className="font-medium">AR</span> — The cold outreach framework that booked 40 demos…
        </div>
        <div className="rounded-lg border border-border-c p-3 text-sm">
          <span className="font-medium">JT</span> — My 3-step outreach sequence for cold leads…
        </div>
      </div>
    </div>
  );
}

function OrganizeVisual() {
  const tags = ["#startup", "#finance", "#business", "#marketing", "#inspiration", "#dev", "#design", "#writing", "#testimonial", "#growth-tips"];
  return (
    <div className="card-lm p-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="rounded-full border border-border-c bg-surface px-3 py-1.5 text-xs font-medium text-muted">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CaptureVisual() {
  return (
    <div className="card-lm p-4">
      <div className="flex items-start gap-3 rounded-xl border border-border-c p-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-semibold text-brand">
          MK
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Maya Kapoor <span className="font-normal text-muted">· Design · 1w</span></p>
          <p className="mt-0.5 text-sm text-muted">Portfolio teardown: 5 patterns that got designers hired this year…</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] text-muted">Design inspiration</span>
            <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] text-muted">Read later</span>
          </div>
          <p className="mt-2 rounded-lg bg-surface p-2 text-xs text-muted">
            &ldquo;Point 3 is underrated — case studies beat shots every time.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function KeyboardVisual() {
  const shortcuts = [
    ["Next / previous post", "J / K"],
    ["Add a label", "L"],
    ["Search everything", "⌘K"],
    ["Mark as read", "E"],
    ["Open AI chat", "⌘/"],
  ];
  return (
    <div className="card-lm p-5">
      <div className="space-y-2.5">
        {shortcuts.map(([label, key]) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <span className="text-muted">{label}</span>
            <kbd className="rounded-md border border-border-c bg-surface px-2 py-1 text-xs font-mono">{key}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="border-b border-border-c py-8">
      <div className="container-lm">
        <div className="mx-auto max-w-2xl pt-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Organize</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Effortlessly organize and manage all your saved posts
          </h2>
          <p className="mt-3 text-muted">
            LinkedIn buries your saved posts. PostVault gives them a home: searchable, labelled, and
            instantly accessible.
          </p>
        </div>

        <div className="divide-y divide-border-c">
          <FeatureRow
            eyebrow="View"
            title="View saved posts in one place"
            description="Our intuitive UI shows all your saved content — images, videos, and documents — in one place for easy viewing and management."
            bullets={[
              "Text, image, video & document posts unified",
              "Distraction-free reading layout",
              "Mark as read & track an unread queue",
            ]}
            visual={<ViewVisual />}
          />
          <FeatureRow
            eyebrow="Search"
            title="Search efficiently"
            description="Quickly find specific saved posts with text search and filters by author, type, and year. No more struggling to locate that post you vaguely remember."
            bullets={[
              "Full-text search across every saved post",
              "Filter by author, content type & year",
              "Results in milliseconds, no tab-switching",
            ]}
            visual={<SearchVisual />}
            reverse
          />
          <FeatureRow
            eyebrow="Organize"
            title="Organize with labels"
            description="Gain control over your saved posts by organizing them into collections with labels — quick and easy access to what you need."
            bullets={["Custom labels & collections", "Bulk-label from the library view", "Smart Views that auto-filter"]}
            visual={<OrganizeVisual />}
          />
          <FeatureRow
            eyebrow="Capture"
            title="Capture more, right from LinkedIn"
            description="Drop any post straight into a folder without leaving your feed, and keep the comments you write — saved together with the post they reply to."
            bullets={[
              "Save any post to a folder in one click",
              "Your comments captured with the original post",
              "Everything lands in your library, already organized",
            ]}
            visual={<CaptureVisual />}
            reverse
          />
          <FeatureRow
            eyebrow="Keyboard-first"
            title="Easier management with keyboard shortcuts"
            description="Navigate through your saved posts, label, and search effortlessly with keyboard shortcuts. Get more done in less time."
            bullets={["Full keyboard navigation", "Command palette (⌘K)", "No mouse required"]}
            visual={<KeyboardVisual />}
          />
        </div>
      </div>
    </section>
  );
}
