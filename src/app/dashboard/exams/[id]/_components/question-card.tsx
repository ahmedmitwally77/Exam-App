import type { Question } from "@/lib/types/questions";
import { useFormContext } from "react-hook-form";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | undefined;
}

export default function QuestionCard({
  question,
  selectedAnswer,
}: QuestionCardProps) {
  const { register } = useFormContext();
  const questionFieldName = `question_id_${question._id}`;

  return (
    <div key={question._id} className="bg-white rounded-lg mt-10 mb-6">
      <h2 className="text-blue-600 text-2xl font-semibold mb-4">
        {question.question}
      </h2>

      <div className="space-y-2.5">
        {question.answers.map((answer) => (
          <label
            key={answer.key}
            className={`flex items-center gap-3 p-4 bg-gray-50 rounded cursor-pointer transition-all ${
              selectedAnswer === answer.key
                ? "ring-2 ring-blue-600 bg-gray-300"
                : "hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              value={answer.key}
              {...register(questionFieldName)}
              className="w-5 h-5 text-blue-600 accent-blue-600 focus:ring-blue-600"
            />
            <span className="text-gray-800">{answer.answer}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
