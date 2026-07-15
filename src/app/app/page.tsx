import { createClient } from "@/lib/supabase/server";
import { LibraryView } from "@/components/app/LibraryView";
import type { Post, Label } from "@/lib/types";

export default async function LibraryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: postsRaw }, { data: labelsRaw }] = await Promise.all([
    supabase
      .from("posts")
      .select("*, post_labels(label:labels(id,name,color))")
      .eq("user_id", user.id)
      .order("saved_at", { ascending: false }),
    supabase.from("labels").select("id,name,color").eq("user_id", user.id).order("name"),
  ]);

  type PostRow = Omit<Post, "labels"> & {
    post_labels: { label: Label | null }[] | null;
  };

  const posts: Post[] = ((postsRaw as PostRow[] | null) ?? []).map((p) => ({
    ...p,
    labels: (p.post_labels ?? []).map((pl) => pl.label).filter((l): l is Label => l !== null),
  }));

  return <LibraryView initialPosts={posts} allLabels={(labelsRaw as Label[]) ?? []} />;
}
