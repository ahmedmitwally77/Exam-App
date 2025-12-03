import { ForgotPasswordFields } from "@/lib/types/auth";

export async function forgotPasswordService(data: ForgotPasswordFields) {
  // Replace with your actual API endpoint
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to send password reset email");
  }

  return response.json();
}
