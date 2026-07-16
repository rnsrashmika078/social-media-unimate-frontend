/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { sendOTPQuery } from "@/app/queryOptions/verificationQuery";
import { SendOTPSchema, SendOTPSchemaType } from "@/app/schema/zodSchema";
import { useNotificationContext } from "@/app/providers/NotificationProvider";
import { frontEndConfig } from "@/config";
import { useRouter } from "next/navigation";
import { setLocalStorage } from "@/app/helper/storage";

const RequestVerify = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOTPSchemaType>({
    resolver: zodResolver(SendOTPSchema),
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation(sendOTPQuery());
  const [method, setMethod] = useState<string>("Email");
  const { setNotification } = useNotificationContext();

  const onSubmit = (data: SendOTPSchemaType) => {
    mutate(
      {
        ...data,
        media_type: method,
      },
      {
        onError: (error: any) => {
          setNotification({
            status: error.status,
            message: error.response.data.message,
          });
        },
        onSuccess: (data) => {
          setNotification({
            status: 200,
            message: data.message,
          });
          router.push(frontEndConfig.AUTH.VERIFY);
          setLocalStorage("mobile", data?.result?.mobile);
          setLocalStorage("media_type", data?.result?.media_type);
        },
      },
    );
    // reset();
  };
  return (
    <div className="w-full max-w-md mx-auto bg-post-background border rounded-2xl p-6 space-y-5">
      <h1 className="text-2xl font-semibold text-center">
        Request OTP Verification
      </h1>

      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
            onClick={() => setMethod("Mobile")}
            type="button"
            variant={method === "Mobile" ? "default" : "secondary"}
          >
            Mobile
          </Button>
        </div>
        <div className="space-y-3 ">
          <div className="space-y-1 mt-6">
            <FieldLabel>{method}</FieldLabel>
            <Input
              {...register(method === "Email" ? "email" : "mobile")}
              type="text"
              placeholder={
                method.toLowerCase() === "email"
                  ? " Enter your email"
                  : " Enter your Mobile number"
              }
            />
            {errors.email && (
              <p className="text-red-500 p-2">{errors.email.message}</p>
            )}
          </div>

          <FieldDescription className="text-center">
            {method.toLowerCase() === "email"
              ? " Enter your email to receive a verification code"
              : " Enter your Mobile number to receive a verification code"}
          </FieldDescription>
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            variant={isPending ? "secondary" : "default"}
          >
            {isPending ? "Sending..." : "Request OTP"}
          </Button>

          <div className="border-t" />

          <FieldDescription className="text-center">
            Remember your account?
          </FieldDescription>

          <Link href={frontEndConfig.AUTH.SIGN_IN}>
            <Button type="button" className="w-full">
              Sign In
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
});

RequestVerify.displayName = "RequestVerify";

export default RequestVerify;
