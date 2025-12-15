import React from "react";
import { GraduationCap } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import DiplomasList from "./_components/diplomas-list";

export default async function Page() {
  return (
    <div className="min-h-screen w-full">
      <PageHeader
        title="Diplomas"
        icon={
          <GraduationCap className="w-11 h-11 text-white" strokeWidth={2} />
        }
      />
      <DiplomasList />
    </div>
  );
}
