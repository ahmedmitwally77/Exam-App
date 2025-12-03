/* eslint-disable @typescript-eslint/no-empty-object-type */
import { DefaultSession, User } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    accessToken: string;
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: "admin" | "moderator" | "user";
      isVerified: boolean;
      createdAt: string;
    } & DefaultSession["user"];
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User["user"];
  }
  /** The OAuth profile returned from your provider */

}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {}
}
