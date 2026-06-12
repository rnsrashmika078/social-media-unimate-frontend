import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Password must be at least 3 character long"),
});

export type signInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(3, "Password must be at least 3 character long"),
    confirmPassword: z.string().min(1, "Password must match"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match!",
    path: ["confirmPassword"],
  });
export type signUpSchemaType = z.infer<typeof signUpSchema>;
