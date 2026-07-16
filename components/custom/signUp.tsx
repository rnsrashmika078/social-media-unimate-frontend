/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import ErrorMessage from "./error";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpSchemaType } from "@/app/schema/zodSchema";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signUpQuery } from "@/app/queryOptions/authQuery";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { setAuthUser } from "@/app/store/authSlice";
import { useState } from "react";
import { useNotificationContext } from "@/app/providers/NotificationProvider";
import { frontEndConfig } from "@/config";
import { setLocalStorage } from "@/app/helper/storage";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const [url, setUrl] = useState<string>("");

  const { mutate, isPending } = useMutation(signUpQuery());
  const dispatch = useDispatch<AppDispatch>();
  const { setNotification } = useNotificationContext();

  const onSubmit = async (data: signUpSchemaType) => {
    mutate(
      {
        dp: url ?? "sample.png",
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
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
          setNotification({ status: 200, message: data.message });
          dispatch(setAuthUser(data.result.user));
          setLocalStorage("email", data.result.user.email);
          reset();
          router.push(frontEndConfig.AUTH.REQUEST_VERIFICATION);
        },
      },
    );
    reset();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-post-background border rounded-2xl p-6 space-y-5">
      <h1 className="text-2xl font-semibold text-center">Sign up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FieldLabel>Profile Image</FieldLabel>
          <Input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0] || null;
              if (!file) return;
              const url = "sample";
              setUrl(url || null);
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <FieldLabel>Firstname</FieldLabel>
            <Input
              {...register("firstname")}
              type="text"
              placeholder="Firstname"
            />
            {errors.firstname && (
              <ErrorMessage error={errors.firstname?.message} />
            )}
          </div>

          <div className="space-y-1">
            <FieldLabel>Lastname</FieldLabel>
            <Input
              {...register("lastname")}
              type="text"
              placeholder="Lastname"
            />
            {errors.lastname && (
              <ErrorMessage error={errors.lastname?.message} />
            )}
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Username</FieldLabel>
          <Input {...register("username")} type="text" placeholder="Username" />
          {errors.username && <ErrorMessage error={errors.username?.message} />}
        </div>

        <div className="space-y-1">
          <FieldLabel>Email</FieldLabel>
          <Input {...register("email")} type="text" placeholder="Email" />
          {errors.email && <ErrorMessage error={errors.email?.message} />}
        </div>

        <div className="space-y-1">
          <FieldLabel>Password</FieldLabel>
          <Input {...register("password")} type="text" placeholder="Password" />
          {errors.password && <ErrorMessage error={errors.password?.message} />}
        </div>

        <div className="space-y-1">
          <FieldLabel>Confirm password</FieldLabel>
          <Input
            {...register("password_confirmation")}
            type="text"
            placeholder="Confirm password"
          />
          {errors.password_confirmation && (
            <ErrorMessage error={errors.password_confirmation?.message} />
          )}
        </div>

        <FieldDescription className="text-center">
          Enter your login credentials to login
        </FieldDescription>

        <div className="space-y-3">
          <Button type="submit" disabled={isPending} className="w-full">
            {!isPending ? "Sign Up" : "Creating account.."}
          </Button>

          <div className="border-t" />

          <FieldDescription className="text-center">
            Already have account ?
          </FieldDescription>

          <Link href={frontEndConfig.AUTH.SIGN_IN}>
            <Button type="button" disabled={isSubmitting} className="w-full">
              Sign In
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
