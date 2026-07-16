"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AuthState } from "@/app/auth/actions";

export function AuthForm({
  mode,
  action,
  initialError,
}: {
  mode: "login" | "signup";
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
  initialError?: string;
}) {
  const [state, formAction, pending] = useActionState(action, { error: initialError });

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col justify-center">
      <Link href="/" className="mb-8 flex items-center gap-2 font-semibold text-lg">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold">
          P
        </span>
        PostVault
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight">
        {mode === "login" ? "Log in to your library" : "Create your account"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {mode === "login" ? "Welcome back." : "Start organizing your saved posts in minutes."}
      </p>

      <form action={formAction} className="mt-8 space-y-4">
        {mode === "signup" && (
          <div>
            <label className="text-sm font-medium">Full name</label>
            <input
              name="fullName"
              type="text"
              required
              className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
        )}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="mt-1 w-full rounded-lg border border-border-c px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        {state.info && <p className="text-sm text-emerald-600">{state.info}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors disabled:opacity-60"
        >
          {pending ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            No account yet?{" "}
            <Link href="/signup" className="font-medium text-brand">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-brand">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
