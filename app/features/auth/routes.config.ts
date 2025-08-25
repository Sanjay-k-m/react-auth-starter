import { route } from '@react-router/dev/routes';

export const authRoutes = [
  route('auth', 'features/auth/layout.tsx', [
    // route('login', 'features/auth/routes/login.tsx'), // /auth/login
    route('sign-up', 'features/auth/routes/sign-up.tsx'), // /auth/sign-up
    route('sign-up/verify/:email', 'features/auth/routes/verify-sign-up.tsx'), // /auth/sign-up/verify/:email
    route('forgot-password', 'features/auth/routes/forgot-password.tsx'), // /auth/forgot-password
    route('reset-password', 'features/auth/routes/reset-password.tsx'), // /auth/reset-password/:token
    route('logout', 'features/auth/routes/logout.tsx'), // /auth/logout
  ]),
];
