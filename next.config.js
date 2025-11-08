/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com', // Cloudinary CDN
    ],
  },
}

module.exports = nextConfig
