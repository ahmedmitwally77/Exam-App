import { z } from "zod";

export const loginSchema = z.object({
  // email: z.email({
  //   error: (issue) =>
  //     !issue.input ? "Email is required" : "Please enter a valid email address",
  // }),
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Please enter a valid email address")),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, { error: "Password must be at least 6 characters" }),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: z.email({
      error: (issue) =>
        !issue.input
          ? "Email is required"
          : "Please enter a valid email address",
    }),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .min(10, "Phone number must be at least 10 digits"),
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

export const forgotPasswordSchema = z.object({
  email: z.email({
    error: (issue) =>
      !issue.input ? "Email is required" : "Please enter a valid email address",
  }),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
});

export const resetPasswordSchema = z
  .object({
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
