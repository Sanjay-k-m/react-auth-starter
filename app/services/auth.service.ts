import apiWithAuth, { getApiErrorMessage } from '~/lib/api';
import type {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  User,
} from '~/types/auth.types';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiWithAuth.post<LoginResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      throw new Error(await getApiErrorMessage(error));
    }
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await apiWithAuth.post<RegisterResponse>('/auth/register-request', data);
      return response.data; // likely includes user + maybe needs OTP verification
    } catch (error) {
      throw new Error(await getApiErrorMessage(error));
    }
  },

  verifyOtp: async (data: { email: string; otp: string }): Promise<any> => {
    try {
      return await apiWithAuth.post('/auth/register-verify', data);
    } catch (error) {
      throw new Error(await getApiErrorMessage(error));
    }
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    try {
      // ✅ backend expects snake_case key
      const response = await apiWithAuth.post<RefreshTokenResponse>('/auth/refresh', {
        refresh_token: refreshToken,
      });
      return response.data;
    } catch (error) {
      throw new Error(await getApiErrorMessage(error));
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiWithAuth.post('/auth/logout');
    } catch (error) {
      throw new Error(await getApiErrorMessage(error));
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiWithAuth.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error(await getApiErrorMessage(error));
    }
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    try {
      await apiWithAuth.post<void>('/auth/request-password-reset', data);
    } catch (error) {
      throw new Error(await getApiErrorMessage(error));
    }
  },
  resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    try {
      const response = apiWithAuth.post<ResetPasswordResponse>('/auth/reset-password', data);
      return (await response).data
    } catch (error) {
      throw new Error(await getApiErrorMessage(error));
    }
  },
};
