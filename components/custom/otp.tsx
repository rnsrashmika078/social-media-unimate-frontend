"use client";

import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTPSchema, OTPSchemaType } from "@/app/schema/zodSchema";

const VerificationUI = memo(() => {
  const { register, handleSubmit } = useForm<OTPSchemaType>({
    resolver: zodResolver(OTPSchema),
  });
  const [method, setMethod] = useState<string>("Email");
  return (
    <div className="w-full max-w-md mx-auto bg-post-background border rounded-2xl p-6 space-y-5">
      <h1 className="text-2xl font-semibold text-center">Verification</h1>

      <form className="space-y-2">
        <FieldLabel>Choose Verification Method</FieldLabel>
        <div className="border w-fit rounded-xl bg-accent">
          <Button
            onClick={() => setMethod("Email")}
            type="button"
            variant={method === "Email" ? "default" : "secondary"}
          >
            Email
          </Button>
          <Button
            onClick={() => setMethod("Phone")}
            type="button"
            variant={method === "Phone" ? "default" : "secondary"}
          >
            Phone
          </Button>
        </div>
        <div className="space-y-3 ">
          <div className="space-y-1 mt-6">
            <FieldLabel>{method}</FieldLabel>
            <Input
              type="text"
              placeholder={
                method.toLowerCase() === "email"
                  ? " Enter your email"
                  : " Enter your phone number"
              }
            />
            {/* ErrorMessage goes here later */}
          </div>

          <FieldDescription className="text-center">
            {method.toLowerCase() === "email"
              ? " Enter your email to receive a verification code"
              : " Enter your phone number to receive a verification code"}
          </FieldDescription>
        </div>

        <div className="space-y-3">
          <Button type="submit" className="w-full">
            Send Code
          </Button>

          <div className="border-t" />

          <FieldDescription className="text-center">
            Remember your account?
          </FieldDescription>

          <Link href="/sign-in">
            <Button type="button" className="w-full">
              Sign In
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
});

VerificationUI.displayName = "VerificationUI";

export default VerificationUI;
