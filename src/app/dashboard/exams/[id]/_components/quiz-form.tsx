"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Question } from "@/lib/types/questions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizFormProps {
  questions: Question[];
}

type FormData = {
  [key: string]: string;
};

export default function QuizForm({ questions }: QuizFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const { register, handleSubmit, watch } = useForm<FormData>();

  const selectedAnswer = watch(`question_${currentQuestion}`);
  const totalQuestions = questions.length;
  const question = questions[currentQuestion];
  const duration = question.exam.duration || 0;

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const onSubmit = (data: FormData) => {
    console.log("Quiz submitted:", data);
    // هنا هنبعت البيانات للـ backend
  };

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

  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-geistMono">
              {question.exam.title}
            </p>
            <p className="text-sm text-blue-600 font-medium">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg p-8 mb-6">
          <h2 className="text-blue-600 text-2xl font-normal mb-8">
            {question.question}
          </h2>

          {/* Answers */}
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <label
                key={answer.key}
                className={`flex items-center gap-3 p-4 bg-gray-50 rounded cursor-pointer transition-all ${
                  selectedAnswer === answer.key
                    ? "ring-2 ring-blue-600 bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  value={answer.key}
                  {...register(`question_${currentQuestion}`)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-600"
                />
                <span className="text-gray-800">{answer.answer}</span>
              </label>
            ))}
          </div>

          {/* Answer Badge */}
          {selectedAnswer && (
            <div className="mt-6 flex justify-end">
              <div className="bg-yellow-400 text-black w-12 h-12 rounded-full font-bold flex items-center justify-center text-xl">
                {selectedAnswer.replace("A", "")}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            variant="secondary"
            className="flex items-center gap-2 px-8 py-6 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Previous</span>
          </Button>

          <div className="flex items-center justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#1B6BFC"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#E5E7EB"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 36 * (timeLeft / (duration * 60))
                  }`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {currentQuestion < totalQuestions - 1 ? (
            <Button
              type="button"
              onClick={goToNext}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded text-base"
            >
              <span className="font-medium">Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded text-base font-medium"
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
