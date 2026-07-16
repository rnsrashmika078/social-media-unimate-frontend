/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { verifyOTPQuery } from "@/app/queryOptions/verificationQuery";
import { VerifyOTPSchema, VerifyOTPSchemaType } from "@/app/schema/zodSchema";
import { frontEndConfig } from "@/config";
import { getLocalStorage } from "@/app/helper/storage";
import { useNotificationContext } from "@/app/providers/NotificationProvider";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { setAuthUser } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";

const Verify = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOTPSchemaType>({
    resolver: zodResolver(VerifyOTPSchema),
  });
  const { mutate, isPending } = useMutation(verifyOTPQuery());
  const { setNotification } = useNotificationContext();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const onSubmit = (data: VerifyOTPSchemaType) => {
    const mobile = getLocalStorage("mobile");
    const email = getLocalStorage("email");
    const media_type = getLocalStorage("media_type");

    mutate(
      {
        ...data,
        mobile: mobile ? mobile : undefined,
        email: email!,
        media_type: media_type!,
        code: data.code!,
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
          dispatch(setAuthUser(data?.result.user));
          // reset();
          router.push(frontEndConfig.PROTECTED.FEED);
        },
      },
    );
    // reset();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-post-background border rounded-2xl p-6 space-y-5">
      <h1 className="text-2xl font-semibold text-center">Verify OTP</h1>

      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 ">
          <div className="space-y-1 mt-6">
            <FieldLabel>OTP</FieldLabel>
            <Input
              {...register("code", { valueAsNumber: true })}
              type="number"
              placeholder={"Enter one time password"}
            />
            {errors.code && (
              <p className="text-red-500 p-2">{errors.code.message}</p>
            )}
          </div>

          <FieldDescription className="text-center">
            You can go back and generate new otp if required
          </FieldDescription>
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            variant={isPending ? "secondary" : "default"}
          >
            {isPending ? "Verifying..." : "Verify"}
          </Button>

          <div className="border-t" />

          <FieldDescription className="text-center">
            Unable to receive the otp?
          </FieldDescription>

          <Link href={frontEndConfig.AUTH.REQUEST_VERIFICATION}>
            <Button type="button" className="w-full">
              Try again
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
});

Verify.displayName = "Verify";

export default Verify;
