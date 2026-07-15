import { createAnonClient, extractApiKey } from "@/lib/supabase/anon";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const apiKey = extractApiKey(req);
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Authorization: Bearer <api key>" }, { status: 401 });
  }
  const { id } = await params;

  const supabase = createAnonClient();
  const { data, error } = await supabase.rpc("api_get_post", { p_key: apiKey, p_post_id: id });

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });
  if (!data || data.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ post: data[0] });
}
