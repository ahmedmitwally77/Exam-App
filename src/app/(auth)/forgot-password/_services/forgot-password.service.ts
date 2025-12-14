export async function sendForgotPasswordEmailService(email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload: ApiResponse<{ message: string }> = await response.json();
  return payload;
}

export async function verifyResetCodeService(resetCode: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verifyResetCode`,
    {
      method: "POST",
      body: JSON.stringify({ resetCode }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload: ApiResponse<{ status: string }> = await response.json();
  return payload;
}

export async function resetPasswordService(email: string, newPassword: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`,
    {
      method: "PUT",
      body: JSON.stringify({ email, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload: ApiResponse<{ token: string }> = await response.json();
  return payload;
}
