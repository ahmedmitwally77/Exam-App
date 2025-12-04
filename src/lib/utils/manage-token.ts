"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NEXTAUTH_COOKIE } from "../constants/auth.constant";

export async function getToken() {
  const tokenCookie = cookies().get(NEXTAUTH_COOKIE)?.value;
  if (!tokenCookie) return null;
  try {
    const jwt = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return jwt;
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
}
