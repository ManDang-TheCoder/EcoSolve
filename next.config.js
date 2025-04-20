/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'randomuser.me' },
      { hostname: 'api.mapbox.com' },
    ],
  },
  poweredByHeader: false,
  compress: true,
  transpilePackages: ['lodash-es', 'lucide-react']
};

module.exports = nextConfig; 