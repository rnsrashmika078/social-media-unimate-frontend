/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import ErrorMessage from "./error";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInSchemaType } from "@/app/schema/zodSchema";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { signInQuery } from "@/app/queryOptions/authQuery";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { setAuthUser } from "@/app/store/authSlice";
import { memo } from "react";
import { useNotificationContext } from "@/app/providers/NotificationProvider";
import { frontEndConfig } from "@/config";
import { setLocalStorage } from "@/app/helper/storage";

const SignIn = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { mutate, isPending } = useMutation(signInQuery());
  const { setNotification } = useNotificationContext();

  const onSubmit = async (data: signInSchemaType) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError(error: any) {
          setNotification({
            message: error?.response?.data?.message,
            status: error?.response?.status,
          });
          reset();
        },
        onSuccess: (data) => {
          console.log("Succ", data);
          if (!data.isVerified) {
            setNotification({ status: 202, message: data.message });
            dispatch(setAuthUser(data.result.user));
            setLocalStorage("email", data.result.user.email);

            router.push(frontEndConfig.AUTH.REQUEST_VERIFICATION);
          } else {
            setNotification({ status: 200, message: data.message });
            dispatch(setAuthUser(data.result.user));
            router.push(frontEndConfig.PROTECTED.FEED);
          }
          reset();
        },
      },
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-post-background border rounded-2xl p-6 space-y-5">
      <h1 className="text-2xl font-semibold text-center">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-3">
          <div className="space-y-1">
            <FieldLabel>Email</FieldLabel>
            <Input
              {...register("email")}
              type="text"
              placeholder="Enter your email"
            />
            {errors.email && <ErrorMessage error={errors.email.message} />}
          </div>

          <div className="space-y-1">
            <FieldLabel>Password</FieldLabel>
            <Input
              {...register("password")}
              type="text"
              placeholder="Enter your password"
            />
            {errors.password && (
              <ErrorMessage error={errors.password.message} />
            )}
          </div>

          <FieldDescription className="text-center">
            Enter your login credentials to login
          </FieldDescription>
        </div>

        <div className="space-y-3">
          <Button type="submit" disabled={isPending} className="w-full">
            {!isPending ? "Sign In" : "Signin...Please wait.."}
          </Button>

          <FieldDescription className="text-center">
            Forget the password?{" "}
            <Link href="/reset" className="underline">
              Reset
            </Link>
          </FieldDescription>

          <div className="border-t" />

          <FieldDescription className="text-center">
            Create a new account
          </FieldDescription>

          <Link href={frontEndConfig.AUTH.SIGN_UP}>
            <Button type="button" disabled={isSubmitting} className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
});
SignIn.displayName = "SignIn";

export default SignIn;
