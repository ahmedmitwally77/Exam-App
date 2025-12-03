"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPasswordService } from "../_services/forgot-password.service";
import { ForgotPasswordFields } from "@/lib/types/auth";

export default function useForgotPassword() {
  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordFields) => forgotPasswordService(data),
    onSuccess: (data) => {
      console.log("Password reset email sent successfully", data);
      // You can add toast notification here
    },
    onError: (error) => {
      console.error("Forgot password error:", error);
      // You can add toast notification here
    },
  });

  return {
    forgotPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
