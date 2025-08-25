// app/features/auth/login/index.tsx
import React from 'react';
import { SignUpForm } from '../components/sign-up/SignUpForm.tsx.js';
import type { Route } from './+types/signup.js';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sign Up' }, { name: 'description', content: 'Sign up for an account' }];
}

export default function SignupPage() {
  return <SignUpForm />;
}
