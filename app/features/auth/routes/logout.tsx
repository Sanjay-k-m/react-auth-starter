// app/features/dashboard/index.tsx
import React from 'react';
import { LogoutButton } from '../components/logout/LogoutButton';
export function meta({}: Route.MetaArgs) {
  return [{ title: 'Logout' }, { name: 'description', content: 'Sign up for an account' }];
}
export default function LogoutPage() {
  return (
    <div>
      <LogoutButton />
    </div>
  );
}
