import createJiti from "jiti";

const jiti = createJiti(new URL(import.meta.url).pathname);

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack: (config, context) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
};

export default nextConfig;
