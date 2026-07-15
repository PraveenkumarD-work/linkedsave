import { createClient } from "@/lib/supabase/server";
import { createLabel, deleteLabel } from "@/app/app/actions";

const SWATCHES = ["#4f46e5", "#059669", "#d97706", "#dc2626", "#0891b2", "#7c3aed"];

export default async function LabelsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: labels } = await supabase
    .from("labels")
    .select("id,name,color")
    .eq("user_id", user.id)
    .order("name");

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-xl font-semibold">Labels</h1>
      <p className="text-sm text-muted">Organize your saved posts into collections.</p>

      <form action={createLabel} className="mt-6 flex items-end gap-2">
        <div className="flex-1">
          <label className="text-xs font-medium text-muted">New label</label>
          <input
            name="name"
            required
            placeholder="e.g. startup"
            className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <select name="color" className="h-[38px] rounded-lg border border-border-c px-2 text-sm" defaultValue={SWATCHES[0]}>
          {SWATCHES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-[38px] rounded-full bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
        >
          Add
        </button>
      </form>

      <div className="mt-6 space-y-2">
        {(!labels || labels.length === 0) && (
          <p className="rounded-xl border border-dashed border-border-c p-6 text-center text-sm text-muted">
            No labels yet.
          </p>
        )}
        {labels?.map((l) => (
          <div key={l.id} className="flex items-center justify-between rounded-xl border border-border-c px-4 py-2.5">
            <span className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />#{l.name}
            </span>
            <form action={deleteLabel.bind(null, l.id)}>
              <button type="submit" className="text-xs text-red-500/70 hover:text-red-600">
                delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
