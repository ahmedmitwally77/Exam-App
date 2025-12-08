import { RegisterFields, RegisterResponse } from "@/lib/types/auth";

export async function registerService(fields: RegisterFields) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload: ApiResponse<RegisterResponse> = await response.json();
  return payload;
}
