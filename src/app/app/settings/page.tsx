import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan,status")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-xl font-semibold">Settings</h1>

      <div className="mt-6 rounded-xl border border-border-c p-4">
        <p className="text-xs font-medium text-muted">Account</p>
        <p className="mt-1 text-sm">{user.email}</p>
      </div>

      <div className="mt-4 rounded-xl border border-border-c p-4">
        <p className="text-xs font-medium text-muted">Plan</p>
        <p className="mt-1 text-sm capitalize">
          {sub?.plan ?? "free"} <span className="text-muted">· {sub?.status ?? "active"}</span>
        </p>
        <p className="mt-1 text-xs text-muted">
          Billing runs in Stripe test mode once configured — no real charges until explicitly enabled.
        </p>
      </div>
    </div>
  );
}
