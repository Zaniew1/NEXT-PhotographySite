/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webp: {
    preset: "default",
    quality: 100,
  },
  images: {
      formats: ['image/avif', 'image/webp'],
       domains: ["localhost","firebasestorage.googleapis.com"],
  },
}

module.exports = nextConfig;
