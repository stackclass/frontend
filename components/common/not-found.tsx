"use client";

interface NotFoundProps {
  message?: string;
}

export const NotFound = ({
  message = "Resource not found.",
}: NotFoundProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
