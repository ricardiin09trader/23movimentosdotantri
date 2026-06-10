import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-151b44b5-12e9-4d5b-9b3e-a1cfcdfc7177.space-z.ai",
  ],
  async headers() {
    return [
      {
        source: "/lovable-uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
