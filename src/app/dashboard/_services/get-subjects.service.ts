"use server";

import { getToken } from "@/lib/utils/manage-token";

export async function getAllSubjects() {
  const token = await getToken();

  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await fetch(
      `${process.env.API_URL}/subjects?limit=6&page=1`,
      {
        method: "GET",
        headers: {
          token: token.accessToken,
        },
      }
    );

    const payload = await response.json();
    return payload;
  } catch (error) {
    return {
      code: 500,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
