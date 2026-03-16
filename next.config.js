import { createRequire } from "node:module";
import createNextIntlPlugin from "next-intl/plugin";

const require = createRequire(import.meta.url);
const config = require("./src/config/config.json");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  transpilePackages: ["next-mdx-remote"],
  output: "standalone",
  outputFileTracingIncludes: {
    "/**": ["src/content/**/*"],
  },
  async redirects() {
    return [
      {
        source: "/es-mx",
        destination: "/mx",
        permanent: true,
      },
      {
        source: "/es-mx/:path*",
        destination: "/mx/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
};

export default withNextIntl(nextConfig);
