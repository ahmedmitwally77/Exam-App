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
import { RegisterFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/auth.schema";
import useRegister from "../_hooks/use-register";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ErrorMessage } from "@/components/ui/error-message";
import { cn } from "@/lib/utils/tailwind-merge";
import { PhoneInput } from "@/components/ui/phone-input";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mutations
  const { isPending, error, register } = useRegister();

  // Form
  const form = useForm<RegisterFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    // bug
    const localPhone = values.phone.startsWith("+20")
      ? "0" + values.phone.slice(3)
      : values.phone;
    register({ ...values, phone: localPhone });
  };

  return (
    <div className="w-full h-full py-36 flex flex-col justify-center items-center max-w-md mx-auto space-y-8">
      {/* Form */}
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">
          Create Account
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-3">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-800">
                      First name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ahmad"
                        className={cn(
                          "h-11 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
                          fieldState.error &&
                            "border-red-500 focus:ring-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-800">
                      Last name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Abdullah"
                        className={cn(
                          "h-11 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
                          fieldState.error &&
                            "border-red-500 focus:ring-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="user123"
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

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="EG"
                      placeholder="Enter a phone number"
                      {...field}
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
                <FormItem>
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
                          fieldState.error &&
                            "border-red-500 focus:ring-red-500"
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
              name="rePassword"
              render={({ field, fieldState }) => (
                <FormItem>
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
                          fieldState.error &&
                            "border-red-500 focus:ring-red-500"
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
              <div className="mt-4">
                <ErrorMessage message={error.message} />
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 mt-6 hover:bg-blue-700 text-white font-medium"
              disabled={isPending}
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Form>

        {/* Login link */}
        <div className="text-center font-geistMono text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
