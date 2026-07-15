"use client";

import { useState, useTransition } from "react";
import type { Label, Post } from "@/lib/types";
import { deletePost, togglePostLabel, toggleRead } from "@/app/app/actions";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${Math.max(mins, 0)}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

function initials(name: string | null) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const TYPE_ICON: Record<string, string> = { text: "📝", image: "🖼️", video: "🎬", document: "📄" };

export function PostCard({ post, allLabels }: { post: Post; allLabels: Label[] }) {
  const [labelMenuOpen, setLabelMenuOpen] = useState(false);
  const [, startTransition] = useTransition();
  const assignedIds = new Set(post.labels.map((l) => l.id));

  return (
    <div className={`flex gap-3 rounded-xl border border-border-c p-4 ${post.is_read ? "opacity-60" : ""}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
        {initials(post.author_name)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">
            {post.author_name || "Unknown author"}{" "}
            <span className="font-normal text-muted">
              {post.author_title ? `· ${post.author_title} ` : ""}· {timeAgo(post.saved_at)}
            </span>
          </p>
          <span title={post.post_type}>{TYPE_ICON[post.post_type]}</span>
        </div>

        <p className="mt-1 whitespace-pre-wrap text-sm text-foreground/90">{post.content}</p>

        {post.source_url && (
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-xs text-brand hover:underline"
          >
            View original ↗
          </a>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {post.labels.map((l) => (
            <button
              key={l.id}
              onClick={() => startTransition(() => togglePostLabel(post.id, l.id, false))}
              className="group inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[11px] text-muted"
              title="Remove label"
            >
              #{l.name} <span className="hidden group-hover:inline">✕</span>
            </button>
          ))}

          <div className="relative">
            <button
              onClick={() => setLabelMenuOpen((v) => !v)}
              className="rounded-full border border-dashed border-border-c px-2 py-0.5 text-[11px] text-muted hover:bg-surface"
            >
              + label
            </button>
            {labelMenuOpen && (
              <div className="absolute z-10 mt-1 w-44 rounded-lg border border-border-c bg-white p-1 shadow-lg">
                {allLabels.length === 0 && (
                  <p className="p-2 text-xs text-muted">No labels yet — create one in Labels.</p>
                )}
                {allLabels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      startTransition(() => togglePostLabel(post.id, l.id, !assignedIds.has(l.id)));
                      setLabelMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs hover:bg-surface"
                  >
                    #{l.name}
                    {assignedIds.has(l.id) && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2 text-xs text-muted">
        <button
          onClick={() => startTransition(() => toggleRead(post.id, !post.is_read))}
          title={post.is_read ? "Mark as unread" : "Mark as read"}
        >
          {post.is_read ? "✓ read" : "mark read"}
        </button>
        <button onClick={() => startTransition(() => deletePost(post.id))} className="text-red-500/70 hover:text-red-600">
          delete
        </button>
      </div>
    </div>
  );
}
