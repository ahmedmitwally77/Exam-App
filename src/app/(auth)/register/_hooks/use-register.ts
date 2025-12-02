import { useMutation } from "@tanstack/react-query";
import { RegisterFields } from "@/lib/types/auth";
import { signIn } from "next-auth/react";

export default function useRegister() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterFields) => {
      // Here you would call your registration API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Registration failed, please try again."
        );
      }

      return response.json();
    },
    onSuccess: async (data, variables) => {
      // Auto login after successful registration
      const response = await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      });

      if (response?.ok) {
        location.href = "/dashboard";
      }
    },
  });

  return { isPending, error, register: mutate };
}
