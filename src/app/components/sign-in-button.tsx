'use client'
import { login } from '../lib/actions/auth';
import styles from '../ui/lecture.module.css';

export const SignInButton = () => {
  return (
    <p>
      <button className={styles.btn} onClick={() => login()}> Sign In </button>
   </p>
  );
}