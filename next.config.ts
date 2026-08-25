import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nwkaynpjpasequwwtaqd.supabase.co',
      },
    ],
  },
};

export default nextConfig;
