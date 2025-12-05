import React from "react";
import Image from "next/image";
import { getAllSubjects } from "./_services/get-subjects.service";
import { SubjectsData } from "@/lib/types/subjects";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import PageHeader from "@/components/ui/page-header";

export default async function Page() {
  const dp: ApiResponse<SubjectsData> = await getAllSubjects();
  if ("code" in dp) {
    throw new Error(dp.message);
  }
  const diplomas = dp.subjects;
  return (
    <div className="min-h-screen w-full">
      <PageHeader
        title="Diplomas"
        icon={
          <GraduationCap className="w-11 h-11 text-white" strokeWidth={2} />
        }
      />
      {/* Diplomas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] mb-6">
        {diplomas.map((diploma) => (
          <Link
            href={`dashboard/exams/`}
            key={diploma._id}
            className="group relative w-[21rem] h-[28rem] cursor-pointer overflow-hidden transition-shadow duration-300"
          >
            <Image
              src={diploma.icon}
              alt={diploma.name}
              width={336}
              height={448}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 bg-[#155DFC80] text-white backdrop-blur-[6px]`}
            >
              <h3 className="text-xl font-semibold font-geistMono">
                {diploma.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      {/* Scroll to view more */}
      <div className="text-center p-[0.6rem]">
        <p className="text-base text-gray-600 mb-2 font-geistMono">
          Scroll to view more
        </p>
        <div className="flex justify-center">
          <svg
            className="w-5 h-5 text-gray-600 animate-bounce"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
