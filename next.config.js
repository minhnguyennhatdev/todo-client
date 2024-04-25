/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

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
  i18n,
};

module.exports = nextConfig;
