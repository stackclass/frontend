import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/catalog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
