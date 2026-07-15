import { AuthForm } from "@/components/auth/AuthForm";
import { signIn } from "@/app/auth/actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center px-6">
      <AuthForm mode="login" action={signIn} />
    </div>
  );
}
