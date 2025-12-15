import AuthAside from "@/components/shared/auth-shared/auth-aside";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function layout({ children }: Props) {
  return (
    <div className="relative auth-layout grid lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block">
        <AuthAside />
      </div>
      {/* Mobile Background */}
      <div className="lg:hidden absolute inset-0 w-full h-full overflow-hidden z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100"></div>
        <div className="absolute rounded-full top-[-10rem] right-[-8rem] w-[25rem] h-[25rem] bg-blue-400 opacity-40 blur-[100px]" />
        <div className="absolute rounded-full bottom-[-8rem] left-[-8rem] w-[25rem] h-[25rem] bg-blue-300 opacity-40 blur-[100px]" />
        <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-200 opacity-30 blur-[80px]" />
      </div>

      <div className="px-4 lg:px-0 relative z-10">{children}</div>
    </div>
  );
}
