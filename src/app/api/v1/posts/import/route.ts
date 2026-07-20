import { createAnonClient, extractApiKey } from "@/lib/supabase/anon";
import { NextResponse } from "next/server";

const MAX_BATCH = 50;

type ImportPost = {
  author_name?: string;
  author_title?: string;
  content?: string;
  source_url?: string;
  post_type?: string;
  media_urls?: string[];
};

export async function POST(req: Request) {
  const apiKey = extractApiKey(req);
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Authorization: Bearer <api key>" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const posts: ImportPost[] = Array.isArray(body.posts) ? body.posts.slice(0, MAX_BATCH) : [];
  if (posts.length === 0) {
    return NextResponse.json({ error: "posts array is required" }, { status: 400 });
  }

  const supabase = createAnonClient();
  let imported = 0;
  const errors: { source_url?: string; error: string }[] = [];

  for (const post of posts) {
    if (!post.content && !post.source_url) {
      errors.push({ source_url: post.source_url, error: "content or source_url required" });
      continue;
    }
    const { error } = await supabase.rpc("api_import_post", {
      p_key: apiKey,
      p_author_name: post.author_name ?? null,
      p_author_title: post.author_title ?? null,
      p_content: post.content ?? "",
      p_source_url: post.source_url ?? null,
      p_post_type: post.post_type ?? "text",
      p_media_urls: post.media_urls ?? [],
    });

    if (error) {
      if (error.message.includes("invalid api key")) {
        return NextResponse.json({ error: "invalid api key" }, { status: 401 });
      }
      errors.push({ source_url: post.source_url, error: error.message });
      continue;
    }
    imported++;
  }

  return NextResponse.json({ imported, skipped: errors.length, errors });
}
