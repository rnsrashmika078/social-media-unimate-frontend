"use client";
import React from "react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ErrorMessage from "./error";
import { resetPasswordQuery } from "@/app/queryOptions/authQuery";
import { signInSchemaType, signInSchema } from "@/app/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { setAuthUser } from "@/app/store/authSlice";

const ResetPassword = () => {
  // react hook fomr
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

  // tanstack mutation
  const { mutate } = useMutation(resetPasswordQuery());

  // form submition
  const onSubmit = async (data: signInSchemaType) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: (data) => {
          toast.success(data.message);
          dispatch(setAuthUser(data?.user));
          reset();
          router.push(`/feed`);
        },
      },
    );
    reset();
  };
  return (
    <div className="border rounded-2xl flex flex-col w-full p-5">
      <h1 className="text-2xl mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field className="mb-2">
          <FieldLabel htmlFor="input-field-email">Email</FieldLabel>
          <Input
            {...register("email")}
            id="input-field-email"
            type="text"
            className="p-5 mb-2"
            placeholder="Enter your email"
          />
          {errors.email && <ErrorMessage error={errors.email?.message} />}
          <FieldLabel htmlFor="input-field-email">Password</FieldLabel>
          <Input
            {...register("password")}
            id="input-field-password"
            type="text"
            className="p-5 mb-2"
            placeholder="Enter your password"
          />
          {errors.password && <ErrorMessage error={errors.password?.message} />}

          <FieldDescription>
            Enter your login credentials to login
          </FieldDescription>
        </Field>
        <div className="flex flex-col space-y-2">
          <Button type="submit" disabled={isSubmitting}>
            Reset Password
          </Button>

          <span className="border border-b-2"></span>

          <FieldDescription className="text-center">
            Go back to sign in
          </FieldDescription>

          <Link href={"/sign-in"}>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              Sign In
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
