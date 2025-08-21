// app/features/auth/hooks/use-auth.ts
import { useState } from "react";
import { loginUser } from "../lib/auth";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  async function login(email: string, password: string) {
    const res = await loginUser(email, password);
    setUser(res.user);
    return res;
  }

  function logout() {
    setUser(null);
  }

  return { user, login, logout };
}
