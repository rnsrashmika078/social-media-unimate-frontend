"use client";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { setAuthUser } from "@/app/store/authSlice";
const SignIn = () => {
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
  const { mutate } = useMutation(signInQuery());

  // form submition
  const onSubmit = async (data: signInSchemaType) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (error) => {
          reset();
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
  };
  return (
    <div className="border rounded-2xl flex flex-col w-full p-5 bg-post-background select-none">
      <h1 className="text-2xl mb-4">Sign in</h1>
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
            Sign In
          </Button>
          <FieldDescription className="text-center">
            Forget the password ?{" "}
            <Link href={"/reset"}>
              <span>Reset</span>
            </Link>
          </FieldDescription>

          <span className="border border-b-2"></span>

          <FieldDescription className="text-center">
            Create a new account
          </FieldDescription>

          <Link href={"/sign-up"}>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
