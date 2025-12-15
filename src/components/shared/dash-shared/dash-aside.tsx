"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import LogoHeading from "../logo-heading";
import UserProfile from "@/components/ui/user-profile";
import DashNav from "@/components/ui/dash-aside-nav";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DashAside({ isOpen, onClose }: Props) {
  const { data: session } = useSession();

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay - only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          w-[16rem] lg:w-[22.625rem] lg:min-h-screen
          p-6 lg:p-10 bg-blue-50
          border-r border-[#E8ECF4]
          justify-between flex flex-col
          z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close button - only visible on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden absolute top-4 border border-blue-600 rounded-lg right-4"
          onClick={onClose}
          aria-label="Close Menu"
        >
          <X className="h-5 w-5 text-blue-600 " />
        </Button>

        <div className="wrapper-top">
          {/* Logo */}
          <div className="flex flex-col ">
            <Image
              src="/assets/Final Logo 1.svg"
              alt="Logo"
              width={190}
              height={40}
              className="object-contain text-black mb-2.5 w-[150px] lg:w-[190px]"
            />
            <LogoHeading />
          </div>

          {/* Navigation Items */}
          <DashNav onNavigate={onClose} />
        </div>

        {/* User Profile */}
        {session?.user && <UserProfile user={session.user} />}
      </aside>
    </>
  );
}
