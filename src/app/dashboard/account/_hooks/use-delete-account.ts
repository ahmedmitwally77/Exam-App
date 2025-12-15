import { useMutation } from "@tanstack/react-query";
import { DeleteAccount } from "../_services/delete-account.service";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function useDeleteAccount() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async () => {
      const payload = await DeleteAccount();
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
      signOut();
    },
  });

  return { isPending, error, deleteAccount: mutate };
}
