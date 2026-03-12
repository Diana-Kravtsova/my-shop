import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        port: "",
        pathname: "/**", // for avatars
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**", // for products
      },
    ],
  },
};

export default nextConfig;
