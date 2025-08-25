export type BasicResponse = {
  status: 'success' | 'error';
  message: string;
};

export interface ApiResponse<T = undefined> extends BasicResponse {
  data?: T;
}

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export interface BasicErrorResponse {
  message: string;
  error: string;
  statusCode: number;
  status: 'error';
}
