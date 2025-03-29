'use server'

import { signIn,signOut } from "@/app/auth"

export const login = async () => {
  await signIn("", {redirectTo: "/lecture/"});
};

export const logout = async () => {
  await signOut({redirectTo: "/"} );
};