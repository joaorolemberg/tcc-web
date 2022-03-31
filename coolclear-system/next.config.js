/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_URL_API: process.env.NEXT_PUBLIC_BASE_URL_API },
};

module.exports = nextConfig;
