export interface RegisterInitiateRequest {
  email: string;
  password: string;
}
export interface RegisterConfirmRequest {
  email: string;
  otp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordInitiateRequest {
  email: string;
}

export interface ForgotPasswordConfirmRequest {
  token: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
