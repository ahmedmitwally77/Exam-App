import { ChangePasswordFields, ChangePasswordResponse } from "@/lib/types/auth";
import { getToken } from "@/lib/utils/manage-token";

// bug- How Change Token after password change?
export async function ChangePassword(fields: ChangePasswordFields) {
  const token = await getToken();

  if (!token?.accessToken) {
    throw new Error("No token found");
  }

  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/auth/changePassword`,
    {
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        token: token.accessToken,
      },
    }
  );
  const payload: ChangePasswordResponse = await response.json();
  return payload;
}
