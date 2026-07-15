import { AuthForm } from "@/components/auth/AuthForm";
import { signUp } from "@/app/auth/actions";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center px-6">
      <AuthForm mode="signup" action={signUp} />
    </div>
  );
}
