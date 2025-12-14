"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { EmailStep } from "./steps/email-step";
import { OtpStep } from "./steps/otp-step";
import { ResetPasswordStep } from "./steps/reset-password-step";
import { forgotPasswordFormSchema } from "@/lib/schemas/auth.schema";
import type { ForgotPasswordFormData } from "@/lib/types/auth";

//!  localStorage Keys
const STEP_KEY = "forgot_password_step"; // current step 1 | 2 | 3
const FORM_DATA_KEY = "forgot_password_data"; // email and otp
const LAST_ACTIVITY_KEY = "forgot_password_last_activity"; //  last activity timestamp
const TIMER_KEY_PREFIX = "forgot_password_timer_"; // email-specific timer key prefix
const RESEND_COUNT_PREFIX = "forgot_password_resend_count_"; // email-specific resend count key prefix
const AUTO_CLEAR_DURATION = 3 * 60 * 1000; // auto clear data after 3 minutes

//~  Helper Functions
const getStoredStep = (): 1 | 2 | 3 => {
  if (typeof window === "undefined") return 1;
  const saved = localStorage.getItem(STEP_KEY);
  return saved ? (parseInt(saved) as 1 | 2 | 3) : 1;
};

const saveStep = (step: 1 | 2 | 3) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STEP_KEY, step.toString());
  updateLastActivity();
};

const getStoredFormData = (): Partial<ForgotPasswordFormData> => {
  if (typeof window === "undefined") return {};
  const saved = localStorage.getItem(FORM_DATA_KEY);
  return saved ? JSON.parse(saved) : {};
};

const saveFormData = (data: Partial<ForgotPasswordFormData>) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
  updateLastActivity();
};

const getLastActivity = (): number | null => {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(LAST_ACTIVITY_KEY);
  return saved ? parseInt(saved, 10) : null;
};

const updateLastActivity = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
};

const shouldClearData = (): boolean => {
  const lastActivity = getLastActivity();
  if (!lastActivity) return false;
  const timePassed = Date.now() - lastActivity;
  return timePassed > AUTO_CLEAR_DURATION;
};

const clearStorage = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STEP_KEY);
  localStorage.removeItem(FORM_DATA_KEY);
  localStorage.removeItem(LAST_ACTIVITY_KEY);

  Object.keys(localStorage).forEach((key) => {
    if (
      key.startsWith(TIMER_KEY_PREFIX) ||
      key.startsWith(RESEND_COUNT_PREFIX)
    ) {
      localStorage.removeItem(key);
    }
  });
};

export function ForgotPasswordForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  useEffect(() => {
    setIsMounted(true);

    if (shouldClearData()) {
      clearStorage();
      return;
    }

    const savedStep = getStoredStep();
    setCurrentStep(savedStep);

    const savedData = getStoredFormData();
    if (savedData.email) form.setValue("email", savedData.email);
    if (savedData.otp) form.setValue("otp", savedData.otp);
    updateLastActivity();
  }, [form]);

  useEffect(() => {
    if (isMounted) {
      saveStep(currentStep);
    }
  }, [currentStep, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const subscription = form.watch((data) => {
      saveFormData({
        email: data.email,
        otp: data.otp,
      });
    });
    return () => subscription.unsubscribe();
  }, [form, isMounted]);

  const handleEmailSubmit = () => {
    updateLastActivity();
    setCurrentStep(2);
  };

  const handleEditEmail = () => {
    const currentEmail = form.getValues("email");

    if (currentEmail) {
      const timerKey = TIMER_KEY_PREFIX + currentEmail;
      const countKey = RESEND_COUNT_PREFIX + currentEmail;
      localStorage.removeItem(timerKey);
      localStorage.removeItem(countKey);
    }

    form.setValue("otp", "");
    form.setValue("password", "");
    form.setValue("confirmPassword", "");

    updateLastActivity();
    setCurrentStep(1);
  };

  const handleOtpSubmit = () => {
    updateLastActivity();
    setCurrentStep(3);
  };

  const handleResetComplete = () => {
    clearStorage();
    router.push("/login");
  };

  if (!isMounted) {
    return (
      <div className="w-3/5 mx-auto h-full  flex items-center justify-center">
        <div className="animate-pulse w-full">
          <div className="h-8 w-52 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mb-10"></div>
          <div className="h-11 w-full bg-gray-200 rounded mb-6"></div>
          <div className="h-11 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="w-full h-full justify-center flex items-center flex-col  ">
        {currentStep === 1 && <EmailStep onSubmit={handleEmailSubmit} />}

        {currentStep === 2 && (
          <OtpStep onSubmit={handleOtpSubmit} onEditEmail={handleEditEmail} />
        )}

        {currentStep === 3 && (
          <ResetPasswordStep onSubmit={handleResetComplete} />
        )}
      </div>
    </FormProvider>
  );
}
