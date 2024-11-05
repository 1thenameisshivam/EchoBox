import { z } from "zod";

export const userNameSchema = z
  .string()
  .min(3, { message: "username must be at least 3 characters long" })
  .max(80, { message: "username must be at most 80 characters long" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "username must contain only letters, numbers, and underscores",
  });

export const signupSchema = z.object({
  username: userNameSchema,
  email: z.string().email({ message: "email is invalid" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters long" }),
});
