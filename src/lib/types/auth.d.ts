import z from "zod";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
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


export type LoginFields = z.infer<typeof loginSchema>;
export type RegisterFields = z.infer<typeof registerSchema>;
export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;
