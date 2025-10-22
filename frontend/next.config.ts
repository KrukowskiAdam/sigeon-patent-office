import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@portabletext/react', '@sanity/client', 'sanity'],
  experimental: {
    esmExternals: false
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
