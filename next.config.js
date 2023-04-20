/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}
export function webpack(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "supports-color": require.resolve("supports-color"),
  };

  return config;
}

export default nextConfig
