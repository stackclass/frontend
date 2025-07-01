"use client";

import { auth } from "@/lib/auth";
import authClient from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type Session = typeof auth.$Infer.Session;

interface AuthContextValue {
  session: Session | null;
  isLoading: boolean;
  isError: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: session,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await authClient.getSession({
        fetchOptions: {
          onSuccess: (ctx) => {
            const jwt = ctx.response.headers.get("set-auth-jwt") || "";
            localStorage.setItem("jwt", jwt);
          },
        },
      });
      return data;
    },
  });

  return (
    <AuthContext.Provider
      value={{ session: session || null, isLoading, isError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
}
