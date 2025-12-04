// import 'server-only'

// export const JWT_SECRET = process.env.JWT_SECRET;

export const NEXTAUTH_COOKIE = process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token";
