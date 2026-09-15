import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add the Strapi media host here when the CMS is connected, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "cms.example.com", pathname: "/uploads/**" }],
  },
};

export default nextConfig;
