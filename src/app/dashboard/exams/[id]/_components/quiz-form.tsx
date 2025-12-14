"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ChevronLeft, ChevronRight, CircleQuestionMark } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Question, ExamResultData } from "@/lib/types/questions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PageHeader from "@/components/ui/page-header";
import TimerCircle from "./timer-circle";
import QuestionCard from "./question-card";
import ExamResults from "./exam-results";
import useSubmitExam from "../_hooks/use-submit-exam";

interface QuizFormProps {
  questions: Question[];
}

type FormData = {
  [key: string]: string;
};

export default function QuizForm({ questions }: QuizFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examResults, setExamResults] = useState<ExamResultData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime] = useState(Date.now());
  const totalQuestions = questions.length;
  const question = questions[currentQuestion];
  const questionFieldName = `question_id_${question._id}`;

  const methods = useForm<FormData>({
    shouldUnregister: false,
  });

  const { handleSubmit, watch } = methods;
  const router = useRouter();

  const { isPending, submitExam } = useSubmitExam();

  const duration = question.exam.duration || 0;

  const selectedAnswer = watch(questionFieldName);
  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!question) {
    return null;
  }
  const onSubmit = (data: FormData) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000 / 60);

    const answers = questions
      .map((q) => {
        const fieldName = `question_id_${q._id}`;
        const answer = data[fieldName];
        if (!answer) return null;
        return {
          questionId: q._id,
          correct: answer,
        };
      })
      .filter((item) => item !== null);

    const payload = {
      answers,
      time: timeSpent,
    };

    submitExam(payload, {
      onSuccess: (result) => {
        setExamResults(result);
      },
      onError: (error) => {
        alert("Failed to submit exam: " + error.message);
      },
    });
  };

  const handleRestart = () => {
    setExamResults(null);
    setCurrentQuestion(0);
    setTimeLeft(duration * 60);
    methods.reset();
  };

  const handleExplore = () => {
    router.push("/dashboard/exams");
  };

  if (examResults) {
    return (
      <ExamResults
        results={examResults}
        questions={questions}
        onRestart={handleRestart}
        onExplore={handleExplore}
      />
    );
  }

  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-screen bg-white px-6 py-4 font-geistMono"
      >
        <PageHeader
          icon={
            <CircleQuestionMark
              className="w-11 h-11 text-white"
              strokeWidth={2}
            />
          }
          title={question.exam.title}
        />
        {/* Progress Bar Section */}
        <div className="flex text-sm text-gray-500  items-center justify-between mb-2">
          <p className="">{question.exam.title}</p>
          <p className="font-medium">
            Question{" "}
            <span className="font-semibold text-blue-600">
              {currentQuestion + 1}
            </span>{" "}
            of {totalQuestions}
          </p>
        </div>
        <Progress value={progressPercentage} className="h-2" />

        {/* Question Content */}
        <QuestionCard question={question} selectedAnswer={selectedAnswer} />

        {/* Navigation Buttons */}
        <div className="flex items-center mt-10 justify-between gap-4">
          <Button
            type="button"
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            variant="secondary"
            className="flex items-center flex-1 gap-2 px-8 py-6 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Previous</span>
          </Button>

          <TimerCircle duration={duration} timeLeft={timeLeft} />

          {!isLastQuestion ? (
            <Button
              type="button"
              onClick={goToNext}
              className="flex items-center flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded text-base"
            >
              <span className="font-medium">Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded text-base font-medium disabled:opacity-50"
            >
              {isPending ? "Submitting..." : "Submit Quiz"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
