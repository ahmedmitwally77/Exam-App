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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/tailwind-merge";
import { changePasswordSchema } from "@/lib/schemas/auth.schema";
import { ChangePasswordFields } from "@/lib/types/auth";
import useChangePassword from "../_hooks/use-change-password";
import { ErrorMessage } from "@/components/ui/error-message";

export default function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { changePassword, isPending, error } = useChangePassword();

  // Form
  const form = useForm<ChangePasswordFields>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFields> = async (values) => {
    changePassword(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="p-4 lg:p-8 h-full bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-6"
        >
          {/* Current Password */}
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm lg:text-base font-medium text-gray-800">
                  Current Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "h-11 lg:h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400 border-gray-200 pr-10",
                        fieldState.error && "border-red-500 focus:ring-red-500"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? (
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

          {/* New Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm lg:text-base font-medium text-gray-800">
                  New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "h-11 lg:h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400 border-gray-200 pr-10",
                        fieldState.error && "border-red-500 focus:ring-red-500"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? (
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

          {/* Confirm New Password */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm lg:text-base font-medium text-gray-800">
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "h-11 lg:h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400 border-gray-200 pr-10",
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

          {/* error message */}
          {error && <ErrorMessage message={error.message} />}

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              disabled={isPending}
              type="submit"
              className="h-11 lg:h-12 px-6 lg:px-8 font-medium"
            >
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
