"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { ErrorMessage } from "@/components/ui/error-message";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  useVerifyResetCode,
  useSendForgotPasswordEmail,
} from "../../_hooks/use-forgot-password";
import type { ForgotPasswordFormData } from "@/lib/types/auth";

interface OtpStepProps {
  onSubmit: () => void;
  onEditEmail: () => void;
}

const TIMER_KEY_PREFIX = "forgot_password_timer_";
const RESEND_COUNT_PREFIX = "forgot_password_resend_count_";
const LAST_ACTIVITY_KEY = "forgot_password_last_activity";
const MAX_RESEND_ATTEMPTS = 3;
const TIMER_DURATION = 60;

const updateLastActivity = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
};

const getStoredTimerEnd = (email: string): number | null => {
  if (typeof window === "undefined") return null;
  const timerKey = TIMER_KEY_PREFIX + email;
  const stored = localStorage.getItem(timerKey);
  return stored ? parseInt(stored, 10) : null;
};

const setStoredTimerEnd = (email: string, timestamp: number) => {
  if (typeof window === "undefined") return;
  const timerKey = TIMER_KEY_PREFIX + email;
  localStorage.setItem(timerKey, timestamp.toString());
};

const clearStoredTimer = (email: string) => {
  if (typeof window === "undefined") return;
  const timerKey = TIMER_KEY_PREFIX + email;
  localStorage.removeItem(timerKey);
};

const getResendCount = (email: string): number => {
  if (typeof window === "undefined") return 0;
  const countKey = RESEND_COUNT_PREFIX + email;
  const stored = localStorage.getItem(countKey);
  return stored ? parseInt(stored, 10) : 0;
};

const incrementResendCount = (email: string) => {
  if (typeof window === "undefined") return;
  const countKey = RESEND_COUNT_PREFIX + email;
  const currentCount = getResendCount(email);
  localStorage.setItem(countKey, (currentCount + 1).toString());
};

const clearResendCount = (email: string) => {
  if (typeof window === "undefined") return;
  const countKey = RESEND_COUNT_PREFIX + email;
  localStorage.removeItem(countKey);
};

const clearTimerForEmail = (email: string) => {
  clearStoredTimer(email);
  clearResendCount(email);
};
const calculateRemainingTime = (endTime: number): number => {
  const now = Date.now();
  const remaining = Math.ceil((endTime - now) / 1000);
  return remaining > 0 ? remaining : 0;
};

export function OtpStep({ onSubmit, onEditEmail }: OtpStepProps) {
  const { isPending, error, verifyCode } = useVerifyResetCode();
  const { sendEmail } = useSendForgotPasswordEmail();
  const { control, getValues, watch, trigger, setValue } =
    useFormContext<ForgotPasswordFormData>();

  const [countdown, setCountdown] = useState<number>(TIMER_DURATION);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState<number>(0);

  const email = getValues("email");
  const otpValue = watch("otp");

  useEffect(() => {
    if (!email) return;
    const savedResendCount = getResendCount(email);
    setResendCount(savedResendCount);

    const storedEnd = getStoredTimerEnd(email);
    if (storedEnd) {
      const remaining = calculateRemainingTime(storedEnd);
      if (remaining > 0) {
        setCountdown(remaining);
        setCanResend(false);
      } else {
        setCountdown(0);
        setCanResend(true);
        clearStoredTimer(email);
      }
    } else {
      const endTime = Date.now() + TIMER_DURATION * 1000;
      setStoredTimerEnd(email, endTime);
    }
  }, [email]);

  useEffect(() => {
    if (!email) return;

    if (countdown > 0) {
      const timer = setInterval(() => {
        const storedEnd = getStoredTimerEnd(email);
        if (storedEnd) {
          const remaining = calculateRemainingTime(storedEnd);
          setCountdown(remaining);

          if (remaining === 0) {
            setCanResend(true);
            clearStoredTimer(email);
          }
        } else {
          setCountdown((prev) => {
            const newCount = prev - 1;
            if (newCount === 0) {
              setCanResend(true);
            }
            return newCount;
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanResend(true);
      clearStoredTimer(email);
    }
  }, [countdown, email]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await trigger("otp");
    if (!isValid) return;

    const otp = getValues("otp");
    updateLastActivity();
    verifyCode(otp, {
      onSuccess: () => {
        clearTimerForEmail(email);
        onSubmit();
      },
    });
  };

  const handleResendCode = async () => {
    if (!canResend || !email) return;

    const currentResendCount = getResendCount(email);
    if (currentResendCount >= MAX_RESEND_ATTEMPTS) {
      return;
    }

    updateLastActivity();
    sendEmail(email, {
      onSuccess: () => {
        incrementResendCount(email);
        setResendCount(currentResendCount + 1);

        const newEndTime = Date.now() + TIMER_DURATION * 1000;
        setStoredTimerEnd(email, newEndTime);
        setCountdown(TIMER_DURATION);
        setCanResend(false);
        setValue("otp", "");
      },
    });
  };

  const handleEditEmail = () => {
    clearTimerForEmail(email);
    updateLastActivity();
    onEditEmail();
  };

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={handleEditEmail}
        type="button"
        className="mb-10 p-3 border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 text-black" />
      </button>

      <h1 className="text-3xl  text-center lg:text-start font-bold text-gray-800 mb-[0.625rem]">
        Verify OTP
      </h1>
      <p className="text-base font-geistMono text-gray-500 mb-10">
        Please enter the 6-digits code we have sent to:{" "}
        <span className="font-medium text-gray-800">{email}. </span>
        <button
          type="button"
          onClick={handleEditEmail}
          className="text-blue-600 hover:underline font-medium"
        >
          Edit
        </button>
      </p>

      <div>
        <FormField
          control={control}
          name="otp"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormControl>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={field.value}
                    onChange={field.onChange}
                    autoFocus
                  >
                    <InputOTPGroup className="gap-4">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <div className="text-center font-geistMono mb-10">
          {canResend ? (
            resendCount >= MAX_RESEND_ATTEMPTS ? (
              <p className="text-sm text-red-600 font-medium">
                You have reached the maximum resend attempts (
                {MAX_RESEND_ATTEMPTS}). Please try again later or contact
                support.
              </p>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-sm font-geistMono text-gray-500 hover:text-gray-600 font-medium"
                >
                  Didn&apos;t receive the code?{" "}
                  <span className="hover:underline text-blue-600 transition-all cursor-pointer">
                    Resend
                  </span>
                </button>
                {resendCount > 0 && (
                  <p className="text-xs text-gray-400">
                    Attempts remaining: {MAX_RESEND_ATTEMPTS - resendCount} of{" "}
                    {MAX_RESEND_ATTEMPTS}
                  </p>
                )}
              </div>
            )
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                You can request another code in:{" "}
                <span className="font-medium text-gray-800">{countdown}s</span>
              </p>
              {resendCount > 0 && (
                <p className="text-xs text-gray-400">
                  Attempts used: {resendCount} of {MAX_RESEND_ATTEMPTS}
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="mb-8">
            <ErrorMessage message={error.message} />
          </div>
        )}

        <Button
          type="button"
          onClick={handleVerify}
          className="w-full h-11 bg-blue-600 mb-9 hover:bg-blue-700 text-white font-medium"
          disabled={isPending || otpValue.length !== 6}
        >
          {isPending ? "Verifying..." : "Verify Code"}
        </Button>
      </div>

      <div className="text-center text-sm font-geistMono text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Create yours
        </Link>
      </div>
    </div>
  );
}
