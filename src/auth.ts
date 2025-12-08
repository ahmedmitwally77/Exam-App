import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginService } from "./app/(auth)/login/_services/login.service";

export const authOption: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {}, // your email
        password: {}, // your password
      },
      authorize: async (credentials) => {
        const payload = await loginService({
          email: credentials!.email || "",
          password: credentials!.password || "",
        });
        if ("code" in payload) {
          throw new Error(payload.message);
        }
        return {
          id: payload.user._id,
          accessToken: payload.token,
          user: payload.user,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  jwt: {
    // config token
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
};
