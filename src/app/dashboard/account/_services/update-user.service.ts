import { UpdateProfileFields, UpdateProfileResponse } from "@/lib/types/auth";
import { getToken } from "@/lib/utils/manage-token";

export async function UpdateUserData(fields: UpdateProfileFields) {
  const token = await getToken();
  if (!token?.accessToken) {
    throw new Error("No token found");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/editProfile`,
    {
      method: "PUT",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        token: token.accessToken,
      },
    }
  );
  const payload: UpdateProfileResponse = await response.json();
  return payload;
}
