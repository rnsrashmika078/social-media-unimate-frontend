import z from "zod";

export const SignInSchema = z.object({
  // name: z.string().min(10, "Name must bet atlease 10 character long!"),
  email: z.string(),
  password: z.string().min(1, "Password must be at least 1 characters long!"),
  // confirmPassword: z.string(),
});
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Password must match",
//     path: ["confirmPassword"],
//   });

export type TSignInSchema = z.infer<typeof SignInSchema>;
