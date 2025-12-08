"use client";
import { useState } from "react";
import { EmailStep } from "./steps/email-step";
import { OtpStep } from "./steps/otp-step";
import { ResetPasswordStep } from "./steps/reset-password-step";

export function ForgotPasswordForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string | null>(null);

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setCurrentStep(2);
  };

  const handleEditEmail = () => {
    setCurrentStep(1);
  };

  const handleOtpSubmit = () => {
    setCurrentStep(3);
  };

  const handleResetComplete = () => {
    console.log("Password reset complete");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center max-w-[28.3rem] mx-auto">
      <div className="w-full">
        {currentStep === 1 && (
          <EmailStep email={email} onSubmit={handleEmailSubmit} />
        )}
        {currentStep === 2 && (
          <OtpStep
            email={email}
            onSubmit={handleOtpSubmit}
            onEditEmail={handleEditEmail}
          />
        )}
        {currentStep === 3 && (
          <ResetPasswordStep email={email} onSubmit={handleResetComplete} />
        )}
      </div>
    </div>
  );
}
