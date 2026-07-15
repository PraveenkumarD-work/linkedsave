import { createClient } from "@/lib/supabase/server";
import { ComposerView } from "@/components/app/ComposerView";

export default async function ComposerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: drafts } = await supabase
    .from("drafts")
    .select("id,content,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return <ComposerView drafts={drafts ?? []} />;
}
