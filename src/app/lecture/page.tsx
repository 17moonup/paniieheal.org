'use server'
import { auth } from '@/app/auth';
import { SignInButton } from '../components/sign-in-button';
import { SignOutButton } from '../components/sign-out-button';
import Link from 'next/link';
export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return (
      <div>
        <Link href="/user-info"> User Info </Link>
        <SignOutButton />
      </div>
    )
  }
  
  return (
    <div>
      <p>You Are Not Signed In</p>
      < SignInButton />
    </div>
  )
}