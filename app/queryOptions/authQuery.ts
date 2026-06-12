import { mutationOptions } from "@tanstack/react-query";
import { signIn } from "../helper/auth";

export default function signInQuery() {
  return mutationOptions({
    mutationKey: ["sign-in"],
    mutationFn: signIn,
  });
}
