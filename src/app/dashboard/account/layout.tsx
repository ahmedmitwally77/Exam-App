import React from "react";
import AccountSidebar from "@/components/shared/dash-shared/account-sidebar";
import PageHeader from "@/components/ui/page-header";
import { User } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default function AccountLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Account Settings"
        icon={<User className="w-11 h-11 text-white" strokeWidth={2} />}
      />
      <div className="flex gap-6">
        {/* Sidebar */}
        <AccountSidebar />

        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
