/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Mengizinkan domain gambar eksternal
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },

  // 2. Optimasi (tree-shaking) lucide-react secara otomatis
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // 3. Header keamanan dasar
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },

  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
