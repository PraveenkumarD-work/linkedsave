import { createClient } from "@/lib/supabase/server";
import { cancelScheduled } from "@/app/app/composer/actions";

export default async function SchedulePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: scheduled } = await supabase
    .from("scheduled_posts")
    .select("id,content,scheduled_at,status")
    .eq("user_id", user.id)
    .neq("status", "canceled")
    .order("scheduled_at", { ascending: true });

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-xl font-semibold">Schedule</h1>
      <p className="text-sm text-muted">
        Your queue. Real auto-publishing to LinkedIn activates once a LinkedIn Developer App
        (Share on LinkedIn product) is connected — see Sync to Apps.
      </p>

      <div className="mt-6 space-y-3">
        {(!scheduled || scheduled.length === 0) && (
          <p className="rounded-xl border border-dashed border-border-c p-6 text-center text-sm text-muted">
            Nothing queued. Add posts to the queue from Composer.
          </p>
        )}
        {scheduled?.map((s) => (
          <div key={s.id} className="rounded-xl border border-border-c p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">
                {new Date(s.scheduled_at).toLocaleString()}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] ${
                  s.status === "published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                }`}
              >
                {s.status}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm">{s.content}</p>
            {s.status === "scheduled" && (
              <form action={cancelScheduled.bind(null, s.id)} className="mt-2">
                <button type="submit" className="text-xs text-red-500/70 hover:text-red-600">
                  Cancel
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
