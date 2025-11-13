import { output } from "framer-motion/client";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "martyrs-of-the-revolution.onrender.com",
        pathname: "/api/**",
      },
    ],
  },
};

module.exports = nextConfig;
