import { useMutation } from "@tanstack/react-query";
import { registerService } from "../_services/register.service";
import { useRouter } from "next/navigation";
import { RegisterFields } from "@/lib/types/auth";
import { toast } from "sonner";

export default function useRegister() {
  // Navigation
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterFields) => {
      const payload = await registerService(fields);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      router.push("/login");
    },
  });

  return { isPending, error, register: mutate };
}
