import { AxiosError } from 'axios';
import apiWithAuth from '~/lib/api';
import type {
  ForgotPasswordConfirmRequest,
  ForgotPasswordInitiateRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegisterInitiateRequest,
  RegisterConfirmRequest,
} from '~/types/auth/request.types';
import type {
  ForgotPasswordConfirmationResponse,
  ForgotPasswordInitiationResponse,
  LoginResponse,
  RefreshTokenResponse,
  RegisterConfirmationResponse,
  RegisterInitiationResponse,
} from '~/types/auth/response.types';
import type { BasicResponse } from '~/types/types';

export interface AuthService {
  login(data: LoginRequest): Promise<LoginResponse>;
  registerInitiate(data: RegisterInitiateRequest): Promise<RegisterInitiationResponse>;
  registerConfirm(data: RegisterConfirmRequest): Promise<RegisterConfirmationResponse>;
  refreshTokens(data: RefreshTokenRequest): Promise<RefreshTokenResponse>;
  logout(): Promise<BasicResponse>;
  forgotPasswordInitiate(
    data: ForgotPasswordInitiateRequest,
  ): Promise<ForgotPasswordInitiationResponse>;
  forgotPasswordConfirm(
    data: ForgotPasswordConfirmRequest,
  ): Promise<ForgotPasswordConfirmationResponse>;
}

export const authService: AuthService = {
  login: async (data) => {
    try {
      const response = await apiWithAuth.post<LoginResponse>('/auth/login', data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error('Unexpected error occurred');
    }
  },
  registerInitiate: async (data) => {
    try {
      const response = await apiWithAuth.post<RegisterInitiationResponse>(
        '/auth/register/initiate',
        data,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error('Unexpected error occurred');
    }
  },
  registerConfirm: async (data) => {
    try {
      const response = await apiWithAuth.post<RegisterConfirmationResponse>(
        '/auth/register/confirm',
        data,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error('Unexpected error occurred');
    }
  },
  refreshTokens: async (data) => {
    try {
      const response = await apiWithAuth.post<RefreshTokenResponse>('/auth/token/refresh', data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error('Unexpected error occurred');
    }
  },
  logout: async () => {
    try {
      const response = await apiWithAuth.post<BasicResponse>('/auth/logout');
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error('Unexpected error occurred');
    }
  },
  forgotPasswordInitiate: async (data) => {
    try {
      const response = await apiWithAuth.post<ForgotPasswordInitiationResponse>(
        '/auth/forgot-password/initiate',
        data,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error('Unexpected error occurred');
    }
  },
  forgotPasswordConfirm: async (data) => {
    try {
      const response = await apiWithAuth.post<ForgotPasswordConfirmationResponse>(
        '/auth/forgot-password/confirm',
        data,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error('Unexpected error occurred');
    }
  },
};
