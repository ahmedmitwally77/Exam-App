"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onClick: () => void;
};

export default function MobileMenuButton({ onClick }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden fixed top-12 left-0 rounded-r-md z-50 transition-all duration-300 bg-white shadow-md hover:bg-gray-100"
      onClick={onClick}
      aria-label="Toggle Menu"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
}
