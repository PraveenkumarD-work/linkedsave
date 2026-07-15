"use client";

import { useRef, useState, useTransition } from "react";
import { saveDraft, deleteDraft, scheduleDraft } from "@/app/app/composer/actions";

type Draft = { id: string; content: string; created_at: string };

export function ComposerView({ drafts }: { drafts: Draft[] }) {
  const [pending, startTransition] = useTransition();
  const [scheduling, setScheduling] = useState<Draft | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [content, setContent] = useState("");

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-xl font-semibold">Composer</h1>
      <p className="text-sm text-muted">
        Draft a post. AI rewrite grounded in your library ships once an Anthropic API key is
        configured — for now, write freely and save or schedule.
      </p>

      <form
        ref={formRef}
        action={(fd) =>
          startTransition(async () => {
            await saveDraft(fd);
            formRef.current?.reset();
            setContent("");
          })
        }
        className="mt-6"
      >
        <textarea
          name="content"
          required
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={3000}
          placeholder="What did you learn from your saves this week?"
          className="w-full rounded-xl border border-border-c px-4 py-3 text-sm outline-none focus:border-brand"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted">{content.length} / 3000</span>
          <button
            type="submit"
            disabled={pending}
            className="rounded-full border border-border-c px-4 py-2 text-sm font-semibold hover:bg-surface transition-colors disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save draft"}
          </button>
        </div>
      </form>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">Drafts</h2>
      <div className="mt-3 space-y-3">
        {drafts.length === 0 && (
          <p className="rounded-xl border border-dashed border-border-c p-6 text-center text-sm text-muted">
            No drafts yet.
          </p>
        )}
        {drafts.map((d) => (
          <div key={d.id} className="rounded-xl border border-border-c p-4">
            <p className="whitespace-pre-wrap text-sm">{d.content}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setScheduling(d)}
                className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-white"
              >
                Add to queue
              </button>
              <button
                onClick={() => startTransition(() => deleteDraft(d.id))}
                className="rounded-full border border-border-c px-3 py-1.5 text-xs text-muted"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {scheduling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Schedule post</h3>
            <p className="mt-1 text-xs text-muted">
              This queues the post in your library. Auto-publishing to LinkedIn ships once a
              LinkedIn Developer App is connected — until then, scheduled posts stay queued.
            </p>
            <form
              action={(fd) =>
                startTransition(async () => {
                  await scheduleDraft(fd);
                  setScheduling(null);
                })
              }
              className="mt-4 space-y-3"
            >
              <input type="hidden" name="draft_id" value={scheduling.id} />
              <input type="hidden" name="content" value={scheduling.content} />
              <div>
                <label className="text-xs font-medium text-muted">Date & time</label>
                <input
                  name="scheduled_at"
                  type="datetime-local"
                  required
                  className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setScheduling(null)}
                  className="flex-1 rounded-full border border-border-c px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
                  Queue it
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
