import React from "react";
import Link from "next/link";
import { GraduationCap, User } from "lucide-react";
import Image from "next/image";
import LogoHeading from "../logo-heading";
import UserProfile from "@/components/ui/user-profile";
import { getServerSession } from "next-auth";
import { authOption } from "@/auth";

export default async function DashAside() {
  const session = await getServerSession(authOption);
  console.log("session here", session);

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
        <nav className="mt-[3.7rem] space-y-[0.6rem]">
          <Link
            href="/dashboard/diplomas"
            className="flex items-center gap-3 p-4 bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors duration-300"
          >
            <GraduationCap className="w-6 h-6" />
            <h4 className="text-base font-geistMono font-medium">Diplomas</h4>
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 p-4 text-gray-500 hover:bg-blue-200 hover:text-blue-500 transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Account Settings</span>
          </Link>
        </nav>
      </div>

      {/* User Profile */}
      {session?.user && <UserProfile user={session.user} />}
    </aside>
  );
}
