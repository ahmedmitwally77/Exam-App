"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, MoreVertical, LogOut } from "lucide-react";
import { User as IUser } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserProfileProps {
  user: IUser["user"];
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
        <AvatarImage
          src={user.image as string}
          alt={`${user.firstName} ${user.lastName} avatar`}
        />
        <AvatarFallback className="bg-blue-600 text-white text-xs lg:text-sm font-medium">
          {user.firstName.charAt(0).toUpperCase()}
          {user.lastName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 font-geistMono min-w-0">
        <h5 className="text-sm lg:text-base font-medium text-blue-600 truncate">
          {user.firstName} {user.lastName}
        </h5>
        <p className="text-[0.625rem] lg:text-sm text-gray-500 truncate">
          {user.email}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-[#6B7280] hover:text-[#1F2937] transition-colors focus:outline-none">
            <MoreVertical className="w-5 h-5" strokeWidth={2} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[250px] bg-white p-1">
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
            <Link
              href="/dashboard/account"
              className="flex items-center gap-2 w-full"
            >
              <User className="w-4 h-4" strokeWidth={2} />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700! transition-colors duration-300 cursor-pointer">
            <div
              onClick={() => {
                signOut();
              }}
              className="flex items-center gap-2 w-full"
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
              <span>Logout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
