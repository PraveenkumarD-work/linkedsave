import { createClient } from "@/lib/supabase/server";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ count: totalSaved }, { count: totalRead }, { count: totalLabeled }, { data: scheduled }] =
    await Promise.all([
      supabase.from("posts").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", true),
      supabase
        .from("post_labels")
        .select("post_id", { count: "exact", head: true })
        .in(
          "post_id",
          (
            await supabase.from("posts").select("id").eq("user_id", user.id)
          ).data?.map((p) => p.id) ?? []
        ),
      supabase
        .from("scheduled_posts")
        .select("status")
        .eq("user_id", user.id),
    ]);

  const published = scheduled?.filter((s) => s.status === "published").length ?? 0;
  const queued = scheduled?.filter((s) => s.status === "scheduled").length ?? 0;

  const stats = [
    { label: "Saved posts", value: totalSaved ?? 0 },
    { label: "Marked read", value: totalRead ?? 0 },
    { label: "Labeled posts", value: totalLabeled ?? 0 },
    { label: "Published", value: published },
    { label: "In queue", value: queued },
  ];

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-xl font-semibold">Analytics</h1>
      <p className="text-sm text-muted">Based on your library and queue — data we actually have.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border-c p-4 text-center">
            <p className="text-2xl font-semibold">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-border-c p-5">
        <p className="text-sm font-medium">Impressions, engagement rate & follower growth</p>
        <p className="mt-1 text-sm text-muted">
          Not available yet. These metrics live behind LinkedIn&apos;s Marketing Developer
          Platform, which requires a separate partner application/approval from LinkedIn — it
          isn&apos;t self-serve. This panel activates automatically once that access is granted;
          nothing here is estimated or faked in the meantime.
        </p>
      </div>
    </div>
  );
}
