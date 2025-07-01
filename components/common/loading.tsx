"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <div className="relative">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
};
