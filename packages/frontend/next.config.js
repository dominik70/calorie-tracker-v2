const withTM = require('next-transpile-modules')(['../common']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`
            : 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

module.exports = withTM(nextConfig);
