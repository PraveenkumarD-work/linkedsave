"use client";

import { useState, useTransition } from "react";
import { createApiKey, deleteApiKey } from "@/app/app/developer/actions";

type ApiKeyRow = { id: string; name: string; key_prefix: string; created_at: string; last_used_at: string | null };

export function DeveloperView({ keys }: { keys: ApiKeyRow[] }) {
  const [pending, startTransition] = useTransition();
  const [revealed, setRevealed] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-xl font-semibold">Developer API</h1>
      <p className="text-sm text-muted">
        A REST API for AI agents (Claude, ChatGPT, Cursor, Codex) to search your saves and draft
        posts. This works today — no external credentials needed.
      </p>

      <form
        action={(fd) =>
          startTransition(async () => {
            const key = await createApiKey(fd);
            setRevealed(key);
          })
        }
        className="mt-6 flex items-end gap-2"
      >
        <div className="flex-1">
          <label className="text-xs font-medium text-muted">Key name</label>
          <input
            name="name"
            defaultValue="Default key"
            className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="h-[38px] rounded-full bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark transition-colors disabled:opacity-60"
        >
          Create key
        </button>
      </form>

      {revealed && (
        <div className="mt-4 rounded-xl border border-brand bg-brand/5 p-4">
          <p className="text-xs font-medium text-brand">
            Copy this now — it won&apos;t be shown again.
          </p>
          <code className="mt-1 block break-all rounded-lg bg-white p-2 text-xs">{revealed}</code>
        </div>
      )}

      <div className="mt-6 space-y-2">
        {keys.length === 0 && <p className="text-sm text-muted">No API keys yet.</p>}
        {keys.map((k) => (
          <div key={k.id} className="flex items-center justify-between rounded-xl border border-border-c px-4 py-2.5">
            <div className="text-sm">
              <span className="font-medium">{k.name}</span>{" "}
              <span className="text-muted">{k.key_prefix}…</span>
            </div>
            <button
              onClick={() => startTransition(() => deleteApiKey(k.id))}
              className="text-xs text-red-500/70 hover:text-red-600"
            >
              revoke
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border-c p-5">
        <p className="text-sm font-semibold">Endpoints</p>
        <div className="mt-3 space-y-3 text-xs">
          <div>
            <code className="rounded bg-surface px-1.5 py-0.5">GET /api/v1/posts?query=outreach&amp;limit=20</code>
            <p className="mt-1 text-muted">Search your saved posts. Requires Authorization: Bearer &lt;key&gt;.</p>
          </div>
          <div>
            <code className="rounded bg-surface px-1.5 py-0.5">GET /api/v1/posts/:id</code>
            <p className="mt-1 text-muted">Fetch a single saved post by id.</p>
          </div>
          <div>
            <code className="rounded bg-surface px-1.5 py-0.5">POST /api/v1/drafts {"{ content }"}</code>
            <p className="mt-1 text-muted">Create a draft from your agent&apos;s output.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
