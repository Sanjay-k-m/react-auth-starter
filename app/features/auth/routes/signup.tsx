// app/features/auth/login/index.tsx
import React from 'react';
import { SignUpForm } from '../components/sign-up/SignUpForm';
import type { Route } from './+types/signup';

export function meta({ }: Route.MetaArgs) {
  return [{ title: 'Sign Up' }, { name: 'description', content: 'Sign up for an account' }];
}

export default function SignupPage() {
  return <SignUpForm />;
}
