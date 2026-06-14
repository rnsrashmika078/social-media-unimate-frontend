import { mutationOptions } from "@tanstack/react-query";
import {
  getAuthUser,
  resetPassword,
  signIn,
  signOut,
  signUp,
} from "../helper/auth";

export function signInQuery() {
  return mutationOptions({
    mutationKey: ["sign-in"],
    mutationFn: signIn,
  });
}

export function signUpQuery() {
  return mutationOptions({
    mutationKey: ["sign-up"],
    mutationFn: signUp,
  });
}
export function signOutQuery() {
  return mutationOptions({
    mutationKey: ["sign-out"],
    mutationFn: signOut,
  });
}
export function resetPasswordQuery() {
  return mutationOptions({
    mutationKey: ["reset-password"],
    mutationFn: resetPassword,
  });
}
export function getAuthUserQuery() {
  return mutationOptions({
    mutationKey: ["auth-user"],
    mutationFn: getAuthUser,
  });
}
