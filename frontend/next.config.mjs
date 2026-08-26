/** @type {import('next').NextConfig} */
// Change: Optional same-origin proxy to the Dynamic QR API in production.
const apiOrigin = (process.env.DYNAMIC_QR_API_ORIGIN ?? "").replace(/\/$/, "");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (!apiOrigin) return [];
    return [
      { source: "/r/:code", destination: `${apiOrigin}/r/:code` },
      { source: "/api/dynamic-qr", destination: `${apiOrigin}/api/dynamic-qr` },
      { source: "/api/dynamic-qr/:path*", destination: `${apiOrigin}/api/dynamic-qr/:path*` },
    ];
  },
};

export default nextConfig;
