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
            ? 'https://calorie-tracker.fly.dev/api/:path*'
            : 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

module.exports = withTM(nextConfig);
