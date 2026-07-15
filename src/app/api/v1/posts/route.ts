import { createAnonClient, extractApiKey } from "@/lib/supabase/anon";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = extractApiKey(req);
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Authorization: Bearer <api key>" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const limit = Number(searchParams.get("limit") ?? "50");

  const supabase = createAnonClient();
  const { data, error } = await supabase.rpc("api_search_posts", {
    p_key: apiKey,
    p_query: query,
    p_limit: limit,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ posts: data });
}
