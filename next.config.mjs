/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "virtualpinballspreadsheet.github.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    APP_VERSION: process.env.npm_package_version,
    METADATA_URL: "https://virtualpinballchat.com:8443",
  },
};

export default nextConfig;
