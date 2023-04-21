/** @type {import('next').NextConfig} */
const nextConfig = {

  serverComponents: true,
  experimental: {
    appDir: true,
    esmExternals: 'loose',
  },
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
}

module.exports = nextConfig
