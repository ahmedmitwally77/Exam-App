import type { ExamsData } from "@/lib/types/exams";
import { getToken } from "@/lib/utils/manage-token";

export async function getExamsBySubject(): Promise<ApiResponse<ExamsData>> {
  const token = await getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${process.env.API_URL}/exams`, {
    method: "GET",
    headers: {
      token: token.accessToken,
    },
  });

  const payload = await response.json();
  if ("code" in payload) {
    throw new Error(payload.message);
  }
  return payload;
}
