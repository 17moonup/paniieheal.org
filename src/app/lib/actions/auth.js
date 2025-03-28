'use server'

import { signIn,signOut } from "@/app/auth"

export const login = async () => {
  await signIn("github", {redirectTo: "/lecture/"});
};

export const logout = async () => {
  await signOut({redirectTo: "/"} );
};

export const loginapp = async () => {
  await signIn("apple", {redirectTo: "/lecture/"});
};

export const logingoo = async () => {
  await signIn("google", {redirectTo: "/lecture/"});
};