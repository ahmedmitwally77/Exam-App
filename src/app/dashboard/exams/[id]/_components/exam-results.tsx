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
      <div className="px-6 py-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Results:</h1>

        <div className="flex gap-8">
          {/* Left Side - Chart Only */}
          <div className="w-80 flex-shrink-0">
            <ChartRadialText
              correct={results.correct}
              wrong={results.wrong}
              total={results.total}
            />
          </div>

          {/* Right Side - Questions List */}
          <div className="flex-1">
            <div className="max-h-[700px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {/* Wrong Questions */}
              {results.WrongQuestions && results.WrongQuestions.length > 0 && (
                <>
                  {results.WrongQuestions.map((wrongQ) => (
                    <div
                      key={wrongQ.QID}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      {/* Question Header */}
                      <div className="bg-blue-600 text-white px-4 py-3 text-sm font-medium">
                        {wrongQ.Question}
                      </div>

                      {/* Answers */}
                      <div>
                        {/* Wrong Answer */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border-b border-gray-200">
                          <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                          </div>
                          <span className="text-sm text-gray-800">
                            {getAnswerText(wrongQ.QID, wrongQ.inCorrectAnswer)}
                          </span>
                        </div>

                        {/* Correct Answer */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-green-50">
                          <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-sm text-gray-800">
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
                        <div className="bg-blue-600 text-white px-4 py-3 text-sm font-medium">
                          {correctQ.Question}
                        </div>

                        {/* Correct Answer */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-green-50">
                          <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-sm text-gray-800">
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
        <div className="flex gap-4 mt-10 justify-center">
          <Button
            onClick={onRestart}
            variant="secondary"
            className="flex items-center flex-1 gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Restart
          </Button>
          <Button
            onClick={onExplore}
            variant="default"
            className="flex items-center flex-1 gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
}
