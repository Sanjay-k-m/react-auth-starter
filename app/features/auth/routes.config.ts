import { route } from '@react-router/dev/routes';

export const authRoutes = [
  route('auth', 'features/auth/layout.tsx', [
    // route('login', 'features/auth/routes/login.tsx'), // /auth/login
    route('signup', 'features/auth/routes/signup.tsx'), // /auth/signup
    route('logout', 'features/auth/routes/logout.tsx'), // /auth/logout
    route('forgot-password', 'features/auth/routes/forgot-password.tsx'), // /auth/forgot-password
    route('otp/verify/:email', 'features/auth/routes/otp-verify.tsx'), // /auth/otp/verify/:email
    route('otp/reset', 'features/auth/routes/otp-forgot-password.tsx'), // /auth/otp/reset
  ]),
];
