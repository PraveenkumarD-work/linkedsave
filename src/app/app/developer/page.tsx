import { createClient } from "@/lib/supabase/server";
import { DeveloperView } from "@/components/app/DeveloperView";

export default async function DeveloperPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: keys } = await supabase
    .from("api_keys")
    .select("id,name,key_prefix,created_at,last_used_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return <DeveloperView keys={keys ?? []} />;
}
