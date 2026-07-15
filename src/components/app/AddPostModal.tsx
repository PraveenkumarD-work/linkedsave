"use client";

import { useRef, useState, useTransition } from "react";
import { addPost } from "@/app/app/actions";

export function AddPostModal() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center rounded-full bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
      >
        + Add post
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add a saved post</h2>
              <button onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
                ✕
              </button>
            </div>
            <p className="mt-1 text-sm text-muted">
              Paste a LinkedIn post URL and its content. (The Chrome extension for one-click
              capture ships in a later phase.)
            </p>

            <form
              ref={formRef}
              action={(fd) =>
                startTransition(async () => {
                  await addPost(fd);
                  formRef.current?.reset();
                  setOpen(false);
                })
              }
              className="mt-4 space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted">Author name</label>
                  <input
                    name="author_name"
                    className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted">Author title</label>
                  <input
                    name="author_title"
                    className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted">LinkedIn URL</label>
                <input
                  name="source_url"
                  type="url"
                  placeholder="https://www.linkedin.com/posts/…"
                  className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted">Type</label>
                <select
                  name="post_type"
                  className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted">Content</label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors disabled:opacity-60"
              >
                {pending ? "Saving…" : "Save to library"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
