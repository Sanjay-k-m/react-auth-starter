import { create } from 'zustand';
import { authService } from '../services/auth.service';
import { tokenStorage } from '~/lib/api';
import type {
  LoginRequest,
  RegisterInitiateRequest,
  RegisterConfirmRequest,
  ForgotPasswordConfirmRequest,
  ForgotPasswordInitiateRequest,
} from '~/types/auth/request.types';
import type {
  RegisterConfirmationResponse,
  ForgotPasswordInitiationResponse,
  ForgotPasswordConfirmationResponse,
} from '~/types/auth/response.types';
import type { BasicResponse } from '~/types/types';
import { isBasicErrorResponse } from '~/lib/utils/errorGuards';

interface AuthState {
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<BasicResponse>;
  registerInitiate: (payload: RegisterInitiateRequest) => Promise<BasicResponse>;
  registerConfirm: (payload: RegisterConfirmRequest) => Promise<RegisterConfirmationResponse>;
  refreshTokens: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPasswordInitiate: (
    payload: ForgotPasswordInitiateRequest,
  ) => Promise<ForgotPasswordInitiationResponse>;
  forgotPasswordConfirm: (
    payload: ForgotPasswordConfirmRequest,
  ) => Promise<ForgotPasswordConfirmationResponse>;
}

// Type guard for BasicErrorResponse

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: tokenStorage.hasValidTokens(),

  login: async (payload) => {
    try {
      const response = await authService.login(payload);

      if (response.status === 'success' && response.data) {
        const { accessToken, refreshToken } = response.data.tokens;

        await tokenStorage.setAccessToken(accessToken);
        await tokenStorage.setRefreshToken(refreshToken);

        set({ isAuthenticated: true });
      }

      return { status: response.status, message: response.message };
    } catch (error: unknown) {
      if (isBasicErrorResponse(error)) {
        throw error;
      }
      throw new Error('Login failed. Please try again.');
    }
  },

  registerInitiate: async (payload) => {
    try {
      const response = await authService.registerInitiate(payload);
      return { status: response.status, message: response.message };
    } catch (error: unknown) {
      if (isBasicErrorResponse(error)) throw error;
      throw new Error('Registration failed. Please try again.');
    }
  },

  registerConfirm: async (payload) => {
    try {
      const response = await authService.registerConfirm(payload);

      if (response.status === 'success' && response.data?.tokens) {
        const { accessToken, refreshToken } = response.data.tokens;
        await tokenStorage.setAccessToken(accessToken);
        await tokenStorage.setRefreshToken(refreshToken);
        set({ isAuthenticated: true });
      }

      return response;
    } catch (error: unknown) {
      if (isBasicErrorResponse(error)) throw error;
      throw new Error('Registration confirmation failed. Please try again.');
    }
  },

  refreshTokens: async () => {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      set({ isAuthenticated: false });
      throw new Error('No refresh token available.');
    }

    try {
      const response = await authService.refreshTokens({ refreshToken });

      if (response.status === 'success' && response.data?.tokens) {
        const { accessToken, refreshToken: newRefresh } = response.data.tokens;
        await tokenStorage.setAccessToken(accessToken);
        await tokenStorage.setRefreshToken(newRefresh);
        set({ isAuthenticated: true });
      }
    } catch (error: unknown) {
      tokenStorage.clearTokens();
      set({ isAuthenticated: false });
      if (isBasicErrorResponse(error)) throw error;
      throw new Error('Failed to refresh tokens.');
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      tokenStorage.clearTokens();
      set({ isAuthenticated: false });
    }
  },

  forgotPasswordInitiate: async (payload) => {
    try {
      return await authService.forgotPasswordInitiate(payload);
    } catch (error: unknown) {
      if (isBasicErrorResponse(error)) throw error;
      throw new Error('Failed to send password reset email. Please try again.');
    }
  },

  forgotPasswordConfirm: async (payload) => {
    try {
      return await authService.forgotPasswordConfirm(payload);
    } catch (error: unknown) {
      if (isBasicErrorResponse(error)) throw error;
      throw new Error('Failed to reset password. Please try again.');
    }
  },
}));
