'use client'

import { logout } from '../lib/actions/auth';

export const SignOutButton = () => {
  return (
    <p>
  <button onClick={() => logout()}> Sign out </button>
  </p>
  );
}