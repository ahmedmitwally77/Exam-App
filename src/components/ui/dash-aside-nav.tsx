"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/tailwind-merge";

const navItems = [
  {
    href: "/dashboard",
    icon: GraduationCap,
    label: "Diplomas",
  },
  {
    href: "/dashboard/account",
    icon: User,
    label: "Account Settings",
  },
];

type Props = {
  onNavigate?: () => void;
};

export default function DashNav({ onNavigate }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname.includes("/account")) {
      return href === "/dashboard/account";
    }
    return href === "/dashboard";
  };

  return (
    <nav className="mt-8 lg:mt-[3.7rem] space-y-[0.6rem]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 lg:gap-3 p-3 lg:p-4 transition-colors duration-300",
              active
                ? "bg-blue-100 text-blue-500 hover:bg-blue-200"
                : "text-gray-500 hover:bg-blue-200 hover:text-blue-500"
            )}
          >
            <Icon className={cn("w-5 h-5 lg:w-6 lg:h-6")} />
            <h3
              className={cn("font-medium text-sm lg:text-base font-geistMono")}
            >
              {item.label}
            </h3>
          </Link>
        );
      })}
    </nav>
  );
}
