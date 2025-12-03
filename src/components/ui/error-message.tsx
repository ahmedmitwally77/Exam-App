import { X } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="relative  font-geistMono flex items-center justify-center text-red-600 text-sm bg-red-50 p-3 border-2 border-red-600">
      <X className="absolute -top-3 left-1/2 -translate-x-1/2 h-[1.15rem] w-[1.15rem] bg-white rounded-full border-2 border-red-600 flex-shrink-0" />
      <span className="font-medium">{message}</span>
    </div>
  );
}
