/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
    nextConfig,
    eslint: {
        ignoreDuringBuilds: true
    },
    optimizeFonts: false,
    // images: {
    //     domains: ["lh3.googleusercontent.com"],
    //     formats: ["image/webp"],
    // }
    // Fixes npm packages that depend on `fs` module
    
      
}
