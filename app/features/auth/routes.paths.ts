export const AUTH_ROUTES = {
  login: '/',
  logout: '/auth/logout',
  signup: '/auth/signup',
  signupVerifyOtp: (email: string) => `/auth/otp/verify/${email}`,
  passwordReset: '/auth/reset-password',
  forgotPassword: '/auth/forgot-password',
};