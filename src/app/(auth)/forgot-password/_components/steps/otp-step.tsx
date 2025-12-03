"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/lib/schemas/auth.schema";
import { ArrowLeft } from "lucide-react";
import { ErrorMessage } from "@/components/ui/error-message";
import { useState, useEffect } from "react";
import Link from "next/link";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpStepProps {
  email: string | null;
  onSubmit: () => void;
  onEditEmail: () => void;
}

type OtpFields = {
  otp: string;
};

export function OtpStep({ email, onSubmit, onEditEmail }: OtpStepProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const form = useForm<OtpFields>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit: SubmitHandler<OtpFields> = async (values) => {
    setIsPending(true);
    setError(null);

    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("OTP:", values.otp);
      onSubmit();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid verification code"
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    // Resend OTP logic
    console.log("Resending code to:", email);
    setCountdown(60);
    setCanResend(false);
    form.setValue("otp", "");
  };

  return (
    <>
      {/* Back Button */}
      <button
        onClick={onEditEmail}
        className="mb-10 p-3 border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 text-black" />
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-[0.625rem]">Verify OTP</h1>
      <p className="text-base font-geistMono text-gray-500 mb-10">
        Please enter the 6-digits code we have sent to:{" "}
        <span className="font-medium text-gray-800">{email}. </span>
        <button
          type="button"
          onClick={onEditEmail}
          className="text-blue-600 hover:underline font-medium"
        >
          Edit
        </button>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* OTP Inputs */}
          <FormField
            control={form.control}
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

          {/* Resend Code */}
          <div className="text-center font-geistMono mb-10">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-sm font-geistMono text-gray-500 hover:text-gray-600 font-medium"
              >
                Didn&apos;t receive the code?{" "}
                <span className="hover:underline text-blue-600 transition-all cursor-pointer">Resend</span>
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                You can request another code in:{" "}
                <span className="font-medium text-gray-800">{countdown}s</span>
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-8">
              <ErrorMessage message={error} />
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 mb-9 hover:bg-blue-700 text-white font-medium"
            disabled={isPending || form.watch("otp").length !== 6}
          >
            {isPending ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      </Form>

      {/* Sign up link */}
      <div className="text-center text-sm font-geistMono text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600  hover:text-blue-700 font-medium"
        >
          Create yours
        </Link>
      </div>
    </>
  );
}
