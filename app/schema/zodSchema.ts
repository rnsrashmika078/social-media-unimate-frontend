import z, { string } from "zod";

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
  content: z.string().min(1, "Content is required!"),
});

export type addPostSchemaType = z.infer<typeof addPostSchema>;

// otp -> send
export const SendOTPSchema = z.object({
  email: z.string().optional(),
  mobile: z.string().optional(),
  media_type: z.string().optional(),
});
export type SendOTPSchemaType = z.infer<typeof SendOTPSchema>;

// otp -> verify
export const VerifyOTPSchema = z.object({
  email: z.string().optional(),
  mobile: z.string().optional(),
  code: z.number().optional(),
  media_type: z.string().optional(),
});
export type VerifyOTPSchemaType = z.infer<typeof VerifyOTPSchema>;

// search area
export const searchAreaSchema = z.object({
  searchText: z.string().optional(),
});
export type searchAreaType = z.infer<typeof searchAreaSchema>;
