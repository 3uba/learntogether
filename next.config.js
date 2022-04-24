/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
    nextConfig,
    eslint: {
        ignoreDuringBuilds: true
    },
    // images: {
    //     domains: ["lh3.googleusercontent.com"],
    //     formats: ["image/webp"],
    // }
}
