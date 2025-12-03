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
import { ForgotPasswordFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/schemas/auth.schema";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ErrorMessage } from "@/components/ui/error-message";
import { cn } from "@/lib/utils/tailwind-merge";
import { useState } from "react";

interface EmailStepProps {
  onSubmit: (email: string) => void;
  email: string | null;
}

export function EmailStep({ email, onSubmit }: EmailStepProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFields>({
    defaultValues: {
      email: email || "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });



  const handleSubmit: SubmitHandler<ForgotPasswordFields> = async (values) => {
    setIsPending(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(values.email);
    } catch {
      setError("Failed to send verification code");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-[0.625rem]">Forgot Password</h1>
      <p className="text-base font-geistMono text-gray-500 mb-10">
        Don&apos;t worry, we will help you recover your account.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Email */}
          <FormField
            control={form.control}
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
              "Sending..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                Continue
                <ArrowRight className="h-4 w-4" />
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
