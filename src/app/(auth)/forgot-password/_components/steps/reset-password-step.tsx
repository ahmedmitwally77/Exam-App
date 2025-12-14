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
import { Eye, EyeOff } from "lucide-react";
import { ErrorMessage } from "@/components/ui/error-message";
import { cn } from "@/lib/utils/tailwind-merge";
import { useState } from "react";
import Link from "next/link";
import { useResetPassword } from "../../_hooks/use-forgot-password";
import type { ForgotPasswordFormData } from "@/lib/types/auth";

interface ResetPasswordStepProps {
  onSubmit: () => void;
}

// 🕐 تحديث وقت آخر نشاط
const LAST_ACTIVITY_KEY = "forgot_password_last_activity";
const updateLastActivity = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
};

export function ResetPasswordStep({ onSubmit }: ResetPasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isPending, error, resetPassword } = useResetPassword();
  const { control, getValues, trigger } =
    useFormContext<ForgotPasswordFormData>();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await trigger(["password", "confirmPassword"]);
    if (!isValid) return;

    const email = getValues("email");
    const password = getValues("password");

    updateLastActivity(); // تحديث آخر نشاط
    resetPassword(
      { email, newPassword: password },
      {
        onSuccess: () => {
          onSubmit();
        },
      }
    );
  };

  return (
    <div className="w-3/5 mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-[0.625rem]">
        Reset Password
      </h1>
      <p className="text-base font-geistMono text-gray-500 mb-10">
        Create a new password for your account
      </p>

      <div>
        <FormField
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-base font-medium text-gray-800">
                New Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoFocus
                    className={cn(
                      "h-11 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400 border-gray-200 pr-10",
                      fieldState.error && "border-red-500 focus:ring-red-500"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem className="mb-10">
              <FormLabel className="text-base font-medium text-gray-800">
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={cn(
                      "h-11 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400 border-gray-200 pr-10",
                      fieldState.error && "border-red-500 focus:ring-red-500"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
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
          onClick={handleReset}
          className="w-full h-11 bg-blue-600 mb-9 hover:bg-blue-700 text-white font-medium"
          disabled={isPending}
        >
          {isPending ? "Resetting Password..." : "Reset Password"}
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
