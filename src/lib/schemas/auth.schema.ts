import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
