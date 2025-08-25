import React from 'react';
import { useParams } from 'react-router';
import type { Route } from './+types/signup';
import { SignUpVerifyForm } from '../components/sign-up/SignUpVerifyForm';
export function meta({}: Route.MetaArgs) {
  return [{ title: 'Verify OTP' }, { name: 'description', content: 'Verify OTP' }];
}

export default function VerifyOtp() {
  const { email } = useParams();
  return <SignUpVerifyForm email={email || ''} />;
}
