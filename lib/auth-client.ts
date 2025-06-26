import { auth } from "@/lib/auth";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";
import { getJwtToken } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>(), jwtClient()],
});

export const { signIn, signUp, signOut, useSession, token } = authClient;
