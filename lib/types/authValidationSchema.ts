import { z } from "zod";

export const loginSchemaZod = z.object({
  username: z.string().min(3, { message: "Username is required" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters " })
    .trim(),
});

export const registerSchemaZod = z.object({
  username: z.string().min(3, { message: "Username is required " }).trim(),
  email: z
    .string()
    .min(1, { message: "Email is required " })
    .email({ message: "Must be a valid email " }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters " }),
});

export type LoginSchemaType = z.infer<typeof loginSchemaZod>;
export type RegisterSchemaType = z.infer<typeof registerSchemaZod>;
