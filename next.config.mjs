/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:8000/:path*", // Proxy to Backend
    },
  ],
}

export default nextConfig
