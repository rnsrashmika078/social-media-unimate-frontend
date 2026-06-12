"use client";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FieldValues, useForm } from "react-hook-form";
import ErrorMessage from "./error";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpSchemaType } from "@/app/schema/zodSchema";

// component
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    alert(JSON.stringify(data));
    reset();
  };
  return (
    <div className="border rounded-2xl flex flex-col w-full p-5">
      <h1 className="text-2xl mb-4">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field className="mb-2">
          <FieldLabel htmlFor="input-field-username">Email</FieldLabel>
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

          <FieldLabel htmlFor="input-field-email">Confirm password</FieldLabel>
          <Input
            {...register("confirmPassword")}
            id="input-field-confirm"
            type="text"
            className="p-5 mb-2"
            placeholder="Enter your confirm password"
          />
          {errors.confirmPassword && (
            <ErrorMessage error={errors.confirmPassword?.message} />
          )}

          <FieldDescription>
            Enter your login credentials to login
          </FieldDescription>
        </Field>
        <Button type="submit" disabled={isSubmitting}>
          SignUp
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
