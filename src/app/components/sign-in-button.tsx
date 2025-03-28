'use client'

import { FaGithub, FaGoogle, FaApple } from 'react-icons/fa';
import { login, loginapp, logingoo } from '../lib/actions/auth';

export const SignInButton = () => {
  return (
    <p>
      <button onClick={() => login()}> <FaGithub />Sign In With GitHub </button>
      <button onClick={() => loginapp()}> <FaApple />Sign In With Apple </button>
      <button onClick={() => logingoo()}> <FaGoogle />Sign In With Google </button>
   </p>
  );
}