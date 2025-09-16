/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    // Allow local images and disable image optimization for debugging
    unoptimized: false,
    // Add fallback for local images
    domains: ['localhost', '127.0.0.1'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
