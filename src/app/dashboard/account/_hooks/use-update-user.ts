import { useMutation } from "@tanstack/react-query";
import { UpdateUserData } from "../_services/update-user.service";
import { UpdateProfileFields } from "@/lib/types/auth";
import { toast } from "sonner";
export default function useUpdateUser() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: UpdateProfileFields) => {
      const payload = await UpdateUserData(fields);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: () => {
      // bug- after Success Data not updating in UI
      toast.success("Profile updated successfully");
    },
  });

  return { isPending, error, updateUser: mutate };
}
