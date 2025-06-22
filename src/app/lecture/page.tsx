'use server'
import { auth } from '@/app/auth';
import { SignInButton } from '../components/sign-in-button';
import { SignOutButton } from '../components/sign-out-button';
import styles from '../ui/lecture.module.css'
import Link from 'next/link';

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return (
      <div className={styles.main}>
        <Link href="/user-info"> User Info </Link>
        <SignOutButton />
      </div>
    )
  }
  
  return (
    <div className={styles.main}>
      <h1>You Are Not Signed In</h1>
      < SignInButton />
    </div>
  )
}