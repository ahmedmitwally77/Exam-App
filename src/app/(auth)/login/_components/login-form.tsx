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
import { LoginFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/auth.schema";
import useLogin from "../_hooks/use-login";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ErrorMessage } from "@/components/ui/error-message";
import { cn } from "@/lib/utils/tailwind-merge";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  // Mutations
  const { isPending, error, login } = useLogin();

  // Form
  const form = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = async (values) => {
    login(values);
  };

  return (
    <div className="w-full h-full  flex flex-col justify-center items-center max-w-md mx-auto space-y-8">
      {/* Form */}
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="mb-4">
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-base font-medium text-gray-800">
                    Password
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

            {/* Forgot Password */}
            <div className="flex justify-end mb-10">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 font-geistMono hover:text-blue-700 font-medium"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-8">
                <ErrorMessage message={error.message} />
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 mb-12 hover:bg-blue-700 text-white font-medium"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
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
      </div>
    </div>

  );
}
