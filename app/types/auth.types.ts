// No ApiResponse needed here anymore
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// ✅ Backend returns flat tokens + user
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

// ✅ Registration also returns tokens + user
export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

// ✅ Refresh only returns tokens (no user)
export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
}
