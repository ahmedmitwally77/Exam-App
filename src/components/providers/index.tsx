import NextAuthProvider from "./_Components/next-auth.provider";
import ReactQueryProvider from "./_Components/react-query.provider";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <Toaster position="top-center" richColors />
        {children}
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
