import React from "react";
import { getQuestionsByExam } from "./_services/get-questions.service";
import type { QuestionsData } from "@/lib/types/questions";
import QuizForm from "./_components/quiz-form";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id: examId } = params;
  const response: ApiResponse<QuestionsData> = await getQuestionsByExam(examId);

  if ("code" in response) {
    throw new Error(response.message);
  }

  const questions = response.questions;

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No questions available for this exam.</p>
      </div>
    );
  }

  return (
    <div>
      <QuizForm questions={questions} />
    </div>
  );
}
