"use server";
import { getToken } from "@/lib/utils/manage-token";

export async function getAllSubjects() {
  const token = await getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(
    `${process.env.API_URL}/subjects?limit=4&page=1`,
    {
      method: "GET",
      headers: {
        token: token.accessToken,
      },
    }
  );
  const payload = await response.json();
  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}

export async function getSubjectsByPage(page: number) {
  const token = await getToken();
  if (!token) {
    return {
      code: 401,
      message: "No token found",
    };
  }

  const response = await fetch(
    `${process.env.API_URL}/subjects?limit=1&page=${page}`,
    {
      method: "GET",
      headers: {
        token: token.accessToken,
      },
      cache: "no-store",
    }
  );

  const payload = await response.json();
  return payload;
}
