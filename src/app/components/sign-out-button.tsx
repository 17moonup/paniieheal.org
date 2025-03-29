'use client'

import { logout } from '../lib/actions/auth';
import styles from '../ui/lecture.module.css';

export const SignOutButton = () => {
  return (
    <p>
      <button className={styles.btn} onClick={() => logout()}> Sign out </button>
    </p>
  );
}