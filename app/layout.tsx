import AuthProvider from "@/components/provider/auth-provider";
import QueryClientProvider from "@/components/provider/query-client-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StackClass",
  description: "Programming challenges for developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
        <Toaster position="top-center" richColors visibleToasts={1} />
      </body>
    </html>
  );
}
