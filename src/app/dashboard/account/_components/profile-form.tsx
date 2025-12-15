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
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useUpdateUser from "../_hooks/use-update-user";
import { ErrorMessage } from "@/components/ui/error-message";
import useDeleteAccount from "../_hooks/use-delete-account";

type ProfileFields = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { data: userData, status } = useSession();

  const { updateUser, isPending, error } = useUpdateUser();
  const { deleteAccount, isPending: isDeleting } = useDeleteAccount();

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

  const {
    formState: { dirtyFields, isDirty },
  } = form;

  useEffect(() => {
    if (userData?.user) {
      form.reset({
        firstName: userData?.user.firstName ?? "",
        lastName: userData?.user.lastName ?? "",
        username: userData?.user.username ?? "",
        email: userData?.user.email ?? "",
        phone: "+20" + (userData?.user.phone ?? ""),
      });
    }
  }, [userData, form]);

  if (status === "loading") {
    return (
      <div className="w-3/5 mx-auto h-full py-12">
        <div className="animate-pulse w-full">
          <div className="flex gap-4 mb-6">
            <div className="h-8 w-1/2 inline-block bg-gray-200 rounded"></div>
            <div className="h-8 pl-2 w-1/2 inline-block bg-gray-200 rounded"></div>
          </div>
          <div className="h-11 w-full bg-gray-200 rounded mb-6"></div>
          <div className="h-11 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const onSubmit: SubmitHandler<ProfileFields> = async (values) => {
    if (!isDirty) {
      return;
    }

    const updatedFields = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key as keyof ProfileFields] = values[key as keyof ProfileFields];
      return acc;
    }, {} as Partial<ProfileFields>);

    if (updatedFields.phone) {
      if (updatedFields.phone.startsWith("+20")) {
        updatedFields.phone = "0" + updatedFields.phone.slice(3);
      }
    }

    updateUser(updatedFields, {
      onSuccess: () => {
        form.reset(values);
      },
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  return (
    <div className="p-4 lg:p-8 w-full h-full bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm lg:text-base font-medium text-gray-800">
                    First name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Ahmed"
                      className={cn(
                        "h-11 lg:h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
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
                  <FormLabel className="text-sm lg:text-base font-medium text-gray-800">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Abdullah"
                      className={cn(
                        "h-11 lg:h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
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
                <FormLabel className="text-sm lg:text-base font-medium text-gray-800">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="user123"
                    className={cn(
                      "h-11 lg:h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
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
                <FormLabel className="text-sm lg:text-base font-medium text-gray-800">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="user@example.com"
                    className={cn(
                      "h-11 lg:h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
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
                <FormLabel className="text-sm lg:text-base font-medium text-gray-800">
                  Phone
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="EG"
                    placeholder="Enter a phone number"
                    {...field}
                    className={cn(
                      "h-11 lg:h-12 focus:ring-blue-600 focus:ring-2 focus:outline-none placeholder:text-gray-400",
                      fieldState.error && "border-red-500 focus:ring-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* error message */}
          {error && <ErrorMessage message={error.message} />}

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  className="h-11 lg:h-12 px-6 lg:px-8 flex-1 font-medium bg-red-50 hover:bg-red-100 text-red-600 border-0"
                >
                  Delete My Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%] lg:max-w-xl font-geistMono p-0">
                <AlertDialogHeader className="space-y-4 py-10 px-4">
                  <div className="mx-auto w-16 h-16 rounded-full mb-8 bg-red-50 shadow-xl shadow-red-200 flex items-center justify-center">
                    <TriangleAlert className="w-20 h-20 p-4 text-red-600" />
                  </div>
                  <AlertDialogTitle className="text-center text-lg font-medium text-red-600">
                    Are you sure you want to delete your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-sm mt-2.5 text-gray-500">
                    This action is permanent and cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row bg-gray-50 px-4 py-6 border-t border-gray-200 gap-4">
                  <AlertDialogCancel className="flex-1 w-1/2 border-none">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="flex-1 w-1/2"
                    disabled={isDeleting}
                    onClick={handleDeleteAccount}
                  >
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              disabled={!isDirty || isPending}
              type="submit"
              className="h-11 lg:h-12 flex-1 px-6 lg:px-8 font-medium"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
