/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
      unoptimized: true,
      formats: ['image/avif', 'image/webp'],
       domains: ["localhost","firebasestorage.googleapis.com"],
  },
}

module.exports = nextConfig;
