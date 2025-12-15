import { useMutation } from "@tanstack/react-query";
import {
  sendForgotPasswordEmailService,
  verifyResetCodeService,
  resetPasswordService,
} from "../_services/forgot-password.service";
import { toast } from "sonner";

export function useSendForgotPasswordEmail() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (email: string) => {
      const payload = await sendForgotPasswordEmailService(email);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
  });

  return { isPending, error, sendEmail: mutate };
}

export function useVerifyResetCode() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (resetCode: string) => {
      const payload = await verifyResetCodeService(resetCode);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
  });

  return { isPending, error, verifyCode: mutate };
}

export function useResetPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: { email: string; newPassword: string }) => {
      const payload = await resetPasswordService(data.email, data.newPassword);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: () => {
      toast.success("Password reset successfully. You can now log in.");
    },
  });

  return { isPending, error, resetPassword: mutate };
}
