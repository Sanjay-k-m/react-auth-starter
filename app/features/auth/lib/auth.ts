// app/features/auth/lib/auth.ts

export async function loginUser(email: string, password: string) {
  // pretend call to backend
  return { token: "fake-token", user: { id: 1, email } };
}

export async function registerUser(email: string, password: string) {
  return { message: "Registered successfully", email };
}

export async function resetPassword(email: string) {
  return { message: `Reset link sent to ${email}` };
}
