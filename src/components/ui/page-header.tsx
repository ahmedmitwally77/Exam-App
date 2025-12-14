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
    const segments = pathname.split("/").filter(Boolean);
    segments.pop();
    const parentPath = "/" + segments.join("/");
    router.push(parentPath);
  };

  return (
    <div className="flex gap-2 mb-6">
      {showBackButton && (
        <button
          onClick={handleBack}
          className="bg-white p-4 border-2 border-blue-600 hover:bg-gray-50 transition-colors flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
      )}
      <div className="bg-blue-600 p-4 flex items-center gap-4 flex-1">
        {icon}
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
      </div>
    </div>
  );
}
