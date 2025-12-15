"use client";
import { cn } from "@/lib/utils/tailwind-merge";
import { User, Lock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Profile",
    href: "/dashboard/account",
    icon: User,
  },
  {
    label: "Change Password",
    href: "/dashboard/account/change-password",
    icon: Lock,
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full lg:w-[17.6rem] p-4 lg:p-6 bg-white lg:min-h-[calc(100vh-64px)]">
      <aside className="flex flex-col lg:justify-between h-full">
        <nav className="flex flex-row lg:flex-col gap-2 lg:gap-[0.625rem] overflow-x-auto lg:overflow-x-visible">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 lg:gap-3 px-3 lg:px-[0.625rem] py-2 lg:py-[0.625rem] rounded-lg transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                <h3 className="font-medium text-sm lg:text-base font-geistMono">
                  {item.label}
                </h3>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => signOut()}
          className="hidden lg:flex items-center gap-3 px-[0.625rem] py-[0.625rem] text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full mt-4"
        >
          <LogOut className="w-6 h-6" />
          <span className="font-medium text-base font-geistMono">Logout</span>
        </button>
      </aside>
    </div>
  );
}
