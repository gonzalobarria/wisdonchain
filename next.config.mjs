/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.dailyom.com",
      },
      {
        protocol: "https",
        hostname: "scontent.fada1-15.fna.fbcdn.net",
      },
    ],
  },
}

export default nextConfig
