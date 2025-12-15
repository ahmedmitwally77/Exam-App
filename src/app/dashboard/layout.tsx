import DashboardLayoutClient from "./_components/dashboard-layout-client";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
