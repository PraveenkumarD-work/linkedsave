import { createAnonClient, extractApiKey } from "@/lib/supabase/anon";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = extractApiKey(req);
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Authorization: Bearer <api key>" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const content = String(body.content ?? "");
  if (!content) {
    return NextResponse.json({ error: "content is required" }, { status: 400 });
  }

  const supabase = createAnonClient();
  const { data, error } = await supabase.rpc("api_create_draft", { p_key: apiKey, p_content: content });

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });
  return NextResponse.json({ draft: data?.[0] }, { status: 201 });
}
