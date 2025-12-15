import { getToken } from "@/lib/utils/manage-token";

export async function DeleteAccount() {
  const token = await getToken();
  if (!token?.accessToken) {
    throw new Error("No token found");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/deleteMe`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token.accessToken,
      },
    }
  );
  const payload = await response.json();
  return payload;
}
