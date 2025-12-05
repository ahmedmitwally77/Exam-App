import React from "react";
import Image from "next/image";
import LogoHeading from "../logo-heading";
import UserProfile from "@/components/ui/user-profile";
import DashNav from "@/components/ui/dash-aside-nav";
import { getServerSession } from "next-auth";
import { authOption } from "@/auth";

export default async function DashAside() {
  const session = await getServerSession(authOption);

  return (
    <aside className="w-[22.625rem] min-h-screen p-10 bg-blue-50 border-r border-[#E8ECF4] justify-between flex flex-col">
      <div className="wrapper-top">
        {/* Logo */}
        <div className="flex flex-col ">
          <Image
            src="/assets/Final Logo 1.svg"
            alt="Logo"
            width={190}
            height={40}
            className="object-contain text-black mb-2.5"
          />
          <LogoHeading />
        </div>

        {/* Navigation Items */}
        <DashNav />
      </div>

      {/* User Profile */}
      {session?.user && <UserProfile user={session.user} />}
    </aside>
  );
}
