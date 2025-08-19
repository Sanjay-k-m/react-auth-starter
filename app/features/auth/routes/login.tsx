// app/features/auth/login/index.tsx
import { LoginForm } from "../components/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded shadow w-96">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
