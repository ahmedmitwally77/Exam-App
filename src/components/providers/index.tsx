import NextAuthProvider from "./_Components/next-auth.provider";
import ReactQueryProvider from "./_Components/react-query.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextAuthProvider>
  );
}
