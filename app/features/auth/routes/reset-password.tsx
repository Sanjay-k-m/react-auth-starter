import React from 'react';
import type { Route } from './+types/signup';
import { ResetPasswordForm } from '../components/forgot-password/ResetPasswordForm';
import { useSearchParams } from 'react-router-dom';
export function meta({}: Route.MetaArgs) {
  return [{ title: 'change password' }, { name: 'description', content: 'change password' }];
}

export default function ChangePassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  return <ResetPasswordForm token={token || ''} />;
}
