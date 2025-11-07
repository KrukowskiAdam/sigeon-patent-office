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
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: 'https://cdn.sanity.io/images/pofl8c47/production/:path*',
      },
    ]
  },
};

export default nextConfig;
