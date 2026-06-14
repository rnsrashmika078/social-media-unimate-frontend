"use client";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { setAuthUser } from "@/app/store/authSlice";
import { useState } from "react";

// component
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

  // tanstack mutation
  const { mutate } = useMutation(signUpQuery());
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: signUpSchemaType) => {
    const url = await uploadImage();
    mutate(
      {
        dp: url,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
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

  const [file, setFile] = useState<File | null>(null);

  const uploadImage = async () => {
    if (!file) return;
    const res = await fetch("/api/upload");
    const { url } = await res.json();

    await fetch(url, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type,
      },
      body: file,
    });

    const imageUrl = url.split("?")[0];
    return imageUrl;
  };
  return (
    <div className="border rounded-2xl  flex-col w-full p-5 bg-post-background select-none ">
      <h1 className="text-2xl mb-4">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field className="mb-2 grid grid-cols-2">
          <FieldLabel htmlFor="input-field-profile-image">
            Profile Image
          </FieldLabel>
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <FieldLabel htmlFor="input-field-firstname">Profile Image</FieldLabel>
          <Input
            {...register("firstname")}
            id="input-field-firstname"
            type="text"
            className="p-5 mb-2"
            placeholder="Enter your firstname"
          />
          {errors.username && <ErrorMessage error={errors.lastname?.message} />}
          <FieldLabel htmlFor="input-field-lastname">Lastname</FieldLabel>
          <Input
            {...register("lastname")}
            id="input-field-lastname"
            type="text"
            className="p-5 mb-2"
            placeholder="Enter your lastname"
          />
          {errors.username && <ErrorMessage error={errors.lastname?.message} />}
          <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
          <Input
            {...register("username")}
            id="input-field-username"
            type="text"
            className="p-5 mb-2"
            placeholder="Enter your username"
          />
          {errors.username && <ErrorMessage error={errors.username?.message} />}
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
            {...register("password_confirmation")}
            id="input-field-confirm"
            type="text"
            className="p-5 mb-2"
            placeholder="Enter your confirm password"
          />
          {errors.password_confirmation && (
            <ErrorMessage error={errors.password_confirmation?.message} />
          )}

          <FieldDescription>
            Enter your login credentials to login
          </FieldDescription>
        </Field>
        <div className="flex flex-col w-full space-y-2">
          <Button type={"submit"} disabled={isSubmitting}>
            Sign Up
          </Button>
          <span className="border border-b-2"></span>
          <FieldDescription className="text-center">
            Already have account ?
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

export default SignUp;
