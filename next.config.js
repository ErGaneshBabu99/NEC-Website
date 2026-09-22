/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "necnepal.com" },
      { hostname: "storage.example.com" },
    ],
  },
};
module.exports = nextConfig;
