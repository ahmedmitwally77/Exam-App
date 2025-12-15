"use client";

import DashAside from "@/components/shared/dash-shared/dash-aside";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";
import MobileMenuButton from "@/components/shared/dash-shared/mobile-menu-button";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayoutClient({ children }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex">
      <MobileMenuButton
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <DashAside
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main className="flex-1 bg-gray-50 min-h-screen w-full lg:w-auto">
        <PageBreadcrumb />
        <section className="p-6 pt-16 lg:pt-6">{children}</section>
      </main>
    </div>
  );
}
