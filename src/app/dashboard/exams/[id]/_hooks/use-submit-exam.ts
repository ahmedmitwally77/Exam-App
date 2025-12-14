import { useMutation } from "@tanstack/react-query";
import { submitExam } from "../_services/submit-exam.service";
import type { ExamResultData, SubmitExamPayload } from "@/lib/types/questions";

export default function useSubmitExam() {
  const mutation = useMutation<ExamResultData, Error, SubmitExamPayload>({
    mutationFn: submitExam,
  });

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    submitExam: mutation.mutate,
  };
}
