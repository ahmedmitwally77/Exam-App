import { User } from "next-auth";
import { Cart } from "./card";
import z from "zod";
import { loginSchema } from "../schemas/auth.schema";

export interface RegisterFormFields {
  cart: Cart;
  email: string;
  password: string;
  age: number;
  birthday: Date;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: "male" | "female";
  termsAndConditions: boolean;
}

export type RegisterResponse = {
  token: string;
  user: User["user"];
};

export type LoginResponse = {
  token: string;
  user: User["user"];
};

export type LoginFields = z.infer<typeof loginSchema>;

import { registerSchema, forgotPasswordSchema } from "../schemas/auth.schema";
export type RegisterFields = z.infer<typeof registerSchema>;
export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;
