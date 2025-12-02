import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Exam App",
  description: "A simple exam app built with Next.js and Tailwind CSS",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.className} bg-background text-foreground antialiased  font-[var(--font-inter)]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
