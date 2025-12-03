"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schemas/auth.schema";
import { Eye, EyeOff } from "lucide-react";
import { ErrorMessage } from "@/components/ui/error-message";
import { cn } from "@/lib/utils/tailwind-merge";
import { useState } from "react";
import Link from "next/link";

interface ResetPasswordStepProps {
  email: string | null;
  onSubmit: () => void;
}

type ResetPasswordFields = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordStep({ email, onSubmit }: ResetPasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFields>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleSubmit: SubmitHandler<ResetPasswordFields> = async (values) => {
    setIsPending(true);
    setError(null);

    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("New password for:", email, "Password:", values.password);
      onSubmit();
    } catch {
      setError("Failed to reset password");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-[0.625rem]">Reset Password</h1>
      <p className="text-base font-geistMono text-gray-500 mb-10">
        Create a new password for your account
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Password */}
          <FormField
            control={form.control}
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

          {/* Confirm Password */}
          <FormField
            control={form.control}
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
            disabled={isPending}
          >
            {isPending ? (
              "Resetting Password..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                Reset Password
              </span>
            )}
          </Button>
        </form>
      </Form>

      {/* Sign up link */}
      <div className="text-center font-geistMono text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Create yours
        </Link>
      </div>
    </>
  );
}
