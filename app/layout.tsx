import AuthProvider from "@/components/provider/auth-provider";
import { EnvProvider } from "@/components/provider/env-provider";
import QueryClientProvider from "@/components/provider/query-client-provider";
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
        <EnvProvider />
        <QueryClientProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
