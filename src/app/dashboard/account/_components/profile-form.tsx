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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils/tailwind-merge";
import { profileSchema } from "@/lib/schemas/auth.schema";
import { TriangleAlert } from "lucide-react";

type ProfileFields = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  // Form
  const form = useForm<ProfileFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<ProfileFields> = async (values) => {
    console.log(values);
  };

  const handleDeleteAccount = () => {
    console.log("Delete account confirmed");
    // Here you would call your API to delete the account
  };

  return (
    <div className="p-8 w-full h-full bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-6">
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
                      placeholder="Ahmed"
                      className={cn(
                        "h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
                        fieldState.error && "border-red-500 focus:ring-red-500"
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
                        "h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
                        fieldState.error && "border-red-500 focus:ring-red-500"
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
                      "h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
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
                      "h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
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
                      "h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
                      fieldState.error && "border-red-500 focus:ring-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 px-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
                >
                  Delete My Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                    <TriangleAlert className="w-8 h-8 text-red-600" />
                  </div>
                  <AlertDialogTitle className="text-center text-xl font-semibold text-gray-900">
                    Are you sure you want to delete your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-sm text-gray-500">
                    This action is permanent and cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-3 sm:gap-3">
                  <AlertDialogCancel className="h-11 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border-0 flex-1">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white font-medium flex-1"
                  >
                    Yes, delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              type="submit"
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium ml-auto"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
