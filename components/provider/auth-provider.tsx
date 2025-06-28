"use client";

import { auth } from "@/lib/auth";
import authClient from "@/lib/auth-client";
import { createContext, useContext, useEffect, useState } from "react";

type Session = typeof auth.$Infer.Session;

const AuthContext = createContext<Session | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: session } = await authClient.getSession({
          fetchOptions: {
            onSuccess: (ctx) => {
              const jwt = ctx.response.headers.get("set-auth-jwt") || "";
              localStorage.setItem("jwt", jwt);
            },
          },
        });
        setSession(session);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSession(null);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}

export function useSession() {
  return useContext(AuthContext);
}
