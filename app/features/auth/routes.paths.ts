export const AUTH_ROUTES = {
  login: '/',
  signup: '/auth/sign-up',
  signupVerifyOtp: (email: string) => `/auth/sign-up/verify/${email}`,
  forgotPassword: '/auth/forgot-password',
  resetPassword: `/auth/reset-password`,
  logout: '/auth/logout',
};
