/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // produce a standalone build required by OpenNext
  output: 'standalone',
};

module.exports = nextConfig;
