"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, SquareTerminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export function Code({ title, className, children }: CodeProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (codeRef.current) {
      const textContent = codeRef.current.innerText || "";
      navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };

  return (
    <Card className={cn("code rounded-sm pt-0 py-0 gap-0", className)}>
      <CardHeader className="bg-accent pl-4 pr-4 pt-2 pb-2 flex items-center justify-between">
        <CardTitle className="m-0 text-sm flex items-center">
          <SquareTerminal size={14} className="mr-1" />
          <span>{title}</span>
        </CardTitle>
        <CardAction>
          <Button
            variant="outline"
            className={cn("w-6 h-6", copied && "border-green-500")}
            onClick={handleCopy}
          >
            {copied ? <Check size={4} color="green" /> : <Copy size={4} />}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-4">
        <pre ref={codeRef} className="overflow-y-hidden">
          <code>{children}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
