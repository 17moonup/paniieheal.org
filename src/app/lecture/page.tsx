'use client'

import { login } from '../lib/actions/auth';

export default function Home() {
  return (
    <div>
      <p>You Are Not Signed In</p>
      <button onClick={() => login()}> Sign In With GitHub </button>
    </div>
  )
}