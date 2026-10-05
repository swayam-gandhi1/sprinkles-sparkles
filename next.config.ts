import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimized variants are reused for 30 days (Next's default is 4 hours). Local
    // images are stable; when replacing a photo, give the new file a new name.
    minimumCacheTTL: 2592000,
    // Add the Strapi media host here when the CMS is connected, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "cms.example.com", pathname: "/uploads/**" }],
  },
};

export default nextConfig;
