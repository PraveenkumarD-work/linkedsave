"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const content = String(formData.get("content") ?? "");
  const author_name = String(formData.get("author_name") ?? "") || null;
  const author_title = String(formData.get("author_title") ?? "") || null;
  const source_url = String(formData.get("source_url") ?? "") || null;
  const post_type = String(formData.get("post_type") ?? "text");

  const { error } = await supabase.from("posts").insert({
    user_id: user.id,
    content,
    author_name,
    author_title,
    source_url,
    post_type,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/app");
}

export async function toggleRead(postId: string, isRead: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").update({ is_read: isRead }).eq("id", postId);
  if (error) throw new Error(error.message);
  revalidatePath("/app");
}

export async function deletePost(postId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) throw new Error(error.message);
  revalidatePath("/app");
}

export async function createLabel(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const color = String(formData.get("color") ?? "#4f46e5");

  const { error } = await supabase.from("labels").insert({ user_id: user.id, name, color });
  if (error) throw new Error(error.message);
  revalidatePath("/app");
  revalidatePath("/app/labels");
}

export async function deleteLabel(labelId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("labels").delete().eq("id", labelId);
  if (error) throw new Error(error.message);
  revalidatePath("/app");
  revalidatePath("/app/labels");
}

export async function togglePostLabel(postId: string, labelId: string, assign: boolean) {
  const supabase = await createClient();
  if (assign) {
    const { error } = await supabase.from("post_labels").insert({ post_id: postId, label_id: labelId });
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("post_labels")
      .delete()
      .eq("post_id", postId)
      .eq("label_id", labelId);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/app");
}
