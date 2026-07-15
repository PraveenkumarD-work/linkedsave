"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { randomBytes, createHash } from "crypto";

export async function createApiKey(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const name = String(formData.get("name") ?? "Default key") || "Default key";
  const rawKey = `pv_live_${randomBytes(24).toString("hex")}`;
  const keyHash = createHash("sha256").update(rawKey).digest("hex");
  const keyPrefix = rawKey.slice(0, 12);

  const { error } = await supabase.from("api_keys").insert({
    user_id: user.id,
    name,
    key_hash: keyHash,
    key_prefix: keyPrefix,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/app/developer");
  return rawKey;
}

export async function deleteApiKey(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("api_keys").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/app/developer");
}
