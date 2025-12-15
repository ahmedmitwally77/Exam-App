import z from "zod";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  forgotPasswordFormSchema,
  profileSchema,
  changePasswordSchema,
} from "../schemas/auth.schema";
import { User } from "next-auth";

// API Response Types
export type RegisterResponse = {
  token: string;
  user: User["user"];
};

export type LoginResponse = {
  token: string;
  user: User["user"];
};

export type UpdateProfileResponse = {
  message: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    isVerified: boolean;
    createdAt: string;
    passwordResetCode?: string;
    passwordResetExpires?: string;
    resetCodeVerified?: boolean;
  };
};

export type ChangePasswordResponse = {
  message: string;
  Token: string;
};

export type LoginFields = z.infer<typeof loginSchema>;
export type RegisterFields = z.infer<typeof registerSchema>;
export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
export type UpdateProfileFields = z.infer<typeof profileSchema>;
export type ChangePasswordFields = z.infer<typeof changePasswordSchema>;
