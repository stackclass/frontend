import AuthProvider from "@/components/provider/auth-provider";
import QueryClientProvider from "@/components/provider/query-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <QueryClientProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
        <Toaster position="top-center" richColors visibleToasts={1} />

        {ANALYTICS_ID && <GoogleAnalytics gaId={ANALYTICS_ID} />}
      </body>
    </html>
  );
}
