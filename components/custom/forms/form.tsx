"use client";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, TSignInSchema } from "@/app/libs/zod/schema";
import { AnimatePresence, motion } from "framer-motion";
import { authLogin } from "@/app/helper/api";
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await authLogin(data);
    console.log("res", res);
    reset();
  };
  return (
    <div className="justify-center items-center p-2">
      <h1>Login</h1>
      <form className="flex flex-col p-2" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="relative">
          <input
            {...register("name")}
            type="text"
            aria-label="username"
            placeholder="Name"
            className="border bg-white dark:bg-gray-900 mt-2 p-1 rounded-md pl-2 placeholder:text-placeholder"
          ></input>
          <motion.span
            initial="hidden"
            animate={{ top: 0, opacity: 1 }}
            exit={{ top: 1 / 2, opacity: 0 }}
            className="absolute top-1/2 -translate-y-1/2 left-0"
          >
            Name
          </motion.span>
        </div>

        {errors.name && (
          <p className="text-red-500">{`${errors.name.message}`}</p>
        )} */}
        <input
          {...register("email")}
          type="email"
          aria-label="email"
          placeholder="Email"
          className="border bg-white dark:bg-gray-900 mt-2 p-1 rounded-md pl-2 placeholder:text-placeholder"
        ></input>
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <input
          {...register("password")}
          type="password"
          aria-label="password"
          placeholder="Password"
          className="border  bg-white dark:bg-gray-900 mt-2 p-1 rounded-md  pl-2 placeholder:text-placeholder"
        ></input>
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        {/* <input
          {...register("confirmPassword")}
          type="password"
          aria-label="confirm-password"
          placeholder="Confirm password"
          className="border bg-white dark:bg-gray-900 mt-2 p-1 rounded-md  pl-2 placeholder:text-placeholder"
        ></input>
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )} */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="submit-button"
          className="border mt-2 p-2 border-gray-300 bg-blue-500 rounded-md disabled:bg-gray-500"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};
export default Form;
