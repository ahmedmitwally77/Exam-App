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

interface UserProfileProps {
  user: IUser["user"];
}

export default function UserProfile({
  user,
}: UserProfileProps) {
  

  return (
      <div className="flex items-center gap-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.image as string} alt={`${user.firstName} ${user.lastName} avatar`} />
          <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
            {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 font-geistMono">
          <h5 className="text-base font-medium text-blue-600 ">{user.firstName} {user.lastName}</h5>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-[#6B7280] hover:text-[#1F2937] transition-colors focus:outline-none">
              <MoreVertical className="w-5 h-5" strokeWidth={2} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[250px] bg-white p-1"
          >
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
              <User className="w-4 h-4" strokeWidth={2} />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700! transition-colors duration-300 cursor-pointer">
              <LogOut className="w-4 h-4" strokeWidth={2} />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
}
