"use client";

import { useMemo, useState } from "react";
import type { Label, Post } from "@/lib/types";
import { AddPostModal } from "./AddPostModal";
import { PostCard } from "./PostCard";

export function LibraryView({
  initialPosts,
  allLabels,
  title = "All Bookmarks",
  emptyMessage = "No saved posts yet. Add your first one to start building your library.",
  showAdd = true,
}: {
  initialPosts: Post[];
  allLabels: Label[];
  title?: string;
  emptyMessage?: string;
  showAdd?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [labelFilter, setLabelFilter] = useState<string | null>(null);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const filtered = useMemo(() => {
    return initialPosts.filter((p) => {
      if (unreadOnly && p.is_read) return false;
      if (labelFilter && !p.labels.some((l) => l.id === labelFilter)) return false;
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${p.content} ${p.author_name ?? ""} ${p.author_title ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [initialPosts, query, labelFilter, unreadOnly]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-muted">{initialPosts.length} saved posts</p>
        </div>
        {showAdd && <AddPostModal />}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search saved posts…"
          className="h-9 flex-1 min-w-[180px] rounded-lg border border-border-c px-3 text-sm outline-none focus:border-brand"
        />
        <button
          onClick={() => setUnreadOnly((v) => !v)}
          className={`h-9 rounded-full border px-3 text-xs font-medium ${
            unreadOnly ? "border-brand bg-brand/10 text-brand" : "border-border-c text-muted"
          }`}
        >
          Unread only
        </button>
      </div>

      {allLabels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            onClick={() => setLabelFilter(null)}
            className={`rounded-full px-2.5 py-1 text-[11px] ${!labelFilter ? "bg-foreground text-white" : "bg-surface text-muted"}`}
          >
            All
          </button>
          {allLabels.map((l) => (
            <button
              key={l.id}
              onClick={() => setLabelFilter(labelFilter === l.id ? null : l.id)}
              className={`rounded-full px-2.5 py-1 text-[11px] ${
                labelFilter === l.id ? "bg-foreground text-white" : "bg-surface text-muted"
              }`}
            >
              #{l.name}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border-c p-10 text-center text-sm text-muted">
            {initialPosts.length === 0 ? emptyMessage : "No posts match your filters."}
          </div>
        )}
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} allLabels={allLabels} />
        ))}
      </div>
    </div>
  );
}
