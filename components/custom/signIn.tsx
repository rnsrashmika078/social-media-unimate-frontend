"use client";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import ErrorMessage from "./error";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInSchemaType } from "@/app/schema/zodSchema";
import { useMutation } from "@tanstack/react-query";
import signInQuery from "@/app/queryOptions/authQuery";

const SignIn = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  // tanstack mutation
  const { mutate } = useMutation({
    ...signInQuery(),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  // form submition
  const onSubmit = async (data: signInSchemaType) => {
    mutate({
      email: data.email,
      password: data.password,
    });
    reset();
  };

  return (
    <div className="border rounded-2xl flex flex-col w-full p-5">
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
        <Button type="submit" disabled={isSubmitting}>
          SignIn
        </Button>
      </form>
      <button
        onClick={async () => {
          const res_cookie = await fetch("/api/get-cookie");
          const result = await res_cookie.json();
          console.log("token", result.token);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",

                Authorization: `Bearer ${result.token}`,
              },
            },
          );
          console.log("res", res);
        }}
      >
        LOGOUT
      </button>
    </div>
    // <div>
    //   <TestQuery />
    // </div>
  );
};

export default SignIn;
