/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://todo.minhnguyen.io.vn/api/:path*',
      },
    ]
  },
};

export default nextConfig;
