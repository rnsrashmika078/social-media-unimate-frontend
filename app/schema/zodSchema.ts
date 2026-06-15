import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Password must be at least 3 character long"),
});

export type signInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(3, "Password must be at least 3 character long"),
    password_confirmation: z.string().min(1, "Password must match"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password must match!",
    path: ["password_confirmation"],
  });
export type signUpSchemaType = z.infer<typeof signUpSchema>;

export const commentSchema = z.object({
  comment: z.string(),
});

export type commentSchemaType = z.infer<typeof commentSchema>;

export const addPostSchema = z.object({
  content: z.string(),
  
  
});

export type addPostSchemaType = z.infer<typeof addPostSchema>;
