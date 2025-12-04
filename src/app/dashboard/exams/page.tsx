import React from "react";
import Link from "next/link";
import { BookOpenCheck, Timer } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import { getExamsBySubject } from "./_services/get-exams.service";
import type { ExamsData, Exam } from "@/lib/types/exams";

export default async function Page() {
  const response: ApiResponse<ExamsData> = await getExamsBySubject();

  if ("code" in response) {
    throw new Error(response.message);
  }

  const exams = response.exams;

  return (
    <div className="min-h-screen w-full">
      {/* Main Content */}
      {/* Header */}
      <PageHeader title="Exams" icon={BookOpenCheck} />

      {/* Exams List */}
      <div className="space-y-4 mb-4 p-6 bg-white">
        {exams.map((exam: Exam) => (
          <Link
            href={`/dashboard/exams/${exam._id}`}
            key={exam._id}
            className="block bg-blue-50 font-geistMono p-4 cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-blue-600 text-xl font-semibold mb-2">
                  {exam.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {exam.numberOfQuestions} Questions
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm  text-gray-800">
                <Timer className="w-4 h-4" />
                <span>Duration: {exam.duration} minutes</span>
              </div>
            </div>
          </Link>
        ))}
        {/* End of list */}
        {exams.length > 0 && (
          <div className="text-center font-geistMono p-[0.6rem]">
            <p className="text-base text-gray-600">End of list</p>
          </div>
        )}
      </div>
    </div>
  );
}
