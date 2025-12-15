import { useMutation } from "@tanstack/react-query";
import { ChangePassword } from "../_services/change-password.service";
import { ChangePasswordFields } from "@/lib/types/auth";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function useChangePassword() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ChangePasswordFields) => {
      const payload = await ChangePassword(fields);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: () => {
      toast.success("Password changed successfully", {
        description:
          "For security, you have been signed out, please sign in again",
        duration: 8000,
      });
      signOut();
    },
  });

  return { isPending, error, changePassword: mutate };
}
