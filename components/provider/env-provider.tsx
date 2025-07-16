import { FC } from "react";
import { EnvProviderClient } from "./env-provider-client";

export const EnvProvider: FC = () => {
  const env: Record<string, string> = {};

  Object.keys(process.env).forEach((key) => {
    if (key.startsWith("PUBLIC_")) {
      env[key] = process.env[key] as string;
    }
  });

  return <EnvProviderClient env={env} />;
};
