import type { QuestionsData } from "@/lib/types/questions";
import { getToken } from "@/lib/utils/manage-token";

export async function getQuestionsByExam(
  examId: string
): Promise<ApiResponse<QuestionsData>> {
  const token = await getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions?exam=${examId}`,
    {
      method: "GET",
      headers: {
        token: token.accessToken,
      },
    }
  );

  const payload = await response.json();
  if ("code" in payload) {
    throw new Error(payload.message);
  }
  return payload;
}
