import type { ExamsData } from "@/lib/types/exams";
import { getToken } from "@/lib/utils/manage-token";

export async function getExamsBySubject(): Promise<ApiResponse<ExamsData>> {
  const token = await getToken();

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await fetch(`${process.env.API_URL}/exams`, {
      method: "GET",
      headers: {
        token: token.accessToken,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        message: "Failed to fetch exams",
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
