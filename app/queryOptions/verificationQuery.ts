import { mutationOptions } from "@tanstack/react-query";
import { send, verify } from "../helper/otp";

export function sendOTPQuery() {
  return mutationOptions({
    mutationKey: ["otp-send"],
    mutationFn: send,
  });
}

export function verifyOTPQuery() {
  return mutationOptions({
    mutationKey: ["otp-verification"],
    mutationFn: verify,
  });
}
