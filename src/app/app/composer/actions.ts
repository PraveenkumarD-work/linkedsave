"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveDraft(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const content = String(formData.get("content") ?? "");
  const { error } = await supabase.from("drafts").insert({ user_id: user.id, content });
  if (error) throw new Error(error.message);
  revalidatePath("/app/composer");
}

export async function deleteDraft(draftId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("drafts").delete().eq("id", draftId);
  if (error) throw new Error(error.message);
  revalidatePath("/app/composer");
}

export async function scheduleDraft(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const draft_id = String(formData.get("draft_id") ?? "");
  const content = String(formData.get("content") ?? "");
  const scheduled_at = String(formData.get("scheduled_at") ?? "");

  const { error } = await supabase.from("scheduled_posts").insert({
    user_id: user.id,
    draft_id: draft_id || null,
    content,
    scheduled_at: new Date(scheduled_at).toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/app/schedule");
  revalidatePath("/app/composer");
}

export async function cancelScheduled(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("scheduled_posts").update({ status: "canceled" }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/app/schedule");
}
