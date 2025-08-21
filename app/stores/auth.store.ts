import { create } from 'zustand';
import { authService } from '../services/auth.service';
import type {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  User,
} from '~/types/auth.types';
import { tokenStorage } from '~/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  forgotPassword: (payload: ForgotPasswordRequest) => Promise<void>;
  resetPassword: (payload: ResetPasswordRequest) => Promise<ResetPasswordResponse>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: tokenStorage.hasValidTokens(),

  login: async (email: string, password: string) => {
    const response = await authService.login({ email, password });

    // response is LoginResponse (flat)
    tokenStorage.setAccessToken(response.access_token);
    tokenStorage.setRefreshToken(response.refresh_token);

    set({
      user: response.user ?? null, // user is present on login
      isAuthenticated: true,
    });
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      tokenStorage.clearTokens();
      set({ user: null, isAuthenticated: false });
    }
  },

  refresh: async () => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (refreshToken) {
      const response = await authService.refreshToken(refreshToken);

      // refresh endpoint likely returns only tokens
      tokenStorage.setAccessToken(response.access_token);
      tokenStorage.setRefreshToken(response.refresh_token);

      set({ isAuthenticated: true });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },
  signup: async (email: string, password: string) => {
    const response = await authService.register({ email, password });
    // backend may not set tokens until OTP is verified
    set({
      user: response.user ?? null,
      isAuthenticated: false, // not fully logged in yet
    });
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await authService.verifyOtp({ email, otp });

    // // after OTP, request tokens
    // const response = await authService.login({ email, password: "???" });
    // depends on backend – sometimes OTP itself returns tokens
    tokenStorage.setAccessToken(response.data.access_token);
    tokenStorage.setRefreshToken(response.data.refresh_token);

    set({
      user: response.user ?? null,
      isAuthenticated: true,
    });
  },
  forgotPassword: async (payload: ForgotPasswordRequest) => {
    await authService.forgotPassword(payload);
  },
  resetPassword: async (payload: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    return await authService.resetPassword(payload);
  },
}));
