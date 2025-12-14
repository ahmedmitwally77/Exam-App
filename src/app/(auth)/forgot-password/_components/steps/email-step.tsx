"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ErrorMessage } from "@/components/ui/error-message";
import { cn } from "@/lib/utils/tailwind-merge";
import { useSendForgotPasswordEmail } from "../../_hooks/use-forgot-password";
import type { ForgotPasswordFormData } from "@/lib/types/auth";

interface EmailStepProps {
  onSubmit: () => void;
}

const LAST_ACTIVITY_KEY = "forgot_password_last_activity";

const updateLastActivity = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
};

export function EmailStep({ onSubmit }: EmailStepProps) {
  const { isPending, error, sendEmail } = useSendForgotPasswordEmail();
  const { control, getValues, trigger } =
    useFormContext<ForgotPasswordFormData>();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await trigger("email");
    if (!isValid) return;

    const email = getValues("email");
    updateLastActivity();
    sendEmail(email, {
      onSuccess: () => {
        onSubmit();
      },
    });
  };

  return (
    <div className="w-3/5 mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-[0.625rem]">
        Forgot Password
      </h1>
      <p className="text-base font-geistMono text-gray-500 mb-10">
        Don&apos;t worry, we will help you recover your account.
      </p>

      <div className="">
        <FormField
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="mb-10">
              <FormLabel className="text-base font-medium text-gray-800">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="user@example.com"
                  autoFocus
                  className={cn(
                    "h-11 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
                    fieldState.error && "border-red-500 focus:ring-red-500"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div className="mb-8">
            <ErrorMessage message={error.message} />
          </div>
        )}

        <Button
          type="button"
          onClick={handleContinue}
          className="w-full h-11 bg-blue-600 mb-9 hover:bg-blue-700 text-white font-medium"
          disabled={isPending}
        >
          {isPending ? (
            "Sending..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Continue
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </div>

      <div className="text-center font-geistMono text-sm text-gray-500">
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
