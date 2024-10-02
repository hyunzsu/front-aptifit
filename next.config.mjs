/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // ESLint 오류 무시
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript 오류 무시
  },
};

export default nextConfig;
