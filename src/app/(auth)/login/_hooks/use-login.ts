import { useMutation } from "@tanstack/react-query";
import { LoginFields } from "@/lib/types/auth";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: LoginFields) => {
      const response = await signIn("credentials", {
        email: fields.email,
        password: fields.password,
        redirect: false,
      });
      if (!response?.ok) {
        throw new Error(response?.error || "Login failed, please try again.");
      }
      return response;
    },
    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(location.search).get("callbackUrl") || "/dashboard";
      location.href = callbackUrl;
    },
  });

  return { isPending, error, login: mutate };
}
