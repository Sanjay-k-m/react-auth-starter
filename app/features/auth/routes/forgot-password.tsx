import React from 'react';
import { ForgotPasswordForm } from '../components/forgot-password/ForgotPasswordForm';
import type { Route } from './+types/signup';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Forgot Password' }, { name: 'description', content: 'Forgot Password' }];
}

export default function passwordReset() {
  return <ForgotPasswordForm />;
}
