"use client";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({
  message = "An error occurred.",
}: ErrorMessageProps) => {
  return (
    <div className="relative">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-destructive">{message}</p>
        </div>
      </div>
    </div>
  );
};
