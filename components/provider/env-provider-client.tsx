"use client";

import { FC, useMemo } from "react";

interface Props {
  env: Record<string, string>;
}

declare global {
  interface Window {
    env: Record<string, string>;
  }
}

export const EnvProviderClient: FC<Props> = ({ env }) => {
  useMemo(() => {
    if (typeof window !== "undefined") {
      (globalThis as typeof window).env = env;
      window.dispatchEvent(new Event("global.env"));
    }
  }, [env]);

  return null;
};
