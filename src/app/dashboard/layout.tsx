import DashAside from "@/components/shared/dash-shared/dash-aside";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="relative flex">
      <DashAside />
      <main className="flex-1  min-h-screen">
        <PageBreadcrumb />
        <section className="bg-gray-50">{children}</section>
      </main>
    </div>
  );
}
