import { LoginFields, LoginResponse } from "@/lib/types/auth";

export async function loginService(fields: LoginFields) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<LoginResponse> = await response.json();
  return payload;
}
