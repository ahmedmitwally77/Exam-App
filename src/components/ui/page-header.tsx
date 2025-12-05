"use client";

import React, { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface PageHeaderProps {
  title: string;
  icon: ReactNode;
}

export default function PageHeader({ title, icon }: PageHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Check if we should show back button
  // Don't show on dashboard root or if only one segment after filtering
  const segments = pathname.split("/").filter(Boolean);
  const filteredSegments = segments.filter((seg) => seg !== "dashboard");
  const showBackButton = filteredSegments.length > 0;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-blue-600 p-4 mb-6 flex items-center gap-4">
      {showBackButton && (
        <button
          onClick={handleBack}
          className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      )}
      {icon}
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
    </div>
  );
}
