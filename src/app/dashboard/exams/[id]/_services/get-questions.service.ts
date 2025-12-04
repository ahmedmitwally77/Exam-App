import type { QuestionsData } from "@/lib/types/questions";
import { getToken } from "@/lib/utils/manage-token";

export async function getQuestionsByExam(
  examId: string
): Promise<ApiResponse<QuestionsData>> {
  const token = await getToken();

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await fetch(
      `https://exam.elevateegy.com/api/v1/questions?exam=${examId}`,
      {
        method: "GET",
        headers: {
          token: token.accessToken,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        message: "Failed to fetch questions",
        code: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch {
    return {
      message: "Network error occurred",
      code: 500,
    };
  }
}
