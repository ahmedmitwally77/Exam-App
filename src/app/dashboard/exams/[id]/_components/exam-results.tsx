"use client";
import React from "react";
import { RotateCcw, ExternalLink } from "lucide-react";
import { ChartRadialText } from "@/components/ui/chart-radial-text";
import { Button } from "@/components/ui/button";
import type { ExamResultData, Question } from "@/lib/types/questions";

interface ExamResultsProps {
  results: ExamResultData;
  questions: Question[];
  onRestart: () => void;
  onExplore: () => void;
}

export default function ExamResults({
  results,
  questions,
  onRestart,
  onExplore,
}: ExamResultsProps) {
  // Helper function to get answer text from key
  const getAnswerText = (questionId: string, answerKey: string): string => {
    const question = questions.find((q) => q._id === questionId);
    if (!question) return answerKey;

    const answer = question.answers.find((a) => a.key === answerKey);
    return answer?.answer || answerKey;
  };

  return (
    <div className="min-h-screen font-geistMono bg-white">
      <div className="px-3 py-4 lg:px-6 lg:py-8">
        {/* Header */}
        <h1 className="text-xl lg:text-2xl font-bold text-blue-600 mb-4 lg:mb-8">
          Results:
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Left Side - Chart Only */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <ChartRadialText
              correct={results.correct}
              wrong={results.wrong}
              total={results.total}
            />
          </div>

          {/* Right Side - Questions List */}
          <div className="flex-1">
            <div className="max-h-[400px] lg:max-h-[700px] overflow-y-auto pr-2 space-y-2 lg:space-y-3 custom-scrollbar">
              {/* Wrong Questions */}
              {results.WrongQuestions && results.WrongQuestions.length > 0 && (
                <>
                  {results.WrongQuestions.map((wrongQ) => (
                    <div
                      key={wrongQ.QID}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      {/* Question Header */}
                      <div className="bg-blue-600 text-white px-3 py-2 lg:px-4 lg:py-3 text-xs lg:text-sm font-medium">
                        {wrongQ.Question}
                      </div>

                      {/* Answers */}
                      <div>
                        {/* Wrong Answer */}
                        <div className="flex items-center gap-2 lg:gap-3 px-3 py-2 lg:px-4 lg:py-3 bg-red-50 border-b border-gray-200">
                          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-red-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-red-500"></div>
                          </div>
                          <span className="text-xs lg:text-sm text-gray-800">
                            {getAnswerText(wrongQ.QID, wrongQ.inCorrectAnswer)}
                          </span>
                        </div>

                        {/* Correct Answer */}
                        <div className="flex items-center gap-2 lg:gap-3 px-3 py-2 lg:px-4 lg:py-3 bg-green-50">
                          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-xs lg:text-sm text-gray-800">
                            {getAnswerText(wrongQ.QID, wrongQ.correctAnswer)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Correct Questions */}
              {results.correctQuestions &&
                results.correctQuestions.length > 0 && (
                  <>
                    {results.correctQuestions.map((correctQ) => (
                      <div
                        key={correctQ.QID}
                        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                      >
                        {/* Question Header */}
                        <div className="bg-blue-600 text-white px-3 py-2 lg:px-4 lg:py-3 text-xs lg:text-sm font-medium">
                          {correctQ.Question}
                        </div>

                        {/* Correct Answer */}
                        <div className="flex items-center gap-2 lg:gap-3 px-3 py-2 lg:px-4 lg:py-3 bg-green-50">
                          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-xs lg:text-sm text-gray-800">
                            {getAnswerText(
                              correctQ.QID,
                              correctQ.correctAnswer
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 lg:gap-4 mt-6 lg:mt-10 justify-center">
          <Button
            onClick={onRestart}
            variant="secondary"
            className="flex items-center flex-1 gap-2 text-sm lg:text-base py-2 lg:py-3"
          >
            <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" />
            Restart
          </Button>
          <Button
            onClick={onExplore}
            variant="default"
            className="flex items-center flex-1 gap-2 text-sm lg:text-base py-2 lg:py-3"
          >
            <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
}
