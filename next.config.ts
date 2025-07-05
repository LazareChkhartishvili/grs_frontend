import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // experimental: {
  //   typedRoutes: true,
  // },
  // webpack: (config) => {
  //   // გამოვრიცხოთ backend ფოლდერი build-ისგან
  //   config.watchOptions = {
  //     ...config.watchOptions,
  //     ignored: /backend/,
  //   };
  //   return config;
  // },
};

export default nextConfig;
