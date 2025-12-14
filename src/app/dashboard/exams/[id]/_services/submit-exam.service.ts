import type { ExamResultData, SubmitExamPayload } from "@/lib/types/questions";
import { getToken } from "@/lib/utils/manage-token";

export async function submitExam(
  payload: SubmitExamPayload
): Promise<ExamResultData> {
  const token = await getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/questions/check`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token.accessToken,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  // If API returns error format {code: xxx, message: "..."}
  if ("code" in data && data.code !== 200) {
    throw new Error(data.message || "Failed to submit exam");
  }

  // Return the data directly (API returns ExamResultData format)
  return data;
}
