import { AuthForm } from "@/components/auth/AuthForm";
import { signIn } from "@/app/auth/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const initialError =
    error === "confirmation_failed"
      ? "That confirmation link is invalid or expired. Try signing up again."
      : undefined;

  return (
    <div className="flex min-h-screen items-center px-6">
      <AuthForm mode="login" action={signIn} initialError={initialError} />
    </div>
  );
}
