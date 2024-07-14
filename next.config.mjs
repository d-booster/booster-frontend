/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['test-videos.co.uk'],  // 使用する動画ドメインを追加
  }
};

export default nextConfig;
