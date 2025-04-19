/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
  experimental: {
    ppr: false
  }
};

export default nextConfig;
