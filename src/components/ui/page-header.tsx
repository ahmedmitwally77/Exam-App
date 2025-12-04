import React from "react";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  icon: LucideIcon;
}

export default function PageHeader({ title, icon: Icon }: PageHeaderProps) {
  return (
    <div className="bg-blue-600 p-4 mb-6 flex items-center gap-4">
      <Icon className="w-11 h-11 text-white" strokeWidth={2} />
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
    </div>
  );
}
